---
Document: MASTER_INDEX
Doc ID: VS-TEMPLATE-MASTER-001
Client: [[CLIENT_NAME]]
Project: [[PROJECT_NAME]]
Owner: Project Manager / Delivery Lead
Contributors: All Project Stakeholders
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/00_master/00_MASTER_INDEX.md
Approvers: [[PM_NAME]] / [[CLIENT_SPONSOR]]
---

# Complete Client Documentation Kit — Master Index

## Purpose

This document is the **central navigation hub and single source of truth** for all project documentation. It lists all documents, their locations, purposes, and how they connect. Use this index to:

- Navigate the complete documentation structure
- Verify document completeness at phase gates
- Understand relationships between documents
- Find authoritative sources for specific information

## Instructions

1. **Project Setup:** Update all `[[PLACEHOLDERS]]` with actual project values during project initiation
2. **Maintenance:** Update the index whenever documents are added, removed, or relocated
3. **Cross-Reference:** Use this as the entry point for all project documentation queries
4. **Quality Verification:** Before phase gates, verify all linked documents exist and are current

---

## 0. SYSTEM OF RECORD (Single Source of Truth)

To prevent contradictory information, the following locations are the definitive sources for project state:

| Information Type        | Authoritative Source                               | Backup/Archive                                                                |
| ----------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Requirements Truth**  | `../03_discovery/04_REQUIREMENTS_SPEC.md`          | `../03_discovery/08_TRACEABILITY_MATRIX.md`                                   |
| **Architectural Truth** | `docs/04_architecture/` (ADRs and Tech Specs)      | Version control commit history                                                |
| **Scope Truth**         | `../01_commercial/01_SOW.md`                       | Approved change orders in `../01_commercial/03_CHANGE_ORDER.md`               |
| **Security Truth**      | `../05_security/01_SECURITY_BASELINE.md`           | `../05_security/09_SECURE_SDLC_STANDARD.md`                                   |
| **Release Truth**       | `../07_operations/10_CUTOVER_AND_ROLLBACK_PLAN.md` | Formal release notes in `../06_delivery_quality/06_RELEASE_NOTES_TEMPLATE.md` |
| **Financial Truth**     | `../01_commercial/02_PRICING_MODEL.md`             | Invoicing records and approved change orders                                  |
| **Risk Truth**          | `./04_RISK_REGISTER.md`                            | `../02_governance/17_RISK_MANAGEMENT_PLAN.md`                                 |

---

## 1. STRATEGIC OVERVIEW (Master & Commercial)

These documents define the "What" and "Why" of the project, including legal and financial boundaries.

### 1.1 Foundation Documents

| Document                                                                 | Purpose                                      | Owner        | Status     |
| ------------------------------------------------------------------------ | -------------------------------------------- | ------------ | ---------- |
| [00_MASTER_INDEX.md](./00_MASTER_INDEX.md)                               | Central navigation and document registry     | PM           | [[STATUS]] |
| [01_GLOSSARY.md](./01_GLOSSARY.md)                                       | Terminology definitions and business context | Tech Lead    | [[STATUS]] |
| [02_ASSUMPTIONS_CONSTRAINTS.md](./02_ASSUMPTIONS_CONSTRAINTS.md)         | Project boundaries and validation criteria   | PM           | [[STATUS]] |
| [03_DECISION_LOG.md](./03_DECISION_LOG.md)                               | Architectural and business decision tracking | Architect    | [[STATUS]] |
| [04_RISK_REGISTER.md](./04_RISK_REGISTER.md)                             | Enterprise risk management and mitigation    | PM           | [[STATUS]] |
| [05_ISSUE_LOG.md](./05_ISSUE_LOG.md)                                     | Active issue tracking and resolution         | PM           | [[STATUS]] |
| [06_PLANNING_COVERAGE_CHECKLIST.md](./06_PLANNING_COVERAGE_CHECKLIST.md) | Phase gate verification checklist            | Quality Lead | [[STATUS]] |

### 1.2 Commercial & Legal Documents

