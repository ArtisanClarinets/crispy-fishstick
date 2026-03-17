# SOP-CARE-013: Backup Management & Retention Standards

**Document ID:** VS-CARE-OPS-013  
**Version:** 2.0.0 (Launch Ready)  
**Effective Date:** 2026-02-01  
**Owner:** VP of Operations  
**Status:** Active  
**Reading Level:** 8th Grade  
**Audience:** Small Business Owners

---

## What This Document Is

This SOP ensures your backups run properly, retention expectations are clear, and exclusions are documented. Your data stays protected with provable recovery capability.

---

## Why This SOP Matters

This SOP defines a repeatable Vantus standard for the service area it covers.
Use it to create consistency, clear ownership, and auditable execution without unsupported market-comparison language.

---

## Why Backup Management Matters

Reliable backups:

- Protect against ransomware (your only true defense)
- Enable quick recovery from disasters
- Meet CMMC/NIST compliance requirements
- Provide business continuity assurance
- **60% of businesses without tested backups fail after data loss**

---

## Two Core Principles

### 1. Recovery Over Theory

- Backups are operational safety, not checkboxes
- Regular testing beats complex setups
- Practical, reliable, tested

### 2. Proof Required

- Backup health evidenced with success signals
- Restore verification (when contracted)
- Documented, measurable results

---

## Who Does What

| Role                      | Responsibility                            |
| ------------------------- | ----------------------------------------- |
| **Backup Lead**           | Owns backup standards and reporting       |
| **Engineer**              | Reviews backup jobs and documents posture |
| **Client Decision Maker** | Approves retention and storage tradeoffs  |

---

## Step-by-Step: Backup Management

### Step 1: Define Scope

Identify:

- What data to back up
- What systems to protect
- What's excluded (do-not-do list)

### Step 2: Set Retention Targets

Document:
| Factor | Consideration |
|--------|---------------|
| **Retention Period** | How long to keep backups |
| **Storage Limits** | Available space |
| **Bandwidth** | Transfer capacity |
| **Application Limits** | Software constraints |

### Step 3: Monitor Success

Review backup success signals:

- Daily (for critical systems)
- Weekly (for standard systems)
- Create tickets for any failures

### Step 4: Track Chronic Failures

If backups fail repeatedly:

- Document pattern
- Propose fix
- Classify as add-on or project if needed

### Step 5: Monthly Scorecard

Include backup status in monthly report:

- Success rate
- Any failures
- Storage trends
- Recommendations

### Step 6: Schedule Restore Testing

Per contract terms:

- Restore verification (SOP-CARE-014)
- Test recovery process
- Document results

---

## Decision Flowchart

```
Backup Oversight
      |
      v
Confirm Scope +
Retention Policy
      |
      v
Review Success
Signals
      |
      v
Any Failures?
      |
   +--+--+
   |     |
  YES    NO
   |     |
   v     v
Create      Report
Remediation Posture
Ticket
      |
      v
Requires New Scope?
      |
   +--+--+
   |     |
  YES    NO
   |     |
   v     v
Change      Fix In
Impact      Scope
Assessment
```

---

## Templates & Checklists

- **Backup Oversight Checklist**: `../checklists/CHK-CARE-004-Backup-Oversight-Checklist.md`
- **Restore Drill Report**: `../templates/TPL-CARE-006-Restore-Drill-Report.md`

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
| Procedure followed | Backup review       |
| Files produced     | Documentation check |
| Approvals captured | Client confirmation |
| Records updated    | System audit        |

---

## Audit & Compliance

- Artifacts retained per contract
- Spot-audited monthly under Care QMS
- Backup reliability tracked

---

## Real Example

**Scenario**: Backups succeed but retention is only 7 days; client needs 30 days.

**Resolution**:

1. Identify gap: current vs. required retention
2. Calculate storage requirements
3. Present tradeoffs: storage cost vs. retention
4. Client approves scope change
5. Update backup configuration
6. Update Scope Map
7. Verify new retention working

---

## Key Terms Explained

| Term                     | Simple Definition                              |
| ------------------------ | ---------------------------------------------- |
| **Retention**            | How long backups are kept before deletion      |
| **Success Signal**       | Confirmation that backup completed properly    |
| **Posture**              | Overall health and status of backup system     |
| **Restore Verification** | Testing that backups can actually be recovered |
| **Do-Not-Do List**       | What's explicitly excluded from backup         |
| **Chronic Failure**      | Repeated backup failures                       |

---

## SEO Keywords

business backup services, data backup management, IT backup solutions, business data protection, backup retention policy, managed backup services, data recovery planning, business continuity backup, cloud backup services, enterprise backup management

## Version History

| Version | Date       | Changes                                                                                                                                             |
| ------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.1.0   | 2026-02-21 | Added service-positioning section updates; added quantified backup reliability metrics; added backup testing gap analysis; added CMMC 2.0 alignment |
| 2.0.0   | 2026-02-01 | Initial launch version                                                                                                                              |

---

## SEO Keywords

business backup services, data backup management, IT backup solutions, business data protection, backup retention policy, managed backup services, data recovery planning, business continuity backup, cloud backup services, enterprise backup management, ransomware protection, backup testing services, CMMC backup requirements

---

_Last Updated: 2026-02-21 | Version 2.1.0 | Questions? Contact your Account Manager_
