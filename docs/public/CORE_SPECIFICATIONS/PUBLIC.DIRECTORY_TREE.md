# Public Directory Tree

**Version:** 2.1
**Last updated:** 2026-03-08
**Scope:** Current high-level app structure for `apps/web`

```text
apps/web/
|- app/
|  |- layout.tsx
|  |- globals.css
|  |- page.tsx
|  |- services/
|  |  |- page.tsx
|  |  |- [offerSlug]/page.tsx
|  |- pricing/page.tsx
|  |- proof/
|  |  |- page.tsx
|  |  |- case-studies/[slug]/page.tsx
|  |- standards/page.tsx
|  |- learn/
|  |  |- page.tsx
|  |  |- [collection]/[slug]/page.tsx
|  |- about/page.tsx
|  |- contact/page.tsx
|  |- start-audit/page.tsx
|  |- status/page.tsx
|  |- legal/
|     |- privacy/page.tsx
|     |- terms/page.tsx
|     |- cookies/page.tsx
|- public/
|- components/
|- lib/
|- styles/
|- tests/
```

## Notes

- This file is a handoff-friendly structural summary, not a full generated filesystem dump.
- Use `PUBLIC.SITE_MAP.md` for route truth.
- Use `../PUBLIC.DIRECTORY_TREE.md` for the broader public documentation tree.
