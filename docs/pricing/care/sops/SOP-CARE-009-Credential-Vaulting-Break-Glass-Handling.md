# SOP-CARE-009: Password Vault & Emergency Access

**Document ID:** VS-CARE-OPS-009  
**Version:** 2.0.0 (Launch Ready)  
**Effective Date:** 2026-02-01  
**Owner:** Security Lead  
**Status:** Active  
**Reading Level:** 8th Grade  
**Audience:** Small Business Owners  

---

## What This Document Is

This SOP protects your passwords and ensures emergency access is controlled, logged, and reviewable. Your credentials stay secure while remaining accessible when truly needed.

---

## Why Password Security Matters

Proper credential management:
- Prevents unauthorized access
- Protects against breaches
- Enables emergency response
- Creates accountability

---

## Three Core Principles

### 1. Do the Basics Right
- Secure password storage is our highest-value security control
- No shortcuts, no exceptions

### 2. Proof Required
- Emergency access is logged
- Usage is reviewed
- Audit trail maintained

### 3. You Stay in Control
- You retain primary control
- We act as custodian, not owner
- You approve emergency access

---

## Who Does What

| Role | Responsibility |
|------|----------------|
| **Security Lead** | Approves vault method and emergency policy |
| **Delivery Lead** | Ensures credentials are vaulted and rotated |
| **Client Admin** | Owns primary credentials and approves vault access |

---

## Step-by-Step: Credential Management

### Step 1: Choose Approved Vault
- Select approved password vault system
- **NEVER store passwords in**:
  - Email
  - Chat messages
  - Tickets
  - Code repositories
  - Documents

### Step 2: Vault with Metadata
Each credential includes:
| Field | Purpose |
|-------|---------|
| System | What the password is for |
| Owner | Who owns this credential |
| Purpose | Why we have it |
| Rotation Date | When to update it |

### Step 3: Define Emergency Access
For break-glass (emergency) accounts:
| Requirement | Description |
|-------------|-------------|
| Owner | Named person responsible |
| Use Cases | When emergency access is allowed |
| Stop Authority | Who can halt emergency use |
| Post-Use Review | Required after each use |

### Step 4: Test Emergency Workflow
During onboarding:
- Test break-glass process
- Ensure it works
- Non-disruptive testing

### Step 5: Log Emergency Use
When break-glass is used:
- Open incident ticket
- Record time and date
- Document approvals
- Log actions taken

### Step 6: Post-Emergency Actions
After emergency access:
- Rotate credentials as appropriate
- Write short post-use summary
- Review what happened
- Update procedures if needed

### Step 7: Offboarding Transfer
When service ends:
- Transfer vault entries per contract
- Or delete securely
- Confirm in writing
- Document completion

---

## Decision Flowchart

```
Need Credential
       |
       v
Routine Access?
       |
    +--+--+
    |     |
   YES    NO
    |     |
    v     v
Use Named    Emergency Access
Account +    Requested
MFA          |
    |        v
    |   Stop Authority
    |   Approves?
    |        |
    |     +--+--+
    |     |     |
    |    NO    YES
    |     |     |
    |     v     v
    |   Do Not  Use Break-Glass
    |   Proceed Log Actions
    |           |
    |           v
    |      Post-Use Review
    |      + Rotate if Needed
    |           |
    +-----------+
                |
                v
          Access Complete
```

---

## Templates & Checklists

- **Access Setup Checklist**: `../checklists/CHK-CARE-002-Access-Setup-Checklist.md`

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
| Procedure followed | Vault audit |
| Files produced | Documentation review |
| Approvals captured | Approval logs |
| Records updated | System records |

---

## Audit & Compliance

- Artifacts retained per contract
- Spot-audited monthly under Care QMS
- Emergency access reviewed

---

## Real Example

**Scenario**: Primary admin unavailable during outage.

**Emergency Access Process**:
1. Emergency declared
2. Stop authority approves break-glass use
3. Access granted with explicit authorization
4. Every action logged
5. Post-use: credentials rotated
6. Summary written and reviewed

---

## Key Terms Explained

| Term | Simple Definition |
|------|-------------------|
| **Password Vault** | Secure system for storing credentials |
| **Break-Glass** | Emergency access for when normal access fails |
| **Stop Authority** | Person who can halt emergency access for safety |
| **Credential Rotation** | Changing passwords regularly or after use |
| **Metadata** | Information about the credential (system, owner, etc.) |
| **Post-Use Review** | Analysis after emergency access to improve process |

---

## SEO Keywords

business password management, secure credential storage, IT password security, enterprise password vault, secure access management, business login security, password protection, IT credential management, secure password practices, business authentication security

---

*Last Updated: 2026-02-01 | Version 2.0.0 | Questions? Contact your Account Manager*
