---
Document: RUNBOOK
Doc ID: VS-TEMPLATE-OPS-RB-XXX
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: DevOps Engineer / SRE
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Internal
Source of Truth: [docs/07_operations/runbooks/RUNBOOK_TEMPLATE.md](docs/07_operations/runbooks/RUNBOOK_TEMPLATE.md)
---

# Runbook - [TITLE]

## 1. Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-02 | [Author] | Initial creation |

---

## 2. Purpose

### 2.1 Objective
[Clear statement of what this runbook accomplishes]

### 2.2 Scope
- **Applies to:** [Systems/components covered]
- **Trigger:** [When to use this runbook]
- **Outcome:** [What successful execution achieves]

### 2.3 Audience
- Primary: [On-call engineers, SREs, DevOps]
- Secondary: [Developers, Support staff]

---

## 3. Prerequisites

### 3.1 Access Requirements

| Resource | Access Level | How to Obtain |
|----------|--------------|---------------|
| [System/Tool] | [Read/Write/Admin] | [Process to get access] |
| [Database] | [Read/Write] | [Process to get access] |
| [Cloud Console] | [Role required] | [Process to get access] |

### 3.2 Tools Required

| Tool | Version | Purpose | Installation |
|------|---------|---------|--------------|
| [Tool name] | [Version] | [Purpose] | [How to install] |
| [CLI tool] | [Version] | [Purpose] | [How to install] |

### 3.3 Safety Checks

Before proceeding, verify:
- [ ] You have appropriate permissions
- [ ] You understand the impact of this procedure
- [ ] You have a rollback plan if applicable
- [ ] You have notified stakeholders if required
- [ ] You have backup of critical data

---

## 4. Decision Tree

```
START
  │
  ├── Is [Condition A] true?
  │   ├── YES → Proceed to Section 5.1
  │   └── NO  → Check [Condition B]
  │               │
  │               ├── Is [Condition B] true?
  │               │   ├── YES → Proceed to Section 5.2
  │               │   └── NO  → Escalate (Section 8)
  │
  └── END
```

---

## 5. Procedure

### 5.1 [Procedure Section 1]

**Estimated Time:** [X minutes]

| Step | Action | Command/Instruction | Expected Result |
|------|--------|---------------------|-----------------|
| 1 | [Action description] | ```bash<br>[command]<br>``` | [What to see] |
| 2 | [Action description] | ```bash<br>[command]<br>``` | [What to see] |
| 3 | [Action description] | ```bash<br>[command]<br>``` | [What to see] |

**Command Reference Table:**

| Command | Purpose | Example | Notes |
|---------|---------|---------|-------|
| `[command]` | [Description] | `[example]` | [Important notes] |
| `[command]` | [Description] | `[example]` | [Important notes] |

### 5.2 [Procedure Section 2]

**Estimated Time:** [X minutes]

| Step | Action | Command/Instruction | Expected Result |
|------|--------|---------------------|-----------------|
| 1 | [Action description] | [Instruction] | [What to see] |
| 2 | [Action description] | [Instruction] | [What to see] |

---

## 6. Verification

### 6.1 Success Criteria

| Check | Method | Expected Result | Status |
|-------|--------|-----------------|--------|
| [Check 1] | [How to verify] | [Expected] | ☐ |
| [Check 2] | [How to verify] | [Expected] | ☐ |
| [Check 3] | [How to verify] | [Expected] | ☐ |

### 6.2 Verification Commands

```bash
# Check service status
$ [command]
[expected output]

# Verify configuration
$ [command]
[expected output]

# Test functionality
$ [command]
[expected output]
```

---

## 7. Rollback

### 7.1 When to Rollback

Rollback immediately if:
- [Condition 1]
- [Condition 2]
- [Condition 3]

### 7.2 Rollback Procedure

**Estimated Time:** [X minutes]

| Step | Action | Command | Verification |
|------|--------|---------|--------------|
| 1 | [Action] | ```bash<br>[command]<br>``` | [Check] |
| 2 | [Action] | ```bash<br>[command]<br>``` | [Check] |
| 3 | [Action] | ```bash<br>[command]<br>``` | [Check] |

### 7.3 Rollback Verification

| Check | Method | Expected Result |
|-------|--------|-----------------|
| [Check 1] | [Method] | [Expected] |
| [Check 2] | [Method] | [Expected] |

---

## 8. Escalation

### 8.1 Escalation Triggers

Escalate to [Next Level] if:
- [ ] Procedure fails after 3 attempts
- [ ] System becomes unresponsive
- [ ] Data loss is suspected
- [ ] Issue affects production customers
- [ ] Unable to complete within [X] minutes

### 8.2 Escalation Matrix

| Level | Contact | Method | Response Time |
|-------|---------|--------|---------------|
| **L1** | [Name/Role] | [Slack/Phone] | 15 minutes |
| **L2** | [Name/Role] | [Slack/Phone] | 30 minutes |
| **L3** | [Name/Role] | [Phone/Pager] | 1 hour |

### 8.3 Escalation Information

When escalating, provide:
1. Runbook being executed: **[This runbook name]**
2. Step where issue occurred: **[Step X]**
3. Error message or symptom: **[Details]**
4. Actions already taken: **[Summary]**
5. Current system state: **[Status]**

---

## 9. Troubleshooting

### 9.1 Common Issues

#### Issue: [Common Issue 1]
**Symptoms:** [What you see]
**Cause:** [Root cause]
**Resolution:**
```bash
[commands to resolve]
```

#### Issue: [Common Issue 2]
**Symptoms:** [What you see]
**Cause:** [Root cause]
**Resolution:**
```bash
[commands to resolve]
```

### 9.2 Diagnostic Commands

| Symptom | Diagnostic Command | Interpretation |
|---------|-------------------|----------------|
| [Symptom] | `[command]` | [What output means] |
| [Symptom] | `[command]` | [What output means] |

### 9.3 Log Locations

| Log Type | Location | Retention |
|----------|----------|-----------|
| Application logs | `[path]` | [X days] |
| System logs | `[path]` | [X days] |
| Audit logs | `[path]` | [X days] |

---

## 10. Related Information

### 10.1 Related Runbooks
- [Runbook 1] - [Link]
- [Runbook 2] - [Link]

### 10.2 Related Documentation
- [Architecture doc] - [Link]
- [API documentation] - [Link]
- [Monitoring dashboard] - [Link]

### 10.3 External References
- [Vendor documentation] - [Link]
- [Internal wiki] - [Link]

---

## 11. Change Log

| Date | Author | Change | Version |
|------|--------|--------|---------|
| [Date] | [Name] | [Description] | [X.Y.Z] |

---

[End of Runbook]
