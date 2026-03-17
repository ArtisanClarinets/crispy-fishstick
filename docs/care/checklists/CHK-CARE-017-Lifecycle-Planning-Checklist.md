# CHK-CARE-017: Lifecycle Planning Checklist

**Document ID:** VS-CARE-CHK-017  
**Version:** 1.0.0  
**Effective Date:** 2026-02-21  
**Owner:** VP of Operations  
**Status:** Active  
**Reading Level:** 8th Grade  
**Estimated Time:** 2-3 hours (quarterly review cycle)  
**Risk Rating:** High (surprise failures = emergency spending + downtime)

**Goal:** Proactively track asset lifecycles and warranty status to prevent surprise failures, enable budget planning, and schedule orderly replacements before equipment becomes unreliable.

---

## 1. Asset Inventory Review

- [ ] Complete asset list pulled (TPL-CARE-010 current)
- [ ] Critical assets identified (business impact if failed)
- [ ] Asset ages calculated (purchase date to today)
- [ ] Warranty statuses verified (in warranty, expired, extended)
- [ ] Support contracts noted (what coverage exists)
- [ ] Asset locations confirmed (physical and logical)

**Time Estimate:** 30-45 minutes  
**Owner:** Engineer / Delivery Lead  
**CMMC Alignment:** CM.2.1 (baseline configurations), SA.2.1 (supply chain risk)

---

## 2. Lifecycle Status Assessment

For each asset, determine status against typical lifespans:

| Asset Type | Typical Lifespan | Status Categories |
|------------|------------------|-------------------|
| Laptops/Desktops | 3-4 years | Green (<2.5 yrs), Yellow (2.5-3.5 yrs), Red (>3.5 yrs) |
| Servers | 4-5 years | Green (<3 yrs), Yellow (3-4 yrs), Red (>4 yrs) |
| Network Equipment | 5-7 years | Green (<4 yrs), Yellow (4-6 yrs), Red (>6 yrs) |
| Storage Systems | 4-5 years | Green (<3 yrs), Yellow (3-4 yrs), Red (>4 yrs) |
| Mobile Devices | 2-3 years | Green (<1.5 yrs), Yellow (1.5-2.5 yrs), Red (>2.5 yrs) |

- [ ] Each asset categorized (Green/Yellow/Red)
- [ ] Risk score assigned (impact × failure probability)
- [ ] Refresh priority ranked (which assets need attention first)

**Time Estimate:** 45-60 minutes  
**Vantus standard:** color-coding for quick visual assessment

---

## 3. Warranty Expiration Tracking

- [ ] Next 120 days expirations flagged (critical attention)
- [ ] 121-180 days expirations noted (planning horizon)
- [ ] Expired warranties identified (current risk exposure)
- [ ] Extended warranty options researched (if beneficial)
- [ ] Vendor end-of-life announcements checked (support ending?)
- [ ] Replacement vs. renew decision framework applied

**Time Estimate:** 30-45 minutes

---

## 4. Refresh Planning

For each Yellow/Red status asset:

- [ ] Replacement options researched (Good/Better/Best)
- [ ] Current market pricing obtained (3 quotes if significant)
- [ ] Budget impact estimated (cost and timing)
- [ ] Migration complexity assessed (what's involved in replacement)
- [ ] Downtime requirements noted (business impact of swap)
- [ ] Dependencies mapped (what relies on this asset)
- [ ] Timing recommendations made (when to replace)

**Time Estimate:** 45-60 minutes  
**Owner:** VP of Operations

---

## 5. Risk Documentation

- [ ] Running-without-warranty risks noted (business impact)
- [ ] End-of-life system risks captured (no vendor support)
- [ ] Obsolescence risks identified (can't run modern software)
- [ ] Performance degradation risks (slower than needed)
- [ ] Compliance risks flagged (aging systems may fail audit)
- [ ] Risk acceptance documented (if client defers replacement)

**Time Estimate:** 20-30 minutes  
**CMMC Alignment:** RA.2.1 (vulnerability scans), RA.2.2 (remediation progress)

---

## 6. Budget Preparation

- [ ] Annual refresh budget estimated (total projected spend)
- [ ] Quarterly spending forecast created (when purchases needed)
- [ ] Priority rankings assigned (must-do vs. nice-to-have)
- [ ] Phasing options presented (spread costs over quarters)
- [ ] Emergency reserve noted (for unexpected failures)
- [ ] ROI justification prepared (business benefit of refresh)

**Time Estimate:** 30-45 minutes

---

## 7. Client Communication

- [ ] Lifecycle report created (visual summary: Green/Yellow/Red)
- [ ] Upcoming expirations highlighted (next 120 days)
- [ ] Refresh recommendations presented (what, why, when, how much)
- [ ] Risk explanations provided (what happens if we wait)
- [ ] Budget timing discussed (when to allocate funds)
- [ ] Decisions captured (approve/defer/decline each item)
- [ ] Quarterly review inclusion (TPL-CARE-004)

**Time Estimate:** 30-45 minutes  
**Owner:** Account Manager (presentation), VP of Operations (technical)

---

## 8. Roadmap Integration

- [ ] Approved refreshes added to 90-day roadmap
- [ ] Procurement initiated (CHK-CARE-016 triggered)
- [ ] Project timelines established (order → delivery → installation)
- [ ] Resource assignments made (who does what)
- [ ] Milestone dates set (checkpoints for progress)
- [ ] Backlog items created (tracked to completion)

**Time Estimate:** 20-30 minutes

---

## 9. Ongoing Monitoring

- [ ] Warranty register maintained (TPL-CARE-011 updated)
- [ ] Monthly status checks (any new expirations?)
- [ ] Quarterly deep reviews (full lifecycle assessment)
- [ ] Vendor announcements monitored (EOL notices)
- [ ] Failure tracking (are aging assets failing more?)
- [ ] Client budget updates (refreshed projections)

**Time Estimate:** Ongoing (monthly 30 min, quarterly 2-3 hours)

---

## Lifecycle Timeline Visual

```
Year 1-2    Year 3      Year 4      Year 5      Year 6+
   |           |           |           |           |
[  GREEN   ] [  YELLOW  ] [   RED    ] [ CRITICAL ] [REPLACE]
  Normal     Plan        Budget       Execute     Emergency
  Operation  Refresh     Approved     Replacement Risk
```

---

## Success Criteria

| Criterion | Target | Verification |
|-----------|--------|--------------|
| Zero surprise failures | <2% unplanned | Incident analysis |
| Budget accuracy | ±15% of forecast | Actual vs. plan |
| Warranty coverage | 95%+ critical assets | Register audit |
| Client awareness | 100% informed | Communication log |
| Refresh on schedule | 90%+ on time | Project tracking |

---

## Related Documents

- **SOP:** SOP-CARE-024 (Lifecycle Planning)
- **SOP:** SOP-CARE-023 (Hardware Procurement)
- **Checklist:** CHK-CARE-016 (Hardware Procurement)
- **Template:** TPL-CARE-010 (Inventory Snapshot)
- **Template:** TPL-CARE-011 (Vendor Register)
- **Template:** TPL-CARE-004 (Quarterly Governance Review)

---

*Last Updated: 2026-02-21 | Version 1.0.0 | Questions? Contact your VP of Operations*
