# CHK-CARE-004: Backup Oversight Checklist

**Reading Level:** 8th Grade | **Total Time:** 3.5 hours | **Audience:** New Care Clients & Compliance Audits

**Goal:** Ensure backups meet recovery targets, are secure, monitored, and regularly tested so restores work when needed.

---

## Key Terms Explained

| Term | Simple Definition |
|------|-------------------|
| **RPO** | Recovery Point Objective—maximum data loss acceptable (e.g., 1 hour of data) |
| **RTO** | Recovery Time Objective—maximum downtime acceptable (e.g., 4 hours to restore) |
| **Retention** | How long backups are kept before deletion |
| **Immutability** | Backups that cannot be changed or deleted (WORM = Write Once Read Many) |
| **Encryption** | Scrambling data so only authorized parties can read it |
| **Checksum/hash** | Mathematical fingerprint used to verify data integrity |
| **Anomaly** | Something unusual that may indicate a problem |
| **Replication** | Copying backups to another location for safety |

---

## Section 1: Scope and Policy (⏱️ 30 min)

**Done when:** In-scope data is listed, retention targets are written, and classification is complete

- [ ] **List all in-scope datasets** (⏱️ 15 min) | Risk: HIGH | Owner: Client-controlled
  - **What this means:** Written list of what gets backed up
  - **Ownership:** You confirm what's included; we document it
  - **Proof required:** Dataset list saved and cross-referenced to Scope Map (TPL-CARE-001)
  - **Success metric:** Every critical system appears on list or is noted as excluded
  - **Operating risk:** 60% of businesses cannot name what they back up—we require written lists

- [ ] **Document retention targets** (⏱️ 10 min) | Risk: HIGH | Owner: Client-controlled
  - **What is retention:** How long backups are kept (daily, weekly, monthly, yearly)
  - **Ownership:** You approve retention periods; must meet compliance requirements
  - **Proof required:** Retention policy signed by client
  - **Success metric:** Written retention schedule matches contract and compliance needs

- [ ] **Classify data sensitivity** (⏱️ 5 min) | Risk: MEDIUM | Owner: Client-controlled
  - **What this means:** Labeling data as public, internal, sensitive, or regulated
  - **Purpose:** Determines encryption and immutability requirements
  - **Proof required:** Data classification matrix completed
  - **CMMC note:** CMMC Level 2 requires data classification for CUI (Controlled Unclassified Information)

---

## Section 2: Implementation and Configuration (⏱️ 60 min)

**Done when:** Backup jobs are configured, encryption is verified, and immutability is applied where required

- [ ] **Confirm backup jobs and schedules** (⏱️ 15 min) | Risk: HIGH | Owner: Vantus
  - **What we verify:**
    - Backup frequency (hourly, daily, etc.)
    - Backup windows (when backups run)
    - Checkpoints (points in time you can restore to)
  - **Proof required:** Backup job configuration screenshot
  - **Success metric:** Jobs scheduled to meet RPO targets

- [ ] **Verify encryption at rest and in transit** (⏱️ 15 min) | Risk: HIGH | Owner: Vantus
  - **What this means:**
    - At rest: Backups encrypted when stored
    - In transit: Backups encrypted while being copied
  - **Proof required:** Encryption settings screenshot with algorithm noted
  - **Success metric:** AES-256 or equivalent encryption confirmed active

- [ ] **Document key management** (⏱️ 10 min) | Risk: HIGH | Owner: Client-controlled
  - **Ownership:** You control encryption keys; Vantus never stores master keys
  - **Proof required:** Key custody documented in vault (SOP-CARE-009)
  - **Success metric:** Key recovery process tested and documented

- [ ] **Configure cross-region replication** (⏱️ 10 min) | Risk: MEDIUM | Owner: Vantus
  - **What this means:** Backups copied to different geographic locations
  - **Purpose:** Protection against regional disasters
  - **Proof required:** Replication status screenshot
  - **Success metric:** Secondary copy confirmed in different region

