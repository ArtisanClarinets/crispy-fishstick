# Example - Monthly Scorecard (Fictional Client)
**Client:** ExampleCo (Fictional)  
**Period:** 2026-01-01 to 2026-01-31  
**Scope:** Monitoring + Backup Oversight + Documentation Maintenance  
**Classification:** Internal - example deliverable  
**Publication rule:** Use as a sample structure only; sanitize before external distribution.

## 1) Executive summary
January focused on stabilizing backups and reducing alert noise. No customer-impacting incidents occurred. Two risks remain: a warranty expiration for the firewall and an aging Windows server pending patch window approval.

## 2) What changed
- Tuned disk-capacity alerts to reduce false positives (threshold + duration; documented in tuning log).
- Standardized backup job naming and fixed one intermittent failure on the file server.
- Updated runbook for VPN access and added escalation contacts.

## 3) Incidents & follow-ups
- None customer-impacting this month.

## 4) Signals
### Monitoring
- Availability: No sustained outages detected on in-scope services.
- Capacity: Disk utilization trending upward on `FS-01` (+12% month-over-month). Recommendation: review growth drivers.

### Backup & restore
- Backup health: 1 intermittent failure resolved; all jobs green for the last 14 days.
- Restore verification: scheduled for 2026-02-14 (approved window).

## 5) Metrics (definitions + time windows)
| Metric | Definition | Source | Window | Notes |
|---|---|---|---|---|
| Backup job success rate | % of scheduled jobs completing successfully | Backup console | 2026-01-01..2026-01-31 | 97.8% due to 2 failures early month |
| Alert-to-ticket ratio | Alerts that created tickets / total alerts | Monitoring + ticketing | 2026-01-01..2026-01-31 | Improving after tuning |

## 6) Decisions needed (client)
- Approve patch window for `WIN-SRV-LEGACY` (risk: extended vulnerability aging).
- Decide whether to replace firewall before warranty expiration (90-day window).

## 7) Next actions
- Vantus: run restore verification drill (Owner: Ops) — Due 2026-02-14
- Client: approve patch window (Owner: IT) — Due 2026-02-07
- Vantus: draft firewall replacement project option (Owner: Delivery) — Due 2026-02-10

---

## How to Read This Example

This example shows the structure, tone, and evidence style Vantus expects in a client-ready deliverable.
Treat it as a formatting and communication example, not as a comparative market claim or public benchmark statement.
