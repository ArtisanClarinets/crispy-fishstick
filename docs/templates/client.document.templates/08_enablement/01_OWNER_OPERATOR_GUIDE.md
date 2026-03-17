---
Document: OWNER_OPERATOR_GUIDE
Doc ID: VS-TEMPLATE-ENABLE-001
Client: [[CLIENT_NAME]]
Project: [[PROJECT_NAME]]
Owner: Delivery Lead
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/08_enablement/01_OWNER_OPERATOR_GUIDE.md
---

# Owner & Operator Guide

**Project:** [[PROJECT_NAME]]  
**Client:** [[CLIENT_NAME]]  
**Audience:** Client Operations & IT Teams  
**Scope:** Day-2 Operational Excellence  
**Effective Date:** [[EFFECTIVE_DATE]]  

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | [[DATE]] | [[AUTHOR]] | Initial release |

### Review & Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Client Technical Lead | [[CLIENT_TECH_LEAD]] | _________________ | _______ |
| Vantus Delivery Lead | [[VANTUS_LEAD]] | _________________ | _______ |
| Client Operations Manager | [[CLIENT_OPS_MGR]] | _________________ | _______ |

---

## 1. THE OPERATOR'S CHARTER

As the primary operator of this system, you are responsible for:

- **Uptime:** Monitoring and responding to incidents within SLO targets
- **Safety:** Ensuring no unauthorized changes are deployed
- **Transparency:** Maintaining accurate documentation of all system state changes
- **Ownership:** Taking full responsibility for the system's health and evolution

### 1.1 Success Metrics & KPIs

| Metric | Target | Measurement Frequency | Owner |
|--------|--------|----------------------|-------|
| System Uptime | 99.9% | Real-time | Operations Team |
| Mean Time to Recovery (MTTR) | < 30 minutes | Per incident | On-call Engineer |
| Mean Time Between Failures (MTBF) | > 720 hours | Monthly | Operations Lead |
| Security Patch Compliance | 100% within 48h | Weekly | Security Team |
| Backup Success Rate | 100% | Daily | DevOps Team |
| Documentation Accuracy | 95%+ | Quarterly | Technical Writer |

### 1.2 Support Window & Escalation

**Standard Support Hours:** [[SUPPORT_HOURS]]  
**Emergency Contact (24/7):** [[OOB_CONTACT_INFO]]  
**Escalation Threshold:** Contact Vantus if unable to resolve within 2 hours

---

## 2. SYSTEM OVERVIEW

### 2.1 Architecture Summary

The application follows a High-Durable Architecture (HDA) with these components:

| Component | Technology | Purpose | Scaling |
|-----------|------------|---------|---------|
| Frontend | Next.js 16 (App Router) | User interface | Horizontal |
| API Layer | Node.js / Server Actions | Business logic | Horizontal |
| Database | PostgreSQL 15+ | Primary data store | Primary + Replica |
| Cache | Redis | Session & query cache | Clustered |
| Storage | S3-compatible | File assets | Unlimited |
| CDN | CloudFront/Cloudflare | Edge delivery | Global |

### 2.2 Environment Inventory

| Environment | URL | Purpose | Access Level |
|-------------|-----|---------|--------------|
| Production | [[PROD_URL]] | Live system | Admin only |
| Staging | [[STAGING_URL]] | Pre-release testing | Developer |
| Development | [[DEV_URL]] | Feature development | Developer |

---

## 3. ROLE-BASED ACCESS CONTROL (RBAC)

### 3.1 Role Definitions

| Role | Permissions | Typical Team Member |
|------|-------------|---------------------|
| **Owner** | Full administrative control, billing access, user management | CTO, IT Director |
| **Admin** | All operations, secret rotation, deployments | DevOps Lead |
| **Operator** | Incident response, log viewing, restarts | On-call Engineer |
| **Developer** | Code deployment (non-prod), feature flags | Software Engineer |
| **Observer** | Dashboard viewing, logs (non-sensitive) | Stakeholders, QA |

### 3.2 Access Request Workflow

```
1. New team member submits access request via [[ACCESS_REQUEST_FORM]]
2. Manager approves request
3. Admin provisions account with appropriate role
4. User completes security training (if applicable)
5. Access granted with 90-day review cycle
```

---

## 4. CRITICAL RUNBOOKS

Before operating this system, review these runbooks in `/docs/07_operations/runbooks/`:

