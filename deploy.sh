#!/usr/bin/env bash

################################################################################
# Production Deployment Script for Crispy Fishstick
# Port: 3005
# Purpose: Complete production lifecycle management (install, build, start)
# Usage: ./deploy.sh [--build-only|--start-only]
################################################################################

set -euo pipefail

# Color output for logging
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

# Logging functions
log_info() {
  echo -e "${BLUE}[INFO]${NC} $*" >&2
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $*" >&2
}

log_warn() {
  echo -e "${YELLOW}[WARN]${NC} $*" >&2
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $*" >&2
}

# Configuration
readonly PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly BUILD_DIR="${PROJECT_ROOT}/.next"
readonly STANDALONE_SERVER="${BUILD_DIR}/standalone/server.js"
readonly PORT=3005
readonly MIN_NODE_VERSION="20.9.0"
readonly LOG_FILE="${PROJECT_ROOT}/deployment.log"

# Cleanup function for graceful shutdown
cleanup() {
  local exit_code=$?
  if [ $exit_code -ne 0 ]; then
    log_error "Deployment failed with exit code $exit_code"
  fi
  exit $exit_code
}

trap cleanup EXIT
trap 'log_error "Deployment interrupted"; exit 130' INT TERM

################################################################################
# Validation Functions
################################################################################

# Check if Node.js version meets minimum requirement
check_node_version() {
  log_info "Checking Node.js version..."
  
  if ! command -v node &> /dev/null; then
    log_error "Node.js is not installed"
    return 1
  fi
  
  local node_version
  node_version=$(node --version | cut -d'v' -f2)
  
  log_info "Found Node.js v${node_version}"
  
  # Simple version comparison (v20.9.0 format)
  if ! node -e "
    const required = '${MIN_NODE_VERSION}'.split('.').map(Number);
    const actual = process.version.slice(1).split('.').map(Number);
    if (actual[0] < required[0] || 
        (actual[0] === required[0] && actual[1] < required[1]) ||
        (actual[0] === required[0] && actual[1] === required[1] && actual[2] < required[2])) {
      process.exit(1);
    }
  "; then
    log_error "Node.js v${MIN_NODE_VERSION} or higher is required (found v${node_version})"
    return 1
  fi
  
  log_success "Node.js version check passed"
  return 0
}

# Check for required environment variables
check_environment() {
  log_info "Checking environment configuration..."
  
  # Get environment from NODE_ENV or default to production
  local node_env="${NODE_ENV:-production}"
  
  if [ "${node_env}" != "production" ]; then
    log_warn "NODE_ENV is '${node_env}' (not 'production'). Setting to production."
    export NODE_ENV="production"
  fi
  
  # Check for required auth variables if .env.production doesn't exist
  local env_file="${PROJECT_ROOT}/.env.production"
  local env_local="${PROJECT_ROOT}/.env.local"
  
  if [ ! -f "${env_file}" ] && [ ! -f "${env_local}" ]; then
    log_warn "No .env.production or .env.local file found"
    log_info "Checking for required environment variables in shell..."
    
    # These are checked at build time, but we validate them here
    if [ -z "${NEXTAUTH_SECRET:-}" ]; then
      log_error "NEXTAUTH_SECRET environment variable is not set"
      log_info "Please set: export NEXTAUTH_SECRET='<your-secret>'"
      return 1
    fi
    
    if [ -z "${NEXTAUTH_URL:-}" ]; then
      log_warn "NEXTAUTH_URL not set; defaulting to http://localhost"
      export NEXTAUTH_URL="http://localhost"
    fi
  else
    if [ -f "${env_file}" ]; then
      log_info "Loading .env.production"
      # shellcheck disable=SC1090
      source "${env_file}" || log_warn "Failed to source .env.production"
    fi
    if [ -f "${env_local}" ]; then
      log_info "Loading .env.local"
      # shellcheck disable=SC1090
      source "${env_local}" || log_warn "Failed to source .env.local"
    fi
  fi
  
  log_success "Environment configuration validated"
  return 0
}

