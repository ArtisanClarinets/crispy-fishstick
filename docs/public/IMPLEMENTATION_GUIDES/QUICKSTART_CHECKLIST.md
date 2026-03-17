# Quickstart Checklist (Public)

Version: 2.1
Last updated: 2026-03-15

> **Strategic Context:** Option A — Gulf Coast Leader. This public app serves Gulf Coast SMBs (Ft. Walton, Pensacola, Mobile). Service business model only — no SaaS/platform.

## Before implementation

- [ ] Read `../MASTER_INDEX.md` and core specs.
- [ ] Confirm route set from `../CORE_SPECIFICATIONS/PUBLIC.SITE_MAP.md`.
- [ ] Confirm pricing source values from `../../pricing/pricing_public.yaml`.
- [ ] Confirm offer language from `../../enterprise_pack/03_offers/SERVICE_CATALOG_PUBLIC.md`.
- [ ] Confirm brand package from `../DESIGN_UX/BRAND_GUIDELINES/README.md`.
- [ ] Confirm global stylesheet convention from `APPS_PUBLIC_GLOBAL_STYLES_CONVENTION.md`.

## During implementation

- [ ] Keep pricing rendered from data, not hardcoded marketing text.
- [ ] Keep copy public-safe and implementation-ready.
- [ ] Keep admin/portal/internal details out of public docs and pages.
- [ ] Keep colors/fonts token-driven (`var(--vantus-...)`) with no hardcoded literals.

## Verification

- [ ] Lint passes.
- [ ] Type-check passes.
- [ ] Tests pass.
- [ ] `python docs/validate_alignment.py .` passes.
- [ ] Pricing values on `/pricing` match `../../pricing/pricing_public.yaml`.
- [ ] Route docs and app routes are consistent.
- [ ] `../DESIGN_UX/BRAND_GUIDELINES/ROUTE_COMPONENT_BRAND_AUDIT_CHECKLIST.md` completed.
- [ ] No forbidden terms: "platform," "SaaS," "AI-powered," "national expansion"
