# SOP-CARE-030: Testing Rules Pack & Safety Controls

**Document ID:** VS-CARE-OPS-030  
**Version:** 2.0.0 (Launch Ready)  
**Effective Date:** 2026-02-01  
**Owner:** Security Lead  
**Status:** Active  
**Reading Level:** 8th Grade  
**Audience:** Small Business Owners  

---

## What This Document Is

This SOP standardizes written approval, safety controls, and reporting for any security testing. Every test needs complete documentation before starting.

---

## Why ROE Packs Matter

Complete Rules of Engagement:
- Protects all parties
- Defines boundaries clearly
- Enables safe testing
- Creates accountability

---

## Two Core Principles

### 1. Standard Structure
- ROE Pack standardizes scope and safety
- Same format every time
- Nothing forgotten

### 2. Do the Basics Right
- Stop authority designated
- Do-not-touch lists created
- Safety first always

---

## Who Does What

| Role | Responsibility |
|------|----------------|
| **Security Lead** | Approves ROE completeness |
| **Account Manager** | Confirms commercial scope aligns to ROE |
| **Client Signer** | Signs written approval and constraints |

---

## Step-by-Step: ROE Pack Completion

### Step 1: Define Scope
Document:
| Element | Description |
|---------|-------------|
| **What's Included** | Systems/areas to test |
| **What's Excluded** | Do-not-do list |
| **Testing Types** | What methods allowed |

### Step 2: Set Time Windows
Define:
- When testing occurs
- Hours of operation
- Maintenance windows
- Blackout dates

### Step 3: Create Do-Not-Touch List
Explicitly exclude:
| Category | Examples |
|----------|----------|
| **Critical Systems** | Production database, payment processing |
| **Sensitive Data** | Customer records, financial data |
| **Safety Systems** | Fire suppression, alarms |
| **Third-Party** | Vendor systems, partner data |

### Step 4: Designate Stop Authority
Must have:
| Element | Description |
|---------|-------------|
| **Name** | Who can stop testing |
| **Contact** | How to reach them 24/7 |
| **Authority** | Explicit power to halt |

### Step 5: Define Safety Constraints
Document:
- What will not be done
- Limits and boundaries
- Emergency procedures

### Step 6: Confirm Reporting
Agree on:
| Element | Description |
|---------|-------------|
| **Report Format** | How findings delivered |
| **Retest Window** | When retesting allowed |
| **Evidence Handling** | How logs stored/deleted |

### Step 7: Data Handling
Confirm:
- How test data stored
- Retention period
- Deletion procedures

### Step 8: Legal Acknowledgment
Client confirms:
- Legal approvals obtained
- Law enforcement notified if required
- Property owner permission secured

### Step 9: Do Not Start Until Complete
**Hard rule**: Testing cannot begin until all ROE items are complete and signed.

---

## ROE Pack Components

| Section | Required |
|---------|----------|
| Scope & Exclusions | Yes |
| Time Windows | Yes |
| Do-Not-Touch List | Yes |
| Stop Authority & Contacts | Yes |
| Safety Constraints | Yes |
| Reporting Format | Yes |
| Retest Window | If applicable |
| Data Handling | Yes |
| Legal Approval | Yes |

---

## Decision Flowchart

```
Prepare ROE
      |
      v
Scope + Exclusions
      |
      v
Stop Authority +
Contacts
      |
      v
Safety Constraints
      |
      v
Reporting +
Retest Window
      |
      v
Complete?
      |
   +--+--+
   |     |
  NO    YES
   |     |
   v     v
Return    Authorize
to Step 1 Start
```

---

## Templates & Checklists

- **ROE Pack**: `../templates/TPL-CARE-008-ROE-Pack.md`
- **Simulation Safety Checklist**: `../checklists/CHK-CARE-007-Simulation-Safety-Checklist.md`

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
| Procedure followed | ROE review |
| Files produced | Documentation check |
| Approvals captured | Signatures on file |
| Records updated | System audit |

---

## Audit & Compliance

- Artifacts retained per contract
- Spot-audited monthly under Care QMS
- ROE compliance tracked

---

## Real Example

**Scenario**: Client wants to exclude production payment processing.

**ROE Process**:
1. Client requests exclusion
2. Add to do-not-touch list: "Payment processing servers"
3. Define specific IP addresses
4. Confirm with signer
5. Document rationale: "Business critical, tested separately"
6. Include in safety review
7. Testing proceeds with exclusion respected

---

## Key Terms Explained

| Term | Simple Definition |
|------|-------------------|
| **ROE** | Rules of Engagement—written scope and rules for testing |
| **Scope** | Boundaries of what's being tested |
| **Do-Not-Touch List** | Systems/areas explicitly excluded |
| **Stop Authority** | Person who can halt testing immediately |
| **Retest Window** | When follow-up testing can occur |
| **Blackout Dates** | Times when testing is prohibited |

---

## SEO Keywords

security testing rules, penetration testing scope, testing authorization, security assessment rules, testing safety controls, engagement rules security, testing boundaries, security test planning, authorized testing framework, testing governance

---

*Last Updated: 2026-02-01 | Version 2.0.0 | Questions? Contact your Account Manager*
