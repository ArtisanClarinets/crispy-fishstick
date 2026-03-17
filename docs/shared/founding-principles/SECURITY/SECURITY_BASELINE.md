# Security & Resilience — Tactical Baseline

**Document ID:** VS-SEC-501  
**Version:** 2.0.0  
**Effective Date:** February 2, 2026  
**Audience:** Infrastructure Engineers, Application Engineers, Security Team  
**Preferred Auth Package:** BetterAuth  
**Owner:** Dylan Thompson, Founder & CTO

---

## Our Security Stance

Security is not a feature we add. It is a foundation we build on.

Every Vantus system starts secure. We do not "come back to security later." Later never comes.

---

## Rule 1: Secrets Stay Secret

### The Zero-Secrets-in-Code Rule

**Never:**

- Commit secrets to source control.
- Log secrets to console or files.
- Include secrets in error messages.
- Hard-code secrets in applications.

### Where Secrets Live

| Environment           | Storage Method                                                                         |
| --------------------- | -------------------------------------------------------------------------------------- |
| **Local Development** | `.env` file (gitignored)                                                               |
| **Staging**           | Environment variables (Docker, Systemd)                                                |
| **Production**        | Secret manager (AWS Secrets Manager, HashiCorp Vault, or 1Password Secrets Automation) |

### Secret Rotation

- **API Keys:** Rotate every 90 days.
- **Database Credentials:** Rotate every 180 days.
- **Emergency Credentials:** Rotate immediately after use.

### Redaction in Logs

All logging systems automatically redact strings matching secret patterns:

```typescript
// Example: Winston logger with redaction
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.json(),
    winston.format((info) => {
      // Redact known secret fields
      if (info.password) info.password = "[REDACTED]";
      if (info.token) info.token = "[REDACTED]";
      if (info.apiKey) info.apiKey = "[REDACTED]";
      return info;
    })(),
  ),
  transports: [new winston.transports.Console()],
});
```

---

## Rule 2: Verify Every Identity

### Authentication (AuthN)

Who are you?

**Requirements:**

- Multi-factor authentication (MFA) for all admin accounts.
- Strong password policies (minimum 12 characters, complexity required).
- Session timeout after 30 minutes of inactivity.
- Account lockout after 5 failed login attempts.

**Implementation:**
Use BetterAuth or a comparable library that provides:

- Secure session management.
- Password hashing (bcrypt, Argon2).
- MFA support (TOTP, WebAuthn).
- Social login options (optional).

### Authorization (AuthZ)

What can you do?

**Requirements:**

- Role-Based Access Control (RBAC) for all applications.
- Permission checks at the API/Server Action level (never trust the UI).
- Principle of least privilege (minimum access needed).

**Role Examples:**

```typescript
enum Role {
  ADMIN = "admin", // Full access
  MANAGER = "manager", // Can manage users, view reports
  USER = "user", // Standard access
  GUEST = "guest", // Read-only
}
```

**Permission Check Pattern:**

```typescript
// In Server Action or API route
async function deleteUser(userId: string, callerId: string) {
  const caller = await getUser(callerId);

  // Check permission
  if (!caller.roles.includes(Role.ADMIN)) {
    throw new Error("Unauthorized");
  }

  // Proceed with deletion
  await db.user.delete({ where: { id: userId } });
}
```

### Session Security

Cookie requirements:

```
httpOnly: true     // JavaScript cannot access
secure: true       // HTTPS only
sameSite: strict   // CSRF protection
maxAge: 1800000    // 30 minutes
```

---

## Rule 3: Validate Everything

### Input Validation

All external input is hostile until proven otherwise.

**Schema Validation with Zod:**

```typescript
import { z } from "zod";

const userSchema = z.object({
  email: z.string().email(),
  age: z.number().int().min(0).max(150),
  name: z.string().min(1).max(100),
});

// Validates and types in one step
const user = userSchema.parse(untrustedData);
```

### Output Encoding

Prevent XSS by escaping output:

```typescript
// Good: React escapes by default
<div>{userInput}</div>

// Bad: dangerouslySetInnerHTML bypasses protection
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

### SQL Injection Prevention

**Never** use string interpolation in SQL queries.

```typescript
// Bad: SQL injection vulnerability
const query = `SELECT * FROM users WHERE id = '${userId}'`;

// Good: Parameterized query with Prisma
const user = await db.user.findUnique({ where: { id: userId } });

