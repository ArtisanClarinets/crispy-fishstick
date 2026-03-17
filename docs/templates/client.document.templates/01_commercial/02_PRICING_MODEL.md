---
Document: PRICING_MODEL
Doc ID: VS-TEMPLATE-COMM-002
Client: [[CLIENT_NAME]]
Project: [[PROJECT_NAME]]
Owner: Account Manager / Finance
Contributors: Project Manager, Solution Architect, Estimation Team
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/01_commercial/02_PRICING_MODEL.md
Approvers: [[ACCOUNT_MANAGER]] / [[FINANCE_DIRECTOR]] / [[CLIENT_SPONSOR]]
---

# Pricing Model

## Purpose
This document provides a **transparent and detailed pricing framework** for the engagement, explaining cost drivers, estimation methodologies, pricing structures, and change pricing policies. It establishes the financial foundation for the project and ensures both parties understand how costs are calculated and managed. Use this document to:
- Explain the rationale behind pricing decisions
- Provide transparency into cost drivers and assumptions
- Define pricing options and their trade-offs
- Establish change pricing policies
- Support budget planning and approval processes

## Instructions
1. **Customization:** Replace all `[[PLACEHOLDERS]]` with project-specific values
2. **Transparency:** Be clear about what drives costs and why
3. **Options:** Present pricing options where applicable
4. **Assumptions:** Document all estimation assumptions
5. **Ranges:** Provide ranges with confidence levels for estimates
6. **Review:** Have finance and legal review before client presentation

---

## 1. PRICING PRINCIPLES

### 1.1 Cost Drivers

The following factors drive project costs:

| Driver | Impact | Explanation |
|---|---|---|
| **Complexity** | High | More complex requirements require more senior resources and longer timelines |
| **Integration Points** | High | Each external system integration adds design, development, and testing effort |
| **Customization Level** | Medium | Highly customized solutions require more effort than configuration-based approaches |
| **Data Volume** | Medium | Large data volumes affect performance design, migration effort, and infrastructure |
| **Security Requirements** | Medium | High security (SOC 2, HIPAA) adds compliance, testing, and documentation overhead |
| **Timeline Pressure** | High | Compressed timelines may require additional resources or overtime |
| **Team Experience** | Medium | Projects requiring cutting-edge technologies may need specialized expertise |
| **Client Availability** | Medium | Limited stakeholder availability can extend timeline and increase project management effort |

### 1.2 What's Included

All Vantus project pricing includes:

- **Discovery and Analysis:** Requirements gathering, stakeholder interviews, process mapping
- **Architecture and Design:** System design, technical architecture, security architecture
- **Development:** Frontend, backend, database, and integration development
- **Quality Assurance:** Testing strategy, test execution, defect management
- **Documentation:** Complete Client Documentation Kit including all operational documentation
- **Knowledge Transfer:** Training sessions, handoff documentation, credential escrow
- **Project Management:** Planning, coordination, status reporting, risk management
- **Warranty Support:** Post-launch defect resolution per SOW terms

### 1.3 What's Excluded

The following are **not included** in project pricing:

| Item | Reason | Client Responsibility |
|---|---|---|
| Third-party software licenses | Variable cost based on usage | Client procures directly |
| Infrastructure and hosting | Usage-based costs | Client hosting account |
| Content creation (copy, images, video) | Requires domain expertise | Client provides or engages separately |
| Data migration from legacy systems | Requires detailed analysis | Separate SOW if needed |
| Ongoing maintenance and support | Post-warranty services | Support agreement available |
| Travel expenses (if applicable) | Variable based on location | Billed at cost plus admin fee |
| Custom hardware or devices | Not typically required | Client procurement |

---

## 2. ESTIMATION METHODOLOGY

### 2.1 Estimation Approach

Vantus uses a **three-point estimation** approach for project costing:

| Estimate Type | Description | Use Case |
|---|---|---|
| **Optimistic (O)** | Best-case scenario with no issues | Lower bound reference |
| **Most Likely (M)** | Realistic scenario with normal challenges | Primary estimate |
| **Pessimistic (P)** | Worst-case with significant issues | Risk buffer calculation |

**Expected Value (EV) Formula:**
```
EV = (O + 4M + P) / 6
```

### 2.2 Confidence Levels

Estimates are provided with confidence levels based on project phase:

| Phase | Confidence Range | Typical Variance |
|---|---|---|
| **Pre-Discovery** | ± 50% | High uncertainty |
| **Post-Discovery** | ± 25% | Requirements understood |
| **Post-Design** | ± 10% | Technical approach defined |
| **Mid-Build** | ± 5% | Work in progress known |

### 2.3 Estimation Inputs

