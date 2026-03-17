---
Document: DATA_FLOWS_INDEX
Doc ID: VS-TEMPLATE-ARCH-003
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Data Architect / Solutions Architect
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Internal / Client
Source of Truth: [docs/04_architecture/03_DATA_FLOWS_INDEX.md](docs/04_architecture/03_DATA_FLOWS_INDEX.md)
Review Cycle: Quarterly
Next Review: [2026-02-25]
---

# Data Flows Index

## Document Control

| Attribute | Value |
| :--- | :--- |
| **Document ID** | VS-TEMPLATE-ARCH-003 |
| **Version** | 1.0.0 |
| **Status** | [DRAFT / REVIEW / APPROVED / ARCHIVED] |
| **Classification** | Internal / Client Confidential |
| **Author** | [DATA ARCHITECT NAME] |
| **Reviewers** | [SECURITY ENGINEER], [COMPLIANCE OFFICER] |
| **Approver** | [CHIEF DATA OFFICER / ARCHITECTURE REVIEW BOARD] |
| **Approval Date** | [2026-02-25] |
| **Next Review** | [2026-02-25] |

### Architecture Review Board (ARB) Sign-off

| Role | Name | Signature | Date |
| :--- | :--- | :--- | :--- |
| **Chief Data Officer** | [NAME] | _________________ | [2026-02-25] |
| **Security Architect** | [NAME] | _________________ | [2026-02-25] |
| **Compliance Officer** | [NAME] | _________________ | [2026-02-25] |

---

## Table of Contents