| Document                                                                          | Purpose                                        | Owner           | Status     |
| --------------------------------------------------------------------------------- | ---------------------------------------------- | --------------- | ---------- |
| [01_SOW.md](../01_commercial/01_SOW.md)                                           | Statement of Work - scope, deliverables, terms | Account Manager | [[STATUS]] |
| [02_PRICING_MODEL.md](../01_commercial/02_PRICING_MODEL.md)                       | Pricing structures, estimates, payment terms   | Account Manager | [[STATUS]] |
| [03_CHANGE_ORDER.md](../01_commercial/03_CHANGE_ORDER.md)                         | Change management and approval workflow        | PM              | [[STATUS]] |
| [04_OWNERSHIP_PORTABILITY.md](../01_commercial/04_OWNERSHIP_PORTABILITY.md)       | IP ownership and host portability terms        | Legal           | [[STATUS]] |
| [05_SLA_AND_SUPPORT_TERMS.md](../01_commercial/05_SLA_AND_SUPPORT_TERMS.md)       | Service level agreements and support           | Account Manager | [[STATUS]] |
| [06_DATA_PROCESSING_ADDENDUM.md](../01_commercial/06_DATA_PROCESSING_ADDENDUM.md) | GDPR/CCPA data processing terms                | DPO             | [[STATUS]] |

---

## 2. GOVERNANCE & DISCOVERY

How the project is managed and the specific requirements that were built.

### 2.1 Governance Framework

| Document                                                                        | Purpose                                           | Owner        | Status     |
| ------------------------------------------------------------------------------- | ------------------------------------------------- | ------------ | ---------- |
| [01_PROJECT_CHARTER.md](../02_governance/01_PROJECT_CHARTER.md)                 | Project authorization and high-level scope        | Sponsor      | [[STATUS]] |
| [02_GOVERNANCE_MODEL.md](../02_governance/02_GOVERNANCE_MODEL.md)               | Decision-making structure and escalation paths    | PM           | [[STATUS]] |
| [03_RACI_MATRIX.md](../02_governance/03_RACI_MATRIX.md)                         | Roles and responsibilities matrix                 | PM           | [[STATUS]] |
| [10_PROJECT_MANAGEMENT_PLAN.md](../02_governance/10_PROJECT_MANAGEMENT_PLAN.md) | Integrated project management approach            | PM           | [[STATUS]] |
| [11_SCOPE_MANAGEMENT_PLAN.md](../02_governance/11_SCOPE_MANAGEMENT_PLAN.md)     | Scope definition and control processes            | PM           | [[STATUS]] |
| [12_SCHEDULE_PLAN.md](../02_governance/12_SCHEDULE_PLAN.md)                     | Schedule development and control                  | PM           | [[STATUS]] |
| [13_COST_MANAGEMENT_PLAN.md](../02_governance/13_COST_MANAGEMENT_PLAN.md)       | Cost estimation and control processes             | PM           | [[STATUS]] |
| [14_QUALITY_MANAGEMENT_PLAN.md](../02_governance/14_QUALITY_MANAGEMENT_PLAN.md) | Quality standards and assurance activities        | Quality Lead | [[STATUS]] |
| [15_RESOURCE_PLAN.md](../02_governance/15_RESOURCE_PLAN.md)                     | Resource requirements and allocation              | PM           | [[STATUS]] |
| [16_COMMUNICATIONS_PLAN.md](../02_governance/16_COMMUNICATIONS_PLAN.md)         | Communication strategy and stakeholder management | PM           | [[STATUS]] |
| [17_RISK_MANAGEMENT_PLAN.md](../02_governance/17_RISK_MANAGEMENT_PLAN.md)       | Risk management methodology and processes         | PM           | [[STATUS]] |
| [18_PROCUREMENT_PLAN.md](../02_governance/18_PROCUREMENT_PLAN.md)               | Procurement strategy and vendor management        | PM           | [[STATUS]] |
| [19_STAKEHOLDER_PLAN.md](../02_governance/19_STAKEHOLDER_PLAN.md)               | Stakeholder identification and engagement         | PM           | [[STATUS]] |

### 2.2 Discovery & Requirements

