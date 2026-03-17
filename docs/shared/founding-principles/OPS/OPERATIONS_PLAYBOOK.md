# Security & Resilience — Operations Playbook

**Document ID:** VS-OPS-502  
**Version:** 2.1.0  
**Effective Date:** February 2, 2026  
**Audience:** Operations Engineers, DevOps, System Administrators  
**Owner:** Dylan Thompson, Founder & CTO  

---

## Purpose of This Playbook

This playbook ensures Vantus systems remain operational, secure, and independent long after the initial build.

Keep this accessible. When systems fail at 2 AM, you need answers fast.

---

## Environment Governance

### The Mirror Rule

Staging and Production must be architectural twins.

| Aspect | Staging | Production |
|--------|---------|------------|
| **Server specs** | Can be smaller | Sized for load |
| **Software versions** | Same as Production | Stable releases |
| **Configuration** | Same structure | Same structure |
| **Data** | Anonymized sample | Real data |

**Why:** If Staging does not match Production, testing in Staging is meaningless.

### Environment Separation

**Never:**
- Connect Staging to Production databases.
- Use Production credentials in Staging.
- Share API keys between environments.

### Verification Before Promotion

All changes must pass in Staging before Production:
- [ ] Functional testing (happy and error paths).
- [ ] Performance testing (load testing for significant changes).
- [ ] Security scanning (no new vulnerabilities).
- [ ] Smoke tests (critical paths work).

---

## Deployment Discipline

### The Automation Rule

**If a human has to manually SSH and run a command to deploy, the system is broken.**

All deployments must be scripted and repeatable.

### Deployment Methods

| Method | When to Use | Recovery Time |
|--------|-------------|---------------|
| **Blue-Green** | High-traffic systems | Seconds (instant switch) |
| **Rolling** | Standard updates | Minutes (gradual rollout) |
| **Canary** | Risky changes | Seconds (instant rollback) |

### The Rollback Rule

Every deployment must have a rollback plan tested before release.

**Rollback target:** System restored to previous state in under 120 seconds.

### Deployment Checklist

Before any Production deployment:

- [ ] Change approved and documented.
- [ ] Staging tests passed.
- [ ] Rollback procedure tested.
- [ ] Monitoring dashboards ready.
- [ ] On-call engineer notified.
- [ ] Database backup completed (if schema change).
- [ ] Maintenance window communicated (if downtime expected).

---

## Data Persistence & Recovery

### Backup Requirements

| Data Type | Frequency | Retention | Location |
|-----------|-----------|-----------|----------|
| **Database** | Daily | 30 days | Primary + Off-site |
| **File uploads** | Daily | 90 days | Object storage + Replica |
| **Configuration** | On change | Forever | Git + Encrypted backup |
| **Logs** | Continuous | 90 days | Centralized + Archive |

### Backup Verification

**The only valid backup is one you have restored.**

- **Monthly:** Automated restore test.
- **Quarterly:** Full disaster recovery drill.
- **Annually:** Documented recovery with timing.

### Recovery Objectives

| Metric | Target | Maximum |
|--------|--------|---------|
| **RPO** (Recovery Point Objective) | 4 hours | 24 hours |
| **RTO** (Recovery Time Objective) | 2 hours | 4 hours |

**RPO:** Maximum data we can afford to lose.  
**RTO:** Maximum time to restore service.

---

## Incident Response

### Severity Levels

| Level | Name | Definition | Response Time |
|-------|------|------------|---------------|
| **P1** | Critical | Complete system outage or security breach | 15 minutes |
| **P2** | High | Major feature broken, workaround exists | 1 hour |
| **P3** | Medium | Minor feature issue, low impact | 4 hours |
| **P4** | Low | Cosmetic, documentation, questions | 1 business day |

### Incident Response Process

#### Phase 1: Stabilize (First 15 Minutes)

1. **Alert:** Page the on-call engineer.
2. **Assess:** Determine scope and severity.
3. **Act:** Take minimum safe action to stop the bleeding.
   - Rollback if needed.
   - Disable feature if needed.
   - Scale up resources if needed.

#### Phase 2: Communicate (First Hour)

1. **Internal:** Notify stakeholders (Slack, email).
2. **External:** Update status page if customer-facing.
3. **Log:** Start incident timeline document.

#### Phase 3: Resolve (As Fast As Safely Possible)

1. **Fix:** Implement permanent or temporary fix.
2. **Verify:** Confirm fix works in Production.
3. **Monitor:** Watch for 2 hours post-fix.

#### Phase 4: Learn (Within 48 Hours)

1. **Document:** Write incident report.
2. **Review:** Blameless post-mortem meeting.
3. **Improve:** Implement preventive measures.

### Incident Report Template

