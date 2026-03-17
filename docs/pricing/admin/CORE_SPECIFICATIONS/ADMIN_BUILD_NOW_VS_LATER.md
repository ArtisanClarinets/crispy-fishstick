# Admin Portal — Build-Now vs Future-Vision Map

**Version:** 1.0
**Date:** 2026-03-05

## Why this document exists

`ADMIN_PRD.md` is a **north-star** spec. It includes enterprise capabilities that are correct long-term but dangerous to build first while bootstrapped.

This map tells you what is **build-now** (supports revenue and delivery) vs **future vision** (once you have scale, staff, and real demand).

---

## Build Now (VSP-lite + delivery OS)

These features directly increase sales velocity, delivery repeatability, and margin.

### Identity & security (minimum viable “big dog”)

- Admin auth
- RBAC (Founder, Engineer)
- Audit log for sensitive actions
- Secure sessions

### Delivery control plane (VSP-lite)

- Leads pipeline with next actions
- Client records
- Projects and package types
- Deliverables checklist
- Change requests (estimate + approval)
- Evidence library (Lighthouse/a11y/security)
- Ownership/handoff checklist

### Content ops (minimum)

- Content workbook tracking
- Page inventory + approvals (internal first)

### Pricing governance (real, not performative)

- `../../pricing/pricing_public.yaml` + `../../pricing/pricing_ops.yaml`
- “last verified” workflow
- prohibit hardcoded public pricing strings

---

## Build Next (after 3–5 shipped clients)

- Client approvals inside VSP (client role)
- Portal MVP UI (restricted client view)
- Media library basics
- Automated proof artifact generation hooks

---

## Future Vision (only when justified)

These are legitimate enterprise features, but they are expensive and easy to overbuild.

- SSO/SAML + SCIM
- ABAC / policy engine
- Real-time collaboration
- AI features
- Full DAM
- Advanced analytics + forecasting
- Developer tools (CLI/SDK)
- Multi-region / multi-tenant enterprise administration

---

## Rule of thumb

If a feature does not:

1. help you close deals,
2. help you ship faster, or
3. reduce operational risk for current clients,

it is probably **future vision**.
