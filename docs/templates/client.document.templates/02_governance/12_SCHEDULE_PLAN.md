# Schedule Management Plan

---

## Document Control

| Field | Value |
|-------|-------|
| **Document ID** | VS-GOV-112-SCHP |
| **Version** | 1.0 |
| **Date** | [[DATE]] |
| **Author** | [[PROJECT_MANAGER]] |
| **Status** | Draft / Approved |
| **Classification** | Internal / Client Confidential |
| **Review Cycle** | Weekly during execution, monthly otherwise |
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

The Schedule Management Plan establishes the criteria and activities for developing, monitoring, and controlling the project schedule for [[PROJECT_NAME]]. It defines the approach, tools, and procedures for schedule development and management, ensuring timely delivery of project objectives while maintaining flexibility to adapt to changes.

---

## Scope

This Schedule Management Plan covers:
- Schedule development methodology
- Activity definition and sequencing
- Duration estimation approaches
- Schedule model development
- Schedule baseline establishment
- Schedule control and monitoring
- Variance analysis and response
- Schedule compression techniques

This plan does NOT cover:
- Detailed task assignments (see project schedule)
- Resource allocation details (see Resource Management Plan)
- Cost aspects of scheduling (see Cost Management Plan)

---

## Objectives

1. **Accuracy:** Develop realistic and achievable schedules
2. **Visibility:** Provide clear visibility into project timeline
3. **Control:** Monitor progress and manage schedule changes
4. **Flexibility:** Adapt to changes while minimizing impact
5. **Communication:** Communicate schedule status effectively
6. **Predictability:** Enable reliable forecasting of completion dates

---

## Instructions for Completion

1. **Methodology Selection:** Choose scheduling approach (Gantt, Agile, Hybrid)
2. **Tool Selection:** Identify scheduling tools and platforms
3. **Activity Definition:** Define all project activities
4. **Sequencing:** Establish activity dependencies
5. **Estimation:** Develop duration estimates
6. **Schedule Development:** Build integrated project schedule
7. **Baseline:** Obtain approval and baseline the schedule
8. **Monitoring:** Establish schedule monitoring procedures

---

# 1. SCHEDULING METHODOLOGY

## 1.1 Scheduling Approach

**Primary Method:** [[CRITICAL_PATH_METHOD/AGILE/HYBRID]]

### Methodology Justification
[[RATIONALE_FOR_SELECTED_SCHEDULING_APPROACH]]

### Scheduling Framework

| Phase | Approach | Tool | Update Frequency |
|-------|----------|------|------------------|
| Discovery | [[APPROACH]] | [[TOOL]] | [[FREQUENCY]] |
| Design | [[APPROACH]] | [[TOOL]] | [[FREQUENCY]] |
| Development | [[APPROACH]] | [[TOOL]] | [[FREQUENCY]] |
| QA | [[APPROACH]] | [[TOOL]] | [[FREQUENCY]] |
| Deployment | [[APPROACH]] | [[TOOL]] | [[FREQUENCY]] |

## 1.2 Scheduling Tools

### Primary Scheduling Tool
**Tool:** [[TOOL_NAME]]  
**Version:** [[VERSION]]  
**Access:** [[LOCATION/URL]]  
**Owner:** [[NAME]]

### Supporting Tools
| Tool | Purpose | Owner |
|------|---------|-------|
| [[TOOL_1]] | [[PURPOSE]] | [[OWNER]] |
| [[TOOL_2]] | [[PURPOSE]] | [[OWNER]] |
| [[TOOL_3]] | [[PURPOSE]] | [[OWNER]] |

## 1.3 Scheduling Standards

### Calendar Definition
**Working Days:** Monday - Friday  
**Working Hours:** [[START_TIME]] - [[END_TIME]]  
**Time Zone:** [[TIMEZONE]]  
**Holidays:** [[LIST_OF_HOLIDAYS]]

### Duration Units
- **Hours:** For tasks < 3 days
- **Days:** For tasks 3 days - 2 weeks
- **Weeks:** For summary tasks and milestones

### Date Format
**Standard:** 2026-02-25  
**Example:** 2026-02-02

---

