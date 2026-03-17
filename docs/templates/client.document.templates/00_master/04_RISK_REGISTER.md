---
Document: RISK_REGISTER
Doc ID: VS-TEMPLATE-MASTER-005
Client: [[CLIENT_NAME]]
Project: [[PROJECT_NAME]]
Owner: Project Manager / Risk Manager
Contributors: All Project Team Members, Client Stakeholders
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/00_master/04_RISK_REGISTER.md
Approvers: [[PM_NAME]] / [[CLIENT_SPONSOR]] / [[RISK_OWNER]]
---

# Risk Register

## Purpose
This document provides **enterprise-grade risk management** for the project, identifying potential threats and opportunities, assessing their impact, and defining mitigation strategies. It enables proactive risk management rather than reactive crisis response. Use this document to:
- Identify and document risks before they materialize
- Assess and prioritize risks based on likelihood and impact
- Assign ownership and accountability for risk management
- Track mitigation progress and residual risk levels
- Escalate risks that exceed thresholds
- Learn from risk events to improve future risk identification

## Instructions
1. **Identification:** Brainstorm risks across all categories (technical, business, external, organizational)
2. **Assessment:** Score each risk for likelihood (1-5) and impact (1-5) using the scoring matrix below
3. **Prioritization:** Calculate risk score (L × I) and prioritize by score
4. **Mitigation:** Define specific mitigation strategies and contingency plans
5. **Ownership:** Assign a named individual accountable for each risk
6. **Monitoring:** Review and update the register weekly during active phases
7. **Escalation:** Escalate high-priority risks (score ≥ 13) to steering committee

---

## 1. RISK SCORING METHODOLOGY

### 1.1 Likelihood Scale (Probability of Occurrence)

| Score | Rating | Description | Frequency |
|---:|:---:|---|---|
| 1 | Rare | May occur only in exceptional circumstances | < 10% chance |
| 2 | Unlikely | Could occur at some time | 10-30% chance |
| 3 | Possible | Might occur at some time | 30-50% chance |
| 4 | Likely | Will probably occur in most circumstances | 50-70% chance |
| 5 | Almost Certain | Expected to occur in most circumstances | > 70% chance |

### 1.2 Impact Scale (Effect on Project Objectives)

| Score | Rating | Schedule Impact | Cost Impact | Quality Impact | Reputation Impact |
|---:|:---:|---|---|---|---|
| 1 | Insignificant | < 1 week delay | < 5% budget | Minor defects, easily fixed | No external awareness |
| 2 | Minor | 1-2 weeks delay | 5-10% budget | Noticeable quality degradation | Limited internal awareness |
| 3 | Moderate | 2-4 weeks delay | 10-20% budget | Significant rework required | External stakeholders aware |
| 4 | Major | 1-2 months delay | 20-30% budget | Major functionality compromised | Media attention possible |
| 5 | Catastrophic | > 2 months delay or project cancellation | > 30% budget or bankruptcy | System unusable; safety compromised | National media; regulatory action |

### 1.3 Risk Score Calculation

**Risk Score = Likelihood × Impact**

### 1.4 Risk Priority Bands

| Score Range | Priority | Action Required | Review Frequency |
|---:|:---:|---|---|
| 1-5 | Low | Monitor; no immediate action | Monthly |
| 6-12 | Medium | Active management; mitigation plan | Bi-weekly |
| 13-19 | High | Immediate action; escalate to leadership | Weekly |
| 20-25 | Critical | Urgent action; executive escalation | Daily until mitigated |

### 1.5 Risk Status Definitions

| Status | Definition |
|---|---|
| **Open** | Risk identified; active management required |
| **Monitoring** | Risk accepted; being watched for changes |
| **Mitigated** | Risk response implemented; residual risk documented |
| **Closed** | Risk no longer applicable or materialized and resolved |
| **Realized** | Risk has occurred; being managed as an issue |

---

## 2. RISK REGISTER ENTRIES

### 2.1 High Priority Risks (Score 13-25)

