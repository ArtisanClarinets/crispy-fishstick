# 🛠️ Remediation Roadmap

**Phase 1: Critical Security Fixes (Days 1-3)**
- [ ] **Day 1:** Rename `proxy.ts` to `middleware.ts` and fix the matcher regex to include `/api`.
- [ ] **Day 1:** Remove `NEXTAUTH_SECRET` from `package.json` and rotate the exposed secret.
- [ ] **Day 2:** Configure `ioredis` to fail-closed or provision a managed Redis instance.
- [ ] **Day 3:** Audit all API routes to ensure they are covered by the new middleware configuration.

**Phase 2: Infrastructure & Database (Days 4-10)**
- [ ] **Day 4:** Create `Dockerfile` and `.dockerignore`.
- [ ] **Day 5:** Create `docker-compose.yml` for local dev (App + Postgres + Redis).
- [ ] **Day 6:** Migrate `prisma/schema.prisma` from SQLite to PostgreSQL.
- [ ] **Day 7:** Create migration scripts for existing data (if any).
- [ ] **Day 8-10:** Fix `bootstrap-ubuntu22.sh` and set up a proper CI/CD pipeline (GitHub Actions) to build and push Docker images.

**Phase 3: Performance Optimization (Days 11-17)**
- [ ] **Day 11:** Remove `export const dynamic = "force-dynamic"` globally.
- [ ] **Day 12:** Refactor `app/layout.tsx` to move heavy providers down the tree.
- [ ] **Day 13-14:** Remove `gsap` and migrate animations to `framer-motion`.
- [ ] **Day 15:** Implement lazy loading for `HeroBackground` and Spline components.
- [ ] **Day 16:** Add `Cache-Control` headers to public API routes.
- [ ] **Day 17:** Configure Image Optimization (`next/image`) with a CDN.

**Phase 4: Code Quality & Maintenance (Days 18-28)**
- [ ] **Day 18:** Enable `noImplicitAny` in `tsconfig.json`.
- [ ] **Day 19-21:** Fix the ~800 TypeScript errors (focusing on `lib/` and `api/` first).
- [ ] **Day 22:** Replace `console.log` with a structured logger.
- [ ] **Day 23:** Add health check endpoint (`/api/health`).
- [ ] **Day 24-28:** Increase test coverage for `lib/auth.ts` and critical flows.
