# ADMIN_DISASTER_RECOVERY — Disaster Recovery Runbook
**Version:** 1.0.0  
**Date:** 2026-02-22  
**Status:** Active  
**Review Cycle:** Quarterly

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-22 | Platform Team | Initial release |

**Distribution List:**
- Incident Response Team
- Platform Engineering
- Security Operations
- Executive Leadership
- Customer Success (for client communication)

---

## 1. Recovery Objectives

### 1.1 Service Tier Definitions

| Tier | Services | Business Impact | Downtime Impact |
|------|----------|-----------------|-----------------|
| **Tier 1 - Critical** | User auth, RBAC, audit logging | Catastrophic | Immediate business halt |
| **Tier 2 - Important** | CMS, CRM, pricing management | High | Degraded operations |
| **Tier 3 - Standard** | Reporting, analytics, feature flags | Medium | Non-blocking |

### 1.2 Recovery Time Objectives (RTO)

| Tier | Target RTO | Maximum RTO | Justification |
|------|------------|-------------|---------------|
| Tier 1 | 15 minutes | 30 minutes | Admin operations cannot function without auth; security blind spot |
| Tier 2 | 30 minutes | 2 hours | Content and CRM critical for daily operations |
| Tier 3 | 4 hours | 8 hours | Reporting can be delayed without immediate impact |

### 1.3 Recovery Point Objectives (RPO)

| Tier | Target RPO | Maximum RPO | Justification |
|------|------------|-------------|---------------|
| Tier 1 | 0 minutes | 5 minutes | Real-time replication required; audit logs cannot be lost |
| Tier 2 | 5 minutes | 15 minutes | Content versions preserve state; acceptable minor loss |
| Tier 3 | 1 hour | 4 hours | Analytics data is reconstructible from raw sources |

### 1.4 Maximum Tolerable Outage (MTO)

| Function | MTO | Consequence if Exceeded |
|----------|-----|------------------------|
| Authentication/RBAC | 30 minutes | Security incident risk; operational lockout |
| Audit Logging | 0 minutes (must not stop) | Compliance violation; forensic capability loss |
| Content Publishing | 2 hours | Marketing delays; scheduled releases missed |
| Pricing Updates | 1 hour | Revenue impact; quote generation blocked |
| CRM Access | 4 hours | Sales operations degraded |

### 1.5 Data Criticality Matrix

| Data Type | Criticality | Backup Frequency | Retention |
|-----------|-------------|------------------|-----------|
| User credentials/roles | Critical | Real-time replication | 7 years |
| Audit logs | Critical | Continuous (immutable) | 7 years |
| Content versions | High | Every 5 minutes | 7 years |
| CRM data | High | Every 15 minutes | 7 years |
| Pricing rules | Critical | Real-time replication | 7 years |
| Configuration | Critical | Every change | 30 versions |
| Feature flags | Medium | Every hour | 90 days |
| Analytics/reporting | Low | Daily | 1 year |

---

## 2. Disaster Scenarios

### 2.1 Scenario Matrix

| ID | Scenario | Likelihood | Impact | Priority |
|----|----------|------------|--------|----------|
| DS-001 | Complete admin portal outage | Low | Critical | P1 |
| DS-002 | Database corruption (admin data) | Low | Critical | P1 |
| DS-003 | Ransomware attack on admin systems | Low | Critical | P1 |
| DS-004 | Accidental data deletion (bulk users) | Medium | High | P2 |
| DS-005 | Privilege escalation/compromised admin | Medium | Critical | P1 |
| DS-006 | Third-party service outage (IdP) | Medium | High | P2 |
| DS-007 | Configuration corruption | Medium | High | P2 |
| DS-008 | CMS content corruption | Low | Medium | P3 |

### 2.2 DS-001: Complete Admin Portal Outage

**Description:** Entire admin portal becomes unavailable (all users affected)

**Detection:**
- UptimeRobot alerts on admin.vantus.systems
- PagerDuty high-availability alerts
- User reports via Slack #admin-support

**Immediate Response (0-5 min):**
1. Verify scope: Check if client portal also affected
2. Assess: Is this regional or global?
3. Notify: Page on-call engineer + incident commander
4. Update: Set status page to "Investigating"

**Recovery Steps:**
1. Check Vercel dashboard for deployment issues
2. Review recent deployments (potential rollback)
3. Verify database connectivity from application
4. Check Redis/cache cluster health
5. If regional: Activate DNS failover to DR region
6. If code issue: Execute rollback to last known good
7. Verify recovery: Run smoke tests

**Validation:**
- [ ] Login page accessible
- [ ] Authentication functional
- [ ] RBAC permissions loading
- [ ] Critical operations succeeding

### 2.3 DS-002: Database Corruption (Admin Data)

**Description:** PostgreSQL corruption affecting admin schema

**Detection:**
- Database integrity check failures
- Application errors on data retrieval
- Corruption alerts from RDS/Azure SQL

**Immediate Response:**
1. STOP all write operations immediately
2. Identify corruption scope (tables affected)
3. Assess: Is replica also corrupted?
4. Page: Database admin + incident commander

**Recovery Steps:**
1. Switch to read-only mode for admin portal
2. Verify backup integrity (last 3 backups)
3. If point-in-time recovery viable:
   - Identify last known good timestamp (LKG)
   - Execute PITR to LKG - 5 minutes
4. If backup restore required:
   - Restore from latest verified backup
   - Replay WAL logs to minimize data loss
5. Verify data integrity post-recovery
6. Re-enable write operations

**Validation:**
- [ ] Row counts match expected
- [ ] Checksum validation passes
- [ ] Application connections successful
- [ ] Sample queries return correct data

### 2.4 DS-003: Ransomware Attack on Admin Systems

**Description:** Ransomware infection affecting admin infrastructure

**Immediate Response (CRITICAL - First 15 minutes):**
1. **ISOLATE:** Disconnect affected systems from network
2. **PRESERVE:** Do NOT power off (memory forensics)
3. **ESCALATE:** Page CISO + legal immediately
4. **DOCUMENT:** Record all actions with timestamps

**Containment Steps:**
1. Revoke all admin sessions immediately
2. Disable compromised accounts
3. Block attacker IP ranges at WAF
4. Preserve all logs (secure SIEM copy)
5. Engage incident response retainer

**Recovery Steps:**
1. Do NOT pay ransom (company policy)
2. Rebuild from known-good backups:
   - Infrastructure as Code redeploy
   - Database restore from immutable backup
   - Application rebuild from verified code
3. Verify no persistence mechanisms remain
4. Reset ALL admin passwords + MFA tokens
5. Forensic analysis of attack vector

**Validation:**
- [ ] All systems rebuilt from clean images
- [ ] No malware signatures detected
- [ ] Network traffic patterns normal
- [ ] Penetration test passed

### 2.5 DS-004: Accidental Bulk User Deletion

**Description:** Mass deletion of users (malicious or accidental)

**Detection:**
- Audit log anomaly (bulk delete events)
- User count drop alert
- Help desk reports of login failures