| ID | Risk Description | Category | Likelihood | Impact | Score | Mitigation Strategy | Contingency Plan | Owner | Review Date | Status |
|---|---|---|:---:|:---:|:---:|---|---|---|---|---|
| R-001 | [[Key stakeholder unavailable for critical decisions causing delays]] | Organizational | 4 | 4 | 16 | [[Identify backup decision-makers; document decision authority matrix; schedule key meetings 2 weeks in advance]] | [[Escalate to executive sponsor; implement time-boxed decisions; document assumptions]] | [[PM_NAME]] | [[2026-02-25]] | Open |
| R-002 | [[Third-party API dependency fails or changes terms unexpectedly]] | External | 3 | 5 | 15 | [[Implement circuit breakers; cache critical data; maintain abstraction layer; identify alternative providers]] | [[Switch to alternative provider; implement offline mode with reduced functionality]] | [[TECH_LEAD]] | [[2026-02-25]] | Open |
| R-003 | [[Requirements ambiguity leads to rework and scope creep]] | Business | 4 | 4 | 16 | [[Implement strict change control; detailed acceptance criteria; weekly stakeholder reviews; prototyping]] | [[Formal change order process; scope prioritization; phased delivery]] | [[BA_NAME]] | [[2026-02-25]] | Open |
| R-004 | [[Security vulnerability discovered in production]] | Technical | 2 | 5 | 10 | [[Security testing in CI/CD; regular penetration testing; dependency scanning; secure coding training]] | [[Incident response plan activation; emergency patching; communication plan; forensic analysis]] | [[SECURITY_LEAD]] | [[2026-02-25]] | Open |
| R-005 | [[Critical team member departure during key phase]] | Organizational | 3 | 4 | 12 | [[Cross-training; documentation standards; pair programming; knowledge sharing sessions]] | [[Activate backup resources; adjust timeline; hire contractor; redistribute work]] | [[PM_NAME]] | [[2026-02-25]] | Open |

### 2.2 Medium Priority Risks (Score 6-12)

| ID | Risk Description | Category | Likelihood | Impact | Score | Mitigation Strategy | Contingency Plan | Owner | Review Date | Status |
|---|---|---|:---:|:---:|:---:|---|---|---|---|---|
| R-006 | [[Performance does not meet non-functional requirements under load]] | Technical | 3 | 3 | 9 | [[Load testing in staging; performance budgets; caching strategy; database optimization]] | [[Scale infrastructure; implement additional caching; optimize critical paths]] | [[ARCHITECT]] | [[2026-02-25]] | Open |
| R-007 | [[Client IT security policies block required access or integrations]] | External | 3 | 3 | 9 | [[Early security review; compliance documentation; alternative access methods]] | [[Implement air-gapped solutions; manual processes; escalate to CISO]] | [[SECURITY_LEAD]] | [[2026-02-25]] | Open |
| R-008 | [[Data migration reveals quality issues requiring extensive cleansing]] | Technical | 3 | 3 | 9 | [[Data profiling early; sample migration; quality rules definition; cleansing tools]] | [[Extend timeline; additional resources; phased migration; manual cleansing]] | [[DATA_ARCHITECT]] | [[2026-02-25]] | Open |
| R-009 | [[Vendor service degradation affects development or production]] | External | 3 | 3 | 9 | [[Multi-vendor strategy; SLA monitoring; backup providers; local development environments]] | [[Switch to backup provider; implement offline capabilities; vendor escalation]] | [[OPERATIONS_LEAD]] | [[2026-02-25]] | Open |
| R-010 | [[User adoption lower than expected post-launch]] | Business | 3 | 3 | 9 | [[User research; training programs; change management; intuitive UX design]] | [[Additional training; system adjustments; executive mandate; incentive programs]] | [[CHANGE_MGR]] | [[2026-02-25]] | Open |

### 2.3 Low Priority Risks (Score 1-5)

