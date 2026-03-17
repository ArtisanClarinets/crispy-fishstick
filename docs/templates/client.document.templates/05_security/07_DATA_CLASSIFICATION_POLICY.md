---
Document: DATA_CLASSIFICATION_POLICY
Doc ID: VS-TEMPLATE-SEC-007
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Chief Information Security Officer (CISO) / Data Protection Officer (DPO)
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Classification: Highly Confidential
Source of Truth: [docs/05_security/07_DATA_CLASSIFICATION_POLICY.md](docs/05_security/07_DATA_CLASSIFICATION_POLICY.md)
Review Cycle: Annual
Next Review Date: [DATE + 1 year]
---

# Data Classification Policy

**Project:** [[PROJECT_NAME]]  
**Standard:** ISO 27001 A.5.12-A.5.14 / NIST 800-53 MP Family / GDPR / CCPA  
**Scope:** All data assets across the organization  
**Classification:** Highly Confidential

---

## Document Control

| Field | Value |
|-------|-------|
| **Document Owner** | CISO / Data Protection Officer (DPO) |
| **Author** | Data Governance Team |
| **Reviewers** | Legal Counsel, CTO, Privacy Team |
| **Approver** | CISO |
| **Approval Date** | [DATE] |
| **Review Frequency** | Annual |
| **Version History** | v2.0.0 - Enterprise data classification framework |

### Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-02-02 | Data Governance | Comprehensive enterprise classification |
| 1.0.0 | 2026-01-18 | Security Team | Initial template |

---

## Compliance Mapping

### ISO 27001:2022

| Control | Title | Section |
|---------|-------|---------|
| A.5.9 | Inventory of information assets | 3. Data Inventory |
| A.5.12 | Classification of information | 4. Classification Levels |
| A.5.13 | Labeling of information | 5. Labeling Requirements |
| A.5.14 | Information transfer | 7. Data Handling |
| A.5.33 | Protection of records | 9. Retention |
| A.5.34 | Privacy and protection of PII | 6. Special Categories |
| A.8.3 | Information access restriction | 7. Access Controls |
| A.8.10 | Information deletion | 10. Disposal |
| A.8.11 | Data masking | 7. Data Handling |
| A.8.12 | Data leakage prevention | 8. DLP |

### GDPR Articles

| Article | Description | Section |
|---------|-------------|---------|
| Art. 5 | Principles | 4. Classification Levels |
| Art. 9 | Special categories | 6. Special Categories |
| Art. 17 | Right to erasure | 10. Disposal |
| Art. 25 | Data protection by design | 7. Handling Controls |
| Art. 30 | Records of processing | 3. Data Inventory |
| Art. 32 | Security of processing | 7. Handling Controls |
| Art. 33 | Breach notification | 11. Incident Response |

### CCPA/CPRA

| Section | Description | Section |
|---------|-------------|---------|
| 1798.100 | Notice at collection | 3. Data Inventory |
| 1798.105 | Right to deletion | 10. Disposal |
| 1798.110 | Right to know | 3. Data Inventory |
| 1798.150 | Reasonable security | 7. Handling Controls |

### NIST Cybersecurity Framework 2.0

| Function | Category | Section |
|----------|----------|---------|
| IDENTIFY (ID) | Asset Management | 3. Data Inventory |
| PROTECT (PR) | Data Security | 4-10 |

---

## 1. EXECUTIVE SUMMARY

This Data Classification Policy establishes a comprehensive framework for classifying, handling, and protecting data assets based on their sensitivity, value, and regulatory requirements. The policy ensures appropriate controls are applied to protect data throughout its lifecycle.

---

## 2. POLICY STATEMENT

All organizational data must be classified according to this policy. Data owners are responsible for classification, and all personnel handling data must apply appropriate controls based on classification level.

---

## 3. DATA INVENTORY

### 3.1 Data Asset Registry

| Field | Description | Required |
|-------|-------------|----------|
| Asset ID | Unique identifier | Yes |
| Asset Name | Descriptive name | Yes |
| Data Owner | Business owner | Yes |
| Classification | Current classification | Yes |
| Data Type | Category of data | Yes |
| Storage Location | Where stored | Yes |
| Retention Period | How long retained | Yes |
| Legal Hold | Litigation hold status | Yes |
| Last Reviewed | Review date | Yes |

### 3.2 Data Categories

| Category | Description | Examples |
|----------|-------------|----------|
| Customer Data | Information about customers | Contact info, preferences |
| Employee Data | HR and personnel information | PII, compensation, performance |
| Financial Data | Monetary and accounting data | Transactions, budgets, forecasts |
| Intellectual Property | Proprietary information | Source code, patents, trade secrets |
| Operational Data | Business operations data | Logs, metrics, configurations |
| Third-Party Data | Data from partners/vendors | Contracts, shared data |
| Public Data | Information for public release | Marketing, press releases |

