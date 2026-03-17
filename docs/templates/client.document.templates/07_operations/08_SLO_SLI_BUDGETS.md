# Service Level Objectives (SLOs) & Budgets

**Project:** [[PROJECT_NAME]]  
**Status:** Active  
**Review Frequency:** Monthly

---

## 1. SERVICE LEVEL AGREEMENTS (SLAs)
| Service | Target | Threshold | Action |
|---------|--------|-----------|--------|
| **Availability** | 99.9% | 99.7% (monthly) | Incident Review |
| **Response Time** | ≤ 200ms (p95) | > 250ms (daily) | Performance Review |
| **Error Rate** | < 0.1% | > 0.5% (hourly) | Immediate Alert |

---

## 2. ERROR BUDGET (THE "QUOTA" FOR FAILURE)
**Monthly Error Budget:** 100 errors per 1M requests (based on 99.9% target).

- **If consumed:** No planned maintenance or risky deployments.
- **If not consumed:** Safe to proceed with standard deployment schedule.

---

## 3. SUCCESS METRICS & TRACKING
All metrics are tracked in a live dashboard accessible to the Client:
- **Uptime:** Measured via synthetic monitoring (pings every 60 sec).
- **Response Time:** Measured via APM (application performance monitoring).
- **Error Rate:** Measured via centralized logging (real-time).

---

## 4. QUARTERLY SLO REVIEW
SLOs are reviewed quarterly to ensure continued relevance:
- Are the targets realistic?
- Are there structural gaps in monitoring?
- Do targets align with business objectives?

[End of SLO Document]
