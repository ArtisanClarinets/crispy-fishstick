---
Document: PRIVACY_IMPACT_ASSESSMENT
Doc ID: VS-TEMPLATE-SEC-008
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Data Protection Officer (DPO)
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Classification: Confidential
Source of Truth: [docs/05_security/08_PRIVACY_IMPACT_ASSESSMENT.md](docs/05_security/08_PRIVACY_IMPACT_ASSESSMENT.md)
Review Cycle: Per new feature/data processing activity
Next Review Date: [DATE]
---

# Privacy Impact Assessment (PIA)

**Project:** [[PROJECT_NAME]]  
**Standard:** GDPR Article 35 / ISO 27701 / NIST Privacy Framework  
**Scope:** All processing of personal data  
**Classification:** Confidential

---

## Document Control

| Field | Value |
|-------|-------|
| **Document Owner** | Data Protection Officer (DPO) |
| **Author** | Privacy Team |
| **Reviewers** | Legal Counsel, CISO, Product Owner |
| **Approver** | DPO |
| **Approval Date** | [DATE] |
| **Review Trigger** | New processing activity, significant change, annual review |
| **Version History** | v2.0.0 - Comprehensive PIA template |

### Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-02-02 | Privacy Team | Enterprise PIA framework |
| 1.0.0 | 2026-01-18 | Security Team | Initial template |

---

## Compliance Mapping

### GDPR Article 35

| Requirement | Section | Evidence |
|-------------|---------|----------|
| Systematic description of processing | 3. Processing Description | PIA Section 3 |
| Necessity and proportionality | 4. Necessity Assessment | PIA Section 4 |
| Risk assessment | 5. Risk Assessment | PIA Section 5 |
| Mitigation measures | 6. Risk Mitigation | PIA Section 6 |
| Prior consultation (if required) | 8. DPO Consultation | PIA Section 8 |

### ISO 27701:2019

| Control | Title | Section |
|---------|-------|---------|
| PIMS-SC-001 | Privacy policy | 2. Policy |
| PIMS-SC-002 | Privacy by design | 6. Mitigation |
| PIMS-SC-003 | Data subject rights | 7. Rights |
| PIMS-SC-004 | Data protection impact assessment | All |

### NIST Privacy Framework

| Function | Category | Section |
|----------|----------|---------|
| IDENTIFY-P | Inventory and Mapping | 3. Processing |
| GOVERN-P | Governance | 2. Policy |
| CONTROL-P | Data Processing | 6. Mitigation |
| PROTECT-P | Data Security | 6. Mitigation |

---

## 1. EXECUTIVE SUMMARY

| Field | Value |
|-------|-------|
| **PIA Reference** | PIA-YYYY-NNNN |
| **Processing Activity** | [NAME] |
| **System/Feature** | [SYSTEM NAME] |
| **Data Controller** | [CONTROLLER NAME] |
| **DPO Contact** | dpo@[company].com |
| **Assessment Date** | [DATE] |
| **Next Review** | [DATE + 1 year] |
| **Overall Risk Level** | [LOW/MEDIUM/HIGH] |
| **Approval Status** | [DRAFT/APPROVED/REJECTED] |

### Summary Statement

This Privacy Impact Assessment evaluates the privacy risks associated with [PROCESSING ACTIVITY]. The assessment covers data collection, processing, storage, sharing, and retention practices to ensure compliance with GDPR, CCPA, and other applicable privacy regulations.

---

## 2. PROCESSING CONTEXT

### 2.1 Processing Overview

| Question | Response |
|----------|----------|
| What is the purpose of this processing? | [DESCRIBE PURPOSE] |
| Is this a new or existing processing activity? | [NEW/EXISTING] |
| What business objective does this support? | [BUSINESS OBJECTIVE] |
| Are there alternative ways to achieve this objective? | [ALTERNATIVES] |
| Is this processing required by law or contract? | [YES/NO - EXPLAIN] |

### 2.2 Stakeholders

| Role | Name/Department | Responsibility |
|------|-----------------|----------------|
| Data Controller | [NAME] | Overall accountability |
| Data Processor(s) | [NAME(S)] | Processing on behalf of controller |
| System Owner | [NAME] | Technical implementation |
| Data Owner | [NAME] | Business ownership of data |
| DPO | [NAME] | Privacy oversight |
| Legal Counsel | [NAME] | Legal compliance |

### 2.3 Legal Basis Assessment

| Legal Basis | Applicable | Justification | Documentation |
|-------------|------------|---------------|---------------|
| Consent (Art. 6(1)(a)) | [YES/NO] | [REASON] | [EVIDENCE] |
| Contract (Art. 6(1)(b)) | [YES/NO] | [REASON] | [EVIDENCE] |
| Legal Obligation (Art. 6(1)(c)) | [YES/NO] | [REASON] | [EVIDENCE] |
| Vital Interests (Art. 6(1)(d)) | [YES/NO] | [REASON] | [EVIDENCE] |
| Public Task (Art. 6(1)(e)) | [YES/NO] | [REASON] | [EVIDENCE] |
| Legitimate Interests (Art. 6(1)(f)) | [YES/NO] | [REASON] | [LIA REFERENCE] |

