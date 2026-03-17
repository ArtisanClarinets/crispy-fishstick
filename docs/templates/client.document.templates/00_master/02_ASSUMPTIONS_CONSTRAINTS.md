---
Document: ASSUMPTIONS_AND_CONSTRAINTS
Doc ID: VS-TEMPLATE-MASTER-003
Client: [[CLIENT_NAME]]
Project: [[PROJECT_NAME]]
Owner: Project Manager
Contributors: Technical Lead, Business Analyst, Client Stakeholders
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/00_master/02_ASSUMPTIONS_CONSTRAINTS.md
Approvers: [[PM_NAME]] / [[CLIENT_SPONSOR]] / [[TECH_LEAD]]
---

# Assumptions and Constraints

## Purpose
This document captures all **assumptions** (things believed to be true) and **constraints** (non-negotiable limitations) that impact the project. It establishes the boundaries within which the project must operate and provides the basis for risk identification and change management. Use this document to:
- Document the foundation upon which plans are built
- Identify factors that, if changed, require project re-planning
- Set realistic expectations with stakeholders
- Provide context for scope, schedule, and cost decisions

## Instructions
1. **Assumptions:** List all factors believed to be true but not yet verified. Include how each will be validated.
2. **Constraints:** Document all limitations (time, budget, resources, technical, legal) that cannot be changed.
3. **Validation:** Regularly review assumptions to confirm they remain valid; update status accordingly.
4. **Triggers:** Identify which assumptions, if proven false, would trigger change orders or re-planning.
5. **Maintenance:** Update this document throughout the project lifecycle as new information emerges.

---

## 1. ASSUMPTIONS

Assumptions are factors that, for planning purposes, are considered to be true, real, or certain without proof or demonstration. If an assumption proves false, it may impact project scope, schedule, cost, or quality.

### 1.1 Business Assumptions

| ID | Assumption | Why It Matters | Validation Method | Owner | Status | Validated Date |
|---|---|---|---|---|---|---|
| BA-001 | [[Client has budget authority to approve project up to $XXX]] | Determines approval chain and potential delays | Verify with client finance team | [[PM_NAME]] | Open | - |
| BA-002 | [[Client business processes documented in current state map are accurate]] | Foundation for requirements gathering | Review with process owners during discovery | [[BA_NAME]] | Open | - |
| BA-003 | [[Key stakeholders will be available for 4 hours/week during discovery phase]] | Impacts discovery timeline and quality | Confirm availability in kickoff meeting | [[PM_NAME]] | Open | - |
| BA-004 | [[No major organizational changes (restructuring, M&A) will occur during project]] | Prevents scope disruption | Monitor client communications; quarterly check-in | [[PM_NAME]] | Open | - |
| BA-005 | [[Client has existing vendor relationships for hosting/infrastructure]] | Affects procurement timeline | Review vendor contracts during discovery | [[TECH_LEAD]] | Open | - |
| BA-006 | [[Regulatory requirements (GDPR/SOC2) will not change during project]] | Impacts security and compliance design | Monitor regulatory announcements | [[SECURITY_LEAD]] | Open | - |
| BA-007 | [[Client has internal IT support for user access management]] | Determines training and handoff scope | Assess IT capabilities during discovery | [[TECH_LEAD]] | Open | - |

### 1.2 Technical Assumptions

