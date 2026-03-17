---
Document: DATA_MODEL
Doc ID: VS-TEMPLATE-ARCH-005
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Data Architect / Database Administrator
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Internal / Client
Source of Truth: [docs/04_architecture/05_DATA_MODEL.md](docs/04_architecture/05_DATA_MODEL.md)
Review Cycle: Quarterly
Next Review: [2026-02-25]
---

# Data Model

## Document Control

| Attribute | Value |
| :--- | :--- |
| **Document ID** | VS-TEMPLATE-ARCH-005 |
| **Version** | 1.0.0 |
| **Status** | [DRAFT / REVIEW / APPROVED / ARCHIVED] |
| **Classification** | Internal / Client Confidential |
| **Author** | [DATA ARCHITECT NAME] |
| **Reviewers** | [TECH LEAD], [SECURITY ENGINEER] |
| **Approver** | [CHIEF DATA OFFICER / ARCHITECTURE REVIEW BOARD] |
| **Approval Date** | [2026-02-25] |
| **Next Review** | [2026-02-25] |

### Architecture Review Board (ARB) Sign-off

| Role | Name | Signature | Date |
| :--- | :--- | :--- | :--- |
| **Chief Data Officer** | [NAME] | _________________ | [2026-02-25] |
| **Database Administrator** | [NAME] | _________________ | [2026-02-25] |
| **Security Architect** | [NAME] | _________________ | [2026-02-25] |

