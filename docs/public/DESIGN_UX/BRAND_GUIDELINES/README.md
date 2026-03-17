# Vantus Brand Guidelines Package (Public App)

Version: 1.0
Last updated: 2026-03-06
Scope: brand system for `apps/public`

## What this package does

This package defines a complete, implementation-ready brand system for the public app so visual design, UX behavior, and copy tone stay cohesive across all public routes.

It uses:

- the existing Vantus voice standard (`../../../shared/founding-principles/COMPANY/BRAND_VOICE.md`),
- the existing public design direction (`../DESIGN_DNA.md`), and
- the official logo assets (`public/VantusSystemsLogo/`).

## Start order

1. `BRAND_FOUNDATION.md`
2. `COLOR_AND_THEME_TOKENS.md`
3. `TYPOGRAPHY_AND_LAYOUT.md`
4. `LOGO_USAGE.md`
5. `VANTUS_BRAND_TOKENS.css` and `VANTUS_BRAND_TOKENS.json`
6. `BRAND_QA_CHECKLIST.md`
7. `ROUTE_COMPONENT_BRAND_AUDIT_CHECKLIST.md`

## Package files

- `BRAND_FOUNDATION.md` - brand principles, experience rules, copy alignment.
- `COLOR_AND_THEME_TOKENS.md` - logo-derived palette, theme mapping, accessibility rules.
- `TYPOGRAPHY_AND_LAYOUT.md` - font system, layout rhythm, component style rules.
- `LOGO_USAGE.md` - exact logo asset usage, clear-space, sizing, do/don't rules.
- `VANTUS_BRAND_TOKENS.css` - drop-in CSS custom properties for implementation.
- `VANTUS_BRAND_TOKENS.json` - token export for JS/TS tooling and design pipelines.
- `BRAND_QA_CHECKLIST.md` - release gate checklist for brand consistency.
- `ROUTE_COMPONENT_BRAND_AUDIT_CHECKLIST.md` - route/component-level audit matrix for all public routes.

## Source-of-truth references

- `public/VantusSystemsLogo/VantusSystems_Final_PixelPerfect.svg`
- `public/VantusSystemsLogo/VantusSystems_Final_Transparent.png`
- `public/VantusSystemsLogo/logo.png`
- `public/VantusSystemsLogo/vantus.systems.logo.color.webp`
- `../../../shared/founding-principles/COMPANY/BRAND_VOICE.md`
- `../DESIGN_DNA.md`

## Guardrails

- Keep brand color tokens centralized; do not ad-hoc new colors in page components.
- Keep headline/body fonts consistent with this package.
- Do not distort or recolor logo assets.
- Keep copy plain-language and proof-forward.
- Keep contrast and focus states accessible.
