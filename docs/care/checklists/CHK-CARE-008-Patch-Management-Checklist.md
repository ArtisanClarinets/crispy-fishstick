# CHK-CARE-008: Patch Management Checklist

**Document ID:** VS-CARE-CHK-008  
**Version:** 1.0.0  
**Effective Date:** 2026-02-21  
**Owner:** Security Lead  
**Status:** Active  
**Reading Level:** 8th Grade  
**Estimated Time:** 45-90 minutes per cycle  
**Risk Rating:** High (unpatched systems = security exposure)

**Goal:** Execute consistent, documented patch cycles that reduce security risk while maintaining system stability through tested updates and clear exception handling.

---

## 1. Pre-Cycle Planning

- [ ] Patch window confirmed with client and stakeholders (maintenance window scheduled)
- [ ] Vulnerability scan completed and findings catalogued (CVEs prioritized by CVSS score)
- [ ] Patch inventory created: systems affected, patch sizes, downtime requirements
- [ ] Rollback plan documented for each critical system (restore points verified)
- [ ] Emergency contact list confirmed (stop authority reachable during window)
- [ ] Pre-patch backup verification completed (backups tested within last 7 days)

**Time Estimate:** 15-20 minutes  
**CMMC Alignment:** SI.1.1 (patching/flaw remediation), SI.2.1 (timely flaw remediation)

---

## 2. Testing & Validation

- [ ] Non-production test environment identified (or roll-forward plan documented)
- [ ] Critical patches applied to test systems first (observation period: 24-48 hours minimum)
- [ ] Application smoke tests passed (key business functions verified)
- [ ] Regression testing completed for business-critical applications
- [ ] Performance baseline compared (CPU, memory, disk I/O within normal range)

**Time Estimate:** 20-45 minutes  
**Risk if Skipped:** Production outage, application incompatibility

---

## 3. Production Deployment

- [ ] Deployment sequence planned (order of systems reduces blast radius)
- [ ] Monitoring dashboard active during deployment (real-time alerting enabled)
- [ ] First system deployed and verified before mass rollout
- [ ] Staged rollout executed: 25% → 50% → 100% with verification gates
- [ ] Each system verified post-patch: services running, connectivity confirmed
- [ ] Patch success/failure logged per system with timestamp and engineer name

**Time Estimate:** 30-60 minutes  
**Vantus standard:** requiring staged rollout vs. mass deployment

---

## 4. Exception Documentation

- [ ] Each unpatched system documented with reason (compatibility, downtime, vendor delay)
- [ ] Risk assessment completed for each exception (exploit likelihood × business impact)
- [ ] Compensating controls identified (network segmentation, enhanced monitoring, access restrictions)
- [ ] Revisit date set for each exception (maximum 90 days for critical, 180 days for high)
- [ ] Exception approval captured from client decision-maker in writing

**Time Estimate:** 10-15 minutes per exception  
**CMMC Alignment:** SI.1.2 (malicious code protection), RM.2.1 (risk assessment)

---

## 5. Post-Cycle Verification

- [ ] Vulnerability scan re-run to confirm patches applied successfully
- [ ] Failed patches identified and remediation scheduled
- [ ] System performance verified (no degradation detected)
- [ ] User-reported issues captured and triaged
- [ ] Change records updated with patch details and outcomes

**Time Estimate:** 15-20 minutes

---

## 6. Documentation & Reporting

- [ ] Patch log updated: systems patched, patches applied, exceptions noted
- [ ] Monthly scorecard updated with patch compliance percentage (target: 95%+)
- [ ] Exception register current with revisit dates and owners
- [ ] Lessons learned captured (deployment issues, timing improvements)
- [ ] Next cycle scheduled and communicated

**Time Estimate:** 10-15 minutes  
**Owner:** Security Lead (primary), Delivery Lead (backup)

---

## Success Criteria

| Criterion | Target | Verification |
|-----------|--------|--------------|
| Patch compliance rate | 95%+ | Vulnerability scan comparison |
| Zero unplanned outages | 100% | Incident ticket review |
| Exception revisit dates set | 100% | Exception register audit |
| Client notification | Within 24h | Communication log |

---

## Risk Ratings by System Type

| System Type | Risk if Unpatched | Priority |
|-------------|-------------------|----------|
| Internet-facing servers | Critical | P0 - 24-48 hours |
| Domain controllers | Critical | P0 - 48 hours |
| Internal servers | High | P1 - 7 days |
| User workstations | Medium | P2 - 14 days |
| Isolated/legacy systems | Medium-High | P1 - case by case |

---

## Related Documents

- **SOP:** SOP-CARE-015 (Patch & Vulnerability Governance)
- **Template:** TPL-CARE-003 (Monthly Scorecard)
- **Template:** TPL-CARE-013 (Risk Register)

---

*Last Updated: 2026-02-21 | Version 1.0.0 | Questions? Contact your Security Lead*