| Runbook | Purpose | Time to Complete | Skill Level |
|---------|---------|------------------|-------------|
| Startup Procedure | Bring system online | 15 min | Operator |
| Shutdown Procedure | Safe system shutdown | 10 min | Operator |
| Incident Response | Step-by-step incident flow | Variable | Admin |
| Database Backup Verification | Confirm backup validity | 20 min | Admin |
| Secret Rotation | Update credentials securely | 30 min | Admin |
| Disaster Recovery | Full system restoration | 2-4 hours | Admin |

### 4.1 Quick Reference: Emergency Procedures

**System Down Emergency:**
1. Check status page: [[STATUS_PAGE_URL]]
2. Review recent deployments in CI/CD dashboard
3. Check infrastructure monitoring for resource exhaustion
4. If no clear cause, initiate Incident Response runbook
5. Notify stakeholders via [[INCIDENT_COMM_CHANNEL]]

**Security Incident Emergency:**
1. Isolate affected systems immediately
2. Preserve logs and evidence
3. Contact security team: [[SECURITY_CONTACT]]
4. Document timeline of events
5. Follow Security Incident Response runbook

---

## 5. COMMON OPERATIONAL TASKS

### 5.1 Task: Deploy a New Version

**Prerequisites:**
- [ ] Valid credentials for deployment environment
- [ ] Change approval (if required by change management)
- [ ] Rollback plan documented

**Procedure:**
```bash
# Step 1: Check current version
./scripts/get-version.sh

# Step 2: Review release notes
cat /docs/releases/$(./scripts/get-version.sh).md

# Step 3: Deploy to staging
./scripts/deploy-staging.sh

# Step 4: Run automated tests
npm run test:e2e

# Step 5: Deploy to production
./scripts/deploy-prod.sh

# Step 6: Monitor SLOs for 1 hour
./scripts/monitor-slos.sh --duration=1h
```

**Video Tutorial:** [Deployment Walkthrough]([[VIDEO_URL_DEPLOYMENT]])

**Hands-on Exercise:**
> **Exercise 5.1:** Deploy a hotfix to staging, verify with smoke tests, then promote to production. Document any issues encountered.

**Knowledge Check:**
1. What command checks the current deployed version?
2. How long should you monitor SLOs after a production deployment?
3. What should you do if e2e tests fail during staging deployment?

### 5.2 Task: Investigate High Error Rate

**Symptoms:** Elevated 5xx responses, user complaints, monitoring alerts

**Procedure:**
```bash
# Step 1: Access log dashboard
open [[LOGGING_TOOL_URL]]

# Step 2: Filter for errors in last 1 hour
# Use query: status_code >= 500 AND timestamp > now() - 1h

# Step 3: Group by error message to identify patterns

# Step 4: Check application logs for stack traces
./scripts/view-logs.sh --service=app --level=error --duration=1h

# Step 5: If P0/P1 severity, follow incident response runbook

# Step 6: Document findings
mkdir -p /logs/investigations/$(date +%Y%m%d)
echo "Investigation: High error rate" > /logs/investigations/$(date +%Y%m%d)/summary.md
```

**Video Tutorial:** [Log Analysis Fundamentals]([[VIDEO_URL_LOGS]])

**Hands-on Exercise:**
> **Exercise 5.2:** Simulate an error condition in staging, then use the log dashboard to identify the root cause. Write a brief incident report.

### 5.3 Task: Rotate Secrets

**Frequency:** Quarterly minimum, or immediately if compromise suspected

**Procedure:**
```bash
# Step 1: Backup current secrets (encrypted)
./scripts/backup-secrets.sh --environment=production

# Step 2: Generate new secrets
./scripts/rotate-secrets.sh --environment=production

# Step 3: Update secret manager
# Navigate to [[SECRET_MANAGER_URL]]
# Update each secret with newly generated values

# Step 4: Redeploy application
./scripts/redeploy-with-new-secrets.sh

# Step 5: Verify no auth failures in logs
./scripts/view-logs.sh --service=app --grep="auth" --level=error --duration=5m

# Step 6: Update credential inventory
./scripts/update-credential-inventory.sh
```

**Video Tutorial:** [Secret Management Best Practices]([[VIDEO_URL_SECRETS]])

**Hands-on Exercise:**
> **Exercise 5.3:** Rotate a non-production secret, verify the application continues to function, then document the rotation in the credential inventory.

### 5.4 Task: Database Backup and Verification

**Automated Backups:** Daily at 02:00 UTC  
**Retention:** 30 days (configurable)

**Manual Backup Procedure:**
```bash
# Create immediate backup
./scripts/admin/backup-db.sh --environment=production --tag="pre-deployment-$(date +%Y%m%d)"

# Verify backup integrity
./scripts/admin/verify-backup.sh latest
```

