---
Document: PRIORITIZATION_FRAMEWORK
Doc ID: VS-TEMPLATE-DISCOVERY-006
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Product Owner / Business Analyst
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/company-docs/client-project-doc-templates/docs/03_discovery/06_PRIORITIZATION.md
---

# Prioritization Framework

## Instructions

This document establishes the prioritization methodology and captures prioritized requirements, features, and user stories. Use it to:
- Apply consistent prioritization criteria across all requirements
- Align stakeholders on feature importance and sequencing
- Support release planning and roadmap development
- Make transparent, defensible prioritization decisions
- Balance business value, technical effort, and risk

**When to update:** During discovery for initial prioritization; refined throughout elaboration and before each release.

**BABOK Alignment:** Requirements Analysis and Design Definition, Strategy Analysis

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [[2026-02-25]] | [[Author Name]] | Initial template creation |
| 2.0 | 2026-02-02 | Vantus Systems | Comprehensive BABOK-aligned update with WSJF and MoSCoW frameworks |

**Distribution List:**
- [[Executive Sponsor]]
- [[Product Owner]]
- [[Solution Architect]]
- [[Development Team Lead]]

---

## 1. Prioritization Methodology

### 1.1 Method Selection

**Primary Method:** [[Select one based on project context]]

| Method | Best For | Complexity | Stakeholder Alignment |
|--------|----------|------------|----------------------|
| **MoSCoW** | [[Clear business priorities, fixed scope]] | [[Low]] | [[Easy to understand]] |
| **WSJF** | [[Value stream optimization, SAFe environments]] | [[Medium]] | [[Requires training]] |
| **RICE** | [[Data-driven product decisions]] | [[Medium]] | [[Requires metrics]] |
| **Kano Model** | [[Feature differentiation, innovation]] | [[High]] | [[Qualitative analysis]] |
| **Value vs. Effort** | [[Quick prioritization, small teams]] | [[Low]] | [[Visual, intuitive]] |

**Selected Method for This Project:** [[MoSCoW + WSJF Hybrid]]

**Rationale:** [[MoSCoW provides clear business prioritization; WSJF ensures optimal sequencing for value delivery]]

### 1.2 Prioritization Criteria

| Criterion | Weight | Description | Measurement |
|-----------|--------|-------------|-------------|
| **Business Value** | [[30%]] | [[Revenue impact, cost savings, strategic alignment]] | [[$ value or score 1-10]] |
| **User Impact** | [[25%]] | [[Number of users affected, severity of pain point]] | [[User count × severity]] |
| **Urgency** | [[20%]] | [[Time sensitivity, regulatory deadlines, competitive pressure]] | [[Days until impact]] |
| **Technical Risk** | [[15%]] | [[Implementation complexity, uncertainty, dependencies]] | [[Risk score 1-10]] |
| **Effort** | [[10%]] | [[Development time, resources required]] | [[Story points or person-days]] |

### 1.3 Prioritization Process

