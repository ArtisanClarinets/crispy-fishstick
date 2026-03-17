# Public Operations Runbook (Public-safe)

Version: 2.0
Last updated: 2026-03-06
Scope: operational checklist for `apps/public`

## Purpose

This runbook documents public-safe operational actions for the public site.
It intentionally excludes secret handling procedures and privileged infrastructure commands.

## Standard release run

1. Confirm route contract against `../CORE_SPECIFICATIONS/PUBLIC.SITE_MAP.md`.
2. Confirm pricing output against `../../pricing/pricing_public.yaml` v2.0.
3. Run lint, types, tests, and accessibility/performance checks.
4. Deploy using approved release workflow.
5. Validate key routes: `/`, `/services`, `/pricing`, `/proof`, `/contact`, `/start-audit`.

## Pricing integrity check

- Verify all offer names and values match `../../pricing/pricing_public.yaml`.
- Verify infrastructure and add-on ranges match pricing YAML values.
- Verify no placeholder pricing text is present in docs or route content.

## Post-release checks

- Confirm status route reports healthy state.
- Confirm contact and start-audit flows submit and return expected responses.
- Confirm no internal-only detail appears in public copy.

## Escalation triggers

- Core route render failure.
- Pricing mismatch with canonical source.
- Security event affecting public availability.

## Internal references

Use internal operations materials for privileged commands, network details, and secret procedures.
