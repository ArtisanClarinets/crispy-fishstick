---
Document: ADMIN_RUNBOOK
Doc ID: VS-TEMPLATE-ENABLE-002
Client: [[CLIENT_NAME]]
Project: [[PROJECT_NAME]]
Owner: Delivery Lead
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/08_enablement/02_ADMIN_RUNBOOK.md
---

# Administrator Deep-Dive Runbook

**Audience:** IT Directors, Platform Engineers, DevOps Leads  
**Scope:** Administrative operations, infrastructure management, compliance  
**Prerequisites:** Owner & Operator Guide completion  
**Classification:** Internal Use Only  

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | [[DATE]] | [[AUTHOR]] | Initial release |

### Review & Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Client IT Director | [[CLIENT_IT_DIR]] | _________________ | _______ |
| Vantus DevOps Lead | [[VANTUS_DEVOPS]] | _________________ | _______ |
| Client Security Officer | [[CLIENT_SECURITY]] | _________________ | _______ |

---

## 1. SYSTEM ARCHITECTURE FOR ADMINS

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CDN Layer                            │
│              (CloudFront / Cloudflare)                      │
└───────────────────────┬─────────────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                     Load Balancer                           │
│                 (Application Gateway)                       │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
┌───────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
│   App Node   │ │  App Node   │ │  App Node   │
│      1       │ │     2       │ │     N       │
└───────┬──────┘ └──────┬──────┘ └──────┬──────┘
        │               │               │
        └───────────────┼───────────────┘
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                   Data Layer                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ PostgreSQL   │  │    Redis     │  │  Object      │     │
│  │  Primary     │  │   Cluster    │  │  Storage     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Component Specifications

| Component | Specification | Scaling Strategy |
|-----------|--------------|------------------|
| Frontend | Next.js 16, Node.js 20+ | Horizontal (stateless) |
| API Layer | Server Actions, tRPC | Horizontal (stateless) |
| Database | PostgreSQL 15+, 4 vCPU, 16GB RAM | Primary + Read Replica |
| Cache | Redis 7+, clustered | Cluster mode enabled |
| Storage | S3-compatible, encrypted | Unlimited, lifecycle policies |

---

## 2. INFRASTRUCTURE MANAGEMENT

### 2.1 Managing Compute Resources

**Check Resource Utilization:**
```bash
# System-wide resource check
./scripts/admin/check-resources.sh

# Kubernetes-specific commands
kubectl top nodes
kubectl top pods --all-namespaces

# Docker-specific commands
docker stats --no-stream
```

**Scaling Operations:**
```bash
# Horizontal scaling (add more instances)
kubectl scale deployment [[APP_NAME]] --replicas=5 --namespace=production

# Vertical scaling (increase instance size)
kubectl patch deployment [[APP_NAME]] -p '{"spec":{"template":{"spec":{"containers":[{"name":"app","resources":{"limits":{"cpu":"2000m","memory":"4Gi"}}}]}}}}' --namespace=production

# Auto-scaling configuration
kubectl autoscale deployment [[APP_NAME]] --min=3 --max=10 --cpu-percent=70 --namespace=production
```

**Video Tutorial:** [Infrastructure Scaling]([[VIDEO_URL_SCALING]])

### 2.2 Managing Database

**Backup Operations:**
```bash
# Create production backup
./scripts/admin/backup-db.sh --environment=production --tag="manual-$(date +%Y%m%d)"

# List available backups
./scripts/admin/list-backups.sh

# Verify backup integrity
./scripts/admin/verify-backup.sh [[BACKUP_ID]]

# Restore from backup (DISASTER RECOVERY)
./scripts/admin/restore-db.sh [[BACKUP_ID]] --confirmation-required
```

**Database Maintenance:**
```bash
# Check replication status
psql -U admin -d [[DB_NAME]] -h [[DB_HOST]] -c "SELECT * FROM pg_stat_replication;"

# Analyze and vacuum (performance optimization)
psql -U admin -d [[DB_NAME]] -c "VACUUM ANALYZE;"

# Check for long-running queries
psql -U admin -d [[DB_NAME]] -c "SELECT pid, now() - query_start AS duration, query FROM pg_stat_activity WHERE state = 'active' AND now() - query_start > interval '5 minutes';"

# Check table sizes
psql -U admin -d [[DB_NAME]] -c "SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) FROM pg_tables WHERE schemaname='public' ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;"
```

**Hands-on Exercise:**
> **Exercise 2.2:** Create a manual database backup, verify its integrity, then perform a test restore to a temporary database. Document the process and timing.

