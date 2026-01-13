# Bootstrap Script Requirements

## Functional Requirements

### FR-001: Script Execution
- Script must execute successfully as `sudo bash scripts/bootstrap-ubuntu22.sh`
- Script must complete with zero errors
- Script must handle verification mode (`--verify` flag)

### FR-002: Package Installation
- Must install required system packages: nginx, sqlite3, certbot, python3-certbot-nginx, rsync, curl, git
- Must install Node.js 18.x from NodeSource repository
- Must install application dependencies via npm ci
- Must handle package installation failures gracefully with retries

### FR-003: User and Directory Setup
- Must create vantus user and group
- Must create required directories: /var/www/vantus, /var/log/vantus, /var/lib/vantus
- Must set proper ownership and permissions

### FR-004: Application Setup
- Must copy application files to /var/www/vantus
- Must install dependencies and build application
- Must configure systemd services

### FR-005: Environment Configuration
- Must generate /etc/default/vantus with all required variables
- Must include database credentials, API keys, Redis config, AWS settings
- Must set secure permissions (600, owned by vantus:vantus)

### FR-006: Interactive Configuration
- Must prompt user interactively for AWS usage
- Must skip AWS configuration if user declines
- Must configure Redis if requested

### FR-007: Nginx Configuration
- Must NOT modify /etc/nginx/* files
- Must generate config at config/nginx/vantus-web-app.conf
- Must integrate nginx config into bootstrap process

### FR-008: Redis Setup
- Must install and configure Redis server
- Must set Redis to listen on localhost only
- Must configure max memory and policy
- Must enable and start Redis service
- Must verify Redis connectivity
- Must update .env with REDIS_URL

### FR-009: Verification and Validation
- Must verify system state, security, dependencies, application
- Must generate error summaries
- Must handle idempotent operations

## Non-Functional Requirements

### NFR-001: Security
- All sensitive files must have 600 permissions
- Environment file must be owned by vantus:vantus
- No secrets in logs or client bundles
- Secure package installation with validation

### NFR-002: Reliability
- Comprehensive error handling with set -euo pipefail
- Idempotent operations (safe to run multiple times)
- Atomic operations where possible
- Proper rollback capabilities

### NFR-003: Observability
- Synchronous logging with timestamps
- Structured log format
- User-friendly colored output
- System logging to /var/log/vantus/bootstrap-*.log

### NFR-004: Performance
- Minimal execution time
- Efficient package installation
- Parallel operations where safe

### NFR-005: Maintainability
- Clear function structure
- Comprehensive comments
- Modular design
- Easy to debug and extend

## Acceptance Criteria

### AC-001: Zero Error Execution
- Script executes without syntax errors
- All function calls resolve correctly
- Conditional statements work properly
- No "command not found" errors

### AC-002: Complete Setup
- All required packages installed
- User/group/directory structure created
- Application deployed and running
- Environment properly configured
- Services enabled and started

### AC-003: Security Compliance
- File permissions set correctly
- Ownership set to vantus:vantus
- No world-writable files
- Secure defaults applied

### AC-004: Idempotent Operation
- Script can be run multiple times safely
- Existing configurations preserved
- No duplicate installations

### AC-005: User Experience
- Clear progress indicators
- Informative error messages
- Interactive prompts work correctly
- Verification mode provides useful output

## Constraints

### CON-001: Ubuntu 22.04 LTS
- Script designed specifically for Ubuntu 22.04 LTS
- Uses apt package manager
- Assumes systemd init system

### CON-002: Bare Metal/Edge Device
- No cloud provider assumptions
- Located behind reverse proxy
- Edge device routes traffic to server

### CON-003: Repository Structure
- Assumes git repository structure
- Expects config/ directory with nginx configs
- Expects systemd service files

## Assumptions

### ASS-001: Root Access
- Script assumes sudo/root execution
- System has internet access for package downloads

### ASS-002: Clean System
- Assumes relatively clean Ubuntu 22.04 installation
- May need to handle existing configurations carefully

### ASS-003: Repository Layout
- Assumes standard Next.js project structure
- Expects package.json and package-lock.json present