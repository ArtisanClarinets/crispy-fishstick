# CHK-CARE-003: Monitoring Setup Checklist

**Reading Level:** 8th Grade | **Total Time:** 3 hours | **Audience:** New Care Clients & Technical Teams

**Goal:** Set up monitoring that provides useful alerts, limits false alarms, and feeds into reporting and incident response.

---

## Key Terms Explained

| Term | Simple Definition |
|------|-------------------|
| **Monitoring** | Watching systems to detect problems |
| **Alert** | Notification sent when something needs attention |
| **Threshold** | Limit that triggers an alert when crossed |
| **False positive** | Alert fired when nothing is actually wrong |
| **Telemetry** | Data sent from systems about their health |
| **Escalation path** | Who gets notified and in what order |
| **Synthetic check** | Automated test that simulates user actions |
| **Tuning** | Adjusting settings to reduce false alarms |

---

## Section 1: Scope and Monitoring Tools (⏱️ 45 min)

**Done when:** Monitoring scope is written, owners are assigned, and asset inventory is referenced

- [ ] **Document monitoring scope** (⏱️ 15 min) | Risk: HIGH | Owner: Client-controlled
  - **What is scope:** List of systems, services, and connections to monitor
  - **Ownership:** You approve what's monitored; we recommend based on criticality
  - **Proof required:** Scope document signed by client
  - **Success metric:** Written agreement on monitored items
  - **Market differentiator:** Unlike competitors who claim "full coverage" without documentation

- [ ] **Assign observability owners** (⏱️ 10 min) | Risk: MEDIUM | Owner: Vantus
  - **What they do:** People responsible for monitoring health and alert response
  - **Proof required:** Owner assignments documented with contact info
  - **Success metric:** Primary and backup owners named for each system

- [ ] **Reference baseline inventory** (⏱️ 10 min) | Risk: MEDIUM | Owner: Vantus
  - **What is it:** Complete list of your equipment (TPL-CARE-010)
  - **Purpose:** Ensures all assets are either monitored or explicitly excluded
  - **Proof required:** Inventory cross-check completed with notes
  - **Success metric:** Every inventory item has monitoring status noted

- [ ] **Identify missing telemetry** (⏱️ 10 min) | Risk: MEDIUM | Owner: Vantus
  - **What is telemetry:** Data from systems about their health
  - **What we check:** Systems that cannot send monitoring data
  - **Proof required:** Gap list created with mitigation plan
  - **Success metric:** All gaps documented with owner and timeline

---

## Section 2: Alert Categories and Routing (⏱️ 45 min)

**Done when:** Alert types are defined, thresholds are set, and routing is tested

- [ ] **Define alert categories** (⏱️ 15 min) | Risk: MEDIUM | Owner: Vantus
  - **Categories to define:**
    - Availability: Is the system up or down?
    - Capacity: Running out of disk, memory, or bandwidth?
    - Security: Potential threat detected?
    - Performance: Slow response times?
  - **Proof required:** Category definitions documented
  - **Success metric:** Every possible alert fits into a defined category

- [ ] **Map categories to escalation paths** (⏱️ 10 min) | Risk: HIGH | Owner: Client-controlled
  - **What it means:** Who gets notified for each alert type
  - **Ownership:** You confirm escalation contacts and order
  - **Proof required:** Escalation matrix saved and confirmed
  - **Success metric:** Every alert category has assigned responders

- [ ] **Set alert thresholds** (⏱️ 15 min) | Risk: MEDIUM | Owner: Vantus
  - **What are thresholds:** Limits that trigger alerts
  - **Examples:** Disk space below 20%, CPU above 80% for 5 minutes
  - **Proof required:** Threshold settings screenshot with rationale
  - **Success metric:** Conservative initial values set for all metrics

- [ ] **Confirm alert routing** (⏱️ 5 min) | Risk: HIGH | Owner: Vantus
  - **What it means:** Alerts reach ticketing system and on-call responders
  - **Proof required:** Test alert sent through entire path
  - **Success metric:** Test alert received by all intended recipients

---

## Section 3: Detection Tuning and Signal Quality (⏱️ 45 min)

**Done when:** Initial thresholds are conservative, tuning log is started, and 30-day review is scheduled

- [ ] **Set conservative initial thresholds** (⏱️ 15 min) | Risk: MEDIUM | Owner: Vantus
  - **Why conservative:** Better to catch real problems than miss them early
  - **Proof required:** Threshold rationale documented
  - **Success metric:** All thresholds set above "normal" baseline

- [ ] **Document known issues** (⏱️ 10 min) | Risk: LOW | Owner: Vantus
  - **What to document:** Systems with known quirks or temporary problems
  - **Proof required:** Known issues list created and shared
  - **Success metric:** Team aware of expected anomalies

- [ ] **Start false positive tuning log** (⏱️ 10 min) | Risk: LOW | Owner: Vantus
  - **What is it:** Record of alerts that fired incorrectly and adjustments made
  - **Required fields:** Date, alert type, why it was false, adjustment made, owner
  - **Proof required:** Tuning log template started
  - **Success metric:** Log accessible to monitoring team

