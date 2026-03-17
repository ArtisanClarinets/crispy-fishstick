# Risk Management Plan

---

## Document Control

| Field | Value |
|-------|-------|
| **Document ID** | VS-GOV-117-RMP |
| **Version** | 1.0 |
| **Date** | [[DATE]] |
| **Author** | [[PROJECT_MANAGER]] |
| **Status** | Draft / Approved |
| **Classification** | Internal / Client Confidential |
| **Review Cycle** | Bi-weekly or as risks materialize |
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

The Risk Management Plan establishes the framework for identifying, analyzing, responding to, and monitoring risks for [[PROJECT_NAME]]. It defines how risk management activities will be structured and performed to minimize threats and maximize opportunities, ensuring project objectives are achieved.

---

## Scope

This Risk Management Plan covers:
- Risk management methodology and approach
- Risk identification processes
- Qualitative and quantitative risk analysis
- Risk response planning and implementation
- Risk monitoring and control
- Risk reporting and escalation
- Contingency and reserve management

This plan does NOT cover:
- Specific risk details (see Risk Register)
- Issue management (see Issue Log)
- Business continuity planning (see BCP)

---

## Objectives

1. **Identification:** Systematically identify project risks
2. **Analysis:** Assess risk probability and impact
3. **Response:** Develop appropriate risk responses
4. **Monitoring:** Continuously monitor and control risks
5. **Communication:** Keep stakeholders informed of risk status
6. **Opportunity:** Identify and exploit positive risks

---

## Instructions for Completion

1. **Methodology Selection:** Define risk management approach
2. **Categories Definition:** Establish risk categories and taxonomy
3. **Identification Planning:** Plan risk identification activities
4. **Analysis Planning:** Define analysis methods and criteria
5. **Response Planning:** Define response strategies and processes
6. **Monitoring Planning:** Establish monitoring cadence and metrics
7. **Baseline:** Obtain approval and communicate to team
8. **Execution:** Execute risk management throughout project

---

# 1. RISK MANAGEMENT METHODOLOGY

## 1.1 Risk Management Approach

**Methodology:** [[QUALITATIVE/QUANTITATIVE/HYBRID]]

### Approach Justification
[[RATIONALE_FOR_SELECTED_APPROACH]]

### Risk Management Process

```
Identify → Analyze → Prioritize → Plan Response → Implement → Monitor
    ↑___________________________________________________________|
```

## 1.2 Risk Tolerance and Thresholds

### Risk Appetite

| Aspect | Tolerance Level | Threshold |
|--------|-----------------|-----------|
| **Schedule** | Low | > 1 week delay |
| **Budget** | Medium | > 10% variance |
| **Quality** | Very Low | Any P0 defect |
| **Scope** | Medium | > 5% change |
| **Reputation** | Very Low | Any client escalation |

### Risk Thresholds

| Risk Score | Status | Action Required |
|------------|--------|-----------------|
| 1-4 (Low) | Green | Monitor |
| 5-9 (Medium) | Yellow | Active management |
| 10-16 (High) | Orange | Immediate action |
| 17-25 (Critical) | Red | Escalate to sponsor |

---

# 2. RISK CATEGORIES AND TAXONOMY

## 2.1 Risk Breakdown Structure (RBS)

```
Project Risks
├── Technical Risks
│   ├── Technology
│   ├── Requirements
│   ├── Quality
│   └── Integration
├── External Risks
│   ├── Regulatory
│   ├── Market
│   ├── Customer
│   └── Vendors
├── Organizational Risks
│   ├── Resources
│   ├── Funding
│   ├── Priorities
│   └── Dependencies
├── Project Management Risks
│   ├── Planning
│   ├── Communication
│   ├── Control
│   └── Estimation
└── Environmental Risks
    ├── Infrastructure
    ├── Security
    └── Disasters
```

## 2.2 Risk Categories

| Category | Description | Examples |
|----------|-------------|----------|
| **Technical** | Technology and implementation risks | New technology, complexity |
| **External** | Outside project control | Vendor delays, regulations |
| **Organizational** | Internal organizational risks | Resource availability, funding |
| **Project Mgmt** | Project management risks | Planning, estimation |
| **Environmental** | Infrastructure and environment | Security, disasters |

