# Architecture Decision Records (ADR) Index

**Document ID:** ADR-INDEX  
**Status:** Active  
**Last Updated:** 2026-02-03  
**Owner:** Dylan Thompson (Founder/CTO)  

---

## What is an ADR?

An Architecture Decision Record (ADR) captures an important architectural decision made along with its context and consequences. ADRs help us:

- Remember why we made decisions
- Onboard new team members faster
- Avoid revisiting the same debates
- Learn from our choices

---

## ADR Lifecycle

```
Proposed → Review → Accepted/Rejected → Implemented
                ↓
           Superseded (by newer ADR)
           Deprecated (no longer relevant)
```

### Status Definitions

| Status | Meaning |
|--------|---------|
| **Proposed** | Under discussion, not yet decided |
| **Accepted** | Approved and being implemented |
| **Rejected** | Decided against, documented for reference |
| **Superseded** | Replaced by a newer ADR |
| **Deprecated** | No longer relevant, technology changed |

---

## How to Create an ADR

1. **Copy the template:** Use `0000-template.md` as your starting point.
2. **Choose next number:** Use the next sequential number (0001, 0002, etc.).
3. **Fill in all sections:** Be thorough — future you will thank you.
4. **Submit for review:** Create a PR with your ADR.
5. **Get approval:** Dylan Thompson approves all ADRs affecting multiple teams.
6. **Merge and implement:** Once accepted, implement the decision.

---

## Active ADRs

### Architecture Patterns

| ADR | Title | Status | Date | Owner |
|-----|-------|--------|------|-------|
| [0001](0001-feature-sliced-design.md) | Feature-Sliced Design (FSD) | Accepted | 2026-01-15 | Dylan Thompson |

**Summary:** We use FSD as our standard architecture to prevent circular dependencies and ensure maintainable code organization.

---

### Technology Choices

| ADR | Title | Status | Date | Owner |
|-----|-------|--------|------|-------|
| [0002](0002-nextjs-primary-framework.md) | Next.js 16 as Primary Framework | Accepted | 2026-01-20 | Dylan Thompson |
| [0003](0003-postgresql-primary-database.md) | PostgreSQL as Primary Database | Accepted | 2026-01-25 | Dylan Thompson |
| [0006](0006-prisma-orm.md) | Prisma as ORM | Accepted | 2026-02-03 | Dylan Thompson |
| [0007](0007-tailwind-css.md) | Tailwind CSS for Styling | Accepted | 2026-02-03 | Dylan Thompson |
| [0008](0008-grafana-monitoring.md) | Grafana Stack for Monitoring | Accepted | 2026-02-03 | Dylan Thompson |
| [0009](0009-monitoring-observability.md) | Monitoring and Observability Stack | Accepted | 2026-02-04 | Dylan Thompson |

**Summary:** Next.js 16 + React 19 for frontend, PostgreSQL + Prisma for data, Tailwind for styling, Grafana stack for observability.

---

### Security

| ADR | Title | Status | Date | Owner |
|-----|-------|--------|------|-------|
| [0004](0004-zero-trust-security.md) | Zero-Trust Security Model | Accepted | 2026-01-30 | Dylan Thompson |

**Summary:** Trust nothing, verify everything. Implement zero-trust across all systems.

---

### Operations

| ADR | Title | Status | Date | Owner |
|-----|-------|--------|------|-------|
| [0005](0005-self-hosted-infrastructure.md) | Self-Hosted Infrastructure | Accepted | 2026-02-01 | Dylan Thompson |

**Summary:** Default to self-hosted VPS for client ownership. Cloud only when justified.

---

### Development Practices

| ADR | Title | Status | Date | Owner |
|-----|-------|--------|------|-------|
| [0005](0005-ai-development-governance.md) | AI-Assisted Development | Accepted | 2026-02-01 | Dylan Thompson |

**Summary:** Human-in-the-loop AI usage. AI accelerates, humans approve.

---

## ADR Statistics

- **Total ADRs:** 10
- **Accepted:** 10
- **Proposed:** 0
- **Rejected:** 0
- **Superseded:** 0

---

## When to Write an ADR

Write an ADR when making decisions that are:

- **Expensive to change later** (database, framework, auth)
- **Not obvious** to a new team member
- **Controversial** or have significant trade-offs
- **Cross-cutting** (affect multiple teams)

### Required ADR Topics

1. **Authentication Changes**
   - New identity provider
   - Session strategy changes
   - MFA implementation

2. **Data Storage**
   - Database technology
   - Caching strategy
   - Data retention policies

3. **External Dependencies**
   - Third-party APIs
   - SaaS services
   - Major library additions

4. **Infrastructure**
   - Cloud provider
   - Deployment architecture
   - Network topology

5. **Security**
   - Encryption standards
   - Secrets management
   - Compliance approaches

6. **Development Practices**
   - New frameworks
   - AI tool adoption
   - Testing strategies

---

## ADR Template

See [0000-template.md](0000-template.md) for the full template.

### Quick Template

```markdown
# ADR-XXXX: Title

**Status:** Proposed  
**Date:** 2026-02-25  
**Owners:** (names)  
**Context:** (project/system)  

## Summary

### Problem Statement
(What problem are we solving?)

### Decision
(What did we decide?)

### Impact
(High/Medium/Low)

## Context
(Background, goals, constraints)

## Decision
(Detailed decision)

## Options Considered
(Option A, B, C with pros/cons)

## Consequences
(Positive, negative, changes required)

## Rollback Plan
(When and how to reverse)

## References
(Links to related docs)
```

---

## Review Schedule

All ADRs are reviewed:
- **Initial review:** 90 days after acceptance
- **Regular review:** Annually
- **Emergency review:** When technology landscape changes significantly

---

## Questions?

Contact Dylan Thompson (dylan.thompson@vantus.systems) for ADR guidance.

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.1 | 2026-02-21 | Dylan Thompson | Terminology alignment: replaced "owner-controlled systems" with "ownership" and "client control" language across all ADRs |
| 1.2 | 2026-02-22 | Agent | Resolved ADR-0008 collision: renumbered monitoring-observability.md to ADR-0009 |

---

**Last Updated:** 2026-02-22  
**Next Review:** 2027-02-22

[End of Index]


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
