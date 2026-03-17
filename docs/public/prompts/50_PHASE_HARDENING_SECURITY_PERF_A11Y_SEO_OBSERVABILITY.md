# Phase 50 Prompt - Hardening and Production Quality

## Objective

Harden `apps/web` to production readiness standards.

## Security tasks

- Implement security headers and CSP baseline.
- Ensure strict server-side validation for form actions.
- Implement anti-abuse controls and rate limiting on public forms.
- Verify public-safe output boundaries.

## Performance tasks

- Optimize route templates and critical assets.
- Reduce layout shift and interaction delay.
- Verify key route template performance against budget targets.

## Accessibility tasks

- Validate keyboard and screen reader flows on core routes.
- Validate semantic heading structure and form error accessibility.
- Validate focus visibility and contrast baseline.

## SEO tasks

- Validate metadata completeness per route.
- Validate sitemap and robots outputs.
- Validate canonical behavior and structured data.

## Observability tasks

- Ensure web vitals and error reporting hooks are in place.
- Ensure request/error logging boundaries are defined.
- Ensure status route supports operational communication requirements.

## Deliverables

- Hardening report
- Resolved issue list
- Residual risk register

## Acceptance criteria

- No unresolved critical security or accessibility blockers.
- Key templates satisfy quality thresholds.
- SEO and observability baselines are operational.

## Verification commands

```bash
npm run lint --workspace web
npm run check-types --workspace web
npm run build --workspace web
```
