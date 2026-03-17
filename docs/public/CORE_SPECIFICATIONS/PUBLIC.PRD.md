# Public Website PRD

**Version:** 2.0.1
**Last Updated:** 2026-03-08
**Status:** Active

Scope: product requirements for `apps/public`

## Problem

Prospects need a clear understanding of Vantus offers, expected investment ranges, and proof of delivery quality.

## Goals

- Explain public offers with accurate scope boundaries.
- Convert qualified traffic via `/start-audit` and `/contact`.
- Build trust with proof artifacts and case studies.

## Users

- Business owners evaluating a website rebuild or CMS modernization.
- Operations stakeholders comparing ownership/control options.
- Technical reviewers validating implementation credibility.

## Requirements

- Pricing page uses public pricing anchors from `../../pricing/pricing_public.yaml`.
- Service pages map to public offer definitions in `../../enterprise_pack/03_offers/SERVICE_CATALOG_PUBLIC.md`.
- CMS strategy follows ADR-0001 and uses a content adapter boundary.
- Route set matches `PUBLIC.SITE_MAP.md`.

## Success signals

- Public pricing content stays in sync with pricing YAML v2 values.
- Forms submit with validation and anti-abuse controls.
- Core public routes ship with acceptable performance/accessibility quality.

## Out of scope

- Admin-console process detail.
- Client-portal workflows.
- Internal pricing controls beyond public-safe summary.