// Good: Parameterized query with raw SQL
const user = await db.$queryRaw`SELECT * FROM users WHERE id = ${userId}`;
```

---

## Rule 4: Secure the Perimeter

### Reverse Proxy (NGINX)

All traffic flows through NGINX for:

- TLS 1.3 termination.
- Rate limiting.
- Request filtering.
- Static asset serving.

### Security Headers

Mandatory headers on all production responses:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Rate Limiting

Prevent abuse:

```nginx
# Example: NGINX rate limiting
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

location /api/ {
  limit_req zone=api burst=20 nodelay;
  proxy_pass http://backend;
}
```

### Least Privilege (Server)

Web servers must not run as root:

```
User: www-data (Ubuntu/Debian)
User: nginx (RHEL/CentOS)
```

---

## Rule 5: Log Everything Important

### What to Log

| Event Type                            | Log Level | Data to Capture                           |
| ------------------------------------- | --------- | ----------------------------------------- |
| Authentication success                | INFO      | User ID, timestamp, IP                    |
| Authentication failure                | WARN      | Username attempted, timestamp, IP         |
| Authorization failure                 | ERROR     | User ID, resource, action attempted       |
| Data changes (create/update/delete)   | INFO      | User ID, record ID, before/after (no PII) |
| Security events (suspicious activity) | ERROR     | Full context for investigation            |

### What NOT to Log

- Passwords.
- API keys or tokens.
- Credit card numbers.
- Other PII (unless specifically required and encrypted).

### Log Retention

| Log Type            | Retention Period |
| ------------------- | ---------------- |
| Security events     | 2 years          |
| Authentication logs | 1 year           |
| Application logs    | 90 days          |
| Access logs         | 90 days          |

---

## Rule 6: Prepare for Disaster

### Immutable Backups

Database backups must be:

- **Automated:** Daily at minimum.
- **Encrypted:** At rest and in transit.
- **Off-site:** Replicated to geographically separate location.
- **Tested:** Quarterly restore drills.
- **Immutable:** Cannot be deleted or modified (ransomware protection).

### RPO/RTO Targets

| Metric                             | Definition                   | Target   |
| ---------------------------------- | ---------------------------- | -------- |
| **RPO** (Recovery Point Objective) | Maximum data loss acceptable | 24 hours |
| **RTO** (Recovery Time Objective)  | Maximum downtime acceptable  | 4 hours  |

### Automatic Patching

OS-level security patches:

```bash
# Ubuntu/Debian
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades

# RHEL/CentOS
sudo dnf install dnf-automatic
sudo systemctl enable --now dnf-automatic.timer
```

### Incident Response

See `../OPS/OPERATIONS_PLAYBOOK.md` for full incident response procedures.

---

## Rule 7: Secure Development

### Secure Coding Checklist

Before any code is merged:

- [ ] All inputs validated with Zod or equivalent.
- [ ] All outputs escaped (XSS prevention).
- [ ] SQL queries use parameterized statements.
- [ ] Auth checks at API level, not just UI.
- [ ] No secrets in code or logs.
- [ ] Dependencies scanned for vulnerabilities.
- [ ] Security headers configured.

### Dependency Scanning

Automated scanning in CI:

```bash
# npm audit
npm audit --audit-level=moderate

# Snyk (if configured)
snyk test
```

**Block merges** with high or critical vulnerabilities.

### Penetration Testing

- **Quarterly:** Automated vulnerability scans.
- **Annually:** Third-party penetration test for production systems.
- **After major changes:** Ad-hoc security review.

---

## Compliance Baselines

We design systems to meet common compliance frameworks:

| Framework                       | Key Requirements                                          |
| ------------------------------- | --------------------------------------------------------- |
| **SOC 2**                       | Access controls, audit logs, change management            |
| **HIPAA**                       | Encryption, access logging, business associate agreements |
| **PCI-DSS** (if handling cards) | Network segmentation, encryption, annual audits           |
| **GDPR**                        | Data minimization, right to deletion, breach notification |

**Note:** Compliance certification requires explicit engagement. We build to the standard; certification is a separate process.

---

## Security Incident Response

### Immediate Actions (First Hour)

1. **Isolate:** Contain the breach (take affected systems offline if necessary).
2. **Assess:** Determine scope (what data, which systems, how many users).
3. **Notify:** Alert the security team and Dylan Thompson.

### Short-Term Actions (First 24 Hours)

1. **Preserve:** Capture logs and evidence before they rotate.
2. **Fix:** Apply patches or configuration changes to stop the attack.
3. **Verify:** Confirm the fix works (no residual access).

### Long-Term Actions (First Week)

1. **Document:** Write incident report with timeline and root cause.
2. **Notify:** Inform affected parties per legal requirements.
3. **Improve:** Implement measures to prevent recurrence.

---

**Questions about security?** Contact: security@vantus.systems

[End of Document VS-SEC-501]
