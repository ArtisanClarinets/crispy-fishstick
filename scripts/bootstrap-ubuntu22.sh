#!/bin/bash
set -e

# ═══════════════════════════════════════════════════════════════════════
#  Vantus Systems - Ubuntu 22.04 Production Bootstrap Script
# ═══════════════════════════════════════════════════════════════════════
#
#  This script automates the complete setup of the Vantus Systems app
#  on a fresh Ubuntu 22.04 server. It handles:
#    - User creation
#    - Dependency installation (Node.js, Nginx, SQLite, Certbot)
#    - Application deployment
#    - Database setup and migrations
#    - Nginx reverse proxy configuration
#    - Systemd service setup
#    - SSL certificate generation
#
#  Usage: sudo bash scripts/bootstrap-ubuntu22.sh
#
# ═══════════════════════════════════════════════════════════════════════

# Configuration
APP_USER="vantus"
APP_GROUP="vantus"
APP_DIR="/var/www/vantus"
LOG_DIR="/var/log/vantus"
DATA_DIR="/var/lib/vantus"
ENV_FILE="/etc/default/vantus"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

log_section() {
    echo ""
    echo "═══════════════════════════════════════════════════════════════"
    echo "  $1"
    echo "═══════════════════════════════════════════════════════════════"
    echo ""
}

# Ensure running as root
if [ "$EUID" -ne 0 ]; then
  log_error "Please run this script as root or with sudo"
  exit 1
fi

log_section "🚀 Vantus Systems - Production Bootstrap"
log_info "Starting automated setup for Ubuntu 22.04..."

# ═══════════════════════════════════════════════════════════════════════
#  STEP 1: Create Application User
# ═══════════════════════════════════════════════════════════════════════

log_section "STEP 1: Creating Application User"

if id "$APP_USER" &>/dev/null; then
    log_warning "User $APP_USER already exists, skipping creation"
else
    log_info "Creating system user: $APP_USER"
    useradd -r -s /bin/bash -d "$APP_DIR" -m "$APP_USER"
    log_success "User $APP_USER created"
fi

# ═══════════════════════════════════════════════════════════════════════
#  STEP 2: Install System Dependencies
# ═══════════════════════════════════════════════════════════════════════

log_section "STEP 2: Installing System Dependencies"

# Update package lists
log_info "Updating package lists..."
apt-get update -qq

# Install Node.js 20.x if not already installed
if ! command -v node &> /dev/null; then
    log_info "Installing Node.js 20.x..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    log_success "Node.js $(node --version) installed"
else
    log_success "Node.js $(node --version) already installed"
fi

# Install other dependencies
log_info "Installing Nginx, SQLite, Certbot, and utilities..."
apt-get install -y nginx sqlite3 certbot python3-certbot-nginx rsync curl git

log_success "All system dependencies installed"

# ═══════════════════════════════════════════════════════════════════════
#  STEP 3: Setup Directories
# ═══════════════════════════════════════════════════════════════════════

log_section "STEP 3: Setting Up Application Directories"

log_info "Creating directory structure..."
mkdir -p "$APP_DIR"
mkdir -p "$LOG_DIR"
mkdir -p "$DATA_DIR"

log_info "Setting proper ownership..."
chown -R "$APP_USER:$APP_GROUP" "$APP_DIR"
chown -R "$APP_USER:$APP_GROUP" "$LOG_DIR"
chown -R "$APP_USER:$APP_GROUP" "$DATA_DIR"

log_success "Directory structure created"

# ═══════════════════════════════════════════════════════════════════════
#  STEP 4: Copy Application Files
# ═══════════════════════════════════════════════════════════════════════

log_section "STEP 4: Deploying Application Files"

log_info "Syncing application files to $APP_DIR..."

# Determine source directory (assumes script is in project root/scripts/)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

if [ ! -f "$PROJECT_ROOT/package.json" ]; then
    log_error "package.json not found. Are you running this from the project directory?"
    exit 1
fi

# Sync files, excluding build artifacts and development files
rsync -av \
    --exclude 'node_modules' \
    --exclude '.next' \
    --exclude '.git' \
    --exclude '.env' \
    --exclude '.env.local' \
    --exclude 'dev.db' \
    --exclude 'test-results' \
    --exclude 'playwright-report' \
    "$PROJECT_ROOT/" "$APP_DIR/"