**Immediate Response:**
1. Preserve: Snapshot current state before any action
2. Identify: Who performed deletion + scope
3. Stop: Halt any automated user provisioning
4. Assess: Impact on dependent systems (SSO, etc.)

**Recovery Steps:**
1. Identify deletion timestamp from audit logs
2. Restore from point-in-time backup (pre-deletion)
3. Extract deleted user records
4. Re-insert users to production (conflict resolution)
5. Restore role assignments from backup
6. Re-enable MFA (users must re-enroll)
7. Notify affected users of required actions

**Validation:**
- [ ] All deleted users restored
- [ ] Role assignments correct
- [ ] SSO mappings intact
- [ ] Users can authenticate successfully

### 2.6 DS-005: Compromised Admin Account / Privilege Escalation

**Description:** Attacker gains elevated privileges or compromises admin account

**Detection:**
- Impossible travel alerts
- Off-hours admin access notifications
- Privilege escalation audit events
- Unusual data access patterns

**Immediate Response:**
1. **ISOLATE:** Disable compromised account immediately
2. **REVOKE:** Terminate all active sessions for account
3. **AUDIT:** Pull complete audit trail for account (last 30 days)
4. **NOTIFY:** Security team + affected stakeholders

**Investigation Steps:**
1. Identify scope of unauthorized access
2. Review all actions taken by compromised account
3. Check for lateral movement indicators
4. Verify no backdoors created (new accounts, API keys)

**Recovery Steps:**
1. Force password reset for affected account
2. Require new MFA enrollment (invalidate old tokens)
3. Review and revoke any unauthorized permissions granted
4. If account created resources: Review and potentially delete
5. Reset any exposed secrets/API keys
6. Implement additional monitoring for account

**Validation:**
- [ ] Account secured (new credentials)
- [ ] All unauthorized access revoked
- [ ] No persistence mechanisms remain
- [ ] Normal operations restored

### 2.7 DS-006: Third-Party Service Outage (IdP, Payment)

**Description:** Critical third-party service unavailable

**Detection:**
- Integration health check failures
- User SSO login failures
- Webhook delivery failures

**Immediate Response:**
1. Verify: Confirm outage via provider status page
2. Scope: Which services affected? (Okta, Azure AD, Stripe)
3. Assess: Can we operate in degraded mode?
4. Communicate: Notify users of workarounds

**Recovery Steps by Service:**

**IdP Outage (Okta/Azure AD):**
- Enable local authentication bypass (if configured)
- Activate emergency break-glass accounts
- Cache-based authentication (if within session window)
- Monitor provider status for resolution

**Payment Provider Outage (Stripe):**
- Enable offline payment queue (store for later processing)
- Display payment unavailable notices
- Switch to backup payment processor (if configured)
- Manual invoicing process for urgent transactions

**CRM Integration Outage:**
- Queue sync operations for later replay
- Continue with local CRM data (stale acceptable)
- Monitor for conflict resolution on recovery

**Validation:**
- [ ] Degraded service operational
- [ ] No data loss occurred
- [ ] Sync reconciliation successful
- [ ] Service fully restored and tested

### 2.8 DS-007: Configuration Corruption

**Description:** Environment variables, feature flags, or settings corrupted

**Detection:**
- Application startup failures
- Configuration validation errors
- Unexpected feature behavior
- Environment drift alerts

**Immediate Response:**
1. Identify: Last configuration change timestamp
2. Assess: Scope (single env vs. all environments)
3. Check: Configuration version control for last known good
4. Alert: Platform engineering team

**Recovery Steps:**
1. Retrieve last known good configuration from:
   - Infrastructure as Code repository
   - Configuration backup (AWS Systems Manager Parameter Store history)
   - Deployment artifacts with embedded config
2. Restore configuration values
3. Verify configuration schema validity
4. Rolling restart of affected services
5. Validate application behavior

**Validation:**
- [ ] Configuration validated against schema
- [ ] All required variables present
- [ ] Application startup successful
- [ ] Feature flags in expected state
- [ ] Integration connections working

### 2.9 DS-008: CMS Content Corruption

**Description:** Content data corrupted or maliciously modified

**Detection:**
- Content integrity check failures
- Unexpected content versions
- User reports of incorrect content
- Audit log anomalies

**Immediate Response:**
1. Isolate: Prevent further content publishes
2. Assess: Scope of corruption (which content types)
3. Identify: Last known good version timestamp
4. Preserve: Current state for forensics

**Recovery Steps:**
1. If specific content items affected:
   - Restore from content version history
   - Rollback to last verified version
2. If widespread corruption:
   - Restore content database from backup
   - Replay valid changes since backup
3. Re-publish verified content
4. Clear CDN cache
5. Verify content rendering correctly

**Validation:**
- [ ] Content versions intact
- [ ] All critical pages rendering
- [ ] No broken references
- [ ] SEO metadata correct

---

## 3. Backup Strategy

### 3.1 Backup Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BACKUP ARCHITECTURE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│  │   Primary    │───►│   Replica    │───►│  Backup      │                  │
│  │   Database   │    │   (Hot)      │    │  (Immutable) │                  │
│  └──────────────┘    └──────────────┘    └──────────────┘                  │
│         │                   │                   │                          │
│         ▼                   ▼                   ▼                          │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│  │  Continuous  │    │   Hourly     │    │   Daily      │                  │
│  │   WAL Arch.  │    │   Snapshots  │    │   Full       │                  │
│  └──────────────┘    └──────────────┘    └──────────────┘                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Database Backup Schedule

| Backup Type | Frequency | Retention | Storage Location |
|-------------|-----------|-----------|------------------|
| Continuous WAL Archiving | Real-time | 30 days | S3 (Cross-region) |
| Automated Snapshots | Every 6 hours | 7 days | RDS/Azure SQL |
| Full Database Backup | Daily at 02:00 UTC | 30 days | S3 (Immutable) |
| Weekly Full Backup | Sundays 02:00 UTC | 12 weeks | S3 (Immutable) |
| Monthly Full Backup | 1st of month | 7 years | S3 Glacier |
| Cross-Region Replica | Real-time | N/A | Secondary region |

### 3.3 Configuration Backup

| Configuration Type | Backup Method | Frequency | Retention |
|-------------------|---------------|-----------|-----------|
| Environment Variables | Parameter Store + Git | Every change | 30 versions |
| Feature Flags | Database + Export | Every hour | 90 days |
| Infrastructure as Code | Git repository | Every commit | Permanent |
| Security Policies | Git + S3 | Every change | 7 years |
| RBAC Definitions | Database + Export | Daily | 7 years |

**Configuration Backup Automation:**
```bash
#!/bin/bash
# config-backup.sh
# Automated configuration backup

BACKUP_BUCKET="vantus-config-backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Backup environment variables
aws ssm get-parameters-by-path --path "/vantus/admin" \
  --with-decryption > "env_backup_${TIMESTAMP}.json"

# Backup feature flags
psql $DATABASE_URL -c "\copy (SELECT * FROM feature_flags) TO 'feature_flags_${TIMESTAMP}.csv' CSV"

# Upload to S3 with versioning
aws s3 cp "env_backup_${TIMESTAMP}.json" s3://${BACKUP_BUCKET}/environment/
aws s3 cp "feature_flags_${TIMESTAMP}.csv" s3://${BACKUP_BUCKET}/feature-flags/

# Cleanup old backups (retain 30 versions)
aws s3 ls s3://${BACKUP_BUCKET}/environment/ | sort -r | tail -n +31 | xargs -I {} aws s3 rm s3://${BACKUP_BUCKET}/environment/{}
```

