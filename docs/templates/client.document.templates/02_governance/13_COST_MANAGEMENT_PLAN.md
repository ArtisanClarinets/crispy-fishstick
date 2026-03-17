# Cost Management Plan

---

## Document Control

| Field | Value |
|-------|-------|
| **Document ID** | VS-GOV-113-CMP |
| **Version** | 1.0 |
| **Date** | [[DATE]] |
| **Author** | [[PROJECT_MANAGER]] |
| **Status** | Draft / Approved |
| **Classification** | Internal / Client Confidential |
| **Review Cycle** | Monthly |
| **Next Review** | [[DATE]] |

---

## Version History

| Version | Date | Author | Changes | Approved By |
|---------|------|--------|---------|-------------|
| 0.1 | [[DATE]] | [[NAME]] | Initial draft | - |
| 0.2 | [[DATE]] | [[NAME]] | [[DESCRIPTION]] | - |
| 1.0 | [[DATE]] | [[NAME]] | Approved baseline | [[SPONSOR_NAME]] |

---

## Purpose

The Cost Management Plan establishes the framework for planning, estimating, budgeting, financing, funding, managing, and controlling costs for [[PROJECT_NAME]]. It defines how project costs will be planned, structured, monitored, and controlled to ensure delivery within the approved budget while maintaining value and quality.

---

## Scope

This Cost Management Plan covers:
- Cost estimation methodologies
- Budget development and allocation
- Cost baseline establishment
- Cost control and monitoring
- Variance analysis
- Earned Value Management (EVM)
- Financial reporting
- Procurement cost integration

This plan does NOT cover:
- Detailed pricing (see SOW and contracts)
- Accounting procedures (see company finance policies)
- Tax and legal financial matters

---

## Objectives

1. **Accuracy:** Develop realistic and comprehensive cost estimates
2. **Control:** Monitor and control costs throughout project lifecycle
3. **Transparency:** Provide clear visibility into financial status
4. **Value:** Maximize value delivery within budget constraints
5. **Compliance:** Adhere to financial policies and procedures
6. **Forecasting:** Enable reliable cost forecasting and projections

---

## Instructions for Completion

1. **Estimation Planning:** Define estimation approach and methods
2. **Cost Categories:** Identify all cost categories and components
3. **Estimation:** Develop detailed cost estimates
4. **Budgeting:** Create time-phased budget and S-curve
5. **Baseline:** Establish approved cost baseline
6. **Controls:** Define cost control thresholds and procedures
7. **Reporting:** Establish financial reporting cadence
8. **Review:** Regular review and updates

---

# 1. COST ESTIMATION

## 1.1 Estimation Methods

| Method | Application | Accuracy | When to Use |
|--------|-------------|----------|-------------|
| **Expert Judgment** | Novel or unique work | Medium | Limited historical data |
| **Analogous** | Similar past projects | Low-Medium | Early planning |
| **Parametric** | Quantifiable work | High | Standardized tasks |
| **Bottom-Up** | Detailed planning phase | High | WBS complete |
| **Three-Point** | Uncertain costs | Medium-High | Risk consideration |

## 1.2 Cost Categories

### Direct Costs
Costs directly attributable to the project:

| Category | Components | Estimation Method |
|----------|------------|-------------------|
| **Labor** | Salaries, benefits, contractors | Bottom-up by resource |
| **Materials** | Hardware, software licenses | Vendor quotes |
| **Services** | Consulting, specialized services | SOW/Contract |
| **Equipment** | Tools, infrastructure | Quotes/purchases |
| **Travel** | Transportation, lodging | Per diem rates |

### Indirect Costs
Costs allocated to the project:

| Category | Components | Allocation Method |
|----------|------------|-------------------|
| **Overhead** | Facilities, utilities | % of direct costs |
| **Administrative** | PMO support, finance | Fixed allocation |
| **Tools** | Shared software, platforms | Usage-based |

### Reserve Analysis

| Reserve Type | Purpose | Calculation | Control |
|--------------|---------|-------------|---------|
| **Contingency** | Known risks | % of base estimate | PM authority |
| **Management** | Unknown risks | % of total | Sponsor authority |

## 1.3 Cost Estimation Process

### Step 1: Resource Planning
- Identify required resources by WBS element
- Define resource rates and availability
- Document assumptions

