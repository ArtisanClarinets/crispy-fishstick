#!/bin/bash
set -e

# Configuration
APP_USER="meb"
APP_DIR="/opt/meb/app"

echo "🚀 Bootstrapping Ubuntu 22.04 for MEB App..."

# Ensure running as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit 1
fi

# 1. Create User
if ! id "$APP_USER" &>/dev/null; then
    echo "Creating user $APP_USER..."
    useradd -r -s /bin/bash -d "$APP_DIR" -m "$APP_USER"
fi

# 2. Install Dependencies
echo "Installing Node.js, Nginx, SQLite..."
# Check if node is installed, if not install it
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi

apt-get update
apt-get install -y nginx sqlite3 certbot python3-certbot-nginx rsync

# 3. Setup Directories
echo "Setting up directories..."
mkdir -p "$APP_DIR"
chown -R "$APP_USER:$APP_USER" "$APP_DIR"
mkdir -p /var/log/meb
chown -R "$APP_USER:$APP_USER" /var/log/meb
mkdir -p /var/lib/meb
chown -R "$APP_USER:$APP_USER" /var/lib/meb

# 4. Copy Application
echo "Copying application files to $APP_DIR..."
# We assume this script is run from the project root
rsync -av --exclude 'node_modules' --exclude '.next' --exclude '.git' . "$APP_DIR/"
chown -R "$APP_USER:$APP_USER" "$APP_DIR"

# 5. Build
echo "Building application..."
cd "$APP_DIR"
# Switch to app user for build
echo "Installing dependencies..."
sudo -u "$APP_USER" npm ci
echo "Generating Prisma client..."
sudo -u "$APP_USER" npx prisma generate
echo "Building Next.js app..."
sudo -u "$APP_USER" npm run build

# 6. Configure Nginx
echo "Configuring Nginx..."
# Generate config using the app user context/env if possible, but here we run as root
# We need to set env vars for the generation script
export DEPLOY_DOMAIN=${DEPLOY_DOMAIN:-example.com}
export DEPLOY_ROOT="$APP_DIR"
export DEPLOY_PORT=3000

sudo -u "$APP_USER" DEPLOY_DOMAIN=$DEPLOY_DOMAIN DEPLOY_ROOT=$DEPLOY_ROOT DEPLOY_PORT=$DEPLOY_PORT npm run generate:nginx

cp config/nginx/nginx.conf /etc/nginx/sites-available/meb.conf
ln -sf /etc/nginx/sites-available/meb.conf /etc/nginx/sites-enabled/
# Remove default if it exists
rm -f /etc/nginx/sites-enabled/default

# Test nginx config
nginx -t
systemctl reload nginx

# 7. Configure Systemd
echo "Configuring Systemd..."
cp config/systemd/meb.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable meb.service

# 8. Env File
if [ ! -f /etc/default/meb ]; then
    echo "Creating /etc/default/meb..."
    cp .env.example /etc/default/meb
    chown root:root /etc/default/meb
    chmod 600 /etc/default/meb
    echo "⚠️  Created /etc/default/meb. Please edit it with production secrets!"
fi

echo "✅ Bootstrap complete!"
echo "Next steps:"
echo "1. Edit /etc/default/meb with real secrets (NEXTAUTH_SECRET, DATABASE_URL)"
echo "   Note: Ensure DATABASE_URL points to a valid location (e.g. file:/var/lib/meb/prod.db)"
echo "2. Run 'certbot --nginx' to enable HTTPS"
echo "3. Start service: systemctl start meb"