### 3.4 Audit Log Backup (Immutable)

| Property | Specification |
|----------|---------------|
| Storage | Append-only WORM (Write Once Read Many) |
| Location | S3 with Object Lock (Compliance mode) |
| Replication | Cross-region + Air-gapped copy |
| Retention | 7 years minimum |
| Integrity | Cryptographic hash chain |
| Encryption | AES-256-GCM |

**Audit Log Protection:**
```yaml
AuditLogProtection:
  ObjectLock:
    Mode: COMPLIANCE
    RetainUntilDays: 2555  # 7 years
  
  Replication:
    Primary: us-east-1
    Secondary: us-west-2
    AirGapped: physical-tape-vault
  
  Integrity:
    HashAlgorithm: SHA-256
    ChainVerification: enabled
    TamperDetection: real-time
```

### 3.5 Content Version Backup

| Backup Component | Method | Frequency |
|------------------|--------|-----------|
| Content versions | Database + S3 | Real-time |
| Media assets | S3 versioning | Continuous |
| Content schema | Git + Database | Every change |
| Published snapshots | S3 (point-in-time) | Every publish |

**Content Backup Verification:**
```bash
#!/bin/bash
# verify-content-backup.sh

# Check content version count
PROD_COUNT=$(psql $PROD_URL -t -c "SELECT COUNT(*) FROM content_versions")
BACKUP_COUNT=$(psql $BACKUP_URL -t -c "SELECT COUNT(*) FROM content_versions")

if [ "$PROD_COUNT" -eq "$BACKUP_COUNT" ]; then
  echo "✓ Content version count matches"
else
  echo "✗ Mismatch: Prod=$PROD_COUNT, Backup=$BACKUP_COUNT"
  exit 1
fi

# Verify latest backup timestamp
LATEST_BACKUP=$(aws s3 ls s3://vantus-content-backups/ | sort | tail -1)
echo "Latest backup: $LATEST_BACKUP"
```

### 3.6 CRM Data Backup

| Data Type | Backup Frequency | Method |
|-----------|------------------|--------|
| Leads | Every 15 minutes | Incremental sync |
| Contacts | Every 15 minutes | Incremental sync |
| Deals | Every 15 minutes | Incremental sync |
| Activities | Every hour | Batch export |
| Pipeline definitions | Every change | Database backup |

### 3.7 Backup Monitoring

| Check | Frequency | Alert Condition |
|-------|-----------|-----------------|
| Backup completion | Every hour | Any failure |
| Backup size delta | Daily | > 50% change |
| Restore test (automated) | Weekly | Any failure |
| Cross-region replication | Every hour | Lag > 1 hour |
| Immutable storage integrity | Daily | Any corruption |

---

## 4. Failover Procedures

### 4.1 Failover Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ACTIVE-PASSIVE FAILOVER                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                              ┌──────────────┐                              │
│                              │   CloudFlare  │                              │
│                              │   (Load Bal) │                              │
│                              └──────┬───────┘                              │
│                                     │                                      │
│                    ┌────────────────┼────────────────┐                     │
│                    │                │                │                     │
│              ┌─────▼─────┐    ┌─────▼─────┐    ┌─────▼─────┐              │
│              │ Primary   │    │  Health   │    │  Standby  │              │
│              │ (Active)  │◄──►│  Check    │    │ (Passive) │              │
│              └───────────┘    └───────────┘    └───────────┘              │
│                    │                                  │                     │
│              ┌─────▼─────┐                      ┌─────▼─────┐              │
│              │ Primary   │─────────────────────►│  Replica  │              │
│              │   DB      │   (Streaming Repl.)  │    DB     │              │
│              └───────────┘                      └───────────┘              │
│                                                                             │
│  Failover Trigger: Health check failure for > 2 minutes                     │
│  Automatic: Yes (with manual approval for database)                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Active-Passive Failover for Admin Portal

**Prerequisites:**
- Standby environment deployed and configured
- Database replication lag < 5 seconds
- Configuration synchronized
- Health checks operational

**Automatic Failover (Application Layer):**
```bash
#!/bin/bash
# auto-failover.sh
# Triggered by monitoring when health checks fail

PRIMARY_REGION="us-east-1"
STANDBY_REGION="us-west-2"
HEALTH_THRESHOLD=2  # minutes

# Check primary health
if ! check_health "$PRIMARY_REGION"; then
  echo "Primary unhealthy, initiating failover"
  
  # Update DNS/Load Balancer
  aws route53 change-resource-record-sets \
    --hosted-zone-id $ZONE_ID \
    --change-batch file://failover-to-standby.json
  
  # Activate standby
  vercel --scope vantus --region "$STANDBY_REGION" promote
  
  # Notify
  pagerduty-trigger \
    --title "Admin Portal Failover Executed" \
    --severity warning \
    --region "$STANDBY_REGION"
fi
```

**Manual Failover Procedure:**
1. **Decision (0-2 min):**
   - Confirm primary region failure
   - Assess if recovery likely within RTO
   - Obtain incident commander approval

2. **Preparation (2-5 min):**
   - Verify standby region health
   - Check database replication lag
   - Prepare communication messages

3. **Execution (5-10 min):**
   ```bash
   # 1. Update DNS to point to standby
   ./scripts/dns-failover.sh --target standby
   
   # 2. Promote database replica to primary
   ./scripts/db-promote.sh --region standby
   
   # 3. Activate standby application
   ./scripts/app-activate.sh --region standby
   
   # 4. Verify health
   ./scripts/smoke-test.sh --region standby
   ```

4. **Validation (10-15 min):**
   - Run full smoke tests
   - Verify authentication working
   - Check critical operations
   - Update status page

### 4.3 Database Failover (Primary/Replica)

**Automated Failover (RDS/Azure SQL):**
- Multi-AZ deployments: Automatic within 60-120 seconds
- Read replicas: Manual promotion required

**Manual Failover Procedure:**
```bash
#!/bin/bash
# database-failover.sh

REPLICA_ID="admin-db-replica"

# 1. Check replication lag
LAG=$(aws rds describe-db-instances \
  --db-instance-identifier $REPLICA_ID \
  --query 'DBInstances[0].ReplicationLag')

if [ "$LAG" -gt 300 ]; then
  echo "WARNING: Replication lag is ${LAG}s - potential data loss"
  read -p "Continue with failover? (yes/no): " CONFIRM
  if [ "$CONFIRM" != "yes" ]; then exit 1; fi
fi

# 2. Promote replica
aws rds promote-read-replica \
  --db-instance-identifier $REPLICA_ID

# 3. Update connection strings
./scripts/update-db-config.sh --new-primary $REPLICA_ID

# 4. Verify promotion
aws rds wait db-instance-available \
  --db-instance-identifier $REPLICA_ID

# 5. Restart applications
./scripts/rolling-restart.sh
```

