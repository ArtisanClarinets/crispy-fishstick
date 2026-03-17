# SOP-CARE-010: Asset Inventory & System Records

**Document ID:** VS-CARE-OPS-010  
**Version:** 2.0.0 (Launch Ready)  
**Effective Date:** 2026-02-01  
**Owner:** Delivery Lead  
**Status:** Active  
**Reading Level:** 8th Grade  
**Audience:** Small Business Owners  

---

## What This Document Is

This SOP maintains an accurate record of your technology assets and how they connect. Good inventory supports smart decisions and reliable reporting.

---

## Why Inventory Matters

Accurate inventory enables:
- Informed risk decisions
- Faster problem-solving
- Better reporting
- Smoother transitions

---

## Three Core Principles

### 1. Proof Required
- Reporting and risk decisions need accurate data
- No guessing, no assumptions

### 2. You Stay in Control
- Inventory records ownership
- Handoff-ready documentation
- Clear responsibility chain

### 3. Standard Format
- Consistent structure
- Updated on schedule
- Accessible when needed

---

## Who Does What

| Role | Responsibility |
|------|----------------|
| **Delivery Lead** | Owns inventory completeness |
| **Technician/Engineer** | Collects and updates inventory data |
| **Client Admin** | Confirms unknown assets and ownership |

---

## Step-by-Step: Inventory Management

### Step 1: Define Scope
From your Scope Map (TPL-CARE-001), we identify:
- What's in scope for inventory
- What systems we track
- Level of detail required

### Step 2: Capture Initial Snapshot
Using template TPL-CARE-010, we record:

| Category | What We Track |
|----------|---------------|
| **Endpoints** | Computers, laptops, mobile devices |
| **Servers** | Physical and virtual servers |
| **Network Equipment** | Routers, switches, firewalls |
| **SaaS Services** | Cloud applications and subscriptions |
| **Critical Apps** | Software essential to your business |

For each item:
- Name/identifier
- Criticality (how important)
- Environment (production, test, etc.)
- Owner

### Step 3: Record Dependencies
We document what relies on what:
| Dependency Type | Examples |
|-----------------|----------|
| Internet | ISP, connection type |
| Domain | DNS provider |
| Identity | Login system |
| Backup | Where backups go |
| Critical SaaS | Essential cloud services |

### Step 4: Monthly Updates
- Review inventory monthly
- Add new assets
- Remove decommissioned items
- Update ownership changes

### Step 5: Quarterly Deep Clean (Advanced+)
- Comprehensive review
- Verify accuracy
- Update documentation
- Confirm client can locate core documents

### Step 6: Quarterly Review Inclusion
Inventory excerpt included in quarterly review materials (when contracted).

### Step 7: Asset Changes
New assets or decommissioning:
- Update within 5 business days
- Document reason
- Verify dependencies

---

## Decision Flowchart

```
New Client
      |
      v
Capture Baseline
Inventory
      |
      v
Any Unknown Ownership?
      |
   +--+--+
   |     |
  YES    NO
   |     |
   v     v
Resolve    Record
with Client Dependencies
   |       |
   +-------+
           |
           v
   Monthly Update
   Cadence
```

---

## Templates & Checklists

- **Inventory Snapshot**: `../templates/TPL-CARE-010-Inventory-Snapshot.md`
- **Vendor Register**: `../templates/TPL-CARE-011-Vendor-Register.md`

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
| Procedure followed | Inventory review |
| Files produced | Documentation check |
| Approvals captured | Client confirmation |
| Records updated | System audit |

---

## Audit & Compliance

- Artifacts retained per contract
- Spot-audited monthly under Care QMS
- Inventory accuracy tracked

---

## Real Example

**Scenario**: Server appears in monitoring but not inventory.

**Resolution**:
1. Identify server in monitoring alerts
2. Determine owner
3. Confirm role and purpose
4. Verify backup status
5. Update inventory snapshot
6. Document in next report

---

## Key Terms Explained

| Term | Simple Definition |
|------|-------------------|
| **System of Record** | The official, authoritative place where facts are stored |
| **Endpoint** | Computers and devices people use |
| **SaaS** | Software as a Service—cloud applications |
| **Dependencies** | What relies on what to work |
| **Criticality** | How important something is to your business |
| **Decommission** | Retiring a system no longer in use |

---

## SEO Keywords

business asset inventory, IT asset management, technology inventory, business equipment tracking, IT asset tracking, computer inventory management, network asset management, technology asset records, business hardware inventory, IT system documentation

---

*Last Updated: 2026-02-01 | Version 2.0.0 | Questions? Contact your Account Manager*
