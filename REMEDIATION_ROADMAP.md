# REMEDIATION ROADMAP (28-DAY PLAN)

**GOAL:** Bring codebase to Fortune 500 production standards.

---

## WEEK 1: SECURITY & INFRASTRUCTURE (CRITICAL)

**Day 1: Security Triage**
- [ ] **Fix Middleware:** Update `proxy.ts` matcher to include API routes. (1h)
- [ ] **Secrets:** Remove hardcoded secrets from `package.json` and setup `.env`. (1h)
- [ ] **Docker:** Create `Dockerfile` and `docker-compose.yml`. (4h)

**Day 2: Database Migration**
- [ ] **Postgres:** Provision RDS/Postgres instance. (2h)
- [ ] **Schema:** Update `schema.prisma` to Postgres provider. (2h)
- [ ] **Migration:** Run initial migration and verify data types. (4h)

**Day 3: CI/CD Pipeline**
- [ ] **Fix CI:** Correct ports in `ci.yml` for Lighthouse. (1h)
- [ ] **Deploy Job:** Add GitHub Action for building and pushing Docker image. (4h)

**Day 4: Auth Hardening**
- [ ] **Rate Limiting:** Fix "Fail Open" Redis strategy. (4h)
- [ ] **XSS:** Implement `rehype-sanitize` in Admin forms. (2h)

**Day 5: Validation**
- [ ] Run full security scan (OWASP ZAP).
- [ ] Verify all API routes reject unauthenticated requests.

---

## WEEK 2: PERFORMANCE & BLOAT REMOVAL

**Day 6-7: Animation Refactor**
- [ ] **Remove GSAP:** Rewrite `LivingBlueprintSection` using `framer-motion`. (8h)
- [ ] **Optimize Spline:** Implement strict lazy loading for Spline canvas. (4h)

**Day 8: Bundle Optimization**
- [ ] **Audit:** Run `@next/bundle-analyzer`.
- [ ] **Tree Shaking:** Ensure unused Shadcn components are not bundled.

**Day 9: CSS Optimization**
- [ ] **Tailwind:** Extract critical CSS from `globals.css`.
- [ ] **Refactor:** Simplify complex CSS animations causing layout thrashing.

**Day 10: Performance Testing**
- [ ] Run Lighthouse CI and verify Score > 90.

---

## WEEK 3: CODE QUALITY & STABILITY

**Day 11-12: TypeScript Strictness**
- [ ] **Config:** Set `skipLibCheck: false` and `no-explicit-any: error`.
- [ ] **Refactor:** Fix ~77 `any` types and ~10 `@ts-ignore`. (16h)

**Day 13: Testing Strategy**
- [ ] **Fix Tests:** Remove unsafe casting in `auth.test.ts`.
- [ ] **E2E:** Ensure Playwright tests run against the Docker container.

**Day 14: Logging & Monitoring**
- [ ] **Structured Logs:** Replace `console.log` with a logger lib.
- [ ] **Alerts:** Verify Sentry integration for backend errors.

**Day 15: Documentation**
- [ ] Update `README.md` with setup/deploy instructions.
- [ ] Document API authentication flows.

---

## WEEK 4: FINAL POLISH & LAUNCH PREP

**Day 16-20: Final Review**
- [ ] Load Testing (k6).
- [ ] Disaster Recovery Drill (Restore DB from backup).
- [ ] Executive Sign-off.