# 2. ACTIVITY DEFINITION

## 2.1 Activity Identification

### Activity Sources
- Work Breakdown Structure (WBS)
- Product Requirements Document (PRD)
- Historical project data
- Expert judgment
- Team input

### Activity Attributes

Each activity includes:
- Activity ID and name
- WBS reference
- Activity description
- Predecessors and successors
- Duration estimate
- Resource requirements
- Constraints (start/finish)
- Milestone association

## 2.2 Activity Types

| Type | Description | Example |
|------|-------------|---------|
| **Task** | Discrete work package | "Develop login API" |
| **Milestone** | Zero-duration marker | "Design Approval" |
| **Summary** | Roll-up of sub-tasks | "Development Phase" |
| ** hammock** | Spanning activity | "Project Management" |
| **Level of Effort** | Ongoing support | "Team Coordination" |

## 2.3 Milestone Definition

### Milestone Categories

| Category | Description | Examples |
|----------|-------------|----------|
| **Phase Gates** | Formal approval points | Phase Gate Reviews |
| **External** | Client/dependency milestones | Client deliverables |
| **Internal** | Team checkpoints | Sprint completions |
| **Contractual** | SOW-defined milestones | Payment milestones |

### Key Milestones

| Milestone ID | Milestone | Target Date | Success Criteria | Owner |
|--------------|-----------|-------------|------------------|-------|
| M-001 | Project Kickoff | [[DATE]] | Charter signed | PM |
| M-010 | Discovery Complete | [[DATE]] | PRD approved | PO |
| M-020 | Design Approved | [[DATE]] | Design sign-off | PO |
| M-030 | Beta Release | [[DATE]] | 80% features complete | TL |
| M-040 | QA Complete | [[DATE]] | UAT passed | QA |
| M-050 | Production Deploy | [[DATE]] | Live in production | OPS |
| M-060 | Project Closure | [[DATE]] | Acceptance signed | PM |

---

# 3. ACTIVITY SEQUENCING

## 3.1 Dependency Types

| Dependency | Description | Notation | Example |
|------------|-------------|----------|---------|
| **Finish-to-Start (FS)** | B cannot start until A finishes | A → B | Coding → Testing |
| **Start-to-Start (SS)** | B cannot start until A starts | A SS B | Planning → Monitoring |
| **Finish-to-Finish (FF)** | B cannot finish until A finishes | A FF B | Writing → Editing |
| **Start-to-Finish (SF)** | B cannot finish until A starts | A SF B | Rarely used |

### Lag and Lead
- **Lag:** Delay between activities (+)
- **Lead:** Overlap between activities (-)

## 3.2 Dependency Categories

| Category | Description | Management |
|----------|-------------|------------|
| **Mandatory** | Inherent in work nature | Hard constraint |
| **Discretionary** | Preferred sequence | Soft constraint |
| **External** | Outside project control | Monitor closely |
| **Internal** | Within project control | Manage actively |

## 3.3 Network Diagram

### Critical Path Method (CPM)
**Approach:** Forward and backward pass analysis  
**Critical Path:** Longest path through network  
**Float:** Total float = LS - ES or LF - EF

### Critical Path Activities
[[LIST_OF_ACTIVITIES_ON_CRITICAL_PATH]]

---

# 4. DURATION ESTIMATION

## 4.1 Estimation Methods

| Method | When Used | Accuracy | Effort |
|--------|-----------|----------|--------|
| **Expert Judgment** | Limited information, novel work | Medium | Low |
| **Analogous** | Similar past projects | Low-Medium | Low |
| **Parametric** | Quantifiable work | High | Medium |
| **Three-Point** | Uncertain durations | Medium-High | Medium |
| **Bottom-Up** | Detailed planning phase | High | High |

## 4.2 Three-Point Estimation

For uncertain activities:
- **Optimistic (O):** Best-case scenario
- **Most Likely (M):** Expected scenario
- **Pessimistic (P):** Worst-case scenario

**Expected Duration:** E = (O + 4M + P) / 6  
**Standard Deviation:** σ = (P - O) / 6

## 4.3 Estimation Confidence Levels