**Restore Procedure (Disaster Recovery):**
```bash
# Step 1: Identify backup to restore
./scripts/admin/list-backups.sh

# Step 2: Initiate restore (requires admin approval)
./scripts/admin/restore-db.sh [[BACKUP_ID]] --approval-code=[[APPROVAL_CODE]]

# Step 3: Verify data integrity
./scripts/admin/verify-data-integrity.sh

# Step 4: Resume application services
./scripts/start-services.sh
```

**Video Tutorial:** [Database Operations]([[VIDEO_URL_DATABASE]])

### 5.5 Task: Scale Application Resources

**Horizontal Scaling (Recommended):**
```bash
# Kubernetes deployment
kubectl scale deployment [[APP_NAME]] --replicas=5 --namespace=production

# Verify scaling
kubectl get pods --namespace=production
```

**Vertical Scaling:**
```bash
# Update resource limits
kubectl set resources deployment [[APP_NAME]] \
  --limits=cpu=2000m,memory=4Gi \
  --requests=cpu=1000m,memory=2Gi \
  --namespace=production
```

---

## 6. MONITORING & OBSERVABILITY

### 6.1 Dashboard Access

| Dashboard | URL | Purpose |
|-----------|-----|---------|
| Application Metrics | [[METRICS_DASHBOARD_URL]] | Performance & health |
| Infrastructure | [[INFRA_DASHBOARD_URL]] | CPU, memory, disk |
| Error Tracking | [[ERROR_TRACKING_URL]] | Exceptions & crashes |
| Security | [[SECURITY_DASHBOARD_URL]] | Threats & audits |

### 6.2 Key Metrics to Monitor

**Golden Signals:**
1. **Latency:** Request response times (p50, p95, p99)
2. **Traffic:** Requests per second
3. **Errors:** Error rate percentage
4. **Saturation:** Resource utilization (CPU, memory, disk)

**Alert Thresholds:**
| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| Error Rate | > 1% | > 5% | Page on-call |
| Latency (p95) | > 500ms | > 1000ms | Investigate |
| CPU Usage | > 70% | > 90% | Scale or investigate |
| Memory Usage | > 80% | > 95% | Scale immediately |
| Disk Usage | > 80% | > 90% | Clean up or expand |

### 6.3 Log Analysis

**Log Locations:**
- Application logs: `/var/log/app/`
- System logs: `/var/log/syslog`
- Audit logs: `/var/log/audit/`

**Common Log Queries:**
```bash
# View recent errors
./scripts/view-logs.sh --level=error --tail=100

# Search for specific error
./scripts/view-logs.sh --grep="Connection refused" --duration=1h

# Export logs for analysis
./scripts/export-logs.sh --start="2026-01-01" --end="2026-01-31" --output=logs-jan.csv
```

---

## 7. MAINTENANCE SCHEDULE

### 7.1 Daily Tasks

| Task | Time | Owner | Duration |
|------|------|-------|----------|
| Review overnight alerts | 09:00 | On-call Engineer | 15 min |
| Check backup status | 09:30 | DevOps | 5 min |
| Verify monitoring dashboards | 10:00 | Operations | 10 min |

### 7.2 Weekly Tasks

| Task | Day | Owner | Duration |
|------|-----|-------|----------|
| Security patch review | Monday | Security Team | 30 min |
| Performance review | Wednesday | DevOps Lead | 1 hour |
| Capacity planning check | Friday | Infrastructure | 30 min |

### 7.3 Monthly Tasks

| Task | Owner | Duration |
|------|-------|----------|
| Backup restoration test | DevOps Lead | 2 hours |
| Access review (RBAC) | Security Team | 1 hour |
| Documentation audit | Technical Writer | 2 hours |
| Disaster recovery drill | Operations Team | 4 hours |

### 7.4 Quarterly Tasks

| Task | Owner | Duration |
|------|-------|----------|
| Secret rotation | Security Team | 4 hours |
| Penetration testing | Security Vendor | 1 week |
| Architecture review | Tech Lead | 2 hours |
| Compliance audit | Compliance Officer | 1 day |

---

## 8. TROUBLESHOOTING GUIDE

### 8.1 Common Issues & Resolutions

**Issue: Application won't start**
- Check environment variables are set: `./scripts/verify-env.sh`
- Review recent configuration changes
- Check database connectivity: `./scripts/test-db-connection.sh`
- Review startup logs: `./scripts/view-logs.sh --service=app --tail=50`