---

# 3. RISK IDENTIFICATION

## 3.1 Identification Methods

| Method | When Used | Participants | Output |
|--------|-----------|--------------|--------|
| **Brainstorming** | Initial identification | Full team | Risk list |
| **Checklists** | Standard project types | PM, Leads | Common risks |
| **Assumptions Analysis** | Planning phase | Team | Assumption risks |
| **SWOT Analysis** | Strategic planning | Leadership | Strategic risks |
| **Expert Interviews** | Specialized areas | SMEs | Technical risks |
| **Document Review** | Throughout project | PM | Hidden risks |
| **Lessons Learned** | Planning | PM | Historical risks |

## 3.2 Identification Activities

| Activity | Timing | Owner | Participants |
|----------|--------|-------|--------------|
| **Initial Risk Workshop** | Project kickoff | PM | Full team |
| **Sprint Risk Review** | Per sprint | Scrum Master | Team |
| **Phase Risk Review** | Per phase | PM | Stakeholders |
| **Ad-hoc Identification** | As needed | Any | Relevant |

## 3.3 Risk Register Structure

| Field | Description |
|-------|-------------|
| **Risk ID** | Unique identifier (R001, R002, etc.) |
| **Risk Category** | RBS category |
| **Risk Description** | Clear description of risk event |
| **Probability** | Likelihood (1-5) |
| **Impact** | Effect on objectives (1-5) |
| **Risk Score** | Probability × Impact |
| **Response Strategy** | Avoid/Transfer/Mitigate/Accept/Exploit |
| **Response Actions** | Specific actions to implement |
| **Risk Owner** | Person responsible for response |
| **Status** | Active/Monitoring/Closed |
| **Trigger** | Event indicating risk occurrence |
| **Residual Risk** | Remaining risk after response |

---

# 4. RISK ANALYSIS

## 4.1 Qualitative Risk Analysis

### Probability Scale

| Rating | Probability | Description |
|--------|-------------|-------------|
| **1 - Rare** | < 10% | Unlikely to occur |
| **2 - Unlikely** | 10-30% | May occur |
| **3 - Possible** | 30-50% | Likely to occur |
| **4 - Likely** | 50-70% | Probably will occur |
| **5 - Almost Certain** | > 70% | Expected to occur |

### Impact Scale

| Rating | Schedule | Cost | Quality | Scope |
|--------|----------|------|---------|-------|
| **1 - Negligible** | < 1 day | < 1% | Minor | Cosmetic |
| **2 - Minor** | 1-3 days | 1-5% | Low impact | Small change |
| **3 - Moderate** | 3-1 week | 5-10% | Medium | Significant |
| **4 - Major** | 1-2 weeks | 10-20% | High | Major change |
| **5 - Critical** | > 2 weeks | > 20% | Critical | Project failure |

### Probability-Impact Matrix

| Probability | Impact 1 | Impact 2 | Impact 3 | Impact 4 | Impact 5 |
|-------------|----------|----------|----------|----------|----------|
| **5 - Almost Certain** | 5 | 10 | 15 | 20 | 25 |
| **4 - Likely** | 4 | 8 | 12 | 16 | 20 |
| **3 - Possible** | 3 | 6 | 9 | 12 | 15 |
| **2 - Unlikely** | 2 | 4 | 6 | 8 | 10 |
| **1 - Rare** | 1 | 2 | 3 | 4 | 5 |

*Green (1-4): Monitor | Yellow (5-9): Active Management | Orange (10-16): Immediate Action | Red (17-25): Escalate*

## 4.2 Quantitative Risk Analysis

### Methods

| Method | Application | Tools |
|--------|-------------|-------|
| **Expected Monetary Value (EMV)** | Cost risks | Spreadsheet |
| **Monte Carlo Simulation** | Schedule/cost uncertainty | @Risk, Crystal Ball |
| **Decision Tree Analysis** | Complex decisions | Decision tree software |
| **Sensitivity Analysis** | Key risk drivers | Tornado diagrams |

### EMV Calculation

EMV = Probability × Impact

