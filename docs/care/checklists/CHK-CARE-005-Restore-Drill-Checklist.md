# CHK-CARE-005: Restore Drill Checklist

**Reading Level:** 8th Grade | **Total Time:** 4 hours (plus test duration) | **Audience:** Care Clients & Technical Teams

**Goal:** Execute safe, repeatable restore tests that validate backups, practice runbooks, and produce actionable improvements with minimal service impact.

---

## Key Terms Explained

| Term | Simple Definition |
|------|-------------------|
| **Restore drill** | Planned test to practice restoring data from backup |
| **Sandbox** | Isolated test environment that won't affect production |
| **RTO** | Recovery Time Objective—target time to restore service |
| **Rollback** | Reversing changes if something goes wrong |
| **Smoke test** | Quick check that restored system works |
| **Immutable** | Cannot be changed—often refers to protected backups |
| **After-action review** | Meeting to discuss what went well and what to improve |
| **Remediation** | Fixes needed based on findings |

---

## Section 1: Objectives and Scope (⏱️ 30 min)

**Done when:** Drill goals are written, targets are defined, and safety constraints are documented

- [ ] **Define drill objectives** (⏱️ 10 min) | Risk: MEDIUM | Owner: Client-controlled
  - **What this means:** Clear statement of what the drill will test
  - **Examples:**
    - Test full server restore from backup
    - Practice database point-in-time recovery
    - Validate file-level restore procedures
  - **Proof required:** Objectives documented in drill plan (TPL-CARE-006)
  - **Success metric:** Objectives specific and measurable

- [ ] **Agree success criteria** (⏱️ 10 min) | Risk: HIGH | Owner: Shared
  - **What this means:** How we know the drill passed or failed
  - **Examples:**
    - Restore completes within RTO target
    - Restored data passes integrity checks
    - Application functions after restore
  - **Proof required:** Success criteria written and signed by stakeholders
  - **Success metric:** Criteria are binary (pass/fail) with measurable thresholds

- [ ] **Document target datasets** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What this means:** Specific data to be restored during drill
  - **Proof required:** Target list with locations and sizes noted
  - **Success metric:** Every target clearly identified

- [ ] **Choose restore environment** (⏱️ 5 min) | Risk: HIGH | Owner: Client-controlled
  - **Options:**
    - Full restore (entire system)
    - Partial restore (selected files or databases)
    - Sandbox/clone (isolated test environment)
  - **Ownership:** You approve environment choice; we recommend safest option
  - **Proof required:** Environment choice documented with rationale
  - **Safety note:** Sandbox preferred to prevent production impact

---

## Section 2: Safety and Constraints (⏱️ 30 min)

**Done when:** Do-not-touch list is finalized, rollback criteria are set, and constraints are signed

- [ ] **Create do-not-touch list** (⏱️ 10 min) | Risk: HIGH | Owner: Client-controlled
  - **What this means:** Systems and data that must not be affected
  - **Examples:** Production databases, active user sessions, payment processing
  - **Proof required:** Do-not-touch list signed by client
  - **Success metric:** List reviewed and acknowledged by entire drill team

- [ ] **Define rollback criteria** (⏱️ 10 min) | Risk: HIGH | Owner: Shared
  - **What this means:** Conditions that trigger immediate stop and rollback
  - **Examples:**
    - Production impact detected
    - Restore exceeding RTO by 50%
    - Data corruption during restore
  - **Proof required:** Rollback criteria documented with stop authority named
  - **Success metric:** Clear go/no-go decision points defined

- [ ] **Document safety constraints** (⏱️ 5 min) | Risk: MEDIUM | Owner: Shared
  - **What to include:**
    - Time windows when drill can occur
    - Resource limits (CPU, bandwidth)
    - Communication requirements
  - **Proof required:** Safety constraints document signed
  - **Success metric:** All parties aware of constraints

- [ ] **Confirm isolation controls** (⏱️ 5 min) | Risk: HIGH | Owner: Vantus
  - **What this means:** Technical controls preventing drill from touching production
  - **Proof required:** Isolation verification checklist completed
  - **Success metric:** Network and storage isolation confirmed

---

## Section 3: Approvals and Scheduling (⏱️ 30 min)

**Done when:** Written authorization received, stop authority named, and team is scheduled