**Issue: High memory usage**
- Identify memory leaks in application code
- Check for runaway processes: `top` or `htop`
- Review cache settings and TTLs
- Consider vertical or horizontal scaling

**Issue: Slow database queries**
- Enable query logging temporarily
- Review slow query log: `./scripts/view-slow-queries.sh`
- Check for missing indexes
- Optimize queries or add caching layer

**Issue: SSL certificate expired**
- Verify certificate status: `openssl s_client -connect [[DOMAIN]]:443`
- Initiate renewal: `./scripts/renew-ssl.sh`
- Update load balancer/cdn with new certificate

### 8.2 Diagnostic Commands

```bash
# Check system health
./scripts/health-check.sh

# View resource usage
./scripts/resource-usage.sh

# Test external dependencies
./scripts/test-dependencies.sh

# Generate system report
./scripts/generate-system-report.sh --output=report-$(date +%Y%m%d).html
```

---

## 9. VENDOR & SERVICE CONTACTS

| Service | Provider | Support URL | Emergency Phone |
|---------|----------|-------------|-----------------|
| Cloud Infrastructure | [[CLOUD_PROVIDER]] | [[CLOUD_SUPPORT_URL]] | [[CLOUD_PHONE]] |
| Database Hosting | [[DB_PROVIDER]] | [[DB_SUPPORT_URL]] | [[DB_PHONE]] |
| Monitoring | [[MONITORING_PROVIDER]] | [[MONITORING_SUPPORT_URL]] | [[MONITORING_PHONE]] |
| CDN | [[CDN_PROVIDER]] | [[CDN_SUPPORT_URL]] | [[CDN_PHONE]] |
| Domain Registrar | [[DOMAIN_PROVIDER]] | [[DOMAIN_SUPPORT_URL]] | [[DOMAIN_PHONE]] |

---

## 10. KNOWLEDGE CHECK QUIZ

Test your understanding before taking operational responsibility:

### Section A: System Architecture (5 questions)

1. **What are the three core responsibilities of an operator?**
   - A) Speed, efficiency, cost reduction
   - B) Uptime, safety, transparency
   - C) Development, testing, deployment
   - D) Sales, marketing, support

2. **Which component handles session management?**
   - A) PostgreSQL
   - B) Redis
   - C) S3
   - D) CDN

3. **What is the target uptime SLA?**
   - A) 99%
   - B) 99.5%
   - C) 99.9%
   - D) 100%

4. **How often should secrets be rotated at minimum?**
   - A) Monthly
   - B) Quarterly
   - C) Annually
   - D) Never

5. **What is the escalation threshold for contacting Vantus?**
   - A) 15 minutes
   - B) 30 minutes
   - C) 1 hour
   - D) 2 hours

### Section B: Operational Procedures (5 questions)

6. **What is the first step in deploying a new version?**
   - A) Deploy to production
   - B) Check current version
   - C) Notify users
   - D) Run tests

7. **How long should you monitor SLOs after a production deployment?**
   - A) 5 minutes
   - B) 15 minutes
   - C) 1 hour
   - D) 24 hours

8. **What time are automated database backups performed?**
   - A) 00:00 UTC
   - B) 02:00 UTC
   - C) 06:00 UTC
   - D) 12:00 UTC

9. **Which log directory contains security audit logs?**
   - A) /var/log/app/
   - B) /var/log/syslog
   - C) /var/log/audit/
   - D) /var/log/security/

10. **What is the recommended action when CPU usage exceeds 90%?**
    - A) Ignore it
    - B) Restart the server
    - C) Scale immediately
    - D) Wait for next business day

### Answer Key
1. B, 2. B, 3. C, 4. B, 5. D, 6. B, 7. C, 8. B, 9. C, 10. C

**Passing Score:** 8/10 (80%)

---

## 11. CERTIFICATION OF COMPLETION

I certify that I have:
- [ ] Read and understood this Owner & Operator Guide
- [ ] Completed all hands-on exercises
- [ ] Passed the knowledge check quiz (score: ___/10)
- [ ] Demonstrated proficiency in common operational tasks
- [ ] Know how to escalate issues appropriately

**Operator Name:** _________________________________  
**Operator Signature:** _________________________________  
**Date:** _________________________________  

**Verified By (Vantus):** _________________________________  
**Date:** _________________________________  

---

## 12. AMENDMENT HISTORY

| Date | Section | Change Description | Approved By |
|------|---------|-------------------|-------------|
| [[DATE]] | - | Initial document creation | [[APPROVER]] |

---

[End of Owner & Operator Guide]
