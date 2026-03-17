# Public Website Non-Functional Requirements

Version: 2.0
Last updated: 2026-03-06
Scope: `apps/public` only

## Stop-ship gates

Release is blocked when any of these fail:

- Security baseline controls for public traffic.
- Performance and accessibility quality gates.
- Pricing content integrity against `../../pricing/pricing_public.yaml`.

## Security baseline

- Secure headers and CSP baseline are enabled.
- Form endpoints use server-side validation and anti-abuse controls.
- Public docs and pages exclude secrets and privileged operational details.

## Performance baseline

- Core public templates target Lighthouse mobile >= 95.
- Route-level caching behavior is explicit.
- Asset budgets are tracked during release validation.

## Accessibility baseline

- WCAG 2.1 AA baseline on core templates.
- Keyboard navigation and visible focus states are required.
- Form errors are clear and assistive-technology friendly.

## Reliability baseline

- Public routes have health monitoring and status reporting.
- Errors fail safely and preserve a usable page state.
- Rollback path is documented in public-safe release process docs.

## Observability baseline

- Structured request/error logging on server boundaries.
- Web vitals collection for key route templates.
- Incident communication through status route and approved comms process.