- [ ] **Obtain written authorization** (⏱️ 10 min) | Risk: HIGH | Owner: Client-controlled
  - **Ownership:** You must sign written approval before drill begins
  - **Required elements:
    - Impact statement (what could be affected)
    - Time window approved
    - Constraints acknowledged
  - **Proof required:** Signed authorization form on file
  - **Success metric:** Authorization includes all required elements

- [ ] **Communicate to stakeholders** (⏱️ 10 min) | Risk: MEDIUM | Owner: Vantus
  - **Who to notify:**
    - Client decision makers
    - End users (if any impact possible)
    - Third parties (if applicable)
  - **Proof required:** Communication log with confirmations
  - **Success metric:** All stakeholders aware of drill timing

- [ ] **Name stop authority** (⏱️ 5 min) | Risk: HIGH | Owner: Client-controlled
  - **What this means:** Person with power to halt drill immediately
  - **Requirements:**
    - Must be reachable during drill
    - Must have authority to stop without debate
  - **Proof required:** Stop authority documented with contact information
  - **Success metric:** Stop authority confirmed available during window

- [ ] **Schedule on-call support** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What this means:** Technical experts available if issues arise
  - **Proof required:** Support schedule with contact numbers
  - **Success metric:** Experts confirmed available during drill window

---

## Section 4: Pre-Drill Preparation (⏱️ 30 min)

**Done when:** Environment is isolated, data is protected, and pre-test backups are verified

- [ ] **Verify isolated environment** (⏱️ 10 min) | Risk: HIGH | Owner: Vantus
  - **What we check:**
    - Network isolation (cannot reach production)
    - Storage isolation (separate disks/systems)
    - Identity isolation (separate credentials)
  - **Proof required:** Isolation test results documented
  - **Success metric:** All isolation tests pass

- [ ] **Clean sensitive data** (⏱️ 10 min) | Risk: HIGH | Owner: Vantus
  - **What this means:** Removing or masking sensitive information in test environment
  - **Methods:** Data masking, anonymization, synthetic data substitution
  - **Proof required:** Data handling log with cleaning method noted
  - **Success metric:** No production sensitive data in test environment
  - **Compliance note:** Required for GDPR, HIPAA, and CMMC where applicable

- [ ] **Take pre-test snapshots** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What this means:** Backup of current state before drill begins
  - **Proof required:** Snapshot confirmation with timestamp
  - **Success metric:** Snapshot verified restorable

- [ ] **Validate ingress controls** (⏱️ 5 min) | Risk: HIGH | Owner: Vantus
  - **What this means:** Ensuring test environment cannot receive production traffic
  - **Proof required:** Ingress control test completed
  - **Success metric:** No accidental traffic routing to test systems

---

## Section 5: Drill Execution (⏱️ 90 min)

**Done when:** Restore is complete, tests pass, and deviations are recorded

- [ ] **Execute restore following runbook** (⏱️ 45 min) | Risk: HIGH | Owner: Vantus
  - **Requirements:**
    - Follow documented procedure step by step
    - Record timestamp at each step
    - Capture screenshots or logs
  - **Proof required:** Execution log with timestamps and artifacts
  - **Success metric:** Runbook followed exactly; deviations noted

- [ ] **Run data integrity checks** (⏱️ 20 min) | Risk: HIGH | Owner: Vantus
  - **What we check:**
    - File counts match expected
    - Checksums verify data not corrupted
    - Database consistency checks pass
  - **Proof required:** Integrity check results with pass/fail status
  - **Success metric:** All integrity checks pass or issues logged

- [ ] **Execute smoke tests** (⏱️ 15 min) | Risk: HIGH | Owner: Vantus
  - **What this means:** Quick functional tests of restored systems
  - **Examples:** Login works, key functions respond, data displays correctly
  - **Proof required:** Smoke test results documented
  - **Success metric:** Critical functions work in restored environment

- [ ] **Record performance metrics** (⏱️ 5 min) | Risk: LOW | Owner: Vantus
  - **What we measure:**
    - Total restore time
    - Data transfer rates
    - Resource utilization
  - **Proof required:** Performance log with metrics
  - **Success metric:** RTO target assessed against actual time

- [ ] **Document deviations** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What to capture:**
    - Steps that didn't work as expected
    - Unexpected errors or warnings
    - Differences from runbook
  - **Proof required:** Deviation log with severity ratings
  - **Success metric:** All issues captured with owner assigned

---

## Section 6: Post-Drill Review (⏱️ 30 min)