| ID | Risk Description | Category | Likelihood | Impact | Score | Mitigation Strategy | Contingency Plan | Owner | Review Date | Status |
|---|---|---|:---:|:---:|:---:|---|---|---|---|---|
| R-011 | [[Minor browser compatibility issues in legacy browsers]] | Technical | 2 | 2 | 4 | [[Browser testing matrix; progressive enhancement; polyfills]] | [[Browser-specific fixes; recommend browser upgrades]] | [[QA_LEAD]] | [[2026-02-25]] | Monitoring |
| R-012 | [[Documentation delays due to resource constraints]] | Organizational | 2 | 2 | 4 | [[Documentation sprints; templates; technical writers; code-to-doc tools]] | [[Prioritize critical docs; extend timeline; hire contractor]] | [[TECH_WRITER]] | [[2026-02-25]] | Open |
| R-013 | [[Minor UI/UX feedback requiring cosmetic changes]] | Business | 3 | 1 | 3 | [[Design system; component library; stakeholder reviews; prototyping]] | [[Backlog for future release; quick wins implementation]] | [[UX_LEAD]] | [[2026-02-25]] | Monitoring |

---

## 3. RISK CATEGORIES

### 3.1 Technical Risks
Risks related to technology, architecture, implementation, and technical debt.

**Common Examples:**
- Technology immaturity or deprecation
- Integration complexity
- Performance and scalability issues
- Security vulnerabilities
- Technical debt accumulation
- Data quality and migration challenges

### 3.2 Business Risks
Risks related to business requirements, market conditions, and organizational factors.

**Common Examples:**
- Requirements ambiguity or changes
- Budget constraints or overruns
- Timeline pressure
- User adoption challenges
- Competitive pressure
- Regulatory changes

### 3.3 External Risks
Risks originating outside the project team or organization.

**Common Examples:**
- Third-party service failures
- Vendor relationship issues
- Market disruptions
- Natural disasters
- Regulatory changes
- Supply chain issues

### 3.4 Organizational Risks
Risks related to people, processes, and organizational structure.

**Common Examples:**
- Resource availability and turnover
- Stakeholder availability
- Communication breakdowns
- Organizational changes (restructuring, M&A)
- Skills gaps
- Cultural resistance to change

---

## 4. RISK RESPONSE STRATEGIES

### 4.1 Threat Response Strategies

| Strategy | Description | When to Use |
|---|---|---|
| **Avoid** | Eliminate the threat by changing plans | High-impact risks that can be eliminated |
| **Mitigate** | Reduce likelihood or impact through proactive action | Most common approach; reduces risk to acceptable level |
| **Transfer** | Shift impact to third party (insurance, contracts) | Financial risks; vendor performance risks |
| **Accept** | Acknowledge risk but take no action | Low-priority risks; cost of mitigation exceeds impact |

### 4.2 Opportunity Response Strategies

| Strategy | Description | When to Use |
|---|---|---|
| **Exploit** | Ensure opportunity is realized | High-value opportunities within control |
| **Enhance** | Increase probability or positive impact | Opportunities worth investing in |
| **Share** | Allocate ownership to third party best able to capture | Partnerships; joint ventures |
| **Accept** | Acknowledge opportunity but take no action | Low-value opportunities |

---

## 5. RISK MONITORING AND CONTROL

### 5.1 Risk Review Schedule

| Phase | Review Frequency | Participants |
|---|---|---|
| Discovery | Weekly | Core team |
| Build/Development | Weekly | Core team + stakeholders |
| Testing | Bi-weekly | Core team |
| Deployment | Daily | Extended team |
| Post-Launch | Monthly | Operations team |

### 5.2 Risk Triggers

Define specific events that indicate a risk is materializing:

| Risk ID | Early Warning Indicators | Trigger Threshold | Escalation Path |
|---|---|---|---|
| R-001 | Stakeholder missing meetings; delayed responses | 2 consecutive missed milestones | Escalate to sponsor |
| R-002 | API deprecation notice; increased error rates | > 5% error rate for 1 hour | Emergency response team |
| R-003 | Frequent scope change requests; requirement churn | > 3 changes per week | Steering committee |
| R-004 | Security scan findings; vulnerability reports | Any critical vulnerability | CISO immediate |
| R-005 | Team member expressing departure; low engagement | Resignation notice received | HR + leadership |

