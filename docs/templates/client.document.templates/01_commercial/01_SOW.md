---
Document: STATEMENT_OF_WORK
Doc ID: VS-TEMPLATE-COMM-001
Client: [[CLIENT_LEGAL_NAME]]
Project: [[PROJECT_NAME]]
Owner: Account Manager / Legal
Contributors: Project Manager, Solution Architect, Client Stakeholders
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/01_commercial/01_SOW.md
Approvers: [[ACCOUNT_MANAGER]] / [[CLIENT_SPONSOR]] / [[LEGAL_COUNSEL]]
---

# Statement of Work (SOW)

## Purpose
This Statement of Work defines the **legal and commercial framework** for the engagement between Vantus Systems ("Vantus" or "Contractor") and [[CLIENT_LEGAL_NAME]] ("Client"). It establishes the scope of services, deliverables, timelines, payment terms, and responsibilities. This document, once executed, forms a binding agreement between the parties. Use this document to:
- Define project scope, boundaries, and deliverables with precision
- Establish commercial terms including pricing and payment schedules
- Document assumptions, constraints, and dependencies
- Set expectations for both parties regarding responsibilities
- Provide the foundation for change management and dispute resolution

## Instructions
1. **Customization:** Replace all `[[PLACEHOLDERS]]` with project-specific values
2. **Legal Review:** Have legal counsel review before execution
3. **Scope Precision:** Be specific about what is included and excluded
4. **Assumptions:** Document all assumptions that affect scope, timeline, or cost
5. **Signatures:** Obtain authorized signatures from both parties
6. **Version Control:** Maintain version history; all changes via Change Order

---

## 1. PARTIES AND AGREEMENT

### 1.1 Parties to This Agreement

**Contractor:**
- **Legal Name:** Vantus Systems, LLC
- **Address:** [[VANTUS_ADDRESS]]
- **Contact:** [[ACCOUNT_MANAGER_NAME]], Account Manager
- **Email:** [[ACCOUNT_MANAGER_EMAIL]]
- **Phone:** [[ACCOUNT_MANAGER_PHONE]]

**Client:**
- **Legal Name:** [[CLIENT_LEGAL_NAME]]
- **Address:** [[CLIENT_ADDRESS]]
- **Contact:** [[CLIENT_SPONSOR_NAME]], Project Sponsor
- **Email:** [[CLIENT_SPONSOR_EMAIL]]
- **Phone:** [[CLIENT_SPONSOR_PHONE]]

### 1.2 Agreement Structure

This Statement of Work is subject to and incorporates by reference:
- Vantus Systems Master Service Agreement (MSA) dated [[MSA_DATE]]
- Vantus Systems Client Covenant
- Data Processing Addendum (DPA) where applicable
- Any executed Change Orders modifying this SOW

In the event of conflict, the order of precedence is:
1. Executed Change Orders
2. This Statement of Work
3. Data Processing Addendum
4. Master Service Agreement
5. Client Covenant

### 1.3 SOW Information

| Field | Value |
|---|---|
| **SOW Number** | [[SOW-YYYY-NNNN]] |
| **Project Name** | [[PROJECT_NAME]] |
| **SOW Effective Date** | [[2026-02-25]] |
| **SOW Expiration Date** | [[2026-02-25]] or Upon Completion |
| **Contract Type** | [[Fixed Price / Time & Materials / Retainer]] |
| **Total Contract Value** | $[[TOTAL_AMOUNT]] |
| **Currency** | [[USD / EUR / GBP]] |

---

## 2. PROJECT OVERVIEW AND OBJECTIVES

### 2.1 Executive Summary

[[Provide a 2-3 paragraph executive summary of the project. Describe the business problem being solved, the proposed solution at a high level, and the expected outcomes. This section should be understandable by non-technical executives.]]

**Example:**
[[Client requires a modern, independent web application to replace their legacy customer portal. The current system suffers from performance issues, security vulnerabilities, and vendor lock-in that prevents cost optimization. Vantus will design and build a Next.js-based application with complete documentation and knowledge transfer, enabling Client to operate the system independently. The solution emphasizes data full ownership, host portability, and long-term operational independence.]]

### 2.2 Business Objectives

This project will achieve the following business objectives:

