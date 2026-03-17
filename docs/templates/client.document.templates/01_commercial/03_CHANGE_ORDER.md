---
Document: CHANGE_ORDER
Doc ID: VS-TEMPLATE-COMM-003
Client: [[CLIENT_NAME]]
Project: [[PROJECT_NAME]]
Owner: Project Manager / Account Manager
Contributors: Technical Lead, Finance, Client Stakeholders
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/01_commercial/03_CHANGE_ORDER.md
Approvers: [[PM_NAME]] / [[ACCOUNT_MANAGER]] / [[CLIENT_SPONSOR]]
---

# Change Order

## Purpose
This document provides a **structured workflow for managing changes** to project scope, timeline, cost, or deliverables. It ensures that all changes are properly evaluated, approved, and documented, protecting both parties and maintaining project integrity. Use this document to:
- Request, evaluate, and approve project changes
- Document the impact of changes on scope, schedule, and cost
- Maintain audit trail of all changes
- Ensure stakeholder alignment on modifications
- Prevent scope creep through formal control

## Instructions
1. **Initiation:** Any party may initiate a change request using this template
2. **Completeness:** Fill out all sections; incomplete requests will be returned
3. **Impact Analysis:** Vantus will complete impact analysis within 3 business days
4. **Decision:** Client approves, rejects, or requests modification
5. **Execution:** Changes implemented only after written approval
6. **Documentation:** Approved changes amend the SOW and are tracked in this log

---

## 1. CHANGE ORDER LOG

### 1.1 Active Change Orders

| CO # | Description | Requested By | Status | Cost Impact | Schedule Impact | Approval Date |
|---:|---|---|:---:|---:|---:|---:|
| CO-001 | [[Example: Add mobile-responsive dashboard]] | [[Client]] | [[Approved]] | +$[[X]] | +[[X]] days | [[Date]] |
| CO-002 | [[Example: Integrate with Salesforce CRM]] | [[Client]] | [[In Review]] | +$[[X]] | +[[X]] days | [[Pending]] |
| CO-003 | [[Example: Remove reporting module]] | [[Vantus]] | [[Proposed]] | -$[[X]] | -[[X]] days | [[Pending]] |

### 1.2 Change Order History

| CO # | Description | Final Status | Cost Impact | Approved By | Date |
|---:|---|---|---:|---|---:|
| [[CO-XXX]] | [[Description]] | [[Approved/Rejected]] | $[[X]] | [[Name]] | [[Date]] |

---

## 2. CHANGE ORDER TEMPLATE

### 2.1 Change Order Header

| Field | Value |
|---|---|
| **Change Order Number** | CO-[[NNN]] |
| **Project** | [[PROJECT_NAME]] |
| **SOW Reference** | [[SOW-YYYY-NNNN]] |
| **Date Submitted** | [[2026-02-25]] |
| **Requested By** | [[NAME / ORGANIZATION]] |
| **Priority** | [[Critical / High / Medium / Low]] |

### 2.2 Change Summary

**Title:** [[Brief title describing the change]]

**Description:**
[[Provide a clear, detailed description of what is changing. Include:
- What is being added, removed, or modified
- The business reason for the change
- The specific requirements or functionality affected]]

**Example:**
[[Add a mobile-responsive executive dashboard that displays key business metrics (revenue, active users, conversion rates) in real-time. The dashboard should be accessible on iOS and Android devices and include drill-down capabilities to detailed reports.]]

### 2.3 Business Justification

**Business Driver:**
[[Explain the business need driving this change. Why is this change necessary or beneficial?]]

**Example:**
[[Executive team needs mobile access to KPIs for board meetings and travel. Current desktop-only reporting limits executive visibility and decision-making speed.]]

**Urgency:**
- [ ] **Critical:** Blocks project progress or business operations
- [ ] **High:** Significant business impact; should be implemented soon
- [ ] **Medium:** Beneficial but not urgent
- [ ] **Low:** Nice to have; can be deferred

**If Not Implemented:**
[[Describe the consequences if this change is not approved]]