| Document                                                                               | Purpose                                             | Owner         | Status     |
| -------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------- | ---------- |
| [01_DISCOVERY_NOTES.md](../03_discovery/01_DISCOVERY_NOTES.md)                         | Discovery session findings and insights             | BA            | [[STATUS]] |
| [02_CURRENT_STATE_MAP.md](../03_discovery/02_CURRENT_STATE_MAP.md)                     | As-is process and system documentation              | BA            | [[STATUS]] |
| [03_FUTURE_STATE_MAP.md](../03_discovery/03_FUTURE_STATE_MAP.md)                       | To-be process and system vision                     | BA            | [[STATUS]] |
| [04_REQUIREMENTS_SPEC.md](../03_discovery/04_REQUIREMENTS_SPEC.md)                     | Detailed functional and non-functional requirements | BA            | [[STATUS]] |
| [05_USER_STORIES.md](../03_discovery/05_USER_STORIES.md)                               | User stories and acceptance criteria                | BA            | [[STATUS]] |
| [06_PRIORITIZATION.md](../03_discovery/06_PRIORITIZATION.md)                           | Requirements prioritization matrix                  | Product Owner | [[STATUS]] |
| [07_ACCEPTANCE_CRITERIA_CATALOG.md](../03_discovery/07_ACCEPTANCE_CRITERIA_CATALOG.md) | Comprehensive acceptance criteria                   | QA Lead       | [[STATUS]] |
| [08_TRACEABILITY_MATRIX.md](../03_discovery/08_TRACEABILITY_MATRIX.md)                 | Requirements traceability and coverage              | BA            | [[STATUS]] |

---

## 3. TECHNICAL BLUEPRINTS

The engineering logic, security baseline, and architectural diagrams.

### 3.1 Architecture Documentation

| Document                                                                                  | Purpose                                                 | Owner          | Status     |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------------- | ---------- |
| [01_ARCHITECTURE_OVERVIEW.md](../04_architecture/01_ARCHITECTURE_OVERVIEW.md)             | High-level system architecture                          | Architect      | [[STATUS]] |
| [02_C4_DIAGRAMS_INDEX.md](../04_architecture/02_C4_DIAGRAMS_INDEX.md)                     | C4 model diagrams (Context, Container, Component, Code) | Architect      | [[STATUS]] |
| [03_DATA_FLOWS_INDEX.md](../04_architecture/03_DATA_FLOWS_INDEX.md)                       | Data flow diagrams and sequence diagrams                | Architect      | [[STATUS]] |
| [04_API_SPEC.md](../04_architecture/04_API_SPEC.md)                                       | API specifications and contracts                        | Tech Lead      | [[STATUS]] |
| [05_DATA_MODEL.md](../04_architecture/05_DATA_MODEL.md)                                   | Entity-relationship and data models                     | Architect      | [[STATUS]] |
| [06_INTEGRATION_SPEC.md](../04_architecture/06_INTEGRATION_SPEC.md)                       | Integration patterns and specifications                 | Architect      | [[STATUS]] |
| [07_NON_FUNCTIONAL_SPECS.md](../04_architecture/07_NON_FUNCTIONAL_SPECS.md)               | Performance, scalability, reliability requirements      | Architect      | [[STATUS]] |
| [08_IMPLEMENTATION_PLAN.md](../04_architecture/08_IMPLEMENTATION_PLAN.md)                 | Technical implementation roadmap                        | Tech Lead      | [[STATUS]] |
| [09_DATA_DICTIONARY.md](../04_architecture/09_DATA_DICTIONARY.md)                         | Data element definitions and metadata                   | Data Architect | [[STATUS]] |
| [10_DATA_RETENTION_AND_DELETION.md](../04_architecture/10_DATA_RETENTION_AND_DELETION.md) | Data lifecycle management policies                      | DPO            | [[STATUS]] |

### 3.2 Security Documentation

