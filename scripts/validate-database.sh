#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════════
#  Vantus Systems - Database Validation Script (Hardened)
# ═══════════════════════════════════════════════════════════════════════
#
# Validates database connectivity and Prisma readiness for deploy:
#   - Loads .env if DATABASE_URL not already present (defense-in-depth)
#   - SQLite: checks directory + write access + opens DB
#   - Postgres/MySQL: performs a Prisma db execute SELECT 1 if available
#   - Prisma schema validate
#   - Prisma migrate status (connection + migration sanity)
#
# Exit codes:
#   0 = OK
#   1 = Fatal failure (cannot safely proceed)
#
set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info()    { echo -e "${BLUE}ℹ${NC} $1"; }
log_success() { echo -e "${GREEN}✓${NC} $1"; }
log_warning() { echo -e "${YELLOW}⚠${NC} $1"; }
log_error()   { echo -e "${RED}✗${NC} $1"; }

# Resolve repo root (assumes script lives in scripts/)
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
cd "$ROOT_DIR"

# Helper: run prisma using local install only (no network pulls)
prisma() {
  if npx --no-install prisma "$@" >/dev/null 2>&1; then
    npx --no-install prisma "$@"
  else
    # fallback (still local in most deployments, but allows npx default behavior)
    npx prisma "$@"
  fi
}

# Defense-in-depth: load .env if DATABASE_URL not present
if [ -z "${DATABASE_URL:-}" ]; then
  if [ -f "$ROOT_DIR/.env" ]; then
    log_info "DATABASE_URL not present in environment; sourcing $ROOT_DIR/.env (exporting variables)"
    # Export variables to subprocesses
    set -a
    # shellcheck disable=SC1090
    source "$ROOT_DIR/.env"
    set +a
  fi
fi

# Check if DATABASE_URL is set (now required)
if [ -z "${DATABASE_URL:-}" ]; then
  log_error "DATABASE_URL environment variable is not set"
  log_error "Ensure Step 7 exports env (set -a; source .env; set +a) OR .env contains export DATABASE_URL=..."
  exit 1
fi

# Detect database type
db_type="sqlite"
if [[ "$DATABASE_URL" == postgresql://* ]] || [[ "$DATABASE_URL" == postgres://* ]]; then
  db_type="postgresql"
elif [[ "$DATABASE_URL" == mysql://* ]]; then
  db_type="mysql"
elif [[ "$DATABASE_URL" == file:* ]]; then
  db_type="sqlite"
fi

log_info "Database type detected: $db_type"
log_info "DATABASE_URL is set"

check_sqlite() {
  log_info "Checking SQLite database path + permissions..."

  local db_path="${DATABASE_URL#file:}"

  # Normalize relative paths to absolute path based on repo root
  if [[ "$db_path" != /* ]]; then
    db_path="$ROOT_DIR/$db_path"
  fi

  local db_dir
  db_dir="$(dirname "$db_path")"

  if [ ! -d "$db_dir" ]; then
    log_warning "Database directory does not exist: $db_dir"
    mkdir -p "$db_dir"
    log_success "Created database directory: $db_dir"
  fi

  if [ ! -w "$db_dir" ]; then
    log_error "Cannot write to SQLite database directory: $db_dir"
    exit 1
  fi

  # Create/open the DB as a real check (preferred: sqlite3)
  if command -v sqlite3 >/dev/null 2>&1; then
    # This will create the DB if missing and validates we can open it
    sqlite3 "$db_path" "PRAGMA journal_mode=WAL; PRAGMA user_version;" >/dev/null
    log_success "SQLite database is writable and opens successfully: $db_path"
  else
    # fallback
    touch "$db_path"
    log_success "SQLite file is creatable: $db_path (sqlite3 not installed; skipped open test)"
  fi
}

check_prisma_db_execute_if_available() {
  # Best-effort: verify connectivity with prisma db execute if supported
  # Some Prisma versions may not support db execute; if not, we skip.
  local sql="SELECT 1;"
  log_info "Checking DB connectivity (best-effort)..."

  if prisma db execute --help >/dev/null 2>&1; then
    # Use stdin; works for postgres/mysql and also sqlite in many cases
    if echo "$sql" | prisma db execute --stdin >/dev/null 2>&1; then
      log_success "Database connectivity check succeeded (prisma db execute)"
      return 0
    fi
    log_error "Database connectivity check failed (prisma db execute)"
    return 1
  fi

  log_warning "Prisma CLI does not support 'db execute' on this version; skipping direct SQL connectivity check"
  return 0
}

validate_prisma_schema() {
  log_info "Validating Prisma schema..."
  prisma validate
  log_success "Prisma schema is valid"
}

check_migration_status() {
  log_info "Checking Prisma migration status..."
  # migrate status also validates DB connectivity; if it fails, it's fatal
  local out
  set +e
  out="$(prisma migrate status 2>&1)"
  local code=$?
  set -e

  if [ $code -ne 0 ]; then
    log_error "Migration status check failed:"
    echo "$out"
    exit 1
  fi

  log_success "Migration status command succeeded"

  # Soft signal (warning only): output text varies by Prisma version, so keep this non-fatal
  if echo "$out" | grep -qiE "pending|have not been applied|not yet applied"; then
    log_warning "Migrations appear pending/not applied. This is not fatal for validation, but deploy may require 'prisma migrate deploy'."
  fi
}

check_schema_sync_files() {
  log_info "Checking migrations directory..."
  if [ ! -d "$ROOT_DIR/prisma/migrations" ]; then
    log_warning "No prisma/migrations directory found"
    return 0
  fi

  local migration_count
  migration_count="$(find "$ROOT_DIR/prisma/migrations" -type f -name "*.sql" 2>/dev/null | wc -l | tr -d ' ')"
  if [ "${migration_count:-0}" -eq 0 ]; then
    log_warning "No migration SQL files found"
    return 0
  fi

  log_success "Found $migration_count migration SQL files"
}

main() {
  log_info "Starting database validation..."
  echo ""

  case "$db_type" in
    sqlite)
      check_sqlite
      ;;
    postgresql|mysql)
      # best-effort: confirm connectivity early
      check_prisma_db_execute_if_available
      ;;
    *)
      log_warning "Unknown DB type; proceeding with Prisma checks only"
      ;;
  esac

  validate_prisma_schema
  check_schema_sync_files
  check_migration_status

  log_success "Database validation completed successfully!"
}

main
