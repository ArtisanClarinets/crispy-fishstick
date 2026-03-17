# ADMIN_SECURITY — Security Policy + Threat Model + Controls
**Version:** 2.0.0  
**Date:** 2026-02-22  
**Stop-Ship:** Yes — Security is non-negotiable

---

## 1. Security Principles

### 1.1 Core Tenets
1. **Defense in Depth**: Multiple layers of security controls
2. **Least Privilege**: Minimum necessary access
3. **Fail Secure**: Default to secure state on failures
4. **Zero Trust**: Verify every request, every time
5. **Assume Breach**: Design for detection and containment

### 1.2 Security-First Design
- Security is not a feature; it's a foundation
- Every feature includes security requirements
- Security reviews required for all changes
- Automated security testing in CI/CD

---

## 2. Threat Model

### 2.1 Threat Actors

| Actor | Motivation | Capability | Priority |
|-------|------------|------------|----------|
| **External Attacker** | Data theft, ransom, disruption | Low to High | Critical |
| **Malicious Insider** | Theft, sabotage, espionage | High | Critical |
| **Compromised Account** | Lateral movement, data access | Medium | High |
| **Nation State** | Espionage, disruption | Very High | High |
| **Script Kiddie** | Vandalism, practice | Low | Medium |

### 2.2 Threat Categories

#### STRIDE Analysis

| Threat | Description | Mitigation |
|--------|-------------|------------|
| **Spoofing** | Impersonating users/systems | MFA, session binding, device fingerprinting |
| **Tampering** | Modifying data/transactions | Integrity checks, audit logs, versioning |
| **Repudiation** | Denying actions | Immutable audit trails, digital signatures |
| **Information Disclosure** | Data leakage | Encryption, access controls, data masking |
| **Denial of Service** | System unavailability | Rate limiting, DDoS protection, scaling |
| **Elevation of Privilege** | Unauthorized access escalation | RBAC/ABAC, input validation, least privilege |

### 2.3 Specific Threats

#### High Priority Threats

| ID | Threat | Impact | Likelihood | Risk |
|----|--------|--------|------------|------|
| T-001 | Account Takeover | Critical | Medium | High |
| T-002 | RBAC Bypass | Critical | Low | High |
| T-003 | Malicious Content Publish | High | Medium | High |
| T-004 | Pricing Manipulation | Critical | Low | High |
| T-005 | Data Exfiltration | Critical | Medium | Critical |
| T-006 | Session Hijacking | High | Medium | High |
| T-007 | SQL Injection | Critical | Low | High |
| T-008 | XSS Attack | High | Medium | High |
| T-009 | CSRF Attack | Medium | Medium | Medium |
| T-010 | API Abuse | Medium | High | Medium |

---

## 3. Security Controls

### 3.1 Authentication Controls

#### ADM-SEC-AUTH-001: Multi-Factor Authentication (MVP)
**Control:** All admin accounts must use MFA.

**Implementation:**
- TOTP (RFC 6238) with 30-second windows
- WebAuthn/FIDO2 support for hardware keys
- Recovery codes (10 single-use codes)
- MFA enrollment required on first login
- Grace period: 24 hours to complete setup

**Verification:**
```
1. Attempt login with valid credentials
2. Verify MFA prompt appears
3. Verify access denied without MFA code
4. Verify access granted with valid MFA
5. Verify recovery codes work as backup
```

#### ADM-SEC-AUTH-002: Password Policy (MVP)
**Control:** Strong password requirements.

**Requirements:**
- Minimum 16 characters
- Complexity: Upper, lower, number, special
- No dictionary words
- No username in password
- Password history: Last 12 passwords
- Maximum age: 90 days
- Breach detection via HaveIBeenPwned API

#### ADM-SEC-AUTH-003: Session Security (MVP)
**Control:** Secure session management.

