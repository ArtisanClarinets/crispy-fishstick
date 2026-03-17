---
Document: CREDENTIAL_ESCROW_PROCEDURE
Doc ID: VS-TEMPLATE-OWN-002
Client: [[CLIENT_NAME]]
Project: [[PROJECT_NAME]]
Owner: Security Lead
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential - HIGH SECURITY
Source of Truth: docs/09_ownership_transfer/02_CREDENTIAL_ESCROW_PROCEDURE.md
---

# Credential Escrow Procedure (Break-Glass)

**Classification:** Confidential - High Security  
**Purpose:** Provide a safe, trackable way to recover access in emergency situations  
**Scope:** All critical system credentials and emergency access methods  
**Effective Date:** [[EFFECTIVE_DATE]]  
**Next Review:** [[REVIEW_DATE]]  

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-02-09 | Vantus Systems | Removed owner-controlled systems terminology, simplified language |
| 1.0.0 | [[DATE]] | [[AUTHOR]] | Initial release |

### Review & Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Client CISO | [[CLIENT_CISO]] | _________________ | _______ |
| Client CTO | [[CLIENT_CTO]] | _________________ | _______ |
| Vantus Security Lead | [[VANTUS_SECURITY]] | _________________ | _______ |

---

## 1. PURPOSE & SCOPE

### 1.1 Purpose

This procedure sets up a secure system for storing critical system credentials. This ensures that authorized people can regain administrative access during emergencies while maintaining strict security controls and tracking.

### 1.2 Scope

This procedure applies to:
- Production system root/administrator credentials
- Cloud platform master account access
- Database superuser credentials
- SSL/TLS certificate private keys
- Encryption key master passwords
- Domain registrar administrative access
- Third-party service master accounts

### 1.3 Principles

1. **Dual Control:** No single person can access escrow alone
2. **Need-to-Know:** Access granted only for legitimate emergencies
3. **Track Everything:** All access logged and reviewed
4. **Rotation Required:** All accessed credentials changed within 24 hours
5. **Time-Limited:** Escrow access expires after use

---

## 2. WHAT IS ESCROWED

### 2.1 Escrow Package Contents

#### Tier 1: Critical Infrastructure (Level 1 Security)

| Item | Description | Format | Location |
|------|-------------|--------|----------|
| Cloud Root Credentials | AWS/Azure/GCP root account recovery | Encrypted USB | Physical safe |
| Domain Registrar Master | Domain ownership transfer codes | Printed + USB | Physical safe |
| SSL Private Keys | TLS certificate private keys | HSM backup | Secure storage |
| Database Root Passwords | PostgreSQL superuser credentials | Encrypted vault | Password manager |

#### Tier 2: Administrative Access (Level 2 Security)

| Item | Description | Format | Location |
|------|-------------|--------|----------|
| Admin Account Passwords | Primary admin account passwords | Password manager | Encrypted export |
| API Master Keys | Production API keys with full access | Encrypted file | Secure storage |
| Service Account Keys | Critical service account credentials | JSON key files | Encrypted USB |
| Encryption Keys | Data encryption master keys | HSM/Secure enclave | Dual control |

#### Tier 3: Recovery Information (Level 3 Security)

| Item | Description | Format | Location |
|------|-------------|--------|----------|
| Account Recovery Codes | 2FA backup codes | Printed | Sealed envelope |
| Emergency Contacts | Key personnel contact information | Printed | Sealed envelope |
| Vendor Support PINs | Vendor account support PINs | Printed | Sealed envelope |
| Network Diagrams | Infrastructure architecture | Printed | Secure binder |

### 2.2 Credential Inventory Table

