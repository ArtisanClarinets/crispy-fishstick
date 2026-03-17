# Algorithmic Governance — AI Guardrails

**Document ID:** VS-AI-601  
**Version:** 2.1.0  
**Effective Date:** February 2, 2026  
**Audience:** All Engineers Using AI Assistance  
**Owner:** Dylan Thompson, Founder & CTO

---

## Our Position on AI

Artificial intelligence is a **tool for velocity**, not a **substitute for accountability**.

AI helps us move faster. Humans remain responsible for what we ship.

---

## The Human Authority Principle

The human engineer (or governing Vantus process) is always the "Authority."

**What this means:**

- AI may suggest. Humans must approve.
- AI-generated code is held to the same standards as human code.
- If AI output conflicts with our standards, our standards win.

**You are responsible for code you commit, regardless of who (or what) wrote it.**

---

## Hard Operational Boundaries

### Boundary 1: No Silent Logic Rewrites

**Forbidden:**

- AI refactoring working logic without explicit direction.
- Replacing code just because AI suggests a "better" way.
- Introducing new library dependencies for equivalent functionality.

**Allowed:**

- Refactoring when explicitly requested (performance, security, readability).
- Replacing code when the original is buggy or insecure.
- Adding dependencies when they solve a real problem.

### Boundary 2: Standard Compliance

Every AI-generated commit must pass:

- `../SECURITY/SECURITY_BASELINE.md` (no secrets, strict validation).
- `../ENGINEERING/REPO_CONVENTIONS.md` (FSD architecture, naming).
- `../ENGINEERING/QUALITY_BAR.md` (Lighthouse targets, test coverage).

**If AI-generated code fails these checks, it is rejected.**

### Boundary 3: Knowledge Drift Prevention

AI must declare its "Source of Truth."

**Before writing code, the agent must output:**

1. What Vantus documents it reviewed.
2. What context it has about the project.
3. Any assumptions it is making.

**If AI output conflicts with `/docs`, the `/docs` file always wins.**

---

## Agent Operating Protocols (AOP)

### Pre-Execution Checklist

Before writing any code, an AI agent must output:

```
## Pre-Execution Summary

### User Intent
(One sentence summarizing the requested change)

### Context Reviewed
- [ ] FOUNDING_PRINCIPLES.md
- [ ] QUALITY_BAR.md
- [ ] SECURITY_BASELINE.md
- [ ] REPO_CONVENTIONS.md
- [ ] Project-specific ADRs

### Scope
**In Scope:**
- (Specific changes to be made)

**Out of Scope:**
- (What will NOT be changed)

### Verification Plan
- Build command: (e.g., npm run build)
- Test command: (e.g., npm run test)
- Lint command: (e.g., npm run lint)
```

### Post-Execution Verification

Every AI-assisted PR must include a Verification Log:

```
## Verification Log

### Build Results
✅ Build passed (attach output or link)

### Test Results
✅ All tests passed (X/Y tests)
- Unit: X passed
- Integration: Y passed
- E2E: Z passed

### Lint/Type Results
✅ No linting errors
✅ Type checking passed

### Documentation Updated
- [ ] README updated (if needed)
- [ ] ADR created (if architectural change)
- [ ] Inline comments added (for complex logic)

### Files Modified
- path/to/file1.ts
- path/to/file2.ts
```

---

## Forbidden AI Behaviors

### Never Allowed

| Behavior                  | Why Forbidden                                          | Consequence                                          |
| ------------------------- | ------------------------------------------------------ | ---------------------------------------------------- |
| **Library Invention**     | AI hallucinates non-existent APIs or packages.         | Broken builds, security risks from unknown packages. |
| **Security Bypassing**    | AI suggests skipping auth or validation "temporarily." | Security vulnerabilities in production.              |
| **Silent Refactoring**    | AI changes unrelated code while fixing something else. | Scope creep, unintended bugs.                        |
| **Data Model Changes**    | AI modifies database schema without human review.      | Data loss, migration failures.                       |
| **Auth Strategy Changes** | AI switches authentication methods.                    | Security vulnerabilities, lockouts.                  |
| **Dependency Addition**   | AI adds new libraries without justification.           | Bloat, security risks, maintenance burden.           |

