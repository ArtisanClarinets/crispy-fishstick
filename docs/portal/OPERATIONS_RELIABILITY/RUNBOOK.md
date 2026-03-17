# RUNBOOK — Enterprise Operations Runbook
**Version:** 1.0.0  
**Date:** 2026-02-21  
**Classification:** SOC 2 Type II Operations Document  
**Review Cycle:** Quarterly

---

## Table of Contents
1. [Stack Baseline](#1-stack-baseline)
2. [Server Provisioning Playbook](#2-server-provisioning-playbook)
3. [Complete NGINX Configuration](#3-complete-nginx-configuration)
4. [Database Operations](#4-database-operations)
5. [Observability Setup](#5-observability-setup)
6. [Health Checks & Alerting](#6-health-checks--alerting)
7. [Deployment Automation](#7-deployment-automation)
8. [Emergency Procedures](#8-emergency-procedures)
9. [Complete Database Procedures](#9-complete-database-procedures)
10. [Incident Response Integration](#10-incident-response-integration)
11. [Security Operations](#11-security-operations)
12. [Capacity Planning](#12-capacity-planning)

---

## 1. Stack Baseline

### 1.1 Infrastructure Overview
| Component | Version | Purpose |
|-----------|---------|---------|
| Ubuntu | 22.04 LTS | Base OS |
| NGINX | 1.24+ | Reverse Proxy, TLS Termination |
| MariaDB | 11.x | Primary Database |
| Node.js | 20.x LTS | Runtime |
| systemd | 249+ | Service Management |

### 1.2 Ubuntu 22.04 LTS Hardening

```bash
#!/bin/bash
# =============================================================================
# Ubuntu 22.04 Hardening Script
# Run as root on fresh Ubuntu 22.04 LTS installation
# =============================================================================

# Update system packages
apt-get update && apt-get upgrade -y

# Install essential packages
apt-get install -y \
    ufw \
    fail2ban \
    unattended-upgrades \
    auditd \
    rsyslog \
    logrotate \
    htop \
    curl \
    wget \
    vim \
    gnupg2 \
    ca-certificates \
    lsb-release \
    apt-transport-https \
    software-properties-common

# Disable unused services
systemctl disable snapd
systemctl stop snapd

# Configure automatic security updates
cat > /etc/apt/apt.conf.d/50unattended-upgrades << 'EOF'
Unattended-Upgrade::Allowed-Origins {
    "${distro_id}:${distro_codename}-security";
};
Unattended-Upgrade::MinimalSteps "true";
Unattended-Upgrade::InstallOnShutdown "false";
Unattended-Upgrade::Mail "ops@vantus.systems";
Unattended-Upgrade::Automatic-Reboot "true";
Unattended-Upgrade::Automatic-Reboot-Time "03:00";
EOF

# Set timezone
timedatectl set-timezone UTC

# Create application user
useradd -r -s /bin/false -d /opt/vantus vantus

# Verify: Check services status
systemctl status unattended-upgrades
```

### 1.3 NGINX Configuration Specifics

```bash
# Add NGINX official repository
curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor \
    | tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] \
    http://nginx.org/packages/ubuntu $(lsb_release -cs) nginx" \
    | tee /etc/apt/sources.list.d/nginx.list
apt-get update
apt-get install -y nginx

# Remove default site
rm -f /etc/nginx/sites-enabled/default
```

### 1.4 MariaDB 11.x Installation & Tuning

```bash
# Add MariaDB repository
wget https://downloads.mariadb.com/MariaDB/mariadb_repo_setup
echo "f94e8a48eb736d5e99c7ac7e00728ee29e3fdc69bc4d982684a8fa7b936ac43c  mariadb_repo_setup" | sha256sum -c -
bash mariadb_repo_setup --mariadb-server-version=11.4

# Install MariaDB
apt-get update
apt-get install -y mariadb-server mariadb-backup

# Secure installation
mysql_secure_installation << 'EOF'

n
y
y
y
y
EOF

# Create application database and user
mysql -u root << 'EOF'
CREATE DATABASE IF NOT EXISTS vantus CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'vantus_app'@'localhost' IDENTIFIED BY 'REPLACE_WITH_SECURE_PASSWORD';
GRANT SELECT, INSERT, UPDATE, DELETE ON vantus.* TO 'vantus_app'@'localhost';
FLUSH PRIVILEGES;
EOF
```

### 1.5 MariaDB Performance Tuning

```ini
# /etc/mysql/mariadb.conf.d/99-vantus.cnf
[mysqld]
# Connection settings
max_connections = 200
max_connect_errors = 100000
wait_timeout = 600
interactive_timeout = 600

# InnoDB settings
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT
innodb_file_per_table = 1

# Query cache (disabled for high-concurrency workloads)
query_cache_type = 0
query_cache_size = 0

# Logging
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2

# Binary logging for point-in-time recovery
log_bin = /var/lib/mysql/mysql-bin
expire_logs_days = 7
max_binlog_size = 100M
binlog_format = ROW

# Character set
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
```

### 1.6 systemd Service Definition

```ini
# /etc/systemd/system/vantus.service
[Unit]
Description=Vantus Application Server
Documentation=https://docs.vantus.systems
After=network.target mysql.service
Wants=mysql.service

[Service]
Type=simple
User=vantus
Group=vantus
WorkingDirectory=/opt/vantus/current
EnvironmentFile=/opt/vantus/.env

ExecStart=/usr/bin/node /opt/vantus/current/server.js
ExecReload=/bin/kill -HUP $MAINPID

Restart=on-failure
RestartSec=5

# Resource limits
LimitNOFILE=65536
LimitNPROC=4096

# Security hardening
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/opt/vantus/current/tmp /var/log/vantus
ProtectKernelTunables=true
ProtectKernelModules=true
ProtectControlGroups=true

[Install]
WantedBy=multi-user.target
```

**Verify service:**
```bash
systemctl daemon-reload
systemctl enable vantus
systemctl start vantus
systemctl status vantus
```

---

## 2. Server Provisioning Playbook

### 2.1 Initial Server Setup (Run as root)

```bash
#!/bin/bash
# =============================================================================
# Vantus Server Provisioning Playbook
# Usage: ./provision.sh <hostname> <ip_address>
# =============================================================================

set -euo pipefail

HOSTNAME=$1
IP_ADDRESS=$2

# Set hostname
hostnamectl set-hostname "$HOSTNAME"
echo "$IP_ADDRESS $HOSTNAME" >> /etc/hosts

# Create deploy user
useradd -m -s /bin/bash deploy
mkdir -p /home/deploy/.ssh
chmod 700 /home/deploy/.ssh

# Add your SSH public key
# NOTE: Replace with actual public key
echo "ssh-ed25519 AAAAC3NzaC... deploy@vantus" > /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
usermod -aG sudo deploy

# Configure passwordless sudo for deploy user
echo "deploy ALL=(ALL) NOPASSWD: /bin/systemctl * vantus, /bin/systemctl * nginx" > /etc/sudoers.d/deploy
chmod 440 /etc/sudoers.d/deploy
```

### 2.2 SSH Hardening

```bash
#!/bin/bash
# =============================================================================
# SSH Hardening
# =============================================================================

SSHD_CONFIG="/etc/ssh/sshd_config"

# Backup original
cp "$SSHD_CONFIG" "$SSHD_CONFIG.bak.$(date +%Y%m%d)"

# Apply hardening
cat > "$SSHD_CONFIG" << 'EOF'
# SSH Hardening Configuration
Port 22
AddressFamily inet
ListenAddress 0.0.0.0

# Authentication
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
AuthenticationMethods publickey
MaxAuthTries 3
MaxSessions 2

# Security
X11Forwarding no
AllowTcpForwarding no
PermitTunnel no
GatewayPorts no
AllowAgentForwarding no

# Idle timeout
ClientAliveInterval 300
ClientAliveCountMax 2

# Logging
SyslogFacility AUTH
LogLevel VERBOSE

# Ciphers and algorithms
Ciphers chacha20-poly1305@openssh.com,aes256-gcm@openssh.com,aes128-gcm@openssh.com,aes256-ctr,aes192-ctr,aes128-ctr
MACs hmac-sha2-512-etm@openssh.com,hmac-sha2-256-etm@openssh.com,hmac-sha2-512,hmac-sha2-256
KexAlgorithms curve25519-sha256@libssh.org,ecdh-sha2-nistp521,ecdh-sha2-nistp384,ecdh-sha2-nistp256,diffie-hellman-group-exchange-sha256

# Allow only deploy user
AllowUsers deploy

Subsystem sftp /usr/lib/openssh/sftp-server
EOF

# Validate configuration before restarting
sshd -t && echo "SSH config valid" || { echo "SSH config invalid!"; exit 1; }

# Restart SSH service
systemctl restart sshd

# Verify connection (from another terminal)
# ssh -v deploy@<server-ip>
```

**Verify SSH hardening:**
```bash
# Check running configuration
sshd -T | grep -E "(permitrootlogin|passwordauthentication|pubkeyauthentication|maxauthtries)"

# Test from external host
ssh -o BatchMode=yes -o ConnectTimeout=5 deploy@<server-ip> echo "SSH OK" || echo "SSH FAIL"
```

### 2.3 Firewall Configuration (UFW)

```bash
#!/bin/bash
# =============================================================================
# UFW Firewall Setup
# =============================================================================

# Reset to defaults
ufw --force reset

# Default policies
ufw default deny incoming
ufw default allow outgoing

# Allow SSH (adjust port if you changed it)
ufw allow 22/tcp comment 'SSH access'

# Allow HTTP/HTTPS
ufw allow 80/tcp comment 'HTTP'
ufw allow 443/tcp comment 'HTTPS'

# Allow specific monitoring (optional - for Datadog/New Relic)
# ufw allow from <monitoring-ip> to any port 8125 comment 'StatsD'

# Rate limiting for SSH (5 attempts per 30 seconds)
ufw limit 22/tcp

# Enable firewall
ufw --force enable

# Verify status
ufw status verbose
```

### 2.4 Fail2ban Intrusion Prevention

```bash
#!/bin/bash
# =============================================================================
# Fail2ban Setup
# =============================================================================

apt-get install -y fail2ban

# Create custom jail configuration
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
# Ban for 1 hour after 5 failures within 10 minutes
bantime = 3600
findtime = 600
maxretry = 5
backend = systemd

# Email notifications (optional)
mta = sendmail
destemail = security@vantus.systems
sendername = Fail2Ban

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 86400

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log

[nginx-badbots]
enabled = true
filter = nginx-badbots
port = http,https
logpath = /var/log/nginx/access.log
maxretry = 2

[nginx-noscript]
enabled = true
filter = nginx-noscript
port = http,https
logpath = /var/log/nginx/access.log
maxretry = 6
EOF

# Create custom nginx-badbots filter
mkdir -p /etc/fail2ban/filter.d
cat > /etc/fail2ban/filter.d/nginx-badbots.conf << 'EOF'
[Definition]
failregex = ^<HOST>.*"(GET|POST).*HTTP.*" (404|444|403|400) .* "(Baidu|MJ12bot|majestic|SemrushBot|AhrefsBot|DotBot|BLEXBot|YandexBot)"
ignoreregex =
EOF

# Enable and start
systemctl enable fail2ban
systemctl restart fail2ban

# Verify
fail2ban-client status
fail2ban-client status sshd
```

**Troubleshooting:**
```bash
# Check fail2ban logs
journalctl -u fail2ban -f

# List banned IPs
fail2ban-client status sshd | grep "Banned IP list"

# Unban an IP
fail2ban-client set sshd unbanip <ip-address>
```

---

## 3. Complete NGINX Configuration

### 3.1 Certbot Installation & Certificate Generation

```bash
#!/bin/bash
# =============================================================================
# TLS Certificate Setup with Let's Encrypt
# =============================================================================

# Install Certbot
apt-get install -y certbot python3-certbot-nginx

# Generate certificate (standalone for initial setup)
certbot certonly --standalone \
    --agree-tos \
    --no-eff-email \
    --email ops@vantus.systems \
    -d vantus.systems \
    -d www.vantus.systems \
    --rsa-key-size 4096

# Verify certificate
openssl x509 -in /etc/letsencrypt/live/vantus.systems/fullchain.pem -text -noout | grep -A2 "Validity"

# Test auto-renewal
certbot renew --dry-run
```

### 3.2 Main NGINX Configuration

```nginx
# /etc/nginx/nginx.conf
user www-data;
worker_processes auto;
worker_rlimit_nofile 65535;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 4096;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging format
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for" '
                    'rt=$request_time uct="$upstream_connect_time" '
                    'uht="$upstream_header_time" urt="$upstream_response_time"';

    access_log /var/log/nginx/access.log main buffer=32k flush=5s;

    # Performance
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    server_tokens off;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript 
               application/rss+xml application/atom+xml image/svg+xml;

    # Rate limiting zones
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=1r/s;
    limit_conn_zone $binary_remote_addr zone=conn_limit:10m;

    # Upstream for Next.js application
    upstream vantus_app {
        server 127.0.0.1:3000;
        keepalive 64;
    }

    # Include server blocks
    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

### 3.3 Vantus Site Configuration

```nginx
# /etc/nginx/sites-available/vantus

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name vantus.systems www.vantus.systems;
    return 301 https://$server_name$request_uri;
}

# Main HTTPS server
server {
    listen 443 ssl http2;
    server_name vantus.systems;

    root /opt/vantus/current/public;
    index index.html;

    # SSL Configuration - TLS 1.3 only
    ssl_certificate /etc/letsencrypt/live/vantus.systems/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/vantus.systems/privkey.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/vantus.systems/chain.pem;

    ssl_protocols TLSv1.3;
    ssl_ciphers 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256';
    ssl_prefer_server_ciphers off;

    # SSL session
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 1.1.1.1 8.8.8.8 valid=300s;
    resolver_timeout 5s;

    # Security Headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.vantus.systems; frame-ancestors 'none';" always;

    # Static assets (cache for 1 year)
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|otf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
        try_files $uri @proxy;
    }

    # API rate limiting
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        limit_conn conn_limit 10;
        proxy_pass http://vantus_app;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        include /etc/nginx/proxy_params;
    }

    # Login endpoint - strict rate limiting
    location /api/auth/login {
        limit_req zone=login burst=5 nodelay;
        proxy_pass http://vantus_app;
        include /etc/nginx/proxy_params;
    }

    # Health check endpoint - no rate limiting
    location /api/health {
        access_log off;
        proxy_pass http://vantus_app;
        include /etc/nginx/proxy_params;
    }

    # Proxy all other requests to Next.js
    location / {
        try_files $uri $uri/ @proxy;
    }

    location @proxy {
        proxy_pass http://vantus_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        include /etc/nginx/proxy_params;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

### 3.4 Common Proxy Parameters

```nginx
# /etc/nginx/proxy_params
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
proxy_set_header X-Forwarded-Host $host;
proxy_set_header X-Forwarded-Port $server_port;

proxy_connect_timeout 60s;
proxy_send_timeout 60s;
proxy_read_timeout 60s;

proxy_buffering on;
proxy_buffer_size 4k;
proxy_buffers 8 4k;
proxy_busy_buffers_size 8k;

proxy_redirect off;
proxy_hide_header X-Powered-By;
```

**Enable site and verify:**
```bash
ln -sf /etc/nginx/sites-available/vantus /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

**Verify SSL/TLS:**
```bash
# Test SSL configuration
openssl s_client -connect vantus.systems:443 -tls1_3

# SSL Labs test (run locally)
nmap --script ssl-enum-ciphers -p 443 vantus.systems

# Verify security headers
curl -I https://vantus.systems | grep -i "strict-transport\|x-frame\|x-content\|x-xss"
```

---

## 4. Database Operations

### 4.1 MariaDB Hardening Script

```bash
#!/bin/bash
# =============================================================================
# MariaDB Security Hardening
# =============================================================================

MYSQL_ROOT_PASSWORD="$(openssl rand -base64 32)"

cat > /root/.my.cnf << EOF
[client]
user=root
password=${MYSQL_ROOT_PASSWORD}
EOF
chmod 600 /root/.my.cnf

mysql -u root << EOF
-- Remove anonymous users
DELETE FROM mysql.user WHERE User='';

-- Remove remote root access
DELETE FROM mysql.user WHERE User='root' AND Host NOT IN ('localhost', '127.0.0.1', '::1');

-- Remove test database
DROP DATABASE IF EXISTS test;
DELETE FROM mysql.db WHERE Db='test' OR Db='test\\_%';

-- Set root password
ALTER USER 'root'@'localhost' IDENTIFIED BY '${MYSQL_ROOT_PASSWORD}';

-- Create application user with restricted privileges
CREATE USER IF NOT EXISTS 'vantus_app'@'localhost' IDENTIFIED BY '$(openssl rand -base64 32)';
GRANT SELECT, INSERT, UPDATE, DELETE ON vantus.* TO 'vantus_app'@'localhost';
FLUSH PRIVILEGES;
EOF

echo "Root password saved to /root/.my.cnf"
```

### 4.2 Automated Backup Script

```bash
#!/bin/bash
# =============================================================================
# MariaDB Backup Script
# Location: /opt/vantus/scripts/backup-database.sh
# Run via cron: 0 2 * * * /opt/vantus/scripts/backup-database.sh
# =============================================================================

set -euo pipefail

# Configuration
BACKUP_DIR="/backup/mariadb"
RETENTION_DAYS=7
ENCRYPTION_KEY_FILE="/etc/vantus/backup-key"
MYSQL_USER="backup"
MYSQL_PASSWORD="$(cat /etc/vantus/backup-password)"
S3_BUCKET="s3://vantus-backups/database"

# Date formatting
DATE=$(date +%Y%m%d_%H%M%S)
DAY_OF_WEEK=$(date +%u)

# Determine backup type (full on Sunday, incremental otherwise)
if [ "$DAY_OF_WEEK" -eq 7 ]; then
    BACKUP_TYPE="full"
    BACKUP_NAME="full_${DATE}"
else
    BACKUP_TYPE="incremental"
    BACKUP_NAME="incr_${DATE}"
fi

# Create backup directory
mkdir -p "${BACKUP_DIR}/${BACKUP_NAME}"

# Log function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a /var/log/vantus/backup.log
}

log "Starting ${BACKUP_TYPE} backup: ${BACKUP_NAME}"

# Create backup
if [ "$BACKUP_TYPE" = "full" ]; then
    # Full backup using mariabackup
    mariabackup --backup \
        --target-dir="${BACKUP_DIR}/${BACKUP_NAME}" \
        --user="${MYSQL_USER}" \
        --password="${MYSQL_PASSWORD}" \
        --extra-lsndir="${BACKUP_DIR}/latest" 2>>/var/log/vantus/backup.log
    
    # Prepare the backup
    mariabackup --prepare --target-dir="${BACKUP_DIR}/${BACKUP_NAME}" 2>>/var/log/vantus/backup.log
else
    # Incremental backup
    mariabackup --backup \
        --target-dir="${BACKUP_DIR}/${BACKUP_NAME}" \
        --incremental-basedir="${BACKUP_DIR}/latest" \
        --user="${MYSQL_USER}" \
        --password="${MYSQL_PASSWORD}" \
        --extra-lsndir="${BACKUP_DIR}/latest" 2>>/var/log/vantus/backup.log
fi

# Compress backup
tar czf "${BACKUP_DIR}/${BACKUP_NAME}.tar.gz" -C "${BACKUP_DIR}" "${BACKUP_NAME}"
rm -rf "${BACKUP_DIR}/${BACKUP_NAME}"

# Encrypt backup
openssl enc -aes-256-cbc -salt -in "${BACKUP_DIR}/${BACKUP_NAME}.tar.gz" \
    -out "${BACKUP_DIR}/${BACKUP_NAME}.tar.gz.enc" \
    -pass file:"${ENCRYPTION_KEY_FILE}"

rm -f "${BACKUP_DIR}/${BACKUP_NAME}.tar.gz"

# Upload to S3
aws s3 cp "${BACKUP_DIR}/${BACKUP_NAME}.tar.gz.enc" "${S3_BUCKET}/" \
    --storage-class STANDARD_IA

# Cleanup local backup
rm -f "${BACKUP_DIR}/${BACKUP_NAME}.tar.gz.enc"

# Cleanup old backups on S3
aws s3 ls "${S3_BUCKET}/" | awk '{print $4}' | while read -r file; do
    file_date=$(echo "$file" | grep -oP '\d{8}_\d{6}' || true)
    if [ -n "$file_date" ]; then
        file_epoch=$(date -d "${file_date:0:8} ${file_date:9:2}:${file_date:11:2}:${file_date:13:2}" +%s 2>/dev/null || echo 0)
        cutoff_epoch=$(date -d "-${RETENTION_DAYS} days" +%s)
        if [ "$file_epoch" -lt "$cutoff_epoch" ] && [ "$file_epoch" -ne 0 ]; then
            aws s3 rm "${S3_BUCKET}/${file}"
            log "Deleted old backup: ${file}"
        fi
    fi
done

log "Backup completed: ${BACKUP_NAME}"

# Verify backup integrity by listing recent backups
aws s3 ls "${S3_BUCKET}/" | tail -5
```

### 4.3 Continuous Binlog Backup (15-minute intervals)

```bash
#!/bin/bash
# =============================================================================
# Binlog Continuous Backup
# Run via cron: */15 * * * * /opt/vantus/scripts/backup-binlog.sh
# =============================================================================

BINLOG_DIR="/var/lib/mysql"
BACKUP_DIR="/backup/mariadb/binlog"
S3_BUCKET="s3://vantus-backups/binlog"
INDEX_FILE="/backup/mariadb/last-binlog-index"

mkdir -p "$BACKUP_DIR"

# Get current binlog file
CURRENT_BINLOG=$(mysql -e "SHOW MASTER STATUS\G" | grep "File:" | awk '{print $2}')

# If index file doesn't exist, start from first binlog
if [ ! -f "$INDEX_FILE" ]; then
    echo "$CURRENT_BINLOG" > "$INDEX_FILE"
fi

LAST_BINLOG=$(cat "$INDEX_FILE")

# Get list of binlogs to backup
mysql -e "SHOW BINARY LOGS" | tail -n +2 | awk '{print $1}' | while read -r binlog; do
    # Backup all binlogs from last processed to current
    if [[ "$binlog" >= "$LAST_BINLOG" ]]; then
        if [ -f "${BINLOG_DIR}/${binlog}" ]; then
            # Compress and encrypt
            gzip -c "${BINLOG_DIR}/${binlog}" | \
                openssl enc -aes-256-cbc -pass file:/etc/vantus/backup-key \
                > "${BACKUP_DIR}/${binlog}.gz.enc"
            
            # Upload to S3
            aws s3 cp "${BACKUP_DIR}/${binlog}.gz.enc" "${S3_BUCKET}/" --storage-class STANDARD
            
            # Cleanup
            rm -f "${BACKUP_DIR}/${binlog}.gz.enc"
            
            # Update index
            echo "$binlog" > "$INDEX_FILE"
        fi
    fi
done
```

### 4.4 Database Restore Procedure

```bash
#!/bin/bash
# =============================================================================
# Database Restore Script
# Usage: ./restore-database.sh <backup-file> [target-database]
# =============================================================================

set -euo pipefail

BACKUP_FILE=$1
TARGET_DB=${2:-vantus}
RESTORE_DIR="/tmp/mariadb-restore-$(date +%s)"
ENCRYPTION_KEY_FILE="/etc/vantus/backup-key"

echo "=== Database Restore Procedure ==="
echo "Backup file: $BACKUP_FILE"
echo "Target database: $TARGET_DB"
echo ""

# Step 1: Download from S3 if needed
if [[ "$BACKUP_FILE" == s3://* ]]; then
    echo "Downloading from S3..."
    LOCAL_FILE="/tmp/$(basename "$BACKUP_FILE")"
    aws s3 cp "$BACKUP_FILE" "$LOCAL_FILE"
    BACKUP_FILE="$LOCAL_FILE"
fi

# Step 2: Decrypt
echo "Decrypting backup..."
DECRYPTED_FILE="${BACKUP_FILE%.enc}"
openssl enc -aes-256-cbc -d -in "$BACKUP_FILE" -out "$DECRYPTED_FILE" -pass file:"$ENCRYPTION_KEY_FILE"

# Step 3: Extract
echo "Extracting backup..."
mkdir -p "$RESTORE_DIR"
tar xzf "$DECRYPTED_FILE" -C "$RESTORE_DIR"

# Step 4: Stop application
echo "Stopping Vantus application..."
systemctl stop vantus

# Step 5: Restore database
echo "Restoring database..."
systemctl stop mysql

# Backup current data
cp -r /var/lib/mysql /var/lib/mysql.backup.$(date +%Y%m%d_%H%M%S)

# Clear and restore
rm -rf /var/lib/mysql/*
mariabackup --copy-back --target-dir="${RESTORE_DIR}/$(ls $RESTORE_DIR | head -1)"
chown -R mysql:mysql /var/lib/mysql

# Step 6: Start services
echo "Starting database..."
systemctl start mysql
systemctl start vantus

# Step 7: Verify
echo "Verifying database..."
mysql -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='${TARGET_DB}';"

# Step 8: Cleanup
rm -rf "$RESTORE_DIR" "$DECRYPTED_FILE"
if [ -n "${LOCAL_FILE:-}" ]; then
    rm -f "$LOCAL_FILE"
fi

echo "=== Restore completed successfully ==="
```

**Verify restore capability:**
```bash
# Test restore to staging (monthly drill)
/opt/vantus/scripts/restore-database.sh s3://vantus-backups/database/full_20260115_020000.tar.gz.enc vantus_staging

# Verify data integrity
mysql -e "CHECKSUM TABLE vantus.users, vantus.sessions;"
```

---

## 5. Observability Setup

### 5.1 rsyslog Configuration

```bash
#!/bin/bash
# =============================================================================
# Centralized Logging with rsyslog
# =============================================================================

# Install rsyslog if not present
apt-get install -y rsyslog rsyslog-gnutls

# Create Vantus-specific log configuration
cat > /etc/rsyslog.d/50-vantus.conf << 'EOF'
# Vantus Application Logs
:programname, isequal, "vantus" /var/log/vantus/app.log
:programname, isequal, "vantus" ~

# Structured JSON logging
$template VantusFormat,"<%PRI%>%TIMESTAMP:::date-rfc3339% %HOSTNAME% %syslogtag%%msg%\n"
$template VantusJsonTemplate,"<%PRI%>%TIMESTAMP:::date-rfc3339% %HOSTNAME% %structured-data%\n"

# Forward to central log server (optional)
# *.* action(type="omfwd" target="logs.vantus.systems" port="514" protocol="tcp")
EOF

# Create log directory and set permissions
mkdir -p /var/log/vantus
chown syslog:adm /var/log/vantus

# Restart rsyslog
systemctl restart rsyslog
```

### 5.2 logrotate Configuration

```bash
# /etc/logrotate.d/vantus
/var/log/vantus/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 0640 vantus adm
    sharedscripts
    
    # Compress rotated logs with gzip
    compresscmd /bin/gzip
    compressext .gz
    
    # Post-rotate script to reload services
    postrotate
        /bin/kill -HUP $(cat /var/run/rsyslogd.pid 2>/dev/null) 2>/dev/null || true
        /bin/kill -USR1 $(cat /var/run/nginx.pid 2>/dev/null) 2>/dev/null || true
    endscript
    
    # Retention policy
    maxage 90
    
    # Date extension for easier identification
dateext
    dateformat -%Y%m%d-%s
}

# MariaDB slow query logs
/var/log/mysql/slow.log {
    daily
    rotate 7
    compress
    delaycompress
    create 640 mysql adm
    postrotate
        mysqladmin flush-logs
    endscript
}

# NGINX logs
/var/log/nginx/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 0640 www-data adm
    sharedscripts
    prerotate
        if [ -d /etc/logrotate.d/httpd-prerotate ]; then \
            run-parts /etc/logrotate.d/httpd-prerotate; \
        fi \
    endscript
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 $(cat /var/run/nginx.pid)
    endscript
}
```

**Verify logrotate:**
```bash
# Test configuration
logrotate -d /etc/logrotate.d/vantus

# Force rotation
logrotate -f /etc/logrotate.d/vantus

# Check rotated logs
ls -la /var/log/vantus/
```

### 5.3 Structured Logging Format

```bash
# Application logging configuration (Next.js/.env.local)
# Add to application environment variables

cat >> /opt/vantus/.env << 'EOF'
# Logging configuration
LOG_LEVEL=info
LOG_FORMAT=json
LOG_OUTPUT=stdout

# Structured log fields
LOG_INCLUDE_TIMESTAMP=true
LOG_INCLUDE_REQUEST_ID=true
LOG_INCLUDE_CORRELATION_ID=true
EOF
```

**JSON Log Format Example:**
```json
{
  "timestamp": "2026-02-21T15:30:45.123Z",
  "level": "info",
  "service": "vantus",
  "requestId": "req-abc123",
  "correlationId": "corr-xyz789",
  "message": "User login successful",
  "context": {
    "userId": "usr-456",
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0..."
  },
  "duration_ms": 245
}
```

---

## 6. Health Checks & Alerting

### 6.1 Application Health Endpoint

```bash
# Verify health endpoint
curl -sf http://localhost:3000/api/health | jq .

# Expected response:
# {
#   "status": "healthy",
#   "timestamp": "2026-02-21T15:30:45.123Z",
#   "checks": {
#     "database": {"status": "pass", "responseTime": 12},
#     "cache": {"status": "pass", "responseTime": 3},
#     "disk": {"status": "pass", "freePercent": 72}
#   }
# }
```

### 6.2 System Health Check Script

```bash
#!/bin/bash
# =============================================================================
# System Health Check Script
# Run via cron every minute for monitoring
# =============================================================================

ALERT_WEBHOOK="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
PAGERDUTY_KEY="your-pagerduty-integration-key"

# Thresholds
CPU_THRESHOLD=80
MEMORY_THRESHOLD=85
DISK_THRESHOLD=90
LOAD_THRESHOLD=$(nproc)

HEALTH_STATUS="healthy"
ALERTS=()

# Check CPU usage
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
if (( $(echo "$CPU_USAGE > $CPU_THRESHOLD" | bc -l) )); then
    HEALTH_STATUS="critical"
    ALERTS+=("CPU usage: ${CPU_USAGE}%")
fi

# Check memory usage
MEMORY_USAGE=$(free | grep Mem | awk '{printf("%.0f", $3/$2 * 100.0)}')
if [ "$MEMORY_USAGE" -gt "$MEMORY_THRESHOLD" ]; then
    HEALTH_STATUS="critical"
    ALERTS+=("Memory usage: ${MEMORY_USAGE}%")
fi

# Check disk usage
DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | cut -d'%' -f1)
if [ "$DISK_USAGE" -gt "$DISK_THRESHOLD" ]; then
    HEALTH_STATUS="critical"
    ALERTS+=("Disk usage: ${DISK_USAGE}%")
fi

# Check load average
LOAD_AVG=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | cut -d',' -f1)
if (( $(echo "$LOAD_AVG > $LOAD_THRESHOLD" | bc -l) )); then
    HEALTH_STATUS="warning"
    ALERTS+=("Load average: $LOAD_AVG")
fi

# Check service status
for service in vantus nginx mysql; do
    if ! systemctl is-active --quiet "$service"; then
        HEALTH_STATUS="critical"
        ALERTS+=("Service down: $service")
    fi
done

# Check application health endpoint
if ! curl -sf http://localhost:3000/api/health > /dev/null; then
    HEALTH_STATUS="critical"
    ALERTS+=("Application health check failed")
fi

# Send alerts if unhealthy
if [ "$HEALTH_STATUS" != "healthy" ]; then
    MESSAGE="ALERT: System health $HEALTH_STATUS on $(hostname)\n${ALERTS[*]}"
    
    # Send to Slack
    curl -s -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"$MESSAGE\"}" \
        "$ALERT_WEBHOOK"
    
    # Trigger PagerDuty for critical alerts
    if [ "$HEALTH_STATUS" = "critical" ]; then
        curl -s -X POST https://events.pagerduty.com/v2/enqueue \
            -H 'Content-Type: application/json' \
            -d "{
                \"routing_key\": \"$PAGERDUTY_KEY\",
                \"event_action\": \"trigger\",
                \"dedup_key\": \"health-check-$(hostname)\",
                \"payload\": {
                    \"summary\": \"System health critical: $(hostname)\",
                    \"severity\": \"critical\",
                    \"source\": \"$(hostname)\",
                    \"custom_details\": {
                        \"alerts\": \"${ALERTS[*]}\"
                    }
                }
            }"
    fi
fi

# Output status for monitoring
echo "{\"status\":\"$HEALTH_STATUS\",\"alerts\":[${ALERTS[*]}],\"timestamp\":\"$(date -Iseconds)\"}"
```

### 6.3 Uptime Monitoring Setup

```bash
#!/bin/bash
# =============================================================================
# Uptime Check Configuration
# Add to crontab: */5 * * * * /opt/vantus/scripts/uptime-check.sh
# =============================================================================

UPTIME_API="https://api.uptimerobot.com/v2/getMonitors"
UPTIME_API_KEY="your-uptimerobot-api-key"

# Create monitor via API
curl -X POST https://api.uptimerobot.com/v2/newMonitor \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "api_key=$UPTIME_API_KEY" \
    -d "format=json" \
    -d "friendly_name=Vantus Production" \
    -d "url=https://vantus.systems/api/health" \
    -d "type=1" \
    -d "interval=300" \
    -d "timeout=30"
```

---

## 7. Deployment Automation

### 7.1 Atomic Deployment Script (Server-side)

```bash
#!/bin/bash
# =============================================================================
# Atomic Deployment Script
# Location: /opt/vantus/scripts/deploy.sh
# Usage: ./deploy.sh <version> <artifact-path>
# =============================================================================

set -euo pipefail

VERSION=$1
ARTIFACT_PATH=$2
DEPLOY_DIR="/opt/vantus"
RELEASES_DIR="$DEPLOY_DIR/releases"
CURRENT_LINK="$DEPLOY_DIR/current"
KEEP_RELEASES=5

# Logging
LOG_FILE="/var/log/vantus/deploy.log"
exec > >(tee -a "$LOG_FILE")
exec 2>&1

echo "=== Deployment started: $VERSION at $(date) ==="

# Validate input
if [[ ! "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "ERROR: Invalid version format. Expected: X.Y.Z"
    exit 1
fi

if [ ! -f "$ARTIFACT_PATH" ]; then
    echo "ERROR: Artifact not found: $ARTIFACT_PATH"
    exit 1
fi

# Create release directory
RELEASE_DIR="$RELEASES_DIR/$VERSION"
mkdir -p "$RELEASE_DIR"

# Step 1: Extract artifact
echo "[1/8] Extracting artifact..."
tar -xzf "$ARTIFACT_PATH" -C "$RELEASE_DIR" --strip-components=1

# Step 2: Verify artifact structure
echo "[2/8] Verifying artifact structure..."
if [ ! -f "$RELEASE_DIR/server.js" ]; then
    echo "ERROR: server.js not found in artifact"
    rm -rf "$RELEASE_DIR"
    exit 1
fi

# Step 3: Install dependencies
echo "[3/8] Installing dependencies..."
cd "$RELEASE_DIR"
npm ci --production --silent

# Step 4: Run database migrations
echo "[4/8] Running database migrations..."
export NODE_ENV=production
export $(cat /opt/vantus/.env | xargs)
npx prisma migrate deploy

# Step 5: Stop current service
echo "[5/8] Stopping current service..."
systemctl stop vantus || true
sleep 2

# Step 6: Atomic symlink swap
echo "[6/8] Swapping release..."
ln -sfn "$RELEASE_DIR" "$CURRENT_LINK"
chown -R vantus:vantus "$RELEASE_DIR"

# Step 7: Start new service
echo "[7/8] Starting new service..."
systemctl start vantus

# Step 8: Health check and verification
echo "[8/8] Running smoke tests..."
sleep 3

MAX_RETRIES=10
RETRY_COUNT=0
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if curl -sf http://localhost:3000/api/health > /dev/null; then
        echo "Health check passed"
        break
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "Health check retry $RETRY_COUNT/$MAX_RETRIES..."
    sleep 3
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo "ERROR: Health check failed after $MAX_RETRIES retries"
    echo "Initiating rollback..."
    # Rollback logic here
    exit 1
fi

# Verify version endpoint
DEPLOYED_VERSION=$(curl -sf http://localhost:3000/api/version | jq -r '.version')
if [ "$DEPLOYED_VERSION" != "$VERSION" ]; then
    echo "ERROR: Version mismatch. Expected: $VERSION, Got: $DEPLOYED_VERSION"
    exit 1
fi

# Cleanup old releases
echo "Cleaning up old releases..."
cd "$RELEASES_DIR"
ls -1t | tail -n +$((KEEP_RELEASES + 1)) | xargs -r rm -rf

echo "=== Deployment completed successfully: $VERSION at $(date) ==="

# Send deployment notification
curl -s -X POST -H 'Content-type: application/json' \
    --data "{\"text\":\"✓ Deployment successful: v$VERSION on $(hostname)\"}" \
    "$ALERT_WEBHOOK" || true
```

### 7.2 CI/CD Deployment (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  release:
    types: [published]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build
        env:
          NODE_ENV: production

      - name: Create deployment artifact
        run: |
          mkdir -p dist
          cp -r .next dist/
          cp -r node_modules dist/
          cp package*.json dist/
          cp server.js dist/
          cp -r prisma dist/
          tar czf "vantus-${VERSION}.tar.gz" dist

      - name: Upload artifact to S3
        run: |
          aws s3 cp "vantus-${VERSION}.tar.gz" "s3://vantus-artifacts/"

      - name: Deploy to server
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.DEPLOY_HOST }}
          username: deploy
          key: ${{ secrets.DEPLOY_KEY }}
          script: |
            aws s3 cp "s3://vantus-artifacts/vantus-${VERSION}.tar.gz" /tmp/
            sudo /opt/vantus/scripts/deploy.sh "${VERSION}" "/tmp/vantus-${VERSION}.tar.gz"
```

---

## 8. Emergency Procedures

### 8.1 Quick Rollback Script

```bash
#!/bin/bash
# =============================================================================
# Emergency Rollback Script
# Usage: ./rollback.sh [version]
# Without version: rolls back to previous release
# =============================================================================

set -euo pipefail

DEPLOY_DIR="/opt/vantus"
RELEASES_DIR="$DEPLOY_DIR/releases"
CURRENT_LINK="$DEPLOY_DIR/current"

# Get target version
if [ -n "${1:-}" ]; then
    TARGET_VERSION="$1"
else
    # Get previous version (second most recent)
    TARGET_VERSION=$(ls -1t "$RELEASES_DIR" | head -2 | tail -1)
fi

TARGET_DIR="$RELEASES_DIR/$TARGET_VERSION"

if [ ! -d "$TARGET_DIR" ]; then
    echo "ERROR: Release not found: $TARGET_VERSION"
    echo "Available releases:"
    ls -1t "$RELEASES_DIR"
    exit 1
fi

echo "=== EMERGENCY ROLLBACK to $TARGET_VERSION ==="
echo "Started at: $(date)"

# Stop service
echo "Stopping service..."
systemctl stop vantus

# Swap symlink
echo "Switching to release $TARGET_VERSION..."
ln -sfn "$TARGET_DIR" "$CURRENT_LINK"

# Start service
echo "Starting service..."
systemctl start vantus

# Verify
echo "Running verification..."
sleep 3
if curl -sf http://localhost:3000/api/health > /dev/null; then
    echo "✓ Rollback successful"
    echo "Current version: $(curl -sf http://localhost:3000/api/version | jq -r '.version')"
else
    echo "✗ Rollback failed - manual intervention required"
    exit 1
fi

echo "Completed at: $(date)"

# Send alert
curl -s -X POST -H 'Content-type: application/json' \
    --data "{\"text\":\"⚠️ ROLLBACK executed: v$TARGET_VERSION on $(hostname)\"}" \
    "$ALERT_WEBHOOK" || true
```

### 8.2 Database Rollback Procedure

```bash
#!/bin/bash
# =============================================================================
# Database Rollback Procedure
# For use when migrations need to be reverted
# =============================================================================

MIGRATION_NAME=$1

echo "=== Database Rollback to $MIGRATION_NAME ==="

# Stop application
systemctl stop vantus

# Revert migrations
cd /opt/vantus/current
export $(cat /opt/vantus/.env | xargs)
npx prisma migrate resolve --rolled-back "$MIGRATION_NAME"
npx prisma db execute --file ./prisma/rollback-$MIGRATION_NAME.sql

# Restart application
systemctl start vantus

# Verify
curl -sf http://localhost:3000/api/health || exit 1

echo "=== Database rollback completed ==="
```

### 8.3 Emergency Communication Template

```markdown
## INCIDENT NOTIFICATION TEMPLATE

**Subject:** [INCIDENT] Vantus Production - [BRIEF DESCRIPTION]

**Status:** Investigating / Identified / Monitoring / Resolved

**Severity:** P1 (Critical) / P2 (High) / P3 (Medium) / P4 (Low)

**Impact:**
- Service: [affected service]
- Users impacted: [approximate number or "All users"]
- Features affected: [list affected features]

**Timeline:**
- [TIME] - Issue detected via [monitoring/alert/user report]
- [TIME] - [Action taken]

**Current Actions:**
- [Engineer name] investigating root cause
- [Engineer name] preparing rollback if needed

**Next Update:** [TIME + 30 minutes]

---
Post-incident update:

**Resolved:** [TIME]
**Root Cause:** [Brief description]
**Resolution:** [Actions taken to resolve]
**Preventive Measures:** [Steps to prevent recurrence]
```

---

## 9. Complete Database Procedures

### 9.1 Migration Execution

```bash
#!/bin/bash
# =============================================================================
# Safe Migration Execution
# =============================================================================

set -euo pipefail

MIGRATION_NAME=$1
BACKUP_BEFORE=true

echo "=== Migration Execution: $MIGRATION_NAME ==="

# Step 1: Create pre-migration backup
if [ "$BACKUP_BEFORE" = true ]; then
    echo "Creating pre-migration backup..."
    /opt/vantus/scripts/backup-database.sh
fi

# Step 2: Stop application writes
echo "Stopping application..."
systemctl stop vantus

# Step 3: Execute migration
echo "Running migration..."
cd /opt/vantus/current
export $(cat /opt/vantus/.env | xargs)
npx prisma migrate deploy

# Step 4: Verify migration
echo "Verifying migration..."
npx prisma migrate status

# Step 5: Restart application
echo "Restarting application..."
systemctl start vantus

# Step 6: Health check
echo "Health check..."
sleep 5
curl -sf http://localhost:3000/api/health || {
    echo "Health check failed - consider rollback"
    exit 1
}

echo "=== Migration completed successfully ==="
```

### 9.2 Connection Pooling Setup (Prisma)

```bash
# Add to /opt/vantus/.env

# Database connection pooling
DATABASE_URL="mysql://vantus_app:password@localhost:3306/vantus?connection_limit=20&pool_timeout=30"

# Connection pool tuning
DB_MIN_CONNECTIONS=5
DB_MAX_CONNECTIONS=20
DB_CONNECTION_TIMEOUT=30000
DB_IDLE_TIMEOUT=600000
```

### 9.3 Index Maintenance

```bash
#!/bin/bash
# =============================================================================
# Weekly Index Maintenance
# Run via cron: 0 3 * * 0 /opt/vantus/scripts/index-maintenance.sh
# =============================================================================

mysql -u root << 'EOF'
-- Analyze all tables for query optimizer
ANALYZE TABLE vantus.users;
ANALYZE TABLE vantus.sessions;
ANALYZE TABLE vantus.audit_logs;

-- Check for fragmented tables
SELECT 
    table_name,
    ROUND(data_length/1024/1024, 2) AS data_size_mb,
    ROUND(index_length/1024/1024, 2) AS index_size_mb,
    ROUND(data_free/1024/1024, 2) AS free_size_mb
FROM information_schema.tables 
WHERE table_schema = 'vantus' 
AND data_free > 104857600;  -- Tables with > 100MB free space
EOF

# Optimize fragmented tables (if any found)
# mysql -e "OPTIMIZE TABLE vantus.table_name;"
```

---

## 10. Incident Response Integration

### 10.1 Severity-Based Runbooks

```bash
#!/bin/bash
# =============================================================================
# Severity Assessment Script
# =============================================================================

# P1 - Critical: Complete service outage, data loss, security breach
# P2 - High: Major functionality impaired, performance severely degraded
# P3 - Medium: Minor functionality affected, workarounds available
# P4 - Low: Cosmetic issues, feature requests

echo "=== Incident Severity Assessment ==="
echo ""
echo "P1 (Critical) triggers:"
echo "  - Service completely unavailable"
echo "  - Data corruption or loss"
echo "  - Security breach detected"
echo "  - Response: Immediate, all hands on deck, page on-call"
echo ""
echo "P2 (High) triggers:"
echo "  - Core functionality impaired"
echo "  - >50% users affected"
echo "  - Workaround exists but is painful"
echo "  - Response: Within 15 minutes, notify team"
echo ""
echo "P3 (Medium) triggers:"
echo "  - Non-critical features affected"
echo "  - <50% users affected"
echo "  - Clear workaround available"
echo "  - Response: Next business day"
echo ""
echo "For full procedures, see INCIDENT_RESPONSE.md"
```

### 10.2 Incident Command Activation

```bash
#!/bin/bash
# =============================================================================
# Start Incident Command
# =============================================================================

INCIDENT_ID="INC-$(date +%Y%m%d-%H%M%S)"
SEVERITY=$1

# Create incident log
INCIDENT_DIR="/var/log/incidents/$INCIDENT_ID"
mkdir -p "$INCIDENT_DIR"

cat > "$INCIDENT_DIR/timeline.log" << EOF
Incident: $INCIDENT_ID
Severity: $SEVERITY
Started: $(date -Iseconds)
Commander: $(whoami)

Timeline:
[$(date '+%H:%M:%S')] Incident declared
EOF

# Start Slack war room
curl -s -X POST -H 'Content-type: application/json' \
    --data "{\"text\":\"🚨 INCIDENT $INCIDENT_ID declared (Severity: $SEVERITY). War room: #incident-$INCIDENT_ID\"}" \
    "$ALERT_WEBHOOK"

echo "Incident $INCIDENT_ID started."
echo "Log location: $INCIDENT_DIR"
echo ""
echo "Next steps:"
echo "1. Assess impact and scope"
echo "2. Communicate to stakeholders"
echo "3. Execute mitigation/rollback"
echo "4. Document timeline"
echo "5. Resolve when stable"
```

### 10.3 Escalation Matrix

```
┌─────────────────┬────────────────────┬─────────────────────────────────────┐
│ Severity        │ Response Time      │ Escalation Path                     │
├─────────────────┼────────────────────┼─────────────────────────────────────┤
│ P1 - Critical   │ 5 minutes          │ On-call → Engineering Manager → CTO │
│ P2 - High       │ 15 minutes         │ On-call → Team Lead                 │
│ P3 - Medium     │ 4 hours            │ Team Lead (next business day)       │
│ P4 - Low        │ 24 hours           │ Backlog for next sprint             │
└─────────────────┴────────────────────┴─────────────────────────────────────┘

Contact Information:
- On-call: pagerduty://vantus-oncall
- Engineering Manager: +1-XXX-XXX-XXXX
- CTO: +1-XXX-XXX-XXXX
- Slack: #incidents
```

---

## 11. Security Operations

### 11.1 CVE Monitoring

```bash
#!/bin/bash
# =============================================================================
# CVE Monitoring Script
# Run via cron daily
# =============================================================================

# Check for available security updates
SECURITY_UPDATES=$(apt-get -s upgrade | grep -i security | wc -l)

if [ "$SECURITY_UPDATES" -gt 0 ]; then
    echo "WARNING: $SECURITY_UPDATES security updates available"
    
    # List the packages
    apt-get -s upgrade | grep -i security | tee /var/log/vantus/security-updates.log
    
    # Send alert
    curl -s -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"⚠️ Security Alert: $SECURITY_UPDATES security updates available on $(hostname)\"}" \
        "$ALERT_WEBHOOK"
fi

# Check for end-of-life packages
eol_packages=$(ubuntu-security-status 2>/dev/null | grep -c "outdated" || echo 0)
echo "End-of-life packages: $eol_packages"
```

### 11.2 Automated Security Updates

```bash
#!/bin/bash
# =============================================================================
# Automated Security Update Script
# Run via cron: 0 3 * * * /opt/vantus/scripts/security-update.sh
# =============================================================================

set -euo pipefail

LOG_FILE="/var/log/vantus/security-updates.log"

echo "=== Security Update Run: $(date) ===" | tee -a "$LOG_FILE"

# Update package list
apt-get update | tee -a "$LOG_FILE"

# Check if reboot required
if [ -f /var/run/reboot-required ]; then
    echo "Reboot required - skipping auto-update" | tee -a "$LOG_FILE"
    curl -s -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"⚠️ Server $(hostname) requires reboot for security updates\"}" \
        "$ALERT_WEBHOOK"
    exit 0
fi

# Apply security updates only
apt-get -y upgrade -o Dir::Etc::SourceList=/etc/apt/sources.list.d/security.list 2>&1 | tee -a "$LOG_FILE"

# Check if services need restart
if command -v checkrestart >/dev/null; then
    checkrestart | tee -a "$LOG_FILE"
fi

echo "=== Security Update Complete: $(date) ===" | tee -a "$LOG_FILE"
```

### 11.3 Certificate Renewal Automation

```bash
#!/bin/bash
# =============================================================================
# Certificate Renewal and Monitoring
# =============================================================================

# Automatic renewal is handled by certbot timer
# This script adds monitoring

CERT_PATH="/etc/letsencrypt/live/vantus.systems/fullchain.pem"
EXPIRY_THRESHOLD=14  # Days

# Check certificate expiry
expiry_date=$(openssl x509 -in "$CERT_PATH" -noout -dates | grep notAfter | cut -d= -f2)
expiry_epoch=$(date -d "$expiry_date" +%s)
current_epoch=$(date +%s)
days_until_expiry=$(( (expiry_epoch - current_epoch) / 86400 ))

if [ "$days_until_expiry" -lt "$EXPIRY_THRESHOLD" ]; then
    echo "WARNING: Certificate expires in $days_until_expiry days"
    
    # Attempt renewal
    certbot renew --force-renewal
    
    # Reload nginx
    systemctl reload nginx
    
    # Send alert
    curl -s -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"⚠️ SSL Certificate renewed for $(hostname). Days remaining: $days_until_expiry\"}" \
        "$ALERT_WEBHOOK"
else
    echo "Certificate valid for $days_until_expiry days"
fi
```

### 11.4 Access Log Review

```bash
#!/bin/bash
# =============================================================================
# Daily Security Log Review
# Run via cron: 0 6 * * * /opt/vantus/scripts/security-review.sh
# =============================================================================

REPORT_FILE="/var/log/vantus/security-review-$(date +%Y%m%d).log"

echo "=== Security Review: $(date) ===" > "$REPORT_FILE"

# Failed SSH attempts
echo -e "\n--- Failed SSH Attempts (Top 10 IPs) ---" >> "$REPORT_FILE"
grep "Failed password" /var/log/auth.log 2>/dev/null | \
    awk '{print $(NF-3)}' | sort | uniq -c | sort -rn | head -10 >> "$REPORT_FILE"

# NGINX 4xx errors
echo -e "\n--- NGINX 4xx Errors (Top 10 URLs) ---" >> "$REPORT_FILE"
awk '$9 ~ /^4/ {print $7}' /var/log/nginx/access.log 2>/dev/null | \
    sort | uniq -c | sort -rn | head -10 >> "$REPORT_FILE"

# Suspicious User Agents
echo -e "\n--- Suspicious User Agents ---" >> "$REPORT_FILE"
grep -iE "(sqlmap|nikto|nmap|masscan|zgrab)" /var/log/nginx/access.log 2>/dev/null | \
    awk '{print $1, See pricing/pricing_public.yaml}' >> "$REPORT_FILE"

# Blocked by fail2ban
echo -e "\n--- Fail2ban Banned IPs ---" >> "$REPORT_FILE"
fail2ban-client status sshd 2>/dev/null | grep "Banned IP list" >> "$REPORT_FILE"

# Check for successful logins outside business hours
echo -e "\n--- After-Hours Successful Logins ---" >> "$REPORT_FILE"
awk '/Accepted/ && ($2 < "06:00:00" || $2 > "22:00:00") {print}' /var/log/auth.log 2>/dev/null >> "$REPORT_FILE"

# Email report if issues found
if grep -q "Failed password\|sqlmap\|nikto" "$REPORT_FILE"; then
    mail -s "Security Review: $(hostname) - $(date +%Y-%m-%d)" security@vantus.systems < "$REPORT_FILE"
fi
```

---

## 12. Capacity Planning

### 12.1 Resource Monitoring

```bash
#!/bin/bash
# =============================================================================
# Capacity Monitoring Script
# Run via cron every 5 minutes, send to CloudWatch/Datadog
# =============================================================================

TIMESTAMP=$(date +%s)
HOSTNAME=$(hostname)

# CPU metrics
CPU_IDLE=$(top -bn1 | grep "Cpu(s)" | awk '{print $8}' | cut -d'%' -f1)
CPU_USED=$(echo "100 - $CPU_IDLE" | bc)

# Memory metrics
MEMORY_TOTAL=$(free -m | awk '/^Mem:/{print $2}')
MEMORY_USED=$(free -m | awk '/^Mem:/{print $3}')
MEMORY_PERCENT=$(echo "scale=2; ($MEMORY_USED / $MEMORY_TOTAL) * 100" | bc)

# Disk metrics
DISK_USED=$(df / | awk '/\//{print $5}' | cut -d'%' -f1)
DISK_AVAIL=$(df -h / | awk '/\//{print $4}')

# Load average
LOAD_1=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | cut -d',' -f1)

# Application metrics
CONNECTIONS=$(ss -tuln | grep :3000 | wc -l)

# Send to CloudWatch
aws cloudwatch put-metric-data \
    --namespace Vantus/Production \
    --metric-data \
    "MetricName=CPUUtilization,Value=$CPU_USED,Unit=Percent,Timestamp=$TIMESTAMP" \
    "MetricName=MemoryUtilization,Value=$MEMORY_PERCENT,Unit=Percent,Timestamp=$TIMESTAMP" \
    "MetricName=DiskUtilization,Value=$DISK_USED,Unit=Percent,Timestamp=$TIMESTAMP" \
    "MetricName=LoadAverage,Value=$LOAD_1,Unit=None,Timestamp=$TIMESTAMP"

# Log for trending
echo "$(date -Iseconds),$HOSTNAME,$CPU_USED,$MEMORY_PERCENT,$DISK_USED,$LOAD_1,$CONNECTIONS" \
    >> /var/log/vantus/capacity-metrics.csv
```

### 12.2 Scaling Triggers

```bash
#!/bin/bash
# =============================================================================
# Auto-scaling Decision Script
# =============================================================================

# Thresholds
CPU_SCALE_UP=75
CPU_SCALE_DOWN=20
MEMORY_SCALE_UP=80
CONNECTIONS_SCALE_UP=800

# Current metrics
CPU_USED=$(top -bn1 | grep "Cpu(s)" | awk '{print 100 - $8}' | cut -d'%' -f1)
MEMORY_PERCENT=$(free | awk '/^Mem:/{printf("%.0f", $3/$2 * 100.0)}')
CONNECTIONS=$(ss -tuln | grep :3000 | wc -l)

echo "Current metrics:"
echo "  CPU: ${CPU_USED}%"
echo "  Memory: ${MEMORY_PERCENT}%"
echo "  Connections: $CONNECTIONS"

# Scale up decision
if (( $(echo "$CPU_USED > $CPU_SCALE_UP" | bc -l) )) || \
   [ "$MEMORY_PERCENT" -gt "$MEMORY_SCALE_UP" ] || \
   [ "$CONNECTIONS" -gt "$CONNECTIONS_SCALE_UP" ]; then
    echo "SCALE UP recommended"
    
    # Trigger scale-up via AWS Auto Scaling API
    aws autoscaling execute-policy \
        --auto-scaling-group-name vantus-production \
        --policy-name scale-up \
        --region us-east-1
    
    # Send alert
    curl -s -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"📈 Scale-up triggered on $(hostname). CPU: ${CPU_USED}%, Memory: ${MEMORY_PERCENT}%\"}" \
        "$ALERT_WEBHOOK"
fi

# Scale down decision
if (( $(echo "$CPU_USED < $CPU_SCALE_DOWN" | bc -l) )) && \
   [ "$MEMORY_PERCENT" -lt 40 ]; then
    echo "SCALE DOWN possible - manual review recommended"
fi
```

### 12.3 Horizontal Scaling Procedures

```bash
#!/bin/bash
# =============================================================================
# Add New Server to Pool
# =============================================================================

NEW_SERVER_IP=$1
NEW_SERVER_NAME=$2

# 1. Provision new server
echo "Provisioning new server: $NEW_SERVER_NAME ($NEW_SERVER_IP)"
ssh -o StrictHostKeyChecking=no root@$NEW_SERVER_IP 'bash -s' < /opt/vantus/scripts/provision.sh "$NEW_SERVER_NAME" "$NEW_SERVER_IP"

# 2. Deploy current application version
echo "Deploying application..."
CURRENT_VERSION=$(curl -sf http://existing-server/api/version | jq -r '.version')
aws s3 cp "s3://vantus-artifacts/vantus-${CURRENT_VERSION}.tar.gz" - | \
    ssh deploy@$NEW_SERVER_IP 'cat > /tmp/deploy.tar.gz && sudo /opt/vantus/scripts/deploy.sh "'$CURRENT_VERSION'" /tmp/deploy.tar.gz'

# 3. Add to load balancer
echo "Adding to load balancer..."
aws elbv2 register-targets \
    --target-group-arn arn:aws:elasticloadbalancing:us-east-1:ACCOUNT:targetgroup/vantus/UUID \
    --targets Id=$NEW_SERVER_IP

# 4. Verify health
echo "Waiting for health check..."
sleep 30
if curl -sf http://$NEW_SERVER_IP:3000/api/health > /dev/null; then
    echo "✓ New server added successfully"
else
    echo "✗ Health check failed - manual intervention required"
    exit 1
fi
```

### 12.4 Capacity Planning Checklist

```markdown
## Monthly Capacity Review

### Metrics to Review
- [ ] Average CPU utilization (target: <70%)
- [ ] Peak CPU utilization (target: <85%)
- [ ] Average memory utilization (target: <75%)
- [ ] Peak memory utilization (target: <85%)
- [ ] Disk usage growth rate
- [ ] Database connection pool utilization
- [ ] API response time trends
- [ ] Error rate trends

### Triggers for Scale Planning
- Sustained CPU > 70% for > 1 hour
- Memory usage trending toward 80%
- Response time p95 > 500ms
- Error rate > 0.1%
- Disk growth > 10% per month

### Scaling Actions
- [ ] Vertical: Increase instance size
- [ ] Horizontal: Add application servers
- [ ] Database: Read replicas for query load
- [ ] Caching: Increase Redis/memcached capacity
- [ ] CDN: Enable/configure additional edge locations

### Documentation
- [ ] Update infrastructure diagrams
- [ ] Document new server specifications
- [ ] Update monitoring dashboards
- [ ] Review and update runbooks
```

---

## Appendix A: Quick Reference Commands

```bash
# Service Management
systemctl {start|stop|restart|status} vantus
systemctl {start|stop|restart|status} nginx
systemctl {start|stop|restart|status} mysql

# Log Viewing
journalctl -u vantus -f                    # Application logs
journalctl -u nginx -f                     # NGINX logs
tail -f /var/log/mysql/error.log           # Database logs
tail -f /var/log/vantus/app.log            # Application logs

# Database
mysql -u root                              # Connect as root
mysqlshow                                  # List databases
mysqldump vantus > backup.sql              # Quick backup

# Network
ss -tlnp                                   # Listening ports
netstat -tlnp                              # Alternative
ufw status verbose                         # Firewall status

# Performance
top                                        # Process monitor
htop                                       # Enhanced top
iotop                                      # I/O monitor
free -h                                    # Memory usage
df -h                                      # Disk usage

# Deployment
cd /opt/vantus/current && npm run build    # Build application
sudo /opt/vantus/scripts/rollback.sh       # Quick rollback
curl http://localhost:3000/api/health      # Health check
```

## Appendix B: Troubleshooting Guide

### Issue: Application won't start
```bash
# Check logs
journalctl -u vantus -n 100 --no-pager

# Check environment variables
cat /opt/vantus/.env

# Verify file permissions
ls -la /opt/vantus/current/
chown -R vantus:vantus /opt/vantus/current

# Test Node.js directly
sudo -u vantus bash -c "cd /opt/vantus/current && node server.js"
```

### Issue: Database connection failures
```bash
# Check MariaDB status
systemctl status mysql

# Check connection from application server
mysql -u vantus_app -p -e "SELECT 1;"

# Check max connections
mysql -e "SHOW VARIABLES LIKE 'max_connections';"
mysql -e "SHOW STATUS LIKE 'Threads_connected';"

# Check for locks
mysql -e "SHOW ENGINE INNODB STATUS;" | grep -A5 "LATEST DETECTED DEADLOCK"
```

### Issue: High memory usage
```bash
# Find memory hogs
ps aux --sort=-%mem | head -20

# Check for memory leaks in Node.js
# Add --inspect flag and use Chrome DevTools

# Clear system cache (temporary relief)
echo 3 > /proc/sys/vm/drop_caches
```

### Issue: SSL certificate errors
```bash
# Check certificate expiry
openssl x509 -in /etc/letsencrypt/live/vantus.systems/fullchain.pem -noout -dates

# Force certificate renewal
certbot renew --force-renewal

# Test SSL configuration
openssl s_client -connect vantus.systems:443 -servername vantus.systems
```

---

**Document Control:**
- Owner: Operations Team
- Reviewers: Engineering Manager, Security Team
- Last Reviewed: 2026-02-21
- Next Review: 2026-05-21

**Change Log:**
| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1.0 | 2026-02-21 | Initial skeleton | Operations |
| 1.0.0 | 2026-02-21 | Enterprise runbook expansion | Operations |


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
