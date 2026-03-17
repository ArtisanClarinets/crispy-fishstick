# ADR-0008: Grafana Stack for Monitoring and Observability

**Document ID:** ADR-0008  
**Status:** Accepted  
**Date:** 2026-02-03  
**Owners:** Dylan Thompson (Founder/CTO), Operations Lead  
**Context:** All Vantus production infrastructure  
**Stakeholders:** DevOps, engineers, clients (read-only access)

---

## Summary

### Problem Statement

We need to monitor our infrastructure and applications to detect issues before clients do, understand system behavior, and troubleshoot problems quickly.

### Decision

We standardize on the **Grafana Stack** (Grafana, Prometheus, Loki) for monitoring, metrics, and logging.

### Impact

Medium — affects how we deploy, operate, and troubleshoot systems.

---

## Context

### Background

Without monitoring, we are flying blind. We need visibility into:

- System health (CPU, memory, disk)
- Application performance (response times, error rates)
- Business metrics (active users, transaction volume)
- Logs for debugging

### Goals

- Self-hosted (client-owned infrastructure)
- Cost-effective
- Easy to configure
- Supports alerting
- Good visualization

### Constraints

- Must be open-source
- Must support Docker deployment
- Must integrate with our stack (Next.js, PostgreSQL, NGINX)
- Must allow client access (read-only) for transparency

---

## Decision

### What We Decided

All Vantus production systems use the Grafana Stack:

**Stack:**

- **Grafana:** Visualization and dashboards
- **Prometheus:** Metrics collection and storage
- **Loki:** Log aggregation
- **Node Exporter:** System metrics
- **Alertmanager:** Alert routing

### Why This Decision

| Factor            | How Grafana Stack Addresses It           |
| ----------------- | ---------------------------------------- |
| **Self-hosted**   | Fully open-source, runs anywhere         |
| **Cost**          | No per-host licensing fees               |
| **Integration**   | Native support for our technologies      |
| **Visualization** | Excellent dashboard capabilities         |
| **Alerting**      | Built-in alerting with multiple channels |
| **Community**     | Large ecosystem of exporters and plugins |

---

## Options Considered

### Option 1: Grafana Stack

**Description:** Open-source monitoring stack (Grafana, Prometheus, Loki).

**Pros:**

- Fully open-source
- Industry standard
- Excellent visualization
- Wide integration support
- Active community

**Cons:**

- Self-managed (operational overhead)
- Prometheus can be resource-intensive at scale
- Learning curve for PromQL

**Verdict:** Selected

---

### Option 2: Datadog

**Description:** Commercial monitoring and observability platform.

**Pros:**

- Excellent features
- Easy setup
- Great integrations
- Managed service

**Cons:**

- Expensive (per-host pricing)
- Vendor lock-in
- Data leaves client infrastructure
- Proprietary agents

**Verdict:** Rejected — contradicts client ownership principle.

---

### Option 3: New Relic

**Description:** Commercial APM and monitoring.

**Pros:**

- Strong APM features
- Good for application performance

**Cons:**

- Expensive
- Vendor lock-in
- Data ownership concerns

**Verdict:** Rejected — proprietary, expensive.

---

### Option 4: ELK Stack (Elasticsearch, Logstash, Kibana)

**Description:** Open-source logging and analytics.

**Pros:**

- Powerful for logs
- Open-source
- Good search capabilities

**Cons:**

- Resource-intensive (Elasticsearch)
- Complex to operate
- Overkill for our needs

**Verdict:** Rejected — Grafana/Loki is lighter and sufficient.

---

## Consequences

### Positive

- Full observability into systems
- Self-hosted, no vendor lock-in
- Cost-effective for small-medium deployments
- Clients can have read-only access for transparency

### Negative

- Operational overhead of self-hosting
- Must configure and maintain
- Learning curve for team

### Neutral / Changes Required

- Deploy monitoring stack to all production environments
- Create standard dashboards
- Set up alerting rules
- Train team on usage

---

## Implementation Plan

### Phase 1: Deployment

- **Deliverable:** Monitoring stack deployed to production.
- **Owner:** DevOps.
- **Timeline:** 2026-03-15.

### Phase 2: Dashboards

- **Deliverable:** Standard dashboards for common services.
- **Owner:** DevOps + Engineering.
- **Timeline:** 2026-03-31.

### Phase 3: Alerting

- **Deliverable:** Alert rules for critical issues.
- **Owner:** DevOps.
- **Timeline:** 2026-04-15.

### Phase 4: Client Access

- **Deliverable:** Read-only dashboards for clients.
- **Owner:** DevOps.
- **Timeline:** 2026-04-30.

---

## Rollback Plan

### When to Rollback

If operational burden becomes excessive or client requires different solution.

### How to Rollback

1. Document current setup.
2. Export historical data if needed.
3. Deploy alternative solution.

---

## Monitoring and Review

### Success Metrics

- All production systems monitored.
- Alert response time < 5 minutes.
- MTTR (Mean Time To Recovery) improved.
- Client satisfaction with visibility.

### Review Schedule

- **Initial review:** 2026-05-03 (90 days).
- **Regular review:** Semi-annually.

---

## References

- [Grafana Documentation](https://grafana.com/docs/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Loki Documentation](https://grafana.com/docs/loki/latest/)
- `../../OPS/OPERATIONS_PLAYBOOK.md`

---

## Approval

| Role                  | Name            | Date       | Signature |
| --------------------- | --------------- | ---------- | --------- |
| **Decision Owner**    | Dylan Thompson  | 2026-02-03 | ✓         |
| **Operations Review** | Operations Lead | 2026-02-03 | ✓         |

---

## Change Log

| Version | Date       | Author         | Changes                                                                                                   |
| ------- | ---------- | -------------- | --------------------------------------------------------------------------------------------------------- |
| 1.0     | 2026-02-03 | Dylan Thompson | Initial acceptance                                                                                        |
| 1.1     | 2026-02-21 | Dylan Thompson | Terminology alignment: replaced "owner-controlled systems" with "ownership" and "client control" language |

[End of ADR-0008]

## Sync Notes

- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
