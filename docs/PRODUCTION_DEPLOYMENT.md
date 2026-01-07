# Vantus Systems - Production Deployment Guide

Complete guide for deploying Vantus Systems to production on Ubuntu 22.04 LTS.

## 📋 Prerequisites

Before running the bootstrap script, ensure you have:

- **Fresh Ubuntu 22.04 LTS server** with root access
- **Domain configured**: DNS A records for `vantus.systems` and `www.vantus.systems` pointing to your server IP
- **Port 80 and 443** open in your firewall
- **At least 2GB RAM** and 20GB disk space
- **SSH access** to the server

## 🚀 Quick Start (Automated Setup)

The automated bootstrap script handles everything:

1. **Clone the repository on your server:**
   ```bash
   git clone https://github.com/Thompson-Development/crispy-fishstick.git
   cd crispy-fishstick
   ```

2. **Run the bootstrap script as root:**
   ```bash
   sudo bash scripts/bootstrap-ubuntu22.sh
   ```

3. **Follow the interactive prompts** to configure:
   - Domain name (default: vantus.systems)
   - Database location
   - Security secrets (auto-generated)
   - Admin account credentials
   - Optional features (Redis, AWS S3, etc.)

4. **Setup SSL certificates** when prompted (or run later):
   ```bash
   sudo certbot --nginx -d vantus.systems -d www.vantus.systems
   ```

5. **Access your app:**
   - Public site: https://vantus.systems
   - Admin panel: https://vantus.systems/admin

## 📦 What the Bootstrap Script Does

The `bootstrap-ubuntu22.sh` script automates the entire production setup:

### Step-by-Step Process:

1. **Creates system user** (`vantus`) with proper permissions
2. **Installs dependencies:**
   - Node.js 20.x
   - Nginx (web server & reverse proxy)
   - SQLite3 (database)
   - Certbot (SSL certificates)
   - Required utilities

3. **Sets up directory structure:**
   - `/var/www/vantus` - Application files
   - `/var/log/vantus` - Log files
   - `/var/lib/vantus` - Database and data files
   - `/etc/default/vantus` - Environment configuration

4. **Deploys application:**
   - Syncs source code (excluding dev files)
   - Sets proper file ownership

5. **Interactive environment configuration:**
   - Runs `setup-env.js` to collect all required settings
   - Generates secure random secrets
   - Creates production-ready environment file

6. **Installs Node.js dependencies:**
   - Runs `npm ci` for clean production install
   - Installs all required packages

7. **Database setup:**
   - Generates Prisma client
   - Runs database migrations
   - Seeds initial admin user

8. **Builds the application:**
   - Compiles Next.js production bundle
   - Optimizes assets

9. **Configures Nginx:**
   - Generates custom config for your domain
   - Sets up www to non-www redirect
   - Configures HTTP to HTTPS redirect
   - Optimizes caching and compression

10. **Sets up Systemd service:**
    - Installs service file
    - Enables auto-start on boot
    - Configures proper logging

11. **Starts the application:**
    - Launches the service
    - Verifies it's running

12. **Optional SSL setup:**
    - Prompts to run Certbot
    - Installs Let's Encrypt certificates
    - Configures HTTPS


## 🔧 Manual Configuration (Alternative)

If you prefer to set up manually or customize the installation:

### 1. Environment Setup

Run the interactive setup script:
```bash
npm run setup
```

This will guide you through configuring all environment variables and generate secure secrets.

### 2. Install Dependencies

```bash
npm ci
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed admin user
npx prisma db seed
```

### 4. Build Application

```bash
npm run build
```

### 5. Generate Nginx Config

```bash
DEPLOY_DOMAIN=vantus.systems \
DEPLOY_ROOT=/var/www/vantus \
DEPLOY_PORT=3000 \
npm run generate:nginx
```

### 6. Install Nginx Config

```bash
sudo cp config/nginx/nginx.conf /etc/nginx/sites-available/vantus.conf
sudo ln -s /etc/nginx/sites-available/vantus.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7. Install Systemd Service

```bash
sudo cp config/systemd/vantus.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable vantus.service
sudo systemctl start vantus.service
```

### 8. Setup SSL

```bash
sudo certbot --nginx -d vantus.systems -d www.vantus.systems
```


## 🔐 Security Configuration

### Required Environment Variables

The setup script will configure these for you:

| Variable | Description | How to Generate |
|----------|-------------|----------------|
| `NEXTAUTH_SECRET` | Session signing key | `openssl rand -base64 32` |
| `MFA_ENCRYPTION_KEY` | MFA secret encryption | `openssl rand -hex 32` |
| `CRON_SECRET` | Cron job authentication | `openssl rand -base64 32` |

### Admin Account

During setup, you'll configure:
- **Admin Email**: Default is `admin@vantus.systems`
- **Admin Password**: You should change this immediately after first login

⚠️ **Security Best Practices:**
1. Use a strong admin password
2. Enable MFA on admin account after first login
3. Keep environment file secure (`/etc/default/vantus` has 600 permissions)
4. Regularly update dependencies
5. Monitor logs for suspicious activity


## 📁 File Locations

After deployment, important files are located at:

```
/var/www/vantus/              # Application directory
  ├── .next/                  # Built Next.js app
  ├── public/                 # Static assets
  ├── prisma/                 # Database schema & migrations
  └── config/                 # Configuration templates

