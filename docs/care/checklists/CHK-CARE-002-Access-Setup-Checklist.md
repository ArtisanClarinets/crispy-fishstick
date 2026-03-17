# CHK-CARE-002: Access Setup Checklist

**Reading Level:** 8th Grade | **Total Time:** 2.5 hours | **Audience:** New Care Clients & Security Audits

**Goal:** Set up secure, compliant, and trackable access for every user before operations begin.

---

## Key Terms Explained

| Term | Simple Definition |
|------|-------------------|
| **MFA** | Multi-Factor Authentication—extra login security beyond password |
| **Least-privilege** | Users only get access to what they need for their job |
| **Break-glass** | Emergency access when normal login methods fail |
| **Access register** | Official list of who can access what systems |
| **Vaulting** | Secure storage for passwords and sensitive credentials |
| **Audit trail** | Record of who did what and when |

---

## Section 1: Account Hygiene (⏱️ 45 min)

**Done when:** Every user has their own account with MFA enabled and access is documented

- [ ] **Create named accounts only** (⏱️ 15 min) | Risk: HIGH | Owner: Client-controlled
  - **Standard:** One account per person—no shared logins allowed
  - **Why it matters:** Shared accounts cannot be tracked; breaches cannot be traced
  - **Operating risk:** Most small businesses use shared admin accounts—we prohibit this
  - **Proof required:** Account list showing named users only
  - **Success metric:** Zero shared accounts in production systems

- [ ] **Enable MFA on every privileged account** (⏱️ 15 min) | Risk: HIGH | Owner: Shared
  - **Privileged accounts:** Admins, service accounts with elevated rights
  - **Ownership:** Client controls MFA device; Vantus verifies enforcement
  - **Proof required:** MFA status screenshot for each privileged account
  - **Success metric:** 100% privileged account coverage

- [ ] **Enable MFA on all standard accounts** (⏱️ 10 min) | Risk: MEDIUM | Owner: Shared
  - **Benchmark:** Microsoft reports MFA blocks 99.9% of automated attacks
  - **Proof required:** MFA enrollment confirmation for each user
  - **Done when:** All users confirm MFA setup completion

- [ ] **Assign least-privilege roles** (⏱️ 5 min) | Risk: HIGH | Owner: Client-controlled
  - **What it means:** Users get minimum access needed for their job
  - **Ownership:** You approve role assignments; we implement
  - **Proof required:** Role assignment matrix saved to access register
  - **CMMC note:** Least-privilege is required for CMMC Level 2 compliance

---

## Section 2: Credential Management (⏱️ 45 min)

**Done when:** Passwords are vaulted, break-glass is tested, and rotation is scheduled

- [ ] **Configure password vault** (⏱️ 15 min) | Risk: HIGH | Owner: Client-controlled
  - **What is vaulting:** Secure encrypted storage for passwords (SOP-CARE-009)
  - **Ownership:** You own the vault master password; we never store it
  - **Security standard:** Vault encrypted at rest and in transit
  - **Proof required:** Vault configuration audit log saved
  - **Success metric:** Vault accessible and test entry confirmed

- [ ] **Document vault location and access** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **Proof required:** Vault access instructions documented and secured
  - **Success metric:** Instructions accessible to authorized personnel only

- [ ] **Test break-glass workflow** (⏱️ 15 min) | Risk: HIGH | Owner: Shared
  - **What is break-glass:** Emergency access when normal methods fail
  - **Why test it:** You don't want to discover it doesn't work during an emergency
  - **Proof required:** Break-glass test completed with timestamp and result
  - **Success metric:** Emergency access achieved within documented timeframe
  - **Automation:** Vantus tests quarterly; client notified of results

- [ ] **Schedule credential rotation** (⏱️ 10 min) | Risk: MEDIUM | Owner: Vantus
  - **What is rotation:** Changing passwords on a schedule
  - **Proof required:** Rotation calendar created and shared
  - **Success metric:** All credentials have rotation dates assigned

---

## Section 3: Logging and Detection (⏱️ 30 min)

**Done when:** All access is logged, alerts are configured, and retention meets requirements

- [ ] **Enable access logging** (⏱️ 10 min) | Risk: HIGH | Owner: Vantus
  - **What gets logged:** Logins, logouts, privilege changes, failed attempts
  - **Levels:** Platform, operating system, and control plane where possible
  - **Proof required:** Logging configuration screenshot with timestamp
  - **Success metric:** Test login appears in logs within 5 minutes

- [ ] **Forward logs to monitoring** (⏱️ 10 min) | Risk: MEDIUM | Owner: Vantus
  - **What it means:** Logs sent to central system for review and alerting
  - **Proof required:** Log forwarding status confirmed
  - **Success metric:** Logs appearing in monitoring dashboard

