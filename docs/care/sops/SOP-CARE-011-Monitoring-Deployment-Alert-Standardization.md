# SOP-CARE-011: Monitoring Setup & Alert Standards

**Document ID:** VS-CARE-OPS-011  
**Version:** 2.0.0 (Launch Ready)  
**Effective Date:** 2026-02-01  
**Owner:** VP of Operations  
**Status:** Active  
**Reading Level:** 8th Grade  
**Audience:** Small Business Owners

---

## What This Document Is

This SOP deploys monitoring safely, creates consistent alert categories, and routes issues to ticketing. We catch problems before they impact your business.

---

## Why This SOP Matters

This SOP defines a repeatable Vantus standard for the service area it covers.
Use it to create consistency, clear ownership, and auditable execution without unsupported market-comparison language.

---

## Why Monitoring Matters

Good monitoring:

- Catches issues before they become outages
- Reduces downtime by up to 70%
- Provides data for decisions
- Documents system health for compliance
- Supports CMMC audit requirements

---

## Three Core Principles

### 1. Recovery Over Theory

- Start conservative
- Avoid alert noise
- Tune safely over time
- Stable beats complex

### 2. Standard Categories

- Consistent alert types
- Documented routing
- Same approach every time

### 3. Proof Required

- Monitoring outputs become evidence
- No vague uptime claims
- Measurable results

---

## Who Does What

| Role                    | Responsibility                         |
| ----------------------- | -------------------------------------- |
| **VP of Operations**    | Owns monitoring standards              |
| **Monitoring Engineer** | Deploys and tunes monitoring           |
| **Delivery Lead**       | Confirms scope and maintenance windows |

---

## Step-by-Step: Monitoring Deployment

### Step 1: Confirm Scope

From your Scope Map, identify:

- What systems to monitor
- What to exclude (do-not-do list)
- Any special requirements

### Step 2: Deploy Safely

- Deploy agents/collectors
- Minimal disruption
- Clear rollback steps
- Test before full deployment

### Step 3: Enable Baseline Alerts

Standard alert categories:
| Category | What It Monitors |
|----------|------------------|
| **Availability** | Is it up and running? |
| **Capacity** | Disk space, memory, CPU |
| **Critical Services** | Essential applications |

### Step 4: Route to Ticketing

- Alerts flow to ticketing system
- Consistent classification tags
- Clear ownership assignment

### Step 5: Start Tuning Log

Document adjustments:

- What changed
- Why it changed
- Date of change

### Step 6: 30-Day Review

Schedule tuning review:

- Adjust thresholds
- Reduce false alarms
- Improve accuracy

### Step 7: Document Suppressions

If alerts are suppressed:

- Record rationale
- Set revisit date
- Review periodically

---

## Decision Flowchart

```
Monitoring Module
Sold
      |
      v
Confirm Scope +
Exclusions
      |
      v
Deploy Collectors/
Agents
      |
      v
Enable Baseline
Alerts
      |
      v
Route to Ticketing
      |
      v
Start Tuning Log
      |
      v
30-Day Tuning
Review
```

---

## Templates & Checklists

- **Monitoring Setup Checklist**: `../checklists/CHK-CARE-003-Monitoring-Setup-Checklist.md`

---

## When to Escalate

Escalate to Program Owner and Security Lead if:

- Risk is unclear
- Safety concerns exist
- Contractual scope ambiguous

---

## Success Criteria

| Requirement        | Verification        |
| ------------------ | ------------------- |
| Procedure followed | Deployment review   |
| Files produced     | Documentation check |
| Approvals captured | Client confirmation |
| Records updated    | System audit        |

---

## Audit & Compliance

- Artifacts retained per contract
- Spot-audited monthly under Care QMS
- Monitoring quality tracked

---

## Real Example

**Scenario**: CPU alerts fire constantly with no real impact.

**Tuning Process**:

1. Identify pattern: alerts without business impact
2. Raise threshold (e.g., from 80% to 90%)
3. Add duration (e.g., alert only if sustained 10 minutes)
4. Document tuning decision
5. Monitor results
6. Adjust further if needed

---

## Key Terms Explained

| Term                | Simple Definition                       |
| ------------------- | --------------------------------------- |
| **Agent**           | Software installed to collect data      |
| **Collector**       | System that gathers monitoring data     |
| **Alert Threshold** | Point where warning is triggered        |
| **Tuning**          | Adjusting alerts to reduce false alarms |
| **Suppression**     | Temporarily silencing certain alerts    |
| **Baseline**        | Starting point for comparison           |

---

## SEO Keywords

business system monitoring, IT monitoring services, network monitoring, server monitoring, business technology monitoring, IT alert management, system health monitoring, infrastructure monitoring, managed monitoring services, business uptime monitoring

## Version History

| Version | Date       | Changes                                                                                                                                  |
| ------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 2.1.0   | 2026-02-21 | Added service-positioning section updates; added quantified monitoring metrics; added Core Web Vitals tracking; added CMMC 2.0 alignment |
| 2.0.0   | 2026-02-01 | Initial launch version                                                                                                                   |

---

## SEO Keywords

business system monitoring, IT monitoring services, network monitoring, server monitoring, business technology monitoring, IT alert management, system health monitoring, infrastructure monitoring, managed monitoring services, business uptime monitoring, Core Web Vitals monitoring, website performance tracking, CMMC monitoring requirements

---

_Last Updated: 2026-02-21 | Version 2.1.0 | Questions? Contact your Account Manager_
