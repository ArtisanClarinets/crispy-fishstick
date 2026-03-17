# Public Website Feature List

Version: 2.0
Last updated: 2026-03-06
Scope: `apps/public` only

## Core route features

- PUB-001 Home page (`/`) with proof-first positioning and clear CTA.
- PUB-002 Services hub (`/services`) and offer detail route (`/services/[offerSlug]`).
- PUB-003 Pricing page (`/pricing`) generated from `../../pricing/pricing_public.yaml` values.
- PUB-004 Proof hub (`/proof`) and case study detail route (`/proof/case-studies/[slug]`).
- PUB-005 Standards hub (`/standards`) and learning hub (`/learn`).
- PUB-006 About, Contact, Start Audit, Status, and legal routes.

## Content and SEO features

- PUB-020 Content adapter integration for pages, offers, proof, and learn content.
- PUB-021 Sitemap, robots, canonical metadata, and structured data.
- PUB-022 Public-safe copy rules and evidence-backed claim formatting.

## Conversion features

- PUB-040 `start-audit` intake flow with server-side validation.
- PUB-041 Contact flow with spam defense and rate limiting.
- PUB-042 Thank-you and confirmation UX for successful submissions.

## Security and quality features

- PUB-060 Security headers and CSP baseline for public traffic.
- PUB-061 Form boundary validation and abuse protection.
- PUB-062 Performance, accessibility, and build quality gates.

## Exclusions in this public file

- No admin-console feature inventory.
- No client-portal feature inventory.
- No internal control implementation details.