**Knowledge Check:**
1. What command checks the replication status of the database?
2. How do you identify long-running queries?
3. What is the purpose of VACUUM ANALYZE?

### 2.3 Managing Secrets & Credentials

**Secret Rotation Procedure:**
```bash
# Step 1: Backup current secrets
./scripts/admin/backup-secrets.sh --environment=production

# Step 2: Generate new secrets
./scripts/admin/rotate-secrets.sh --environment=production --service=all

# Step 3: Update secret manager (HashiCorp Vault, AWS Secrets Manager, etc.)
# Navigate to [[SECRET_MANAGER_URL]]

# Step 4: Deploy with new secrets
./scripts/admin/redeploy-with-secrets.sh --environment=production

# Step 5: Verify no authentication failures
./scripts/view-logs.sh --service=app --grep="auth" --level=error --duration=10m
```

**Audit Secret Access:**
```bash
# View audit log
./scripts/admin/audit-secret-access.sh --start-date=$(date -d '7 days ago' +%Y-%m-%d)

# Check for unusual access patterns
./scripts/admin/detect-anomalous-access.sh
```

**Revoke Compromised Credentials:**
```bash
# Immediate revocation
./scripts/admin/revoke-secret.sh [[SECRET_ID]] --reason="[[REASON]]"

# Force rotation of all related secrets
./scripts/admin/rotate-secrets.sh --environment=production --force
```

**Credential Inventory Table:**

| Credential Type | Location | Rotation Frequency | Last Rotated | Owner |
|-----------------|----------|-------------------|--------------|-------|
| Database Password | Vault | Quarterly | [[DATE]] | DBA |
| API Keys | Secrets Manager | Quarterly | [[DATE]] | DevOps |
| SSL Certificates | Cert Manager | Annually | [[DATE]] | Security |
| Service Accounts | IAM | Quarterly | [[DATE]] | Admin |
| Encryption Keys | KMS | Annually | [[DATE]] | Security |

**Video Tutorial:** [Secret Management & Rotation]([[VIDEO_URL_SECRET_MGMT]])

---

## 3. COMPLIANCE & AUDIT

### 3.1 Audit Logging

**Log Locations:**
- System audit logs: `/var/log/audit/audit.log`
- Application audit: `/var/log/app/audit.log`
- Database audit: Configured via PostgreSQL audit extension

**Log Retention:**
- Minimum retention: 90 days
- Storage: Immutable, encrypted at rest
- Access: Role-based, logged

**Audit Query Examples:**
```bash
# Search for administrative actions
./scripts/admin/query-audit.sh --action="admin" --start-date="2026-01-01"

# Check for failed authentication attempts
./scripts/admin/query-audit.sh --action="auth" --status="failed" --start-date="2026-01-01"

# Generate compliance report
./scripts/admin/compliance-check.sh --report-type=soc2 --output=compliance-report-$(date +%Y%m).pdf
```

### 3.2 Compliance Scanning

**Monthly Compliance Check:**
```bash
# Run full compliance scan
./scripts/admin/compliance-check.sh --full

# Check specific controls
./scripts/admin/compliance-check.sh --control=access-management
./scripts/admin/compliance-check.sh --control=data-encryption
./scripts/admin/compliance-check.sh --control=backup-verification
```

**Compliance Frameworks Supported:**
- SOC 2 Type II
- ISO 27001
- GDPR (Data Protection)
- HIPAA (if applicable)

### 3.3 Security Hardening Checklist

**Quarterly Security Review:**

| Control | Requirement | Verification Method | Status |
|---------|-------------|-------------------|--------|
| Password Policy | 16+ chars, mixed case, symbols | Policy audit | [ ] |
| MFA | Enabled for all admin accounts | Account review | [ ] |
| Firewall Rules | Reviewed quarterly | Rule audit | [ ] |
| Security Patches | Applied within 48h | Patch log review | [ ] |
| EDR/Antivirus | Active on all hosts | Agent status check | [ ] |
| Access Reviews | Quarterly RBAC review | Access log analysis | [ ] |
| Encryption at Rest | AES-256 verified | Configuration audit | [ ] |
| Encryption in Transit | TLS 1.3 enforced | SSL scan | [ ] |

**Video Tutorial:** [Security Compliance Audit]([[VIDEO_URL_COMPLIANCE]])

---

## 4. INCIDENT MANAGEMENT

### 4.1 Incident Classification

| Severity | Definition | Response Time | Escalation |
|----------|------------|---------------|------------|
| P0 - Critical | Complete system outage | 15 minutes | Immediate |
| P1 - High | Major feature unavailable | 1 hour | Within 30 min |
| P2 - Medium | Partial degradation | 4 hours | Within 2 hours |
| P3 - Low | Minor issue, workaround exists | 24 hours | Next business day |