1. **[[Objective 1: e.g., Modernize Customer Portal]]**
   - Current State: [[Description of current problem]]
   - Target State: [[Description of desired outcome]]
   - Success Metric: [[Measurable criterion]]

2. **[[Objective 2: e.g., Achieve Data Full Ownership]]**
   - Current State: [[Description of current problem]]
   - Target State: [[Description of desired outcome]]
   - Success Metric: [[Measurable criterion]]

3. **[[Objective 3: e.g., Reduce Operational Costs]]**
   - Current State: [[Description of current problem]]
   - Target State: [[Description of desired outcome]]
   - Success Metric: [[Measurable criterion]]

### 2.3 Project Success Criteria

The project will be considered successful when:

| Criterion | Measurement Method | Target | Verification |
|---|---|---|---|
| [[Criterion 1: e.g., System Performance]] | [[Load testing]] | [[< 2 second page load]] | [[Test report]] |
| [[Criterion 2: e.g., User Adoption]] | [[Analytics]] | [[> 80% user migration]] | [[Usage report]] |
| [[Criterion 3: e.g., Knowledge Transfer]] | [[Completion checklist]] | [[100% handoff items complete]] | [[Handoff sign-off]] |
| [[Criterion 4: e.g., Zero Critical Defects]] | [[Defect tracking]] | [[0 open P1/P2 defects]] | [[QA report]] |

---

## 3. SCOPE OF SERVICES

### 3.1 In-Scope Services

Vantus will provide the following services:

#### 3.1.1 Discovery and Requirements
- Conduct discovery sessions with stakeholders
- Document current state (as-is) processes and systems
- Define future state (to-be) processes and systems
- Elicit, analyze, and document functional requirements
- Elicit, analyze, and document non-functional requirements
- Create user stories and acceptance criteria
- Develop requirements traceability matrix

#### 3.1.2 Architecture and Design
- Develop system architecture (C4 Model: Context, Container, Component, Code)
- Design data models and database schema
- Define API specifications and contracts
- Create integration architecture
- Develop security architecture and threat model
- Produce technical design documentation
- Conduct architecture reviews

#### 3.1.3 Development and Implementation
- Set up development environments and tooling
- Implement frontend components and user interfaces
- Implement backend services and APIs
- Implement database layer and data access
- Develop integration components
- Implement security controls and authentication
- Conduct unit testing and code reviews

#### 3.1.4 Quality Assurance and Testing
- Develop test strategy and test plans
- Create and execute test cases
- Perform functional testing
- Perform integration testing
- Perform security testing
- Perform performance and load testing
- Support User Acceptance Testing (UAT)
- Manage defect tracking and resolution

#### 3.1.5 Deployment and Operations
- Develop deployment automation (CI/CD pipelines)
- Create environment configuration
- Develop monitoring and alerting setup
- Create backup and disaster recovery procedures
- Develop runbooks and operational documentation
- Conduct deployment to production
- Provide post-deployment support

#### 3.1.6 Knowledge Transfer and Enablement
- Deliver Complete Client Documentation Kit documentation
- Conduct training sessions for administrators
- Conduct training sessions for end users
- Provide operator guides and runbooks
- Deliver architecture decision records (ADRs)
- Transfer credentials and access securely
- Conduct handoff sessions

### 3.2 Deliverables

| ID | Deliverable | Description | Format | Due Date | Acceptance Criteria |
|---|---|---|---|---:|---|
| D-001 | Discovery Report | Documented findings from discovery phase | PDF/Markdown | [[Date]] | Approved by Client Sponsor |
| D-002 | Requirements Specification | Complete functional and non-functional requirements | Markdown | [[Date]] | Approved by Product Owner |
| D-003 | Architecture Overview | System architecture documentation and diagrams | Markdown + Diagrams | [[Date]] | Approved by Client IT Lead |
| D-004 | Complete Client Documentation Kit | Complete documentation for independent operation | Markdown/PDF | [[Date]] | All items complete per checklist |
| D-005 | Production Codebase | Source code in Client repository | Git Repository | [[Date]] | All tests passing, code reviewed |
| D-006 | Test Suite | Automated tests and test documentation | Code + Markdown | [[Date]] | > 80% code coverage |
| D-007 | Deployment Automation | CI/CD pipelines and infrastructure as code | Code | [[Date]] | Successfully deploys to production |
| D-008 | Training Materials | User guides, admin guides, training decks | PDF/Video | [[Date]] | Approved by Training Lead |
| D-009 | Handoff Documentation | Credential escrow, BOM, transfer procedures | Encrypted + Markdown | [[Date]] | Secure transfer verified |
| D-010 | Warranty Support | Post-launch support period | Service | [[Date]] | Per Section 8.3 |

