---
Document: DISCOVERY_NOTES
Doc ID: VS-TEMPLATE-DISCOVERY-001
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Business Analyst / Solution Architect
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/company-docs/client-project-doc-templates/docs/03_discovery/01_DISCOVERY_NOTES.md
---

# Discovery Notes

## Instructions

This document captures comprehensive findings from all discovery activities. Use it to:
- Record stakeholder insights systematically
- Track pain points across organizational layers
- Document current systems and their limitations
- Identify opportunities for improvement
- Maintain traceability between findings and requirements

**When to update:** After every stakeholder interview, workshop, or system review session.

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [[2026-02-25]] | [[Author Name]] | Initial template creation |
| 1.1 | [[2026-02-25]] | [[Author Name]] | Added stakeholder mapping section |
| 2.0 | 2026-02-02 | Vantus Systems | Comprehensive BABOK-aligned update |

**Distribution List:**
- [[Project Sponsor]]
- [[Product Owner]]
- [[Solution Architect]]
- [[Technical Lead]]

---

## 1. Discovery Goals & Objectives

### Primary Discovery Objectives
| ID | Objective | Target Outcome | Priority |
|----|-----------|----------------|----------|
| DG-001 | [[Understand current order processing workflow]] | [[Documented as-is process with pain points]] | High |
| DG-002 | [[Identify integration requirements with legacy ERP]] | [[Complete system interface inventory]] | High |
| DG-003 | [[Map user personas and their daily workflows]] | [[Validated persona documentation]] | Medium |
| DG-004 | [[Determine compliance and security requirements]] | [[Regulatory requirements checklist]] | High |

### Scope Boundaries
**In Scope:**
- [[Core business processes within the order-to-cash cycle]]
- [[User groups directly interacting with the system]]
- [[Existing integrations and data exchanges]]

**Out of Scope:**
- [[Processes outside the defined business unit]]
- [[Third-party vendor internal systems]]
- [[Historical data migration beyond 2 years]]

---

## 2. Stakeholder Mapping

### Stakeholder Register

| ID | Name | Role | Department | Influence | Interest | Engagement Strategy | Status |
|----|------|------|------------|-----------|----------|---------------------|--------|
| STK-001 | [[Jane Smith]] | [[VP Operations]] | [[Operations]] | High | High | [[Weekly 1:1s, steering committee]] | [[Engaged]] |
| STK-002 | [[John Doe]] | [[IT Director]] | [[Technology]] | High | Medium | [[Bi-weekly technical reviews]] | [[Engaged]] |
| STK-003 | [[Maria Garcia]] | [[End User - CSR]] | [[Customer Service]] | Low | High | [[User interviews, UAT participation]] | [[Pending]] |
| STK-004 | [[Robert Chen]] | [[Compliance Officer]] | [[Legal]] | Medium | High | [[Requirements review sessions]] | [[Engaged]] |

### RACI Matrix for Discovery Activities

| Activity | Executive Sponsor | Product Owner | BA/SA | End Users | IT Lead |
|----------|-------------------|---------------|-------|-----------|---------|
| Stakeholder Interviews | A | R | R | C | I |
| Current State Documentation | I | A | R | C | C |
| Requirements Elicitation | I | A | R | R | C |
| Prioritization Workshops | A | R | C | C | I |
| Sign-off | A | R | C | I | I |

**Legend:** R = Responsible, A = Accountable, C = Consulted, I = Informed

---

## 3. Stakeholder Interview Log

### Interview Schedule

| ID | Date | Stakeholder | Role | Interviewer | Duration | Location/Format |
|----|------|-------------|------|-------------|----------|-----------------|
| INT-001 | [[2026-02-25]] | [[Name]] | [[Title]] | [[Interviewer]] | [[60 min]] | [[In-person/Zoom]] |
| INT-002 | [[2026-02-25]] | [[Name]] | [[Title]] | [[Interviewer]] | [[45 min]] | [[In-person/Zoom]] |

### Interview Template & Questions

#### Opening Questions (Context Setting)
1. **Role & Responsibilities:** "Can you walk me through your typical day and primary responsibilities?"
2. **Success Metrics:** "How do you measure success in your role? What KPIs matter most?"
3. **Team Structure:** "Who do you work with most closely? What does that collaboration look like?"

#### Current State Questions (Process Understanding)
4. **Workflow Description:** "Walk me through the current process for [[specific activity]]. What happens step-by-step?"
5. **Tools & Systems:** "What systems or tools do you use daily? How do they fit together?"
6. **Data Flow:** "Where does the data come from? Where does it go? Who else needs it?"
7. **Decision Points:** "What decisions do you need to make in this process? What information do you need?"

