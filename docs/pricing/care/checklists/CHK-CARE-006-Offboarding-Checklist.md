# CHK-CARE-006: Offboarding Checklist

**Reading Level:** 8th Grade | **Total Time:** 3 hours (spread over transition period) | **Audience:** Departing Care Clients & Transition Teams

**Goal:** End services securely, provide complete handoff documentation, and produce an auditable record with proper data handling.

---

## Key Terms Explained

| Term | Simple Definition |
|------|-------------------|
| **Offboarding** | Process of ending service relationship |
| **Handoff packet** | Collection of documents given to client or new provider |
| **Decommission** | Permanently shutting down systems and access |
| **Data disposition** | Decision to keep, return, or delete data |
| **Retention** | How long records are kept after service ends |
| **Secure deletion** | Permanent removal that cannot be recovered |
| **Closeout** | Final meeting and documentation of service completion |

---

## Section 1: Transition Planning (⏱️ 30 min)

**Done when:** Offboarding date is confirmed, handoff packet is prepared, and final deliverables are scheduled

- [ ] **Confirm offboarding date and scope** (⏱️ 10 min) | Risk: HIGH | Owner: Client-controlled
  - **What this means:** Final service date and exactly what ends
  - **Ownership:** You set the date; we coordinate the transition
  - **Proof required:** Offboarding confirmation email with date and scope
  - **Success metric:** Date agreed by all parties in writing

- [ ] **Identify receiving party** (⏱️ 5 min) | Risk: MEDIUM | Owner: Client
  - **Who they might be:**
    - New IT provider
    - Internal IT team
    - No one (business closing)
  - **Proof required:** Receiving party contact information documented
  - **Success metric:** Handoff recipient identified and contacted

- [ ] **Prepare handoff packet** (⏱️ 10 min) | Risk: HIGH | Owner: Vantus
  - **What goes in it:**
    - Network documentation
    - System runbooks
    - Inventory records (TPL-CARE-010)
    - Vendor register (TPL-CARE-011)
    - Access credentials (securely transferred)
    - Current issues and workarounds
  - **Proof required:** Handoff packet checklist completed
  - **Success metric:** All items checked and packet ready for delivery

- [ ] **Schedule final deliverables** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What this means:** Timeline for final reports and documentation
  - **Proof required:** Deliverable schedule shared and confirmed
  - **Success metric:** Client knows when each item will arrive

---

## Section 2: Access and Credential Revocation (⏱️ 45 min)

**Done when:** All access removed, credentials rotated, and confirmations archived

- [ ] **Revoke user access** (⏱️ 15 min) | Risk: HIGH | Owner: Vantus
  - **What this means:** Removing login rights for all Vantus personnel
  - **Systems to check:**
    - Client servers and workstations
    - Cloud services (Microsoft 365, Google Workspace, etc.)
    - Network equipment
    - Third-party tools
  - **Proof required:** Access revocation log with timestamps
  - **Success metric:** Zero Vantus personnel with active access

- [ ] **Revoke contractor access** (⏱️ 5 min) | Risk: HIGH | Owner: Vantus
  - **Proof required:** Contractor access check completed
  - **Success metric:** All contractors confirmed removed

- [ ] **Revoke service account access** (⏱️ 10 min) | Risk: HIGH | Owner: Vantus
  - **What are service accounts:** Automated logins used by tools and scripts
  - **Proof required:** Service account audit with removals logged
  - **Success metric:** All Vantus-related service accounts disabled or deleted

- [ ] **Rotate shared credentials** (⏱️ 10 min) | Risk: HIGH | Owner: Client-controlled
  - **What this means:** Changing passwords Vantus may have known
  - **Ownership:** You control and execute password changes; we advise
  - **Proof required:** Credential rotation log with date and scope
  - **Success metric:** All shared credentials changed

- [ ] **Update vault entries** (⏱️ 5 min) | Risk: HIGH | Owner: Client
  - **What this means:** Removing Vantus access from password vaults (SOP-CARE-009)
  - **Proof required:** Vault audit showing Vantus entries removed
  - **Success metric:** Vantus cannot access any vaulted credentials

---

## Section 3: Agent and Integration Removal (⏱️ 30 min)

**Done when:** All Vantus tools removed and integrations disconnected

