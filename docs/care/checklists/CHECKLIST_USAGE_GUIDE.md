# CHECKLIST_USAGE_GUIDE.md

**Document ID:** VS-CARE-CHK-GUIDE  
**Version:** 1.1.0  
**Effective Date:** 2026-03-07  
**Owner:** Program Owner  
**Status:** Active  
**Reading Level:** 8th Grade  
**Classification:** Internal - checklist operating guide  
**Publication rule:** Internal reference only.

---

## Purpose

This guide helps Vantus Care team members and clients understand **when to use which checklist** and how to navigate the complete checklist library.

---

## How to Use This Guide

1. **Find your situation** in the scenarios below
2. **Identify the appropriate checklist(s)**
3. **Follow the checklist** step-by-step
4. **Document completion** for audit trail

---

## By Operational Scenario

### Starting with a New Client

| Phase | Checklist | When to Use |
|-------|-----------|-------------|
| **Pre-engagement** | CHK-CARE-001 (Onboarding) | Review during sales handoff |
| **Week 1** | CHK-CARE-001, CHK-CARE-002 | Execute full onboarding |
| **Week 1-2** | CHK-CARE-003, CHK-CARE-020 | Set up monitoring and inventory |
| **Week 2-4** | CHK-CARE-004 | Verify backup coverage |
| **Day 30** | CHK-CARE-001 (Section 5) | Campaign readiness check |

**Owner:** Delivery Lead (primary), Security Lead (access), VP of Operations (monitoring)

---

### Daily Operations

| Situation | Checklist | Time to Complete |
|-----------|-----------|------------------|
| **Security alert received** | CHK-CARE-009 | 10-30 minutes |
| **Change requested** | CHK-CARE-010 | 30-120 minutes |
| **After-hours incident** | CHK-CARE-011 | 30-120 minutes |
| **General incident** | CHK-CARE-012 | Ongoing |
| **Suspicious activity** | CHK-CARE-009 → CHK-CARE-012 | Escalate if needed |

**Owner:** Security Lead (alerts), VP of Operations (changes, incidents)

---

### Weekly Activities

| Activity | Checklist | When |
|----------|-----------|------|
| **Patch cycle execution** | CHK-CARE-008 | Weekly or as scheduled |
| **Documentation review** | CHK-CARE-015 | Weekly spot-checks |
| **Asset discovery** | CHK-CARE-020 | Ongoing updates |

**Owner:** Security Lead (patches), Delivery Lead (docs, assets)

---

### Monthly Activities

| Activity | Checklist | Due Date |
|----------|-----------|----------|
| **Backup verification** | CHK-CARE-004 | Monthly |
| **Scorecard preparation** | CHK-CARE-013 | By 5th business day |
| **Documentation freshness** | CHK-CARE-015 | Monthly assessment |
| **Asset inventory update** | CHK-CARE-020 | Monthly refresh |
| **Patch compliance report** | CHK-CARE-008 | Include in scorecard |

**Owner:** VP of Operations (backups), Account Manager (scorecard), Delivery Lead (docs, assets)

---

### Quarterly Activities

| Activity | Checklist | When |
|----------|-----------|------|
| **Business review** | CHK-CARE-014 | End of quarter |
| **Restore drill** | CHK-CARE-005 | Quarterly |
| **Lifecycle review** | CHK-CARE-017 | Quarterly |
| **Training/drill event** | CHK-CARE-019 | Quarterly or as scheduled |
| **Deep documentation clean** | CHK-CARE-015 | Quarterly |
| **Asset inventory deep review** | CHK-CARE-020 | Quarterly |

**Owner:** Account Manager (QBR, training), VP of Operations (drills, lifecycle), Delivery Lead (docs, assets)

---

### Special Events