#### Pain Point Questions (Problem Identification)
8. **Frustrations:** "What are the biggest frustrations or inefficiencies in your current workflow?"
9. **Workarounds:** "Are there any workarounds you or your team have created? Why were they necessary?"
10. **Error Handling:** "What happens when things go wrong? How do you recover?"
11. **Time Wasters:** "What tasks take longer than they should? Where do you feel you're wasting time?"

#### Future State Questions (Vision & Requirements)
12. **Ideal State:** "If you could wave a magic wand, how would this process work?"
13. **Must-Haves:** "What capabilities are absolutely essential? What can't you live without?"
14. **Nice-to-Haves:** "What would make your job significantly easier, even if not critical?"
15. **Concerns:** "What concerns do you have about changing this process or system?"

#### Closing Questions (Next Steps)
16. **Documentation:** "Are there any documents, reports, or examples you can share with us?"
17. **Other Stakeholders:** "Who else should we talk to? What would they tell us?"
18. **Follow-up:** "Can we schedule a follow-up if we have additional questions?"

### Interview Findings Summary

#### INT-001: [[Stakeholder Name]] - [[Role]]

**Key Takeaways:**
- [[Critical insight about current process bottleneck]]
- [[Unexpected finding about user behavior]]
- [[Regulatory constraint not previously documented]]

**Pain Points Identified:**
1. [[Pain point description]]
2. [[Pain point description]]

**Opportunities:**
- [[Potential improvement area]]
- [[Automation candidate]]

**Follow-ups Required:**
- [ ] [[Request for additional documentation]]
- [ ] [[Schedule follow-up with team member]]
- [ ] [[Validate finding with another stakeholder]]

---

## 4. Pain Point Analysis

### Pain Point Register

| ID | Pain Point | Category | Severity | Frequency | Impact | Stakeholders Affected | Root Cause | Proposed Solution |
|----|------------|----------|----------|-----------|--------|----------------------|------------|-------------------|
| PP-001 | [[Manual data entry between systems]] | [[Efficiency]] | High | Daily | [[2 hours/day wasted]] | [[CSRs, Data Entry]] | [[Lack of system integration]] | [[API integration with ERP]] |
| PP-002 | [[No visibility into order status]] | [[Visibility]] | Medium | Multiple times/day | [[Customer complaints]] | [[CSRs, Customers]] | [[No centralized tracking]] | [[Real-time dashboard]] |
| PP-003 | [[Reports take 24 hours to generate]] | [[Performance]] | High | Weekly | [[Delayed decisions]] | [[Management]] | [[Legacy database performance]] | [[Data warehouse + caching]] |

### Pain Point Categorization Framework

**Categories:**
- **Efficiency:** Time-consuming manual processes, redundant work
- **Accuracy:** Data errors, quality issues, compliance gaps
- **Visibility:** Lack of reporting, status unknown, poor transparency
- **Integration:** System silos, manual handoffs, data inconsistency
- **Performance:** Slow response times, system downtime, scalability issues
- **User Experience:** Poor usability, steep learning curve, low adoption

**Severity Scale:**
- **Critical:** Blocks business operations, regulatory risk, significant financial impact
- **High:** Major productivity loss, frequent user complaints, customer impact
- **Medium:** Moderate inefficiency, workarounds exist but are burdensome
- **Low:** Minor inconvenience, cosmetic issues

### Impact Analysis

| Pain Point ID | Business Impact | User Impact | Technical Impact | Financial Impact |
|---------------|-----------------|-------------|------------------|------------------|
| PP-001 | [[Delayed order processing]] | [[Frustration, overtime]] | [[Data inconsistency]] | [[$50K/year in labor]] |
| PP-002 | [[Customer churn risk]] | [[High stress, escalations]] | [[None]] | [[Unknown]] |

---

## 5. Current Systems Inventory

### System Register

| ID | System Name | Vendor/Platform | Version | Purpose | Users | Integration Points | Criticality | Retirement Plan |
|----|-------------|-----------------|---------|---------|-------|-------------------|-------------|-----------------|
| SYS-001 | [[Legacy ERP]] | [[SAP/Oracle/Custom]] | [[vX.X]] | [[Core business operations]] | [[200]] | [[CRM, WMS, Financial]] | Critical | [[Phase out in 18 months]] |
| SYS-002 | [[Custom Database]] | [[MS SQL Server]] | [[2019]] | [[Data storage]] | [[50]] | [[ERP, Reporting]] | High | [[Migrate to cloud]] |
| SYS-003 | [[Spreadsheet Tracker]] | [[Excel/Google Sheets]] | [[N/A]] | [[Manual tracking]] | [[25]] | [[None]] | Low | [[Replace with system]] |

### System Interface Map

```
[[LEGACY ERP]] ←→ [[CRM SYSTEM]]
      ↓
[[WAREHOUSE MGT]] ←→ [[SHIPPING API]]
      ↓
[[REPORTING DB]] → [[BI TOOL]]
```