---

## 4. CLASSIFICATION LEVELS

### 4.1 Classification Matrix

| Level | Description | Impact of Unauthorized Disclosure | Examples |
|-------|-------------|-----------------------------------|----------|
| **Public** | Information specifically cleared for public release | None | Marketing materials, public website content, press releases |
| **Internal** | Information intended for internal use only | Limited business impact | Internal memos, training materials, non-sensitive policies |
| **Confidential** | Sensitive information requiring restricted access | Significant business impact | Strategy documents, unannounced features, customer lists |
| **Highly Confidential** | Critical data requiring maximal protection | Severe business/regulatory impact | Passwords, encryption keys, PII, financial records, health data |
| **Restricted** | Highest sensitivity, strictly controlled | Catastrophic impact | M&A plans, security vulnerabilities, state secrets |

### 4.2 Classification Criteria

| Factor | Public | Internal | Confidential | Highly Confidential | Restricted |
|--------|--------|----------|--------------|---------------------|------------|
| **Regulatory Requirements** | None | Minimal | Moderate | High (GDPR, HIPAA) | Critical |
| **Business Impact** | None | Low | Medium | High | Critical |
| **Competitive Advantage** | None | Low | Medium | High | Critical |
| **Legal Sensitivity** | None | Low | Medium | High | Critical |
| **Privacy Impact** | None | Minimal | Moderate | High (PII) | Critical |

### 4.3 Data Classification Examples

| Data Type | Typical Classification | Notes |
|-----------|------------------------|-------|
| Public website content | Public | Approved for public release |
| Employee directory | Internal | Corporate use only |
| Marketing plans | Confidential | Pre-launch information |
| Customer PII | Highly Confidential | GDPR/CCPA protected |
| Source code | Confidential / Highly Confidential | Depends on sensitivity |
| Encryption keys | Highly Confidential / Restricted | Key classification |
| Security vulnerabilities | Restricted | Until remediated |
| Financial statements (pre-release) | Confidential | Until public filing |
| HR records | Highly Confidential | Employee privacy |
| Health records | Highly Confidential | HIPAA protected |
| System passwords | Highly Confidential | Credential protection |
| API keys/tokens | Highly Confidential | Authentication secrets |

---

## 5. LABELING REQUIREMENTS

### 5.1 Digital Labeling

| Classification | Label Format | Placement |
|----------------|--------------|-----------|
| Public | [PUBLIC] | Document header/footer |
| Internal | [INTERNAL] | Document header/footer |
| Confidential | [CONFIDENTIAL] | Document header/footer, watermark |
| Highly Confidential | [HIGHLY CONFIDENTIAL] | Document header/footer, watermark, encryption |
| Restricted | [RESTRICTED] | Document header/footer, watermark, encryption, access list |

### 5.2 Physical Labeling

| Classification | Label Color | Label Text |
|----------------|-------------|------------|
| Public | Green | PUBLIC |
| Internal | Blue | INTERNAL |
| Confidential | Yellow | CONFIDENTIAL |
| Highly Confidential | Red | HIGHLY CONFIDENTIAL |
| Restricted | Red + Black | RESTRICTED - AUTHORIZED ACCESS ONLY |

### 5.3 System Labeling

| System Type | Labeling Method |
|-------------|-----------------|
| Databases | Classification tag in schema |
| File shares | Folder classification labels |
| Cloud storage | Bucket/folder tags |
| Applications | Data classification field |
| APIs | Classification in documentation |

---

## 6. SPECIAL DATA CATEGORIES

### 6.1 Personal Data (GDPR)

| Category | Definition | Classification | Special Handling |
|----------|------------|----------------|------------------|
| Personal Data | Any info relating to identified/identifiable person | Highly Confidential | Consent, purpose limitation |
| Sensitive Personal Data | Racial, ethnic, political, religious, trade union, genetic, biometric, health, sex life/orientation | Highly Confidential | Enhanced consent, DPA required |
| Children's Data | Under 16 (or 13 with parental consent) | Highly Confidential | Age verification, parental consent |

### 6.2 CCPA Personal Information

| Category | Examples | Classification |
|----------|----------|----------------|
| Identifiers | Name, email, SSN, IP address | Highly Confidential |
| Commercial | Purchase history, consuming tendencies | Confidential |
| Biometric | Fingerprints, facial recognition | Highly Confidential |
| Internet Activity | Browsing history, search history | Confidential |
| Geolocation | Precise location data | Highly Confidential |
| Employment | Professional/employment-related | Highly Confidential |

