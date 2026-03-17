# Public Pricing Page Content

**Version:** 2.1
**Last Updated:** 2026-03-15
**Status:** Active
**Strategy:** Option A — Gulf Coast Leader

> **Strategic Context:** This page targets Gulf Coast SMBs (Ft. Walton, Pensacola, Mobile). Pricing anchors reflect $15K-$400K range aligned with Option A revenue targets ($500K Y1 → $1.4M Y2 → $2.2M Y3).

Primary source: `../../pricing/pricing_public.yaml`
Commercial context source: `../../enterprise_pack/03_offers/PRICING_RANGES.md`
Strategy alignment: `AGENT_INSTRUCTIONS.md`

## Copy contract for `apps/public/pricing`

Use these strings and value blocks directly. Do not reword offer names or numeric values.

## Hero copy

- H1: `Pricing anchors for enterprise website and system delivery`
- Subhead: `These are starting points and typical ranges. Final pricing is confirmed after discovery, written scope, and complexity scoring.`
- Primary CTA label: `Start Audit`
- Secondary CTA label: `Contact`

## Offer cards

### Website Rebuild (Modern + Complete)

- Badge: `Starting at`
- Starting value: `$15,000`
- Range label: `Typical range`
- Range value: `$15,000-$55,000`

### Website + CMS (Recommended)

- Badge: `Starting at`
- Starting value: `$32,000`
- Range label: `Typical range`
- Range value: `$32,000-$125,000`

### Website + Business Portal

- Badge: `Starting at`
- Starting value: `$90,000`
- Range label: `Typical range`
- Range value: `$90,000-$400,000`

## Infrastructure section

- Section title: `Infrastructure engineering`
- Item 1: `Cloud deployment baseline (VPS + Docker + NGINX)` -> `$7,000-$30,000`
- Item 2: `On-prem install + hardening (client-owned hardware)` -> `$15,000-$70,000`

## Add-on section

- Section title: `Enterprise add-on modules`
- `Discovery + Solution Blueprint` -> `$5,000-$20,000`
- `Data and Content Migration` -> `$4,000-$30,000`
- `Integration (per system)` -> `$8,000-$35,000`
- `SSO and RBAC Hardening` -> `$12,000-$50,000`
- `Analytics and Dashboarding` -> `$7,000-$30,000`
- `Localization Framework` -> `$8,000-$40,000`

## Scope exclusion

- Do not render Vantus Care tiers on `apps/public/pricing` in this release.
- This page ships with no-care offer scope only (Offer A/B/C + infrastructure + add-ons).

## Required legal/commercial note block

Render this note near the end of the page:

`Final pricing is confirmed after discovery, complexity scoring, and written scope. Out-of-scope work is handled through formal change requests.`

## Required metadata footer

- `Pricing data version: 2.1`
- `Pricing data last updated: 2026-03-15`
- `Strategy: Option A - Gulf Coast Leader`
- `Target Market: Gulf Coast SMBs (Ft. Walton, Pensacola, Mobile)`
- Source file: `../../pricing/pricing_public.yaml`
