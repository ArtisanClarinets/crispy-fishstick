---
Document: CURRENT_STATE_MAP
Doc ID: VS-TEMPLATE-DISCOVERY-002
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Business Analyst / Process Architect
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/company-docs/client-project-doc-templates/docs/03_discovery/02_CURRENT_STATE_MAP.md
---

# Current State Map (As-Is Analysis)

## Instructions

This document provides a comprehensive view of existing business processes, systems, and pain points. Use it to:
- Document current workflows with sufficient detail for analysis
- Identify inefficiencies, bottlenecks, and waste
- Understand system touchpoints and data flows
- Establish baseline metrics for improvement measurement
- Validate understanding with stakeholders before proposing changes

**When to update:** During current state analysis phase, after stakeholder interviews and system reviews.

**BABOK Alignment:** Enterprise Analysis, Requirements Analysis and Design Definition

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [[2026-02-25]] | [[Author Name]] | Initial template creation |
| 2.0 | 2026-02-02 | Vantus Systems | Comprehensive BABOK-aligned update with process flow sections |

**Distribution List:**
- [[Process Owner]]
- [[Business Analyst]]
- [[Solution Architect]]
- [[QA Lead]]

---

## 1. Executive Summary

### Current State Overview
[[Provide a high-level paragraph describing the current state of the business process or system. Include scope, key stakeholders, and primary pain points.]]

**Example:**
> The current order-to-cash process at [[Client Name]] involves 7 discrete steps across 4 departments, utilizing 6 different systems. Average order processing time is 4.5 days, with manual handoffs between each stage creating bottlenecks and error opportunities.

### Key Metrics (Baseline)

| Metric | Current Value | Target (Future State) | Measurement Method |
|--------|---------------|----------------------|-------------------|
| [[Process Cycle Time]] | [[4.5 days]] | [[1 day]] | [[Timestamp analysis]] |
| [[Error Rate]] | [[12%]] | [[<2%]] | [[Error log review]] |
| [[Cost per Transaction]] | [[See pricing/pricing_public.yaml]] | [[See pricing/pricing_public.yaml]] | [[Cost accounting]] |
| [[User Satisfaction]] | [[3.2/5]] | [[4.5/5]] | [[Quarterly survey]] |
| [[System Uptime]] | [[99.2%]] | [[99.9%]] | [[Monitoring tools]] |

### Critical Issues Summary

| Priority | Issue | Business Impact | Urgency |
|----------|-------|-----------------|---------|
| P0 | [[Manual data re-entry]] | [[$200K annual cost]] | [[Immediate]] |
| P1 | [[No real-time visibility]] | [[Customer complaints]] | [[30 days]] |
| P2 | [[Legacy system performance]] | [[Productivity loss]] | [[90 days]] |

---

## 2. Process Inventory

### Process Hierarchy

| Process ID | Process Name | Type | Owner | Frequency | Volume | Complexity |
|------------|--------------|------|-------|-----------|--------|------------|
| P-001 | [[Order Entry]] | [[Core]] | [[Sales Ops]] | [[Continuous]] | [[500/day]] | [[Medium]] |
| P-002 | [[Order Validation]] | [[Core]] | [[CS Team]] | [[Continuous]] | [[500/day]] | [[Low]] |
| P-003 | [[Inventory Check]] | [[Core]] | [[Warehouse]] | [[Continuous]] | [[500/day]] | [[Medium]] |
| P-004 | [[Payment Processing]] | [[Core]] | [[Finance]] | [[Continuous]] | [[500/day]] | [[High]] |
| P-005 | [[Fulfillment]] | [[Core]] | [[Warehouse]] | [[Batch]] | [[500/day]] | [[Medium]] |

### Process Selection Matrix

**In Scope:**
- [[Primary business process under investigation]]
- [[Directly supporting subprocesses]]
- [[Integration touchpoints]]

**Out of Scope:**
- [[Upstream processes not affected]]
- [[Downstream reporting (covered in separate initiative)]]
- [[Historical data migration]]

---

## 3. Detailed Process Flows

### 3.1 Primary Process: [[Process Name]]

#### Process Metadata

| Attribute | Value |
|-----------|-------|
| **Process ID** | [[P-001]] |
| **Process Owner** | [[Name, Title]] |
| **Trigger** | [[Customer submits order via portal/email/phone]] |
| **End Event** | [[Order confirmed in system, fulfillment initiated]] |
| **Frequency** | [[~500 times/day]] |
| **Duration** | [[Average 45 minutes (can range 15 min - 4 hours)]] |
| **Business Rules** | [[See Section 7]] |

