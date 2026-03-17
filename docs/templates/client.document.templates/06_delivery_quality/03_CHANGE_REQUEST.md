---
Document: CHANGE_REQUEST
Doc ID: VS-TEMPLATE-QUALITY-003
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Change Manager / Project Lead
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: [docs/06_delivery_quality/03_CHANGE_REQUEST.md](docs/06_delivery_quality/03_CHANGE_REQUEST.md)
---

# Change Request

## 1. Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-02 | Change Manager | Initial template creation |

---

## 2. Change Request Information

### 2.1 Request Details
| Field | Value |
|-------|-------|
| **Change Request ID** | CR-[YYYY]-[NNNN] |
| **Request Date** | [2026-02-25] |
| **Requestor** | [Name, Role] |
| **Change Type** | ☐ Standard ☐ Normal ☐ Emergency |
| **Priority** | ☐ Critical ☐ High ☐ Medium ☐ Low |
| **Target Implementation Date** | [2026-02-25] |

### 2.2 Change Summary
**Title:** [Brief descriptive title]

**Description:**
[Detailed description of the proposed change, including what is changing and why]

**Business Justification:**
[Explanation of why this change is needed and the benefits it will deliver]

---

## 3. Change Classification

### 3.1 Change Category
| Category | Selection | Description |
|----------|-----------|-------------|
| **Infrastructure** | ☐ | Hardware, network, cloud resources |
| **Application** | ☐ | Code changes, features, bug fixes |
| **Configuration** | ☐ | Settings, parameters, environment variables |
| **Security** | ☐ | Patches, access controls, certificates |
| **Data** | ☐ | Database schema, migrations, data updates |
| **Process** | ☐ | Procedures, workflows, documentation |

### 3.2 Risk Classification
| Risk Level | Criteria | Selection |
|------------|----------|-----------|
| **Low** | Isolated component, no customer impact, easy rollback | ☐ |
| **Medium** | Multiple components, limited customer impact, tested rollback | ☐ |
| **High** | Core system, significant customer impact, complex rollback | ☐ |
| **Critical** | Platform-wide, all customers affected, untested rollback | ☐ |

### 3.3 Change Impact Matrix

| Impact Area | No Impact | Minor | Moderate | Major |
|-------------|-----------|-------|----------|-------|
| **Users/Customers** | ☐ | ☐ | ☐ | ☐ |
| **Performance** | ☐ | ☐ | ☐ | ☐ |
| **Security** | ☐ | ☐ | ☐ | ☐ |
| **Availability** | ☐ | ☐ | ☐ | ☐ |
| **Data Integrity** | ☐ | ☐ | ☐ | ☐ |
| **Compliance** | ☐ | ☐ | ☐ | ☐ |
| **Cost** | ☐ | ☐ | ☐ | ☐ |

---

## 4. Detailed Impact Assessment

### 4.1 Scope Impact
**Components Affected:**
- [ ] Frontend applications
- [ ] Backend APIs
- [ ] Database layer
- [ ] Infrastructure/Cloud
- [ ] Third-party integrations
- [ ] Monitoring/Logging
- [ ] Documentation

**Dependencies:**
[List any dependencies on other changes, systems, or teams]

### 4.2 Schedule Impact
| Milestone | Original Date | Revised Date | Variance |
|-----------|---------------|--------------|----------|
| Development Complete | [Date] | [Date] | [Days] |
| Testing Complete | [Date] | [Date] | [Days] |
| Release Date | [Date] | [Date] | [Days] |

**Schedule Impact Summary:**
[Description of how the change affects project timelines]

### 4.3 Cost Impact
| Cost Category | Original | Revised | Variance |
|---------------|----------|---------|----------|
| Development | $[Amount] | $[Amount] | $[Amount] |
| Testing | $[Amount] | $[Amount] | $[Amount] |
| Infrastructure | $[Amount] | $[Amount] | $[Amount] |
| **Total** | $[Amount] | $[Amount] | $[Amount] |

### 4.4 Resource Impact
| Resource Type | Current Allocation | Additional Needed | Total |
|---------------|-------------------|-------------------|-------|
| Developers | [X] FTE | [Y] FTE | [Z] FTE |
| QA Engineers | [X] FTE | [Y] FTE | [Z] FTE |
| DevOps | [X] FTE | [Y] FTE | [Z] FTE |
| Infrastructure | [X] units | [Y] units | [Z] units |

---

## 5. Risk Assessment

### 5.1 Identified Risks

| Risk ID | Risk Description | Probability | Impact | Risk Score | Mitigation Strategy |
|---------|------------------|-------------|--------|------------|---------------------|
| R1 | [Risk description] | High/Med/Low | High/Med/Low | [Score] | [Mitigation approach] |
| R2 | [Risk description] | High/Med/Low | High/Med/Low | [Score] | [Mitigation approach] |
| R3 | [Risk description] | High/Med/Low | High/Med/Low | [Score] | [Mitigation approach] |