| Document                                                                                              | Purpose                                      | Owner         | Status     |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------- | ------------- | ---------- |
| [01_SECURITY_BASELINE.md](../05_security/01_SECURITY_BASELINE.md)                                     | Security requirements and baseline controls  | Security Lead | [[STATUS]] |
| [02_THREAT_MODEL.md](../05_security/02_THREAT_MODEL.md)                                               | Threat modeling and risk assessment          | Security Lead | [[STATUS]] |
| [03_SECURITY_TEST_PLAN.md](../05_security/03_SECURITY_TEST_PLAN.md)                                   | Security testing strategy and approach       | Security Lead | [[STATUS]] |
| [04_VULNERABILITY_MANAGEMENT.md](../05_security/04_VULNERABILITY_MANAGEMENT.md)                       | Vulnerability scanning and remediation       | Security Lead | [[STATUS]] |
| [05_ACCESS_CONTROL_POLICY.md](../05_security/05_ACCESS_CONTROL_POLICY.md)                             | Authentication and authorization policies    | Security Lead | [[STATUS]] |
| [06_STATEMENT_OF_APPLICABILITY.md](../05_security/06_STATEMENT_OF_APPLICABILITY.md)                   | ISO 27001 controls applicability             | Security Lead | [[STATUS]] |
| [07_DATA_CLASSIFICATION_POLICY.md](../05_security/07_DATA_CLASSIFICATION_POLICY.md)                   | Data classification and handling             | DPO           | [[STATUS]] |
| [08_PRIVACY_IMPACT_ASSESSMENT.md](../05_security/08_PRIVACY_IMPACT_ASSESSMENT.md)                     | Privacy impact assessment (PIA/DPIA)         | DPO           | [[STATUS]] |
| [09_SECURE_SDLC_STANDARD.md](../05_security/09_SECURE_SDLC_STANDARD.md)                               | Secure development lifecycle standards       | Security Lead | [[STATUS]] |
| [10_SECURITY_EVENT_LOGGING_REQUIREMENTS.md](../05_security/10_SECURITY_EVENT_LOGGING_REQUIREMENTS.md) | Security logging and monitoring requirements | Security Lead | [[STATUS]] |
| [11_VULNERABILITY_DISCLOSURE_POLICY.md](../05_security/11_VULNERABILITY_DISCLOSURE_POLICY.md)         | Responsible disclosure procedures            | Security Lead | [[STATUS]] |

---

## 4. OPERATIONAL READINESS

The Complete Client Documentation Kit – Everything your team needs to run the system without Vantus.

### 4.1 Operations Documentation

| Document                                                                                          | Purpose                                       | Owner           | Status     |
| ------------------------------------------------------------------------------------------------- | --------------------------------------------- | --------------- | ---------- |
| [01_INCIDENT_RESPONSE_PLAN.md](../07_operations/01_INCIDENT_RESPONSE_PLAN.md)                     | Incident detection, response, and recovery    | Operations Lead | [[STATUS]] |
| [02_RUNBOOKS_INDEX.md](../07_operations/02_RUNBOOKS_INDEX.md)                                     | Index of operational runbooks                 | Operations Lead | [[STATUS]] |
| [03_MONITORING_AND_ALERTING.md](../07_operations/03_MONITORING_AND_ALERTING.md)                   | Monitoring strategy and alerting rules        | Operations Lead | [[STATUS]] |
| [04_POSTMORTEM_TEMPLATE.md](../07_operations/04_POSTMORTEM_TEMPLATE.md)                           | Incident postmortem documentation template    | Operations Lead | [[STATUS]] |
| [05_CHANGE_ENABLEMENT_POLICY.md](../07_operations/05_CHANGE_ENABLEMENT_POLICY.md)                 | Change management policies and procedures     | Operations Lead | [[STATUS]] |
| [06_BACKUP_AND_RESTORE.md](../07_operations/06_BACKUP_AND_RESTORE.md)                             | Backup strategies and restoration procedures  | Operations Lead | [[STATUS]] |
| [07_DISASTER_RECOVERY_PLAN.md](../07_operations/07_DISASTER_RECOVERY_PLAN.md)                     | Disaster recovery procedures and RTO/RPO      | Operations Lead | [[STATUS]] |
| [08_SLO_SLI_BUDGETS.md](../07_operations/08_SLO_SLI_BUDGETS.md)                                   | Service level objectives and error budgets    | Operations Lead | [[STATUS]] |
| [09_ENVIRONMENT_STRATEGY.md](../07_operations/09_ENVIRONMENT_STRATEGY.md)                         | Environment configuration and promotion       | Operations Lead | [[STATUS]] |
| [10_CUTOVER_AND_ROLLBACK_PLAN.md](../07_operations/10_CUTOVER_AND_ROLLBACK_PLAN.md)               | Production deployment and rollback procedures | Operations Lead | [[STATUS]] |
| [11_BACKUP_RESTORE_TEST_LOG.md](../07_operations/11_BACKUP_RESTORE_TEST_LOG.md)                   | Backup restoration testing records            | Operations Lead | [[STATUS]] |
| [12_SUPPORT_MODEL_AND_ESCALATION.md](../07_operations/12_SUPPORT_MODEL_AND_ESCALATION.md)         | Support tiers and escalation procedures       | Operations Lead | [[STATUS]] |
| [13_MAINTENANCE_WINDOWS_AND_PATCHING.md](../07_operations/13_MAINTENANCE_WINDOWS_AND_PATCHING.md) | Scheduled maintenance and patching            | Operations Lead | [[STATUS]] |
| [14_CAPACITY_AND_PERFORMANCE_PLAN.md](../07_operations/14_CAPACITY_AND_PERFORMANCE_PLAN.md)       | Capacity planning and performance management  | Operations Lead | [[STATUS]] |
| [15_OBSERVABILITY_DASHBOARDS_INDEX.md](../07_operations/15_OBSERVABILITY_DASHBOARDS_INDEX.md)     | Monitoring dashboards and metrics             | Operations Lead | [[STATUS]] |