| Confidence | Range | Application |
|------------|-------|-------------|
| **Rough Order of Magnitude (ROM)** | -25% to +75% | Early planning |
| **Preliminary** | -15% to +25% | Budget approval |
| **Definitive** | -5% to +10% | Execution phase |

## 4.4 Estimation Guidelines

### Estimation Factors
Consider these factors when estimating:
- Resource skill level
- Learning curve
- Interruptions and context switching
- Review and rework cycles
- Dependencies and handoffs
- Technical complexity
- Uncertainty and risk

### Estimation Review
- Estimates reviewed by Technical Lead
- Historical data compared
- Team calibration sessions
- Buffer allocation for uncertainty

---

# 5. SCHEDULE DEVELOPMENT

## 5.1 Schedule Model

### Schedule Components
- Activity list with durations
- Dependencies and network logic
- Resource assignments
- Calendar constraints
- Milestones
- Baseline dates

### Schedule Constraints

| Constraint Type | Description | Example |
|-----------------|-------------|---------|
| **Start No Earlier Than (SNET)** | Earliest start date | "SNET 2026-03-01" |
| **Finish No Later Than (FNLT)** | Latest finish date | "FNLT 2026-06-30" |
| **Must Start On (MSO)** | Fixed start date | "MSO 2026-04-15" |
| **Must Finish On (MFO)** | Fixed finish date | "MFO 2026-07-31" |

## 5.2 Resource Leveling

**Approach:** [[LEVELING_STRATEGY]]

### Leveling Rules
- Maintain finish date if possible
- Adjust within available float
- Consider resource availability
- Prioritize critical path activities

### Resource Constraints
- Maximum resource utilization: [[PERCENTAGE]]%
- No overallocation allowed
- Consider resource calendars

## 5.3 Schedule Compression

### Crashing
- Adding resources to critical path activities
- Cost-benefit analysis required
- May increase risk

### Fast Tracking
- Performing activities in parallel
- Increases risk
- Requires careful coordination

### Compression Decision Matrix

| Situation | Primary Technique | Secondary Technique |
|-----------|-------------------|---------------------|
| Schedule delay, budget available | Crashing | Fast tracking |
| Schedule delay, budget constrained | Fast tracking | Scope reduction |
| Early completion desired | Fast tracking | Crashing |
| Quality concerns | Crashing | Scope reduction |

---

# 6. SCHEDULE BASELINE

## 6.1 Baseline Components

### Approved Schedule Baseline
**Baseline Date:** [[DATE]]  
**Version:** [[VERSION]]  
**Total Duration:** [[DURATION]]  
**Planned Finish:** [[DATE]]

### Baseline Elements
- Activity list with baseline dates
- Milestone schedule
- Resource calendar
- Critical path
- Float/slack values

## 6.2 Baseline Maintenance

| Change Type | Impact | Action |
|-------------|--------|--------|
| Minor (< 3 days) | No critical path impact | Update schedule, no rebaseline |
| Medium (3-7 days) | Critical path impact | CCB approval, update baseline |
| Major (> 7 days) | Significant impact | Sponsor approval, full rebaseline |

---

# 7. SCHEDULE CONTROL

## 7.1 Schedule Monitoring

### Monitoring Activities

| Activity | Frequency | Owner | Output |
|----------|-----------|-------|--------|
| Progress Update | Daily/Weekly | Team | % Complete |
| Schedule Review | Weekly | PM | Variance analysis |
| Critical Path Review | Weekly | PM | CP status |
| Forecast Update | Bi-weekly | PM | EAC dates |

### Progress Tracking Methods

| Method | Application | Accuracy |
|--------|-------------|----------|
| **Percent Complete** | Long activities | Subjective |
| **Milestone Tracking** | Discrete deliverables | Objective |
| **0/100** | Short activities | Objective |
| **50/50** | Standard activities | Balanced |
| **Weighted Milestones** | Complex activities | Detailed |

## 7.2 Variance Analysis

### Earned Schedule (ES) Analysis

| Metric | Formula | Purpose |
|--------|---------|---------|
| **Schedule Variance (SV)** | EV - PV | Cost-based variance |
| **Schedule Performance Index (SPI)** | EV / PV | Efficiency ratio |
| **Earned Schedule (ES)** | Calculated | Time-based variance |
| **Schedule Variance (Time)** | ES - AT | Time variance |

