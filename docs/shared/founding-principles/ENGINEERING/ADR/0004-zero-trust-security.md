# ADR-0004: Zero-Trust Security Model

**Document ID:** ADR-0004  
**Status:** Accepted  
**Date:** 2026-01-30  
**Owners:** Dylan Thompson (Founder/CTO), Security Team  
**Context:** All Vantus applications and infrastructure  
**Stakeholders:** All engineers, operations, clients  

---

## Summary

### Problem Statement
Traditional "perimeter security" assumes internal network traffic is safe. This is no longer valid with remote work, cloud services, and sophisticated threats.

### Decision
We implement a **Zero-Trust Security Model** — trust nothing, verify everything, everywhere.

### Impact
Critical — affects authentication, authorization, network design, and operational procedures.

---

## Context

### Background
The old model: "Trust internal network, verify external only." This fails when:
- An attacker breaches the perimeter.
- A trusted insider acts maliciously.
- Credentials are stolen.

### Goals
- Assume breach — limit blast radius.
- Verify every request, every time.
- Least privilege access (minimum necessary).
- Comprehensive audit logging.
- No implicit trust based on network location.

### Constraints
- Must not degrade user experience significantly.
- Must work with our self-hosting model.
- Must be auditable for compliance.

---

## Decision

### What We Decided
All Vantus systems implement Zero-Trust principles:

1. **Identity Verification:** Every request authenticated.
2. **Least Privilege:** Minimum access necessary.
3. **Assume Breach:** Segment networks, monitor continuously.
4. **Verify Explicitly:** AuthZ checks at every layer.
5. **Audit Everything:** Log all access and changes.

### Implementation

| Layer | Zero-Trust Measure |
|-------|-------------------|
| **Network** | Micro-segmentation, mTLS where possible |
| **Application** | AuthN/AuthZ on every endpoint |
| **Database** | Row-level security, connection limits |
| **Infrastructure** | No root SSH, key-based auth only |
| **Human** | MFA required, principle of least privilege |

---

## Options Considered

### Option 1: Zero-Trust (Selected)

**Description:** Verify everything, trust nothing implicitly.

**Pros:**
- Most secure approach.
- Industry best practice.
- Limits breach impact.
- Supports remote work securely.

**Cons:**
- More complex to implement.
- Slightly higher latency (auth checks).
- Requires discipline in implementation.

**Verdict:** Selected

---

### Option 2: Traditional Perimeter Security

**Description:** Trust internal network, protect perimeter only.

**Pros:**
- Simpler to implement.
- Lower latency for internal requests.

**Cons:**
- Single point of failure (perimeter).
- No protection if perimeter breached.
- Outdated for cloud/remote work.

**Verdict:** Rejected — insufficient for modern threats.

---

### Option 3: Hybrid Model

**Description:** Zero-trust for external, perimeter for internal.

**Pros:**
- Balance of security and convenience.
- Gradual migration path.

**Cons:**
- Complexity of two models.
- False sense of security internally.

**Verdict:** Rejected — adds complexity without enough benefit.

---

## Consequences

### Positive
- Strongest security posture.
- Compliance alignment (SOC 2, ISO 27001).
- Reduced blast radius if breached.
- Clear audit trail.

### Negative
- Implementation complexity.
- Slight performance overhead (mitigated by caching).
- All engineers must understand security model.

### Neutral / Changes Required
- Update SECURITY_BASELINE.md with zero-trust details.
- Implement MFA across all systems.
- Set up centralized logging.
- Train team on zero-trust principles.

---

## Implementation Plan

### Phase 1: Authentication
- **Deliverable:** MFA required for all admin accounts.
- **Owner:** Security team.
- **Timeline:** 2026-02-15.

### Phase 2: Authorization
- **Deliverable:** Role-based access control everywhere.
- **Owner:** Engineering.
- **Timeline:** 2026-03-31.

### Phase 3: Network Segmentation
- **Deliverable:** Micro-segmentation for production.
- **Owner:** DevOps.
- **Timeline:** 2026-04-30.

### Phase 4: Monitoring
- **Deliverable:** Centralized logging and alerting.
- **Owner:** Security team.
- **Timeline:** 2026-05-31.

---

## Rollback Plan

### When to Rollback
Security model changes are rarely rolled back. Adjustments made through iteration.

### How to Adjust
1. Identify pain points through monitoring.
2. Adjust specific controls (not the whole model).
3. Document lessons learned.

---

## Monitoring and Review

### Success Metrics
- Zero unauthorized access incidents.
- All access logged and auditable.
- Mean time to detect (MTTD) breaches: < 1 hour.

### Review Schedule
- **Initial review:** 2026-04-30 (90 days).
- **Regular review:** Quarterly.

---

## References

- [NIST Zero Trust Architecture](https://www.nist.gov/publications/zero-trust-architecture)
- [Google BeyondCorp](https://cloud.google.com/beyondcorp)
- [SECURITY_BASELINE.md](/docs/company-docs/founding-principles/SECURITY/SECURITY_BASELINE.md)

---

## Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| **Decision Owner** | Dylan Thompson | 2026-01-30 | ✓ |
| **Security Review** | Security Team | 2026-01-30 | ✓ |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-30 | Dylan Thompson | Initial acceptance |

[End of ADR-0004]
