# Security Baseline (Public-safe)

Version: 2.0
Last updated: 2026-03-06
Scope: public website security expectations for `apps/public`

## Public security controls

- Security headers and CSP baseline are enforced.
- Form endpoints enforce server-side validation and anti-abuse controls.
- Public pages expose no secrets, credential names, or privileged internals.

## Public incident posture

- Security incidents affecting public availability are communicated via status updates.
- Detailed internal response procedures remain in internal runbooks.

## Pricing policy boundary

- Public pages use values from `../../pricing/pricing_public.yaml` only.
- Internal commercial controls from `../../pricing/pricing_ops.yaml` are not published verbatim in public route copy.

## Internal references

- `../../pricing/pricing_ops.yaml`
- `../../enterprise_pack/05_architecture/ADR-0001-CMS-Choice.md`
