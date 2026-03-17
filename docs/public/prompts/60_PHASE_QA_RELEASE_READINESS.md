# Phase 60 Prompt - QA and Release Readiness

## Objective

Run final QA and release controls for `apps/web`.

## Required tasks

1. Execute route-level regression across required routes.
2. Validate pricing integrity and no-placeholder compliance.
3. Validate responsive behavior and mobile-native interaction quality.
4. Validate brand integrity via token and component audits.
5. Validate conversion flows for contact and start-audit scenarios.
6. Build release recommendation with pass/fail evidence.

## Deliverables

- QA execution report
- Route regression matrix
- Conversion flow verification evidence
- Release go/no-go recommendation

## Acceptance criteria

- All required verification checks pass.
- Validator checks pass for docs alignment and style drift.
- Remaining risk list is documented and approved.

## Verification commands

```bash
python docs/validate_alignment.py .
npm run lint --workspace web
npm run check-types --workspace web
npm run build --workspace web
```