**Example:**
[[Executives will continue to lack mobile visibility, potentially delaying strategic decisions. May require manual workarounds (email reports) that consume staff time.]]

---

## 3. IMPACT ANALYSIS

### 3.1 Scope Impact

| Aspect | Current State | Proposed State | Impact |
|---|---|---|---|
| **Features** | [[List current features]] | [[List modified features]] | [[Add/Modify/Remove]] |
| **Deliverables** | [[Current deliverables]] | [[Modified deliverables]] | [[Changes]] |
| **Requirements** | [[Affected requirements]] | [[New/modified requirements]] | [[Traceability updates needed]] |
| **User Stories** | [[Related stories]] | [[New/modified stories]] | [[Story points impact]] |

**Scope Change Classification:**
- [ ] **Addition:** New scope added to project
- [ ] **Modification:** Existing scope changed
- [ ] **Removal:** Scope removed from project
- [ ] **Clarification:** Existing scope clarified (no change)

### 3.2 Schedule Impact

| Milestone | Original Date | Revised Date | Variance |
|---|---|---:|---:|
| [[Milestone 1]] | [[Date]] | [[Date]] | [[+/- X days]] |
| [[Milestone 2]] | [[Date]] | [[Date]] | [[+/- X days]] |
| **Project Completion** | [[Date]] | [[Date]] | [[+/- X days]] |

**Critical Path Impact:**
- [ ] No impact on critical path
- [ ] Minor impact (can absorb within float)
- [ ] Major impact (extends project end date)

**Schedule Compression Options:**
[[If schedule impact is unacceptable, describe options to compress schedule (additional resources, parallel work, scope phasing)]]

### 3.3 Cost Impact

| Cost Category | Original | Revised | Variance |
|---:|---:|---:|---:|
| **Professional Services** | $[[X]] | $[[X]] | $[[+/- X]] |
| **Third-Party Costs** | $[[X]] | $[[X]] | $[[+/- X]] |
| **Expenses** | $[[X]] | $[[X]] | $[[+/- X]] |
| **Subtotal** | $[[X]] | $[[X]] | $[[+/- X]] |
| **Contingency (10%)** | $[[X]] | $[[X]] | $[[+/- X]] |
| **Total Change Cost** | | | **$[[+/- X]]** |

**Pricing Basis:**
- [ ] Fixed price for this change
- [ ] Time & Materials (estimated hours: [[X]])
- [ ] No cost (trade with other change)

**Payment Terms:**
- [ ] Added to next milestone payment
- [ ] Separate invoice upon completion
- [ ] Included in existing payment schedule

### 3.4 Resource Impact

| Resource Type | Current Allocation | Additional Needed | Impact |
|---|---|---|---|
| **Project Manager** | [[X]] hrs/week | [[+/- X]] hrs/week | [[Description]] |
| **Developers** | [[X]] FTE | [[+/- X]] FTE | [[Description]] |
| **Designers** | [[X]] FTE | [[+/- X]] FTE | [[Description]] |
| **Client Resources** | [[X]] hrs/week | [[+/- X]] hrs/week | [[Description]] |

**Resource Availability:**
- [ ] Resources available within current team
- [ ] Additional resources required (may affect timeline)
- [ ] Client resources required (see Client Responsibilities)

### 3.5 Quality Impact

| Quality Aspect | Impact | Mitigation |
|---|---|---|
| **Testing Coverage** | [[Increase/Decrease/Neutral]] | [[Additional test cases needed]] |
| **Code Quality** | [[Impact]] | [[Code review requirements]] |
| **Documentation** | [[Impact]] | [[Doc updates required]] |
| **Technical Debt** | [[Increase/Decrease/Neutral]] | [[Refactoring plan]] |

### 3.6 Risk Impact

| Risk Register Item | Impact | Action Required |
|---|---|---|
| [[R-XXX: Description]] | [[Increased/Decreased/No change]] | [[Action]] |
| [[New Risk: Description]] | [[New risk introduced]] | [[Mitigation plan]] |

**New Risks Introduced:**
[[List any new risks created by this change]]

