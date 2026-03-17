---
Document: DATA_DICTIONARY
Doc ID: VS-TEMPLATE-ARCH-009
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Data Architect / Lead Developer
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Internal / Client
Source of Truth: docs/04_architecture/09_DATA_DICTIONARY.md
Review Cycle: Quarterly
Next Review: [2026-02-25]
---

# Data Dictionary

## Document Control

| Attribute | Value |
| :--- | :--- |
| **Document ID** | VS-TEMPLATE-ARCH-009 |
| **Version** | 1.0.0 |
| **Status** | [DRAFT / REVIEW / APPROVED / ARCHIVED] |
| **Classification** | Internal / Client Confidential |
| **Author** | [DATA ARCHITECT NAME] |
| **Reviewers** | [TECH LEAD], [SECURITY ENGINEER], [COMPLIANCE OFFICER] |
| **Approver** | [CHIEF DATA OFFICER / ARCHITECTURE REVIEW BOARD] |
| **Approval Date** | [2026-02-25] |
| **Next Review** | [2026-02-25] |

### Architecture Review Board (ARB) Sign-off

| Role | Name | Signature | Date |
| :--- | :--- | :--- | :--- |
| **Chief Data Officer** | [NAME] | _________________ | [2026-02-25] |
| **Data Architect** | [NAME] | _________________ | [2026-02-25] |
| **Security Architect** | [NAME] | _________________ | [2026-02-25] |
| **Compliance Officer** | [NAME] | _________________ | [2026-02-25] |