### Step 2: Activity Costing
- Estimate cost for each activity
- Include labor, materials, and other direct costs
- Apply appropriate estimation technique

### Step 3: Aggregation
- Roll up activity costs to work packages
- Roll up work packages to control accounts
- Sum to project total

### Step 4: Reserve Analysis
- Calculate contingency reserve
- Calculate management reserve
- Document reserve rationale

### Step 5: Documentation
- Document estimation basis
- Record assumptions and constraints
- Obtain review and approval

## 1.4 Cost Estimation Accuracy

| Phase | Estimate Type | Accuracy Range | Confidence |
|-------|---------------|----------------|------------|
| Initiation | Rough Order of Magnitude | -25% to +75% | Low |
| Planning | Budget Estimate | -10% to +25% | Medium |
| Execution | Definitive Estimate | -5% to +10% | High |

---

# 2. BUDGETING

## 2.1 Budget Components

### Project Budget Summary

| Component | Amount | % of Total | Notes |
|-----------|--------|------------|-------|
| **Direct Labor** | [[AMOUNT]] | [[%]] | [[NOTES]] |
| **Subcontractors** | [[AMOUNT]] | [[%]] | [[NOTES]] |
| **Materials & Equipment** | [[AMOUNT]] | [[%]] | [[NOTES]] |
| **Software & Licenses** | [[AMOUNT]] | [[%]] | [[NOTES]] |
| **Travel & Expenses** | [[AMOUNT]] | [[%]] | [[NOTES]] |
| **Other Direct Costs** | [[AMOUNT]] | [[%]] | [[NOTES]] |
| **Subtotal (Direct)** | [[AMOUNT]] | [[%]] | |
| **Indirect Costs** | [[AMOUNT]] | [[%]] | [[NOTES]] |
| **Contingency Reserve** | [[AMOUNT]] | [[%]] | [[NOTES]] |
| **Management Reserve** | [[AMOUNT]] | [[%]] | [[NOTES]] |
| **TOTAL PROJECT BUDGET** | [[AMOUNT]] | 100% | |

## 2.2 Time-Phased Budget (S-Curve)

| Phase | Period | Budget | Cumulative | % Complete |
|-------|--------|--------|------------|------------|
| Discovery | Month 1 | [[AMOUNT]] | [[AMOUNT]] | [[%]] |
| Design | Month 2 | [[AMOUNT]] | [[AMOUNT]] | [[%]] |
| Development | Months 3-5 | [[AMOUNT]] | [[AMOUNT]] | [[%]] |
| QA | Month 6 | [[AMOUNT]] | [[AMOUNT]] | [[%]] |
| Deployment | Month 7 | [[AMOUNT]] | [[AMOUNT]] | [[%]] |
| **TOTAL** | | [[AMOUNT]] | [[AMOUNT]] | 100% |

## 2.3 Control Accounts

| Control Account | WBS Code | Budget | Manager |
|-----------------|----------|--------|---------|
| Project Management | 1.0 | [[AMOUNT]] | PM |
| Discovery | 2.0 | [[AMOUNT]] | PO |
| Design | 3.0 | [[AMOUNT]] | TL |
| Development | 4.0 | [[AMOUNT]] | TL |
| Quality Assurance | 5.0 | [[AMOUNT]] | QA |
| Deployment | 6.0 | [[AMOUNT]] | OPS |

---

# 3. COST BASELINE

## 3.1 Baseline Components

### Approved Cost Baseline
**Baseline Date:** [[DATE]]  
**Version:** [[VERSION]]  
**Total Budget:** [[AMOUNT]]  
**Contingency Reserve:** [[AMOUNT]]  
**Management Reserve:** [[AMOUNT]]

### Baseline Structure
- Time-phased budget by period
- Budget by WBS element
- Budget by cost category
- Funding requirements schedule

## 3.2 Baseline Change Control

| Change Type | Threshold | Approval Required | Baseline Update |
|-------------|-----------|-------------------|-----------------|
| Minor | < 5% of control account | Control Account Manager | Update tracking |
| Medium | 5-15% of control account | Project Manager | Update baseline |
| Major | > 15% or cross-account | Sponsor/CCB | Full rebaseline |

---

# 4. COST CONTROL

## 4.1 Cost Monitoring

### Monitoring Activities

