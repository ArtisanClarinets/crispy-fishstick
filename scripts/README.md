# Deployment Scripts

This directory contains scripts for deploying Vantus Systems to production.

## 🚀 Quick Start

For a complete automated setup on Ubuntu 22.04:

```bash
sudo bash scripts/bootstrap-ubuntu22.sh
```

This single command handles everything from user creation to SSL setup.

## 📜 Available Scripts

### `bootstrap-ubuntu22.sh`
**Complete production setup automation**

- Creates system user and directories
- Installs all dependencies (Node.js, Nginx, SQLite, Certbot)
- Deploys application files
- Runs interactive environment configuration
- Sets up database with migrations
- Builds the application
- Configures Nginx reverse proxy
- Sets up Systemd service
- Optionally installs SSL certificates

**Usage:**
```bash
sudo bash scripts/bootstrap-ubuntu22.sh
```

**Requirements:**
- Fresh Ubuntu 22.04 LTS server
- Root/sudo access
- DNS configured (vantus.systems pointing to server)

---

### `setup-env.js`
**Interactive environment configuration**

Walks you through setting up all environment variables:
- Core application settings (domain, port, database)
- Security secrets (auto-generated)
- Admin account credentials
- Optional features (Redis, S3, SMTP, etc.)

**Usage:**
```bash
node scripts/setup-env.js
```

**Features:**
- Auto-generates secure random secrets
- Validates input
- Provides helpful defaults
- Creates `.env` file or `/etc/default/vantus`

---

### `generate-nginx-config.mjs`
**Nginx configuration generator**

Generates production-ready Nginx configuration with:
- HTTP to HTTPS redirect
- www to non-www redirect
- Reverse proxy to Next.js
- Static file caching
- Security headers
- SSL placeholders for Certbot

**Usage:**
```bash
DEPLOY_DOMAIN=vantus.systems \
DEPLOY_ROOT=/var/www/vantus \
DEPLOY_PORT=3000 \
node scripts/generate-nginx-config.mjs
```

**Output:** `config/nginx/nginx.conf`

## 🔧 Configuration Files Generated

The scripts create/update these configurations:

```
config/
├── nginx/
│   └── nginx.conf           # Nginx reverse proxy config
├── systemd/
│   ├── vantus.service       # Systemd service (primary)
│   └── meb.service          # Legacy service name
└── supervisor/
    └── vantus.conf          # Supervisor config (alternative)
```

## 🌍 Environment Variables

All environment variables are configured via `setup-env.js`:

### Required Variables
- `NODE_ENV` - Environment mode
- `PORT` - Application port
- `DEPLOY_DOMAIN` - Primary domain
- `NEXTAUTH_URL` - Canonical URL
- `DATABASE_URL` - Database connection
- `NEXTAUTH_SECRET` - Session secret
- `MFA_ENCRYPTION_KEY` - MFA encryption
- `CRON_SECRET` - Cron authentication
- `ADMIN_BOOTSTRAP_EMAIL` - Admin email
- `ADMIN_BOOTSTRAP_PASSWORD` - Admin password

### Optional Variables
- `REDIS_URL` - Redis caching
- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET_NAME` - S3 storage
- `SMTP_*` - Email configuration
- `NEXT_PUBLIC_SENTRY_DSN` - Error tracking
- `NEXT_PUBLIC_GA_ID` - Analytics

## 📖 Documentation

See [PRODUCTION_DEPLOYMENT.md](../docs/PRODUCTION_DEPLOYMENT.md) for:
- Complete deployment guide
- Manual setup instructions
- Troubleshooting
- Common operations
- Security best practices

## 🔍 Script Details

### Bootstrap Script Flow

1. ✅ Create application user (`vantus`)
2. 📦 Install system dependencies
3. 📁 Create directory structure
4. 🚀 Deploy application files
5. ⚙️ Interactive environment setup
6. 📚 Install Node.js dependencies
7. 🗄️ Setup database & run migrations
8. 🏗️ Build Next.js application
9. 🌐 Configure Nginx
10. 🔧 Setup Systemd service
11. ▶️ Start application
12. 🔐 Optional SSL setup

### File Locations After Deployment

```
/var/www/vantus/          # Application
/var/log/vantus/          # Logs
/var/lib/vantus/          # Database & data
/etc/default/vantus       # Environment config
/etc/nginx/sites-enabled/ # Nginx config
/etc/systemd/system/      # Service file
```

## 🆘 Troubleshooting

### Script Fails During Setup

1. Check you're running as root: `sudo -i`
2. Verify internet connectivity
3. Check DNS is configured correctly
4. Review logs: `journalctl -xe`

### Permission Denied Errors

Ensure proper ownership:
```bash
sudo chown -R vantus:vantus /var/www/vantus
sudo chown -R vantus:vantus /var/lib/vantus
```

### Port Already in Use

Check what's using port 3000:
```bash
sudo lsof -i :3000
```

### Nginx Won't Start

Test configuration:
```bash
sudo nginx -t
```

View error logs:
```bash
sudo tail -f /var/log/nginx/error.log
```

## 🔄 Updating After Deployment

To update the application:

```bash
cd /var/www/vantus
sudo -u vantus git pull
sudo -u vantus npm ci
sudo -u vantus npx prisma migrate deploy
sudo -u vantus npm run build
sudo systemctl restart vantus.service
```

## 📝 Notes

- The bootstrap script is idempotent - safe to run multiple times
- Existing configurations are preserved
- Database is never deleted or overwritten
- All secrets are auto-generated securely
- SSL setup is optional but recommended

## 🔐 Security

- Environment file (`/etc/default/vantus`) has 600 permissions
- Application runs as non-root user (`vantus`)
- Systemd service includes security hardening
- All secrets are randomly generated
- Database is stored in `/var/lib/vantus` with proper permissions

---

For questions or issues, see the main [PRODUCTION_DEPLOYMENT.md](../docs/PRODUCTION_DEPLOYMENT.md) documentation.
