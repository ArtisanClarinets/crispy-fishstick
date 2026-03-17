---
Document: QA_REPORT
Doc ID: VS-TEMPLATE-QUALITY-007
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: QA Lead / Test Manager
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: [docs/06_delivery_quality/07_QA_REPORT_TEMPLATE.md](docs/06_delivery_quality/07_QA_REPORT_TEMPLATE.md)
---

# QA Report

## 1. Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-02 | QA Lead | Initial template creation |

---

## 2. Report Summary

### 2.1 Release Information

| Field | Value |
|-------|-------|
| **Report Date** | [2026-02-25] |
| **Release/Build Version** | [X.Y.Z-build.N] |
| **Release Candidate** | RC-[N] |
| **Report Period** | [Start Date] to [End Date] |
| **QA Lead** | [Name] |
| **Status** | ☐ In Progress ☐ Complete |

### 2.2 Executive Summary

[2-3 paragraph summary of overall quality status, highlighting key findings, risks, and recommendations]

---

## 3. Build Information

### 3.1 Build Details

| Attribute | Value |
|-----------|-------|
| **Version** | [X.Y.Z] |
| **Build Number** | [Build ID] |
| **Commit SHA** | [Git commit hash] |
| **Branch** | [Branch name] |
| **Build Date** | [2026-02-25 HH:MM] |
| **Built By** | [CI/CD system] |

### 3.2 Environment Information

| Environment | Version | Status | URL |
|-------------|---------|--------|-----|
| Staging | [Version] | [Status] | [URL] |
| UAT | [Version] | [Status] | [URL] |
| Production | [Version] | [Status] | [URL] |

---

## 4. Test Execution Summary

### 4.1 Overall Results

| Test Category | Total | Passed | Failed | Skipped | Blocked | Pass Rate |
|---------------|-------|--------|--------|---------|---------|-----------|
| **Unit Tests** | [X] | [X] | [X] | [X] | [X] | [X%] |
| **Integration Tests** | [X] | [X] | [X] | [X] | [X] | [X%] |
| **E2E Tests** | [X] | [X] | [X] | [X] | [X] | [X%] |
| **Security Tests** | [X] | [X] | [X] | [X] | [X] | [X%] |
| **Performance Tests** | [X] | [X] | [X] | [X] | [X] | [X%] |
| **Accessibility Tests** | [X] | [X] | [X] | [X] | [X] | [X%] |
| **TOTAL** | [X] | [X] | [X] | [X] | [X] | [X%] |

### 4.2 Results by Priority

| Priority | Total | Passed | Failed | Pass Rate |
|----------|-------|--------|--------|-----------|
| **P0 - Critical** | [X] | [X] | [X] | [X%] |
| **P1 - High** | [X] | [X] | [X] | [X%] |
| **P2 - Medium** | [X] | [X] | [X] | [X%] |
| **P3 - Low** | [X] | [X] | [X] | [X%] |

### 4.3 Detailed Test Results

#### Unit Tests
| Area | Result | Notes |
|------|--------|-------|
| Frontend Components | ☐ Pass ☐ Fail | [Coverage: X%, Notes] |
| Backend APIs | ☐ Pass ☐ Fail | [Coverage: X%, Notes] |
| Database Layer | ☐ Pass ☐ Fail | [Coverage: X%, Notes] |
| Utilities/Libraries | ☐ Pass ☐ Fail | [Coverage: X%, Notes] |

#### Integration Tests
| Area | Result | Notes |
|------|--------|-------|
| API Contracts | ☐ Pass ☐ Fail | [Notes] |
| Database Integration | ☐ Pass ☐ Fail | [Notes] |
| External Services | ☐ Pass ☐ Fail | [Notes] |
| Authentication Flows | ☐ Pass ☐ Fail | [Notes] |

#### E2E Tests
| Area | Result | Notes |
|------|--------|-------|
| Critical User Flows | ☐ Pass ☐ Fail | [Notes] |
| Admin Functions | ☐ Pass ☐ Fail | [Notes] |
| Cross-browser | ☐ Pass ☐ Fail | [Notes] |
| Mobile Responsive | ☐ Pass ☐ Fail | [Notes] |

#### Security Tests
| Area | Result | Notes |
|------|--------|-------|
| SAST Scan | ☐ Pass ☐ Fail | [Tool: X, Issues: Y] |
| DAST Scan | ☐ Pass ☐ Fail | [Tool: X, Issues: Y] |
| Dependency Scan | ☐ Pass ☐ Fail | [Vulnerabilities: X] |
| Secrets Scan | ☐ Pass ☐ Fail | [Findings: X] |

#### Performance Tests
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Response Time (p50) | < 100ms | [X]ms | ☐ Pass ☐ Fail |
| Response Time (p95) | < 200ms | [X]ms | ☐ Pass ☐ Fail |
| Response Time (p99) | < 500ms | [X]ms | ☐ Pass ☐ Fail |
| Error Rate | < 0.1% | [X%] | ☐ Pass ☐ Fail |
| Throughput | > 1000 RPS | [X] RPS | ☐ Pass ☐ Fail |

---

## 5. Code Quality Metrics

### 5.1 Coverage Analysis

| Component | Line Coverage | Branch Coverage | Function Coverage |
|-----------|---------------|-----------------|-------------------|
| Frontend | [X%] | [X%] | [X%] |
| Backend | [X%] | [X%] | [X%] |
| Database | [X%] | [X%] | [X%] |
| **Overall** | **[X%]** | **[X%]** | **[X%]** |