- [ ] **Apply immutability (WORM) where required** (⏱️ 5 min) | Risk: HIGH | Owner: Client-controlled
  - **What is WORM:** Write Once Read Many—backups that cannot be changed or deleted
  - **When required:** Compliance mandates or ransomware protection
  - **Proof required:** Immutability settings screenshot
  - **Success metric:** Immutable backups confirmed for required datasets
  - **Ransomware note:** Immutable backups cannot be encrypted by attackers

- [ ] **Set lifecycle policies** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What are they:** Rules for moving old backups to cheaper storage or deleting them
  - **Proof required:** Lifecycle policy settings saved
  - **Success metric:** Automated lifecycle management active

---

## Section 3: Verification and Restore Readiness (⏱️ 60 min)

**Done when:** Restore tests are scheduled, integrity checks pass, and RPO/RTO are measured

- [ ] **Schedule restore verification plan** (⏱️ 15 min) | Risk: HIGH | Owner: Client-controlled
  - **What it is:** Regular testing to confirm backups can be restored
  - **Benchmark:** Most MSPs never test restores—we require quarterly tests
  - **Proof required:** Restore test scheduled with calendar invite (TPL-CARE-006)
  - **Success metric:** First test scheduled within 90 days

- [ ] **Document restore procedures** (⏱️ 15 min) | Risk: HIGH | Owner: Vantus
  - **What they are:** Step-by-step instructions for restoring data
  - **Proof required:** Restore runbook created and saved
  - **Success metric:** Runbook tested and confirmed accurate

- [ ] **Execute integrity checks** (⏱️ 20 min) | Risk: HIGH | Owner: Vantus
  - **What are they:** Verification that backup data is not corrupted
  - **Methods:** Checksums, hashes, test restores of sample files
  - **Proof required:** Integrity check results with hashes recorded
  - **Success metric:** All integrity checks pass; any issues logged with owner

- [ ] **Measure RPO and RTO** (⏱️ 10 min) | Risk: MEDIUM | Owner: Vantus
  - **RPO measurement:** Time between last backup and potential data loss event
  - **RTO measurement:** Time to restore from backup
  - **Proof required:** RPO/RTO measurements documented
  - **Success metric:** Actual recovery capabilities meet or exceed targets

---

## Section 4: Observability and Alerting (⏱️ 30 min)

**Done when:** Backup metrics are visible, failure alerts work, and aging alerts are configured

- [ ] **Surface backup metrics to monitoring** (⏱️ 10 min) | Risk: HIGH | Owner: Vantus
  - **What this means:** Backup status visible in monitoring dashboard
  - **Proof required:** Dashboard screenshot showing backup status
  - **Success metric:** All backup jobs report status to monitoring

- [ ] **Configure failure alerts** (⏱️ 10 min) | Risk: HIGH | Owner: Vantus
  - **What they do:** Notify when backups fail
  - **Proof required:** Alert rule screenshot and test alert confirmation
  - **Success metric:** Failed backup alerts received within SLA (typically 15 minutes)

- [ ] **Set retention aging alerts** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What they do:** Warn before backups are deleted due to age
  - **Proof required:** Aging alert rules configured
  - **Success metric:** Alerts fire before automatic deletion

- [ ] **Document alert response runbook** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **Proof required:** Runbook saved with monitoring owner assigned
  - **Success metric:** Named owner knows how to respond to backup alerts

---

## Section 5: Governance and Evidence (⏱️ 30 min)

**Done when:** Evidence pack is updated, compliance sign-offs are captured, and audit trail is stored

- [ ] **Update evidence pack** (⏱️ 10 min) | Risk: MEDIUM | Owner: Vantus
  - **What is evidence pack:** Organized compliance documentation (TPL-CARE-007)
  - **What goes in it:** Backup config, test reports, owner sign-offs
  - **Proof required:** Evidence pack updated with all backup documentation
  - **CMMC note:** Evidence pack structure supports CMMC audit requirements

