# Release Process (Public)

Version: 2.0
Last updated: 2026-03-06
Scope: release controls for `apps/public`

## Pre-release checklist

- [ ] Route contract unchanged or updated in public specs.
- [ ] Pricing outputs verified against `../../pricing/pricing_public.yaml`.
- [ ] Brand tokens integrated through global stylesheet conventions.
- [ ] No hardcoded color/font literals outside token source files.
- [ ] Lint, type-check, and tests pass.
- [ ] Security/performance/accessibility checks pass.
- [ ] `python docs/validate_alignment.py .` passes.

## Release gates

1. Peer review complete.
2. Required quality gates pass.
3. Public pricing and offer text alignment confirmed.

## Post-release checks

- [ ] Verify key routes render correctly.
- [ ] Verify pricing values display correctly.
- [ ] Verify conversion routes submit and return expected responses.

## Rollback triggers

- Broken core route rendering.
- Pricing mismatch with canonical source.
- Regressions in conversion flow.
- Brand token regression or unauthorized hardcoded styling drift.
