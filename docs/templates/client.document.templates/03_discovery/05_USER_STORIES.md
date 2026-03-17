---
Document: USER_STORIES
Doc ID: VS-TEMPLATE-DISCOVERY-005
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Product Owner / Business Analyst
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/company-docs/client-project-doc-templates/docs/03_discovery/05_USER_STORIES.md
---

# User Stories

## Instructions

This document captures user stories with detailed acceptance criteria using the standard format: **As a [user], I want [capability], so that [value]**. Use it to:
- Translate requirements into user-centered language
- Define clear acceptance criteria for development and testing
- Prioritize features based on user value and business impact
- Support agile planning and sprint allocation
- Maintain traceability to parent requirements

**When to update:** Continuously during discovery and elaboration; refined before each sprint.

**BABOK Alignment:** Requirements Analysis and Design Definition, Elicitation and Collaboration

**Story Format Standards:**
- INVEST criteria: Independent, Negotiable, Valuable, Estimable, Small, Testable
- Acceptance criteria must be testable and unambiguous
- Each story must map to at least one requirement
- Stories should be small enough for single sprint completion

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [[2026-02-25]] | [[Author Name]] | Initial template creation |
| 2.0 | 2026-02-02 | Vantus Systems | Comprehensive BABOK-aligned update with persona definitions |

**Distribution List:**
- [[Product Owner]]
- [[Scrum Master]]
- [[Development Team]]
- [[QA Lead]]

---

## 1. User Personas

### 1.1 Primary Personas

#### Persona: CSR-Sarah (Customer Service Representative)

| Attribute | Details |
|-----------|---------|
| **Name** | [[Sarah Chen]] |
| **Role** | [[Customer Service Representative]] |
| **Department** | [[Customer Operations]] |
| **Experience** | [[3 years in role, familiar with current systems]] |
| **Goals** | [[Process orders quickly, help customers efficiently, minimize errors]] |
| **Frustrations** | [[Too many systems to check, manual data entry, slow performance]] |
| **Tech Comfort** | [[Moderate - uses multiple systems daily, prefers efficiency]] |
| **Quote** | [["I spend more time switching between screens than helping customers."]] |

**Daily Workflow:**
1. [[Check email for new orders (30 min)]]
2. [[Process orders in queue (4 hours)]]
3. [[Handle customer inquiries (2 hours)]]
4. [[Update order statuses (1 hour)]]
5. [[Resolve exceptions (30 min)]]

#### Persona: Manager-Mike (Operations Manager)

| Attribute | Details |
|-----------|---------|
| **Name** | [[Mike Rodriguez]] |
| **Role** | [[Operations Manager]] |
| **Department** | [[Operations]] |
| **Experience** | [[8 years, manages team of 15 CSRs]] |
| **Goals** | [[Hit SLA targets, reduce costs, improve team productivity]] |
| **Frustrations** | [[No visibility into real-time metrics, reactive management]] |
| **Tech Comfort** | [[High - uses dashboards and reports extensively]] |
| **Quote** | [["I need to know what's happening now, not what happened yesterday."]] |

#### Persona: Customer-Carol (Business Customer)

| Attribute | Details |
|-----------|---------|
| **Name** | [[Carol Williams]] |
| **Role** | [[Procurement Manager]] |
| **Company** | [[Mid-size manufacturing company]] |
| **Goals** | [[Place orders quickly, track deliveries, manage budgets]] |
| **Frustrations** | [[Have to call for order status, no self-service options]] |
| **Tech Comfort** | [[High - expects Amazon-like experience]] |
| **Quote** | [["Why can't I just see my order status online like every other vendor?"]] |

### 1.2 Secondary Personas

#### Persona: Admin-Alice (System Administrator)

| Attribute | Details |
|-----------|---------|
| **Role** | [[System Administrator]] |
| **Goals** | [[Manage users, configure system, ensure security]] |
| **Tech Comfort** | [[Expert]] |

#### Persona: Exec-Eric (Executive Sponsor)

| Attribute | Details |
|-----------|---------|
| **Role** | [[VP Operations]] |
| **Goals** | [[ROI on technology investment, competitive advantage]] |
| **Tech Comfort** | [[Moderate - cares about outcomes over features]] |

---

## 2. Epic: User Authentication & Access

