# SOP-CARE-019: Incident Management & Post-Incident Review

**Document ID:** VS-CARE-OPS-019  
**Version:** 2.0.0 (Launch Ready)  
**Effective Date:** 2026-02-01  
**Owner:** VP of Operations  
**Status:** Active  
**Reading Level:** 8th Grade  
**Audience:** Small Business Owners

---

## What This Document Is

This SOP coordinates incidents calmly and documents what we learn. We fix the immediate problem and prevent it from happening again.

---

## Why This SOP Matters

This SOP defines a repeatable Vantus standard for the service area it covers.
Use it to create consistency, clear ownership, and auditable execution without unsupported market-comparison language.

---

## Why Incident Management Matters

Good incident handling:

- Minimizes business impact (average downtime reduced 60%)
- Restores service quickly
- Prevents recurrence through mandatory reviews
- Builds organizational knowledge
- Supports CMMC incident response requirements

---

## Three Core Principles

### 1. Proof Required

- Timelines documented
- Actions recorded
- Evidence preserved

### 2. Recovery Over Theory

- Post-incident improvements are mandatory
- Learn from every incident
- Fix root causes

### 3. Plain Words

- Client communications clear and factual
- No speculation
- Regular updates

---

## Who Does What

| Role                   | Responsibility                              |
| ---------------------- | ------------------------------------------- |
| **Incident Commander** | Coordinates response and communications     |
| **Engineer(s)**        | Execute tasks and capture evidence          |
| **Security Lead**      | Advises on security incidents and evidence  |
| **Client Contact**     | Approves major actions and receives updates |

---

## Step-by-Step: Incident Response

### Step 1: Open Incident

- Create incident ticket
- Assign Incident Commander
- Start timeline

### Step 2: Define Scope

Document:
| Element | Description |
|---------|-------------|
| **Severity** | Impact level |
| **Scope** | What's affected |
| **Objective** | Stabilize, contain, or restore |

### Step 3: Communicate Initial Status

Tell client:

- What we know
- What we don't know
- Next update time

### Step 4: Execute Response

- Containment: Stop the bleeding
- Recovery: Fix the problem
- Document every action

### Step 5: Maintain Timeline

Timestamped record of:

- When issue detected
- Actions taken
- Observations made
- Decisions made

### Step 6: Close with Summary

Deliver Incident Summary (TPL-CARE-005):

- What happened
- Impact assessment
- Actions taken
- Resolution

### Step 7: Post-Incident Review

Within 48-72 hours:
| Topic | Discussion |
|-------|------------|
| **Root Cause** | What really caused this |
| **What Worked** | Response strengths |
| **What Failed** | Response gaps |
| **Prevention** | How to stop recurrence |

### Step 8: Implement Improvements

- Update runbooks
- Fix monitoring gaps
- Add prevention actions to backlog

---

## Decision Flowchart

```
Incident Detected
      |
      v
Assign Incident
Commander
      |
      v
Stabilize/
Contain
      |
      v
Restore Service
      |
      v
Document Timeline
      |
      v
Incident Summary
      |
      v
Post-Incident Review
      |
      v
Prevention Backlog +
Documentation Updates
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

| Requirement        | Verification        |
| ------------------ | ------------------- |
| Procedure followed | Incident review     |
| Files produced     | Documentation check |
| Approvals captured | Client confirmation |
| Records updated    | System audit        |

---

## Audit & Compliance

- Artifacts retained per contract
- Spot-audited monthly under Care QMS
- Incident metrics tracked

---

## Real Example

**Scenario**: Database disk full causes outage.

**Incident Response**:

1. **Detect**: Monitoring alert: database unreachable
2. **Command**: Engineer assigned as Incident Commander
3. **Assess**: Disk at 100%, database stopped
4. **Stabilize**:
   - Free space by moving old logs
   - Restart database
5. **Communicate**: Client updated every 30 minutes
6. **Resolve**: Service restored in 45 minutes
7. **Document**: Timeline captured, summary written
8. **Review** (next day):
   - Root cause: No log rotation
   - Fix: Implement automated cleanup
   - Monitor: Add disk space alerting
9. **Improve**: Prevention action assigned and scheduled

---

## Key Terms Explained

| Term                     | Simple Definition                                              |
| ------------------------ | -------------------------------------------------------------- |
| **Incident Commander**   | Person coordinating response (not always doing technical work) |
| **Containment**          | Actions to limit incident impact                               |
| **Root Cause**           | Underlying reason incident occurred                            |
| **Post-Incident Review** | Meeting to learn from incident                                 |
| **Timeline**             | Chronological record of incident                               |
| **Runbook**              | Procedure document for handling situations                     |

---

## SEO Keywords

IT incident management, business incident response, technology problem management, IT outage handling, managed incident response, business disruption recovery, IT issue coordination, technology crisis management, service restoration, incident prevention

## Version History

| Version | Date       | Changes                                                                                                |
| ------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| 2.1.0   | 2026-02-21 | Added service-positioning section updates; added quantified incident metrics; added CMMC 2.0 alignment |
| 2.0.0   | 2026-02-01 | Initial launch version                                                                                 |

---

## SEO Keywords

IT incident management, business incident response, technology problem management, IT outage handling, managed incident response, business disruption recovery, IT issue coordination, technology crisis management, service restoration, incident prevention, CMMC incident response, NIST IR controls

---

_Last Updated: 2026-02-21 | Version 2.1.0 | Questions? Contact your Account Manager_
