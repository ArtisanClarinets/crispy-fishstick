---
Document: STATEMENT_OF_APPLICABILITY
Doc ID: VS-TEMPLATE-SEC-006
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Chief Information Security Officer (CISO)
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Classification: Confidential
Source of Truth: [docs/05_security/06_STATEMENT_OF_APPLICABILITY.md](docs/05_security/06_STATEMENT_OF_APPLICABILITY.md)
Review Cycle: Annual
Next Review Date: [DATE + 1 year]
---

# Statement of Applicability (SoA)

**Project:** [[PROJECT_NAME]]  
**Standard:** ISO 27001:2022 / NIST 800-53 / SOC 2  
**Scope:** Information Security Management System (ISMS)  
**Classification:** Confidential

---

## Document Control

| Field | Value |
|-------|-------|
| **Document Owner** | Chief Information Security Officer (CISO) |
| **Author** | Compliance Team |
| **Reviewers** | CISO, CTO, Legal Counsel |
| **Approver** | CISO |
| **Approval Date** | [DATE] |
| **Review Frequency** | Annual (or upon significant change) |
| **Version History** | v1.0.0 - Initial SoA |

### Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-02 | Compliance Team | Comprehensive SoA for ISO 27001:2022 |

---

## 1. EXECUTIVE SUMMARY

This Statement of Applicability (SoA) documents the control objectives and controls selected to address the information security risks identified for [[PROJECT_NAME]]. This SoA aligns with ISO 27001:2022, NIST 800-53, and SOC 2 requirements.

---

## 2. ISMS SCOPE

### 2.1 Organizational Scope

| Element | Description |
|---------|-------------|
| Organization | [[CLIENT_NAME]] |
| Departments | All departments handling information assets |
| Locations | All physical and virtual locations |
| Personnel | Employees, contractors, third-party users |

### 2.2 Technical Scope

| Element | Description |
|---------|-------------|
| Systems | All production, staging, and development systems |
| Applications | All internally developed and third-party applications |
| Networks | All corporate and production networks |
| Data | All data classified as Internal and above |

### 2.3 Exclusions

| Exclusion | Justification |
|-----------|---------------|
| Public website content | No confidential information |
| Employee personal devices | Not under organizational control (BYOD policy applies) |

---

## 3. RISK ASSESSMENT SUMMARY

### 3.1 Risk Assessment Methodology

| Component | Description |
|-----------|-------------|
| Methodology | ISO 27005 / NIST RMF |
| Risk Scale | 1-5 (Likelihood × Impact) |
| Risk Appetite | Low - Medium |
| Assessment Date | [DATE] |
| Next Assessment | [DATE + 1 year] |

### 3.2 Risk Summary

| Risk Level | Count | Treatment Approach |
|------------|-------|-------------------|
| Critical | 0 | Immediate treatment |
| High | [X] | Priority treatment |
| Medium | [X] | Planned treatment |
| Low | [X] | Monitor and accept |

---

## 4. CONTROL SELECTION MATRIX

### 4.1 Organizational Controls (A.5)