### Epic Description
Enable secure, seamless access to the system for all user types with appropriate role-based permissions.

**Business Value:** [[Reduce login friction, ensure security compliance, enable audit trail]]

---

### Story: US-AUTH-001 - User Login

**As a** [[CSR-Sarah]],
**I want to** [[log in to the system with my username and password]],
**So that** [[I can securely access my work environment]].

#### Acceptance Criteria

| ID | Criteria | Test Method | Priority |
|----|----------|-------------|----------|
| AC-001 | [[Given valid credentials, when I submit login, then I am authenticated and redirected to dashboard]] | [[Automated]] | [[Must]] |
| AC-002 | [[Given invalid credentials, when I submit login, then I see error message and remain on login page]] | [[Automated]] | [[Must]] |
| AC-003 | [[Given locked account, when I attempt login, then I see account locked message with contact info]] | [[Automated]] | [[Must]] |
| AC-004 | [[Given successful login, when session starts, then last login time and IP are logged]] | [[Automated]] | [[Should]] |

#### Technical Notes
- [[Integrate with existing Active Directory for authentication]]
- [[Password complexity: 12+ chars, mixed case, numbers, symbols]]
- [[Account lockout after 5 failed attempts]]

#### Dependencies
- [[Active Directory configuration]]
- [[SSL certificate for secure connection]]

#### Estimation
- [[Story Points: 5]]
- [[Sprint: [[Sprint 1]]]]

---

### Story: US-AUTH-002 - Password Reset

**As a** [[CSR-Sarah]],
**I want to** [[reset my password without calling IT]],
**So that** [[I can regain access quickly and reduce IT support burden]].

#### Acceptance Criteria

