# Sitemap and Navigation

Version: 2.0
Last updated: 2026-03-06
Scope: public nav and route IA for `apps/public`

## Primary nav (max 5)

1. Services
2. Pricing
3. Proof
4. Standards
5. Learn

Persistent actions: Start Audit, Contact.

## Route groups

- Core: `/`, `/services`, `/pricing`, `/proof`, `/standards`, `/learn`, `/about`, `/contact`, `/start-audit`, `/status`
- Legal: `/legal/privacy`, `/legal/terms`, `/legal/cookies`
- Dynamic: `/services/[offerSlug]`, `/proof/case-studies/[slug]`, `/learn/[collection]/[slug]`

## Navigation guardrails

- Each page presents one primary next action.
- Pricing claims must match `../../pricing/pricing_public.yaml`.
- No admin or portal navigation in public route documents.

Offer detail links under Services must use these slugs only:

- `/services/website-rebuild`
- `/services/website-plus-cms`
- `/services/website-plus-portal`
