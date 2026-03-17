---
Document: ISSUE_LOG
Doc ID: VS-TEMPLATE-MASTER-006
Client: [[CLIENT_NAME]]
Project: [[PROJECT_NAME]]
Owner: Project Manager
Contributors: All Project Team Members, Client Stakeholders
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/00_master/05_ISSUE_LOG.md
Approvers: [[PM_NAME]] / [[CLIENT_SPONSOR]]
---

# Issue Log

## Purpose
This document tracks all **active issues**—problems, defects, blockers, or concerns that require resolution. Unlike risks (potential future problems), issues are current problems impacting project progress or quality. Use this document to:
- Capture and track all project issues in one place
- Assign ownership and accountability for resolution
- Monitor issue resolution progress and timelines
- Identify patterns and systemic problems
- Escalate issues that exceed resolution timeframes
- Maintain audit trail of issue handling

## Instructions
1. **Capture:** Log all issues immediately upon identification—don't wait
2. **Classify:** Assign appropriate severity, category, and priority
3. **Assign:** Designate a clear owner responsible for resolution
4. **Track:** Update status regularly; never let issues go stale
5. **Escalate:** Escalate issues approaching or exceeding due dates
6. **Close:** Document resolution before closing; verify fix effectiveness
7. **Analyze:** Review closed issues for patterns and lessons learned

---

## 1. ISSUE CLASSIFICATION

### 1.1 Severity Levels

| Severity | Definition | Response Time | Escalation Threshold |
|---:|---|---|---|
| **1 - Critical** | Project cannot proceed; complete blocker; production outage | Immediate (within 1 hour) | Auto-escalate if unresolved in 4 hours |
| **2 - High** | Significant impact on schedule, quality, or budget; workarounds difficult | Within 4 business hours | Escalate if unresolved in 1 business day |
| **3 - Medium** | Moderate impact; workarounds available; local impact only | Within 1 business day | Escalate if unresolved in 3 business days |
| **4 - Low** | Minor impact; cosmetic or convenience issues; easily worked around | Within 3 business days | Escalate if unresolved in 1 week |

### 1.2 Issue Categories

| Category | Description | Examples |
|---|---|---|
| **Technical** | Code, infrastructure, or technology problems | Bugs, performance issues, integration failures |
| **Requirements** | Unclear, conflicting, or missing requirements | Ambiguous acceptance criteria, scope disputes |
| **Resources** | People, equipment, or capacity constraints | Team member unavailable, tool access issues |
| **External** | Third-party or environmental blockers | Vendor delays, network outages, dependencies |
| **Process** | Workflow, methodology, or procedural issues | Approval delays, communication breakdowns |
| **Quality** | Defects, testing failures, or compliance gaps | Test failures, security findings, audit issues |

### 1.3 Status Definitions

| Status | Definition | Next Action |
|---|---|---|
| **Open** | Issue identified; not yet assigned or being analyzed | Assign owner; begin analysis |
| **In Analysis** | Under investigation; root cause being determined | Complete analysis; identify options |
| **Pending** | Waiting for external input, decision, or resource | Monitor and follow up |
| **In Progress** | Actively being resolved | Continue resolution work |
| **Resolved** | Fix implemented; awaiting verification | Verify fix; close if successful |
| **Closed** | Issue resolved and verified; or determined not an issue | Document lessons learned |
| **Deferred** | Acknowledged but postponed to future phase | Add to backlog; schedule review |

---

## 2. ISSUE LOG ENTRIES

### 2.1 Critical Issues (Severity 1)

| ID | Issue Description | Severity | Category | Owner | Opened Date | Due Date | Status | Decision Needed? | Resolution |
|---|---|:---:|:---:|---|---:|---:|---|:---:|---|
| I-001 | [[Production database connection pool exhausted causing application outage]] | 1 | Technical | [[OPERATIONS_LEAD]] | [[2026-02-25]] | [[2026-02-25]] | [[Open]] | Yes | [[Increase connection pool size; implement connection pooling (PgBouncer); add monitoring alerts]] |
| I-002 | [[Client firewall blocking all API calls from new hosting environment]] | 1 | External | [[TECH_LEAD]] | [[2026-02-25]] | [[2026-02-25]] | [[Open]] | Yes | [[Whitelist new IP ranges; implement proxy solution; escalate to client IT]] |