---

## 5. DELIVERY & QUALITY ASSURANCE

Testing, release management, and quality verification.

### 5.1 Testing & Quality

| Document                                                                                | Purpose                               | Owner           | Status     |
| --------------------------------------------------------------------------------------- | ------------------------------------- | --------------- | ---------- |
| [01_TEST_STRATEGY.md](../06_delivery_quality/01_TEST_STRATEGY.md)                       | Overall testing approach and strategy | QA Lead         | [[STATUS]] |
| [02_TEST_PLAN.md](../06_delivery_quality/02_TEST_PLAN.md)                               | Detailed test planning and execution  | QA Lead         | [[STATUS]] |
| [03_CHANGE_REQUEST.md](../06_delivery_quality/03_CHANGE_REQUEST.md)                     | Internal change request tracking      | PM              | [[STATUS]] |
| [04_UAT_PLAN.md](../06_delivery_quality/04_UAT_PLAN.md)                                 | User acceptance testing plan          | BA              | [[STATUS]] |
| [05_RELEASE_PLAN.md](../06_delivery_quality/05_RELEASE_PLAN.md)                         | Release planning and coordination     | Release Manager | [[STATUS]] |
| [06_RELEASE_NOTES_TEMPLATE.md](../06_delivery_quality/06_RELEASE_NOTES_TEMPLATE.md)     | Release notes template and examples   | Release Manager | [[STATUS]] |
| [07_QA_REPORT_TEMPLATE.md](../06_delivery_quality/07_QA_REPORT_TEMPLATE.md)             | QA testing reports and metrics        | QA Lead         | [[STATUS]] |
| [08_TEST_CASE_CATALOG.md](../06_delivery_quality/08_TEST_CASE_CATALOG.md)               | Comprehensive test case library       | QA Lead         | [[STATUS]] |
| [09_RELEASE_READINESS_REVIEW.md](../06_delivery_quality/09_RELEASE_READINESS_REVIEW.md) | Pre-release readiness checklist       | Release Manager | [[STATUS]] |
| [10_LOAD_TEST_PLAN.md](../06_delivery_quality/10_LOAD_TEST_PLAN.md)                     | Performance and load testing          | QA Lead         | [[STATUS]] |

---

## 6. ENABLEMENT & KNOWLEDGE TRANSFER

Training, documentation, and operational handoff materials.

### 6.1 Enablement Documentation