#### Step-by-Step Workflow

| Step | Activity | Actor | System | Duration | Input | Output | Issues |
|------|----------|-------|--------|----------|-------|--------|--------|
| 1.0 | [[Receive order request]] | [[CSR]] | [[Email/Phone]] | [[5 min]] | [[Customer order details]] | [[Order form (paper)]] | [[No standardized intake]] |
| 2.0 | [[Validate customer info]] | [[CSR]] | [[CRM]] | [[10 min]] | [[Order form]] | [[Validated customer record]] | [[Multiple CRM searches required]] |
| 3.0 | [[Check product availability]] | [[CSR]] | [[ERP + Inventory DB]] | [[15 min]] | [[Product codes]] | [[Availability status]] | [[Must check 2 systems]] |
| 4.0 | [[Calculate pricing]] | [[CSR]] | [[Excel spreadsheet]] | [[10 min]] | [[Product, qty, customer tier]] | [[Quoted price]] | [[Manual calculations, error-prone]] |
| 5.0 | [[Enter order in ERP]] | [[CSR]] | [[Legacy ERP]] | [[20 min]] | [[All order details]] | [[Order record]] | [[Slow system, frequent timeouts]] |
| 6.0 | [[Send confirmation]] | [[CSR]] | [[Email]] | [[5 min]] | [[Order details]] | [[Confirmation email]] | [[Manual email composition]] |

#### Process Flow Diagram (Text Representation)

```
[START] 
   ↓
[Receive Order] ──(Exception: Incomplete info)──→ [Request Clarification] ──→ [Receive Order]
   ↓
[Validate Customer] ──(Exception: New customer)──→ [Create Customer Record] ──→ [Validate Customer]
   ↓
[Check Inventory] ──(Exception: Out of stock)──→ [Check Alternatives] ──→ [Notify Customer] ──→ [END]
   ↓
[Calculate Pricing]
   ↓
[Enter in ERP] ──(Exception: System error)──→ [Retry/Log Ticket] ──→ [Enter in ERP]
   ↓
[Send Confirmation]
   ↓
[END]
```

#### Swimlane Diagram Description

| Lane | Activities | Systems Used |
|------|------------|--------------|
| **Customer** | [[Submit order]] | [[Web portal / Email]] |
| **Customer Service** | [[Receive → Validate → Check → Calculate → Enter → Confirm]] | [[CRM, ERP, Excel, Email]] |
| **System** | [[Validate → Check inventory → Store order → Send confirmation]] | [[CRM DB, Inventory DB, ERP DB]] |
| **Warehouse** | [[Receive order notification]] | [[ERP notifications]] |

### 3.2 Sub-Process: [[Sub-Process Name]]

[[Repeat the above structure for each major subprocess]]

---

## 4. Pain Point Deep Dive

### Pain Point Analysis Framework

For each identified pain point, document:
1. **Symptom:** What users experience
2. **Root Cause:** Underlying reason
3. **Impact:** Quantified effect on business/users
4. **Frequency:** How often it occurs
5. **Current Workaround:** How users cope today

### Detailed Pain Point Register

#### PP-001: [[Manual Data Re-entry]]

| Attribute | Details |
|-----------|---------|
| **Category** | Efficiency / Accuracy |
| **Severity** | Critical |
| **Frequency** | Every transaction (500x/day) |
| **Symptom** | Customer service reps must type order details into 3 separate systems |
| **Root Cause** | Systems not integrated; no API connectivity between CRM, ERP, and inventory |
| **Business Impact** | 2.5 hours/day per CSR × 10 CSRs = 25 hours/day wasted; $200K annual cost |
| **User Impact** | High frustration, overtime required, burnout risk |
| **Current Workaround** | CSRs maintain personal Excel templates to copy-paste data |
| **Related Systems** | CRM, ERP, Inventory DB |
| **Stakeholders Affected** | All CSRs, Sales Ops Manager |

**Evidence:**
- [[Time-motion study conducted 2026-01-15]]
- [[CSR interview notes (INT-003, INT-004)]]
- [[Error log analysis showing 12% data entry error rate]]

#### PP-002: [[No Real-Time Inventory Visibility]]