| Event | Checklist | Trigger |
|-------|-----------|---------|
| **Hardware needed** | CHK-CARE-016 | Client requests equipment |
| **Audit preparation** | CHK-CARE-018 | Audit notice received |
| **Penetration test** | CHK-CARE-007 | Authorized security test |
| **Tabletop exercise** | CHK-CARE-019 | Scheduled drill |
| **Client departure** | CHK-CARE-006 | Contract termination |
| **New user onboarding** | CHK-CARE-002 | Access request submitted |

---

## By Role

### Delivery Lead

**Primary Checklists:**
- CHK-CARE-001: Onboarding
- CHK-CARE-015: Documentation Review
- CHK-CARE-020: Asset Inventory

**When to Use:**
- Every new client onboarding
- Monthly documentation reviews
- Monthly/quarterly asset updates
- When documentation changes needed

**Success Metric:** 95%+ documentation freshness, 98%+ inventory accuracy

---

### Security Lead

**Primary Checklists:**
- CHK-CARE-002: Access Setup
- CHK-CARE-007: Simulation Safety
- CHK-CARE-008: Patch Management
- CHK-CARE-009: Security Alert Triage
- CHK-CARE-018: Compliance Evidence

**When to Use:**
- Every access change (CHK-002)
- Every security alert (CHK-009)
- Monthly patch cycles (CHK-008)
- Every authorized test (CHK-007)
- Every audit request (CHK-018)

**Success Metric:** 95%+ patch compliance, 100% alert response SLA

---

### VP of Operations

**Primary Checklists:**
- CHK-CARE-003: Monitoring Setup
- CHK-CARE-004: Backup Oversight
- CHK-CARE-005: Restore Drill
- CHK-CARE-010: Change Management
- CHK-CARE-011: After-Hours Support
- CHK-CARE-012: Incident Response
- CHK-CARE-017: Lifecycle Planning

**When to Use:**
- Every production change (CHK-010)
- Every incident (CHK-012)
- Monthly backup verification (CHK-004)
- Quarterly restore drills (CHK-005)
- Quarterly lifecycle review (CHK-017)
- After-hours incidents (CHK-011, if contracted)

**Success Metric:** 97%+ change success, 90%+ incident SLA

---

### Account Manager

**Primary Checklists:**
- CHK-CARE-013: Monthly Scorecard
- CHK-CARE-014: Quarterly Governance Review
- CHK-CARE-019: Training & Drill

**When to Use:**
- Monthly scorecard preparation (CHK-013)
- Quarterly business review (CHK-014)
- Training events (CHK-019)

**Success Metric:** 100% on-time delivery, 90%+ client satisfaction

---

### VP of Delivery

**Primary Checklists:**
- CHK-CARE-006: Offboarding
- CHK-CARE-016: Hardware Procurement

**When to Use:**
- Client departure (CHK-006)
- Hardware needs (CHK-016)

**Success Metric:** Zero data loss, 95%+ client satisfaction

---

## Decision Trees

### "A Security Alert Fired—What Do I Do?"

```
Security Alert Received
    |
    v
Use CHK-CARE-009 (Security Alert Triage)
    |
    +--> Informational → Log and monitor
    |
    +--> Suspicious → Investigate (4hr target)
    |
    +--> Likely Incident → Escalate (1hr target)
    |                    |
    |                    v
    |              Use CHK-CARE-012 (Incident Response)
    |
    +--> Confirmed Incident → Immediate escalation
                             |
                             v
                        Use CHK-CARE-012 (Incident Response)
```

---

### "We Need to Make a Change—What Do I Do?"

```
Change Requested
    |
    v
Use CHK-CARE-010 (Change Management)
    |
    +--> Standard Change → Pre-approved, execute
    |
    +--> Normal Change → Plan + Approval required
    |                    |
    |                    v
    |              Get approvals
    |                    |
    |                    v
    |              Execute with CHK-CARE-010
    |
    +--> Emergency Change → Execute safely
                            Document after
```

---

### "An Incident Happened—What Do I Do?"

