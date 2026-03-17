# TPL-CARE-019: KPI Dictionary

**Template ID:** TPL-CARE-019  
**Version:** 3.0.0 (Controlled Template)  
**Reading Level:** 8th Grade  
**Audience:** Small Business Owners  
**Compliance Frameworks:** NIST 800-171, CMMC Level 2, SOC 2

---

## Why This Template Matters

Use this template to keep scope, evidence, approvals, and client ownership clear.
Do not add unsupported competitor, benchmark, or market-rank claims without dated source support.

---

## What This Template Is

A complete guide to every number we report—what it means, how we calculate it, and why it matters. Ensures everyone understands the metrics and no one can "game" the numbers.

---

## Why KPI Definitions Matter

| Without Clear Definitions | With KPI Dictionary |
|---------------------------|---------------------|
| Confusion about numbers | Everyone understands |
| Inconsistent reporting | Standardized measurement |
| Misleading metrics | Honest, useful data |
| Can't compare periods | Reliable trending |
| Disagreement on success | Clear targets |

---

## Dictionary Information

| Field | Details |
|-------|---------|
| **Business Name** | |
| **Created** | |
| **Last Updated** | |
| **Maintained By** | |
| **Review Frequency** | |
| **Total KPIs Defined** | |

---

## KPI Standards

### Every KPI Must Include:

1. **Name** - Clear, descriptive title
2. **Definition** - What it measures in plain language
3. **Why It Matters** - Business reason for tracking
4. **Formula** - How it's calculated
5. **Data Source** - Where the number comes from
6. **Time Window** - Period covered
7. **Target** - What "good" looks like
8. **Owner** - Who's responsible

### KPI Naming Rules

| Good Name | Bad Name | Why |
|-----------|----------|-----|
| "Server Uptime Percentage" | "Availability" | Specific and clear |
| "Critical Incident Count" | "Problems" | Measurable and defined |
| "Backup Success Rate" | "Backups" | Describes what's measured |

---

## Service Level KPIs

### Uptime & Availability

#### KPI: Server Uptime Percentage

| Attribute | Definition |
|-----------|------------|
| **Name** | Server Uptime Percentage |
| **Definition** | Percentage of time servers are available and responding |
| **Why It Matters** | Measures reliability of critical systems |
| **Formula** | (Total minutes available ÷ Total minutes in period) × 100 |
| **Data Source** | Monitoring system pings every 60 seconds |
| **Time Window** | Monthly (calendar month) |
| **Target** | ≥ 99.9% (43 minutes downtime/month max) |
| **Calculation Example** | 43,860 minutes available ÷ 43,200 minutes = 99.86% |
| **Owner** | VP of Operations |
| **Warning Threshold** | < 99.5% |
| **Critical Threshold** | < 99% |
| **Notes** | Excludes planned maintenance windows |

---

#### KPI: Application Response Time

| Attribute | Definition |
|-----------|------------|
| **Name** | Application Response Time |
| **Definition** | Average time for application to respond to user request |
| **Why It Matters** | User productivity and satisfaction |
| **Formula** | Sum of all response times ÷ Number of requests |
| **Data Source** | Application performance monitoring |
| **Time Window** | Daily average, reported monthly |
| **Target** | ≤ 2 seconds |
| **Owner** | Delivery Lead |
| **Notes** | Measured from user click to screen update |

---

### Incident Management

#### KPI: Mean Time to Respond (MTTR)

| Attribute | Definition |
|-----------|------------|
| **Name** | Mean Time to Respond |
| **Definition** | Average time from incident alert to first human response |
| **Why It Matters** | Shows how quickly we start fixing problems |
| **Formula** | Sum of response times ÷ Number of incidents |
| **Data Source** | Incident ticketing system timestamps |
| **Time Window** | Monthly |
| **Target** | Critical: ≤ 15 minutes, High: ≤ 1 hour |
| **Owner** | Account Manager |
| **Notes** | Response = acknowledgment, not resolution |

---

#### KPI: Mean Time to Resolve (MTTR-Resolve)

| Attribute | Definition |
|-----------|------------|
| **Name** | Mean Time to Resolve |
| **Definition** | Average time from incident start to full resolution |
| **Why It Matters** | Measures how fast we fix problems completely |
| **Formula** | Sum of resolution times ÷ Number of incidents |
| **Data Source** | Incident ticketing system |
| **Time Window** | Monthly |
| **Target** | Critical: ≤ 4 hours, High: ≤ 8 hours, Medium: ≤ 3 days |
| **Owner** | Delivery Lead |
| **Notes** | Resolution = service fully restored |

---

#### KPI: Incident Count by Severity