### 2.2 High Issues (Severity 2)

| ID | Issue Description | Severity | Category | Owner | Opened Date | Due Date | Status | Decision Needed? | Resolution |
|---|---|:---:|:---:|---|---:|---:|---|:---:|---|
| I-003 | [[User authentication failing for 15% of login attempts after deployment]] | 2 | Technical | [[SECURITY_LEAD]] | [[2026-02-25]] | [[2026-02-25]] | [[In Progress]] | No | [[Rollback to previous version; investigate token expiration logic; hotfix deployment]] |
| I-004 | [[Key stakeholder on vacation; unable to approve critical design decision]] | 2 | Resources | [[PM_NAME]] | [[2026-02-25]] | [[2026-02-25]] | [[Pending]] | Yes | [[Escalate to backup approver; document decision with assumptions; time-box decision]] |
| I-005 | [[Third-party payment API deprecated with 30-day migration notice]] | 2 | External | [[TECH_LEAD]] | [[2026-02-25]] | [[2026-02-25]] | [[In Analysis]] | Yes | [[Evaluate migration effort; negotiate extension; implement new API version]] |

### 2.3 Medium Issues (Severity 3)

| ID | Issue Description | Severity | Category | Owner | Opened Date | Due Date | Status | Decision Needed? | Resolution |
|---|---|:---:|:---:|---|---:|---:|---|:---:|---|
| I-006 | [[Data export feature timing out for large datasets (>100k records)]] | 3 | Technical | [[DEVELOPER_NAME]] | [[2026-02-25]] | [[2026-02-25]] | [[In Progress]] | No | [[Implement pagination; add background processing; optimize query]] |
| I-007 | [[Requirements document version conflict between client and Vantus teams]] | 3 | Requirements | [[BA_NAME]] | [[2026-02-25]] | [[2026-02-25]] | [[Open]] | Yes | [[Schedule alignment meeting; establish single source of truth; version control process]] |
| I-008 | [[Test environment data refresh delayed; blocking regression testing]] | 3 | Resources | [[QA_LEAD]] | [[2026-02-25]] | [[2026-02-25]] | [[Pending]] | No | [[Prioritize data refresh; use synthetic data for non-critical tests; adjust schedule]] |
| I-009 | [[Code review backlog causing deployment delays]] | 3 | Process | [[TECH_LEAD]] | [[2026-02-25]] | [[2026-02-25]] | [[In Progress]] | No | [[Add reviewers; batch reviews; reduce PR size; pair programming]] |

### 2.4 Low Issues (Severity 4)

| ID | Issue Description | Severity | Category | Owner | Opened Date | Due Date | Status | Decision Needed? | Resolution |
|---|---|:---:|:---:|---|---:|---:|---|:---:|---|
| I-010 | [[Minor UI alignment issues on Safari browser]] | 4 | Quality | [[FRONTEND_DEV]] | [[2026-02-25]] | [[2026-02-25]] | [[Open]] | No | [[CSS fix; cross-browser testing; backlog for next sprint]] |
| I-011 | [[Documentation screenshots outdated after UI refresh]] | 4 | Quality | [[TECH_WRITER]] | [[2026-02-25]] | [[2026-02-25]] | [[Open]] | No | [[Update screenshots; schedule regular doc reviews]] |
| I-012 | [[Team member requesting access to additional monitoring tools]] | 4 | Resources | [[OPERATIONS_LEAD]] | [[2026-02-25]] | [[2026-02-25]] | [[Pending]] | No | [[Provision access; update access control matrix]] |

---

## 3. ISSUE DETAIL TEMPLATES

### 3.1 Issue Detail: I-001

**Issue ID:** I-001  
**Title:** [[Production database connection pool exhausted causing application outage]]  
**Severity:** 1 - Critical  
**Category:** Technical  
**Status:** Open  

**Description:**
[[At 14:30 UTC, production application became unresponsive. Investigation revealed all database connections in use and new requests timing out. Error logs show "too many connections" errors. Impact: 100% of users unable to access system for 23 minutes.]]

**Impact Assessment:**
- **Users Affected:** [[All 2,500 active users]]
- **Business Impact:** [[Complete service outage; estimated revenue impact $X]]
- **Schedule Impact:** [[N/A - production issue]]
- **Reputation Impact:** [[High - customer complaints on social media]]

