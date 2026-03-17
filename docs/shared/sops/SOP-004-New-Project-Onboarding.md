# SOP-004: New Project Onboarding Procedure

**Document ID:** VS-BUS-004
**Version:** 2.0.0 (Fortune-500 Standard)
**Effective Date:** January 19, 2026
**Owner:** VP of Delivery
**Related Documents:** `SOP-000`, `../founding-principles/FOUNDING_PRINCIPLES.md`
**Last Reviewed:** January 19, 2026

---

## I. PURPOSE & SCOPE

This SOP defines the mandatory procedure for initiating a new client project. Its purpose is to establish a consistent, high-quality foundation for every engagement, ensuring alignment on goals, governance, and technical strategy from day one.

**Scope:** This procedure must be executed by the assigned Project Catalyst for every new project immediately following the signing of the Statement of Work (SOW).

---

## II. KEY PRINCIPLES

This procedure is a direct implementation of our Founding Principles:

- **Universal Client Ownership:** This is the cornerstone of onboarding. We establish from the outset that the client owns the infrastructure, the code, and the process. We are the stewards they have hired. Steps like creating a client-owned machine user are tactical implementations of this principle.
- **Linguistic Transparency:** The Kick-off Meeting and Welcome Communication establish the rhythm of clear, honest, and predictable communication that will define the project.
- **Empirical Veracity:** The Technical Discovery and Architecture Decision Record (ADR) processes are designed to document the objective truth of the project's starting point and technical strategy.
- **Foundational Integrity:** We establish security and quality gates (branch protection, security baselines) from the very beginning, ensuring the project is built on a solid foundation.

---

## III. ROLES & RESPONSIBILITIES

- **Project Catalyst:** The individual responsible for executing this entire SOP and managing the project.
- **VP of Delivery:** The owner of this SOP and the signatory on the SOW.
- **Engineering Lead:** The technical lead assigned to the project, responsible for repository setup and technical discovery.

* **Client Decision-Maker:** The designated point of contact and authority on the client side.

---

## IV. STEP-BY-STEP ONBOARDING PROCEDURE

### Phase 1: Commercial Greenlight

The Project Catalyst must confirm the following before any work begins:

1.  [ ] **SOW Signed:** A final Statement of Work is fully executed by both parties.
2.  [ ] **Client Owner Designated:** A single, formal "Decision Maker" on the client side has been identified.
3.  [ ] **Payment Process Initiated:** The initial invoice has been sent to the client as per the SOW terms.

### Phase 2: Internal Setup & Governance

1.  **Create Project Folder:** Create a new folder for the client in the company's document repository.
2.  **Setup Project Management:** Create and configure the project in the company's official project management tool (e.g., Jira, Asana).
3.  **Setup Communication:** Create the shared internal/client communication channel (e.g., `#project-x-client` in Slack).
4.  **Setup Source Control:**
    - [ ] The Engineering Lead creates a new Git repository from the Vantus template.
    - [ ] Branch protection rules and status checks (`SOP-010`) are enabled for the `main` branch.
    - [ ] The Vantus team is granted access.
    - [ ] **Crucially, the Project Catalyst requests that the client create a "machine user" account (e.g., on GitHub) that the client owns. This user will be used for CI/CD and automated tasks, ensuring client ownership of the infrastructure from the start.**

### Phase 3: Project Kick-Off & Discovery

1.  **Schedule Kick-off Meeting:** The Project Catalyst schedules the formal kick-off meeting with the client.
2.  **Conduct Kick-off:** The meeting agenda must cover:
    - Introductions of both teams.
    - Review of project goals and scope (as per the SOW).
    - Establishment of communication rhythms (e.g., weekly "State of the Build" meetings).
    - Confirmation of the technical discovery process.
3.  **Initiate Technical Discovery:**
    - [ ] The Project Catalyst securely requests and obtains credentials for all necessary client systems (DNS, hosting, etc.) using the company's approved secret management platform.
    - [ ] The Engineering Lead begins the technical discovery process, documenting findings.
    - [ ] The core architectural plan and initial decisions are documented as the first ADRs for the project.

### Phase 4: Formal Welcome & Alignment

1.  **Send Welcome Communication:** The Project Catalyst sends the official welcome email/message (see Section V for template) to the Client Decision-Maker and stakeholders.
2.  **Schedule First Check-in:** The first weekly "State of the Build" meeting is placed on the calendar.

---

## V. TEMPLATES & CHECKLISTS

### Client Welcome Email Template

> **Subject:** Welcome to Vantus Systems! Kicking off the [Project Name] Project
>
> Hi [Client Name],
>
> On behalf of the entire team, welcome to Vantus Systems! We are incredibly excited to partner with you on the [Project Name] project.
>
> This email confirms that we have completed our internal setup and are ready to begin. Here is some key information to get us started:
>
> - **Our Shared Goal:** [Reiterate the primary goal from the SOW in one sentence].
> - **Communication:** We have invited you to our shared Slack channel, [#project-x-client](). This will be our primary day-to-day communication hub.
> - **Rhythm:** We have scheduled our first "State of the Build" weekly meeting for [Date & Time]. You can expect a brief report from us every week, even on weeks we don't meet.
> - **Our Commitment:** We operate on a foundation of transparency and client ownership. You can read more about our principles in our "Founding Principles" document, which governs how we approach every task. [Link to public-facing principles page or a PDF].
>
> Our next step is the technical discovery phase. We look forward to speaking with you at our kick-off meeting!
>
> Best regards,
>
> The Vantus Systems Team

---

## VI. SUCCESS CRITERIA

- **100% Compliance:** Every item in Phase 1 and 2 is completed before the Kick-off meeting is held.
- **Client Confirmation:** The Client Decision-Maker has received the welcome email and has accepted the calendar invites for the weekly check-ins.
- **Ownership Established:** The client has provided a client-owned machine user for the source control repository.

---

## VII. AUDIT & COMPLIANCE

- The VP of Delivery will conduct a monthly audit of all new projects.
- **Audit Checks:**
  - Verify that the project folder and project management setup are complete.
  - Confirm that the source control repository has a client-owned machine user.
  - Ensure the Welcome Email was sent and the first weekly meeting was scheduled.
- A project that proceeds without completing this SOP will be flagged for immediate review.

---

_End of SOP-004_
