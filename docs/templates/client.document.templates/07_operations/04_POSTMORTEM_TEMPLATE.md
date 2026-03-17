---
Document: POSTMORTEM
Doc ID: VS-TEMPLATE-OPS-004
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Incident Commander / Engineering Lead
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: [docs/07_operations/04_POSTMORTEM_TEMPLATE.md](docs/07_operations/04_POSTMORTEM_TEMPLATE.md)
---

# Incident Postmortem

## 1. Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-02 | Incident Commander | Initial creation |

---

## 2. Incident Metadata

### 2.1 Basic Information

| Field | Value |
|-------|-------|
| **Incident ID** | [INC-YYYY-NNNN] |
| **Incident Name** | [Descriptive name] |
| **Severity** | ☐ SEV 0 ☐ SEV 1 ☐ SEV 2 ☐ SEV 3 |
| **Category** | ☐ Availability ☐ Security ☐ Performance ☐ Data Integrity ☐ Other |
| **Date** | [2026-02-25] |
| **Start Time** | [HH:MM UTC] |
| **End Time** | [HH:MM UTC] |
| **Duration** | [X hours Y minutes] |
| **Detection Method** | [Monitoring alert / Customer report / Internal discovery] |

### 2.2 Incident Command

| Role | Name |
|------|------|
| **Incident Commander** | [Name] |
| **Scribe** | [Name] |
| **Communications Lead** | [Name] |
| **Technical Lead** | [Name] |
| **Security Lead** (if applicable) | [Name] |

### 2.3 Affected Systems

| System | Impact | Status |
|--------|--------|--------|
| [System name] | [Description of impact] | [Affected/Recovered] |
| [System name] | [Description of impact] | [Affected/Recovered] |

---

## 3. Executive Summary

### 3.1 Incident Overview
[2-3 paragraph summary of what happened, written for non-technical stakeholders]

### 3.2 Impact Summary

| Impact Area | Description |
|-------------|-------------|
| **Users Affected** | [Number or percentage] |
| **Geographic Scope** | [Regions affected] |
| **Features Impacted** | [List of features] |
| **Data Loss** | ☐ None ☐ Minimal ☐ Significant [Details] |
| **Revenue Impact** | [Estimated $ amount or "None"] |
| **Compliance Impact** | [Any regulatory implications] |

### 3.3 Resolution Summary
[1-2 paragraphs describing how the incident was resolved]

---

## 4. Detailed Timeline

### 4.1 Minute-by-Minute Timeline

| Time (UTC) | Event | Actor | Notes |
|------------|-------|-------|-------|
| [HH:MM] | [Event description] | [Who] | [Additional context] |
| [HH:MM] | [Event description] | [Who] | [Additional context] |
| [HH:MM] | [Event description] | [Who] | [Additional context] |
| [HH:MM] | [Event description] | [Who] | [Additional context] |
| [HH:MM] | [Event description] | [Who] | [Additional context] |
| [HH:MM] | [Event description] | [Who] | [Additional context] |
| [HH:MM] | [Event description] | [Who] | [Additional context] |
| [HH:MM] | [Event description] | [Who] | [Additional context] |

### 4.2 Key Milestones

| Milestone | Target Time | Actual Time | Variance |
|-----------|-------------|-------------|----------|
| **Detection** | N/A | [Time] | N/A |
| **Response Started** | < 15 min | [Time] | [X min] |
| **Incident Declared** | < 30 min | [Time] | [X min] |
| **Root Cause Identified** | < 1 hour | [Time] | [X min] |
| **Mitigation Applied** | < 2 hours | [Time] | [X min] |
| **Full Resolution** | ASAP | [Time] | [Duration] |

---

## 5. Root Cause Analysis

### 5.1 What Happened
[Technical explanation of the events that led to the incident]

### 5.2 Why It Happened (5 Whys Analysis)

