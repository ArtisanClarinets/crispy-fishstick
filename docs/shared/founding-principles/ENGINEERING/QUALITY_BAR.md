# Engineering Charter — Quality Bar (Definition of Done)

**Document ID:** VS-ENG-303  
**Version:** 2.0.0  
**Effective Date:** February 2, 2026  
**Audience:** All Engineering Contributors  
**Owner:** Dylan Thompson, Founder & CTO  

---

## What This Document Is

This is our "Quality Gauntlet." A feature is not "done" until it passes every gate listed here.

Skip a gate, and you are not done. No exceptions.

---

## Gate 1: Functional Integrity

### Happy Path
The feature works exactly as described in the requirements.

- [ ] All acceptance criteria are met.
- [ ] Primary user flows work end-to-end.
- [ ] No known bugs in core functionality.

### Failure Paths
The feature handles problems gracefully.

- [ ] Network timeouts are handled (retry or error message).
- [ ] Invalid inputs are rejected with clear error messages.
- [ ] Unauthorized access attempts are blocked and logged.
- [ ] No crashes. No infinite loading states. No dead ends.

### Sanity Checks
- [ ] No console errors in production builds.
- [ ] No console warnings (or documented exceptions).
- [ ] Application builds without errors.

---

## Gate 2: Security (Stop-Ship Criteria)

These are non-negotiable. Fail any of these, and the feature cannot ship.

### Input Validation
- [ ] Every input has a schema (Zod or equivalent).
- [ ] Invalid inputs are rejected at the boundary.
- [ ] SQL injection is impossible (use ORM or parameterized queries).

### Authentication & Authorization
- [ ] Sensitive actions check `requireRole()` or equivalent.
- [ ] Auth checks happen at the API/Server Action level, not just UI.
- [ ] Session management follows security baseline (httpOnly, secure, sameSite).

### Secrets Management
- [ ] No secrets in source control.
- [ ] No secrets in logs.
- [ ] No secrets exposed to the client.

### Data Protection
- [ ] PII (personally identifiable information) is not leaked in client state.
- [ ] Sensitive data is encrypted at rest and in transit.
- [ ] Audit logs capture state-changing actions (without logging secrets).

---

## Gate 3: Performance Budget

### Web Vitals Targets
| Metric | Target | Absolute Maximum |
|--------|--------|------------------|
| LCP (Largest Contentful Paint) | < 2.0s | < 2.5s |
| INP (Interaction to Next Paint) | < 150ms | < 200ms |
| CLS (Cumulative Layout Shift) | < 0.05 | < 0.1 |
| TTFB (Time to First Byte) | < 600ms | < 800ms |

### Build Performance
- [ ] CI build completes in under 5 minutes.
- [ ] Local development server starts in under 30 seconds.

### Payload Discipline
- [ ] Initial page JavaScript under 250KB (compressed).
- [ ] Images optimized (WebP format, appropriate sizes).
- [ ] No unused dependencies.

---

## Gate 4: Documentation

### Code Documentation
- [ ] Complex logic has JSDoc comments explaining why, not just what.
- [ ] Public functions have documented parameters and return types.
- [ ] Non-obvious workarounds explain the original problem.

### External Documentation
- [ ] `/docs` folder updated to reflect API changes.
- [ ] README updated if setup instructions change.
- [ ] Architecture Decision Record (ADR) created for major pattern changes.

### Traceability
- [ ] Requirements linked to tests.
- [ ] Tests linked to code.
- [ ] Changes linked to business justification.

---

## Gate 5: Test Coverage

### Unit Tests
- [ ] Critical business logic has unit tests.
- [ ] Edge cases are covered (null, empty, max values).
- [ ] Tests are deterministic (same input, same output, every time).

### Integration Tests
- [ ] API endpoints tested with realistic payloads.
- [ ] Database operations tested (including rollback scenarios).
- [ ] Third-party integrations mocked and tested.

### End-to-End Tests
- [ ] Primary user flows have Playwright tests.
- [ ] Critical paths (checkout, signup, payment) fully automated.
- [ ] Tests run in CI on every pull request.

### Coverage Targets
| Code Type | Minimum Coverage |
|-----------|------------------|
| Critical logic (auth, payments, security) | 100% |
| Business logic | 80% |
| UI components | 60% (focus on interaction, not styling) |

---

## Gate 6: Accessibility

### WCAG 2.1 AA Compliance
- [ ] Keyboard navigation works for all interactive elements.
- [ ] Focus indicators are visible.
- [ ] Color contrast meets 4.5:1 for text.
- [ ] Alt text for all informative images.
- [ ] Form labels are associated with inputs.
- [ ] Error messages are clear and linked to fields.

### Screen Reader Testing
- [ ] Tested with at least one screen reader (NVDA, JAWS, or VoiceOver).
- [ ] Dynamic content announces changes.
- [ ] Navigation landmarks are properly marked.

---

## Gate 7: Release Hygiene

### Version Control
- [ ] Feature branch merged via pull request.
- [ ] PR reviewed by at least one senior engineer.
- [ ] Commit messages explain why, not just what.

### Rollback Plan
- [ ] Breaking changes include rollback instructions.
- [ ] Database migrations are forward-compatible.
- [ ] Feature flags implemented for high-risk changes.

### Deployment Safety
- [ ] Changes deployed to staging first.
- [ ] Smoke tests pass in staging.
- [ ] Monitoring dashboards checked post-deployment.

---

## The Zero-Debt Pledge

We do not ship "temporary duct tape."

If a shortcut is necessary to meet a deadline:
1. It must be tracked as a tech debt ticket.
2. The ticket must have a defined expiration date (maximum 30 days).
3. The ticket must be scheduled before the shortcut is taken.

**No exceptions.** Temporary solutions have a way of becoming permanent problems.

---

## Quality Checklist (Printable)

Before marking a feature complete, verify:

```
FUNCTIONAL
□ Happy path works
□ Error paths handled
□ No console errors

SECURITY
□ Input validated
□ AuthZ checks in place
□ No secrets in code/logs
□ PII protected

PERFORMANCE
□ LCP < 2.5s
□ INP < 200ms
□ CLS < 0.1
□ Build < 5 minutes

DOCUMENTATION
□ Code comments for complex logic
□ External docs updated
□ ADR if needed

TESTING
□ Unit tests for critical logic
□ E2E tests for primary flows
□ Coverage targets met

ACCESSIBILITY
□ Keyboard navigation works
□ Color contrast passes
□ Screen reader tested

RELEASE
□ PR reviewed
□ Rollback plan documented
□ Staging tested
```

---

## Enforcement

### Code Reviews
Reviewers are responsible for checking quality gates. If you approve a PR that fails a gate, you share the responsibility.

### CI/CD Pipeline
Automated checks block merges that fail:
- Type checking (`npm run typecheck`)
- Linting (`npm run lint`)
- Tests (`npm run test`)
- Security scan (secrets detection)

### Escalation
If schedule pressure threatens quality, escalate to the project lead. Quality is not negotiable. Scope or timeline may be.

---

**Questions about quality standards?** Contact: dylan.thompson@vantus.systems

[End of Document VS-ENG-303]
