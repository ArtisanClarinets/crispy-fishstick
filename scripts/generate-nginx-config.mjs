import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Configuration
const DOMAIN = process.env.DEPLOY_DOMAIN || 'vantus.systems';
const PORT = process.env.DEPLOY_PORT || process.env.PORT || 3000;
// In Next.js, static files are in public/ and .next/static/
// We assume the app is deployed at DEPLOY_ROOT
const ROOT_DIR = process.env.DEPLOY_ROOT || '/var/www/vantus';

const nginxConfig = `# Vantus Systems - Nginx Configuration
# Generated: ${new Date().toISOString()}

# Redirect www to non-www
server {
    listen 80;
    listen 443 ssl http2;
    server_name www.${DOMAIN};

    # SSL configuration (placeholders - will be managed by Certbot)
    # ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;

    # Redirect to non-www
    return 301 https://${DOMAIN}$request_uri;
}

# HTTP - Redirect to HTTPS
server {
    listen 80;
    server_name ${DOMAIN};

    # Redirect all HTTP traffic to HTTPS
    location / {
        return 301 https://$host$request_uri;
    }

    # ACME challenge for Certbot
    location ^~ /.well-known/acme-challenge/ {
        root /var/www/html;
    }
}

# HTTPS - Main Server
server {
    listen 443 ssl http2;
    server_name ${DOMAIN};

    # SSL configuration (placeholders - will be managed by Certbot)
    # These will be uncommented automatically by certbot
    # ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    # include /etc/letsencrypt/options-ssl-nginx.conf;
    # ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    root ${ROOT_DIR}/public;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    # Serve Next.js static files directly (versioned assets)
    location /_next/static/ {
        alias ${ROOT_DIR}/.next/static/;
        expires 365d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Serve public static files
    location /static/ {
        alias ${ROOT_DIR}/public/static/;
        expires 30d;
        add_header Cache-Control "public";
        access_log off;
    }

    # Favicon and robots.txt
    location = /favicon.ico {
        alias ${ROOT_DIR}/public/favicon.ico;
        expires 7d;
        access_log off;
    }

    location = /robots.txt {
        alias ${ROOT_DIR}/public/robots.txt;
        expires 7d;
        access_log off;
    }

    # API routes - no caching
    location /api/ {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Disable caching for API routes
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
        expires off;
    }

    # Admin routes - no caching
    location /admin/ {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Disable caching for admin routes
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
        expires off;
    }

    # Proxy all other requests to Next.js server
    location / {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Client body size limit (for file uploads)
        client_max_body_size 50M;
    }

    # Deny access to dotfiles
    location ~ /\\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Custom error pages (optional - Next.js handles these)
    # error_page 404 /404.html;
    # error_page 500 502 503 504 /500.html;
}
`;

const configDir = path.join(PROJECT_ROOT, 'config', 'nginx');
if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
}

fs.writeFileSync(path.join(configDir, 'nginx.conf'), nginxConfig);
console.log(`✅ Nginx configuration generated at config/nginx/nginx.conf`);
console.log(`   Domain: ${DOMAIN}`);
console.log(`   Root: ${ROOT_DIR}`);
console.log(`   Port: ${PORT}`);
console.log(`\n📝 Next steps:`);
console.log(`   1. Copy to Nginx: sudo cp config/nginx/nginx.conf /etc/nginx/sites-available/vantus.conf`);
console.log(`   2. Enable site: sudo ln -sf /etc/nginx/sites-available/vantus.conf /etc/nginx/sites-enabled/`);
console.log(`   3. Test config: sudo nginx -t`);
console.log(`   4. Reload Nginx: sudo systemctl reload nginx`);
console.log(`   5. Setup SSL: sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}`);
