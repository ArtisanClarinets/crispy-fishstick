# SOP-CARE-002: Care Catalog Rules & No Truth Debt Policy

**Document ID:** VS-CARE-OPS-002  
**Version:** 2.0.0 (Launch Ready)  
**Effective Date:** 2026-02-01  
**Owner:** Vantus Care Program  
**Status:** Active  
**Reading Level:** 8th Grade  
**Audience:** Small Business Owners

---

## Why This SOP Matters

This SOP defines a repeatable Vantus standard for the service area it covers.
Use it to create consistency, clear ownership, and auditable execution without unsupported market-comparison language.

---

## What This Document Is

This SOP keeps our service descriptions accurate across our website, sales materials, and delivery. It prevents confusion between what we say and what we do.

---

## Our "No Truth Debt" Rule

**Truth Debt** = Making claims we can't back up with proof

We NEVER:

- Publish numbers without sources
- Make promises we can't measure
- Use buzzwords without definitions
- Let marketing get ahead of reality

---

## Three Core Principles

### 1. Proof Required

Every claim must be:

- Measurable
- Tied to evidence files
- Sourced with clear references

### 2. Single Source of Truth

- Our pricing catalog (../pricing/CARE_PRICING_PUBLIC.md) is the master record
- Website pages pull from the catalog
- Sales materials pull from the catalog
- Delivery follows the catalog
- **No manual copying that creates drift**

### 3. Plain Words

- Public descriptions avoid tech buzzwords
- Necessary terms include short definitions
- If an 8th grader can't understand it, we rewrite it

---

## Who Does What

| Role                   | Responsibility                                   |
| ---------------------- | ------------------------------------------------ |
| **Program Owner**      | Approves all catalog changes and versioning      |
| **Content Maintainer** | Implements changes; runs checks                  |
| **Delivery Lead**      | Confirms we can actually deliver what we promise |
| **Security Lead**      | Reviews security claims and simulation language  |

---

## Step-by-Step: How We Update the Catalog

### Step 1: Treat Catalog as Source of Truth

We never allow manual drift between:

- Marketing pages
- Sales proposals
- Delivery reality

If it's not in the catalog, we don't promise it.

### Step 2: Submit a Change Request

For any module or plan change, create a request that includes:

- **Why** the change is needed
- **Which pages** are affected
- **Which deliverables** are affected
- **Risk assessment**

### Step 3: Update Structured Content

- Update ../pricing/CARE_PRICING_PUBLIC.md (or equivalent source)
- Increment the version number
- Document what changed and why

### Step 4: Run Automated Checks

- Schema validation
- Link checks
- Pricing validation
- Content drift detection

### Step 5: Get Approvals

- **Program Owner**: Required for all changes
- **Security Lead**: Required if it affects:
  - Security posture
  - Alerts
  - Simulation offerings

### Step 6: Publish with Release Notes

- Update the catalog
- Add release note entry
- Update training if behavior changes

### Step 7: Remove Unmaintainable Claims

If a claim:

- Has no source
- Has no measurement path
- Can't be maintained

**We remove it or reframe it** as definition-only language.

### Step 8: Quarterly Review

We schedule quarterly catalog reviews to check for:

- Stale content
- Drift from reality
- Outdated claims

---

## Decision Flowchart

```
Proposed Catalog Change
           |
           v
Does it affect security or simulations?
           |
    +------+------+
    |             |
   YES            NO
    |             |
    v             v
Security Lead    Proceed
Review Required  |
    |             |
    +------+------+
           |
           v
Is the claim measurable and supported?
           |
    +------+------+
    |             |
   YES            NO
    |             |
    v             v
Update Catalog   Remove/Reframe Claim
+ Version        Add definition-only
    |            language
    v             |
Run Validation    |
+ Link Checks     |
    |             |
    +------+------+
           |
           v
   Publish + Release Note
```

---

## Template We Use

- **Change Impact Assessment**: `../templates/TPL-CARE-002-Change-Impact-Assessment.md`

---

## When to Escalate

If sales requests a claim that delivery cannot evidence:

1. **Escalate to Program Owner**
2. **Default action**: Remove the claim
3. **Never** keep an unsupported claim in place

---

## Success Criteria

| Check                        | How We Verify        |
| ---------------------------- | -------------------- |
| Public pages match catalog   | Monthly spot-check   |
| Proposals match catalog      | QA review            |
| Delivery files match catalog | Monthly audit        |
| No unsourced numbers         | Automated lint rules |

---

## Audit & Compliance

**Monthly Spot-Check**:

- Sample 3 modules randomly
- Confirm evidence files exist
- Verify files are delivered as promised
- Document any gaps

---

## Real Example

**Problem**: Website says "24/7 SOC monitoring" but the Care plan doesn't include SOC services.

**Fix**:

1. Remove the "24/7 SOC" claim immediately
2. Replace with precise escalation language
3. Update catalog source
4. Rebuild affected pages from catalog
5. Review similar pages for same issue

---

## Key Terms Explained

| Term             | Simple Definition                                                                 |
| ---------------- | --------------------------------------------------------------------------------- |
| **Truth Debt**   | Making claims or promises we can't maintain with evidence                         |
| **Catalog**      | The master source file (../pricing/CARE_PRICING_PUBLIC.md) that defines all services |
| **Drift**        | When different versions of information exist in different places                  |
| **Schema Check** | Automated test that verifies data follows the right format                        |

---

## SEO Keywords

managed IT services catalog, small business IT packages, IT service definitions, business technology services, IT support plans, managed service offerings, technology service catalog, IT maintenance packages, business IT solutions, outsourced IT services

## Version History

| Version | Date       | Changes                                                                                                           |
| ------- | ---------- | ----------------------------------------------------------------------------------------------------------------- |
| 2.1.0   | 2026-02-21 | Added service-positioning section updates; added quantified truth standards; added "proactive" definition example |
| 2.0.0   | 2026-02-01 | Initial launch version                                                                                            |

---

_Last Updated: 2026-02-21 | Version 2.1.0 | Questions? Contact your Account Manager_