**Root Cause Analysis:**
[[Connection pool size (20) insufficient for peak load. Recent feature added persistent connections without proper cleanup. Connection leak in user session management code.]]

**Immediate Actions Taken:**
1. [[Restarted application servers at 14:53 UTC to clear connections]]
2. [[Implemented temporary connection limit increase to 50]]
3. [[Enabled enhanced connection monitoring]]
4. [[Posted status page update]]

**Resolution Plan:**
- [ ] [[Implement PgBouncer for connection pooling]]
- [ ] [[Fix connection leak in session management code]]
- [ ] [[Add connection pool monitoring and alerts]]
- [ ] [[Load test with 2x expected peak load]]
- [ ] [[Document incident in postmortem]]

**Owner:** [[OPERATIONS_LEAD]]  
**Opened:** [[2026-02-25 HH:MM]]  
**Due:** [[2026-02-25 HH:MM]]  
**Decision Needed:** Yes - [[Approval for emergency hotfix deployment]]  

**Stakeholders Notified:**
- [[CLIENT_SPONSOR]] - [[2026-02-25 HH:MM]]
- [[TECH_LEAD]] - [[2026-02-25 HH:MM]]
- [[PM_NAME]] - [[2026-02-25 HH:MM]]

**Related Issues:** [[None]]  
**Related Risks:** [[R-006 (Performance under load)]]  

**Resolution:** [[Pending]]  
**Closed Date:** [[Pending]]  
**Verified By:** [[Pending]]  

---

### 3.2 Issue Detail: I-002

**Issue ID:** I-002  
**Title:** [[Client firewall blocking API calls]]  
**Severity:** 1 - Critical  
**Category:** External  
**Status:** Open  

**Description:**
[[After migration to new hosting provider, all API calls from new IP range (203.0.113.0/24) are being blocked by client firewall. Integration tests failing 100%.]]

**Impact Assessment:**
- **Users Affected:** [[Integration systems only; end users not yet impacted]]
- **Business Impact:** [[Cannot complete migration; blocking go-live]]
- **Schedule Impact:** [[2-day delay to deployment]]
- **Reputation Impact:** [[Medium - migration delay]]

**Root Cause Analysis:**
[[Client firewall whitelist contains old hosting provider IPs only. New IP range not added to allowlist. Client IT team requires 5-day lead time for firewall changes.]]

**Immediate Actions Taken:**
1. [[Submitted firewall change request to client IT]]
2. [[Documented new IP ranges required]]
3. [[Investigating temporary proxy solution]]

**Resolution Plan:**
- [ ] [[Follow up with client IT daily]]
- [ ] [[Evaluate reverse proxy option as workaround]]
- [ ] [[Update deployment runbook with IP range requirements]]

**Owner:** [[TECH_LEAD]]  
**Opened:** [[2026-02-25]]  
**Due:** [[2026-02-25]]  
**Decision Needed:** Yes - [[Client approval for emergency firewall change]]  

**Stakeholders Notified:**
- [[CLIENT_IT_LEAD]] - [[2026-02-25]]
- [[PM_NAME]] - [[2026-02-25]]

**Related Issues:** [[None]]  
**Related Risks:** [[R-007 (Client IT policies)]]  

**Resolution:** [[Pending]]  
**Closed Date:** [[Pending]]  
**Verified By:** [[Pending]]  

---

## 4. ISSUE METRICS AND ANALYTICS

### 4.1 Issue Dashboard

