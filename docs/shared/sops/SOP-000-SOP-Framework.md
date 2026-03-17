# SOP-000: Vantus Systems Standard Operating Procedures Framework

**Document ID:** VS-OPS-000  
**Version:** 2.1.0 (Fortune-500 Standard)  
**Effective Date:** January 19, 2026  
**Owner:** Chief Operating Officer / Project Management Office  
**Status:** Active

---

## I. PURPOSE & SCOPE

This document establishes the governance framework for all Standard Operating Procedures (SOPs) at Vantus Systems. All SOPs must adhere to this framework to ensure consistency, traceability, and alignment with our **Founding Principles** as defined in VS-GOV-001:

1.  **Universal Client Ownership**
2.  **Empirical Veracity**
3.  **Foundational Integrity**
4.  **Radical Resilience over Theoretical Elegance**
5.  **Linguistic Transparency**
6.  **The Kinetic Design Standard**
7.  **Algorithmic Governance**

**Scope:** Every process at Vantus Systems—from Change Management to Incident Response to Project Closeout—must have a documented SOP.

---

## II. SOP STRUCTURE TEMPLATE

Every SOP must follow this standardized structure:

### Header Section

```
# SOP-XXX: [Clear, Action-Oriented Title]

**Document ID:** VS-OPS-XXX
**Version:** X.Y.Z (Fortune-500 Standard)
**Effective Date:** [ISO 8601 Date]
**Owner:** [Role/Team Responsible]
**Related Documents:** [VS-GOV-001, SOP-000, etc.]
**Last Reviewed:** [Date]
```

### Content Sections (Mandatory)

1. **PURPOSE & SCOPE** — What problem does this SOP solve? Who must follow it?
2. **KEY PRINCIPLES** — How does this SOP align with the Founding Principles? (e.g., "This procedure reinforces _Universal Client Ownership_ by...")
3. **ROLES & RESPONSIBILITIES** — Who does what? (Use RACI matrix if complex.)
4. **STEP-BY-STEP PROCEDURE** — Numbered, actionable steps with decision points.
5. **DECISION TREES** — Visual decision logic (use Mermaid diagrams where helpful).
6. **TEMPLATES & CHECKLISTS** — Reusable artifacts for the procedure.
7. **ESCALATION PATHS** — Who to contact if something goes wrong.
8. **SUCCESS CRITERIA** — How do we know this was executed correctly?
9. **AUDIT & COMPLIANCE** — How is compliance verified? What gets logged?
10. **EXAMPLES & CASE STUDIES** — Real or realistic scenarios demonstrating the SOP.
11. **GLOSSARY** — Define non-standard terms used in the SOP.

---

## III. SOP CATEGORIES

Vantus Systems maintains SOPs across five governance domains:

### A. COMMERCIAL & ENGAGEMENT (VS-BUS-XXX)

- Client acquisition, scoping, contracting, change management, closeout.
- Owner: VP of Delivery

### B. OPERATIONAL & INCIDENT MANAGEMENT (VS-OPS-XXX)

- Incident response, deployment, monitoring, disaster recovery, on-call rotations.
- Owner: VP of Operations

### C. ENGINEERING & CODE GOVERNANCE (VS-ENG-XXX)

- Code review, testing standards, repository conventions, security scanning, peer review.
- Owner: VP of Engineering

### D. SECURITY & COMPLIANCE (VS-SEC-XXX)

- Access control, secret management, audit logging, penetration testing, compliance certification.
- Owner: Chief Security Officer (CISO)

### E. PEOPLE & CULTURE (VS-PEO-XXX)

- Hiring, onboarding, performance management, learning & development, off-boarding.
- Owner: VP of People

---

## IV. VERSIONING & CHANGE CONTROL

### Version Numbering

Use Semantic Versioning: `MAJOR.MINOR.PATCH`

- **MAJOR:** Fundamental change to the procedure that requires re-training.
- **MINOR:** Clarification, new template, or efficiency improvement.
- **PATCH:** Typo fixes, link updates, no procedural change.

### Change Process for SOPs

1. **Identify Need:** Team member proposes SOP change via an issue in the `docs/sops/` repository.
2. **Draft:** Update the SOP document and increment the version number.
3. **Review:** The SOP owner and at least one cross-functional stakeholder must review.
4. **Approval:** The Chief Operating Officer (or delegate) approves the change.
5. **Announce:** Communication sent to all affected teams. Implementation date set (minimum 1 week notice).
6. **Archive:** Old version moved to `docs/sops/archive/` for reference.