### 4.2 Incident Response Workflow

```
1. DETECTION (Monitoring alert or user report)
   └─ Validate incident severity
   
2. RESPONSE (Immediate action)
   └─ Assemble response team
   └─ Implement mitigation
   └─ Communicate to stakeholders
   
3. INVESTIGATION (Root cause analysis)
   └─ Preserve evidence
   └─ Analyze logs and metrics
   └─ Identify contributing factors
   
4. RESOLUTION (Fix implementation)
   └─ Develop fix
   └─ Test in staging
   └─ Deploy to production
   
5. POST-INCIDENT (Learning)
   └─ Document timeline
   └─ Conduct retrospective
   └─ Implement preventive measures
```

**Incident Command Structure:**
- **Incident Commander:** Overall coordination
- **Technical Lead:** Technical investigation and resolution
- **Communications Lead:** Stakeholder updates
- **Scribe:** Documentation and timeline

### 4.3 Communication Templates

**Initial Notification (P0/P1):**
```
Subject: [INCIDENT] [[PROJECT_NAME]] - [BRIEF DESCRIPTION]

Status: Investigating
Impact: [DESCRIPTION OF IMPACT]
Start Time: [TIMESTAMP]
Next Update: [TIME + 30 MINUTES]

We are investigating reports of [ISSUE]. Our team is actively working on resolution.
```

**Status Update:**
```
Subject: [UPDATE] [[PROJECT_NAME]] Incident - [STATUS]

Status: [INVESTIGATING/MITIGATED/RESOLVED]
Current Impact: [DESCRIPTION]
Actions Taken: [LIST]
Next Steps: [LIST]
Next Update: [TIME]
```

**Resolution Notification:**
```
Subject: [RESOLVED] [[PROJECT_NAME]] Incident

Status: RESOLVED
Duration: [X MINUTES/HOURS]
Root Cause: [BRIEF DESCRIPTION]
Resolution: [WHAT WAS DONE]
Preventive Actions: [PLANNED IMPROVEMENTS]
```

---

## 5. ADVANCED OPERATIONS

### 5.1 Blue-Green Deployment

**Procedure:**
```bash
# Step 1: Deploy to "green" environment
./scripts/admin/deploy-green.sh --version=[[NEW_VERSION]]

# Step 2: Run smoke tests on green
./scripts/admin/smoke-test.sh --environment=green

# Step 3: Switch traffic (gradual or immediate)
./scripts/admin/switch-traffic.sh --to=green --percentage=10
./scripts/admin/switch-traffic.sh --to=green --percentage=50
./scripts/admin/switch-traffic.sh --to=green --percentage=100

# Step 4: Monitor for issues
./scripts/admin/monitor-deployment.sh --duration=30m

# Step 5: If issues, rollback
./scripts/admin/switch-traffic.sh --to=blue

# Step 6: If successful, retire blue
./scripts/admin/retire-environment.sh --environment=blue
```

**Hands-on Exercise:**
> **Exercise 5.1:** Perform a blue-green deployment in staging. Document the time taken for each step and any issues encountered.

### 5.2 Database Migration Procedures

**Pre-Migration Checklist:**
- [ ] Backup created and verified
- [ ] Migration tested in staging
- [ ] Rollback plan documented
- [ ] Maintenance window scheduled
- [ ] Stakeholders notified

**Migration Execution:**
```bash
# Step 1: Enable maintenance mode
./scripts/admin/enable-maintenance.sh --environment=production

# Step 2: Create final backup
./scripts/admin/backup-db.sh --environment=production --tag="pre-migration"

# Step 3: Execute migration
npm run db:migrate:production

# Step 4: Verify migration success
npm run db:verify

# Step 5: Run application tests
./scripts/admin/smoke-test.sh --environment=production

# Step 6: Disable maintenance mode
./scripts/admin/disable-maintenance.sh --environment=production
```

### 5.3 Disaster Recovery

**Recovery Time Objective (RTO):** 4 hours  
**Recovery Point Objective (RPO):** 1 hour