| Level | Question | Answer |
|-------|----------|--------|
| **Why 1** | Why did [the immediate problem] occur? | [Answer] |
| **Why 2** | Why did [cause from Why 1] happen? | [Answer] |
| **Why 3** | Why did [cause from Why 2] exist? | [Answer] |
| **Why 4** | Why did [cause from Why 3] occur? | [Answer] |
| **Why 5** | Why did [cause from Why 4] happen? | [Root cause] |

### 5.3 Contributing Factors

| Factor | Category | Description |
|--------|----------|-------------|
| [Factor 1] | [Technical/Process/Human] | [Description] |
| [Factor 2] | [Technical/Process/Human] | [Description] |
| [Factor 3] | [Technical/Process/Human] | [Description] |

### 5.4 Root Cause Classification

| Category | Applicable | Details |
|----------|------------|---------|
| **Code Defect** | ☐ Yes ☐ No | [Description if yes] |
| **Configuration Error** | ☐ Yes ☐ No | [Description if yes] |
| **Infrastructure Failure** | ☐ Yes ☐ No | [Description if yes] |
| **Dependency Failure** | ☐ Yes ☐ No | [Description if yes] |
| **Human Error** | ☐ Yes ☐ No | [Description if yes] |
| **Process Gap** | ☐ Yes ☐ No | [Description if yes] |
| **Security Incident** | ☐ Yes ☐ No | [Description if yes] |
| **External Factor** | ☐ Yes ☐ No | [Description if yes] |

---

## 6. Detection and Response Analysis

### 6.1 Detection Analysis

| Question | Answer |
|----------|--------|
| How was the incident detected? | [Method] |
| Was detection timely? | ☐ Yes ☐ No |
| If not, why not? | [Explanation] |
| Could this have been detected earlier? | ☐ Yes ☐ No |
| What monitoring/alerting gaps exist? | [Description] |

### 6.2 Response Analysis

| Question | Answer |
|----------|--------|
| Did the team follow the IRP? | ☐ Yes ☐ Partially ☐ No |
| Were the right people involved? | ☐ Yes ☐ No [Explanation] |
| Were communication channels effective? | ☐ Yes ☐ No [Explanation] |
| Were runbooks helpful? | ☐ Yes ☐ Partially ☐ No |
| What slowed down the response? | [Description] |

### 6.3 What Went Well

| Item | Description |
|------|-------------|
| [Positive 1] | [Description] |
| [Positive 2] | [Description] |
| [Positive 3] | [Description] |

### 6.4 What Could Have Gone Better

| Item | Description |
|------|-------------|
| [Issue 1] | [Description] |
| [Issue 2] | [Description] |
| [Issue 3] | [Description] |

---

## 7. Impact Assessment

### 7.1 User Impact

| Metric | Value |
|--------|-------|
| **Total Users Affected** | [Number] |
| **Percentage of User Base** | [%] |
| **Geographic Distribution** | [Regions] |
| **Customer Reports** | [Number] |
| **Support Tickets** | [Number] |

### 7.2 Business Impact

| Metric | Value |
|--------|-------|
| **Revenue Impact** | [$ amount or "None"] |
| **SLA Violations** | [Number / None] |
| **Contractual Penalties** | [$ amount or "None"] |
| **Reputation Impact** | [Description] |

### 7.3 Technical Impact

| Metric | Value |
|--------|-------|
| **Systems Affected** | [List] |
| **Data Loss** | [Description or "None"] |
| **Performance Degradation** | [Description] |
| **Security Compromise** | [Description or "None"] |

---

## 8. Remediation and Prevention

### 8.1 Immediate Actions Taken

| Action | Time | Performed By | Result |
|--------|------|--------------|--------|
| [Action 1] | [Time] | [Name] | [Outcome] |
| [Action 2] | [Time] | [Name] | [Outcome] |
| [Action 3] | [Time] | [Name] | [Outcome] |

### 8.2 Action Items

