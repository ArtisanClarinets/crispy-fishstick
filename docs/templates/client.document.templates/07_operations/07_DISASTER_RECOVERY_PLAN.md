# Disaster Recovery & Business Continuity Plan

**Project:** [[PROJECT_NAME]]  
**RTO (Recovery Time Objective):** 4 hours  
**RPO (Recovery Point Objective):** 24 hours  
**Last Tested:** [[DATE]]

---

## 1. DISASTER SCENARIOS & RESPONSES

### Scenario 1: Primary Database Failure
**Trigger:** Database completely inaccessible for > 15 minutes.

**Response:**
1. Failover to secondary database replica (automatic, < 2 min).
2. Verify data integrity (manual check, 5 min).
3. Monitor for anomalies (ongoing).

**RTO:** 2 minutes | **RPO:** < 5 minutes

### Scenario 2: Ransomware / Data Corruption
**Trigger:** Unusual file modifications or encryption detected.

**Response:**
1. Isolate affected systems immediately.
2. Restore from air-gapped backup (< 2 hours).
3. Conduct forensic analysis (post-recovery).

**RTO:** 2 hours | **RPO:** 24 hours

### Scenario 3: Complete Infrastructure Loss
**Trigger:** Cloud provider regional outage or catastrophic hardware failure.

**Response:**
1. Activate standby infrastructure in alternate region.
2. Restore database from offsite backup (< 4 hours).
3. Update DNS records (< 15 minutes).

**RTO:** 4 hours | **RPO:** 24 hours

---

## 2. BACKUP VERIFICATION (THE DRILL)
Recovery Plan is tested **monthly**:
- [ ] Restore database from backup to staging environment.
- [ ] Verify all data integrity checks pass.
- [ ] Test application against restored data.
- [ ] Record test results in audit log.

**Next Test:** [[DATE]]

---

## 3. COMMUNICATION PLAN (DURING DISASTER)
- **Internal:** Slack channel #incident-response (within 5 min).
- **Stakeholders:** Email to leadership (within 15 min).
- **Public:** Status page update (within 30 min).

[End of Plan]
