# Public Website Detailed Architecture

Version: 2.0
Last updated: 2026-03-06
Scope: implementation details for `apps/public`

## 1) Runtime model

- Next.js App Router with server-first rendering.
- Route-level cache declarations are explicit and reviewed.
- Dynamic rendering is used only where request-scoped data is required.

## 2) Content model boundaries

- Content source is abstracted by a Content Adapter.
- Default adapter is Payload per `../../enterprise_pack/05_architecture/ADR-0001-CMS-Choice.md`.
- Route components do not import Payload SDKs directly.

## 3) Public data contracts

- Pricing data for public pages is read from `../../pricing/pricing_public.yaml`.
- Public pricing page must only surface v2.0 anchors/ranges.
- Internal guardrails from `../../pricing/pricing_ops.yaml` are summarized, not exposed in full.

## 4) Reliability and safety (public-safe summary)

- Secure headers and CSP baseline are required.
- Server-side validation is required for all form actions.
- Rate limits and anti-automation controls are required on public forms.
- Error handling must fail closed for invalid input.

## 5) Route implementation contract

Implement these routes as source-of-truth:

- `/`
- `/services`
- `/services/[offerSlug]`
- `/pricing`
- `/proof`
- `/proof/case-studies/[slug]`
- `/standards`
- `/learn`
- `/learn/[collection]/[slug]`
- `/about`
- `/contact`
- `/start-audit`
- `/status`
- `/legal/privacy`
- `/legal/terms`
- `/legal/cookies`

## 6) Internal detail references

For privileged implementation details, use internal canonical sources:

- `../../enterprise_pack/05_architecture/ADR-0001-CMS-Choice.md`
- `../../pricing/pricing_ops.yaml`