| Credential ID | Type | System | Owner | Last Rotated | Next Rotation | Escrow Status |
|---------------|------|--------|-------|--------------|---------------|---------------|
| CREDS-001 | Root Account | AWS Production | [[OWNER]] | [[DATE]] | [[DATE]] | [ ] Escrowed |
| CREDS-002 | Root Account | Azure Production | [[OWNER]] | [[DATE]] | [[DATE]] | [ ] Escrowed |
| CREDS-003 | Superuser | PostgreSQL Primary | [[OWNER]] | [[DATE]] | [[DATE]] | [ ] Escrowed |
| CREDS-004 | Superuser | PostgreSQL Replica | [[OWNER]] | [[DATE]] | [[DATE]] | [ ] Escrowed |
| CREDS-005 | Master Key | SSL Certificate | [[OWNER]] | [[DATE]] | [[DATE]] | [ ] Escrowed |
| CREDS-006 | Admin | Domain Registrar | [[OWNER]] | [[DATE]] | [[DATE]] | [ ] Escrowed |
| CREDS-007 | API Key | External Service A | [[OWNER]] | [[DATE]] | [[DATE]] | [ ] Escrowed |
| CREDS-008 | API Key | External Service B | [[OWNER]] | [[DATE]] | [[DATE]] | [ ] Escrowed |
| CREDS-009 | Service Account | Backup Service | [[OWNER]] | [[DATE]] | [[DATE]] | [ ] Escrowed |
| CREDS-010 | Master Password | Password Manager | [[OWNER]] | [[DATE]] | [[DATE]] | [ ] Escrowed |

---

## 3. ACCESS RULES

### 3.1 Who Can Request Access

**Authorized Requestors:**

| Role | Can Request | Approval Required From |
|------|-------------|----------------------|
| CTO | Any Tier | CEO + CISO |
| CISO | Any Tier | CEO + CTO |
| VP Engineering | Tier 2-3 | CTO + CISO |
| IT Director | Tier 2-3 | CTO + VP Engineering |
| On-Call Lead | Tier 3 only | IT Director + CISO |

**Emergency Override:**
- In life-safety or critical business continuity scenarios
- CEO can authorize immediate access
- Must be documented and reviewed within 24 hours

### 3.2 Approval Requirements

| Tier | Approvers Required | Documentation Required |
|------|-------------------|----------------------|
| Tier 1 (Critical) | 2 C-level executives | Written justification + incident report |
| Tier 2 (Administrative) | 1 C-level + 1 Director | Written justification |
| Tier 3 (Recovery) | 1 Director + 1 Manager | Email justification |

### 3.3 Dual Control Requirements

**Physical Escrow Access:**
- Two authorized personnel must be present
- One retrieves from safe, one witnesses
- Both sign access log
- Access supervised by security officer