### Schedule Variance Thresholds

| Variance | Status | Action |
|----------|--------|--------|
| < 5% | Green | Continue monitoring |
| 5-10% | Yellow | Analyze root cause |
| > 10% | Red | Develop recovery plan |

## 7.3 Schedule Recovery

### Recovery Strategies

| Strategy | When to Use | Considerations |
|----------|-------------|----------------|
| **Crash** | Budget available, critical path | Increases cost |
| **Fast Track** | Parallel work possible | Increases risk |
| **Reduce Scope** | Features can be deferred | Requires approval |
| **Add Resources** | Skills available | Onboarding time |
| **Extend Schedule** | Other options exhausted | Sponsor approval |
| **Accept Delay** | Delay acceptable | Document impact |

### Recovery Plan Template

```
SCHEDULE RECOVERY PLAN

Issue: [[DESCRIPTION]]
Root Cause: [[ANALYSIS]]
Impact: [[DAYS]] days delay

Recovery Strategy: [[STRATEGY]]

Actions:
1. [[ACTION_1]] - Owner: [[NAME]] - Due: [[DATE]]
2. [[ACTION_2]] - Owner: [[NAME]] - Due: [[DATE]]
3. [[ACTION_3]] - Owner: [[NAME]] - Due: [[DATE]]

Expected Recovery: [[DAYS]] days
New Target Date: [[DATE]]

Approved By: _________________ Date: _______
```

---

# 8. SCHEDULE REPORTING

## 8.1 Schedule Reports

| Report | Frequency | Audience | Content |
|--------|-----------|----------|---------|
| **Daily Standup** | Daily | Team | Blockers, progress |
| **Weekly Status** | Weekly | Stakeholders | Milestone status, variance |
| **Monthly Report** | Monthly | Steering Committee | Full schedule analysis |
| **Phase Report** | Per phase | All stakeholders | Phase schedule summary |

## 8.2 Schedule Dashboard Metrics

| Metric | Definition | Target | Display |
|--------|------------|--------|---------|
| **Schedule Variance** | Days ahead/behind | ±[[DAYS]] | RAG indicator |
| **SPI** | Schedule performance | > 0.95 | Trend chart |
| **Milestone Achievement** | % milestones on time | 100% | Milestone chart |
| **Critical Path Health** | CP activities status | All on track | CP view |
| **Forecast Completion** | Predicted end date | On target | Date display |

---

# 9. APPENDICES

## Appendix A: Activity Definition Template

```
ACTIVITY DEFINITION

Activity ID: [[ID]]
Activity Name: [[NAME]]
WBS Code: [[WBS]]

Description:
[[DESCRIPTION]]

Predecessors: [[LIST]]
Successors: [[LIST]]
Duration: [[DURATION]]
Resources: [[LIST]]

Constraints:
[[CONSTRAINTS]]

Assumptions:
[[ASSUMPTIONS]]
```

## Appendix B: Schedule Change Request

```
SCHEDULE CHANGE REQUEST

SCR Number: SCR-[[NUMBER]]
Date: [[DATE]]
Requestor: [[NAME]]

Change Description:
[[DESCRIPTION]]

Impact Analysis:
Activities Affected: [[LIST]]
Duration Impact: [[DAYS]] days
Milestone Impact: [[MILESTONES]]
Critical Path Impact: [[YES/NO]]

Proposed Solution:
[[SOLUTION]]

Approved By: _________________ Date: _______
```

## Appendix C: Reference Documents

| Document | Location | Purpose |
|----------|----------|---------|
| Master Project Schedule | [[LOCATION]] | Detailed schedule |
| Resource Calendar | [[LOCATION]] | Resource availability |
| Milestone Schedule | [[LOCATION]] | Key dates |
| Schedule Change Log | [[LOCATION]] | Change tracking |

---

*End of Schedule Management Plan*

**Document Owner:** [[PROJECT_MANAGER]]  
**Last Updated:** [[DATE]]  
**Next Review:** [[DATE]]


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