---

## AI-Assisted Code Review

### Human Review Requirements

AI-generated code requires **human review** before merge:

- **Logic correctness:** Does it actually work?
- **Security implications:** Any vulnerabilities introduced?
- **Standards compliance:** Does it follow our conventions?
- **Maintainability:** Can a human understand it?

### Review Focus Areas

Pay special attention to:

1. **Security-sensitive code** (auth, payments, data access).
2. **Error handling** (AI often misses edge cases).
3. **Performance** (AI may choose convenient but slow approaches).
4. **Idiomatic code** (AI may generate patterns unfamiliar to the team).

---

## AI Tool Usage Guidelines

### Approved Use Cases

| Use Case                     | Approved Tools         | Guidelines                                |
| ---------------------------- | ---------------------- | ----------------------------------------- |
| **Code completion**          | GitHub Copilot, Cursor | Review every suggestion before accepting. |
| **Refactoring assistance**   | Claude, GPT-4          | Human directs; AI assists.                |
| **Documentation generation** | Claude, GPT-4          | Human reviews for accuracy.               |
| **Test generation**          | Claude, GPT-4          | Human reviews coverage and quality.       |
| **Code review assistance**   | GitHub Copilot, Claude | Human makes final decision.               |
| **Explaining legacy code**   | Any                    | Helpful for onboarding; verify accuracy.  |

### Prohibited Use Cases

| Use Case                                  | Why Prohibited                           |
| ----------------------------------------- | ---------------------------------------- |
| **Unattended code generation**            | No human review = unacceptable risk.     |
| **Architectural decisions**               | AI does not understand business context. |
| **Security-critical code without review** | AI makes security mistakes.              |
| **Production deployments**                | Never automated without human approval.  |
| **Schema changes**                        | Too risky; human-only.                   |

---

## Quality Standards for AI Output

### Code Quality

AI-generated code must meet the same standards as human code:

- Passes all tests.
- Passes linting and type checking.
- Follows naming conventions.
- Includes documentation.
- Handles errors gracefully.

### Documentation Quality

AI-generated documentation must be:

- Accurate (fact-checked by human).
- Complete (covers all public APIs).
- Clear (8th grade reading level).
- Consistent (matches existing style).

---

## Training and Improvement

### Feedback Loop

When AI makes mistakes:

1. Document the error.
2. Explain why it was wrong.
3. Update prompts or context to prevent recurrence.

### Continuous Learning

Engineers should:

- Stay current on AI capabilities and limitations.
- Share effective prompts with the team.
- Report problematic AI behaviors.

---

## Accountability

### Who Is Responsible?

**The human engineer who commits the code is responsible for it.**

If AI-generated code causes:

- A security breach: The committing engineer is accountable.
- A production outage: The committing engineer is accountable.
- Data loss: The committing engineer is accountable.

**"The AI wrote it" is not an acceptable excuse.**

### Escalation

If you are unsure about AI-generated code:

- Ask a senior engineer to review.
- Escalate to Dylan Thompson if necessary.
- When in doubt, write it yourself.

---

## Summary: The AI Rules

1. **AI suggests. Humans decide.**
2. **AI code passes the same gates as human code.**
3. **AI output conflicting with docs = docs win.**
4. **No silent refactoring.**
5. **No security bypasses.**
6. **Human review required before merge.**
7. **Committing engineer is responsible.**

---

## Document Changelog

| Version | Date         | Changes                                                                                                                                                     |
| ------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.0.0   | Feb 2, 2026  | Initial document                                                                                                                                            |
| 2.1.0   | Feb 21, 2026 | Terminology update: Replaced "The Owner-Controlled Systems Engineer Principle" with "The Human Authority Principle" to align with updated brand positioning |

---

**Questions about AI governance?** Contact: dylan.thompson@vantus.systems

[End of Document VS-AI-601]

## Sync Notes

- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