### 6.3 Health Data (HIPAA)

| Category | Classification | Requirements |
|----------|----------------|--------------|
| PHI - Electronic (ePHI) | Highly Confidential | Encryption, access controls, audit logs |
| PHI - Physical | Highly Confidential | Physical security, access logs |
| De-identified | Internal | 18 identifiers removed |

### 6.4 Financial Data

| Category | Classification | Requirements |
|----------|----------------|--------------|
| Payment card data (CHD) | Highly Confidential | PCI DSS compliance |
| Bank account information | Highly Confidential | Encryption, access controls |
| Financial records | Confidential / Highly Confidential | Audit trail, retention |

---

## 7. DATA HANDLING CONTROLS

### 7.1 Handling Matrix

| Control | Public | Internal | Confidential | Highly Confidential | Restricted |
|---------|--------|----------|--------------|---------------------|------------|
| **Encryption at Rest** | Optional | Recommended | Required | Required (AES-256) | Required (AES-256 + HSM) |
| **Encryption in Transit** | TLS | TLS | TLS 1.2+ | TLS 1.3 | TLS 1.3 + Certificate pinning |
| **Access Controls** | Authentication | RBAC | RBAC + Need-to-know | RBAC + MFA + Justification | RBAC + MFA + Approval + Logging |
| **Audit Logging** | Standard | Standard | Enhanced | Comprehensive | Comprehensive + Real-time |
| **Data Masking** | N/A | N/A | For non-prod | Required | Required |
| **DLP** | N/A | Monitor | Monitor + Alert | Block + Alert | Block + Alert + Immediate review |
| **Backup** | Standard | Standard | Encrypted | Encrypted + Air-gapped | Encrypted + Air-gapped + Geographic separation |
| **Retention** | Per policy | Per policy | Per policy | Strict retention + secure deletion | Strict retention + secure deletion + legal hold |

### 7.2 Access Requirements by Classification

| Classification | Authentication | Authorization | MFA | Justification |
|----------------|----------------|---------------|-----|---------------|
| Public | Optional | N/A | N/A | N/A |
| Internal | Required | Role-based | Recommended | N/A |
| Confidential | Required | Role-based + Need-to-know | Required for remote | Business need |
| Highly Confidential | Required | Explicit approval | Required | Documented justification |
| Restricted | Required | Explicit approval + Dual control | Hardware token | Executive approval |

### 7.3 Data Transmission Controls

| Classification | Email | File Transfer | Cloud Sharing | Physical |
|----------------|-------|---------------|---------------|----------|
| Public | Allowed | Allowed | Allowed | Allowed |
| Internal | Allowed (corporate) | Allowed (secure) | Allowed (corporate) | Allowed |
| Confidential | Encrypted | Encrypted (SFTP) | Corporate platform only | Registered mail |
| Highly Confidential | Prohibited | Secure file share only | Approved platform only | Courier + encryption |
| Restricted | Prohibited | Secure courier only | Prohibited | Hand delivery only |

---

## 8. DATA LOSS PREVENTION (DLP)

### 8.1 DLP Controls

| Control | Implementation | Coverage |
|---------|----------------|----------|
| Endpoint DLP | Monitor USB, clipboard, printing | All endpoints |
| Network DLP | Monitor egress traffic | All network egress |
| Email DLP | Scan attachments and content | All email |
| Cloud DLP | Monitor cloud app usage | Approved cloud apps |
| Database DLP | Monitor database access | All production databases |

### 8.2 DLP Policies

| Classification | Endpoint Action | Network Action | Email Action |
|----------------|-----------------|----------------|--------------|
| Public | Monitor | Allow | Allow |
| Internal | Monitor + Alert | Monitor + Alert | Monitor |
| Confidential | Block USB + Alert | Block unauthorized + Alert | Block external + Alert |
| Highly Confidential | Block all egress + Alert | Block unauthorized + Alert | Block all + Alert |
| Restricted | Block all + Immediate alert | Block all + Immediate alert | Block all + Immediate alert |

---

## 9. DATA RETENTION

### 9.1 Retention Schedule

| Data Category | Retention Period | Legal Basis | Disposal Method |
|---------------|------------------|-------------|-----------------|
| Customer PII | Duration of relationship + 7 years | Contract + Legal obligation | Secure deletion |
| Employee Records | Duration of employment + 7 years | Legal obligation | Secure deletion |
| Financial Records | 7 years | Tax/regulatory | Secure deletion |
| Security Logs | 7 years | Compliance | Secure deletion |
| System Logs | 1 year | Operational | Secure deletion |
| Email | 3 years | Business need | Secure deletion |
| Contracts | Duration + 7 years | Legal obligation | Secure deletion |
| Marketing Data | 2 years post-unsubscribe | Consent | Secure deletion |
| Backup Data | Per backup policy | DR requirements | Secure deletion |

