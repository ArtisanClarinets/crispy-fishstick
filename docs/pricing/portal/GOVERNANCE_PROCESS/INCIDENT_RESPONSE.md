# Portal Documentation — INCIDENT_RESPONSE
**Version:** 1.2.0  
**Last Updated:** 2026-02-21  
**Applies to:** Portal + portal data  
**Rule:** No timelines in this document.

---

## 1) Severity levels
- SEV0: confirmed data exposure or active compromise
- SEV1: major outage or high-risk vulnerability with plausible exploitation
- SEV2: partial outage/degradation
- SEV3: minor incident

---

## 2) Roles
- Incident Commander (IC)
- Security Lead
- Ops Lead
- Comms Lead
- Scribe

---

## 3) Lifecycle
1) Detect
2) Triage (scope, severity)
3) Contain (disable features, revoke sessions)
4) Eradicate (patch, rotate secrets)
5) Recover (verify integrity, restore service)
6) Postmortem (root cause + prevention actions)

---

## 4) Communications (safe)
- status updates: plain language, no exploit details during active threat
- notify affected orgs with actionable steps if needed
- preserve evidence before cleanup

---

## 5) Playbooks (minimum)
- Credential compromise
- Suspected cross-tenant access (treat as SEV0 until disproven)
- Malicious upload discovered
- Export abuse/exfil suspicion
- Stripe webhook anomalies
- Abuse/DDoS/rate limit escalation