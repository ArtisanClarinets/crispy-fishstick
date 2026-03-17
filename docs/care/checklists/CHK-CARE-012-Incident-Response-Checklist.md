# CHK-CARE-012: Incident Response Checklist

**Document ID:** VS-CARE-CHK-012  
**Version:** 1.0.0  
**Effective Date:** 2026-02-21  
**Owner:** VP of Operations  
**Status:** Active  
**Reading Level:** 8th Grade  
**Estimated Time:** Ongoing (initial response 30-60 minutes)  
**Risk Rating:** Critical (incidents can cause business failure)

**Goal:** Coordinate incident response calmly and effectively to minimize business impact, restore service quickly, and prevent recurrence through documented learning.

---

## 1. Incident Declaration (T+0)

- [ ] Incident detected (alert, report, observation)
- [ ] Incident ticket created with unique identifier
- [ ] Severity classified:
  - **SEV-1:** Critical business impact (revenue stopped, all users affected)
  - **SEV-2:** Significant impact (major function down, many users affected)
  - **SEV-3:** Moderate impact (workaround available, limited users)
  - **SEV-4:** Low impact (minor issue, single user or cosmetic)
- [ ] Incident Commander assigned (single coordinator for entire response)
- [ ] Timeline started (first entry: detection time and initial observation)

**Time Target:** Declaration within 10 minutes of detection  
**CMMC Alignment:** IR.1.1 (incident handling capability)

---

## 2. Initial Assessment (T+10-30 minutes)

- [ ] Scope determined (what systems, services, data affected)
- [ ] Impact assessed (users affected, business functions impaired)
- [ ] Cause category identified:
  - Technical failure (hardware, software, network)
  - Security incident (breach, malware, unauthorized access)
  - Human error (misconfiguration, accidental deletion)
  - External factor (ISP, vendor, natural disaster)
- [ ] Timeline entries added (every significant observation)
- [ ] Initial client communication sent ("We have an incident, investigating")

---

## 3. Stabilization & Containment

- [ ] Immediate threat contained (bleeding stopped)
  - Isolate affected systems (network segmentation)
  - Block malicious activity (firewall rules, account lockouts)
  - Preserve evidence (logs, memory dumps, disk images)
- [ ] Service stabilization attempted (get to known state)
- [ ] Client approval obtained for disruptive actions
- [ ] Stop authority engaged if safety concerns
- [ ] Escalation path activated (additional resources if needed)

**Time Target:** Stabilization within 1 hour for SEV-1/2  
**Vantus standard:** requiring evidence preservation during response

---

## 4. Communication Management

| Stakeholder | Frequency | Content |
|-------------|-----------|---------|
| Client executive | Every 30 min (SEV-1) | Business impact, ETA |
| Client technical | Every 15-30 min | Technical status, actions |
| Internal team | Continuous | Coordination, handoffs |
| Vendors | As needed | Support requests |

- [ ] Communication cadence established per severity
- [ ] Status page updated (if public-facing service)
- [ ] Plain language used (business impact, not just technical details)
- [ ] "What we know / what we don't know" structure used
- [ ] Next update time committed and met

**CMMC Alignment:** IR.1.2 (incident reporting), IR.2.1 (incident response plan)

---

## 5. Recovery Execution

- [ ] Recovery plan selected (fix forward vs. rollback)
- [ ] Rollback executed if change caused incident
- [ ] Fix applied if root cause identified and fix tested
- [ ] Workaround implemented if permanent fix delayed
- [ ] Recovery verified (smoke tests, user confirmation)
- [ ] Service restoration confirmed (monitoring green, users functional)
- [ ] Client sign-off received (they confirm service acceptable)

---

## 6. Incident Closure

- [ ] Incident declared resolved (all services restored)
- [ ] Timeline finalized (all entries complete)
- [ ] Incident Summary completed (TPL-CARE-005):
  - What happened (chronological narrative)
  - Impact assessment (duration, users, business cost)
  - Actions taken (response timeline)
  - Root cause (underlying trigger, not just symptom)
  - Resolution (how service restored)
- [ ] Ticket closed with summary link
- [ ] Client final communication sent (closure notification)

**Time Target:** Summary within 24 hours of resolution

---

## 7. Post-Incident Review (24-72 hours post-incident)

- [ ] Review scheduled with right participants (response team, stakeholders)
- [ ] Timeline reviewed (accurate? complete?)
- [ ] Root cause confirmed (5 Whys or similar analysis)
- [ ] What worked identified (response strengths)
- [ ] What failed identified (gaps, confusion, delays)
- [ ] Prevention actions identified (specific, assignable)
- [ ] Runbook gaps noted (documentation to update)

**CMMC Alignment:** IR.1.3 (incident response testing)

---

## 8. Improvement Implementation

- [ ] Action items assigned (owners and due dates)
- [ ] Runbooks updated (procedures improved based on lessons)
- [ ] Monitoring gaps addressed (new alerts if detection failed)
- [ ] Prevention items tracked to completion (backlog managed)
- [ ] Lessons learned documented (knowledge base updated)
- [ ] Team training scheduled (if skill gaps identified)
- [ ] Quarterly review inclusion (trend analysis)

**Time Target:** Critical improvements within 1 week, others per priority

---

## Incident Commander Responsibilities

The Incident Commander:
- Owns the entire response (not necessarily doing technical work)
- Makes go/no-go decisions on actions
- Coordinates all resources
- Is the single point of communication
- Can change if needed (explicit handoff required)

---

## Success Criteria

| Criterion | Target | Industry Avg | Vantus Goal |
|-----------|--------|--------------|-------------|
| Time to detection | <15 min | Hours | <10 min |
| Time to containment | <1 hour | 4+ hours | <30 min |
| Client communication | 100% | 70% | 100% |
| Post-incident review completion | 100% | 50% | 100% |
| Recurrence rate | <5% | 20% | <3% |

---

## Related Documents

- **SOP:** SOP-CARE-019 (Incident Management)
- **Template:** TPL-CARE-005 (Incident Summary)
- **Checklist:** CHK-CARE-009 (Security Alert Triage - for security incidents)
- **Checklist:** CHK-CARE-011 (After-Hours Support - for off-hours incidents)

---

*Last Updated: 2026-02-21 | Version 1.0.0 | Questions? Contact your VP of Operations*