### 5.2 Static Analysis

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| Code Smells | [X] | < 50 | ☐ Pass ☐ Fail |
| Duplications | [X%] | < 3% | ☐ Pass ☐ Fail |
| Cognitive Complexity | [X] | < 15 | ☐ Pass ☐ Fail |
| Technical Debt | [X days] | < 5 days | ☐ Pass ☐ Fail |

---

## 6. Defect Summary

### 6.1 Defect Overview

| Severity | New | Open | Resolved | Closed | Total |
|----------|-----|------|----------|--------|-------|
| **Critical (P0)** | [X] | [X] | [X] | [X] | [X] |
| **High (P1)** | [X] | [X] | [X] | [X] | [X] |
| **Medium (P2)** | [X] | [X] | [X] | [X] | [X] |
| **Low (P3)** | [X] | [X] | [X] | [X] | [X] |
| **TOTAL** | [X] | [X] | [X] | [X] | [X] |

### 6.2 Open Defects

| ID | Severity | Description | Age (Days) | Owner | ETA |
|----|----------|-------------|------------|-------|-----|
| [BUG-XXX] | [P0/P1/P2/P3] | [Description] | [X] | [Name] | [Date] |
| [BUG-XXX] | [P0/P1/P2/P3] | [Description] | [X] | [Name] | [Date] |

### 6.3 Critical Issues Requiring Attention

| ID | Description | Impact | Recommended Action |
|----|-------------|--------|-------------------|
| [BUG-XXX] | [Description] | [Impact] | [Action] |

---

## 7. Requirements Traceability

### 7.1 Requirements Coverage

| Requirement ID | Description | Test Cases | Status |
|----------------|-------------|------------|--------|
| [REQ-001] | [Description] | [TC-001, TC-002] | ☐ Verified ☐ Partial ☐ Not Tested |
| [REQ-002] | [Description] | [TC-003] | ☐ Verified ☐ Partial ☐ Not Tested |

### 7.2 Traceability Matrix Summary

| Category | Total | Verified | Partial | Not Tested | Coverage % |
|----------|-------|----------|---------|------------|------------|
| Functional | [X] | [X] | [X] | [X] | [X%] |
| Non-Functional | [X] | [X] | [X] | [X] | [X%] |
| Security | [X] | [X] | [X] | [X] | [X%] |

---

## 8. Risk Assessment

### 8.1 Quality Risks

| Risk | Probability | Impact | Risk Level | Mitigation |
|------|-------------|--------|------------|------------|
| [Risk description] | High/Med/Low | High/Med/Low | [Level] | [Mitigation] |

### 8.2 Release Risks

| Risk | Description | Recommendation |
|------|-------------|----------------|
| [Risk 1] | [Description] | [Recommendation] |
| [Risk 2] | [Description] | [Recommendation] |

---

## 9. Go/No-Go Recommendation

### 9.1 Quality Criteria Assessment

| Criterion | Target | Actual | Status |
|-----------|--------|--------|--------|
| P0 Test Pass Rate | 100% | [X%] | ☐ Met ☐ Not Met |
| P1 Test Pass Rate | >= 95% | [X%] | ☐ Met ☐ Not Met |
| Code Coverage | >= 80% | [X%] | ☐ Met ☐ Not Met |
| Critical Defects | 0 | [X] | ☐ Met ☐ Not Met |
| High Defects | <= 2 | [X] | ☐ Met ☐ Not Met |
| Security Scan | Clean | [Status] | ☐ Met ☐ Not Met |
| Performance SLA | Met | [Status] | ☐ Met ☐ Not Met |

### 9.2 Recommendation

**Overall Recommendation:** ☐ **GO** ☐ **NO-GO** ☐ **GO WITH CONDITIONS**

### 9.3 Conditions (if applicable)

If recommending GO WITH CONDITIONS, list conditions:

| Condition | Owner | Due Date | Verification |
|-----------|-------|----------|--------------|
| [Condition 1] | [Name] | [Date] | [How to verify] |
| [Condition 2] | [Name] | [Date] | [How to verify] |

### 9.4 Justification

[Detailed explanation of the recommendation, including rationale for any conditions or concerns]

---

## 10. Action Items

| ID | Action Item | Owner | Due Date | Priority | Status |
|----|-------------|-------|----------|----------|--------|
| AI-001 | [Action] | [Name] | [Date] | [P0/P1/P2] | ☐ Open ☐ In Progress ☐ Closed |
| AI-002 | [Action] | [Name] | [Date] | [P0/P1/P2] | ☐ Open ☐ In Progress ☐ Closed |

---

## 11. Approvals

| Role | Name | Signature | Date | Comments |
|------|------|-----------|------|----------|
| **QA Lead** | | | | |
| **Engineering Lead** | | | | |
| **Product Owner** | | | | |
| **Release Manager** | | | | |

---

## 12. Related Documents

- [01_TEST_STRATEGY.md](01_TEST_STRATEGY.md)
- [02_TEST_PLAN.md](02_TEST_PLAN.md)
- [08_TEST_CASE_CATALOG.md](08_TEST_CASE_CATALOG.md)
- [09_RELEASE_READINESS_REVIEW.md](09_RELEASE_READINESS_REVIEW.md)

---

[End of QA Report]


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
