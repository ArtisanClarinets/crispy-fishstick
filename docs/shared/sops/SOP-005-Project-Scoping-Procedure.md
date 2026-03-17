# SOP-005: Project Scoping Procedure

**Document ID:** VS-BUS-005
**Version:** 2.0.0 (Fortune-500 Standard)
**Effective Date:** January 19, 2026
**Owner:** VP of Delivery
**Related Documents:** `SOP-000`, `SOP-001`, `../founding-principles/FOUNDING_PRINCIPLES.md`
**Last Reviewed:** January 19, 2026

---

## I. PURPOSE & SCOPE

This SOP defines the mandatory procedure for scoping new client projects. Scoping is the process of defining what will be built, by when, at what cost, and with what assumptions. This procedure exists to ensure that every project begins with a shared, evidence-based understanding, preventing the ambiguity that leads to project failure.

**Scope:** This procedure applies to every new client engagement, regardless of size. It is owned by the Project Catalyst and must be completed before a Statement of Work (SOW) is drafted.

---

## II. KEY PRINCIPLES

This procedure is a direct implementation of our Founding Principles:

- **Empirical Veracity:** Estimates are based on data, not optimism. All assumptions are stated explicitly. Unknowns are converted into time-boxed, paid investigation tasks, not ignored.
- **Linguistic Transparency:** The final scope document is written for a business audience, not just a technical one. It includes a plain-language executive summary and a glossary to ensure the client can make a truly informed decision.
- **Universal Client Ownership:** The scope must include all artifacts and training required for the client to achieve independence. Operational readiness ("Day 2") is scoped and priced as a first-class deliverable, not an afterthought.
- **Foundational Integrity:** The scoping process must identify and account for security, compliance, and other non-functional requirements from the very beginning.

---

## III. ROLES & RESPONSIBILITIES

- **Project Catalyst (PC):** Leads the scoping process, owns the final scope document, and is the primary interface with the client.
- **Technical Lead (TL):** Responsible for technical discovery, effort estimation, and identifying architectural risks and decisions.
- **VP of Delivery:** Reviews and approves the final scope and estimate before it is presented to the client.
- **Client Decision-Maker:** The designated individual on the client side with the authority to approve the final scope.

---

## IV. STEP-BY-STEP SCOPING PROCEDURE

### Phase 1: Discovery (Days 1-7)

1.  **Schedule Discovery Meeting:** The PC schedules a **Discovery Kickoff** meeting with the client stakeholders and the internal TL.
2.  **Pre-Meeting Questionnaire:** The PC sends a pre-meeting questionnaire to the client to gather initial requirements and context.
3.  **Conduct Discovery Meeting:** The meeting's agenda is to review the questionnaire, discuss business objectives, and identify high-level requirements, constraints, and success criteria.
4.  **Technical Deep-Dive (if necessary):** The TL conducts follow-up sessions to understand the client's existing technical landscape, data sources, and APIs.
5.  **Identify Unknowns:** The team documents all "known unknowns." If an unknown blocks accurate estimation (e.g., the state of a legacy database), it is converted into a **paid, time-boxed Investigation Task** that must be completed before the full project is scoped.

### Phase 2: Scope Definition (Days 8-14)

1.  **Define Deliverables & Phases:** The PC and TL break the project into logical phases (e.g., Phase 1: Core Application, Phase 2: Integrations, Phase 3: Operational Readiness). Each phase must include functional and non-functional (docs, monitoring) deliverables.
2.  **Estimate Effort:** The TL estimates the effort for each task, using historical data where possible and applying a standard **20-30% contingency buffer** for unknowns. All assumptions behind the estimates are documented.
3.  **Calculate Cost:** The PC converts the effort into cost, including a line item for project management overhead (typically 15-20%).
4.  **Draft Knowledge Transfer Plan:** Define the specific sessions and artifacts that will be delivered to make the client's team self-sufficient.
5.  **Assess Risks:** Create a risk register identifying potential threats to the project, rating their probability and impact, and defining a mitigation strategy.

