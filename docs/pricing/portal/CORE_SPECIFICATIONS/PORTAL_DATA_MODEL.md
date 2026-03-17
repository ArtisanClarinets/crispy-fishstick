# PORTAL_DATA_MODEL — Comprehensive Entity Definitions
**Version:** 3.0.0  
**Date:** 2026-02-22  
**Scope:** Client Portal with Full Feature Support  
**Status:** Enhanced with All Feature Entities

---

## Table of Contents
1. [Design Principles](#0-design-principles)
2. [Core Entities](#1-core-entities)
3. [Work Transparency Entities](#2-work-transparency-entities)
4. [Ticket Management Entities](#3-ticket-management-entities)
5. [Document Vault Entities](#4-document-vault-entities)
6. [Knowledge Base Entities](#5-knowledge-base-entities)
7. [Community/Forum Entities](#6-communityforum-entities)
8. [Service Catalog Entities](#7-service-catalog-entities)
9. [Analytics/Reporting Entities](#8-analyticsreporting-entities)
10. [Asset Management Entities](#9-asset-management-entities)
11. [Communication Entities](#10-communication-entities)
12. [Workflow Entities](#11-workflow-entities)
13. [AI/Intelligence Entities](#12-aiintelligence-entities)
14. [Collaboration Entities](#13-collaboration-entities)
15. [Gamification Entities](#14-gamification-entities)
16. [Compliance Entities](#15-compliance-entities)
17. [Advanced Security Entities](#16-advanced-security-entities)
18. [Billing & Entitlements](#17-billing--entitlements)
19. [Audit & Logging](#18-audit--logging)
20. [Entity Relationship Diagram](#19-entity-relationship-diagram)
21. [Indexes Summary](#20-indexes-summary)

---

## 0) Design Principles

### Multi-Tenancy
- Every entity includes `orgId` for row-level tenant isolation
- Cross-org queries are explicitly blocked at the application layer
- Unique constraints include `orgId` where applicable

### Security
- Audit-log all sensitive actions with tamper-evident hashing
- Store **no raw secrets** in portal data (use secure vaults)
- Attachments are metadata + object storage pointers only
- All file uploads scanned and validated

### Performance
- Strategic indexes on foreign keys, search fields, and common filters
- Partition large tables (AuditEvent, MetricValue) by time ranges
- JSON fields for flexible schema without migration overhead

### Data Integrity
- Foreign key constraints with appropriate cascade rules
- Soft deletes using `deletedAt` where data retention requires
- Immutable audit records

---

## 1) Core Entities

### 1.1 Org (Organization)
**Purpose:** Tenant container for all portal data

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Unique organization identifier |
| name | VARCHAR(255) | NOT NULL | Organization display name |
| slug | VARCHAR(100) | UNIQUE, NOT NULL | URL-friendly identifier |
| status | ENUM | NOT NULL | active, suspended, trial, archived |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification timestamp |
| branding | JSONB | NULL | Colors, logos, themes: `{primaryColor, logoUrl, faviconUrl, customCss}` |
| settings | JSONB | NULL | Portal settings: `{features, defaults, limits}` |
| featuresEnabled | TEXT[] | NOT NULL, DEFAULT '{}' | Enabled feature flags |
| subscriptionTier | VARCHAR(50) | NOT NULL | basic, professional, enterprise |
| billingCycle | ENUM | NULL | monthly, annual |
| dataRegion | VARCHAR(50) | NOT NULL | EU, US, APAC, etc. |
| timezone | VARCHAR(50) | NOT NULL, DEFAULT 'UTC' | Organization default timezone |
| currency | VARCHAR(3) | NOT NULL, DEFAULT 'USD' | Billing currency |
| customFields | JSONB | NULL | Organization-specific custom fields |
| securityPolicy | JSONB | NULL | Security settings: `{mfaRequired, passwordPolicy, sessionTimeout}` |
| planExpiryDate | DATE | NULL | Subscription expiration |
| maxUsers | INTEGER | NULL | User limit for this tier |
| storageQuotaBytes | BIGINT | NULL | Document storage quota |
| supportTier | VARCHAR(50) | NULL | standard, priority, dedicated |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_org_slug (slug)
- INDEX idx_org_status (status)
- INDEX idx_org_tier (subscriptionTier)

---

### 1.2 User
**Purpose:** Portal user accounts

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Unique user identifier |
| email | VARCHAR(255) | UNIQUE, NOT NULL | User email address |
| name | VARCHAR(255) | NOT NULL | Display name |
| firstName | VARCHAR(100) | NULL | First name |
| lastName | VARCHAR(100) | NULL | Last name |
| status | ENUM | NOT NULL | active, inactive, pending, suspended |
| createdAt | TIMESTAMP | NOT NULL | Account creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last update timestamp |
| emailVerifiedAt | TIMESTAMP | NULL | Email verification timestamp |
| lastLoginAt | TIMESTAMP | NULL | Last successful login |
| lastActiveAt | TIMESTAMP | NULL | Last activity timestamp |
| preferences | JSONB | NULL | User preferences: `{theme, notifications, layout}` |
| timezone | VARCHAR(50) | NOT NULL, DEFAULT 'UTC' | User timezone |
| locale | VARCHAR(10) | NOT NULL, DEFAULT 'en-US' | Language locale |
| language | VARCHAR(10) | NOT NULL, DEFAULT 'en' | Preferred language |
| avatarUrl | VARCHAR(500) | NULL | Profile avatar URL |
| jobTitle | VARCHAR(100) | NULL | Job title |
| department | VARCHAR(100) | NULL | Department name |
| phone | VARCHAR(50) | NULL | Phone number |
| mobile | VARCHAR(50) | NULL | Mobile number |
| profileCompleteness | INTEGER | NOT NULL, DEFAULT 0 | Profile completion percentage (0-100) |
| notificationChannels | JSONB | NOT NULL, DEFAULT '{}' | Enabled channels: `{email, sms, push, inApp}` |
| gamificationStats | JSONB | NULL | Points, level, streak: `{totalPoints, currentLevel, streakDays}` |
| mfaEnabled | BOOLEAN | NOT NULL, DEFAULT FALSE | Multi-factor auth enabled |
| mfaMethod | ENUM | NULL | totp, sms, email |
| passwordChangedAt | TIMESTAMP | NULL | Last password change |
| failedLoginAttempts | INTEGER | NOT NULL, DEFAULT 0 | Consecutive failed attempts |
| lockedUntil | TIMESTAMP | NULL | Account lockout expiry |
| invitedBy | UUID | FK → User(id), NULL | Who invited this user |
| invitationToken | VARCHAR(255) | UNIQUE, NULL | Invitation token hash |
| invitationExpiresAt | TIMESTAMP | NULL | Invitation expiry |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_user_email (email)
- INDEX idx_user_status (status)
- INDEX idx_user_last_active (lastActiveAt)
- INDEX idx_user_invitation (invitationToken) WHERE invitationToken IS NOT NULL

**Relationships:**
- Has many Memberships (1:N)
- Has many Sessions (1:N)
- Has many LoginAttempts (1:N)
- Has many DeviceTrusts (1:N)

---

### 1.3 Membership
**Purpose:** Links users to organizations with roles

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Unique membership identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| userId | UUID | FK → User(id), NOT NULL | User reference |
| role | ENUM | NOT NULL | owner, admin, approver, billing, member, viewer |
| status | ENUM | NOT NULL | active, inactive, pending |
| createdAt | TIMESTAMP | NOT NULL | Membership creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification timestamp |
| invitedAt | TIMESTAMP | NULL | When user was invited |
| invitedBy | UUID | FK → User(id), NULL | Inviter user ID |
| acceptedAt | TIMESTAMP | NULL | When invitation accepted |
| permissions | JSONB | NULL | Custom permission overrides |
| isPrimary | BOOLEAN | NOT NULL, DEFAULT FALSE | Primary org for user |
| departmentAccess | UUID[] | NULL | Limited department scope |
| allowedTicketTypes | VARCHAR(50)[] | NULL | Restricted ticket types |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_membership_org_user (orgId, userId)
- INDEX idx_membership_user (userId)
- INDEX idx_membership_role (orgId, role)

**Relationships:**
- Belongs to Org (N:1)
- Belongs to User (N:1)

---

### 1.4 Session
**Purpose:** User authentication sessions

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Session identifier |
| userId | UUID | FK → User(id), NOT NULL | User reference |
| orgId | UUID | FK → Org(id), NOT NULL | Active organization |
| createdAt | TIMESTAMP | NOT NULL | Session start |
| lastSeenAt | TIMESTAMP | NOT NULL | Last activity |
| expiresAt | TIMESTAMP | NOT NULL | Session expiry |
| revokedAt | TIMESTAMP | NULL | When manually revoked |
| revokedReason | VARCHAR(100) | NULL | logout, timeout, security, admin |
| ipHash | VARCHAR(64) | NOT NULL | SHA-256 hash of IP |
| ipAddress | INET | NULL | IP address (encrypted) |
| userAgentHash | VARCHAR(64) | NOT NULL | SHA-256 hash of UA |
| userAgent | TEXT | NULL | Full user agent string |
| deviceFingerprint | VARCHAR(64) | NULL | Device identifier hash |
| location | JSONB | NULL | Geo location: `{country, city, lat, lng}` |
| isTrusted | BOOLEAN | NOT NULL, DEFAULT FALSE | Remember this device |
| mfaVerified | BOOLEAN | NOT NULL, DEFAULT FALSE | MFA completed for session |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_session_user (userId)
- INDEX idx_session_expires (expiresAt)
- INDEX idx_session_active (userId, revokedAt) WHERE revokedAt IS NULL

---

## 2) Work Transparency Entities

### 2.1 Update
**Purpose:** Project updates and announcements from Vantus

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Update identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| title | VARCHAR(255) | NOT NULL | Update title |
| body | TEXT | NOT NULL | Update content (markdown) |
| summary | VARCHAR(500) | NULL | Short summary for lists |
| type | ENUM | NOT NULL | milestone, alert, info, decision |
| priority | ENUM | NOT NULL, DEFAULT 'normal' | low, normal, high, urgent |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| createdBy | UUID | NOT NULL | Vantus staff ID |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| immutableRevisionId | UUID | NOT NULL | Content revision reference |
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->
| expiresAt | TIMESTAMP | NULL | Visibility expiration |
| requiresAcknowledgment | BOOLEAN | NOT NULL, DEFAULT FALSE | Requires client acknowledgment |
| acknowledgmentRate | DECIMAL(5,2) | NULL | % of users who acknowledged |
| milestoneIds | UUID[] | NULL | Related milestones |
| docIds | UUID[] | NULL | Related documents |
| ticketIds | UUID[] | NULL | Related tickets |
| tags | VARCHAR(50)[] | NULL | Update tags |
| visibility | ENUM | NOT NULL, DEFAULT 'all' | all, roles, users |
| visibleToRoles | VARCHAR(50)[] | NULL | Role-based visibility |
| visibleToUsers | UUID[] | NULL | User-specific visibility |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_update_org (orgId)
- INDEX idx_update_created (orgId, createdAt DESC)
- INDEX idx_update_type (orgId, type)
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->

**Relationships:**
- Belongs to Org (N:1)
- Has many UpdateAcknowledgments (1:N)

---

### 2.2 UpdateAcknowledgment
**Purpose:** Track which users acknowledged updates

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Acknowledgment identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| updateId | UUID | FK → Update(id), NOT NULL | Update reference |
| userId | UUID | FK → User(id), NOT NULL | User who acknowledged |
| acknowledgedAt | TIMESTAMP | NOT NULL | When acknowledged |
| ipAddress | INET | NULL | IP at acknowledgment |
| userAgent | TEXT | NULL | User agent at acknowledgment |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_ack_update_user (updateId, userId)
- INDEX idx_ack_user (userId)

---

### 2.3 Milestone
**Purpose:** Project milestones and deliverables

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Milestone identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| title | VARCHAR(255) | NOT NULL | Milestone name |
| description | TEXT | NULL | Detailed description |
| status | ENUM | NOT NULL | planned, in_progress, completed, delayed, cancelled |
| priority | ENUM | NOT NULL, DEFAULT 'medium' | low, medium, high, critical |
| eta | DATE | NULL | Expected completion date |
| startedAt | TIMESTAMP | NULL | When work began |
| completedAt | TIMESTAMP | NULL | Actual completion |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| createdBy | UUID | NOT NULL | Creator ID |
| progressPercent | INTEGER | NOT NULL, DEFAULT 0 | Completion percentage (0-100) |
| parentMilestoneId | UUID | FK → Milestone(id), NULL | Parent milestone for hierarchy |
| updateIds | UUID[] | NULL | Related updates |
| docIds | UUID[] | NULL | Related documents |
| ticketIds | UUID[] | NULL | Related tickets |
| deliverables | JSONB | NULL | List of deliverable items |
| dependencies | UUID[] | NULL | Dependent milestone IDs |
| blockedBy | UUID[] | NULL | Blocking milestone IDs |
| health | ENUM | NULL | green, yellow, red |
| healthReason | TEXT | NULL | Explanation of health status |
| clientVisible | BOOLEAN | NOT NULL, DEFAULT TRUE | Visible to client users |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_milestone_org (orgId)
- INDEX idx_milestone_status (orgId, status)
- INDEX idx_milestone_eta (orgId, eta)
- INDEX idx_milestone_parent (parentMilestoneId)

**Relationships:**
- Belongs to Org (N:1)
- Self-referential parent/child (1:N)

---

### 2.4 Decision
**Purpose:** Architecture and business decisions (ADRs)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Decision identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| adrRef | VARCHAR(50) | UNIQUE, NOT NULL | ADR reference number (e.g., "ADR-001") |
| title | VARCHAR(255) | NOT NULL | Decision title |
| status | ENUM | NOT NULL | proposed, accepted, deprecated, superseded |
| context | TEXT | NOT NULL | Decision context |
| decision | TEXT | NOT NULL | The actual decision |
| consequences | TEXT | NOT NULL | Expected consequences |
| rationale | TEXT | NOT NULL | Why this decision was made |
| alternatives | TEXT | NULL | Alternatives considered |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| createdBy | UUID | NOT NULL | Decision author |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| decidedAt | TIMESTAMP | NULL | When decision was finalized |
| supersededById | UUID | FK → Decision(id), NULL | Newer decision that replaces this |
| docIds | UUID[] | NULL | Related documents |
| stakeholders | UUID[] | NULL | Involved stakeholder IDs |
| tags | VARCHAR(50)[] | NULL | Decision tags |
| requiresApproval | BOOLEAN | NOT NULL, DEFAULT FALSE | Needs client approval |
| approvedBy | UUID[] | NULL | Approver user IDs |
| approvedAt | TIMESTAMP | NULL | Approval timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_decision_adr (orgId, adrRef)
- INDEX idx_decision_status (orgId, status)
- INDEX idx_decision_created (orgId, createdAt DESC)

---

### 2.5 Risk
**Purpose:** Risk register and tracking

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Risk identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| title | VARCHAR(255) | NOT NULL | Risk title |
| description | TEXT | NULL | Detailed description |
| category | VARCHAR(100) | NOT NULL | security, operational, financial, technical, compliance |
| probability | ENUM | NOT NULL | low, medium, high |
| impact | ENUM | NOT NULL | low, medium, high, critical |
| score | INTEGER | NOT NULL | Calculated risk score (1-25) |
| severity | ENUM | NOT NULL | low, medium, high, critical |
| status | ENUM | NOT NULL | identified, mitigating, accepted, transferred, closed |
| mitigation | TEXT | NULL | Mitigation strategy |
| contingency | TEXT | NULL | Contingency plan |
| ownerType | ENUM | NOT NULL | client, vantus, shared |
| ownerId | UUID | NULL | Assigned owner |
| dueDate | DATE | NULL | Mitigation deadline |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| identifiedBy | UUID | NOT NULL | Who identified the risk |
| closedAt | TIMESTAMP | NULL | When risk was closed |
| closedReason | TEXT | NULL | Why risk was closed |
| reviewDate | DATE | NULL | Next review date |
| relatedTicketIds | UUID[] | NULL | Related tickets |
| relatedAssetIds | UUID[] | NULL | Related assets |
| tags | VARCHAR(50)[] | NULL | Risk tags |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_risk_org (orgId)
- INDEX idx_risk_severity (orgId, severity)
- INDEX idx_risk_status (orgId, status)
- INDEX idx_risk_due (orgId, dueDate)
- INDEX idx_risk_score (orgId, score DESC)

---

## 3) Ticket Management Entities

### 3.1 Ticket
**Purpose:** Support tickets and service requests

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Ticket identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| ticketNumber | VARCHAR(50) | NOT NULL | Human-readable ticket number (e.g., "TICK-2026-0001") |
| createdByUserId | UUID | FK → User(id), NOT NULL | Requester |
| assignedToStaffId | UUID | NULL | Assigned Vantus staff |
| assignedToUserId | UUID | FK → User(id), NULL | Assigned client user |
| status | ENUM | NOT NULL | open, in_progress, pending, resolved, closed, reopened |
| severity | ENUM | NOT NULL | low, medium, high, critical |
| priority | INTEGER | NOT NULL, DEFAULT 3 | 1-5 priority scale |
| category | VARCHAR(100) | NOT NULL | General classification |
| subcategory | VARCHAR(100) | NULL | Detailed classification |
| type | VARCHAR(100) | NULL | incident, request, question, problem |
| slaTier | VARCHAR(50) | NULL | SLA tier: standard, priority, critical |
| impact | ENUM | NULL | individual, team, department, organization |
| urgency | ENUM | NULL | low, medium, high, critical |
| source | ENUM | NOT NULL, DEFAULT 'portal' | email, portal, chat, phone, api, automated |
| templateId | UUID | NULL | Ticket template used |
| parentTicketId | UUID | FK → Ticket(id), NULL | Parent for ticket hierarchies |
| title | VARCHAR(255) | NOT NULL | Ticket subject |
| description | TEXT | NULL | Initial description |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| closedAt | TIMESTAMP | NULL | When closed |
| resolvedAt | TIMESTAMP | NULL | When resolved |
| firstResponseAt | TIMESTAMP | NULL | First staff response |
| firstResponseSlaMet | BOOLEAN | NULL | First response SLA met |
| resolutionSlaMet | BOOLEAN | NULL | Resolution SLA met |
| slaBreached | BOOLEAN | NOT NULL, DEFAULT FALSE | Any SLA breach occurred |
| slaPauseReason | VARCHAR(100) | NULL | waiting_for_customer, waiting_for_third_party |
| slaPausedAt | TIMESTAMP | NULL | When SLA timer paused |
| satisfactionRating | INTEGER | NULL | 1-5 satisfaction score |
| satisfactionComment | TEXT | NULL | Feedback comment |
| satisfactionSubmittedAt | TIMESTAMP | NULL | When feedback submitted |
| timeSpent | INTEGER | NOT NULL, DEFAULT 0 | Total time in minutes |
| billableTime | INTEGER | NOT NULL, DEFAULT 0 | Billable time in minutes |
| billableAmount | DECIMAL(10,2) | NULL | Calculated billable amount |
| vipFlag | BOOLEAN | NOT NULL, DEFAULT FALSE | VIP priority flag |
| onHoldUntil | TIMESTAMP | NULL | Expected resumption |
| tags | VARCHAR(50)[] | NULL | Ticket tags |
| customFields | JSONB | NULL | Custom field values |
| deflectionAttempted | BOOLEAN | NOT NULL, DEFAULT FALSE | Self-service attempted |
| deflectionSuccessful | BOOLEAN | NULL | Self-service resolved issue |
| aiCategorizationId | UUID | NULL | AI categorization reference |
| aiSentimentId | UUID | NULL | AI sentiment analysis |
| channel | VARCHAR(50) | NULL | Origination channel |
| location | VARCHAR(100) | NULL | Physical location if relevant |
| departmentId | UUID | NULL | Department reference |
| projectId | UUID | NULL | Related project |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_ticket_number (orgId, ticketNumber)
- INDEX idx_ticket_org (orgId)
- INDEX idx_ticket_requester (orgId, createdByUserId)
- INDEX idx_ticket_status (orgId, status)
- INDEX idx_ticket_assigned (orgId, assignedToStaffId)
- INDEX idx_ticket_created (orgId, createdAt DESC)
- INDEX idx_ticket_parent (parentTicketId)
- INDEX idx_ticket_sla (slaBreached, onHoldUntil)

**Relationships:**
- Belongs to Org (N:1)
- Belongs to User (requester) (N:1)
- Has many TicketMessages (1:N)
- Has many TicketActivities (1:N)
- Self-referential parent/child (1:N)

---

### 3.2 TicketMessage
**Purpose:** Messages within tickets

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Message identifier |
| ticketId | UUID | FK → Ticket(id), NOT NULL | Parent ticket |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| authorType | ENUM | NOT NULL | client, vantus, system, ai |
| authorId | UUID | NOT NULL | Author reference |
| body | TEXT | NOT NULL | Message content (sanitized markdown) |
| bodyHtml | TEXT | NULL | Rendered HTML |
| isInternal | BOOLEAN | NOT NULL, DEFAULT FALSE | Internal note (not visible to client) |
| isSystem | BOOLEAN | NOT NULL, DEFAULT FALSE | Automated message |
| createdAt | TIMESTAMP | NOT NULL | Message timestamp |
| updatedAt | TIMESTAMP | NULL | Edit timestamp |
| editedBy | UUID | NULL | Who edited |
| editReason | TEXT | NULL | Reason for edit |
| attachmentIds | UUID[] | NULL | Attached files |
| reactionSummary | JSONB | NULL | Emoji reaction counts |
| mentionedUserIds | UUID[] | NULL | Users mentioned |
| readBy | UUID[] | NULL | Users who read |
| readReceipts | JSONB | NULL | Detailed read timestamps |
| aiGenerated | BOOLEAN | NOT NULL, DEFAULT FALSE | AI-generated content |
| aiConfidence | DECIMAL(3,2) | NULL | AI confidence score |
| viaEmail | BOOLEAN | NOT NULL, DEFAULT FALSE | Received via email |
| emailMessageId | VARCHAR(255) | NULL | Original email ID |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_message_ticket (ticketId)
- INDEX idx_message_created (ticketId, createdAt DESC)
- INDEX idx_message_author (authorId)

**Relationships:**
- Belongs to Ticket (N:1)
- Belongs to Org (N:1)
- Has many Attachments (1:N)
- Has many Reactions (1:N)

---

### 3.3 TicketActivity
**Purpose:** Audit trail of ticket changes

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Activity identifier |
| ticketId | UUID | FK → Ticket(id), NOT NULL | Parent ticket |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| actorType | ENUM | NOT NULL | client, vantus, system, api |
| actorId | UUID | NOT NULL | Who performed action |
| action | VARCHAR(100) | NOT NULL | Action type |
| fieldName | VARCHAR(100) | NULL | Field that changed |
| oldValue | TEXT | NULL | Previous value |
| newValue | TEXT | NULL | New value |
| metadata | JSONB | NULL | Additional context |
| createdAt | TIMESTAMP | NOT NULL | Activity timestamp |
| ipAddress | INET | NULL | Actor IP |
| userAgent | TEXT | NULL | Actor user agent |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_activity_ticket (ticketId, createdAt DESC)
- INDEX idx_activity_org (orgId, createdAt DESC)

---

### 3.4 TicketLink
**Purpose:** Link related tickets

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Link identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| ticketId | UUID | FK → Ticket(id), NOT NULL | Source ticket |
| linkedTicketId | UUID | FK → Ticket(id), NOT NULL | Target ticket |
| linkType | ENUM | NOT NULL | duplicate, related, blocked_by, blocks, parent_of, child_of |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| createdBy | UUID | NOT NULL | Who created link |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_link_unique (ticketId, linkedTicketId, linkType)
- INDEX idx_link_ticket (ticketId)
- INDEX idx_link_linked (linkedTicketId)

---

## 4) Document Vault Entities

### 4.1 Document
**Purpose:** Stored documents and files

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Document identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| title | VARCHAR(255) | NOT NULL | Document title |
| description | TEXT | NULL | Document description |
| type | VARCHAR(100) | NOT NULL | Document type |
| classification | ENUM | NOT NULL | public, internal, confidential, restricted |
| status | ENUM | NOT NULL | draft, review, approved, archived |
| version | INTEGER | NOT NULL, DEFAULT 1 | Version number |
| parentDocumentId | UUID | FK → Document(id), NULL | Parent for hierarchies |
| folderId | UUID | FK → Folder(id), NULL | Folder location |
| collectionIds | UUID[] | NULL | Collection memberships |
| tags | VARCHAR(50)[] | NULL | Document tags |
| contentType | VARCHAR(100) | NOT NULL | MIME type |
| mimeType | VARCHAR(100) | NOT NULL | Full MIME type |
| sizeBytes | BIGINT | NOT NULL | File size |
| storageKey | VARCHAR(500) | NOT NULL | Object storage key |
| hashSha256 | VARCHAR(64) | NOT NULL | File hash |
| hashAlgorithm | VARCHAR(20) | NOT NULL, DEFAULT 'sha256' | Hash algorithm used |
| previewAvailable | BOOLEAN | NOT NULL, DEFAULT FALSE | Preview generated |
| previewUrl | VARCHAR(500) | NULL | Preview image URL |
| thumbnailUrl | VARCHAR(500) | NULL | Thumbnail URL |
| ocrText | TEXT | NULL | OCR extracted text |
| ocrConfidence | DECIMAL(5,2) | NULL | OCR confidence |
| ocrLanguage | VARCHAR(10) | NULL | OCR language |
| watermarkEnabled | BOOLEAN | NOT NULL, DEFAULT FALSE | Watermark applied |
| watermarkText | VARCHAR(255) | NULL | Watermark content |
| digitalSignature | JSONB | NULL | Signature metadata |
| signatureDate | TIMESTAMP | NULL | When signed |
| approvalWorkflowId | UUID | NULL | Workflow for approval |
| approvalStatus | ENUM | NULL | pending, approved, rejected |
| retentionPolicyId | UUID | NULL | Retention policy |
| retentionUntil | DATE | NULL | Retention expiration |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| createdByStaffId | UUID | NULL | Vantus staff creator |
| createdByUserId | UUID | FK → User(id), NULL | Client user creator |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| lastDownloadedAt | TIMESTAMP | NULL | Last download |
| downloadCount | INTEGER | NOT NULL, DEFAULT 0 | Total downloads |
| viewCount | INTEGER | NOT NULL, DEFAULT 0 | Total views |
| starredBy | UUID[] | NULL | User IDs who starred |
| encrypted | BOOLEAN | NOT NULL, DEFAULT FALSE | File encrypted at rest |
| encryptionKeyId | UUID | NULL | Encryption key reference |
| virusScanStatus | ENUM | NOT NULL, DEFAULT 'pending' | pending, clean, infected, error |
| virusScanResult | JSONB | NULL | Scan details |
| metadata | JSONB | NULL | Extracted metadata |
| customFields | JSONB | NULL | Custom field values |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_doc_org (orgId)
- INDEX idx_doc_folder (folderId)
- INDEX idx_doc_type (orgId, type)
- INDEX idx_doc_classification (orgId, classification)
- INDEX idx_doc_status (orgId, status)
- INDEX idx_doc_parent (parentDocumentId)
- INDEX idx_doc_retention (retentionUntil) WHERE retentionUntil IS NOT NULL
- INDEX idx_doc_ocr (orgId) USING GIN (to_tsvector('english', ocrText)) WHERE ocrText IS NOT NULL

**Relationships:**
- Belongs to Org (N:1)
- Belongs to Folder (N:1)
- Self-referential parent/child (1:N)
- Has many DocumentVersions (1:N)
- Has many DocumentAccessLogs (1:N)

---

### 4.2 DocumentVersion
**Purpose:** Document version history

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Version identifier |
| documentId | UUID | FK → Document(id), NOT NULL | Parent document |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| version | INTEGER | NOT NULL | Version number |
| changeSummary | TEXT | NULL | What changed |
| storageKey | VARCHAR(500) | NOT NULL | Object storage key |
| hashSha256 | VARCHAR(64) | NOT NULL | File hash |
| sizeBytes | BIGINT | NOT NULL | File size |
| createdAt | TIMESTAMP | NOT NULL | Version timestamp |
| createdBy | UUID | NOT NULL | Who created version |
| isCurrent | BOOLEAN | NOT NULL, DEFAULT FALSE | Is this the current version |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_version_doc_ver (documentId, version)
- INDEX idx_version_current (documentId, isCurrent) WHERE isCurrent = TRUE

---

### 4.3 Folder
**Purpose:** Document organization

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Folder identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Folder name |
| description | TEXT | NULL | Folder description |
| parentFolderId | UUID | FK → Folder(id), NULL | Parent folder |
| path | VARCHAR(1000) | NOT NULL | Materialized path |
| depth | INTEGER | NOT NULL, DEFAULT 0 | Nesting depth |
| icon | VARCHAR(50) | NULL | Folder icon |
| color | VARCHAR(7) | NULL | Folder color |
| permissions | JSONB | NULL | Custom permissions |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| createdBy | UUID | NOT NULL | Creator |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| documentCount | INTEGER | NOT NULL, DEFAULT 0 | Cached document count |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_folder_org (orgId)
- INDEX idx_folder_parent (parentFolderId)
- INDEX idx_folder_path (orgId, path)

---

### 4.4 DocumentCollection
**Purpose:** Logical groupings across folders

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Collection identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Collection name |
| description | TEXT | NULL | Collection description |
| type | ENUM | NOT NULL | manual, smart, project |
| query | JSONB | NULL | Smart collection query |
| icon | VARCHAR(50) | NULL | Collection icon |
| color | VARCHAR(7) | NULL | Collection color |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| createdBy | UUID | NOT NULL | Creator |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| documentIds | UUID[] | NULL | Manual collection documents |
| isDefault | BOOLEAN | NOT NULL, DEFAULT FALSE | System default collection |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_collection_org (orgId)
- INDEX idx_collection_type (orgId, type)

---

### 4.5 DocumentAccessLog
**Purpose:** Track document access for audit

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Log identifier |
| documentId | UUID | FK → Document(id), NOT NULL | Document accessed |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| userId | UUID | FK → User(id), NOT NULL | User who accessed |
| action | ENUM | NOT NULL | view, download, share, print |
| accessedAt | TIMESTAMP | NOT NULL | Access timestamp |
| ipAddress | INET | NULL | User IP |
| userAgent | TEXT | NULL | User agent |
| success | BOOLEAN | NOT NULL | Access granted |
| denialReason | VARCHAR(100) | NULL | Why access denied |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_access_doc (documentId, accessedAt DESC)
- INDEX idx_access_user (userId, accessedAt DESC)

---

### 4.6 EvidenceExport
**Purpose:** Compliance evidence packages

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Export identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Export name |
| description | TEXT | NULL | Export description |
| status | ENUM | NOT NULL | pending, generating, completed, failed |
| storageKey | VARCHAR(500) | NOT NULL | Object storage key |
| hashSha256 | VARCHAR(64) | NOT NULL | File hash |
| sizeBytes | BIGINT | NULL | Export size |
| manifestJson | JSONB | NOT NULL | Export manifest |
| filterCriteria | JSONB | NULL | Applied filters |
| documentIds | UUID[] | NULL | Included documents |
| ticketIds | UUID[] | NULL | Included tickets |
| dateRangeStart | DATE | NULL | Filter start date |
| dateRangeEnd | DATE | NULL | Filter end date |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| createdByStaffId | UUID | NOT NULL | Requesting staff |
| expiresAt | DATE | NULL | Export expiration |
| downloadedAt | TIMESTAMP | NULL | When downloaded |
| downloadedBy | UUID | NULL | Who downloaded |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_export_org (orgId, createdAt DESC)
- INDEX idx_export_status (orgId, status)

---

## 5) Knowledge Base Entities

### 5.1 KbCategory
**Purpose:** Hierarchical knowledge organization

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Category identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Category name |
| description | TEXT | NULL | Category description |
| slug | VARCHAR(100) | NOT NULL | URL slug |
| parentCategoryId | UUID | FK → KbCategory(id), NULL | Parent category |
| path | VARCHAR(1000) | NOT NULL | Materialized path |
| depth | INTEGER | NOT NULL, DEFAULT 0 | Nesting depth |
| icon | VARCHAR(50) | NULL | Category icon |
| color | VARCHAR(7) | NULL | Category color |
| sortOrder | INTEGER | NOT NULL, DEFAULT 0 | Display order |
| articleCount | INTEGER | NOT NULL, DEFAULT 0 | Cached article count |
| isVisible | BOOLEAN | NOT NULL, DEFAULT TRUE | Visible to users |
| requiresAuth | BOOLEAN | NOT NULL, DEFAULT FALSE | Authentication required |
| allowedRoles | VARCHAR(50)[] | NULL | Role restrictions |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_kb_cat_slug (orgId, slug)
- INDEX idx_kb_cat_org (orgId)
- INDEX idx_kb_cat_parent (parentCategoryId)
- INDEX idx_kb_cat_order (orgId, sortOrder)

---

### 5.2 KbArticle
**Purpose:** Knowledge base articles

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Article identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| categoryId | UUID | FK → KbCategory(id), NULL | Primary category |
| title | VARCHAR(255) | NOT NULL | Article title |
| slug | VARCHAR(100) | NOT NULL | URL slug |
| content | TEXT | NOT NULL | Article content (markdown) |
| contentHtml | TEXT | NULL | Rendered HTML |
| excerpt | VARCHAR(500) | NULL | Short excerpt |
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->
| visibility | ENUM | NOT NULL | public, authenticated, role_based |
| allowedRoles | VARCHAR(50)[] | NULL | Role restrictions |
| authorId | UUID | FK → User(id), NOT NULL | Original author |
| ownerId | UUID | FK → User(id), NULL | Current owner |
| version | INTEGER | NOT NULL, DEFAULT 1 | Current version number |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->
| archivedAt | TIMESTAMP | NULL | When archived |
| featured | BOOLEAN | NOT NULL, DEFAULT FALSE | Featured article |
| featuredOrder | INTEGER | NULL | Featured display order |
| helpfulVotes | INTEGER | NOT NULL, DEFAULT 0 | Positive feedback count |
| unhelpfulVotes | INTEGER | NOT NULL, DEFAULT 0 | Negative feedback count |
| viewCount | INTEGER | NOT NULL, DEFAULT 0 | Total views |
| uniqueViewCount | INTEGER | NOT NULL, DEFAULT 0 | Unique viewers |
| lastViewedAt | TIMESTAMP | NULL | Last view timestamp |
| searchKeywords | VARCHAR(100)[] | NULL | SEO keywords |
| relatedArticleIds | UUID[] | NULL | Related articles |
| requiredReading | BOOLEAN | NOT NULL, DEFAULT FALSE | Mandatory reading |
| requiredReadingRoles | VARCHAR(50)[] | NULL | Roles requiring read |
| estimatedReadTime | INTEGER | NULL | Minutes to read |
| difficulty | ENUM | NULL | beginner, intermediate, advanced |
| aiGenerated | BOOLEAN | NOT NULL, DEFAULT FALSE | AI-generated content |
| aiConfidence | DECIMAL(3,2) | NULL | AI confidence score |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_kb_article_slug (orgId, slug)
- INDEX idx_kb_article_org (orgId)
- INDEX idx_kb_article_cat (categoryId)
- INDEX idx_kb_article_status (orgId, status)
- INDEX idx_kb_article_featured (orgId, featured, featuredOrder) WHERE featured = TRUE
- INDEX idx_kb_article_search (orgId) USING GIN (to_tsvector('english', title || ' ' || content))

**Relationships:**
- Belongs to KbCategory (N:1)
- Belongs to Org (N:1)
- Has many KbArticleVersions (1:N)
- Has many KbArticleFeedback (1:N)
- Has many KbArticleTags (N:M via KbArticleTag)

---

### 5.3 KbArticleVersion
**Purpose:** Article version history

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Version identifier |
| articleId | UUID | FK → KbArticle(id), NOT NULL | Parent article |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| version | INTEGER | NOT NULL | Version number |
| title | VARCHAR(255) | NOT NULL | Version title |
| content | TEXT | NOT NULL | Version content |
| changeSummary | TEXT | NULL | What changed |
| createdAt | TIMESTAMP | NOT NULL | Version timestamp |
| createdBy | UUID | NOT NULL | Who created version |
| isCurrent | BOOLEAN | NOT NULL, DEFAULT FALSE | Is current version |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_kb_ver_article (articleId, version)

---

### 5.4 KbArticleFeedback
**Purpose:** Article ratings and feedback

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Feedback identifier |
| articleId | UUID | FK → KbArticle(id), NOT NULL | Article reference |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| userId | UUID | FK → User(id), NOT NULL | User feedback |
| isHelpful | BOOLEAN | NOT NULL | Was article helpful |
| rating | INTEGER | NULL | 1-5 rating |
| comment | TEXT | NULL | Feedback comment |
| createdAt | TIMESTAMP | NOT NULL | Feedback timestamp |
| updatedAt | TIMESTAMP | NULL | Update timestamp |
| pageUrl | VARCHAR(500) | NULL | Where feedback submitted |
| searchQuery | VARCHAR(255) | NULL | Search that led here |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_kb_feedback_unique (articleId, userId)
- INDEX idx_kb_feedback_article (articleId)

---

### 5.5 KbTag
**Purpose:** Article tags

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Tag identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(50) | NOT NULL | Tag name |
| slug | VARCHAR(50) | NOT NULL | URL slug |
| color | VARCHAR(7) | NULL | Tag color |
| description | TEXT | NULL | Tag description |
| articleCount | INTEGER | NOT NULL, DEFAULT 0 | Cached count |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_kb_tag_slug (orgId, slug)
- INDEX idx_kb_tag_org (orgId)

---

### 5.6 KbArticleTag
**Purpose:** Article-tag relationships

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Relationship identifier |
| articleId | UUID | FK → KbArticle(id), NOT NULL | Article reference |
| tagId | UUID | FK → KbTag(id), NOT NULL | Tag reference |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_kb_art_tag (articleId, tagId)
- INDEX idx_kb_tag_articles (tagId)

---

### 5.7 KbRelatedArticle
**Purpose:** Manual article relationships

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Relationship identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| articleId | UUID | FK → KbArticle(id), NOT NULL | Source article |
| relatedArticleId | UUID | FK → KbArticle(id), NOT NULL | Related article |
| relationshipType | VARCHAR(50) | NOT NULL | Type of relationship |
| relevanceScore | DECIMAL(3,2) | NULL | Relevance (0-1) |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_kb_related (articleId, relatedArticleId)
- INDEX idx_kb_related_target (relatedArticleId)

---

### 5.8 KbView
**Purpose:** Article view tracking

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | View identifier |
| articleId | UUID | FK → KbArticle(id), NOT NULL | Article viewed |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| userId | UUID | FK → User(id), NULL | User who viewed |
| sessionId | UUID | NULL | Anonymous session |
| viewedAt | TIMESTAMP | NOT NULL | View timestamp |
| durationSeconds | INTEGER | NULL | Time spent reading |
| scrollDepth | INTEGER | NULL | Scroll percentage |
| source | VARCHAR(100) | NULL | How user arrived |
| searchQuery | VARCHAR(255) | NULL | Search that led here |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_kb_view_article (articleId, viewedAt DESC)
- INDEX idx_kb_view_user (userId, viewedAt DESC)

---

### 5.9 KbGlossaryTerm
**Purpose:** Glossary definitions

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Term identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| term | VARCHAR(100) | NOT NULL | Term name |
| slug | VARCHAR(100) | NOT NULL | URL slug |
| definition | TEXT | NOT NULL | Term definition |
| abbreviation | VARCHAR(20) | NULL | Short form |
| synonyms | VARCHAR(100)[] | NULL | Alternative terms |
| relatedTerms | UUID[] | NULL | Related term IDs |
| category | VARCHAR(50) | NULL | Term category |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| createdBy | UUID | NOT NULL | Creator |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_kb_term_slug (orgId, slug)
- INDEX idx_kb_term_org (orgId)
- INDEX idx_kb_term_search (orgId) USING GIN (to_tsvector('english', term || ' ' || definition))

---

### 5.10 KbVideo
**Purpose:** Video knowledge base content

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Video identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| categoryId | UUID | FK → KbCategory(id), NULL | Category |
| title | VARCHAR(255) | NOT NULL | Video title |
| description | TEXT | NULL | Video description |
| slug | VARCHAR(100) | NOT NULL | URL slug |
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->
| provider | VARCHAR(50) | NOT NULL | youtube, vimeo, custom |
| providerVideoId | VARCHAR(100) | NULL | External video ID |
| storageKey | VARCHAR(500) | NULL | Self-hosted video |
| thumbnailUrl | VARCHAR(500) | NULL | Video thumbnail |
| durationSeconds | INTEGER | NULL | Video length |
| transcript | TEXT | NULL | Video transcript |
| captionsUrl | VARCHAR(500) | NULL | Captions file URL |
| viewCount | INTEGER | NOT NULL, DEFAULT 0 | Total views |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_kb_video_slug (orgId, slug)
- INDEX idx_kb_video_org (orgId)
- INDEX idx_kb_video_status (orgId, status)

---

## 6) Community/Forum Entities

### 6.1 Forum
**Purpose:** Community discussion forums

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Forum identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Forum name |
| description | TEXT | NULL | Forum description |
| slug | VARCHAR(100) | NOT NULL | URL slug |
| icon | VARCHAR(50) | NULL | Forum icon |
| color | VARCHAR(7) | NULL | Forum color |
| type | ENUM | NOT NULL | discussion, qna, ideas, support |
| sortOrder | INTEGER | NOT NULL, DEFAULT 0 | Display order |
| isVisible | BOOLEAN | NOT NULL, DEFAULT TRUE | Visible to users |
| requiresAuth | BOOLEAN | NOT NULL, DEFAULT TRUE | Login required |
| allowedRoles | VARCHAR(50)[] | NULL | Role restrictions |
| allowAnonymous | BOOLEAN | NOT NULL, DEFAULT FALSE | Allow anonymous posts |
| allowReactions | BOOLEAN | NOT NULL, DEFAULT TRUE | Enable reactions |
| allowAttachments | BOOLEAN | NOT NULL, DEFAULT TRUE | Enable attachments |
| moderationLevel | ENUM | NOT NULL, DEFAULT 'post' | none, post, topic |
| topicCount | INTEGER | NOT NULL, DEFAULT 0 | Cached topic count |
| postCount | INTEGER | NOT NULL, DEFAULT 0 | Cached post count |
| lastPostAt | TIMESTAMP | NULL | Last activity |
| lastPostId | UUID | NULL | Last post reference |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| createdBy | UUID | NOT NULL | Creator |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_forum_slug (orgId, slug)
- INDEX idx_forum_org (orgId, sortOrder)
- INDEX idx_forum_type (orgId, type)

---

### 6.2 ForumTopic
**Purpose:** Discussion topics/threads

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Topic identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| forumId | UUID | FK → Forum(id), NOT NULL | Parent forum |
| title | VARCHAR(255) | NOT NULL | Topic title |
| slug | VARCHAR(100) | NOT NULL | URL slug |
| content | TEXT | NOT NULL | Initial post content |
| authorId | UUID | FK → User(id), NULL | Topic author |
| authorName | VARCHAR(255) | NULL | Anonymous display name |
| authorIp | INET | NULL | Author IP (for anonymous) |
| status | ENUM | NOT NULL | open, solved, closed, pinned, archived |
| isPinned | BOOLEAN | NOT NULL, DEFAULT FALSE | Pinned to top |
| pinOrder | INTEGER | NULL | Pin display order |
| isLocked | BOOLEAN | NOT NULL, DEFAULT FALSE | Locked (no replies) |
| viewCount | INTEGER | NOT NULL, DEFAULT 0 | View count |
| postCount | INTEGER | NOT NULL, DEFAULT 0 | Reply count |
| replyCount | INTEGER | NOT NULL, DEFAULT 0 | Actual reply count |
| voteCount | INTEGER | NOT NULL, DEFAULT 0 | Net vote score |
| lastPostAt | TIMESTAMP | NULL | Last reply timestamp |
| lastPostId | UUID | NULL | Last post reference |
| lastPostBy | UUID | NULL | Last poster |
| acceptedAnswerId | UUID | NULL | Accepted solution post |
| tags | VARCHAR(50)[] | NULL | Topic tags |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| solvedAt | TIMESTAMP | NULL | When marked solved |
| solvedBy | UUID | NULL | Who marked solved |
| moderationStatus | ENUM | NOT NULL, DEFAULT 'approved' | pending, approved, rejected |
| moderatedAt | TIMESTAMP | NULL | Moderation timestamp |
| moderatedBy | UUID | NULL | Moderator |
| moderationReason | TEXT | NULL | Moderation note |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_topic_slug (orgId, slug)
- INDEX idx_topic_forum (forumId, lastPostAt DESC)
- INDEX idx_topic_status (forumId, status)
- INDEX idx_topic_pinned (forumId, isPinned, pinOrder) WHERE isPinned = TRUE
- INDEX idx_topic_author (authorId)

**Relationships:**
- Belongs to Forum (N:1)
- Belongs to Org (N:1)
- Has many ForumPosts (1:N)
- Has many ForumSubscriptions (1:N)

---

### 6.3 ForumPost
**Purpose:** Individual posts/replies

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Post identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| topicId | UUID | FK → ForumTopic(id), NOT NULL | Parent topic |
| parentPostId | UUID | FK → ForumPost(id), NULL | Parent for threaded replies |
| authorId | UUID | FK → User(id), NULL | Post author |
| authorName | VARCHAR(255) | NULL | Anonymous name |
| content | TEXT | NOT NULL | Post content (markdown) |
| contentHtml | TEXT | NULL | Rendered HTML |
| isFirstPost | BOOLEAN | NOT NULL, DEFAULT FALSE | Is topic starter |
| voteCount | INTEGER | NOT NULL, DEFAULT 0 | Net votes |
| helpfulCount | INTEGER | NOT NULL, DEFAULT 0 | Helpful reactions |
| attachmentIds | UUID[] | NULL | Attached files |
| createdAt | TIMESTAMP | NOT NULL | Post timestamp |
| updatedAt | TIMESTAMP | NULL | Edit timestamp |
| editedBy | UUID | NULL | Editor |
| editReason | TEXT | NULL | Edit explanation |
| moderationStatus | ENUM | NOT NULL, DEFAULT 'approved' | pending, approved, rejected |
| moderatedAt | TIMESTAMP | NULL | When moderated |
| moderatedBy | UUID | NULL | Moderator |
| moderationReason | TEXT | NULL | Moderation note |
| isDeleted | BOOLEAN | NOT NULL, DEFAULT FALSE | Soft delete |
| deletedAt | TIMESTAMP | NULL | When deleted |
| deletedBy | UUID | NULL | Who deleted |
| deletionReason | TEXT | NULL | Deletion reason |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_post_topic (topicId, createdAt)
- INDEX idx_post_parent (parentPostId)
- INDEX idx_post_author (authorId)

**Relationships:**
- Belongs to ForumTopic (N:1)
- Self-referential parent/child (1:N)
- Has many ForumReactions (1:N)

---

### 6.4 ForumReaction
**Purpose:** Post reactions (likes, helpful, etc.)

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Reaction identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| postId | UUID | FK → ForumPost(id), NOT NULL | Post reacted to |
| userId | UUID | FK → User(id), NOT NULL | User who reacted |
| reactionType | ENUM | NOT NULL | like, helpful, thanks, insightful |
| createdAt | TIMESTAMP | NOT NULL | Reaction timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_reaction_unique (postId, userId, reactionType)
- INDEX idx_reaction_post (postId)

---

### 6.5 ForumModeration
**Purpose:** Moderation actions log

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Moderation identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| forumId | UUID | FK → Forum(id), NULL | Affected forum |
| topicId | UUID | FK → ForumTopic(id), NULL | Affected topic |
| postId | UUID | FK → ForumPost(id), NULL | Affected post |
| moderatorId | UUID | FK → User(id), NOT NULL | Acting moderator |
| action | ENUM | NOT NULL | approve, reject, edit, delete, lock, unlock, pin, unpin, move, warn |
| previousValue | JSONB | NULL | State before action |
| newValue | JSONB | NULL | State after action |
| reason | TEXT | NULL | Moderation reason |
| createdAt | TIMESTAMP | NOT NULL | Action timestamp |
| userNotified | BOOLEAN | NOT NULL, DEFAULT FALSE | User notified of action |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_mod_org (orgId, createdAt DESC)
- INDEX idx_mod_moderator (moderatorId)

---

### 6.6 ForumSubscription
**Purpose:** User topic/forum subscriptions

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Subscription identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| userId | UUID | FK → User(id), NOT NULL | Subscriber |
| forumId | UUID | FK → Forum(id), NULL | Subscribed forum |
| topicId | UUID | FK → ForumTopic(id), NULL | Subscribed topic |
| subscriptionType | ENUM | NOT NULL | all, mentions, replies |
| emailNotifications | BOOLEAN | NOT NULL, DEFAULT TRUE | Email notifications |
| inAppNotifications | BOOLEAN | NOT NULL, DEFAULT TRUE | In-app notifications |
| createdAt | TIMESTAMP | NOT NULL | Subscription timestamp |
| lastNotifiedAt | TIMESTAMP | NULL | Last notification sent |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_sub_unique_forum (userId, forumId) WHERE topicId IS NULL
- UNIQUE INDEX idx_sub_unique_topic (userId, topicId) WHERE forumId IS NULL
- INDEX idx_sub_user (userId)

---

## 7) Service Catalog Entities

### 7.1 ServiceCategory
**Purpose:** Service organization

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Category identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Category name |
| description | TEXT | NULL | Category description |
| slug | VARCHAR(100) | NOT NULL | URL slug |
| parentCategoryId | UUID | FK → ServiceCategory(id), NULL | Parent category |
| icon | VARCHAR(50) | NULL | Category icon |
| color | VARCHAR(7) | NULL | Category color |
| sortOrder | INTEGER | NOT NULL, DEFAULT 0 | Display order |
| isVisible | BOOLEAN | NOT NULL, DEFAULT TRUE | Visible to users |
| requiresAuth | BOOLEAN | NOT NULL, DEFAULT FALSE | Login required |
| allowedRoles | VARCHAR(50)[] | NULL | Role restrictions |
| serviceCount | INTEGER | NOT NULL, DEFAULT 0 | Cached service count |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_svc_cat_slug (orgId, slug)
- INDEX idx_svc_cat_org (orgId)
- INDEX idx_svc_cat_parent (parentCategoryId)

---

### 7.2 Service
**Purpose:** Service catalog definitions

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Service identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| categoryId | UUID | FK → ServiceCategory(id), NULL | Primary category |
| name | VARCHAR(255) | NOT NULL | Service name |
| description | TEXT | NOT NULL | Service description |
| slug | VARCHAR(100) | NOT NULL | URL slug |
| shortDescription | VARCHAR(500) | NULL | Brief summary |
| icon | VARCHAR(50) | NULL | Service icon |
| imageUrl | VARCHAR(500) | NULL | Service image |
| status | ENUM | NOT NULL | draft, active, deprecated, retired |
| availability | ENUM | NOT NULL | 24x7, business_hours, scheduled |
| fulfillmentTime | VARCHAR(100) | NULL | Expected fulfillment time |
| costDescription | VARCHAR(255) | NULL | Cost information |
| requiresApproval | BOOLEAN | NOT NULL, DEFAULT FALSE | Needs approval |
| approverRoles | VARCHAR(50)[] | NULL | Who can approve |
| formSchema | JSONB | NULL | Request form schema |
| workflowId | UUID | NULL | Fulfillment workflow |
| slaHours | INTEGER | NULL | SLA for fulfillment |
| autoApprove | BOOLEAN | NOT NULL, DEFAULT FALSE | Auto-approve requests |
| autoFulfill | BOOLEAN | NOT NULL, DEFAULT FALSE | Auto-fulfill requests |
| fulfillmentAutomation | JSONB | NULL | Automation rules |
| requestCount | INTEGER | NOT NULL, DEFAULT 0 | Total requests |
| viewCount | INTEGER | NOT NULL, DEFAULT 0 | View count |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| createdBy | UUID | NOT NULL | Creator |
| keywords | VARCHAR(50)[] | NULL | Search keywords |
| relatedServiceIds | UUID[] | NULL | Related services |
| prerequisites | JSONB | NULL | Required prerequisites |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_service_slug (orgId, slug)
- INDEX idx_service_org (orgId)
- INDEX idx_service_cat (categoryId)
- INDEX idx_service_status (orgId, status)

**Relationships:**
- Belongs to ServiceCategory (N:1)
- Has many ServiceRequests (1:N)
- Has many ServiceFormFields (1:N)
- Has many ServiceDependencies (1:N)

---

### 7.3 ServiceFormField
**Purpose:** Dynamic form fields for services

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Field identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| serviceId | UUID | FK → Service(id), NOT NULL | Parent service |
| name | VARCHAR(100) | NOT NULL | Field name |
| label | VARCHAR(255) | NOT NULL | Display label |
| type | ENUM | NOT NULL | text, textarea, number, date, select, multiselect, checkbox, radio, file, user, asset |
| isRequired | BOOLEAN | NOT NULL, DEFAULT FALSE | Required field |
| isHidden | BOOLEAN | NOT NULL, DEFAULT FALSE | Hidden field |
| defaultValue | TEXT | NULL | Default value |
| placeholder | VARCHAR(255) | NULL | Placeholder text |
| helpText | TEXT | NULL | Help description |
| validation | JSONB | NULL | Validation rules |
| options | JSONB | NULL | Select options |
| dependsOn | VARCHAR(100) | NULL | Conditional field dependency |
| showWhen | JSONB | NULL | Condition for showing |
| sortOrder | INTEGER | NOT NULL, DEFAULT 0 | Field order |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_form_service (serviceId, sortOrder)

---

### 7.4 ServiceRequest
**Purpose:** Service requests from users

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Request identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| serviceId | UUID | FK → Service(id), NOT NULL | Requested service |
| requesterId | UUID | FK → User(id), NOT NULL | Requesting user |
| ticketId | UUID | FK → Ticket(id), NULL | Related ticket |
| requestNumber | VARCHAR(50) | NOT NULL | Human-readable number |
| status | ENUM | NOT NULL | draft, submitted, pending_approval, approved, in_progress, fulfilled, rejected, cancelled |
| priority | ENUM | NOT NULL, DEFAULT 'medium' | low, medium, high, urgent |
| formData | JSONB | NOT NULL | Submitted form data |
| attachments | JSONB | NULL | Attached files |
| justification | TEXT | NULL | Business justification |
| neededByDate | DATE | NULL | Requested completion date |
| approverId | UUID | FK → User(id), NULL | Assigned approver |
| approvedAt | TIMESTAMP | NULL | Approval timestamp |
| approvedBy | UUID | NULL | Who approved |
| approvalNotes | TEXT | NULL | Approval comments |
| fulfillmentStartedAt | TIMESTAMP | NULL | Fulfillment start |
| fulfillmentCompletedAt | TIMESTAMP | NULL | Fulfillment completion |
| fulfillmentNotes | TEXT | NULL | Fulfillment notes |
| fulfillmentResult | JSONB | NULL | Fulfillment output |
| cost | DECIMAL(10,2) | NULL | Actual cost |
| timeSpent | INTEGER | NULL | Time in minutes |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| submittedAt | TIMESTAMP | NULL | When submitted |
| completedAt | TIMESTAMP | NULL | When completed |
| cancelledAt | TIMESTAMP | NULL | When cancelled |
| cancelledBy | UUID | NULL | Who cancelled |
| cancellationReason | TEXT | NULL | Cancellation reason |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_req_number (orgId, requestNumber)
- INDEX idx_req_org (orgId)
- INDEX idx_req_service (serviceId)
- INDEX idx_req_requester (requesterId)
- INDEX idx_req_status (orgId, status)
- INDEX idx_req_ticket (ticketId)

**Relationships:**
- Belongs to Service (N:1)
- Belongs to User (requester) (N:1)
- Has one ServiceFulfillment (1:1)

---

### 7.5 ServiceDependency
**Purpose:** Service relationships and prerequisites

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Dependency identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| serviceId | UUID | FK → Service(id), NOT NULL | Source service |
| dependsOnServiceId | UUID | FK → Service(id), NOT NULL | Required service |
| dependencyType | ENUM | NOT NULL | requires, recommends, conflicts_with |
| isMandatory | BOOLEAN | NOT NULL, DEFAULT TRUE | Must be fulfilled |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_dep_unique (serviceId, dependsOnServiceId)
- INDEX idx_dep_service (serviceId)

---

### 7.6 ServiceBundle
**Purpose:** Service packages

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Bundle identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Bundle name |
| description | TEXT | NULL | Bundle description |
| slug | VARCHAR(100) | NOT NULL | URL slug |
| status | ENUM | NOT NULL | active, inactive |
| serviceIds | UUID[] | NOT NULL | Included services |
| price | DECIMAL(10,2) | NULL | Bundle price |
| discountPercent | DECIMAL(5,2) | NULL | Bundle discount |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_bundle_slug (orgId, slug)

---

### 7.7 ServiceFulfillment
**Purpose:** Service fulfillment tracking

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Fulfillment identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| requestId | UUID | FK → ServiceRequest(id), NOT NULL | Parent request |
| status | ENUM | NOT NULL | pending, in_progress, waiting, completed, failed |
| startedAt | TIMESTAMP | NULL | Fulfillment start |
| completedAt | TIMESTAMP | NULL | Fulfillment completion |
| assignedTo | UUID | NULL | Assigned fulfiller |
| steps | JSONB | NULL | Fulfillment steps |
| currentStep | INTEGER | NULL | Current step index |
| automationRunId | UUID | NULL | Automation execution |
| notes | TEXT | NULL | Internal notes |
| result | JSONB | NULL | Fulfillment output |
| artifacts | JSONB | NULL | Generated artifacts |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_fulfillment_req (requestId)
- INDEX idx_fulfillment_status (orgId, status)

---

## 8) Analytics/Reporting Entities

### 8.1 Report
**Purpose:** Saved report definitions

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Report identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Report name |
| description | TEXT | NULL | Report description |
| type | ENUM | NOT NULL | table, chart, pivot, custom |
| dataSource | VARCHAR(100) | NOT NULL | Source entity type |
| query | JSONB | NOT NULL | Report query definition |
| filters | JSONB | NULL | Default filters |
| columns | JSONB | NULL | Column configuration |
| chartConfig | JSONB | NULL | Chart settings |
| isPublic | BOOLEAN | NOT NULL, DEFAULT FALSE | Shared with org |
| isTemplate | BOOLEAN | NOT NULL, DEFAULT FALSE | System template |
| createdBy | UUID | FK → User(id), NOT NULL | Creator |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| lastRunAt | TIMESTAMP | NULL | Last execution |
| lastRunDuration | INTEGER | NULL | Last run time (ms) |
| lastRunRows | INTEGER | NULL | Last result row count |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_report_org (orgId)
- INDEX idx_report_type (orgId, type)
- INDEX idx_report_creator (createdBy)

---

### 8.2 ReportSchedule
**Purpose:** Scheduled report delivery

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Schedule identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| reportId | UUID | FK → Report(id), NOT NULL | Report to run |
| name | VARCHAR(255) | NOT NULL | Schedule name |
| schedule | VARCHAR(100) | NOT NULL | Cron expression |
| timezone | VARCHAR(50) | NOT NULL | Schedule timezone |
| format | ENUM | NOT NULL | csv, xlsx, pdf, json |
| recipients | JSONB | NOT NULL | Email recipients |
| filters | JSONB | NULL | Override filters |
| isActive | BOOLEAN | NOT NULL, DEFAULT TRUE | Schedule active |
| nextRunAt | TIMESTAMP | NULL | Next scheduled run |
| lastRunAt | TIMESTAMP | NULL | Last execution |
| lastRunStatus | ENUM | NULL | success, failed |
| lastRunError | TEXT | NULL | Last error message |
| runCount | INTEGER | NOT NULL, DEFAULT 0 | Total executions |
| createdBy | UUID | FK → User(id), NOT NULL | Creator |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_schedule_report (reportId)
- INDEX idx_schedule_next (nextRunAt) WHERE isActive = TRUE

---

### 8.3 Dashboard
**Purpose:** Custom dashboards

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Dashboard identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Dashboard name |
| description | TEXT | NULL | Dashboard description |
| icon | VARCHAR(50) | NULL | Dashboard icon |
| layout | JSONB | NOT NULL | Layout configuration |
| isDefault | BOOLEAN | NOT NULL, DEFAULT FALSE | Org default dashboard |
| isPublic | BOOLEAN | NOT NULL, DEFAULT FALSE | Shared with org |
| createdBy | UUID | FK → User(id), NOT NULL | Creator |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_dashboard_org (orgId)
- INDEX idx_dashboard_default (orgId, isDefault) WHERE isDefault = TRUE

---

### 8.4 DashboardWidget
**Purpose:** Dashboard widget configurations

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Widget identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| dashboardId | UUID | FK → Dashboard(id), NOT NULL | Parent dashboard |
| type | VARCHAR(50) | NOT NULL | Widget type |
| title | VARCHAR(255) | NOT NULL | Widget title |
| position | JSONB | NOT NULL | x, y, w, h |
| config | JSONB | NOT NULL | Widget configuration |
| dataSource | JSONB | NOT NULL | Data source definition |
| refreshInterval | INTEGER | NULL | Auto-refresh seconds |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_widget_dashboard (dashboardId)

---

### 8.5 MetricDefinition
**Purpose:** Metric configurations

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Metric identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Metric name |
| description | TEXT | NULL | Metric description |
| category | VARCHAR(100) | NOT NULL | Metric category |
| type | ENUM | NOT NULL | count, sum, average, ratio, custom |
| unit | VARCHAR(50) | NULL | Unit of measurement |
| dataSource | JSONB | NOT NULL | How to calculate |
| aggregation | ENUM | NOT NULL | sum, avg, min, max, count |
| dimensions | VARCHAR(50)[] | NULL | Breakdown dimensions |
| isSystem | BOOLEAN | NOT NULL, DEFAULT FALSE | System metric |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_metric_org (orgId, category)

---

### 8.6 MetricValue
**Purpose:** Time-series metric data

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Value identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| metricId | UUID | FK → MetricDefinition(id), NOT NULL | Metric definition |
| timestamp | TIMESTAMP | NOT NULL | Measurement time |
| value | DECIMAL(18,6) | NOT NULL | Measured value |
| dimensions | JSONB | NULL | Dimension values |
| metadata | JSONB | NULL | Additional context |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_metric_value (metricId, timestamp DESC)
- INDEX idx_metric_org_time (orgId, timestamp DESC)

**Partitioning:** Partition by timestamp (monthly)

---

### 8.7 AnalyticsEvent
**Purpose:** Analytics tracking events

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Event identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| eventType | VARCHAR(100) | NOT NULL | Event type |
| eventName | VARCHAR(100) | NOT NULL | Event name |
| userId | UUID | FK → User(id), NULL | User who triggered |
| sessionId | UUID | NULL | Session identifier |
| timestamp | TIMESTAMP | NOT NULL | Event timestamp |
| properties | JSONB | NULL | Event properties |
| pageUrl | VARCHAR(500) | NULL | Page URL |
| referrer | VARCHAR(500) | NULL | Referrer URL |
| ipAddress | INET | NULL | User IP (hashed) |
| userAgent | VARCHAR(500) | NULL | User agent |
| deviceType | VARCHAR(50) | NULL | desktop, mobile, tablet |
| browser | VARCHAR(50) | NULL | Browser name |
| os | VARCHAR(50) | NULL | Operating system |
| country | VARCHAR(2) | NULL | Country code |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_event_org (orgId, timestamp DESC)
- INDEX idx_event_type (orgId, eventType, timestamp DESC)
- INDEX idx_event_user (userId, timestamp DESC)

**Partitioning:** Partition by timestamp (daily)

---

## 9) Asset Management Entities

### 9.1 AssetType
**Purpose:** Asset classifications

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Type identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(100) | NOT NULL | Type name |
| description | TEXT | NULL | Type description |
| icon | VARCHAR(50) | NULL | Type icon |
| color | VARCHAR(7) | NULL | Type color |
| attributes | JSONB | NULL | Type attributes schema |
| parentTypeId | UUID | FK → AssetType(id), NULL | Parent type |
| isSystem | BOOLEAN | NOT NULL, DEFAULT FALSE | System type |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_asset_type_org (orgId)

---

### 9.2 Asset
**Purpose:** Configuration items and assets

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Asset identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| assetTypeId | UUID | FK → AssetType(id), NOT NULL | Asset type |
| name | VARCHAR(255) | NOT NULL | Asset name |
| description | TEXT | NULL | Asset description |
| assetTag | VARCHAR(100) | NULL | Asset tag/label |
| serialNumber | VARCHAR(100) | NULL | Serial number |
| model | VARCHAR(255) | NULL | Model information |
| manufacturer | VARCHAR(100) | NULL | Manufacturer |
| status | ENUM | NOT NULL | active, inactive, maintenance, retired, disposed |
| location | VARCHAR(255) | NULL | Physical location |
| assignedTo | UUID | FK → User(id), NULL | Assigned user |
| departmentId | UUID | NULL | Department |
| purchaseDate | DATE | NULL | Purchase date |
| purchaseCost | DECIMAL(10,2) | NULL | Purchase cost |
| vendor | VARCHAR(255) | NULL | Purchase vendor |
| warrantyExpiry | DATE | NULL | Warranty expiration |
| lifecycleStage | ENUM | NULL | procurement, deployment, operation, maintenance, retirement |
| ipAddress | INET | NULL | Network address |
| macAddress | VARCHAR(17) | NULL | MAC address |
| attributes | JSONB | NULL | Type-specific attributes |
| discoverySource | VARCHAR(100) | NULL | How asset was discovered |
| discoveryData | JSONB | NULL | Discovery details |
| parentAssetId | UUID | FK → Asset(id), NULL | Parent asset |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| discoveredAt | TIMESTAMP | NULL | When discovered |
| lastScanAt | TIMESTAMP | NULL | Last scan timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_asset_org (orgId)
- INDEX idx_asset_type (assetTypeId)
- INDEX idx_asset_status (orgId, status)
- INDEX idx_asset_tag (orgId, assetTag)
- INDEX idx_asset_serial (orgId, serialNumber)
- INDEX idx_asset_assigned (assignedTo)
- INDEX idx_asset_parent (parentAssetId)

**Relationships:**
- Belongs to AssetType (N:1)
- Self-referential parent/child (1:N)
- Has many AssetRelationships (1:N)
- Has many AssetMaintenances (1:N)
- Has many AssetWarranties (1:N)

---

### 9.3 AssetRelationship
**Purpose:** CMDB relationship tracking

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Relationship identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| sourceAssetId | UUID | FK → Asset(id), NOT NULL | Source asset |
| targetAssetId | UUID | FK → Asset(id), NOT NULL | Target asset |
| relationshipType | ENUM | NOT NULL | depends_on, connected_to, contains, part_of, runs_on, hosts |
| isBidirectional | BOOLEAN | NOT NULL, DEFAULT FALSE | Two-way relationship |
| strength | ENUM | NOT NULL, DEFAULT 'strong' | strong, weak |
| description | TEXT | NULL | Relationship description |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| discoveredAt | TIMESTAMP | NULL | When discovered |
| verifiedAt | TIMESTAMP | NULL | Last verification |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_rel_unique (sourceAssetId, targetAssetId, relationshipType)
- INDEX idx_rel_source (sourceAssetId)
- INDEX idx_rel_target (targetAssetId)

---

### 9.4 AssetMaintenance
**Purpose:** Maintenance records

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Record identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| assetId | UUID | FK → Asset(id), NOT NULL | Asset reference |
| type | ENUM | NOT NULL | preventive, corrective, predictive, emergency |
| status | ENUM | NOT NULL | scheduled, in_progress, completed, cancelled |
| description | TEXT | NOT NULL | Maintenance description |
| scheduledDate | DATE | NULL | Scheduled date |
| completedDate | DATE | NULL | Completion date |
| performedBy | VARCHAR(255) | NULL | Technician/service |
| cost | DECIMAL(10,2) | NULL | Maintenance cost |
| durationMinutes | INTEGER | NULL | Time spent |
| partsUsed | JSONB | NULL | Parts/replacements |
| notes | TEXT | NULL | Additional notes |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| createdBy | UUID | NOT NULL | Creator |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_maint_asset (assetId, scheduledDate DESC)
- INDEX idx_maint_status (orgId, status)

---

### 9.5 AssetWarranty
**Purpose:** Warranty information

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Warranty identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| assetId | UUID | FK → Asset(id), NOT NULL | Asset reference |
| type | ENUM | NOT NULL | manufacturer, extended, service |
| provider | VARCHAR(255) | NOT NULL | Warranty provider |
| policyNumber | VARCHAR(100) | NULL | Policy/warranty number |
| startDate | DATE | NOT NULL | Warranty start |
| endDate | DATE | NOT NULL | Warranty end |
| coverage | TEXT | NULL | What's covered |
| terms | TEXT | NULL | Warranty terms |
| renewalDate | DATE | NULL | When to renew |
| renewalCost | DECIMAL(10,2) | NULL | Renewal cost |
| documents | JSONB | NULL | Warranty documents |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_warranty_asset (assetId)
- INDEX idx_warranty_expiry (orgId, endDate)

---

### 9.6 AssetDiscovery
**Purpose:** Asset discovery sources

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Discovery identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| sourceType | ENUM | NOT NULL | agent, network_scan, cloud_api, import, manual |
| name | VARCHAR(255) | NOT NULL | Discovery source name |
| description | TEXT | NULL | Description |
| configuration | JSONB | NULL | Source configuration |
| schedule | VARCHAR(100) | NULL | Scan schedule (cron) |
| lastRunAt | TIMESTAMP | NULL | Last scan |
| lastRunStatus | ENUM | NULL | success, failed, running |
| lastRunAssetsFound | INTEGER | NULL | Assets discovered |
| lastRunError | TEXT | NULL | Last error |
| isActive | BOOLEAN | NOT NULL, DEFAULT TRUE | Discovery active |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_discovery_org (orgId)
- INDEX idx_discovery_type (orgId, sourceType)

---

### 9.7 AssetLifecycle
**Purpose:** Lifecycle event tracking

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Lifecycle identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| assetId | UUID | FK → Asset(id), NOT NULL | Asset reference |
| eventType | ENUM | NOT NULL | procurement, deployment, activation, maintenance, upgrade, decommission, disposal |
| eventDate | DATE | NOT NULL | Event date |
| description | TEXT | NULL | Event description |
| cost | DECIMAL(10,2) | NULL | Associated cost |
| performedBy | UUID | NULL | Who performed action |
| documents | UUID[] | NULL | Related documents |
| notes | TEXT | NULL | Additional notes |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_lifecycle_asset (assetId, eventDate DESC)

---

## 10) Communication Entities

### 10.1 MessageThread
**Purpose:** Conversation threads

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Thread identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| subject | VARCHAR(255) | NOT NULL | Thread subject |
| type | ENUM | NOT NULL | direct, group, support, system |
| participantIds | UUID[] | NOT NULL | Thread participants |
| creatorId | UUID | FK → User(id), NOT NULL | Thread creator |
| isGroup | BOOLEAN | NOT NULL, DEFAULT FALSE | Multi-user thread |
| messageCount | INTEGER | NOT NULL, DEFAULT 0 | Message count |
| unreadCount | JSONB | NULL | Unread per user |
| lastMessageAt | TIMESTAMP | NULL | Last activity |
| lastMessageId | UUID | NULL | Last message reference |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| isArchived | BOOLEAN | NOT NULL, DEFAULT FALSE | Thread archived |
| relatedTicketId | UUID | NULL | Related ticket |
| relatedEntityType | VARCHAR(50) | NULL | Related entity type |
| relatedEntityId | UUID | NULL | Related entity ID |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_thread_org (orgId, lastMessageAt DESC)
- INDEX idx_thread_creator (creatorId)
- INDEX idx_thread_participants (orgId) USING GIN (participantIds)

**Relationships:**
- Belongs to Org (N:1)
- Has many Messages (1:N)

---

### 10.2 Message
**Purpose:** In-app messages

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Message identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| threadId | UUID | FK → MessageThread(id), NOT NULL | Parent thread |
| senderId | UUID | FK → User(id), NULL | Message sender |
| senderType | ENUM | NOT NULL | user, system, ai |
| content | TEXT | NOT NULL | Message content |
| contentHtml | TEXT | NULL | Rendered HTML |
| attachmentIds | UUID[] | NULL | Attached files |
| replyToId | UUID | FK → Message(id), NULL | Reply reference |
| isEdited | BOOLEAN | NOT NULL, DEFAULT FALSE | Was edited |
| editedAt | TIMESTAMP | NULL | Edit timestamp |
| readBy | JSONB | NULL | Read receipts |
| reactions | JSONB | NULL | Reaction counts |
| createdAt | TIMESTAMP | NOT NULL | Message timestamp |
| systemEvent | VARCHAR(100) | NULL | System event type |
| systemData | JSONB | NULL | System event data |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_message_thread (threadId, createdAt DESC)
- INDEX idx_message_sender (senderId)

---

### 10.3 Notification
**Purpose:** Notification records

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Notification identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| userId | UUID | FK → User(id), NOT NULL | Recipient |
| type | VARCHAR(100) | NOT NULL | Notification type |
| title | VARCHAR(255) | NOT NULL | Notification title |
| body | TEXT | NOT NULL | Notification body |
| priority | ENUM | NOT NULL, DEFAULT 'normal' | low, normal, high, urgent |
| channel | ENUM | NOT NULL | in_app, email, push, sms |
| status | ENUM | NOT NULL | pending, sent, delivered, read, failed |
| entityType | VARCHAR(50) | NULL | Related entity type |
| entityId | UUID | NULL | Related entity ID |
| actionUrl | VARCHAR(500) | NULL | Deep link URL |
| imageUrl | VARCHAR(500) | NULL | Notification image |
| data | JSONB | NULL | Additional payload |
| sentAt | TIMESTAMP | NULL | When sent |
| deliveredAt | TIMESTAMP | NULL | When delivered |
| readAt | TIMESTAMP | NULL | When read |
| expiresAt | TIMESTAMP | NULL | Expiration time |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| errorMessage | TEXT | NULL | Delivery error |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_notif_user (userId, createdAt DESC)
- INDEX idx_notif_status (userId, status)
- INDEX idx_notif_unread (userId) WHERE status IN ('pending', 'sent', 'delivered')

---

### 10.4 NotificationPreference
**Purpose:** User notification preferences

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Preference identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| userId | UUID | FK → User(id), NOT NULL | User reference |
| notificationType | VARCHAR(100) | NOT NULL | Type of notification |
| inApp | BOOLEAN | NOT NULL, DEFAULT TRUE | In-app notifications |
| email | BOOLEAN | NOT NULL, DEFAULT TRUE | Email notifications |
| push | BOOLEAN | NOT NULL, DEFAULT TRUE | Push notifications |
| sms | BOOLEAN | NOT NULL, DEFAULT FALSE | SMS notifications |
| digest | BOOLEAN | NOT NULL, DEFAULT FALSE | Digest mode |
| digestFrequency | ENUM | NULL | immediate, hourly, daily, weekly |
| quietHoursStart | TIME | NULL | Quiet hours begin |
| quietHoursEnd | TIME | NULL | Quiet hours end |
| timezone | VARCHAR(50) | NULL | Preference timezone |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_notif_pref_unique (userId, notificationType)
- INDEX idx_notif_pref_user (userId)

---

### 10.5 Announcement
**Purpose:** System announcements

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Announcement identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| title | VARCHAR(255) | NOT NULL | Announcement title |
| body | TEXT | NOT NULL | Announcement content |
| bodyHtml | TEXT | NULL | Rendered HTML |
| type | ENUM | NOT NULL | info, warning, critical, maintenance |
| priority | ENUM | NOT NULL, DEFAULT 'normal' | low, normal, high, urgent |
| status | ENUM | NOT NULL | draft, scheduled, active, archived |
| targetAudience | ENUM | NOT NULL | all, roles, users |
| targetRoles | VARCHAR(50)[] | NULL | Target roles |
| targetUserIds | UUID[] | NULL | Target users |
| dismissible | BOOLEAN | NOT NULL, DEFAULT TRUE | Can be dismissed |
| requiresAcknowledgment | BOOLEAN | NOT NULL, DEFAULT FALSE | Must acknowledge |
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->
| expiresAt | TIMESTAMP | NULL | When to expire |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| createdBy | UUID | NOT NULL | Creator |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| viewCount | INTEGER | NOT NULL, DEFAULT 0 | Total views |
| dismissCount | INTEGER | NOT NULL, DEFAULT 0 | Times dismissed |

**Indexes:**
- PRIMARY KEY (id)
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->
- INDEX idx_announce_status (orgId, status)
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->

**Relationships:**
- Has many AnnouncementAcknowledgments (1:N)

---

### 10.6 AnnouncementAcknowledgment
**Purpose:** Announcement read receipts

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Acknowledgment identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| announcementId | UUID | FK → Announcement(id), NOT NULL | Announcement |
| userId | UUID | FK → User(id), NOT NULL | User who acknowledged |
| viewedAt | TIMESTAMP | NOT NULL | When viewed |
| acknowledgedAt | TIMESTAMP | NULL | When acknowledged |
| dismissedAt | TIMESTAMP | NULL | When dismissed |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_ack_unique (announcementId, userId)
- INDEX idx_ack_announce (announcementId)

---

### 10.7 StatusPageComponent
**Purpose:** Status page monitored components

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Component identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Component name |
| description | TEXT | NULL | Component description |
| groupId | UUID | FK → StatusPageComponent(id), NULL | Component group |
| status | ENUM | NOT NULL | operational, degraded, partial_outage, major_outage, maintenance |
| isPublic | BOOLEAN | NOT NULL, DEFAULT TRUE | Visible on status page |
| displayOrder | INTEGER | NOT NULL, DEFAULT 0 | Display order |
| externalId | VARCHAR(100) | NULL | External monitoring ID |
| metadata | JSONB | NULL | Additional metadata |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| lastStatusChange | TIMESTAMP | NULL | Last status change |
| uptimePercent | DECIMAL(5,2) | NULL | Current uptime % |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_comp_org (orgId, displayOrder)
- INDEX idx_comp_status (orgId, status)
- INDEX idx_comp_group (groupId)

---

### 10.8 StatusPageIncident
**Purpose:** Status page incidents

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Incident identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| title | VARCHAR(255) | NOT NULL | Incident title |
| description | TEXT | NULL | Initial description |
| severity | ENUM | NOT NULL | minor, major, critical, maintenance |
| status | ENUM | NOT NULL | investigating, identified, monitoring, resolved, postmortem |
| impact | ENUM | NULL | none, minor, major, critical |
| componentIds | UUID[] | NOT NULL | Affected components |
| startedAt | TIMESTAMP | NOT NULL | Incident start |
| resolvedAt | TIMESTAMP | NULL | When resolved |
| duration | INTEGER | NULL | Duration in minutes |
| createdBy | UUID | NOT NULL | Incident creator |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
| postmortemUrl | VARCHAR(500) | NULL | Postmortem link |
| isPublic | BOOLEAN | NOT NULL, DEFAULT TRUE | Visible on status page |
| notificationSent | BOOLEAN | NOT NULL, DEFAULT FALSE | Subscribers notified |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_incident_org (orgId, startedAt DESC)
- INDEX idx_incident_status (orgId, status)
- INDEX idx_incident_components (orgId) USING GIN (componentIds)

**Relationships:**
- Has many StatusPageIncidentUpdates (1:N)

---

### 10.9 StatusPageIncidentUpdate
**Purpose:** Incident update timeline

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Update identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| incidentId | UUID | FK → StatusPageIncident(id), NOT NULL | Parent incident |
| status | ENUM | NOT NULL | investigating, identified, monitoring, resolved |
| message | TEXT | NOT NULL | Update message |
| createdBy | UUID | NOT NULL | Update author |
| createdAt | TIMESTAMP | NOT NULL | Update timestamp |
| isPublic | BOOLEAN | NOT NULL, DEFAULT TRUE | Visible on status page |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_inc_upd_incident (incidentId, createdAt DESC)

---

## 11) Workflow Entities

### 11.1 WorkflowDefinition
**Purpose:** Workflow templates

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Workflow identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Workflow name |
| description | TEXT | NULL | Workflow description |
| slug | VARCHAR(100) | NOT NULL | URL slug |
| version | INTEGER | NOT NULL, DEFAULT 1 | Workflow version |
| status | ENUM | NOT NULL | draft, active, deprecated |
| triggerType | ENUM | NOT NULL | manual, automatic, scheduled, event |
| triggerConfig | JSONB | NULL | Trigger configuration |
| steps | JSONB | NOT NULL | Workflow steps definition |
| variables | JSONB | NULL | Variable definitions |
| isSystem | BOOLEAN | NOT NULL, DEFAULT FALSE | System workflow |
| category | VARCHAR(100) | NULL | Workflow category |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| createdBy | UUID | NOT NULL | Creator |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_wf_def_slug (orgId, slug)
- INDEX idx_wf_def_org (orgId, status)

**Relationships:**
- Has many WorkflowInstances (1:N)

---

### 11.2 WorkflowInstance
**Purpose:** Running workflow instances

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Instance identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| workflowDefinitionId | UUID | FK → WorkflowDefinition(id), NOT NULL | Workflow template |
| entityType | VARCHAR(50) | NOT NULL | Related entity type |
| entityId | UUID | NOT NULL | Related entity ID |
| status | ENUM | NOT NULL | pending, running, paused, completed, failed, cancelled |
| currentStepId | UUID | NULL | Current step |
| startedAt | TIMESTAMP | NULL | When started |
| completedAt | TIMESTAMP | NULL | When completed |
| startedBy | UUID | NULL | Who started |
| priority | ENUM | NOT NULL, DEFAULT 'medium' | low, medium, high, urgent |
| inputData | JSONB | NULL | Initial input |
| outputData | JSONB | NULL | Final output |
| errorMessage | TEXT | NULL | Error if failed |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_wf_inst_org (orgId, status)
- INDEX idx_wf_inst_workflow (workflowDefinitionId)
- INDEX idx_wf_inst_entity (entityType, entityId)

**Relationships:**
- Belongs to WorkflowDefinition (N:1)
- Has many WorkflowSteps (1:N)

---

### 11.3 WorkflowStep
**Purpose:** Individual workflow steps

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Step identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| workflowInstanceId | UUID | FK → WorkflowInstance(id), NOT NULL | Parent instance |
| stepDefinitionId | UUID | NOT NULL | Step definition reference |
| name | VARCHAR(255) | NOT NULL | Step name |
| type | ENUM | NOT NULL | task, approval, condition, automation, notification |
| status | ENUM | NOT NULL | pending, in_progress, completed, failed, skipped |
| assignedTo | UUID | NULL | Assigned user |
| assignedToRole | VARCHAR(50) | NULL | Assigned role |
| inputData | JSONB | NULL | Step input |
| outputData | JSONB | NULL | Step output |
| startedAt | TIMESTAMP | NULL | When started |
| completedAt | TIMESTAMP | NULL | When completed |
| dueDate | TIMESTAMP | NULL | Step deadline |
| sequence | INTEGER | NOT NULL | Step order |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_wf_step_instance (workflowInstanceId, sequence)
- INDEX idx_wf_step_status (orgId, status)
- INDEX idx_wf_step_assigned (assignedTo)

---

### 11.4 WorkflowTransition
**Purpose:** Workflow state transitions

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Transition identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| workflowInstanceId | UUID | FK → WorkflowInstance(id), NOT NULL | Parent instance |
| fromStepId | UUID | FK → WorkflowStep(id), NULL | Source step |
| toStepId | UUID | FK → WorkflowStep(id), NULL | Target step |
| fromStatus | VARCHAR(50) | NOT NULL | Previous status |
| toStatus | VARCHAR(50) | NOT NULL | New status |
| triggeredBy | UUID | NULL | Who triggered |
| triggerType | ENUM | NOT NULL | manual, automatic, timeout, event |
| conditionResult | BOOLEAN | NULL | Condition evaluation |
| metadata | JSONB | NULL | Transition details |
| createdAt | TIMESTAMP | NOT NULL | Transition timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_wf_trans_instance (workflowInstanceId, createdAt DESC)

---

### 11.5 WorkflowVariable
**Purpose:** Workflow context variables

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Variable identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| workflowInstanceId | UUID | FK → WorkflowInstance(id), NOT NULL | Parent instance |
| name | VARCHAR(100) | NOT NULL | Variable name |
| value | JSONB | NULL | Variable value |
| type | VARCHAR(50) | NOT NULL | Variable type |
| isPersistent | BOOLEAN | NOT NULL, DEFAULT FALSE | Persist after workflow |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_wf_var_unique (workflowInstanceId, name)

---

### 11.6 WorkflowAssignment
**Purpose:** Step assignment tracking

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Assignment identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| workflowStepId | UUID | FK → WorkflowStep(id), NOT NULL | Assigned step |
| assignedTo | UUID | FK → User(id), NOT NULL | Assigned user |
| assignedBy | UUID | NOT NULL | Who assigned |
| assignedAt | TIMESTAMP | NOT NULL | Assignment timestamp |
| dueDate | TIMESTAMP | NULL | Assignment due |
| status | ENUM | NOT NULL | active, completed, reassigned |
| completedAt | TIMESTAMP | NULL | When completed |
| notes | TEXT | NULL | Assignment notes |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_wf_assign_step (workflowStepId)
- INDEX idx_wf_assign_user (assignedTo, status)

---

## 12) AI/Intelligence Entities

### 12.1 AiSuggestion
**Purpose:** AI recommendations

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Suggestion identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| userId | UUID | FK → User(id), NULL | Target user |
| type | ENUM | NOT NULL | article, ticket, service, action |
| contextType | VARCHAR(50) | NOT NULL | Where suggestion shown |
| contextId | UUID | NULL | Context entity ID |
| title | VARCHAR(255) | NOT NULL | Suggestion title |
| description | TEXT | NULL | Suggestion details |
| suggestedEntityType | VARCHAR(50) | NULL | Recommended entity type |
| suggestedEntityId | UUID | NULL | Recommended entity ID |
| confidence | DECIMAL(3,2) | NOT NULL | AI confidence (0-1) |
| reason | TEXT | NULL | Why suggested |
| metadata | JSONB | NULL | Model/algorithm info |
| status | ENUM | NOT NULL, DEFAULT 'pending' | pending, shown, accepted, dismissed, expired |
| shownAt | TIMESTAMP | NULL | When displayed |
| acceptedAt | TIMESTAMP | NULL | When accepted |
| dismissedAt | TIMESTAMP | NULL | When dismissed |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| expiresAt | TIMESTAMP | NULL | Suggestion expiration |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_ai_sugg_user (userId, status)
- INDEX idx_ai_sugg_context (contextType, contextId)

---

### 12.2 AiCategorization
**Purpose:** Auto-categorization results

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Categorization identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| entityType | VARCHAR(50) | NOT NULL | Entity categorized |
| entityId | UUID | NOT NULL | Entity ID |
| suggestedCategory | VARCHAR(100) | NOT NULL | Suggested category |
| suggestedPriority | VARCHAR(20) | NULL | Suggested priority |
| confidence | DECIMAL(3,2) | NOT NULL | Confidence score |
| modelVersion | VARCHAR(50) | NULL | AI model version |
| features | JSONB | NULL | Input features used |
| applied | BOOLEAN | NOT NULL, DEFAULT FALSE | Was applied |
| appliedBy | UUID | NULL | Who applied (if manual) |
| appliedAt | TIMESTAMP | NULL | When applied |
| overridden | BOOLEAN | NOT NULL, DEFAULT FALSE | Was overridden |
| overriddenBy | UUID | NULL | Who overrode |
| overriddenAt | TIMESTAMP | NULL | When overridden |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_ai_cat_entity (entityType, entityId)
- INDEX idx_ai_cat_applied (orgId, applied, overridden)

---

### 12.3 AiSentiment
**Purpose:** Sentiment analysis results

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Sentiment identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| entityType | VARCHAR(50) | NOT NULL | Entity analyzed |
| entityId | UUID | NOT NULL | Entity ID |
| contentType | VARCHAR(50) | NOT NULL | title, description, message, feedback |
| sentiment | ENUM | NOT NULL | positive, negative, neutral, mixed |
| score | DECIMAL(4,3) | NOT NULL | Sentiment score (-1 to 1) |
| magnitude | DECIMAL(4,3) | NOT NULL | Strength of sentiment |
| aspects | JSONB | NULL | Aspect-based sentiment |
| language | VARCHAR(10) | NULL | Detected language |
| modelVersion | VARCHAR(50) | NULL | Model version |
| createdAt | TIMESTAMP | NOT NULL | Analysis timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_ai_sent_entity (entityType, entityId, contentType)
- INDEX idx_ai_sent_org (orgId, sentiment)

---

### 12.4 AiSearchQuery
**Purpose:** Search analytics

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Query identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| userId | UUID | FK → User(id), NULL | Searching user |
| sessionId | UUID | NULL | Anonymous session |
| query | VARCHAR(500) | NOT NULL | Search query |
| normalizedQuery | VARCHAR(500) | NOT NULL | Normalized form |
| intent | VARCHAR(50) | NULL | Detected intent |
| resultsCount | INTEGER | NULL | Results returned |
| clickedResults | JSONB | NULL | What was clicked |
| responseTimeMs | INTEGER | NULL | Search latency |
| successful | BOOLEAN | NULL | User found answer |
| createdAt | TIMESTAMP | NOT NULL | Query timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_ai_search_org (orgId, createdAt DESC)
- INDEX idx_ai_search_query (orgId, normalizedQuery)

---

### 12.5 AiPrediction
**Purpose:** Predictive analytics

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Prediction identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| entityType | VARCHAR(50) | NOT NULL | Target entity type |
| entityId | UUID | NULL | Target entity ID |
| predictionType | VARCHAR(50) | NOT NULL | churn, escalation, satisfaction, volume |
| predictedValue | JSONB | NOT NULL | Prediction result |
| confidence | DECIMAL(3,2) | NOT NULL | Confidence level |
| features | JSONB | NULL | Input features |
| modelVersion | VARCHAR(50) | NULL | Model version |
| validUntil | TIMESTAMP | NULL | Prediction expiration |
| actualValue | JSONB | NULL | Actual outcome (if known) |
| accuracy | DECIMAL(3,2) | NULL | Prediction accuracy |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| evaluatedAt | TIMESTAMP | NULL | When evaluated |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_ai_pred_org (orgId, predictionType, createdAt DESC)
- INDEX idx_ai_pred_entity (entityType, entityId)

---

## 13) Collaboration Entities

### 13.1 Mention
**Purpose:** User mentions tracking

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Mention identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| mentionedUserId | UUID | FK → User(id), NOT NULL | Mentioned user |
| mentionedBy | UUID | FK → User(id), NOT NULL | Who mentioned |
| entityType | VARCHAR(50) | NOT NULL | Where mentioned |
| entityId | UUID | NOT NULL | Entity ID |
| contentType | VARCHAR(50) | NOT NULL | message, comment, post |
| contentId | UUID | NOT NULL | Content ID |
| excerpt | VARCHAR(255) | NULL | Mention context |
| acknowledged | BOOLEAN | NOT NULL, DEFAULT FALSE | User saw mention |
| acknowledgedAt | TIMESTAMP | NULL | When acknowledged |
| createdAt | TIMESTAMP | NOT NULL | Mention timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_mention_user (mentionedUserId, acknowledged, createdAt DESC)
- INDEX idx_mention_entity (entityType, entityId)

---

### 13.2 Watch
**Purpose:** Watch/follow records

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Watch identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| userId | UUID | FK → User(id), NOT NULL | Watching user |
| entityType | VARCHAR(50) | NOT NULL | Watched entity type |
| entityId | UUID | NOT NULL | Watched entity ID |
| watchType | ENUM | NOT NULL | all, mentions, status |
| emailNotifications | BOOLEAN | NOT NULL, DEFAULT TRUE | Email updates |
| inAppNotifications | BOOLEAN | NOT NULL, DEFAULT TRUE | In-app updates |
| createdAt | TIMESTAMP | NOT NULL | Watch timestamp |
| lastNotifiedAt | TIMESTAMP | NULL | Last notification |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_watch_unique (userId, entityType, entityId)
- INDEX idx_watch_user (userId)
- INDEX idx_watch_entity (entityType, entityId)

---

### 13.3 SharedItem
**Purpose:** Sharing records

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Share identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| entityType | VARCHAR(50) | NOT NULL | Shared entity type |
| entityId | UUID | NOT NULL | Shared entity ID |
| sharedBy | UUID | FK → User(id), NOT NULL | Who shared |
| shareType | ENUM | NOT NULL | link, user, email |
| recipientType | ENUM | NULL | user, external |
| recipientId | UUID | NULL | Recipient user ID |
| recipientEmail | VARCHAR(255) | NULL | External recipient |
| accessLevel | ENUM | NOT NULL | view, comment, edit |
| token | VARCHAR(255) | UNIQUE, NULL | Share token (for links) |
| passwordHash | VARCHAR(255) | NULL | Password protection |
| expiresAt | TIMESTAMP | NULL | Share expiration |
| maxAccesses | INTEGER | NULL | Access limit |
| accessCount | INTEGER | NOT NULL, DEFAULT 0 | Times accessed |
| lastAccessedAt | TIMESTAMP | NULL | Last access |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_share_entity (entityType, entityId)
- INDEX idx_share_token (token) WHERE token IS NOT NULL
- INDEX idx_share_recipient (recipientId)

---

### 13.4 Comment
**Purpose:** Comments on various entities

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Comment identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| entityType | VARCHAR(50) | NOT NULL | Commented entity type |
| entityId | UUID | NOT NULL | Commented entity ID |
| authorId | UUID | FK → User(id), NOT NULL | Comment author |
| content | TEXT | NOT NULL | Comment content |
| contentHtml | TEXT | NULL | Rendered HTML |
| parentCommentId | UUID | FK → Comment(id), NULL | Reply to comment |
| attachmentIds | UUID[] | NULL | Attached files |
| isInternal | BOOLEAN | NOT NULL, DEFAULT FALSE | Internal only |
| isResolved | BOOLEAN | NOT NULL, DEFAULT FALSE | Comment resolved |
| resolvedAt | TIMESTAMP | NULL | Resolution timestamp |
| resolvedBy | UUID | NULL | Who resolved |
| createdAt | TIMESTAMP | NOT NULL | Comment timestamp |
| updatedAt | TIMESTAMP | NULL | Edit timestamp |
| editedBy | UUID | NULL | Who edited |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_comment_entity (entityType, entityId, createdAt DESC)
- INDEX idx_comment_parent (parentCommentId)
- INDEX idx_comment_author (authorId)

---

### 13.5 Reaction
**Purpose:** Emoji reactions

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Reaction identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| entityType | VARCHAR(50) | NOT NULL | Reacted entity type |
| entityId | UUID | NOT NULL | Reacted entity ID |
| userId | UUID | FK → User(id), NOT NULL | Reacting user |
| emoji | VARCHAR(50) | NOT NULL | Emoji reaction |
| createdAt | TIMESTAMP | NOT NULL | Reaction timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_reaction_unique (entityType, entityId, userId, emoji)
- INDEX idx_reaction_entity (entityType, entityId)

---

## 14) Gamification Entities

### 14.1 Achievement
**Purpose:** Achievement definitions

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Achievement identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Achievement name |
| description | TEXT | NOT NULL | Achievement description |
| slug | VARCHAR(100) | NOT NULL | URL slug |
| icon | VARCHAR(100) | NULL | Achievement icon |
| color | VARCHAR(7) | NULL | Achievement color |
| category | VARCHAR(50) | NOT NULL | tickets, knowledge, community, engagement |
| points | INTEGER | NOT NULL, DEFAULT 0 | Points awarded |
| criteria | JSONB | NOT NULL | Unlock conditions |
| isHidden | BOOLEAN | NOT NULL, DEFAULT FALSE | Hidden until earned |
| isRepeatable | BOOLEAN | NOT NULL, DEFAULT FALSE | Can earn multiple times |
| maxRepeats | INTEGER | NULL | Maximum repeats |
| displayOrder | INTEGER | NOT NULL, DEFAULT 0 | Display order |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| isSystem | BOOLEAN | NOT NULL, DEFAULT FALSE | System achievement |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_ach_slug (orgId, slug)
- INDEX idx_ach_org (orgId, category)

---

### 14.2 UserAchievement
**Purpose:** Earned achievements

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | User achievement identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| userId | UUID | FK → User(id), NOT NULL | User who earned |
| achievementId | UUID | FK → Achievement(id), NOT NULL | Achievement earned |
| progress | INTEGER | NOT NULL, DEFAULT 0 | Progress toward achievement |
| progressData | JSONB | NULL | Progress details |
| earnedAt | TIMESTAMP | NULL | When earned |
| earnedCount | INTEGER | NOT NULL, DEFAULT 0 | Times earned (if repeatable) |
| firstEarnedAt | TIMESTAMP | NULL | First time earned |
| lastEarnedAt | TIMESTAMP | NULL | Most recent earn |
| shared | BOOLEAN | NOT NULL, DEFAULT FALSE | Shared publicly |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_user_ach_unique (userId, achievementId)
- INDEX idx_user_ach_user (userId, earnedAt DESC)
- INDEX idx_user_ach_achievement (achievementId)

---

### 14.3 Badge
**Purpose:** Badge definitions

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Badge identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Badge name |
| description | TEXT | NOT NULL | Badge description |
| slug | VARCHAR(100) | NOT NULL | URL slug |
| imageUrl | VARCHAR(500) | NULL | Badge image |
| rarity | ENUM | NOT NULL, DEFAULT 'common' | common, rare, epic, legendary |
| category | VARCHAR(50) | NOT NULL | Badge category |
| criteria | JSONB | NOT NULL | Award conditions |
| isHidden | BOOLEAN | NOT NULL, DEFAULT FALSE | Hidden until earned |
| expiresAfterDays | INTEGER | NULL | Badge expiration |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_badge_slug (orgId, slug)

---

### 14.4 UserBadge
**Purpose:** Earned badges

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | User badge identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| userId | UUID | FK → User(id), NOT NULL | Badge recipient |
| badgeId | UUID | FK → Badge(id), NOT NULL | Badge earned |
| awardedAt | TIMESTAMP | NOT NULL | Award timestamp |
| awardedBy | UUID | NULL | Who awarded (if manual) |
| awardReason | TEXT | NULL | Why awarded |
| expiresAt | TIMESTAMP | NULL | Badge expiration |
| displayedOnProfile | BOOLEAN | NOT NULL, DEFAULT TRUE | Show on profile |
| displayOrder | INTEGER | NULL | Profile display order |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_user_badge_unique (userId, badgeId)
- INDEX idx_user_badge_user (userId, awardedAt DESC)

---

### 14.5 LeaderboardEntry
**Purpose:** Leaderboard rankings

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Entry identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| leaderboardType | VARCHAR(50) | NOT NULL | Type of leaderboard |
| period | ENUM | NOT NULL | daily, weekly, monthly, all_time |
| periodStart | DATE | NOT NULL | Period start |
| periodEnd | DATE | NOT NULL | Period end |
| userId | UUID | FK → User(id), NOT NULL | User ranked |
| score | INTEGER | NOT NULL | Leaderboard score |
| rank | INTEGER | NOT NULL | Position in leaderboard |
| previousRank | INTEGER | NULL | Previous period rank |
| metrics | JSONB | NULL | Detailed metrics |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_lb_unique (orgId, leaderboardType, period, periodStart, userId)
- INDEX idx_lb_ranking (orgId, leaderboardType, period, periodStart, rank)

---

### 14.6 Challenge
**Purpose:** Gamification challenges

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Challenge identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Challenge name |
| description | TEXT | NOT NULL | Challenge description |
| slug | VARCHAR(100) | NOT NULL | URL slug |
| type | ENUM | NOT NULL | daily, weekly, monthly, special |
| status | ENUM | NOT NULL | upcoming, active, completed |
| criteria | JSONB | NOT NULL | Completion conditions |
| points | INTEGER | NOT NULL | Points for completion |
| bonusPoints | INTEGER | NULL | Bonus for early completion |
| maxParticipants | INTEGER | NULL | Participant limit |
| participantCount | INTEGER | NOT NULL, DEFAULT 0 | Current participants |
| completionCount | INTEGER | NOT NULL, DEFAULT 0 | Times completed |
| startDate | TIMESTAMP | NOT NULL | Challenge start |
| endDate | TIMESTAMP | NOT NULL | Challenge end |
| imageUrl | VARCHAR(500) | NULL | Challenge image |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_challenge_slug (orgId, slug)
- INDEX idx_challenge_status (orgId, status, startDate)

---

### 14.7 UserChallengeProgress
**Purpose:** Challenge progress tracking

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Progress identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| userId | UUID | FK → User(id), NOT NULL | Participant |
| challengeId | UUID | FK → Challenge(id), NOT NULL | Challenge |
| progress | INTEGER | NOT NULL, DEFAULT 0 | Current progress |
| progressData | JSONB | NULL | Progress details |
| status | ENUM | NOT NULL | joined, in_progress, completed, expired |
| joinedAt | TIMESTAMP | NOT NULL | When joined |
| startedAt | TIMESTAMP | NULL | When started (first action) |
| completedAt | TIMESTAMP | NULL | When completed |
| pointsEarned | INTEGER | NOT NULL, DEFAULT 0 | Points awarded |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_chal_prog_unique (userId, challengeId)
- INDEX idx_chal_prog_user (userId, status)

---

### 14.8 ReputationScore
**Purpose:** Community reputation tracking

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Reputation identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| userId | UUID | FK → User(id), NOT NULL | User |
| score | INTEGER | NOT NULL, DEFAULT 0 | Reputation score |
| level | INTEGER | NOT NULL, DEFAULT 1 | Reputation level |
| title | VARCHAR(100) | NULL | Reputation title |
| breakdown | JSONB | NULL | Score breakdown |
| history | JSONB | NULL | Score history |
| lastActivityAt | TIMESTAMP | NULL | Last reputation activity |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_rep_unique (orgId, userId)
- INDEX idx_rep_score (orgId, score DESC)

---

## 15) Compliance Entities

### 15.1 Policy
**Purpose:** Policy documents

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Policy identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| title | VARCHAR(255) | NOT NULL | Policy title |
| description | TEXT | NULL | Policy description |
| slug | VARCHAR(100) | NOT NULL | URL slug |
| content | TEXT | NOT NULL | Policy content |
| version | INTEGER | NOT NULL, DEFAULT 1 | Policy version |
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->
| category | VARCHAR(100) | NOT NULL | Policy category |
| effectiveDate | DATE | NOT NULL | When effective |
| reviewDate | DATE | NULL | Next review date |
| expiryDate | DATE | NULL | Policy expiration |
| requiresAcknowledgment | BOOLEAN | NOT NULL, DEFAULT FALSE | Must acknowledge |
| acknowledgmentRoles | VARCHAR(50)[] | NULL | Who must acknowledge |
| acknowledgmentDeadline | DATE | NULL | Acknowledgment deadline |
| parentPolicyId | UUID | FK → Policy(id), NULL | Parent policy |
| relatedFrameworkIds | UUID[] | NULL | Related frameworks |
| documentId | UUID | FK → Document(id), NULL | Linked document |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| createdBy | UUID | NOT NULL | Creator |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->
<!-- SCOPE REFINED: Admin operations removed from Portal doc -->

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_policy_slug (orgId, slug)
- INDEX idx_policy_org (orgId, status, effectiveDate DESC)

**Relationships:**
- Has many PolicyAcknowledgments (1:N)

---

### 15.2 PolicyAcknowledgment
**Purpose:** Policy acknowledgment records

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Acknowledgment identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| policyId | UUID | FK → Policy(id), NOT NULL | Policy acknowledged |
| userId | UUID | FK → User(id), NOT NULL | User who acknowledged |
| version | INTEGER | NOT NULL | Policy version acknowledged |
| acknowledgedAt | TIMESTAMP | NOT NULL | Acknowledgment timestamp |
| ipAddress | INET | NULL | Acknowledgment IP |
| userAgent | TEXT | NULL | User agent |
| electronicSignature | JSONB | NULL | Signature data |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_pol_ack_unique (policyId, userId)
- INDEX idx_pol_ack_user (userId)
- INDEX idx_pol_ack_policy (policyId)

---

### 15.3 ComplianceFramework
**Purpose:** Compliance framework definitions

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Framework identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Framework name |
| description | TEXT | NULL | Framework description |
| slug | VARCHAR(100) | NOT NULL | URL slug |
| standard | VARCHAR(100) | NOT NULL | Standard code (ISO27001, SOC2, etc.) |
| version | VARCHAR(50) | NOT NULL | Framework version |
| status | ENUM | NOT NULL | draft, active, archived |
| controls | JSONB | NULL | Framework controls |
| effectiveDate | DATE | NOT NULL | When effective |
| reviewDate | DATE | NULL | Next review date |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_fw_slug (orgId, slug)
- INDEX idx_fw_standard (orgId, standard)

---

### 15.4 ControlMapping
**Purpose:** Control to policy/evidence mapping

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Mapping identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| frameworkId | UUID | FK → ComplianceFramework(id), NOT NULL | Framework |
| controlId | VARCHAR(100) | NOT NULL | Control identifier |
| controlName | VARCHAR(255) | NOT NULL | Control name |
| description | TEXT | NULL | Control description |
| mappedPolicyIds | UUID[] | NULL | Mapped policies |
| mappedProcedureIds | UUID[] | NULL | Mapped procedures |
| evidenceTypes | JSONB | NULL | Required evidence |
| implementationStatus | ENUM | NOT NULL | not_started, partial, implemented, not_applicable |
| evidenceLocation | VARCHAR(500) | NULL | Where evidence stored |
| lastAssessedAt | TIMESTAMP | NULL | Last assessment |
| assessedBy | UUID | NULL | Assessor |
| notes | TEXT | NULL | Assessment notes |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_control_fw (frameworkId)
- INDEX idx_control_status (orgId, implementationStatus)

---

### 15.5 AuditRecord
**Purpose:** Compliance audit trail

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Record identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| auditType | ENUM | NOT NULL | access, modification, deletion, export |
| entityType | VARCHAR(50) | NOT NULL | Affected entity type |
| entityId | UUID | NOT NULL | Affected entity ID |
| action | VARCHAR(100) | NOT NULL | Specific action |
| actorType | ENUM | NOT NULL | user, system, api, integration |
| actorId | UUID | NULL | Actor identifier |
| actorEmail | VARCHAR(255) | NULL | Actor email (if user) |
| beforeValue | JSONB | NULL | State before |
| afterValue | JSONB | NULL | State after |
| metadata | JSONB | NULL | Additional context |
| ipAddress | INET | NULL | Actor IP |
| userAgent | TEXT | NULL | User agent |
| sessionId | UUID | NULL | Session identifier |
| timestamp | TIMESTAMP | NOT NULL | Event timestamp |
| hashPrev | VARCHAR(64) | NULL | Previous record hash |
| hashThis | VARCHAR(64) | NOT NULL | This record hash |
| tamperProof | BOOLEAN | NOT NULL, DEFAULT TRUE | Included in tamper chain |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_audit_org (orgId, timestamp DESC)
- INDEX idx_audit_entity (entityType, entityId, timestamp DESC)
- INDEX idx_audit_actor (actorType, actorId, timestamp DESC)
- INDEX idx_audit_type (orgId, auditType, timestamp DESC)

**Partitioning:** Partition by timestamp (monthly)

---

### 15.6 DataSubjectRequest
**Purpose:** DSR (GDPR/CCPA) tracking

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | DSR identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| requestNumber | VARCHAR(50) | NOT NULL | Request reference |
| type | ENUM | NOT NULL | access, deletion, portability, correction, restriction |
| status | ENUM | NOT NULL | received, verifying, in_progress, completed, rejected |
| requesterEmail | VARCHAR(255) | NOT NULL | Requester email |
| requesterName | VARCHAR(255) | NULL | Requester name |
| verificationMethod | VARCHAR(100) | NULL | How identity verified |
| verifiedAt | TIMESTAMP | NULL | When verified |
| verifiedBy | UUID | NULL | Who verified |
| description | TEXT | NULL | Request details |
| scope | JSONB | NULL | Data scope |
| deadlineDate | DATE | NOT NULL | Regulatory deadline |
| completedAt | TIMESTAMP | NULL | Completion timestamp |
| responseMethod | ENUM | NULL | email, postal, secure_portal |
| responseDeliveredAt | TIMESTAMP | NULL | When response sent |
| notes | TEXT | NULL | Internal notes |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_dsr_number (orgId, requestNumber)
- INDEX idx_dsr_status (orgId, status, deadlineDate)

---

### 15.7 ConsentRecord
**Purpose:** Consent management

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Consent identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| userId | UUID | FK → User(id), NULL | User consent |
| consentType | VARCHAR(100) | NOT NULL | Type of consent |
| consentVersion | VARCHAR(50) | NOT NULL | Consent version |
| granted | BOOLEAN | NOT NULL | Consent granted |
| grantedAt | TIMESTAMP | NOT NULL | Consent timestamp |
| ipAddress | INET | NULL | Consent IP |
| userAgent | TEXT | NULL | User agent |
| consentText | TEXT | NULL | Text shown to user |
| withdrawalAt | TIMESTAMP | NULL | When withdrawn |
| withdrawalReason | TEXT | NULL | Withdrawal reason |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_consent_user (userId, consentType, grantedAt DESC)
- INDEX idx_consent_type (orgId, consentType, grantedAt DESC)

---

## 16) Advanced Security Entities

### 16.1 SecurityEvent
**Purpose:** Security event logging

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Event identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| eventType | VARCHAR(100) | NOT NULL | Event type |
| severity | ENUM | NOT NULL | info, low, medium, high, critical |
| category | ENUM | NOT NULL | auth, access, data, config, threat |
| userId | UUID | FK → User(id), NULL | Affected user |
| sessionId | UUID | NULL | Session reference |
| description | TEXT | NOT NULL | Event description |
| sourceIp | INET | NULL | Source IP |
| userAgent | TEXT | NULL | User agent |
| targetType | VARCHAR(50) | NULL | Target entity type |
| targetId | UUID | NULL | Target entity ID |
| metadata | JSONB | NULL | Event details |
| riskScore | INTEGER | NULL | Calculated risk (0-100) |
| mitigated | BOOLEAN | NOT NULL, DEFAULT FALSE | Risk mitigated |
| mitigatedAt | TIMESTAMP | NULL | When mitigated |
| mitigatedBy | UUID | NULL | Who mitigated |
| alertSent | BOOLEAN | NOT NULL, DEFAULT FALSE | Alert generated |
| createdAt | TIMESTAMP | NOT NULL | Event timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_sec_event_org (orgId, createdAt DESC)
- INDEX idx_sec_event_severity (orgId, severity, createdAt DESC)
- INDEX idx_sec_event_user (userId, createdAt DESC)
- INDEX idx_sec_event_unmitigated (orgId, mitigated, severity) WHERE mitigated = FALSE

---

### 16.2 DeviceTrust
**Purpose:** Trusted devices

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Device identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| userId | UUID | FK → User(id), NOT NULL | Device owner |
| deviceName | VARCHAR(255) | NULL | Device name |
| deviceType | ENUM | NOT NULL | desktop, mobile, tablet, other |
| os | VARCHAR(50) | NULL | Operating system |
| osVersion | VARCHAR(50) | NULL | OS version |
| browser | VARCHAR(50) | NULL | Browser |
| browserVersion | VARCHAR(50) | NULL | Browser version |
| fingerprint | VARCHAR(255) | NOT NULL | Device fingerprint |
| trustedAt | TIMESTAMP | NOT NULL | When trusted |
| lastUsedAt | TIMESTAMP | NOT NULL | Last usage |
| expiresAt | TIMESTAMP | NULL | Trust expiration |
| ipAddress | INET | NULL | Last known IP |
| isTrusted | BOOLEAN | NOT NULL, DEFAULT TRUE | Currently trusted |
| trustRevokedAt | TIMESTAMP | NULL | When trust revoked |
| trustRevokedReason | VARCHAR(100) | NULL | Why trust revoked |
| mfaVerified | BOOLEAN | NOT NULL, DEFAULT FALSE | MFA verified on device |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_device_fp (userId, fingerprint)
- INDEX idx_device_user (userId, isTrusted)

---

### 16.3 LoginAttempt
**Purpose:** Authentication attempts

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Attempt identifier |
| orgId | UUID | FK → Org(id), NULL | Organization (if known) |
| userId | UUID | FK → User(id), NULL | User (if identified) |
| email | VARCHAR(255) | NULL | Email attempted |
| success | BOOLEAN | NOT NULL | Login successful |
| failureReason | VARCHAR(100) | NULL | Why failed |
| ipAddress | INET | NOT NULL | Source IP |
| ipCountry | VARCHAR(2) | NULL | IP country |
| userAgent | TEXT | NULL | User agent |
| deviceFingerprint | VARCHAR(255) | NULL | Device fingerprint |
| mfaUsed | BOOLEAN | NOT NULL, DEFAULT FALSE | MFA was used |
| mfaMethod | VARCHAR(20) | NULL | MFA method used |
| mfaSuccess | BOOLEAN | NULL | MFA succeeded |
| suspicious | BOOLEAN | NOT NULL, DEFAULT FALSE | Flagged as suspicious |
| riskScore | INTEGER | NULL | Calculated risk |
| blocked | BOOLEAN | NOT NULL, DEFAULT FALSE | Login blocked |
| blockReason | VARCHAR(100) | NULL | Why blocked |
| createdAt | TIMESTAMP | NOT NULL | Attempt timestamp |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_login_user (userId, createdAt DESC)
- INDEX idx_login_ip (ipAddress, createdAt DESC)
- INDEX idx_login_success (success, createdAt DESC)
- INDEX idx_login_suspicious (suspicious, createdAt DESC) WHERE suspicious = TRUE

---

### 16.4 AccessReview
**Purpose:** Access reviews

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Review identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| name | VARCHAR(255) | NOT NULL | Review name |
| description | TEXT | NULL | Review description |
| reviewType | ENUM | NOT NULL | user_access, role_assignment, permission |
| status | ENUM | NOT NULL | planned, in_progress, completed, cancelled |
| reviewerId | UUID | FK → User(id), NOT NULL | Assigned reviewer |
| targetUserId | UUID | FK → User(id), NULL | User being reviewed |
| targetRole | VARCHAR(50) | NULL | Role being reviewed |
| scheduledDate | DATE | NOT NULL | When scheduled |
| startedAt | TIMESTAMP | NULL | When started |
| completedAt | TIMESTAMP | NULL | When completed |
| result | ENUM | NULL | approved, revoked, modified |
| findings | TEXT | NULL | Review findings |
| actionsTaken | JSONB | NULL | Actions from review |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| createdBy | UUID | NOT NULL | Who created |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_review_org (orgId, status, scheduledDate)
- INDEX idx_review_reviewer (reviewerId, status)

---

### 16.5 PermissionGrant
**Purpose:** Permission assignments

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Grant identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| granteeType | ENUM | NOT NULL | user, role, group |
| granteeId | UUID | NOT NULL | Who gets permission |
| permission | VARCHAR(100) | NOT NULL | Permission code |
| resourceType | VARCHAR(50) | NULL | Resource type |
| resourceId | UUID | NULL | Specific resource |
| scope | ENUM | NOT NULL, DEFAULT 'org' | org, department, own |
| grantedAt | TIMESTAMP | NOT NULL | When granted |
| grantedBy | UUID | NOT NULL | Who granted |
| expiresAt | TIMESTAMP | NULL | When expires |
| revokedAt | TIMESTAMP | NULL | When revoked |
| revokedBy | UUID | NULL | Who revoked |
| revokedReason | TEXT | NULL | Why revoked |
| isActive | BOOLEAN | NOT NULL, DEFAULT TRUE | Currently active |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_perm_grantee (granteeType, granteeId, isActive)
- INDEX idx_perm_resource (resourceType, resourceId)

---

## 17) Billing & Entitlements

### 17.1 Invoice
**Purpose:** Billing invoices

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Invoice identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| invoiceNumber | VARCHAR(50) | NOT NULL | Invoice number |
| provider | VARCHAR(50) | NOT NULL | stripe, manual, other |
| providerInvoiceId | VARCHAR(100) | NULL | Provider's invoice ID |
| amountCents | INTEGER | NOT NULL | Invoice amount |
| taxCents | INTEGER | NOT NULL, DEFAULT 0 | Tax amount |
| totalCents | INTEGER | NOT NULL | Total amount |
| currency | VARCHAR(3) | NOT NULL | Currency code |
| status | ENUM | NOT NULL | draft, open, paid, void, uncollectible |
| description | TEXT | NULL | Invoice description |
| lineItems | JSONB | NOT NULL | Invoice line items |
| subtotalCents | INTEGER | NOT NULL | Before tax/discount |
| discountCents | INTEGER | NOT NULL, DEFAULT 0 | Discount applied |
| periodStart | DATE | NULL | Service period start |
| periodEnd | DATE | NULL | Service period end |
| pdfUrl | VARCHAR(500) | NULL | PDF URL |
| storageKey | VARCHAR(500) | NULL | Stored PDF key |
| issuedAt | TIMESTAMP | NOT NULL | When issued |
| dueDate | DATE | NOT NULL | Payment due |
| paidAt | TIMESTAMP | NULL | When paid |
| paidAmountCents | INTEGER | NULL | Amount paid |
| paymentMethod | VARCHAR(50) | NULL | How paid |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE INDEX idx_inv_number (orgId, invoiceNumber)
- INDEX idx_inv_org (orgId, issuedAt DESC)
- INDEX idx_inv_status (orgId, status)
- INDEX idx_inv_due (orgId, dueDate) WHERE status = 'open'

---

### 17.2 Entitlement
**Purpose:** Feature entitlements

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Entitlement identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| tier | VARCHAR(50) | NOT NULL | Subscription tier |
| features | TEXT[] | NOT NULL | Enabled features |
| limits | JSONB | NOT NULL | Usage limits |
| effectiveFrom | DATE | NOT NULL | Start date |
| effectiveTo | DATE | NULL | End date (null = ongoing) |
| source | ENUM | NOT NULL | subscription, addon, trial, custom |
| sourceId | UUID | NULL | Reference to source |
| isActive | BOOLEAN | NOT NULL, DEFAULT TRUE | Currently active |
| createdAt | TIMESTAMP | NOT NULL | Creation timestamp |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_ent_org (orgId, isActive, effectiveFrom)
- INDEX idx_ent_active (orgId, effectiveFrom, effectiveTo) WHERE isActive = TRUE

---

## 18) Audit & Logging

### 18.1 AuditEvent
**Purpose:** General audit logging

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | UUID | PK, NOT NULL | Event identifier |
| orgId | UUID | FK → Org(id), NOT NULL | Organization reference |
| actorType | ENUM | NOT NULL | client, vantus, system, api |
| actorId | UUID | NULL | Actor identifier |
| action | VARCHAR(100) | NOT NULL | Action performed |
| targetType | VARCHAR(50) | NOT NULL | Target entity type |
| targetId | UUID | NOT NULL | Target entity ID |
| metadataJson | JSONB | NULL | Event metadata (redacted) |
| description | TEXT | NULL | Human-readable description |
| severity | ENUM | NOT NULL, DEFAULT 'info' | debug, info, warning, error |
| ipAddress | INET | NULL | Actor IP |
| userAgent | TEXT | NULL | User agent |
| sessionId | UUID | NULL | Session reference |
| requestId | UUID | NULL | Request correlation |
| createdAt | TIMESTAMP | NOT NULL | Event timestamp |
| hashPrev | VARCHAR(64) | NULL | Previous record hash |
| hashThis | VARCHAR(64) | NOT NULL | This record hash |
| tamperEvidence | BOOLEAN | NOT NULL, DEFAULT TRUE | In integrity chain |

**Indexes:**
- PRIMARY KEY (id)
- INDEX idx_audit_event_org (orgId, createdAt DESC)
- INDEX idx_audit_event_actor (actorType, actorId, createdAt DESC)
- INDEX idx_audit_event_target (targetType, targetId, createdAt DESC)
- INDEX idx_audit_event_action (orgId, action, createdAt DESC)

**Partitioning:** Partition by timestamp (monthly)

---

## 19) Entity Relationship Diagram

### Core Relationships

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                           VANTUS CLIENT PORTAL DATA MODEL                            │
└─────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│     Org     │◄────┤  Membership ├────►│    User     │◄────┤   Session   │
│  (Tenant)   │     │  (N:M Link) │     │             │     │             │
└──────┬──────┘     └─────────────┘     └──────┬──────┘     └─────────────┘
       │                                         │
       │    ┌────────────────────────────────────┘
       │    │
       ▼    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              WORK TRANSPARENCY                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ──┬──► Update ──┬──► UpdateAcknowledgment                                     │
│        ├──► Milestone─┼──► (self-ref: parent/child)                                │
│        ├──► Decision  │                                                            │
│        └──► Risk      │                                                            │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              TICKET MANAGEMENT                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ──┬──► Ticket ──┬──► TicketMessage ──┬──► Attachment                          │
│        │             ├──► TicketActivity                                          │
│        │             ├──► TicketLink (self-ref: related tickets)                   │
│        │             └──► (AI: AiCategorization, AiSentiment)                      │
│        │                                                                            │
│        └──► (links to: WorkflowInstance, ServiceRequest)                           │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              DOCUMENT VAULT                                          │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ──┬──► Folder (self-ref: hierarchy)                                           │
│        ├──► Document ──┬──► DocumentVersion                                         │
│        │               ├──► DocumentAccessLog                                       │
│        │               └──► (links: Folder, DocumentCollection)                     │
│        ├──► DocumentCollection                                                     │
│        └──► EvidenceExport                                                         │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              KNOWLEDGE BASE                                          │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ──┬──► KbCategory (self-ref: hierarchy)                                       │
│        ├──► KbArticle ──┬──► KbArticleVersion                                      │
│        │                ├──► KbArticleFeedback                                     │
│        │                ├──► KbArticleTag ◄──► KbTag                               │
│        │                ├──► KbRelatedArticle                                      │
│        │                ├──► KbView                                                │
│        │                └──► (links: KbVideo, User as author)                      │
│        ├──► KbGlossaryTerm                                                         │
│        └──► KbVideo                                                                │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              COMMUNITY / FORUM                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ──┬──► Forum ──┬──► ForumTopic ──┬──► ForumPost (self-ref: threaded)          │
│        │            │                 ├──► ForumSubscription                        │
│        │            │                 └──► ForumModeration                          │
│        │            └──► ForumSubscription                                          │
│        └──► ForumModeration                                                        │
│                                                                                     │
│  ForumPost ──┬──► ForumReaction                                                     │
│              └──► (links: User via mentions)                                        │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              SERVICE CATALOG                                         │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ──┬──► ServiceCategory (self-ref: hierarchy)                                  │
│        ├──► Service ──┬──► ServiceFormField                                        │
│        │              ├──► ServiceDependency (self-ref: depends_on)                │
│        │              └──► ServiceRequest ──┬──► ServiceFulfillment                │
│        │                                    └──► (links: Ticket)                   │
│        └──► ServiceBundle                                                          │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              ANALYTICS / REPORTING                                   │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ──┬──► Report ──┬──► ReportSchedule                                           │
│        ├──► Dashboard ─┬──► DashboardWidget                                         │
│        ├──► MetricDefinition ─┬──► MetricValue (time-series)                       │
│        └──► AnalyticsEvent                                                         │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              ASSET MANAGEMENT (CMDB)                                 │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ──┬──► AssetType (self-ref: hierarchy)                                        │
│        ├──► Asset ──┬──► AssetRelationship (CMDB links)                            │
│        │            ├──► AssetMaintenance                                          │
│        │            ├──► AssetWarranty                                             │
│        │            ├──► AssetLifecycle                                            │
│        │            └──► (self-ref: parent/child)                                  │
│        └──► AssetDiscovery                                                         │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              COMMUNICATION                                           │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ──┬──► MessageThread ─┬──► Message                                            │
│        ├──► Notification ──┬──► NotificationPreference                             │
│        ├──► Announcement ──┬──► AnnouncementAcknowledgment                         │
│        └──► StatusPageComponent ─┬──► StatusPageIncident ─┬──► StatusPageIncidentUpdate
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              WORKFLOWS                                               │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ──┬──► WorkflowDefinition ─┬──► WorkflowInstance                              │
│        │                         ├──► WorkflowStep ─┬──► WorkflowAssignment         │
│        │                         ├──► WorkflowTransition                           │
│        │                         └──► WorkflowVariable                             │
│        └──► (links to: ChangeRequest, Ticket, ServiceRequest)                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              AI / INTELLIGENCE                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ──┬──► AiSuggestion                                                           │
│        ├──► AiCategorization (Ticket, etc.)                                        │
│        ├──► AiSentiment (TicketMessage, etc.)                                      │
│        ├──► AiSearchQuery                                                          │
│        └──► AiPrediction                                                           │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              COLLABORATION                                           │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ──┬──► Mention (User → Entity)                                                │
│        ├──► Watch (User → Entity)                                                  │
│        ├──► SharedItem                                                             │
│        ├──► Comment (on Ticket, Document, etc.)                                    │
│        └──► Reaction (on Comment, ForumPost, etc.)                                 │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              GAMIFICATION                                            │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ──┬──► Achievement ─┬──► UserAchievement                                      │
│        ├──► Badge ───────┬──► UserBadge                                            │
│        ├──► LeaderboardEntry                                                       │
│        ├──► Challenge ───┬──► UserChallengeProgress                                │
│        └──► ReputationScore                                                        │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              COMPLIANCE                                              │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ──┬──► Policy ──────┬──► PolicyAcknowledgment                                 │
│        ├──► ComplianceFramework ─┬──► ControlMapping                               │
│        ├──► AuditRecord                                                            │
│        ├──► DataSubjectRequest                                                     │
│        └──► ConsentRecord                                                          │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              ADVANCED SECURITY                                       │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ──┬──► SecurityEvent                                                          │
│        ├──► DeviceTrust                                                            │
│        ├──► LoginAttempt                                                           │
│        ├──► AccessReview                                                           │
│        └──► PermissionGrant                                                        │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              BILLING                                                 │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ──┬──► Invoice                                                                │
│        └──► Entitlement                                                            │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                              AUDIT & LOGGING                                         │
├─────────────────────────────────────────────────────────────────────────────────────┤
│  Org ───► AuditEvent (comprehensive audit trail)                                   │
└─────────────────────────────────────────────────────────────────────────────────────┘


### Relationship Cardinality Summary

| Source Entity          | Relationship        | Target Entity           | Cardinality |
|------------------------|---------------------|------------------------|-------------|
| Org                    | has many            | All entities           | 1:N         |
| User                   | belongs to many     | Org (via Membership)   | N:M         |
| User                   | has many            | Sessions               | 1:N         |
| User                   | has many            | Tickets (as requester) | 1:N         |
| User                   | has many            | ForumPosts             | 1:N         |
| User                   | has many            | Messages               | 1:N         |
| Ticket                 | has many            | TicketMessages         | 1:N         |
| Ticket                 | has many            | TicketActivities       | 1:N         |
| Ticket                 | self references     | Ticket (parent/child)  | 1:N         |
| Ticket                 | has one             | AiCategorization       | 1:1         |
| Ticket                 | has one             | AiSentiment            | 1:1         |
| Forum                  | has many            | ForumTopics            | 1:N         |
| ForumTopic             | has many            | ForumPosts             | 1:N         |
| ForumPost              | self references     | ForumPost (threaded)   | 1:N         |
| KbCategory             | self references     | KbCategory (hierarchy) | 1:N         |
| KbCategory             | has many            | KbArticles             | 1:N         |
| KbArticle              | has many            | KbArticleVersions      | 1:N         |
| KbArticle              | has many            | KbArticleFeedback      | 1:N         |
| KbArticle              | many-to-many        | KbTag                  | N:M         |
| Service                | has many            | ServiceFormFields      | 1:N         |
| Service                | has many            | ServiceRequests        | 1:N         |
| ServiceRequest         | has one             | ServiceFulfillment     | 1:1         |
| Asset                  | self references     | Asset (parent/child)   | 1:N         |
| Asset                  | has many            | AssetRelationships     | 1:N         |
| Asset                  | has many            | AssetMaintenances      | 1:N         |
| Asset                  | has many            | AssetWarranties        | 1:N         |
| MessageThread          | has many            | Messages               | 1:N         |
| WorkflowDefinition     | has many            | WorkflowInstances      | 1:N         |
| WorkflowInstance       | has many            | WorkflowSteps          | 1:N         |
| WorkflowStep           | has many            | WorkflowAssignments    | 1:N         |
| StatusPageIncident     | has many            | StatusPageIncidentUpdates | 1:N     |
| Dashboard              | has many            | DashboardWidgets       | 1:N         |
| Report                 | has many            | ReportSchedules        | 1:N         |
| Achievement            | has many            | UserAchievements       | 1:N         |
| Challenge              | has many            | UserChallengeProgress  | 1:N         |
| Policy                 | has many            | PolicyAcknowledgments  | 1:N         |
| ComplianceFramework    | has many            | ControlMappings        | 1:N         |
| *Any Entity*           | has many            | Comments               | 1:N (polymorphic) |
| *Any Entity*           | has many            | Reactions              | 1:N (polymorphic) |
| *Any Entity*           | has many            | Watches                | 1:N (polymorphic) |

---

## 20) Indexes Summary

### Critical Performance Indexes

| Table(s) | Index Type | Columns | Purpose |
|----------|------------|---------|---------|
| All entities | B-tree | orgId + createdAt | Tenant isolation + sorting |
| User | B-tree | email | Login lookup |
| User | B-tree | lastActiveAt | Session management |
| Membership | B-tree | orgId, userId | Tenant membership lookup |
| Ticket | B-tree | orgId, status | Ticket queue filtering |
| Ticket | B-tree | assignedToStaffId | Staff workload |
| TicketMessage | B-tree | ticketId, createdAt | Message thread loading |
| Document | GIN | to_tsvector(ocrText) | Full-text search |
| KbArticle | GIN | to_tsvector(title, content) | Knowledge search |
| AnalyticsEvent | B-tree | timestamp | Time-series queries |
| MetricValue | B-tree | metricId, timestamp | Metric time-series |
| AuditRecord | B-tree | timestamp | Audit log queries |
| LoginAttempt | B-tree | ipAddress, createdAt | Security analysis |
| SecurityEvent | B-tree | severity, createdAt | Security alerting |

### Foreign Key Indexes (All FK columns indexed)

Every foreign key column has an associated B-tree index for JOIN performance:
- `*Id` fields referencing other entities
- `orgId` on all tenant-scoped tables
- `userId` where referencing User

### Composite Indexes

| Tables | Columns | Use Case |
|--------|---------|----------|
| Ticket | orgId, status, priority | Priority queue sorting |
| ForumPost | topicId, createdAt | Thread pagination |
| KbArticle | orgId, status, featured | Featured content |
| Notification | userId, status, createdAt | Inbox loading |
| Message | threadId, createdAt | Conversation loading |

---

## 21) Data Retention Policies

| Entity Type | Retention Period | Action |
|-------------|------------------|--------|
| AnalyticsEvent | 90 days | Archive then delete |
| MetricValue (detailed) | 30 days | Roll up to hourly |
| MetricValue (hourly) | 1 year | Roll up to daily |
| MetricValue (daily) | 5 years | Keep indefinitely |
| LoginAttempt | 1 year | Archive then delete |
| SecurityEvent | 3 years | Archive then delete |
| AuditRecord | 7 years | Keep indefinitely |
| Deleted entities | 30 days | Hard delete |
| Session (expired) | 7 days | Hard delete |
| Notification (read) | 30 days | Soft delete |
| Notification (unread) | Until read | Keep |

---

## 22) Permission Matrix (Entity-Level)

| Entity | Org Owner | Admin | Approver | Billing | Member | Viewer |
|--------|:---------:|:-----:|:--------:|:-------:|:------:|:------:|
| Org Settings | CRUD | R | R | R | R | R |
| Membership | CRUD | CRUD | - | - | - | - |
| User (own) | CRUD | RU | RU | RU | RU | RU |
| User (others) | CRUD | RU | R | R | R | R |
| Update | CRUD | R | R | R | R | R |
| Milestone | CRUD | R | R | R | R | R |
| Decision | CRUD | R | R | R | R | R |
| Risk | CRUD | R | R | R | R | R |
| Ticket (own) | CRUD | CRUD | CRUD | CR | CRUD | R |
| Ticket (org) | CRUD | CRUD | CRUD | R | CRUD | R |
| TicketMessage (own) | CRUD | CRUD | CRUD | CR | CRUD | R |
| Document | CRUD | CRUD | CR | R | CR | R |
| KbArticle | CRUD | CRUD | R | R | R | R |
| Forum | CRUD | R | R | R | CRUD | R |
| ForumTopic (own) | CRUD | CRUD | CRUD | CR | CRUD | R |
| Service | CRUD | R | R | R | R | R |
| ServiceRequest | CRUD | CRUD | CRUD | R | CRUD | R |
| Report | CRUD | CRUD | CRUD | R | CRUD | R |
| Dashboard | CRUD | CRUD | CRUD | R | CRUD | R |
| Asset | CRUD | CRUD | CR | R | CR | R |
| Message | CRUD | - | - | - | CRUD (own) | - |
| Notification | CRUD | - | - | - | CRUD (own) | - |
| Announcement | CRUD | R | R | R | R | R |
| Invoice | CRUD | R | R | CRUD | R | R |
| AuditEvent | CRUD | R | - | - | - | - |

**Legend:** C=Create, R=Read, U=Update, D=Delete, -=No access

---

**Document Control:**
- **Author:** Database Architecture Team
- **Reviewers:** Security, Backend, Frontend Teams
- **Approval:** CTO
- **Change Log:** See git history for all modifications

**Stop-Ship Checklist:**
- [ ] All FK constraints properly defined
- [ ] All sensitive fields encrypted at rest
- [ ] Audit logging enabled for all mutations
- [ ] Row-level security policies configured
- [ ] Indexes verified for query patterns
- [ ] Data retention policies implemented
- [ ] Backup/restore procedures tested


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
