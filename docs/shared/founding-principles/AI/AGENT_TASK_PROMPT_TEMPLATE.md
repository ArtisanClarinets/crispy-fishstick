# Algorithmic Governance — Agent Task Template

**Document ID:** VS-AI-602  
**Version:** 2.0.0  
**Effective Date:** February 2, 2026  
**Instructions:** Copy and paste this block when initializing a task for a coding agent. It enforces the "Vantus Standard of Care."

---

## CONTEXT & GOVERNANCE

You are working within a Vantus Systems repository. All output must adhere to the **Corporate Standard** defined in:

- `/docs/company-docs/founding-principles/FOUNDING_PRINCIPLES.md` (Mission context)
- `/docs/company-docs/founding-principles/COMPANY/VALUES.md` (Decision-making logic)
- `/docs/company-docs/founding-principles/ENGINEERING/QUALITY_BAR.md` (Definition of Done)
- `/docs/company-docs/founding-principles/SECURITY/SECURITY_BASELINE.md` (Security requirements)
- `/docs/company-docs/founding-principles/ENGINEERING/REPO_CONVENTIONS.md` (Code standards)

**IMPORTANT:** If your suggested logic conflicts with any of these documents, the document wins.

---

## TASK DESCRIPTION

(Describe the task concisely. What business problem are we solving?)

---

## SUCCESS CRITERIA

The task is complete only when all of the following are true:

- [ ] Build passes (`npm run build`)
- [ ] Type checking passes (`npm run typecheck`)
- [ ] Linting passes (`npm run lint`)
- [ ] Tests pass (`npm run test`)
- [ ] Documentation updated (README, ADR if applicable)
- [ ] Security scan passes (no secrets, input validation in place)
- [ ] Performance budget maintained (LCP < 2.5s, INP < 200ms)

---

## OPERATIONAL CONSTRAINTS

### Architecture

- Follow **Feature-Sliced Design (FSD)** strictly.
- Import only from layers below (see `../ENGINEERING/ARCHITECTURE_OVERVIEW.md`).
- No circular dependencies.

### Next.js / React

- Use **React Server Components** by default.
- Add `'use client'` only for browser-only requirements.
- Use the app's proxy file rather than middleware for network-level concerns.
- No business logic in request-interception layers.

### Logic & Refactoring

- **Do not refactor unrelated code.** Stay focused on the task.
<!-- RESOLVED PLACEHOLDER -->
- Do not change working logic unless explicitly directed.

### Security

- **No secrets in code.** Use environment variables.
- **Validate all inputs** with Zod or equivalent.
- **Check auth** at API/Server Action level.
- **Escape output** to prevent XSS.

### Performance

- Lazy load heavy components (`ssr: false`).
- Optimize images with `next/image`.
- Self-host fonts via `next/font`.
- Keep bundle size under 250KB initial load.

---

## REQUIRED DELIVERABLES

### 1. Pre-Execution Summary

Before writing code, output:

- [ ] One-sentence user intent summary
- [ ] List of Vantus documents reviewed
- [ ] In-scope items
- [ ] Out-of-scope items
- [ ] Verification plan

### 2. Implementation Plan

Step-by-step breakdown of your proposed changes.

### 3. Atomic Code Changes

- Secure, production-ready code.
- Follow naming conventions.
- Include JSDoc for complex logic.
- Handle errors gracefully.

### 4. Synchronized Documentation

- Update all relevant `.md` files in the same PR.
- Create ADR if architectural decision made.
- Update README if setup changes.

### 5. Verification Log

- Commands used and results.
- Test output summary.
- Build/lint results.

### 6. Rollback Strategy

One-paragraph summary of how to revert this change if needed.

---

## ANTI-DRIFT CHECKLIST

Before proceeding, confirm:

- [ ] I have read the relevant ADRs in `/docs/adr/`.
- [ ] I understand the FSD layer boundaries for this change.
- [ ] I know where tests should be added.
- [ ] I have identified any security implications.
- [ ] I understand the performance budget for this area.

---

## POST-COMPLETION CHECKLIST

Before declaring the task complete:

- [ ] All success criteria met.
- [ ] No console errors or warnings.
- [ ] No secrets in code.
- [ ] All inputs validated.
- [ ] Error handling in place.
- [ ] Documentation updated.
- [ ] Rollback strategy documented.

---

## REMINDER: THE HUMAN IS OWNER-CONTROLLED SYSTEMS

AI suggests. Humans decide.

If you are unsure about any requirement, ask for clarification. Do not guess.

If you encounter a conflict between efficiency and standards, choose standards.

---

(End of Template VS-AI-602)

## Sync Notes

- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
