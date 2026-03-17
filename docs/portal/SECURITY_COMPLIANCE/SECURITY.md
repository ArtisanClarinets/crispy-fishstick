# Vantus Client Portal — Security Architecture & Controls
**Version:** 2.0.0  
**Last Updated:** 2026-02-22  
**Classification:** Internal Use  
**Applies to:** Vantus Client Portal (`apps/portal`)  
**Rule:** No timelines in this document.

---

## Executive Summary

The Vantus Client Portal implements defense-in-depth security architecture that exceeds industry standards including NIST Cybersecurity Framework, OWASP ASVS Level 3, and SOC 2 Type II requirements. This document defines comprehensive security controls, threat models, and operational procedures.

---

## 1) Enhanced Threat Model

### 1.1 Threat Actor Categories

| Category | Capability | Motivation | Target Assets |
|----------|-----------|------------|---------------|
| Nation-State (APT) | Advanced | Intelligence, Economic Espionage | Client data, trade secrets, strategic plans |
| Organized Crime | Moderate-Advanced | Financial gain | Credentials, PII, payment data |
| Hacktivists | Moderate | Disruption, Reputation damage | Service availability, public data |
| Insider (Malicious) | High | Financial, Revenge, Espionage | All accessible data, IP |
| Insider (Negligent) | Variable | Accidental | Misconfigured permissions |
| Script Kiddies | Low | Notoriety | Known vulnerabilities |
| Competitors | Moderate | Economic advantage | Client lists, pricing, strategy |

### 1.2 Detailed Threat Scenarios

#### 1.2.1 Advanced Persistent Threats (APTs)
**Description:** Sophisticated, long-term campaigns by well-resourced attackers.

**Attack Vectors:**
- Zero-day exploitation in dependencies
- Watering hole attacks on vendor sites
- Spear-phishing against privileged users
- Supply chain compromise

**Mitigations:**
- Threat intelligence integration with IOC matching
- Behavioral analytics for anomaly detection
- Network segmentation limiting lateral movement
- Endpoint Detection and Response (EDR) on all admin workstations
- Regular compromise assessments by third-party specialists

#### 1.2.2 Insider Threats and Data Exfiltration
**Description:** Malicious or negligent actions by authorized users.

**Attack Vectors:**
- Bulk data exports beyond role requirements
- Abnormal access patterns (off-hours, unusual volumes)
- Screen capture and recording
- USB/storage device usage
- Email forwarding to personal accounts

**Mitigations:**
- User Activity Monitoring (UAM) for privileged accounts
- Data Loss Prevention (DLP) integration
- Just-in-time access for elevated permissions
- Mandatory vacation policy for sensitive roles
- Separation of duties enforcement
- Psychological/behavioral indicators monitoring (opt-in programs)

#### 1.2.3 Supply Chain Attacks
**Description:** Compromise via third-party vendors, dependencies, or services.

**Attack Vectors:**
- Compromised npm/pypi packages
- Malicious CI/CD pipeline modifications
- Vendor credential theft
- Compromised build tools

**Mitigations:**
- Software Bill of Materials (SBOM) for all releases
- Dependency pinning with cryptographic verification
- Multi-party code review for dependency updates
- Signed artifacts with verification in deployment
- Vendor security assessments (annual minimum)
- Supply chain monitoring with Snyk/Dependabot

#### 1.2.4 API Abuse and Scraping
**Description:** Automated extraction of data via API endpoints.

**Attack Vectors:**
- Credential stuffing against API endpoints
- Token enumeration attacks
- Pagination abuse for bulk extraction
- GraphQL query complexity attacks

**Mitigations:**
- Rate limiting per endpoint with adaptive thresholds
- API request fingerprinting
- Bot detection with challenge-response
- Behavioral analysis for API usage patterns
- GraphQL query depth/complexity limiting
- Client certificate authentication for sensitive endpoints

#### 1.2.5 Credential Stuffing Attacks
**Description:** Automated login attempts using breached credentials from other services.

**Attack Vectors:**
- Dictionary attacks with known password lists
- Distributed attacks across multiple IPs
- Session riding after successful compromise

**Mitigations:**
- HaveIBeenPwned integration for breached password detection
- Rate limiting with progressive backoff
- CAPTCHA after failed attempts threshold
- IP reputation checking
- Device fingerprinting for anomaly detection
- Risk-based authentication triggering

#### 1.2.6 Session Hijacking
**Description:** Theft and misuse of authenticated session tokens.

**Attack Vectors:**
- XSS exploitation for cookie theft
- Man-in-the-middle attacks on unencrypted traffic
- Session fixation attacks
- Predictable session IDs
- Browser extension malware

**Mitigations:**
- HttpOnly, Secure, SameSite=Strict cookies
- TLS 1.3 for all communications
- Session binding to device fingerprint
- Rotating session tokens on privilege changes
- Short session timeout with sliding window
- Concurrent session limits per user

#### 1.2.7 Clickjacking and UI Redressing
**Description:** Deceptive overlay of legitimate UI elements to trick user actions.

**Attack Vectors:**
- iframe embedding of portal pages
- Transparent overlay attacks
- Cursor/pointer spoofing
- Drag-and-drop attacks

**Mitigations:**
- X-Frame-Options: DENY or SAMEORIGIN
- Content Security Policy frame-ancestors directive
- SameSite cookies preventing cross-origin embedding
- UI integrity verification scripts
- Frame-busting JavaScript as defense in depth

#### 1.2.8 DNS Hijacking
**Description:** Redirection of traffic to attacker-controlled infrastructure.

**Attack Vectors:**
- DNS cache poisoning
- Registrar account compromise
- BGP route hijacking
- Local DNS manipulation

**Mitigations:**
- DNSSEC deployment for all domains
- Certificate pinning for mobile applications
- HTTP Strict Transport Security (HSTS) with preload
- Certificate Transparency monitoring
- Multi-factor authentication on DNS/registrar accounts

#### 1.2.9 Man-in-the-Middle (MitM) Attacks
**Description:** Interception and potential modification of communications.

**Attack Vectors:**
- Rogue Wi-Fi access points
- ARP spoofing on local networks
- Compromised certificates
- SSL stripping attacks

**Mitigations:**
- TLS 1.3 mandatory (no downgrade allowed)
- Certificate transparency monitoring
- OCSP stapling for revocation checking
- Public Key Pinning (HPKP successor: Expect-CT)
- Network segmentation for admin access
- VPN required for administrative functions

#### 1.2.10 Zero-Day Exploitation
**Description:** Attacks using unknown vulnerabilities.

**Attack Vectors:**
- Exploitation of unpatched software
- Novel attack techniques against custom code
- Logic flaws in business processes

**Mitigations:**
- Defense in depth architecture
- Web Application Firewall (WAF) with virtual patching
- Runtime Application Self-Protection (RASP)
- Behavior-based detection
- Automated threat response capabilities
- Rapid patching procedures (SLA: 24h critical, 72h high)

### 1.3 Threat Matrix

| Threat | Likelihood | Impact | Risk Level | Primary Control |
|--------|------------|--------|------------|-----------------|
| Credential Stuffing | High | Medium | High | Breached password detection + MFA |
| XSS/Injection | Medium | High | High | Input validation + CSP |
| Insider Threat | Low | Critical | High | DLP + UAM + Segregation |
| APT | Low | Critical | Medium | Defense in depth + monitoring |
| Supply Chain | Medium | High | High | SBOM + dependency scanning |
| Session Hijacking | Medium | High | High | Secure cookies + TLS 1.3 |
| API Abuse | High | Medium | Medium | Rate limiting + bot detection |
| Zero-Day | Low | Critical | Medium | WAF + RASP + rapid patching |

---

## 2) Authentication Security

### 2.1 Password Policies (NIST 800-63B Compliant)

#### 2.1.1 Password Requirements
```
Minimum Length: 12 characters (16 for privileged accounts)
Maximum Length: 128 characters (to prevent DoS)
Character Diversity: Not enforced (length > complexity)
Common Password Blocklist: 100,000+ most common passwords
Context-Specific Blocklist: Organization name, username, email local-part
No Mandatory Rotation: Eliminate periodic change requirements
No Complexity Requirements: No mandatory uppercase/symbol/number
```