### 5.3 Risk Escalation Criteria

Escalate to the next level of management when:
- Risk score increases to next priority band
- Mitigation strategy fails or is ineffective
- Risk owner unable to manage risk
- Multiple related risks emerging (systemic issue)
- Risk realization imminent with no mitigation in place

---

## 6. RISK METRICS AND REPORTING

### 6.1 Risk Dashboard

| Metric | Current | Target | Trend |
|---|---|---|---|
| Total Open Risks | [[#]] | < 20 | [[↑/↓/→]] |
| High/Critical Risks | [[#]] | 0 | [[↑/↓/→]] |
| Average Risk Score | [[#]] | < 8 | [[↑/↓/→]] |
| Risks Closed This Period | [[#]] | N/A | [[#]] |
| Risks Realized (Issues) | [[#]] | < 5% | [[%]] |

### 6.2 Risk Trend Analysis

| Period | Open | Closed | Realized | New |
|---|---|---:|---:|---:|
| Week 1 | [[#]] | [[#]] | [[#]] | [[#]] |
| Week 2 | [[#]] | [[#]] | [[#]] | [[#]] |
| Week 3 | [[#]] | [[#]] | [[#]] | [[#]] |
| Week 4 | [[#]] | [[#]] | [[#]] | [[#]] |

---

## 7. RELATED DOCUMENTS

| Document | Relationship | Location |
|---|---|---|
| [00_MASTER_INDEX.md](./00_MASTER_INDEX.md) | Central navigation hub | Current directory |
| [02_ASSUMPTIONS_CONSTRAINTS.md](./02_ASSUMPTIONS_CONSTRAINTS.md) | Risks linked to assumptions | Current directory |
| [03_DECISION_LOG.md](./03_DECISION_LOG.md) | Decisions may introduce risks | Current directory |
| [05_ISSUE_LOG.md](./05_ISSUE_LOG.md) | Realized risks become issues | Current directory |
| [17_RISK_MANAGEMENT_PLAN.md](../02_governance/17_RISK_MANAGEMENT_PLAN.md) | Risk methodology and governance | Governance directory |
| [03_CHANGE_ORDER.md](../01_commercial/03_CHANGE_ORDER.md) | Risk realization may require changes | Commercial directory |

---

## 8. QUALITY CHECKLIST

Before marking this document complete, verify:

- [ ] All `[[PLACEHOLDERS]]` replaced with actual project values
- [ ] Scoring methodology clearly defined with examples
- [ ] At least 5 high-priority risks (score 13+) documented
- [ ] At least 5 medium-priority risks (score 6-12) documented
- [ ] At least 3 low-priority risks (score 1-5) documented
- [ ] All risks assigned to named owners
- [ ] Mitigation strategies are specific and actionable
- [ ] Contingency plans defined for high-priority risks
- [ ] Risk categories cover technical, business, external, and organizational
- [ ] Review dates set for all open risks
- [ ] Risk triggers defined for high-priority items
- [ ] Escalation criteria documented
- [ ] Risk metrics dashboard included
- [ ] Document reviewed by Project Manager
- [ ] Document approved by Client Sponsor
- [ ] Version history initialized

---

## 9. CHANGE HISTORY

| Date | Version | Author | Summary |
|---|---:|---|---|
| 2026-02-02 | 1.0.0 | Technical Writer | Complete rewrite with enterprise-grade risk scoring, comprehensive mitigation strategies, monitoring framework, and escalation procedures |
| 2026-01-18 | 0.1.0 | Vantus Systems | Initial template creation |

---

*Vantus Systems: Engineering Independence.*
*Last Updated: 2026-02-09 | Version 1.0.0 | Status: Template*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