/etc/default/vantus           # Environment variables (600 permissions)
/etc/nginx/sites-enabled/     # Nginx configuration
/etc/systemd/system/          # Systemd service file

/var/log/vantus/              # Application logs
/var/lib/vantus/              # Database files (prod.db)
```

## 🔄 Common Operations

### View Application Logs
```bash
# Real-time logs
sudo journalctl -u vantus.service -f

# Last 100 lines
sudo journalctl -u vantus.service -n 100

# Logs from last hour
sudo journalctl -u vantus.service --since "1 hour ago"
```

### Restart Application
```bash
sudo systemctl restart vantus.service
```

### Check Service Status
```bash
sudo systemctl status vantus.service
```

### Update Application
```bash
cd /var/www/vantus
sudo -u vantus git pull
sudo -u vantus npm ci
sudo -u vantus npm run build
sudo -u vantus npx prisma migrate deploy
sudo systemctl restart vantus.service
```

### Test Nginx Configuration
```bash
sudo nginx -t
```

### Reload Nginx (without downtime)
```bash
sudo systemctl reload nginx
```

### Renew SSL Certificate
```bash
# Automatic (runs via cron)
sudo certbot renew

# Manual test
sudo certbot renew --dry-run
```


## 🗄️ Database Management

### Backup Database
```bash
# SQLite backup
sudo cp /var/lib/vantus/prod.db /var/lib/vantus/backup-$(date +%Y%m%d).db

# Or use SQLite backup command
sudo sqlite3 /var/lib/vantus/prod.db ".backup '/var/lib/vantus/backup-$(date +%Y%m%d).db'"
```

### Restore Database
```bash
sudo systemctl stop vantus.service
sudo cp /var/lib/vantus/backup-20260107.db /var/lib/vantus/prod.db
sudo chown vantus:vantus /var/lib/vantus/prod.db
sudo systemctl start vantus.service
```

### Run Migrations
```bash
cd /var/www/vantus
sudo -u vantus npx prisma migrate deploy
```

### Access Database Console
```bash
sudo sqlite3 /var/lib/vantus/prod.db
```

## 🔍 Troubleshooting

### Application Won't Start

1. Check service status:
   ```bash
   sudo systemctl status vantus.service
   ```

2. View detailed logs:
   ```bash
   sudo journalctl -u vantus.service -n 100 --no-pager
   ```

3. Verify environment file:
   ```bash
   sudo cat /etc/default/vantus
   ```

4. Check permissions:
   ```bash
   ls -la /var/www/vantus
   ls -la /var/lib/vantus
   ```

### Nginx Issues

1. Test configuration:
   ```bash
   sudo nginx -t
   ```

2. Check error logs:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

3. Verify upstream is running:
   ```bash
   curl http://localhost:3000
   ```

### SSL Certificate Issues

1. Check certificate status:
   ```bash
   sudo certbot certificates
   ```

2. Manually renew:
   ```bash
   sudo certbot renew --force-renewal
   ```

3. Check Nginx SSL config:
   ```bash
   sudo cat /etc/nginx/sites-enabled/vantus.conf | grep ssl
   ```

### Database Connection Errors

1. Verify database file exists:
   ```bash
   ls -la /var/lib/vantus/prod.db
   ```

2. Check DATABASE_URL in environment:
   ```bash
   sudo grep DATABASE_URL /etc/default/vantus
   ```

3. Test database access:
   ```bash
   sudo -u vantus sqlite3 /var/lib/vantus/prod.db "SELECT COUNT(*) FROM User;"
   ```


## 🌐 Domain & DNS Configuration

Before running the bootstrap script, configure your DNS:

### Required DNS Records

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | vantus.systems | Your_Server_IP | 3600 |
| A | www.vantus.systems | Your_Server_IP | 3600 |

### Verify DNS Propagation

```bash
# Check A record
dig vantus.systems +short