#### 2.1.2 Password Storage
- Algorithm: Argon2id (winner of Password Hashing Competition)
- Parameters: Memory=64MB, Iterations=3, Parallelism=4
- Pepper: Additional server-side secret mixed before hashing
- Salt: Cryptographically random 32-byte per-password salt

### 2.2 Breached Password Detection

#### 2.2.1 HaveIBeenPwned Integration
```typescript
// k-anonymity API integration
async function checkBreachedPassword(password: string): Promise<boolean> {
  const sha1 = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
  const prefix = sha1.substring(0, 5);
  const suffix = sha1.substring(5);
  
  // Query HIBP API with k-anonymity
  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const hashes = await response.text();
  
  return hashes.includes(suffix);
}
```

**Implementation Requirements:**
- Check on password creation and change
- Block registration with breached passwords
- Notify users if their password appears in future breaches
- No plaintext password leaves the system (k-anonymity)

#### 2.2.2 Internal Breach Detection
- Monitor dark web for credential dumps containing portal credentials
- Automated credential rotation if breach detected
- User notification within 72 hours of confirmed breach

### 2.3 Account Lockout Policies

#### 2.3.1 Progressive Delay Algorithm
```
Failed Attempts | Action Taken
----------------|-------------
1-2            | Log only
3-4            | 5-second delay
5-6            | 15-second delay + warning email
7-8            | 60-second delay + account notification
9+             | Account lockout (15 minutes) + email notification
Persistent     | Progressive escalation to permanent lockout
```

#### 2.3.2 Lockout Characteristics
- Time-based lockouts, not permanent (avoid DoS)
- Separate counters per IP (distributed attack protection)
- CAPTCHA challenge before lockout threshold
- SMS/Email unlock capability for legitimate users
- Admin override with audit trail

### 2.4 Risk-Based Authentication (RBA)

#### 2.4.1 Risk Signals
| Signal | Weight | Detection Method |
|--------|--------|------------------|
| New device | High | Device fingerprint comparison |
| New location | Medium | GeoIP + impossible travel |
| New IP pattern | Medium | IP reputation + ASN analysis |
| Time anomaly | Low | Login outside normal hours |
| Velocity | High | Multiple rapid attempts |
| Browser change | Medium | User-Agent analysis |
| Tor/VPN usage | Medium | IP categorization |

#### 2.4.2 Risk Score Calculation
```typescript
interface RiskFactors {
  deviceKnown: boolean;
  locationKnown: boolean;
  ipReputation: 'good' | 'neutral' | 'bad';
  timeAnomaly: boolean;
  velocityScore: number;
}

function calculateRiskScore(factors: RiskFactors): RiskLevel {
  let score = 0;
  if (!factors.deviceKnown) score += 40;
  if (!factors.locationKnown) score += 30;
  if (factors.ipReputation === 'bad') score += 50;
  if (factors.timeAnomaly) score += 10;
  score += factors.velocityScore;
  
  if (score >= 80) return 'CRITICAL';
  if (score >= 60) return 'HIGH';
  if (score >= 40) return 'MEDIUM';
  return 'LOW';
}
```

### 2.5 Step-Up Authentication

#### 2.5.1 Triggers for Step-Up
- Accessing high-sensitivity data classifications
- Privileged operation execution (role changes, exports)
- Large data export requests
- Administrative function access
- Risk score exceeds threshold
- Session age exceeds 4 hours

#### 2.5.2 Step-Up Methods (in order of preference)
1. Hardware security key (FIDO2/WebAuthn)
2. Authenticator app TOTP
3. SMS OTP (fallback only)
4. Email verification (lowest assurance)

### 2.6 Passwordless Authentication

#### 2.6.1 WebAuthn/FIDO2 Implementation
```typescript
// Registration flow
const credential = await navigator.credentials.create({
  publicKey: {
    challenge: serverGeneratedChallenge,
    rp: { name: 'Vantus Client Portal', id: 'portal.vantus.systems' },
    user: { id: userId, name: userEmail, displayName: userName },
    pubKeyCredParams: [
      { type: 'public-key', alg: -7 },   // ES256
      { type: 'public-key', alg: -257 }, // RS256
    ],
    authenticatorSelection: {
      authenticatorAttachment: 'platform',
      userVerification: 'required',
      residentKey: 'preferred',
    },
    attestation: 'direct',
  },
});
```

**Features:**
- Platform authenticators (Touch ID, Windows Hello) for convenience
- Roaming authenticators (YubiKey) for high-assurance scenarios
- Resident keys for username-less authentication
- Backup credential registration required

### 2.7 Biometric Authentication Hooks

#### 2.7.1 Implementation Architecture
```
Client Device (Secure Enclave/TEE)
    ↓
Biometric Verification (Local only - no biometric data transmitted)
    ↓
Cryptographic Signature with Private Key
    ↓
Server Verification with Registered Public Key
```

**Requirements:**
- Biometric data never leaves device
- Fallback to PIN/password if biometrics fail
- Maximum 3 biometric attempts before fallback
- Biometric revocation on device change

### 2.8 Hardware Security Key Support

#### 2.8.1 Supported Standards
- FIDO2 (WebAuthn)
- FIDO U2F (legacy support)
- CTAP2 protocol

#### 2.8.2 Recommended Devices
| Device | Assurance Level | Use Case |
|--------|----------------|----------|
| YubiKey 5 Series | AAL3 | Administrators, high-privilege |
| YubiKey Bio | AAL3 + Biometric | Maximum security requirements |
| Titan Security Key | AAL3 | Google ecosystem users |
| Platform Authenticators | AAL2 | General users, convenience |

### 2.9 Single Sign-On (SSO)

#### 2.9.1 SAML 2.0 Configuration
```xml
<!-- Required SAML Settings -->
<saml:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:persistent</saml:NameIDFormat>
<saml:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport</saml:AuthnContextClassRef>
```

**Security Requirements:**
- SAML assertions must be signed
- Response must be signed
- Assertions encrypted for sensitive attributes
- Clock skew tolerance: maximum 5 minutes
- IdP certificate pinning for known providers
- Metadata validation with PKIX

#### 2.9.2 OpenID Connect (OIDC) Configuration
```json
{
  "response_type": "code",
  "scope": "openid profile email",
  "code_challenge_method": "S256",
  "acr_values": "urn:mace:incommon:iap:silver"
}
```

**Requirements:**
- PKCE required for all flows
- State parameter mandatory
- Nonce validation for ID tokens
- ID token signature verification
- ID token expiration validation

### 2.10 Social Login Security

#### 2.10.1 Supported Providers
- Google Workspace (primary)
- Microsoft Azure AD
- Okta (enterprise)

#### 2.10.2 Security Controls
- Email verification required before account linkage
- Prevent account pre-hijacking attacks
- Require existing password for social account linkage
- Audit trail of all social login events
- Ability to revoke social connections
- No password creation for social-only accounts

### 2.11 Session Security

#### 2.11.1 Session Fixation Prevention
```typescript
// Regenerate session ID on authentication
app.post('/login', async (req, res) => {
  const user = await authenticate(req.body);
  if (user) {
    // Regenerate session to prevent fixation
    req.session.regenerate(() => {
      req.session.userId = user.id;
      req.session.save();
    });
  }
});
```

#### 2.11.2 Concurrent Session Limits
| Role | Max Concurrent Sessions | Action on Exceed |
|------|------------------------|------------------|
| Standard User | 5 | Invalidate oldest |
| Power User | 10 | Invalidate oldest |
| Administrator | 3 | Require explicit logout |
| Service Account | 1 | Block new, alert admin |

#### 2.11.3 Session Timeout Policies
```
Session Type        | Idle Timeout | Absolute Timeout | Sliding
--------------------|-------------|------------------|--------
Standard User       | 30 minutes  | 8 hours          | Yes
Power User          | 60 minutes  | 12 hours         | Yes
Administrator       | 15 minutes  | 4 hours          | No
API Session         | N/A         | Token TTL        | N/A
Remember Me         | 2 weeks     | 30 days          | No
```