```markdown
# Incident Report: [TITLE]

## Summary
- **Date/Time:** 2026-02-25 HH:MM UTC
- **Duration:** X minutes
- **Severity:** P1/P2/P3/P4
- **Impact:** What was affected and how many users

## Timeline
- HH:MM - Event occurred
- HH:MM - Alert triggered
- HH:MM - Engineer paged
- HH:MM - Mitigation applied
- HH:MM - Service restored

## Root Cause
(What happened and why)

## Resolution
(How we fixed it)

## Follow-up Actions
- [ ] Action item 1 (Owner, Due Date)
- [ ] Action item 2 (Owner, Due Date)
```

---

## Monitoring & Alerting

### The Three Pillars

| Pillar | What We Monitor | Tools |
|--------|-----------------|-------|
| **Metrics** | Numbers (CPU, memory, requests) | Prometheus, Grafana |
| **Logs** | Events and errors | ELK Stack, Loki |
| **Traces** | Request flows | Jaeger, Zipkin |

### Alerting Rules

Alert when:
- Error rate > 1% for 5 minutes.
- Response time > 2 seconds for 5 minutes.
- CPU usage > 80% for 10 minutes.
- Disk usage > 85%.
- Memory usage > 90%.
- Any security event (immediate).

### Alert Fatigue Prevention

- **Page (P1/P2):** Human intervention required immediately.
- **Notify (P3):** Human attention needed, not urgent.
- **Log (P4):** Review in regular business hours.

If an alert fires and no action is needed, tune the alert.

---

## The Bus Factor Protocol

### What Is Bus Factor?

The number of people who can disappear before the project is in trouble.

**Our target:** Bus factor >= 2 for everything critical.

### The Client Control Vault

Every project maintains a "Vault" containing:

| Item | Purpose | Location |
|------|---------|----------|
| **Domain credentials** | Control DNS and domain registration | 1Password / Bitwarden |
| **Server access** | SSH keys, root passwords | Secure vault |
| **Database credentials** | Connection strings, admin accounts | Secure vault |
| **API keys** | Third-party service tokens | Secure vault |
| **Documentation** | Architecture, runbooks, contacts | Git + Cloud storage |

### Vault Access

- **During project:** Engineering team has access.
- **At handoff:** Client receives full Vault export.
- **After handoff:** Client owns the Vault; we retain read-only if on Care plan.

---

## Security Operations

### Patch Management

| Type | Frequency | Process |
|------|-----------|---------|
| **OS Security Patches** | Weekly | Automatic installation, reboot if needed |
| **Application Dependencies** | Monthly | Test in Staging, then Production |
| **Framework Updates** | Quarterly | Review changelog, plan migration |

### Vulnerability Scanning

- **Weekly:** Automated dependency scan.
- **Monthly:** Container image scan.
- **Quarterly:** Full penetration test (third-party).

### Access Review

- **Monthly:** Review who has access to what.
- **Quarterly:** Remove unused accounts.
- **On termination:** Immediate access revocation.

---

## Capacity Planning

### When to Scale

Scale before you need to:

| Metric | Scale When | Action |
|--------|------------|--------|
| **CPU** | > 70% for 1 week | Add CPU or optimize code |
| **Memory** | > 80% for 1 week | Add RAM or investigate leaks |
| **Disk** | > 75% | Add storage or clean up logs |
| **Database** | Query time > 500ms | Optimize queries or scale DB |

### Scaling Options

1. **Vertical:** Bigger server (easiest, limited ceiling).
2. **Horizontal:** More servers (requires load balancing).
3. **Optimization:** Fix the code (often overlooked).

**Rule:** Optimize first, then scale vertically, then scale horizontally.

---

## Operational Checklists

### Daily
- [ ] Review overnight alerts.
- [ ] Check error rates.
- [ ] Verify backups completed.

### Weekly
- [ ] Review performance metrics.
- [ ] Check disk space trends.
- [ ] Review security logs.

### Monthly
- [ ] Capacity planning review.
- [ ] Access audit.
- [ ] Dependency update review.
- [ ] Disaster recovery documentation review.

### Quarterly
- [ ] Full disaster recovery drill.
- [ ] Third-party security scan.
- [ ] Runbook accuracy review.
- [ ] Team training on procedures.

---

## Emergency Contacts

| Role | Contact | Escalation |
|------|---------|------------|
| **On-Call Engineer** | PagerDuty/Opsgenie | Auto-escalates in 15 min |
| **Project Lead** | Direct message | If on-call cannot resolve |
| **Dylan Thompson** | dylan.thompson@vantus.systems | For P1 incidents or security breaches |

---

## Document Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | Feb 2, 2026 | Initial document |
| 2.1.0 | Feb 21, 2026 | Terminology update: Replaced "The Owner-Controlled Systems Vault" with "The Client Control Vault" to align with updated brand positioning |

---

**Questions about operations?** Contact: ops@vantus.systems

[End of Document VS-OPS-502]


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
