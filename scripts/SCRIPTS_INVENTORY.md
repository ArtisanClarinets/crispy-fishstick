# Vantus Systems - Scripts Inventory & Status

Last Updated: 2026-01-13

## Production Bootstrap & Deployment

### `bootstrap-ubuntu22.sh` ⭐ **CORE - PRODUCTION-GRADE**
**Status**: ✅ Fully Implemented & Tested  
**Purpose**: Complete production bootstrap script for Ubuntu 22.04 LTS  
**Usage**: `sudo bash scripts/bootstrap-ubuntu22.sh` or `sudo bash scripts/bootstrap-ubuntu22.sh --verify`

**Features**:
- ✓ Fortune-500 hardened error handling & logging
- ✓ Comprehensive system & security verification
- ✓ Idempotent operations (safe to re-run)
- ✓ User/group creation with permissions
- ✓ System package installation (nginx, sqlite3, certbot, etc.)
- ✓ Node.js 22 LTS installation via NodeSource
- ✓ Application dependency & build setup
- ✓ Nginx reverse proxy configuration
- ✓ Systemd service installation
- ✓ Full error recovery with rollback support

**Workflow** (11 steps):
1. System & Security Verification
2. User & Group Setup
3. Directory Structure Setup
4. Environment Configuration
5. Secure Package Installation
6. Application Setup
7. Dependency Installation
8. Application Build
9. Nginx Configuration
10. Systemd Service Configuration
11. Final Verification

---

## Configuration Generation

### `generate-nginx-config.mjs` ⭐ **CORE**
**Status**: ✅ Fully Functional  
**Purpose**: Generate production-ready Nginx reverse proxy configuration  
**Usage**: `DEPLOY_DOMAIN=vantus.systems DEPLOY_PORT=3005 node scripts/generate-nginx-config.mjs`