```
┌─────────────────────────────────────────────────────────────────┐
│                    PRIORITIZATION WORKFLOW                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 1: GATHER                                                  │
│  ├── Collect all requirements from discovery                     │
│  ├── Ensure each has unique ID                                   │
│  └── Document business context                                   │
│                           ↓                                      │
│  Step 2: EVALUATE                                                │
│  ├── Score each requirement against criteria                     │
│  ├── Involve cross-functional team                               │
│  └── Document rationale                                          │
│                           ↓                                      │
│  Step 3: CALCULATE                                               │
│  ├── Apply weighting formula                                     │
│  ├── Calculate WSJF scores (if applicable)                       │
│  └── Rank by final score                                         │
│                           ↓                                      │
│  Step 4: VALIDATE                                                │
│  ├── Review with stakeholders                                    │
│  ├── Adjust for dependencies                                     │
│  └── Resolve conflicts                                           │
│                           ↓                                      │
│  Step 5: COMMUNICATE                                             │
│  ├── Publish prioritized list                                    │
│  ├── Document decisions                                          │
│  └── Set review cadence                                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. MoSCoW Prioritization

### 2.1 MoSCoW Definitions

| Priority | Definition | Criteria | Implication |
|----------|------------|----------|-------------|
| **MUST** | [[Non-negotiable requirements critical for launch]] | [[Legal/regulatory compliance, core business function, blocker for other features]] | [[Will be delivered; if not possible, project scope changes]] |
| **SHOULD** | [[Important but not critical; can be deferred if necessary]] | [[Significant business value, user pain point, but workarounds exist]] | [[Will be delivered if time/resources permit]] |
| **COULD** | [[Desirable but least critical; nice to have]] | [[Enhancement, convenience feature, low user impact]] | [[Delivered only if time permits after Must/Should]] |
| **WON'T** | [[Explicitly excluded from current scope]] | [[Out of scope, future phase, deprioritized]] | [[Not delivered; may be reconsidered later]] |

### 2.2 MoSCoW Decision Framework

**Must Have Checklist:**
- [ ] Is this required for legal/regulatory compliance?
- [ ] Is this required for system security?
- [ ] Does this enable core business functionality?
- [ ] Will absence cause project failure?
- [ ] Are there no acceptable workarounds?

**Should Have Checklist:**
- [ ] Is there significant business value?
- [ ] Does this address a major pain point?
- [ ] Is there a workaround, though burdensome?
- [ ] Would absence cause user dissatisfaction?

**Could Have Checklist:**
- [ ] Is this a convenience or enhancement?
- [ ] Is user impact minimal?
- [ ] Can users succeed without this?
- [ ] Is this a "nice to have"?

### 2.3 MoSCoW Prioritized Requirements

#### MUST HAVE

| ID | Requirement | Business Justification | User Impact | Risk if Omitted |
|----|-------------|----------------------|-------------|-----------------|
| M-001 | [[User authentication and authorization]] | [[Security compliance, access control]] | [[All users]] | [[System unusable]] |
| M-002 | [[Order entry and validation]] | [[Core business function]] | [[CSRs, Customers]] | [[Cannot process orders]] |
| M-003 | [[Real-time inventory visibility]] | [[Prevents stock-outs, enables accurate promises]] | [[CSRs, Customers]] | [[High error rate continues]] |
| M-004 | [[ERP integration for order sync]] | [[Financial recording, compliance]] | [[Finance, Operations]] | [[Revenue not recorded]] |
| M-005 | [[Basic reporting and dashboards]] | [[Operational visibility]] | [[Management]] | [[Blind operations]] |
| M-006 | [[Data encryption and security]] | [[Compliance, customer trust]] | [[All users]] | [[Legal/regulatory risk]] |
| M-007 | [[Audit trail for all transactions]] | [[Compliance, dispute resolution]] | [[Compliance, Audit]] | [[Audit failure]] |
| M-008 | [[Customer self-service portal]] | [[Reduces CSR workload, 24/7 availability]] | [[Customers]] | [[Competitive disadvantage]] |

**Must Have Summary:**
- Count: [[8 requirements]]
- Estimated Effort: [[240 story points]]
- Business Value: [[$1.2M annual]]
- Risk if Cut: [[Project failure, compliance violations]]

#### SHOULD HAVE

| ID | Requirement | Business Justification | User Impact | Workaround |
|----|-------------|----------------------|-------------|------------|
| S-001 | [[Bulk order import via CSV]] | [[Efficiency for large orders]] | [[CSRs]] | [[Manual entry (slower)]] |
| S-002 | [[Advanced search and filtering]] | [[Improved productivity]] | [[CSRs]] | [[Basic search (less efficient)]] |
| S-003 | [[Email notifications for status changes]] | [[Proactive customer communication]] | [[Customers]] | [[Manual emails]] |
| S-004 | [[Mobile-responsive admin interface]] | [[Flexibility for managers]] | [[Management]] | [[Desktop only]] |
| S-005 | [[Customer 360 view with history]] | [[Better service quality]] | [[CSRs]] | [[Multiple screen navigation]] |
| S-006 | [[Automated fraud detection]] | [[Risk reduction]] | [[Operations]] | [[Manual review]] |
| S-007 | [[Integration with CRM for customer sync]] | [[Data consistency]] | [[Sales, CS]] | [[Manual updates]] |
| S-008 | [[Role-based dashboard customization]] | [[Personalized experience]] | [[All users]] | [[Standard dashboard]] |

**Should Have Summary:**
- Count: [[8 requirements]]
- Estimated Effort: [[160 story points]]
- Business Value: [[$400K annual]]
- Workaround Cost: [[$150K annual labor]]

#### COULD HAVE

| ID | Requirement | Business Justification | User Impact | Effort |
|----|-------------|----------------------|-------------|--------|
| C-001 | [[SMS notifications]] | [[Alternative communication channel]] | [[Customers]] | [[40 pts]] |
| C-002 | [[Advanced analytics with ML predictions]] | [[Demand forecasting]] | [[Planning]] | [[80 pts]] |
| C-003 | [[Customer portal mobile app]] | [[Enhanced mobile experience]] | [[Customers]] | [[100 pts]] |
| C-004 | [[Chatbot for common inquiries]] | [[Self-service deflection]] | [[Customers]] | [[60 pts]] |
| C-005 | [[Social media integration]] | [[Modern communication]] | [[Marketing]] | [[40 pts]] |
| C-006 | [[Gamification for CSR performance]] | [[Engagement]] | [[CSRs]] | [[30 pts]] |

**Could Have Summary:**
- Count: [[6 requirements]]
- Estimated Effort: [[350 story points]]
- Business Value: [[$200K annual]]
- Delivery: [[If time permits]]

#### WON'T HAVE (THIS TIME)

| ID | Requirement | Reason | Future Consideration |
|----|-------------|--------|---------------------|
| W-001 | [[Voice-activated order entry]] | [[Too complex, low adoption expected]] | [[Phase 2 if AI improves]] |
| W-002 | [[Blockchain for supply chain]] | [[Overkill for current needs]] | [[If supplier network requires]] |
| W-003 | [[AR/VR for warehouse visualization]] | [[Not relevant to current scope]] | [[Future warehouse project]] |
| W-004 | [[Cryptocurrency payments]] | [[No customer demand]] | [[If market shifts]] |

---

## 3. WSJF (Weighted Shortest Job First) Prioritization

### 3.1 WSJF Formula

```
                    Cost of Delay
