# TPL-CARE-002: Change Impact Assessment

**Template ID:** TPL-CARE-002  
**Version:** 3.0.0 (Controlled Template)  
**Reading Level:** 8th Grade  
**Audience:** Small Business Owners  
**Compliance Frameworks:** NIST 800-171, CMMC Level 2, SOC 2, ISO 27001

---

## Why This Template Matters

Use this template to keep scope, evidence, approvals, and client ownership clear.
Do not add unsupported competitor, benchmark, or market-rank claims without dated source support.

---

## What This Template Is

Use this form to evaluate any request that changes your service scope, timeline, or cost. It ensures we understand impacts before work begins—no surprises.

---

## When to Use This Template

| Situation | Example |
|-----------|---------|
| **Scope change** | Adding monitoring to new servers |
| **Timeline change** | Moving quarterly review date |
| **Cost change** | Adding after-hours support |
| **New feature** | Requesting additional security scanning |
| **Service reduction** | Removing backup service |

---

## Change Request Basics

| Field | Your Answer | Notes |
|-------|-------------|-------|
| **Change Summary** | | Brief description of what's changing |
| **Change ID** | CR-XXXX | Auto-assigned |
| **Requested By** | | Name and department |
| **Date Submitted** | | When request was made |
| **Business Reason** | | Why this change is needed |
| **Urgency** | | Critical / High / Normal / Low |
| **Modules Affected** | | Which services impacted |
| **CMMC Control Impact** | | ☐ 3.4.x Configuration ☐ 3.13.x Boundary |
| **Evidence Required** | | ☐ Screenshot ☐ Config backup ☐ Test results |

---

## Type of Change

Select one:

| Type | Definition | Typical Process |
|------|------------|-----------------|
| **In-Scope** | Already covered by current agreement | Schedule and execute |
| **Add-On** | New service, additional fee | Quote, approve, execute |
| **Project** | Major change requiring new SOW | Create project agreement |
| **Decline** | Out of policy or not feasible | Explain why |

**This change is:** ☐ In-Scope ☐ Add-On ☐ Project ☐ Decline

---

## Impact Assessment

Evaluate effects in each area:

### Schedule Impact

| Question | Answer | Notes |
|----------|--------|-------|
| Timeline change? | Yes / No | |
| Additional days needed? | | |
| Dependencies affected? | | |
| Milestones shifted? | | |

### Cost Impact

| Question | Answer | Notes |
|----------|--------|-------|
| Additional cost? | Yes / No | |
| One-time cost? | $ | |
| Monthly cost increase? | $ | |
| Cost savings? | $ | |

### Risk Impact

| Question | Answer | Notes |
|----------|--------|-------|
| New security risks? | Yes / No | |
| New failure modes? | | |
| More complex? | Yes / No | |
| Coordination needed? | | |

### Service Impact

| Question | Answer | Notes |
|----------|--------|-------|
| Downtime required? | Yes / No | |
| User impact? | | |
| Performance change? | | |
| Other services affected? | | |

---

## Security Assessment (CMMC/NIST 800-171 Aligned)

| CMMC Control | Control Description | Impact Level | Evidence Required |
|--------------|---------------------|--------------|-------------------|
| **3.4.2** | Baseline configurations | ☐ None ☐ Low ☐ Med ☐ High | |
| **3.4.5** | Least functionality | ☐ None ☐ Low ☐ Med ☐ High | |
| **3.4.9** | Configuration change control | ☐ None ☐ Low ☐ Med ☐ High | |
| **3.13.1** | Boundary protection | ☐ None ☐ Low ☐ Med ☐ High | |
| **3.13.2** | Security architecture | ☐ None ☐ Low ☐ Med ☐ High | |
| **3.14.1** | Flaw remediation | ☐ None ☐ Low ☐ Med ☐ High | |

### Security Impact Areas

| Area | Impact Level | Industry Standard | Vantus Standard | Details |
|------|--------------|-------------------|-----------------|---------|
| **Threat Exposure** | ☐ None ☐ Low ☐ Med ☐ High | Often skipped | Mandatory assessment | |
| **Access Controls** | ☐ None ☐ Low ☐ Med ☐ High | Post-incident review | Pre-change assessment | |
| **Data Handling** | ☐ None ☐ Low ☐ Med ☐ High | Generic policy | Change-specific review | |
| **Incident Response** | ☐ None ☐ Low ☐ Med ☐ High | Ad-hoc | Documented in advance | |

---

## Options Considered