### 2.4 Legitimate Interests Assessment (if applicable)

| Element | Assessment |
|---------|------------|
| Legitimate interest pursued | [DESCRIBE] |
| Necessity of processing | [ASSESS NECESSITY] |
| Balancing test - Individual interests | [ASSESS IMPACT ON INDIVIDUALS] |
| Balancing test conclusion | [CONCLUSION] |
| Opt-out mechanism | [MECHANISM] |

---

## 3. DATA PROCESSING DESCRIPTION

### 3.1 Data Subjects

| Category | Description | Estimated Volume |
|----------|-------------|------------------|
| Customers | [DESCRIPTION] | [NUMBER] |
| Employees | [DESCRIPTION] | [NUMBER] |
| Prospects | [DESCRIPTION] | [NUMBER] |
| Website Visitors | [DESCRIPTION] | [NUMBER] |
| Third Parties | [DESCRIPTION] | [NUMBER] |

### 3.2 Personal Data Categories

| Data Category | Fields/Types | Sensitive (Art. 9)? | Volume |
|---------------|--------------|---------------------|--------|
| Identity | Name, email, phone, address | No | [VOLUME] |
| Contact | Email, phone, address | No | [VOLUME] |
| Demographic | Age, gender, location | No | [VOLUME] |
| Financial | Payment info, bank details | No | [VOLUME] |
| Behavioral | Usage data, preferences | No | [VOLUME] |
| Technical | IP, device info, cookies | No | [VOLUME] |
| Special Categories | Health, biometrics, etc. | Yes | [VOLUME] |
| Criminal | Convictions, offenses | Yes | [VOLUME] |

### 3.3 Data Flow Diagram

```
[Data Subject] 
    ↓
[Collection Point - Website/App/API]
    ↓
[Processing Layer - Application Logic]
    ↓
[Storage - Database/Storage]
    ↓
[Sharing - Third Parties]
    ↓
[Retention/Deletion]
```

### 3.4 Processing Activities

| Activity | Purpose | Legal Basis | Retention |
|----------|---------|-------------|-----------|
| Collection | [PURPOSE] | [BASIS] | [PERIOD] |
| Storage | [PURPOSE] | [BASIS] | [PERIOD] |
| Analysis | [PURPOSE] | [BASIS] | [PERIOD] |
| Sharing | [PURPOSE] | [BASIS] | [PERIOD] |
| Deletion | [PURPOSE] | [BASIS] | [PERIOD] |

### 3.5 Data Recipients

| Recipient | Type | Location | Data Shared | Safeguards |
|-----------|------|----------|-------------|------------|
| Internal - [DEPT] | Controller | [LOCATION] | [DATA] | [SAFEGUARDS] |
| [VENDOR NAME] | Processor | [LOCATION] | [DATA] | [DPA + SCCs] |
| [PARTNER NAME] | Joint Controller | [LOCATION] | [DATA] | [AGREEMENT] |

### 3.6 International Transfers

| Transfer To | Mechanism | Safeguards | Adequacy Decision |
|-------------|-----------|------------|-------------------|
| [COUNTRY] | [SCCs/BCRs/Adequacy] | [ADDITIONAL SAFEGUARDS] | [YES/NO] |

### 3.7 Retention and Deletion

| Data Category | Retention Period | Deletion Method | Trigger |
|---------------|------------------|-----------------|---------|
| [CATEGORY] | [PERIOD] | [METHOD] | [TRIGGER] |

---

## 4. NECESSITY AND PROPORTIONALITY ASSESSMENT

### 4.1 Necessity Assessment

| Data Element | Purpose | Necessary? | Less Intrusive Alternative? |
|--------------|---------|------------|------------------------------|
| [FIELD] | [PURPOSE] | [YES/NO] | [ALTERNATIVE] |

### 4.2 Data Minimization

| Assessment | Finding |
|------------|---------|
| Is all collected data necessary? | [YES/NO - EXPLAIN] |
| Can any data be anonymized? | [YES/NO - EXPLAIN] |
| Can any data be pseudonymized? | [YES/NO - EXPLAIN] |
| Is data collection limited in scope? | [YES/NO - EXPLAIN] |

### 4.3 Purpose Limitation

| Assessment | Finding |
|------------|---------|
| Is purpose clearly defined? | [YES/NO] |
| Is processing limited to stated purpose? | [YES/NO] |
| Are compatible purposes documented? | [YES/NO] |

### 4.4 Proportionality Assessment