# Check for database connectivity (if needed)
check_database() {
  log_info "Checking database connectivity..."
  
  local database_url="${DATABASE_URL:-}"
  
  if [ -z "${database_url}" ]; then
    log_warn "DATABASE_URL not set; skipping database check"
    return 0
  fi
  
  # Basic URL validation (not a connection test)
  if [[ ! "${database_url}" =~ ^postgresql:// ]] && [[ ! "${database_url}" =~ ^postgresql\+prisma:// ]]; then
    log_error "DATABASE_URL does not appear to be a valid PostgreSQL connection string"
    return 1
  fi
  
  log_success "Database URL format validated"
  return 0
}

################################################################################
# Build Functions
################################################################################

# Install production dependencies
install_dependencies() {
  log_info "Installing production dependencies..."
  
  if [ ! -f "${PROJECT_ROOT}/package.json" ]; then
    log_error "package.json not found in project root"
    return 1
  fi
  
  cd "${PROJECT_ROOT}"
  
  if ! npm install --production 2>&1 | tee -a "${LOG_FILE}"; then
    log_error "npm install failed; check ${LOG_FILE} for details"
    return 1
  fi
  
  log_success "Production dependencies installed"
  return 0
}

# Build the application
build_application() {
  log_info "Building application..."
  
  cd "${PROJECT_ROOT}"
  
  # Run build with required environment variables
  export NODE_ENV="production"
  
  # Set defaults for build if not already set
  export NEXTAUTH_URL="${NEXTAUTH_URL:-http://localhost}"
  export NEXTAUTH_SECRET="${NEXTAUTH_SECRET:-$(openssl rand -base64 32)}"
  
  if ! npm run build 2>&1 | tee -a "${LOG_FILE}"; then
    log_error "Build failed; check ${LOG_FILE} for details"
    return 1
  fi
  
  log_success "Build completed successfully"
  return 0
}

# Verify build artifacts
verify_build() {
  log_info "Verifying build artifacts..."
  
  if [ ! -d "${BUILD_DIR}" ]; then
    log_error ".next directory not found at ${BUILD_DIR}"
    return 1
  fi
  
  if [ ! -f "${STANDALONE_SERVER}" ]; then
    log_error "Standalone server not found at ${STANDALONE_SERVER}"
    log_info "This may indicate the build failed or Next.js standalone output is not configured"
    return 1
  fi
  
  local build_size
  build_size=$(du -sh "${BUILD_DIR}" | cut -f1)
  log_info "Build artifact size: ${build_size}"
  
  log_success "Build artifacts verified"
  return 0
}

################################################################################
# Startup Functions
################################################################################

# Start the production server
start_server() {
  log_info "Starting application on port ${PORT}..."
  
  cd "${PROJECT_ROOT}"
  
  # Ensure we're in production mode
  export NODE_ENV="production"
  
  # Set the port (Next.js standalone expects PORT env var or --port flag)
  export PORT="${PORT}"
  
  log_info "Application configuration:"
  log_info "  Working Directory: ${PROJECT_ROOT}"
  log_info "  Server Binary: ${STANDALONE_SERVER}"
  log_info "  Port: ${PORT}"
  log_info "  NODE_ENV: ${NODE_ENV}"
  
  # Start the server
  # shellcheck disable=SC2086
  if ! exec node "${STANDALONE_SERVER}" 2>&1 | tee -a "${LOG_FILE}"; then
    log_error "Server startup failed"
    return 1
  fi
}

################################################################################
# Main Orchestration
################################################################################

main() {
  log_info "================================"
  log_info "Crispy Fishstick Deployment"
  log_info "Port: ${PORT}"
  log_info "Timestamp: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  log_info "================================"
  
  # Parse command-line arguments
  local build_only=0
  local start_only=0
  
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --build-only)
        build_only=1
        ;;
      --start-only)
        start_only=1
        ;;
      -h|--help)
        show_help
        return 0
        ;;
      *)
        log_error "Unknown option: $1"
        show_help
        return 1
        ;;
    esac
    shift
  done
  
  # Full deployment flow
  if [ $build_only -eq 0 ] && [ $start_only -eq 0 ]; then
    log_info "Running full deployment (build + start)"
    
    check_node_version || return 1
    check_environment || return 1
    check_database || return 1
    
    install_dependencies || return 1
    build_application || return 1
    verify_build || return 1
    
    log_success "All pre-flight checks passed. Starting server..."
    start_server
  
  # Build-only mode
  elif [ $build_only -eq 1 ]; then
    if [ $start_only -eq 1 ]; then
      log_error "Cannot specify both --build-only and --start-only"
      return 1
    fi
    
    log_info "Running build phase only"
    
    check_node_version || return 1
    check_environment || return 1
    
    install_dependencies || return 1
    build_application || return 1
    verify_build || return 1
    
    log_success "Build completed successfully"
    log_info "To start the server, run: npm start or ./deploy.sh --start-only"
  
  # Start-only mode
  elif [ $start_only -eq 1 ]; then
    log_info "Running start phase only"
    
    check_node_version || return 1
    
    if [ ! -f "${STANDALONE_SERVER}" ]; then
      log_error "Build artifacts not found. Run './deploy.sh --build-only' first"
      return 1
    fi
    
    verify_build || return 1
    start_server
  fi
}

show_help() {
  cat <<EOF
Usage: ./deploy.sh [OPTIONS]

Deploy and start the Crispy Fishstick application on port ${PORT}.

OPTIONS:
  --build-only      Only build the application, do not start
  --start-only      Only start the application (assumes build exists)
  -h, --help        Show this help message

ENVIRONMENT VARIABLES:
  NODE_ENV          Set to 'production' (default: production)
  NEXTAUTH_URL      NextAuth.js callback URL (required for build)
  NEXTAUTH_SECRET   NextAuth.js secret (required for build)
  DATABASE_URL      Database connection string (optional)
  PORT              Application port (default: ${PORT})

EXAMPLES:
  # Full deployment
  ./deploy.sh
  
  # Build only
  ./deploy.sh --build-only
  
  # Start only (after build)
  ./deploy.sh --start-only
  
  # With environment variables
  export NODE_ENV=production
  export NEXTAUTH_SECRET="your-secret-here"
  export NEXTAUTH_URL="https://example.com"
  ./deploy.sh

LOGS:
  Deployment logs are written to: ${LOG_FILE}

EOF
}

# Run main function
main "$@"