The following inputs inform our estimates:

| Input | Source | Impact |
|---|---|---|
| Requirements Specification | Discovery phase | Scope baseline |
| User Story Points | Agile estimation | Development effort |
| Technical Complexity Rating | Architecture review | Implementation difficulty |
| Integration Inventory | System analysis | Integration effort |
| Non-Functional Requirements | Performance requirements | Architecture overhead |
| Historical Data | Similar past projects | Calibration |

### 2.4 Estimation Ranges

| Component | Optimistic | Most Likely | Pessimistic | Expected Value |
|---|---:|---:|---:|---:|
| Discovery | $[[X]] | $[[Y]] | $[[Z]] | $[[EV]] |
| Design | $[[X]] | $[[Y]] | $[[Z]] | $[[EV]] |
| Development | $[[X]] | $[[Y]] | $[[Z]] | $[[EV]] |
| Testing | $[[X]] | $[[Y]] | $[[Z]] | $[[EV]] |
| Deployment | $[[X]] | $[[Y]] | $[[Z]] | $[[EV]] |
| Documentation | $[[X]] | $[[Y]] | $[[Z]] | $[[EV]] |
| Project Management | $[[X]] | $[[Y]] | $[[Z]] | $[[EV]] |
| **Total** | **$[[X]]** | **$[[Y]]** | **$[[Z]]** | **$[[EV]]** |

---

## 3. PRICING STRUCTURES

### 3.1 Pricing Model Options

Vantus offers three primary pricing models:

#### Option A: Fixed Price

**Description:** Agreed-upon total price for defined scope

| Aspect | Details |
|---|---|
| **Best For** | Well-defined scope; fixed budget; risk-averse clients |
| **Pricing** | $[[FIXED_PRICE]] |
| **Payment Schedule** | Milestone-based (e.g., 30%/40%/30%) |
| **Scope Changes** | Via Change Order with defined pricing |
| **Risk Allocation** | Vantus bears delivery risk; Client bears scope definition risk |
| **Advantages** | Budget certainty; predictable cash flow |
| **Disadvantages** | Less flexibility; change orders required for scope changes |

**When to Choose:**
- Scope is well-defined and unlikely to change
- Budget is fixed and cannot be exceeded
- Client prefers predictability over flexibility

#### Option B: Time & Materials (T&M)

**Description:** Billing based on actual hours worked at agreed rates

| Aspect | Details |
|---|---|
| **Best For** | Evolving scope; research projects; ongoing support |
| **Rates** | See Section 3.2 for rate card |
| **Payment Schedule** | Monthly invoicing based on actuals |
| **Scope Changes** | Flexible; hours adjusted accordingly |
| **Risk Allocation** | Shared; Client pays for actual effort |
| **Advantages** | Maximum flexibility; pay only for work done |
| **Disadvantages** | Budget uncertainty; requires trust and monitoring |

**When to Choose:**
- Scope is uncertain or expected to evolve
- Project involves research or exploration
- Long-term engagement with variable needs

#### Option C: Retainer

**Description:** Monthly fixed fee for defined capacity

| Aspect | Details |
|---|---|
| **Best For** | Ongoing support; continuous improvement; advisory services |
| **Pricing** | $[[MONTHLY_RETAINER]] per month |
| **Capacity** | [[X]] hours per month |
| **Term** | Minimum [[6]] months |
| **Rollover** | Up to [[20]]% hours roll over 1 month |
| **Advantages** | Reserved capacity; predictable monthly cost |
| **Disadvantages** | Pay for capacity regardless of utilization |

**When to Choose:**
- Ongoing maintenance and support needs
- Continuous improvement initiatives
- Access to expertise on demand

### 3.2 Rate Card

| Role | Hourly Rate | Daily Rate | Expertise |
|---:|---:|---:|---|
| **Project Manager** | $[[XXX]] | $[[XXXX]] | Planning, coordination, risk management |
| **Solution Architect** | $[[XXX]] | $[[XXXX]] | System design, technical leadership |
| **Senior Developer** | $[[XXX]] | $[[XXXX]] | Complex development, mentoring |
| **Developer** | $[[XXX]] | $[[XXXX]] | Feature development, testing |
| **UX/UI Designer** | $[[XXX]] | $[[XXXX]] | User experience, interface design |
| **Business Analyst** | $[[XXX]] | $[[XXXX]] | Requirements, process analysis |
| **QA Engineer** | $[[XXX]] | $[[XXXX]] | Testing, quality assurance |
| **DevOps Engineer** | $[[XXX]] | $[[XXXX]] | Infrastructure, CI/CD, operations |
| **Security Specialist** | $[[XXX]] | $[[XXXX]] | Security architecture, testing |
| **Technical Writer** | $[[XXX]] | $[[XXXX]] | Documentation, knowledge transfer |

