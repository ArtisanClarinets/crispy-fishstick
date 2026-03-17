# Alignment Verification

**Version:** 1.1.0  
**Last Updated:** 2026-03-08  
**Status:** Active  
**Classification:** Internal

## Purpose

Use this checklist when verifying that documentation, architecture intent, and implementation planning still match.

## Core Checks

- Confirm each surface has one clear canonical index and no competing active overview docs.
- Confirm pricing, offer names, and care tiers match the current canonical commercial docs.
- Confirm public, portal, admin, and shared docs point to the same architecture direction and current folder names.
- Confirm deprecated or archival notes are labeled clearly and do not present themselves as source of truth.

## Canonical References

- `../MASTER_INDEX.md`
- `VERSION_POLICY.md`
- `STYLE_GUIDE.md`
- `UNIFIED_API_SPECIFICATION.md`
- `../public/MASTER_INDEX.md`
- `../portal/MASTER_INDEX.md`
- `../admin/MASTER_INDEX.md`
- `../enterprise_pack/00_overview/MASTER_INDEX.md`
- `../care/MASTER_INDEX.md`

## Recommended Verification Pass

1. Check top-level indexes and README files first.
2. Check pricing and offer language next.
3. Check directory-tree and implementation-guide docs for stale paths or renamed targets.
4. Check archival notes last to ensure they are marked as historical only.

## Release Gate

Alignment is acceptable when:

- live docs do not conflict on naming, scope, or ownership
- broken local references in active docs are resolved or intentionally removed
- archival documents are clearly non-canonical
- implementation-facing docs point to current targets rather than legacy placeholders
