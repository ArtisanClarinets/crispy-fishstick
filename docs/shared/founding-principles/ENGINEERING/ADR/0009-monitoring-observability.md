# ADR-0009: Monitoring and Observability Stack

**Document ID:** ADR-0009  
**Status:** Accepted  
**Date:** 2026-02-04  
**Owners:** Dylan Thompson (Founder/CTO), Operations Lead  
**Context:** All Vantus production infrastructure  
**Stakeholders:** Engineering, Operations, Clients  
**Supersedes:** N/A (renumbered from ADR-0008 to resolve collision)

---

## Summary

### Problem Statement

We cannot manage what we cannot see. We need comprehensive monitoring, alerting, and observability for all systems we deploy.

### Decision

We standardize on a **self-hosted monitoring stack** using Grafana, Prometheus, and Loki for observability.

### Impact

High — affects how we detect issues, respond to incidents, and demonstrate reliability to clients.

---

## Context

### Background

Our clients depend on our systems for their business. We need to:

- Detect issues before clients do.
- Respond quickly to incidents.
- Provide transparency through dashboards.
- Learn from failures to prevent recurrence.

### Goals

- Self-hosted (client-owned infrastructure principle).
- Open-source (no vendor lock-in).
- Cost-effective for small deployments.
- Scalable to large deployments.
- Easy to configure and maintain.

### Constraints

- Must work with Docker containers.
- Must support PostgreSQL monitoring.
- Must have alerting capabilities.
- Must support log aggregation.

---

## Decision

### What We Decided

All Vantus production deployments include a monitoring stack:

**Core Stack:**

- **Prometheus:** Metrics collection and storage
- **Grafana:** Visualization and dashboards
- **Loki:** Log aggregation
- **AlertManager:** Alert routing and management
- **Node Exporter:** System metrics
- **PostgreSQL Exporter:** Database metrics

**Cloud Alternative (when self-hosting not feasible):**

- Grafana Cloud (managed, but data exportable)

### Why This Decision

| Factor          | How This Stack Addresses It          |
| --------------- | ------------------------------------ |
| **Ownership**   | Self-hosted, data under our control. |
| **Cost**        | Open-source, free for any scale.     |
| **Capability**  | Industry-standard, proven at scale.  |
| **Integration** | Works with everything we use.        |
| **Alerting**    | Flexible alert rules and routing.    |

---

## Options Considered

### Option 1: Grafana + Prometheus + Loki (Selected)

**Description:** Open-source observability stack.

**Pros:**

- Fully open-source.
- Industry standard.
- Excellent visualization (Grafana).
- Powerful query language (PromQL, LogQL).
- Active community.

**Cons:**

- Requires setup and maintenance.
- Storage can grow large (needs management).
- Learning curve for query languages.

**Verdict:** Selected

---

### Option 2: Datadog

**Description:** Commercial monitoring SaaS.

**Pros:**

- Excellent features.
- Easy setup.
- Great integrations.
- Managed service.

**Cons:**

- Expensive at scale.
- Vendor lock-in (data hard to export).
- Proprietary agents.

**Verdict:** Rejected — violates client ownership principle.

---

### Option 3: New Relic

**Description:** Commercial APM and monitoring.

**Pros:**

- Strong APM features.
- Good for complex applications.

**Cons:**

- Expensive.
- Vendor lock-in.
- Overkill for most of our use cases.

**Verdict:** Rejected — too expensive, vendor lock-in.

---

### Option 4: CloudWatch / Stackdriver

**Description:** Native cloud monitoring (AWS/GCP).

**Pros:**

- Integrated with cloud services.
- No additional setup for cloud deployments.

**Cons:**

- Cloud-specific (lock-in).
- Limited customization.
- Hard to use across multiple clouds.

**Verdict:** Rejected — cloud lock-in, limited flexibility.

---

## Consequences

### Positive

- Full control over monitoring data.
- Consistent stack across all deployments.
- Cost-effective (open-source).
- Portable between hosting providers.

### Negative

- Operational overhead (setup, maintenance).
- Learning curve for query languages.
- Storage management required.

### Neutral / Changes Required

- Create standard dashboards.
- Set up alert rules.
- Document monitoring procedures.

---

## Implementation Plan

### Phase 1: Basic Setup

- **Deliverable:** Monitoring deployed with all new projects.
- **Owner:** Operations team.
- **Timeline:** Immediate (2026-02-04).

### Phase 2: Standardization

- **Deliverable:** Standard dashboards for common services.
- **Owner:** Operations team.
- **Timeline:** 2026-03-15.

### Phase 3: Alerting

- **Deliverable:** Alert rules and runbooks.
- **Owner:** Operations team.
- **Timeline:** 2026-04-01.

---

## Rollback Plan

### When to Rollback

If maintenance burden becomes unacceptable or managed alternative is required by client.

### How to Rollback

1. Export historical data.
2. Evaluate managed alternatives.
3. Migrate monitoring to alternative.

---

## Monitoring and Review

### Success Metrics

- Monitoring deployed on 100% of production systems.
- Mean time to detect (MTTD) < 5 minutes.
- All critical services have alerting.

### Review Schedule

- **Initial review:** 2026-05-04 (90 days).
- **Regular review:** Semi-annually.

---

## References

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [Loki Documentation](https://grafana.com/docs/loki/)
- `../../OPS/OPERATIONS_PLAYBOOK.md`
- [ADR-0008: Grafana Stack for Monitoring](0008-grafana-monitoring.md) — Related decision

---

## Approval

| Role                  | Name            | Date       | Signature |
| --------------------- | --------------- | ---------- | --------- |
| **Decision Owner**    | Dylan Thompson  | 2026-02-04 | ✓         |
| **Operations Review** | Operations Lead | 2026-02-04 | ✓         |

---

## Change Log

| Version | Date       | Author         | Changes                                                                                                   |
| ------- | ---------- | -------------- | --------------------------------------------------------------------------------------------------------- |
| 1.0     | 2026-02-04 | Dylan Thompson | Initial acceptance                                                                                        |
| 1.1     | 2026-02-21 | Dylan Thompson | Terminology alignment: replaced "owner-controlled systems" with "ownership" and "client control" language |
| 1.2     | 2026-02-22 | Agent          | Renumbered from ADR-0008 to ADR-0009 to resolve collision with 0008-grafana-monitoring.md                 |

[End of ADR-0009]

## Sync Notes

- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
