# CHK-CARE-001: Onboarding Checklist

**Reading Level:** 8th Grade | **Total Time:** 4 hours | **Audience:** New Care Clients

**Goal:** Complete a full onboarding process that sets up scope, access, monitoring, backups, and reporting before your first support window begins.

---

## Key Terms Explained

| Term | Simple Definition |
|------|-------------------|
| **Scope Map** | Document listing what's included and excluded in your service |
| **ROE** | Rules of Engagement—written rules for testing and changes |
| **MFA** | Multi-Factor Authentication—extra login security |
| **Break-glass** | Emergency access when normal methods fail |
| **Baseline** | Documented starting point we measure changes against |

---

## Section 1: Contract and Scope Setup (⏱️ 45 min)

**Done when:** Signed documents on file and Scope Map approved by both parties

- [ ] **Review and sign Statement of Work** (⏱️ 15 min) | Risk: HIGH | Owner: Client-controlled
  - **Why this matters:** Unlike competitors who hide terms, we start with full transparency
  - **Proof required:** Signed SOW scanned and saved to client file
  - **Success metric:** Both signatures present with date

- [ ] **Approve Scope Map** (⏱️ 20 min) | Risk: MEDIUM | Owner: Client-controlled
  - **What is it:** Written list of what's included, excluded, and who does what
  - **Ownership:** You approve boundaries; changes require your written OK
  - **Proof required:** Scope Map (TPL-CARE-001) signed and version-stamped
  - **Benchmark:** 90% of competitors skip documented scope boundaries—we don't

- [ ] **Confirm escalation paths** (⏱️ 10 min) | Risk: MEDIUM | Owner: Vantus
  - **What are they:** Who to call for different issue types
  - **Proof required:** Escalation list emailed to client with read receipt
  - **Success metric:** Client confirms receipt and contacts are correct

---

## Section 2: People and Access Setup (⏱️ 60 min)

**Done when:** All users can log in, MFA is active, and access register is signed

- [ ] **Document key contacts** (⏱️ 10 min) | Risk: LOW | Owner: Client
  - **What we need:** Names, roles, phone numbers, backup contacts
  - **Proof required:** Contact sheet saved with timestamp
  - **Automation:** Vantus creates contact card; client verifies accuracy

- [ ] **Submit access requests** (⏱️ 15 min) | Risk: HIGH | Owner: Client-controlled
  - **Ownership:** You approve every person who gets access
  - **Security standard:** Least-privilege access (people only get what they need)
  - **Proof required:** Access requests logged in system with approval timestamps
  - **CMMC note:** Access tracking required for CMMC Level 2 readiness

- [ ] **Set up password vault** (⏱️ 15 min) | Risk: HIGH | Owner: Shared
  - **What it is:** Secure storage for passwords (SOP-CARE-009)
  - **Ownership:** Client controls vault; Vantus provides guidance
  - **Proof required:** Vault configured and test entry confirmed
  - **Success metric:** Both parties can access vault and create entries

- [ ] **Enable MFA on all accounts** (⏱️ 15 min) | Risk: HIGH | Owner: Shared
  - **What is MFA:** Extra security requiring phone/app confirmation at login
  - **Operating risk:** Most breaches start with stolen passwords—MFA stops 99.9%
  - **Proof required:** MFA status screenshot for each account
  - **Done when:** All privileged accounts show MFA enabled

- [ ] **Test break-glass workflow** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What is it:** Emergency access when normal login fails
  - **Proof required:** Test completed and result logged
  - **Success metric:** Emergency access works within 5 minutes

---

## Section 3: Monitoring Setup (⏱️ 45 min)

**Done when:** Monitoring covers all contracted systems and alert paths are tested

- [ ] **Record inventory baseline** (⏱️ 15 min) | Risk: MEDIUM | Owner: Vantus
  - **What is it:** Complete list of your equipment and systems (TPL-CARE-010)
  - **Proof over promises:** Unlike competitors claiming "full coverage" without proof
  - **Proof required:** Inventory file created with hash recorded
  - **Success metric:** 100% of systems accounted for or noted as out-of-scope

- [ ] **Confirm monitoring scope** (⏱️ 10 min) | Risk: MEDIUM | Owner: Client-controlled
  - **Ownership:** You approve what we monitor
  - **Proof required:** Scope confirmation email with client reply
  - **Success metric:** Written agreement on monitored systems

- [ ] **Set alert thresholds** (⏱️ 15 min) | Risk: MEDIUM | Owner: Vantus
  - **What are they:** Limits that trigger alerts (disk space, response time, etc.)
  - **Proof required:** Threshold settings screenshot saved
  - **Automation:** Vantus sets conservative defaults; client adjusts if needed

- [ ] **Test alert routing** (⏱️ 5 min) | Risk: HIGH | Owner: Vantus
  - **What is it:** Making sure alerts reach the right people
  - **Proof required:** Test alert sent and received confirmation logged
  - **Success metric:** Test alert received within 2 minutes

---

