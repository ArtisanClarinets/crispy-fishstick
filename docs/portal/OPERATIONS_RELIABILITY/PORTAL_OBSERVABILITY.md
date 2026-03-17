# PORTAL_OBSERVABILITY — Signals, Dashboards, Alerts
**Version:** 2.0.0  
**Date:** 2026-02-22  
**Scope:** Client Portal only

---

## 1) Core signals
- Auth:
  - login success/failure rates
  - MFA challenges
  - lockout events
- RBAC:
  - deny events (counts + paths)
  - cross-tenant access attempt alerts
- Tickets:
  - time-to-first-response (by tier)
  - reopen rate
- Docs:
  - download counts
  - export generation (P2)
- Performance:
  - web vitals (LCP/INP/CLS)
- Errors:
  - 5xx rate
  - top exceptions

---

## 2) Alerts (starter)
- SEV-1:
  - auth bypass indicator
  - spike in RBAC denies + 500s
  - anomalous doc download patterns
- SEV-2:
  - elevated 5xx
  - degraded p95 latency
- SEV-3:
  - background job failures (P2)

---

## 3) Logging rules
- No secrets
- Redact PII
- Correlation IDs
- Tenant context included safely (orgId)

