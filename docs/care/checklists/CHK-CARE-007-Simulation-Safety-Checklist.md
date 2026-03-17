# CHK-CARE-007: Simulation Safety Checklist

**Reading Level:** 8th Grade | **Total Time:** 2 hours (plus simulation duration) | **Audience:** Clients Undergoing Security Testing

**Goal:** Ensure security simulations (penetration tests, chaos tests, safety exercises) are authorized, bounded by clear Rules of Engagement (ROE), and run with safety guardrails to prevent harm.

---

## Key Terms Explained

| Term | Simple Definition |
|------|-------------------|
| **ROE** | Rules of Engagement—written rules defining what testing can and cannot do |
| **Simulation** | Controlled test of security or resilience (penetration test, chaos test, etc.) |
| **Stop authority** | Person with power to immediately halt testing |
| **Do-not-touch list** | Systems and data explicitly excluded from testing |
| **Kill switch** | Mechanism to instantly stop automated testing |
| **Canary check** | Early warning test that detects problems before they spread |
| **Masking** | Hiding sensitive data while keeping format realistic |
| **Retest window** | Approved timeframe for follow-up testing |

---

## Section 1: Authorization and Objectives (⏱️ 30 min)

**Done when:** Written authorization received, objectives documented, and ROE pack created

- [ ] **Obtain written authorization** (⏱️ 15 min) | Risk: HIGH | Owner: Client-controlled
  - **Required elements:**
    - Clear impact statement (what could be affected)
    - Scope of testing (what's included)
    - Client signature with date
  - **Ownership:** You must sign before any testing begins
  - **Proof required:** Signed authorization form on file
  - **Success metric:** Authorization includes all required elements
  - **Operating risk:** Many providers start with verbal "OK"—we require written

- [ ] **Document test objectives** (⏱️ 10 min) | Risk: MEDIUM | Owner: Shared
  - **What to include:**
    - What the test will evaluate
    - Expected outcomes
    - Success criteria
  - **Proof required:** Objectives document signed by both parties
  - **Success metric:** Objectives are specific and measurable
  - **Why this matters:** Unlike competitors who use vague "security assessment" language

- [ ] **Create ROE pack** (⏱️ 5 min) | Risk: HIGH | Owner: Vantus
  - **What is ROE pack:** Complete Rules of Engagement documentation (TPL-CARE-008)
  - **Proof required:** ROE pack created and version-stamped
  - **Success metric:** ROE pack contains all required sections
  - **CMMC note:** ROE documentation supports CMMC assessment requirements

---

## Section 2: Safety and Pre-Flight Checks (⏱️ 30 min)

**Done when:** Stop authority confirmed, do-not-touch list signed, safety controls tested, and backups verified

- [ ] **Name stop authority** (⏱️ 5 min) | Risk: HIGH | Owner: Client-controlled
  - **Requirements:**
    - Named individual with 24/7 contact information
    - Explicit authority to halt testing immediately
    - No debate or escalation required to stop
  - **Proof required:** Stop authority documented with contact details
  - **Success metric:** Stop authority confirmed reachable during test window

- [ ] **Verify emergency communications** (⏱️ 5 min) | Risk: HIGH | Owner: Shared
  - **What this means:** Testing team and stop authority can communicate instantly
  - **Proof required:** Communication channel tested with confirmation
  - **Success metric:** Message sent and received within 2 minutes

- [ ] **Create and sign do-not-touch list** (⏱️ 10 min) | Risk: HIGH | Owner: Client-controlled
  - **What goes on list:**
    - Critical production systems
    - Sensitive data stores
    - Safety systems (alarms, environmental controls)
    - Third-party systems without permission
  - **Ownership:** You define exclusions; we respect them absolutely
  - **Proof required:** Do-not-touch list signed by client
  - **Success metric:** List reviewed and acknowledged by entire test team

- [ ] **Document safety constraints** (⏱️ 5 min) | Risk: MEDIUM | Owner: Shared
  - **What to include:**
    - Rate limits (how fast tests can run)
    - Kill switches (how to stop automated tests)
    - Feature-flag rollbacks (how to undo changes)
  - **Proof required:** Safety constraints document signed
  - **Success metric:** All safety controls implemented and tested

- [ ] **Test safety controls** (⏱️ 5 min) | Risk: HIGH | Owner: Vantus
  - **What we test:**
    - Kill switch functions correctly
    - Rate limits enforce as configured
    - Rollback procedures work
  - **Proof required:** Safety control test results logged
  - **Success metric:** All safety controls pass testing

---

## Section 3: Environment and Data Protection (⏱️ 30 min)

**Done when:** Environment isolation confirmed, sensitive data protected, and pre-test backups verified

- [ ] **Confirm test environment isolation** (⏱️ 10 min) | Risk: HIGH | Owner: Vantus
  - **What this means:** Testing cannot affect production systems
  - **Isolation methods:**
    - Separate network segments
    - Virtual machine sandboxes
    - Air-gapped environments
  - **Proof required:** Isolation test results documented
  - **Success metric:** No network path from test to production

- [ ] **Verify data masking** (⏱️ 10 min) | Risk: HIGH | Owner: Vantus
  - **What is masking:** Hiding real sensitive data with fake but realistic data
  - **When required:** Any test using production data copies
  - **Methods:**
    - Data anonymization (removing identifying details)
    - Synthetic data substitution (using fake data)
    - Tokenization (replacing data with tokens)
  - **Proof required:** Masking verification checklist completed
  - **Compliance note:** Required for GDPR, HIPAA, PCI-DSS where applicable
  - **Success metric:** No production sensitive data exposed in test

- [ ] **Verify pre-test backups** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What this means:** Recent backup available if restore needed
  - **Proof required:** Backup verification with timestamp
  - **Success metric:** Backup confirmed restorable within RTO

- [ ] **Validate network controls** (⏱️ 5 min) | Risk: HIGH | Owner: Vantus
  - **What we check:**
    - Ingress controls (preventing outside access to test)
    - Egress controls (preventing test from calling out)
    - Segmentation (test isolated from other networks)
  - **Proof required:** Network control validation checklist
  - **Success metric:** All network controls functioning

---

## Section 4: Execution Controls and Monitoring (⏱️ 20 min)

**Done when:** Monitoring active, checkpoints defined, and emergency procedures ready

- [ ] **Activate monitoring and canary checks** (⏱️ 10 min) | Risk: HIGH | Owner: Vantus
  - **What are canary checks:** Early warning tests that detect problems
  - **What we monitor:**
    - System performance during test
    - Error rates
    - Resource utilization
  - **Proof required:** Monitoring dashboard confirmed active
  - **Success metric:** All canary checks reporting normal before test starts

- [ ] **Schedule checkpoint reviews** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What this means:** Regular pauses to assess test status
  - **Proof required:** Checkpoint schedule with decision criteria
  - **Success metric:** Checkpoints scheduled at appropriate intervals

- [ ] **Prepare emergency procedures** (⏱️ 5 min) | Risk: HIGH | Owner: Vantus
  - **What this means:** Step-by-step instructions for stopping test if needed
  - **Proof required:** Emergency procedure runbook accessible to test team
  - **Success metric:** Every team member knows how to stop test

---

## Section 5: Data Handling and Reporting (⏱️ 20 min)

**Done when:** Data exposure plan confirmed, reporting format agreed, and escalation rules set

- [ ] **Confirm data exposure plan** (⏱️ 5 min) | Risk: HIGH | Owner: Client-controlled
  - **What this means:** How sensitive data will be protected during and after test
  - **Ownership:** You approve data handling; we implement
  - **Proof required:** Data handling plan signed by client
  - **Success metric:** Plan addresses data at rest, in transit, and disposal

- [ ] **Agree on reporting format** (⏱️ 10 min) | Risk: MEDIUM | Owner: Shared
  - **What to agree on:**
    - Report structure and sections
    - Classification of findings
    - Remediation timeline format
  - **Proof required:** Reporting format template signed
  - **Success metric:** Both parties understand what report will contain

- [ ] **Set escalation rules** (⏱️ 5 min) | Risk: HIGH | Owner: Shared
  - **What this means:** Who gets notified if issues arise during test
  - **Proof required:** Escalation contact list with notification triggers
  - **Success metric:** All parties know who to call and when

---

## Section 6: Post-Simulation and Follow-Up (⏱️ 30 min)

**Done when:** Findings documented, remediation tracked, and retest scheduled if needed

- [ ] **Document findings** (⏱️ 10 min) | Risk: MEDIUM | Owner: Vantus
  - **What goes in findings:**
    - Issues discovered
    - Severity ratings
    - Evidence (cleaned of sensitive details)
    - Remediation recommendations
  - **Proof required:** Findings report completed and reviewed
  - **Success metric:** Findings clearly explained with proof

- [ ] **Update evidence pack** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **Proof required:** Simulation documentation added to evidence pack (TPL-CARE-007)
  - **Success metric:** Complete record available for audit

- [ ] **Create remediation backlog** (⏱️ 10 min) | Risk: HIGH | Owner: Shared
  - **Required for each finding:**
    - Description and severity
    - Recommended fix
    - Priority
    - Owner
    - Target date
  - **Proof required:** Backlog created in tracking system
  - **Success metric:** All findings have owner and timeline

- [ ] **Schedule retest if contracted** (⏱️ 5 min) | Risk: LOW | Owner: Client-controlled
  - **What this means:** Follow-up testing to verify fixes
  - **Ownership:** You approve retest scope and timing
  - **Proof required:** Retest window scheduled with scope confirmed
  - **Success metric:** Retest scheduled within agreed timeframe

---

## Hard Stops — Do Not Proceed If

| Condition | Action Required |
|-----------|-----------------|
| No written authorization | STOP—obtain signed authorization before proceeding |
| No named stop authority | STOP—client must designate stop authority |
| No do-not-touch list | STOP—create and sign exclusion list |
| Safety controls not tested | STOP—test all controls before simulation |
| Environment not isolated | STOP—verify isolation before starting |
| Sensitive data not protected | STOP—implement masking or use synthetic data |
| Emergency procedures not ready | STOP—prepare and review procedures |

---

## Completion Checklist

| Requirement | Status | Proof Location |
|-------------|--------|----------------|
| Written authorization obtained | ☐ | Signed form |
| Test objectives documented | ☐ | Objectives doc |
| ROE pack created | ☐ | TPL-CARE-008 |
| Stop authority named | ☐ | Authority doc |
| Emergency communications verified | ☐ | Test record |
| Do-not-touch list signed | ☐ | Signed list |
| Safety constraints documented | ☐ | Constraints doc |
| Safety controls tested | ☐ | Test results |
| Environment isolation confirmed | ☐ | Isolation test |
| Data masking verified | ☐ | Masking checklist |
| Pre-test backups verified | ☐ | Backup record |
| Network controls validated | ☐ | Validation checklist |
| Monitoring active | ☐ | Dashboard screenshot |
| Canary checks passing | ☐ | Check results |
| Checkpoints scheduled | ☐ | Checkpoint schedule |
| Emergency procedures ready | ☐ | Runbook |
| Data exposure plan confirmed | ☐ | Signed plan |
| Reporting format agreed | ☐ | Template |
| Escalation rules set | ☐ | Contact list |
| Findings documented | ☐ | Findings report |
| Evidence pack updated | ☐ | TPL-CARE-007 |
| Remediation backlog created | ☐ | Tracking system |
| Retest scheduled (if applicable) | ☐ | Calendar invite |

**Simulation safety completed:** ☐ Yes | Date: _________

**Simulation authorized:** ☐ Yes | Date: _________

---

## Risk Assessment Summary

| Risk | Level | Mitigation |
|------|-------|------------|
| Production impact | HIGH | Environment isolation; do-not-touch list; stop authority |
| Data breach | HIGH | Data masking; access controls; secure disposal |
| Unauthorized testing | HIGH | Written authorization; ROE pack; scope limits |
| Cannot stop test | MEDIUM | Named stop authority; kill switches; emergency procedures |
| Missed findings | LOW | Checkpoints; monitoring; canary checks |
| Retest confusion | LOW | Agreed retest window; documented scope |

---

## Why This Checklist Matters

| Common Security Testing Practice | Vantus Standard |
|----------------------------------|-----------------|
| Verbal authorization accepted | Written authorization mandatory |
| No defined boundaries | ROE pack with explicit scope and exclusions |
| No stop authority | Named stop authority with immediate halt power |
| Production testing common | Isolated environments required |
| Production data used raw | Data masking/anonymization required |
| Findings delivered verbally | Written report with evidence in evidence pack |
| No retest planning | Retest window agreed upfront if contracted |

---

**SEO Keywords:** penetration testing safety, security test rules, ethical hacking guidelines, security assessment preparation, testing authorization, ROE rules of engagement, security test governance, authorized testing framework, security exercise safety, penetration test planning

---

*Version 3.0.0 | Last Updated: 2026-02-21 | Reading Level: 8th Grade*

*Related Documents: SOP-CARE-028 (Digital Simulation Governance), SOP-CARE-029 (Physical Simulation Governance), SOP-CARE-030 (ROE Pack), TPL-CARE-008 (ROE Pack Template)*
