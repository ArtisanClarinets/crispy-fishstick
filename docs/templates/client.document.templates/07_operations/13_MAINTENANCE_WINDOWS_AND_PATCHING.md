---
Document: MAINTENANCE_WINDOWS_AND_PATCHING
Doc ID: VS-TEMPLATE-OPS-013
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: DevOps Engineer
Status: Template
Version: 2.0.0
Last Updated: 2026-01-18
Confidentiality: Client Confidential
Source of Truth: [docs/07_operations/13_MAINTENANCE_WINDOWS_AND_PATCHING.md](docs/07_operations/13_MAINTENANCE_WINDOWS_AND_PATCHING.md)
---

## Purpose
Defines the standard windows for system updates and the policy for vulnerability patching.

## Standard Maintenance Window
- **Day:** Saturday
- **Time Window:** 02:00 AM - 04:00 AM UTC
- **Notification:** Sent to client stakeholders 72 hours in advance.

## Patching Policy
- **Critical (CVE 9.0+):** Patched within 24 hours of release.
- **High (CVE 7.0-8.9):** Patched within 7 days.
- **Medium/Low:** Patched during the next scheduled maintenance window.

## Procedure
1.  Verify patch in **Staging**.
2.  Run automated regression suite.
3.  Deploy to Production during window.
4.  Monitor for 60 minutes.