WSJF = ─────────────────────────────────────
       Job Duration (or Story Points)

Where Cost of Delay = User/Business Value + Time Criticality + Risk Reduction/Opportunity Enablement
```

### 3.2 WSJF Scoring Scale

| Factor | Scale | Description |
|--------|-------|-------------|
| **User/Business Value** | 1-10 | [[1 = Minimal value, 10 = Critical business impact]] |
| **Time Criticality** | 1-10 | [[1 = No deadline pressure, 10 = Fixed immovable deadline]] |
| **Risk Reduction** | 1-10 | [[1 = No risk impact, 10 = Eliminates critical risk]] |
| **Job Size** | [[Fibonacci]] | [[Story points: 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]] |

### 3.3 WSJF Calculation Table

| ID | Feature | User Value | Time Criticality | Risk Reduction | Cost of Delay | Job Size | WSJF Score | Rank |
|----|---------|------------|------------------|----------------|---------------|----------|------------|------|
| WS-001 | [[User authentication]] | [[10]] | [[10]] | [[10]] | [[30]] | [[5]] | [[6.00]] | [[1]] |
| WS-002 | [[Order entry interface]] | [[10]] | [[9]] | [[8]] | [[27]] | [[13]] | [[2.08]] | [[3]] |
| WS-003 | [[ERP integration]] | [[9]] | [[8]] | [[9]] | [[26]] | [[8]] | [[3.25]] | [[2]] |
| WS-004 | [[Real-time inventory]] | [[9]] | [[7]] | [[7]] | [[23]] | [[8]] | [[2.88]] | [[4]] |
| WS-005 | [[Customer portal]] | [[8]] | [[6]] | [[6]] | [[20]] | [[13]] | [[1.54]] | [[6]] |
| WS-006 | [[Basic reporting]] | [[7]] | [[5]] | [[5]] | [[17]] | [[8]] | [[2.13]] | [[5]] |
| WS-007 | [[Bulk import]] | [[6]] | [[4]] | [[4]] | [[14]] | [[5]] | [[2.80]] | [[7]] |
| WS-008 | [[Advanced analytics]] | [[5]] | [[3]] | [[4]] | [[12]] | [[21]] | [[0.57]] | [[9]] |
| WS-009 | [[Mobile app]] | [[6]] | [[2]] | [[3]] | [[11]] | [[34]] | [[0.32]] | [[10]] |
| WS-010 | [[SMS notifications]] | [[4]] | [[3]] | [[2]] | [[9]] | [[5]] | [[1.80]] | [[8]] |

### 3.4 WSJF Analysis

**Top Priority Items (WSJF > 2.0):**
1. [[WS-001: User authentication (6.00)]] - Critical foundation, high CoD, small size
2. [[WS-003: ERP integration (3.25)]] - High business value, moderate size
3. [[WS-004: Real-time inventory (2.88)]] - Addresses major pain point
4. [[WS-007: Bulk import (2.80)]] - Good value-to-effort ratio
5. [[WS-002: Order entry interface (2.08)]] - Core functionality
6. [[WS-006: Basic reporting (2.13)]] - Operational necessity

**Sequencing Recommendation:**
```
Sprint 1-2:  WS-001 (Authentication foundation)
Sprint 3-4:  WS-003 (ERP integration - unblocks data flow)
Sprint 5-6:  WS-002 (Order entry - core functionality)
Sprint 7:    WS-004 (Real-time inventory)
Sprint 8:    WS-006 (Basic reporting)
Sprint 9:    WS-007 (Bulk import)
```

---

## 4. Value vs. Effort Matrix

### 4.1 Quadrant Analysis

```
                    HIGH VALUE
                         │
         ┌───────────────┼───────────────┐
         │   QUICK WINS  │  MAJOR PROJECTS│
         │   (Do First)  │  (Plan Carefully)│
         │               │                │
  LOW    │  • User auth  │  • Order entry  │   HIGH
 EFFORT  │  • Basic search│  • Customer portal│  EFFORT
         │  • CSV import │  • Mobile app   │
         │               │                │
         ├───────────────┼───────────────┤
         │   FILL-INS    │  THANKLESS TASKS│
         │   (Do When    │  (Avoid or     │
         │    Time Permits)│  Delegate)     │
         │               │                │
         │  • SMS notifs │  • Legacy data  │
         │  • Gamification│    migration   │
         │  • Social int │  • Complex      │
         │               │    integrations │
         └───────────────┼───────────────┘
                         │
                    LOW VALUE
