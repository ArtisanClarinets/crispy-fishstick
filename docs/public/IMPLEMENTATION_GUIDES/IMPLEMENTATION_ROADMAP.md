# Implementation Roadmap (Public)

Version: 2.1
Last updated: 2026-03-15
Scope: roadmap for `apps/public` delivery

> **Strategic Context:** Option A — Gulf Coast Leader. This roadmap delivers the public presence for a professional services company serving Gulf Coast SMBs. Not a SaaS platform.

## Phase 1: Route foundation

- Implement core and legal route set from `../CORE_SPECIFICATIONS/PUBLIC.SITE_MAP.md`.
- Establish global layout, navigation, metadata, sitemap, and robots generation.

## Phase 2: Offer and pricing surfaces

- Implement services hub and offer detail route.
- Implement pricing page using assets in `public/IMPLEMENTATION_GUIDES/APPS_PUBLIC_PRICING_*`.
- Verify displayed values match `../../pricing/pricing_public.yaml` v2.0.
- Keep public pricing notes limited to public-safe summary; internal discount/margin controls remain in `../../pricing/pricing_ops.yaml`.

## Phase 3: Proof and learning content

- Implement proof hub and case-study detail route.
- Implement learn hub and collection detail route.
- Ensure evidence sections and public-safe language rules are enforced.

## Phase 4: Conversion and reliability

- Implement `/start-audit` and `/contact` submission flows.
- Add server-side validation, rate limiting, and anti-abuse controls.
- Verify quality gates for accessibility, performance, and correctness.