### 4.4 DNS Failover

**Configuration:**
```yaml
DNSFailover:
  Primary:
    Name: admin-primary.vantus.systems
    Region: us-east-1
    HealthCheck: enabled
    
  Secondary:
    Name: admin-standby.vantus.systems
    Region: us-west-2
    HealthCheck: enabled
    
  FailoverRecord:
    Name: admin.vantus.systems
    Type: CNAME
    FailoverType: ACTIVE_PASSIVE
    TTL: 60
```

**Failover Command:**
```bash
aws route53 change-resource-record-sets \
  --hosted-zone-id Z1234567890ABC \
  --change-batch '{
    "Changes": [{
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "admin.vantus.systems",
        "Type": "CNAME",
        "SetIdentifier": "Primary",
        "Failover": "SECONDARY",
        "TTL": 60,
        "ResourceRecords": [{"Value": "admin-standby.vantus.systems"}]
      }
    }]
  }'
```

### 4.5 CDN Failover

**Cloudflare Failover:**
```bash
# Update origin server
cloudflare-cli zone records update \
  --zone vantus.systems \
  --name admin \
  --content standby-origin.vantus.systems \
  --type CNAME

# Purge cache (force refresh)
cloudflare-cli zone purge \
  --zone vantus.systems \
  --hosts admin.vantus.systems
```

---

## 5. Recovery Procedures

### 5.1 Database Restore from Backup

**Full Database Restore:**
```bash
#!/bin/bash
# database-restore.sh
# Restores database from backup

BACKUP_ID=$1          # S3 path or snapshot ID
TARGET_INSTANCE=$2    # Database instance identifier
RESTORE_TIME=${3:-""} # Optional: PITR timestamp

if [ -n "$RESTORE_TIME" ]; then
  # Point-in-time recovery
  echo "Performing PITR to: $RESTORE_TIME"
  aws rds restore-db-instance-to-point-in-time \
    --source-db-instance-identifier admin-db-prod \
    --target-db-instance-identifier $TARGET_INSTANCE \
    --restore-time "$RESTORE_TIME"
else
  # Snapshot restore
  echo "Restoring from snapshot: $BACKUP_ID"
  aws rds restore-db-instance-from-db-snapshot \
    --db-instance-identifier $TARGET_INSTANCE \
    --db-snapshot-identifier $BACKUP_ID
fi

# Wait for restore completion
echo "Waiting for restore to complete..."
aws rds wait db-instance-available \
  --db-instance-identifier $TARGET_INSTANCE

# Run integrity checks
echo "Running integrity checks..."
psql "host=$TARGET_ENDPOINT dbname=admin" -c "SELECT pg_verify_backup('${BACKUP_ID}');"

# Update connection strings if needed
if [ "$TARGET_INSTANCE" != "admin-db-prod" ]; then
  ./scripts/update-connection-strings.sh --new-endpoint $TARGET_ENDPOINT
fi

echo "Database restore completed successfully"
```

**Partial Table Recovery:**
```bash
#!/bin/bash
# partial-table-restore.sh

TABLE_NAME=$1
BACKUP_TIMESTAMP=$2

# Create temporary database from backup
aws rds restore-db-instance-to-point-in-time \
  --source-db-instance-identifier admin-db-prod \
  --target-db-instance-identifier temp-restore-db \
  --restore-time "$BACKUP_TIMESTAMP"

# Extract specific table data
pg_dump -h temp-restore-db.XXXX.us-east-1.rds.amazonaws.com \
  -U admin \
  -t $TABLE_NAME \
  admin > ${TABLE_NAME}_backup.sql

# Restore to production
psql -h prod-db.XXXX.us-east-1.rds.amazonaws.com \
  -U admin \
  -c "TRUNCATE TABLE $TABLE_NAME;"
  
psql -h prod-db.XXXX.us-east-1.rds.amazonaws.com \
  -U admin \
  admin < ${TABLE_NAME}_backup.sql

# Cleanup temporary database
aws rds delete-db-instance \
  --db-instance-identifier temp-restore-db \
  --skip-final-snapshot
```

### 5.2 Application Rebuild and Redeploy

**Complete Application Rebuild:**
```bash
#!/bin/bash
# app-rebuild.sh

ENVIRONMENT=$1  # production, staging
VERSION=$2      # git tag or commit

# 1. Verify code integrity
git verify-tag $VERSION || { echo "Invalid signature on tag"; exit 1; }

# 2. Checkout verified code
git checkout $VERSION

# 3. Install dependencies with lock file
npm ci --production

# 4. Build application
NEXT_TELEMETRY_DISABLED=1 npm run build

# 5. Run security scans
npm audit --audit-level=moderate || { echo "Security audit failed"; exit 1; }

# 6. Deploy to environment
vercel --prod --scope vantus --confirm

# 7. Run smoke tests
./scripts/smoke-test.sh --env $ENVIRONMENT

# 8. Verify deployment
vercel ls --scope vantus | grep $VERSION

echo "Application rebuild and deploy completed"
```

**Rollback Procedure:**
```bash
#!/bin/bash
# rollback.sh

PREVIOUS_VERSION=$1

# 1. Identify current deployment
CURRENT=$(vercel ls --scope vantus --meta environment=production | head -1)

# 2. Deploy previous version
vercel --prod --scope vantus $PREVIOUS_VERSION

# 3. Verify rollback
sleep 30
./scripts/smoke-test.sh

# 4. Document rollback
echo "Rolled back from $CURRENT to $PREVIOUS_VERSION at $(date)" >> rollback-log.txt

# 5. Notify
slack-notify "#deployments" "Admin Portal rolled back to $PREVIOUS_VERSION"
```

### 5.3 Configuration Restoration

**Environment Variable Recovery:**
```bash
#!/bin/bash
# config-restore.sh

BACKUP_VERSION=$1  # S3 version ID or timestamp

# 1. Download backup from S3
aws s3 cp s3://vantus-config-backups/environment/env_backup_${BACKUP_VERSION}.json .

# 2. Validate JSON structure
jq empty env_backup_${BACKUP_VERSION}.json || { echo "Invalid JSON"; exit 1; }

# 3. Restore to Parameter Store
jq -c '.Parameters[]' env_backup_${BACKUP_VERSION}.json | while read param; do
  NAME=$(echo $param | jq -r '.Name')
  VALUE=$(echo $param | jq -r '.Value')
  TYPE=$(echo $param | jq -r '.Type')
  
  aws ssm put-parameter \
    --name "$NAME" \
    --value "$VALUE" \
    --type "$TYPE" \
    --overwrite
done

# 4. Verify restoration
./scripts/verify-config.sh

# 5. Rolling restart to apply
./scripts/rolling-restart.sh
```

