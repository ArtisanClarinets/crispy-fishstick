# Jules Task Checklist

Derived from `AGENT.md`.

## Pre-Task
- [ ] Read `AGENT.md` (Prime Directives & Wiring Integrity).
- [ ] Define **Goal** (1-2 lines).
- [ ] Define **Acceptance Criteria**.
- [ ] Define **Invariants** (Logic must NEVER break).
- [ ] Create **Plan** (Files to touch).

## Execution
- [ ] **Security**:
    - [ ] RBAC checks present?
    - [ ] CSRF/Headers preserved?
    - [ ] No secrets logged?
- [ ] **Wiring**:
    - [ ] `proxy.ts` integrity maintained?
    - [ ] Route boundaries respected?
    - [ ] API reads/writes separated?
    - [ ] Audit logs added for mutations?
- [ ] **Testing**:
    - [ ] `npm run lint` pass?
    - [ ] `npm run test` pass?
    - [ ] `npm run build` pass?

## Verification
- [ ] Manual smoke test (if applicable).
- [ ] Automated verification script run (`.jules/verify.sh`).