| Attribute | Definition |
|-----------|------------|
| **Name** | Incident Count by Severity |
| **Definition** | Number of incidents categorized by impact level |
| **Why It Matters** | Shows problem frequency and patterns |
| **Formula** | Count of incidents where severity = [level] |
| **Data Source** | Incident management system |
| **Time Window** | Monthly |
| **Target** | Zero Critical, declining trend overall |
| **Owner** | Security Lead |

**Severity Definitions:**
- **Critical**: Business stopped
- **High**: Major function impaired
- **Medium**: Workaround available
- **Low**: Minor impact

---

### Backup & Recovery

#### KPI: Backup Success Rate

| Attribute | Definition |
|-----------|------------|
| **Name** | Backup Success Rate |
| **Definition** | Percentage of scheduled backups that complete successfully |
| **Why It Matters** | Ensures data protection |
| **Formula** | (Successful backups ÷ Scheduled backups) × 100 |
| **Data Source** | Backup system logs |
| **Time Window** | Weekly, reported monthly |
| **Target** | ≥ 98% |
| **Owner** | VP of Operations |
| **Notes** | "Success" = verified complete backup |

---

#### KPI: Recovery Time Objective (RTO) Achievement

| Attribute | Definition |
|-----------|------------|
| **Name** | RTO Achievement |
| **Definition** | Percentage of restore tests completed within target time |
| **Why It Matters** | Verifies we can recover fast enough |
| **Formula** | (Tests meeting RTO ÷ Total tests) × 100 |
| **Data Source** | Restore drill reports |
| **Time Window** | Quarterly |
| **Target** | 100% |
| **Owner** | Delivery Lead |

---

### Security

#### KPI: Security Patch Compliance

| Attribute | Definition |
|-----------|------------|
| **Name** | Security Patch Compliance |
| **Definition** | Percentage of critical patches applied within SLA |
| **Why It Matters** | Reduces vulnerability exposure |
| **Formula** | (Patches applied on time ÷ Required patches) × 100 |
| **Data Source** | Patch management system |
| **Time Window** | Monthly |
| **Target** | ≥ 95% within 30 days of release |
| **Owner** | Security Lead |
| **Notes** | Critical patches only; excludes exceptions with compensating controls |

---

#### KPI: Vulnerability Aging

| Attribute | Definition |
|-----------|------------|
| **Name** | Vulnerability Aging |
| **Definition** | Average days vulnerabilities remain unpatched |
| **Why It Matters** | Shows security hygiene |
| **Formula** | Sum of (Today - Discovery date) ÷ Number of vulnerabilities |
| **Data Source** | Vulnerability scanner |
| **Time Window** | Monthly |
| **Target** | Critical: ≤ 7 days, High: ≤ 30 days |
| **Owner** | Security Lead |

---

### Service Delivery

#### KPI: Ticket Resolution Time

| Attribute | Definition |
|-----------|------------|
| **Name** | Ticket Resolution Time |
| **Definition** | Average time to close support tickets |
| **Why It Matters** | User satisfaction and productivity |
| **Formula** | Sum of (Close time - Open time) ÷ Number of tickets |
| **Data Source** | Ticketing system |
| **Time Window** | Monthly |
| **Target** | P1: 4 hrs, P2: 1 day, P3: 3 days, P4: 5 days |
| **Owner** | Account Manager |

---

#### KPI: First Contact Resolution Rate

| Attribute | Definition |
|-----------|------------|
| **Name** | First Contact Resolution Rate |
| **Definition** | Percentage of issues resolved on first interaction |
| **Why It Matters** | Efficiency and user satisfaction |
| **Formula** | (Resolved first contact ÷ Total tickets) × 100 |
| **Data Source** | Ticketing system |
| **Time Window** | Monthly |
| **Target** | ≥ 70% |
| **Owner** | Delivery Lead |

---

### Documentation

#### KPI: Documentation Freshness Score

| Attribute | Definition |
|-----------|------------|
| **Name** | Documentation Freshness Score |
| **Definition** | Percentage of critical documents updated within 30 days |
| **Why It Matters** | Ensures accurate procedures |
| **Formula** | (Current docs ÷ Total critical docs) × 100 |
| **Data Source** | Document management system |
| **Time Window** | Monthly |
| **Target** | ≥ 90% |
| **Owner** | Delivery Lead |

---

## Custom KPIs

### [Your Custom KPI Name]

| Attribute | Definition |
|-----------|------------|
| **Name** | |
| **Definition** | |
| **Why It Matters** | |
| **Formula** | |
| **Data Source** | |
| **Time Window** | |
| **Target** | |
| **Owner** | |
| **Notes** | |