**Implementation:**
```
Cookie Attributes:
- Secure: true (HTTPS only)
- HttpOnly: true (No JavaScript access)
- SameSite: Strict (CSRF protection)
- Path: /admin (Scope limited)
- Domain: Exact match (No subdomain sharing)

Session Properties:
- 128-bit entropy session IDs
- 15-minute idle timeout
- 12-hour absolute timeout
- IP + User-Agent fingerprinting
- Concurrent session limit: 3
```

#### ADM-SEC-AUTH-004: Account Lockout (MVP)
**Control:** Protect against brute force.

**Policy:**
- 5 failed attempts: 5-minute lockout
- 10 failed attempts: 30-minute lockout
- 15 failed attempts: Account disabled, admin notification
- CAPTCHA after 3 failures
- Progressive backoff between attempts

### 3.2 Authorization Controls

#### ADM-SEC-AUTHZ-001: Deny-by-Default (MVP)
**Control:** All access denied unless explicitly granted.

**Implementation:**
```typescript
// Default deny
const checkPermission = (user, resource, action) => {
  // Start with deny
  let allowed = false;
  
  // Check explicit grants
  for (const role of user.roles) {
    if (role.hasPermission(resource, action)) {
      allowed = true;
      break;
    }
  }
  
  // Check explicit denies (always win)
  for (const role of user.roles) {
    if (role.hasDeny(resource, action)) {
      return false;
    }
  }
  
  return allowed;
};
```

#### ADM-SEC-AUTHZ-002: Object-Level Permissions (MVP)
**Control:** Check permissions per object instance.

**Rules:**
- Sales Rep: Own records only
- Editor: Own drafts only
- Manager: Team records only
- Admin: All records (with audit)

#### ADM-SEC-AUTHZ-003: Field-Level Permissions (P2)
**Control:** Restrict access to specific fields.

**Example:**
```yaml
permissions:
  user:
    fields:
      email: [read, update]
      ssn: [none]  # No access
      salary: [read]  # Read only
```

### 3.3 Data Protection Controls

#### ADM-SEC-DATA-001: Encryption at Rest (MVP)
**Control:** All data encrypted when stored.

**Implementation:**
- Algorithm: AES-256-GCM
- Key Management: AWS KMS / Azure Key Vault
- Key Rotation: 90 days automatic
- Database: Transparent Data Encryption (TDE)
- Backups: Encrypted before storage
- File Storage: Server-side encryption

#### ADM-SEC-DATA-002: Encryption in Transit (MVP)
**Control:** All data encrypted during transmission.

**Requirements:**
- TLS 1.3 minimum
- Certificate pinning for mobile
- HSTS header with 1-year max-age
- Perfect Forward Secrecy (PFS)
- Strong cipher suites only

#### ADM-SEC-DATA-003: Data Classification (P2)
**Control:** Label data by sensitivity.

**Levels:**
| Level | Definition | Handling |
|-------|------------|----------|
| Public | No restrictions | Standard controls |
| Internal | Organization only | Access controls |
| Confidential | Limited distribution | Encryption + audit |
| Restricted | Strict need-to-know | HSM + strict access |

### 3.4 Application Security Controls

#### ADM-SEC-APP-001: Input Validation (MVP)
**Control:** Validate all inputs.

**Requirements:**
- Whitelist validation (reject known bad)
- Type checking
- Length limits
- Format validation (regex for emails, etc.)
- SQL injection prevention (parameterized queries)
- Command injection prevention
- Path traversal prevention

#### ADM-SEC-APP-002: Output Encoding (MVP)
**Control:** Encode all outputs to prevent XSS.

**Encoding Rules:**
- HTML context: HTML entity encoding
- JavaScript context: JavaScript encoding
- URL context: URL encoding
- CSS context: CSS encoding
- Use framework auto-escaping

#### ADM-SEC-APP-003: Content Security Policy (MVP)
**Control:** CSP headers to prevent XSS.