### 3.3 Out-of-Scope Items

The following items are explicitly **NOT included** in this SOW:

| Item | Reason | Alternative |
|---|---|---|
| [[e.g., Third-party software licenses]] | [[Client responsibility]] | [[Client to procure directly]] |
| [[e.g., Infrastructure costs]] | [[Variable based on usage]] | [[Client hosting account]] |
| [[e.g., Content creation]] | [[Requires domain expertise]] | [[Client to provide or engage copywriter]] |
| [[e.g., Ongoing maintenance post-warranty]] | [[Separate engagement]] | [[Support agreement available]] |
| [[e.g., Data migration from legacy systems]] | [[Requires additional analysis]] | [[Separate SOW if needed]] |
| [[e.g., Custom mobile applications]] | [[Out of scope for web project]] | [[Separate mobile project]] |

**Note:** Any work not explicitly listed in Section 3.2 (Deliverables) is considered out of scope unless added via Change Order.

---

## 4. PROJECT TIMELINE AND MILESTONES

### 4.1 Project Phases

| Phase | Description | Duration | Start Date | End Date |
|---|---|---:|---|---|
| **Phase 1: Discovery** | Requirements gathering and analysis | [[X]] weeks | [[Date]] | [[Date]] |
| **Phase 2: Design** | Architecture and detailed design | [[X]] weeks | [[Date]] | [[Date]] |
| **Phase 3: Build** | Development and unit testing | [[X]] weeks | [[Date]] | [[Date]] |
| **Phase 4: Test** | QA, UAT, and remediation | [[X]] weeks | [[Date]] | [[Date]] |
| **Phase 5: Deploy** | Production deployment and handoff | [[X]] weeks | [[Date]] | [[Date]] |
| **Phase 6: Warranty** | Post-launch support | [[X]] weeks | [[Date]] | [[Date]] |

**Total Duration:** [[X]] weeks from kickoff to warranty completion

### 4.2 Key Milestones

| Milestone | Description | Target Date | Payment Trigger | Success Criteria |
|---|---|---:|:---:|---|
| M-001 | Project Kickoff | [[Date]] | No | Kickoff meeting completed |
| M-002 | Discovery Complete | [[Date]] | No | Requirements approved |
| M-003 | Design Approved | [[Date]] | Yes (Payment 1) | Architecture signed off |
| M-004 | Development Complete | [[Date]] | No | Feature complete |
| M-005 | UAT Complete | [[Date]] | Yes (Payment 2) | UAT sign-off obtained |
| M-006 | Production Live | [[Date]] | No | System in production |
| M-007 | Project Complete | [[Date]] | Yes (Payment 3) | Final acceptance |

### 4.3 Dependencies and Critical Path

The following dependencies may impact the timeline:

| ID | Dependency | Owner | Impact if Delayed | Mitigation |
|---|---|---:|---|---|
| DEP-001 | [[Client stakeholder availability]] | Client | [[Schedule delay]] | [[Backup resources identified]] |
| DEP-002 | [[Third-party API access]] | Client | [[Integration delay]] | [[Early procurement]] |
| DEP-003 | [[Client infrastructure provisioning]] | Client | [[Deployment delay]] | [[Early requirements provided]] |
| DEP-004 | [[Content and data provision]] | Client | [[Launch delay]] | [[Content calendar established]] |

---

## 5. PRICING AND PAYMENT TERMS

### 5.1 Total Contract Value

