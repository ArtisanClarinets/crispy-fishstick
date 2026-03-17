# Public Website Implementation Spec

Version: 2.0
Last updated: 2026-03-06
Scope: implementation source for `apps/public`

## Product intent

- Present Vantus public offers clearly and credibly.
- Convert qualified visitors through `/start-audit` and `/contact`.
- Publish evidence-backed content for services, standards, and proof.

## Canonical dependencies

- Offer framing: `../../enterprise_pack/03_offers/SERVICE_CATALOG_PUBLIC.md`
- Pricing ranges context: `../../enterprise_pack/03_offers/PRICING_RANGES.md`
- CMS architecture: `../../enterprise_pack/05_architecture/ADR-0001-CMS-Choice.md`
- Public pricing data: `../../pricing/pricing_public.yaml` (v2.0)
- Internal pricing controls summary source: `../../pricing/pricing_ops.yaml` (v2.0)

## Required routes

- `/`, `/services`, `/pricing`, `/proof`, `/standards`, `/learn`, `/about`, `/contact`, `/start-audit`, `/status`
- `/legal/privacy`, `/legal/terms`, `/legal/cookies`
- `/services/[offerSlug]`, `/proof/case-studies/[slug]`, `/learn/[collection]/[slug]`

Offer slug mapping for `/services/[offerSlug]`:

- `website-rebuild` -> `website_rebuild`
- `website-plus-cms` -> `website_plus_cms`
- `website-plus-portal` -> `website_plus_portal`

## Required pricing anchors (USD)

- Website Rebuild: starting at 15,000; typical 15,000-55,000
- Website + CMS: starting at 32,000; typical 32,000-125,000
- Website + Business Portal: starting at 90,000; typical 90,000-400,000

Infrastructure and add-on ranges shown on `/pricing` must match `../../pricing/pricing_public.yaml`:

- Cloud deployment baseline: 7,000-30,000
- On-prem install + hardening: 15,000-70,000
- Discovery + Solution Blueprint: 5,000-20,000
- Data and Content Migration: 4,000-30,000
- Integration (per system): 8,000-35,000
- SSO and RBAC Hardening: 12,000-50,000
- Analytics and Dashboarding: 7,000-30,000
- Localization Framework: 8,000-40,000

All displayed values must come from `../../pricing/pricing_public.yaml` and never be ad-hoc text edits in components.

## CMS/content requirements

- Use Content Adapter boundary; default implementation can be Payload.
- Publish services, proof pages, case studies, and learning content from CMS-backed models.
- Case studies include problem, change, evidence, and outcome sections.

## Quality gates

- Performance: Lighthouse mobile >= 95 for key public templates.
- Accessibility: WCAG 2.1 AA baseline.
- Security: public header baseline + input validation + rate limiting on forms.
- Content integrity: no pricing placeholders or unsupported claims.