**Policy:**
```http
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'nonce-{random}';
  style-src 'self' 'nonce-{random}';
  img-src 'self' data: https:;
  connect-src 'self' https://api.vantus.systems;
  font-src 'self';
  object-src 'none';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
```

#### ADM-SEC-APP-004: CSRF Protection (MVP)
**Control:** Prevent cross-site request forgery.

**Implementation:**
- Double-submit cookie pattern
- Synchronizer token pattern for forms
- SameSite=Strict cookies
- Custom headers for AJAX requests

### 3.5 API Security Controls

#### ADM-SEC-API-001: Rate Limiting (MVP)
**Control:** Prevent API abuse.

**Tiers:**
| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Authentication | 10 | 1 minute |
| General API | 100 | 1 minute |
| Sensitive | 30 | 1 minute |
| Bulk Operations | 10 | 1 minute |

#### ADM-SEC-API-002: API Authentication (MVP)
**Control:** Secure API access.

**Methods:**
- OAuth 2.0 with PKCE
- API keys with scopes
- JWT tokens with expiration
- Request signing for webhooks

#### ADM-SEC-API-003: API Validation (MVP)
**Control:** Validate API requests.

**Requirements:**
- Schema validation (OpenAPI/Swagger)
- Content-Type validation
- Payload size limits
- Parameter type checking

### 3.6 Infrastructure Security Controls

#### ADM-SEC-INFRA-001: Network Segmentation (MVP)
**Control:** Isolate admin network.

**Implementation:**
- Admin portal on separate subdomain
- VPC isolation
- Private subnets for databases
- Security groups restrict access
- WAF rules for admin endpoints

#### ADM-SEC-INFRA-002: DDoS Protection (MVP)
**Control:** Mitigate denial of service.

**Measures:**
- CDN with DDoS protection
- Rate limiting at edge
- IP reputation filtering
- Automatic scaling
- Challenge pages for suspicious traffic

#### ADM-SEC-INFRA-003: Security Headers (MVP)
**Control:** Security-enhancing HTTP headers.