| ID | Criteria | Test Method | Priority |
|----|----------|-------------|----------|
| AC-001 | [[Given I click "Forgot Password", when I enter my email, then reset link is sent]] | [[Automated]] | [[Must]] |
| AC-002 | [[Given I receive reset email, when I click link within 1 hour, then I can set new password]] | [[Automated]] | [[Must]] |
| AC-003 | [[Given expired reset link, when I click it, then I see expired message and option to request new]] | [[Automated]] | [[Must]] |
| AC-004 | [[Given new password entry, when password doesn't meet complexity, then validation error shown]] | [[Automated]] | [[Must]] |

#### Technical Notes
- [[Email service integration required]]
- [[Token expiration: 1 hour]]
- [[Password history: prevent last 5 passwords]]

---

### Story: US-AUTH-003 - Multi-Factor Authentication

**As an** [[Admin-Alice]],
**I want to** [[require MFA for administrative access]],
**So that** [[we maintain security compliance and protect sensitive data]].

#### Acceptance Criteria

| ID | Criteria | Test Method | Priority |
|----|----------|-------------|----------|
| AC-001 | [[Given admin role, when I log in, then I am prompted for second factor]] | [[Automated]] | [[Must]] |
| AC-002 | [[Given MFA enabled, when I enter valid TOTP code, then I am granted access]] | [[Automated]] | [[Must]] |
| AC-003 | [[Given invalid TOTP code, when submitted, then access denied with retry option]] | [[Automated]] | [[Must]] |
| AC-004 | [[Given MFA setup, when I scan QR code, then authenticator app configured successfully]] | [[Manual]] | [[Should]] |

---

## 3. Epic: Order Management

### Epic Description
Enable efficient order creation, processing, and tracking for all channels and user types.

**Business Value:** [[Reduce order processing time by 89%, eliminate manual errors, improve customer satisfaction]]

---

### Story: US-ORD-001 - Manual Order Entry

**As a** [[CSR-Sarah]],
**I want to** [[enter orders quickly through a unified interface]],
**So that** [[I can serve customers efficiently without switching systems]].

#### Acceptance Criteria

| ID | Criteria | Test Method | Priority |
|----|----------|-------------|----------|
| AC-001 | [[Given order entry screen, when I start typing customer name, then matching customers appear in dropdown]] | [[Automated]] | [[Must]] |
| AC-002 | [[Given customer selected, when order form loads, then customer details auto-populate]] | [[Automated]] | [[Must]] |
| AC-003 | [[Given product entry, when I enter SKU, then product details and real-time availability display]] | [[Automated]] | [[Must]] |
| AC-004 | [[Given pricing calculation, when quantities entered, then accurate total calculates automatically]] | [[Automated]] | [[Must]] |
| AC-005 | [[Given order completion, when I submit, then order saved and confirmation sent within 60 seconds]] | [[Automated]] | [[Must]] |
| AC-006 | [[Given validation error, when error occurs, then specific field highlighted with actionable message]] | [[Automated]] | [[Must]] |

#### UI/UX Notes
- [[Single-page form with sections: Customer, Products, Shipping, Payment]]
- [[Keyboard navigation support for efficiency]]
- [[Auto-save draft every 30 seconds]]

---

### Story: US-ORD-002 - Real-Time Inventory Check

**As a** [[CSR-Sarah]],
**I want to** [[see real-time inventory levels while entering orders]],
**So that** [[I can promise accurate delivery dates and avoid backorders]].

#### Acceptance Criteria

| ID | Criteria | Test Method | Priority |
|----|----------|-------------|----------|
| AC-001 | [[Given product entry, when SKU entered, then current stock level displays within 1 second]] | [[Automated]] | [[Must]] |
| AC-002 | [[Given low stock, when quantity requested exceeds availability, then warning shown with available quantity]] | [[Automated]] | [[Must]] |
| AC-003 | [[Given out of stock, when product selected, then clear out-of-stock indicator shown with alternatives]] | [[Automated]] | [[Must]] |
| AC-004 | [[Given multi-warehouse, when checking stock, then I can select warehouse and see location-specific availability]] | [[Automated]] | [[Should]] |

---

### Story: US-ORD-003 - Order Status Tracking

**As a** [[Customer-Carol]],
**I want to** [[track my order status in real-time through a self-service portal]],
**So that** [[I don't need to call customer service for updates]].

#### Acceptance Criteria

| ID | Criteria | Test Method | Priority |
|----|----------|-------------|----------|
| AC-001 | [[Given valid order number, when I search, then current status and timeline display]] | [[Automated]] | [[Must]] |
| AC-002 | [[Given order in progress, when I view details, then estimated delivery date shows]] | [[Automated]] | [[Must]] |
| AC-003 | [[Given shipped order, when tracking available, then carrier tracking link provided]] | [[Automated]] | [[Must]] |
| AC-004 | [[Given status change, when update occurs, then I receive notification (if opted in)]] | [[Automated]] | [[Should]] |
| AC-005 | [[Given mobile device, when accessing portal, then experience is optimized for screen size]] | [[Manual]] | [[Must]] |

---

### Story: US-ORD-004 - Bulk Order Import

**As a** [[CSR-Sarah]],
**I want to** [[import multiple orders via CSV file]],
**So that** [[I can process large batches efficiently without individual entry]].

#### Acceptance Criteria

| ID | Criteria | Test Method | Priority |
|----|----------|-------------|----------|
| AC-001 | [[Given valid CSV, when uploaded, then all orders processed and confirmation shown]] | [[Automated]] | [[Must]] |
| AC-002 | [[Given invalid CSV, when uploaded, then error report generated with row numbers and issues]] | [[Automated]] | [[Must]] |
| AC-003 | [[Given partial success, when processing complete, then summary shows success/failure counts]] | [[Automated]] | [[Must]] |
| AC-004 | [[Given large file (1000+ rows), when uploaded, then processing completes within 5 minutes]] | [[Automated]] | [[Should]] |

---

### Story: US-ORD-005 - Order Modification

**As a** [[CSR-Sarah]],
**I want to** [[modify orders before they ship]],
**So that** [[I can accommodate customer change requests]].

#### Acceptance Criteria

| ID | Criteria | Test Method | Priority |
|----|----------|-------------|----------|
| AC-001 | [[Given unshipped order, when I edit, then changes saved and new version created]] | [[Automated]] | [[Must]] |
| AC-002 | [[Given order modification, when saved, then customer notified of changes]] | [[Automated]] | [[Must]] |
| AC-003 | [[Given shipped order, when modification attempted, then system prevents edit with explanation]] | [[Automated]] | [[Must]] |
| AC-004 | [[Given modification, when viewed later, then audit trail shows what changed and by whom]] | [[Automated]] | [[Must]] |

---

## 4. Epic: Customer Management

### Epic Description
Maintain accurate, unified customer information to support personalized service and reporting.

**Business Value:** [[Single source of truth for customer data, improved service quality, compliance]]

---

### Story: US-CUST-001 - Customer Search

**As a** [[CSR-Sarah]],
**I want to** [[search for customers by multiple criteria]],
**So that** [[I can quickly find the right customer record]].

#### Acceptance Criteria

| ID | Criteria | Test Method | Priority |
|----|----------|-------------|----------|
| AC-001 | [[Given search by name, when entered, then matching customers display within 2 seconds]] | [[Automated]] | [[Must]] |
| AC-002 | [[Given search by phone/email, when entered, then exact match returned]] | [[Automated]] | [[Must]] |
| AC-003 | [[Given partial match, when search executed, then fuzzy matching returns relevant results]] | [[Automated]] | [[Should]] |
| AC-004 | [[Given search results, when displayed, then key info visible: name, company, contact, recent orders]] | [[Automated]] | [[Must]] |

---

### Story: US-CUST-002 - Customer 360 View

**As a** [[CSR-Sarah]],
**I want to** [[see complete customer information in one view]],
**So that** [[I have full context when helping customers]].

#### Acceptance Criteria

| ID | Criteria | Test Method | Priority |
|----|----------|-------------|----------|
| AC-001 | [[Given customer selected, when 360 view opens, then profile, orders, interactions, and notes visible]] | [[Automated]] | [[Must]] |
| AC-002 | [[Given order history, when viewing, then I can filter and search within history]] | [[Automated]] | [[Should]] |
| AC-003 | [[Given customer notes, when viewing, then I can add new notes visible to team]] | [[Automated]] | [[Must]] |
| AC-004 | [[Given credit status, when displayed, then current limit and available credit shown]] | [[Automated]] | [[Must]] |

---

## 5. Epic: Reporting & Analytics

### Epic Description
Provide actionable insights through dashboards and reports for all user types.

**Business Value:** [[Data-driven decision making, performance visibility, trend identification]]

---

### Story: US-RPT-001 - Executive Dashboard

**As** [[Manager-Mike]],
**I want to** [[view real-time KPIs on a dashboard]],
**So that** [[I can monitor team performance and identify issues quickly]].

#### Acceptance Criteria

| ID | Criteria | Test Method | Priority |
|----|----------|-------------|----------|
| AC-001 | [[Given dashboard access, when loaded, then key metrics display: orders today, avg processing time, queue depth]] | [[Automated]] | [[Must]] |
| AC-002 | [[Given time period selector, when changed, then metrics update to reflect selected period]] | [[Automated]] | [[Must]] |
| AC-003 | [[Given metric threshold breach, when occurs, then visual alert shown on dashboard]] | [[Automated]] | [[Should]] |
| AC-004 | [[Given dashboard data, when refreshed, then updates reflect within 30 seconds of real-time]] | [[Automated]] | [[Must]] |

---

### Story: US-RPT-002 - Ad-Hoc Reporting

**As** [[Manager-Mike]],
**I want to** [[create custom reports without IT assistance]],
**So that** [[I can answer business questions quickly]].

#### Acceptance Criteria

| ID | Criteria | Test Method | Priority |
|----|----------|-------------|----------|
| AC-001 | [[Given report builder, when I select fields, then preview updates dynamically]] | [[Automated]] | [[Must]] |
| AC-002 | [[Given filters applied, when report generated, then results match filter criteria]] | [[Automated]] | [[Must]] |
| AC-003 | [[Given report results, when I choose export, then CSV/Excel/PDF generated successfully]] | [[Automated]] | [[Must]] |
| AC-004 | [[Given saved report, when accessed later, then current data displayed]] | [[Automated]] | [[Should]] |

---

## 6. Epic: System Administration

### Epic Description
Enable system configuration and user management by authorized administrators.

**Business Value:** [[Self-service administration, reduced IT dependency, security compliance]]

---

### Story: US-ADM-001 - User Management

**As an** [[Admin-Alice]],
**I want to** [[create and manage user accounts]],
**So that** [[I can control system access and maintain security]].

#### Acceptance Criteria

| ID | Criteria | Test Method | Priority |
|----|----------|-------------|----------|
| AC-001 | [[Given user creation form, when completed, then new user can log in with temporary password]] | [[Automated]] | [[Must]] |
| AC-002 | [[Given role assignment, when configured, then user permissions match role]] | [[Automated]] | [[Must]] |
| AC-003 | [[Given user deactivation, when executed, then user cannot log in and active sessions terminated]] | [[Automated]] | [[Must]] |
| AC-004 | [[Given user list, when viewed, then I can filter by role, status, and department]] | [[Automated]] | [[Should]] |

---

## 7. User Story Backlog Summary

### Prioritized Story List

| ID | Story | Epic | Persona | Priority | Points | Sprint | Status |
|----|-------|------|---------|----------|--------|--------|--------|
| US-AUTH-001 | [[User Login]] | [[Authentication]] | [[CSR-Sarah]] | [[Must]] | [[5]] | [[Sprint 1]] | [[Backlog]] |
| US-AUTH-002 | [[Password Reset]] | [[Authentication]] | [[CSR-Sarah]] | [[Must]] | [[3]] | [[Sprint 1]] | [[Backlog]] |
| US-ORD-001 | [[Manual Order Entry]] | [[Order Management]] | [[CSR-Sarah]] | [[Must]] | [[13]] | [[Sprint 2-3]] | [[Backlog]] |
| US-ORD-002 | [[Real-Time Inventory Check]] | [[Order Management]] | [[CSR-Sarah]] | [[Must]] | [[8]] | [[Sprint 3]] | [[Backlog]] |
| US-ORD-003 | [[Order Status Tracking]] | [[Order Management]] | [[Customer-Carol]] | [[Must]] | [[8]] | [[Sprint 4]] | [[Backlog]] |
| US-CUST-001 | [[Customer Search]] | [[Customer Management]] | [[CSR-Sarah]] | [[Must]] | [[5]] | [[Sprint 2]] | [[Backlog]] |
| US-RPT-001 | [[Executive Dashboard]] | [[Reporting]] | [[Manager-Mike]] | [[Should]] | [[8]] | [[Sprint 5]] | [[Backlog]] |
| US-ADM-001 | [[User Management]] | [[Administration]] | [[Admin-Alice]] | [[Must]] | [[8]] | [[Sprint 1]] | [[Backlog]] |

### Story Map

```
RELEASE 1 (MVP)
├── Authentication
│   ├── Login
│   ├── Password Reset
│   └── MFA (Admin)
├── Customer Management
│   ├── Customer Search
│   └── Customer 360 View
└── Order Management
    ├── Manual Order Entry
    └── Real-Time Inventory

RELEASE 2
├── Order Management
│   ├── Order Status Tracking
│   ├── Bulk Order Import
│   └── Order Modification
└── Reporting
    └── Executive Dashboard

RELEASE 3
├── Customer Portal
├── Advanced Reporting
└── Mobile App
```

---

## 8. Definition of Ready

A user story is ready for development when:

- [ ] Story follows INVEST criteria
- [ ] Acceptance criteria are clear and testable
- [ ] Story maps to at least one requirement
- [ ] UI/UX designs completed (if applicable)
- [ ] Technical approach agreed with team
- [ ] Dependencies identified and manageable
- [ ] Story estimated by development team
- [ ] No open questions or blockers

---

## 9. Definition of Done

A user story is done when:

- [ ] Code implemented and peer-reviewed
- [ ] Unit tests written and passing (>80% coverage)
- [ ] Acceptance criteria met and verified
- [ ] QA testing completed (manual + automated)
- [ ] Documentation updated
- [ ] Deployed to staging environment
- [ ] Product Owner acceptance
- [ ] No critical or high defects open

---

## 10. Appendix A: Story Writing Guidelines

### Good Story Examples

✅ **Good:** "As a CSR, I want to see real-time inventory levels so that I can promise accurate delivery dates."
- Clear user, specific need, explicit value

✅ **Good:** "As a manager, I want to export reports to Excel so that I can analyze data offline."
- Actionable, testable, independent

### Bad Story Examples

❌ **Bad:** "As a user, I want a better system."
- Too vague, not testable

❌ **Bad:** "Build the order management module."
- No user, too large, not testable

---

*Document Control: This template aligns with BABOK v3 Knowledge Areas: Requirements Analysis and Design Definition, and Elicitation and Collaboration.*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