**Feature Flag Recovery:**
```bash
#!/bin/bash
# feature-flag-restore.sh

BACKUP_FILE=$1

# Restore from backup
psql $DATABASE_URL <<EOF
BEGIN;

-- Archive current state
INSERT INTO feature_flags_archive 
  SELECT *, NOW() as archived_at FROM feature_flags;

-- Restore from backup
TRUNCATE TABLE feature_flags;
\copy feature_flags FROM '${BACKUP_FILE}' CSV HEADER;

COMMIT;
EOF

# Clear feature flag cache
redis-cli -h $REDIS_HOST FLUSHDB

# Verify
./scripts/verify-feature-flags.sh
```

### 5.4 Content Recovery from Versions

**Content Rollback:**
```bash
#!/bin/bash
# content-rollback.sh

CONTENT_ITEM_ID=$1
TARGET_VERSION=$2

# 1. Get version data
VERSION_DATA=$(psql $DATABASE_URL -t -c "
  SELECT data FROM content_versions 
  WHERE content_item_id = '$CONTENT_ITEM_ID' 
  AND version_number = $TARGET_VERSION;
")

# 2. Create rollback event
psql $DATABASE_URL -c "
  INSERT INTO publish_events 
    (content_item_id, action, from_version, to_version, reason, performed_by, performed_at)
  VALUES 
    ('$CONTENT_ITEM_ID', 'rollback', 
     (SELECT published_version FROM content_items WHERE id = '$CONTENT_ITEM_ID'),
     $TARGET_VERSION,
     'DR Recovery - Restoring to known good version',
     'system_recovery',
     NOW());
"

# 3. Update content item
psql $DATABASE_URL -c "
  UPDATE content_items 
  SET data = '$VERSION_DATA'::jsonb,
      published_version = $TARGET_VERSION,
      updated_at = NOW(),
      updated_by = 'system_recovery'
  WHERE id = '$CONTENT_ITEM_ID';
"

# 4. Clear CDN cache
curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache" \
  -H "Authorization: Bearer $CLOUDFLARE_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":false,"hosts":["admin.vantus.systems"]}'

echo "Content rollback completed for $CONTENT_ITEM_ID to version $TARGET_VERSION"
```

**Bulk Content Recovery:**
```bash
#!/bin/bash
# bulk-content-recovery.sh

# Recover all content modified after suspicious timestamp
SUSPICIOUS_TIME=$1

cat > /tmp/recover_content.sql <<'EOF'
WITH affected_content AS (
  SELECT DISTINCT content_item_id
  FROM content_versions
  WHERE created_at > '${SUSPICIOUS_TIME}'::timestamp
),
latest_good_version AS (
  SELECT DISTINCT ON (cv.content_item_id)
    cv.content_item_id,
    cv.version_number,
    cv.data
  FROM content_versions cv
  JOIN affected_content ac ON cv.content_item_id = ac.content_item_id
  WHERE cv.created_at <= '${SUSPICIOUS_TIME}'::timestamp
  ORDER BY cv.content_item_id, cv.version_number DESC
)
UPDATE content_items ci
SET 
  data = lgv.data,
  published_version = lgv.version_number,
  updated_at = NOW(),
  updated_by = 'system_recovery'
FROM latest_good_version lgv
WHERE ci.id = lgv.content_item_id;
EOF

psql $DATABASE_URL < /tmp/recover_content.sql

# Log recovery
psql $DATABASE_URL -c "
  INSERT INTO system_recovery_log 
    (recovery_type, scope, items_affected, performed_at, performed_by)
  SELECT 
    'content_bulk_rollback',
    'content_items',
    COUNT(*),
    NOW(),
    'system_recovery'
  FROM content_versions
  WHERE created_at > '${SUSPICIOUS_TIME}'::timestamp;
"
```

### 5.5 User Access Restoration

**Restore Deleted Users:**
```bash
#!/bin/bash
# user-restore.sh

DELETION_TIMESTAMP=$1

# 1. Find deleted users from audit log
psql $DATABASE_URL -c "
  WITH deleted_users AS (
    SELECT 
      target_id as user_id,
      before_state->>'email' as email,
      before_state->>'first_name' as first_name,
      before_state->>'last_name' as last_name,
      before_state->>'status' as status
    FROM audit_events
    WHERE event_action = 'user_delete'
    AND timestamp >= '${DELETION_TIMESTAMP}'::timestamp
  )
  INSERT INTO users (id, email, first_name, last_name, status, created_at)
  SELECT 
    user_id, email, first_name, last_name, 
    COALESCE(status, 'active'),
    NOW()
  FROM deleted_users
  ON CONFLICT (id) DO UPDATE
  SET status = EXCLUDED.status,
      updated_at = NOW();
"

# 2. Restore role assignments
psql $DATABASE_URL -c "
  WITH deleted_roles AS (
    SELECT 
      target_id as assignment_id,
      before_state
    FROM audit_events
    WHERE event_action = 'role_assignment_delete'
    AND timestamp >= '${DELETION_TIMESTAMP}'::timestamp
  )
  INSERT INTO role_assignments (id, user_id, role_id, org_id, granted_by, granted_at)
  SELECT 
    assignment_id,
    (before_state->>'user_id')::uuid,
    (before_state->>'role_id')::uuid,
    (before_state->>'org_id')::uuid,
    'system_recovery',
    NOW()
  FROM deleted_roles
  ON CONFLICT DO NOTHING;
"

# 3. Force password resets for restored users
psql $DATABASE_URL -c "
  UPDATE users
  SET password_reset_required = true,
      mfa_reset_required = true
  WHERE id IN (
    SELECT target_id 
    FROM audit_events 
    WHERE event_action = 'user_delete'
    AND timestamp >= '${DELETION_TIMESTAMP}'::timestamp
  );
"

# 4. Notify restored users
./scripts/notify-restored-users.sh --timestamp $DELETION_TIMESTAMP
```

---

## 6. Incident Response for Admin-Specific Issues

### 6.1 Compromised Admin Account Response

**Response Flowchart:**
```
Detection
    │
    ▼
┌─────────────────────────────────┐
│  1. IMMEDIATE ISOLATION         │
│  - Disable account              │
│  - Revoke all sessions          │
│  - Block IP if known            │
└─────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────┐
│  2. IMPACT ASSESSMENT           │
│  - Review audit trail           │
│  - Identify data accessed       │
│  - Check for persistence        │
└─────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────┐
│  3. CONTAINMENT                 │
│  - Revoke suspicious actions    │
│  - Reset affected credentials   │
│  - Enable enhanced monitoring   │
└─────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────┐
│  4. RECOVERY                    │
│  - Reset password + MFA         │
│  - Verify identity (out-of-band)│
│  - Restore account with review  │
└─────────────────────────────────┘
```

**Detailed Procedure:**

1. **Immediate Actions (0-5 minutes):**
   ```sql
   -- Disable account
   UPDATE users SET status = 'suspended', updated_at = NOW() 
   WHERE id = 'COMPROMISED_USER_ID';
   
   -- Revoke all sessions
   UPDATE sessions SET revoked_at = NOW(), revoked_by = 'system_security' 
   WHERE user_id = 'COMPROMISED_USER_ID' AND revoked_at IS NULL;
   
   -- Block IP if known
   INSERT INTO ip_blocks (ip_address, reason, expires_at) 
   VALUES ('ATTACKER_IP', 'Compromised account activity', NOW() + INTERVAL '24 hours');
   ```

