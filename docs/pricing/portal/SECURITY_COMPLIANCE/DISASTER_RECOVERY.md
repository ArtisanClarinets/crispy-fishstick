# Vantus Client Portal — Disaster Recovery Runbook

**Document ID:** VS-DR-001  
**Version:** 1.0.0  
**Classification:** INTERNAL — RESTRICTED  
**Last Updated:** February 22, 2026  
**Owner:** VP of Operations  
**Approved By:** CTO, CISO

---

## QUICK REFERENCE — INCIDENT DECLARATION

| Severity | Trigger | Response Time | Notify |
|----------|---------|---------------|--------|
| **SEV 1** | Complete outage, data loss, security breach | Immediate | All stakeholders |
| **SEV 2** | Major functionality impaired | 15 minutes | Leadership + Clients |
| **SEV 3** | Partial degradation | 1 hour | Operations team |
| **SEV 4** | Minor issue | Next business day | Ticket only |

**Incident Commander:** VP of Operations (primary) / CTO (secondary)  
**Emergency Hotline:** +1-XXX-XXX-XXXX  
**Status Page:** https://status.vantus.systems  
**Slack Channel:** #incident-response

---

## TABLE OF CONTENTS

1. [Recovery Objectives](#1-recovery-objectives)
2. [Disaster Scenarios](#2-disaster-scenarios)
3. [Backup Strategy](#3-backup-strategy)
4. [Failover Procedures](#4-failover-procedures)
5. [Recovery Procedures](#5-recovery-procedures)
6. [Communication Plan](#6-communication-plan)
7. [Testing and Validation](#7-testing-and-validation)
8. [Roles and Responsibilities](#8-roles-and-responsibilities)
9. [Runbook Automation](#9-runbook-automation)

---

## 1. RECOVERY OBJECTIVES

### 1.1 Service Tier Definitions

| Tier | Service | Description | Business Impact |
|------|---------|-------------|-----------------|
| **Tier 1 (Critical)** | Client Portal Authentication | Login, session management, access control | **HIGH** — No client access |
| **Tier 1 (Critical)** | Dashboard & Metrics | Real-time monitoring, trust dashboard | **HIGH** — No visibility |
| **Tier 1 (Critical)** | PostgreSQL Database | All client data, configurations, audit logs | **CRITICAL** — Complete data loss |
| **Tier 2 (Important)** | Knowledge Base | Documentation, runbooks, KB articles | **MEDIUM** — Reduced self-service |
| **Tier 2 (Important)** | Incident Management | Alert processing, incident tracking | **MEDIUM** — Manual tracking required |
| **Tier 3 (Standard)** | Reporting & Analytics | Historical reports, trend analysis | **LOW** — Delayed insights |
| **Tier 3 (Standard)** | Non-Prod Environments | Staging, development environments | **LOW** — Dev impact only |

### 1.2 Recovery Time Objectives (RTO)

| Service Tier | RTO Target | Maximum Tolerance | Measurement Point |
|--------------|------------|-------------------|-------------------|
| **Tier 1** | 30 minutes | 2 hours | From incident declaration to service availability |
| **Tier 2** | 2 hours | 4 hours | From incident declaration to full functionality |
| **Tier 3** | 8 hours | 24 hours | From incident declaration to restoration |

### 1.3 Recovery Point Objectives (RPO)

| Data Type | RPO Target | Backup Frequency | Retention Period |
|-----------|------------|------------------|------------------|
| **Transactional Database** | 5 minutes | Continuous WAL + Hourly snapshots | 35 days (PITR) |
| **User-Generated Content** | 1 hour | Hourly incremental | 30 days |
| **Configuration Data** | 24 hours | Daily + Git version control | 90 days |
| **Audit Logs** | 0 (real-time) | Streamed to immutable store | 7 years |
| **File Attachments** | 4 hours | 4-hour incremental | 90 days |

### 1.4 Maximum Tolerable Outage (MTO) by Business Function

| Business Function | MTO | Impact if Exceeded | Mitigation Strategy |
|-------------------|-----|--------------------|---------------------|
| **Client Access to Portal** | 2 hours | SLA breach, client churn | Active-active deployment |
| **Data Modification Operations** | 4 hours | Business halt, revenue loss | Hot standby database |
| **Reporting & Analytics** | 24 hours | Delayed decision making | Cached read replicas |
| **Audit & Compliance** | 0 hours | Regulatory violation | Immutable log streaming |
| **Disaster Recovery Testing** | 30 days | Compliance failure | Automated monthly drills |

### 1.5 Recovery Priority Matrix

```
Phase 1 (0-30 min):   Authentication → Database → Core API
Phase 2 (30-120 min): Dashboard → Knowledge Base → Notifications  
Phase 3 (2-8 hours):  Analytics → Reporting → Non-Prod Restore
Phase 4 (8-24 hours): Full verification → Post-mortem → Documentation update
```

---

## 2. DISASTER SCENARIOS

### 2.1 Data Center Failure (Cloud Provider Regional Outage)

**Scenario Description:**  
Complete unavailability of primary Vercel region (e.g., us-east-1) due to AWS/GCP outage.

**Detection:**
- Automated health checks failing
- UptimeRobot alerts for all regions
- Vercel status page reports regional issues

**Immediate Response (0-15 minutes):**
1. **Confirm scope:** Check Vercel status page and cloud provider status
2. **Activate DR team:** Page on-call engineer and VP of Operations
3. **Declare incident:** Create incident in #incident-response Slack channel
4. **Initiate failover:** Execute DNS failover to secondary region (see Section 4)

**Recovery Steps:**
1. Verify secondary region infrastructure is healthy
2. Promote read replica database to primary
3. Update environment variables for new database endpoint
4. Deploy application to secondary region
5. Update DNS records to point to secondary region
6. Verify client access and functionality

**RTO:** 30 minutes | **RPO:** 5 minutes

---

### 2.2 Database Corruption

**Scenario Description:**  
PostgreSQL database corruption due to hardware failure, software bug, or malicious activity.

**Detection:**
- Database connection errors
- Data integrity check failures
- Unusual query errors or crashes
- Checksum mismatches in logs

**Immediate Response (0-15 minutes):**
1. **Stop writes:** Immediately put application in read-only mode
2. **Isolate corruption:** Identify affected tables/schemas
3. **Preserve evidence:** Capture logs and error states before recovery
4. **Notify stakeholders:** Alert database admin and incident commander

**Recovery Steps:**
1. Attempt point-in-time recovery to just before corruption timestamp
2. If PITR fails, restore from most recent clean backup
3. Verify restored data integrity with automated checks
4. Reconcile any data gaps from transaction logs
5. Gradually restore write access after verification
6. Root cause analysis and remediation

**RTO:** 2 hours | **RPO:** 5 minutes (with PITR) or 1 hour (from backup)

---

### 2.3 Ransomware Attack

**Scenario Description:**  
Ransomware infection affecting systems, encrypted files, or ransom demands.

**Detection:**
- Unexpected file encryption notices
- Ransom messages or desktop backgrounds
- Unusual file extensions (.locked, .encrypted, etc.)
- Abnormal network traffic to known malicious IPs
- IDS/EDR alerts for ransomware signatures

**Immediate Response (0-30 minutes):**
1. **ISOLATE IMMEDIATELY:** Disconnect affected systems from network
2. **Preserve evidence:** Do NOT power off — capture memory dump if possible
3. **Alert security team:** Page CISO and security incident response team
4. **Containment:** Identify and isolate all potentially affected systems
5. **DO NOT PAY:** Company policy prohibits ransom payment

**Recovery Steps:**
1. **Eradication:** Wipe all affected systems completely
2. **Rebuild from clean images:** Use golden images from before infection
3. **Restore from air-gapped backups:** Use offline backups only
4. **Verify integrity:** Scan all restored data for malware
5. **Password reset:** Rotate ALL credentials, API keys, and certificates
6. **Security hardening:** Implement additional controls before restoration
7. **Forensic analysis:** Engage third-party forensic team
8. **Regulatory notification:** Notify affected parties per breach notification laws

**RTO:** 4-8 hours | **RPO:** 24 hours (from air-gapped backup)

---

### 2.4 Accidental Data Deletion

**Scenario Description:**  
Critical data accidentally deleted by administrator, developer, or automated process.

**Detection:**
- Client reports missing data
- Monitoring alerts for unusual deletion patterns
- Audit log entries showing bulk DELETE operations
- Application errors for missing expected data

**Immediate Response (0-15 minutes):**
1. **Stop the bleeding:** Identify and halt the source of deletion
2. **Assess scope:** Determine what data was deleted and when
3. **Preserve logs:** Secure all audit logs and transaction logs
4. **Notify incident commander:** Alert operations leadership

**Recovery Steps:**
1. Identify exact timestamp of deletion from audit logs
2. Execute point-in-time recovery to just before deletion
3. Export deleted data from recovery environment
4. Carefully re-insert deleted data into production
5. Verify data integrity and application functionality
6. Review and strengthen deletion safeguards

**RTO:** 1-2 hours | **RPO:** 0 (with PITR) — No data loss

---

### 2.5 Application-Level Failure

**Scenario Description:**  
Critical bug or deployment causing complete application failure or data corruption.

**Detection:**
- Error rate spike in monitoring
- Health check failures
- Client reports of application errors
- Automated rollback triggers

**Immediate Response (0-15 minutes):**
1. **Assess severity:** Determine if rollback is required
2. **Initiate rollback:** Rollback to last known good deployment
3. **Enable maintenance mode:** If rollback fails, show maintenance page
4. **Preserve state:** Capture logs and metrics from failing deployment

**Recovery Steps:**
1. Execute automated rollback via Vercel CLI:
   ```bash
   vercel rollback --prod [deployment-id]
   ```
2. Verify application health post-rollback
3. Isolate failing code changes
4. Fix issues in development environment
5. Deploy fix through standard CI/CD pipeline
6. Verify fix in staging before production deployment

**RTO:** 15 minutes | **RPO:** 0 — No data loss

---

### 2.6 Third-Party Service Outage

**Scenario Description:**  
Critical third-party service (Auth provider, Redis, Monitoring) becomes unavailable.

**Detection:**
- Service health check failures
- Timeout errors in application logs
- Third-party status page alerts
- Cascading failures in dependent services

**Immediate Response (0-15 minutes):**
1. **Identify affected service:** Check status pages and health endpoints
2. **Enable fallback modes:** Switch to degraded operation if available
3. **Implement circuit breaker:** Prevent cascade failures
4. **Communicate:** Update status page with known impact

**Service-Specific Recovery:**

**BetterAuth (Authentication) Outage:**
- Enable offline JWT validation mode
- Extend existing session TTL temporarily
- Implement emergency access tokens for critical operations

**Upstash Redis Outage:**
- Failover to local in-memory cache (reduced functionality)
- Disable rate limiting temporarily
- Queue operations for later processing

**UptimeRobot API Outage:**
- Switch to cached metrics
- Disable real-time dashboard updates
- Use manual health checks

**RTO:** Varies by service (15 min - 2 hours) | **RPO:** 0

---

### 2.7 DNS/DDoS Attack

**Scenario Description:**  
DNS infrastructure failure or Distributed Denial of Service attack.

**Detection:**
- DNS resolution failures
- Traffic spike anomalies
- CDN/bandwidth alerts
- Geographic access pattern changes

**Immediate Response (0-15 minutes):**
1. **Activate DDoS protection:** Enable Cloudflare "Under Attack" mode
2. **Scale infrastructure:** Auto-scale to absorb attack
3. **Analyze traffic:** Identify attack patterns and sources
4. **Implement rate limiting:** Aggressive rate limiting on edge

**Recovery Steps:**
1. Enable Cloudflare DDoS mitigation
2. Implement IP blocking rules for attack sources
3. Activate geographic blocking if needed
4. Scale backend infrastructure to handle load
5. Monitor for attack cessation
6. Gradually return to normal operation
7. Post-attack analysis and hardening

**RTO:** 30 minutes - 2 hours | **RPO:** 0

---

### 2.8 Staff Availability Crisis

**Scenario Description:**  
Key personnel unavailable during critical incident (illness, emergency, etc.).

**Immediate Response:**
1. **Escalate to secondary:** Contact backup incident commander
2. **Activate emergency contacts:** Use emergency contact list
3. **Engage on-call rotation:** Page next engineer in rotation
4. **Consider external support:** Engage Vantus retained consultants if needed

**Mitigation (Preventive):**
- Document all procedures thoroughly (this runbook)
- Cross-train all critical roles
- Maintain emergency contact list
- Implement "bus factor" protocols (see SOP-XXX)
- Regular DR drills with rotated personnel

---

## 3. BACKUP STRATEGY

### 3.1 Database Backup Schedule

| Backup Type | Frequency | Retention | Storage Location | Encryption |
|-------------|-----------|-----------|------------------|------------|
| **Continuous WAL Archiving** | Real-time | 7 days | Primary region + replica | AES-256 |
| **Hourly Snapshots** | Every hour | 35 days | Same region | AES-256 |
| **Daily Full Backup** | Daily at 02:00 UTC | 90 days | Cross-region | AES-256 |
| **Weekly Archive** | Sundays at 03:00 UTC | 1 year | Air-gapped cold storage | AES-256 |
| **Monthly Archive** | 1st of month | 7 years | Air-gapped cold storage | AES-256 |

**Backup Verification:**
- Automated daily restore test to staging environment
- Weekly manual verification of random backup samples
- Monthly full DR drill with actual restore procedures

### 3.2 File Storage Backup Procedures

**Source:** Client-uploaded files, document attachments  
**Storage:** Vercel Blob / AWS S3 with versioning

| Backup Type | Frequency | Retention | Method |
|-------------|-----------|-----------|--------|
| **Versioned Storage** | Continuous | 30 versions | S3 versioning enabled |
| **Cross-region Replication** | Real-time | Same as source | S3 CRR to secondary region |
| **Daily Sync** | Daily at 01:00 UTC | 90 days | rclone sync to backup bucket |
| **Weekly Archive** | Weekly | 1 year | Glacier Deep Archive |

**Backup Commands:**
```bash
# Manual backup trigger
aws s3 sync s3://vantus-production-files s3://vantus-backup-files/$(date +%Y%m%d)

# Verify backup integrity
aws s3 ls s3://vantus-backup-files/$(date +%Y%m%d) --recursive | wc -l
```

### 3.3 Configuration Backup

**Sources:**
- Environment variables (Vercel)
- Infrastructure as Code (Terraform/Pulumi)
- Application configuration files
- SSL certificates

| Source | Backup Method | Frequency | Storage |
|--------|---------------|-----------|---------|
| **Vercel Env Vars** | `vercel env pull` | Weekly | Encrypted 1Password vault |
| **Terraform State** | Remote backend versioning | Every apply | S3 with locking |
| **Config Files** | Git repository | Every commit | GitHub + external mirror |
| **SSL Certificates** | Automated export | Monthly | Encrypted 1Password vault |

### 3.4 Code Repository Backup

**Primary:** GitHub (vantus.systems repository)

| Backup Type | Method | Frequency | Location |
|-------------|--------|-----------|----------|
| **Primary** | GitHub | Real-time | GitHub infrastructure |
| **Mirror** | GitLab sync | Every push | gitlab.com mirror |
| **Local Clone** | Automated script | Daily | Encrypted local NAS |
| **Archive** | Git bundle | Monthly | Air-gapped storage |

**Backup Verification:**
```bash
# Verify repository integrity
git fsck --full

# Verify all branches backed up
git branch -a | wc -l
```

### 3.5 Documentation Backup

**Sources:** MDX content, runbooks, KB articles

| Source | Method | Frequency | Storage |
|--------|--------|-----------|---------|
| **MDX Content** | Git repository | Every commit | GitHub + mirror |
| **Confluence/Notion** | Export API | Weekly | S3 backup bucket |
| **Generated Docs** | CI artifact | Every build | S3 with 90-day retention |

### 3.6 Backup Encryption and Security

**Encryption Standards:**
- **At Rest:** AES-256-GCM for all backup data
- **In Transit:** TLS 1.3 for all backup transfers
- **Key Management:** AWS KMS with automatic rotation (90 days)

**Access Controls:**
- Backup storage accessible only by DR team IAM roles
- MFA required for all backup access
- Immutable backup buckets (Object Lock compliance mode)
- Separate encryption keys for production and backup data

**Security Monitoring:**
- All backup access logged to SIEM
- Anomaly detection for unusual backup access patterns
- Quarterly access review for backup systems

### 3.7 Backup Testing Procedures

**Daily Automated Tests:**
```bash
#!/bin/bash
# daily-backup-test.sh

# Restore latest backup to staging
git clone <backup-repo> /tmp/backup-test-$(date +%s)

# Verify database restore
pg_restore --clean --if-exists --dbname=staging /backups/latest.sql

# Run integrity checks
psql staging -c "SELECT COUNT(*) FROM critical_table;"

# Report results
if [ $? -eq 0 ]; then
  echo "Backup test PASSED: $(date)" >> /var/log/backup-tests.log
else
  echo "Backup test FAILED: $(date)" | mail -s "BACKUP TEST FAILURE" ops@vantus.systems
fi
```

**Monthly DR Drill:**
1. Schedule DR drill during maintenance window
2. Restore complete environment from backups
3. Verify all functionality (authentication, data access, reporting)
4. Document any issues and update procedures
5. Generate DR drill report for compliance

---

## 4. FAILOVER PROCEDURES

### 4.1 Active-Passive Failover

**Architecture:** Primary (active) in us-east-1, Secondary (passive) in us-west-2

**Failover Trigger:**
- Primary region health checks fail for 5 consecutive minutes
- Manual declaration by incident commander
- Automated failover (if configured and tested)

**Failover Procedure:**

```bash
#!/bin/bash
# active-passive-failover.sh

# Step 1: Verify secondary region health
if ! curl -sf https://west-api.vantus.systems/health; then
  echo "ERROR: Secondary region unhealthy"
  exit 1
fi

# Step 2: Promote database replica
aws rds promote-read-replica \
  --db-instance-identifier vantus-db-west \
  --region us-west-2

# Step 3: Update DNS to point to secondary
aws route53 change-resource-record-sets \
  --hosted-zone-id Z123456789 \
  --change-batch file://failover-dns-west.json

# Step 4: Verify failover
curl -sf https://vantus.systems/health || exit 1

echo "Failover complete: $(date)"
```

**Failback Procedure:**
1. Ensure primary region is fully operational
2. Sync any data changes from secondary to primary
3. Switch DNS back to primary
4. Verify functionality
5. Demote secondary back to replica mode

### 4.2 Active-Active Failover

**Architecture:** Both regions actively serving traffic with global load balancing

**Failover Behavior:**
- Automatic traffic steering by GeoDNS/GLB
- No manual intervention required for single region failure
- Automatic recovery when region returns

**Configuration:**
```hcl
# Terraform: Route53 health-checked failover
resource "aws_route53_record" "portal" {
  zone_id = var.hosted_zone_id
  name    = "portal.vantus.systems"
  type    = "A"
  
  failover_routing_policy {
    type = "PRIMARY"
  }
  
  alias {
    name                   = aws_lb.primary.dns_name
    zone_id                = aws_lb.primary.zone_id
    evaluate_target_health = true
  }
  
  health_check_id = aws_route53_health_check.primary.id
}
```

### 4.3 Database Failover (Primary/Replica)

**Automatic Failover:**
- RDS Multi-AZ handles automatic failover (< 2 minutes)
- Application reconnects via connection pooling
- No manual intervention for AZ failure

**Cross-Region Failover:**
```bash
# Promote read replica to standalone
aws rds promote-read-replica \
  --db-instance-identifier vantus-db-dr \
  --region us-west-2

# Update application connection string
# (via Vercel environment variable update)
vercel env add DATABASE_URL postgres://... --production

# Redeploy to pick up new connection string
vercel --prod
```

**Connection Pool Configuration:**
```typescript
// Database connection with failover support
const pool = new Pool({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 20,
  // Failover: retry failed connections
  fallback_application_name: 'vantus-portal',
  keepAlive: true,
});
```

### 4.4 Load Balancer Failover

**Vercel Edge Network:**
- Automatic by Vercel infrastructure
- No customer action required

**Custom Load Balancer (if applicable):**
```bash
# Check load balancer health
aws elbv2 describe-target-health \
  --target-group-arn arn:aws:elasticloadbalancing:...

# Deregister failed target
aws elbv2 deregister-targets \
  --target-group-arn arn:aws:elasticloadbalancing:... \
  --targets Id=i-1234567890abcdef0

# Register replacement target
aws elbv2 register-targets \
  --target-group-arn arn:aws:elasticloadbalancing:... \
  --targets Id=i-0987654321fedcba0
```

### 4.5 CDN Failover

**Vercel Edge / Cloudflare:**
- Automatic edge location failover
- Origin health checks with automatic failover

**Origin Failover Configuration:**
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Enable stale-while-revalidate for failover
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
  },
};
```

### 4.6 DNS Failover

**Route53 Health-Checked DNS:**
```bash
# Create health check
aws route53 create-health-check \
  --caller-reference $(date +%s) \
  --health-check-config '{
    "IPAddress": "1.2.3.4",
    "Port": 443,
    "Type": "HTTPS",
    "ResourcePath": "/health",
    "FullyQualifiedDomainName": "primary.vantus.systems",
    "RequestInterval": 30,
    "FailureThreshold": 3
  }'

# Create failover record
aws route53 change-resource-record-sets \
  --hosted-zone-id Z123456789 \
  --change-batch '{
    "Changes": [{
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "portal.vantus.systems",
        "Type": "A",
        "SetIdentifier": "Primary",
        "Failover": "PRIMARY",
        "TTL": 60,
        "ResourceRecords": [{"Value": "1.2.3.4"}],
        "HealthCheckId": "abc123"
      }
    }]
  }'
```

---

## 5. RECOVERY PROCEDURES

### 5.1 Database Restore from Backup

**Scenario:** Complete database loss or corruption requiring full restore

**Prerequisites:**
- Backup file available (S3 or local)
- Target database instance provisioned
- Sufficient storage capacity

**Step-by-Step Recovery:**

```bash
#!/bin/bash
# database-restore.sh

# Step 1: Stop application writes
# (Deploy maintenance mode or set read-only)

# Step 2: Create new database instance
aws rds create-db-instance \
  --db-instance-identifier vantus-db-recovery \
  --db-instance-class db.t3.large \
  --engine postgres \
  --master-username admin \
  --master-user-password $(openssl rand -base64 32) \
  --allocated-storage 100

# Step 3: Download backup from S3
aws s3 cp s3://vantus-backups/postgres/$(date +%Y%m%d)/full-backup.sql.gz /tmp/

# Step 4: Restore database
gunzip -c /tmp/full-backup.sql.gz | psql -h $DB_HOST -U admin vantus_db

# Step 5: Verify restore
psql -h $DB_HOST -U admin vantus_db -c "SELECT COUNT(*) FROM users;"

# Step 6: Apply WAL logs for point-in-time recovery (if needed)
# PITR commands specific to PostgreSQL timeline recovery

# Step 7: Update application connection strings
vercel env add DATABASE_URL "postgres://admin:$PASSWORD@$DB_HOST/vantus_db" --production

# Step 8: Resume application
# (Deploy without maintenance mode)
```

**Verification Checklist:**
- [ ] Database connection successful
- [ ] Schema verification: All tables present
- [ ] Data count validation: Key tables have expected row counts
- [ ] Index verification: All indexes created
- [ ] Constraint verification: Foreign keys, unique constraints intact
- [ ] Application test: Core functionality working

### 5.2 Application Rebuild and Redeploy

**Scenario:** Complete application loss or need to rebuild from scratch

**Prerequisites:**
- Source code repository access
- Environment variables backed up
- Build environment available

**Step-by-Step Recovery:**

```bash
#!/bin/bash
# application-rebuild.sh

# Step 1: Clone repository
git clone https://github.com/vantus-systems/vantus-portal.git
cd vantus-portal

# Step 2: Checkout last known good commit
git checkout $(cat /backups/last-known-good-commit.txt)

# Step 3: Install dependencies
npm ci

# Step 4: Restore environment variables
# (From 1Password or secure backup)
vercel env pull .env.production

# Step 5: Run database migrations
npx prisma migrate deploy

# Step 6: Build application
npm run build

# Step 7: Deploy to Vercel
vercel --prod

# Step 8: Verify deployment
curl -sf https://vantus.systems/health || exit 1

echo "Application rebuild complete"
```

### 5.3 Data Reconciliation After Partial Restore

**Scenario:** Partial data loss requiring manual reconciliation

**Procedure:**

```bash
#!/bin/bash
# data-reconciliation.sh

# Step 1: Identify data gaps
psql -h $DB_HOST -U admin vantus_db << EOF
  SELECT 'Missing users' as check_type, COUNT(*) as count
  FROM users WHERE created_at > '$RESTORE_TIMESTAMP'
  UNION ALL
  SELECT 'Missing transactions', COUNT(*)
  FROM transactions WHERE created_at > '$RESTORE_TIMESTAMP';
EOF

# Step 2: Export missing data from backup (if available)
pg_dump -h backup-host -U admin vantus_db \
  --table=users \
  --where="created_at > '$RESTORE_TIMESTAMP'" \
  > /tmp/missing_users.sql

# Step 3: Carefully import missing data
psql -h $DB_HOST -U admin vantus_db < /tmp/missing_users.sql

# Step 4: Verify referential integrity
psql -h $DB_HOST -U admin vantus_db << EOF
  SELECT 
    (SELECT COUNT(*) FROM transactions t 
     LEFT JOIN users u ON t.user_id = u.id 
     WHERE u.id IS NULL) as orphaned_transactions;
EOF

# Step 5: Fix any orphaned records
# (Manual review and correction)
```

### 5.4 Cross-Region Failover

**Detailed Procedure:**

```bash
#!/bin/bash
# cross-region-failover.sh

REGION_PRIMARY="us-east-1"
REGION_SECONDARY="us-west-2"

# Step 1: Verify secondary region infrastructure
echo "Checking secondary region health..."
aws ec2 describe-instances --region $REGION_SECONDARY --filters "Name=instance-state-name,Values=running"

# Step 2: Promote database replica
echo "Promoting database replica..."
aws rds promote-read-replica \
  --db-instance-identifier vantus-db-$REGION_SECONDARY \
  --region $REGION_SECONDARY

# Wait for promotion
aws rds wait db-instance-available \
  --db-instance-identifier vantus-db-$REGION_SECONDARY \
  --region $REGION_SECONDARY

# Step 3: Get new database endpoint
DB_ENDPOINT=$(aws rds describe-db-instances \
  --db-instance-identifier vantus-db-$REGION_SECONDARY \
  --region $REGION_SECONDARY \
  --query 'DBInstances[0].Endpoint.Address' \
  --output text)

# Step 4: Update environment variables
echo "Updating environment variables..."
vercel env add DATABASE_URL "postgres://user:pass@$DB_ENDPOINT/vantus_db" --production -y
vercel env add REDIS_URL "redis://redis-$REGION_SECONDARY.cache.amazonaws.com:6379" --production -y

# Step 5: Deploy to secondary region
echo "Deploying to secondary region..."
vercel --prod --regions $REGION_SECONDARY

# Step 6: Update DNS
echo "Updating DNS..."
aws route53 change-resource-record-sets \
  --hosted-zone-id $HOSTED_ZONE_ID \
  --change-batch '{
    "Changes": [{
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "portal.vantus.systems",
        "Type": "CNAME",
        "TTL": 300,
        "ResourceRecords": [{"Value": "vantus-portal-'$REGION_SECONDARY'.vercel.app"}]
      }
    }]
  }'

# Step 7: Verify
echo "Verifying failover..."
for i in {1..10}; do
  if curl -sf https://portal.vantus.systems/health; then
    echo "Failover successful!"
    exit 0
  fi
  sleep 10
done

echo "FAILOVER VERIFICATION FAILED"
exit 1
```

### 5.5 Point-in-Time Recovery

**Scenario:** Need to restore database to specific point in time

```bash
#!/bin/bash
# point-in-time-recovery.sh

TARGET_TIME="2026-02-22 14:30:00 UTC"
SOURCE_DB="vantus-db-production"
TARGET_DB="vantus-db-recovery"

# Step 1: Restore to point in time
aws rds restore-db-instance-to-point-in-time \
  --source-db-instance-identifier $SOURCE_DB \
  --target-db-instance-identifier $TARGET_DB \
  --restore-time "$TARGET_TIME" \
  --allocated-storage 100

# Step 2: Wait for restore completion
aws rds wait db-instance-available \
  --db-instance-identifier $TARGET_DB

# Step 3: Modify security groups to allow application access
aws rds modify-db-instance \
  --db-instance-identifier $TARGET_DB \
  --vpc-security-group-ids sg-xxxxxxxx

# Step 4: Extract data (selective restore)
pg_dump -h $TARGET_DB_ENDPOINT -U admin vantus_db \
  --table=deleted_table \
  > /tmp/recovered_data.sql

# Step 5: Import to production (carefully!)
psql -h $PRODUCTION_ENDPOINT -U admin vantus_db < /tmp/recovered_data.sql
```

---

## 6. COMMUNICATION PLAN

### 6.1 Internal Escalation Procedures

**Escalation Matrix:**

| Time | Action | Responsible | Communication |
|------|--------|-------------|---------------|
| **T+0 min** | Incident detected | Monitoring / Reporter | Alert in #incident-response |
| **T+5 min** | Initial assessment | On-call Engineer | Status update in Slack |
| **T+15 min** | If SEV 1/2: Page leadership | Incident Commander | Phone call to VP Ops |
| **T+30 min** | If unresolved: Expand team | Incident Commander | Page additional engineers |
| **T+1 hour** | Executive notification | VP Operations | Email to C-suite |
| **T+2 hours** | Client notification (if applicable) | Client Success | Email to affected clients |
| **T+4 hours** | Regulatory notification (if required) | Legal/Compliance | Formal notification |

**Escalation Contact List:**

| Role | Primary | Secondary | Contact Method |
|------|---------|-----------|----------------|
| **Incident Commander** | VP Operations | CTO | Phone: +1-XXX-XXX-XXXX1 |
| **Technical Lead** | Senior Platform Engineer | Senior DevOps Engineer | Phone: +1-XXX-XXX-XXXX2 |
| **Database Admin** | DBA Lead | Senior Backend Engineer | Phone: +1-XXX-XXX-XXXX3 |
| **Security Lead** | CISO | Security Engineer | Phone: +1-XXX-XXX-XXXX4 |
| **Client Success** | VP Client Success | Account Manager | Phone: +1-XXX-XXX-XXXX5 |
| **Legal/Compliance** | General Counsel | Compliance Officer | Phone: +1-XXX-XXX-XXXX6 |

### 6.2 Client Communication Templates

**Template 1: Initial Notification (SEV 1-2)**

```
Subject: [URGENT] Vantus Client Portal Service Disruption

Dear [Client Name],

We are writing to inform you of a service disruption affecting the Vantus Client Portal.

**Incident Summary:**
- Service Impact: [Brief description]
- Start Time: [Timestamp]
- Expected Resolution: [ETA or "Investigating"]
- Affected Features: [List of affected features]

**What We're Doing:**
Our engineering team is actively working to restore full service. We have activated our 
Disaster Recovery procedures and will provide updates every [30/60] minutes.

**Next Update:** [Timestamp]

**Questions?** Contact your account manager or reply to this email.

Thank you for your patience.

Vantus Systems Operations Team
```

**Template 2: Status Update**

```
Subject: [UPDATE] Vantus Client Portal — Incident #[INCIDENT_ID]

Dear [Client Name],

**Update #[N] — [Timestamp]**

Current Status: [Investigating / Identified / Monitoring / Resolved]

Progress:
- [Bullet point of actions taken]
- [Bullet point of current findings]
- [Bullet point of next steps]

Next Update: [Timestamp]

View real-time status: https://status.vantus.systems
```

**Template 3: Resolution Notification**

```
Subject: [RESOLVED] Vantus Client Portal Service Restored

Dear [Client Name],

We are pleased to report that the Vantus Client Portal service has been fully restored.

**Resolution Summary:**
- Resolved At: [Timestamp]
- Total Duration: [Duration]
- Root Cause: [Brief description]

**Post-Incident:**
We are conducting a thorough post-mortem analysis. A detailed incident report will be 
shared within 48 hours, including preventive measures we are implementing.

We apologize for any inconvenience this may have caused.

Vantus Systems Operations Team
```

### 6.3 Status Page Updates

**Status Page:** https://status.vantus.systems

**Update Schedule:**
- SEV 1: Every 15 minutes
- SEV 2: Every 30 minutes
- SEV 3: Every 2 hours
- SEV 4: Upon resolution

**Status Page Components:**

| Component | Description |
|-----------|-------------|
| **Portal Authentication** | Login and session management |
| **Dashboard & Metrics** | Real-time dashboard and trust metrics |
| **Knowledge Base** | Documentation and runbooks |
| **Incident Management** | Alert processing and incident tracking |
| **API Services** | REST API endpoints |
| **File Attachments** | Document upload/download |
| **Notifications** | Email and Slack notifications |

### 6.4 Regulatory Notification Requirements

**Notification Triggers:**

| Regulation | Trigger | Timeline | Recipients |
|------------|---------|----------|------------|
| **GDPR** | Personal data breach | 72 hours to supervisory authority | ICO (UK), CNIL (FR), etc. |
| **GDPR** | High-risk breach | Without undue delay to data subjects | Affected individuals |
| **CCPA/CPRA** | Unauthorized access to personal info | Without unreasonable delay | California AG + affected residents |
| **HIPAA** | PHI breach > 500 individuals | 60 days to HHS + media | HHS, affected individuals, media |
| **SOC 2** | Security incident affecting controls | As per incident response plan | Auditors, board |
| **State Laws** | Varies by state | 24-72 hours typically | State AGs, affected residents |

**Notification Process:**
1. Legal/Compliance team assesses breach scope
2. Draft notification with required elements
3. Legal review and approval
4. Submit to regulatory authorities
5. Notify affected individuals (if required)
6. Document all notifications for audit trail

### 6.5 Media Response Procedures

**Media Inquiries:**
- All media inquiries directed to VP of Marketing
- No technical staff authorized to speak to media
- Prepared statement template maintained by Marketing

**Media Response Template:**

```
"Vantus Systems experienced a service disruption on [Date]. We immediately activated 
our incident response procedures and have restored full service as of [Time]. 

The security and integrity of our client data is our highest priority. We are 
conducting a thorough investigation and will share findings as appropriate. 

For ongoing updates, please visit our status page at status.vantus.systems."
```

---

## 7. TESTING AND VALIDATION

### 7.1 DR Drill Schedule

| Drill Type | Frequency | Duration | Participants |
|------------|-----------|----------|--------------|
| **Tabletop Exercise** | Quarterly | 2 hours | DR Team, Leadership |
| **Component Failover Test** | Monthly | 4 hours | Platform Team |
| **Full DR Simulation** | Semi-annually | 8 hours | All Teams |
| **Unannounced Drill** | Annually | 4 hours | On-call Rotation |

**2026 DR Drill Calendar:**

| Date | Type | Scope | Lead |
|------|------|-------|------|
| March 15, 2026 | Tabletop | Ransomware scenario | VP Operations |
| April 20, 2026 | Component | Database failover | DBA Lead |
| May 18, 2026 | Component | Application rollback | Platform Lead |
| June 15, 2026 | Full DR | Cross-region failover | CTO |
| July 20, 2026 | Component | Backup restore test | DevOps Lead |
| September 15, 2026 | Tabletop | Data center failure | VP Operations |
| October 20, 2026 | Component | DNS failover | Platform Lead |
| December 10, 2026 | Full DR | Unannounced | CISO |

### 7.2 Failover Testing Procedures

**Pre-Test Checklist:**
- [ ] Maintenance window scheduled and communicated
- [ ] Rollback plan documented and tested
- [ ] Monitoring alerts configured for test
- [ ] Test data prepared
- [ ] Stakeholders notified (if visible test)

**Database Failover Test:**
```bash
#!/bin/bash
# db-failover-test.sh

START_TIME=$(date +%s)

# Step 1: Trigger failover
echo "Triggering database failover..."
aws rds reboot-db-instance \
  --db-instance-identifier vantus-db-primary \
  --force-failover

# Step 2: Monitor failover
while true; do
  STATUS=$(aws rds describe-db-instances \
    --db-instance-identifier vantus-db-primary \
    --query 'DBInstances[0].DBInstanceStatus' \
    --output text)
  
  if [ "$STATUS" == "available" ]; then
    END_TIME=$(date +%s)
    DURATION=$((END_TIME - START_TIME))
    echo "Failover completed in $DURATION seconds"
    break
  fi
  
  sleep 5
done

# Step 3: Verify connectivity
psql -h $DB_HOST -U admin vantus_db -c "SELECT 1;" || exit 1

# Step 4: Verify application
./run-smoke-tests.sh

echo "Database failover test PASSED"
```

**Application Rollback Test:**
```bash
#!/bin/bash
# rollback-test.sh

# Step 1: Deploy a known bad version
git checkout broken-commit-hash
vercel --prod

# Step 2: Verify failure
curl -sf https://vantus.systems/health && echo "ERROR: Should have failed" && exit 1

# Step 3: Execute rollback
vercel rollback --prod

# Step 4: Verify recovery
curl -sf https://vantus.systems/health || exit 1

echo "Rollback test PASSED"
```

### 7.3 Recovery Validation Checklists

**Post-Recovery Validation:**

| Component | Validation Method | Success Criteria |
|-----------|------------------|------------------|
| **Authentication** | Login with test accounts | 100% success rate |
| **Database** | Run data integrity checks | All checks pass |
| **Dashboard** | Load all dashboard widgets | < 3s load time |
| **API Endpoints** | Run full API test suite | 100% endpoints respond |
| **File Storage** | Upload and download test file | Success, correct content |
| **Notifications** | Trigger test alerts | Received within 60s |
| **Knowledge Base** | Search and load articles | Results returned |
| **Audit Logging** | Verify log entries | All actions logged |

**Full System Validation Script:**
```bash
#!/bin/bash
# full-validation.sh

ERRORS=0

# Test authentication
echo "Testing authentication..."
curl -sf -X POST https://vantus.systems/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test"}' || ((ERRORS++))

# Test database
echo "Testing database..."
psql $DATABASE_URL -c "SELECT COUNT(*) FROM users;" || ((ERRORS++))

# Test API endpoints
echo "Testing API endpoints..."
for endpoint in /health /api/metrics /api/user; do
  curl -sf https://vantus.systems$endpoint || ((ERRORS++))
done

# Test dashboard
echo "Testing dashboard..."
curl -sf https://vantus.systems/dashboard || ((ERRORS++))

if [ $ERRORS -eq 0 ]; then
  echo "✓ All validation tests PASSED"
  exit 0
else
  echo "✗ $ERRORS validation tests FAILED"
  exit 1
fi
```

### 7.4 Documentation Update Procedures

**Post-Incident Documentation:**
1. Update this runbook with any lessons learned
2. Document any procedure changes
3. Update contact information if changed
4. Update recovery times based on actual performance
5. Archive old versions in document control system

**Documentation Review Schedule:**
- Monthly: Quick review for accuracy
- Quarterly: Comprehensive review with DR team
- Annually: Full revision and re-approval

---

## 8. ROLES AND RESPONSIBILITIES

### 8.1 DR Team Structure

```
                    ┌─────────────────┐
                    │   Incident      │
                    │   Commander     │
                    │  (VP Operations)│
                    └────────┬────────┘
                             │
         ┌───────────────────┼───────────────────┐
         │                   │                   │
         ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  Technical Lead │ │  Communications │ │  Security Lead  │
│  (Platform Eng) │ │    Manager      │ │    (CISO)       │
└────────┬────────┘ └─────────────────┘ └────────┬────────┘
         │                                       │
    ┌────┴────┐                              ┌───┴────┐
    │         │                              │        │
    ▼         ▼                              ▼        ▼
┌──────┐  ┌──────┐                       ┌──────┐  ┌──────┐
│ DBA  │  │DevOps│                       │Foren-│  │Compliance│
│ Lead │  │ Lead │                       │ sics │  │ Officer  │
└──────┘  └──────┘                       └──────┘  └──────┘
```

### 8.2 Role Assignments

| Role | Primary | Secondary | Responsibilities |
|------|---------|-----------|------------------|
| **Incident Commander** | VP Operations | CTO | Overall DR coordination, stakeholder communication, go/no-go decisions |
| **Technical Lead** | Senior Platform Eng | Senior DevOps Eng | Technical recovery execution, system validation |
| **DBA Lead** | Database Administrator | Backend Lead | Database recovery, data integrity verification |
| **Security Lead** | CISO | Security Engineer | Security incident response, forensics, breach assessment |
| **Communications Manager** | VP Client Success | Marketing Manager | Client communications, status page updates, media response |
| **DevOps Lead** | DevOps Engineer | Platform Engineer | Infrastructure recovery, deployment execution |
| **Forensics Lead** | Security Consultant | CISO | Post-incident analysis, evidence preservation |
| **Compliance Officer** | Compliance Lead | Legal Counsel | Regulatory notifications, compliance validation |

### 8.3 Contact Information

**Emergency Contact Sheet**

| Name | Role | Phone | Email | Slack |
|------|------|-------|-------|-------|
| [Name] | VP Operations | +1-XXX-XXX-XXXX1 | vpops@vantus.systems | @vpops |
| [Name] | CTO | +1-XXX-XXX-XXXX2 | cto@vantus.systems | @cto |
| [Name] | Senior Platform Eng | +1-XXX-XXX-XXXX3 | platform@vantus.systems | @platform-lead |
| [Name] | DBA Lead | +1-XXX-XXX-XXXX4 | dba@vantus.systems | @dba-lead |
| [Name] | CISO | +1-XXX-XXX-XXXX5 | ciso@vantus.systems | @ciso |
| [Name] | VP Client Success | +1-XXX-XXX-XXXX6 | clients@vantus.systems | @vpclients |
| [Name] | DevOps Lead | +1-XXX-XXX-XXXX7 | devops@vantus.systems | @devops |
| [Name] | Legal Counsel | +1-XXX-XXX-XXXX8 | legal@vantus.systems | @legal |

**External Contacts:**

| Vendor | Support Contact | Escalation Contact |
|--------|-----------------|-------------------|
| **Vercel** | support@vercel.com | Enterprise TAM |
| **AWS** | AWS Support Console | Technical Account Manager |
| **BetterAuth** | GitHub Issues / Discord | N/A |
| **Upstash** | support@upstash.com | Enterprise Support |
| **Cloudflare** | support@cloudflare.com | Enterprise Support |
| **PagerDuty** | support@pagerduty.com | Customer Success Manager |

### 8.4 Escalation Paths

**Technical Escalation:**
```
On-call Engineer → Platform Lead → VP Engineering → CTO
                    (15 min)        (30 min)       (1 hour)
```

**Business Escalation:**
```
Incident Commander → VP Operations → CEO → Board (if critical)
                          (30 min)      (2 hours)
```

**Client Escalation:**
```
Account Manager → VP Client Success → CEO (for enterprise clients)
                      (1 hour)          (4 hours)
```

**Security Escalation:**
```
Security Engineer → CISO → Legal/Compliance → External Forensics (if needed)
                         (30 min)      (2 hours)
```

---

## 9. RUNBOOK AUTOMATION

### 9.1 Automated Failover Triggers

**Health Check Automation:**
```yaml
# monitoring/health-checks.yml
health_checks:
  portal_api:
    endpoint: https://api.vantus.systems/health
    interval: 30s
    timeout: 5s
    failure_threshold: 3
    
    actions:
      on_failure:
        - alert: pagerduty:high
        - webhook: https://automation.vantus.systems/failover/trigger
          condition: failure_count >= 3
          
      on_recovery:
        - alert: pagerduty:resolve
        - log: "Service recovered"
```

**Auto-Failover Conditions:**
```javascript
// automation/failover-decision.js
const shouldAutoFailover = (metrics) => {
  // Condition 1: Complete API failure for 5 minutes
  if (metrics.apiErrorRate > 0.99 && metrics.duration > 300) {
    return { decision: 'FAILOVER', reason: 'Complete API failure' };
  }
  
  // Condition 2: Database unresponsive
  if (metrics.dbConnectionFailures > 10 && metrics.duration > 180) {
    return { decision: 'FAILOVER', reason: 'Database failure' };
  }
  
  // Condition 3: Region-level outage
  if (metrics.regionHealth < 0.1) {
    return { decision: 'FAILOVER', reason: 'Regional outage' };
  }
  
  // Default: Manual decision required
  return { decision: 'MANUAL', reason: 'Thresholds not met' };
};
```

### 9.2 Self-Healing Procedures

**Automatic Restart:**
```bash
#!/bin/bash
# self-healing-restart.sh

# Check application health
if ! curl -sf https://vantus.systems/health; then
  echo "Health check failed, attempting self-healing..."
  
  # Step 1: Clear caches
  redis-cli -h $REDIS_HOST FLUSHDB
  
  # Step 2: Restart application (Vercel redeploy)
  vercel --prod --force
  
  # Step 3: Wait and verify
  sleep 30
  if curl -sf https://vantus.systems/health; then
    echo "Self-healing successful"
    # Notify team
    curl -X POST $SLACK_WEBHOOK \
      -H 'Content-type: application/json' \
      -d '{"text":"Self-healing completed successfully"}'
  else
    echo "Self-healing failed, escalating..."
    # Page on-call
    pagerduty incident:create \
      --title "Self-healing failed" \
      --service "Vantus Portal" \
      --urgency high
  fi
fi
```

**Database Connection Pool Recovery:**
```typescript
// Auto-recovery for database connections
const pool = new Pool({
  // ... standard config
  
  // Self-healing: automatic reconnection
  connectionTimeoutMillis: 5000,
  keepAlive: true,
  
  // Event handlers for recovery
  onError: async (err) => {
    logger.error('Database connection error', err);
    
    // Attempt recovery
    if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
      await attemptDatabaseRecovery();
    }
  },
});

async function attemptDatabaseRecovery() {
  // Step 1: Try to reconnect with exponential backoff
  for (let i = 0; i < 5; i++) {
    await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
    
    try {
      const client = await pool.connect();
      await client.query('SELECT 1');
      client.release();
      logger.info('Database recovery successful');
      return;
    } catch (err) {
      logger.warn(`Recovery attempt ${i + 1} failed`);
    }
  }
  
  // Step 2: Escalate if recovery fails
  await escalateToOnCall('Database recovery failed after 5 attempts');
}
```

### 9.3 Monitoring and Alerting for DR

**Critical Metrics Dashboard:**

| Metric | Warning Threshold | Critical Threshold | Alert Channel |
|--------|------------------|-------------------|---------------|
| **API Error Rate** | > 1% | > 5% | PagerDuty (High) |
| **Database Latency** | > 100ms | > 500ms | PagerDuty (High) |
| **Failed Logins** | > 10/min | > 50/min | PagerDuty (Critical) |
| **Backup Age** | > 25 hours | > 49 hours | Email + Slack |
| **Replication Lag** | > 30s | > 5min | PagerDuty (High) |
| **Disk Usage** | > 80% | > 90% | PagerDuty (Medium) |
| **Memory Usage** | > 85% | > 95% | PagerDuty (Medium) |
| **SSL Expiry** | < 30 days | < 7 days | Email + Slack |

**DR-Specific Alerts:**
```yaml
# alerting/dr-alerts.yml
alerts:
  - name: BackupFailure
    condition: last_successful_backup > 2h
    severity: critical
    notification: pagerduty:critical
    
  - name: ReplicationLag
    condition: db_replication_lag > 300s
    severity: high
    notification: pagerduty:high
    
  - name: DRDrillOverdue
    condition: days_since_last_dr_drill > 35
    severity: medium
    notification: slack:#operations
    
  - name: FailoverTestFailure
    condition: failover_test_result == 'failed'
    severity: high
    notification: pagerduty:high
    
  - name: CertificateExpiry
    condition: ssl_days_until_expiry < 14
    severity: high
    notification: email:ops@vantus.systems
```

**Automated DR Health Report:**
```bash
#!/bin/bash
# daily-dr-health-report.sh

REPORT="/tmp/dr-health-report-$(date +%Y%m%d).txt"

echo "=== Vantus Client Portal - Daily DR Health Report ===" > $REPORT
echo "Generated: $(date)" >> $REPORT
echo "" >> $REPORT

# Check backup status
echo "--- Backup Status ---" >> $REPORT
aws s3 ls s3://vantus-backups/postgres/ | tail -5 >> $REPORT
echo "" >> $REPORT

# Check replication lag
echo "--- Database Replication ---" >> $REPORT
psql $REPLICA_URL -c "SELECT EXTRACT(EPOCH FROM (now() - pg_last_xact_replay_timestamp())) AS lag_seconds;" >> $REPORT
echo "" >> $REPORT

# Check SSL certificate expiry
echo "--- SSL Certificate ---" >> $REPORT
echo | openssl s_client -servername vantus.systems -connect vantus.systems:443 2>/dev/null | openssl x509 -noout -dates >> $REPORT
echo "" >> $REPORT

# Check DR environment health
echo "--- DR Environment Health ---" >> $REPORT
curl -sf https://dr.vantus.systems/health && echo "DR Environment: HEALTHY" >> $REPORT || echo "DR Environment: UNHEALTHY" >> $REPORT
echo "" >> $REPORT

# Send report
cat $REPORT | mail -s "Daily DR Health Report - $(date +%Y-%m-%d)" ops@vantus.systems
```

---

## APPENDICES

### Appendix A: Emergency Contacts Wallet Card

```
╔═══════════════════════════════════════════════════════════════╗
║           VANTUS CLIENT PORTAL - EMERGENCY CONTACTS           ║
╠═══════════════════════════════════════════════════════════════╣
║ INCIDENT COMMANDER: VP Operations                             ║
║ Phone: +1-XXX-XXX-XXXX1  |  Slack: @vpops                     ║
║                                                               ║
║ TECHNICAL ESCALATION: CTO                                     ║
║ Phone: +1-XXX-XXX-XXXX2  |  Slack: @cto                       ║
║                                                               ║
║ STATUS PAGE: https://status.vantus.systems                    ║
║ SLACK: #incident-response                                     ║
║                                                               ║
║ EMERGENCY HOTLINE: +1-XXX-XXX-XXXX0                           ║
╚═══════════════════════════════════════════════════════════════╝
```

### Appendix B: Recovery Command Cheat Sheet

```bash
# Quick database restore
pg_restore --clean --if-exists --dbname=vantus_db backup.sql

# Quick application rollback
vercel rollback --prod

# Check service health
curl https://vantus.systems/health

# Force deployment to secondary region
vercel --prod --regions us-west-2

# Update environment variable
vercel env add KEY value --production

# View recent deployments
vercel list

# Check database replication lag
psql -c "SELECT pg_last_xact_replay_timestamp();"

# Clear Redis cache
redis-cli FLUSHDB
```

### Appendix C: Vendor Support Numbers

| Vendor | Support Portal | Phone | Priority |
|--------|---------------|-------|----------|
| Vercel | vercel.com/support | N/A | Enterprise |
| AWS | console.aws.amazon.com/support | Case-based | Business |
| Upstash | upstash.com/support | N/A | Standard |
| Cloudflare | dash.cloudflare.com | +1-650-xxx-xxxx | Enterprise |

### Appendix D: Document Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-22 | VP Operations | Initial release |

---

**END OF DISASTER RECOVERY RUNBOOK**

*This document is classified as INTERNAL — RESTRICTED. Distribution is limited to authorized personnel only. For questions or updates, contact the VP of Operations.*
