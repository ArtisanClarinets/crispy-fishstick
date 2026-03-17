
# MONITORING & ALERTING SETUP

**Document ID:** VS-OPS-013
**Version:** 1.0.0
**Effective Date:** January 19, 2026
**Owner:** VP of Operations
**Last Updated:** January 19, 2026

---

## I. PURPOSE & SCOPE

This SOP defines the standards and procedures for setting up monitoring and alerting for all production systems. It applies to all new and existing services.

## II. KEY PRINCIPLES

- **Coverage:** All production systems must have monitoring and alerting in place.
- **Actionability:** Alerts must be actionable and provide clear context.
- **Signal-to-Noise Ratio:** Strive for a high signal-to-noise ratio to avoid alert fatigue.
- **Consistency:** Use a consistent set of tools and configurations for monitoring and alerting.

## III. MONITORING REQUIREMENTS

- **System Metrics:** CPU, memory, disk, network.
- **Application Metrics:** Request rate, error rate, latency (the "Golden Signals").
- **Business Metrics:** User signups, transactions, etc.
- **Log Monitoring:** Centralized logging for all services.

## IV. STEP-BY-STEP PROCEDURE

1.  **Identify Key Metrics:** For each new service, identify the key system, application, and business metrics to monitor.
2.  **Configure Monitoring:** Configure the monitoring agent to collect the identified metrics.
3.  **Create Dashboards:** Create dashboards to visualize the key metrics.
4.  **Configure Alerting:** Configure alerts for metric thresholds that indicate a problem.
5.  **Test Alerts:** Test the alerts to ensure they are working correctly and are routed to the on-call engineer.
6.  **Document Monitoring:** Document the monitoring and alerting setup for the service.

## V. TEMPLATES & CHECKLISTS

- **New Service Monitoring Checklist:** A checklist of monitoring requirements for new services.
- **Alert Configuration Template:** A template for configuring new alerts.

## VI. ESCALATION PATHS

- All alerts are routed to the on-call engineer as defined in `SOP-012-On-Call-Rotation-Escalation.md`.

## VII. DOCUMENT HISTORY

| Version | Date | Changes | Owner |
|---|---|---|---|
| 1.0.0 | January 19, 2026 | Initial version. | VP of Operations |
---
