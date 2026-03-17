
# CODE REVIEW STANDARDS

**Document ID:** VS-ENG-020
**Version:** 1.0.0
**Effective Date:** January 19, 2026
**Owner:** VP of Engineering
**Last Updated:** January 19, 2026

---

## I. PURPOSE & SCOPE

This SOP defines the standards and procedures for code reviews to ensure code quality, share knowledge, and maintain a consistent coding style. It applies to all code changes submitted to the version control system.

## II. KEY PRINCIPLES

- **Constructive Feedback:** Code reviews should be constructive and focus on improving the code.
- **Ego-less Programming:** Be open to feedback and willing to make changes.
- **Thoroughness:** Reviewers should be thorough and check for correctness, performance, security, and style.
- **Timeliness:** Code reviews should be completed within 24 hours.

## III. CODE REVIEW REQUIREMENTS

- **Two Approvers:** All pull requests must have at least two approvals from other engineers.
- **CI/CD Pipeline:** The CI/CD pipeline must pass successfully.
- **No "LGTM" Reviews:** Avoid low-effort reviews. Reviewers must provide meaningful feedback.
- **Self-Review:** The author of the pull request should review their own code before requesting a review from others.

## IV. STEP-BY-STEP PROCEDURE

1.  **Create a Pull Request:** Create a pull request with a clear title and description.
2.  **Request a Review:** Request a review from at least two other engineers.
3.  **Address Feedback:** The author of the pull request must address all feedback from the reviewers.
4.  **Approve the Pull Request:** Once all feedback has been addressed, the reviewers can approve the pull request.
5.  **Merge the Pull Request:** Once the pull request has been approved, it can be merged into the main branch.

## V. TEMPLATES & CHECKLISTS

- **Pull Request Template:** Use the standard pull request template.
- **Code Review Checklist:** A checklist of items to look for during a code review.

## VI. ESCALATION PATHS

- If there is a disagreement about a code change that cannot be resolved between the author and reviewers, it should be escalated to the Engineering Manager.
- If the Engineering Manager cannot resolve the disagreement, it should be escalated to the VP of Engineering.

## VII. DOCUMENT HISTORY

| Version | Date | Changes | Owner |
|---|---|---|---|
| 1.0.0 | January 19, 2026 | Initial version. | VP of Engineering |
---