### 2.12 Device Fingerprinting

#### 2.12.1 Fingerprint Components
```typescript
interface DeviceFingerprint {
  userAgent: string;           // Browser and OS
  screenResolution: string;    // Screen dimensions
  colorDepth: number;          // Display color depth
  timezone: string;            // Local timezone
  language: string;            // Browser language
  canvas: string;              // Canvas fingerprint hash
  webgl: string;               // WebGL renderer info
  fonts: string[];             // Installed fonts (subset)
  plugins: string[];           // Browser plugins
}
```

#### 2.12.2 Trust Score Calculation
- Known device: +50 trust points
- Consistent fingerprint: +20 points
- Verified via email: +10 points
- New device: 0 points (requires verification)
- Fingerprint anomaly: -30 points
- Known bad fingerprint: -100 points (block)

### 2.13 Trusted Device Management

#### 2.13.1 Device Lifecycle
```
Registration → Verification → Active → Suspicious → Revocation
```

#### 2.13.2 Device Trust Levels
| Level | Requirements | Capabilities |
|-------|--------------|--------------|
| Untrusted | New device | Read-only, no exports |
| Basic | Email verification | Standard access |
| Verified | 7 days + no anomalies | Full access |
| High Trust | Hardware key + 30 days | Privileged operations |

### 2.14 Geographic Access Controls

#### 2.14.1 Geo-Fencing Options
- Blocked countries (sanctioned regions)
- Allowed countries only mode
- Warning for new countries
- VPN/Tor detection and handling

#### 2.14.2 Impossible Travel Detection
```typescript
function detectImpossibleTravel(
  lastLocation: GeoLocation,
  currentLocation: GeoLocation,
  timeDelta: number
): boolean {
  const distance = calculateDistance(lastLocation, currentLocation);
  const maxPossibleDistance = timeDelta * MAX_HUMAN_SPEED_KMH;
  
  return distance > maxPossibleDistance;
}

// Alert thresholds
const MAX_HUMAN_SPEED_KMH = 900; // Commercial flight speed
const SUSPICIOUS_SPEED_KMH = 300; // High-speed rail
```

### 2.15 Time-Based Access Controls

#### 2.15.1 Business Hours Enforcement
```
Role                | Allowed Hours (UTC) | Weekend Access
--------------------|---------------------|---------------
Standard User       | 06:00 - 22:00       | Yes
Power User          | 00:00 - 23:59       | Yes
Administrator       | 07:00 - 19:00       | No (on-call excepted)
Support Staff       | 00:00 - 23:59       | Yes (rotating)
```

#### 2.15.2 After-Hours Access
- Requires additional MFA factor
- Manager notification for privileged roles
- Enhanced logging and monitoring
- Session timeout reduced by 50%

---

## 3) Authorization & Access Control

### 3.1 Role-Based Access Control (RBAC)

#### 3.1.1 Role Hierarchy
```
System Admin
    └── Organization Admin
            ├── Department Manager
            │       ├── Team Lead
            │       │       └── Standard User
            │       └── Standard User
            └── Standard User
```

#### 3.1.2 Permission Granularity
| Permission Level | Description | Example |
|-----------------|-------------|---------|
| System | Cross-tenant operations | Manage organizations |
| Organization | Tenant-wide operations | Manage users, billing |
| Department | Scoped to department | View department reports |
| Resource | Individual resource | Edit specific document |
| Field | Data field level | View SSN, but not salary |

### 3.2 Attribute-Based Access Control (ABAC)

#### 3.2.1 Policy Definition Language
```json
{
  "policy": "classified-document-access",
  "effect": "PERMIT",
  "subjects": {
    "role": "ANALYST",
    "clearance": { "$gte": "SECRET" },
    "department": { "$in": ["SECURITY", "LEGAL"] }
  },
  "resources": {
    "classification": "SECRET",
    "department": { "$ref": "subject.department" }
  },
  "actions": ["READ", "DOWNLOAD"],
  "conditions": {
    "time": { "$between": ["08:00", "18:00"] },
    "location": { "$in": ["office", "vpn"] },
    "device_trust": { "$gte": "VERIFIED" }
  }
}
```

#### 3.2.2 Dynamic Attributes
| Subject Attributes | Resource Attributes | Environment Attributes |
|-------------------|--------------------|----------------------|
| User ID | Owner | Time of day |
| Role | Classification | Location |
| Department | Sensitivity | Device trust |
| Clearance level | Data type | Network security |
| Tenure | Creation date | Threat level |
| Training status | Expiration | Compliance mode |

### 3.3 Dynamic Authorization

#### 3.3.1 Real-Time Policy Evaluation
```typescript
// Policy Decision Point (PDP) integration
async function evaluateAccess(
  subject: Subject,
  resource: Resource,
  action: Action,
  environment: Environment
): Promise<Decision> {
  const context = await buildDecisionContext(subject, resource, environment);
  
  // Check static permissions
  const staticDecision = checkRBAC(subject, resource, action);
  if (staticDecision === 'DENY') return 'DENY';
  
  // Evaluate dynamic policies
  const dynamicDecision = await evaluateABAC(context);
  
  // Apply risk-based adjustments
  const riskAdjustment = calculateRiskAdjustment(context);
  
  return combineDecisions(staticDecision, dynamicDecision, riskAdjustment);
}
```

### 3.4 Just-in-Time (JIT) Access

#### 3.4.1 Elevation Workflow
```
1. User requests elevated access
2. Request logged with justification
3. Manager approval required (for production)
4. Time-bound grant (default: 4 hours, max: 24 hours)
5. Activity monitored and logged
6. Automatic revocation at expiration
7. Access audit report generated
```

#### 3.4.2 JIT Configuration
```typescript
interface JITConfig {
  role: string;
  approvers: string[];      // Manager roles who can approve
  defaultDuration: number;  // Minutes
  maxDuration: number;      // Minutes
  requiresMFA: boolean;
  requiresJustification: boolean;
  notificationChannels: ('email' | 'slack' | 'sms')[];
}
```

### 3.5 Segregation of Duties (SoD)

#### 3.5.1 Conflict Matrices
| Role A | Cannot Coexist With | Risk |
|--------|-------------------|------|
| Payment Creator | Payment Approver | Fraud |
| User Admin | Audit Admin | Cover-up |
| Data Exporter | Data Deleter | Exfiltration |
| Config Admin | Security Admin | Backdoor creation |

#### 3.5.2 Conflict Detection
```typescript
function detectSoDConflict(
  assignedRoles: string[]
): SoDConflict[] {
  const conflicts: SoDConflict[] = [];
  
  for (const [roleA, roleB, risk] of SOD_MATRIX) {
    if (assignedRoles.includes(roleA) && 
        assignedRoles.includes(roleB)) {
      conflicts.push({ roleA, roleB, risk });
    }
  }
  
  return conflicts;
}

// Prevent assignment if conflict exists
// Require compensating control documentation
// Alert security team for high-risk conflicts
```

### 3.6 Access Recertification

#### 3.6.1 Recertification Schedule
| Access Type | Frequency | Reviewer |
|-------------|-----------|----------|
| Privileged roles | Quarterly | CISO + Department Head |
| Standard roles | Semi-annually | Department Manager |
| Third-party access | Quarterly | Contract owner |
| Service accounts | Annually | Service owner |
| Emergency access | After each use | Security team |

#### 3.6.2 Recertification Workflow
```
1. Automated campaign initiation
2. Manager receives notification with access list
3. Review and attest each permission
4. Revoke or re-justify denied access
5. Escalation for non-response (auto-revoke after 14 days)
6. Audit trail preservation
```

### 3.7 Privileged Access Monitoring

#### 3.7.1 Monitored Activities
- All administrative commands
- Permission changes
- Sensitive data access
- Configuration modifications
- Export operations
- Authentication policy changes

