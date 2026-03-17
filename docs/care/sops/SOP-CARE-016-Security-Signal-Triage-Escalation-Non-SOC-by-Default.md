# SOP-CARE-016: Security Alert Response & Escalation (Non-SOC by Default)

**Document ID:** VS-CARE-OPS-016  
**Version:** 2.0.0 (Launch Ready)  
**Effective Date:** 2026-02-01  
**Owner:** Security Lead  
**Status:** Active  
**Reading Level:** 8th Grade  
**Audience:** Small Business Owners

---

## What This Document Is

This SOP defines how we respond to security alerts and when to escalate. We do not imply 24/7 SOC monitoring unless explicitly contracted.

---

## Why This SOP Matters

This SOP defines a repeatable Vantus standard for the service area it covers.
Use it to create consistency, clear ownership, and auditable execution without unsupported market-comparison language.

---

## Why Security Response Matters

Clear security procedures:

- Enable fast response to threats (mean time to contain: <4 hours)
- Define roles and responsibilities
- Create accountability
- Protect your business
- Meet CMMC incident response requirements

---

## Two Core Principles

### 1. Plain Words

- Precise about what's monitored
- Clear about what isn't
- No hidden assumptions

### 2. Proof Required

- Document timelines
- Record approvals
- Log actions taken

---

## Who Does What

| Role                      | Responsibility                                      |
| ------------------------- | --------------------------------------------------- |
| **Security Lead**         | Owns severity model and escalations                 |
| **On-Duty Engineer**      | Performs initial response and documentation         |
| **Client Decision Maker** | Approves containment actions that change operations |

---

## Step-by-Step: Security Response

### Step 1: Classify Signal Severity

Every security signal gets a level:
| Level | Description | Response |
|-------|-------------|----------|
| **Informational** | FYI only | Log and monitor |
| **Suspicious** | Possible issue | Investigate |
| **Likely Incident** | Probable problem | Notify + coordinate |
| **Confirmed Incident** | Confirmed breach | Full incident response |

### Step 2: Create Ticket

Open ticket for any signal requiring investigation.

### Step 3: Escalate Incidents

For likely or confirmed incidents:

- Notify client contact
- Confirm stop authority
- Initiate incident coordination (SOP-CARE-019)

### Step 4: Get Approval for Action

- Do NOT take disruptive actions without client approval
- Unless contract explicitly authorizes emergency response
- Document all approvals

### Step 5: Document Everything

Record:

- Timeline of events
- Evidence references
- Decisions made
- Actions taken

### Step 6: Deliver Summary

For confirmed incidents:

- Incident summary file (TPL-CARE-005)
- Executive summary
- Recommended next steps

---

## Important Note: Non-SOC by Default

| What We Mean                     | What This Means for You                         |
| -------------------------------- | ----------------------------------------------- |
| **No implied 24/7 SOC**          | We don't monitor continuously unless contracted |
| **Business hours response**      | Standard coverage during business days          |
| **After-hours add-on available** | Optional extended coverage                      |
| **Clear scope**                  | What's monitored is explicitly defined          |

---

## Decision Flowchart

```
Security Signal
      |
      v
What Severity?
      |
+-----+-----+--------+
|     |     |        |
Info  Susp  Likely/  |
      icious Confirmed
|     |     |        |
v     v     v        |
Log + Create Notify + |
Monitor Ticket Incident  |
      |     Coordination |
      |     |           |
      +-----+           |
            |           |
            v           |
     Containment Approved?
            |
         +--+--+
         |     |
        YES    NO
         |     |
         v     v
     Contain  Monitor
     + Document + Advise
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
- Response quality tracked

---

## Real Example

**Scenario**: Unusual login alert received.

**Response Process**:

1. Classify: suspicious activity
2. Create investigation ticket
3. Check:
   - Was login legitimate?
   - Is MFA enabled?
   - Any other unusual activity?
4. If suspicious:
   - Recommend password reset
   - Enable MFA if not active
   - Review access logs
5. Document findings
6. Report in monthly summary

---

## Key Terms Explained

| Term                      | Simple Definition                               |
| ------------------------- | ----------------------------------------------- |
| **SOC**                   | Security Operations Center—24/7 monitoring team |
| **Security Signal**       | Alert or indicator of potential security issue  |
| **Containment**           | Actions to stop or limit a security incident    |
| **Stop Authority**        | Person who can halt response actions            |
| **Incident Coordination** | Organized response to security event            |
| **Severity**              | Level of seriousness of security signal         |

---

## SEO Keywords

business security monitoring, IT threat response, security alert management, cyber incident response, managed security services, business threat detection, security event handling, IT security response, cyber alert management, business security operations

## Version History

| Version | Date       | Changes                                                                                                                                          |
| ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2.1.0   | 2026-02-21 | Added service-positioning section updates; added quantified security response metrics; added non-SOC honesty messaging; added CMMC 2.0 alignment |
| 2.0.0   | 2026-02-01 | Initial launch version                                                                                                                           |

---

## SEO Keywords

business security monitoring, IT threat response, security alert management, cyber incident response, managed security services, business threat detection, security event handling, IT security response, cyber alert management, business security operations, CMMC incident response, NIST security operations

---

_Last Updated: 2026-02-21 | Version 2.1.0 | Questions? Contact your Account Manager_