### 9.2 Legal Hold Procedures

| Trigger | Action | Owner |
|---------|--------|-------|
| Litigation notice | Suspend deletion for affected data | Legal |
| Regulatory inquiry | Suspend deletion per scope | Legal |
| Investigation | Preserve evidence per scope | Security |
| Hold release | Resume normal retention | Legal |

---

## 10. DATA DISPOSAL

### 10.1 Disposal Methods

| Media Type | Method | Verification |
|------------|--------|--------------|
| Hard drives | Physical destruction (shredding) | Certificate of destruction |
| SSDs | Cryptographic erase + physical destruction | Verification log |
| Tapes | Degaussing + physical destruction | Degaussing log |
| Paper | Cross-cut shredding (DIN 66399 P-4) | Witness signature |
| Cloud data | Cryptographic deletion + overwrite | API confirmation |
| Mobile devices | Factory reset + encryption wipe | Verification scan |

### 10.2 Disposal Procedures

| Step | Activity | Owner | Evidence |
|------|----------|-------|----------|
| 1 | Identify data for disposal | Data Owner | Disposal request |
| 2 | Verify retention period expired | Legal | Retention check |
| 3 | Check for legal holds | Legal | Hold status |
| 4 | Execute disposal method | IT/Security | Disposal log |
| 5 | Verify destruction | Security | Verification record |
| 6 | Document completion | Security | Certificate |

---

## 11. INCIDENT RESPONSE

### 11.1 Data Breach Classification

| Severity | Scope | Notification Timeline |
|----------|-------|----------------------|
| Critical | >1000 records or sensitive data | Immediate |
| High | 100-1000 records | 24 hours |
| Medium | <100 records | 72 hours |
| Low | No PII, minimal impact | 7 days |

### 11.2 Breach Notification Requirements

| Regulation | Timeline | To Whom |
|------------|----------|---------|
| GDPR | 72 hours to DPA | Supervisory Authority |
| GDPR (high risk) | Without delay | Affected individuals |
| CCPA | Without delay | California residents |
| State laws | Varies | Affected individuals |
| Contracts | Per SLA | Customers |

---

## 12. ROLES AND RESPONSIBILITIES

| Role | Responsibilities |
|------|------------------|
| Data Owner | Classification, access approval, retention decisions |
| Data Steward | Day-to-day data management, quality |
| CISO | Policy enforcement, security controls |
| DPO | Privacy compliance, regulatory requirements |
| Legal | Legal holds, regulatory guidance |
| All Employees | Proper handling per classification |

---

## 13. TRAINING AND AWARENESS

| Training | Audience | Frequency | Content |
|----------|----------|-----------|---------|
| Data Classification | All employees | Annual | Classification levels, handling |
| Data Handling | Data handlers | Annual | Specific controls by classification |
| DPO Training | DPOs | Annual | Regulatory requirements |
| Role-specific | Privileged users | Annual | Advanced handling procedures |

---

## 14. APPENDICES

### Appendix A: Classification Decision Tree

```
Is the data regulated (GDPR, HIPAA, PCI)?
├── YES → Highly Confidential or Restricted
└── NO → Is it proprietary/competitive?
    ├── YES → Confidential or Highly Confidential
    └── NO → Is it for internal use only?
        ├── YES → Internal
        └── NO → Public
```

### Appendix B: Quick Reference Card

| Classification | Label | Encryption | MFA | Share Externally |
|----------------|-------|------------|-----|------------------|
| Public | Green | Optional | No | Yes |
| Internal | Blue | Recommended | Recommended | No |
| Confidential | Yellow | Required | Required | Encrypted only |
| Highly Confidential | Red | Required | Required | No |
| Restricted | Red/Black | Required + HSM | Hardware token | No |

### Appendix C: Document References

| Document ID | Title | Relationship |
|-------------|-------|--------------|
| VS-TEMPLATE-SEC-001 | Security Baseline | Parent document |
| VS-TEMPLATE-SEC-005 | Access Control Policy | Access controls |
| VS-TEMPLATE-SEC-008 | Privacy Impact Assessment | Privacy requirements |
| VS-TEMPLATE-SEC-010 | Security Event Logging | Audit requirements |

---

## Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Chief Information Security Officer | [NAME] | ________________ | [DATE] |
| Data Protection Officer | [NAME] | ________________ | [DATE] |
| Legal Counsel | [NAME] | ________________ | [DATE] |

---

*This document contains highly confidential data handling procedures and must be protected according to the Data Classification Policy.*
