# MASTER_CHECKLIST_INDEX.md

**Document ID:** VS-CARE-CHK-INDEX  
**Version:** 1.1.0  
**Effective Date:** 2026-03-07  
**Owner:** Program Owner  
**Status:** Active  
**Reading Level:** 8th Grade  
**Classification:** Internal - checklist navigation guide  
**Publication rule:** Internal reference only.

---

## Overview

This index catalogs all **20** Vantus Care operational checklists, providing quick reference for when to use each checklist, who owns it, and what SOP it supports.

**Total Checklists:** 20  
**Coverage:** All 31 SOPs with operational procedures  
**Last Updated:** 2026-02-21

---

## Quick Reference Table

| ID | Checklist Name | Primary SOP | Owner | When to Use | Time Required |
|----|----------------|-------------|-------|-------------|---------------|
| **CHK-CARE-001** | [Onboarding](#chk-care-001) | SOP-CARE-007 | Delivery Lead | New client start | 2-4 hours |
| **CHK-CARE-002** | [Access Setup](#chk-care-002) | SOP-CARE-008, 009 | Security Lead | New users/credentials | 30-60 min |
| **CHK-CARE-003** | [Monitoring Setup](#chk-care-003) | SOP-CARE-011, 012 | VP of Operations | New monitoring deployment | 45-90 min |
| **CHK-CARE-004** | [Backup Oversight](#chk-care-004) | SOP-CARE-013 | VP of Operations | Monthly backup verification | 30-45 min |
| **CHK-CARE-005** | [Restore Drill](#chk-care-005) | SOP-CARE-014 | VP of Operations | Quarterly restore tests | 2-4 hours |
| **CHK-CARE-006** | [Offboarding](#chk-care-006) | SOP-CARE-031 | VP of Delivery | Client departure | 2-3 hours |
| **CHK-CARE-007** | [Simulation Safety](#chk-care-007) | SOP-CARE-028, 029, 030 | Security Lead | Any testing/simulation | 30-60 min |
| **CHK-CARE-008** | [Patch Management](#chk-care-008) | SOP-CARE-015 | Security Lead | Monthly patch cycles | 45-90 min |
| **CHK-CARE-009** | [Security Alert Triage](#chk-care-009) | SOP-CARE-016 | Security Lead | Every security alert | 10-30 min |
| **CHK-CARE-010** | [Change Management](#chk-care-010) | SOP-CARE-017 | VP of Operations | Every change | 30-120 min |
| **CHK-CARE-011** | [After-Hours Support](#chk-care-011) | SOP-CARE-018 | VP of Operations | After-hours incidents | 30-120 min |
| **CHK-CARE-012** | [Incident Response](#chk-care-012) | SOP-CARE-019 | VP of Operations | Every incident | Ongoing |
| **CHK-CARE-013** | [Monthly Scorecard](#chk-care-013) | SOP-CARE-020 | Account Manager | Monthly reporting | 3-4 hours |
| **CHK-CARE-014** | [Quarterly Review](#chk-care-014) | SOP-CARE-021 | Account Manager | Quarterly governance | 6-8 hours |
| **CHK-CARE-015** | [Documentation Review](#chk-care-015) | SOP-CARE-022 | Delivery Lead | Monthly/quarterly | 2-4 hours |
| **CHK-CARE-016** | [Hardware Procurement](#chk-care-016) | SOP-CARE-023 | VP of Delivery | Equipment purchases | 2-4 hours |
| **CHK-CARE-017** | [Lifecycle Planning](#chk-care-017) | SOP-CARE-024 | VP of Operations | Quarterly planning | 2-3 hours |
| **CHK-CARE-018** | [Compliance Evidence](#chk-care-018) | SOP-CARE-025 | Security Lead | Audit preparation | 4-8 hours |
| **CHK-CARE-019** | [Training & Drill](#chk-care-019) | SOP-CARE-026, 027 | Account Manager | Training events | 4-8 hours |
| **CHK-CARE-020** | [Asset Inventory](#chk-care-020) | SOP-CARE-010 | Delivery Lead | Monthly/quarterly | 30 min / 2-4 hrs |

---

## Detailed Checklist Descriptions

### CHK-CARE-001: Onboarding Checklist
**Purpose:** Guarantee complete production-grade onboarding with scope, access, observability, and governance established.

**Key Activities:**
- Contract and scope baseline confirmation
- People and access setup
- Observability and monitoring configuration
- Backup posture verification
- Campaign readiness preparation

**Triggers:** New client engagement begins

---

### CHK-CARE-002: Access Setup Checklist
**Purpose:** Configure secure, compliant, auditable access for every user.

**Key Activities:**
- Account hygiene (named accounts, MFA)
- Credential management (vaulting, break-glass)
- Logging and detection setup
- Approval capture and handoff

**Triggers:** New user onboarding, access changes

---

### CHK-CARE-003: Monitoring Setup Checklist
**Purpose:** Scope, configure, and validate monitoring for meaningful signals.

**Key Activities:**
- Scope and instrumentation
- Alert taxonomy and routing
- Detection tuning
- Observability validation

**Triggers:** New client, scope changes, monitoring refresh

---

### CHK-CARE-004: Backup Oversight Checklist
**Purpose:** Ensure backup strategy meets RPO/RTO targets and is routinely verified.

**Key Activities:**
- Scope and policy confirmation
- Implementation verification
- Restore readiness confirmation
- Observability and alerting check
- Governance and evidence update

**Triggers:** Monthly verification, configuration changes

---

### CHK-CARE-005: Restore Drill Checklist
**Purpose:** Execute safe, repeatable restore drills with minimal service impact.

**Key Activities:**
- Objectives and scope definition
- Approvals and scheduling
- Isolation and data protection
- Execution and verification
- Post-drill review

**Triggers:** Quarterly scheduled drills, compliance requirements

---

### CHK-CARE-006: Offboarding Checklist
**Purpose:** Securely decommission services and deliver complete handoff package.

**Key Activities:**
- Transition planning
- Access and credential revocation
- Data disposition and retention
- Decommission and validation

**Triggers:** Client departure, contract end

---

### CHK-CARE-007: Simulation Safety Checklist
**Purpose:** Ensure authorized testing runs with explicit guardrails.

**Key Activities:**
- Authorization and objectives
- Safety and pre-flight checks
- Execution controls
- Data protection
- Post-simulation follow-up

**Triggers:** Penetration tests, chaos engineering, authorized simulations

---

### CHK-CARE-008: Patch Management Checklist
**Purpose:** Execute consistent patch cycles reducing security risk while maintaining stability.

**Key Activities:**
- Pre-cycle planning
- Testing and validation
- Production deployment
- Exception documentation
- Post-cycle verification

**Triggers:** Monthly patch cycles, emergency patches

---

### CHK-CARE-009: Security Alert Triage Checklist
**Purpose:** Classify, investigate, and respond to security signals appropriately.

**Key Activities:**
- Initial alert receipt and classification
- Investigation execution
- Containment decisions
- Escalation management
- Documentation and handoff

**Triggers:** Every security alert, suspicious activity report

---

### CHK-CARE-010: Change Management Checklist
**Purpose:** Execute changes safely with full rollback capability and clear approvals.

**Key Activities:**
- Change classification
- Risk assessment and rollback planning
- Approval workflow
- Pre-execution verification
- Change execution
- Post-change verification

**Triggers:** Every production change

---

### CHK-CARE-011: After-Hours Support Checklist
**Purpose:** Deliver predictable, professional after-hours incident response.

**Key Activities:**
- Pre-shift preparation
- Alert receipt and triage
- Initial response
- Escalation management
- Containment and resolution
- Post-incident actions

**Triggers:** After-hours alerts (if contracted)

---

### CHK-CARE-012: Incident Response Checklist
**Purpose:** Coordinate incident response to minimize impact and prevent recurrence.

**Key Activities:**
- Incident declaration
- Initial assessment
- Stabilization and containment
- Communication management
- Recovery execution
- Post-incident review

**Triggers:** Every incident (SEV-1 through SEV-4)

---

### CHK-CARE-013: Monthly Scorecard Checklist
**Purpose:** Deliver consistent, data-driven monthly reports demonstrating value.

**Key Activities:**
- Data collection
- Metric calculation
- Trend analysis
- Narrative drafting
- Action item identification
- Internal review and delivery

**Triggers:** Monthly (typically by 5th business day)

---

### CHK-CARE-014: Quarterly Governance Review Checklist
**Purpose:** Conduct strategic reviews aligning IT with business priorities.

**Key Activities:**
- Pre-meeting preparation
- Quarter-in-review analysis
- Risk register review
- Lifecycle and refresh planning
- Roadmap refresh
- Meeting facilitation and follow-up

**Triggers:** End of each quarter

---

### CHK-CARE-015: Documentation Review Checklist
**Purpose:** Maintain current, accurate documentation supporting operations.

**Key Activities:**
- Documentation inventory
- Freshness assessment
- Critical document review
- Change correlation
- Update execution
- Quality verification

**Triggers:** Monthly reviews, quarterly deep cleans

---

### CHK-CARE-016: Hardware Procurement Checklist
**Purpose:** Guide clients to appropriate hardware purchases with transparent pricing.

**Key Activities:**
- Requirements gathering
- Research and options development
- TCO analysis
- Quote preparation
- Client presentation
- Approval and procurement
- Asset recording

**Triggers:** Hardware needs identified

---

### CHK-CARE-017: Lifecycle Planning Checklist
**Purpose:** Proactively track lifecycles to prevent surprise failures.

**Key Activities:**
- Asset inventory review
- Lifecycle status assessment
- Warranty expiration tracking
- Refresh planning
- Risk documentation
- Budget preparation

**Triggers:** Quarterly planning cycles

---

### CHK-CARE-018: Compliance Evidence Checklist
**Purpose:** Assemble organized evidence packages for compliance audits.

**Key Activities:**
- Audit scope confirmation
- Control mapping
- Evidence collection
- Evidence sanitization
- Gap documentation
- Evidence pack assembly

**Triggers:** Audit requests, compliance reviews

---

### CHK-CARE-019: Training & Drill Checklist
**Purpose:** Deliver effective training building practical skills and readiness.

**Key Activities:**
- Needs assessment
- Training design
- Logistics planning
- Session delivery
- Outcome capture
- After-action reporting
- Improvement implementation

**Triggers:** Scheduled training, compliance requirements, skill gaps

---

### CHK-CARE-020: Asset Inventory Checklist
**Purpose:** Maintain accurate, complete asset inventory supporting all operations.

**Key Activities:**
- Scope definition
- Discovery phase
- Asset data collection
- Dependency mapping
- Validation and verification
- Ongoing maintenance

**Triggers:** Onboarding, monthly updates, quarterly reviews

---

## Checklists by Category

### Security (5 checklists)
- CHK-CARE-002: Access Setup
- CHK-CARE-007: Simulation Safety
- CHK-CARE-008: Patch Management
- CHK-CARE-009: Security Alert Triage
- CHK-CARE-018: Compliance Evidence

### Operations (5 checklists)
- CHK-CARE-003: Monitoring Setup
- CHK-CARE-004: Backup Oversight
- CHK-CARE-005: Restore Drill
- CHK-CARE-010: Change Management
- CHK-CARE-011: After-Hours Support

### Incident Management (2 checklists)
- CHK-CARE-009: Security Alert Triage
- CHK-CARE-012: Incident Response

### Client Lifecycle (3 checklists)
- CHK-CARE-001: Onboarding
- CHK-CARE-006: Offboarding
- CHK-CARE-019: Training & Drill

### Reporting & Governance (3 checklists)
- CHK-CARE-013: Monthly Scorecard
- CHK-CARE-014: Quarterly Governance Review
- CHK-CARE-015: Documentation Review

### Asset Management (3 checklists)
- CHK-CARE-016: Hardware Procurement
- CHK-CARE-017: Lifecycle Planning
- CHK-CARE-020: Asset Inventory

---

## CMMC Alignment Summary

All checklists support CMMC Level 2 compliance requirements:

| CMMC Domain | Supporting Checklists |
|-------------|----------------------|
| Access Control (AC) | CHK-002, CHK-009, CHK-018 |
| Audit & Accountability (AU) | CHK-004, CHK-013, CHK-018 |
| Configuration Management (CM) | CHK-010, CHK-015, CHK-020 |
| Incident Response (IR) | CHK-011, CHK-012, CHK-019 |
| Risk Management (RM) | CHK-014, CHK-017 |
| Security Assessment (CA) | CHK-008, CHK-014, CHK-018 |
| System & Communications Protection (SC) | CHK-003, CHK-015 |
| System & Information Integrity (SI) | CHK-008 |
| Awareness & Training (AT) | CHK-019 |
| Maintenance (MA) | CHK-016, CHK-017 |
| Media Protection (MP) | CHK-006 |
| Personnel Security (PS) | CHK-002, CHK-006 |
| Physical Protection (PE) | CHK-020 |
| Recovery (RE) | CHK-005 |
| Situational Awareness (SA) | CHK-013, CHK-014 |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-21 | Initial release with 20 checklists covering all operational SOPs |

---

*Last Updated: 2026-02-21 | Version 1.0.0 | Questions? Contact your Program Owner*
