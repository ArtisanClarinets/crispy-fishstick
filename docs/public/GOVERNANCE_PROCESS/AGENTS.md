# Agent Governance (Public Docs)

Version: 2.0
Last updated: 2026-03-06
Scope: AI-assisted work on docs under `public/`

## Allowed actions

- Refine public route and implementation documentation.
- Align public offer/pricing copy with canonical sources.
- Generate public-safe developer assets for `apps/public`.

## Disallowed actions

- Exposing secrets, credentials, or internal infrastructure specifics.
- Mixing admin/portal internals into public route docs.
- Publishing pricing values that do not match `../../pricing/pricing_public.yaml`.
- Introducing hardcoded public color/font literals outside approved brand token source files.

## Quality bar

- Public docs stay concise and implementation-ready.
- Claims are source-backed or explicitly marked as assumptions.
- Route docs and pricing assets remain internally consistent.
- Brand token usage remains centralized and lint-clean.