| Component | Amount | Notes |
|---|---|---|
| Professional Services | $[[AMOUNT]] | Design, development, testing |
| Project Management | $[[AMOUNT]] | Planning, coordination, reporting |
| Knowledge Transfer | $[[AMOUNT]] | Documentation and training |
| **Subtotal** | **$[[AMOUNT]]** | |
| Expenses (estimated) | $[[AMOUNT]] | Travel, tools, third-party services |
| **Total Contract Value** | **$[[TOTAL_AMOUNT]]** | |

### 5.2 Payment Schedule

| Payment | Milestone | Amount | Due Date | Percentage |
|---|:---:|---:|---|:---:|
| **Payment 1** | Design Approved | $[[AMOUNT]] | [[Date]] | 30% |
| **Payment 2** | UAT Complete | $[[AMOUNT]] | [[Date]] | 40% |
| **Payment 3** | Final Acceptance | $[[AMOUNT]] | [[Date]] | 30% |
| **Total** | | **$[[TOTAL_AMOUNT]]** | | **100%** |

### 5.3 Payment Terms

- **Payment Due:** Net 15 days from invoice date
- **Invoice Timing:** Invoices issued upon milestone completion
- **Payment Method:** ACH transfer or wire
- **Late Payment:** 1.5% monthly service charge on overdue amounts
- **Currency:** All amounts in [[USD]] unless otherwise specified

### 5.4 Expense Policy

Pre-approved expenses will be billed at cost plus [[X]]% administrative fee:
- Travel and accommodation (economy class)
- Third-party software and services required for delivery
- Specialized tools or licenses not in Vantus standard toolkit

Expenses exceeding $[[AMOUNT]] require prior written approval.

---

## 6. ASSUMPTIONS AND CONSTRAINTS

### 6.1 Client Responsibilities

Client agrees to:

1. **Stakeholder Availability:** Provide access to key stakeholders for discovery, review, and approval activities (estimated [[X]] hours per week)
2. **Decision Timeliness:** Provide feedback and decisions within [[5]] business days of request
3. **Content and Data:** Provide all required content, data, and assets by agreed dates
4. **Access and Credentials:** Provide necessary system access, API keys, and credentials within [[5]] business days of request
5. **Facilities:** Provide suitable meeting facilities for on-site workshops if required
6. **Testing Participation:** Allocate appropriate resources for UAT and provide timely feedback
7. **Change Control:** Process change requests through formal Change Order process

### 6.2 Vantus Responsibilities

Vantus agrees to:

1. **Resource Assignment:** Assign qualified personnel to the project and maintain continuity
2. **Communication:** Provide weekly status reports and attend scheduled meetings
3. **Quality:** Deliver work that meets professional standards and acceptance criteria
4. **Documentation:** Provide complete Complete Client Documentation Kit documentation
5. **Knowledge Transfer:** Conduct effective handoff and training sessions
6. **Warranty:** Address defects during warranty period per Section 8.3

### 6.3 Key Assumptions

This SOW is based on the following assumptions:

| ID | Assumption | Impact if Invalid |
|---|---|---|
| ASM-001 | [[Client has authority to approve project scope and budget]] | [[Project delay for additional approvals]] |
| ASM-002 | [[Existing systems have API or data export capabilities]] | [[Additional integration work; cost increase]] |
| ASM-003 | [[Client can provide test data representative of production]] | [[Testing delays; quality risk]] |
| ASM-004 | [[Third-party services remain available and unchanged]] | [[Architecture changes; potential delays]] |
| ASM-005 | [[No major organizational changes during project]] | [[Scope disruption; timeline impact]] |

If any assumption proves invalid, the parties will negotiate in good faith regarding scope, timeline, and cost adjustments.

### 6.4 Constraints