| Activity | Frequency | Owner | Output |
|----------|-----------|-------|--------|
| Timesheet Review | Weekly | PM | Labor actuals |
| Expense Review | Weekly | PM | Expense actuals |
| Cost Reporting | Monthly | PM | Cost report |
| Forecast Update | Monthly | PM | EAC/ETC |
| Variance Analysis | Monthly | PM | Variance report |

### Cost Data Sources

| Source | Data | Frequency | Owner |
|--------|------|-----------|-------|
| Timesheets | Labor hours/costs | Weekly | Team |
| Invoices | Vendor costs | As incurred | Finance |
| Expense Reports | T&E costs | As incurred | Team |
| Procurement System | PO/Contract costs | As incurred | Procurement |

## 4.2 Earned Value Management (EVM)

### EVM Metrics

| Metric | Formula | Purpose | Target |
|--------|---------|---------|--------|
| **Planned Value (PV)** | Budgeted cost of work scheduled | What should be spent | Baseline |
| **Earned Value (EV)** | Budgeted cost of work performed | Value of work done | Maximize |
| **Actual Cost (AC)** | Actual cost of work performed | What was spent | Minimize |
| **Cost Variance (CV)** | EV - AC | Cost performance | > 0 |
| **Schedule Variance (SV)** | EV - PV | Schedule performance | > 0 |
| **Cost Performance Index (CPI)** | EV / AC | Cost efficiency | > 1.0 |
| **Schedule Performance Index (SPI)** | EV / PV | Schedule efficiency | > 1.0 |
| **Estimate at Completion (EAC)** | BAC / CPI | Forecast total cost | = BAC |
| **Estimate to Complete (ETC)** | EAC - AC | Forecast remaining cost | |
| **Variance at Completion (VAC)** | BAC - EAC | Forecast variance | = 0 |
| **To-Complete Performance Index (TCPI)** | (BAC - EV) / (BAC - AC) | Required efficiency | |

### EVM Interpretation

| CPI | SPI | Interpretation | Action |
|-----|-----|----------------|--------|
| > 1.0 | > 1.0 | Under budget, ahead | Monitor |
| > 1.0 | < 1.0 | Under budget, behind | Accelerate |
| < 1.0 | > 1.0 | Over budget, ahead | Investigate |
| < 1.0 | < 1.0 | Over budget, behind | Recovery plan |

## 4.3 Variance Thresholds

| Variance | Status | Action |
|----------|--------|--------|
| CV/SV within ±5% | Green | Continue monitoring |
| CV/SV 5-10% | Yellow | Analyze root cause |
| CV/SV > 10% | Red | Develop recovery plan |
| CPI/SPI < 0.9 | Red | Immediate action required |

## 4.4 Cost Recovery

### Recovery Strategies

| Strategy | When to Use | Considerations |
|----------|-------------|----------------|
| **Scope Reduction** | Features can be deferred | Client approval required |
| **Efficiency Improvement** | Process improvements possible | Team buy-in needed |
| **Resource Substitution** | Lower cost resources available | Skill assessment required |
| **Schedule Compression** | Time is cost driver | May increase risk |
| **Budget Increase** | Other options exhausted | Sponsor approval required |
| **Accept Variance** | Within acceptable range | Document decision |

---

# 5. FINANCIAL CONTROLS

## 5.1 Approval Authorities

| Amount | Approver | Documentation |
|--------|----------|---------------|
| < [[AMOUNT]] | Project Manager | Email/verbal |
| [[AMOUNT]] - [[AMOUNT]] | Product Owner | Written request |
| [[AMOUNT]] - [[AMOUNT]] | Steering Committee | Business case |
| > [[AMOUNT]] | Executive Sponsor | Formal proposal |

## 5.2 Procurement Cost Integration

### Vendor Cost Tracking

| Vendor | Contract Value | Invoiced | Paid | Balance |
|--------|----------------|----------|------|---------|
| [[VENDOR_1]] | [[AMOUNT]] | [[AMOUNT]] | [[AMOUNT]] | [[AMOUNT]] |
| [[VENDOR_2]] | [[AMOUNT]] | [[AMOUNT]] | [[AMOUNT]] | [[AMOUNT]] |

### Purchase Order Tracking

