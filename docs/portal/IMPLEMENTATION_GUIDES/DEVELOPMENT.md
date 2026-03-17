# Portal Documentation — DEVELOPMENT
**Version:** 1.2.0  
**Last Updated:** 2026-02-21  
**Applies to:** `apps/portal` (monorepo)  
**Rule:** No timelines in this document.

---

## 0) Developer Quick Start

### Prerequisites
- Node.js 20.x LTS
- npm (workspace)
- MariaDB (local or container)
- Git

### Commands
```bash
npm install
npm --filter portal dev
npm --filter portal lint
npm --filter portal typecheck
npm --filter portal test
```

---

## 1) Engineering constraints (portal)

### Security-first
- RBAC enforced server-side
- Tenancy enforced on every query
- Upload pipeline safe by default
- Export endpoints re-check auth/org

### Performance
- Server Components default
- explicit caching strategy (avoid accidental dynamic pages)
- paginate all lists

### Usability & a11y
- keyboard nav
- visible focus rings
- reduced motion support
- clear error messages + next steps

---

## 2) How to add a feature (checklist)
1) Extend entity types + Zod schema
2) Implement server actions with validation + RBAC + audit logs
3) Add routes under `src/app/(portal)`
4) Add widgets under `src/widgets/pages/...`
5) Add tests (unit/integration/e2e as applicable)
6) Update docs: feature list + changelog + runbook if needed

---

## 3) Testing strategy
- Unit: pure functions + schemas + policies
- Integration: org isolation + RBAC enforcement
- E2E: login, ticketing, docs upload/download, billing view

---

## 4) Pitfalls to avoid
- Never accept orgId from client without verification
- Never introduce shared caching of tenant data
- Never bypass server actions with ad-hoc client fetches
- Never store secrets in UI or DB as documents