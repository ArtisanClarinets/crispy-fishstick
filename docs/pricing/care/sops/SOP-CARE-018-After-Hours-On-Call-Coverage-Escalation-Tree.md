# SOP-CARE-018: After-Hours Support & Escalation

**Document ID:** VS-CARE-OPS-018  
**Version:** 2.0.0 (Launch Ready)  
**Effective Date:** 2026-02-01  
**Owner:** VP of Operations  
**Status:** Active  
**Reading Level:** 8th Grade  
**Audience:** Small Business Owners  

---

## What This Document Is

This SOP provides predictable after-hours escalation when contracted, with clear response boundaries and severity definitions. Know what to expect when issues happen outside business hours.

---

## Why After-Hours Support Matters

Clear after-hours procedures:
- Define when to call
- Set response expectations
- Enable quick escalation
- Reduce stress during incidents

---

## Two Core Principles

### 1. Plain Words
- Response targets clearly stated
- Boundaries explicit
- No implied 24/7 SOC

### 2. Recovery Over Theory
- Consistent escalation beats heroics
- Predictable process
- Reliable response

---

## Who Does What

| Role | Responsibility |
|------|----------------|
| **On-Call Engineer** | Responds to alerts/incidents per scope |
| **VP of Operations** | Owns coverage schedule and escalation paths |
| **Client Contact** | Approves disruptive actions where required |

---

## Step-by-Step: After-Hours Process

### Step 1: Publish Schedule
Provide:
- On-call schedule
- Escalation tree
- Client contacts
- Stop authority designation

### Step 2: Define Severity
Clear definitions for after-hours response:
| Severity | Example | Response |
|----------|---------|----------|
| **Critical** | Complete system down | Immediate response |
| **High** | Major function impaired | Within 1 hour |
| **Medium** | Workaround available | Next business day |
| **Low** | Minor issue | Next business day |

### Step 3: When Triggered
When after-hours alert fires:
1. Open incident ticket
2. Begin assessment
3. Classify severity

### Step 4: Escalate Appropriately
Based on severity and skill needed:
- Primary on-call
- Secondary/lead if needed
- Client for business decisions

### Step 5: Communicate Status
Update client contact using:
- What we know
- What we're doing
- Next update time

### Step 6: Post-Incident Actions
After resolution:
- Write incident summary
- Add prevention to backlog
- Update procedures if needed

---

## Important: Scope Matters

After-hours support is **NOT included by default**. It requires:
- Specific contract add-on
- Defined scope
- Agreed response times

---

## Decision Flowchart

```
After-Hours Trigger
      |
      v
Severity High?
      |
   +--+--+
   |     |
  YES    NO
   |     |
   v     v
Escalate +  Ticket +
Incident    Respond Within
Coordination Contracted
      |     Window
      |     |
      +-----+
            |
            v
    Disruptive Action
    Needed?
            |
         +--+--+
         |     |
        YES    NO
         |     |
         v     v
    Client     Contain/
    Approval + Advise
    Execute
```

---

## Templates & Checklists

- **Incident Summary**: `../templates/TPL-CARE-005-Incident-Summary.md`

---

## When to Escalate

Escalate to Program Owner and Security Lead if:
- Risk is unclear
- Safety concerns exist
- Contractual scope ambiguous

---

## Success Criteria

| Requirement | Verification |
|-------------|--------------|
| Procedure followed | Incident review |
| Files produced | Documentation check |
| Approvals captured | Client confirmation |
| Records updated | System audit |

---

## Audit & Compliance

- Artifacts retained per contract
- Spot-audited monthly under Care QMS
- Response times tracked

---

## Real Example

**Scenario**: ISP outage at 2 AM.

**After-Hours Response**:
1. Alert fires: internet connection lost
2. On-call engineer notified
3. Assessment: ISP issue, not local
4. Client notified of issue and cause
5. Documentation: incident ticket opened
6. Coordination: if failover contracted, activate
7. Follow-up: resolution confirmed, summary sent

---

## Key Terms Explained

| Term | Simple Definition |
|------|-------------------|
| **On-Call** | Engineer available for after-hours issues |
| **Escalation Tree** | Who to contact in what order |
| **Stop Authority** | Person who can halt actions for safety |
| **Severity** | Level of impact on business |
| **Disruptive Action** | Change that could affect operations |
| **Failover** | Switching to backup system |

---

## SEO Keywords

after hours IT support, 24/7 IT service, emergency IT support, business technology support, IT help desk, managed IT support, round the clock IT, technology emergency response, IT incident support, business continuity support

---

*Last Updated: 2026-02-01 | Version 2.0.0 | Questions? Contact your Account Manager*