- [ ] **Schedule 30-day tuning review** (⏱️ 10 min) | Risk: LOW | Owner: Vantus
  - **What it is:** Meeting to review alert quality and adjust thresholds
  - **Proof required:** Calendar invite sent for 30 days from now
  - **Success metric:** Review scheduled with client optional attendance

---

## Section 4: Observability Validation (⏱️ 30 min)

**Done when:** Dashboards are available, runbooks reference monitoring, and health tests pass

- [ ] **Verify dashboards are accessible** (⏱️ 10 min) | Risk: MEDIUM | Owner: Vantus
  - **What are dashboards:** Visual displays of system health metrics
  - **Required:** Dashboards supporting Monthly Scorecard (TPL-CARE-003)
  - **Proof required:** Dashboard URLs tested and documented
  - **Success metric:** All required dashboards load successfully

- [ ] **Link monitoring to runbooks** (⏱️ 10 min) | Risk: MEDIUM | Owner: Vantus
  - **What are runbooks:** Step-by-step procedures for common issues
  - **Proof required:** Runbook review completed; monitoring references confirmed
  - **Success metric:** Every key alert has associated runbook procedure

- [ ] **Execute monitoring health tests** (⏱️ 10 min) | Risk: HIGH | Owner: Vantus
  - **Tests to run:**
    - Synthetic checks (automated tests simulating user actions)
    - Heartbeat sensors (confirming monitoring agents are alive)
  - **Proof required:** Test results saved with timestamps
  - **Success metric:** All health tests pass

---

## Section 5: Documentation and Handoff (⏱️ 15 min)

**Done when:** Monitoring documentation is complete and client has been briefed

- [ ] **Document monitoring configuration** (⏱️ 5 min) | Risk: MEDIUM | Owner: Vantus
  - **Proof required:** Configuration exported and saved to evidence pack
  - **Success metric:** Configuration recoverable if needed

- [ ] **Create monitoring summary for client** (⏱️ 5 min) | Risk: LOW | Owner: Vantus
  - **What it includes:** What's monitored, alert types, who gets notified
  - **Proof required:** Summary document delivered to client
  - **Success metric:** Client confirms understanding

- [ ] **Brief client on monitoring** (⏱️ 5 min) | Risk: LOW | Owner: Vantus
  - **Purpose:** Ensure client understands what we watch and how alerts work
  - **Proof required:** Briefing completion noted in client file
  - **Success metric:** Client can explain basic monitoring scope

---

## Completion Checklist

| Requirement | Status | Proof Location |
|-------------|--------|----------------|
| Monitoring scope documented and signed | ☐ | Scope document |
| Observability owners assigned | ☐ | Owner list |
| Inventory cross-check completed | ☐ | Cross-check notes |
| Missing telemetry gaps documented | ☐ | Gap list |
| Alert categories defined | ☐ | Category document |
| Escalation paths mapped | ☐ | Escalation matrix |
| Thresholds set and documented | ☐ | Settings screenshot |
| Alert routing tested | ☐ | Test result log |
| Conservative thresholds in place | ☐ | Threshold rationale |
| Known issues documented | ☐ | Known issues list |
| Tuning log started | ☐ | Tuning log file |
| 30-day review scheduled | ☐ | Calendar invite |
| Dashboards verified | ☐ | Dashboard URLs |
| Runbooks linked | ☐ | Runbook review notes |
| Health tests passed | ☐ | Test results |
| Configuration documented | ☐ | Evidence pack |
| Client briefed | ☐ | Client file notes |

**Monitoring setup completed:** ☐ Yes | Date: _________

**First tuning review:** 30 days from setup completion

---

## Automation vs. Manual Tasks

| Task | Vantus Automation | Client Action Required |
|------|-------------------|------------------------|
| Agent deployment | Automated install scripts | Approve installation |
| Threshold adjustment | Auto-tuning suggestions | Approve major changes |
| Alert routing | Automatic ticket creation | Confirm contact info |
| Health testing | Scheduled synthetic checks | None |
| Tuning log updates | Auto-populated from alerts | Review monthly |
| Report generation | Monthly scorecard auto-generated | Review and approve |

---

## Why This Checklist Matters

| Common MSP Practice | Vantus Standard |
|---------------------|-----------------|
| "Set and forget" monitoring | 30-day tuning review required |
| Generic thresholds for all clients | Client-specific thresholds based on baseline |
| Alerts flood client inbox | Escalation paths with Vantus handling first response |
| No documentation of what's monitored | Written scope signed by client |
| No false positive tracking | Required tuning log with owner accountability |
| Dashboards for technicians only | Client-accessible dashboards included |

---

**SEO Keywords:** IT monitoring setup, system monitoring checklist, alert configuration, network monitoring deployment, infrastructure monitoring, performance monitoring setup, monitoring best practices, observability implementation, alert management, IT operations monitoring

---

*Version 3.0.0 | Last Updated: 2026-02-21 | Reading Level: 8th Grade*

*Related Documents: SOP-CARE-011 (Alert Standardization), SOP-CARE-012 (Noise Reduction), TPL-CARE-003 (Monthly Scorecard)*
