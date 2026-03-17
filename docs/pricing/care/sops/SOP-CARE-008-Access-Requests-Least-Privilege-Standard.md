# SOP-CARE-008: Access Requests & Security Standards

**Document ID:** VS-CARE-OPS-008  
**Version:** 2.0.0 (Launch Ready)  
**Effective Date:** 2026-02-01  
**Owner:** Security Lead  
**Status:** Active  
**Reading Level:** 8th Grade  
**Audience:** Small Business Owners

---

## What This Document Is

This SOP ensures secure, trackable access to your systems. We follow the principle of "only the access needed" plus multi-factor authentication (MFA) wherever possible.

---

## Why This SOP Matters

This SOP defines a repeatable Vantus standard for the service area it covers.
Use it to create consistency, clear ownership, and auditable execution without unsupported market-comparison language.

---

## Why Access Control Matters

Proper access control:

- Reduces security risk by 80%+ vs. shared accounts
- Prevents unauthorized changes
- Creates audit trails for CMMC/NIST compliance
- Protects your business
- Supports defense contractor requirements

---

## Three Core Principles

### 1. Do the Basics Right

- Only the access needed + MFA reduces risk
- Follows our security standards (VS-SEC-501)
- Consistent approach every time

### 2. You Stay in Control

- Access requested under your identities where possible
- You approve all access grants
- You can revoke anytime

### 3. Standard Records

- All access recorded in standard register
- Review schedule defined
- Regular audits conducted

---

## Who Does What

| Role                | Responsibility                           |
| ------------------- | ---------------------------------------- |
| **Security Lead**   | Approves access model and exceptions     |
| **Delivery Lead**   | Submits access requests aligned to scope |
| **Client Admin**    | Creates roles and approves access        |
| **Account Manager** | Kept informed of exceptions and delays   |

---

## Step-by-Step: Access Request Process

### Step 1: Confirm Access Needs

We determine requirements by:

- Module (what service)
- Tier (what level)
- Read-only where possible

### Step 2: Submit Access Request

Request includes:
| Field | Description |
|-------|-------------|
| System | What we need access to |
| Role | What level of access |
| Reason | Why we need it |
| Start Date | When access begins |
| End Date | When access expires |

### Step 3: Named Accounts Only

- Individual accounts for each person
- **NO shared credentials** for normal operations
- Each person accountable for their access

### Step 4: Enable MFA

- Multi-factor authentication required where possible
- Document exceptions with:
  - Why MFA isn't possible
  - Rationale for exception
  - Date to revisit

### Step 5: Record in Access Register

We track:
| Data Point | Purpose |
|------------|---------|
| System | What was accessed |
| Person | Who has access |
| Role | What they can do |
| MFA Status | Extra protection enabled? |
| Approved By | Authorization record |
| Last Verified | When we last confirmed |

### Step 6: Regular Reviews

- Quarterly access review (Advanced tier+)
- Review on major changes
- Immediate revocation on role change

### Step 7: Offboarding Revocation

When service ends:

- Access revoked immediately
- Confirmed in writing
- Record updated in register

---

## Decision Flowchart

```
Need Access
      |
      v
Is Access Required by Scope?
      |
   +--+--+
   |     |
  NO    YES
   |     |
   v     v
Do Not    Can We Use
Request   Read-Only?
Escalate    |
Scope     +--+--+
            |     |
           YES    NO
            |     |
            v     v
Request    Request
Read-Only  Least
Role       Privilege
            |     |
            +-----+
                  |
                  v
           MFA Enabled?
                  |
               +--+--+
               |     |
              YES    NO
               |     |
               v     v
Record in    Document
Access       Exception +
Register     Revisit Date
               |
               v
          Record in
          Access Register
```

---

## Templates & Checklists

- **Access Register**: `../templates/TPL-CARE-009-Access-Register.md`
- **Access Setup Checklist**: `../checklists/CHK-CARE-002-Access-Setup-Checklist.md`

---

## When to Escalate

Escalate to Account Manager if:

- Client refuses required access for contracted scope
- Access delays impact delivery
- Scope adjustment needed

---

## Success Criteria

| Requirement             | Verification           |
| ----------------------- | ---------------------- |
| Procedure followed      | Access register review |
| Required files produced | Documentation check    |
| Approvals captured      | Approval logs          |
| Records updated         | System audit           |

---

## Audit & Compliance

- Artifacts retained per contract
- Spot-audited monthly under Care QMS
- Access reviews tracked

---

## Real Example

**Scenario**: We need to review system logs.

**Correct Approach**:

1. Request read-only access to logging system
2. Do NOT request global admin
3. Enable MFA
4. Record in Access Register
5. Review quarterly

**Incorrect Approach**:

- Requesting admin access when read-only suffices
- Using shared credentials
- Skipping MFA without documentation

---

## Key Terms Explained

| Term                   | Simple Definition                                               |
| ---------------------- | --------------------------------------------------------------- |
| **Least Privilege**    | Giving only the minimum access needed to do the job             |
| **MFA**                | Multi-Factor Authentication—requires two ways to prove identity |
| **Named Account**      | Individual login for each person (not shared)                   |
| **Access Register**    | Official record of who can access what                          |
| **Shared Credentials** | One login used by multiple people (prohibited)                  |
| **Revocation**         | Removing access when no longer needed                           |

---

## SEO Keywords

IT access control, business system security, managed IT security, secure access management, IT authentication, business technology security, system access control, IT security standards, secure login management, business data protection

## Version History

| Version | Date       | Changes                                                                                                             |
| ------- | ---------- | ------------------------------------------------------------------------------------------------------------------- |
| 2.1.0   | 2026-02-21 | Added service-positioning section updates; added quantified access security metrics; added CMMC 2.0 alignment table |
| 2.0.0   | 2026-02-01 | Initial launch version                                                                                              |

---

## SEO Keywords

IT access control, business system security, managed IT security, secure access management, IT authentication, business technology security, system access control, IT security standards, secure login management, business data protection, least privilege access, CMMC access controls, NIST 800-171 AC

---

_Last Updated: 2026-02-21 | Version 2.1.0 | Questions? Contact your Account Manager_
