# Vantus Systems — Partner & Vendor Standards

**Document ID:** VS-VENDOR-001  
**Version:** 1.1.0  
**Effective Date:** February 2, 2026  
**Audience:** Procurement, Engineering, Leadership  
**Owner:** Dylan Thompson, Founder & CEO  

---

## Purpose

We work with partners and vendors who share our values. This document defines the standards we expect from anyone who provides services or products to Vantus Systems or our clients.

---

## Our Partner Philosophy

We do not view vendors as mere suppliers. We view them as extensions of our team. Their work reflects on us. Their failures become our failures.

**We choose partners who:**
- Deliver quality that meets or exceeds the Vantus Standard.
- Communicate transparently and honestly.
- Respect our clients' ownership rights and data.
- Are financially stable and ethically operated.

---

## Vendor Categories

### Tier 1: Strategic Partners
Long-term relationships integral to our business.

**Examples:** Cloud providers, security vendors, compliance auditors.

**Requirements:**
- Annual security assessments.
- Quarterly business reviews.
- Dedicated account management.
- Financial stability (3+ years in business or VC-backed).

### Tier 2: Operational Vendors
Day-to-day service providers.

**Examples:** Software subscriptions, tooling, hosting.

**Requirements:**
- SOC 2 Type II or equivalent.
- 99.9% uptime SLA minimum.
- 24/7 support for critical issues.
- Data residency options (for international clients).

### Tier 3: Project-Based Contractors
Short-term engagements for specific needs.

**Examples:** Designers, copywriters, specialized consultants.

**Requirements:**
- Portfolio of comparable work.
- Professional references.
- Signed NDA and confidentiality agreement.
- Clear deliverables and timeline.

---

## Security Requirements

All vendors with access to client data or systems must meet these minimums:

### Data Protection
- Encryption at rest (AES-256 or equivalent).
- Encryption in transit (TLS 1.3 or equivalent).
- Data retention limits (delete when no longer needed).
- No third-party sharing without consent.

### Access Controls
- Multi-factor authentication required.
- Role-based access control (least privilege).
- Access logs retained for 90 days minimum.
- Immediate revocation upon termination.

### Compliance
- SOC 2 Type II (preferred) or Type I (minimum).
- GDPR compliance (for EU data).
- Business Associate Agreement (for HIPAA data).
- Annual third-party security assessment.

### Incident Response
- 24-hour breach notification.
- Root cause analysis provided.
- Remediation plan within 48 hours.
- Insurance coverage for cyber incidents.

---

## Vendor Evaluation Process

### Step 1: Initial Screening
- Request security documentation.
- Verify business registration and insurance.
- Check references (minimum 3).
- Review financial stability.

### Step 2: Security Assessment
- Complete security questionnaire.
- Review SOC 2 report or equivalent.
- Conduct penetration test (for Tier 1).
- Verify compliance certifications.

### Step 3: Business Review
- Evaluate pricing and contract terms.
- Assess technical capabilities.
- Review support and SLAs.
- Check cultural fit.

### Step 4: Trial Period
- Small initial engagement.
- Evaluate quality and communication.
- Gather feedback from team.
- Decide on ongoing relationship.

### Step 5: Ongoing Monitoring
- Annual security re-assessment.
- Quarterly performance reviews.
- Continuous monitoring for incidents.
- Contract renewal evaluation.

---

## Prohibited Vendor Practices

We will not work with vendors who:

1. **Lock in clients:** Require proprietary formats or difficult migrations.
2. **Hide costs:** Surprise fees or opaque pricing.
3. **Sell data:** Use client data for advertising or sales.
4. **Ignore security:** No security program or recent breaches unaddressed.
5. **Have poor labor practices:** Exploitative wages or working conditions.
6. **Conflict with our values:** Discriminatory practices or unethical behavior.

---

## Client-Facing Vendor Policy

When we recommend a vendor to clients:

### Requirements
- We have used them successfully for 6+ months.
- They meet all security requirements above.
- We disclose any referral fees or partnerships.
- Client maintains direct relationship and control.

### Prohibited
- Requiring clients to use specific vendors.
- Taking kickbacks without disclosure.
- Recommending vendors we have not vetted.

---

## Vendor Scorecard

We evaluate ongoing vendors quarterly:

| Category | Weight | Criteria |
|----------|--------|----------|
| **Quality** | 30% | Deliverables meet standards, few bugs |
| **Reliability** | 25% | Uptime, on-time delivery, responsive |
| **Security** | 25% | No incidents, current certifications |
| **Value** | 15% | Fair pricing, no hidden costs |
| **Relationship** | 5% | Communication, partnership attitude |

**Score Interpretation:**
- 90–100: Exceptional partner
- 80–89: Good partner, minor improvements needed
- 70–79: Acceptable, improvement plan required
- Below 70: Relationship at risk

---

## Contract Requirements

All vendor agreements must include:

### Data Protection
- Data processing agreement (DPA).
- Right to audit security practices.
- Data deletion requirements on termination.

### Service Levels
- Uptime guarantees with credits for breaches.
- Response time commitments.
- Escalation paths.

### Termination
- 30-day termination for convenience (us).
- Immediate termination for security breach.
- Data return/destruction procedures.

### Liability
- Appropriate insurance coverage.
- Liability caps that make sense for the engagement.
- Indemnification for security breaches.

---

## Approved Vendor List

### Cloud Infrastructure
- **Primary:** Hetzner, DigitalOcean, AWS (when required)
- **CDN:** Cloudflare
- **Storage:** Backblaze B2, AWS S3

### Security
- **Secrets Management:** 1Password, HashiCorp Vault
- **Monitoring:** Datadog, Grafana Cloud
- **Penetration Testing:** Third-party vendors (rotated annually)

### Productivity
- **Communication:** Slack, Zoom
- **Project Management:** Linear, Notion
- **Documentation:** Notion, GitBook

### Development
- **Version Control:** GitHub
- **CI/CD:** GitHub Actions
- **Design:** Figma

*Note: This list is not exclusive. New vendors may be added after proper vetting.*

---

## Vendor Onboarding Checklist

- [ ] Security questionnaire completed.
- [ ] SOC 2 or equivalent reviewed.
- [ ] References checked.
- [ ] Contract signed (including DPA).
- [ ] Insurance certificates received.
- [ ] Team access provisioned (least privilege).
- [ ] Security training completed (if applicable).
- [ ] Emergency contacts documented.

---

## Vendor Offboarding Checklist

- [ ] Access revoked (all systems).
- [ ] Data returned or destroyed (verified).
- [ ] Final invoice paid.
- [ ] Lessons learned documented.
- [ ] Alternative vendor identified (if ongoing need).

---

---

## Document Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Feb 2, 2026 | Initial document |
| 1.1.0 | Feb 21, 2026 | Terminology update: Replaced "owner-controlled systems" with "ownership rights" in partner philosophy section |

---

**Questions about vendor standards?** Contact: procurement@vantus.systems

[End of Document VS-VENDOR-001]


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