| Control | Title | Applicability | Justification | Implementation | Evidence |
|---------|-------|---------------|---------------|----------------|----------|
| A.5.1 | Policies for information security | Yes | Required for ISMS | Security policies documented | Policy library |
| A.5.2 | Information security roles and responsibilities | Yes | Clear accountability | RACI matrix defined | Org chart |
| A.5.3 | Segregation of duties | Yes | Prevent fraud | Role definitions | Job descriptions |
| A.5.4 | Management responsibilities | Yes | Leadership commitment | Management reviews | Meeting minutes |
| A.5.5 | Contact with special interest groups | Yes | Threat intelligence | Security forums membership | Membership records |
| A.5.6 | Information security in project management | Yes | Security by design | Project security checklist | Project docs |
| A.5.7 | Threat intelligence | Yes | Proactive defense | Threat intel platform | TI reports |
| A.5.8 | Information security in project management | Yes | Security integration | SDLC security gates | SDLC documentation |
| A.5.9 | Inventory of information assets | Yes | Asset management | CMDB | Asset inventory |
| A.5.10 | Acceptable use of information | Yes | Policy enforcement | AUP policy | Policy document |
| A.5.11 | Return of assets | Yes | Termination process | Offboarding checklist | Checklist |
| A.5.12 | Classification of information | Yes | Data protection | Classification policy | Policy document |
| A.5.13 | Labeling of information | Yes | Data handling | Labeling procedures | Procedures |
| A.5.14 | Information transfer | Yes | Secure data sharing | Transfer procedures | Procedures |
| A.5.15 | Access control | Yes | Unauthorized access prevention | Access control policy | Policy document |
| A.5.16 | Identity management | Yes | User identification | IAM system | IAM configuration |
| A.5.17 | Authentication information | Yes | Credential management | Password policy | Policy document |
| A.5.18 | Access rights | Yes | Authorization management | RBAC system | Role definitions |
| A.5.19 | Information security in supplier relationships | Yes | Third-party risk | Vendor management | Vendor assessments |
| A.5.20 | Addressing information security within supplier agreements | Yes | Contractual controls | Security addendum | Contracts |
| A.5.21 | Managing information security in the ICT supply chain | Yes | Supply chain security | SCA tools | Scan reports |
| A.5.22 | Monitoring, review and change management of supplier services | Yes | Ongoing oversight | Quarterly reviews | Review records |
| A.5.23 | Information security for use of cloud services | Yes | Cloud security | Cloud security policy | Policy document |
| A.5.24 | Planning and preparation for information security continuity | Yes | Business continuity | BCP/DR plans | Plan documents |
| A.5.25 | ICT readiness for business continuity | Yes | Disaster recovery | DR testing | Test reports |
| A.5.26 | Information security aspects of business continuity management | Yes | BC integration | BC procedures | Procedures |
| A.5.27 | Redundancy of information processing facilities | Yes | High availability | Redundant systems | Architecture docs |
| A.5.28 | Collection of evidence | Yes | Forensic readiness | Evidence collection | Procedures |
| A.5.29 | Information security during disruption | Yes | Incident resilience | Incident procedures | IR plan |
| A.5.30 | ICT readiness for business continuity | Yes | Recovery capability | DR testing | Test reports |
| A.5.31 | Legal, statutory, regulatory and contractual requirements | Yes | Compliance | Compliance register | Register |
| A.5.32 | Intellectual property rights | Yes | IP protection | IP policy | Policy document |
| A.5.33 | Protection of records | Yes | Record retention | Retention schedule | Schedule |
| A.5.34 | Privacy and protection of PII | Yes | GDPR/CCPA compliance | Privacy policy | Policy document |
| A.5.35 | Independent review of information security | Yes | Audit function | Internal audit program | Audit reports |
| A.5.36 | Compliance with policies and standards | Yes | Policy enforcement | Compliance monitoring | Monitoring reports |
| A.5.37 | Documented operating procedures | Yes | Standardization | SOP library | SOP documents |

### 4.2 People Controls (A.6)

| Control | Title | Applicability | Justification | Implementation | Evidence |
|---------|-------|---------------|---------------|----------------|----------|
| A.6.1 | Screening | Yes | Trustworthiness | Background checks | HR records |
| A.6.2 | Terms and conditions of employment | Yes | Security obligations | Employment contracts | Contracts |
| A.6.3 | Information security awareness, education and training | Yes | Human firewall | Training program | Training records |
| A.6.4 | Disciplinary process | Yes | Enforcement | Disciplinary policy | Policy document |
| A.6.5 | Responsibilities after termination or change of employment | Yes | Access revocation | Offboarding process | Process docs |
| A.6.6 | Confidentiality or non-disclosure agreements | Yes | Legal protection | NDA template | Template |
| A.6.7 | Remote working | Yes | Distributed workforce | Remote work policy | Policy document |
| A.6.8 | Information security event reporting | Yes | Incident detection | Reporting procedures | Procedures |

### 4.3 Physical Controls (A.7)

| Control | Title | Applicability | Justification | Implementation | Evidence |
|---------|-------|---------------|---------------|----------------|----------|
| A.7.1 | Physical security perimeters | Yes | Facility protection | Access control | Facility plans |
| A.7.2 | Physical entry controls | Yes | Unauthorized access prevention | Badge system | Access logs |
| A.7.3 | Securing offices, rooms and facilities | Yes | Physical protection | Security measures | Security audit |
| A.7.4 | Physical security monitoring | Yes | Surveillance | CCTV system | Monitoring records |
| A.7.5 | Protecting against physical and environmental threats | Yes | Disaster prevention | Environmental controls | Inspection reports |
| A.7.6 | Working in secure areas | Yes | Restricted access | Secure area procedures | Procedures |
| A.7.7 | Clear desk and clear screen | Yes | Information protection | Clean desk policy | Policy document |
| A.7.8 | Equipment siting and protection | Yes | Asset protection | Equipment placement | Facility plans |
| A.7.9 | Security of assets off-premises | Yes | Mobile assets | Mobile device policy | Policy document |
| A.7.10 | Storage media | Yes | Media protection | Media handling | Procedures |
| A.7.11 | Supporting utilities | Yes | Infrastructure protection | Utility redundancy | Infrastructure docs |
| A.7.12 | Cabling security | Yes | Network protection | Cable management | Network diagrams |
| A.7.13 | Equipment maintenance | Yes | Asset availability | Maintenance schedule | Schedule |
| A.7.14 | Secure disposal or re-use of equipment | Yes | Data sanitization | Disposal procedures | Procedures |