2. **Audit Review (5-30 minutes):**
   ```sql
   -- All actions by compromised account in last 24 hours
   SELECT * FROM audit_events 
   WHERE actor_id = 'COMPROMISED_USER_ID' 
   AND timestamp > NOW() - INTERVAL '24 hours'
   ORDER BY timestamp DESC;
   
   -- Check for privilege changes
   SELECT * FROM audit_events 
   WHERE event_action IN ('role_grant', 'permission_change')
   AND actor_id = 'COMPROMISED_USER_ID'
   AND timestamp > NOW() - INTERVAL '7 days';
   ```

3. **Containment (30-60 minutes):**
   - Reverse any unauthorized role grants
   - Revoke any created API keys
   - Remove any created accounts
   - Revert configuration changes

4. **Recovery (60+ minutes):**
   - Contact legitimate user via verified channel
   - Require in-person or video identity verification
   - Reset password (32+ character random)
   - Require new MFA enrollment
   - Enable 30-day enhanced monitoring

### 6.2 Privilege Escalation Response

**Detection:**
- Audit events: `privilege_escalation_attempt`
- RBAC denials followed by success
- Unexpected permission grants
- Off-hours permission changes

**Response Steps:**
1. **Immediate:**
   - Quarantine affected account (read-only mode)
   - Preserve audit trail
   - Alert security team

2. **Investigation:**
   ```sql
   -- Find escalation vector
   SELECT * FROM audit_events
   WHERE (event_action LIKE '%permission%' OR event_action LIKE '%role%')
   AND timestamp > NOW() - INTERVAL '1 hour'
   ORDER BY timestamp;
   
   -- Check for RBAC bypass attempts
   SELECT * FROM audit_events
   WHERE action_outcome = 'denied'
   AND actor_id = 'SUSPICIOUS_USER_ID'
   ORDER BY timestamp DESC LIMIT 100;
   ```

3. **Remediation:**
   - Review and correct all permission changes
   - Patch any identified vulnerability
   - Update WAF rules if attack vector identified

### 6.3 Malicious Content Publish Response

**Detection:**
- Automated content scanning alerts
- User reports
- Audit log anomalies (off-hours publish)

**Response Steps:**

1. **Immediate Takedown:**
   ```bash
   # Unpublish content immediately
   curl -X POST "https://admin.vantus.systems/api/content/unpublish" \
     -H "Authorization: Bearer $EMERGENCY_TOKEN" \
     -d '{"content_id": "MALICIOUS_CONTENT_ID", "reason": "security_takedown"}'
   
   # Clear CDN cache globally
   cloudflare-cli zone purge --everything
   ```

2. **Investigation:**
   ```sql
   -- Review content history
   SELECT * FROM content_versions 
   WHERE content_item_id = 'MALICIOUS_CONTENT_ID'
   ORDER BY version_number DESC;
   
   -- Check publisher account
   SELECT * FROM audit_events
   WHERE target_id = 'MALICIOUS_CONTENT_ID'
   AND event_action = 'content_publish'
   ORDER BY timestamp DESC LIMIT 1;
   ```

3. **Recovery:**
   - Restore to last verified good version
   - Review and re-approve content workflow
   - Suspend publishing permissions if insider threat suspected

4. **Communication:**
   - If client-facing content affected: Client notification within 1 hour
   - If SEO impact: Submit removal requests to search engines
   - Document incident for compliance

### 6.4 Pricing Error Response

**Severity Classification:**

| Impact | Example | Response Time |
|--------|---------|---------------|
| Critical | Prices 10x too low, negative prices | Immediate (5 min) |
| High | Wrong currency, discount errors | 30 minutes |
| Medium | Minor rounding errors | 4 hours |

**Response Procedure:**

1. **Immediate Freeze:**
   ```sql
   -- Disable affected pricing rules
   UPDATE pricing_rules 
   SET status = 'suspended', updated_at = NOW()
   WHERE id IN (SELECT id FROM affected_rules);
   
   -- Log emergency action
   INSERT INTO pricing_verification_events 
     (sku_id, verified_by, status, review_notes)
   SELECT 
     sku_id, 
     'system_emergency', 
     'suspended',
     'Automated suspension - pricing error detected'
   FROM affected_rules;
   ```

2. **Impact Assessment:**
   ```sql
   -- Check if any transactions occurred with bad pricing
   SELECT COUNT(*), SUM(amount) 
   FROM transactions 
   WHERE created_at > 'ERROR_TIMESTAMP'
   AND sku_id IN (SELECT id FROM affected_skus);
   ```

3. **Recovery:**
   - Restore correct pricing from backup/version history
   - If transactions occurred: Business decision on honor/refund
   - Re-verify all pricing before re-enabling

4. **Verification:**
   ```sql
   -- All prices must be verified before re-enabling
   SELECT sku_id, verified_by, verified_at
   FROM pricing_verification_events
   WHERE sku_id IN (SELECT id FROM affected_skus)
   AND status = 'verified'
   AND verified_at > 'RECOVERY_TIMESTAMP';
   ```

---

## 7. Communication Plan

### 7.1 Internal Escalation Procedures

**Escalation Matrix:**

| Time | Severity | Notify | Action |
|------|----------|--------|--------|
| 0-5 min | Any | On-call engineer | Acknowledge, assess |
| 5-15 min | P1/P2 | Incident Commander | Activate DR team |
| 15-30 min | P1 | CTO, VP Engineering | Executive briefing |
| 30-60 min | P1 | CEO, Legal (if breach) | Board notification |
| Ongoing | All | All-hands Slack | Status updates every 30 min |

**Incident Severity Definitions:**

| Severity | Criteria | Response Team |
|----------|----------|---------------|
| **SEV-1** | Complete outage, security breach, data loss | Full DR team + Executives |
| **SEV-2** | Major functionality degraded | DR team + Engineering leads |
| **SEV-3** | Minor functionality impacted | Engineering on-call |
| **SEV-4** | No user impact | Track, fix during business hours |

**Communication Channels:**

| Channel | Purpose | Primary Use |
|---------|---------|-------------|
| PagerDuty | P1/P2 paging | Immediate response |
| Slack #incident-response | Real-time coordination | Active incidents |
| Slack #admin-announcements | Team updates | All incidents |
| Email | Formal notifications | Post-incident, client comms |
| Zoom bridge | War room | SEV-1/SEV-2 incidents |
| Status page | Public updates | User-impacting incidents |

### 7.2 Client Communication

**Trigger Conditions for Client Notification:**
- Admin portal unavailable > 15 minutes
- Any security incident affecting client data
- Data loss or corruption affecting clients
- Pricing errors affecting invoices/quotes
- RBAC failures allowing unauthorized access

**Communication Templates:**

**Initial Notification (within 30 minutes of P1):**
```
Subject: [NOTICE] Vantus Admin Portal - Service Disruption

Dear [Client] Team,

We are writing to inform you of a service disruption affecting the Vantus 
Admin Portal.

Impact: [Brief description of impact]
Start Time: [ISO 8601 timestamp]
Expected Resolution: [ETA or "under investigation"]

We are actively working to restore full service and will provide updates 
every 30 minutes until resolved.

Status page: https://status.vantus.systems

For urgent matters, please contact: support@vantus.systems

Vantus Platform Team
```