```
Incident Detected
    |
    v
Use CHK-CARE-012 (Incident Response)
    |
    +--> Business Hours → Standard response
    |
    +--> After Hours → Use CHK-CARE-011 (if contracted)
    |                   +
    |                   Use CHK-CARE-012
    |
    +--> Security Incident → Use CHK-CARE-009 first
                             +
                             Use CHK-CARE-012
```

---

## Common Mistakes to Avoid

### Using Wrong Checklist

| Wrong | Right | Why |
|-------|-------|-----|
| Using CHK-009 for general incidents | CHK-009 for security only, CHK-012 for general | Different procedures, different documentation |
| Using CHK-010 for emergency changes | CHK-010 for planned changes, document emergency after | Emergency needs speed, not process |
| Skipping CHK-007 for "quick tests" | Always use CHK-007 for any simulation | Safety first, always |

### Timing Mistakes

| Mistake | Impact | Correction |
|---------|--------|------------|
| Delaying CHK-009 triage | Alert escalates to incident | Triage within 5 minutes |
| Rushing CHK-010 planning | Failed changes, outages | Take time for rollback planning |
| Skipping CHK-005 drills | Untested backups, recovery failures | Quarterly drills mandatory |

### Documentation Mistakes

| Mistake | Impact | Correction |
|---------|--------|------------|
| Partial CHK completion | Audit failures, knowledge gaps | Every checkbox matters |
| No evidence captured | Can't prove compliance | Screenshots, logs, timestamps |
| Missing approvals | Accountability gaps | Written approval always |

---

## CMMC Compliance Notes

When using checklists for CMMC compliance:

1. **Complete every item** — Partial completion = partial compliance
2. **Capture evidence** — Screenshots, logs, sign-offs
3. **Use exact timestamps** — When did each step happen?
4. **Retain records** — Per contract retention requirements
5. **Regular review** — Auditors will check checklist usage

**Key CMMC-Aligned Checklists:**
- CHK-002, CHK-009, CHK-018: Access Control (AC)
- CHK-004, CHK-013, CHK-018: Audit (AU)
- CHK-010, CHK-015, CHK-020: Configuration Management (CM)
- CHK-011, CHK-012, CHK-019: Incident Response (IR)

---

## Quick Reference Card

Print this and keep it handy:

```
URGENT SITUATIONS
- Security Alert → CHK-009 (10-30 min)
- Incident → CHK-012 (ongoing)
- After-hours → CHK-011 (if contracted)
- Emergency Change → Execute, document after

DAILY OPERATIONS
- Normal Change → CHK-010 (30-120 min)
- New Access → CHK-002 (30-60 min)
- Training → CHK-019 (4-8 hours)

WEEKLY/MONTHLY
- Patches → CHK-008 (45-90 min)
- Backups → CHK-004 (30-45 min)
- Scorecard → CHK-013 (3-4 hours)
- Documentation → CHK-015 (2-4 hours)

QUARTERLY
- Business Review → CHK-014 (6-8 hours)
- Restore Drill → CHK-005 (2-4 hours)
- Lifecycle → CHK-017 (2-3 hours)
- Deep Inventory → CHK-020 (2-4 hours)

SPECIAL
- Onboarding → CHK-001 (2-4 hours)
- Offboarding → CHK-006 (2-3 hours)
- Hardware → CHK-016 (2-4 hours)
- Audit → CHK-018 (4-8 hours)
- Simulation → CHK-007 (30-60 min)
```

---

## Getting Help

**Checklist Questions:**
- Ask the checklist Owner (listed in MASTER_CHECKLIST_INDEX.md)
- Contact your Program Owner for process questions

**Emergency Situations:**
- Follow the checklist but escalate if blocked
- Never skip safety steps in CHK-007 (simulations)
- When in doubt, escalate to VP of Operations

**Training:**
- New team members: Review all checklists in your role
- Annual refresher: Re-read checklists you use regularly
- Checklist updates: Review CHANGELOG when notified

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-21 | Initial release with complete usage guidance |

---

*Last Updated: 2026-02-21 | Version 1.0.0 | Questions? Contact your Program Owner*
