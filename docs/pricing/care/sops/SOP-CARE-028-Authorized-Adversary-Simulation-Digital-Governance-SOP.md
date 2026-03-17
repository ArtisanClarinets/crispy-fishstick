# SOP-CARE-028: Authorized Security Testing - Digital (Rules Only)

**Document ID:** VS-CARE-OPS-028  
**Version:** 2.0.0 (Launch Ready)  
**Effective Date:** 2026-02-01  
**Owner:** Security Lead  
**Status:** Active  
**Reading Level:** 8th Grade  
**Audience:** Small Business Owners  

---

## What This Document Is

This SOP governs authorized digital security testing (penetration testing). We test your defenses with explicit written permission, clear boundaries, and safety controls.

---

## Important: Rules Only

This document covers **governance and rules only**—not technical testing methods. We define:
- How testing is authorized
- Safety requirements
- Reporting standards

**We do not provide "how-to" intrusion instructions.**

---

## Why Authorized Testing Matters

Controlled testing:
- Finds vulnerabilities safely
- Tests defenses before attackers do
- Provides actionable improvements
- Meets compliance requirements

---

## Three Core Principles

### 1. Do the Basics Right
- Written approval required
- Safety controls mandatory
- Stop authority designated

### 2. You Stay in Control
- You authorize scope
- You own systems and logs
- You approve all activities

### 3. Plain Words
- Rules clearly defined
- No tactical instructions
- Focus on governance

---

## Who Does What

| Role | Responsibility |
|------|----------------|
| **Security Lead** | Owns approval, safety controls, and reporting |
| **Testing Operator** | Executes within rules, logs actions |
| **Client Signer** | Provides written approval and scope confirmation |

---

## Step-by-Step: Authorized Digital Testing

### Step 1: Confirm Contract Scope
Verify agreement includes:
- Authorized testing module
- Reporting deliverables
- Retest options (if any)

### Step 2: Complete ROE Pack
**Required**: Rules of Engagement Pack (TPL-CARE-008) including:
| Element | Description |
|---------|-------------|
| **Scope** | What's being tested |
| **Do-Not-Do List** | What's off-limits |
| **Time Windows** | When testing occurs |
| **Safety Controls** | Stop conditions |

### Step 3: Complete Safety Checklist
**Required**: CHK-CARE-007 verification:
- Do-not-touch list confirmed
- Stop authority designated
- Emergency contacts listed
- Safety constraints documented

### Step 4: Conduct Safety Review
Before testing:
| Check | Purpose |
|-------|---------|
| Do-not-touch areas confirmed | Prevent damage |
| Stop authority verified | Enable halt if needed |
| Time windows agreed | Minimize disruption |
| Constraints documented | Clear boundaries |

### Step 5: Execute Within Scope
During testing:
- Only within approved windows
- Maintain action log
- Stop immediately if constraints breached

### Step 6: Stop if Needed
Immediate halt required if:
- Stop authority invokes halt
- Safety constraint breached
- Unexpected impact detected

### Step 7: Deliver Findings
Report includes:
| Component | Description |
|-----------|-------------|
| **Executive Summary** | High-level findings |
| **Detailed Findings** | Specific vulnerabilities |
| **Fix Backlog** | Prioritized improvements |
| **Retest Option** | If contracted |

---

## What's NOT Included

| We Don't Do | Why |
|-------------|-----|
| Social engineering without explicit approval | Too risky |
| Denial of service attacks | Could cause outage |
| Physical intrusion | Separate SOP (CARE-029) |
| Testing without written approval | Illegal and unethical |
| Destructive testing | Could damage systems |

---

## Decision Flowchart

```
Simulation Requested
      |
      v
ROE Pack Complete?
      |
   +--+--+
   |     |
  NO    YES
   |     |
   v     v
Do Not    Safety Review
Proceed   |
          v
     Execute Within
     Scope Windows
          |
          v
     Stop Invoked or
     Constraint Hit?
          |
       +--+--+
       |     |
      YES    NO
       |     |
       v     v
    Stop +   Complete Run
    Notify         |
       |           v
       +------> Report +
                Remediation
                Backlog
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
| Procedure followed | Testing review |
| Files produced | Documentation check |
| Approvals captured | Written approval on file |
| Records updated | System audit |

---

## Audit & Compliance

- Artifacts retained per contract
- Spot-audited monthly under Care QMS
- Testing compliance tracked

---

## Real Example

**Scenario**: Annual penetration test for compliance.

**Testing Process**:
1. Contract confirmed: Testing module included
2. ROE Pack completed:
   - Scope: External network only
   - Do-not-touch: Production database
   - Window: Weekends only
   - Stop authority: Client IT manager

3. Safety checklist completed

4. Testing executed:
   - Within scope
   - Action log maintained
   - Findings documented

5. Report delivered:
   - 3 vulnerabilities found
   - Prioritized fix list
   - Retest scheduled

6. Fixes implemented by client

7. Retest confirmed fixes

---

## Key Terms Explained

| Term | Simple Definition |
|------|-------------------|
| **Penetration Testing** | Authorized security testing to find vulnerabilities |
| **ROE** | Rules of Engagement—testing scope and rules |
| **Scope** | Boundaries of what's being tested |
| **Stop Authority** | Person who can halt testing immediately |
| **Do-Not-Touch List** | Systems explicitly excluded from testing |
| **Action Log** | Record of testing activities |

---

## SEO Keywords

penetration testing services, authorized security testing, ethical hacking, security assessment, vulnerability testing, IT security audit, authorized penetration test, security vulnerability assessment, controlled security testing, defensive security testing

---

*Last Updated: 2026-02-01 | Version 2.0.0 | Questions? Contact your Account Manager*