#### 3.7.2 Monitoring Controls
| Control | Implementation |
|---------|---------------|
| Session recording | Keystroke logging for break-glass accounts |
| Real-time alerting | Immediate notification for sensitive operations |
| Peer review | Dual authorization for critical changes |
| Outlier detection | AI-based behavioral analysis |
| Video recording | Screen capture for highest-risk sessions |

---

## 4) Data Protection

### 4.1 Data Classification Framework

#### 4.1.1 Classification Levels
| Level | Description | Handling Requirements |
|-------|-------------|----------------------|
| Critical | Trade secrets, strategic plans, M&A data | Encryption at rest+transit, need-to-know, audit all access |
| Confidential | Client data, PII, financial records | Encryption at rest+transit, role-based access |
| Internal | Business processes, internal communications | Access control, no public sharing |
| Public | Marketing materials, public filings | Standard security controls |

#### 4.1.2 Classification Tags
```typescript
type DataClassification = 
  | 'CRITICAL'    // Red label
  | 'CONFIDENTIAL' // Amber label
  | 'INTERNAL'     // Yellow label
  | 'PUBLIC';      // Green label

interface ClassifiedData {
  classification: DataClassification;
  owner: string;
  retentionPeriod: number; // days
  encryptionRequired: boolean;
  exportRestricted: boolean;
}
```

### 4.2 Encryption at Rest

#### 4.2.1 Database Encryption
- Algorithm: AES-256-GCM
- Key Management: AWS KMS / Azure Key Vault / HashiCorp Vault
- Key Rotation: Automatic 90-day rotation
- Field-Level: SSN, credit cards, API keys encrypted individually

#### 4.2.2 File Storage Encryption
```typescript
// Server-side encryption configuration
const encryptionConfig = {
  algorithm: 'AES-256-GCM',
  keyManagement: 'CUSTOMER_MANAGED',
  keyId: process.env.ENCRYPTION_KEY_ID,
  // Per-file unique data encryption key (DEK)
  // DEK encrypted by key encryption key (KEK)
  envelopeEncryption: true,
};
```

### 4.3 Encryption in Transit

#### 4.3.1 TLS Configuration
```nginx
# TLS 1.3 only, no downgrade
ssl_protocols TLSv1.3;
ssl_ciphers TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256;
ssl_prefer_server_ciphers on;

# Certificate settings
ssl_certificate /etc/ssl/certs/vantus.crt;
ssl_certificate_key /etc/ssl/private/vantus.key;

# HSTS
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

#### 4.3.2 Certificate Requirements
- Minimum key size: RSA 2048-bit or ECDSA P-256
- Maximum validity: 397 days
- Certificate Transparency: Required
- OCSP Must-Staple: Enabled

### 4.4 Field-Level Encryption

#### 4.4.1 Implementation Pattern
```typescript
// Transparent field encryption
@Encrypted({
  algorithm: 'AES-256-GCM',
  searchable: false,  // Deterministic encryption if searchable
  blindIndex: true,   // For querying without decryption
})
class User {
  id: string;
  
  @Encrypted
  ssn: string;
  
  @Encrypted({ searchable: true })
  email: string;  // Deterministic for lookup
  
  @Encrypted
  apiKeys: string[];
}
```

### 4.5 Tokenization

#### 4.5.1 Sensitive Data Tokenization
| Original Data | Token Format | Storage |
|--------------|--------------|---------|
| Credit Card | `tok_visa_4242xxxxxxxx4242` | Token vault only |
| SSN | `tok_ssn_xxx-xx-6789` | Last 4 in DB, full in vault |
| Bank Account | `tok_ba_xxxxxx7890` | Token vault only |

#### 4.5.2 Token Vault Security
- Isolated network segment
- Dedicated HSM for token generation
- No direct database access
- Audit all detokenization requests

### 4.6 Data Masking in Logs

#### 4.6.1 Masking Rules
```typescript
const maskingRules = {
  email: (email: string) => email.replace(/(?<=.{2}).*?(?=@)/, '***'),
  ssn: () => '***-**-****',
  creditCard: (cc: string) => cc.slice(-4).padStart(cc.length, '*'),
  phone: (phone: string) => phone.replace(/\d(?=\d{4})/g, '*'),
  apiKey: () => '***REDACTED***',
  password: () => '***REDACTED***',
};

// Example output
// Original: john.doe@example.com
// Masked:   jo***@example.com
```

### 4.7 Data Loss Prevention (DLP)

#### 4.7.1 DLP Policy Rules
| Rule | Pattern | Action |
|------|---------|--------|
| SSN Detection | `\b\d{3}-\d{2}-\d{4}\b` | Block + Alert |
| Credit Card | Luhn algorithm valid | Block + Alert |
| Bulk Export | >1000 records | Require approval |
| External Email | Non-corporate domain | Warn + Encrypt |
| Suspicious Access | Off-hours bulk download | Alert + Limit |

### 4.8 Data Residency Controls

#### 4.8.1 Geographic Data Storage
| Data Type | Primary Region | Backup Region | Constraints |
|-----------|---------------|---------------|-------------|
| EU Client Data | eu-west-1 | eu-central-1 | GDPR compliance |
| US Client Data | us-east-1 | us-west-2 | State law compliance |
| AU Client Data | ap-southeast-2 | ap-southeast-4 | Privacy Act |
| Global Config | us-east-1 | eu-west-1 | No PII |

### 4.9 Secure Data Deletion

#### 4.9.1 Deletion Procedures
| Storage Type | Method | Verification |
|-------------|--------|--------------|
| Database | Crypto-shredding (delete encryption key) | Query verification |
| Files | Secure overwrite (DoD 5220.22-M) | Hash verification |
| Backups | Expiration policy + manual purge | Restore test |
| Logs | Retention-based auto-deletion | Audit log review |
| Cache | Immediate invalidation | Cache miss verification |

---

## 5) Application Security

### 5.1 Input Validation & Sanitization

#### 5.1.1 Validation Strategy
```typescript
// Zod schema with custom validators
const UserInputSchema = z.object({
  email: z.string()
    .email()
    .max(254)
    .transform(v => v.toLowerCase().trim()),
  
  username: z.string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .refine(async val => !isReservedUsername(val)),
  
  age: z.number()
    .int()
    .min(13)
    .max(150),
  
  bio: z.string()
    .max(500)
    .transform(v => DOMPurify.sanitize(v, { ALLOWED_TAGS: [] })),
});
```

### 5.2 Output Encoding

#### 5.2.1 Context-Specific Encoding
| Context | Encoding Method | Example |
|---------|-----------------|---------|
| HTML Body | HTML entities | `&lt;script&gt;` |
| HTML Attribute | Quote + HTML entities | `value="&lt;img&gt;"` |
| JavaScript | JSON stringify + hex | `\x3cscript\x3e` |
| URL | Percent encoding | `%3Cscript%3E` |
| CSS | CSS escape | `\3c script\3e` |
| SQL | Parameterized queries | Prepared statements |

### 5.3 SQL Injection Prevention

#### 5.3.1 Secure Query Patterns
```typescript
// ORM with parameterization (Prisma example)
const users = await prisma.user.findMany({
  where: {
    email: userInput,  // Automatically parameterized
    organizationId: orgId,
  },
});

// Raw query with explicit parameterization
const result = await prisma.$queryRaw`
  SELECT * FROM users 
  WHERE email = ${userInput}
  AND org_id = ${orgId}
`;

// NEVER: String concatenation
// const query = `SELECT * FROM users WHERE email = '${input}'`;
```

### 5.4 NoSQL Injection Prevention

#### 5.4.1 MongoDB Security
```typescript
// Vulnerable: Direct object injection
// db.users.find({ email: userInput })

// Secure: Schema validation + type coercion
const safeQuery = {
  email: String(userInput),  // Force string type
  orgId: new ObjectId(orgId), // Validate ObjectId format
};

// Prevent NoSQL operators in input
const sanitizedInput = sanitizeNoSQL(userInput);
// Removes: $where, $gt, $lt, $ne, etc. from user input
```

### 5.5 Command Injection Prevention

#### 5.5.1 Safe Command Execution
```typescript
// DANGEROUS: Shell execution with user input
// exec(`convert ${userFile} output.png`);