- [ ] **Remove monitoring agents** (⏱️ 10 min) | Risk: MEDIUM | Owner: Vantus
  - **What these are:** Software that reports system health to Vantus
  - **Proof required:** Agent removal log with system names
  - **Success metric:** No Vantus agents running on client systems

- [ ] **Remove remote access tools** (⏱️ 10 min) | Risk: HIGH | Owner: Vantus
  - **Examples:** Remote desktop tools, screen sharing, command-line access
  - **Proof required:** Remote tool audit with removal confirmation
  - **Success metric:** No remote access paths from Vantus to client

- [ ] **Disconnect integrations** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What these are:** Automated connections between systems
  - **Examples:** API connections, sync tools, automated workflows
  - **Proof required:** Integration disconnection log
  - **Success metric:** All Vantus integrations disabled

- [ ] **Remove automation tokens** (⏱️ 5 min) | Risk: HIGH | Owner: Vantus
  - **What these are:** Digital keys that allow automated system access
  - **Examples:** CI/CD tokens, API keys, service principals
  - **Proof required:** Token revocation list with timestamps
  - **Success metric:** All tokens revoked and verified non-functional

---

## Section 4: Data Disposition and Retention (⏱️ 45 min)

**Done when:** Data exports delivered, retention decided, and deletion authorized

- [ ] **Deliver data exports** (⏱️ 15 min) | Risk: HIGH | Owner: Client-controlled
  - **What this means:** Providing copies of client data per contract
  - **Ownership:** You specify what data you want; we package it securely
  - **Proof required:** Export delivery confirmation with hash verification
  - **Success metric:** Client confirms receipt and can open exports

- [ ] **Validate data exports** (⏱️ 10 min) | Risk: MEDIUM | Owner: Client
  - **What to check:**
    - All requested data included
    - Files open without corruption
    - Format is usable
  - **Proof required:** Export validation checklist completed
  - **Success metric:** Client signs validation confirmation

- [ ] **Document retention decisions** (⏱️ 10 min) | Risk: HIGH | Owner: Client-controlled
  - **Decisions needed:**
    - What Vantus keeps and for how long
    - What gets deleted immediately
    - What goes to archives
  - **Proof required:** Retention decision form signed by client
  - **Compliance note:** SOP-CARE-022 and SOP-CARE-025 govern retention
  - **Success metric:** Written agreement on all data disposition

- [ ] **Schedule deletion actions** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **Proof required:** Deletion schedule with dates and methods
  - **Success metric:** All deletions have assigned date and owner

- [ ] **Secure deletion verification** (⏱️ 5 min) | Risk: HIGH | Owner: Vantus
  - **What this means:** Confirming data cannot be recovered after deletion
  - **Proof required:** Deletion certificates or logs with method noted
  - **Success metric:** Proof of deletion on file for required data

---

## Section 5: Infrastructure Decommission (⏱️ 30 min)

**Done when:** Infrastructure shut down, DNS cleaned, and firewall rules updated

- [ ] **Execute decommission schedule** (⏱️ 10 min) | Risk: MEDIUM | Owner: Vantus
  - **What this means:** Shutting down Vantus-managed infrastructure
  - **Examples:** Virtual machines, cloud resources, hosted services
  - **Proof required:** Decommission log with timestamps
  - **Success metric:** All Vantus infrastructure properly shut down

- [ ] **Clean DNS records** (⏱️ 5 min) | Risk: MEDIUM | Owner: Client-controlled
  - **What this means:** Removing Vantus-related domain entries
  - **Ownership:** You approve DNS changes; we implement or advise
  - **Proof required:** DNS change log with before/after
  - **Success metric:** No Vantus-related DNS entries remain

- [ ] **Update firewall rules** (⏱️ 10 min) | Risk: HIGH | Owner: Client-controlled
  - **What this means:** Removing Vantus IP addresses and access rules
  - **Ownership:** You approve firewall changes
  - **Proof required:** Firewall rule audit with removals noted
  - **Success metric:** No firewall rules permitting Vantus access

- [ ] **Remove endpoints** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What this means:** Decommissioning connection points
  - **Proof required:** Endpoint removal checklist completed
  - **Success metric:** All Vantus endpoints removed from client environment

---

## Section 6: Final Verification and Closeout (⏱️ 30 min)

**Done when:** Removal verified, final scorecard delivered, and closeout meeting completed

