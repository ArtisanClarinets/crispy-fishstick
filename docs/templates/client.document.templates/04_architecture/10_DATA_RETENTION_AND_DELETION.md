---
Document: DATA_RETENTION_AND_DELETION
Doc ID: VS-TEMPLATE-ARCH-010
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Data Privacy Officer / Data Architect
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Internal / Client
Source of Truth: docs/04_architecture/10_DATA_RETENTION_AND_DELETION.md
Review Cycle: Quarterly
Next Review: [2026-02-25]
---

# Data Retention and Deletion

## Document Control

| Attribute | Value |
| :--- | :--- |
| **Document ID** | VS-TEMPLATE-ARCH-010 |
| **Version** | 1.0.0 |
| **Status** | [DRAFT / REVIEW / APPROVED / ARCHIVED] |
| **Classification** | Internal / Client Confidential |
| **Author** | [DATA PRIVACY OFFICER NAME] |
| **Reviewers** | [DATA ARCHITECT], [SECURITY ENGINEER], [LEGAL COUNSEL] |
| **Approver** | [CHIEF DATA OFFICER / ARCHITECTURE REVIEW BOARD] |
| **Approval Date** | [2026-02-25] |
| **Next Review** | [2026-02-25] |

### Architecture Review Board (ARB) Sign-off

| Role | Name | Signature | Date |
| :--- | :--- | :--- | :--- |
| **Chief Data Officer** | [NAME] | _________________ | [2026-02-25] |
| **Data Privacy Officer** | [NAME] | _________________ | [2026-02-25] |
| **Legal Counsel** | [NAME] | _________________ | [2026-02-25] |
| **Security Architect** | [NAME] | _________________ | [2026-02-25] |

