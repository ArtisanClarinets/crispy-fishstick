# Phase 10 Prompt - Discovery and Alignment

## Objective

Create a complete execution baseline before code implementation.

## Required tasks

1. Extract requirements from canonical docs.
2. Build conflict register for mismatches or legacy sections.
3. Produce requirement matrix covering:
   - route contract
   - pricing rules
   - visual and token rules
   - security, performance, accessibility, SEO, observability
4. Confirm app target boundary is `apps/web`.

## Deliverables

- Discovery alignment report
- Conflict register with resolved decisions
- Execution baseline matrix

## Acceptance criteria

- Every key requirement includes source citation.
- Conflicts are resolved with documented precedence rationale.
- Scope firewall is explicit and unambiguous.

## Verification command

```bash
python docs/validate_alignment.py .
```