```

### 4.2 Feature Placement

| Quadrant | Features | Action |
|----------|----------|--------|
| **Quick Wins** | [[User auth, Basic search, CSV import, Password reset]] | [[Implement immediately - high ROI]] |
| **Major Projects** | [[Order entry, Customer portal, Mobile app, ERP integration]] | [[Plan carefully, allocate best resources]] |
| **Fill-ins** | [[SMS notifications, Gamification, Social media, Chatbot]] | [[Schedule after quick wins and critical majors]] |
| **Thankless Tasks** | [[Legacy data migration, Complex integrations, Technical debt]] | [[Automate, delegate, or minimize scope]] |

---

## 5. Dependency-Aware Prioritization

### 5.1 Dependency Mapping

| Feature | Depends On | Blocks | Priority Adjustment |
|---------|------------|--------|---------------------|
| [[Order entry]] | [[User auth, Customer data]] | [[Order tracking, Reporting]] | [[Must be early]] |
| [[ERP integration]] | [[Order data model]] | [[Financial reporting]] | [[Critical path]] |
| [[Customer portal]] | [[User auth, Order tracking]] | [[Mobile app]] | [[After core features]] |
| [[Real-time inventory]] | [[WMS integration]] | [[Order validation]] | [[Required for go-live]] |
| [[Advanced analytics]] | [[Data warehouse, Historical data]] | [[None]] | [[Can be delayed]] |

### 5.2 Critical Path Analysis

```
[User Auth] ──→ [Customer Data] ──→ [Order Entry] ──→ [ERP Integration]
     │                                              │
     └──────────────────────────────────────────────┘
                          ↓
              [Order Tracking] ──→ [Customer Portal]
                          ↓
                   [Reporting]