---

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture Principles](#2-architecture-principles)
3. [Regulatory Requirements](#3-regulatory-requirements)
4. [Retention Schedule](#4-retention-schedule)
5. [Data Lifecycle](#5-data-lifecycle)
6. [Data Deletion Procedures](#6-data-deletion-procedures)
7. [Data Subject Access Requests (DSAR)](#7-data-subject-access-requests-dsar)
8. [Right to Erasure (Right to be Forgotten)](#8-right-to-erasure-right-to-be-forgotten)
9. [Data Archival](#9-data-archival)
10. [Disposal Methods](#10-disposal-methods)
11. [Audit and Compliance](#11-audit-and-compliance)
12. [Decision Records](#12-decision-records)
13. [Appendix A: Change History](#appendix-a-change-history)

---

## 1. Overview

### 1.1 Purpose
This document defines the complete data lifecycle management for the [[PROJECT_NAME]] system, including:
- Data retention periods and justifications
- Data deletion procedures and verification
- Data subject rights fulfillment (access, erasure, portability)
- Archival strategies for long-term storage
- Compliance with GDPR, CCPA, and other regulations

### 1.2 Scope
- **In Scope:** All personal data, business data, logs, and backups
- **Out of Scope:** Anonymized aggregate data (no retention limits)

### 1.3 Data Retention Principles

| ID | Principle | Description |
| :--- | :--- | :--- |
| **DR-01** | **Minimum Necessary** | Retain data only as long as required |
| **DR-02** | **Legal Compliance** | Meet all legal and regulatory requirements |
| **DR-03** | **Secure Disposal** | Irreversible deletion of sensitive data |
| **DR-04** | **Audit Trail** | Log all retention and deletion actions |
| **DR-05** | **Subject Rights** | Enable data subject rights fulfillment |

---

## 2. Architecture Principles

### 2.1 Data Lifecycle Principles

| ID | Principle | Implementation |
| :--- | :--- | :--- |
| **DL-01** | **Automated Enforcement** | Retention policies enforced by code |
| **DL-02** | **Cascading Deletion** | Related data deleted together |
| **DL-03** | **Verification** | Deletion confirmed via audit |
| **DL-04** | **Grace Period** | 30-day grace before permanent deletion |
| **DL-05** | **Legal Hold** | Ability to suspend deletion for legal reasons |

---

## 3. Regulatory Requirements

### 3.1 GDPR Requirements

| Article | Requirement | Implementation |
| :--- | :--- | :--- |
| **Art. 5(1)(e)** | Storage limitation | Defined retention periods |
| **Art. 17** | Right to erasure | Automated deletion process |
| **Art. 30** | Records of processing | Retention schedule documented |
| **Art. 32** | Security of processing | Encrypted disposal |

### 3.2 CCPA Requirements

| Section | Requirement | Implementation |
| :--- | :--- | :--- |
| **1798.105** | Right to deletion | Consumer deletion request process |
| **1798.130** | Disclosure | Privacy policy with retention info |

### 3.3 Industry-Specific Requirements

| Regulation | Retention Period | Applies To |
| :--- | :--- | :--- |
| **SOX** | 7 years | Financial records |
| **PCI DSS** | 1 year minimum | Transaction logs |
| **HIPAA** | 6 years | PHI records |
| **Tax Code** | 7 years | Tax-related documents |

---

## 4. Retention Schedule

### 4.1 Primary Retention Schedule

| Data Category | Retention Period | Legal Basis | Disposal Method |
| :--- | :--- | :--- | :--- |
| **User Account Data** | Contract duration + 1 year | Contract fulfillment | Soft delete → Hard delete |
| **User PII** | Contract duration + 1 year | GDPR Art. 5 | Cryptographic overwrite |
| **Authentication Logs** | 90 days | Security | Secure deletion |
| **Session Data** | 24 hours | Operational | Automatic expiration |
| **Transaction Records** | 7 years | Tax/Financial | Archive → Delete |
| **Invoice Data** | 7 years | Tax/Financial | Archive → Delete |
| **Payment Records** | 7 years | PCI/SOX | Archive → Delete |
| **Audit Logs** | 7 years | Compliance | Immutable storage |
| **System Logs** | 1 year | Operations | Secure deletion |
| **Access Logs** | 90 days | Security | Secure deletion |
| **Error Logs** | 90 days | Debugging | Secure deletion |
| **Usage Analytics** | 2 years | Product improvement | Anonymize → Delete |
| **Marketing Data** | Until opt-out + 30 days | Consent | Immediate deletion |
| **Email Communications** | 3 years | Legal | Archive → Delete |
| **Support Tickets** | 3 years | Customer service | Archive → Delete |
| **Backups** | 30 days | DR | Secure wipe |
| **Archived Backups** | 1 year | Long-term DR | Secure wipe |

### 4.2 Retention Period Matrix

| Entity | Active | Archived | Deleted | Total |
| :--- | :--- | :--- | :--- | :--- |
| User | Contract | 1 year | After archive | Contract + 1 year |
| Engagement | Active | 1 year | After archive | Duration + 1 year |
| Invoice | 7 years | - | After retention | 7 years |
| Session | 24 hours | - | After expiration | 24 hours |
| Audit Log | 7 years | - | After retention | 7 years |

### 4.3 Retention Triggers

| Trigger | Action | Timeline |
| :--- | :--- | :--- |
| **Contract End** | Start retention countdown | Day 0 |
| **Account Deletion Request** | Soft delete | Immediate |
| **Grace Period End** | Hard delete | 30 days |
| **Retention Period End** | Archive/Delete | Per schedule |
| **Legal Hold** | Suspend deletion | Until lifted |

---

## 5. Data Lifecycle

### 5.1 Lifecycle Stages

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   ACTIVE    │───►│   ARCHIVE   │───►│    HOLD     │───►│   DELETED   │
│             │    │             │    │             │    │             │
│ Production  │    │ Cold Store  │    │ Legal Hold  │    │ Purged      │
│ Real-time   │    │ Compressed  │    │ Suspended   │    │ Verified    │
│ Access      │    │ Encrypted   │    │ Awaiting    │    │ Irreversible│
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │
       │                  │                  │
       ▼                  ▼                  ▼
  Retention         Retention          Legal/Event
  Period End        Period End         Trigger
```

### 5.2 Lifecycle Transitions

| From | To | Trigger | Automation |
| :--- | :--- | :--- | :--- |
| Active | Archive | Retention period end | Scheduled job |
| Active | Hold | Legal hold request | Manual trigger |
| Archive | Deleted | Archive period end | Scheduled job |
| Hold | Active | Legal hold lifted | Manual trigger |
| Hold | Deleted | Hold period end + retention | Scheduled job |

---

## 6. Data Deletion Procedures

### 6.1 Soft Deletion

**Purpose:** Mark data as deleted without immediate removal

**Process:**
1. Set `deleted_at` timestamp
2. Anonymize identifying fields
3. Remove from active queries
4. Log deletion event
5. Schedule hard deletion

**Code Example:**
```typescript
async function softDeleteUser(userId: string): Promise<void> {
  await db.user.update({
    where: { id: userId },
    data: {
      deletedAt: new Date(),
      email: `deleted.${userId}@anonymized.local`,
      firstName: 'Deleted',
      lastName: 'User',
      status: 'DELETED'
    }
  });
  
  await auditLog.record({
    action: 'USER_SOFT_DELETE',
    entityType: 'User',
    entityId: userId,
    timestamp: new Date()
  });
  
  // Schedule hard deletion in 30 days
  await deletionQueue.add('hard-delete-user', { userId }, {
    delay: 30 * 24 * 60 * 60 * 1000 // 30 days
  });
}
```

### 6.2 Hard Deletion

**Purpose:** Permanently remove data from all systems

**Process:**
1. Verify no legal holds
2. Delete from primary database
3. Delete from read replicas
4. Delete from cache
5. Delete from search index
6. Delete from backups (after retention)
7. Verify deletion
8. Log completion

**Code Example:**
```typescript
async function hardDeleteUser(userId: string): Promise<void> {
  // Check for legal holds
  const hasLegalHold = await legalHoldService.check(userId);
  if (hasLegalHold) {
    throw new Error('Cannot delete: Legal hold in effect');
  }
  
  // Delete from all systems
  await Promise.all([
    db.user.delete({ where: { id: userId } }),
    cache.del(`user:${userId}`),
    searchIndex.deleteDocument('users', userId),
    objectStorage.deleteUserFiles(userId)
  ]);
  
  // Verify deletion
  const exists = await db.user.findUnique({ where: { id: userId } });
  if (exists) {
    throw new Error('Deletion verification failed');
  }
  
  // Log completion
  await auditLog.record({
    action: 'USER_HARD_DELETE',
    entityType: 'User',
    entityId: userId,
    timestamp: new Date(),
    verificationHash: generateHash(userId)
  });
}
```

### 6.3 Cascading Deletion

**Scope of Deletion for User:**

| Entity | Action | Order |
| :--- | :--- | :--- |
| Sessions | Delete | 1 |
| Audit Logs | Anonymize user_id | 2 |
| Engagements | Soft delete | 3 |
| Invoices | Retain (anonymized) | 4 |
| User | Hard delete | 5 |

---

## 7. Data Subject Access Requests (DSAR)

### 7.1 DSAR Process

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Request  │───►│ Verify   │───►│ Collect  │───►│ Deliver  │
│ Received │    │ Identity │    │ Data     │    │ Package  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
     │               │               │               │
     ▼               ▼               ▼               ▼
  24h ack         72h verify     30 days max    Secure link
  Log request     ID check       Export data    30-day expiry
```

### 7.2 DSAR Timeline

| Step | SLA | Action |
| :--- | :--- | :--- |
| **Acknowledgment** | 24 hours | Confirm receipt |
| **Identity Verification** | 72 hours | Verify requester |
| **Data Collection** | 25 days | Gather all data |
| **Review** | 3 days | Legal review if needed |
| **Delivery** | 30 days total | Secure delivery |

### 7.3 Data Export Format

```json
{
  "export_metadata": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "export_date": "2024-01-15T10:30:00Z",
    "format_version": "1.0"
  },
  "user_profile": {
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "created_at": "2023-01-01T00:00:00Z"
  },
  "engagements": [...],
  "invoices": [...],
  "activity_logs": [...]
}
```

---

## 8. Right to Erasure (Right to be Forgotten)

### 8.1 Erasure Request Process

| Step | Action | Responsible | Timeline |
| :--- | :--- | :--- | :--- |
| 1 | Receive request | System | Immediate |
| 2 | Verify identity | Support | 24 hours |
| 3 | Check legal holds | Legal | 24 hours |
| 4 | Execute soft delete | System | Immediate |
| 5 | Notify user | Support | 24 hours |
| 6 | Schedule hard delete | System | 30 days |
| 7 | Execute hard delete | System | After grace |
| 8 | Verify and log | System | Immediate |
| 9 | Confirm completion | Support | 72 hours |

### 8.2 Exceptions to Erasure

| Exception | Legal Basis | Handling |
| :--- | :--- | :--- |
| **Legal obligation** | GDPR Art. 17(3)(b) | Retain required data |
| **Legal claims** | GDPR Art. 17(3)(e) | Legal hold |
| **Public interest** | GDPR Art. 17(3)(a) | Anonymize only |
| **Contract performance** | GDPR Art. 17(3)(c) | Retain until fulfilled |

### 8.3 Erasure Verification

```sql
-- Verification query for user deletion
SELECT COUNT(*) as remaining_records
FROM (
  SELECT id FROM users WHERE id = :user_id
  UNION ALL
  SELECT id FROM engagements WHERE user_id = :user_id
  UNION ALL
  SELECT id FROM sessions WHERE user_id = :user_id
) AS all_records;

-- Expected result: 0
```

---

## 9. Data Archival

### 9.1 Archival Strategy

| Data Type | Archive Trigger | Archive Location | Compression |
| :--- | :--- | :--- | :--- |
| **Financial Records** | 1 year old | S3 Glacier | Gzip |
| **Audit Logs** | 1 year old | S3 Glacier | Gzip |
| **Old Invoices** | 3 years old | S3 Glacier | Gzip |
| **System Logs** | 30 days old | S3 Standard-IA | None |

### 9.2 Archive Process

1. **Selection:** Identify records past retention
2. **Extraction:** Export from primary database
3. **Transformation:** Anonymize if required
4. **Compression:** Reduce storage size
5. **Encryption:** AES-256 encryption
6. **Transfer:** Move to archive storage
7. **Verification:** Confirm integrity
8. **Deletion:** Remove from primary
9. **Logging:** Record archive event

### 9.3 Archive Retrieval

| Priority | Retrieval Time | Cost |
| :--- | :--- | :--- |
| **Expedited** | 1-5 minutes | High |
| **Standard** | 3-5 hours | Medium |
| **Bulk** | 5-12 hours | Low |

---

## 10. Disposal Methods

### 10.1 Disposal Methods by Data Type

| Data Type | Method | Verification |
| :--- | :--- | :--- |
| **Database Records** | DELETE + VACUUM | Query verification |
| **Files** | Secure erase (DoD 5220.22-M) | Hash verification |
| **Cache** | DEL command | Key check |
| **Backups** | Expire + overwrite | Backup list check |
| **Logs** | Log rotation + shred | File check |

### 10.2 Cryptographic Erasure

For encrypted data, cryptographic erasure may be used:

1. **Key Destruction:** Destroy encryption key
2. **Verification:** Confirm key inaccessible
3. **Documentation:** Log key destruction

**Note:** Only applicable for data encrypted with unique keys.

### 10.3 Disposal Verification

| Method | Verification | Frequency |
| :--- | :--- | :--- |
| **Query verification** | Zero records returned | Every deletion |
| **Hash verification** | File hash mismatch | Every file deletion |
| **Audit log review** | Complete audit trail | Weekly |
| **Sample testing** | Random record checks | Monthly |

---

## 11. Audit and Compliance

### 11.1 Audit Trail Requirements

| Event | Data Captured | Retention |
| :--- | :--- | :--- |
| **Retention policy change** | Who, what, when, why | 7 years |
| **Data deletion** | Entity, ID, timestamp, verification | 7 years |
| **DSAR received** | Request details, timeline | 7 years |
| **Legal hold applied** | Reason, scope, duration | 7 years |
| **Archive operation** | Records, location, verification | 7 years |

### 11.2 Compliance Reporting

| Report | Frequency | Audience |
| :--- | :--- | :--- |
| **Retention compliance** | Quarterly | DPO, CDO |
| **Deletion metrics** | Monthly | Security |
| **DSAR statistics** | Monthly | DPO, Legal |
| **Legal hold status** | Weekly | Legal, DPO |
| **Archive inventory** | Quarterly | Operations |

### 11.3 Compliance Metrics

| Metric | Target | Measurement |
| :--- | :--- | :--- |
| **DSAR response time** | < 30 days | Average completion time |
| **Deletion accuracy** | 100% | Verification success rate |
| **Retention compliance** | 100% | Policy adherence |
| **Legal hold coverage** | 100% | Hold application rate |

---

## 12. Decision Records

### 12.1 Data Retention ADRs

| ADR ID | Title | Status | Date |
| :--- | :--- | :--- | :--- |
| **ADR-DR-001** | 30-Day Grace Period for Deletion | ACCEPTED | [2026-02-25] |
| **ADR-DR-002** | Soft Delete Pattern | ACCEPTED | [2026-02-25] |
| **ADR-DR-003** | 7-Year Audit Log Retention | ACCEPTED | [2026-02-25] |
| **ADR-DR-004** | Cryptographic Erasure for Backups | ACCEPTED | [2026-02-25] |

---

## 13. Appendix A: Change History

| Version | Date | Author | Changes | Approver |
| :--- | :--- | :--- | :--- | :--- |
| 1.0.0 | [2026-02-25] | [NAME] | Initial retention policy | [CHIEF DATA OFFICER] |

---

## Document End

*This document is the property of [[CLIENT_NAME]] and Vantus Systems. Unauthorized distribution is prohibited.*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
