# CHK-CARE-010: Change Management Checklist

**Document ID:** VS-CARE-CHK-010  
**Version:** 1.0.0  
**Effective Date:** 2026-02-21  
**Owner:** VP of Operations  
**Status:** Active  
**Reading Level:** 8th Grade  
**Estimated Time:** 30-120 minutes (preparation + execution)  
**Risk Rating:** High (changes are a leading cause of outages)

**Goal:** Execute changes safely with full rollback capability, documented verification, and clear approval chains to minimize service disruption.

---

## 1. Change Classification

- [ ] Change type determined:
  - **Standard:** Pre-approved, low-risk, repeatable (e.g., user provisioning)
  - **Normal:** Planned, requires approval, moderate risk (most changes)
  - **Emergency:** Urgent fix, documented after (break-glass only)
- [ ] Change risk level assessed (Low/Medium/High/Critical)
- [ ] Business impact evaluated (users affected, revenue at risk)
- [ ] Appropriate approval path identified

**Time Estimate:** 5-10 minutes

---

## 2. Change Planning

- [ ] Change description written (what will be done, in plain language)
- [ ] Business justification documented (why this change is needed)
- [ ] Systems affected listed (servers, services, applications)
- [ ] Users affected estimated (number and departments)
- [ ] Maintenance window selected (low-usage period preferred)
- [ ] Duration estimated (include buffer time)
- [ ] Change Impact Assessment completed (TPL-CARE-002 referenced)

**Time Estimate:** 15-30 minutes  
**CMMC Alignment:** CM.2.1 (baseline configurations), CM.3.1 (change control)

---

## 3. Risk Assessment & Rollback

- [ ] Risk assessment completed:
  - What could go wrong?
  - Probability of each risk?
  - Impact if it occurs?
- [ ] Rollback plan documented (step-by-step to undo change)
- [ ] Rollback tested where possible (validated procedure works)
- [ ] Recovery time objective defined (how long to roll back)
- [ ] Data backup verified (current backup available if needed)
- [ ] Dependencies checked (other changes, maintenance windows)

**Time Estimate:** 15-30 minutes  
**Vantus standard:** requiring documented rollback for all Normal+ changes

---

## 4. Approval Workflow

| Change Type | Approver Required |
|-------------|-------------------|
| Standard | Delivery Lead (pre-authorized) |
| Normal | Client + Delivery Lead |
| Emergency | Notify ASAP, document after |

- [ ] Approvals obtained in writing (email, ticket, or signed form)
- [ ] Client maintenance window confirmed (for production changes)
- [ ] On-call team notified (if after-hours or high-risk)
- [ ] Emergency contacts verified (stop authority reachable)

**Time Estimate:** 10-30 minutes (dependent on response times)

---

## 5. Pre-Execution Verification

- [ ] Implementation steps documented (detailed procedure)
- [ ] Verification steps defined (how to confirm success)
- [ ] Testing plan ready (smoke tests, user validation)
- [ ] Monitoring alerts reviewed (baseline established)
- [ ] Required tools/access confirmed (credentials, VPN, consoles)
- [ ] Team briefed (if multi-person change, roles assigned)

**Time Estimate:** 10-20 minutes

---

## 6. Change Execution

- [ ] Change executed during approved window
- [ ] Steps followed in sequence (no shortcuts)
- [ ] Issues documented immediately (any deviations logged)
- [ ] Rollback triggered if issues exceed tolerance
- [ ] Evidence captured (screenshots, logs, outputs)
- [ ] Time logged (actual duration recorded)

**Time Estimate:** Varies by change complexity

---

## 7. Post-Change Verification

- [ ] Technical verification completed (services running, tests passed)
- [ ] Functional verification completed (application works, users can access)
- [ ] Monitoring checks pass (no new alerts, metrics normal)
- [ ] Performance baseline compared (no degradation detected)
- [ ] User acceptance confirmed (stakeholder sign-off if required)

**Time Estimate:** 10-20 minutes

---

## 8. Documentation & Closure

- [ ] Change record updated with actual results
- [ ] Documentation refreshed (runbooks, diagrams if affected)
- [ ] Success/failure documented (lessons learned)
- [ ] Ticket closed with summary
- [ ] Monthly scorecard updated (change metrics)
- [ ] Quarterly review inclusion (significant changes noted)

**Time Estimate:** 10-15 minutes  
**CMMC Alignment:** CM.3.2 (security configuration changes)

---

## Change Success Metrics

| Metric | Target | Industry Avg | Vantus Goal |
|--------|--------|--------------|-------------|
| Change success rate | 95%+ | 85% | 97% |
| Rollback rate | <3% | 10% | <2% |
| Unauthorized changes | 0 | Variable | 0 |
| Post-change incidents | <5% | 15% | <3% |

---

## Emergency Change Exception

For emergency changes (active outage, security threat):
- [ ] Emergency declared verbally
- [ ] Minimum viable plan documented (even if brief)
- [ ] Actions taken logged in real-time
- [ ] Full documentation completed within 24 hours
- [ ] Post-emergency review scheduled

---

## Related Documents

- **SOP:** SOP-CARE-017 (Change Management)
- **Template:** TPL-CARE-002 (Change Impact Assessment)
- **Checklist:** CHK-CARE-007 (Simulation Safety - for test changes)

---

*Last Updated: 2026-02-21 | Version 1.0.0 | Questions? Contact your VP of Operations*