### 4.4 Technological Controls (A.8)

| Control | Title | Applicability | Justification | Implementation | Evidence |
|---------|-------|---------------|---------------|----------------|----------|
| A.8.1 | User endpoint devices | Yes | Endpoint security | EDR deployment | EDR console |
| A.8.2 | Privileged access rights | Yes | Privileged account management | PAM solution | PAM logs |
| A.8.3 | Information access restriction | Yes | Data protection | Access controls | IAM configuration |
| A.8.4 | Access to source code | Yes | Code protection | Source code access | Repository settings |
| A.8.5 | Secure authentication | Yes | Identity verification | MFA enforcement | IAM configuration |
| A.8.6 | Capacity management | Yes | Availability | Capacity monitoring | Monitoring dashboards |
| A.8.7 | Protection against malware | Yes | Malware defense | Antivirus/EDR | EDR console |
| A.8.8 | Management of technical vulnerabilities | Yes | Vulnerability management | VM program | VM reports |
| A.8.9 | Configuration management | Yes | Secure configuration | Baseline configs | Config repository |
| A.8.10 | Information deletion | Yes | Data disposal | Data deletion procedures | Procedures |
| A.8.11 | Data masking | Yes | Data protection | Masking implementation | Masking rules |
| A.8.12 | Data leakage prevention | Yes | Data exfiltration prevention | DLP solution | DLP console |
| A.8.13 | Information backup | Yes | Data recovery | Backup procedures | Backup logs |
| A.8.14 | Redundancy of information processing facilities | Yes | High availability | Redundant systems | Architecture docs |
| A.8.15 | Logging | Yes | Audit trail | Logging infrastructure | Log configuration |
| A.8.16 | Monitoring activities | Yes | Security monitoring | SIEM solution | SIEM console |
| A.8.17 | Clock synchronization | Yes | Time accuracy | NTP configuration | NTP settings |
| A.8.18 | Use of privileged utility programs | Yes | Privileged tool control | Utility access controls | Access logs |
| A.8.19 | Installation of software on operational systems | Yes | Software control | Software whitelist | Whitelist config |
| A.8.20 | Network security | Yes | Network protection | Network segmentation | Network diagrams |
| A.8.21 | Security of network services | Yes | Service security | Network security controls | Security configs |
| A.8.22 | Segregation of networks | Yes | Network isolation | VLANs, subnets | Network diagrams |
| A.8.23 | Web filtering | Yes | Web security | Web proxy/filter | Proxy configuration |
| A.8.24 | Use of cryptography | Yes | Data protection | Encryption implementation | Crypto inventory |
| A.8.25 | Secure development life cycle | Yes | Secure development | S-SDLC | SDLC documentation |
| A.8.26 | Application security requirements | Yes | App security | Security requirements | Requirements docs |
| A.8.27 | Secure system architecture and engineering principles | Yes | Secure design | Architecture reviews | Review records |
| A.8.28 | Secure coding | Yes | Code security | Coding standards | Standards document |
| A.8.29 | Security testing in development and acceptance | Yes | Security validation | Testing procedures | Test plans |
| A.8.30 | Outsourced development | Yes | Third-party dev | Vendor security | Vendor assessments |
| A.8.31 | Separation of development, test and production environments | Yes | Environment isolation | Environment separation | Environment config |
| A.8.32 | Change management | Yes | Controlled changes | Change control | Change records |
| A.8.33 | Test information | Yes | Test data protection | Test data procedures | Procedures |
| A.8.34 | Protection of information systems during audit testing | Yes | Audit protection | Audit procedures | Procedures |

---

## 5. CONTROL IMPLEMENTATION SUMMARY

### 5.1 Implementation Status

| Status | Count | Percentage |
|--------|-------|------------|
| Implemented | [X] | [X]% |
| Partially Implemented | [X] | [X]% |
| Planned | [X] | [X]% |
| Not Applicable | [X] | [X]% |
| **Total** | **93** | **100%** |

### 5.2 Implementation Roadmap

| Phase | Timeline | Controls | Priority |
|-------|----------|----------|----------|
| Phase 1 | Q1 2026 | Critical controls | P1 |
| Phase 2 | Q2 2026 | High-risk controls | P2 |
| Phase 3 | Q3 2026 | Medium-risk controls | P3 |
| Phase 4 | Q4 2026 | Remaining controls | P4 |

---