---

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture Principles](#2-architecture-principles)
3. [Data Standards](#3-data-standards)
4. [Entity Definitions](#4-entity-definitions)
5. [Field Definitions](#5-field-definitions)
6. [Data Classifications](#6-data-classifications)
7. [Data Governance](#7-data-governance)
8. [Data Quality Rules](#8-data-quality-rules)
9. [Compliance Mapping](#9-compliance-mapping)
10. [Decision Records](#10-decision-records)
11. [Appendix A: Change History](#appendix-a-change-history)

---

## 1. Overview

### 1.1 Purpose
This document provides the canonical definitions for all data elements in the [[PROJECT_NAME]] system. It serves as the authoritative reference for:
- Data element definitions and formats
- Data classification and sensitivity levels
- Data governance and ownership
- Data quality rules and constraints
- Compliance requirements

### 1.2 Scope
- **In Scope:** All database fields, API parameters, and file formats
- **Out of Scope:** Application-level variables, temporary data structures

### 1.3 Target Audience
- Data Architects
- Database Administrators
- Software Engineers
- Data Analysts
- Compliance Officers
- Security Engineers

---

## 2. Architecture Principles

### 2.1 Data Dictionary Principles

| ID | Principle | Description |
| :--- | :--- | :--- |
| **DD-01** | **Single Source of Truth** | This document is the authoritative reference for all data definitions |
| **DD-02** | **Explicit Typing** | All fields have explicit types and constraints |
| **DD-03** | **Sensitivity Classification** | All fields have a defined sensitivity level |
| **DD-04** | **Audit Trail** | All changes to data definitions are tracked |
| **DD-05** | **Compliance Alignment** | Definitions align with regulatory requirements |

---

## 3. Data Standards

### 3.1 Naming Conventions

| Element | Convention | Example |
| :--- | :--- | :--- |
| **Table Names** | snake_case, plural | `users`, `engagements` |
| **Column Names** | snake_case | `first_name`, `created_at` |
| **Primary Keys** | id | `id` (UUID) |
| **Foreign Keys** | {table}_id | `user_id`, `engagement_id` |
| **Timestamps** | {action}_at | `created_at`, `updated_at` |
| **Enums** | UPPER_SNAKE_CASE | `ACTIVE`, `INACTIVE` |

### 3.2 Data Type Standards

| Category | PostgreSQL Type | Format | Example |
| :--- | :--- | :--- | :--- |
| **Identifier** | UUID | RFC 4122 | `550e8400-e29b-41d4-a716-446655440000` |
| **Email** | VARCHAR(255) | RFC 5322 | `user@example.com` |
| **Date** | DATE | ISO 8601 | `2024-01-15` |
| **DateTime** | TIMESTAMP WITH TIME ZONE | ISO 8601 | `2024-01-15T10:30:00Z` |
| **Currency** | DECIMAL(15,2) | Numeric | `1234567890.12` |
| **Percentage** | DECIMAL(5,2) | 0-100 | `99.99` |
| **JSON** | JSONB | RFC 8259 | `{"key": "value"}` |
| **Enum** | ENUM | Upper case | `ACTIVE` |

### 3.3 Nullability Standards

| Rule | Description | Example |
| :--- | :--- | :--- |
| **Required** | NOT NULL for mandatory fields | `email VARCHAR(255) NOT NULL` |
| **Optional** | NULL for optional fields | `phone VARCHAR(20)` |
| **Soft Delete** | deleted_at for soft deletes | `deleted_at TIMESTAMP` |
| **Defaults** | Default values for consistency | `status VARCHAR DEFAULT 'active'` |

---

## 4. Entity Definitions

### 4.1 Entity Registry

| Entity | Description | Primary Key | Table Name |
| :--- | :--- | :--- | :--- |
| **User** | System user accounts | UUID | `users` |
| **Engagement** | Client projects/engagements | UUID | `engagements` |
| **Invoice** | Billing records | UUID | `invoices` |
| **Service** | Offered services | UUID | `services` |
| **Session** | User authentication sessions | UUID | `sessions` |
| **AuditLog** | Data change audit trail | UUID | `audit_logs` |

### 4.2 Entity Relationships

| Parent | Child | Relationship | Cardinality |
| :--- | :--- | :--- | :--- |
| User | Engagement | owns | 1:M |
| User | Session | has | 1:M |
| User | AuditLog | generates | 1:M |
| Engagement | Invoice | has | 1:M |
| Engagement | Service | uses | M:M |

---

## 5. Field Definitions

### 5.1 User Entity Fields

**Table:** `users`

| Field | Type | Length | Nullable | Default | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | UUID | 36 | NO | gen_random_uuid() | Primary identifier |
| `email` | VARCHAR | 255 | NO | - | Primary email address |
| `password_hash` | VARCHAR | 255 | NO | - | Argon2id hashed password |
| `first_name` | VARCHAR | 100 | NO | - | User's first name |
| `last_name` | VARCHAR | 100 | NO | - | User's last name |
| `role` | ENUM | - | NO | 'MEMBER' | User role (ADMIN/CLIENT/MEMBER) |
| `status` | ENUM | - | NO | 'ACTIVE' | Account status |
| `email_verified_at` | TIMESTAMP | - | YES | NULL | Email verification timestamp |
| `last_login_at` | TIMESTAMP | - | YES | NULL | Last successful login |
| `created_at` | TIMESTAMP | - | NO | NOW() | Record creation timestamp |
| `updated_at` | TIMESTAMP | - | NO | NOW() | Last update timestamp |
| `deleted_at` | TIMESTAMP | - | YES | NULL | Soft delete timestamp |

**Field Details:**

#### `id`
- **Format:** RFC 4122 UUID v4
- **Generation:** System-generated on insert
- **Uniqueness:** Globally unique
- **Sensitivity:** Low
- **Example:** `550e8400-e29b-41d4-a716-446655440000`

#### `email`
- **Format:** Valid email per RFC 5322
- **Validation:** Must be unique, valid format
- **Normalization:** Lowercase, trimmed
- **Sensitivity:** High (PII)
- **Encryption:** AES-256 at rest
- **Example:** `user@example.com`

#### `password_hash`
- **Format:** Argon2id hash
- **Algorithm:** Argon2id with memory=65536, iterations=3, parallelism=4
- **Salt:** Random 16 bytes per hash
- **Sensitivity:** Critical
- **Example:** `$argon2id$v=19$m=65536,t=3,p=4$...`

#### `role`
- **Type:** ENUM
- **Values:**
  - `ADMIN`: Full system access
  - `CLIENT`: Client account access
  - `MEMBER`: Standard user access
- **Default:** `MEMBER`
- **Sensitivity:** Medium

#### `status`
- **Type:** ENUM
- **Values:**
  - `ACTIVE`: Account is active
  - `INACTIVE`: Account disabled by user
  - `SUSPENDED`: Account suspended by admin
- **Default:** `ACTIVE`
- **Sensitivity:** Low

### 5.2 Engagement Entity Fields

**Table:** `engagements`

| Field | Type | Length | Nullable | Default | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | UUID | 36 | NO | gen_random_uuid() | Primary identifier |
| `user_id` | UUID | 36 | NO | - | Reference to user |
| `name` | VARCHAR | 255 | NO | - | Engagement name |
| `description` | TEXT | - | YES | NULL | Detailed description |
| `status` | ENUM | - | NO | 'PENDING' | Engagement status |
| `start_date` | DATE | - | YES | NULL | Project start date |
| `end_date` | DATE | - | YES | NULL | Project end date |
| `total_value` | DECIMAL | 15,2 | YES | NULL | Total contract value |
| `created_at` | TIMESTAMP | - | NO | NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | - | NO | NOW() | Last update timestamp |

**Field Details:**

#### `total_value`
- **Format:** Decimal with 2 decimal places
- **Range:** 0.00 to 999999999999.99
- **Currency:** USD (store), display localized
- **Sensitivity:** High (Commercial)
- **Audit:** All changes logged
- **Example:** `150000.00`

### 5.3 Invoice Entity Fields

**Table:** `invoices`

| Field | Type | Length | Nullable | Default | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | UUID | 36 | NO | gen_random_uuid() | Primary identifier |
| `engagement_id` | UUID | 36 | NO | - | Reference to engagement |
| `invoice_number` | VARCHAR | 50 | NO | - | Human-readable number |
| `amount` | DECIMAL | 15,2 | NO | - | Invoice amount |
| `tax_amount` | DECIMAL | 15,2 | NO | 0.00 | Tax amount |
| `total_amount` | DECIMAL | 15,2 | NO | - | Total with tax |
| `status` | ENUM | - | NO | 'DRAFT' | Payment status |
| `due_date` | DATE | - | NO | - | Payment due date |
| `paid_at` | TIMESTAMP | - | YES | NULL | Payment timestamp |
| `created_at` | TIMESTAMP | - | NO | NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | - | NO | NOW() | Last update timestamp |

### 5.4 Session Entity Fields

**Table:** `sessions`

| Field | Type | Length | Nullable | Default | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | UUID | 36 | NO | gen_random_uuid() | Primary identifier |
| `user_id` | UUID | 36 | NO | - | Reference to user |
| `token_hash` | VARCHAR | 255 | NO | - | Hashed session token |
| `ip_address` | INET | - | YES | NULL | Client IP address |
| `user_agent` | TEXT | - | YES | NULL | Client user agent |
| `expires_at` | TIMESTAMP | - | NO | - | Session expiration |
| `created_at` | TIMESTAMP | - | NO | NOW() | Creation timestamp |

**Field Details:**

#### `token_hash`
- **Format:** SHA-256 hash of JWT token
- **Purpose:** Token revocation lookup
- **Sensitivity:** High
- **TTL:** Matches token expiration

### 5.5 Audit Log Entity Fields

**Table:** `audit_logs`

| Field | Type | Length | Nullable | Default | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | UUID | 36 | NO | gen_random_uuid() | Primary identifier |
| `user_id` | UUID | 36 | YES | NULL | Acting user |
| `action` | VARCHAR | 50 | NO | - | Action performed |
| `entity_type` | VARCHAR | 100 | NO | - | Affected entity type |
| `entity_id` | UUID | 36 | NO | - | Affected entity ID |
| `old_values` | JSONB | - | YES | NULL | Previous state |
| `new_values` | JSONB | - | YES | NULL | New state |
| `ip_address` | INET | - | YES | NULL | Client IP |
| `created_at` | TIMESTAMP | - | NO | NOW() | Action timestamp |

---

## 6. Data Classifications

### 6.1 Classification Levels

| Level | Description | Handling | Examples |
| :--- | :--- | :--- | :--- |
| **Public** | Publicly available information | Standard | Marketing content |
| **Internal** | Internal business data | Internal access | Operational metrics |
| **Confidential** | Sensitive personal/business data | Restricted access | User PII, financials |
| **Critical** | Highly sensitive regulated data | Strict controls | Passwords, tokens |

### 6.2 Field Classification Matrix

| Entity | Field | Classification | Encryption |
| :--- | :--- | :--- | :--- |
| User | id | Low | No |
| User | email | High (PII) | AES-256 |
| User | password_hash | Critical | Argon2id + AES-256 |
| User | first_name | High (PII) | AES-256 |
| User | last_name | High (PII) | AES-256 |
| User | role | Medium | No |
| User | status | Low | No |
| Engagement | total_value | High (Commercial) | AES-256 |
| Invoice | amount | High (Commercial) | AES-256 |
| Session | token_hash | Critical | SHA-256 |

---

## 7. Data Governance

### 7.1 Data Ownership

| Entity | Owner | Steward | Custodian |
| :--- | :--- | :--- | :--- |
| User | Product Manager | Data Architect | DBA |
| Engagement | Product Manager | Data Architect | DBA |
| Invoice | Finance Lead | Data Architect | DBA |
| Session | Security Lead | Security Engineer | DBA |
| AuditLog | Compliance Officer | Data Architect | DBA |

### 7.2 Data Quality Rules

| Entity | Rule | Validation | Action on Failure |
| :--- | :--- | :--- | :--- |
| User | Email unique | Database constraint | Reject insert |
| User | Email valid format | Regex validation | Reject input |
| User | Password min length | 12 characters | Reject input |
| Engagement | End after start | CHECK constraint | Reject insert |
| Invoice | Positive amounts | CHECK constraint | Reject insert |
| Invoice | Total equals sum | Computed column | Auto-correct |

### 7.3 Change Management

| Change Type | Approval Required | Testing Required | Documentation |
| :--- | :--- | :--- | :--- |
| New field | Data Architect | Yes | Update dictionary |
| Modify field | ARB | Yes | Update dictionary |
| Delete field | ARB | Yes | Migration plan |
| Change type | ARB | Yes | Impact analysis |

---

## 8. Data Quality Rules

### 8.1 Validation Rules

```typescript
// Example: User validation rules
const UserValidationRules = {
  email: {
    required: true,
    format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 255,
    unique: true
  },
  password: {
    required: true,
    minLength: 12,
    maxLength: 128,
    complexity: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
  },
  firstName: {
    required: true,
    maxLength: 100,
    pattern: /^[\p{L}\s'-]+$/u  // Unicode letters, spaces, hyphens, apostrophes
  }
};
```

### 8.2 Data Quality Metrics

| Metric | Target | Measurement |
| :--- | :--- | :--- |
| **Completeness** | > 95% | Non-null required fields |
| **Accuracy** | > 99% | Valid values per rules |
| **Consistency** | > 99% | Referential integrity |
| **Timeliness** | < 1 min | Data freshness |
| **Uniqueness** | 100% | No duplicates |

---

## 9. Compliance Mapping

### 9.1 GDPR Mapping

| Field | Purpose | Legal Basis | Retention |
| :--- | :--- | :--- | :--- |
| email | Communication | Contract | Contract + 1 year |
| first_name | Personalization | Contract | Contract + 1 year |
| last_name | Identification | Contract | Contract + 1 year |
| ip_address | Security | Legitimate interest | 90 days |

### 9.2 PCI DSS Mapping

| Field | Requirement | Control |
| :--- | :--- | :--- |
| password_hash | 8.2.1 | Strong cryptography |
| session.token_hash | 8.2.1 | Unique per session |
| audit_log.ip_address | 10.3 | Access logging |

### 9.3 SOX Mapping

| Field | Requirement | Control |
| :--- | :--- | :--- |
| invoice.amount | 302 | Financial accuracy |
| invoice.total_amount | 302 | Audit trail |
| audit_log.* | 302 | Change tracking |

---

## 10. Decision Records

### 10.1 Data Dictionary ADRs

| ADR ID | Title | Status | Date |
| :--- | :--- | :--- | :--- |
| **ADR-DD-001** | UUID as Primary Key Standard | ACCEPTED | [2026-02-25] |
| **ADR-DD-002** | Argon2id for Password Hashing | ACCEPTED | [2026-02-25] |
| **ADR-DD-003** | Four-Tier Classification System | ACCEPTED | [2026-02-25] |

---

## 11. Appendix A: Change History

| Version | Date | Author | Changes | Approver |
| :--- | :--- | :--- | :--- | :--- |
| 1.0.0 | [2026-02-25] | [NAME] | Initial data dictionary | [CHIEF DATA OFFICER] |

---

## Document End

*This document is the property of [[CLIENT_NAME]] and Vantus Systems. Unauthorized distribution is prohibited.*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