| ID | Assumption | Why It Matters | Validation Method | Owner | Status | Validated Date |
|---|---|---|---|---|---|---|
| TA-001 | [[Existing systems have APIs or data export capabilities]] | Determines integration approach | Technical discovery session with client IT | [[TECH_LEAD]] | Open | - |
| TA-002 | [[Client can provide test data that represents production scenarios]] | Essential for UAT and performance testing | Request sample data during discovery | [[QA_LEAD]] | Open | - |
| TA-003 | [[Client network allows access to required third-party services (SMTP, APIs)]] | Prevents deployment blockers | Network assessment during technical discovery | [[TECH_LEAD]] | Open | - |
| TA-004 | [[Client devices (browsers, OS versions) are within supported matrix]] | Determines compatibility testing scope | IT asset inventory review | [[TECH_LEAD]] | Open | - |
| TA-005 | [[Peak load will not exceed X concurrent users]] | Drives infrastructure sizing | Review analytics and business projections | [[ARCHITECT]] | Open | - |
| TA-006 | [[Data volume will not exceed X GB/TB in first year]] | Affects storage and backup planning | Review data growth projections | [[DATA_ARCHITECT]] | Open | - |
| TA-007 | [[Client can provide SSL certificates or use Let's Encrypt]] | Required for HTTPS deployment | Confirm certificate procurement process | [[TECH_LEAD]] | Open | - |
| TA-008 | [[Existing data quality is sufficient for migration]] | Impacts data migration effort | Data quality assessment during discovery | [[DATA_ARCHITECT]] | Open | - |

### 1.3 Resource Assumptions

| ID | Assumption | Why It Matters | Validation Method | Owner | Status | Validated Date |
|---|---|---|---|---|---|---|
| RA-001 | [[Vantus team will have dedicated project resources]] | Prevents resource conflicts | Resource allocation confirmation | [[PM_NAME]] | Open | - |
| RA-002 | [[Client subject matter experts (SMEs) will respond to queries within 48 hours]] | Impacts decision-making speed | Establish communication protocols in kickoff | [[PM_NAME]] | Open | - |
| RA-003 | [[Required third-party services (hosting, APIs) will remain available]] | Prevents external dependencies from blocking progress | Monitor vendor status pages; maintain alternatives | [[TECH_LEAD]] | Open | - |
| RA-004 | [[Client will provide necessary access credentials within 5 business days of request]] | Prevents development delays | Track credential requests in issue log | [[PM_NAME]] | Open | - |
| RA-005 | [[Client will provide suitable workspace/meeting facilities for on-site visits]] | Required for workshops and training | Confirm logistics for on-site activities | [[PM_NAME]] | Open | - |

### 1.4 Assumption Status Legend

- **Open:** Assumption made but not yet validated
- **Validated:** Assumption confirmed to be true
- **Invalid:** Assumption proven false; requires action
- **At Risk:** Evidence suggests assumption may be false
- **Deprecated:** Assumption no longer relevant

---

## 2. CONSTRAINTS

Constraints are limiting factors that affect project execution. Unlike assumptions, constraints are known facts that cannot be changed and must be worked within.

### 2.1 Business Constraints

| ID | Constraint | Source | Impact | Mitigation Strategy | Owner |
|---|---|---|---|---|---|
| BC-001 | [[Project must be completed by specific date (e.g., compliance deadline, product launch)]] | Client business requirement | Fixed timeline may require scope prioritization or additional resources | Implement phased delivery; identify must-have vs. nice-to-have features | [[PM_NAME]] |
| BC-002 | [[Total project budget cannot exceed $XXX]] | Client budget approval | Limits scope, resources, and timeline options | Strict change control; prioritize high-value features; phased approach | [[PM_NAME]] |
| BC-003 | [[Solution must comply with industry regulations (HIPAA, SOX, etc.)]] | Legal/Regulatory | Adds complexity to design and implementation | Engage compliance early; build compliance into design | [[SECURITY_LEAD]] |
| BC-004 | [[Client procurement process requires 30-day vendor onboarding]] | Client process | Delays project start or third-party integrations | Begin procurement immediately upon contract signing | [[PM_NAME]] |
| BC-005 | [[Client fiscal year ends on specific date affecting budget availability]] | Client finance | May impact payment schedules or scope timing | Align milestones with fiscal calendar | [[ACCOUNT_MGR]] |
| BC-006 | [[Client requires all work to be performed within specific geographic boundaries]] | Client policy | Limits resource options and time zone coverage | Plan resource allocation accordingly | [[PM_NAME]] |
| BC-007 | [[Client has existing contractual obligations with other vendors that must be honored]] | Legal contracts | May limit technical choices or integration approaches | Review all vendor contracts during discovery | [[LEGAL]] |

### 2.2 Technical Constraints

| ID | Constraint | Source | Impact | Mitigation Strategy | Owner |
|---|---|---|---|---|---|
| TC-001 | [[Must integrate with existing legacy system that cannot be modified]] | Technical reality | Limits integration options; may require workarounds | Design adapter patterns; plan for technical debt | [[ARCHITECT]] |
| TC-002 | [[Must use client's existing technology stack (e.g., specific database, cloud provider)]] | Client standardization | Limits technology choices; may not be optimal | Evaluate within constraints; document trade-offs | [[TECH_LEAD]] |
| TC-003 | [[Data must remain within specific geographic region (data residency)]] | Legal/Compliance | Affects hosting location and backup strategies | Select compliant hosting regions; document data flows | [[SECURITY_LEAD]] |
| TC-004 | [[Maximum acceptable downtime is X hours per month (99.X% uptime)]] | Business requirement | Drives architecture and operational requirements | Design for high availability; implement redundancy | [[ARCHITECT]] |
| TC-005 | [[Must support specific browser versions (e.g., IE11)]] | Client environment | Limits modern web features; increases testing burden | Implement progressive enhancement; additional QA | [[TECH_LEAD]] |
| TC-006 | [[Maximum page load time must be under X seconds]] | Performance requirement | Drives optimization and infrastructure decisions | Performance budget; CDN; optimization | [[ARCHITECT]] |
| TC-007 | [[Must maintain backward compatibility with existing API consumers]] | Technical debt | Limits API evolution; requires versioning strategy | Implement API versioning; deprecation plan | [[TECH_LEAD]] |
| TC-008 | [[Security audit must be passed before production deployment]] | Security policy | Adds time and cost to release process | Integrate security testing early; pre-audit assessment | [[SECURITY_LEAD]] |
| TC-009 | [[Disaster recovery RTO of X hours and RPO of X minutes]] | Business continuity | Drives backup and recovery architecture | Design DR strategy; regular DR testing | [[OPERATIONS_LEAD]] |

### 2.3 Resource Constraints

| ID | Constraint | Source | Impact | Mitigation Strategy | Owner |
|---|---|---|---|---|---|
| RC-001 | [[Vantus team is limited to X FTEs on this project]] | Resource availability | Limits velocity; may extend timeline | Optimize team composition; prioritize ruthlessly | [[PM_NAME]] |
| RC-002 | [[Client SMEs available only X hours per week]] | Client resource availability | Limits discovery and validation speed | Batch questions; asynchronous communication; recorded demos | [[PM_NAME]] |
| RC-003 | [[No overtime or weekend work permitted]] | Client/Vantus policy | Reduces available capacity | Accurate estimation; buffer in schedule | [[PM_NAME]] |
| RC-004 | [[Client IT team has limited bandwidth for deployment support]] | Client resource constraints | May delay deployments | Clear deployment runbooks; advance notice | [[OPERATIONS_LEAD]] |
| RC-005 | [[Training must be completed within X hours total]] | Client time constraints | Limits depth of training | Focus on critical tasks; provide self-service resources | [[TRAINING_LEAD]] |

### 2.4 Schedule Constraints

| ID | Constraint | Source | Impact | Mitigation Strategy | Owner |
|---|---|---|---|---|---|
| SC-001 | [[No deployments during client's blackout periods (e.g., month-end, holiday season)]] | Business operations | Compresses deployment windows | Plan releases around blackout dates | [[RELEASE_MGR]] |
| SC-002 | [[Key stakeholders unavailable during specific dates (vacation, conferences)]] | Calendar constraints | Delays decisions and approvals | Plan around availability; delegate authority | [[PM_NAME]] |
| SC-003 | [[Must align with client's change management windows]] | IT policy | Limits deployment flexibility | Submit change requests early; batch changes | [[OPERATIONS_LEAD]] |
| SC-004 | [[User acceptance testing must be completed by specific date]] | Business requirement | Compresses testing timeline | Early UAT preparation; automated testing | [[QA_LEAD]] |

---

## 3. "IF THIS CHANGES, OUR PLAN CHANGES" — CRITICAL TRIGGERS

The following assumptions or constraints, if they change, will likely trigger a formal change order or significant re-planning:

### 3.1 High-Impact Assumptions

| ID | Assumption | Change Impact | Required Action |
|---|---|---|---|
| BA-001 | Budget authority | May require additional approvals; delay decisions | Formal change request; revised timeline |
| BA-003 | Stakeholder availability | Discovery quality suffers; requirements gaps | Extend timeline; increase documentation effort |
| TA-001 | API availability | Cannot integrate as planned; requires alternative design | Architecture change; potential scope increase |
| TA-002 | Test data availability | Cannot complete testing; quality risk | Delay testing; synthetic data generation (cost) |
| TA-005 | Peak load assumptions | Infrastructure undersized; performance issues | Rescale infrastructure; additional cost |
| RA-002 | SME response time | Decisions delayed; timeline impact | Adjust schedule; escalate if chronic |

### 3.2 Constraint Relaxation Opportunities

| ID | Constraint | If Relaxed | Potential Benefit |
|---|---|---|---|
| BC-002 | Budget limit | Additional features; faster timeline; premium infrastructure | Increased scope or reduced time |
| TC-002 | Technology stack | Optimal technology choices; reduced technical debt | Better long-term maintainability |
| RC-001 | Team size | Faster delivery; parallel workstreams | Reduced timeline |
| SC-001 | Blackout periods | More deployment flexibility | Faster iteration |

---

## 4. VALIDATION SCHEDULE

| Assumption Category | Validation Activity | Frequency | Owner | Next Review |
|---|---|---|---|---|
| Business Assumptions | Stakeholder check-in | Weekly during discovery | PM | [[DATE]] |
| Technical Assumptions | Technical discovery sessions | During discovery phase | Tech Lead | [[DATE]] |
| Resource Assumptions | Resource availability check | Bi-weekly | PM | [[DATE]] |
| All Assumptions | Formal assumption review | Monthly | PM | [[DATE]] |
| Constraints | Constraint impact assessment | At phase gates | PM | [[DATE]] |

---

## 5. RELATED DOCUMENTS

| Document | Relationship | Location |
|---|---|---|
| [00_MASTER_INDEX.md](./00_MASTER_INDEX.md) | Central navigation hub | Current directory |
| [01_GLOSSARY.md](./01_GLOSSARY.md) | Terminology definitions | Current directory |
| [03_DECISION_LOG.md](./03_DECISION_LOG.md) | Decisions influenced by assumptions | Current directory |
| [04_RISK_REGISTER.md](./04_RISK_REGISTER.md) | Risks linked to assumptions | Current directory |
| [03_CHANGE_ORDER.md](../01_commercial/03_CHANGE_ORDER.md) | Change process when assumptions change | Commercial directory |
| [04_REQUIREMENTS_SPEC.md](../03_discovery/04_REQUIREMENTS_SPEC.md) | Requirements based on assumptions | Discovery directory |

---

## 6. QUALITY CHECKLIST

Before marking this document complete, verify:

- [ ] All `[[PLACEHOLDERS]]` replaced with actual project values
- [ ] At least 5 business assumptions documented
- [ ] At least 5 technical assumptions documented
- [ ] At least 3 resource assumptions documented
- [ ] At least 5 business constraints documented
- [ ] At least 5 technical constraints documented
- [ ] All constraints include mitigation strategies
- [ ] Critical triggers section identifies top 5-7 high-impact assumptions
- [ ] Validation schedule established with specific dates
- [ ] Owners assigned to all assumptions and constraints
- [ ] Document reviewed by Technical Lead
- [ ] Document reviewed by Client Sponsor
- [ ] Version history initialized
- [ ] Approved by all stakeholders

---

## 7. CHANGE HISTORY

| Date | Version | Author | Summary |
|---|---:|---|---|
| 2026-02-09 | 2.0.0 | Technical Writer | Removed owner-controlled systems terminology, simplified language to 9th grade reading level |
| 2026-02-02 | 1.0.0 | Technical Writer | Complete rewrite with comprehensive assumption and constraint framework, validation methods, and trigger analysis |
| 2026-01-18 | 0.1.0 | Vantus Systems | Initial template creation |

---

*Vantus Systems: Engineering Independence.*
*Last Updated: 2026-02-09 | Version 2.0.0 | Status: Template*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