| Risk | Probability | Impact | EMV |
|------|-------------|--------|-----|
| [[RISK_1]] | [[%]] | [[AMOUNT]] | [[EMV]] |
| [[RISK_2]] | [[%]] | [[AMOUNT]] | [[EMV]] |
| **Total EMV** | | | [[TOTAL]] |

---

# 5. RISK RESPONSE PLANNING

## 5.1 Response Strategies for Threats

| Strategy | When to Use | Description |
|----------|-------------|-------------|
| **Avoid** | High probability/impact, avoidable | Eliminate threat or protect objectives |
| **Transfer** | Third party can manage better | Shift impact to third party (insurance, contract) |
| **Mitigate** | Can reduce probability/impact | Reduce probability and/or impact |
| **Accept** | Low priority or unavoidable | Acknowledge but take no action |

### Active vs. Passive Acceptance
- **Active:** Develop contingency plan
- **Passive:** Deal with if occurs

## 5.2 Response Strategies for Opportunities

| Strategy | When to Use | Description |
|----------|-------------|-------------|
| **Exploit** | High value opportunity | Ensure opportunity occurs |
| **Share** | Better with partner | Share with third party |
| **Enhance** | Can increase probability/impact | Increase chance or value |
| **Accept** | Worth pursuing if occurs | Take advantage if happens |

## 5.3 Response Planning Process

### Step 1: Strategy Selection
- Review risk score and category
- Select appropriate strategy
- Document rationale

### Step 2: Action Definition
- Define specific response actions
- Assign risk owner
- Set timeline
- Estimate cost

### Step 3: Contingency Planning
- Define trigger conditions
- Develop contingency plan
- Allocate reserves if needed

### Step 4: Implementation
- Execute response actions
- Monitor effectiveness
- Update risk register

## 5.4 Risk Response Template

```
RISK RESPONSE PLAN

Risk ID: [[ID]]
Risk Description: [[DESCRIPTION]]
Risk Score: [[SCORE]]

Response Strategy: [[STRATEGY]]

Response Actions:
1. [[ACTION_1]] - Owner: [[NAME]] - Due: [[DATE]]
2. [[ACTION_2]] - Owner: [[NAME]] - Due: [[DATE]]

Contingency Plan:
Trigger: [[TRIGGER_CONDITION]]
Action: [[CONTINGENCY_ACTION]]
Resources Needed: [[RESOURCES]]

Residual Risk: [[DESCRIPTION]]
Residual Score: [[SCORE]]
```

---

# 6. RISK MONITORING AND CONTROL

## 6.1 Monitoring Activities

| Activity | Frequency | Owner | Output |
|----------|-----------|-------|--------|
| **Risk Register Review** | Bi-weekly | PM | Updated risks |
| **Sprint Risk Review** | Per sprint | Scrum Master | Team risks |
| **Trigger Monitoring** | Continuous | Risk Owners | Early warning |
| **Response Effectiveness** | Monthly | PM | Response status |
| **New Risk Identification** | Continuous | All | New risks |

## 6.2 Risk Triggers

| Risk | Trigger | Early Warning |
|------|---------|---------------|
| [[RISK_1]] | [[TRIGGER]] | [[WARNING_SIGN]] |
| [[RISK_2]] | [[TRIGGER]] | [[WARNING_SIGN]] |

## 6.3 Risk Reporting

| Report | Frequency | Audience | Content |
|--------|-----------|----------|---------|
| **Risk Status** | Bi-weekly | Team | Top risks, actions |
| **Risk Dashboard** | Monthly | Stakeholders | Risk metrics, trends |
| **Risk Report** | Per phase | Steering Committee | Comprehensive status |
| **Escalation Report** | As needed | Sponsor | Critical risks |

## 6.4 Risk Metrics

| Metric | Definition | Target | Frequency |
|--------|------------|--------|-----------|
| **Risk Identification Rate** | New risks per period | [[NUMBER]] | Monthly |
| **Risk Closure Rate** | Closed risks per period | [[NUMBER]] | Monthly |
| **Average Risk Score** | Mean of active risk scores | Decreasing | Monthly |
| **High Risk Count** | Number of high/critical risks | 0 | Weekly |
| **Contingency Utilization** | % contingency used | < 50% | Monthly |
| **Risk Response Effectiveness** | % responses successful | > 80% | Per response |

