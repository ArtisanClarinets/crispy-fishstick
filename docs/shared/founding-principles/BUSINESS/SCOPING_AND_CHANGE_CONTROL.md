# Vantus Systems — Scope Management & Change Control

**Document ID:** VS-BUS-103  
**Version:** 2.0.0  
**Effective Date:** February 2, 2026  
**Applies to:** All client projects  

---

## Why This Matters

Scope creep kills projects. It blows budgets, delays launches, and creates conflict.

This process protects both of us. It ensures changes are intentional, understood, and fairly compensated.

---

## The Scope Baseline

A project is not officially "active" until the scope baseline is signed by both parties.

### What the Scope Baseline Includes

**1. In-Scope Items**
- Specific features and functionality.
- Deliverables (what you will receive).
- Services (what we will do).

**2. Out-of-Scope Items (Boundaries)**
- Explicitly excluded features.
- Work that requires separate agreements.
- Assumptions we are making.

**3. Quality Metrics**
- Performance targets (e.g., page load times).
- Security requirements.
- Test coverage expectations.

**4. Environment Strategy**
- Staging vs. production setup.
- Data requirements for testing.
- Integration points with existing systems.

### Example Scope Statement

```
In Scope:
- Design and build a customer portal with login, dashboard, and profile pages.
- Implement role-based access control (admin, user, guest).
- Deploy to client-owned AWS account.
- Deliver documentation and runbooks.

Out of Scope:
- Integration with legacy mainframe systems (requires separate assessment).
- Mobile app development (web responsive only).
- Training beyond one 2-hour session.

Quality Metrics:
- Page load time under 2.5 seconds.
- 99.9% uptime during business hours.
- WCAG 2.1 AA accessibility compliance.
```

---

## The Change Impact Assessment (CIA)

Any request for "new behavior" or "different behavior" goes through a Change Impact Assessment.

### What Triggers a CIA
- New features not in the original scope.
- Changes to existing functionality.
- Technology changes (different database, different framework).
- Timeline changes (rush delivery, extended timeline).

### The Three Dimensions of Impact

Every CIA evaluates three dimensions:

#### 1. Time Impact
How does this affect the delivery date?
- No impact: Can absorb within existing schedule.
- Minor delay: 1–3 days additional.
- Major delay: 1+ weeks additional.

#### 2. Cost Impact
What additional budget is required?
- No cost: Within contingency buffer.
- Fixed cost: Known additional hours/materials.
- Variable cost: Depends on discoveries during work.

#### 3. Risk & Complexity
Does this introduce new risks?
- Security implications (does this change our security posture?).
- Technical debt (are we taking shortcuts?).
- Dependency changes (new third-party services?).

### The CIA Document

Every CIA produces a one-page document with:
1. Description of the requested change.
2. Business justification (why this matters).
3. Time, cost, and risk impact.
4. Alternatives considered.
5. Recommendation (approve, modify, or decline).

---

## Change Approval Levels

### Level 1: Minor Changes
**Criteria:**
- No budget impact.
- No timeline impact.
- No security implications.

**Process:**
- Documented in weekly report.
- No formal approval required.
- Tracked for transparency.

**Examples:**
- Color changes.
- Text updates.
- Minor layout adjustments.

### Level 2: Standard Changes
**Criteria:**
- Budget impact under 10% of original scope.
- Timeline impact under 1 week.
- Low risk.

**Process:**
- CIA document created.
- Client decision-maker approves in writing.
- Scope baseline updated.

**Examples:**
- Additional page or feature.
- Integration with a new API.
- Extended testing period.

### Level 3: Strategic Changes
**Criteria:**
- Budget impact over 10% of original scope.
- Timeline impact over 1 week.
- Medium or high risk.

**Process:**
- Full CIA document.
- Formal review meeting.
- Signed scope amendment.
- Potential contract modification.

**Examples:**
- Major architecture changes.
- New compliance requirements.
- Significant scope expansion.

---

## Emergency Changes (Incident Response)

Sometimes production is down or security is at risk. In these cases, we act first and document after.

### Emergency Authority
Vantus is authorized to take "minimum safe action" to stabilize the system without waiting for formal approval.

**Examples of emergency actions:**
- Rolling back a broken deployment.
- Blocking a suspicious IP address.
- Taking a compromised service offline.

### Post-Incident Documentation
Within 24 hours of stabilization, we deliver:
1. **Incident Summary:** What happened, when, and impact.
2. **Root Cause Analysis:** Why it happened (initial assessment).
3. **Actions Taken:** What we did to stabilize.
4. **Remediation Plan:** Long-term fixes to prevent recurrence.
5. **Backfill Requirements:** Any documentation or tests added after the fact.

### Cost of Emergency Changes
- If caused by Vantus error: No charge.
- If caused by client request or external factor: Billed at standard rates.

---

## The Definition of "Done" (Financial)

A milestone is considered complete for billing and acceptance only when:

### 1. Verification
- All acceptance criteria are met.
- Client has signed off on the deliverable.
- No critical bugs remain open.

### 2. Safety
- Security baseline is verified.
- No new vulnerabilities introduced.

### 3. Operationality
- Client can operate the new feature independently.
- Documentation is complete.
- Training delivered (if applicable).

### 4. Transfer
- Code merged to main branch.
- Deployed to production (if applicable).
- Credentials and access documented.

---

## Change Control Best Practices

### For Clients
- **Consolidate requests:** Batch small changes to reduce overhead.
- **Prioritize:** Not everything can be "urgent." Tell us what matters most.
- **Ask early:** Changes identified early are cheaper than changes at the end.

### For Vantus
- **Flag early:** We will tell you immediately if a request feels out of scope.
- **Offer alternatives:** Often there is a simpler way to achieve the goal.
- **Be transparent:** No hidden costs. No surprise delays.

---

## Dispute Resolution

If we disagree on whether something is in scope:

1. **Discuss:** Project leads talk it through.
2. **Escalate:** If unresolved in 48 hours, escalate to Dylan Thompson (dylan.thompson@vantus.systems).
3. **Mediate:** If still unresolved, we engage a neutral third party (cost split 50/50).

**Default assumption:** If the scope document is ambiguous, we interpret in favor of the client. Our documentation should be clear. If it is not, that is on us.

---

## Summary: The Change Control Flow

```
Request Received
       ↓
Is this in scope?
       ↓
   Yes → Proceed with work
   No  → Create CIA
            ↓
    Assess Time / Cost / Risk
            ↓
    Client approves / modifies / declines
            ↓
    Update scope baseline
            ↓
    Execute change
```

---

**Questions about scope management?** Contact: hello@vantus.systems

[End of Document VS-BUS-103]