---

## KPI Quick Reference

### All KPIs at a Glance

| KPI Name | Category | Target | Owner | Frequency |
|----------|----------|--------|-------|-----------|
| Server Uptime Percentage | Availability | ≥ 99.9% | VP Ops | Monthly |
| Application Response Time | Performance | ≤ 2 sec | Delivery | Monthly |
| Mean Time to Respond | Incident | ≤ 15 min (Critical) | Account Mgr | Monthly |
| Mean Time to Resolve | Incident | ≤ 4 hrs (Critical) | Delivery | Monthly |
| Incident Count by Severity | Incident | Zero Critical | Security | Monthly |
| Backup Success Rate | Recovery | ≥ 98% | VP Ops | Monthly |
| RTO Achievement | Recovery | 100% | Delivery | Quarterly |
| Security Patch Compliance | Security | ≥ 95% | Security | Monthly |
| Vulnerability Aging | Security | ≤ 7 days (Critical) | Security | Monthly |
| Ticket Resolution Time | Service | Varies by priority | Account Mgr | Monthly |
| First Contact Resolution | Service | ≥ 70% | Delivery | Monthly |
| Documentation Freshness | Documentation | ≥ 90% | Delivery | Monthly |

---

## KPI Governance

### Adding New KPIs

| Step | Action | Owner |
|------|--------|-------|
| 1 | Define business need | Requester |
| 2 | Document in this dictionary | Delivery Lead |
| 3 | Approve definition | Program Owner |
| 4 | Implement measurement | Operations |
| 5 | Communicate to stakeholders | Account Manager |

### Retiring KPIs

| Step | Action | Owner |
|------|--------|-------|
| 1 | Document reason for retirement | Owner |
| 2 | Archive historical data | Operations |
| 3 | Communicate change | Account Manager |
| 4 | Update reports | Operations |

### Review Schedule

| Activity | Frequency | Owner |
|----------|-----------|-------|
| Definition accuracy | Quarterly | KPI Owners |
| Target appropriateness | Annually | Program Owner |
| New KPI proposals | As needed | Any stakeholder |
| Full dictionary review | Annually | Program Owner |

---

## Common Pitfalls to Avoid

| Pitfall | Why It's Bad | Solution |
|---------|--------------|----------|
| **Vanity metrics** | Look good but don't matter | Tie to business outcomes |
| **Too many KPIs** | Dilutes focus | Limit to 10-12 key metrics |
| **Moving targets** | Can't trend over time | Change targets only annually |
| **Gaming the metric** | Optimizing for measurement, not reality | Multiple complementary KPIs |
| **Unclear ownership** | No one responsible | Named owner for each KPI |

---

## KPI Report Template

When reporting a KPI, include:

| Element | Example |
|---------|---------|
| **KPI Name** | Server Uptime Percentage |
| **Value** | 99.95% |
| **Target** | ≥ 99.9% |
| **Trend** | ☐ Improving ☐ Stable ☐ Declining |
| **Time Period** | January 2026 |
| **Context** | One planned maintenance window excluded |
| **Owner** | VP of Operations |

---

## Approval

| Role | Name | Approved | Date |
|------|------|----------|------|
| **Program Owner** | | ☐ | |
| **Delivery Lead** | | ☐ | |
| **Client Representative** | | ☐ | |

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| | | | |

---

## Key Terms Explained

| Term | Simple Definition |
|------|-------------------|
| **KPI** | Key Performance Indicator—important metric |
| **Metric** | Measurable number |
| **Target** | Desired value for a metric |
| **Time Window** | Period being measured |
| **Formula** | Mathematical calculation |
| **Trend** | Direction metric is moving |
| **Vanity Metric** | Looks good but doesn't matter |
| **RTO** | Recovery Time Objective—target recovery time |
| **MTTR** | Mean Time to Respond/Resolve—average time |

---

## SEO Keywords

KPI dictionary template, IT metrics definitions, performance indicators guide, metric definitions, SLA metrics template, IT measurement standards, KPI governance, metric dictionary, performance measurement guide, IT benchmarking metrics

---

## Best Practices

- Keep definitions simple and clear
- Update dictionary before reporting new metrics
- Review targets quarterly
- Ensure data sources are reliable
- Train team on KPI meanings
- Limit to metrics that drive action
- Document any calculation changes

---

## Questions to Ask About Any KPI

1. What business outcome does this support?
2. Can we actually measure this?
3. Will we take action based on this?
4. Is the target realistic?
5. Who owns this metric?
6. How often do we need to know this?

---

*Last Updated: 2026-02-21 | Version 3.0.0 | Template for Vantus Care | Controlled Template*
