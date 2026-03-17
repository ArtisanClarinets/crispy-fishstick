---
Document: SLA_AND_SUPPORT_TERMS
Doc ID: VS-TEMPLATE-COMM-005
Client: [[CLIENT_NAME]]
Project: [[PROJECT_NAME]]
Owner: Legal / Account Management
Contributors: Operations Lead, Technical Lead, Client Stakeholders
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/01_commercial/05_SLA_AND_SUPPORT_TERMS.md
Approvers: [[ACCOUNT_MANAGER]] / [[OPERATIONS_LEAD]] / [[CLIENT_SPONSOR]]
---

# Service Level Agreement and Support Terms

## Purpose
This document defines the **legally binding service level agreements (SLAs)** and **support terms** governing the ongoing relationship between Vantus Systems and [[CLIENT_NAME]]. It establishes measurable performance standards, response time commitments, escalation procedures, and remedies for service failures. Use this document to:
- Set clear expectations for service availability and performance
- Define support tiers and response time commitments
- Establish escalation paths for critical issues
- Document service credit policies for SLA breaches
- Provide transparency into support scope and exclusions

## Instructions
1. **Customization:** Replace all `[[PLACEHOLDERS]]` with project-specific values
2. **Negotiation:** Review and negotiate terms with client before execution
3. **Measurement:** Ensure monitoring systems can measure SLA compliance
4. **Review:** Update annually or when service scope changes
5. **Legal Review:** Have legal counsel review before execution

---

## 1. SERVICE LEVEL AGREEMENTS (SLA)

### 1.1 Service Availability

**Uptime Commitment:**

| Environment | Target Uptime | Measurement Period | Calculation Method |
|---|---|---|---|
| **Production** | 99.9% | Monthly | (Total minutes - Downtime) / Total minutes |
| **Staging** | 99.5% | Monthly | Best effort |
| **Development** | N/A | N/A | No SLA |

**Downtime Definition:**
Downtime is measured when the application is completely unavailable or core functionality is unusable, as confirmed by:
- Automated monitoring alerts (ping tests, health checks)
- Client-reported issues validated by Vantus
- Error rate exceeding 10% for 5+ consecutive minutes

**Excluded from Downtime:**
- Scheduled maintenance windows (with 48-hour advance notice)
- Client-caused issues (configuration errors, resource limits)
- Third-party service failures outside Vantus control
- Force majeure events (natural disasters, internet backbone failures)
- Beta or experimental features

### 1.2 Performance Standards

| Metric | Target | Measurement | Measurement Method |
|---|---|---|---|
| **Page Load Time (P95)** | < 2 seconds | 24/7 | Real User Monitoring (RUM) |
| **API Response Time (P95)** | < 500ms | 24/7 | Server-side timing |
| **Error Rate** | < 0.1% | 24/7 | Application logs |
| **Scheduled Job Success Rate** | > 99% | Per job | Job execution logs |

### 1.3 Service Credit Policy

If Vantus fails to meet the uptime commitment in a given month, Client is entitled to service credits:

| Uptime Achieved | Service Credit | Maximum Credit |
|---:|---:|:---:|
| 99.0% - 99.9% | 10% of monthly fee | 10% |
| 98.0% - 98.99% | 25% of monthly fee | 25% |
| 95.0% - 97.99% | 50% of monthly fee | 50% |
| < 95.0% | 100% of monthly fee | 100% |

**Credit Request Process:**
1. Client submits credit request within 30 days of month end
2. Vantus reviews and validates downtime calculations within 5 business days
3. Credit applied to next invoice or refunded if no further invoices

**Credit Limitations:**
- Maximum credit per month: 100% of monthly fee
- Credits are not cash refunds unless service is terminated
- Credits do not apply to setup fees or one-time charges
- Credits are sole remedy for SLA failures (unless gross negligence)

---

## 2. SUPPORT STRUCTURE

### 2.1 Support Tiers

Vantus offers three support tiers:

#### Tier 1: Basic Support

| Aspect | Details |
|---|---|
| **Availability** | Business hours (9 AM - 5 PM [[TIMEZONE]], Monday-Friday) |
| **Response Time** | P1: 4 hours, P2: 1 business day, P3: 2 business days |
| **Channels** | Email, support portal |
| **Scope** | Defect resolution only |
| **Cost** | Included with support contract |