- [ ] **Capture compliance sign-offs** (⏱️ 10 min) | Risk: HIGH | Owner: Client-controlled
  - **Ownership:** You approve that backup setup meets compliance requirements
  - **Proof required:** Signatures on compliance checklist (SOP-CARE-025)
  - **Success metric:** Written approval that requirements are met

- [ ] **Store audit trail** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What it is:** Record of all backup activities and changes
  - **Proof required:** Audit logs exported and secured
  - **Success metric:** Complete audit trail available for inspection

- [ ] **Validate deletion processes** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What we check:** Backups delete when retention expires; no orphaned data
  - **Proof required:** Deletion process test completed
  - **Success metric:** Retention policies execute as configured

---

## Completion Checklist

| Requirement | Status | Proof Location |
|-------------|--------|----------------|
| Dataset list documented | ☐ | Dataset list |
| Retention policy signed | ☐ | Policy document |
| Data classification complete | ☐ | Classification matrix |
| Backup jobs configured | ☐ | Config screenshot |
| Encryption verified | ☐ | Settings screenshot |
| Key custody documented | ☐ | Vault entry |
| Replication confirmed | ☐ | Status screenshot |
| Immutability applied | ☐ | Settings screenshot |
| Lifecycle policies set | ☐ | Policy settings |
| Restore test scheduled | ☐ | Calendar invite |
| Restore runbook created | ☐ | Runbook file |
| Integrity checks passed | ☐ | Check results |
| RPO/RTO measured | ☐ | Measurement doc |
| Backup metrics in monitoring | ☐ | Dashboard screenshot |
| Failure alerts configured | ☐ | Alert rules |
| Aging alerts set | ☐ | Alert settings |
| Alert runbook documented | ☐ | Runbook file |
| Evidence pack updated | ☐ | TPL-CARE-007 |
| Compliance sign-offs captured | ☐ | Signed checklist |
| Audit trail stored | ☐ | Log files |
| Deletion process validated | ☐ | Test record |

**Backup oversight completed:** ☐ Yes | Date: _________

**Next restore test:** Quarterly from completion date

---

## Risk Assessment Summary

| Risk | Level | Mitigation |
|------|-------|------------|
| Backup job failure | HIGH | Automated alerts; daily health checks |
| Ransomware encryption of backups | HIGH | Immutability (WORM) where required |
| Key loss | HIGH | Client controls keys; recovery tested |
| Unrecoverable backups | HIGH | Quarterly restore tests required |
| Compliance violation | MEDIUM | Evidence pack; documented approvals |
| Data retention gap | MEDIUM | Aging alerts; lifecycle validation |
| Encryption bypass | LOW | Verified settings; regular audits |

---

## Why This Checklist Matters

| Common MSP Practice | Vantus Standard |
|---------------------|-----------------|
| "We back up everything" without documentation | Written dataset list signed by client |
| Backups never tested | Quarterly restore tests required |
| No RPO/RTO tracking | Measured and reported monthly |
| Encryption "assumed" | Verified and documented |
| Shared key management | Client-controlled keys only |
| No immutability | WORM available for compliance and ransomware |
| Compliance on request | Evidence pack maintained proactively |

---

**SEO Keywords:** backup verification checklist, data backup audit, disaster recovery preparation, backup compliance, RPO RTO planning, immutable backups, backup testing procedure, data protection audit, backup monitoring, business continuity backup

---

*Version 3.0.0 | Last Updated: 2026-02-21 | Reading Level: 8th Grade*

*Related Documents: SOP-CARE-013 (Retention Expectations), SOP-CARE-014 (Restore Drills), TPL-CARE-006 (Restore Drill Report), TPL-CARE-007 (Evidence Pack)*
