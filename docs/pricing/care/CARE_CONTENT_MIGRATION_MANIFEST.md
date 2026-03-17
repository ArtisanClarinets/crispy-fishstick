# CARE_CONTENT_MIGRATION_MANIFEST

**Migration Date:** 2026-03-07
**Migrated By:** Enterprise Orchestrator Agent
**Purpose:** Archive the original migration of Care content into the current `care/` structure
**Classification:** Internal - archival migration record
**Publication rule:** Internal reference only.

## Summary

This document records the shift from mixed Care/build pricing references into a dedicated Care documentation structure.
It exists as an archival reference so later maintainers understand why the current Care pricing and commercial files live under `care/`.

## Original migration intent

The migration separated:

- build/project pricing and offer material,
- recurring Care packaging and pricing,
- archived or outdated MSP-style content that was not suitable for the canonical Care suite.

## Current outcomes now in place

The current Care suite uses these canonical documents instead of the older mixed-source model:

- `pricing/CARE_TIER_DEFINITIONS.yaml`
- `pricing/CARE_PRICING_PUBLIC.md`
- `pricing/CARE_ADDON_MATRIX.md`
- `pricing/catalogs/pricing_catalog_v3.json`
- `CARE_SERVICE_CATALOG_PUBLIC.md`
- `CARE_BUILD_TO_CARE_CROSSWALK.md`

## Historical note

Earlier migration artifacts referenced older pricing source files and older tier names.
Those references should be treated as historical context only, not as the current source of truth.

## Current rule

For Care packaging, pricing, and public commercial references:

- use the `care/` pricing documents,
- use the active tier names `Foundation`, `Advanced`, and `Sovereign`,
- treat older mixed-source references as archived history.

## Maintenance note

Do not expand this file into a live operational guide.
Use it only to explain the migration history and the reason the current structure exists.