```

**Critical Path Features (Must be first):**
1. [[User authentication]]
2. [[Customer data management]]
3. [[Order entry]]
4. [[ERP integration]]

---

## 6. Stakeholder Priority Alignment

### 6.1 Stakeholder Priority Matrix

| Feature | Executive | Operations | IT | Customer | Final Priority |
|---------|-----------|------------|----|----------|----------------|
| [[User auth]] | [[8]] | [[10]] | [[10]] | [[6]] | [[Must]] |
| [[Order entry]] | [[9]] | [[10]] | [[7]] | [[8]] | [[Must]] |
| [[ERP integration]] | [[10]] | [[8]] | [[6]] | [[2]] | [[Must]] |
| [[Customer portal]] | [[7]] | [[6]] | [[5]] | [[10]] | [[Must]] |
| [[Real-time inventory]] | [[6]] | [[9]] | [[7]] | [[7]] | [[Must]] |
| [[Bulk import]] | [[5]] | [[8]] | [[4]] | [[1]] | [[Should]] |
| [[Advanced analytics]] | [[8]] | [[5]] | [[6]] | [[2]] | [[Should]] |
| [[Mobile app]] | [[4]] | [[3]] | [[5]] | [[7]] | [[Could]] |

### 6.2 Conflict Resolution

| Conflict | Stakeholders | Resolution Approach | Decision |
|----------|--------------|---------------------|----------|
| [[Mobile app priority]] | [[Customers want it, IT concerned about effort]] | [[Defer to Phase 2; responsive web as interim]] | [[Could Have]] |
| [[Advanced analytics]] | [[Executives want it, Operations prefers basics first]] | [[Implement basic reporting first, advanced later]] | [[Basic = Must, Advanced = Should]] |

---

## 7. Release Planning

### 7.1 Release Scope

#### Release 1: MVP (Months 1-4)
**Theme:** [[Core functionality - order processing]]

| Priority | Features | Story Points | Business Value |
|----------|----------|--------------|----------------|
| [[Must]] | [[User auth, Order entry, ERP integration, Basic reporting]] | [[180]] | [[$800K]] |

**Success Criteria:**
- [[Process orders end-to-end]]
- [[Basic operational visibility]]
- [[Secure access control]]

#### Release 2: Enhancement (Months 5-7)
**Theme:** [[User experience and efficiency]]

| Priority | Features | Story Points | Business Value |
|----------|----------|--------------|----------------|
| [[Must/Should]] | [[Customer portal, Real-time inventory, Bulk import, CRM integration]] | [[200]] | [[$500K]] |

**Success Criteria:**
- [[Customer self-service enabled]]
- [[CSR efficiency improved 50%]]
- [[Real-time visibility achieved]]

#### Release 3: Optimization (Months 8-10)
**Theme:** [[Advanced capabilities]]

| Priority | Features | Story Points | Business Value |
|----------|----------|--------------|----------------|
| [[Should/Could]] | [[Advanced analytics, Mobile app, SMS notifications, Chatbot]] | [[250]] | [[$300K]] |

**Success Criteria:**
- [[Predictive insights available]]
- [[Mobile experience complete]]
- [[Automation maximized]]

### 7.2 Release Roadmap

```
Q1 2026          Q2 2026          Q3 2026          Q4 2026
│                │                │                │
├────────────────┤────────────────┤────────────────┤
│   RELEASE 1    │   RELEASE 2    │   RELEASE 3    │
│     MVP        │  Enhancement   │  Optimization  │
│                │                │                │
│ • User Auth    │ • Customer     │ • Advanced     │
│ • Order Entry  │   Portal       │   Analytics    │
│ • ERP Int      │ • Real-time    │ • Mobile App   │
│ • Basic Rpt    │   Inventory    │ • Chatbot      │
│                │ • Bulk Import  │                │
│                │ • CRM Int      │                │
```

---

## 8. Prioritization Governance

### 8.1 Decision Rights

| Decision Type | Decision Maker | Input From | Escalation To |
|---------------|----------------|------------|---------------|
| [[Must/Should/Could classification]] | [[Product Owner]] | [[Business Analyst, Stakeholders]] | [[Executive Sponsor]] |
| [[Release scope changes]] | [[Executive Sponsor]] | [[Product Owner, Tech Lead]] | [[Steering Committee]] |
| [[Technical dependencies affecting priority]] | [[Solution Architect]] | [[Development Team]] | [[Product Owner]] |
| [[Resource constraints impact]] | [[Project Manager]] | [[All leads]] | [[Executive Sponsor]] |

### 8.2 Review Cadence

| Review Type | Frequency | Participants | Output |
|-------------|-----------|--------------|--------|
| [[Sprint Planning]] | [[Bi-weekly]] | [[PO, Scrum Master, Dev Team]] | [[Sprint backlog priority]] |
| [[Release Planning]] | [[Per release]] | [[PO, Architect, Stakeholders]] | [[Release scope]] |
| [[Portfolio Review]] | [[Quarterly]] | [[Executive, PO, PM]] | [[Roadmap adjustments]] |
| [[Ad-hoc Priority Review]] | [[As needed]] | [[Affected stakeholders]] | [[Priority changes]] |

### 8.3 Change Control

**Priority Change Request Process:**

1. **Request Submission:**
   - Submit change request form
   - Include business justification
   - Identify impacted items

2. **Impact Assessment:**
   - Technical impact analysis
   - Schedule impact
   - Resource impact

3. **Decision:**
   - Approved / Rejected / Deferred
   - Document rationale

4. **Communication:**
   - Notify affected stakeholders
   - Update documentation

---

## 9. Appendix A: Prioritization Workshop Template

### Workshop Agenda: Requirements Prioritization

**Duration:** 4 hours
**Participants:** [[Product Owner, Business Analyst, Tech Lead, Key Stakeholders]]

**Agenda:**
1. **Introduction (15 min)**
   - Prioritization method overview
   - Decision criteria review

2. **Must Have Definition (30 min)**
   - Review Must Have checklist
   - Identify Must requirements
   - Validate with stakeholders

3. **Should/Could Definition (45 min)**
   - Evaluate remaining requirements
   - Apply scoring criteria
   - Document rationale

4. **WSJF Scoring (60 min)**
   - Score Cost of Delay factors
   - Estimate job sizes
   - Calculate WSJF scores

5. **Sequencing (45 min)**
   - Map dependencies
   - Build initial roadmap
   - Identify critical path

6. **Review & Alignment (45 min)**
   - Present results
   - Address conflicts
   - Obtain sign-off

### Workshop Output Template

| Item | Decision | Rationale | Participants | Date |
|------|----------|-----------|--------------|------|
| [[Feature X priority]] | [[Must Have]] | [[Regulatory requirement]] | [[All]] | [[2026-02-25]] |
| [[Feature Y sequence]] | [[Sprint 5]] | [[Depends on Feature Z]] | [[All]] | [[2026-02-25]] |

---

*Document Control: This template aligns with BABOK v3 Knowledge Areas: Requirements Analysis and Design Definition, and Strategy Analysis.*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
