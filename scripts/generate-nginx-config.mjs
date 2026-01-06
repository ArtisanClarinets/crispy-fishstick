import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Configuration
const DOMAIN = process.env.DEPLOY_DOMAIN || 'example.com';
const PORT = process.env.DEPLOY_PORT || process.env.PORT || 3000;
// In Next.js, static files are in public/ and .next/static/
// We assume the app is deployed at DEPLOY_ROOT
const ROOT_DIR = process.env.DEPLOY_ROOT || '/opt/meb/app';

const nginxConfig = `server {
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

server {
    listen 443 ssl http2;
    server_name ${DOMAIN};

    # SSL configuration (placeholders - will be managed by Certbot)
    # ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;

    root ${ROOT_DIR}/public;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    # Serve Next.js static files directly
    location /_next/static/ {
        alias ${ROOT_DIR}/.next/static/;
        expires 365d;
        access_log off;
    }

    # Proxy to Next.js server
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
    }

    # Deny access to dotfiles
    location ~ /\\. {
        deny all;
    }
}
`;

const configDir = path.join(PROJECT_ROOT, 'config', 'nginx');
if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
}

fs.writeFileSync(path.join(configDir, 'nginx.conf'), nginxConfig);
console.log(`✅ Nginx configuration generated at config/nginx/nginx.conf for domain ${DOMAIN}`);