chown -R "$APP_USER:$APP_GROUP" "$APP_DIR"
log_success "Application files deployed"

# ═══════════════════════════════════════════════════════════════════════
#  STEP 5: Interactive Environment Setup
# ═══════════════════════════════════════════════════════════════════════

log_section "STEP 5: Environment Configuration"

log_info "Starting interactive environment setup..."
log_warning "This will ask you questions about your deployment configuration"
echo ""

cd "$APP_DIR"

# Run setup as the app user, but with sudo to write to /etc/default/
sudo -u "$APP_USER" NODE_ENV=production node scripts/setup-env.js

# If .env was created in APP_DIR, move it to proper location
if [ -f "$APP_DIR/.env" ]; then
    log_info "Moving environment file to $ENV_FILE..."
    mv "$APP_DIR/.env" "$ENV_FILE"
    chown root:root "$ENV_FILE"
    chmod 600 "$ENV_FILE"
    log_success "Environment file secured at $ENV_FILE"
fi

if [ ! -f "$ENV_FILE" ]; then
    log_error "Environment file not created. Cannot proceed."
    exit 1
fi

log_success "Environment configuration complete"

# ═══════════════════════════════════════════════════════════════════════
#  STEP 6: Install Node Dependencies
# ═══════════════════════════════════════════════════════════════════════

log_section "STEP 6: Installing Node.js Dependencies"

cd "$APP_DIR"

log_info "Installing production dependencies (this may take a few minutes)..."
sudo -u "$APP_USER" npm ci --production=false

log_success "Node.js dependencies installed"

# ═══════════════════════════════════════════════════════════════════════
#  STEP 7: Database Setup
# ═══════════════════════════════════════════════════════════════════════

log_section "STEP 7: Database Setup & Migrations"

cd "$APP_DIR"

# Source environment for database URL
set -a
source "$ENV_FILE"
set +a

log_info "Generating Prisma client..."
sudo -u "$APP_USER" npx prisma generate

log_info "Running database migrations..."
sudo -u "$APP_USER" npx prisma migrate deploy

log_info "Seeding database with admin user..."
sudo -u "$APP_USER" npx prisma db seed || log_warning "Database seeding failed (may already be seeded)"

log_success "Database setup complete"

# ═══════════════════════════════════════════════════════════════════════
#  STEP 8: Build Application
# ═══════════════════════════════════════════════════════════════════════

log_section "STEP 8: Building Next.js Application"

cd "$APP_DIR"

log_info "Building production bundle (this may take several minutes)..."
sudo -u "$APP_USER" npm run build

log_success "Application built successfully"

# ═══════════════════════════════════════════════════════════════════════
#  STEP 9: Generate & Configure Nginx
# ═══════════════════════════════════════════════════════════════════════

log_section "STEP 9: Configuring Nginx Reverse Proxy"

cd "$APP_DIR"

# Load DEPLOY_DOMAIN from env file
DEPLOY_DOMAIN=$(grep DEPLOY_DOMAIN "$ENV_FILE" | cut -d '=' -f2 | tr -d '"' | tr -d "'")
DEPLOY_PORT=$(grep PORT "$ENV_FILE" | cut -d '=' -f2 | tr -d '"' | tr -d "'")

if [ -z "$DEPLOY_DOMAIN" ]; then
    log_warning "DEPLOY_DOMAIN not found in $ENV_FILE, using default: vantus.systems"
    DEPLOY_DOMAIN="vantus.systems"
fi

if [ -z "$DEPLOY_PORT" ]; then
    DEPLOY_PORT="3000"
fi

log_info "Generating Nginx configuration for $DEPLOY_DOMAIN..."
sudo -u "$APP_USER" DEPLOY_DOMAIN="$DEPLOY_DOMAIN" DEPLOY_ROOT="$APP_DIR" DEPLOY_PORT="$DEPLOY_PORT" node scripts/generate-nginx-config.mjs

log_info "Installing Nginx configuration..."
cp "$APP_DIR/config/nginx/nginx.conf" "/etc/nginx/sites-available/vantus.conf"
ln -sf "/etc/nginx/sites-available/vantus.conf" "/etc/nginx/sites-enabled/"

