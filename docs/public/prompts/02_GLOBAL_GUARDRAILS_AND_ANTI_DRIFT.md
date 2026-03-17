# Global Guardrails and Anti-Drift Rules

## Scope enforcement

- Implement only in `apps/web`.
- Do not create or modify feature code in `apps/portal`, `apps/admin`, `apps/care`.
- Shared package updates must include explicit justification and direct public-site linkage.

## Pricing integrity

- Public pricing values must come from `../../pricing/pricing_public.yaml`.
- Offer language must align with `../../enterprise_pack/03_offers/SERVICE_CATALOG_PUBLIC.md`.
- Do not publish placeholders or ad-hoc pricing edits.
- For current release, do not render Care pricing on `/pricing`.

## Brand integrity

- Use tokenized styles from:
  - `public/DESIGN_UX/BRAND_GUIDELINES/VANTUS_BRAND_TOKENS.css`
  - `../DESIGN_UX/BRAND_GUIDELINES/VANTUS_BRAND_TOKENS.json`
- Do not hardcode color hex values or font-family literals outside token source files.

## Public-safe content boundaries

- Never expose secrets, credentials, internal infrastructure specifics, or internal pricing control mechanics.
- Keep admin and portal operational detail out of public site implementation and copy.

## Route contract integrity

- Required routes and slug contracts are enforced by public core specs.
- If any route decision conflicts with legacy docs, use source precedence from `00_MAIN_ORCHESTRATOR_SYSTEM_PROMPT.md`.

## Mandatory checks

- Run `python docs/validate_alignment.py .` and require pass.
- Run workspace lint, type-check, tests, and build for web app scope.