---

## V. PRINCIPLE-DRIVEN SOP DESIGN

### Principle 1: Universal Client Ownership

**SOPs must be designed to transfer power to the client.** Every procedure should:

- Explicitly state what artifacts (keys, docs, access) are handed over.
- Document steps for a client or a third party to take over the process.
- Avoid creating dependencies on Vantus-specific "secret knowledge."

### Principle 2: Empirical Veracity

**SOPs must be based on measurable proof.** Every SOP must include:

- Clear, quantifiable success criteria (e.g., "Lighthouse score > 95," "Recovery Time Objective < 4 hours").
- Definition of the metrics or KPIs to be tracked.
- Mandated, regular audits to verify compliance and effectiveness.

### Principle 3: Foundational Integrity

**SOPs must enforce security as a default.** Procedures must:

- Integrate security checks as mandatory gates, not optional steps.
- Reference `../founding-principles/SECURITY/SECURITY_BASELINE.md` where applicable.
- Prohibit the bypassing of security controls for convenience.

### Principle 4: Radical Resilience (over Theoretical Elegance)

**SOPs must work in the real world.** Procedures should:

- Acknowledge human error and include steps for error recovery.
- Define fallback paths for when primary systems or tools are unavailable.
- Prioritize simplicity and robustness ("Day-2 Readiness").

### Principle 5: Linguistic Transparency

**SOPs must be easy to understand.** Every procedure should:

- Be written in clear, concise language, avoiding jargon where possible.
- Include a glossary for any necessary technical terms.
- Enable stakeholders (including non-technical ones) to understand the "what" and "why."

### Principle 6: The Kinetic Design Standard

**SOPs related to UI/UX must enforce quality.** These procedures must:

- Reference and enforce accessibility standards (WCAG 2.1 AA+).
- Ensure UI/UX changes are validated against performance and consistency metrics.

### Principle 7: Algorithmic Governance

**SOPs must govern AI-assisted work.** Procedures involving AI must:

- Enforce the "Human-in-the-Loop" principle for all AI-generated outputs.
- Require that AI agents adhere to all relevant SOPs, including the root AI governance guide and the applicable security and code conventions.
- Mandate audit trails for AI-driven actions.

---

## VI. MANDATORY SOP AUDIT SCHEDULE

| SOP Category                 | Audit Frequency | Responsible Party |
| ---------------------------- | --------------- | ----------------- |
| **VS-BUS-XXX** (Commercial)  | Quarterly       | VP of Delivery    |
| **VS-OPS-XXX** (Operations)  | Bi-weekly       | VP of Operations  |
| **VS-ENG-XXX** (Engineering) | Monthly         | VP of Engineering |
| **VS-SEC-XXX** (Security)    | Monthly         | CISO              |
| **VS-PEO-XXX** (People)      | Quarterly       | VP of People      |

**Audit Checklist:**

- [ ] Procedure is being followed correctly.
- [ ] Decision points are documented (not skipped).
- [ ] Escalations are happening as defined.
- [ ] Success criteria are being met.
- [ ] Compliance logs are complete and immutable.

---

## VII. EXCEPTION HANDLING & WAIVER PROCESS

Not all situations fit the standard procedure.

### When to Request an Exception

If a situation is time-critical, or if following the SOP would cause significant harm:

1. The decision-maker logs the situation, reasoning, and timestamp.
2. Submits a **Waiver Request** to the SOP owner and domain VP.
3. The SOP owner (or delegate) approves or denies within a defined SLA (e.g., 4 hours for high-urgency).
4. If approved, the waiver is logged in the appropriate **Exception Register**.

### Exception Register

Maintained for each domain in a domain-specific exception register:

- Lists all granted waivers with justification.
- Reviewed quarterly to identify SOPs that require updates.

---

## VIII. NEW SOP CREATION CHECKLIST

To create a new SOP:

- [ ] **Step 1:** Identify the process that needs formal documentation.
- [ ] **Step 2:** Assign an SOP owner (the person responsible for its lifecycle).
- [ ] **Step 3:** Conduct a process walkthrough with all key stakeholders.
- [ ] **Step 4:** Draft the procedure using the SOP structure template (Section II).
- [ ] **Step 5:** Include at least one realistic example or case study.
- [ ] **Step 6:** Define quantifiable success criteria and audit mechanisms.
- [ ] **Step 7:** Create a Mermaid decision tree if the logic is complex.
- [ ] **Step 8:** "Dry run" the SOP with a team member unfamiliar with the process.
- [ ] **Step 9:** Submit for review to cross-functional stakeholders.
- [ ] **Step 10:** Chief Operating Officer approves and assigns an SOP number.
- [ ] **Step 11:** Announce to all affected teams with a 1-week implementation window.