**Security Incident Notification (if client data affected):**
```
Subject: [SECURITY NOTICE] Important Information About Your Vantus Account

Dear [Client] Team,

We are writing to inform you of a security incident that may have affected 
your organization data in the Vantus Admin Portal.

What Happened:
[Clear, factual description without technical jargon]

What Information Was Involved:
[Specific data types potentially affected]

What We Are Doing:
[Remediation steps taken]

What You Should Do:
[Recommended client actions]

We sincerely apologize for this incident. We are conducting a thorough 
investigation and will provide updates as we learn more.

Contact: security@vantus.systems
```

### 7.3 Regulatory Notification Requirements

**Notification Matrix:**

| Regulation | Trigger | Timeline | Recipient | Method |
|------------|---------|----------|-----------|--------|
| GDPR | Personal data breach | 72 hours | Supervisory authority | Electronic |
| GDPR | High risk to individuals | Without delay | Affected individuals | Direct notification |
| CCPA | Personal info compromise | Without delay | California residents | Direct notification |
| SOX | Financial system outage | 4 hours | Audit committee | Email + phone |
| SOC 2 | Security incident | 24 hours | Auditors | Email |
| Contractual | Per client SLA | As specified | Client contacts | Per contract |

**Regulatory Notification Template (GDPR):**
```
DATA BREACH NOTIFICATION

1. Nature of the breach:
   [Description]

2. Categories and approximate number of data subjects concerned:
   [Number and categories]

3. Categories and approximate number of personal data records concerned:
   [Number and data types]

4. Likely consequences of the breach:
   [Assessment]

5. Measures taken or proposed:
   [Remediation steps]

6. Contact details for more information:
   [DPO contact]
```

---

## 8. Testing and Validation

### 8.1 DR Drill Schedule

| Drill Type | Frequency | Duration | Scope |
|------------|-----------|----------|-------|
| Tabletop exercise | Quarterly | 2 hours | Discussion-based scenarios |
| Component testing | Monthly | 4 hours | Individual DR components |
| Partial failover | Quarterly | 8 hours | Database or app failover only |
| Full DR simulation | Semi-annually | 24 hours | Complete DR execution |
| Unannounced drill | Annually | As needed | Surprise activation |

### 8.2 Tabletop Exercise Format

**Exercise Structure:**
1. **Scenario briefing** (15 min): Present disaster scenario
2. **Individual response** (30 min): Each team member documents actions
3. **Group discussion** (60 min): Compare responses, identify gaps
4. **Improvement planning** (15 min): Document lessons learned

**Sample Scenarios:**
- DS-003: Ransomware attack during product launch week
- DS-005: C-level account compromised, attacker creating backdoor accounts
- DS-002 + DS-006: Database corruption during IdP outage
- DS-004: Bulk deletion discovered 7 days after occurrence

### 8.3 Failover Testing Procedures

**Pre-Test Checklist:**
- [ ] Maintenance window scheduled and communicated
- [ ] Rollback plan documented and tested
- [ ] All stakeholders notified
- [ ] Monitoring in enhanced mode
- [ ] Client notifications prepared (if needed)

**Test Execution:**
```bash
#!/bin/bash
# failover-test.sh

TEST_ID=$(date +%Y%m%d_%H%M%S)
echo "Starting failover test: $TEST_ID"

# 1. Pre-test health check
./scripts/health-check.sh > "pre-test-health-${TEST_ID}.log"

# 2. Execute failover
./scripts/manual-failover.sh --test-mode --id $TEST_ID

# 3. Post-failover validation
./scripts/smoke-test.sh > "post-failover-smoke-${TEST_ID}.log"

# 4. Record RTO
FAILOVER_START=$(cat "/tmp/failover-start-${TEST_ID}")
FAILOVER_END=$(date +%s)
RTO=$((FAILOVER_END - FAILOVER_START))
echo "RTO: ${RTO}s" >> "test-results-${TEST_ID}.log"

# 5. Failback
./scripts/manual-failback.sh --test-mode

# 6. Post-failback validation
./scripts/smoke-test.sh > "post-failback-smoke-${TEST_ID}.log"

# 7. Generate report
./scripts/generate-test-report.sh --id $TEST_ID
```

### 8.4 Recovery Validation Checklists

**Database Recovery Validation:**
- [ ] Connection successful from application
- [ ] Row counts match expected (within 1%)
- [ ] Sample queries return correct data
- [ ] Index integrity verified
- [ ] Replication to standby working
- [ ] WAL archiving resumed
- [ ] Backup chain intact
- [ ] Performance benchmarks within 10% of baseline

**Application Recovery Validation:**
- [ ] Service responds to health checks
- [ ] Login page accessible
- [ ] Authentication functional
- [ ] RBAC permissions loading correctly
- [ ] Critical operations succeeding
- [ ] External integrations connecting
- [ ] Error rates < 0.1%
- [ ] Latency within SLO

**Content Recovery Validation:**
- [ ] Content versions accessible
- [ ] Latest content displaying correctly
- [ ] Media assets loading
- [ ] CDN cache cleared
- [ ] Search index updated
- [ ] Published content matches expected

**Security Recovery Validation:**
- [ ] All sessions valid
- [ ] MFA enforcement active
- [ ] Audit logging functional
- [ ] Rate limiting operational
- [ ] WAF rules active
- [ ] No unauthorized accounts present
- [ ] All secrets rotated (if required)

### 8.5 Test Results Documentation

**Required Documentation:**
- Test date, time, and duration
- Participants and roles
- Scenario tested
- Actual vs. target RTO/RPO
- Issues encountered
- Deviations from procedure
- Lessons learned
- Action items with owners

---

## 9. Roles and Responsibilities

### 9.1 DR Team Structure

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         INCIDENT COMMAND STRUCTURE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                    ┌─────────────────────┐                                  │
│                    │  INCIDENT COMMANDER │                                  │
│                    │   (IC)              │                                  │
│                    └──────────┬──────────┘                                  │
│                               │                                             │
│           ┌───────────────────┼───────────────────┐                         │
│           │                   │                   │                         │
│    ┌──────▼──────┐     ┌──────▼──────┐     ┌──────▼──────┐                  │
│    │  Operations │     │  Security   │     │Communications│                  │
│    │   Lead      │     │   Lead      │     │    Lead      │                  │
│    └──────┬──────┘     └──────┬──────┘     └──────┬──────┘                  │
│           │                   │                   │                         │
│    ┌──────┴──────┐     ┌──────┴──────┐     ┌──────┴──────┐                  │
│    │Platform Eng │     │   SOC       │     │   Customer  │                  │
│    │   Database  │     │  Forensics  │     │    Success  │                  │
│    │   Network   │     │Compliance   │     │   Marketing │                  │
│    └─────────────┘     └─────────────┘     └─────────────┘                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Role Definitions