**Headers:**
```http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### 3.7 Audit and Monitoring Controls

#### ADM-SEC-AUDIT-001: Comprehensive Logging (MVP)
**Control:** Log all security-relevant events.

**Logged Events:**
- All authentication attempts (success/failure)
- All authorization decisions
- All data modifications
- All administrative actions
- All permission changes
- All configuration changes
- All API access

**Log Format:**
```json
{
  "timestamp": "2024-01-15T14:30:00Z",
  "severity": "INFO",
  "event_type": "authentication",
  "event_action": "login",
  "actor": {
    "user_id": "usr_12345",
    "username": "admin@example.com",
    "ip_address": "203.0.113.45",
    "user_agent": "Mozilla/5.0...",
    "session_id": "sess_abc123"
  },
  "target": {
    "resource_type": "admin_portal",
    "resource_id": "portal_main"
  },
  "outcome": "success",
  "context": {
    "mfa_used": true,
    "auth_method": "password"
  },
  "integrity": {
    "log_id": "log_xyz789",
    "hash": "sha256:abc123...",
    "previous_hash": "sha256:def456..."
  }
}
```

#### ADM-SEC-AUDIT-002: Log Integrity (P2)
**Control:** Tamper-proof logs.

**Implementation:**
- Cryptographic hash chain
- Append-only storage
- Separate log infrastructure
- Regular integrity verification
- External SIEM integration

#### ADM-SEC-AUDIT-003: Anomaly Detection (P2)
**Control:** Detect suspicious activity.

**Detection Rules:**
- Impossible travel (logins from distant locations)
- Off-hours access
- Privileged operation spikes
- Failed authentication bursts
- Data exfiltration patterns
- Configuration changes outside change window

### 3.8 Incident Response Controls

#### ADM-SEC-IR-001: Automated Response (P2)
**Control:** Automated incident handling.

**Triggers and Actions:**
| Trigger | Automated Action |
|---------|-----------------|
| Repeated MFA failures | Temporarily disable account |
| Impossible travel | Require re-authentication |
| Bulk data download | Throttle + alert security |
| Privilege escalation attempt | Block + alert SOC |
| Off-hours admin access | Require secondary approval |

#### ADM-SEC-IR-002: Break-Glass Access (P2)
**Control:** Emergency access procedures.

**Requirements:**
- Offline credential storage
- Multi-person authorization required
- Time-limited (4 hours max)
- Full session recording
- Immediate security team notification
- Post-incident credential rotation

---

## 4. Compliance Requirements

### 4.1 SOC 2 Type II

| Control | Implementation |
|---------|----------------|
| CC6.1 - Logical Access | MFA + RBAC + unique user IDs |
| CC6.2 - Access Removal | Automated deprovisioning within 24h |
| CC6.6 - Encryption | AES-256 at rest, TLS 1.3 in transit |
| CC7.2 - System Monitoring | Continuous monitoring + alerting |
| CC7.3 - Incident Detection | Anomaly detection + automated response |

### 4.2 GDPR

| Requirement | Implementation |
|-------------|----------------|
| Right to Access | Self-service data export |
| Right to Erasure | Automated deletion workflow |
| Data Portability | Machine-readable export (JSON) |
| Consent Management | Consent tracking with audit |
| Breach Notification | 72-hour notification process |

### 4.3 Data Residency

| Region | Storage | Processing |
|--------|---------|------------|
| EU | EU data centers only | EU processing only |
| US | US data centers | US processing |
| Global | Configurable per org | Configurable |

---

## 5. Security Testing

### 5.1 Automated Security Testing

| Test Type | Frequency | Tool |
|-----------|-----------|------|
| SAST | Every commit | SonarQube, Semgrep |
| DAST | Daily | OWASP ZAP |
| Dependency Scan | Every build | Snyk, Dependabot |
| Secret Scan | Every commit | GitLeaks, TruffleHog |
| Container Scan | Every build | Trivy |

### 5.2 Manual Security Testing

| Test Type | Frequency | Provider |
|-----------|-----------|----------|
| Penetration Test | Quarterly | Third-party |
| Red Team Exercise | Annually | Third-party |
| Code Review | Every major feature | Internal + External |
| Architecture Review | Annually | External |

---

## 6. Security Incident Response

### 6.1 Incident Severity Levels

| Level | Description | Response Time |
|-------|-------------|---------------|
| P1 - Critical | Active breach, data loss | 15 minutes |
| P2 - High | Potential breach, system compromise | 1 hour |
| P3 - Medium | Security vulnerability, policy violation | 24 hours |
| P4 - Low | Security observation, minor issue | 72 hours |

### 6.2 Response Procedures

1. **Detect**: Automated alerts, user reports, monitoring
2. **Triage**: Assess severity and scope
3. **Contain**: Limit damage, preserve evidence
4. **Eradicate**: Remove threat, patch vulnerability
5. **Recover**: Restore systems, verify security
6. **Post-Incident**: Document, learn, improve

---

## 7. Stop-Ship Security Requirements

| # | Requirement | Verification Method |
|---|-------------|---------------------|
| 1 | All authentication uses MFA | E2E test |
| 2 | RBAC deny-by-default enforced | Unit test |
| 3 | All data encrypted at rest | Config audit |
| 4 | All data encrypted in transit | SSL Labs scan |
| 5 | CSP headers implemented | Security header scan |
| 6 | No secrets in code | Secret scan |
| 7 | SQL injection prevention verified | Penetration test |
| 8 | XSS prevention verified | Penetration test |
| 9 | Rate limiting active | Load test |
| 10 | Audit logging comprehensive | Log review |
| 11 | No critical vulnerabilities | Vulnerability scan |
| 12 | Security headers present | Header scan |
| 13 | Penetration test passed | External report |

---

**End of ADMIN_SECURITY v2.0.0**