### Phase 3: Scope Presentation & Sign-Off (Days 15-21)

1.  **Prepare Scope Document:** The PC assembles the final **Scope & Estimate Document** using the template in Section V.
2.  **Internal Review:** The document is reviewed and approved internally by the VP of Delivery.
3.  **Present to Client:** The PC schedules and leads a **Scope Walkthrough** meeting with the Client Decision-Maker. The goal is to ensure the client understands what they are buying, what it will cost, and what the risks are.
4.  **Obtain Sign-Off:** The Client Decision-Maker provides formal written approval of the scope document. If the client has feedback, the PC iterates on the document and repeats the review process.
5.  **Transition to Contracting:** Once signed, the PC hands off the approved scope document to be incorporated into the formal SOW.

---

## V. TEMPLATES & CHECKLISTS

### Scope & Estimate Document Template

```markdown
# Scope & Estimate: [Project Name]

**Prepared For:** [Client Name]
**Date:** [Date]
**Valid Until:** [Date + 30 Days]

## 1. Executive Summary

[A one-page, plain-language summary. What is the business problem? What are we building to solve it? How much will it cost, and how long will it take? This section should be 100% free of technical jargon.]

## 2. Phased Deliverables

### Phase 1: [Name] (Estimated Timeline: X Weeks)

- **Feature A:** [Description]
- **Feature B:** [Description]
- **Non-Functional:** [e.g., Unit test coverage at 80%]
- **Documentation:** [e.g., API documentation for all new endpoints]

### Phase 2: Operational Readiness (Estimated Timeline: Y Weeks)

- **Deliverable:** Monitoring & Alerting Setup
- **Deliverable:** Disaster Recovery Plan & Tested Backups
- **Deliverable:** Knowledge Transfer Sessions & Runbooks

## 3. Financial Breakdown

| Phase             | Estimated Effort (Hours) | Estimated Cost |
| ----------------- | ------------------------ | -------------- |
| Phase 1           | X                        | $Y             |
| Phase 2           | A                        | $B             |
| PM Overhead (15%) | C                        | $D             |
| **Total**         | **X+A+C**                | **$Y+B+D**     |

## 4. Key Assumptions & Dependencies

- [e.g., Client will provide access to their AWS account by [Date].]
- [e.g., This estimate assumes the 'Legacy API' is stable and documented.]

## 5. Risk Register

| Risk                             | Probability | Impact | Mitigation Plan                                                          |
| -------------------------------- | ----------- | ------ | ------------------------------------------------------------------------ |
| [e.g., Legacy API is unreliable] | Medium      | High   | [e.g., Allocate 20 extra hours for defensive coding and error handling.] |

## 6. Knowledge Transfer Plan

| Session                    | Goal                                                       |
| -------------------------- | ---------------------------------------------------------- |
| System Architecture Review | Ensure client's team understands the high-level design.    |
| Deployment & Operations    | Train client's team to deploy and monitor the application. |

---

**Client Approval:**

---

[Client Decision-Maker Name]
```

---

## VI. SUCCESS CRITERIA

- **100% Compliance:** No SOW is drafted without a prior, client-signed Scope & Estimate Document.
- **Estimate Accuracy:** Project actuals are within 15% of the scoped estimate (excluding approved Change Requests).
- **Zero Ambiguity:** The client can articulate the project's deliverables and assumptions in their own words.

---

## VII. AUDIT & COMPLIANCE

- The VP of Delivery will conduct a quarterly audit of all new projects.
- **Audit Checks:**
  - Verify that a signed Scope & Estimate document exists for every project.
  - Compare the final project cost/timeline against the scoped estimate to measure accuracy.
  - Confirm that "Operational Readiness" was included as a priced deliverable in the scope.
- Consistent and significant deviations between estimate and actuals will trigger a formal review of the estimation process.

---

_End of SOP-005_