---

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture Principles](#2-architecture-principles)
3. [Technology Stack](#3-technology-stack)
4. [Entity Relationship Diagram](#4-entity-relationship-diagram)
5. [Entity Definitions](#5-entity-definitions)
6. [Data Types and Constraints](#6-data-types-and-constraints)
7. [Indexes and Performance](#7-indexes-and-performance)
8. [Data Integrity](#8-data-integrity)
9. [Backup and Recovery](#9-backup-and-recovery)
10. [Scalability Planning](#10-scalability-planning)
11. [Decision Records](#11-decision-records)
12. [Appendix A: Change History](#appendix-a-change-history)

---

## 1. Overview

### 1.1 Purpose
This document defines the canonical data model for the [[PROJECT_NAME]] system. It provides:
- Entity definitions and relationships
- Data type specifications
- Integrity constraints
- Performance optimization strategies
- Backup and recovery procedures

### 1.2 Scope
- **In Scope:** All database entities, relationships, and constraints
- **Out of Scope:** Application-level data structures, caching layer

### 1.3 Target Audience
- Data Architects
- Database Administrators
- Backend Developers
- Security Engineers
- Compliance Officers

---

## 2. Architecture Principles

### 2.1 Data Modeling Principles

| ID | Principle | Description | Implementation |
| :--- | :--- | :--- | :--- |
| **DM-01** | **Normalization** | Minimize data redundancy | 3NF for transactional data |
| **DM-02** | **Referential Integrity** | Enforce relationships at database level | Foreign key constraints |
| **DM-03** | **Auditability** | Track all data changes | Audit tables with timestamps |
| **DM-04** | **Scalability** | Design for horizontal scaling | UUID primary keys, no auto-increment |
| **DM-05** | **Security** | Encrypt sensitive data | Column-level encryption |
| **DM-06** | **Performance** | Optimize for query patterns | Strategic indexes |

---

## 3. Technology Stack

| Component | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Primary Database** | PostgreSQL | 16.x | ACID-compliant data store |
| **Read Replicas** | PostgreSQL | 16.x | Read scaling |
| **ORM** | Prisma | 6.x | Type-safe database access |
| **Migrations** | Prisma Migrate | 6.x | Schema versioning |
| **Backup** | pg_dump / WAL-E | Latest | Point-in-time recovery |
| **Monitoring** | pg_stat_statements | Built-in | Query performance |

---

## 4. Entity Relationship Diagram

### 4.1 ERD Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       ENTITY RELATIONSHIP DIAGRAM                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────┐         ┌──────────────┐         ┌──────────────┐       │
│   │    User      │◄───────►│  Engagement  │◄───────►│   Invoice    │       │
│   │──────────────│    1:M  │──────────────│   1:M   │──────────────│       │
│   │ id (PK)      │         │ id (PK)      │         │ id (PK)      │       │
│   │ email (UQ)   │         │ user_id (FK) │         │ engagement_id│       │
│   │ password_hash│         │ status       │         │ amount       │       │
│   │ role         │         │ start_date   │         │ status       │       │
│   │ created_at   │         │ end_date     │         │ due_date     │       │
│   └──────────────┘         └──────┬───────┘         └──────────────┘       │
│                                   │                                          │
│                                   │ M:M                                      │
│                                   ▼                                          │
│                          ┌──────────────┐                                   │
│                          │   Service    │                                   │
│                          │──────────────│                                   │
│                          │ id (PK)      │                                   │
│                          │ name         │                                   │
│                          │ description  │                                   │
│                          │ price        │                                   │
│                          └──────────────┘                                   │
│                                                                              │
│   ┌──────────────┐         ┌──────────────┐                                 │
│   │   Session    │◄───────►│    User      │                                 │
│   │──────────────│   M:1   │              │                                 │
│   │ id (PK)      │         │              │                                 │
│   │ user_id (FK) │         │              │                                 │
│   │ token_hash   │         │              │                                 │
│   │ expires_at   │         │              │                                 │
│   └──────────────┘         └──────────────┘                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Diagram File:** `diagrams/data/entity-relationship-diagram.puml`
**Tool:** PlantUML / dbdiagram.io
**Last Updated:** [2026-02-25]

---

## 5. Entity Definitions

### 5.1 User Entity

**Purpose:** Represents system users with authentication and profile information.

**Table:** `users`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| `password_hash` | VARCHAR(255) | NOT NULL | Argon2id hashed password |
| `first_name` | VARCHAR(100) | NOT NULL | First name |
| `last_name` | VARCHAR(100) | NOT NULL | Last name |
| `role` | ENUM | NOT NULL | User role (admin, client, member) |
| `status` | ENUM | NOT NULL, DEFAULT 'active' | Account status |
| `email_verified_at` | TIMESTAMP | NULLABLE | Email verification timestamp |
| `last_login_at` | TIMESTAMP | NULLABLE | Last successful login |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last update timestamp |
| `deleted_at` | TIMESTAMP | NULLABLE | Soft delete timestamp |

**Prisma Schema:**
```prisma
model User {
  id                String    @id @default(uuid())
  email             String    @unique
  passwordHash      String    @map("password_hash")
  firstName         String    @map("first_name")
  lastName          String    @map("last_name")
  role              UserRole  @default(MEMBER)
  status            UserStatus @default(ACTIVE)
  emailVerifiedAt   DateTime? @map("email_verified_at")
  lastLoginAt       DateTime? @map("last_login_at")
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  deletedAt         DateTime? @map("deleted_at")

  engagements       Engagement[]
  sessions          Session[]
  auditLogs         AuditLog[]

  @@index([email])
  @@index([status])
  @@index([created_at])
  @@map("users")
}

enum UserRole {
  ADMIN
  CLIENT
  MEMBER
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}
```

### 5.2 Engagement Entity

**Purpose:** Represents client engagements or projects.

**Table:** `engagements`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `user_id` | UUID | FOREIGN KEY | Reference to user |
| `name` | VARCHAR(255) | NOT NULL | Engagement name |
| `description` | TEXT | NULLABLE | Detailed description |
| `status` | ENUM | NOT NULL | Engagement status |
| `start_date` | DATE | NULLABLE | Project start date |
| `end_date` | DATE | NULLABLE | Project end date |
| `total_value` | DECIMAL(15,2) | NULLABLE | Total contract value |
| `created_at` | TIMESTAMP | NOT NULL | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL | Last update timestamp |

**Prisma Schema:**
```prisma
model Engagement {
  id          String            @id @default(uuid())
  userId      String            @map("user_id")
  name        String
  description String?
  status      EngagementStatus  @default(PENDING)
  startDate   DateTime?         @map("start_date")
  endDate     DateTime?         @map("end_date")
  totalValue  Decimal?          @map("total_value") @db.Decimal(15, 2)
  createdAt   DateTime          @default(now()) @map("created_at")
  updatedAt   DateTime          @updatedAt @map("updated_at")

  user        User              @relation(fields: [userId], references: [id])
  invoices    Invoice[]
  services    EngagementService[]

  @@index([userId])
  @@index([status])
  @@index([created_at])
  @@map("engagements")
}

enum EngagementStatus {
  PENDING
  ACTIVE
  COMPLETED
  CANCELLED
}
```

### 5.3 Invoice Entity

**Purpose:** Represents billing invoices for engagements.

**Table:** `invoices`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `engagement_id` | UUID | FOREIGN KEY | Reference to engagement |
| `invoice_number` | VARCHAR(50) | UNIQUE, NOT NULL | Human-readable invoice number |
| `amount` | DECIMAL(15,2) | NOT NULL | Invoice amount |
| `tax_amount` | DECIMAL(15,2) | DEFAULT 0 | Tax amount |
| `total_amount` | DECIMAL(15,2) | NOT NULL | Total with tax |
| `status` | ENUM | NOT NULL | Payment status |
| `due_date` | DATE | NOT NULL | Payment due date |
| `paid_at` | TIMESTAMP | NULLABLE | Payment timestamp |
| `created_at` | TIMESTAMP | NOT NULL | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL | Last update timestamp |

**Prisma Schema:**
```prisma
model Invoice {
  id             String         @id @default(uuid())
  engagementId   String         @map("engagement_id")
  invoiceNumber  String         @unique @map("invoice_number")
  amount         Decimal        @db.Decimal(15, 2)
  taxAmount      Decimal        @default(0) @map("tax_amount") @db.Decimal(15, 2)
  totalAmount    Decimal        @map("total_amount") @db.Decimal(15, 2)
  status         InvoiceStatus  @default(DRAFT)
  dueDate        DateTime       @map("due_date")
  paidAt         DateTime?      @map("paid_at")
  createdAt      DateTime       @default(now()) @map("created_at")
  updatedAt      DateTime       @updatedAt @map("updated_at")

  engagement     Engagement     @relation(fields: [engagementId], references: [id])

  @@index([engagementId])
  @@index([status])
  @@index([dueDate])
  @@map("invoices")
}

enum InvoiceStatus {
  DRAFT
  SENT
  PAID
  OVERDUE
  CANCELLED
}
```

### 5.4 Service Entity

**Purpose:** Represents services that can be associated with engagements.

**Table:** `services`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `name` | VARCHAR(255) | NOT NULL | Service name |
| `description` | TEXT | NULLABLE | Service description |
| `price` | DECIMAL(15,2) | NULLABLE | Standard price |
| `is_active` | BOOLEAN | DEFAULT true | Active status |
| `created_at` | TIMESTAMP | NOT NULL | Creation timestamp |
| `updated_at` | TIMESTAMP | NOT NULL | Last update timestamp |

**Prisma Schema:**
```prisma
model Service {
  id          String    @id @default(uuid())
  name        String
  description String?
  price       Decimal?  @db.Decimal(15, 2)
  isActive    Boolean   @default(true) @map("is_active")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")

  engagements EngagementService[]

  @@index([isActive])
  @@map("services")
}
```

### 5.5 Session Entity

**Purpose:** Represents user authentication sessions.

**Table:** `sessions`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `user_id` | UUID | FOREIGN KEY | Reference to user |
| `token_hash` | VARCHAR(255) | UNIQUE, NOT NULL | Hashed session token |
| `ip_address` | INET | NULLABLE | Client IP address |
| `user_agent` | TEXT | NULLABLE | Client user agent |
| `expires_at` | TIMESTAMP | NOT NULL | Session expiration |
| `created_at` | TIMESTAMP | NOT NULL | Creation timestamp |

**Prisma Schema:**
```prisma
model Session {
  id          String    @id @default(uuid())
  userId      String    @map("user_id")
  tokenHash   String    @unique @map("token_hash")
  ipAddress   String?   @map("ip_address")
  userAgent   String?   @map("user_agent")
  expiresAt   DateTime  @map("expires_at")
  createdAt   DateTime  @default(now()) @map("created_at")

  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([tokenHash])
  @@index([expiresAt])
  @@map("sessions")
}
```

### 5.6 Audit Log Entity

**Purpose:** Tracks all data modifications for compliance.

**Table:** `audit_logs`

| Column | Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `user_id` | UUID | FOREIGN KEY, NULLABLE | Acting user |
| `action` | VARCHAR(50) | NOT NULL | Action type |
| `entity_type` | VARCHAR(100) | NOT NULL | Affected entity |
| `entity_id` | UUID | NOT NULL | Affected entity ID |
| `old_values` | JSONB | NULLABLE | Previous state |
| `new_values` | JSONB | NULLABLE | New state |
| `ip_address` | INET | NULLABLE | Client IP |
| `created_at` | TIMESTAMP | NOT NULL | Action timestamp |

**Prisma Schema:**
```prisma
model AuditLog {
  id          String    @id @default(uuid())
  userId      String?   @map("user_id")
  action      String
  entityType  String    @map("entity_type")
  entityId    String    @map("entity_id")
  oldValues   Json?     @map("old_values")
  newValues   Json?     @map("new_values")
  ipAddress   String?   @map("ip_address")
  createdAt   DateTime  @default(now()) @map("created_at")

  user        User?     @relation(fields: [userId], references: [id])

  @@index([userId])
  @@index([entityType, entityId])
  @@index([created_at])
  @@map("audit_logs")
}
```

---

## 6. Data Types and Constraints

### 6.1 Data Type Standards

| Data Category | PostgreSQL Type | Prisma Type | Notes |
| :--- | :--- | :--- | :--- |
| **Primary Keys** | UUID | String | Use `uuid-ossp` extension |
| **Strings** | VARCHAR(n) / TEXT | String | Use VARCHAR for bounded data |
| **Integers** | INTEGER / BIGINT | Int / BigInt | Use BIGINT for IDs/counts |
| **Decimals** | DECIMAL(p,s) | Decimal | Use for financial data |
| **Booleans** | BOOLEAN | Boolean | Native boolean type |
| **Dates** | TIMESTAMP WITH TIME ZONE | DateTime | Always store with timezone |
| **JSON** | JSONB | Json | Use JSONB for querying |
| **Enums** | ENUM | Enum | Database-level enums |

### 6.2 Constraint Standards

| Constraint Type | Usage | Example |
| :--- | :--- | :--- |
| **PRIMARY KEY** | Entity identifier | `id UUID PRIMARY KEY` |
| **FOREIGN KEY** | Relationship enforcement | `user_id UUID REFERENCES users(id)` |
| **UNIQUE** | Alternate identifiers | `email VARCHAR(255) UNIQUE` |
| **NOT NULL** | Required fields | `created_at TIMESTAMP NOT NULL` |
| **CHECK** | Business rules | `CHECK (end_date > start_date)` |
| **DEFAULT** | Default values | `status VARCHAR DEFAULT 'active'` |

---

## 7. Indexes and Performance

### 7.1 Index Strategy

| Index Type | Usage | Example |
| :--- | :--- | :--- |
| **B-Tree** | Equality and range queries | Primary keys, foreign keys |
| **GIN** | JSONB and array queries | JSONB containment queries |
| **GiST** | Geospatial data | Location-based queries |
| **Partial** | Filtered data sets | Active records only |
| **Composite** | Multi-column queries | `(user_id, created_at)` |

### 7.2 Index Inventory

| Table | Index Name | Columns | Type | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| users | idx_users_email | email | B-Tree | Login lookups |
| users | idx_users_status | status | B-Tree | Status filtering |
| engagements | idx_engagements_user_id | user_id | B-Tree | User's engagements |
| engagements | idx_engagements_status | status | B-Tree | Status filtering |
| invoices | idx_invoices_engagement_id | engagement_id | B-Tree | Engagement invoices |
| invoices | idx_invoices_due_date | due_date | B-Tree | Due date queries |
| sessions | idx_sessions_token_hash | token_hash | B-Tree | Token lookups |
| sessions | idx_sessions_expires_at | expires_at | B-Tree | Cleanup queries |
| audit_logs | idx_audit_logs_entity | entity_type, entity_id | Composite | Entity history |
| audit_logs | idx_audit_logs_created_at | created_at | B-Tree | Time-based queries |

### 7.3 Query Performance Guidelines

```sql
-- Good: Uses index
SELECT * FROM users WHERE email = 'user@example.com';

-- Good: Uses composite index
SELECT * FROM engagements 
WHERE user_id = 'uuid' AND created_at > '2024-01-01';

-- Bad: Function on indexed column (no index usage)
SELECT * FROM users WHERE LOWER(email) = 'user@example.com';

-- Good: Functional index for case-insensitive search
CREATE INDEX idx_users_email_lower ON users (LOWER(email));
```

---

## 8. Data Integrity

### 8.1 Referential Integrity

All relationships use foreign key constraints with appropriate actions:

| Relationship | On Delete | On Update | Rationale |
| :--- | :--- | :--- | :--- |
| Engagement → User | RESTRICT | CASCADE | Prevent orphan engagements |
| Invoice → Engagement | RESTRICT | CASCADE | Prevent orphan invoices |
| Session → User | CASCADE | CASCADE | Clean up on user deletion |
| AuditLog → User | SET NULL | CASCADE | Preserve audit trail |

### 8.2 Business Rule Constraints

```sql
-- Ensure end date is after start date
ALTER TABLE engagements 
ADD CONSTRAINT chk_engagement_dates 
CHECK (end_date IS NULL OR end_date > start_date);

-- Ensure invoice total equals amount + tax
ALTER TABLE invoices 
ADD CONSTRAINT chk_invoice_total 
CHECK (total_amount = amount + tax_amount);

-- Ensure positive amounts
ALTER TABLE invoices 
ADD CONSTRAINT chk_invoice_positive 
CHECK (amount >= 0 AND tax_amount >= 0 AND total_amount >= 0);
```

### 8.3 Soft Delete Pattern

```sql
-- Soft delete trigger
CREATE OR REPLACE FUNCTION soft_delete_user()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users 
    SET deleted_at = NOW(), 
        email = CONCAT(email, '.deleted.', EXTRACT(EPOCH FROM NOW()))
    WHERE id = OLD.id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_soft_delete_user
    INSTEAD OF DELETE ON users
    FOR EACH ROW
    EXECUTE FUNCTION soft_delete_user();
```

---

## 9. Backup and Recovery

### 9.1 Backup Strategy

| Backup Type | Frequency | Retention | Method |
| :--- | :--- | :--- | :--- |
| **Full Backup** | Daily | 30 days | pg_dump |
| **Incremental** | Continuous | 7 days | WAL archiving |
| **Point-in-Time** | On-demand | N/A | WAL replay |
| **Cross-Region** | Daily | 90 days | S3 replication |

### 9.2 Recovery Objectives

| Metric | Target | Measurement |
| :--- | :--- | :--- |
| **RPO (Recovery Point Objective)** | < 5 minutes | Maximum data loss |
| **RTO (Recovery Time Objective)** | < 1 hour | Maximum downtime |

### 9.3 Backup Verification

```bash
#!/bin/bash
# Backup verification script

# Restore to staging
pg_restore --clean --if-exists --dbname=staging backup.dump

# Run verification queries
psql staging -c "SELECT COUNT(*) FROM users;"
psql staging -c "SELECT COUNT(*) FROM engagements;"

# Run application tests
npm run test:integration

# Report results
echo "Backup verification complete: $(date)"
```

---

## 10. Scalability Planning

### 10.1 Horizontal Scaling Strategy

| Component | Scaling Method | Trigger |
| :--- | :--- | :--- |
| **Read Replicas** | Add replicas | > 80% CPU on primary |
| **Connection Pool** | Increase pool size | > 80% pool utilization |
| **Partitioning** | Time-based partitions | > 100M rows per table |
| **Sharding** | User ID hash | > 1TB per shard |

### 10.2 Partitioning Strategy

```sql
-- Time-based partitioning for audit logs
CREATE TABLE audit_logs_2024_q1 PARTITION OF audit_logs
FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');

CREATE TABLE audit_logs_2024_q2 PARTITION OF audit_logs
FOR VALUES FROM ('2024-04-01') TO ('2024-07-01');
```

### 10.3 Capacity Planning

| Metric | Current | 6 Months | 12 Months |
| :--- | :--- | :--- | :--- |
| **Users** | 10,000 | 50,000 | 100,000 |
| **Engagements** | 25,000 | 100,000 | 250,000 |
| **Storage** | 100 GB | 500 GB | 1 TB |
| **IOPS** | 1,000 | 3,000 | 5,000 |

---

## 11. Decision Records

### 11.1 Data Model ADRs

| ADR ID | Title | Status | Date |
| :--- | :--- | :--- | :--- |
| **ADR-DM-001** | UUID over Auto-increment | ACCEPTED | [2026-02-25] |
| **ADR-DM-002** | PostgreSQL over MySQL | ACCEPTED | [2026-02-25] |
| **ADR-DM-003** | Soft Delete Pattern | ACCEPTED | [2026-02-25] |
| **ADR-DM-004** | Audit Log Table Design | ACCEPTED | [2026-02-25] |

---

## 12. Appendix A: Change History

| Version | Date | Author | Changes | Approver |
| :--- | :--- | :--- | :--- | :--- |
| 1.0.0 | [2026-02-25] | [NAME] | Initial data model | [CHIEF DATA OFFICER] |

---

## Document End

*This document is the property of [[CLIENT_NAME]] and Vantus Systems. Unauthorized distribution is prohibited.*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