// SAFE: Array-based arguments (no shell interpretation)
import { execFile } from 'child_process';
execFile('convert', [userFile, 'output.png']);

// SAFER: Allowlist validation
const ALLOWED_COMMANDS = ['convert', 'resize'];
if (!ALLOWED_COMMANDS.includes(command)) {
  throw new Error('Unauthorized command');
}
```

### 5.6 LDAP Injection Prevention

#### 5.6.1 LDAP Escaping
```typescript
function escapeLDAP(input: string): string {
  return input
    .replace(/\\/g, '\\5c')
    .replace(/\*/g, '\\2a')
    .replace(/\(/g, '\\28')
    .replace(/\)/g, '\\29')
    .replace(/\u0000/g, '\\00');
}

// Usage
const filter = `(&(objectClass=user)(cn=${escapeLDAP(userInput)}))`;
```

### 5.7 XML/XXE Attack Prevention

#### 5.7.1 Secure XML Parsing
```typescript
import { DOMParser } from '@xmldom/xmldom';

const parser = new DOMParser({
  // Disable external entity processing
  resolveExternals: false,
  preserveWhiteSpace: false,
  // Limit document size
  maxTextLength: 100000,
  maxElementDepth: 100,
});

// For libxml-based parsers
const options = {
  noent: false,      // Disable entity expansion
  dtdload: false,    // Don't load external DTDs
  nonet: true,       // No network access
  maxBufferSize: 10 * 1024 * 1024, // 10MB limit
};
```

### 5.8 Server-Side Request Forgery (SSRF) Prevention

#### 5.8.1 URL Validation
```typescript
import { URL } from 'url';

function validateURL(input: string): URL {
  const url = new URL(input);
  
  // Block private IP ranges
  const blockedRanges = [
    '127.0.0.0/8',
    '10.0.0.0/8',
    '172.16.0.0/12',
    '192.168.0.0/16',
    '169.254.0.0/16', // Link-local
    '0.0.0.0/8',
    '::1/128',
    'fc00::/7',
    'fe80::/10',
  ];
  
  if (isInBlockedRange(url.hostname, blockedRanges)) {
    throw new Error('SSRF attempt detected');
  }
  
  // DNS rebinding protection
  const resolvedIP = dns.resolve4(url.hostname);
  if (isInBlockedRange(resolvedIP, blockedRanges)) {
    throw new Error('DNS rebinding detected');
  }
  
  return url;
}
```

### 5.9 Insecure Deserialization Prevention

#### 5.9.1 Safe Serialization
```typescript
// JSON only - no native deserialization
const serialized = JSON.stringify(data);
const deserialized = JSON.parse(serialized);

// Type validation after parsing
const result = UserSchema.parse(deserialized);

// NEVER: eval(), new Function(), or native deserialize
// NEVER: Python pickle, Java ObjectInputStream, PHP unserialize
```

### 5.10 Security Headers

#### 5.10.1 Required Headers
| Header | Value | Purpose |
|--------|-------|---------|
| Content-Security-Policy | See section 5.12 | XSS prevention |
| Strict-Transport-Security | `max-age=31536000; includeSubDomains; preload` | HTTPS enforcement |
| X-Content-Type-Options | `nosniff` | MIME sniffing prevention |
| X-Frame-Options | `DENY` | Clickjacking protection |
| Referrer-Policy | `strict-origin-when-cross-origin` | Privacy protection |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` | Feature restriction |
| Cross-Origin-Embedder-Policy | `require-corp` | Resource isolation |
| Cross-Origin-Opener-Policy | `same-origin` | Cross-window isolation |
| Cross-Origin-Resource-Policy | `same-origin` | Resource access control |

### 5.11 Subresource Integrity (SRI)

#### 5.11.1 SRI Implementation
```html
<!-- External scripts with integrity hash -->
<script 
  src="https://cdn.example.com/library.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous">
</script>

<!-- CSS with SRI -->
<link 
  rel="stylesheet"
  href="https://cdn.example.com/styles.css"
  integrity="sha384-..."
  crossorigin="anonymous">
```

### 5.12 Content Security Policy (Detailed)

#### 5.12.1 CSP Configuration
```
default-src 'self';
script-src 'self' 'nonce-{random}' 'strict-dynamic' https://trusted-cdn.com;
style-src 'self' 'nonce-{random}' https://fonts.googleapis.com;
img-src 'self' data: https://cdn.vantus.systems;
font-src 'self' https://fonts.gstatic.com;
connect-src 'self' https://api.vantus.systems https://analytics.vantus.systems;
media-src 'self';
object-src 'none';
frame-src 'none';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
upgrade-insecure-requests;
block-all-mixed-content;
require-trusted-types-for 'script';
trusted-types default sanitizer;
```

#### 5.12.2 CSP Reporting
```
report-uri https://csp-report.vantus.systems/collect;
report-to csp-endpoint;
```

---

## 6) File Upload Security

### 6.1 File Type Verification

#### 6.1.1 Magic Number Validation
```typescript
const FILE_SIGNATURES = {
  // Images
  'image/png': [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
  'image/jpeg': [[0xFF, 0xD8, 0xFF]],
  'image/gif': [[0x47, 0x49, 0x46, 0x38, 0x37, 0x61], [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]],
  'image/webp': [[0x52, 0x49, 0x46, 0x46]],
  
  // Documents
  'application/pdf': [[0x25, 0x50, 0x44, 0x46]],
  'application/zip': [[0x50, 0x4B, 0x03, 0x04]],
  
  // Block dangerous types
  'application/x-msdownload': null, // Block .exe
  'application/x-sh': null,         // Block shell scripts
};

function verifyMagicNumber(buffer: Buffer, expectedType: string): boolean {
  const signatures = FILE_SIGNATURES[expectedType];
  if (!signatures) return false; // Unknown type = block
  
  return signatures.some(sig => 
    buffer.slice(0, sig.length).equals(Buffer.from(sig))
  );
}
```

### 6.2 File Size Limits

#### 6.2.1 Per-Type Limits
| File Type | Max Size | Purpose |
|-----------|----------|---------|
| Profile images | 5 MB | User avatars |
| Documents | 50 MB | PDF, Word, Excel |
| Attachments | 100 MB | General uploads |
| Bulk imports | 500 MB | CSV/Excel data |
| Media files | 250 MB | Video/audio |

### 6.3 Virus/Malware Scanning

#### 6.3.1 Scanning Pipeline
```
Upload → Quarantine → Scan (ClamAV + Cloud) → 
  ├─ Clean → Move to storage
  └─ Infected → Delete + Alert + Log
```

#### 6.3.2 Integration
```typescript
interface ScanResult {
  fileId: string;
  status: 'CLEAN' | 'INFECTED' | 'ERROR';
  threats?: string[];
  scanEngine: string;
  scanDuration: number;
}

async function scanFile(fileBuffer: Buffer): Promise<ScanResult> {
  // Primary: Local ClamAV
  const localResult = await clamav.scanBuffer(fileBuffer);
  
  // Secondary: Cloud scan for high-risk uploads
  if (localResult.clean && fileBuffer.length > 10 * 1024 * 1024) {
    const cloudResult = await virusTotal.scan(fileBuffer);
    return consolidateResults(localResult, cloudResult);
  }
  
  return localResult;
}
```

### 6.4 Sandbox Analysis

#### 6.4.1 Dynamic Analysis
- Execute files in isolated container
- Monitor for suspicious behavior:
  - Network connections
  - File system modifications
  - Process spawning
  - Registry changes
- Timeout: 5 minutes maximum

### 6.5 Quarantine Procedures

#### 6.5.1 Quarantine Workflow
```
Upload received → Stored in quarantine bucket → Scan initiated →
  ├─ Clean: Move to production storage, notify user
  ├─ Suspicious: Extended analysis, admin notification
  └─ Malicious: Delete, block user, security alert
```

### 6.6 Content Validation