## Section 4: Backup and Availability (⏱️ 45 min)

**Done when:** Backup strategy is documented, tested, and restore plan is scheduled

- [ ] **Document backup coverage** (⏱️ 15 min) | Risk: HIGH | Owner: Shared
  - **What we document:** What gets backed up, how often, how long kept
  - **Ownership:** You approve backup scope and retention
  - **Proof required:** Backup policy document signed by client
  - **RPO/RTO defined:** Recovery Point Objective (max data loss) and Recovery Time Objective (max downtime) written and agreed

- [ ] **Verify backup health signals** (⏱️ 15 min) | Risk: HIGH | Owner: Vantus
  - **What are they:** Automated checks that backups are working
  - **Proof required:** Health check results saved with timestamp
  - **Automation:** Vantus reviews daily; client receives weekly summary

- [ ] **Schedule restore verification** (⏱️ 15 min) | Risk: MEDIUM | Owner: Client-controlled
  - **Why it matters:** Backups that can't be restored are worthless
  - **Benchmark:** Most MSPs never test restores—we schedule quarterly tests
  - **Proof required:** Restore test appointment on calendar with client confirmation
  - **Success metric:** First restore test scheduled within 90 days

---

## Section 5: Reporting and Governance (⏱️ 30 min)

**Done when:** First scorecard is scheduled and evidence pack structure is confirmed

- [ ] **Draft 30-day findings narrative** (⏱️ 10 min) | Risk: LOW | Owner: Vantus
  - **What is it:** Plain-language summary of what we found in first 30 days
  - **Proof required:** Findings template started with initial notes

- [ ] **Draft 90-day roadmap** (⏱️ 10 min) | Risk: LOW | Owner: Vantus
  - **What is it:** Prioritized action plan with timelines
  - **Ownership:** You approve priorities and timeline
  - **Proof required:** Roadmap draft saved to client file

- [ ] **Schedule first scorecard** (⏱️ 5 min) | Risk: LOW | Owner: Vantus
  - **What is it:** Monthly report showing service metrics (SOP-CARE-020)
  - **Proof required:** Calendar invite sent and accepted
  - **Success metric:** Date locked with distribution list confirmed

- [ ] **Set up evidence pack** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **What is it:** Organized folder for compliance documents (TPL-CARE-007)
  - **CMMC note:** Evidence pack structure supports CMMC audit requirements
  - **Proof required:** Folder structure created with TOC template

---

## Section 6: Final Approvals and Handoff (⏱️ 15 min)

**Done when:** All approvals captured and kickoff is complete

- [ ] **Internal kickoff readout** (⏱️ 5 min) | Risk: LOW | Owner: Vantus
  - **What is it:** Team briefing on client setup
  - **Proof required:** Meeting notes saved with action items

- [ ] **Capture client approvals** (⏱️ 5 min) | Risk: HIGH | Owner: Client-controlled
  - **Ownership:** You sign off on scope, monitoring, and incident communication plan
  - **Proof required:** Approval confirmation email or signed acknowledgment
  - **Success metric:** Written confirmation of all key approvals

- [ ] **Document compliance sign-offs** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **Proof required:** Compliance checklist signed and filed
  - **Success metric:** All required signatures present

---

## Completion Checklist

| Requirement | Status | Proof Location |
|-------------|--------|----------------|
| Signed SOW on file | ☐ | Client file |
| Scope Map approved | ☐ | TPL-CARE-001 |
| Access register updated | ☐ | TPL-CARE-009 |
| MFA enabled on all admin accounts | ☐ | Screenshot files |
| Inventory baseline captured | ⏺ | TPL-CARE-010 |
| Monitoring scope confirmed | ☐ | Client email |
| Backup strategy documented | ☐ | Policy doc |
| First scorecard scheduled | ☐ | Calendar invite |
| Evidence pack created | ☐ | File folder |
| Client approvals captured | ☐ | Signed forms |

**Total onboarding completed:** ☐ Yes | Date: _________

**Next review:** 30 days from start date

---

## Why This Checklist Matters

| Industry Practice | Vantus Difference |
|-------------------|-------------------|
| Competitors use "proactive" as empty buzzword | We require proof at every step |
| Hidden pricing and surprise charges | Transparent scope with written approvals required |
| No documented escalation paths | Named contacts with 24/7 reachability |
| Shared admin accounts common | Named accounts only with MFA enforced |
| Backups rarely tested | Quarterly restore tests scheduled by default |
| No CMMC readiness | Evidence pack structure supports CMMC Level 2 |

---

**SEO Keywords:** IT onboarding checklist, new IT service setup, managed IT onboarding process, business technology implementation, IT service initiation, small business IT setup, technology deployment checklist, IT transition process, managed service provider onboarding

---

*Version 3.0.0 | Last Updated: 2026-02-21 | Reading Level: 8th Grade*

*Related Documents: SOP-CARE-001 (Service Principles), SOP-CARE-007 (First 30 Days), TPL-CARE-001 (Scope Map)*