| Document                                                                    | Purpose                                       | Owner           | Status     |
| --------------------------------------------------------------------------- | --------------------------------------------- | --------------- | ---------- |
| [01_OWNER_OPERATOR_GUIDE.md](../08_enablement/01_OWNER_OPERATOR_GUIDE.md)   | Day-to-day system operation guide             | Tech Writer     | [[STATUS]] |
| [02_ADMIN_RUNBOOK.md](../08_enablement/02_ADMIN_RUNBOOK.md)                 | Administrative procedures and troubleshooting | Tech Writer     | [[STATUS]] |
| [03_TRAINING_PLAN.md](../08_enablement/03_TRAINING_PLAN.md)                 | Training curriculum and delivery plan         | Training Lead   | [[STATUS]] |
| [04_HANDOFF_CHECKLIST.md](../08_enablement/04_HANDOFF_CHECKLIST.md)         | Knowledge transfer completion checklist       | PM              | [[STATUS]] |
| [05_FAQ.md](../08_enablement/05_FAQ.md)                                     | Frequently asked questions                    | Tech Writer     | [[STATUS]] |
| [06_SUPPORT_HANDOFF_GUIDE.md](../08_enablement/06_SUPPORT_HANDOFF_GUIDE.md) | Support transition procedures                 | Operations Lead | [[STATUS]] |

---

## 7. OWNERSHIP TRANSFER & CLOSEOUT

The final handoff protocols and ownership certificates.

### 7.1 Ownership Transfer

| Document                                                                                        | Purpose                                | Owner         | Status     |
| ----------------------------------------------------------------------------------------------- | -------------------------------------- | ------------- | ---------- |
| [01_OWNERSHIP_TRANSFER_GUIDE.md](../09_ownership_transfer/01_OWNERSHIP_TRANSFER_GUIDE.md)       | Complete ownership transfer procedures | PM            | [[STATUS]] |
| [02_CREDENTIAL_ESCROW_PROCEDURE.md](../09_ownership_transfer/02_CREDENTIAL_ESCROW_PROCEDURE.md) | Secure credential handoff procedures   | Security Lead | [[STATUS]] |
| [03_BILL_OF_MATERIALS.md](../09_ownership_transfer/03_BILL_OF_MATERIALS.md)                     | Complete system component inventory    | Tech Lead     | [[STATUS]] |
| [04_EXIT_PLAN.md](../09_ownership_transfer/04_EXIT_PLAN.md)                                     | Vendor exit and migration procedures   | PM            | [[STATUS]] |

### 7.2 Project Closeout

| Document                                                        | Purpose                                | Owner | Status     |
| --------------------------------------------------------------- | -------------------------------------- | ----- | ---------- |
| [01_FINAL_ACCEPTANCE.md](../10_closeout/01_FINAL_ACCEPTANCE.md) | Formal acceptance and sign-off         | PM    | [[STATUS]] |
| [02_FINAL_REPORT.md](../10_closeout/02_FINAL_REPORT.md)         | Project completion summary             | PM    | [[STATUS]] |
| [03_LESSONS_LEARNED.md](../10_closeout/03_LESSONS_LEARNED.md)   | Retrospective and improvement insights | PM    | [[STATUS]] |

---

## 8. ARCHITECTURAL DECISION RECORDS (ADRs)

| Document                                            | Purpose                  | Owner     | Status     |
| --------------------------------------------------- | ------------------------ | --------- | ---------- |
| [README.md](../adr/README.md)                       | ADR process and index    | Architect | [[STATUS]] |
| [ADR-0001_TEMPLATE.md](../adr/ADR-0001_TEMPLATE.md) | ADR template and example | Architect | [[STATUS]] |

---

## 9. DOCUMENT METRICS & HEALTH

### 9.1 Document Completeness Dashboard