### 5.2 Risk Score Matrix
- **High (9-12):** Critical risk - requires executive approval and detailed mitigation plan
- **Medium (5-8):** Moderate risk - requires management approval and documented mitigation
- **Low (1-4):** Acceptable risk - standard approval process

### 5.3 Risk Mitigation Summary
[Summary of overall risk mitigation approach and contingency plans]

---

## 6. Implementation Plan

### 6.1 Change Implementation Steps

| Step | Activity | Owner | Duration | Dependencies |
|------|----------|-------|----------|--------------|
| 1 | [Activity description] | [Name] | [X hours/days] | [Step N] |
| 2 | [Activity description] | [Name] | [X hours/days] | [Step N] |
| 3 | [Activity description] | [Name] | [X hours/days] | [Step N] |
| 4 | [Activity description] | [Name] | [X hours/days] | [Step N] |

### 6.2 Testing Requirements
- [ ] Unit tests updated/created
- [ ] Integration tests executed
- [ ] Regression tests passed
- [ ] Performance tests completed
- [ ] Security scan passed
- [ ] UAT sign-off obtained

### 6.3 Communication Plan

| Stakeholder | Message | Timing | Method |
|-------------|---------|--------|--------|
| [Group] | [Message content] | [When] | [Email/Slack/Meeting] |
| [Group] | [Message content] | [When] | [Email/Slack/Meeting] |

---

## 7. Rollback Plan

### 7.1 Rollback Triggers
Change will be rolled back if:
- [ ] Critical errors detected within [X] hours of deployment
- [ ] Performance degradation exceeds [Y]%
- [ ] Error rate exceeds [Z]%
- [ ] Customer complaints exceed threshold
- [ ] Security vulnerability discovered

### 7.2 Rollback Procedure

| Step | Action | Owner | Estimated Time |
|------|--------|-------|----------------|
| 1 | [Rollback action] | [Name] | [X minutes] |
| 2 | [Rollback action] | [Name] | [X minutes] |
| 3 | [Rollback action] | [Name] | [X minutes] |
| 4 | Verify rollback success | [Name] | [X minutes] |

### 7.3 Rollback Verification
- [ ] System functionality restored
- [ ] Data integrity confirmed
- [ ] Performance baseline restored
- [ ] Stakeholders notified
- [ ] Incident ticket created (if applicable)

---

## 8. Approval Workflow

### 8.1 Approval Matrix by Risk Level

| Risk Level | Required Approvers | Timeline |
|------------|-------------------|----------|
| Low | Tech Lead + Product Owner | 24 hours |
| Medium | Engineering Manager + Product Manager | 48 hours |
| High | Director of Engineering + VP Product | 72 hours |
| Critical | CTO + CPO + Security Officer | 5 business days |

### 8.2 Approval Signatures

| Role | Name | Approval | Date | Notes |
|------|------|----------|------|-------|
| **Requestor** | | ☐ Approved ☐ Rejected | | |
| **Technical Lead** | | ☐ Approved ☐ Rejected | | |
| **Product Owner** | | ☐ Approved ☐ Rejected | | |
| **QA Lead** | | ☐ Approved ☐ Rejected | | |
| **Security Lead** | | ☐ Approved ☐ Rejected | | |
| **Engineering Manager** | | ☐ Approved ☐ Rejected | | |
| **Change Advisory Board** | | ☐ Approved ☐ Rejected | | |

### 8.3 Decision

**Final Decision:** ☐ **APPROVED** ☐ **REJECTED** ☐ **DEFERRED**

**Decision Date:** [2026-02-25]

**Decision Rationale:**
[Explanation of approval decision, including any conditions or modifications]

**Conditions of Approval:**
- [Condition 1]
- [Condition 2]
- [Condition 3]

---

## 9. Post-Implementation Review

### 9.1 Implementation Summary
| Field | Value |
|-------|-------|
| **Actual Implementation Date** | [2026-02-25] |
| **Actual Duration** | [X hours/days] |
| **Issues Encountered** | [Description] |
| **Deviations from Plan** | [Description] |

### 9.2 Success Criteria Verification
| Criterion | Target | Actual | Met? |
|-----------|--------|--------|------|
| [Criterion 1] | [Target] | [Actual] | ☐ Yes ☐ No |
| [Criterion 2] | [Target] | [Actual] | ☐ Yes ☐ No |
| [Criterion 3] | [Target] | [Actual] | ☐ Yes ☐ No |

### 9.3 Lessons Learned
[Documentation of what went well and what could be improved for future changes]

---

## 10. Related Documents

- [05_CHANGE_ENABLEMENT_POLICY.md](../07_operations/05_CHANGE_ENABLEMENT_POLICY.md)
- [09_RELEASE_READINESS_REVIEW.md](09_RELEASE_READINESS_REVIEW.md)
- [10_CUTOVER_AND_ROLLBACK_PLAN.md](../07_operations/10_CUTOVER_AND_ROLLBACK_PLAN.md)

---

[End of Change Request]


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