| ID | Constraint | Impact |
|---|---|---|
| CON-001 | [[Project must complete by specific date]] | [[May require scope prioritization]] |
| CON-002 | [[Must use Client's existing technology stack]] | [[Limits technology choices]] |
| CON-003 | [[Data must remain in specific geographic region]] | [[Affects hosting options]] |
| CON-004 | [[Must integrate with existing legacy system]] | [[Integration complexity]] |

---

## 7. INTELLECTUAL PROPERTY AND OWNERSHIP

### 7.1 Work Product Ownership

Upon final payment:

- Client owns all **Custom Work Product** created specifically for this project
- Custom Work Product includes: source code, documentation, designs, configurations
- Vantus assigns all rights, title, and interest in Custom Work Product to Client
- Vantus retains the right to use general knowledge, skills, and experience gained

### 7.2 Pre-Existing Materials

- Vantus retains ownership of **Pre-Existing Materials** (tools, frameworks, libraries)
- Client receives perpetual, royalty-free license to use Pre-Existing Materials
- Pre-Existing Materials used will be open-source or properly licensed

### 7.3 Third-Party Materials

- Client is responsible for licensing third-party software and services
- Vantus will identify required third-party licenses in documentation
- Client indemnifies Vantus for third-party license violations

### 7.4 Host Portability

Vantus designs all systems for **Portability by Default**:
- No proprietary cloud services that create vendor lock-in
- Standard containerization (Docker) for deployment flexibility
- Database schemas in standard formats (Prisma/PostgreSQL)
- Environment configuration via standard `.env` patterns

See [04_OWNERSHIP_PORTABILITY.md](./04_OWNERSHIP_PORTABILITY.md) for complete terms.

---

## 8. WARRANTIES AND SUPPORT

### 8.1 Quality Warranty

Vantus warrants that:
- Services will be performed in a professional manner
- Deliverables will conform to specifications and acceptance criteria
- Code will be free from material defects for the warranty period

### 8.2 Warranty Period

- **Duration:** [[90]] days from Final Acceptance
- **Coverage:** Material defects in deliverables
- **Exclusions:** Issues caused by Client modifications, third-party changes, or misuse

### 8.3 Warranty Support

During the warranty period, Vantus will:
- Respond to defect reports within [[2]] business days
- Provide fixes for confirmed defects at no additional cost
- Provide reasonable support for questions and clarifications

### 8.4 Post-Warranty Support

After warranty expiration, support is available under separate agreement:
- Support packages available: Basic, Standard, Premium
- See [05_SLA_AND_SUPPORT_TERMS.md](./05_SLA_AND_SUPPORT_TERMS.md) for details

---

## 9. CHANGE MANAGEMENT

### 9.1 Change Order Process

Any changes to scope, timeline, or cost require a formal Change Order:

1. **Request:** Either party may request a change in writing
2. **Impact Analysis:** Vantus will assess impact on scope, schedule, and cost within [[3]] business days
3. **Decision:** Client approves or rejects the Change Order
4. **Implementation:** Changes implemented only after written approval

### 9.2 Change Order Template

See [03_CHANGE_ORDER.md](./03_CHANGE_ORDER.md) for the Change Order template.

### 9.3 No Oral Modifications

No oral or informal modifications to this SOW are binding. All changes must be documented in a signed Change Order.

---

## 10. TERMINATION

### 10.1 Termination for Convenience

Either party may terminate this SOW with [[30]] days written notice. Upon termination:
- Client pays for all work completed and expenses incurred through termination date
- Vantus delivers all completed work product to Client
- Client receives pro-rata refund of any prepaid amounts for uncompleted work

### 10.2 Termination for Cause

Either party may terminate immediately for material breach if:
- The other party fails to cure a material breach within [[15]] days of written notice
- The other party becomes insolvent or files for bankruptcy

### 10.3 Effect of Termination

Upon termination:
- All licenses granted by Vantus survive termination
- Confidentiality obligations survive termination
- Payment obligations for work completed survive termination

---

## 11. CONFIDENTIALITY AND DATA PROTECTION

### 11.1 Confidentiality

Both parties agree to maintain confidentiality of proprietary information disclosed during the project.

### 11.2 Data Protection

- Vantus will process personal data per the Data Processing Addendum (DPA)
- Vantus implements appropriate technical and organizational security measures
- Data breaches will be reported per DPA requirements

See [06_DATA_PROCESSING_ADDENDUM.md](./06_DATA_PROCESSING_ADDENDUM.md) for complete terms.

---

## 12. LIMITATION OF LIABILITY

### 12.1 Limitation

Except for breach of confidentiality, indemnification obligations, or either party's gross negligence or willful misconduct:

- Vantus' liability is limited to the total amount paid by Client under this SOW
- Neither party is liable for indirect, incidental, consequential, or punitive damages
- Neither party is liable for lost profits or lost data

### 12.2 Indemnification

Each party will indemnify the other against third-party claims arising from:
- The indemnifying party's breach of this SOW
- The indemnifying party's negligence or willful misconduct
- The indemnifying party's violation of applicable laws

---

## 13. GENERAL PROVISIONS

### 13.1 Governing Law

This SOW is governed by the laws of [[STATE/COUNTRY]], without regard to conflict of laws principles.

### 13.2 Dispute Resolution

Any disputes will be resolved through:
1. Good faith negotiation between executives
2. Mediation if negotiation fails within [[30]] days
3. Binding arbitration in [[LOCATION]] if mediation fails

### 13.3 Force Majeure

Neither party is liable for delays caused by events beyond reasonable control (natural disasters, war, pandemic, etc.).

### 13.4 Assignment

Neither party may assign this SOW without prior written consent, except to affiliates or successors in a merger.

### 13.5 Entire Agreement

This SOW constitutes the entire agreement between parties regarding the project and supersedes all prior agreements.

### 13.6 Severability

If any provision is found unenforceable, the remaining provisions remain in effect.

### 13.7 Waiver

Failure to enforce any provision does not constitute a waiver of that provision.

### 13.8 Notices

All notices must be in writing and delivered to the addresses in Section 1.1.

---

## 14. SIGNATURES

By signing below, the parties agree to the terms of this Statement of Work.

**For Vantus Systems:**

| Role | Name | Signature | Date |
|---|---|---|---|
| Authorized Signatory | [[NAME]] | _________________________ | [[DATE]] |
| Title | [[TITLE]] | | |

**For [[CLIENT_LEGAL_NAME]]:**

| Role | Name | Signature | Date |
|---|---|---|---|
| Authorized Signatory | [[NAME]] | _________________________ | [[DATE]] |
| Title | [[TITLE]] | | |

---

## 15. RELATED DOCUMENTS

| Document | Relationship | Location |
|---|---|---|
| [02_PRICING_MODEL.md](./02_PRICING_MODEL.md) | Detailed pricing breakdown | Current directory |
| [03_CHANGE_ORDER.md](./03_CHANGE_ORDER.md) | Change management process | Current directory |
| [04_OWNERSHIP_PORTABILITY.md](./04_OWNERSHIP_PORTABILITY.md) | IP and portability terms | Current directory |
| [05_SLA_AND_SUPPORT_TERMS.md](./05_SLA_AND_SUPPORT_TERMS.md) | Support and maintenance terms | Current directory |
| [06_DATA_PROCESSING_ADDENDUM.md](./06_DATA_PROCESSING_ADDENDUM.md) | Data protection terms | Current directory |
| [02_ASSUMPTIONS_CONSTRAINTS.md](../00_master/02_ASSUMPTIONS_CONSTRAINTS.md) | Detailed assumptions log | Master directory |

---

## 16. QUALITY CHECKLIST

Before executing this SOW, verify:

- [ ] All `[[PLACEHOLDERS]]` replaced with actual project values
- [ ] Legal names and addresses verified
- [ ] Scope description is specific and unambiguous
- [ ] Deliverables table is complete with acceptance criteria
- [ ] Out-of-scope items explicitly documented
- [ ] Timeline is realistic with buffer for dependencies
- [ ] Payment schedule aligns with cash flow needs
- [ ] All assumptions documented with impact analysis
- [ ] Client responsibilities clearly defined
- [ ] IP ownership terms reviewed by legal
- [ ] Warranty terms are appropriate
- [ ] Termination clauses are balanced
- [ ] Liability caps are reasonable
- [ ] Related documents are cross-referenced
- [ ] Legal counsel has reviewed and approved
- [ ] Authorized signatories identified
- [ ] Version history initialized

---

## 17. CHANGE HISTORY

| Date | Version | Author | Summary |
|---|---:|---|---|
| 2026-02-02 | 1.0.0 | Technical Writer | Complete rewrite with comprehensive commercial framework, detailed scope, milestone-based payments, and legal protections (2,800+ words) |
| 2026-01-18 | 0.1.0 | Vantus Systems | Initial template creation |

---

*Vantus Systems: Engineering Independence.*
*Last Updated: 2026-02-09 | Version 1.0.0 | Status: Template*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