| Attribute | Details |
|-----------|---------|
| **Category** | Visibility / Customer Experience |
| **Severity** | High |
| **Frequency** | ~50x/day |
| **Symptom** | CSRs promise products that are actually out of stock |
| **Root Cause** | Inventory updates batch-processed every 4 hours; no real-time sync |
| **Business Impact** | 15 order cancellations/day; customer churn risk; reputation damage |
| **User Impact** | Stressful customer conversations; need to make callbacks |
| **Current Workaround** | CSRs call warehouse directly for "hot" orders |
| **Related Systems** | ERP, WMS |
| **Stakeholders Affected** | CSRs, Warehouse staff, Customers |

[[Continue for all identified pain points]]

### Pain Point Matrix

| Pain Point | Process Step | System | People | Data | Impact Score |
|------------|--------------|--------|--------|------|--------------|
| PP-001 | Steps 2, 3, 5 | High | High | Medium | 95/100 |
| PP-002 | Step 3 | High | Medium | High | 80/100 |

---

## 5. System & Technology Analysis

### System Interaction Map

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │   Web App   │  │   Mobile    │  │      Email Client       │  │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘  │
└─────────┼────────────────┼─────────────────────┼────────────────┘
          │                │                     │
          ▼                ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │     CRM     │  │     ERP     │  │    Inventory System     │  │
│  │   (Sales)   │  │  (Oracle)   │  │      (Legacy)           │  │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘  │
└─────────┼────────────────┼─────────────────────┼────────────────┘
          │                │                     │
          ▼                ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  CRM DB     │  │   ERP DB    │  │    Inventory DB         │  │
│  │ (Postgres)  │  │  (Oracle)   │  │    (SQL Server)         │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### System Details

#### SYS-001: [[CRM System]]

| Attribute | Details |
|-----------|---------|
| **System Name** | [[Salesforce / HubSpot / Custom]] |
| **Version** | [[vX.X]] |
| **Vendor** | [[Vendor Name]] |
| **Primary Function** | [[Customer relationship management]] |
| **Users** | [[50 users]] |
| **Data Volume** | [[100K customer records]] |
| **Integration Points** | [[ERP (daily batch), Email (real-time)]] |
| **API Availability** | [[REST API available, poorly documented]] |
| **Technical Debt** | [[Custom fields not documented, 20% unused]] |
| **Planned Changes** | [[None in next 12 months]] |

#### SYS-002: [[ERP System]]

| Attribute | Details |
|-----------|---------|
| **System Name** | [[SAP / Oracle / NetSuite]] |
| **Version** | [[vX.X]] |
| **Vendor** | [[Vendor Name]] |
| **Primary Function** | [[Order management, financials, reporting]] |
| **Users** | [[200 users]] |
| **Data Volume** | [[1M orders, 5 years history]] |
| **Integration Points** | [[CRM (batch), WMS (real-time), Financial (batch)]] |
| **API Availability** | [[SOAP API, limited endpoints]] |
| **Technical Debt** | [[Custom modules, upgrade blocked]] |
| **Planned Changes** | [[Migration to cloud version in 18 months]] |

[[Continue for all systems]]

### Integration Analysis

| Integration | From | To | Method | Frequency | Data | Reliability | Issues |
|-------------|------|----|--------|-----------|------|-------------|--------|
| Customer Sync | CRM | ERP | CSV Export/Import | Daily @ 2 AM | [[Customer master]] | 95% | [[Manual process, occasional failures]] |
| Order Status | ERP | CRM | API | Real-time | [[Order status updates]] | 99% | [[Latency up to 5 minutes]] |
| Inventory | WMS | ERP | DB Link | Every 4 hours | [[Stock levels]] | 98% | [[Stale data between syncs]] |

---

## 6. Data Flow Analysis

### Data Flow Diagram (Level 0 - Context)