**Note:** Rates are subject to annual review and adjustment with 60 days notice.

### 3.3 Volume Discounts

For larger engagements, the following discounts apply:

| Contract Value | Discount | Effective Rate Adjustment |
|---:|---:|---|
| See pricing/pricing_public.yaml,000 - See pricing/pricing_public.yaml,000 | 5% | -5% |
| See pricing/pricing_public.yaml,000 - See pricing/pricing_public.yaml,000 | 10% | -10% |
| See pricing/pricing_public.yaml,000 - See pricing/pricing_public.yaml,000 | 15% | -15% |
| See pricing/pricing_public.yaml,000+ | Custom | Custom pricing |

---

## 4. PAYMENT TERMS

### 4.1 Standard Payment Terms

| Term | Description |
|---|---|
| **Invoice Frequency** | Monthly for T&M; Milestone-based for Fixed Price |
| **Payment Due** | Net 15 days from invoice date |
| **Payment Method** | ACH transfer or wire transfer |
| **Late Payment** | 1.5% monthly service charge on overdue amounts |
| **Currency** | USD unless otherwise specified |
| **Taxes** | Client responsible for all applicable taxes |

### 4.2 Milestone-Based Payments (Fixed Price)

| Milestone | Percentage | Amount | Trigger |
|:---|:---:|:---:|:---|
| **Deposit / Kickoff** | 30% | $[[AMOUNT]] | SOW signed; project initiated |
| **Design Approval** | 20% | $[[AMOUNT]] | Architecture and design approved |
| **Development Complete** | 20% | $[[AMOUNT]] | Feature complete; ready for testing |
| **UAT Complete** | 20% | $[[AMOUNT]] | User acceptance testing passed |
| **Final Acceptance** | 10% | $[[AMOUNT]] | Project complete; handoff finished |

### 4.3 Expense Reimbursement

Pre-approved expenses are billed at cost plus 10% administrative fee:

| Expense Category | Policy |
|---|---|
| **Travel** | Economy class airfare; standard hotel rates |
| **Meals** | Per diem or actuals up to $[[AMOUNT]]/day |
| **Software/Tools** | Required for project delivery |
| **Third-Party Services** | Pre-approved only |

**Approval Required:** Expenses exceeding $[[500]] per item

---

## 5. CHANGE PRICING

### 5.1 What Constitutes a Change

A Change is any modification to:

| Type | Examples |
|---|---|
| **Scope Changes** | New features, removed features, modified requirements |
| **Timeline Changes** | Accelerated schedule, extended timeline |
| **Resource Changes** | Additional specialists, increased capacity |
| **Technical Changes** | Technology changes, architecture changes |
| **External Changes** | New integrations, third-party changes |

### 5.2 Change Pricing Process

1. **Change Request:** Client submits Change Request Form
2. **Impact Analysis:** Vantus analyzes impact within 3 business days
3. **Pricing:** Vantus provides pricing for the change
4. **Approval:** Client approves or rejects the Change Order
5. **Implementation:** Changes implemented upon written approval

### 5.3 Change Pricing Guidelines

| Change Type | Pricing Approach |
|---|---|
| **Scope Addition** | T&M rates or fixed price for defined scope |
| **Scope Reduction** | Credit for reduced effort (may not be 1:1) |
| **Timeline Acceleration** | Premium rates (1.5x) for expedited delivery |
| **Timeline Extension** | Additional project management and overhead |
| **Technical Pivot** | Impact analysis required; priced accordingly |

### 5.4 Approval Thresholds

| Change Value | Approval Required |
|---:|---|
| Under $[[5,000]] | Project Manager |
| $[[5,000]] - $[[25,000]] | Account Manager + Client Sponsor |
| Over $[[25,000]] | Executive approval both parties |

---

## 6. PRICING ASSUMPTIONS

### 6.1 Estimation Assumptions

This pricing is based on the following assumptions:

| ID | Assumption | Impact if Invalid |
|---|---|---|
| PRI-001 | [[Scope as defined in Requirements Spec v1.0]] | [[Additional cost for scope changes]] |
| PRI-002 | [[Client stakeholder availability 10 hrs/week]] | [[Timeline extension; additional PM effort]] |
| PRI-003 | [[No third-party API changes during project]] | [[Integration rework; additional cost]] |
| PRI-004 | [[Client provides content and data on schedule]] | [[Delay costs; placeholder content]] |
| PRI-005 | [[Standard technology stack (Next.js, PostgreSQL)]] | [[Additional licensing or training costs]] |
| PRI-006 | [[Single environment (dev/staging/prod)]] | [[Additional environment costs]] |
| PRI-007 | [[UAT completed within 2 weeks]] | [[Extended timeline costs]] |