| Factor | Assessment |
|--------|------------|
| Scope of processing | [ASSESSMENT] |
| Intrusiveness | [ASSESSMENT] |
| Individual impact | [ASSESSMENT] |
| Societal benefit | [ASSESSMENT] |
| Overall proportionality | [CONCLUSION] |

---

## 5. RISK ASSESSMENT

### 5.1 Risk Identification

| Risk ID | Risk Description | Category | Likelihood | Impact | Risk Level |
|---------|------------------|----------|------------|--------|------------|
| R-001 | Unauthorized access to personal data | Security | Medium | High | High |
| R-002 | Data breach during transmission | Security | Low | High | Medium |
| R-003 | Excessive data retention | Compliance | Medium | Medium | Medium |
| R-004 | Insufficient consent mechanisms | Legal | Medium | High | High |
| R-005 | Inability to fulfill data subject rights | Legal | Low | High | Medium |
| R-006 | Unlawful international transfer | Legal | Low | Critical | High |
| R-007 | Function creep / scope expansion | Privacy | Medium | Medium | Medium |
| R-008 | Discrimination through profiling | Rights | Low | High | Medium |
| R-009 | Surveillance concerns | Rights | Medium | Medium | Medium |
| R-010 | Third-party data misuse | Vendor | Medium | High | High |

### 5.2 Risk Scoring Matrix

| Likelihood \ Impact | Low (1) | Medium (2) | High (3) | Critical (4) |
|---------------------|---------|------------|----------|--------------|
| **High (4)** | 4 | 8 | 12 | 16 |
| **Medium (3)** | 3 | 6 | 9 | 12 |
| **Low (2)** | 2 | 4 | 6 | 8 |
| **Rare (1)** | 1 | 2 | 3 | 4 |

**Risk Levels:** 1-4 Low, 5-8 Medium, 9-12 High, 13-16 Critical

### 5.3 Rights and Freedoms Impact

| Right | Impact Level | Explanation |
|-------|--------------|-------------|
| Right to be informed | [LOW/MED/HIGH] | [EXPLANATION] |
| Right of access | [LOW/MED/HIGH] | [EXPLANATION] |
| Right to rectification | [LOW/MED/HIGH] | [EXPLANATION] |
| Right to erasure | [LOW/MED/HIGH] | [EXPLANATION] |
| Right to restrict processing | [LOW/MED/HIGH] | [EXPLANATION] |
| Right to data portability | [LOW/MED/HIGH] | [EXPLANATION] |
| Right to object | [LOW/MED/HIGH] | [EXPLANATION] |
| Rights re: automated decision-making | [LOW/MED/HIGH] | [EXPLANATION] |

### 5.4 Special Considerations

| Consideration | Applicable | Mitigation |
|---------------|------------|------------|
| Children's data (under 16) | [YES/NO] | [MEASURES] |
| Vulnerable individuals | [YES/NO] | [MEASURES] |
| Large-scale processing | [YES/NO] | [MEASURES] |
| Systematic monitoring | [YES/NO] | [MEASURES] |
| Sensitive data processing | [YES/NO] | [MEASURES] |
| Automated decision-making | [YES/NO] | [MEASURES] |
| Genetic/biometric data | [YES/NO] | [MEASURES] |

---

## 6. RISK MITIGATION

### 6.1 Technical Measures

| Measure | Implementation | Risk Addressed | Effectiveness |
|---------|----------------|----------------|---------------|
| Encryption at rest | AES-256 | R-001 | High |
| Encryption in transit | TLS 1.3 | R-002 | High |
| Access controls | RBAC + MFA | R-001 | High |
| Pseudonymization | Tokenization | R-001, R-007 | Medium |
| Anonymization | Data masking | R-001, R-007 | High |
| Audit logging | Comprehensive logs | All | Medium |
| DLP | Data loss prevention | R-001 | Medium |
| Privacy-enhancing tech | PETs | Various | Medium |

### 6.2 Organizational Measures

| Measure | Implementation | Risk Addressed | Effectiveness |
|---------|----------------|----------------|---------------|
| Privacy by design | Development process | All | High |
| Data minimization | Collection limits | R-007 | High |
| Retention limits | Automated deletion | R-003 | High |
| Staff training | Privacy awareness | All | Medium |
| DPIA process | This assessment | All | High |
| DPO oversight | Regular review | All | High |
| Vendor management | Due diligence | R-010 | Medium |
| Incident response | Breach procedures | All | High |

### 6.3 Data Subject Rights Implementation

| Right | Mechanism | SLA | Status |
|-------|-----------|-----|--------|
| Access request | Self-service portal | 30 days | [IMPLEMENTED] |
| Rectification | Self-service + support | 30 days | [IMPLEMENTED] |
| Erasure | Automated deletion | 30 days | [IMPLEMENTED] |
| Portability | Data export | 30 days | [IMPLEMENTED] |
| Objection | Preference center | Immediate | [IMPLEMENTED] |
| Restriction | Processing pause | Immediate | [IMPLEMENTED] |