#### Tier 2: Standard Support

| Aspect | Details |
|---|---|
| **Availability** | Extended hours (7 AM - 7 PM [[TIMEZONE]], Monday-Friday) |
| **Response Time** | P0: 1 hour, P1: 2 hours, P2: 4 hours, P3: 1 business day |
| **Channels** | Email, support portal, phone (business hours) |
| **Scope** | Defect resolution + configuration assistance |
| **Cost** | $[[X]]/month or [[X]]% of monthly recurring |

#### Tier 3: Premium Support

| Aspect | Details |
|---|---|
| **Availability** | 24/7/365 |
| **Response Time** | P0: 30 minutes, P1: 1 hour, P2: 4 hours, P3: 1 business day |
| **Channels** | Email, support portal, phone (24/7), Slack/Teams integration |
| **Scope** | Defect resolution + configuration + minor enhancements |
| **Cost** | $[[X]]/month or [[X]]% of monthly recurring |

### 2.2 Priority Definitions

| Priority | Definition | Examples | Response Time (Premium) |
|:---:|---|---|:---:|
| **P0 - Critical** | Production system down; complete service outage; data loss | Application completely unavailable; database corruption; security breach | 30 minutes |
| **P1 - High** | Major functionality impaired; significant business impact | Core features not working; performance severely degraded; payment processing down | 1 hour |
| **P2 - Medium** | Minor functionality impaired; workaround available | Non-critical features not working; cosmetic issues; documentation errors | 4 hours |
| **P3 - Low** | General questions; enhancement requests; minor issues | How-to questions; feature requests; minor UI issues | 1 business day |

### 2.3 Response vs. Resolution

**Response Time:** Time from ticket creation to initial acknowledgment and triage
**Resolution Time:** Time from ticket creation to fix deployment or acceptable workaround

**Resolution Targets (Best Effort):**

| Priority | Target Resolution | Escalation if Exceeded |
|:---:|---:|---|
| P0 | 4 hours | Executive escalation |
| P1 | 8 hours | Management escalation |
| P2 | 3 business days | Team lead escalation |
| P3 | 10 business days | Queue review |

---

## 3. ESCALATION PROCEDURES

### 3.1 Escalation Path

**Level 1 - Support Engineer:**
- Initial response and triage
- Basic troubleshooting
- Standard fixes and workarounds
- Escalates if unable to resolve within SLA

**Level 2 - Senior Engineer:**
- Complex technical issues
- Architecture and design problems
- Performance optimization
- Escalates if unable to resolve within 2x SLA

**Level 3 - Technical Lead / Architect:**
- Critical system issues
- Design flaws requiring changes
- Coordination with third parties
- Escalates if unable to resolve within 4x SLA

**Level 4 - Management:**
- Executive escalation for chronic issues
- Resource allocation decisions
- Contract and commercial matters
- Client relationship management

### 3.2 Escalation Triggers

| Trigger | Action | Timeline |
|---|---|---|
| P0 issue unresolved after 2 hours | Auto-escalate to Level 3 | Immediate |
| P1 issue unresolved after 4 hours | Escalate to Level 2 | Immediate |
| Any issue unresolved after 2x SLA | Escalate to next level | Automatic |
| Client requests escalation | Escalate one level | Within 1 hour |
| Chronic issues (3+ related tickets) | Management review | Weekly |

### 3.3 Communication During Incidents

| Priority | Initial Update | Progress Updates | Resolution Update |
|:---:|---|---|---|
| P0 | Within 30 minutes | Every 30 minutes | Within 1 hour of resolution |
| P1 | Within 1 hour | Every 2 hours | Within 4 hours of resolution |
| P2 | Within 4 hours | Daily | Within 1 business day of resolution |
| P3 | Within 1 business day | Weekly | Upon resolution |

---

## 4. SCOPE OF SUPPORT

### 4.1 In-Scope Services

Vantus will provide support for:

**Application Support:**
- Defects in delivered code
- Performance issues within defined parameters
- Security vulnerabilities in application code
- Integration failures (Vantus-built integrations)
- Data integrity issues (application-caused)

