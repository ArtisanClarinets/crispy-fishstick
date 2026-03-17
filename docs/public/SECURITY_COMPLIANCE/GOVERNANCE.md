# Security Governance (Public-safe)

Version: 2.0
Last updated: 2026-03-06
Scope: governance summary for `apps/public`

## Governance goals

- Prevent security regressions on public routes.
- Keep release decisions auditable and reversible.
- Keep public docs aligned to approved canonical sources.

## Required review controls

- Standard public-doc changes require maintainer review.
- Security-relevant public route changes require maintainer plus security reviewer.
- Pricing copy changes require verification against `../../pricing/pricing_public.yaml`.

## Public documentation rules

- Keep secret names, credentials, and privileged infrastructure steps out of public docs.
- Keep internal discount and margin controls out of public route copy.
- Route docs must match `../CORE_SPECIFICATIONS/PUBLIC.SITE_MAP.md`.

## Internal references

- `../../pricing/pricing_ops.yaml`
- Internal security runbooks in `enterprise_pack/`