| Option | Pros | Cons | Recommendation |
|--------|------|------|----------------|
| **Option 1** | | | |
| **Option 2** | | | |
| **Option 3** | | | |

---

## Recommendation

| Decision | Recommended By | Date | Conditions |
|----------|----------------|------|------------|
| ☐ Approve | | | |
| ☐ Delay / Hold | | | Until: |
| ☐ Decline | | | Reason: |

---

## If Approved: Implementation Plan

| Task | Owner | Target Date | Status | Evidence Attached |
|------|-------|-------------|--------|-------------------|
| | | | ☐ Not Started ☐ In Progress ☐ Complete | |
| | | | | |
| | | | | |

### Rollback Plan (Required)

| Rollback Trigger | Automatic Threshold |
|------------------|---------------------|
| Performance degradation | > 20% from baseline |
| Error rate increase | > 5% from baseline |
| User complaints | > 3 within 1 hour |
| Security alert | Any critical alert |

| Rollback Step | Owner | Time Required | Verification |
|---------------|-------|---------------|--------------|
| 1. | | minutes | |
| 2. | | minutes | |
| 3. | | minutes | |

### Validation Checkpoints

How we'll confirm success:

| Checkpoint | How We'll Verify | Date |
|------------|------------------|------|
| | | |
| | | | |

### Communication Plan

Who needs to know:

| Audience | Message | When | How |
|----------|---------|------|-----|
| Internal Team | | | |
| Client Contacts | | | |
| Vendors | | | |

---

## Evidence & Attachments

Supporting documents:

| Document | Description | Link/Location | CMMC Evidence |
|----------|-------------|---------------|---------------|
| | | | ☐ 3.4.9 Change record |
| | | | ☐ 3.12.2 Plan/procedure |
| | | | ☐ 3.14.2 SIEM integration |
| | | | |

### Proof of Testing

| Test Type | Performed By | Date | Result | Evidence |
|-----------|--------------|------|--------|----------|
| Functional test | | | ☐ Pass ☐ Fail | |
| Security scan | | | ☐ Pass ☐ Fail | |
| Performance baseline | | | ☐ Pass ☐ Fail | |
| User acceptance | | | ☐ Pass ☐ Fail | |

### CMMC Compliance Evidence

| Requirement | Evidence Type | Status | Location |
|-------------|---------------|--------|----------|
| Change approved before implementation | Approval signatures | ☐ | |
| Security impact assessed | Security assessment above | ☐ | |
| Rollback plan documented | Rollback section above | ☐ | |
| Post-change testing performed | Proof of testing table | ☐ | |
| Change record maintained | This document | ☐ | |

---

## Approvals

| Role | Name | Approved | Date | Signature |
|------|------|----------|------|-----------|
| **Requester** | | ☐ | | |
| **Account Manager** | | ☐ | | |
| **Delivery Lead** | | ☐ | | |
| **Security Lead** | | ☐ | | (if security impact) |
| **Client Decision Maker** | | ☐ | | |

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 3.0.0 | 2026-02-21 | Program Team | Added: Industry comparison, CMMC control mapping, rollback plan requirements, proof of testing section, evidence requirements, quantified metrics |
| 2.0.0 | 2026-02-01 | Program Team | Initial launch version |
| 1.0 | | | Initial assessment |
| | | | |

---

## Key Terms Explained

| Term | Simple Definition |
|------|-------------------|
| **Scope Change** | Modification to what's included in service |
| **Add-On** | Additional service with extra cost |
| **SOW** | Statement of Work—service agreement |
| **Impact Assessment** | Evaluation of change effects |
| **Dependencies** | Things that rely on other things |
| **Milestone** | Key date or achievement |
| **CMMC** | Cybersecurity Maturity Model Certification |
| **Rollback** | Reverting a change to previous state |
| **Evidence** | Proof that change was properly managed |
| **Baseline** | Measurement of system before change |
| **Audit Trail** | Documented history of changes and approvals |

---

## SEO Keywords

IT change management, scope change request, managed IT change process, business technology changes, IT service modification, change impact analysis, technology change request, IT scope adjustment, service change assessment, business system changes, CMMC change control, NIST 800-171 configuration management, ITIL change management, authorized change process, change rollback plan, security impact assessment, documented change control, audit-ready change management

---

## Quick Reference

**Need approval fast?** Include:
1. What changed (specifically)
2. Why it matters (business reason)
3. What it costs (time and money)
4. What could go wrong (risks)
5. Who approved (signatures)

---

*Last Updated: 2026-02-21 | Version 3.0.0 | Template for Vantus Care | Controlled Template*
