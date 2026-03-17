# Content Map (Public)

Version: 2.0
Last updated: 2026-03-06
Scope: content assets for public website routes only

## Content system rules

- Public content is authored for public routes only.
- Pricing copy uses values from `../../pricing/pricing_public.yaml`.
- Proof claims include evidence context.
- Each route has one clear next action.

## Route content map

- `/`: positioning, offer summary, trust proof strip, CTA.
- `/services`: public offer catalog and offer detail links.
- `/services/[offerSlug]`: offer scope, includes, outcomes, CTA.
- `/pricing`: anchors/ranges for offers, infrastructure, and add-ons (no-care scope for this release).
- `/proof`: proof summaries and case study index.
- `/proof/case-studies/[slug]`: case narrative with evidence sections.
- `/standards`: public standards overview.
- `/learn` and `/learn/[collection]/[slug]`: educational and supporting content.
- `/contact` and `/start-audit`: conversion page copy with clear expectation text.

## System-generated content

- `sitemap.xml` from route contract.
- `robots.txt` from crawl policy.

## Scope guardrail

This file does not define admin CMS workflows, portal entities, or internal CRM fields.