**Interface Details:**

| From | To | Method | Frequency | Data Volume | Reliability |
|------|----|--------|-----------|-------------|-------------|
| [[ERP]] | [[CRM]] | [[API/CSV/DB Link]] | [[Real-time/Daily]] | [[Records/day]] | [[99.9%/Problematic]] |

### Technical Debt Assessment

| System | Debt Item | Risk Level | Effort to Remediate | Business Impact |
|--------|-----------|------------|---------------------|-----------------|
| [[SYS-001]] | [[No API documentation]] | High | [[2 weeks]] | [[Integration delays]] |
| [[SYS-002]] | [[Single point of failure]] | Critical | [[1 month]] | [[System downtime]] |

---

## 6. Data Discovery

### Data Entities

| Entity | Source System | Volume | Growth Rate | Quality Score | Sensitivity |
|--------|---------------|--------|-------------|---------------|-------------|
| [[Customers]] | [[CRM]] | [[50,000 records]] | [[10%/year]] | [[85%]] | [[PII - High]] |
| [[Orders]] | [[ERP]] | [[1M records]] | [[15%/year]] | [[92%]] | [[Business]] |
| [[Products]] | [[ERP]] | [[5,000 SKUs]] | [[5%/year]] | [[95%]] | [[Public]] |

### Data Quality Issues

| Issue | Entity | Impact | Root Cause | Proposed Fix |
|-------|--------|--------|------------|--------------|
| [[Duplicate customer records]] | [[Customers]] | [[Reporting inaccuracy]] | [[No validation rules]] | [[Data cleansing + dedup]] |
| [[Missing product categories]] | [[Products]] | [[Search/filter issues]] | [[Legacy import]] | [[Backfill + validation]] |

---

## 7. Constraints & Assumptions

### Business Constraints
- [[Budget limit of $XXX]]
- [[Must launch by Q3 2026]]
- [[Compliance with GDPR/SOC2 required]]
- [[Integration with existing ERP mandatory]]

### Technical Constraints
- [[Must use existing cloud infrastructure]]
- [[No changes to legacy database schema]]
- [[Mobile-responsive design required]]

### Assumptions
- [[Stakeholder availability for workshops]]
- [[Access to current system documentation]]
- [[No major organizational changes during project]]
- [[Third-party API availability]]

### Risks

| ID | Risk | Probability | Impact | Mitigation Strategy |
|----|------|-------------|--------|---------------------|
| R-001 | [[Key stakeholder unavailability]] | Medium | High | [[Early scheduling, backups identified]] |
| R-002 | [[Incomplete legacy system documentation]] | High | Medium | [[System analysis, reverse engineering]] |

---

## 8. Discovery Decisions Log

| ID | Date | Decision | Rationale | Decision Maker | Impact |
|----|------|----------|-----------|----------------|--------|
| D-001 | [[2026-02-25]] | [[Scope limited to X modules]] | [[Budget constraints]] | [[Project Sponsor]] | [[Phased approach required]] |
| D-002 | [[2026-02-25]] | [[Use existing authentication]] | [[Security team preference]] | [[CISO]] | [[Integration with IdP]] |

---

## 9. Next Steps & Action Items

| ID | Action Item | Owner | Due Date | Status | Dependencies |
|----|-------------|-------|----------|--------|--------------|
| AI-001 | [[Complete stakeholder interviews]] | [[BA Name]] | [[2026-02-25]] | [[In Progress]] | [[Stakeholder availability]] |
| AI-002 | [[Document current state workflows]] | [[BA Name]] | [[2026-02-25]] | [[Pending]] | [[AI-001]] |
| AI-003 | [[Validate system inventory]] | [[SA Name]] | [[2026-02-25]] | [[Pending]] | [[Access credentials]] |

---

## Appendix A: Interview Question Bank by Role

### Executive Stakeholders
- What are the top 3 business objectives this project must support?
- How will success be measured at the organizational level?
- What happens if we don't solve these problems?
- What is the budget range and timeline expectations?

### Operations/Process Owners
- Walk me through the end-to-end process from trigger to completion.
- Where are the bottlenecks? Where do things get stuck?
- What are your SLAs or time constraints?
- How do you handle exceptions and edge cases?

### End Users
- Show me how you currently complete [task].
- What takes the most time in your day?
- What errors do you encounter most frequently?
- What training or support do you currently receive?

### IT/Technical Stakeholders
- What systems are in scope? What are their architectures?
- What integration patterns do you prefer or require?
- What are the security and compliance requirements?
- What is your deployment and release process?

---

*Document Control: This template aligns with BABOK v3 Knowledge Areas: Elicitation and Collaboration, Requirements Life Cycle Management, and Strategy Analysis.*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