## 6. COMPLIANCE MAPPING

### 6.1 NIST 800-53 Mapping

| ISO Control | NIST Control | Title |
|-------------|--------------|-------|
| A.5.1 | PL-1 | Security Planning Policy |
| A.5.15 | AC-2 | Account Management |
| A.5.16 | IA-2 | Identification and Authentication |
| A.5.17 | IA-5 | Authenticator Management |
| A.5.18 | AC-3 | Access Enforcement |
| A.8.2 | AC-6 | Least Privilege |
| A.8.5 | IA-2(1) | Network Access - MFA |
| A.8.7 | SI-3 | Malicious Code Protection |
| A.8.8 | RA-5 | Vulnerability Scanning |
| A.8.9 | CM-2 | Baseline Configuration |
| A.8.15 | AU-6 | Audit Review |
| A.8.16 | SI-4 | Information System Monitoring |
| A.8.24 | SC-13 | Cryptographic Protection |
| A.8.25 | SA-3 | System Development Life Cycle |

### 6.2 SOC 2 Mapping

| ISO Control | SOC 2 Criteria | Description |
|-------------|----------------|-------------|
| A.5.1 | CC1.1 | Governance |
| A.5.15 | CC6.1 | Logical access |
| A.5.16 | CC6.1 | Identity management |
| A.5.18 | CC6.3 | Access establishment |
| A.6.3 | CC2.2 | Communication |
| A.8.5 | CC6.6 | Authentication |
| A.8.8 | CC7.1 | Security operations |
| A.8.15 | CC7.2 | System monitoring |
| A.8.16 | CC7.2 | Monitoring activities |

### 6.3 GDPR Mapping

| ISO Control | GDPR Article | Description |
|-------------|--------------|-------------|
| A.5.12 | Art. 5(1)(f) | Data classification |
| A.5.34 | Art. 32 | Security of processing |
| A.5.35 | Art. 32 | Security review |
| A.7.6 | Art. 32 | Secure areas |
| A.8.3 | Art. 32 | Access restriction |
| A.8.5 | Art. 32 | Authentication |
| A.8.10 | Art. 17 | Right to erasure |
| A.8.12 | Art. 32 | Data protection |
| A.8.24 | Art. 32 | Encryption |

---

## 7. EVIDENCE INDEX

### 7.1 Policy Documents

| Document ID | Title | Location | Last Updated |
|-------------|-------|----------|--------------|
| VS-TEMPLATE-SEC-001 | Security Baseline | 01_SECURITY_BASELINE.md | 2026-02-02 |
| VS-TEMPLATE-SEC-005 | Access Control Policy | 05_ACCESS_CONTROL_POLICY.md | 2026-02-02 |
| VS-TEMPLATE-SEC-007 | Data Classification Policy | 07_DATA_CLASSIFICATION_POLICY.md | 2026-02-02 |

### 7.2 Procedures

| Procedure | Purpose | Owner | Location |
|-----------|---------|-------|----------|
| Incident Response | Security incident handling | Security | IR Plan |
| Access Review | Quarterly access reviews | IAM Team | Access Review Procedure |
| Vulnerability Management | VM lifecycle | Security | VM Procedure |
| Change Management | Controlled changes | DevOps | Change Procedure |

### 7.3 Technical Evidence

| Evidence Type | Description | Location | Retention |
|---------------|-------------|----------|-----------|
| IAM Configuration | Identity management setup | IAM Console | 7 years |
| Network Diagrams | Network architecture | Document Repo | 7 years |
| Scan Reports | Vulnerability scans | Secure Storage | 3 years |
| Audit Logs | Security audit trail | SIEM | 7 years |
| Training Records | Security awareness | HR System | 7 years |

---

## 8. REVIEW AND MAINTENANCE

### 8.1 Review Triggers

| Trigger | Action | Timeline |
|---------|--------|----------|
| Annual review | Full SoA review | 1 year |
| Major incident | Review affected controls | 30 days |
| New regulation | Review compliance mapping | 60 days |
| Significant change | Review scope and controls | 30 days |
| Audit finding | Review and update | 30 days |

### 8.2 Maintenance Responsibilities

| Role | Responsibility |
|------|----------------|
| CISO | Overall SoA ownership |
| Compliance Team | SoA maintenance and updates |
| Security Team | Control implementation evidence |
| Internal Audit | Independent review |

---

## Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Chief Information Security Officer | [NAME] | ________________ | [DATE] |
| Chief Technology Officer | [NAME] | ________________ | [DATE] |
| Legal Counsel | [NAME] | ________________ | [DATE] |

---

*This Statement of Applicability is a controlled document and must be reviewed annually or upon significant changes to the ISMS.*