| ID | Action | Owner | Priority | Due Date | Status |
|----|--------|-------|----------|----------|--------|
| [AI-001] | [Specific, actionable item] | [Name] | P0/P1/P2 | [Date] | ☐ Open ☐ In Progress ☐ Closed |
| [AI-002] | [Specific, actionable item] | [Name] | P0/P1/P2 | [Date] | ☐ Open ☐ In Progress ☐ Closed |
| [AI-003] | [Specific, actionable item] | [Name] | P0/P1/P2 | [Date] | ☐ Open ☐ In Progress ☐ Closed |
| [AI-004] | [Specific, actionable item] | [Name] | P0/P1/P2 | [Date] | ☐ Open ☐ In Progress ☐ Closed |

### 8.3 Action Item Categories

#### Monitoring and Alerting
- [ ] Add alert for [condition]
- [ ] Update dashboard to show [metric]
- [ ] Improve detection for [scenario]

#### Process Improvements
- [ ] Update runbook for [procedure]
- [ ] Revise IRP section on [topic]
- [ ] Create new runbook for [scenario]

#### Technical Improvements
- [ ] Implement [technical solution]
- [ ] Add redundancy for [component]
- [ ] Improve error handling in [area]

#### Training and Documentation
- [ ] Conduct training on [topic]
- [ ] Document [procedure]
- [ ] Update on-call guide

---

## 9. Lessons Learned

### 9.1 Technical Lessons

| Lesson | Application |
|--------|-------------|
| [Lesson 1] | [How to apply] |
| [Lesson 2] | [How to apply] |

### 9.2 Process Lessons

| Lesson | Application |
|--------|-------------|
| [Lesson 1] | [How to apply] |
| [Lesson 2] | [How to apply] |

### 9.3 Communication Lessons

| Lesson | Application |
|--------|-------------|
| [Lesson 1] | [How to apply] |
| [Lesson 2] | [How to apply] |

---

## 10. Follow-Up

### 10.1 Post-Mortem Review

| Item | Details |
|------|---------|
| **Post-Mortem Date** | [Date/Time] |
| **Attendees** | [Names] |
| **Review Outcome** | ☐ Approved ☐ Needs Revision |
| **Revision Required** | [Description if applicable] |

### 10.2 Action Item Tracking

| Review Date | Open Items | Closed Items | Completion % |
|-------------|------------|--------------|--------------|
| [Date + 1 week] | [X] | [Y] | [%] |
| [Date + 1 month] | [X] | [Y] | [%] |
| [Date + 3 months] | [X] | [Y] | [%] |

### 10.3 Verification

| Action Item | Verification Method | Verified By | Date |
|-------------|---------------------|-------------|------|
| [AI-XXX] | [How verified] | [Name] | [Date] |

---

## 11. Appendices

### 11.1 Supporting Data

| Data Type | Location | Description |
|-----------|----------|-------------|
| **Logs** | [Link/Path] | [Time range covered] |
| **Metrics** | [Link/Dashboard] | [Metrics included] |
| **Screenshots** | [Link/Path] | [What they show] |
| **Communication Archive** | [Link/Path] | [Slack/email archive] |

### 11.2 Related Incidents

| Incident ID | Relationship | Notes |
|-------------|--------------|-------|
| [INC-XXX] | [Similar cause/Related system] | [Notes] |

### 11.3 References

- [01_INCIDENT_RESPONSE_PLAN.md](01_INCIDENT_RESPONSE_PLAN.md)
- [runbooks/RUNBOOK_TEMPLATE.md](runbooks/RUNBOOK_TEMPLATE.md)
- [Relevant runbook used]

---

## 12. Sign-Off

By signing this postmortem, the undersigned confirm that:
- The incident has been thoroughly analyzed
- Root cause has been identified
- Action items are appropriate and assigned
- Lessons learned have been documented

| Role | Name | Signature | Date |
|------|------|-----------|------|
| **Incident Commander** | | | |
| **Engineering Lead** | | | |
| **Product Owner** | | | |
| **QA Lead** | | | |
| **Security Lead** (if applicable) | | | |

---

[End of Postmortem]


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