| Metric | Current | Last Week | Trend | Target |
|---|---|---:|:---:|---|
| Total Open Issues | [[#]] | [[#]] | [[↑/↓/→]] | < 10 |
| Critical (Sev 1) | [[#]] | [[#]] | [[↑/↓/→]] | 0 |
| High (Sev 2) | [[#]] | [[#]] | [[↑/↓/→]] | < 3 |
| Average Age (Days) | [[#]] | [[#]] | [[↑/↓/→]] | < 5 |
| Issues Closed This Week | [[#]] | [[#]] | [[↑/↓/→]] | N/A |
| Escalated Issues | [[#]] | [[#]] | [[↑/↓/→]] | 0 |

### 4.2 Issue Distribution by Category

| Category | Open | Closed This Month | Avg Resolution Time |
|---|:---:|:---:|:---:|
| Technical | [[#]] | [[#]] | [[#]] days |
| Requirements | [[#]] | [[#]] | [[#]] days |
| Resources | [[#]] | [[#]] | [[#]] days |
| External | [[#]] | [[#]] | [[#]] days |
| Process | [[#]] | [[#]] | [[#]] days |
| Quality | [[#]] | [[#]] | [[#]] days |

### 4.3 Aging Issues Report

| Issue ID | Title | Severity | Days Open | Owner | Action Required |
|---|---|:---:|:---:|:---:|---|
| I-XXX | [[Issue title]] | [[#]] | [[#]] | [[Owner]] | [[Action]] |

---

## 5. ISSUE MANAGEMENT PROCESS

### 5.1 Issue Lifecycle

```
Identify → Log → Classify → Assign → Analyze → Resolve → Verify → Close
   ↑                                                    |
   └────────────────── Reopen if not fixed ─────────────┘
```

### 5.2 Issue Resolution Workflow

1. **Identification**
   - Anyone can identify and log an issue
   - Log immediately; don't wait for complete information
   - Use template to ensure completeness

2. **Triage (within 2 hours)**
   - PM reviews new issues
   - Assigns severity and category
   - Assigns owner
   - Sets due date based on severity

3. **Analysis (within SLA)**
   - Owner investigates root cause
   - Documents impact assessment
   - Identifies resolution options
   - Determines if decision needed

4. **Resolution**
   - Owner implements fix or workaround
   - Updates status to "In Progress"
   - Communicates progress regularly

5. **Verification**
   - Independent verification of fix
   - Regression testing if applicable
   - Stakeholder confirmation

6. **Closure**
   - Document resolution
   - Update status to "Closed"
   - Capture lessons learned
   - Update related risk if applicable

### 5.3 Escalation Process

| Escalation Level | Trigger | Escalate To | Response Expected |
|---|---|---|---|
| Level 1 | Issue unresolved at 50% of due date | Functional Lead | Within 4 hours |
| Level 2 | Issue unresolved at due date | Project Manager | Within 2 hours |
| Level 3 | Critical issue or repeated escalation | Steering Committee | Immediate |

---

## 6. RELATED DOCUMENTS

| Document | Relationship | Location |
|---|---|---|
| [00_MASTER_INDEX.md](./00_MASTER_INDEX.md) | Central navigation hub | Current directory |
| [04_RISK_REGISTER.md](./04_RISK_REGISTER.md) | Issues may be realized risks | Current directory |
| [03_DECISION_LOG.md](./03_DECISION_LOG.md) | Issues may require decisions | Current directory |
| [04_POSTMORTEM_TEMPLATE.md](../07_operations/04_POSTMORTEM_TEMPLATE.md) | Critical issues require postmortems | Operations directory |
| [01_INCIDENT_RESPONSE_PLAN.md](../07_operations/01_INCIDENT_RESPONSE_PLAN.md) | Critical technical issues trigger incident response | Operations directory |
| [03_CHANGE_REQUEST.md](../06_delivery_quality/03_CHANGE_REQUEST.md) | Issues may require formal changes | Delivery directory |

---

## 7. QUALITY CHECKLIST

Before marking this document complete, verify:

- [ ] All `[[PLACEHOLDERS]]` replaced with actual project values
- [ ] Severity definitions clear with response times
- [ ] Status definitions include next actions
- [ ] At least 2 critical issues documented (examples)
- [ ] At least 3 high-priority issues documented (examples)
- [ ] At least 4 medium-priority issues documented (examples)
- [ ] At least 3 low-priority issues documented (examples)
- [ ] Issue detail templates include complete information
- [ ] Metrics dashboard included
- [ ] Issue lifecycle workflow documented
- [ ] Escalation process defined with clear triggers
- [ ] Related documents cross-referenced
- [ ] Document reviewed by Project Manager
- [ ] Document approved by Client Sponsor
- [ ] Version history initialized

---

## 8. CHANGE HISTORY

| Date | Version | Author | Summary |
|---|---:|---|---|
| 2026-02-02 | 1.0.0 | Technical Writer | Complete rewrite with comprehensive issue classification, detail templates, metrics dashboard, and resolution workflow |
| 2026-01-18 | 0.1.0 | Vantus Systems | Initial template creation |

---

*Vantus Systems: Engineering Independence.*
*Last Updated: 2026-02-09 | Version 1.0.0 | Status: Template*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
