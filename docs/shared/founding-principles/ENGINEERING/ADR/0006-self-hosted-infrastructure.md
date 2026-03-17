# ADR-0006: Self-Hosted Infrastructure as Default

**Document ID:** ADR-0006  
**Status:** Accepted  
**Date:** 2026-02-02  
**Owners:** Dylan Thompson (Founder/CTO)  
**Context:** All Vantus client deployments  
**Stakeholders:** Engineering, Operations, Clients

---

## Summary

### Problem Statement

Cloud providers create vendor lock-in through proprietary services. We need an infrastructure approach that ensures clients maintain full ownership and control over their systems.

### Decision

We default to **self-hosted infrastructure** on standard VPS or dedicated servers, avoiding proprietary cloud services that create lock-in.

### Impact

High — affects deployment architecture, operational procedures, and client contracts.

---

## Context

### Background

Our mission is "Client-Owned Infrastructure" — systems clients own, understand, and control. Proprietary cloud services (AWS Lambda, Google Cloud Functions, Azure-specific services) create dependencies that violate this principle.

### Goals

- Clients can move hosting anywhere.
- No proprietary lock-in.
- Predictable costs (no surprise bills).
- Infrastructure is understandable by standard sysadmins.
- Works with our security baseline.

### Constraints

- Must support high availability when required.
- Must be cost-effective for small clients.
- Must support automatic backups and recovery.
- Must allow monitoring and alerting.

---

## Decision

### What We Decided

All Vantus systems deploy on **self-hosted, portable infrastructure**:

**Default Stack:**

- VPS Provider: Hetzner, DigitalOcean, or equivalent (client choice).
- OS: Ubuntu LTS (latest).
- Web Server: NGINX.
- Application: Docker containers or PM2.
- Database: PostgreSQL (self-hosted).
- Cache: Redis (self-hosted).
- Storage: Local SSD or S3-compatible object storage (MinIO, Backblaze).

**When Managed Cloud is Acceptable:**

- Client explicitly requests it.
- Compliance requirement (some HIPAA/SOC 2 auditors prefer AWS).
- Client already has significant cloud investment.

### Why This Decision

| Factor          | How Self-Hosting Addresses It                 |
| --------------- | --------------------------------------------- |
| **Ownership**   | Client can migrate to any provider anytime.   |
| **Cost**        | Predictable monthly costs, no surprise bills. |
| **Simplicity**  | Standard technology any sysadmin understands. |
| **Security**    | Full control over data residency and access.  |
| **Performance** | Dedicated resources, no noisy neighbors.      |

---

## Options Considered

### Option 1: Self-Hosted VPS (Selected)

**Description:** Linux VPS with Docker, standard open-source stack.

**Pros:**

- Full ownership and control.
- Predictable costs.
- Portable anywhere.
- Simple and understandable.

**Cons:**

- Requires more operations knowledge.
- No "magic" scaling (manual or scripted).
- Client responsible for updates (or Vantus Care).

**Verdict:** Selected

---

### Option 2: AWS / GCP / Azure Default

**Description:** Default to major cloud providers with managed services.

**Pros:**

- Automatic scaling.
- Managed services reduce ops burden.
- Familiar to many engineers.

**Cons:**

- Vendor lock-in (proprietary services).
- Unpredictable costs.
- Complex pricing models.
- Harder to migrate away.

**Verdict:** Rejected — violates client ownership principle.

---

### Option 3: Platform-as-a-Service (Heroku, Railway, etc.)

**Description:** Deploy to PaaS for simplicity.

**Pros:**

- Very easy deployment.
- Built-in scaling.
- Low ops overhead.

**Cons:**

- Highest lock-in risk.
- Expensive at scale.
- Limited customization.

**Verdict:** Rejected — too much lock-in, too little control.

---

### Option 4: Kubernetes Everywhere

**Description:** Deploy all apps on Kubernetes.

**Pros:**

- Industry standard for orchestration.
- Portable across clouds.
- Powerful scaling and management.

**Cons:**

- Overkill for most small business apps.
- Steep learning curve.
- High operational complexity.

**Verdict:** Rejected — too complex for typical client needs.

---

## Consequences

### Positive

- True client ownership and control.
- Predictable, reasonable costs.
- Standard technology stack.
- Easy to explain to clients.

### Negative

- Higher initial ops setup (mitigated by templates).
- Need to manage updates and security patches.
- Scaling requires planning (not automatic).

### Neutral / Changes Required

- Create infrastructure-as-code templates (Terraform/Ansible).
- Document deployment procedures.
- Set up monitoring for self-hosted systems.

---

## Implementation Plan

### Phase 1: Templates

- **Deliverable:** Terraform/Ansible templates for standard deployments.
- **Owner:** Platform team.
- **Timeline:** 2026-03-31.

### Phase 2: Documentation

- **Deliverable:** Deployment runbooks.
- **Owner:** Operations team.
- **Timeline:** 2026-04-15.

### Phase 3: Monitoring

- **Deliverable:** Self-hosted monitoring stack (Grafana, Prometheus).
- **Owner:** Operations team.
- **Timeline:** 2026-05-31.

---

## Rollback Plan

### When to Rollback

If a specific client requires cloud-native features (serverless, specific AI services).

### How to Rollback

1. Document specific cloud requirements.
2. Get approval from Dylan Thompson.
3. Use Infrastructure as Code to enable cloud portability.

---

## Monitoring and Review

### Success Metrics

- All new clients on self-hosted infrastructure by default.
- Zero vendor lock-in complaints.
- Deployment time < 2 hours for standard setup.

### Review Schedule

- **Initial review:** 2026-05-02 (90 days).
- **Regular review:** Annually.

---

## References

- `../../OPS/OPERATIONS_PLAYBOOK.md`
- `../../SECURITY/SECURITY_BASELINE.md`
- Terraform Documentation
- Docker Documentation

---

## Approval

| Role               | Name           | Date       | Signature |
| ------------------ | -------------- | ---------- | --------- |
| **Decision Owner** | Dylan Thompson | 2026-02-02 | ✓         |

---

## Change Log

| Version | Date       | Author         | Changes                                                                                                   |
| ------- | ---------- | -------------- | --------------------------------------------------------------------------------------------------------- |
| 1.0     | 2026-02-02 | Dylan Thompson | Initial acceptance                                                                                        |
| 1.1     | 2026-02-21 | Dylan Thompson | Terminology alignment: replaced "owner-controlled systems" with "ownership" and "client control" language |

[End of ADR-0006]

## Sync Notes

- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
