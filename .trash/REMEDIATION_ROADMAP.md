# Remediation Roadmap (28 Days)

## Phase 1: Critical Stabilization (Days 1-5)
**Goal:** Fix build, prevent data breaches, and enable deployments.

- **Day 1:**
  - [x] Uninstall fake `prisma@6.4.1`. Install `prisma@5.10.x`.
  - [x] Create `Dockerfile` and `docker-compose.yml`.
- **Day 2:**
  - [x] Switch Database provider from SQLite to PostgreSQL.
  - [x] Run `prisma migrate deploy` against a real Postgres instance.
- **Day 3:**
  - [x] Remove hardcoded secret fallbacks in `lib/auth.ts`. Throw errors instead.
  - [x] Fix `app/api/admin/users/route.ts` password validation logic.
- **Day 4:**
  - [x] Implement Rate Limiting on ALL POST endpoints (`lib/rate-limit.ts`).
  - [x] Set up CI/CD pipeline for automatic deployment.
- **Day 5:**
  - [x] Conduct full penetration test on Admin API.

## Phase 2: Security & Quality Hardening (Days 6-14)
**Goal:** Remove technical debt and improve maintainability.

- **Days 6-8:**
  - [ ] Replace all 81 instances of `any` with strict types.
  - [ ] Remove `console.log` usage; implement `winston` logger.
- **Days 9-11:**
  - [ ] Refactor `Role.permissions` JSON string to relational `RolePermissions` table.
  - [ ] Update `lib/admin/guards.ts` to use efficient SQL joins instead of JSON parsing.
- **Days 12-14:**
  - [ ] Add Unit Tests for `lib/auth.ts` and `lib/admin/guards.ts` (>90% coverage).

## Phase 3: Performance & Infrastructure (Days 15-28)
**Goal:** Scale to production traffic.

- **Days 15-20:**
  - [ ] Implement Redis for session storage and rate limiting (replace in-memory/mock).
  - [ ] Configure CDN (Cloudfront/Vercel Edge) for static assets.
- **Days 21-25:**
  - [ ] Optimize "Heavy" pages (Dashboard, Landing) using `unstable_cache`.
  - [ ] Lazy load Three.js/Spline components.
- **Days 26-28:**
  - [ ] Final Load Testing (k6).
  - [ ] Documentation update (`README.md`, `API.md`).
