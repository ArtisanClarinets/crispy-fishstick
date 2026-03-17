# CHK-CARE-009: Security Alert Triage Checklist

**Document ID:** VS-CARE-CHK-009  
**Version:** 1.0.0  
**Effective Date:** 2026-02-21  
**Owner:** Security Lead  
**Status:** Active  
**Reading Level:** 8th Grade  
**Estimated Time:** 10-30 minutes per alert  
**Risk Rating:** Critical (security incidents can escalate rapidly)

**Goal:** Classify, investigate, and respond to security signals with appropriate urgency while maintaining clear documentation and escalation paths.

---

## 1. Initial Alert Receipt (T+0 minutes)

- [ ] Alert received via monitoring system, email, or client report
- [ ] Alert source and type identified (SIEM, EDR, firewall, client notification)
- [ ] Ticket created in tracking system with unique identifier
- [ ] Alert timestamp recorded (detection time noted)
- [ ] Initial severity assigned per classification matrix (see below)

**Time Target:** Within 5 minutes of receipt  
**Owner:** On-duty Engineer

---

## 2. Severity Classification

| Level | Indicators | Response Time |
|-------|------------|---------------|
| **Informational** | Routine events, no action required | Log only |
| **Suspicious** | Unusual but not confirmed threat | Investigate within 4 hours |
| **Likely Incident** | Probable security event | Investigate within 1 hour |
| **Confirmed Incident** | Active breach or confirmed compromise | Immediate (within 15 minutes) |

- [ ] Severity level determined using above matrix
- [ ] Classification rationale documented in ticket
- [ ] Escalation triggered if severity = Likely Incident or higher

**CMMC Alignment:** IR.1.1 (incident handling), IR.2.1 (incident reporting)

---

## 3. Initial Investigation

- [ ] Affected systems identified (IP, hostname, user account)
- [ ] Timeline established (when did activity begin, what preceded alert)
- [ ] Log sources checked (firewall, authentication, endpoint, proxy)
- [ ] Pattern analysis: isolated event or part of broader campaign
- [ ] Related alerts searched (correlated events in last 24-72 hours)
- [ ] Scope assessed: single system, multiple systems, or network-wide

**Time Target:** 15-30 minutes for initial assessment  
**Vantus standard:** requiring correlated event search

---

## 4. Containment Decision

- [ ] Containment required? (determines next steps)
- [ ] If YES: Client approval obtained for disruptive actions (unless emergency override contracted)
- [ ] If YES: Containment actions documented before execution
- [ ] If NO: Monitoring enhanced and revisit time set
- [ ] Stop authority confirmed for high-impact containment

**Critical Rule:** Never take disruptive actions without approval unless explicitly authorized by contract

---

## 5. Escalation Execution

- [ ] Security Lead notified for Likely/Confirmed incidents
- [ ] Client contact notified per communication plan
- [ ] Incident Commander assigned (SOP-CARE-019 invoked if confirmed)
- [ ] Law enforcement/legal notified only with explicit client authorization
- [ ] Evidence preservation initiated (logs secured, chain of custody started)

**Time Target:** Escalations within 15 minutes for Confirmed, 1 hour for Likely

---

## 6. Documentation & Handoff

- [ ] Investigation timeline documented (every action timestamped)
- [ ] Evidence locations recorded (log files, screenshots, packet captures)
- [ ] Decisions and rationale captured (why actions taken or not taken)
- [ ] Ticket updated with current status and next steps
- [ ] Shift handoff completed if跨越 team changes (verbal + written)

**CMMC Alignment:** IR.1.2 (incident reporting), IR.2.2 (incident response plan testing)

---

## 7. Post-Alert Actions

- [ ] False positive? → Tuning rule created to reduce future noise
- [ ] True positive contained? → Recovery planning initiated
- [ ] Root cause identified? → Prevention ticket created
- [ ] Client communication sent? → Summary provided in business terms
- [ ] Monthly scorecard updated? >> Alert metrics included

---

## Alert Response Flow Summary

```
Alert Received
    |
    v
Classify Severity (Info/Suspicious/Likely/Confirmed)
    |
    +---> Informational → Log + Monitor
    |
    +---> Suspicious → Investigate (4hr target)
    |
    +---> Likely Incident → Escalate (1hr target)
    |
    +---> Confirmed Incident → Full Incident Response (immediate)
```

---

## Success Criteria

| Criterion | Target | Verification |
|-----------|--------|--------------|
| Initial classification | Within 5 min | Ticket timestamps |
| Likely/Confirmed escalation | Within target time | Escalation logs |
| Client notification | Per SLA | Communication records |
| Documentation complete | 100% | Ticket audit |
| False positive reduction | 10% monthly | Trend analysis |

---

## Related Documents

- **SOP:** SOP-CARE-016 (Security Alert Response)
- **SOP:** SOP-CARE-019 (Incident Management)
- **Template:** TPL-CARE-005 (Incident Summary)

---

*Last Updated: 2026-02-21 | Version 1.0.0 | Questions? Contact your Security Lead*