| Category               | Total  |  Complete | In Progress | Not Started | % Complete |
| ---------------------- | ------ | --------: | ----------: | ----------: | ---------: |
| Master & Commercial    | 7      |     [[#]] |       [[#]] |       [[#]] |      [[%]] |
| Governance & Discovery | 19     |     [[#]] |       [[#]] |       [[#]] |      [[%]] |
| Technical Blueprints   | 21     |     [[#]] |       [[#]] |       [[#]] |      [[%]] |
| Operational Readiness  | 15     |     [[#]] |       [[#]] |       [[#]] |      [[%]] |
| Delivery & Quality     | 10     |     [[#]] |       [[#]] |       [[#]] |      [[%]] |
| Enablement             | 6      |     [[#]] |       [[#]] |       [[#]] |      [[%]] |
| Ownership & Closeout   | 7      |     [[#]] |       [[#]] |       [[#]] |      [[%]] |
| **TOTAL**              | **85** | **[[#]]** |   **[[#]]** |   **[[#]]** |  **[[%]]** |

### 9.2 Critical Path Documents

The following documents must be completed before phase gates:

**Discovery Gate (Required for Build Start):**

- [ ] [01_SOW.md](../01_commercial/01_SOW.md) - Executed and signed
- [ ] [04_REQUIREMENTS_SPEC.md](../03_discovery/04_REQUIREMENTS_SPEC.md) - Approved baseline
- [ ] [08_TRACEABILITY_MATRIX.md](../03_discovery/08_TRACEABILITY_MATRIX.md) - Initial mapping complete

**Architecture Gate (Required for Infrastructure Start):**

- [ ] [01_ARCHITECTURE_OVERVIEW.md](../04_architecture/01_ARCHITECTURE_OVERVIEW.md) - Approved design
- [ ] [09_DATA_DICTIONARY.md](../04_architecture/09_DATA_DICTIONARY.md) - Data model finalized
- [ ] [07_DATA_CLASSIFICATION_POLICY.md](../05_security/07_DATA_CLASSIFICATION_POLICY.md) - Classification applied

**Readiness Gate (Required for UAT):**

- [ ] [01_TEST_STRATEGY.md](../06_delivery_quality/01_TEST_STRATEGY.md) - Strategy approved
- [ ] [08_TEST_CASE_CATALOG.md](../06_delivery_quality/08_TEST_CASE_CATALOG.md) - Tests prepared
- [ ] [09_ENVIRONMENT_STRATEGY.md](../07_operations/09_ENVIRONMENT_STRATEGY.md) - Environments ready

**Go-Live Gate (Required for Production Cutover):**

- [ ] [09_RELEASE_READINESS_REVIEW.md](../06_delivery_quality/09_RELEASE_READINESS_REVIEW.md) - All checks passed
- [ ] [10_CUTOVER_AND_ROLLBACK_PLAN.md](../07_operations/10_CUTOVER_AND_ROLLBACK_PLAN.md) - Plan validated
- [ ] [06_SUPPORT_HANDOFF_GUIDE.md](../08_enablement/06_SUPPORT_HANDOFF_GUIDE.md) - Support ready

---

## 10. RELATED DOCUMENTS

| Document                                                                 | Relationship            | Location          |
| ------------------------------------------------------------------------ | ----------------------- | ----------------- |
| [06_PLANNING_COVERAGE_CHECKLIST.md](./06_PLANNING_COVERAGE_CHECKLIST.md) | Phase gate verification | Current directory |
| [03_DECISION_LOG.md](./03_DECISION_LOG.md)                               | Decision history        | Current directory |
| [04_RISK_REGISTER.md](./04_RISK_REGISTER.md)                             | Risk management         | Current directory |
| [02_ASSUMPTIONS_CONSTRAINTS.md](./02_ASSUMPTIONS_CONSTRAINTS.md)         | Project boundaries      | Current directory |
| [01_GLOSSARY.md](./01_GLOSSARY.md)                                       | Terminology definitions | Current directory |

---

## 11. QUALITY CHECKLIST

Before marking this document complete, verify:

- [ ] All `[[PLACEHOLDERS]]` replaced with actual project values
- [ ] All document links verified and functional
- [ ] Document status column updated for all entries
- [ ] Document completeness dashboard populated
- [ ] Critical path documents identified and tracked
- [ ] All phase gate requirements documented
- [ ] Related documents section cross-referenced
- [ ] Document reviewed by Project Manager
- [ ] Document approved by Client Sponsor
- [ ] Version history initialized with first entry

---

## 12. CHANGE HISTORY

| Date       | Version | Author           | Summary                                                                                      |
| ---------- | ------: | ---------------- | -------------------------------------------------------------------------------------------- |
| 2026-02-09 |   2.0.0 | Technical Writer | Removed owner-controlled systems terminology, simplified language to 9th grade reading level |
| 2026-02-02 |   1.0.0 | Technical Writer | Complete template rewrite with comprehensive structure                                       |
| 2026-01-18 |   0.1.0 | Vantus Systems   | Initial template creation                                                                    |

---

_Vantus Systems: Engineering Independence._
_Last Updated: 2026-02-09 | Version 2.0.0 | Status: Template_

## Sync Notes

- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