# Check www record
dig www.vantus.systems +short
```

Both should return your server's IP address.

## 🔥 Firewall Configuration

Configure UFW (Ubuntu Firewall):

```bash
# Enable firewall
sudo ufw enable

# Allow SSH (IMPORTANT: do this first!)
sudo ufw allow 22/tcp

# Allow HTTP & HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check status
sudo ufw status
```

## 📊 Monitoring & Maintenance

### Set Up Automated Backups

Create a backup script at `/usr/local/bin/backup-vantus.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/vantus"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
sqlite3 /var/lib/vantus/prod.db ".backup '$BACKUP_DIR/db_$DATE.db'"

# Backup environment
cp /etc/default/vantus $BACKUP_DIR/env_$DATE

# Keep only last 30 days
find $BACKUP_DIR -type f -mtime +30 -delete

echo "Backup completed: $DATE"
```

Make it executable and add to cron:
```bash
sudo chmod +x /usr/local/bin/backup-vantus.sh
sudo crontab -e

# Add this line for daily backups at 2 AM:
0 2 * * * /usr/local/bin/backup-vantus.sh
```

### Monitor Disk Space

```bash
# Check disk usage
df -h

# Check database size
du -h /var/lib/vantus/prod.db

# Check log size
du -sh /var/log/vantus/
```

### Log Rotation

Systemd handles log rotation automatically, but you can view archived logs:

```bash
# List archived logs
sudo journalctl --list-boots

# View logs from specific boot
sudo journalctl -b -1 -u vantus.service
```


## 🚦 Using Supervisor (Alternative to Systemd)

If you prefer Supervisor over Systemd for process management:

### Install Supervisor

```bash
sudo apt-get install supervisor
```

### Install Configuration

```bash
sudo cp config/supervisor/vantus.conf /etc/supervisor/conf.d/
sudo supervisorctl reread
sudo supervisorctl update
```

### Supervisor Commands

```bash
# Start application
sudo supervisorctl start vantus

# Stop application
sudo supervisorctl stop vantus

# Restart application
sudo supervisorctl restart vantus

# View status
sudo supervisorctl status vantus

# View logs
sudo supervisorctl tail vantus stdout
sudo supervisorctl tail vantus stderr
```

## ⚙️ Environment Variables Reference

Complete list of environment variables (configured via `setup-env.js`):

### Core Settings
- `NODE_ENV` - Environment mode (production)
- `PORT` - Application port (3000)
- `DEPLOY_DOMAIN` - Primary domain (vantus.systems)
- `NEXTAUTH_URL` - Canonical URL (https://vantus.systems)
- `DATABASE_URL` - Database connection string

### Security
- `NEXTAUTH_SECRET` - Session signing key (required)
- `MFA_ENCRYPTION_KEY` - MFA encryption key (required)
- `CRON_SECRET` - Cron authentication secret (required)

### Admin Bootstrap
- `ADMIN_BOOTSTRAP_EMAIL` - Initial admin email
- `ADMIN_BOOTSTRAP_PASSWORD` - Initial admin password

### Optional: Redis
- `REDIS_URL` - Redis connection URL

### Optional: AWS S3
- `AWS_REGION` - AWS region
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `S3_BUCKET_NAME` - S3 bucket name

### Optional: Email
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASSWORD` - SMTP password
- `SMTP_FROM` - From email address

### Optional: Monitoring
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry error tracking
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID


## 📝 Post-Deployment Checklist

After successful deployment, complete these tasks:

- [ ] Access admin panel at `https://vantus.systems/admin`
- [ ] Log in with bootstrap credentials
- [ ] **Immediately change admin password**
- [ ] Enable MFA on admin account
- [ ] Create additional user accounts as needed
- [ ] Review and adjust user roles/permissions
- [ ] Test all critical functionality
- [ ] Set up automated backups
- [ ] Configure firewall rules
- [ ] Set up monitoring/alerting
- [ ] Document any custom configurations
- [ ] Test SSL certificate auto-renewal
- [ ] Review application logs
- [ ] Set up uptime monitoring (optional)
- [ ] Configure error tracking (Sentry, optional)
- [ ] Test disaster recovery procedures

## 🆘 Support & Resources

- **Project Repository**: https://github.com/Thompson-Development/crispy-fishstick
- **Next.js Documentation**: https://nextjs.org/docs
- **Prisma Documentation**: https://www.prisma.io/docs
- **Nginx Documentation**: https://nginx.org/en/docs/
- **Let's Encrypt**: https://letsencrypt.org/docs/

## 📄 License

See LICENSE file in the project repository.

---

**Last Updated**: January 2026  
**Script Version**: 2.0  
**Minimum Ubuntu Version**: 22.04 LTS