**Risk Mitigation:**
[[Describe how new risks will be mitigated]]

---

## 4. IMPLEMENTATION PLAN

### 4.1 Implementation Approach

**Approach:**
- [ ] **Immediate:** Implement as soon as approved
- [ ] **Phased:** Implement in stages
- [ ] **Deferred:** Implement in future phase
- [ ] **Conditional:** Implement only if [[condition]]

**Phasing Plan (if applicable):**
| Phase | Description | Timeline | Deliverables |
|---|---|---:|---|
| Phase 1 | [[Description]] | [[X]] weeks | [[Deliverables]] |
| Phase 2 | [[Description]] | [[X]] weeks | [[Deliverables]] |

### 4.2 Work Breakdown

| Task | Owner | Effort (hrs) | Dependencies |
|---|---|---:|---|
| [[Task 1]] | [[Owner]] | [[X]] | [[Dependencies]] |
| [[Task 2]] | [[Owner]] | [[X]] | [[Dependencies]] |
| [[Task 3]] | [[Owner]] | [[X]] | [[Dependencies]] |
| **Total** | | **[[X]]** | |

### 4.3 Testing Plan

**Testing Approach:**
[[Describe how the change will be tested]]

**Test Cases:**
- [[Test case 1]]
- [[Test case 2]]
- [[Test case 3]]

**Regression Testing:**
- [ ] Full regression test required
- [ ] Targeted regression test required
- [ ] No regression testing required

### 4.4 Rollback Plan

**Rollback Criteria:**
[[Under what conditions would this change be rolled back?]]

**Rollback Procedure:**
[[Steps to revert the change if necessary]]

**Rollback Timeline:**
[[How quickly can the change be rolled back?]]

---

## 5. CLIENT RESPONSIBILITIES

### 5.1 Client Actions Required

| Action | Owner | Due Date | Impact if Not Provided |
|---|---|---:|---|
| [[Action 1: e.g., Provide API credentials]] | [[Name]] | [[Date]] | [[Cannot proceed with integration]] |
| [[Action 2: e.g., Approve designs]] | [[Name]] | [[Date]] | [[Development blocked]] |
| [[Action 3: e.g., Provide test data]] | [[Name]] | [[Date]] | [[Testing delayed]] |

### 5.2 Client Dependencies

**External Dependencies:**
[[List any external systems, vendors, or third parties that this change depends on]]

**Assumptions:**
[[List assumptions about client capabilities, resources, or environment]]

---

## 6. APPROVALS

### 6.1 Approval Authority

| Role | Approval Threshold |
|---:|---|
| Project Manager | Up to $[[5,000]] |
| Account Manager | Up to $[[25,000]] |
| Executive Sponsor | Over $[[25,000]] |

### 6.2 Approval Signatures

**Vantus Approval:**

| Role | Name | Approved (Y/N) | Signature | Date | Notes |
|---|---|:---:|---|---:|---|
| Project Manager | [[NAME]] | [[Y/N]] | _______________ | [[DATE]] | [[Notes]] |
| Account Manager | [[NAME]] | [[Y/N]] | _______________ | [[DATE]] | [[Notes]] |
| Finance | [[NAME]] | [[Y/N]] | _______________ | [[DATE]] | [[Notes]] |

**Client Approval:**

| Role | Name | Approved (Y/N) | Signature | Date | Notes |
|---|---|:---:|---|---:|---|
| Project Sponsor | [[NAME]] | [[Y/N]] | _______________ | [[DATE]] | [[Notes]] |
| Budget Authority | [[NAME]] | [[Y/N]] | _______________ | [[DATE]] | [[Notes]] |
| Technical Lead | [[NAME]] | [[Y/N]] | _______________ | [[DATE]] | [[Notes]] |

### 6.3 Approval Conditions

**Approved With Conditions:**
[[If approved with conditions, list them here]]

**Deferred Items:**
[[If any part of the change is deferred, document here]]

---

## 7. POST-APPROVAL ACTIONS

### 7.1 Implementation Checklist

Upon approval, the following actions will be taken:

