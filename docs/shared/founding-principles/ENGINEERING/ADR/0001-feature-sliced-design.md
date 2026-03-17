# ADR-0001: Feature-Sliced Design (FSD) as Application Architecture

**Document ID:** ADR-0001  
**Status:** Accepted  
**Date:** 2026-01-15  
**Owners:** Dylan Thompson (Founder/CTO), Engineering Team  
**Context:** All Vantus Systems applications  
**Stakeholders:** All engineers, technical architects  

---

## Summary

### Problem Statement
As our codebase grows, we need a scalable architecture that prevents circular dependencies, makes code discoverable, and ensures maintainability as the team scales.

### Decision
We adopt **Feature-Sliced Design (FSD)** as our mandatory application architecture for all Vantus projects.

### Impact
High — affects how every engineer writes code and organizes files.

---

## Context

### Background
Without a clear architecture, codebases become "spaghetti" — tangled dependencies, "god objects," and unclear ownership. As we scale from a single engineer to dozens, we need guardrails that enforce good patterns automatically.

### Goals
- Prevent circular dependencies between modules.
- Make code organization intuitive and discoverable.
- Enable parallel development by multiple engineers.
- Reduce cognitive load — engineers know where things belong.
- Support long-term maintainability (the "Bus Factor Protocol").

### Constraints
- Must work with Next.js App Router.
- Must not introduce excessive boilerplate.
- Must be enforceable through code review and linting.
- Must support both server and client components.

---

## Decision

### What We Decided
All Vantus applications use Feature-Sliced Design with six layers:

```
app/       → Next.js routing (entry points only)
pages/     → Page compositions
widgets/   → Complex UI blocks (Header, Dashboard)
features/  → User actions (auth, payments)
entities/  → Business models (User, Order)
shared/    → Reusable utilities, UI primitives
```

**The Import Rule:** Components may only import from layers *below* them.

### Why This Decision

| Factor | How FSD Addresses It |
|--------|---------------------|
| **Prevent circular dependencies** | Import rules enforced by architecture |
| **Code discoverability** | Every file has a clear, predictable location |
| **Scalable teams** | Engineers work in parallel without conflicts |
| **Maintainability** | New team members understand the codebase faster |
| **Testability** | Clear boundaries make unit testing easier |

---

## Options Considered

### Option 1: Feature-Sliced Design (FSD)

**Description:** Layered architecture with strict import rules.

**Pros:**
- Industry-proven methodology.
- Prevents architectural drift.
- Excellent documentation and community.
- Aligns with our ownership values (clear code ownership boundaries).

**Cons:**
- Learning curve for new team members.
- Requires discipline to maintain.
- Some boilerplate for simple projects.

**Verdict:** Selected

---

### Option 2: Simple Folder-by-Type (components/, utils/, hooks/)

**Description:** Traditional folder structure organized by file type.

**Pros:**
- Simple to understand.
- No learning curve.
- Works for small projects.

**Cons:**
- Scales poorly — folders become enormous.
- No protection against circular dependencies.
- Hard to determine feature boundaries.

**Verdict:** Rejected — does not scale to our ambitions.

---

### Option 3: Domain-Driven Design (DDD) Bounded Contexts

**Description:** Organize by business domain with strict boundaries.

**Pros:**
- Excellent for large enterprises.
- Strong alignment with business logic.

**Cons:**
- Overkill for most of our projects.
- Heavy ceremony and boilerplate.
- Steeper learning curve than FSD.

**Verdict:** Rejected — too heavy for our use cases.

---

## Consequences

### Positive
- Consistent architecture across all projects.
- Junior engineers guided by structure.
- Easier code reviews (violations are obvious).
- Simpler onboarding ("read the FSD docs").

### Negative
- All engineers must learn FSD (training required).
- Some flexibility sacrificed for consistency.
- Initial setup slightly more complex.

### Neutral / Changes Required
- Update all existing projects to FSD structure.
- Create FSD training materials.
- Add FSD compliance to code review checklist.

---

## Implementation Plan

### Phase 1: New Projects
- **Deliverable:** All new projects use FSD from day one.
- **Owner:** All engineering leads.
- **Timeline:** Immediate (2026-01-15).

### Phase 2: Migration of Existing Projects
- **Deliverable:** Legacy projects migrated to FSD.
- **Owner:** Project leads per repository.
- **Timeline:** Complete by 2026-06-30.

### Phase 3: Tooling and Enforcement
- **Deliverable:** ESLint rules for FSD compliance.
- **Owner:** Platform engineering.
- **Timeline:** 2026-03-31.

---

## Rollback Plan

### When to Rollback
If FSD significantly slows development or creates more confusion than clarity after 6 months.

### How to Rollback
1. Halt all new FSD migrations.
2. Document current architecture state.
3. Create migration plan to alternative architecture.
4. Execute over 3-month period.

### Rollback Testing
Not applicable — architectural rollback is a major undertaking requiring careful planning.

---

## Monitoring and Review

### Success Metrics
- New engineers productive within 2 weeks.
- Zero circular dependencies in codebase.
- Code review time does not increase.

### Review Schedule
- **Initial review:** 2026-04-15 (90 days).
- **Regular review:** Annually.

### Review Criteria
- Significant team feedback that FSD is hindering productivity.
- Emergence of better architectural pattern in industry.

---

## References

- [Feature-Sliced Design Documentation](https://feature-sliced.design/)
- [FSD for Next.js Guide](https://feature-sliced.design/docs/guides/tech/with-nextjs)
- [Architecture Overview](/docs/company-docs/founding-principles/ENGINEERING/ARCHITECTURE_OVERVIEW.md)

---

## Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| **Decision Owner** | Dylan Thompson | 2026-01-15 | ✓ |
| **Technical Review** | Engineering Team | 2026-01-15 | ✓ |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-15 | Dylan Thompson | Initial acceptance |
| 1.1 | 2026-02-21 | Dylan Thompson | Terminology alignment: replaced "owner-controlled systems" with "ownership" and "client control" language |

---

## Notes

### Lessons Learned
Team buy-in was critical. Presenting FSD as "guardrails that help us move faster" rather than "rules that slow us down" changed the conversation.

### Open Questions
- Should we create custom FSD tooling specific to our needs?
- How do we handle FSD violations in legacy code during migration?

### Related Decisions
- ADR-0002: Next.js as Primary Framework
- ADR-0005: Zero-Trust Security Model

[End of ADR-0001]


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