```
                    ┌─────────────────┐
                    │    EXTERNAL     │
                    │    ENTITIES     │
                    │  ┌───────────┐  │
                    │  │ Customers │  │
                    │  │ Vendors   │  │
                    │  │ Partners  │  │
                    │  └─────┬─────┘  │
                    └────────┼─────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                    CURRENT SYSTEM (As-Is)                    │
│                                                              │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│   │   INPUT     │───→│   PROCESS   │───→│   OUTPUT    │     │
│   │             │    │             │    │             │     │
│   │ • Orders    │    │ • Validate  │    │ • Confirm   │     │
│   │ • Payments  │    │ • Process   │    │ • Ship      │     │
│   │ • Inquiries │    │ • Fulfill   │    │ • Invoice   │     │
│   └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                              │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
│   │   STORES    │    │   DATA      │    │   REPORTS   │     │
│   │             │    │             │    │             │     │
│   │ • CRM DB    │    │ • Customer  │    │ • Sales     │     │
│   │ • ERP DB    │    │ • Order     │    │ • Inventory │     │
│   │ • File Sys  │    │ • Financial │    │ • Ops       │     │
│   └─────────────┘    └─────────────┘    └─────────────┘     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Data Flow Diagram (Level 1 - Detailed)

| Data Flow ID | From | To | Data Elements | Volume | Frequency | Method |
|--------------|------|----|---------------|--------|-----------|--------|
| DF-001 | Customer | CSR | [[Order details, contact info]] | [[500/day]] | [[Continuous]] | [[Email, Phone, Portal]] |
| DF-002 | CSR | CRM | [[Customer query, updates]] | [[1000/day]] | [[Continuous]] | [[Manual entry]] |
| DF-003 | CSR | ERP | [[Order data]] | [[500/day]] | [[Continuous]] | [[Manual entry]] |
| DF-004 | ERP | WMS | [[Pick list, shipping info]] | [[500/day]] | [[Batch @ 4 PM]] | [[Automated export]] |
| DF-005 | ERP | Customer | [[Order confirmation, invoice]] | [[500/day]] | [[Continuous]] | [[Email]] |

### Data Store Inventory

| Store ID | Name | Type | Owner | Retention | Backup | Access Control |
|----------|------|------|-------|-----------|--------|----------------|
| DS-001 | Customer Master | [[CRM DB]] | [[IT]] | [[7 years]] | [[Daily]] | [[Role-based]] |
| DS-002 | Order History | [[ERP DB]] | [[IT]] | [[10 years]] | [[Daily]] | [[Role-based]] |
| DS-003 | Audit Logs | [[File system]] | [[IT]] | [[3 years]] | [[Weekly]] | [[Admin only]] |

---

## 7. Business Rules Catalog

### Business Rules Register

| Rule ID | Rule Name | Description | Source | Enforcement | Exceptions | Impact if Violated |
|---------|-----------|-------------|--------|-------------|------------|-------------------|
| BR-001 | [[Customer Credit Limit]] | [[Orders over $10K require credit approval]] | [[Finance Policy v2.1]] | [[Manual check by CSR]] | [[Pre-approved accounts]] | [[Bad debt risk]] |
| BR-002 | [[Minimum Order Value]] | [[Orders under See pricing/pricing_public.yaml incur See pricing/pricing_public.yaml handling fee]] | [[Pricing Policy]] | [[System calculated]] | [[Promotional periods]] | [[Revenue loss]] |
| BR-003 | [[Return Window]] | [[Returns accepted within 30 days of delivery]] | [[Returns Policy]] | [[Manual verification]] | [[Defective products: 90 days]] | [[Customer disputes]] |
| BR-004 | [[Discount Authority]] | [[CSRs can approve up to 10%; manager approval required above]] | [[Sales Policy]] | [[System enforced]] | [[None]] | [[Margin erosion]] |

### Decision Tables

#### DT-001: Order Approval Decision

| Condition | Rule 1 | Rule 2 | Rule 3 | Rule 4 |
|-----------|--------|--------|--------|--------|
| Order Value < $1,000 | Y | Y | N | N |
| Order Value >= See pricing/pricing_public.yaml,000 | N | N | Y | Y |
| Customer Credit Status = Good | Y | N | Y | N |
| **Action** | | | | |
| Auto-approve | X | | | |
| CSR Review | | X | | |
| Manager Approval | | | X | |
| Credit Hold | | | | X |

---

## 8. Stakeholder Workflow Analysis

### User Journey Maps

#### Journey: [[Customer Service Representative - Order Entry]]

| Stage | Touchpoint | Action | Thought | Feeling | Pain Point | Opportunity |
|-------|------------|--------|---------|---------|------------|-------------|
| **Aware** | Email notification | [[Sees new order email]] | [["Another order to process"]] | [[Neutral]] | [[Inbox overload]] | [[Centralized queue]] |
| **Consider** | Order review | [[Opens email, reads details]] | [["Is this customer legit?"]] | [[Curious]] | [[No customer context]] | [[CRM integration]] |
| **Decide** | System lookup | [[Searches CRM, then ERP]] | [["Why do I need two systems?"]] | [[Frustrated]] | [[System switching]] | [[Single interface]] |
| **Act** | Data entry | [[Types order into ERP]] | [["Hope I don't make a typo"]] | [[Anxious]] | [[Manual entry errors]] | [[Auto-population]] |
| **Validate** | Confirmation | [[Sends email to customer]] | [["Done, but took forever"]] | [[Relieved but tired]] | [[Time-consuming]] | [[Automated confirmation]] |

### Role-Based Process Views

#### Role: [[Customer Service Representative]]

**Daily Workflow:**
1. [[Check email for new orders (30 min)]]
2. [[Process orders in queue (4 hours)]]
3. [[Handle customer inquiries (2 hours)]]
4. [[Update order statuses (1 hour)]]
5. [[Resolve exceptions (30 min)]]

**System Interactions:**
| System | Purpose | Frequency | Pain Points |
|--------|---------|-----------|-------------|
| Email | [[Order intake]] | [[Continuous]] | [[Volume overload]] |
| CRM | [[Customer lookup]] | [[~50x/day]] | [[Slow search]] |
| ERP | [[Order entry]] | [[~30x/day]] | [[Complex UI, timeouts]] |
| Excel | [[Pricing calculations]] | [[~20x/day]] | [[Error-prone]] |

---

## 9. Current State Assessment

### SWOT Analysis

| **Strengths** | **Weaknesses** |
|---------------|----------------|
| [[Experienced staff]] | [[Manual processes]] |
| [[Established workflows]] | [[System silos]] |
| [[Good customer relationships]] | [[No real-time visibility]] |
| [[Reliable fulfillment]] | [[Technical debt]] |

| **Opportunities** | **Threats** |
|-------------------|-------------|
| [[Process automation]] | [[Competitor improvements]] |
| [[System integration]] | [[Staff turnover]] |
| [[Data analytics]] | [[Technical obsolescence]] |
| [[Customer self-service]] | [[Regulatory changes]] |

### Capability Maturity Assessment

| Capability | Current Level | Target Level | Gap |
|------------|---------------|--------------|-----|
| Process Automation | [[Level 2 - Managed]] | [[Level 4 - Quantitatively Managed]] | [[2 levels]] |
| System Integration | [[Level 1 - Initial]] | [[Level 3 - Defined]] | [[2 levels]] |
| Data Quality | [[Level 2 - Managed]] | [[Level 3 - Defined]] | [[1 level]] |
| User Experience | [[Level 2 - Managed]] | [[Level 4 - Quantitatively Managed]] | [[2 levels]] |

**Maturity Levels:**
1. Initial - Ad hoc, chaotic
2. Managed - Basic processes defined
3. Defined - Standardized across organization
4. Quantitatively Managed - Measured and controlled
5. Optimizing - Continuous improvement

---

## 10. Appendices

### Appendix A: Process Documentation Standards

**Naming Convention:**
- Process IDs: P-[XXX] (e.g., P-001)
- Step IDs: [Process ID].[Step Number] (e.g., P-001.2.0)
- Pain Point IDs: PP-[XXX]
- System IDs: SYS-[XXX]

**Required Elements for Each Process:**
- [ ] Process owner identified
- [ ] Trigger and end events defined
- [ ] All steps documented with actors and systems
- [ ] Exception paths identified
- [ ] Business rules referenced
- [ ] Metrics captured

### Appendix B: Interview Findings Summary

| Interview ID | Stakeholder | Key Findings | Related Pain Points |
|--------------|-------------|--------------|---------------------|
| INT-001 | [[Sales Director]] | [[Process takes too long, losing deals]] | PP-001, PP-002 |
| INT-002 | [[CSR Lead]] | [[High error rate, training issues]] | PP-001, PP-005 |

### Appendix C: Supporting Documents

- [[Time-motion study results]]
- [[System architecture diagrams]]
- [[User shadowing notes]]
- [[Error log analysis]]
- [[Process workshop recordings]]

---

*Document Control: This template aligns with BABOK v3 Knowledge Areas: Enterprise Analysis, Requirements Analysis and Design Definition, and Underlying Competencies.*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
