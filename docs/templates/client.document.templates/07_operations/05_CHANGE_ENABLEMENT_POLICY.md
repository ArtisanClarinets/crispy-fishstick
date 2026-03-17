# Change Enablement & Deployment Policy

**Project:** [[PROJECT_NAME]]  
**Status:** Corporate Standard  
**Effective:** [[DATE]]

---

## 1. CHANGE CONTROL PROCESS (THE GATES)
Every change (deployment, config update, or infrastructure change) follows this process:

| Stage | Owner | Approval | Duration |
|-------|-------|----------|----------|
| **Proposal** | Engineer | Self | 24h review window |
| **Peer Review** | Peer + Tech Lead | 2 approvals | 48h max |
| **Staging Test** | QA | Pass required | < 4h |
| **Production Deploy** | DevOps | Schedule | Low-traffic window |

---

## 2. DEPLOYMENT WINDOWS (LOW-RISK TIMES)
- **Standard:** Tuesday–Thursday, 10:00–14:00 UTC.
- **Hotfix (P0):** Anytime with all stakeholders notified.

---

## 3. ROLLBACK PROTOCOL (THE ESCAPE HATCH)
Every deployment must have a documented rollback plan:
```
To rollback:
1. [Specific command or procedure]
2. [Verification step]
3. [Stakeholder notification]
```

---

## 4. ZERO-DOWNTIME DEPLOYMENTS (THE STANDARD)
All deployments must be zero-downtime:
- Use blue-green deployment pattern.
- Database migrations must be forward-compatible.
- Secrets rotation is automated.

[End of Policy]