**Disaster Recovery Runbook:**
```bash
# Phase 1: Assessment (0-30 min)
./scripts/dr/assess-damage.sh
./scripts/dr/notify-stakeholders.sh --severity=disaster

# Phase 2: Infrastructure Recovery (30 min - 2 hours)
./scripts/dr/provision-infrastructure.sh --region=[[FAILOVER_REGION]]
./scripts/dr/restore-database.sh --backup-id=[[LATEST_BACKUP]]
./scripts/dr/restore-storage.sh

# Phase 3: Application Recovery (2-3 hours)
./scripts/dr/deploy-application.sh --environment=dr
./scripts/dr/configure-networking.sh
./scripts/dr/verify-services.sh

# Phase 4: Validation (3-4 hours)
./scripts/dr/run-full-tests.sh
./scripts/dr/update-dns.sh --point-to=dr
./scripts/dr/notify-recovery-complete.sh
```

**Video Tutorial:** [Disaster Recovery Walkthrough]([[VIDEO_URL_DR]])

---

## 6. PERFORMANCE OPTIMIZATION

### 6.1 Performance Monitoring

**Key Metrics:**
| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| LCP (Largest Contentful Paint) | < 2.5s | > 3.0s |
| INP (Interaction to Next Paint) | < 200ms | > 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | > 0.15 |
| TTFB (Time to First Byte) | < 600ms | > 800ms |
| API Response Time (p95) | < 500ms | > 1000ms |

**Performance Profiling:**
```bash
# Generate performance report
./scripts/admin/performance-report.sh --duration=24h --output=perf-report.html

# Analyze slow queries
./scripts/admin/analyze-slow-queries.sh --threshold=100ms

# Check bundle sizes
npm run analyze
```

### 6.2 Optimization Techniques

**Database Optimization:**
- Index analysis and creation
- Query optimization
- Connection pooling tuning
- Read replica utilization

**Application Optimization:**
- Code splitting and lazy loading
- Image optimization (WebP, responsive)
- Caching strategy implementation
- CDN configuration

**Infrastructure Optimization:**
- Auto-scaling policies
- Resource right-sizing
- Geographic distribution
- Edge caching

---

## 7. KNOWLEDGE CHECK QUIZ

### Section A: Infrastructure Management (5 questions)

1. **What is the primary database technology used?**
   - A) MySQL
   - B) PostgreSQL
   - C) MongoDB
   - D) Oracle

2. **How often should secrets be rotated at minimum?**
   - A) Monthly
   - B) Quarterly
   - C) Semi-annually
   - D) Annually

3. **What is the RTO (Recovery Time Objective) for disaster recovery?**
   - A) 1 hour
   - B) 2 hours
   - C) 4 hours
   - D) 8 hours

4. **Which command scales a Kubernetes deployment to 5 replicas?**
   - A) kubectl scale deployment --count=5
   - B) kubectl scale deployment --replicas=5
   - C) kubectl resize deployment --to=5
   - D) kubectl set replicas deployment 5

5. **What is the minimum log retention period?**
   - A) 30 days
   - B) 60 days
   - C) 90 days
   - D) 1 year

### Section B: Security & Compliance (5 questions)

6. **What encryption standard is used for data at rest?**
   - A) AES-128
   - B) AES-256
   - C) RSA-2048
   - D) ChaCha20

7. **How quickly must security patches be applied?**
   - A) Within 24 hours
   - B) Within 48 hours
   - C) Within 1 week
   - D) Within 1 month

8. **What is the P0 incident response time?**
   - A) 5 minutes
   - B) 15 minutes
   - C) 30 minutes
   - D) 1 hour

9. **Where are audit logs stored?**
   - A) /var/log/app/
   - B) /var/log/syslog
   - C) /var/log/audit/
   - D) /var/log/security/

10. **What compliance framework is supported?**
    - A) SOC 2 Type II only
    - B) ISO 27001 only
    - C) SOC 2, ISO 27001, GDPR
    - D) HIPAA only

### Answer Key
1. B, 2. B, 3. C, 4. B, 5. C, 6. B, 7. B, 8. B, 9. C, 10. C

**Passing Score:** 8/10 (80%)

---

## 8. CERTIFICATION OF COMPLETION

I certify that I have:
- [ ] Read and understood this Administrator Runbook
- [ ] Completed all hands-on exercises
- [ ] Passed the knowledge check quiz (score: ___/10)
- [ ] Demonstrated proficiency in infrastructure management
- [ ] Demonstrated proficiency in security and compliance procedures
- [ ] Know how to respond to incidents and disasters

**Administrator Name:** _________________________________  
**Administrator Signature:** _________________________________  
**Date:** _________________________________  

**Verified By (Vantus):** _________________________________  
**Date:** _________________________________  

---

## 9. AMENDMENT HISTORY

| Date | Section | Change Description | Approved By |
|------|---------|-------------------|-------------|
| [[DATE]] | - | Initial document creation | [[APPROVER]] |

---

[End of Administrator Runbook]