### 6.4 Residual Risk

| Risk ID | Initial Risk | Mitigation Effectiveness | Residual Risk | Acceptable? |
|---------|--------------|--------------------------|---------------|-------------|
| R-001 | High | High | Low | Yes |
| R-002 | Medium | High | Low | Yes |
| R-003 | Medium | High | Low | Yes |
| R-004 | High | High | Low | Yes |
| R-005 | Medium | Medium | Low | Yes |
| R-006 | High | High | Low | Yes |
| R-007 | Medium | High | Low | Yes |
| R-008 | Medium | Medium | Low | Yes |
| R-009 | Medium | Medium | Low | Yes |
| R-010 | High | Medium | Medium | [REQUIRES MONITORING] |

---

## 7. CONSULTATION

### 7.1 Internal Consultation

| Stakeholder | Consulted | Date | Feedback |
|-------------|-----------|------|----------|
| DPO | [YES/NO] | [DATE] | [FEEDBACK] |
| Legal | [YES/NO] | [DATE] | [FEEDBACK] |
| Security | [YES/NO] | [DATE] | [FEEDBACK] |
| Engineering | [YES/NO] | [DATE] | [FEEDBACK] |
| Product | [YES/NO] | [DATE] | [FEEDBACK] |
| Marketing | [YES/NO] | [DATE] | [FEEDBACK] |

### 7.2 External Consultation (if required)

| Authority | Consulted | Date | Response |
|-----------|-----------|------|----------|
| Supervisory Authority | [YES/NO] | [DATE] | [RESPONSE] |
| Data Subjects | [YES/NO] | [DATE] | [RESPONSE] |
| Experts | [YES/NO] | [DATE] | [RESPONSE] |

---

## 8. DPO ASSESSMENT

### 8.1 DPO Review

| Element | Assessment |
|---------|------------|
| Compliance with GDPR | [COMPLIANT/PARTIALLY/NON-COMPLIANT] |
| Risk to rights and freedoms | [LOW/MEDIUM/HIGH] |
| Necessity of prior consultation | [YES/NO - REASON] |
| Recommended actions | [ACTIONS] |

### 8.2 Prior Consultation Required?

Consultation with supervisory authority required if:
- [ ] High risk cannot be mitigated
- [ ] Systematic and extensive profiling
- [ ] Large-scale processing of special categories
- [ ] Large-scale systematic monitoring of public area

**Decision:** [REQUIRED/NOT REQUIRED]

---

## 9. APPROVAL AND SIGN-OFF

### 9.1 Approval Decision

| Decision | [APPROVED / APPROVED WITH CONDITIONS / REJECTED] |
|----------|--------------------------------------------------|
| Conditions | [IF APPLICABLE, LIST CONDITIONS] |
| Review Date | [NEXT REVIEW DATE] |

### 9.2 Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Data Protection Officer | [NAME] | ________________ | [DATE] |
| Data Controller | [NAME] | ________________ | [DATE] |
| System Owner | [NAME] | ________________ | [DATE] |
| Legal Counsel | [NAME] | ________________ | [DATE] |

---

## 10. APPENDICES

### Appendix A: PIA Triggers

A PIA is required for:
- New processing activities involving personal data
- Significant changes to existing processing
- Use of new technologies
- Large-scale processing
- Systematic monitoring
- Processing of special categories
- Automated decision-making
- Data matching/combining
- Innovative use/application of technology

### Appendix B: Data Subject Rights Checklist

| Right | Implemented? | Mechanism | Evidence |
|-------|--------------|-----------|----------|
| Information | [ ] | [MECHANISM] | [EVIDENCE] |
| Access | [ ] | [MECHANISM] | [EVIDENCE] |
| Rectification | [ ] | [MECHANISM] | [EVIDENCE] |
| Erasure | [ ] | [MECHANISM] | [EVIDENCE] |
| Restriction | [ ] | [MECHANISM] | [EVIDENCE] |
| Portability | [ ] | [MECHANISM] | [EVIDENCE] |
| Objection | [ ] | [MECHANISM] | [EVIDENCE] |
| Automated decisions | [ ] | [MECHANISM] | [EVIDENCE] |

### Appendix C: Document References

| Document ID | Title | Relationship |
|-------------|-------|--------------|
| VS-TEMPLATE-SEC-001 | Security Baseline | Security controls |
| VS-TEMPLATE-SEC-007 | Data Classification Policy | Data handling |
| VS-TEMPLATE-SEC-010 | Security Event Logging | Audit trail |

---

*This Privacy Impact Assessment is a controlled document and must be reviewed when processing activities change.*
