# SOP-CARE-017: Change Management & Rollback Procedures

**Document ID:** VS-CARE-OPS-017  
**Version:** 2.0.0 (Launch Ready)  
**Effective Date:** 2026-02-01  
**Owner:** VP of Operations  
**Status:** Active  
**Reading Level:** 8th Grade  
**Audience:** Small Business Owners

---

## What This Document Is

This SOP ensures changes happen safely with approvals, rollback plans, and verification. We protect your production systems while making necessary improvements.

---

## Why This SOP Matters

This SOP defines a repeatable Vantus standard for the service area it covers.
Use it to create consistency, clear ownership, and auditable execution without unsupported market-comparison language.

---

## Why Change Management Matters

Proper change control:

- Prevents disruptions (70% of outages are change-related)
- Enables quick recovery if issues occur
- Creates accountability
- Documents what changed and why
- Supports CMMC configuration management requirements

---

## Three Core Principles

### 1. Recovery Over Theory

- Rollback discipline protects uptime
- Always have a way back
- Safety first

### 2. Do the Basics Right

- Follow security baseline
- Use only necessary access
- No shortcuts

### 3. Proof Required

- Change records document what happened
- Verification shows success
- Audit trail maintained

---

## Who Does What

| Role                | Responsibility                                 |
| ------------------- | ---------------------------------------------- |
| **Delivery Lead**   | Approves normal changes; ensures documentation |
| **Engineer**        | Writes change plan and executes                |
| **Client Approver** | Confirms window and acceptance for production  |

---

## Step-by-Step: Change Management

### Step 1: Create Change Record

Document:
| Element | Description |
|---------|-------------|
| **Change Description** | What will be done |
| **Risk Assessment** | What could go wrong |
| **Rollback Plan** | How to undo if needed |
| **Verification Steps** | How to confirm success |

### Step 2: Classify Change

| Type          | Definition               | Approval Required |
| ------------- | ------------------------ | ----------------- |
| **Standard**  | Repeatable, low risk     | Delivery Lead     |
| **Normal**    | Planned, approval needed | Client + Delivery |
| **Emergency** | Urgent, documented after | Notify ASAP       |

### Step 3: Schedule Appropriately

- Use maintenance windows when possible
- Notify stakeholders for customer-impacting changes
- Confirm resources available

### Step 4: Execute Change

- Follow documented plan
- Capture verification evidence (logs, screenshots)
- Monitor for issues

### Step 5: Handle Issues

If problems occur:

1. Execute rollback plan
2. Notify client immediately
3. Document what happened
4. Schedule retry with fixes

### Step 6: Update Documentation

When change alters operations:

- Update runbooks
- Revise diagrams
- Refresh documentation
- Notify relevant parties

---

## Decision Flowchart

```
Need Change
      |
      v
Emergency?
      |
   +--+--+
   |     |
  YES    NO
   |     |
   v     v
Execute   Plan +
with      Approvals
Minimal   |
Safe Steps |
   |       |
   +-------+
           |
           v
    Execute + Verify
           |
           v
     Success?
           |
        +--+--+
        |     |
       YES    NO
        |     |
        v     v
    Update   Rollback
    Docs +   +
    Close    Communicate
```

---

## Templates & Checklists

- **Change Impact Assessment**: `../templates/TPL-CARE-002-Change-Impact-Assessment.md`

---

## When to Escalate

Escalate to Program Owner and Security Lead if:

- Risk is unclear
- Safety concerns exist
- Contractual scope ambiguous

---

## Success Criteria

| Requirement        | Verification         |
| ------------------ | -------------------- |
| Procedure followed | Change record review |
| Files produced     | Documentation check  |
| Approvals captured | Approval logs        |
| Records updated    | System audit         |

---

## Audit & Compliance

- Artifacts retained per contract
- Spot-audited monthly under Care QMS
- Change success tracked

---

## Real Example

**Scenario**: Updating firewall rules.

**Change Process**:

1. **Plan**:
   - Document current rules
   - Define new rules
   - Write rollback (restore old rules)
   - Define verification (test connectivity)

2. **Approve**: Client approves maintenance window

3. **Execute**:
   - Apply changes during window
   - Test connectivity
   - Monitor for issues

4. **Verify**: All systems reachable

5. **Document**: Update firewall documentation

**If Issues Occurred**:

- Immediately restore old rules
- Notify client
- Investigate cause
- Reschedule with fixes

---

## Key Terms Explained

| Term                   | Simple Definition                           |
| ---------------------- | ------------------------------------------- |
| **Rollback**           | Plan to undo a change if it causes problems |
| **Maintenance Window** | Approved time for making changes            |
| **Standard Change**    | Pre-approved, low-risk change               |
| **Emergency Change**   | Urgent fix requiring immediate action       |
| **Verification**       | Steps to confirm change worked              |
| **Runbook**            | Documented procedure for operations         |

---

## SEO Keywords

IT change management, business technology changes, system update procedures, IT change control, managed change process, technology change planning, business system updates, IT deployment management, change approval process, technology rollback planning

## Version History

| Version | Date       | Changes                                                                                                     |
| ------- | ---------- | ----------------------------------------------------------------------------------------------------------- |
| 2.1.0   | 2026-02-21 | Added service-positioning section updates; added quantified change safety metrics; added CMMC 2.0 alignment |
| 2.0.0   | 2026-02-01 | Initial launch version                                                                                      |

---

## SEO Keywords

IT change management, business technology changes, system update procedures, IT change control, managed change process, technology change planning, business system updates, IT deployment management, change approval process, technology rollback planning, CMMC change management

---

_Last Updated: 2026-02-21 | Version 2.1.0 | Questions? Contact your Account Manager_