---

## IX. INTEGRATION WITH FOUNDING PRINCIPLES

All SOPs must directly reinforce Vantus's core mission:

> "We empower SMEs to achieve total digital autonomy, cost-efficiency, and operational resilience by architecting systems that they own, understand, and can operate independently."

This means every SOP is a tool for:

- **Preventing Vendor Lock-in:** Procedures must be written for a competent third party to execute.
- **Ensuring Empirical Veracity:** Procedures must state how estimates, timelines, and risks are calculated and communicated.
- **Enabling Client Independence:** Knowledge is documented for transfer, not hoarded for leverage.

---

## X. SOP REPOSITORY STRUCTURE (as per SOP-SYSTEM-INDEX)

```
docs/sops/
├── SOP-000-SOP-Framework.md                        [This document]
├── SOP-SYSTEM-INDEX.md                             [Master Index]
├── ARCHIVE/                                         [Old versions]
│   └── ...
│
├── [VS-BUS-XXX] Commercial & Engagement (SOPs 001-009)
│   ├── SOP-001-Change-Request-Procedure.md
│   └── ...
│
├── [VS-OPS-XXX] Operational & Incident (SOPs 010-019)
│   ├── SOP-010-Deployment-Checklist.md
│   └── ...
│
├── [VS-ENG-XXX] Engineering & Code (SOPs 020-029)
│   ├── SOP-022-Repository-Conventions.md
│   └── ...
│
├── [VS-SEC-XXX] Security & Compliance (SOPs 030-049)
│   ├── SOP-030-Access-Control-Secret-Management.md
│   └── ...
│
└── [VS-PEO-XXX] People & Culture (SOPs 050-059)
    ├── SOP-050-New-Employee-Onboarding.md
    └── ...
```

---

## XI. QUICK REFERENCE: SOP NUMBERING SCHEME (as per SOP-SYSTEM-INDEX)

```
SOP-000       → Framework & Administration
SOP-001–009 → VS-BUS-XXX (Commercial & Engagement)
SOP-010–019 → VS-OPS-XXX (Operational & Incident)
SOP-020–029 → VS-ENG-XXX (Engineering & Code)
SOP-030–049 → VS-SEC-XXX (Security & Compliance)
SOP-050–059 → VS-PEO-XXX (People & Culture)
SOP-060+    → Reserved for Future Domains
```

---

## XII. GETTING STARTED

### For SOP Owners

1. Read this framework document and `SOP-SYSTEM-INDEX.md`.
2. Review your domain's existing SOPs for alignment and gaps.
3. Propose new SOPs using the process in Section VIII.
4. Ensure your SOPs have clear, measurable success criteria.

### For All Employees

1. Use the `SOP-SYSTEM-INDEX.md` to find the procedure you need.
2. Follow the step-by-step procedure. Do not skip steps.
3. If the SOP is unclear or outdated, file an issue in the `docs/sops/` repository.
4. If you believe an exception is needed, follow the process in Section VII.

---

## XIII. ESCALATION CONTACTS

| Issue                        | Primary Contact                             | Secondary Contact       |
| ---------------------------- | ------------------------------------------- | ----------------------- |
| **SOP needs update**         | SOP Owner (in SOP header)                   | Domain VP               |
| **Exception to SOP**         | SOP Owner                                   | Chief Operating Officer |
| **Conflict between SOPs**    | Chief Operating Officer                     | CEO                     |
| **Urgent operational issue** | On-Call Manager (see `Operations Playbook`) | VP of Operations        |
| **Security breach**          | Chief Security Officer (immediate)          | CEO                     |

---

**Document History:**

- **v2.1.0** (Jan 19, 2026) — Aligned principles with VS-GOV-001, added AI Governance, and synchronized numbering with SOP-SYSTEM-INDEX.
- **v2.0.0** (Jan 18, 2026) — Comprehensive governance framework aligned with Founding Principles.
- **v1.0.0** (Jan 1, 2026) — Initial draft.

**Next Review Date:** July 19, 2026 (6 months)

---

_End of SOP-000. All subsequent SOPs must adhere to this framework._