**Features**:
- ✓ HTTP/HTTPS mode detection (checks for Let's Encrypt certs)
- ✓ Automatic HTTP→HTTPS redirect (if TLS available)
- ✓ Reverse proxy to Next.js application
- ✓ Static asset caching headers
- ✓ Security headers (CSP, HSTS, etc.)
- ✓ WebSocket support
- ✓ ACME challenge support for certbot

**Output**: `config/nginx/nginx.conf`

### `generate-build-proof.mjs` ⭐ **CORE**
**Status**: ✅ Fully Functional  
**Purpose**: Generate build proof artifact with quality gate status  
**Usage**: Automatically called via `postinstall.js` hook

**Output**: `public/proof/build.json`  
**Captures**:
- Git commit SHA
- Build timestamp
- Dependencies SHA256
- Quality gate results (ESLint, Vitest, Playwright)

---

## Database Management

### `database-backup.sh` ⭐ **CORE - PRODUCTION**
**Status**: ✅ Fully Functional  
**Purpose**: Secure database backup and recovery with encryption  
**Usage**:
```bash
sudo bash scripts/database-backup.sh backup [name]     # Create backup
sudo bash scripts/database-backup.sh restore [name]    # Restore backup
sudo bash scripts/database-backup.sh verify [name]     # Verify backup
sudo bash scripts/database-backup.sh list              # List backups
```

**Features**:
- ✓ Multi-database support (SQLite, PostgreSQL, MySQL)
- ✓ Atomic operations with locking
- ✓ Backup verification & integrity checking
- ✓ 90-day retention policy
- ✓ Least privilege execution
- ✓ Comprehensive audit logging

### `validate-database.sh` ⭐ **CORE**
**Status**: ✅ Fully Functional  
**Purpose**: Validate database connectivity & Prisma readiness  
**Usage**: `bash scripts/validate-database.sh`

**Checks**:
- ✓ DATABASE_URL environment variable
- ✓ Database type detection & connectivity
- ✓ Prisma schema validation
- ✓ Migration status
- ✓ Schema sync verification

---

## Environment & Permissions

### `setup-env.js` ⭐ **CORE**
**Status**: ✅ Fully Functional  
**Purpose**: Interactive environment configuration setup  
**Usage**: `node scripts/setup-env.js`

**Features**:
- ✓ Interactive questionnaire for all env vars
- ✓ Auto-generates secure random secrets
- ✓ Database URL validation
- ✓ Admin bootstrap credentials
- ✓ Optional features (Redis, S3, SMTP)
- ✓ Safe environment file writing

### `validate-file-permissions.sh` ✅
**Status**: Fully Functional  
**Purpose**: Validate sensitive file permissions & ownership  
**Usage**: `bash scripts/validate-file-permissions.sh`

**Checks**:
- ✓ /var/www/vantus/.env (600, vantus:vantus)
- ✓ /etc/default/vantus (600, vantus:vantus)

---

## Admin Tools

### `check-permissions.ts` ✅
**Status**: Fully Functional  
**Purpose**: Read-only permission inspector  
**Usage**: `npx tsx scripts/check-permissions.ts --email=admin@example.com`

### `verify-admin.ts` ✅
**Status**: Fully Functional  
**Purpose**: Verify admin bootstrap state  
**Usage**: `npx tsx scripts/verify-admin.ts [--email=...] [--password=...]`

**Checks**:
- ✓ Admin user exists
- ✓ Role assignments (Owner, Admin)
- ✓ Password hash verification (optional)
- ✓ MFA status

### `reset-mfa.ts` ✅
**Status**: Fully Functional  
**Purpose**: Admin MFA reset for user accounts  
**Usage**: `npx tsx scripts/reset-mfa.ts --email=user@example.com --yes`

**Safety**: Requires `--yes` flag to prevent accidental execution

### `update-permissions.ts` ✅
**Status**: Fully Functional  
**Purpose**: Manage role permissions (RBAC)  
**Usage**:
```bash
npx tsx scripts/update-permissions.ts --role=Owner --add=users:read
npx tsx scripts/update-permissions.ts --role=Owner --remove=users:delete
```

---

## Testing & Validation

### `test-bootstrap-workflow.sh` ✅
**Status**: Fully Functional  
**Purpose**: Validate bootstrap script structure & dependencies  
**Usage**: `bash scripts/test-bootstrap-workflow.sh`

**Tests**:
- ✓ Database validation script
- ✓ File permission validation script
- ✓ Setup environment script
- ✓ Nginx generation script
- ✓ Configuration files exist
- ✓ Environment file structure
- ✓ Prisma configuration
- ✓ package.json scripts
- ✓ Bootstrap script structure
- ✓ Error handling presence
- ✓ Retry logic presence

### `test-port-configuration.sh` ✅
**Status**: Fully Functional  
**Purpose**: Verify consistent port configuration across all components  
**Usage**: `bash scripts/test-port-configuration.sh`

**Checks**:
- ✓ .env file uses PORT=3005
- ✓ Nginx config uses 3005 in proxy_pass
- ✓ Supervisor config uses 3005
- ✓ Systemd service config uses 3005
- ✓ Edge device configs use 3005

### `smoke-test.ts` ✅
**Status**: Fully Functional  
**Purpose**: Production smoke test for deployed application  
**Usage**: `npx tsx scripts/smoke-test.ts --base=https://vantus.systems`

**Tests**:
- ✓ Homepage loads (/)
- ✓ NextAuth API responds (/api/auth/session)
- ✓ Health check endpoint (optional)

### `validate-file-permissions-test.sh` ✅
**Status**: Fully Functional  
**Purpose**: Test file permission validation logic  
**Usage**: `bash scripts/validate-file-permissions-test.sh`

---

## Utilities

### `worker.ts` ✅
**Status**: Fully Functional  
**Purpose**: Background worker entrypoint  
**Usage**: `npx tsx scripts/worker.ts`

**Features**:
- ✓ Graceful shutdown on SIGTERM/SIGINT
- ✓ Unhandled rejection logging
- ✓ Clean environment loading from .env

### `postinstall.js` ✅
**Status**: Fully Functional  
**Purpose**: npm postinstall hook  
**Usage**: Automatically called by `npm install`

**Actions**:
- ✓ Node.js version check (warning if < 20.9)
- ✓ Build proof artifact generation

---

## Documentation

### `README.md` ✅
Complete deployment scripts documentation with quick-start guide

### `DATABASE_README.md` ✅
Database management documentation for backup/recovery operations

---

## Deprecated / Removed

### ~~`reset-mfa.js`~~ ❌ **REMOVED**
**Reason**: Compiled version of `reset-mfa.ts` - redundant when using `npx tsx`  
**Removal Date**: 2026-01-13  
**Replacement**: Use `npx tsx scripts/reset-mfa.ts` directly

---

## Script Categorization Summary

| Category | Scripts | Status |
|----------|---------|--------|
| Core Bootstrap | bootstrap-ubuntu22.sh | ✅ Active |
| Config Generation | generate-nginx-config.mjs, generate-build-proof.mjs | ✅ Active |
| Database | database-backup.sh, validate-database.sh | ✅ Active |
| Environment | setup-env.js, validate-file-permissions.sh | ✅ Active |
| Admin Tools | check-permissions.ts, verify-admin.ts, reset-mfa.ts, update-permissions.ts | ✅ Active |
| Testing | test-bootstrap-workflow.sh, test-port-configuration.sh, smoke-test.ts, validate-file-permissions-test.sh | ✅ Active |
| Utilities | worker.ts, postinstall.js | ✅ Active |
| Documentation | README.md, DATABASE_README.md | ✅ Active |
| **Total Active** | **20 files** | |

---

## Quality Gates

All scripts have been validated:

- ✅ Shell scripts: `bash -n` validation
- ✅ JavaScript/TypeScript: ESLint compliance
- ✅ Executable permissions verified
- ✅ Documentation complete
- ✅ Production-ready error handling

---

## Notes

- **Bootstrap Verification**: Run `sudo bash scripts/bootstrap-ubuntu22.sh --verify` anytime to verify the full deployment state
- **Port Configuration**: All components consistently use PORT=3005 for the Next.js application
- **Edge Device Configs**: `config/nginx/edge_device/*` are never modified by bootstrap (manual deployment only)
- **Security**: All sensitive operations require root or specific permissions
- **Idempotency**: All scripts are idempotent (safe to re-run)