# Remove default site if it exists
if [ -L "/etc/nginx/sites-enabled/default" ]; then
    log_info "Removing default Nginx site..."
    rm -f "/etc/nginx/sites-enabled/default"
fi

# Test nginx config
log_info "Testing Nginx configuration..."
if nginx -t; then
    log_success "Nginx configuration is valid"
    systemctl reload nginx
    log_success "Nginx reloaded"
else
    log_error "Nginx configuration test failed!"
    exit 1
fi

# ═══════════════════════════════════════════════════════════════════════
#  STEP 10: Configure Systemd Service
# ═══════════════════════════════════════════════════════════════════════

log_section "STEP 10: Configuring Systemd Service"

log_info "Installing systemd service file..."
cp "$APP_DIR/config/systemd/vantus.service" "/etc/systemd/system/"

log_info "Reloading systemd daemon..."
systemctl daemon-reload

log_info "Enabling Vantus service..."
systemctl enable vantus.service

log_success "Systemd service configured"

# ═══════════════════════════════════════════════════════════════════════
#  STEP 11: Start Application
# ═══════════════════════════════════════════════════════════════════════

log_section "STEP 11: Starting Application"

log_info "Starting Vantus service..."
systemctl start vantus.service

# Wait a moment for service to start
sleep 3

if systemctl is-active --quiet vantus.service; then
    log_success "Vantus service is running!"
else
    log_error "Failed to start Vantus service"
    log_info "Check logs with: journalctl -u vantus.service -n 50"
    exit 1
fi

# ═══════════════════════════════════════════════════════════════════════
#  STEP 12: SSL Certificate Setup
# ═══════════════════════════════════════════════════════════════════════

log_section "STEP 12: SSL Certificate Setup"

echo ""
log_info "The application is now running on HTTP"
log_info "Domain: $DEPLOY_DOMAIN"
log_info "To enable HTTPS with Let's Encrypt, you need to:"
echo ""
echo "   1. Ensure your DNS is pointing to this server:"
echo "      - $DEPLOY_DOMAIN -> $(curl -s ifconfig.me)"
echo "      - www.$DEPLOY_DOMAIN -> $(curl -s ifconfig.me)"
echo ""
echo "   2. Run Certbot to obtain SSL certificates:"
echo "      ${GREEN}sudo certbot --nginx -d $DEPLOY_DOMAIN -d www.$DEPLOY_DOMAIN${NC}"
echo ""

read -p "Would you like to run Certbot now? (y/N): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    log_info "Running Certbot..."
    certbot --nginx -d "$DEPLOY_DOMAIN" -d "www.$DEPLOY_DOMAIN"
    
    if [ $? -eq 0 ]; then
        log_success "SSL certificates installed successfully!"
    else
        log_warning "Certbot failed. You can run it manually later."
    fi
else
    log_info "Skipping Certbot. You can run it manually later."
fi

# ═══════════════════════════════════════════════════════════════════════
#  FINAL SUMMARY
# ═══════════════════════════════════════════════════════════════════════

log_section "✅ Bootstrap Complete!"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "                    🎉 Setup Summary 🎉"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "  Application:     Vantus Systems"
echo "  Domain:          $DEPLOY_DOMAIN"
echo "  Installation:    $APP_DIR"
echo "  Service:         vantus.service"
echo "  Status:          $(systemctl is-active vantus.service)"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "                    📝 Useful Commands"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "  View logs:       journalctl -u vantus.service -f"
echo "  Restart app:     systemctl restart vantus.service"
echo "  Stop app:        systemctl stop vantus.service"
echo "  Check status:    systemctl status vantus.service"
echo "  Test Nginx:      nginx -t"
echo "  Reload Nginx:    systemctl reload nginx"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "                    🔐 Security Notes"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "  ✓ Environment file: $ENV_FILE (600 permissions)"
echo "  ✓ Database:         $DATA_DIR/prod.db"
echo "  ✓ Logs:             $LOG_DIR/"
echo ""
echo "  ⚠  Remember to:"
echo "     - Change the admin password after first login"
echo "     - Set up firewall rules (ufw allow 80, 443, 22)"
echo "     - Configure automated backups"
echo "     - Monitor logs regularly"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "  🌐 Access your app at: https://$DEPLOY_DOMAIN/admin"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""

log_success "Vantus Systems is ready for production!"