- [ ] **Set retention policy** (⏱️ 5 min) | Risk: MEDIUM | Owner: Client-controlled
  - **What is retention:** How long logs are kept
  - **Standard:** Per SOP-CARE-022 (minimum 90 days for most logs)
  - **CMMC note:** CMMC Level 2 requires 1-year log retention minimum
  - **Proof required:** Retention settings screenshot saved
  - **Success metric:** Retention period meets or exceeds requirements

- [ ] **Configure access alerts** (⏱️ 5 min) | Risk: HIGH | Owner: Vantus
  - **What alerts:** Failed logins, privilege changes, unusual access times
  - **Proof required:** Alert rules screenshot with test notification
  - **Success metric:** Test alert received within SLA (typically 15 minutes)

---

## Section 4: Access Register and Documentation (⏱️ 20 min)

**Done when:** Access register is complete, signed, and linked to evidence pack

- [ ] **Complete access register** (⏱️ 10 min) | Risk: HIGH | Owner: Vantus
  - **What is it:** Official record of who has access to what (TPL-CARE-009)
  - **Required fields:** User name, system, role, approval date, approver name, justification
  - **Proof required:** Access register populated with all current access
  - **Success metric:** 100% of access documented with approvals

- [ ] **Obtain security and compliance approvals** (⏱️ 5 min) | Risk: HIGH | Owner: Client-controlled
  - **Ownership:** You approve every elevated access role
  - **Proof required:** Approval signatures or email confirmations saved
  - **Success metric:** Written approval for all privileged access

- [ ] **Link to evidence pack** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What is evidence pack:** Organized compliance documentation (TPL-CARE-007)
  - **Proof required:** Access register saved to evidence pack location
  - **Success metric:** Register findable and version-controlled

---

## Section 5: Pre-Service Verification (⏱️ 20 min)

**Done when:** Access boundaries validated and client confirms readiness

- [ ] **Schedule verification session** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What is it:** Meeting to confirm access is set up correctly
  - **Proof required:** Calendar invite sent and accepted

- [ ] **Validate access boundaries** (⏱️ 10 min) | Risk: HIGH | Owner: Shared
  - **What we check:** Users can access what they need, nothing more
  - **Proof required:** Validation test results documented
  - **Success metric:** All users confirm correct access levels

- [ ] **Capture final sign-off** (⏱️ 5 min) | Risk: HIGH | Owner: Client-controlled
  - **Ownership:** You confirm access setup is complete and correct
  - **Proof required:** Signed acknowledgment or confirmation email
  - **Success metric:** Written approval before service kickoff

---

## Completion Checklist

| Requirement | Status | Proof Location |
|-------------|--------|----------------|
| Named accounts only (no shared logins) | ☐ | Account list |
| MFA enabled on all privileged accounts | ☐ | Screenshot files |
| MFA enabled on all standard accounts | ☐ | Enrollment confirmations |
| Least-privilege roles assigned | ☐ | Role matrix |
| Password vault configured | ☐ | Configuration log |
| Break-glass workflow tested | ☐ | Test result record |
| Rotation schedule created | ☐ | Calendar entries |
| Access logging enabled | ☐ | Config screenshot |
| Log retention set | ☐ | Settings screenshot |
| Access alerts configured | ☐ | Alert rules screenshot |
| Access register complete | ☐ | TPL-CARE-009 |
| Approvals captured | ☐ | Signed forms |
| Client sign-off obtained | ☐ | Confirmation email |

**Access setup completed:** ☐ Yes | Date: _________

**Next review:** Quarterly

---

## Risk Summary by Section

| Section | Highest Risk Item | Mitigation |
|---------|-------------------|------------|
| Account Hygiene | Shared accounts | Named accounts required; enforced by policy |
| Credential Management | Vault compromise | Client controls master password; encryption at rest |
| Logging/Detection | Log tampering | Immutable logs where possible; regular integrity checks |
| Documentation | Missing approvals | Checklist blocks completion without sign-off |
| Verification | Incorrect boundaries | Testing session with client confirmation |

---

## Why This Checklist Matters

| Common Practice | Vantus Standard |
|-----------------|-----------------|
| Competitors allow shared admin accounts | Named accounts required; shared accounts prohibited |
| MFA "recommended" but not enforced | MFA mandatory on all accounts; enforced technically |
| No documented break-glass procedure | Break-glass tested and documented; quarterly retests |
| Access granted verbally | Written approval required for all privileged access |
| Logs kept 30 days or less | 90-day minimum; CMMC option for 1-year retention |
| No regular access reviews | Quarterly access register review required |

---

**SEO Keywords:** secure access setup, identity management checklist, user access provisioning, MFA implementation, privileged access management, account security setup, credential vaulting, access control audit, least privilege access, IT security onboarding

---

*Version 3.0.0 | Last Updated: 2026-02-21 | Reading Level: 8th Grade*

*Related Documents: SOP-CARE-008 (Least-Privilege Standard), SOP-CARE-009 (Credential Vaulting), TPL-CARE-009 (Access Register)*