- [ ] **Run final verification** (⏱️ 15 min) | Risk: HIGH | Owner: Shared
  - **What we check:**
    - Access attempts fail as expected
    - No residual connections
    - No orphaned accounts
  - **Proof required:** Verification test results with pass/fail
  - **Success metric:** All verification tests pass

- [ ] **Deliver final scorecard** (⏱️ 5 min) | Risk: LOW | Owner: Vantus
  - **What this is:** Final service summary and metrics
  - **Proof required:** Scorecard delivered and receipt confirmed
  - **Success metric:** Client acknowledges receipt

- [ ] **Conduct closeout meeting** (⏱️ 10 min) | Risk: LOW | Owner: Shared
  - **What we cover:**
    - Handoff packet review
    - Outstanding items discussion
    - Transition confirmation
  - **Proof required:** Meeting notes with attendee signatures
  - **Success metric:** All parties agree offboarding is complete

- [ ] **Archive records** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What this means:** Storing offboarding documentation per retention policy
  - **Proof required:** Archive confirmation with location noted
  - **Success metric:** All records properly stored and findable

---

## Completion Checklist

| Requirement | Status | Proof Location |
|-------------|--------|----------------|
| Offboarding date confirmed | ☐ | Confirmation email |
| Receiving party identified | ☐ | Contact record |
| Handoff packet prepared | ☐ | Packet checklist |
| Final deliverables scheduled | ☐ | Deliverable schedule |
| User access revoked | ☐ | Revocation log |
| Contractor access revoked | ☐ | Access audit |
| Service accounts removed | ☐ | Service account log |
| Shared credentials rotated | ☐ | Rotation log |
| Vault entries updated | ☐ | Vault audit |
| Monitoring agents removed | ☐ | Agent removal log |
| Remote access tools removed | ☐ | Tool audit |
| Integrations disconnected | ☐ | Disconnection log |
| Automation tokens revoked | ☐ | Token revocation list |
| Data exports delivered | ☐ | Delivery confirmation |
| Exports validated | ☐ | Validation checklist |
| Retention decisions documented | ☐ | Decision form |
| Deletion scheduled | ☐ | Deletion schedule |
| Secure deletion verified | ☐ | Deletion certificates |
| Infrastructure decommissioned | ☐ | Decommission log |
| DNS records cleaned | ☐ | DNS change log |
| Firewall rules updated | ☐ | Firewall audit |
| Endpoints removed | ☐ | Removal checklist |
| Final verification passed | ☐ | Test results |
| Final scorecard delivered | ☐ | Receipt confirmation |
| Closeout meeting completed | ☐ | Meeting notes |
| Records archived | ☐ | Archive confirmation |

**Offboarding completed:** ☐ Yes | Date: _________

**Records retention until:** Per contract or SOP-CARE-022

---

## Risk Assessment Summary

| Risk | Level | Mitigation |
|------|-------|------------|
| Residual access | HIGH | Multi-layer verification; access audit; final testing |
| Data loss | HIGH | Export validation; secure handoff; retention tracking |
| Orphaned credentials | HIGH | Credential rotation; vault audit; token revocation |
| Compliance violation | MEDIUM | Retention documentation; deletion certificates |
| Incomplete handoff | MEDIUM | Handoff packet checklist; closeout meeting |
| Business disruption | LOW | Phased decommission; rollback plan if needed |

---

## Why This Checklist Matters

| Common MSP Practice | Vantus Standard |
|---------------------|-----------------|
| Offboarding is informal | Structured process with written confirmation |
| Access removal not verified | Multi-layer verification with final testing |
| No data export process | Structured export with validation and hash verification |
| Credentials often forgotten | Comprehensive token and credential audit |
| No retention documentation | Written retention decisions with compliance tracking |
| No closeout meeting | Required closeout with sign-off |
| Records discarded | Proper archiving with retention enforcement |

---

**SEO Keywords:** IT offboarding checklist, service termination process, MSP transition, IT provider handoff, data export procedure, access revocation, credential rotation, service closeout, IT transition planning, provider change checklist

---

*Version 3.0.0 | Last Updated: 2026-02-21 | Reading Level: 8th Grade*

*Related Documents: SOP-CARE-031 (Provider Handoff), SOP-CARE-022 (Documentation Retention), SOP-CARE-025 (Compliance Evidence), TPL-CARE-018 (Project Closeout Pack)*
