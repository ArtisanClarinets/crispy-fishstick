# Public Website Architecture

Version: 2.0
Last updated: 2026-03-06
Scope: `apps/public` public website only

## Decision anchors

- CMS strategy follows `../../enterprise_pack/05_architecture/ADR-0001-CMS-Choice.md`.
- Default CMS is Payload behind a Content Adapter abstraction.
- Public pricing source is `../../pricing/pricing_public.yaml` (v2.0).

## Public architecture summary

- Rendering: React Server Components by default, explicit cache policy per route.
- Content: page and collection content served through a content adapter interface.
- Forms: server-side validation + rate limiting + bot defense for `/contact` and `/start-audit`.
- SEO: route metadata, sitemap, robots, structured data, and canonical tags.
- Observability: request logging, web vitals, and error tracking.

## Content adapter contract

Any CMS implementation used for public content must provide this minimum contract:

- `getPage(slug)`
- `listPages(type)`
- `getGlobals()`

Client code uses this contract only and does not depend on CMS-specific APIs.

## Public route contract

- Static routes: `/`, `/services`, `/pricing`, `/proof`, `/standards`, `/learn`, `/about`, `/contact`, `/start-audit`, `/status`
- Legal routes: `/legal/privacy`, `/legal/terms`, `/legal/cookies`
- Dynamic routes: `/services/[offerSlug]`, `/proof/case-studies/[slug]`, `/learn/[collection]/[slug]`

## Non-goals in public architecture docs

- No admin or portal implementation details.
- No secret inventories, internal network topology, or privileged operations procedures.

See internal architecture materials under `enterprise_pack/` for extended operational detail.
