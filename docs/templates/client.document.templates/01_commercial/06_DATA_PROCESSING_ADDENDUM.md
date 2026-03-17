---
Document: DATA_PROCESSING_ADDENDUM
Doc ID: VS-TEMPLATE-COMM-006
Client: [[CLIENT_NAME]]
Project: [[PROJECT_NAME]]
Owner: Data Privacy Officer / Legal
Contributors: Security Lead, Operations Lead, Client Stakeholders
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/01_commercial/06_DATA_PROCESSING_ADDENDUM.md
Approvers: [[DPO]] / [[LEGAL_COUNSEL]] / [[CLIENT_DPO]]
---

# Data Processing Addendum (DPA)

## Purpose
This Data Processing Addendum ("DPA") is an integral part of the Master Service Agreement ("MSA") or Statement of Work ("SOW") between Vantus Systems ("Processor") and [[CLIENT_NAME]] ("Controller"). This DPA ensures compliance with data protection laws including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other applicable privacy regulations. Use this document to:
- Define roles and responsibilities under data protection law
- Document data processing activities and lawful basis
- Establish security and confidentiality requirements
- Define data subject rights procedures
- Ensure compliant international data transfers
- Document sub-processor arrangements

## Instructions
1. **Legal Review:** Have legal counsel and Data Protection Officer review
2. **Customization:** Replace all `[[PLACEHOLDERS]]` with project-specific values
3. **Data Mapping:** Complete data inventory before finalizing
4. **Jurisdiction:** Ensure compliance with all applicable jurisdictions
5. **Updates:** Review and update when processing activities change

---

## 1. DEFINITIONS AND ROLES

### 1.1 Definitions

**"Personal Data"** means any information relating to an identified or identifiable natural person ("Data Subject"). An identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, identification number, location data, online identifier, or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural, or social identity of that natural person.

**"Processing"** means any operation or set of operations which is performed on Personal Data or on sets of Personal Data, whether or not by automated means, such as collection, recording, organization, structuring, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure, or destruction.

**"Data Subject"** means the identified or identifiable natural person to whom Personal Data relates.

**"Controller"** means the natural or legal person, public authority, agency, or other body which, alone or jointly with others, determines the purposes and means of the Processing of Personal Data.

**"Processor"** means a natural or legal person, public authority, agency, or other body which processes Personal Data on behalf of the Controller.

**"Sub-processor"** means any Processor engaged by the Processor to assist in fulfilling its obligations under this DPA.

### 1.2 Roles

| Party | Role | Responsibilities |
|---|---|---|
| **[[CLIENT_NAME]]** | **Data Controller** | Determines purposes and means of processing; ensures lawful basis; responds to data subject requests; maintains records of processing |
| **Vantus Systems** | **Data Processor** | Processes data only on Controller's instructions; implements security measures; assists with data subject requests; maintains processing records |

### 1.3 Joint Controller Arrangements (if applicable)

If both parties jointly determine the purposes and means of processing:
- Responsibilities allocated per [[JOINT CONTROLLER AGREEMENT REFERENCE]]
- Single point of contact designated: [[CONTACT_NAME]]
- Data subject request handling: [[PROCESS]]

---

## 2. PROCESSING ACTIVITIES

### 2.1 Subject Matter of Processing