**Incident Commander (IC)**
- **Primary:** VP of Operations
- **Secondary:** CTO
- **Responsibilities:**
  - Declares incident severity and activates DR plan
  - Coordinates all response activities
  - Makes go/no-go decisions for failover
  - Approves external communications
  - Ensures post-incident review completion

**Operations Lead**
- **Primary:** Platform Engineering Lead
- **Secondary:** Senior SRE
- **Responsibilities:**
  - Executes technical recovery procedures
  - Coordinates with infrastructure providers
  - Validates system restoration
  - Documents all technical actions

**Security Lead**
- **Primary:** CISO
- **Secondary:** Security Operations Manager
- **Responsibilities:**
  - Assesses security impact of incident
  - Coordinates forensic investigation
  - Manages containment of security incidents
  - Ensures compliance with security policies

**Communications Lead**
- **Primary:** Director of Customer Success
- **Secondary:** Marketing Lead
- **Responsibilities:**
  - Manages all internal communications
  - Drafts and approves client notifications
  - Updates status page
  - Coordinates with legal on regulatory notifications

### 9.3 Contact Information

| Role | Primary | Secondary | Contact Method |
|------|---------|-----------|----------------|
| Incident Commander | VP Ops | CTO | PagerDuty + Direct |
| Operations Lead | Platform Lead | Senior SRE | PagerDuty + Slack |
| Security Lead | CISO | SOC Manager | PagerDuty + Direct |
| Communications Lead | Dir. CS | Marketing Lead | PagerDuty + Email |
| Database Admin | DBA Lead | Senior DBA | PagerDuty + Slack |
| Network Engineer | Net Eng Lead | Senior Net Eng | PagerDuty + Slack |
| Legal Counsel | General Counsel | Deputy GC | Direct + Email |

### 9.4 Escalation Paths

**Technical Escalation:**
```
On-call Engineer → Platform Lead → VP Engineering → CTO → CEO
        ↓
   If security-related:
        ↓
   SOC → CISO → CTO + Legal
```

**Business Escalation:**
```
Incident Commander → VP Operations → CEO → Board (if material)
                          ↓
                   If client-impacting:
                          ↓
                   Customer Success → Affected Clients
```

**External Escalation:**
- **AWS/Azure:** Enterprise support (P1 case)
- **Vercel:** Enterprise support channel
- **Cloudflare:** Enterprise support hotline
- **PagerDuty:** Escalation policies configured

### 9.5 DR Runbook Maintenance

**Maintenance Responsibilities:**

| Task | Frequency | Owner | Reviewer |
|------|-----------|-------|----------|
| Contact information update | Monthly | Operations Lead | Incident Commander |
| Procedure accuracy review | Quarterly | DR Team | CISO |
| Tool/script testing | Monthly | SRE Team | Platform Lead |
| Full DR runbook test | Semi-annually | DR Team | VP Operations |
| Documentation updates | As needed | Technical Writer | Operations Lead |
| Training delivery | Quarterly | HR + Operations | VP Operations |

---

## 10. Appendices

### Appendix A: Quick Reference Cards

**Admin Portal DR Quick Reference (Print and Post)**

```
┌─────────────────────────────────────────────────────────────────────┐
│               VANTUS ADMIN PORTAL - EMERGENCY RESPONSE              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  CRITICAL CONTACTS:                                                 │
│  Incident Commander: [PHONE]  PagerDuty: [URL]                      │
│  #incident-response: [SLACK URL]                                    │
│                                                                     │
│  IMMEDIATE ACTIONS (First 5 minutes):                               │
│  1. Acknowledge PagerDuty alert                                     │
│  2. Join #incident-response Slack channel                           │
│  3. Assess: Is this SEV-1? (Complete outage / Security breach)      │
│  4. If SEV-1: Page Incident Commander                               │
│  5. Document all actions in incident timeline                       │
│                                                                     │
│  KEY COMMANDS:                                                      │
│  Status:   vercel ls --scope vantus                                 │
│  Rollback: ./scripts/rollback.sh [VERSION]                          │
│  Failover: ./scripts/manual-failover.sh                             │
│  Health:   ./scripts/smoke-test.sh                                  │
│                                                                     │
│  STATUS PAGE: https://status.vantus.systems                         │
│  RUNBOOK: https://wiki.vantus.systems/admin-dr                      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### Appendix B: Recovery Scripts

All recovery scripts are maintained in:
- Repository: `vantus/infrastructure`
- Path: `/dr-scripts/admin-portal/`
- Access: Platform engineering team (break-glass for emergencies)

**Script Inventory:**
| Script | Purpose | Last Verified |
|--------|---------|---------------|
| `database-restore.sh` | Full database recovery | 2026-02-22 |
| `partial-table-restore.sh` | Selective table recovery | 2026-02-22 |
| `app-rebuild.sh` | Application rebuild | 2026-02-22 |
| `rollback.sh` | Deployment rollback | 2026-02-22 |
| `config-restore.sh` | Configuration restoration | 2026-02-22 |
| `manual-failover.sh` | DR region activation | 2026-02-22 |
| `manual-failback.sh` | Return to primary | 2026-02-22 |
| `content-rollback.sh` | Content version recovery | 2026-02-22 |
| `user-restore.sh` | Deleted user recovery | 2026-02-22 |
| `smoke-test.sh` | Post-recovery validation | 2026-02-22 |

### Appendix C: Dependency Map

| Service | Provider | DR Capability | Failover Method |
|---------|----------|---------------|-----------------|
| Application Hosting | Vercel | Multi-region | DNS + Vercel regions |
| Database | AWS RDS | Multi-AZ + Cross-region | Automatic + Manual |
| Cache | Upstash Redis | Multi-zone | Automatic |
| CDN | Cloudflare | Global | Automatic |
| DNS | Cloudflare | Global | Automatic |
| Auth (IdP) | Okta/Azure AD | Multi-region | Failover to local |
| Object Storage | AWS S3 | Cross-region replication | Automatic |
| Email | SendGrid | Multi-region | Automatic |
| Monitoring | Datadog | Multi-region | Automatic |
| Secrets | AWS Secrets Manager | Regional + Backup | Manual restore |

### Appendix D: Compliance Mapping

| Requirement | DR Control | Evidence |
|-------------|------------|----------|
| SOC 2 CC6.1 | Access controls during DR | Audit logs |
| SOC 2 CC6.6 | Encrypted backups | Backup encryption settings |
| SOC 2 CC7.1 | Security monitoring during incidents | SIEM logs |
| SOC 2 CC7.2 | Detection capabilities | Alert configuration |
| SOC 2 CC7.3 | Incident response | This runbook + logs |
| SOC 2 CC7.4 | Recovery procedures | DR test records |
| SOC 2 CC7.5 | Backup retention | Backup lifecycle policy |
| GDPR Article 32 | Security of processing | Encryption + access logs |
| ISO 27001 A.12.3 | Backup procedures | Backup schedule + tests |
| ISO 27001 A.16.1 | Incident management | Incident response records |

---

**End of ADMIN_DISASTER_RECOVERY v1.0.0**

*This document is classified as CONFIDENTIAL and should be handled according to Vantus information security policies. Distribution is limited to authorized personnel with a business need-to-know.*