#### 6.6.1 Image Sanitization
```typescript
import sharp from 'sharp';

async function sanitizeImage(input: Buffer): Promise<Buffer> {
  return sharp(input)
    .rotate() // Normalize orientation
    .removeAlpha() // Remove transparency (optional)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .jpeg({ quality: 90 }) // Re-encode to remove metadata
    .toBuffer();
}
```

#### 6.6.2 Document Sanitization
```typescript
// Remove macros and scripts from Office documents
// Strip embedded objects
// Remove external links
// Flatten PDFs to remove JavaScript
```

### 6.7 Storage Isolation

#### 6.7.1 Storage Segmentation
| Bucket | Access | Encryption |
|--------|--------|------------|
| quarantine-incoming | Scan service only | SSE-S3 |
| user-uploads | Application only | SSE-KMS |
| public-assets | CloudFront read-only | SSE-S3 |
| backup-exports | Backup service only | SSE-KMS |

---

## 7) API Security

### 7.1 API Authentication

#### 7.1.1 OAuth 2.0 / OIDC Flows
```
Authorization Code Flow (with PKCE)
    |
    ├─ Web applications
    ├─ Mobile applications
    └─ SPA (Single Page Applications)

Client Credentials Flow
    |
    └─ Machine-to-machine (service accounts)

Device Code Flow
    |
    └─ Input-constrained devices
```

#### 7.1.2 JWT Token Security
```typescript
interface JWTPayload {
  sub: string;           // Subject (user ID)
  iss: string;           // Issuer (auth.vantus.systems)
  aud: string;           // Audience (api.vantus.systems)
  exp: number;           // Expiration
  iat: number;           // Issued at
  jti: string;           // Unique token ID (for revocation)
  scope: string;         // Granted scopes
  orgId: string;         // Organization context
  roles: string[];       // User roles
}

// Token signing
const token = jwt.sign(payload, privateKey, {
  algorithm: 'ES256',     // ECDSA with P-256
  expiresIn: '15m',
  issuer: 'auth.vantus.systems',
  audience: 'api.vantus.systems',
});
```

### 7.2 API Rate Limiting

#### 7.2.1 Tiered Rate Limits
| Tier | Requests/Minute | Burst | Scope |
|------|-----------------|-------|-------|
| Anonymous | 10 | 20 | IP-based |
| Authenticated | 100 | 200 | User-based |
| Premium | 500 | 1000 | User + Endpoint |
| Enterprise | 2000 | 5000 | API key + Endpoint |
| Internal | 10000 | 20000 | Service account |

#### 7.2.2 Rate Limit Response
```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1645544400
```

### 7.3 API Versioning Security

#### 7.3.1 Version Strategy
```
/api/v1/users      # Current stable
/api/v2/users      # Latest (may have breaking changes)
/api/edge/users    # Beta (unstable, additional auth required)
```

#### 7.3.2 Deprecation Policy
- Security fixes only for 2 previous versions
- 6-month deprecation notice
- Forced upgrade for critical vulnerabilities

### 7.4 API Input Validation

#### 7.4.1 Validation Layers
```
1. Transport (TLS, size limits)
2. Parsing (JSON Schema, type coercion)
3. Business (Zod schemas, domain rules)
4. Database (constraints, foreign keys)
```

### 7.5 API Output Filtering

#### 7.5.1 Response Scrubbing
```typescript
// Remove internal fields from API responses
const publicUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  // passwordHash: intentionally omitted
  // internalNotes: intentionally omitted
  // mfaSecret: intentionally omitted
});

function sanitizeResponse<T>(data: T, schema: z.ZodSchema): T {
  return schema.parse(data);
}
```

### 7.6 API Audit Logging

#### 7.6.1 Logged Events
```typescript
interface APIAuditEvent {
  timestamp: string;
  requestId: string;
  userId?: string;
  apiKeyId?: string;
  method: string;
  path: string;
  queryParams: Record<string, string>;
  // body: REDACTED for privacy
  responseStatus: number;
  ip: string;
  userAgent: string;
  durationMs: number;
  organizationId: string;
}
```

### 7.7 API Key Rotation

#### 7.7.1 Rotation Policy
```
- Standard keys: 90 days
- High-privilege keys: 30 days
- Emergency rotation: On demand
- Overlap period: 48 hours (old + new valid)
```

### 7.8 Webhook Security

#### 7.8.1 Webhook Authentication
```typescript
// HMAC signature verification
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(`sha256=${expected}`)
  );
}
```

#### 7.8.2 Webhook Delivery Security
- TLS 1.3 required for endpoints
- Certificate pinning for known receivers
- Retry with exponential backoff
- Idempotency keys for deduplication

### 7.9 GraphQL Security

#### 7.9.1 Query Depth Limiting
```typescript
import { createComplexityLimitRule } from 'graphql-validation-complexity';

const rules = [
  createComplexityLimitRule(1000, {
    onComplete: (complexity) => {
      console.log('Query complexity:', complexity);
    },
  }),
  depthLimit(10), // Maximum query depth
];
```

#### 7.9.2 Query Cost Analysis
```typescript
// Assign costs to fields
const costMap = {
  Query: {
    users: { multipliers: ['limit'], useMultipliers: true },
    user: { complexity: 1 },
  },
  User: {
    posts: { multipliers: ['first'], useMultipliers: true },
    orders: { complexity: 5 },
  },
};
```

---

## 8) Infrastructure Security

### 8.1 Network Segmentation

#### 8.1.1 Network Architecture
```
Internet
    │
    ▼
[CDN / WAF] ──► [DDoS Protection]
    │
    ▼
[Load Balancer] ──► [DMZ: Public API]
    │
    ▼
[Application Tier] ──► [Internal API]
    │
    ▼
[Data Tier] ──► [Database Cluster]
    │
    ▼
[Storage Tier] ──► [Object Storage]
```

#### 8.1.2 VLAN Segmentation
| VLAN | Purpose | CIDR | Access Rules |
|------|---------|------|--------------|
| Management | Bastion, monitoring | 10.0.1.0/24 | VPN only |
| Application | App servers | 10.0.2.0/24 | LB → App only |
| Database | DB servers | 10.0.3.0/24 | App → DB only |
| Cache | Redis cluster | 10.0.4.0/24 | App → Cache only |
| Queue | Message queue | 10.0.5.0/24 | Internal only |

### 8.2 Firewall Rules

#### 8.2.1 Cloud Security Groups
```yaml
# Application tier security group
AppSecurityGroup:
  ingress:
    - protocol: tcp
      port: 443
      source: LoadBalancerSG
    - protocol: tcp
      port: 22
      source: BastionSG
  egress:
    - protocol: tcp
      port: 5432
      destination: DatabaseSG
    - protocol: tcp
      port: 6379
      destination: CacheSG
```

### 8.3 DDoS Protection

#### 8.3.1 Protection Layers
| Layer | Service | Protection |
|-------|---------|------------|
| L3/L4 | Cloudflare Magic Transit / AWS Shield Advanced | Volumetric attacks |
| L7 | Cloudflare WAF / AWS WAF | Application attacks |
| API | Rate limiting + Challenge | Abuse, scraping |

#### 8.3.2 DDoS Response Playbook
```
1. Automated: Rate limiting, challenge pages
2. Alert: Security team notification
3. Escalate: Enable "Under Attack" mode
4. Manual: IP blocking, geo-blocking
5. Communication: Status page update
```

### 8.4 WAF Configuration

#### 8.4.1 OWASP Core Rule Set
```
- SQL Injection (941)
- XSS (941)
- LFI/RFI (931/932)
- RCE (932)
- Protocol Violations (920)
- Protocol Anomalies (921)
```

#### 8.4.2 Custom Rules
```yaml
# Block known bad IPs
- name: BlockMaliciousIPs
  action: block
  match:
    field: source_ip
    operator: in
    values: $MALICIOUS_IP_LIST

# Rate limit sensitive endpoints
- name: SensitiveEndpointLimit
  action: rate_limit
  match:
    path: /api/admin/*
  limit: 100/minute
```

### 8.5 Load Balancer Security

#### 8.5.1 Configuration
```
- TLS termination with HSM-backed keys
- Health check authentication
- Connection logging
- HTTP/2 and HTTP/3 support
- WebSocket upgrade security
```

