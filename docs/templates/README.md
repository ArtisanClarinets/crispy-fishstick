# Template Library

**Version:** 1.0.0  
**Last Updated:** 2026-03-08  
**Status:** Active  
**Classification:** Internal

## Purpose

This directory holds reusable documentation templates and generation aids.

Use it as a source library, not as a live project record.

## What Is Here

- `client.document.templates/` contains the reusable client-facing document set.
- `development.document.templates/` contains internal delivery and engineering templates.
- `PROMPT.md` contains the legacy long-form generation prompt retained for reference.

## Usage Rules

- Copy templates into a real project workspace before editing them.
- Treat filenames, placeholders, and sample cross-references as examples until they are adapted to the target project.
- Prefer the target project's own master index and folder map once a project starts.

## Current Guidance

- For implementation work, rely on the canonical Vantus surface docs under `public/`, `portal/`, `admin/`, `shared/`, `care/`, and `enterprise_pack/`.
- For reusable scaffolding, start from the relevant template subdirectory here.
- If a template conflicts with a canonical live spec, the live spec wins.

## Maintenance Note

This README is intentionally brief so it does not act like a second master index for hundreds of template files.
