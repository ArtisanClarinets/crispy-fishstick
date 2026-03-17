# Quality Gates (Public)

Version: 2.0
Last updated: 2026-03-06
Scope: release gates for `apps/public`

## CI gates

- Lint: zero warnings.
- Types: zero errors.
- Tests: required suites pass.
- Security checks: no unmitigated critical findings.
- Performance checks: route-level targets pass for key public pages.
- Accessibility checks: required templates pass baseline checks.

## Pricing content gate

- Public pricing output must match `../../pricing/pricing_public.yaml` v2.0 values.
- No placeholder pricing text in public docs or route specs.

## Brand token lint gate

- Public docs and implementation specs must not hardcode color hex values outside brand token source files.
- Public docs and implementation specs must not hardcode font-family literals outside brand token source files.
- Run `python docs/validate_alignment.py .` and require pass before release approval.
- Brand token source of truth:
  - `public/DESIGN_UX/BRAND_GUIDELINES/VANTUS_BRAND_TOKENS.css`
  - `../DESIGN_UX/BRAND_GUIDELINES/VANTUS_BRAND_TOKENS.json`

## Waiver rule

Waivers require explicit owner approval and documented expiration.
