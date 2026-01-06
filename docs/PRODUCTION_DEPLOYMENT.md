# Production Deployment Guide

This guide describes how to deploy the application on Ubuntu 22.04 using Nginx and Systemd.

## Prerequisites

- Ubuntu 22.04 LTS
- Root access (sudo)
- A domain name pointing to the server IP

## Quick Start (Bootstrap)

We provide a bootstrap script that automates the setup process:

```bash
# Upload the code to the server, then run:
sudo ./scripts/bootstrap-ubuntu22.sh
```

This script will:
1. Create the `meb` user and directories.
2. Install Node.js, Nginx, and other dependencies.
3. Build the application.
4. Generate Nginx configuration.
5. Setup Systemd service.

## Manual Configuration Steps

### 1. Environment Variables

Production configuration is stored in `/etc/default/meb`.
You MUST update this file with your secrets:

```bash
# /etc/default/meb
DATABASE_URL="file:/var/lib/meb/prod.db"
NEXTAUTH_SECRET="<run openssl rand -base64 32>"
NEXTAUTH_URL="https://your-domain.com"
DEPLOY_DOMAIN="your-domain.com"
NODE_ENV="production"
```

### 2. HTTPS Requirement

The application enforces secure cookies in production. You **MUST** use HTTPS.
We recommend using Certbot:

```bash
sudo certbot --nginx -d your-domain.com
```

### 3. Database Migrations

Migrations are run automatically before the service starts.
To run them manually:

```bash
sudo -u meb npx prisma migrate deploy
```

### 4. Nginx Configuration

The Nginx configuration is generated based on your environment.
To regenerate it:

```bash
sudo -u meb DEPLOY_DOMAIN=your-domain.com npm run generate:nginx
```

This creates `config/nginx/nginx.conf`, which is then symlinked to `/etc/nginx/sites-enabled/`.

### 5. Systemd Service

The application is managed by `meb.service`.

```bash
# Check status
systemctl status meb

# Restart
systemctl restart meb

# View logs
journalctl -u meb -f
```

## Troubleshooting

- **Login Fails (401/500)**: Check logs with `journalctl -u meb -f`. Ensure `NEXTAUTH_SECRET` is set.
- **Service Unavailable (503)**: Check if migrations ran successfully.
- **Cookies not set**: Ensure you are accessing via HTTPS. Secure cookies are blocked on HTTP.
- **Nginx Errors**: Check `/var/log/nginx/error.log`.
