# Best Practices for Ops Deployment

This guide outlines proven patterns and anti-patterns for building, verifying, and deploying the Vantus Systems platform, ensuring high availability and system integrity.

## 1. Build & Verification

### ✓ DO: Use the Build Proof System

```bash
# CORRECT: Using the custom build script
npm run build
```

**Why this matters:**
- **Integrity**: Generates a cryptographic signature of the code, preventing unauthorized modifications from going undetected.
- **Auditability**: Provides a clear record of what was built, when, and by whom.

### ✗ DON'T: Run `next build` Directly

Running `next build` bypasses the integrity checks and will result in a system that fails the `/proof` runtime verification.

## 2. Environment Management

### ✓ DO: Use the Interactive Setup Script

```bash
# CORRECT: Securely generating environment variables
node scripts/setup-env.js
```

**Why this matters:**
- **Security**: Automatically generates high-entropy secrets for `NEXTAUTH_SECRET` and `MFA_ENCRYPTION_KEY`.
- **Correctness**: Ensures all required variables are present and correctly formatted.

### ✗ DON'T: Commit `.env` Files to Version Control

Never commit sensitive credentials to the repository. Use `.env.example` as a template and manage production secrets via secure environment injection or `/etc/default/vantus`.

## 3. Server Security

### ✓ DO: Run as an Unprivileged User

The application should always run as the `vantus` system user, never as `root`.

```bash
# CORRECT: Systemd service configuration
[Service]
User=vantus
Group=vantus
ExecStart=/usr/bin/npm start
```

### ✗ DON'T: Disable the Firewall

Always keep UFW (Uncomplicated Firewall) active and only allow necessary ports (80, 443, 22).

## 4. Nginx & SSL

### ✓ DO: Automate Nginx Configuration

```bash
# CORRECT: Generating hardened Nginx config
npm run generate:nginx
```

**Why this matters:**
- **Security Headers**: Automatically includes strict CSP, HSTS, and X-Frame-Options.
- **Consistency**: Ensures all environments follow the same proxy and caching rules.

### ✗ DON'T: Use Self-Signed Certificates in Production

Always use Certbot (Let's Encrypt) for valid, auto-renewing SSL certificates.

## 5. Error Handling & Recovery

### ✓ DO: Implement Health Checks

Monitor the `/api/proof/headers` and `/proof/build.json` endpoints to ensure the application is healthy and running the correct version.

### ✗ DON'T: Ignore Failed Migrations

If `npx prisma migrate deploy` fails, do not proceed with the deployment. Investigate the cause and resolve the schema conflict before restarting the application.

## 6. Integration with Workflows

### ✓ DO: Document Deployment Steps

When performing a deployment, update the internal task list to track progress and ensure no steps are missed.

```bash
# Example: Tracking deployment via CLI (conceptual)
# updateTodoList({ todos: "[x] Build Proof Generated\n[x] Database Migrated\n[-] Restarting Services" })
```

## Summary: Ops Deployment Checklist

**Every deployment must verify:**

- [ ] **Build Proof**: `npm run build` completed successfully.
- [ ] **Database**: `npx prisma migrate deploy` applied without errors.
- [ ] **Environment**: All required secrets are present and valid.
- [ ] **Nginx**: `sudo nginx -t` passes and config is reloaded.
- [ ] **Service**: `vantus` systemd service is active and healthy.
- [ ] **Security**: SSL is valid and security headers are present.
- [ ] **Audit**: Deployment event is logged or documented.