1. [Overview](#1-overview)
2. [Data Flow Methodology](#2-data-flow-methodology)
3. [Data Classification](#3-data-classification)
4. [Data Flow Diagrams](#4-data-flow-diagrams)
5. [Data Lifecycle](#5-data-lifecycle)
6. [Data Integration Points](#6-data-integration-points)
7. [Data Security Controls](#7-data-security-controls)
8. [Performance Considerations](#8-performance-considerations)
9. [Compliance Mapping](#9-compliance-mapping)
10. [Decision Records](#10-decision-records)
11. [Appendix A: Change History](#appendix-a-change-history)

---

## 1. Overview

### 1.1 Purpose
This document provides a comprehensive index of all data flows within the [[PROJECT_NAME]] system. It serves as the authoritative reference for:
- Understanding how data moves through the system
- Identifying data integration points and dependencies
- Ensuring compliance with data protection regulations
- Supporting security assessments and audits
- Guiding data architecture decisions

### 1.2 Scope
- **In Scope:** All data flows including user data, system data, logs, and analytics
- **Out of Scope:** Third-party system internal data flows (documented separately)

### 1.3 Target Audience
- Data Architects
- Security Engineers
- Compliance Officers
- Software Engineers
- DevOps Engineers

---

## 2. Data Flow Methodology

### 2.1 Data Flow Diagram (DFD) Notation

We use the Gane-Sarson notation for Data Flow Diagrams:

| Symbol | Name | Description |
| :--- | :--- | :--- |
| ⭕ | Process | Transforms data (circle or rounded rectangle) |
| 📦 | Data Store | Stores data (open-ended rectangle) |
| ➡️ | Data Flow | Movement of data (arrow) |
| 🟦 | External Entity | Source or destination (square) |

### 2.2 DFD Levels

| Level | Scope | Purpose |
| :--- | :--- | :--- |
| **Level 0** | Context | System boundary and external interactions |
| **Level 1** | Overview | Major processes and data stores |
| **Level 2** | Detailed | Process decomposition |
| **Level 3** | Granular | Detailed logic (rarely needed) |

### 2.3 Data Flow Categories

| Category | Description | Examples |
| :--- | :--- | :--- |
| **User-Initiated** | Triggered by user actions | Form submissions, file uploads |
| **System-Initiated** | Automated system processes | Scheduled jobs, event triggers |
| **External Integration** | Third-party data exchange | API calls, webhooks |
| **Internal Communication** | Inter-service communication | Message queues, events |

---

## 3. Data Classification

### 3.1 Data Classification Framework

All data in the system is classified according to sensitivity:

| Classification | Description | Handling Requirements | Examples |
| :--- | :--- | :--- | :--- |
| **Public** | Information intended for public consumption | Standard handling | Marketing content, public APIs |
| **Internal** | Business information not for public release | Internal access only | Internal documentation, operational data |
| **Confidential** | Sensitive business or personal information | Restricted access, encryption | Customer PII, financial data |
| **Restricted** | Highly sensitive regulated data | Strict access controls, audit logging | Health records, payment data |

### 3.2 Data Classification Matrix

| Data Type | Classification | Encryption at Rest | Encryption in Transit | Retention Period |
| :--- | :--- | :--- | :--- | :--- |
| User PII | Confidential | AES-256-GCM | TLS 1.3 | Contract + 1 year |
| Authentication tokens | Restricted | AES-256-GCM | TLS 1.3 | Session duration |
| Payment data | Restricted | AES-256-GCM | TLS 1.3 + Tokenization | 7 years (PCI) |
| System logs | Internal | AES-256-GCM | TLS 1.3 | 1 year |
| Analytics data | Internal | AES-256-GCM | TLS 1.3 | 2 years |
| Public content | Public | None | TLS 1.3 | Indefinite |

### 3.3 Data Sensitivity Labels

```typescript
// Example: Data classification enum
enum DataClassification {
    PUBLIC = 'public',
    INTERNAL = 'internal',
    CONFIDENTIAL = 'confidential',
    RESTRICTED = 'restricted'
}

// Example: Data labeling function
function classifyData(dataType: string): DataClassification {
    const classificationMap: Record<string, DataClassification> = {
        'user_email': DataClassification.CONFIDENTIAL,
        'user_password': DataClassification.RESTRICTED,
        'payment_card': DataClassification.RESTRICTED,
        'system_logs': DataClassification.INTERNAL,
        'public_article': DataClassification.PUBLIC
    };
    
    return classificationMap[dataType] || DataClassification.INTERNAL;
}
```

---

## 4. Data Flow Diagrams

### 4.1 Data Flow Registry

| DFD ID | Title | Level | Classification | File Path | Status | Last Updated |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **DFD-000** | System Context | 0 | Internal | `diagrams/dfd/000-context.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **DFD-001** | User Registration Flow | 1 | Confidential | `diagrams/dfd/001-user-registration.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **DFD-002** | Authentication Flow | 1 | Restricted | `diagrams/dfd/002-authentication.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **DFD-003** | Data Ingestion Pipeline | 1 | Internal | `diagrams/dfd/003-data-ingestion.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **DFD-004** | Report Generation Flow | 1 | Internal | `diagrams/dfd/004-report-generation.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **DFD-005** | External API Integration | 1 | Confidential | `diagrams/dfd/005-external-api.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **DFD-006** | Backup and Recovery Flow | 1 | Internal | `diagrams/dfd/006-backup-recovery.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **DFD-007** | Analytics Data Pipeline | 1 | Internal | `diagrams/dfd/007-analytics-pipeline.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |

### 4.2 DFD-000: System Context Diagram

**Description:** High-level view of data entering, processing within, and exiting the system.

**External Entities:**
- End Users
- Administrators
- Identity Provider
- Payment Gateway
- Email Service
- Backup Storage

**Data Stores:**
- Primary Database
- Cache Storage
- Object Storage
- Search Index

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DFD-000: SYSTEM CONTEXT                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   External Entities                                                          │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│   │End User  │  │ Admin    │  │   IdP    │  │ Payment  │  │  Email   │     │
│   └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘     │
│        │             │             │             │             │           │
│        └─────────────┴─────────────┴─────────────┴─────────────┘           │
│                              │                                               │
│                              ▼                                               │
│                    ┌──────────────────┐                                     │
│                    │  [[PROJECT_NAME]] │                                     │
│                    │     System       │                                     │
│                    └────────┬─────────┘                                     │
│                             │                                                │
│        ┌────────────────────┼────────────────────┐                          │
│        ▼                    ▼                    ▼                          │
│   ┌──────────┐        ┌──────────┐        ┌──────────┐                     │
│   │ Database │        │  Cache   │        │ Storage  │                     │
│   └──────────┘        └──────────┘        └──────────┘                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Diagram File:** `diagrams/dfd/000-context.puml`
**Last Updated:** [2026-02-25]

### 4.3 DFD-001: User Registration Flow

**Description:** End-to-end flow of user registration data from form submission to account creation.

**Processes:**
1. **P1.1:** Validate Input Data
2. **P1.2:** Check Email Uniqueness
3. **P1.3:** Hash Password
4. **P1.4:** Create User Record
5. **P1.5:** Send Welcome Email

**Data Flows:**
| Flow ID | From | To | Data | Classification |
| :--- | :--- | :--- | :--- | :--- |
| F1.1 | End User | P1.1 | Registration form data | Confidential |
| F1.2 | P1.1 | P1.2 | Validated data | Confidential |
| F1.3 | P1.2 | Database | Email lookup query | Internal |
| F1.4 | Database | P1.2 | Email existence result | Internal |
| F1.5 | P1.2 | P1.3 | New user data | Confidential |
| F1.6 | P1.3 | P1.4 | Hashed credentials | Restricted |
| F1.7 | P1.4 | Database | User INSERT | Confidential |
| F1.8 | P1.4 | P1.5 | User created event | Internal |
| F1.9 | P1.5 | Email Service | Welcome email request | Confidential |

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     DFD-001: USER REGISTRATION FLOW                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────┐                                                               │
│   │ End User │                                                               │
│   └────┬─────┘                                                               │
│        │ Registration Data (Confidential)                                    │
│        ▼                                                                       │
│   ┌─────────────────────────────────────────────────────────────────────┐    │
│   │  P1.1 Validate Input                                                │    │
│   │  - Schema validation                                                │    │
│   │  - Sanitization                                                     │    │
│   └────────────────────────┬────────────────────────────────────────────┘    │
│                            │ Validated Data                                  │
│                            ▼                                                  │
│   ┌─────────────────────────────────────────────────────────────────────┐    │
│   │  P1.2 Check Email Uniqueness                                        │    │
│   │  - Query database                                                   │    │
│   │  - Verify availability                                              │    │
│   └────────────────────────┬────────────────────────────────────────────┘    │
│                            │ New User Data                                   │
│                            ▼                                                  │
│   ┌─────────────────────────────────────────────────────────────────────┐    │
│   │  P1.3 Hash Password                                                 │    │
│   │  - Argon2id hashing                                                 │    │
│   │  - Salt generation                                                  │    │
│   └────────────────────────┬────────────────────────────────────────────┘    │
│                            │ Hashed Credentials                              │
│                            ▼                                                  │
│   ┌─────────────────────────────────────────────────────────────────────┐    │
│   │  P1.4 Create User Record                                            │    │
│   │  - INSERT to database                                               │    │
│   │  - Generate user ID                                                 │    │
│   └────────────────────────┬────────────────────────────────────────────┘    │
│                            │                                                   │
│              ┌─────────────┴─────────────┐                                   │
│              ▼                           ▼                                   │
│   ┌──────────────────┐        ┌──────────────────┐                          │
│   │     Database     │        │  P1.5 Send Email │                          │
│   │  (User Storage)  │        │  - Queue email   │                          │
│   └──────────────────┘        └────────┬─────────┘                          │
│                                        │                                     │
│                                        ▼                                     │
│                               ┌──────────────────┐                          │
│                               │  Email Service   │                          │
│                               └──────────────────┘                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Diagram File:** `diagrams/dfd/001-user-registration.puml`
**Last Updated:** [2026-02-25]

### 4.4 DFD-002: Authentication Flow

**Description:** Data flow during user login and session establishment.

**Processes:**
1. **P2.1:** Validate Credentials
2. **P2.2:** Generate Session
3. **P2.3:** Store Session
4. **P2.4:** Return Authentication Token

**Data Flows:**
| Flow ID | From | To | Data | Classification |
| :--- | :--- | :--- | :--- | :--- |
| F2.1 | End User | P2.1 | Login credentials | Restricted |
| F2.2 | P2.1 | Database | User lookup by email | Internal |
| F2.3 | Database | P2.1 | User record (with hash) | Restricted |
| F2.4 | P2.1 | P2.2 | Authenticated user | Confidential |
| F2.5 | P2.2 | P2.3 | Session data | Restricted |
| F2.6 | P2.3 | Cache | Session storage | Restricted |
| F2.7 | P2.2 | P2.4 | Token data | Restricted |
| F2.8 | P2.4 | End User | Auth token response | Restricted |

**Diagram File:** `diagrams/dfd/002-authentication.puml`
**Last Updated:** [2026-02-25]

### 4.5 DFD-003: Data Ingestion Pipeline

**Description:** Flow of bulk data import from external sources into the system.

**Processes:**
1. **P3.1:** Receive Import Request
2. **P3.2:** Validate File Format
3. **P3.3:** Parse Data
4. **P3.4:** Transform Data
5. **P3.5:** Validate Records
6. **P3.6:** Load to Database
7. **P3.7:** Update Search Index

**Data Flows:**
| Flow ID | From | To | Data | Classification |
| :--- | :--- | :--- | :--- | :--- |
| F3.1 | Admin | P3.1 | Import file upload | Varies |
| F3.2 | P3.1 | Object Storage | File storage | Varies |
| F3.3 | Object Storage | P3.2 | File retrieval | Varies |
| F3.4 | P3.2 | P3.3 | Validated file | Varies |
| F3.5 | P3.3 | P3.4 | Parsed records | Varies |
| F3.6 | P3.4 | P3.5 | Transformed records | Varies |
| F3.7 | P3.5 | P3.6 | Validated records | Varies |
| F3.8 | P3.6 | Database | Bulk INSERT | Varies |
| F3.9 | P3.6 | P3.7 | Import complete event | Internal |
| F3.10 | P3.7 | Search Index | Index update | Internal |

**Diagram File:** `diagrams/dfd/003-data-ingestion.puml`
**Last Updated:** [2026-02-25]

---

## 5. Data Lifecycle

### 5.1 Data Lifecycle Stages

| Stage | Description | Duration | Actions |
| :--- | :--- | :--- | :--- |
| **Creation** | Data enters the system | Immediate | Validation, classification |
| **Active Use** | Data in regular use | Varies | CRUD operations |
| **Archival** | Data moved to cold storage | After retention period | Compression, encryption |
| **Deletion** | Data permanently removed | Per retention policy | Cryptographic erasure |

### 5.2 Data Lifecycle Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DATA LIFECYCLE                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐          │
│   │ Creation │────►│  Active  │────►│ Archival │────►│ Deletion │          │
│   └──────────┘     └──────────┘     └──────────┘     └──────────┘          │
│        │                │                │                │                 │
│        ▼                ▼                ▼                ▼                 │
│   • Validation    • CRUD Ops      • Compression    • Soft delete           │
│   • Classification• Querying      • Encryption     • Audit log             │
│   • Encryption    • Reporting     • Cold storage   • Hard delete           │
│   • Indexing      • Analytics     • Reduced cost   • Verification          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.3 Data Retention Matrix

| Data Type | Active Period | Archive Period | Deletion Method |
| :--- | :--- | :--- | :--- |
| User PII | Contract duration | 1 year | Cryptographic overwrite |
| Session data | 24 hours | N/A | Automatic expiration |
| System logs | 90 days | 1 year | Secure deletion |
| Audit logs | 7 years | 7 years | Legal hold only |
| Analytics | 2 years | 3 years | Aggregation then deletion |
| Backups | 30 days | 1 year | Secure wipe |

---

## 6. Data Integration Points

### 6.1 Integration Registry

| Integration ID | Source | Destination | Protocol | Frequency | Data Volume |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **INT-001** | Identity Provider | [[PROJECT_NAME]] | OAuth 2.0 / OIDC | Real-time | Low |
| **INT-002** | [[PROJECT_NAME]] | Payment Gateway | REST API | On-demand | Low |
| **INT-003** | [[PROJECT_NAME]] | Email Service | REST API / SMTP | On-demand | Medium |
| **INT-004** | External API | [[PROJECT_NAME]] | REST API / Webhook | Hourly | High |
| **INT-005** | [[PROJECT_NAME]] | Analytics Platform | Batch export | Daily | High |
| **INT-006** | [[PROJECT_NAME]] | Backup Storage | S3 API | Continuous | Medium |

### 6.2 Integration Details

#### INT-001: Identity Provider Integration

| Attribute | Value |
| :--- | :--- |
| **Direction** | Inbound |
| **Protocol** | OAuth 2.0 / OpenID Connect |
| **Authentication** | Client credentials + JWT |
| **Data Classification** | Restricted |
| **Encryption** | TLS 1.3 |
| **Retry Policy** | 3 attempts with exponential backoff |
| **Timeout** | 10 seconds |
| **Circuit Breaker** | Yes (5 failures in 60 seconds) |

**Data Flow:**
```
User ──► [[PROJECT_NAME]] ──► Identity Provider
         │                        │
         │◄── Auth Code ──────────│
         │                        │
         │──► Token Request ─────►│
         │                        │
         │◄── ID Token + Access ──│
         │                        │
         │──► UserInfo Request ──►│
         │                        │
         │◄── User Profile ───────│
```

#### INT-004: External Data Import

| Attribute | Value |
| :--- | :--- |
| **Direction** | Inbound |
| **Protocol** | REST API / SFTP |
| **Authentication** | API Key / Certificate |
| **Data Classification** | Varies |
| **Encryption** | TLS 1.3 / PGP |
| **Frequency** | Hourly batch |
| **Volume** | Up to 1GB per batch |
| **Validation** | Schema validation, checksum verification |

---

## 7. Data Security Controls

### 7.1 Security Controls by Data Flow

| Control ID | Control | Implementation | Data Flows |
| :--- | :--- | :--- | :--- |
| **DSC-001** | Input Validation | JSON Schema, regex validation | All inbound |
| **DSC-002** | Output Encoding | HTML entity encoding, JSON escaping | All outbound |
| **DSC-003** | Encryption at Rest | AES-256-GCM | Database, Storage |
| **DSC-004** | Encryption in Transit | TLS 1.3 | All network |
| **DSC-005** | Access Logging | Structured audit logs | All data access |
| **DSC-006** | Rate Limiting | Token bucket algorithm | API endpoints |
| **DSC-007** | Data Masking | Partial redaction | Logs, analytics |
| **DSC-008** | Tokenization | Vault-backed tokens | Payment data |

### 7.2 Data Loss Prevention (DLP)

| DLP Rule | Description | Action |
| :--- | :--- | :--- |
| **DLP-001** | PII in logs | Mask email, phone numbers |
| **DLP-002** | Credit card numbers | Block and alert |
| **DLP-003** | Large data exports | Require approval |
| **DLP-004** | Unencrypted transmission | Block connection |

### 7.3 Security Code Example

```typescript
// Example: Data validation and sanitization
import { z } from 'zod';
import { classifyData, DataClassification } from './data-classification';

// Define schema with validation
const UserRegistrationSchema = z.object({
    email: z.string().email(),
    password: z.string().min(12).max(128),
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100)
});

// Sanitize and validate input
async function processRegistration(input: unknown) {
    // 1. Validate schema
    const validated = UserRegistrationSchema.parse(input);
    
    // 2. Sanitize (prevent XSS)
    const sanitized = {
        email: validated.email.toLowerCase().trim(),
        password: validated.password, // Don't sanitize passwords
        firstName: sanitizeHtml(validated.firstName),
        lastName: sanitizeHtml(validated.lastName)
    };
    
    // 3. Classify data
    const classification = classifyData('user_registration');
    
    // 4. Log with classification
    logger.info('Processing registration', {
        classification,
        dataTypes: Object.keys(sanitized),
        // Never log actual values for confidential data
    });
    
    // 5. Process based on classification
    if (classification === DataClassification.CONFIDENTIAL) {
        await encryptAndStore(sanitized);
    }
    
    return sanitized;
}
```

---

## 8. Performance Considerations

### 8.1 Data Flow Performance Budgets

| Flow Type | Target Latency | Throughput | Error Rate |
| :--- | :--- | :--- | :--- |
| **User-facing reads** | < 100ms p99 | 1000 RPS | < 0.1% |
| **User-facing writes** | < 200ms p99 | 500 RPS | < 0.1% |
| **Batch imports** | < 1 hour per GB | 10 MB/s | < 1% |
| **Report generation** | < 30 seconds | 10 concurrent | < 0.5% |
| **Search queries** | < 50ms p99 | 2000 RPS | < 0.1% |

### 8.2 Caching Strategy

| Cache Layer | Data Type | TTL | Invalidation |
| :--- | :--- | :--- | :--- |
| **L1 (In-memory)** | Session data | 1 hour | On logout |
| **L2 (Redis)** | User profiles | 5 minutes | On update |
| **L2 (Redis)** | Query results | 10 minutes | Time-based |
| **L3 (CDN)** | Static assets | 1 day | Manual purge |

### 8.3 Database Query Optimization

```sql
-- Example: Optimized query with proper indexing
-- Index: CREATE INDEX idx_users_email ON users(email);

SELECT 
    u.id,
    u.email,
    u.first_name,
    u.last_name,
    u.created_at
FROM users u
WHERE u.email = $1
    AND u.is_active = true
LIMIT 1;

-- Query plan should show Index Scan
```

---

## 9. Compliance Mapping

### 9.1 GDPR Data Flow Mapping

| GDPR Article | Requirement | Data Flow Implementation |
| :--- | :--- | :--- |
| **Article 5** | Lawful processing | Consent tracking in user flows |
| **Article 15** | Right of access | Export functionality in DFD-004 |
| **Article 17** | Right to erasure | Deletion flows in DFD-006 |
| **Article 25** | Privacy by design | Classification in all flows |
| **Article 30** | Records of processing | This document |
| **Article 32** | Security of processing | Controls in Section 7 |

### 9.2 Data Subject Rights Implementation

| Right | Data Flow | Implementation |
| :--- | :--- | :--- |
| **Access** | DFD-004 | Export all user data |
| **Rectification** | DFD-001 | Update user record |
| **Erasure** | DFD-006 | Cascading deletion |
| **Portability** | DFD-004 | JSON/CSV export |
| **Objection** | DFD-007 | Opt-out of analytics |

### 9.3 Audit Trail Requirements

| Event | Logged Data | Retention |
| :--- | :--- | :--- |
| Data access | User, timestamp, record ID, action | 7 years |
| Data modification | Before/after values (masked) | 7 years |
| Data export | User, timestamp, record count | 7 years |
| Data deletion | User, timestamp, verification hash | 7 years |

---

## 10. Decision Records

### 10.1 Data Flow ADRs

| ADR ID | Title | Status | Date |
| :--- | :--- | :--- | :--- |
| **ADR-DF-001** | Gane-Sarson notation for DFDs | ACCEPTED | [2026-02-25] |
| **ADR-DF-002** | Four-tier data classification | ACCEPTED | [2026-02-25] |
| **ADR-DF-003** | Real-time vs batch processing | [PROPOSED] | [2026-02-25] |
| **ADR-DF-004** | Data retention automation | ACCEPTED | [2026-02-25] |

### 10.2 Data Flow Tool Selection

**Decision:** Use PlantUML for DFD generation

**Rationale:**
- Text-based: Version control friendly
- Standard notation: Gane-Sarson support
- Integration: Can be generated in CI/CD
- Consistency: Same tool as C4 diagrams

---

## 11. Appendix A: Change History

| Version | Date | Author | Changes | Approver |
| :--- | :--- | :--- | :--- | :--- |
| 1.0.0 | [2026-02-25] | [NAME] | Initial data flows index | [CHIEF DATA OFFICER] |
| 1.1.0 | [2026-02-25] | [NAME] | [Description of changes] | [CHIEF DATA OFFICER] |

---

## Document End

*This document is the property of [[CLIENT_NAME]] and Vantus Systems. Unauthorized distribution is prohibited.*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