### 8.6 Container Security

#### 8.6.1 Image Security
```dockerfile
# Use minimal base image
FROM node:20-alpine AS base

# Run as non-root
USER node

# Copy only necessary files
COPY --chown=node:node package*.json ./
RUN npm ci --only=production

# Multi-stage build
FROM gcr.io/distroless/nodejs20-debian11
COPY --from=base /app /app
WORKDIR /app
USER nonroot
```

#### 8.6.2 Runtime Security
```yaml
# Pod Security Policy
securityContext:
  runAsNonRoot: true
  runAsUser: 1000
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false
  capabilities:
    drop:
      - ALL
  seccompProfile:
    type: RuntimeDefault
```

### 8.7 Secrets Management

#### 8.7.1 Secret Lifecycle
```
Creation → Storage → Distribution → Rotation → Revocation → Audit
```

#### 8.7.2 Implementation
| Secret Type | Storage | Rotation |
|-------------|---------|----------|
| Database credentials | HashiCorp Vault | 90 days |
| API keys | AWS Secrets Manager | 90 days |
| TLS certificates | cert-manager | 60 days |
| Encryption keys | Cloud KMS | 365 days |
| CI/CD tokens | GitHub Secrets | 180 days |

---

## 9) Security Monitoring & Response

### 9.1 Security Event Logging

#### 9.1.1 Log Categories
| Category | Events | Retention |
|----------|--------|-----------|
| Authentication | Login, logout, MFA, failures | 7 years |
| Authorization | Permission changes, denials | 7 years |
| Data Access | Export, download, view | 7 years |
| Admin | Config changes, user mgmt | 7 years |
| System | Deployments, scaling, errors | 1 year |
| Security | Alerts, incidents, responses | 7 years |

#### 9.1.2 Log Format (CEF)
```
CEF:0|Vantus|Portal|2.0|100|Authentication Success|1|
  src=192.168.1.1
  dst=portal.vantus.systems
  suser=john.doe@example.com
  outcome=success
  reason=MFA verified
```

### 9.2 SIEM Integration

#### 9.2.1 Supported Platforms
- Splunk Enterprise Security
- Microsoft Sentinel
- Elastic Security
- Chronicle (Google)

#### 9.2.2 Integration Points
```
Application Logs ──► Log Aggregator ──► SIEM
                                        ├── Alerting
                                        ├── Correlation
                                        ├── Dashboards
                                        └── Reporting
```

### 9.3 Real-Time Alerting

#### 9.3.1 Alert Severities
| Severity | Response Time | Escalation |
|----------|--------------|------------|
| Critical | 15 minutes | Page on-call + Security Lead |
| High | 1 hour | Security team Slack |
| Medium | 4 hours | Daily digest + ticket |
| Low | 24 hours | Weekly report |

#### 9.3.2 Critical Alerts
- Successful login after multiple failures (brute force)
- Privileged account usage
- Impossible travel detected
- Bulk data export initiated
- Malware detected in upload
- WAF rule triggered (blocking mode)
- Certificate expiration < 7 days

### 9.4 Anomaly Detection

#### 9.4.1 Detection Models
```typescript
interface AnomalyRule {
  name: string;
  baseline: 'user' | 'organization' | 'global';
  metrics: string[];
  threshold: 'stddev' | 'percentage' | 'absolute';
  sensitivity: number;
}

const anomalyRules: AnomalyRule[] = [
  {
    name: 'unusual_login_time',
    baseline: 'user',
    metrics: ['login_hour'],
    threshold: 'stddev',
    sensitivity: 3, // 3 standard deviations
  },
  {
    name: 'data_exfiltration',
    baseline: 'organization',
    metrics: ['bytes_downloaded', 'records_exported'],
    threshold: 'percentage',
    sensitivity: 200, // 2x normal
  },
];
```

### 9.5 Behavioral Analytics

#### 9.5.1 User Behavior Analytics (UBA)
- Login pattern analysis
- Data access patterns
- Privilege usage frequency
- Time-of-day baselines
- Peer group comparison

### 9.6 Threat Intelligence Integration

#### 9.6.1 Intelligence Sources
| Source | Type | Integration |
|--------|------|-------------|
| MISP | IOCs | Automated blocking |
| AlienVault OTX | Reputation | Enrichment |
| Abuse.ch | Malware hashes | File scanning |
| FBI InfraGard | Alerts | Manual review |
| Commercial feeds | Various | SIEM correlation |

### 9.7 Incident Response Procedures

#### 9.7.1 Incident Classification
| Level | Definition | Response |
|-------|-----------|----------|
| P1 (Critical) | Active breach, data exfiltration | War room, C-level notification |
| P2 (High) | Confirmed compromise attempt | Security team mobilization |
| P3 (Medium) | Suspicious activity | Investigation initiated |
| P4 (Low) | Policy violation | Ticket creation |

#### 9.7.2 Response Playbook Summary
```
1. DETECT → Alert generation + triage
2. ANALYZE → Scope determination + evidence preservation
3. CONTAIN → Isolate affected systems
4. ERADICATE → Remove threat actor access
5. RECOVER → Restore normal operations
6. LESSONS → Post-incident review + improvements
```

### 9.8 Forensic Readiness

#### 9.8.1 Evidence Preservation
- Immutable logs (WORM storage)
- Memory dump capability
- Disk image automation
- Chain of custody procedures
- Legal hold capability

---

## 10) Compliance & Audit

### 10.1 SOC 2 Type II Controls

#### 10.1.1 Control Mapping
| Trust Service Criteria | Control ID | Implementation |
|-----------------------|------------|----------------|
| Security (CC6.1) | AUTH-001 | Multi-factor authentication |
| Security (CC6.2) | AUTH-002 | Password policies |
| Security (CC6.3) | ACCESS-001 | Role-based access control |
| Security (CC6.6) | CRYPTO-001 | Encryption at rest/transit |
| Availability (A1.2) | MON-001 | System monitoring |
| Confidentiality (C1.1) | DATA-001 | Data classification |

### 10.2 ISO 27001 Controls

#### 10.2.1 Control Implementation
| Control | Annex A Ref | Status |
|---------|-------------|--------|
| Access Control Policy | A.9.1.1 | Implemented |
| User Access Provisioning | A.9.2.1 | Automated |
| Privileged Access | A.9.2.3 | Monitored + JIT |
| Secret Authentication | A.9.4.3 | MFA required |
| Cryptographic Controls | A.10.1 | AES-256-GCM, TLS 1.3 |
| Malware Protection | A.12.2.1 | Multi-engine scanning |
| Logging | A.12.4 | Comprehensive + SIEM |
| Penetration Testing | A.12.6.1 | Quarterly external |

### 10.3 GDPR Security Requirements

#### 10.3.1 Data Protection Measures
| Article | Requirement | Implementation |
|---------|-------------|----------------|
| Art. 25 | Privacy by Design | Security built into SDLC |
| Art. 32 | Security of Processing | Encryption + Access controls |
| Art. 33 | Breach Notification | 72-hour notification process |
| Art. 35 | DPIA | Required for high-risk processing |

#### 10.3.2 Data Subject Rights Support
- Right to access: Self-service export
- Right to erasure: Automated deletion workflows
- Right to portability: Standardized export formats

### 10.4 CCPA Security Requirements

#### 10.4.1 Consumer Protection
- Encryption of personal information
- Access controls for consumer data
- Breach notification procedures
- Consumer request verification

### 10.5 HIPAA Security Considerations

#### 10.5.1 PHI Handling (if applicable)
```
Administrative Safeguards:
- Security management process
- Assigned security responsibility
- Workforce training
- Evaluation procedures

Technical Safeguards:
- Access control (unique user IDs)
- Audit controls
- Integrity controls
- Transmission security
```

### 10.6 PCI DSS Considerations

#### 10.6.1 Cardholder Data Environment (CDE)
```
If handling payment card data:
- Network segmentation for CDE
- No storage of full track data
- Encrypted transmission (TLS 1.3)
- Quarterly ASV scans
- Annual penetration testing
```

