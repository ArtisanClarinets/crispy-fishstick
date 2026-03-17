# Global Styles Convention (apps/public)

Version: 1.1
Last updated: 2026-03-15
Scope: required global stylesheet conventions for brand consistency

> **Strategic Context:** This implementation guide supports Option A — Gulf Coast Leader. All public-facing content targets Gulf Coast SMBs (Ft. Walton, Pensacola, Mobile). No national/global market positioning.

Implementation note: this repository currently implements the public app in `apps/web`.
Public docs continue to use `apps/public` as the route-contract label.

## Purpose

Apply Vantus brand tokens directly through the app global stylesheet pipeline so all route components share one color and typography system.

## Source-of-truth token files

- `public/DESIGN_UX/BRAND_GUIDELINES/VANTUS_BRAND_TOKENS.css`
- `../DESIGN_UX/BRAND_GUIDELINES/VANTUS_BRAND_TOKENS.json`

## Required app file convention

- `apps/web/app/vantus-brand-tokens.css` (synced copy of token CSS)
- `apps/web/app/globals.css` (imports tokens first)

## Required `globals.css` integration

Use this order and structure in `apps/web/app/globals.css`:

```css
@import "./vantus-brand-tokens.css";

:root {
  color-scheme: light;
}

[data-theme="dark"] {
  color-scheme: dark;
}

html,
body {
  background: var(--vantus-bg-canvas);
  color: var(--vantus-text-primary);
  font-family: var(--vantus-font-body);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--vantus-font-heading);
}

:focus-visible {
  outline: 2px solid var(--vantus-brand-accent);
  outline-offset: 2px;
}
```

## Non-negotiable styling rules

- Do not hardcode `#HEX` colors in route-level component styles.
- Do not hardcode font family names in route-level component styles.
- Always use `var(--vantus-...)` tokens from the brand token file.
- Keep dark-theme behavior token-driven, not route-specific hacks.

## Optional Tailwind integration

If Tailwind is used in the public app (`apps/web` in this repository), map design tokens in theme extension to CSS variables instead of hardcoded hex values.

## Verification

- Run `python docs/validate_alignment.py .`
- Run project lint/type/tests as standard.
- Complete `../DESIGN_UX/BRAND_GUIDELINES/BRAND_QA_CHECKLIST.md`.
