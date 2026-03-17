# Development Guide (Public App)

Version: 2.1
Last updated: 2026-03-15
Applies to: `apps/public`

> **Strategic Context:** Option A — Gulf Coast Leader. Target audience: Gulf Coast SMBs (5-50 employees). Revenue: $500K Y1 → $1.4M Y2 → $2.2M Y3.

## Prerequisites

- Node.js 20+
- package manager configured for the repo
- access to pricing YAML files and canonical docs

## Typical commands

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run test
```

## Public app engineering constraints

- Server-first rendering with explicit cache behavior.
- Form actions validate all inputs server-side.
- Pricing content is sourced from `../../pricing/pricing_public.yaml`.
- Public docs and route contracts remain aligned with `../CORE_SPECIFICATIONS/PUBLIC.SITE_MAP.md`.
- Global styling follows `APPS_PUBLIC_GLOBAL_STYLES_CONVENTION.md`.

## Update checklist for public pages

1. Confirm route and content shape from `public/CORE_SPECIFICATIONS/` docs.
2. Confirm offer language against `../../enterprise_pack/03_offers/SERVICE_CATALOG_PUBLIC.md`.
3. Confirm pricing values against `../../pricing/pricing_public.yaml` v2.0.
4. Implement UI and metadata with accessibility/performance requirements.
5. Verify no internal-only details leak into public copy.
6. Verify no hardcoded color/font literals outside brand token source files.
7. Run `python docs/validate_alignment.py .`, lint, types, tests.
