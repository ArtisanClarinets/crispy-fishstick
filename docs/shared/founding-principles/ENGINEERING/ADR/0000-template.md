# ADR Template: Architecture Decision Record

**Document ID:** ADR-XXXX  
**Status:** Proposed | Accepted | Rejected | Superseded  
**Date:** 2026-02-25  
**Owners:** (names and roles)  
**Context:** (repository or project name)  
**Stakeholders:** (who needs to know about this decision)  

---

## Summary

### Problem Statement
(In one or two sentences, what problem are we solving?)

### Decision
(In one sentence, what did we decide?)

### Impact
(High | Medium | Low — how much does this affect the system?)

---

## Context

### Background
(What is the situation? What led to this decision?)

### Goals
- (What are we trying to achieve?)
- (What does success look like?)

### Constraints
- (What limits our options? Budget? Time? Technical?)
- (What is non-negotiable?)

---

## Decision

### What We Decided
(Detailed description of the decision. Be specific.)

### Why This Decision

| Factor | How This Decision Addresses It |
|--------|-------------------------------|
| (Goal 1) | (Explanation) |
| (Goal 2) | (Explanation) |
| (Constraint 1) | (Explanation) |

---

## Options Considered

### Option 1: [Name]

**Description:** (What is this option?)

**Pros:**
- 
- 

**Cons:**
- 
- 

**Verdict:** (Selected | Rejected | Not selected because...)

---

### Option 2: [Name]

**Description:** (What is this option?)

**Pros:**
- 
- 

**Cons:**
- 
- 

**Verdict:** (Selected | Rejected | Not selected because...)

---

### Option 3: [Name]

**Description:** (What is this option?)

**Pros:**
- 
- 

**Cons:**
- 
- 

**Verdict:** (Selected | Rejected | Not selected because...)

---

## Consequences

### Positive
- (What becomes easier?)
- (What risks are reduced?)
- (What new capabilities do we gain?)

### Negative
- (What becomes harder?)
- (What new risks are introduced?)
- (What trade-offs are we accepting?)

### Neutral / Changes Required
- (What documentation needs updating?)
- (What training is needed?)
- (What other systems are affected?)

---

## Implementation Plan

### Phase 1: [Name]
- **Deliverable:** (What will be done?)
- **Owner:** (Who is responsible?)
- **Timeline:** (When will it be done?)

### Phase 2: [Name]
- **Deliverable:** (What will be done?)
- **Owner:** (Who is responsible?)
- **Timeline:** (When will it be done?)

---

## Rollback Plan

### When to Rollback
(Under what conditions should we reverse this decision?)

### How to Rollback
(Step-by-step instructions to undo this decision.)

1. 
2. 
3. 

### Rollback Testing
(How do we verify the rollback works?)

---

## Monitoring and Review

### Success Metrics
(How do we know this decision was correct?)
- 
- 

### Review Schedule
(When will we revisit this decision?)
- **Initial review:** (Date — typically 30-90 days after implementation)
- **Regular review:** (Frequency — typically annually)

### Review Criteria
(What would trigger an early review?)
- 
- 

---

## References

- (Links to related documents)
- (Links to research or external resources)
- (Links to related ADRs)

---

## Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| **Decision Owner** | | | |
| **Technical Review** | | | |
| **Security Review** (if applicable) | | | |
| **Business Review** (if applicable) | | | |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-25 | (name) | Initial proposal |
| 1.1 | 2026-02-25 | (name) | (description of changes) |

---

## Notes

### Lessons Learned
(What did we learn during this decision process?)

### Open Questions
(What questions remain unanswered?)

### Related Decisions
(What other ADRs relate to this one?)
- ADR-XXXX: (Description)
- ADR-XXXX: (Description)

---

**How to Use This Template:**

1. Copy this file and rename with the next ADR number (e.g., `0001-feature-sliced-design.md`).
2. Fill in all sections. Do not skip sections — they all matter.
3. Get approval from required stakeholders before implementation.
4. Store in `/docs/company-docs/founding-principles/ENGINEERING/ADR/`.
5. Update the ADR Index (`README.md` in this folder) with the new ADR.

**When to Write an ADR:**
- New authentication or authorization approach
- Database technology or schema changes
- Third-party service integrations
- Caching strategies
- Deployment architecture changes
- Security model changes
- Any decision that would be hard to reverse

[End of Template]


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