**Done when:** Results documented, remediation tracked, and lessons learned captured

- [ ] **Document drill results** (⏱️ 10 min) | Risk: MEDIUM | Owner: Vantus
  - **What goes in report:**
    - Objectives and success criteria
    - What was tested
    - Results (pass/fail for each criteria)
    - Performance metrics
    - Issues found
  - **Proof required:** Restore drill report completed (TPL-CARE-006)
  - **Success metric:** Report clear enough for non-technical review

- [ ] **Update evidence pack** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **Proof required:** Drill report saved to evidence pack (TPL-CARE-007)
  - **Success metric:** Report findable and version-controlled

- [ ] **Create remediation backlog** (⏱️ 10 min) | Risk: HIGH | Owner: Shared
  - **What this means:** List of fixes needed based on drill findings
  - **Required for each item:**
    - Description of issue
    - Priority (critical/high/medium/low)
    - Owner assigned
    - Target date
  - **Proof required:** Backlog created in tracking system
  - **Success metric:** All issues have owner and timeline

- [ ] **Schedule lessons-learned review** (⏱️ 5 min) | Risk: LOW | Owner: Vantus
  - **What this means:** Meeting to discuss what went well and what to improve
  - **Proof required:** Review meeting scheduled with required attendees
  - **Success metric:** Meeting within 1 week of drill completion

---

## Completion Checklist

| Requirement | Status | Proof Location |
|-------------|--------|----------------|
| Objectives defined | ☐ | Drill plan |
| Success criteria agreed | ☐ | Signed criteria |
| Target datasets documented | ☐ | Target list |
| Environment chosen and approved | ☐ | Environment doc |
| Do-not-touch list signed | ☐ | Safety doc |
| Rollback criteria defined | ☐ | Criteria doc |
| Safety constraints documented | ☐ | Constraints doc |
| Isolation confirmed | ☐ | Test results |
| Written authorization obtained | ☐ | Signed form |
| Stakeholders notified | ☐ | Communication log |
| Stop authority named | ☐ | Authority doc |
| Support scheduled | ☐ | Support schedule |
| Environment isolated | ☐ | Isolation test |
| Sensitive data cleaned | ☐ | Data handling log |
| Pre-test snapshots taken | ☐ | Snapshot record |
| Ingress controls validated | ☐ | Control test |
| Restore executed per runbook | ☐ | Execution log |
| Integrity checks passed | ☐ | Check results |
| Smoke tests passed | ☐ | Test results |
| Performance metrics recorded | ☐ | Performance log |
| Deviations documented | ☐ | Deviation log |
| Results report completed | ☐ | TPL-CARE-006 |
| Evidence pack updated | ☐ | TPL-CARE-007 |
| Remediation backlog created | ☐ | Tracking system |
| Lessons-learned scheduled | ☐ | Calendar invite |

**Restore drill completed:** ☐ Yes | Date: _________

**Next drill:** Quarterly (or as contracted)

---

## Risk Assessment Summary

| Risk | Level | Mitigation |
|------|-------|------------|
| Production impact | HIGH | Isolation controls; do-not-touch list; stop authority |
| Data exposure | HIGH | Data cleaning; sandbox environment; access controls |
| Incomplete restore | MEDIUM | Integrity checks; smoke tests; deviation logging |
| Exceeded RTO | MEDIUM | Performance tracking; rollback criteria |
| Missed lessons | LOW | Required review meeting; remediation tracking |

---

## Why This Checklist Matters

| Common MSP Practice | Vantus Standard |
|---------------------|-----------------|
| Restores never tested | Quarterly restore drills required |
| No written authorization | Signed approval mandatory before any drill |
| Production used for testing | Isolated sandbox environment required |
| No stop authority | Named stop authority with 24/7 reachability |
| Results not documented | Formal report in evidence pack |
| Issues not tracked | Remediation backlog with owner and timeline |
| No follow-up review | Required lessons-learned meeting |

---

**SEO Keywords:** backup restore testing, disaster recovery drill, backup validation procedure, restore testing checklist, business continuity exercise, recovery time testing, data recovery validation, IT disaster recovery, backup integrity test, recovery procedure audit

---

*Version 3.0.0 | Last Updated: 2026-02-21 | Reading Level: 8th Grade*

*Related Documents: SOP-CARE-014 (Restore Verification), TPL-CARE-006 (Restore Drill Report), TPL-CARE-007 (Evidence Pack)*