| Aspect | Description |
|---|---|
| **Processing Purpose** | [[e.g., Hosting and management of customer portal; processing user authentication; storing user preferences]] |
| **Nature of Processing** | [[e.g., Collection, storage, retrieval, use, transmission of personal data]] |
| **Duration of Processing** | [[e.g., Duration of the MSA/SOW plus [[X]] years for backup retention]] |
| **Data Subjects** | [[e.g., Client's customers, employees, end users of the application]] |

### 2.2 Categories of Personal Data

| Category | Examples | Processing Purpose |
|---|---|---|
| **Identity Data** | Name, username, user ID | User identification and authentication |
| **Contact Data** | Email address, phone number | Communication and account management |
| **Technical Data** | IP address, browser type, device info | Security, analytics, troubleshooting |
| **Usage Data** | Login times, pages visited, actions taken | Service improvement, security monitoring |
| **Preference Data** | Settings, language preference | Personalization |
| [[Other Category]] | [[Examples]] | [[Purpose]] |

### 2.3 Special Categories of Personal Data

| Category | Present? | Safeguards |
|---|---|---|
| Racial or ethnic origin | [[Yes/No]] | [[If yes, describe]] |
| Political opinions | [[Yes/No]] | [[If yes, describe]] |
| Religious or philosophical beliefs | [[Yes/No]] | [[If yes, describe]] |
| Trade union membership | [[Yes/No]] | [[If yes, describe]] |
| Genetic data | [[Yes/No]] | [[If yes, describe]] |
| Biometric data | [[Yes/No]] | [[If yes, describe]] |
| Health data | [[Yes/No]] | [[If yes, describe]] |
| Sex life or sexual orientation | [[Yes/No]] | [[If yes, describe]] |

**Note:** Processing of special categories requires explicit consent or other lawful basis under GDPR Article 9.

### 2.4 Data Flow Diagram

```
Data Subject → Controller Systems → Processor (Vantus) → Sub-processors
                    ↓                        ↓
              [Collection]           [Hosting/Processing]
                    ↓                        ↓
              [Lawful Basis]         [Security Controls]
```

**Data Flow Description:**
[[Describe how personal data flows from data subjects through Controller systems to Processor and sub-processors]]

---

## 3. PROCESSOR OBLIGATIONS

### 3.1 Processing Instructions

Vantus agrees to:

1. **Process Only on Instructions:** Process Personal Data only on documented instructions from Controller, including with regard to transfers of Personal Data to third countries or international organizations, unless required to do so by Union or Member State law to which Processor is subject.

2. **No Unauthorized Use:** Not use Personal Data for Processor's own purposes or disclose to third parties except as authorized by Controller or required by law.

3. **Lawful Basis Verification:** Rely on Controller to establish a lawful basis for processing under GDPR Article 6 (and Article 9 for special categories).

### 3.2 Confidentiality

Vantus ensures that persons authorized to process Personal Data have committed themselves to confidentiality or are under an appropriate statutory obligation of confidentiality.

**Measures:**
- Confidentiality agreements with all employees and contractors
- Role-based access controls
- Regular privacy training
- Disciplinary procedures for breaches

### 3.3 Security Measures

Vantus implements appropriate technical and organizational measures to ensure a level of security appropriate to the risk:

| Measure Category | Specific Measures | Implementation |
|---|---|---|
| **Encryption** | AES-256 for data at rest; TLS 1.3 for data in transit | All data stores and communications |
| **Access Control** | Role-based access control (RBAC); principle of least privilege | Enforced across all systems |
| **Authentication** | Multi-factor authentication (MFA) for all administrative access | Required for production access |
| **Monitoring** | Audit logging of all access and modifications; intrusion detection | 24/7 monitoring |
| **Network Security** | Firewalls; network segmentation; DDoS protection | Implemented at all layers |
| **Vulnerability Management** | Regular vulnerability scanning; patch management | Weekly scans; 24-hour critical patches |
| **Backup Security** | Encrypted backups; secure backup storage; regular restore testing | Daily backups; monthly restore tests |
| **Physical Security** | Data centers with SOC 2 Type II certification | Via sub-processors |

### 3.4 Sub-processors

Vantus may engage sub-processors to assist in providing services. Current sub-processors:

| Sub-processor | Service | Location | Data Processed | Security Measures |
|---|---|---|---|---|
| **Vercel** | Hosting and Edge Network | United States | Application data, logs | SOC 2 Type II, GDPR compliant |
| **Neon** | Managed PostgreSQL Database | United States | Database contents | SOC 2 Type II, encryption at rest |
| **BetterAuth** | Authentication and Session Management | United States | Authentication tokens, session data | SOC 2 Type II, encryption |
| [[Additional]] | [[Service]] | [[Location]] | [[Data]] | [[Measures]] |

**Sub-processor Management:**
- Vantus maintains a current list of sub-processors at [[URL]]
- Controller will be notified of new sub-processors 30 days in advance
- Controller may object to new sub-processors within 14 days of notification
- If objection is not resolved, Controller may terminate affected services

### 3.5 Data Subject Rights Assistance

Vantus will assist Controller in responding to Data Subject requests:

| Right | Processor Assistance | Response Time |
|---|---|---|
| **Access (Article 15)** | Provide data export capabilities; extract relevant data | Within 5 business days of request |
| **Rectification (Article 16)** | Update data as instructed by Controller | Within 2 business days |
| **Erasure (Article 17)** | Delete data as instructed; provide deletion confirmation | Within 5 business days |
| **Restriction (Article 18)** | Suspend processing as instructed | Immediate |
| **Portability (Article 20)** | Provide data in structured, machine-readable format | Within 10 business days |
| **Objection (Article 21)** | Cease processing as instructed | Immediate |

### 3.6 Data Breach Notification

In the event of a Personal Data breach:

1. **Detection:** Vantus will detect breaches through monitoring systems
2. **Assessment:** Vantus will assess the breach within 24 hours of detection
3. **Notification:** Vantus will notify Controller without undue delay and within 48 hours of becoming aware of the breach
4. **Details:** Notification will include:
   - Nature of the breach
   - Categories and approximate number of Data Subjects affected
   - Categories and approximate number of Personal Data records affected
   - Likely consequences of the breach
   - Measures taken or proposed to address the breach
   - Contact details for more information

### 3.7 Data Protection Impact Assessment (DPIA)

Vantus will assist Controller with DPIAs where required:

- Provide information about processing operations
- Describe security measures implemented
- Identify risks associated with processing
- Suggest mitigation measures

### 3.8 Records of Processing

Vantus will maintain records of processing activities including:

- Categories of processing carried out
- Categories of Personal Data processed
- Categories of Data Subjects
- Categories of recipients
- International transfers
- Security measures
- Retention periods

Records available to supervisory authorities upon request.

---

## 4. CONTROLLER OBLIGATIONS

### 4.1 Lawful Basis

Controller warrants that:

- A lawful basis for processing exists under GDPR Article 6 (and Article 9 if applicable)
- Data Subjects have been informed of processing through appropriate privacy notices
- Any required consents have been obtained and documented
- Processing does not violate any data protection laws

### 4.2 Data Subject Requests

Controller is responsible for:

- Receiving and validating Data Subject requests
- Authenticating Data Subject identity
- Responding to requests within statutory timeframes
- Coordinating with Processor as needed for fulfillment

### 4.3 Data Accuracy

Controller will:

- Ensure Personal Data provided to Processor is accurate
- Update Personal Data when inaccuracies are identified
- Notify Processor of corrections or updates

### 4.4 Instructions

Controller will provide Processor with:

- Clear, documented instructions for processing
- Updates to instructions as needed
- Authorization for any processing outside standard operations

---

## 5. INTERNATIONAL DATA TRANSFERS

### 5.1 Transfer Mechanisms

Personal Data may be transferred to and processed in jurisdictions outside the European Economic Area (EEA). The following safeguards apply:

| Transfer Scenario | Mechanism | Documentation |
|---|---|---|
| **EU → United States** | Standard Contractual Clauses (SCCs) 2021 | Executed SCCs with sub-processors |
| **EU → UK** | UK Addendum to SCCs | Executed UK Addendum |
| **Other Transfers** | Adequacy decision or SCCs | Per jurisdiction requirements |

### 5.2 Standard Contractual Clauses

Vantus has entered into Standard Contractual Clauses (2021/914) with sub-processors where required. Copies available upon request.

### 5.3 Transfer Impact Assessment (TIA)

Vantus has conducted Transfer Impact Assessments for jurisdictions without adequacy decisions. TIAs available upon request.

### 5.4 Supplementary Measures

Where required by TIAs, Vantus implements supplementary measures:

- Encryption of data in transit and at rest
- Pseudonymization where feasible
- Enhanced access controls
- Regular security assessments

---

## 6. DATA RETENTION AND DELETION

### 6.1 Retention Periods

| Data Category | Retention Period | Rationale |
|---|---|---|
| **Active user data** | Duration of contract + [[X]] years | Contract fulfillment and legal obligations |
| **Authentication logs** | [[X]] days | Security monitoring and incident investigation |
| **Backup data** | [[X]] days | Disaster recovery |
| **Deleted user data** | [[X]] days post-deletion | Recovery from accidental deletion |
| **Audit logs** | [[X]] years | Compliance and legal requirements |

### 6.2 Return and Deletion

Upon termination of services:

1. **Data Return:** Vantus will return all Personal Data to Controller in a structured format
2. **Data Deletion:** Vantus will delete all copies of Personal Data unless retention is required by law
3. **Certification:** Vantus will provide written certification of deletion within 30 days
4. **Exceptions:** Data may be retained where required by law, with appropriate safeguards

### 6.3 Backup Considerations

- Backups will be deleted according to retention schedule
- Restoration from backup for deleted data only upon Controller request
- Backup encryption maintained throughout retention period

---

## 7. AUDIT AND INSPECTION

### 7.1 Audit Rights

Controller has the right to audit Vantus' compliance with this DPA:

- **Frequency:** Once per year, or more frequently if non-compliance suspected
- **Notice:** 30 days advance notice required
- **Scope:** Technical and organizational measures, records of processing
- **Cost:** Controller bears cost unless non-compliance identified

### 7.2 Audit Process

1. Controller submits audit request with scope and objectives
2. Vantus responds within 10 business days
3. Parties agree on audit date, scope, and logistics
4. Audit conducted by Controller or independent auditor
5. Audit report shared with Vantus
6. Remediation plan developed for any findings

### 7.3 Alternative Evidence

Vantus may provide alternative evidence of compliance:

- SOC 2 Type II reports
- ISO 27001 certificates
- Penetration test results
- Third-party audit reports

---

## 8. LIABILITY AND INDEMNIFICATION

### 8.1 Liability

Each party's liability for data protection breaches is subject to the limitations in the MSA, except:

- Liability for breaches of this DPA may not be limited below statutory minimums
- Each party is liable for its own violations of data protection law

### 8.2 Indemnification

Each party will indemnify the other against:

- Claims arising from its breach of this DPA
- Fines imposed by supervisory authorities for its violations
- Costs of notifying Data Subjects of breaches caused by it

---

## 9. TERM AND TERMINATION

### 9.1 Term

This DPA is effective as of [[EFFECTIVE_DATE]] and continues until:
- All services under the MSA/SOW are terminated
- All Personal Data has been returned or deleted

### 9.2 Survival

Sections regarding data return, deletion, confidentiality, and liability survive termination.

### 9.3 Regulatory Changes

Either party may request amendments to this DPA to comply with changes in data protection law.

---

## 10. RELATED DOCUMENTS

| Document | Relationship | Location |
|---|---|---|
| [01_SOW.md](./01_SOW.md) | Master agreement this DPA amends | Current directory |
| [01_SECURITY_BASELINE.md](../05_security/01_SECURITY_BASELINE.md) | Security measures detail | Security directory |
| [07_DATA_CLASSIFICATION_POLICY.md](../05_security/07_DATA_CLASSIFICATION_POLICY.md) | Data classification framework | Security directory |
| [08_PRIVACY_IMPACT_ASSESSMENT.md](../05_security/08_PRIVACY_IMPACT_ASSESSMENT.md) | DPIA template | Security directory |
| [10_DATA_RETENTION_AND_DELETION.md](../04_architecture/10_DATA_RETENTION_AND_DELETION.md) | Retention schedule detail | Architecture directory |

---

## 11. QUALITY CHECKLIST

Before finalizing this DPA, verify:

- [ ] All `[[PLACEHOLDERS]]` replaced with actual project values
- [ ] Roles (Controller/Processor) correctly assigned
- [ ] All categories of Personal Data identified
- [ ] Special categories assessed and documented
- [ ] Lawful basis confirmed with Controller
- [ ] Security measures are appropriate for risk level
- [ ] All sub-processors listed with locations
- [ ] International transfer mechanisms documented
- [ ] Data subject rights procedures established
- [ ] Breach notification procedures defined
- [ ] Retention periods specified
- [ ] Audit rights documented
- [ ] Liability provisions reviewed by legal
- [ ] Related documents cross-referenced
- [ ] DPO has reviewed and approved
- [ ] Version history initialized

---

## 12. SIGNATURES

By signing below, the parties agree to the terms of this Data Processing Addendum.

**For Vantus Systems:**

| Role | Name | Signature | Date |
|---|---|---|---|
| Authorized Signatory | [[NAME]] | _________________________ | [[DATE]] |
| Title | [[TITLE]] | | |

**For [[CLIENT_NAME]]:**

| Role | Name | Signature | Date |
|---|---|---|---|
| Authorized Signatory | [[NAME]] | _________________________ | [[DATE]] |
| Title | [[TITLE]] | | |

---

## 13. CHANGE HISTORY

| Date | Version | Author | Summary |
|---|---:|---|---|
| 2026-02-02 | 1.0.0 | Technical Writer | Complete rewrite with comprehensive GDPR/CCPA compliance framework, detailed security measures, sub-processor management, and international transfer mechanisms |
| 2026-01-18 | 0.1.0 | Vantus Systems | Initial template creation |

---

*Vantus Systems: Engineering Independence.*
*Last Updated: 2026-02-09 | Version 1.0.0 | Status: Template*
