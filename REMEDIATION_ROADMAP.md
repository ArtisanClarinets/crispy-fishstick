# REMEDIATION ROADMAP

## Week 1: Security & Infrastructure Stabilization
- [ ] **Day 1**: Remove hardcoded secrets from `lib/auth.config.ts` and fix `scripts/bootstrap-ubuntu22.sh`.
- [ ] **Day 2**: Remove `export const dynamic = "force-dynamic"` from `app/layout.tsx`.
- [ ] **Day 3**: Implement fail-closed logic in `lib/security/rate-limit.ts`.
- [ ] **Day 4**: Dockerize the application (Create `Dockerfile`, `docker-compose.yml`).
- [ ] **Day 5**: Migrate Database from SQLite to PostgreSQL (Local dev & Staging).

## Week 2: Performance & Code Quality
- [ ] **Day 6**: Remove `gsap` and `@splinetool` dependencies.
- [ ] **Day 7**: Refactor `HeroBackground` and `Waves` to use `framer-motion` or lightweight Canvas.
- [ ] **Day 8**: Enable `rehype-sanitize` for `ReactMarkdown` in Admin CMS.
- [ ] **Day 9**: Fix `tsconfig.json` (`skipLibCheck: false`) and resolve type errors.
- [ ] **Day 10**: Add Unit Tests for `lib/security` and `lib/auth`.

## Week 3: Deployment Pipeline & Hardening
- [ ] **Day 11**: Configure GitHub Actions to build and push Docker image.
- [ ] **Day 12**: Set up Production Infrastructure (AWS/Vercel) with PostgreSQL RDS.
- [ ] **Day 13**: Implement Centralized Logging (Datadog/CloudWatch).
- [ ] **Day 14**: Run Load Tests (k6) against the new PostgreSQL setup.
- [ ] **Day 15**: Pen-test API routes (specifically Admin mutations).

## Week 4: Documentation & Handover
- [ ] **Day 16**: Document all Environment Variables in `README.md`.
- [ ] **Day 17**: Create Runbooks for Incident Response.
- [ ] **Day 18**: Final Code Freeze & Review.
- [ ] **Day 19**: Training session for internal team.
- [ ] **Day 20**: GO/NO-GO Meeting.
