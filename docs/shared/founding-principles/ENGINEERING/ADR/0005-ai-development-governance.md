# ADR-0005: AI-Assisted Development Governance

**Document ID:** ADR-0005  
**Status:** Accepted  
**Date:** 2026-02-01  
**Owners:** Dylan Thompson (Founder/CTO)  
**Context:** All Vantus engineering workflows  
**Stakeholders:** All engineers, quality assurance

---

## Summary

### Problem Statement

AI coding assistants can increase velocity, but without governance, they risk introducing security vulnerabilities, quality issues, and technical debt.

### Decision

We implement **human-in-the-loop AI governance** — AI accelerates, humans approve, standards are never compromised.

### Impact

High — affects how all code is written and reviewed.

---

## Context

### Background

AI tools (GitHub Copilot, Claude, ChatGPT) can write code faster than humans. But AI does not understand our security baseline, our architecture, or our quality bar. Unchecked AI output can introduce subtle bugs, security holes, and unmaintainable code.

### Goals

- Increase development velocity using AI.
- Maintain Vantus quality standards.
- Prevent AI from introducing security vulnerabilities.
- Ensure humans remain accountable for all code.
- Create clear guidelines for AI tool usage.

### Constraints

- AI tools must not have access to production secrets.
- AI-generated code must pass same reviews as human code.
- Must comply with client contracts regarding IP and data handling.
- Must be teachable to all engineers.

---

## Decision

### What We Decided

AI is a tool for acceleration, not a replacement for engineering judgment.

**Core Principles:**

1. **AI suggests, humans decide.**
2. **AI code passes the same gates as human code.**
3. **AI output conflicting with standards = standards win.**
4. **Humans remain accountable for all committed code.**

### AI Tool Categories

| Category             | Tools                  | Approval Required | Use Cases                    |
| -------------------- | ---------------------- | ----------------- | ---------------------------- |
| **IDE Autocomplete** | GitHub Copilot, Cursor | No                | Code completion, boilerplate |
| **Code Review**      | GitHub Copilot PR      | No                | Review assistance            |
| **Code Generation**  | Claude, GPT-4          | Yes               | New features, refactoring    |
| **Architecture**     | None approved          | N/A               | Humans only                  |
| **Security**         | None approved          | N/A               | Humans only                  |

### Why This Decision

| Factor             | How This Policy Addresses It                            |
| ------------------ | ------------------------------------------------------- |
| **Quality**        | All code passes human review and automated checks.      |
| **Security**       | AI cannot bypass security requirements.                 |
| **Accountability** | Human author is responsible for all committed code.     |
| **Velocity**       | AI accelerates routine tasks, humans focus on judgment. |
| **IP Protection**  | Clear rules prevent accidental IP leakage.              |

---

## Options Considered

### Option 1: Human-in-the-Loop Governance (Selected)

**Description:** AI assists, humans approve, standards enforced.

**Pros:**

- Maintains quality and security.
- Clear accountability.
- Still gets velocity benefits.

**Cons:**

- Requires discipline.
- Slower than full AI automation.
- Training needed for all engineers.

**Verdict:** Selected

---

### Option 2: Full AI Automation

**Description:** Let AI write and commit code autonomously.

**Pros:**

- Maximum velocity.
- Reduced human effort.

**Cons:**

- Unacceptable security risk.
- Quality cannot be guaranteed.
- No clear accountability.

**Verdict:** Rejected — violates our quality and security principles.

---

### Option 3: AI Prohibition

**Description:** Ban all AI tools.

**Pros:**

- Zero AI-related risk.
- Full human control.

**Cons:**

- Significant competitive disadvantage.
- Slower development.
- Hard to hire (engineers expect modern tools).

**Verdict:** Rejected — unnecessarily restrictive.

---

## Consequences

### Positive

- Velocity increase without quality compromise.
- Clear guidelines prevent misuse.
- Defensible position with clients regarding AI.

### Negative

- Engineers must learn to work with AI effectively.
- Code review must explicitly check for AI-introduced issues.
- Some engineers may resist or over-rely on AI.

### Neutral / Changes Required

- Update onboarding to include AI training.
- Add AI questions to code review checklist.
- Create AI_GUARD_RAILS.md policy document.

---

## Implementation Plan

### Phase 1: Policy

- **Deliverable:** AI_GUARDRAILS.md published.
- **Owner:** Dylan Thompson.
- **Timeline:** Complete (2026-02-01).

### Phase 2: Training

- **Deliverable:** AI usage training for all engineers.
- **Owner:** Engineering leads.
- **Timeline:** 2026-02-28.

### Phase 3: Tooling

- **Deliverable:** Approved AI tools provisioned.
- **Owner:** IT/Operations.
- **Timeline:** 2026-03-15.

### Phase 4: Monitoring

- **Deliverable:** Track AI usage and code quality metrics.
- **Owner:** Engineering management.
- **Timeline:** Ongoing.

---

## Rollback Plan

### When to Rollback

If AI tools consistently introduce critical bugs that slip through review.

### How to Rollback

1. Suspend AI code generation tools.
2. Retain IDE autocomplete (lower risk).
3. Reassess after incident review.

---

## Monitoring and Review

### Success Metrics

- AI-generated code defect rate ≤ human code defect rate.
- No security incidents from AI-generated code.
- Developer productivity metrics improve.

### Review Schedule

- **Initial review:** 2026-05-01 (90 days).
- **Regular review:** Quarterly.

---

## References

- `../../AI/AI_GUARDRAILS.md`
- `../../AI/AGENT_TASK_PROMPT_TEMPLATE.md`
- GitHub Copilot Documentation

---

## Approval

| Role               | Name           | Date       | Signature |
| ------------------ | -------------- | ---------- | --------- |
| **Decision Owner** | Dylan Thompson | 2026-02-01 | ✓         |

---

## Change Log

| Version | Date       | Author         | Changes            |
| ------- | ---------- | -------------- | ------------------ |
| 1.0     | 2026-02-01 | Dylan Thompson | Initial acceptance |

[End of ADR-0005]