### 10.7 Audit Trail Requirements

#### 10.7.1 Audit Log Standards
| Field | Required | Description |
|-------|----------|-------------|
| Timestamp | Yes | ISO 8601 format, UTC |
| Actor | Yes | User ID or service account |
| Action | Yes | CRUD + custom actions |
| Resource | Yes | Affected resource ID |
| Outcome | Yes | Success/failure |
| IP Address | Yes | Source IP |
| Session ID | Conditional | For authenticated actions |
| Reason | Conditional | For denials/elevations |

### 10.8 Evidence Collection

#### 10.8.1 Evidence Types
| Type | Retention | Storage |
|------|-----------|---------|
| System logs | 7 years | Immutable storage |
| Access reviews | 7 years | Document repository |
| Pen test reports | 7 years | Secure vault |
| Training records | Duration + 3 years | HR system |
| Policy versions | Permanent | Document control |

---

## 11) Security Testing Requirements

### 11.1 Static Application Security Testing (SAST)

#### 11.1.1 Tools & Integration
| Tool | Scope | Integration |
|------|-------|-------------|
| Semgrep | Custom rules | CI/CD pipeline |
| CodeQL | GitHub repos | GitHub Actions |
| SonarQube | Code quality + security | Pre-commit hooks |
| ESLint Security | JavaScript/TypeScript | IDE + CI |

#### 11.1.2 SAST Policy
```yaml
sast:
  block_on: ['critical', 'high']
  warning_on: ['medium']
  ignore_low: false
  custom_rules:
    - no-dangerous-html
    - require-input-validation
    - sql-injection-patterns
```

### 11.2 Dynamic Application Security Testing (DAST)

#### 11.2.1 DAST Execution
| Environment | Frequency | Tool |
|-------------|-----------|------|
| Staging | Weekly | OWASP ZAP |
| Production | Monthly | Burp Suite Enterprise |
| API | Weekly | Postman + fuzzing |

#### 11.2.2 DAST Coverage
- All authenticated endpoints
- All unauthenticated endpoints
- File upload functionality
- Admin interfaces
- API endpoints

### 11.3 Software Composition Analysis (SCA)

#### 11.3.1 Dependency Scanning
```yaml
sca:
  tools:
    - Snyk
    - Dependabot
    - npm audit
  policy:
    auto_fix: ['low', 'moderate']
    manual_review: ['high']
    block_deploy: ['critical']
    license_check: true
```

### 11.4 Interactive Application Security Testing (IAST)

#### 11.4.1 IAST Implementation
- Instrumentation during integration tests
- Runtime vulnerability detection
- Coverage-based analysis
- Low false positive rate

### 11.5 Penetration Testing Requirements

#### 11.5.1 Testing Schedule
| Type | Frequency | Provider |
|------|-----------|----------|
| External network | Quarterly | Third-party firm |
| Web application | Quarterly | Third-party firm |
| Internal network | Annually | Third-party firm |
| API security | Quarterly | Third-party firm |
| Red team | Annually | Third-party firm |

#### 11.5.2 Scope Requirements
- All production endpoints
- Administrative interfaces
- API endpoints (authenticated + unauthenticated)
- Mobile applications (if applicable)
- Third-party integrations

### 11.6 Bug Bounty Program

#### 11.6.1 Program Structure
```
Platform: HackerOne or Bugcrowd
Scope: *.vantus.systems (excluding out-of-scope domains)
Rewards:
  - Critical: $5,000 - See pricing/pricing_public.yaml,000
  - High: $1,000 - $5,000
  - Medium: See pricing/pricing_public.yaml - $1,000
  - Low: See pricing/pricing_public.yaml - See pricing/pricing_public.yaml
Safe Harbor: Legal protection for good-faith research
```

### 11.7 Security Regression Testing

#### 11.7.1 Automated Security Tests
```typescript
// Example: Tenant isolation test
describe('Tenant Isolation', () => {
  it('should prevent cross-tenant data access', async () => {
    const tenantAUser = await authenticate(tenantA);
    const tenantBResource = await createResource(tenantB);
    
    const response = await request
      .get(`/api/resources/${tenantBResource.id}`)
      .set('Authorization', tenantAUser.token);
    
    expect(response.status).toBe(403);
  });
});
```

### 11.8 Fuzzing Requirements

#### 11.8.1 Fuzzing Targets
| Component | Tool | Input Type |
|-----------|------|------------|
| API endpoints | RESTler / Peach | HTTP requests |
| File uploads | AFL / libFuzzer | Binary files |
| Protocol handlers | Boofuzz | Protocol data |

---

## 12) Third-Party Security

### 12.1 Vendor Assessment Requirements

#### 12.1.1 Assessment Tiers
| Tier | Criteria | Assessment |
|------|----------|------------|
| Critical | Data processing, infrastructure | Annual on-site + SOC 2 review |
| High | Authentication, payments | Annual questionnaire + attestation |
| Medium | Analytics, communication | Initial questionnaire |
| Low | Public data sources | Self-attestation |

#### 12.1.2 Required Documentation
- SOC 2 Type II report (if applicable)
- ISO 27001 certification (if applicable)
- Penetration test summary
- Business continuity plan
- Incident response procedures
- Data processing addendum

### 12.2 Third-Party Integration Security

#### 12.2.1 Integration Requirements
```
- TLS 1.3 for all connections
- Mutual TLS (mTLS) for sensitive integrations
- API key rotation capability
- IP allowlisting where possible
- Request signing for webhooks
- Timeout and circuit breaker patterns
```

### 12.3 Supply Chain Security

#### 12.3.1 SBOM Requirements
```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.4",
  "components": [
    {
      "type": "library",
      "name": "next",
      "version": "14.0.0",
      "purl": "pkg:npm/next@14.0.0",
      "hashes": [{"alg": "SHA-256", "content": "..."}]
    }
  ]
}
```

#### 12.3.2 Supply Chain Controls
- Signed commits required
- Dependency review in PRs
- Automated vulnerability scanning
- Pinning of all dependencies
- Reproducible builds

### 12.4 Open Source Security

#### 12.4.1 OSS Policy
```
- License compliance scanning
- Vulnerability monitoring
- Maintenance status evaluation
- Security-focused fork evaluation
- Contribution guidelines for modifications
```

### 12.5 Dependency Scanning

#### 12.5.1 Scanning Pipeline
```
Code Push ──► Dependency Install ──► SCA Scan ──►
  ├─ Clean ──► Build
  └─ Vulnerabilities ──► Alert ──► Triage ──► Remediate
```

---

## Appendix A: Security Checklists

### A.1 New Feature Security Checklist

- [ ] Threat model documented
- [ ] Authentication requirements defined
- [ ] Authorization rules specified
- [ ] Input validation implemented
- [ ] Output encoding verified
- [ ] Security headers configured
- [ ] Audit logging added
- [ ] Unit tests include security scenarios
- [ ] SAST passing
- [ ] Security review completed

### A.2 Deployment Security Checklist

- [ ] No secrets in code
- [ ] Dependencies scanned
- [ ] Container images scanned
- [ ] TLS certificates valid
- [ ] Security groups reviewed
- [ ] WAF rules active
- [ ] Monitoring enabled
- [ ] Rollback plan documented

### A.3 Incident Response Checklist

- [ ] Incident declared and classified
- [ ] Response team assembled
- [ ] Evidence preserved
- [ ] Affected systems isolated
- [ ] Root cause identified
- [ ] Systems restored
- [ ] Post-incident review scheduled
- [ ] Lessons learned documented

---

## Appendix B: Security Contact Information

| Role | Contact | Escalation |
|------|---------|------------|
| Security Team | security@vantus.systems | N/A |
| On-Call Security | PagerDuty rotation | CISO |
| Incident Commander | incident@vantus.systems | CTO |
| Bug Bounty | hackerone.com/vantus | Security Lead |

---

**Document Control**

- **Owner:** Security Team
- **Review Cycle:** Quarterly
- **Approval:** CISO
- **Distribution:** Internal Use Only


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
