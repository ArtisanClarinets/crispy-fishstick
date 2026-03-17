# SOP-001: Change Request Procedure

**Document ID:** VS-BUS-001
**Version:** 2.0.0 (Fortune-500 Standard)
**Effective Date:** January 19, 2026
**Owner:** VP of Delivery
**Related Documents:** `SOP-000`, `../founding-principles/FOUNDING_PRINCIPLES.md`
**Last Reviewed:** January 19, 2026

---

## I. PURPOSE & SCOPE

This SOP establishes the mandatory procedure for managing all change requests (CRs) for client projects at Vantus Systems. Its purpose is to ensure that every change is evaluated transparently, approved consciously, and implemented correctly, protecting both the client and the project's integrity.

**Scope:** This SOP applies to all project-related work performed by Vantus Systems employees and contractors. It covers any deviation from the initially agreed-upon scope of work as defined in the project's Statement of Work (SOW).

---

## II. KEY PRINCIPLES

This procedure is a direct implementation of our Founding Principles:

- **Linguistic Transparency:** We provide clients with a clear, jargon-free Change Impact Assessment so they can make informed decisions about their own projects. We translate technical changes into business impacts (time, cost, risk).
- **Universal Client Ownership:** The client is the final authority. Our role is to provide the data and a recommendation, but the decision to approve or reject a change rests entirely with them. This SOP ensures they have the information to exercise that ownership effectively.
- **Empirical Veracity:** All assessments are based on evidence and realistic estimates, not guesswork. We provide quantifiable impacts to ensure decisions are based on data.
- **Foundational Integrity:** The procedure includes a mandatory security gate, ensuring that velocity or new features do not compromise the foundational security and stability of the system.

---

## III. ROLES & RESPONSIBILITIES

- **Project Catalyst (or Project Manager):** Responsible for executing this SOP. They receive the request, conduct the impact assessment, prepare the client-facing report, and manage the process from start to finish.
- **Client Decision-Maker:** The designated individual on the client side with the authority to approve or reject change requests.
- **Engineering Lead:** Responsible for providing technical estimates and assessing the complexity and risk of the proposed change.
- **VP of Delivery:** The owner of this SOP and the escalation point for any process disputes or high-risk approvals.

---

## IV. STEP-BY-STEP PROCEDURE

### Step 1: Receive & Log the Request

1.  **Acknowledge the Request:** Within 8 business hours, the Project Catalyst acknowledges receipt of the client's request.
2.  **Log in Change Register:** A new entry is created in the project's **Change Register** (see Section VI for template). The entry must include:
    - **Request ID:** A unique identifier (e.g., `CR-001`).
    - **Date & Source:** When the request was made and by whom.
    - **Description:** A clear summary of the request.
    - **Status:** Set to `Pending Assessment`.

### Step 2: Conduct Change Impact Assessment (CIA)

The Project Catalyst collaborates with the Engineering Lead to conduct the CIA.

1.  **Assess Business Impact:**
    - **Time:** Estimate the delay to the project timeline in business days.
    - **Cost:** Calculate the total cost of the change using the project's agreed-upon rate. Include any third-party licensing or infrastructure costs.
2.  **Assess Technical Impact:**
    - **Complexity:** Rate the technical complexity (Low, Medium, High).
    - **Risk:** Evaluate the risk of unforeseen side effects or destabilization (Low, Medium, High).
    - **Dependencies:** List any new dependencies this change introduces.
3.  **Assess Security & Integrity Impact:**
    - **Security Gate:** Does the change touch authentication, authorization, data handling, or other areas covered by `../founding-principles/SECURITY/SECURITY_BASELINE.md`? (Yes/No).
    - **Architectural Deviation:** Does the change deviate from the documented architecture (ADRs)? (Yes/No).
    - **If the answer to either question is "Yes," the CISO must be looped in for a mandatory security and integrity review.**

### Step 3: Present CIA Report to Client

1.  **Prepare Report:** The Project Catalyst compiles the CIA findings into the **Change Impact Assessment Report** (see Section VI for template). The report must be written for a non-technical audience.
2.  **Provide Recommendation:** Based on the assessment, the Project Catalyst provides a formal recommendation:
    - **Approve:** The change is beneficial and risks are manageable.
    - **Reject:** The change has significant negative impacts.
    - **Defer:** The change is not a priority at this time.
