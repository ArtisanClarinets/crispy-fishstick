# Deployment & Operations Runbook

## Quick Start: Deployment to Port 3005

### Prerequisites
- Node.js >=20.9.0
- `npm` package manager
- `.env.production` or `.env.local` with required environment variables

### One-Command Production Deployment

```bash
./deploy.sh
```

This script handles the entire production lifecycle:
1. ✅ Validates Node.js version (≥20.9.0)
2. ✅ Checks environment configuration
3. ✅ Installs production dependencies
4. ✅ Builds the application
5. ✅ Verifies build artifacts (.next directory)
6. ✅ Starts the server on port 3005

---

## Deployment Modes

### Full Deployment (Default)
```bash
./deploy.sh
```
**When to use:** Initial production deployment or full rebuild+restart.
**What it does:** Install → Build → Start on port 3005

### Build Only
```bash
./deploy.sh --build-only
```
**When to use:** Pre-build in CI or prepare build artifacts separately.
**What it does:** Install → Build → Verify (no server start)
**Next step:** Run `./deploy.sh --start-only` to start the server

### Start Only
```bash
./deploy.sh --start-only
```
**When to use:** Server restart after build already exists.
**Prerequisite:** `.next/standalone/server.js` must exist
**What it does:** Verify build → Start on port 3005

---

## Environment Configuration

### Required Variables at Build Time

```bash
export NODE_ENV=production
export NEXTAUTH_SECRET="<your-32-byte-secret>"       # Generate: openssl rand -base64 32
export NEXTAUTH_URL="https://example.com"             # Callback URL for auth
```

### Optional Variables

```bash
export DATABASE_URL="postgresql://..."                # If using database
export PORT=3005                                      # Override default port (not recommended)
```

### Configuration File Support

Script automatically loads (in order):
1. `.env.production` (production-specific secrets)
2. `.env.local` (local overrides, not committed)

**Example `.env.production`:**
```bash
NODE_ENV=production
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://example.com
DATABASE_URL=postgresql://user:pass@host/dbname
```

**Example `.env.local`:**
```bash
# Local development overrides (not committed to git)
NEXTAUTH_SECRET=dev-secret-only-for-testing
```

---

## Application Lifecycle

### Startup Flow

```
1. Validation Phase
   └─ Node.js version check (≥20.9.0)
   └─ Environment variables check
   └─ Database URL format validation (if set)

2. Build Phase
   └─ Install production dependencies (npm install --production)
   └─ Run build (npm run build)
     └─ Lint validation
     └─ TypeScript compilation
     └─ Next.js build generation
   └─ Verify .next/standalone/server.js exists

3. Start Phase
   └─ Set NODE_ENV=production
   └─ Set PORT=3005
   └─ Start: node .next/standalone/server.js
   └─ Listen on 0.0.0.0:3005
```

### Health Check

Once started, verify the server is running:

```bash
# Test if server responds
curl -s http://localhost:3005 | head -20

# Check process
ps aux | grep "node .next/standalone/server.js"

# Monitor logs
tail -f deployment.log
```

---

## Rollback & Recovery

### If Build Fails

**Diagnosis:**
```bash
# Check the log file
tail -100 deployment.log

# Verify dependencies are installed
npm ls --production

# Run lint/typecheck separately
npm run lint
npm run typecheck
```

**Recovery:**
1. Fix the error (code issue, env var, or dependency)
2. Run `./deploy.sh --build-only` to retry build
3. Once successful, run `./deploy.sh --start-only`

### If Server Won't Start

**Diagnosis:**
```bash
# Verify build exists
ls -la .next/standalone/server.js

# Test Node directly
node .next/standalone/server.js

# Check environment
echo "NODE_ENV=$NODE_ENV"
echo "PORT=$PORT"
```

**Recovery:**
1. If `.next` directory missing → Run `./deploy.sh --build-only`
2. If environment issue → Set variables and run `./deploy.sh --start-only`
3. If process crashes → Check logs in `deployment.log`

### Complete Rollback

If new deployment is broken:

```bash
# Stop the broken server (Ctrl+C in terminal)
# OR kill the process
pkill -f "node .next/standalone/server.js"

# Restore previous version (if available)
git checkout HEAD~1    # Previous commit
npm ci                 # Clean install with lock file
npm run build          # Build specific version
npm start              # Start

# Monitor
tail -f deployment.log
```