- [ ] Update SOW with change details
- [ ] Update project schedule
- [ ] Update budget/forecast
- [ ] Update requirements documentation
- [ ] Update risk register
- [ ] Communicate change to team
- [ ] Adjust resource allocation
- [ ] Begin implementation

### 7.2 Communication Plan

| Stakeholder | Message | Method | Timing |
|---|---|---|---|
| Project Team | [[Change approved; implementation begins]] | [[Email/Meeting]] | [[Upon approval]] |
| Client Stakeholders | [[Change summary and impact]] | [[Email]] | [[Upon approval]] |
| Finance | [[Budget update]] | [[System update]] | [[Upon approval]] |

---

## 8. CHANGE ORDER WORKFLOW

### 8.1 Process Flow

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│ Change Request  │────▶│ Impact Analysis  │────▶│ Client Review   │
│   Submitted     │     │  (Vantus: 3 days)│     │                 │
└─────────────────┘     └──────────────────┘     └────────┬────────┘
                                                          │
                              ┌───────────────────────────┼───────────┐
                              │                           │           │
                              ▼                           ▼           ▼
                       ┌────────────┐              ┌──────────┐  ┌──────────┐
                       │  Rejected  │              │ Approved │  │ Modified │
                       │  (Archive) │              │(Proceed) │  │(Revise)  │
                       └────────────┘              └────┬─────┘  └────┬─────┘
                                                        │             │
                                                        ▼             │
                                               ┌─────────────────┐   │
                                               │  Implement      │◀──┘
                                               │  Change         │
                                               └─────────────────┘
```

### 8.2 Timeline Expectations

| Phase | Duration | Responsible Party |
|---|---|---|
| Request Submission | Day 0 | Requester |
| Completeness Check | 1 business day | Project Manager |
| Impact Analysis | 3 business days | Vantus Team |
| Client Review | 5 business days | Client |
| Revision (if needed) | 2 business days | Vantus |
| Approval | 1 business day | Both Parties |
| **Total (typical)** | **10-12 business days** | |

**Expedited Process:**
For urgent changes (Critical priority), timeline can be compressed to 3-5 business days with dedicated resources.

---

## 9. RELATED DOCUMENTS

| Document | Relationship | Location |
|---|---|---|
| [01_SOW.md](./01_SOW.md) | Master agreement being modified | Current directory |
| [02_PRICING_MODEL.md](./02_PRICING_MODEL.md) | Pricing methodology for changes | Current directory |
| [04_RISK_REGISTER.md](../00_master/04_RISK_REGISTER.md) | Risk impact documentation | Master directory |
| [05_ISSUE_LOG.md](../00_master/05_ISSUE_LOG.md) | Issues driving changes | Master directory |
| [03_DECISION_LOG.md](../00_master/03_DECISION_LOG.md) | Change decisions logged | Master directory |

---

## 10. QUALITY CHECKLIST

Before submitting a Change Order, verify:

- [ ] All `[[PLACEHOLDERS]]` replaced with actual values
- [ ] Change description is clear and specific
- [ ] Business justification is compelling
- [ ] Scope impact fully documented
- [ ] Schedule impact calculated with milestone dates
- [ ] Cost impact includes all categories
- [ ] Resource impact assessed
- [ ] Quality impact considered
- [ ] Risk impact evaluated
- [ ] Implementation plan detailed
- [ ] Testing plan included
- [ ] Rollback plan documented
- [ ] Client responsibilities identified
- [ ] Approval authorities determined
- [ ] Related documents updated
- [ ] All stakeholders consulted

---

## 11. CHANGE HISTORY

| Date | Version | Author | Summary |
|---|---:|---|---|
| 2026-02-02 | 1.0.0 | Technical Writer | Complete rewrite with comprehensive change workflow, impact analysis framework, approval process, and implementation planning |
| 2026-01-18 | 0.1.0 | Vantus Systems | Initial template creation |

---

*Vantus Systems: Engineering Independence.*
*Last Updated: 2026-02-09 | Version 1.0.0 | Status: Template*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
