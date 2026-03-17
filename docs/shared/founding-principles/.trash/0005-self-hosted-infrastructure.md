# ADR-0005: Self-Hosted Infrastructure as Default

**Document ID:** ADR-0005  
**Status:** Accepted  
**Date:** 2026-02-01  
**Owners:** Dylan Thompson (Founder/CTO)  
**Context:** All Vantus client deployments  
**Stakeholders:** DevOps, clients, compliance team  

---

## Summary

### Problem Statement
Cloud providers offer convenience but create vendor lock-in, unpredictable costs, and data control concerns. Our clients need infrastructure they own and control.

### Decision
We default to **self-hosted infrastructure** on standard VPS or dedicated servers. Cloud services used only when specifically justified.

### Impact
High — affects hosting costs, operational procedures, and client relationships.

---

## Context

### Background
Vantus stands for "Client-Owned Infrastructure." This means clients own their systems completely. Self-hosting is the ultimate expression of this value.

### Goals
- Clients own their infrastructure outright.
- Predictable costs (no surprise bills).
- Data ownership (data stays where client chooses).
- No vendor lock-in (can migrate to any host).
- Full control over security and compliance.

### Constraints
- Must be manageable by small teams.
- Must support backup and disaster recovery.
- Must be cost-competitive with cloud for small-medium workloads.
- Must have managed service fallbacks for complex needs.

---

## Decision

### What We Decided
All Vantus infrastructure defaults to self-hosted on standard Linux VPS (Hetzner, DigitalOcean, etc.).

**Stack:**
- Linux (Ubuntu LTS)
- Docker for containerization
- NGINX for reverse proxy
- PostgreSQL for database
- Automated backups to S3-compatible storage

### Exceptions
Cloud services may be used for:
- Object storage (S3, Backblaze B2) — data remains portable
- CDN (Cloudflare) — can be replaced
- DNS (Cloudflare) — standard protocol, portable

### Why This Decision

| Factor | How Self-Hosting Addresses It |
|--------|------------------------------|
| **Ownership** | Client owns everything, full control. |
| **Cost** | Predictable monthly bills, no usage surprises. |
| **Performance** | Dedicated resources, no noisy neighbors. |
| **Privacy** | Data stays under client's control. |
| **Lock-in** | Can migrate to any VPS provider in hours. |
| **Compliance** | Easier to meet data residency requirements. |

---

## Options Considered

### Option 1: Self-Hosted VPS (Selected)

**Description:** Virtual private servers on standard hosts (Hetzner, DO, etc.).

**Pros:**
- Full control and ownership.
- Predictable costs.
- No vendor lock-in.
- Better performance per dollar.
- Supports our client ownership message.

**Cons:**
- More operational overhead (mitigated by automation).
- Requires Linux/DevOps expertise.
- Scaling requires manual intervention (auto-scaling possible).

**Verdict:** Selected

---

### Option 2: AWS/GCP/Azure

**Description:** Major cloud providers.

**Pros:**
- Managed services reduce operational burden.
- Auto-scaling capabilities.
- Enterprise credibility.
- Extensive service catalog.

**Cons:**
- Vendor lock-in (proprietary services).
- Unpredictable costs (egress fees, API calls).
- Complex pricing models.
- Data ownership concerns.

**Verdict:** Rejected — contradicts our client ownership values.

---

### Option 3: Platform-as-a-Service (Vercel, Heroku, etc.)

**Description:** Managed platforms for application deployment.

**Pros:**
- Extremely easy deployment.
- Built-in scaling.
- Zero infrastructure management.

**Cons:**
- Complete vendor lock-in.
- Limited customization.
- Expensive at scale.
- Clients cannot replicate the environment.

**Verdict:** Rejected — violates core client ownership principle.

---

## Consequences

### Positive
- Clients fully own their infrastructure.
- Predictable monthly costs.
- No surprise bills.
- Easy to migrate between providers.
- Strong differentiation from competitors.

### Negative
- Higher initial setup complexity.
- Requires DevOps expertise on team.
- Client must understand basic server management (or buy Care).

### Neutral / Changes Required
- Create infrastructure automation (Terraform/Ansible).
- Document self-hosting procedures.
- Build monitoring for self-hosted systems.
- Create migration guides between hosts.

---

## Implementation Plan

### Phase 1: Standard Stack
- **Deliverable:** Documented standard server stack.
- **Owner:** DevOps.
- **Timeline:** 2026-02-15.

### Phase 2: Automation
- **Deliverable:** Terraform configs for standard deployments.
- **Owner:** DevOps.
- **Timeline:** 2026-03-31.

### Phase 3: Monitoring
- **Deliverable:** Self-hosted monitoring stack (Grafana, Prometheus).
- **Owner:** DevOps.
- **Timeline:** 2026-04-30.

---

## Rollback Plan

### When to Rollback
If client specifically requires cloud (enterprise mandate, existing credits).

### How to Rollback
1. Document exception rationale.
2. Design for cloud while maintaining portability.
3. Use infrastructure-as-code for easy migration.

---

## Monitoring and Review

### Success Metrics
- 90%+ of deployments on self-hosted infrastructure.
- Average deployment cost lower than equivalent cloud.
- Client satisfaction with ownership model.

### Review Schedule
- **Initial review:** 2026-05-01 (90 days).
- **Regular review:** Semi-annually.

---

## References

- [Hetzner Cloud](https://www.hetzner.com/cloud)
- [DigitalOcean](https://www.digitalocean.com/)
- [12-Factor App](https://12factor.net/)

---

## Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| **Decision Owner** | Dylan Thompson | 2026-02-01 | ✓ |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-01 | Dylan Thompson | Initial acceptance |
| 1.1 | 2026-02-21 | Dylan Thompson | Terminology alignment: replaced "owner-controlled systems" with "ownership" and "client control" language |

[End of ADR-0005]


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