3.  **Schedule Review:** The Project Catalyst schedules a meeting to present the report to the Client Decision-Maker, ensuring they have adequate time to review and ask questions.

### Step 4: Record Decision & Obtain Approval

1.  **Client Decision:** The Client Decision-Maker makes the final call. This decision is documented in writing (email is sufficient).
2.  **Formal Amendment (if required):**
    - If the change has **any Cost or Time impact**, a formal **SOW Amendment** must be drafted by the Project Catalyst.
    - This amendment must be signed by both parties before any work can begin.
3.  **Update Change Register:**
    - The status is updated to `Approved`, `Rejected`, or `Deferred`.
    - The final decision, date, and a link to the signed amendment (if applicable) are added to the register.

### Step 5: Implement, Verify, & Close

1.  **Task Breakdown:** For approved changes, the Project Catalyst creates detailed tasks in the project management system.
2.  **Implementation:** The engineering team implements the change, adhering to all code quality, testing, and deployment SOPs.
3.  **Verification:** The Project Catalyst and the Engineering Lead verify that the implementation meets the request's requirements and that all quality gates (including security) have passed.
4.  **Client UAT:** The client is given the opportunity to perform User Acceptance Testing on the completed change.
5.  **Final Update:** Once the client confirms satisfaction, the Project Catalyst updates the Change Register status to `Completed & Verified`.

---

## V. TEMPLATES & CHECKLISTS

### Change Register Entry (Example)

```markdown
---
- **ID:** CR-005
- **Date:** 2026-01-19
- **Requester:** Jane Doe (Client CEO)
- **Description:** "Add a 'Login with Google' button to the sign-in page."
- **Status:** Approved
- **Decision:** Client approved the change and signed the SOW Amendment.
- **Decision Date:** 2026-01-21
- **Link to Approval:** [link_to_signed_amendment.pdf]
- **Completed & Verified:** 2026-02-05
---
```

### Change Impact Assessment Report (Template)

> **To:** [Client Decision-Maker Name]
> **From:** [Project Catalyst Name]
> **Date:** [Date]
> **Subject:** Impact Assessment for Change Request CR-XXX: [Brief Description]
>
> ---
>
> ### Plain Language Summary
>
> This report details the expected impact of your request to [re-state the request]. Our recommendation is to **[Approve / Reject / Defer]** this change.
>
> ---
>
> ### 1. Business Impact
>
> - **Cost Impact:** This change will require an additional **$X,XXX** (Y hours at $Z/hour).
> - **Timeline Impact:** This will delay the project completion date by an estimated **N business days**.
>
> ### 2. Technical & Risk Impact
>
> - **Complexity:** We assess this as **[Low / Medium / High]**. [Explain why in one sentence].
> - **Risk:** There is a **[Low / Medium / High]** risk of [describe potential negative outcome, e.g., 'affecting checkout performance'].
> - **Security Review:** **[Required / Not Required]**. [Explain why, e.g., 'This change affects user authentication.'].
>
> ### 3. Recommendation
>
> [Provide a 2-3 sentence explanation for the recommendation, connecting it back to the project goals and the impacts listed above.]
>
> Please let us know if you approve this change by [Date]. If approved, we will draft a formal SOW Amendment for your signature.

---

## VI. SUCCESS CRITERIA

- **100% Compliance:** Every change, no matter how small, has a corresponding entry in the Change Register.
- **Zero Unapproved Work:** No work on a change begins before the decision is logged and formal approval (if required) is secured.
- **Client Confirmation:** The client can articulate the time, cost, and risk of a change before approving it.

---

## VII. AUDIT & COMPLIANCE

- The VP of Delivery will conduct a quarterly audit of all project Change Registers.
- **Audit Checks:**
  - Verify that all `Approved` changes with a cost/time impact have a linked, signed SOW Amendment.
  - Verify that any change marked with `Security Review: Required` has evidence of CISO sign-off.
  - Sample 10% of `Completed` changes to ensure they were verified by the client.
- Non-compliance will be logged and addressed with the responsible Project Catalyst.

---

_End of SOP-001_
