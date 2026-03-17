# SOP-002: Pre-Deployment Checklist

**Document ID:** VS-OPS-002
**Version:** 2.0.1 (Fortune-500 Standard)
**Effective Date:** January 19, 2026
**Owner:** VP of Operations
**Related Documents:** `VS-OPS-502` (Operations Playbook), `VS-ENG-303` (Quality Bar)
**Last Reviewed:** February 21, 2026

---

## I. PURPOSE & SCOPE

This SOP provides a mandatory checklist to be completed by the responsible engineer **before** merging a Pull Request (PR) to a production or staging branch. Its purpose is to enforce the **Vantus Standard of Care** at the most critical moment: shipping code. Following this procedure minimizes risk, ensures operational stability, and protects the client's data ownership.

**Scope:** This procedure is mandatory for all engineers and technical personnel deploying code. It covers all deployments, from minor patches to major feature releases.

---

## II. KEY PRINCIPLES

This procedure is a direct implementation of our Founding Principles:

*   **Radical Resilience over Theoretical Elegance:** The "Back-out Plan," "Smoke Test," and post-deployment monitoring are designed for real-world operations. We prepare for failure to ensure rapid recovery.
*   **Foundational Integrity:** The "Quality & Security Gauntlet" is a non-negotiable gate. We do not sacrifice security or stability for speed. This checklist is the mechanism for enforcing that principle.
*   **Empirical Veracity:** The checklist requires proof that tests are passing, coverage is maintained, and security scans are clean. We trust, but we verify with data from the CI/CD pipeline.
*   **Universal Client Ownership:** Deploying stable, secure, and reliable code is an act of respecting the client's ownership. A failed deployment disrupts their business and undermines their autonomy.

---

## III. ROLES & RESPONSIBILITIES

*   **Deploying Engineer:** The engineer who owns the Pull Request (PR) and is responsible for completing this checklist.
*   **Reviewing Engineer(s):** One or more engineers responsible for peer-reviewing the PR and verifying the completeness of the checklist.
*   **VP of Operations:** The owner of this SOP and the ultimate authority on deployment schedules and go/no-go decisions for high-risk deployments.
*   **CISO:** Must be consulted for any deployment that triggers a security-related flag in the checklist.

---

## IV. STEP-BY-STEP DEPLOYMENT PROCEDURE

### Step 1: Pre-Flight Readiness (The Pull Request)

The **Deploying Engineer** must complete this checklist *within the description of the Pull Request itself*.

#### Phase A: Code & Documentation Integrity
- [ ] **Atomic & Linked:** The PR is small, focused, and its title links to the relevant task or Change Request (CR).
- [ ] **The Scout Rule:** The code is demonstrably cleaner than it was before. Unrelated refactoring is not included.
- [ ] **Documentation Sync:** All user-facing or operational documentation (Runbooks, READMEs) impacted by this change has been updated within this PR.
- [ ] **ADR Check:** If this PR introduces a significant architectural change, a new Architecture Decision Record (ADR) has been created and is linked.

#### Phase B: The Quality & Security Gauntlet
- [ ] **CI Pipeline Green:** All automated checks (linting, formatting, tests) are passing.
- [ ] **Test Coverage Maintained:** The PR does not decrease overall test coverage. New code is tested to the project's standard.
- [ ] **Security Gate Passed:**
    - [ ] No `critical` or `high` vulnerabilities are introduced by `npm audit` or other automated scans.
    - [ ] All new inputs (API routes, forms, server actions) have schema validation (e.g., Zod).
    - [ ] No secrets are hardcoded; `.env.example` is updated if new environment variables are required.
- [ ] **Performance Gate Passed:**
    - [ ] Justification is provided for any new client-side components or large libraries.
    - [ ] Lighthouse score degradation is not observed in testing.

#### Phase C: Operational Readiness
- [ ] **Migrations Tested:** Any database migrations have been successfully tested against a staging or ephemeral database.
- [ ] **Back-out Plan:** A simple, tested command or series of commands to revert the change is included below.
- [ ] **Smoke Test Plan:** A brief, clear list of manual checks to perform post-deployment is included below.

### Step 2: Peer Review & Approval

1.  The **Reviewing Engineer** must not only review the code but also validate the completeness and accuracy of the Pre-Flight checklist.
2.  At least one formal approval from a Reviewing Engineer is required before proceeding.
3.  For changes flagged by the **Security Gate**, CISO approval is also required.

### Step 3: Merge & Deploy

1.  Once approved, the **Deploying Engineer** merges the PR.
2.  The deployment is triggered automatically by the CI/CD pipeline or manually by the engineer, following the project-specific deployment process.

### Step 4: Post-Deployment Verification

This step is critical and must not be skipped.

1.  **Execute Smoke Test:** Immediately after deployment, the **Deploying Engineer** executes the smoke test plan in the production environment.
2.  **Monitor Health:** For the next 15 minutes, the engineer actively monitors application health (error rates, performance dashboards, log output) for any anomalies.
3.  **Declare Success:** If the smoke test passes and no negative health signals are observed, the engineer declares the deployment a success by commenting in the (now merged) PR.
4.  **Initiate Rollback (if necessary):** If the smoke test fails or monitoring reveals a critical issue, the **Deploying Engineer** immediately executes the **Back-out Plan** and escalates the issue to the VP of Operations.

---

## V. TEMPLATES & CHECKLISTS

### PR Description Template (To be copied into every PR)

```markdown
### Change Summary
[Link to Task/CR] [Brief summary of the change]

---

### Pre-Flight Checklist

**Phase A: Code & Documentation**
- [ ] Atomic & Linked
- [ ] The Scout Rule
- [ ] Documentation Sync
- [ ] ADR Check

**Phase B: Quality & Security Gauntlet**
- [ ] CI Pipeline Green
- [ ] Test Coverage Maintained
- [ ] Security Gate Passed
- [ ] Performance Gate Passed

**Phase C: Operational Readiness**
- [ ] Migrations Tested
- [ ] Back-out Plan is documented below.
- [ ] Smoke Test Plan is documented below.

---

### Back-out Plan

```bash
# Example: Revert merge commit and redeploy
git revert -m 1 <MERGE_COMMIT_SHA>
git push origin main && vercel deploy --prod
```

### Smoke Test Plan

1.  ✅ Log in as a test user.
2.  ✅ Navigate to the new `/feature` page and verify the data table loads.
3.  ✅ Submit the new form and confirm a success message appears.
```

---

## VI. SUCCESS CRITERIA

*   **100% Checklist Compliance:** No PR is merged to a protected branch without a completed checklist in its description.
*   **Deployment Success Rate:** >99% of deployments do not require a rollback.
*   **Reduced MTTR for Failures:** When a rollback is necessary, it is initiated within 5 minutes of a failed smoke test.

---

## VII. AUDIT & COMPLIANCE

*   The VP of Operations will conduct bi-weekly reviews of merged production PRs.
*   **Audit Checks:**
    *   Verify that a complete checklist was present in the PR description.
    *   Verify that "Success" was declared or a rollback was documented.
    *   Spot-check that security-flagged PRs received CISO approval.
*   A "three-strikes" policy is in effect for engineers who repeatedly bypass this SOP.

---

## VIII. CHANGELOG

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 2.0.1 | 2026-02-21 | Replaced "digital owner-controlled systems" terminology with "client data ownership" to align with updated Vantus brand positioning | VP of Operations |
| 2.0.0 | 2026-01-19 | Initial release as Fortune-500 Standard | VP of Operations |

---
*End of SOP-002*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