### 6.2 Risk Adjustments

Pricing includes adjustments for identified risks:

| Risk | Probability | Impact | Adjustment |
|---|---|---:|---|
| [[Scope creep]] | Medium | $[[X]] | Included in contingency |
| [[Integration complexity]] | Low | $[[X]] | Included in contingency |
| [[Timeline pressure]] | Low | $[[X]] | Included in contingency |
| **Total Contingency** | | **$[[X]]** | **[[X]]% of base estimate** |

---

## 7. COST OPTIMIZATION OPTIONS

### 7.1 Cost Reduction Strategies

| Strategy | Savings | Trade-offs |
|---|---|---|
| **Phased Delivery** | 10-15% | Longer timeline; staged value delivery |
| **Reduced Customization** | 15-25% | Configuration over customization |
| **Off-the-Shelf Components** | 10-20% | Less differentiation; vendor dependencies |
| **Extended Timeline** | 10-15% | Lower resource intensity |
| **Client-Provided Resources** | 5-15% | Client manages coordination |

### 7.2 Value Engineering

Opportunities to optimize cost-to-value ratio:

| Opportunity | Approach | Savings |
|---|---|---|
| [[Example: Use existing auth system]] | [[Integrate vs. build custom]] | $[[X]] |
| [[Example: Standard UI components]] | [[Component library vs. custom design]] | $[[X]] |
| [[Example: Cloud-managed services]] | [[Managed DB vs. self-managed]] | $[[X]] |

---

## 8. PRICING COMPARISON

### 8.1 Market Comparison

Vantus pricing is positioned as follows:

| Provider Type | Typical Range | Vantus Position |
|---|---|---|
| Offshore Development | See pricing/pricing_public.yaml-75/hr | Premium for quality and full ownership |
| Boutique Agencies | See pricing/pricing_public.yaml-250/hr | Competitive with added value |
| Large Consultancies | See pricing/pricing_public.yaml-400/hr | Better value with senior attention |
| In-House Team | See pricing/pricing_public.yaml-300/hr (loaded) | Comparable with no overhead |

### 8.2 Total Cost of Ownership (TCO)

Consider the 5-year TCO, not just initial development:

| Cost Category | Traditional Vendor | Vantus |
|---|---|---|
| Initial Development | $[[X]] | $[[X]] |
| Annual Maintenance | $[[X]] (20%) | $[[X]] (15%) |
| Vendor Lock-in Risk | High (proprietary) | None (client-controlled) |
| Migration Cost (Year 3) | $[[X]] | Minimal |
| **5-Year TCO** | **$[[X]]** | **$[[X]]** |

---

## 9. RELATED DOCUMENTS

| Document | Relationship | Location |
|---|---|---|
| [01_SOW.md](./01_SOW.md) | Master agreement incorporating pricing | Current directory |
| [03_CHANGE_ORDER.md](./03_CHANGE_ORDER.md) | Change pricing process | Current directory |
| [02_ASSUMPTIONS_CONSTRAINTS.md](../00_master/02_ASSUMPTIONS_CONSTRAINTS.md) | Detailed assumptions | Master directory |
| [04_RISK_REGISTER.md](../00_master/04_RISK_REGISTER.md) | Risks affecting pricing | Master directory |

---

## 10. QUALITY CHECKLIST

Before finalizing this Pricing Model, verify:

- [ ] All `[[PLACEHOLDERS]]` replaced with actual project values
- [ ] Cost drivers clearly explained with business rationale
- [ ] Estimation methodology documented with confidence levels
- [ ] Three-point estimates provided for major components
- [ ] Pricing options presented with pros/cons
- [ ] Rate card current and accurate
- [ ] Payment terms clearly defined
- [ ] Change pricing process documented
- [ ] All pricing assumptions listed
- [ ] Risk adjustments included
- [ ] Cost optimization options presented
- [ ] Market comparison provided
- [ ] TCO analysis included
- [ ] Related documents cross-referenced
- [ ] Finance team has reviewed and approved
- [ ] Version history initialized

---

## 11. CHANGE HISTORY

| Date | Version | Author | Summary |
|---|---:|---|---|
| 2026-02-02 | 1.0.0 | Technical Writer | Complete rewrite with comprehensive pricing framework, three estimation approaches, multiple pricing models, and TCO analysis |
| 2026-01-18 | 0.1.0 | Vantus Systems | Initial template creation |

---

*Vantus Systems: Engineering Independence.*
*Last Updated: 2026-02-09 | Version 1.0.0 | Status: Template*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