---

# 7. CONTINGENCY AND RESERVES

## 7.1 Contingency Reserve

**Purpose:** Known risks ("known unknowns")  
**Calculation:** Sum of EMV for identified risks or % of budget  
**Amount:** [[AMOUNT]]  
**Control:** Project Manager authority  
**Usage:** Triggered by risk event occurrence

## 7.2 Management Reserve

**Purpose:** Unknown risks ("unknown unknowns")  
**Calculation:** % of total budget  
**Amount:** [[AMOUNT]]  
**Control:** Executive Sponsor authority  
**Usage:** Unforeseen major issues

## 7.3 Reserve Management

| Reserve Type | Amount | Used | Remaining | Status |
|--------------|--------|------|-----------|--------|
| **Contingency** | [[AMOUNT]] | [[AMOUNT]] | [[AMOUNT]] | [[STATUS]] |
| **Management** | [[AMOUNT]] | [[AMOUNT]] | [[AMOUNT]] | [[STATUS]] |

---

# 8. RISK GOVERNANCE

## 8.1 Risk Roles and Responsibilities

| Role | Responsibilities |
|------|------------------|
| **Project Manager** | Overall risk management, register maintenance, reporting |
| **Risk Owner** | Monitor assigned risks, implement responses, escalate |
| **Team Members** | Identify risks, report triggers, support responses |
| **Steering Committee** | Review high risks, approve reserves, strategic decisions |
| **Executive Sponsor** | Approve management reserve, accept strategic risks |

## 8.2 Risk Escalation

### Escalation Criteria
- Risk score increases to critical (17-25)
- Risk response ineffective
- New strategic risk identified
- Multiple related risks emerge
- Risk threatens project viability

### Escalation Process
1. Risk owner notifies PM
2. PM assesses and prepares escalation
3. Escalate to appropriate authority
4. Decision made and communicated
5. Risk register updated

---

# 9. APPENDICES

## Appendix A: Risk Register Template

```
RISK REGISTER

Risk ID: R[[NUMBER]]
Date Identified: [[DATE]]
Identified By: [[NAME]]

Risk Category: [[CATEGORY]]
Risk Description: [[DESCRIPTION]]

Risk Analysis:
Probability: [[1-5]]
Impact: [[1-5]]
Risk Score: [[SCORE]]

Response Strategy: [[STRATEGY]]
Response Actions:
1. [[ACTION]]
2. [[ACTION]]

Risk Owner: [[NAME]]
Target Date: [[DATE]]
Status: [[ACTIVE/MONITORING/CLOSED]]

Trigger: [[CONDITION]]
Contingency: [[PLAN]]

Residual Risk: [[DESCRIPTION]]
Residual Score: [[SCORE]]

Notes:
[[NOTES]]
```

## Appendix B: Risk Assessment Checklist

```
RISK ASSESSMENT CHECKLIST

Identification:
☐ All WBS elements reviewed
☐ All phases considered
☐ External factors considered
☐ Stakeholder input gathered
☐ Lessons learned reviewed

Analysis:
☐ Probability assessed objectively
☐ Impact assessed across all objectives
☐ Score calculated correctly
☐ Priority established
☐ Urgency considered

Response:
☐ Appropriate strategy selected
☐ Actions are specific and actionable
☐ Owner assigned and aware
☐ Timeline realistic
☐ Resources identified
☐ Contingency defined

Monitoring:
☐ Trigger defined
☐ Review frequency set
☐ Reporting established
☐ Escalation path clear
```

## Appendix C: Reference Documents

| Document | Location | Purpose |
|----------|----------|---------|
| Risk Register | [[LOCATION]] | Detailed risk information |
| Issue Log | [[LOCATION]] | Issue tracking |
| Lessons Learned | [[LOCATION]] | Historical risks |
| Project Plans | [[LOCATION]] | Context for risks |

---

*End of Risk Management Plan*

**Document Owner:** [[PROJECT_MANAGER]]  
**Last Updated:** [[DATE]]  
**Next Review:** [[DATE]]
