# CHK-CARE-011: After-Hours Support Checklist

**Document ID:** VS-CARE-CHK-011  
**Version:** 1.0.0  
**Effective Date:** 2026-02-21  
**Owner:** VP of Operations  
**Status:** Active  
**Reading Level:** 8th Grade  
**Estimated Time:** 5-15 minutes (setup), 30-120 minutes (response)  
**Risk Rating:** High (after-hours incidents often higher impact)

**Goal:** Deliver predictable, professional after-hours response with clear escalation paths, defined boundaries, and documented outcomes.

---

## 1. Pre-Shift Preparation

- [ ] On-call schedule confirmed (engineer knows they are on-call)
- [ ] Handoff completed from previous on-call (outstanding issues reviewed)
- [ ] Mobile/laptop charged and connected (redundancy verified)
- [ ] VPN access tested (can connect to client environments)
- [ ] Escalation contacts loaded (phone numbers verified current)
- [ ] Runbook access confirmed (can reach documentation offline if needed)
- [ ] Stop authority contact verified (who can halt emergency actions)

**Time Estimate:** 10 minutes  
**Owner:** On-Call Engineer

---

## 2. Alert Receipt & Triage

- [ ] Alert received via phone/SMS/email/ paging system
- [ ] Client environment identified (which client, what systems)
- [ ] Contract scope verified (is after-hours support included?)
- [ ] Severity classified per matrix:

| Severity | Examples | Response Target |
|----------|----------|-----------------|
| **Critical** | Complete system down, security breach | 15 minutes |
| **High** | Major function impaired, single server down | 60 minutes |
| **Medium** | Workaround available, performance degraded | Next business day |
| **Low** | Minor issue, cosmetic problem | Next business day |

**Time Target:** Classification within 5 minutes  
**CMMC Alignment:** IR.1.1 (incident handling), IR.2.1 (incident reporting)

---

## 3. Initial Response

- [ ] Acknowledgment sent to client ("We received your alert and are investigating")
- [ ] Ticket created with incident timestamp
- [ ] Initial assessment started (remote access established if needed)
- [ ] Scope determined (affected systems, user impact)
- [ ] Preliminary cause identified (hardware, software, network, third-party)
- [ ] Client updated with initial findings (even if "still investigating")

**Time Target:** Initial response within SLA, update every 30 minutes

---

## 4. Escalation Management

- [ ] Secondary escalation contacted if primary cannot resolve (within 30 min)
- [ ] Vendor escalation initiated if third-party issue (ISP, cloud provider)
- [ ] Client escalation triggered if business decision needed
- [ ] Security Lead notified if security incident suspected
- [ ] Incident Commander assigned if multi-system or high-impact

**Owner:** VP of Operations (escalation authority)

---

## 5. Containment & Resolution

- [ ] Temporary workaround implemented (restore partial service)
- [ ] Root cause addressed (permanent fix applied)
- [ ] Service verified operational (smoke tests passed)
- [ ] Client confirmation received (they verify service restored)
- [ ] Monitoring alerts cleared (all green status)
- [ ] No new issues introduced (regression check complete)

**Vantus standard:** requiring client confirmation before closure

---

## 6. Communication Protocol

- [ ] Client contacted at appropriate intervals:
  - Critical: Every 15-30 minutes
  - High: Every 60 minutes
  - Medium/Low: Next business day unless requested
- [ ] Plain language used (no jargon, clear explanations)
- [ ] Business impact stated ("Email is down" vs "Exchange service stopped")
- [ ] Next steps communicated ("We are waiting for ISP" or "Applying fix now")
- [ ] ETA provided when possible ("Expected resolution in 2 hours")

---

## 7. Post-Incident Actions

- [ ] Incident summary written (TPL-CARE-005 completed)
- [ ] Timeline documented (every action with timestamp)
- [ ] Root cause identified (underlying issue, not just symptom)
- [ ] Prevention ticket created (to stop recurrence)
- [ ] Day team briefed (handoff for follow-up actions)
- [ ] Client follow-up scheduled (if needed)

**Time Estimate:** 15-30 minutes post-resolution  
**CMMC Alignment:** IR.1.3 (incident response testing)

---

## 8. On-Call Shift Closure

- [ ] All incidents resolved or day team briefed
- [ ] Documentation complete (tickets updated, summaries filed)
- [ ] Follow-up actions assigned (owners and due dates)
- [ ] Shift handoff to next on-call (verbal + written)
- [ ] Expenses logged (if mileage or other costs incurred)
- [ ] Lessons learned captured (process improvements noted)

---

## After-Hours Boundaries (Critical)

| Included | Not Included (unless contracted) |
|----------|----------------------------------|
| Critical system outages | Non-critical issues (can wait) |
| Security incidents | Project work |
| Confirmed emergencies | Planned maintenance |
| Scope-defined coverage | Out-of-scope systems |

**Always verify:** Is this system in scope for after-hours support?

---

## Success Criteria

| Criterion | Target | Verification |
|-----------|--------|--------------|
| Response time (Critical) | Within 15 min | Alert timestamps |
| Response time (High) | Within 60 min | Alert timestamps |
| Client satisfaction | 90%+ | Post-incident survey |
| Escalation accuracy | 95%+ | Escalation audit |
| Documentation completeness | 100% | Ticket review |

---

## Related Documents

- **SOP:** SOP-CARE-018 (After-Hours Support)
- **SOP:** SOP-CARE-019 (Incident Management)
- **Template:** TPL-CARE-005 (Incident Summary)

---

*Last Updated: 2026-02-21 | Version 1.0.0 | Questions? Contact your VP of Operations*
