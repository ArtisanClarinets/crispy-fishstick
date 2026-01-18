# REMEDIATION ROADMAP

**GOAL:** Secure and Optimize Vantus Systems for Production ($10M+ Scale)
**TIMELINE:** 28 Days

## Phase 1: Critical Security Fixes (Days 1-3)
*   **Day 1:**
    *   [ ] Remove `api` exclusion from `proxy.ts` matcher.
    *   [ ] Implement `rehype-sanitize` in `ContentForm`.
    *   [ ] Remove hardcoded secrets from `package.json`.
*   **Day 2:**
    *   [ ] Fix "Fail Open" logic in `rate-limit.ts`.
    *   [ ] Rotate `NEXTAUTH_SECRET` and `mfaSecret`.
*   **Day 3:**
    *   [ ] Run full penetration test on API routes.

## Phase 2: Infrastructure & Database (Days 4-10)
*   **Day 4:**
    *   [ ] Dockerize application (Multi-stage build).
    *   [ ] Create `docker-compose.yml` for local dev.
*   **Day 5-7:**
    *   [ ] Provision PostgreSQL (RDS).
    *   [ ] Migrate Prisma schema from SQLite to Postgres.
    *   [ ] Run data migration scripts.
*   **Day 8-10:**
    *   [ ] Set up CI/CD (GitHub Actions) with proper secrets management.
    *   [ ] Fix `bootstrap-ubuntu22.sh` (or replace with Ansible/Terraform).

## Phase 3: Performance Optimization (Days 11-17)
*   **Day 11:**
    *   [ ] Remove `export const dynamic = "force-dynamic"` from `app/layout.tsx`.
    *   [ ] Identify pages needing `revalidate` (ISR).
*   **Day 12-14:**
    *   [ ] Remove `gsap`. Refactor animations to `framer-motion`.
    *   [ ] Lazy load `@splinetool/react-spline`.
*   **Day 15-17:**
    *   [ ] Optimize `Waves.tsx` (Move to Worker or optimize loop).

## Phase 4: Quality & Testing (Days 18-28)
*   **Day 18-20:**
    *   [ ] Fix strict type errors. Remove `any`.
    *   [ ] Enable `"skipLibCheck": false` in `tsconfig.json`.
*   **Day 21-25:**
    *   [ ] Write integration tests for Rate Limiter and Auth.
    *   [ ] Add E2E tests for Admin flows.
*   **Day 26-28:**
    *   [ ] Final Security Audit.
    *   [ ] Load Testing (k6).
    *   [ ] Go/No-Go Decision.