| PO Number | Vendor | Amount | Status | Expected Delivery |
|-----------|--------|--------|--------|-------------------|
| [[PO_1]] | [[VENDOR]] | [[AMOUNT]] | [[STATUS]] | [[DATE]] |

## 5.3 Contingency Management

### Contingency Drawdown

| Request ID | Date | Amount | Justification | Approved By | Balance |
|------------|------|--------|---------------|-------------|---------|
| CR001 | [[DATE]] | [[AMOUNT]] | [[REASON]] | [[NAME]] | [[AMOUNT]] |

### Contingency Reporting
- Current contingency balance reported monthly
- Drawdowns documented with rationale
- Trend analysis of contingency usage

---

# 6. COST REPORTING

## 6.1 Cost Reports

| Report | Frequency | Audience | Content |
|--------|-----------|----------|---------|
| **Weekly Labor Report** | Weekly | PM, Team | Hours, costs by person |
| **Monthly Cost Report** | Monthly | Stakeholders | Actuals, forecast, variance |
| **EVM Dashboard** | Monthly | Steering Committee | CPI, SPI, EAC |
| **Phase Cost Summary** | Per phase | All stakeholders | Phase costs, trends |
| **Project Closeout** | At closure | Sponsor | Final costs, reconciliation |

## 6.2 Cost Dashboard

| Metric | Current | Target | Trend | Status |
|--------|---------|--------|-------|--------|
| **Budget Utilization** | [[%]] | [[%]] | [[↑/↓]] | [[RAG]] |
| **CPI** | [[VALUE]] | > 1.0 | [[↑/↓]] | [[RAG]] |
| **SPI** | [[VALUE]] | > 1.0 | [[↑/↓]] | [[RAG]] |
| **EAC vs BAC** | [[%]] | 100% | [[↑/↓]] | [[RAG]] |
| **Contingency Used** | [[%]] | < 50% | [[↑/↓]] | [[RAG]] |

---

# 7. APPENDICES

## Appendix A: Cost Estimation Worksheet

```
COST ESTIMATION WORKSHEET

WBS Element: [[CODE]] - [[NAME]]
Date: [[DATE]]
Estimator: [[NAME]]

Labor Costs:
| Resource | Hours | Rate | Amount |
|----------|-------|------|--------|
| [[ROLE]] | [[HOURS]] | [[RATE]] | [[AMOUNT]] |
| **Subtotal Labor** | | | [[AMOUNT]] |

Material Costs:
| Item | Quantity | Unit Cost | Amount |
|------|----------|-----------|--------|
| [[ITEM]] | [[QTY]] | [[COST]] | [[AMOUNT]] |
| **Subtotal Materials** | | | [[AMOUNT]] |

Other Costs: [[AMOUNT]]

Base Estimate: [[AMOUNT]]
Contingency ([[%]]%): [[AMOUNT]]

Total Estimate: [[AMOUNT]]

Assumptions:
[[ASSUMPTIONS]]
```

## Appendix B: Budget Change Request

```
BUDGET CHANGE REQUEST

BCR Number: BCR-[[NUMBER]]
Date: [[DATE]]
Requestor: [[NAME]]

Change Description:
[[DESCRIPTION]]

Current Budget: [[AMOUNT]]
Requested Change: [[AMOUNT]] (+/-)
New Budget: [[AMOUNT]]

Justification:
[[JUSTIFICATION]]

Impact Analysis:
Scope Impact: [[DESCRIPTION]]
Schedule Impact: [[DESCRIPTION]]
Risk Impact: [[DESCRIPTION]]

Funding Source:
☐ Reallocation from [[CATEGORY]]
☐ Contingency Reserve
☐ Management Reserve
☐ Additional funding

Approved By: _________________ Date: _______
```

## Appendix C: Reference Documents

| Document | Location | Purpose |
|----------|----------|---------|
| Detailed Budget | [[LOCATION]] | Line-item budget |
| Cost Baseline | [[LOCATION]] | Approved baseline |
| EVM Workbook | [[LOCATION]] | EVM calculations |
| Change Log | [[LOCATION]] | Budget changes |
| Invoices | [[LOCATION]] | Vendor invoices |

---

*End of Cost Management Plan*

**Document Owner:** [[PROJECT_MANAGER]]  
**Last Updated:** [[DATE]]  
**Next Review:** [[DATE]]