**Digital Escrow Access:**
- Secret Sharing or equivalent (Shamir's method)
- Minimum 2-of-3 or 3-of-5 key holders required
- All decryption attempts logged
- Time-limited access tokens

---

## 4. ACCESS PROCEDURE

### 4.1 Pre-Access Requirements

**Before Accessing Escrow:**
1. [ ] Exhaust all other recovery methods
2. [ ] Document reason for escrow access
3. [ ] Obtain required approvals
4. [ ] Assemble authorized personnel
5. [ ] Notify security team
6. [ ] Prepare rotation plan

### 4.2 Step-by-Step Access Procedure

#### Step 1: Request Initiation (0-15 minutes)

```
1. Requestor completes Escrow Access Request Form
2. Requestor submits to approvers
3. Approvers review and approve/reject
4. If approved, proceed to Step 2
5. If rejected, document alternative resolution
```

**Escrow Access Request Form:**

| Field | Value |
|-------|-------|
| Requestor Name | [[NAME]] |
| Requestor Role | [[ROLE]] |
| Date/Time of Request | [[DATETIME]] |
| Tier Requested | [[TIER]] |
| Credentials Needed | [[CREDENTIALS]] |
| Reason for Access | [[REASON]] |
| Other Methods Attempted | [[METHODS]] |
| Business Impact | [[IMPACT]] |
| Approver 1 | [[APPROVER1]] |
| Approver 1 Signature | _________________ |
| Approver 2 | [[APPROVER2]] |
| Approver 2 Signature | _________________ |

#### Step 2: Personnel Assembly (15-30 minutes)

```
1. Notify all required personnel
2. Schedule immediate meeting
3. Brief personnel on situation
4. Review access procedures
5. Assign roles:
   - Primary Accessor
   - Witness
   - Security Officer (if required)
   - Scribe
```

#### Step 3: Physical Access (30-60 minutes)

```
1. Primary Accessor and Witness travel to secure location
2. Security Officer verifies identities
3. Access log signed by all parties
4. Escrow package retrieved under dual control
5. Package opened in secure room with no cameras/recording
6. Credentials accessed and documented
7. Package resealed
8. Package returned to storage
9. Access log completed
```

**Access Log Entry:**

| Field | Value |
|-------|-------|
| Date/Time | [[DATETIME]] |
| Escrow ID | [[ID]] |
| Tier Accessed | [[TIER]] |
| Primary Accessor | [[NAME]] |
| Witness | [[NAME]] |
| Security Officer | [[NAME]] |
| Scribe | [[NAME]] |
| Duration of Access | [[DURATION]] |
| Credentials Accessed | [[CREDENTIALS]] |
| Seal Number (Before) | [[SEAL]] |
| Seal Number (After) | [[SEAL]] |
| Signatures | _________________ _________________ |

#### Step 4: Credential Use (Variable)

```
1. Use credentials only for stated purpose
2. Document all actions taken
3. Scribe records timeline
4. No credential sharing
5. No credential storage outside secure systems
6. Immediate use only - no delayed usage
```

#### Step 5: Post-Access Actions (0-24 hours)

```
1. Return credentials to escrow (if physical)
2. Complete incident/action report
3. Initiate credential rotation within 24 hours
4. Conduct post-access review
5. Update access log with completion
6. Archive all documentation
```

### 4.3 Emergency Break-Glass Procedure

**When to Use:**
- All primary administrators unavailable
- Critical system failure requiring immediate root access
- Security incident requiring immediate containment
- Life-safety or critical business continuity scenario

**Emergency Procedure:**

```
STEP 1: DECLARATION (0-5 minutes)
- Incident Commander declares break-glass emergency
- Documents reason and business justification
- Attempts to contact approvers

STEP 2: EMERGENCY ACCESS (5-15 minutes)
- If approvers unreachable, CEO may authorize
- Two senior personnel access escrow
- All actions logged in real-time
- Security team notified

STEP 3: RESOLUTION (15 minutes - variable)
- Resolve critical issue
- Document all actions
- Maintain chain of custody

STEP 4: POST-EMERGENCY (0-24 hours)
- Complete emergency access report
- Rotate all accessed credentials
- Conduct emergency review meeting
- Update procedures if needed
```

**Emergency Access Report:**

| Field | Value |
|-------|-------|
| Emergency ID | [[ID]] |
| Date/Time Declared | [[DATETIME]] |
| Incident Commander | [[NAME]] |
| Reason for Emergency | [[REASON]] |
| Attempts to Contact Approvers | [[ATTEMPTS]] |
| Emergency Authorization | [[AUTH]] |
| Personnel Involved | [[NAMES]] |
| Actions Taken | [[ACTIONS]] |
| Credentials Rotated | [ ] Yes / [ ] No |
| Rotation Date | [[DATE]] |
| Post-Review Date | [[DATE]] |

---

## 5. ROTATION REQUIREMENTS

### 5.1 When Rotation is Required

**Mandatory Rotation Triggers:**
- [ ] After any escrow access
- [ ] After personnel termination
- [ ] After suspected compromise
- [ ] Quarterly (scheduled)
- [ ] Annually (comprehensive)

### 5.2 Rotation Procedure

```
STEP 1: PREPARATION
- Identify all credentials to rotate
- Prepare rotation scripts
- Schedule maintenance window
- Notify stakeholders

STEP 2: ROTATION EXECUTION
- Generate new credentials
- Update credential stores
- Deploy to applications
- Verify functionality

STEP 3: VERIFICATION
- Test all systems with new credentials
- Verify no service disruptions
- Check logs for auth failures
- Confirm backup systems functional

STEP 4: CLEANUP
- Revoke old credentials
- Delete old credential exports
- Update escrow package
- Document rotation completion
```

### 5.3 Rotation Evidence

**Required Documentation:**

| Credential ID | Old Value Status | New Value Status | Rotation Date | Verified By |
|---------------|------------------|------------------|---------------|-------------|
| CREDS-001 | [ ] Revoked | [ ] Active | [[DATE]] | [[NAME]] |
| CREDS-002 | [ ] Revoked | [ ] Active | [[DATE]] | [[NAME]] |
| CREDS-003 | [ ] Revoked | [ ] Active | [[DATE]] | [[NAME]] |
| CREDS-004 | [ ] Revoked | [ ] Active | [[DATE]] | [[NAME]] |
| CREDS-005 | [ ] Revoked | [ ] Active | [[DATE]] | [[NAME]] |

---

## 6. STORAGE & SECURITY

### 6.1 Physical Storage

**Primary Storage:**
- Location: [[SECURE_LOCATION]]
- Container: Fireproof safe (TL-30 rating minimum)
- Access Control: Dual combination (2-of-2)
- Environmental: Climate controlled, monitored
- Surveillance: 24/7 camera coverage

**Secondary Storage (Backup):**
- Location: [[BACKUP_LOCATION]]
- Distance: Minimum 50 miles from primary
- Container: Equivalent security rating
- Access: Same dual control requirements

### 6.2 Digital Storage

**Encryption Standards:**
- Algorithm: AES-256-GCM
- Key Management: HSM or Secret Sharing
- Key Rotation: Annually
- Access Logging: All decryption attempts logged

**Storage Locations:**
- Primary: Hardware Security Module (HSM)
- Backup: Encrypted offline storage
- Recovery: Printed hard copies in sealed envelopes

### 6.3 Access Logging

**Log Retention:** 7 years  
**Log Contents:**
- Date/time of access
- Personnel involved
- Credentials accessed
- Reason for access
- Actions taken
- Rotation status

**Log Review:**
- Monthly: Automated review
- Quarterly: Security team review
- Annually: External audit

---

## 7. SUCCESS METRICS & AUDIT

### 7.1 Key Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Escrow Access Frequency | < 1 per year | Access log review |
| Rotation Compliance | 100% | Rotation evidence |
| Approval Compliance | 100% | Access request forms |
| Audit Findings | 0 critical | Quarterly audits |
| Access Time | < 1 hour | Access log timestamps |

### 7.2 Audit Requirements

**Quarterly Internal Audit:**
- [ ] Escrow package integrity verified
- [ ] Access log reviewed
- [ ] Rotation schedule compliance checked
- [ ] Storage security verified
- [ ] Personnel authorization current

**Annual External Audit:**
- [ ] Independent escrow verification
- [ ] Procedure effectiveness review
- [ ] Compliance certification
- [ ] Recommendations implemented

---

## 8. ROLES & RESPONSIBILITIES

### 8.1 Escrow Custodian

**Name:** [[CUSTODIAN_NAME]]  
**Backup:** [[BACKUP_CUSTODIAN]]

**Responsibilities:**
- Maintain physical security of escrow
- Verify access authorization
- Witness all escrow access
- Maintain access logs
- Coordinate credential rotation

### 8.2 Key Holders

**Secret Sharing Holders:**

| Holder | Share ID | Contact | Backup Holder |
|--------|----------|---------|---------------|
| [[NAME]] | Share-1 | [[CONTACT]] | [[BACKUP]] |
| [[NAME]] | Share-2 | [[CONTACT]] | [[BACKUP]] |
| [[NAME]] | Share-3 | [[CONTACT]] | [[BACKUP]] |
| [[NAME]] | Share-4 | [[CONTACT]] | [[BACKUP]] |
| [[NAME]] | Share-5 | [[CONTACT]] | [[BACKUP]] |

**Threshold:** 3-of-5 shares required for decryption

### 8.3 Security Officer

**Name:** [[SECURITY_OFFICER]]

**Responsibilities:**
- Approve/deny access requests
- Conduct post-access reviews
- Maintain security standards
- Coordinate with auditors
- Investigate anomalies

---

## 9. CERTIFICATION OF UNDERSTANDING

I have read and understand this Credential Escrow Procedure:

**Custodian:** _________________________________ Date: _______  
**Key Holder 1:** _________________________________ Date: _______  
**Key Holder 2:** _________________________________ Date: _______  
**Key Holder 3:** _________________________________ Date: _______  
**Key Holder 4:** _________________________________ Date: _______  
**Key Holder 5:** _________________________________ Date: _______  
**Security Officer:** _________________________________ Date: _______  

---

## 10. CHANGE HISTORY

| Date | Version | Change Description | Approved By |
|------|---------|-------------------|-------------|
| 2026-02-09 | 2.0.0 | Removed owner-controlled systems terminology, simplified language to 9th grade level | Vantus Systems |
| [[DATE]] | 1.0.0 | Initial credential escrow procedure creation | [[APPROVER]] |

---

[End of Credential Escrow Procedure]


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