---

## Server NGINX Configuration (Reverse Proxy)

The application runs on **port 3005** and is intended to be accessed via NGINX reverse proxy:

```nginx
upstream app {
  server localhost:3005;
}

server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass http://app;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Host $host;
  }
}
```

---

## Secrets & Security

### NEXTAUTH_SECRET Rotation

Generate a new secret:
```bash
NEW_SECRET=$(openssl rand -base64 32)
export NEXTAUTH_SECRET="$NEW_SECRET"
```

**Impact:** All existing sessions will be invalidated on next restart (users must re-login)

**Process:**
1. Generate new secret
2. Update `.env.production` with new value
3. Run `./deploy.sh`

### Database Credentials

Rotate database password:
1. Update `DATABASE_URL` in `.env.production`
2. Ensure database can accept connection with new credentials
3. Run `./deploy.sh` to apply change (no rebuild needed)

### Deployment Logs

Logs are written to `deployment.log` in project root. Keep this private:

```bash
# Don't commit logs
echo "deployment.log" >> .gitignore

# Cleanup old logs (after successful deployment)
rm deployment.log
```

---

## Monitoring & Observability

### Key Logs

- **Build logs:** `deployment.log` (created during build)
- **Runtime logs:** Streamed to stdout/stderr and appended to `deployment.log`

### Common Error Patterns

| Error | Cause | Fix |
|-------|-------|-----|
| "NEXTAUTH_SECRET not set" | Missing env var | Export or add to `.env.production` |
| "Node.js v18.x found" | Version too old | Upgrade Node.js to ≥20.9.0 |
| ".next/standalone/server.js not found" | Build didn't generate | Run `./deploy.sh --build-only` |
| "Port 3005 already in use" | Another process on port | Kill it: `lsof -ti:3005 \| xargs kill -9` |
| "DATABASE_URL connect failed" | Database unreachable | Verify DB is running and credentials correct |

### Graceful Shutdown

The server respects signals (SIGINT, SIGTERM):

```bash
# Gracefully stop the server
kill -SIGTERM <PID>

# Or from terminal
Ctrl+C
```

Server will close connections and exit cleanly.

---

## Production Checklist

Before production deployment:

- [ ] Node.js ≥20.9.0 installed
- [ ] `NEXTAUTH_SECRET` set to strong random value
- [ ] `NEXTAUTH_URL` set to production domain
- [ ] `DATABASE_URL` configured (if using DB)
- [ ] `.env.production` created and secured (not committed)
- [ ] `deploy.sh` is executable (`chmod +x deploy.sh`)
- [ ] First deployment tested in staging
- [ ] NGINX reverse proxy configured for port 3005
- [ ] SSL/TLS certificate installed
- [ ] Deployment log file location known for monitoring
- [ ] Process manager configured (systemd, PM2, etc.) for auto-restart
- [ ] Health check monitoring set up

---

## Advanced: Process Manager Setup

### systemd Service (Recommended for Linux)

Create `/etc/systemd/system/crispy-fishstick.service`:

```ini
[Unit]
Description=Crispy Fishstick Application
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/app
EnvironmentFile=/path/to/app/.env.production
ExecStart=/path/to/app/deploy.sh --start-only
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable crispy-fishstick
sudo systemctl start crispy-fishstick
sudo systemctl status crispy-fishstick
```

### PM2 Process Manager

```bash
npm install -g pm2

# Start with PM2
pm2 start "npm start" --name "crispy-fishstick" --env production

# Monitor
pm2 monit

# View logs
pm2 logs crispy-fishstick

# Setup auto-restart on reboot
pm2 startup
pm2 save
```

---

## Support & Debugging

### Enable Verbose Logging

```bash
# Run deploy script with debugging
bash -x ./deploy.sh 2>&1 | tee debug.log
```

### Check All System Requirements

```bash
# Node version
node --version

# npm version
npm --version

# Disk space
df -h

# Memory available
free -h

# Port availability
netstat -tlnp | grep 3005
```

For issues, check:
1. `deployment.log` for detailed error messages
2. Node.js version compatibility
3. Environment variable configuration
4. Disk space and system resources