**Infrastructure Support (if included):**
- Server and container management
- Database administration
- Network configuration
- SSL certificate management
- Backup and recovery operations

**Configuration Support:**
- Environment configuration guidance
- Feature flag and setting management
- User access and permission management

### 4.2 Out-of-Scope Services

The following are **NOT included** in standard support:

| Item | Reason | Alternative |
|---|---|---|
| **Custom Development** | Requires new SOW | Change Order or new project |
| **Third-Party Issues** | Outside Vantus control | Vendor support channels |
| **Client Infrastructure** | Client responsibility | Client IT support |
| **Data Entry or Cleanup** | Operational task | Client operations team |
| **Training** | Separate service | Training engagement |
| **Major Upgrades** | Significant effort | Upgrade project |
| **New Features** | Out of scope | Enhancement request |

### 4.3 Client Responsibilities

Client is responsible for:

- Providing timely access to systems and information needed for support
- Reproducing issues and providing detailed bug reports
- Testing fixes and workarounds in non-production environments
- Maintaining current backups (unless backup service included)
- Keeping systems within supported versions
- Notifying Vantus of changes that may affect the application
- Designating primary and backup contacts for support

---

## 5. SUPPORT PROCESS

### 5.1 Ticket Submission

**Methods:**
- **Support Portal:** [[https://support.vantus.systems]]
- **Email:** [[support@vantus.systems]]
- **Phone:** [[+1-XXX-XXX-XXXX]] (Premium only)
- **Slack/Teams:** Dedicated channel (Premium only)

**Required Information:**
- Priority level (P0-P3)
- Detailed description of issue
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots or error messages
- Environment details (browser, OS, time of issue)
- Impact on business operations

### 5.2 Ticket Lifecycle

```
Submitted → Acknowledged → In Progress → Resolved → Verified → Closed
                ↓                ↓
           Escalated      Pending Client
```

**Status Definitions:**
- **Submitted:** Ticket received; awaiting triage
- **Acknowledged:** Support team has reviewed and assigned priority
- **In Progress:** Actively being worked on
- **Pending Client:** Waiting for information or action from Client
- **Resolved:** Fix deployed or workaround provided
- **Verified:** Client confirms resolution
- **Closed:** Ticket complete

### 5.3 Ticket Metrics

| Metric | Target | Reporting |
|---|---|---|
| First Response Time | Per SLA | Real-time dashboard |
| Resolution Time | Per priority targets | Monthly report |
| Ticket Volume | Track trends | Monthly report |
| Customer Satisfaction | > 90% positive | Post-resolution survey |
| Reopen Rate | < 5% | Monthly report |

---

## 6. MAINTENANCE WINDOWS

### 6.1 Scheduled Maintenance

**Standard Maintenance Window:**
- **Time:** Sundays 2:00 AM - 6:00 AM [[TIMEZONE]]
- **Frequency:** Monthly or as needed
- **Notice:** 48 hours advance notice via email
- **Duration:** Typically 1-2 hours

**Emergency Maintenance:**
- May be performed outside standard windows for critical security patches
- Notice provided as early as possible (minimum 4 hours)

### 6.2 Maintenance Activities

| Activity | Frequency | Duration | Impact |
|---|---|---:|---|
| Security patches | As needed | 30-60 min | Brief restart |
| Database maintenance | Monthly | 1-2 hours | Read-only mode |
| Application updates | Bi-weekly | 15-30 min | Zero downtime |
| Infrastructure updates | Quarterly | 2-4 hours | Brief downtime |

### 6.3 Client Communication

- Maintenance schedule published quarterly
- Reminder sent 48 hours before maintenance
- Status updates during maintenance
- All-clear notification upon completion

---

## 7. SERVICE EXCLUSIONS

### 7.1 Excluded Events

Vantus is not responsible for SLA failures caused by:

**Client Actions:**
- Configuration errors or unauthorized changes
- Failure to follow documented procedures
- Insufficient resources (CPU, memory, storage)
- Network issues within Client's infrastructure
- Use of unsupported browsers or devices

**Third-Party Services:**
- Cloud provider outages (AWS, Azure, GCP)
- CDN failures (Cloudflare, Fastly)
- DNS provider issues
- Third-party API failures (Stripe, SendGrid, etc.)
- Internet backbone failures

**External Factors:**
- Force majeure events (natural disasters, war, pandemic)
- Government actions or regulations
- Cyber attacks (DDoS) exceeding mitigation capacity
- Power failures outside data center control

### 7.2 Unsupported Configurations

Support does not cover:
- Modified or customized code (unless by Vantus)
- Unsupported software versions
- Integration with unsupported third-party systems
- Environments not provisioned by Vantus

---

## 8. SERVICE LEVEL REPORTING

### 8.1 Monthly Reports

Vantus will provide monthly reports including:

- Uptime percentage and downtime incidents
- Performance metrics vs. targets
- Support ticket volume and resolution times
- SLA compliance summary
- Incident summaries and root causes
- Planned maintenance schedule

### 8.2 Real-Time Dashboard

Premium support includes access to:

- Real-time uptime status
- Performance metrics
- Open ticket status
- System health indicators

### 8.3 Quarterly Business Reviews

Quarterly meetings to review:

- SLA performance trends
- Support ticket analysis
- System optimization recommendations
- Capacity planning
- Roadmap alignment

---

## 9. AGREEMENT TERMS

### 9.1 Term and Renewal

**Initial Term:** [[12]] months from [[START_DATE]]
**Renewal:** Automatic renewal for successive [[12]]-month periods unless terminated
**Termination:** Either party may terminate with [[90]] days written notice

### 9.2 Pricing

| Support Tier | Monthly Fee | Annual Fee (10% discount) |
|---:|---:|---:|
| Basic | Included | Included |
| Standard | $[[X]] | $[[X]] |
| Premium | $[[X]] | $[[X]] |

**Payment Terms:** Net 15 days from invoice date

### 9.3 Changes to SLA

- Vantus may update SLA with 60 days advance notice
- Client may terminate without penalty if SLA changes are materially adverse
- Support tier may be upgraded/downgraded with 30 days notice

---

## 10. RELATED DOCUMENTS

| Document | Relationship | Location |
|---|---|---|
| [01_SOW.md](./01_SOW.md) | Master agreement | Current directory |
| [04_OWNERSHIP_PORTABILITY.md](./04_OWNERSHIP_PORTABILITY.md) | Ownership during support | Current directory |
| [01_INCIDENT_RESPONSE_PLAN.md](../07_operations/01_INCIDENT_RESPONSE_PLAN.md) | Incident management procedures | Operations directory |
| [12_SUPPORT_MODEL_AND_ESCALATION.md](../07_operations/12_SUPPORT_MODEL_AND_ESCALATION.md) | Operational support details | Operations directory |
| [08_SLO_SLI_BUDGETS.md](../07_operations/08_SLO_SLI_BUDGETS.md) | SLO definitions and error budgets | Operations directory |

---

## 11. QUALITY CHECKLIST

Before finalizing this document, verify:

- [ ] All `[[PLACEHOLDERS]]` replaced with actual project values
- [ ] Uptime targets are achievable and measurable
- [ ] Support tiers clearly defined with pricing
- [ ] Priority definitions include clear examples
- [ ] Response times are realistic for each tier
- [ ] Escalation procedures are clear and actionable
- [ ] Scope of support is explicitly defined
- [ ] Exclusions are comprehensive
- [ ] Service credit calculations are clear
- [ ] Maintenance windows are acceptable to client
- [ ] Reporting commitments are defined
- [ ] Agreement terms (term, renewal, termination) are clear
- [ ] Related documents cross-referenced
- [ ] Legal counsel has reviewed
- [ ] Version history initialized

---

## 12. CHANGE HISTORY

| Date | Version | Author | Summary |
|---|---:|---|---|
| 2026-02-02 | 1.0.0 | Technical Writer | Complete rewrite with comprehensive SLA framework, three support tiers, escalation procedures, and service credit policies |
| 2026-01-18 | 0.1.0 | Vantus Systems | Initial template creation |

---

*Vantus Systems: Engineering Independence.*
*Last Updated: 2026-02-09 | Version 1.0.0 | Status: Template*
