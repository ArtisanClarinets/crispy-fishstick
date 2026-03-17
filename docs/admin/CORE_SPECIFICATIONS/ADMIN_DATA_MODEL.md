# ADMIN_DATA_MODEL — Entity Definitions & Relationships
**Version:** 2.0.0  
**Date:** 2026-02-22

---

## 1. Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              IDENTITY & ACCESS                               │
├─────────────────────────────────────────────────────────────────────────────┤
                                                                              
  ┌──────────┐       ┌──────────┐       ┌──────────┐       ┌──────────┐      
  │   User   │◄─────►│  Role    │◄─────►│Permission│       │   Org    │      
  └────┬─────┘       └──────────┘       └──────────┘       └────┬─────┘      
       │                                                         │           
       │    ┌──────────┐       ┌──────────┐                      │           
       └───►│Membership│◄─────►│   Team   │◄─────────────────────┘           
            └──────────┘       └──────────┘                                 
                                                                              
┌─────────────────────────────────────────────────────────────────────────────┐
│                               CONTENT                                        │
├─────────────────────────────────────────────────────────────────────────────┤
                                                                              
  ┌────────────────┐     ┌────────────────┐     ┌────────────────┐           
  │  ContentType   │◄────│  ContentItem   │◄────│ ContentVersion │           
  └────────────────┘     └───────┬────────┘     └────────────────┘           
                                 │                                          
                                 │    ┌────────────────┐                     
                                 └───►│  PublishEvent  │                     
                                      └────────────────┘                     
                                                                              
┌─────────────────────────────────────────────────────────────────────────────┐
│                               CRM                                            │
├─────────────────────────────────────────────────────────────────────────────┤
                                                                              
  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐            
  │   Lead   │◄───►│  Contact │◄───►│   Org    │◄───►│   Deal   │            
  └────┬─────┘     └──────────┘     └──────────┘     └────┬─────┘            
       │                                                  │                  
       │     ┌──────────┐                                 │                  
       └──►  │ Activity │◄────────────────────────────────┘                  
             └──────────┘                                                    
                                                                              
┌─────────────────────────────────────────────────────────────────────────────┐
│                             PRICING & BILLING                                │
├─────────────────────────────────────────────────────────────────────────────┤
                                                                              
  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐            
  │   SKU    │◄───►│PricingRule│◄───►│PriceVerification│      │            
  └──────────┘     └──────────┘     └──────────┘     │          │            
                                                     │    ┌──────────┐       
                                                     └───►│Invoice   │       
                                                          └──────────┘       
```

---

## 2. Identity & Access Entities

### 2.1 User
**Purpose:** Identity of admin portal users

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| email | String(255) | Yes | Unique email address |
| password_hash | String(255) | Yes | Bcrypt hashed password |
| first_name | String(100) | Yes | First name |
| last_name | String(100) | Yes | Last name |
| avatar_url | String(500) | No | Profile image URL |
| status | Enum | Yes | active, inactive, suspended, pending |
| mfa_enabled | Boolean | Yes | MFA enrollment status |
| mfa_secret | Encrypted | No | TOTP secret (encrypted) |
| mfa_recovery_codes | Encrypted | No | Recovery codes (encrypted) |
| last_login_at | Timestamp | No | Last successful login |
| last_login_ip | String(45) | No | Last login IP address |
| failed_login_count | Integer | Yes | Consecutive failures |
| locked_until | Timestamp | No | Account lockout expiry |
| email_verified_at | Timestamp | No | Email verification timestamp |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |
| deleted_at | Timestamp | No | Soft delete timestamp |

**Indexes:**
- PRIMARY: id
- UNIQUE: email
- INDEX: status
- INDEX: created_at

**Relationships:**
- Has many: Membership
- Has many: RoleAssignment
- Has many: AuditEvent
- Has many: Session

---

### 2.2 Role
**Purpose:** Predefined and custom roles for RBAC

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| name | String(100) | Yes | Role name (unique) |
| description | Text | No | Role description |
| type | Enum | Yes | predefined, custom |
| is_system | Boolean | Yes | System role (non-deletable) |
| parent_role_id | UUID | FK | Parent role for inheritance |
| permissions | JSONB | Yes | Permission definitions |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |

**Indexes:**
- PRIMARY: id
- UNIQUE: name
- INDEX: type

**Relationships:**
- Self-reference: parent_role_id → Role
- Has many: RoleAssignment

**Predefined Roles:**
- SUPER_ADMIN
- OPS_ADMIN
- SECURITY_ADMIN
- CONTENT_PUBLISHER
- CONTENT_EDITOR
- SALES_MANAGER
- SALES_REP
- BILLING_ADMIN

---

### 2.3 RoleAssignment
**Purpose:** Links users to roles with optional scope

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| user_id | UUID | FK | User reference |
| role_id | UUID | FK | Role reference |
| org_id | UUID | FK | Optional org scope |
| granted_by | UUID | FK | Admin who granted |
| granted_at | Timestamp | Yes | When granted |
| expires_at | Timestamp | No | Optional expiry |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |

**Indexes:**
- PRIMARY: id
- UNIQUE: user_id, role_id, org_id
- INDEX: user_id
- INDEX: role_id

**Relationships:**
- Belongs to: User
- Belongs to: Role
- Belongs to: Org

---

### 2.4 Org (Organization)
**Purpose:** Customer organizations

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| slug | String(100) | Yes | URL-friendly identifier |
| name | String(255) | Yes | Organization name |
| description | Text | No | Organization description |
| logo_url | String(500) | No | Organization logo |
| website | String(255) | No | Organization website |
| industry | String(100) | No | Industry classification |
| size | Enum | No | 1-10, 11-50, 51-200, 201-500, 500+ |
| status | Enum | Yes | active, suspended, inactive |
| billing_email | String(255) | Yes | Primary billing contact |
| billing_address | JSONB | No | Billing address |
| tax_id | String(50) | No | Tax/VAT ID |
| plan_tier | Enum | Yes | free, starter, professional, enterprise |
| settings | JSONB | Yes | Organization settings |
| policies | JSONB | Yes | Org-specific policies |
| parent_org_id | UUID | FK | Parent org (hierarchy) |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |
| deleted_at | Timestamp | No | Soft delete timestamp |

**Indexes:**
- PRIMARY: id
- UNIQUE: slug
- INDEX: status
- INDEX: plan_tier

**Relationships:**
- Self-reference: parent_org_id → Org
- Has many: Membership
- Has many: OrgPolicy

---

### 2.5 Membership
**Purpose:** Links users to organizations

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| user_id | UUID | FK | User reference |
| org_id | UUID | FK | Org reference |
| role | Enum | Yes | member, admin, owner |
| invited_by | UUID | FK | Who invited |
| invited_at | Timestamp | No | Invitation timestamp |
| joined_at | Timestamp | No | When joined |
| status | Enum | Yes | pending, active, inactive |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |

**Indexes:**
- PRIMARY: id
- UNIQUE: user_id, org_id
- INDEX: org_id
- INDEX: status

**Relationships:**
- Belongs to: User
- Belongs to: Org

---

### 2.6 Session
**Purpose:** User session tracking

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Session identifier |
| user_id | UUID | FK | User reference |
| token_hash | String(255) | Yes | Hashed session token |
| ip_address | String(45) | Yes | IP address |
| user_agent | String(500) | Yes | User agent string |
| fingerprint | String(255) | Yes | Device fingerprint |
| started_at | Timestamp | Yes | Session start |
| last_active_at | Timestamp | Yes | Last activity |
| expires_at | Timestamp | Yes | Session expiry |
| revoked_at | Timestamp | No | When revoked |
| revoked_by | UUID | FK | Who revoked |
| mfa_verified_at | Timestamp | No | MFA completion |
| created_at | Timestamp | Yes | Creation timestamp |

**Indexes:**
- PRIMARY: id
- INDEX: user_id
- INDEX: token_hash
- INDEX: expires_at

**Relationships:**
- Belongs to: User

---

## 3. Content Entities

### 3.1 ContentType
**Purpose:** Content type definitions (schemas)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| slug | String(100) | Yes | URL-friendly name |
| name | String(255) | Yes | Display name |
| description | Text | No | Description |
| schema | JSONB | Yes | Field definitions |
| settings | JSONB | Yes | Type settings |
| status | Enum | Yes | draft, active, deprecated |
| version | Integer | Yes | Schema version |
| created_by | UUID | FK | Creator |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |
| deleted_at | Timestamp | No | Soft delete |

**Indexes:**
- PRIMARY: id
- UNIQUE: slug
- INDEX: status

**Relationships:**
- Belongs to: User (created_by)
- Has many: ContentItem

---

### 3.2 ContentItem
**Purpose:** Individual content entries

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| slug | String(255) | Yes | URL-friendly identifier |
| content_type_id | UUID | FK | Content type reference |
| status | Enum | Yes | draft, review, approved, published, archived |
| locale | String(10) | Yes | Content locale |
| data | JSONB | Yes | Content data |
| metadata | JSONB | Yes | SEO, tags, etc. |
| created_by | UUID | FK | Creator |
| updated_by | UUID | FK | Last editor |
| published_by | UUID | FK | Publisher |
| published_at | Timestamp | No | Publish date |
| published_version | Integer | No | Published version number |
| scheduled_at | Timestamp | No | Scheduled publish date |
| archived_at | Timestamp | No | Archive date |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |
| deleted_at | Timestamp | No | Soft delete |

**Indexes:**
- PRIMARY: id
- UNIQUE: slug, locale
- INDEX: content_type_id
- INDEX: status
- INDEX: locale
- INDEX: published_at
- FULLTEXT: data (for search)

**Relationships:**
- Belongs to: ContentType
- Belongs to: User (created_by, updated_by, published_by)
- Has many: ContentVersion
- Has many: PublishEvent

---

### 3.3 ContentVersion
**Purpose:** Content revision history

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| content_item_id | UUID | FK | Content item reference |
| version_number | Integer | Yes | Version number |
| data | JSONB | Yes | Content data (snapshot) |
| change_summary | Text | No | Summary of changes |
| created_by | UUID | FK | Who created version |
| created_at | Timestamp | Yes | Creation timestamp |

**Indexes:**
- PRIMARY: id
- UNIQUE: content_item_id, version_number
- INDEX: content_item_id

**Relationships:**
- Belongs to: ContentItem
- Belongs to: User

---

### 3.4 PublishEvent
**Purpose:** Publishing audit trail

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| content_item_id | UUID | FK | Content item reference |
| action | Enum | Yes | publish, unpublish, rollback |
| from_version | Integer | No | Previous version |
| to_version | Integer | Yes | New version |
| reason | Text | Yes | Required reason for action |
| performed_by | UUID | FK | Who performed action |
| performed_at | Timestamp | Yes | When performed |

**Indexes:**
- PRIMARY: id
- INDEX: content_item_id
- INDEX: performed_at

**Relationships:**
- Belongs to: ContentItem
- Belongs to: User

---

## 4. Media Entities

### 4.1 MediaAsset
**Purpose:** Media file storage and metadata

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| filename | String(255) | Yes | Original filename |
| mime_type | String(100) | Yes | MIME type |
| size_bytes | BigInt | Yes | File size |
| checksum | String(64) | Yes | SHA-256 checksum |
| storage_key | String(500) | Yes | Storage location |
| variants | JSONB | Yes | Generated variants (sizes, formats) |
| metadata | JSONB | Yes | EXIF, dimensions, duration |
| alt_text | Text | No | Accessibility text |
| caption | Text | No | Caption/description |
| folder_id | UUID | FK | Folder reference |
| uploaded_by | UUID | FK | Uploader |
| status | Enum | Yes | processing, active, archived |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |
| deleted_at | Timestamp | No | Soft delete |

**Indexes:**
- PRIMARY: id
- INDEX: folder_id
- INDEX: uploaded_by
- INDEX: status
- INDEX: checksum

**Relationships:**
- Belongs to: MediaFolder
- Belongs to: User

---

### 4.2 MediaFolder
**Purpose:** Media organization

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| name | String(255) | Yes | Folder name |
| parent_id | UUID | FK | Parent folder |
| path | String(1000) | Yes | Full path |
| created_by | UUID | FK | Creator |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |

**Indexes:**
- PRIMARY: id
- INDEX: parent_id
- INDEX: path

**Relationships:**
- Self-reference: parent_id
- Belongs to: User
- Has many: MediaAsset

---

## 5. CRM Entities

### 5.1 Lead
**Purpose:** Prospective customers

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| email | String(255) | Yes | Email address |
| first_name | String(100) | No | First name |
| last_name | String(100) | No | Last name |
| phone | String(50) | No | Phone number |
| company | String(255) | No | Company name |
| title | String(100) | No | Job title |
| source | Enum | Yes | web, referral, event, etc. |
| status | Enum | Yes | new, contacted, qualified, converted, disqualified |
| score | Integer | No | Lead score (0-100) |
| assigned_to | UUID | FK | Assigned sales rep |
| custom_fields | JSONB | Yes | Custom field values |
| converted_to_contact_id | UUID | FK | Converted contact |
| converted_to_org_id | UUID | FK | Converted organization |
| converted_at | Timestamp | No | Conversion date |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |

**Indexes:**
- PRIMARY: id
- INDEX: email
- INDEX: status
- INDEX: assigned_to
- INDEX: created_at

**Relationships:**
- Belongs to: User (assigned_to)
- Has many: Activity

---

### 5.2 Contact
**Purpose:** Customer contacts

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| email | String(255) | Yes | Email address |
| first_name | String(100) | Yes | First name |
| last_name | String(100) | Yes | Last name |
| phone | String(50) | No | Phone number |
| title | String(100) | No | Job title |
| org_id | UUID | FK | Organization |
| custom_fields | JSONB | Yes | Custom field values |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |

**Indexes:**
- PRIMARY: id
- UNIQUE: email
- INDEX: org_id

**Relationships:**
- Belongs to: Org
- Has many: Deal
- Has many: Activity

---

### 5.3 Deal
**Purpose:** Sales opportunities

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| name | String(255) | Yes | Deal name |
| description | Text | No | Description |
| contact_id | UUID | FK | Primary contact |
| org_id | UUID | FK | Organization |
| owner_id | UUID | FK | Deal owner (sales rep) |
| pipeline_id | UUID | FK | Pipeline |
| stage_id | UUID | FK | Current stage |
| value_cents | BigInt | No | Deal value |
| currency | String(3) | Yes | Currency code |
| probability | Integer | No | Win probability (0-100) |
| expected_close_date | Date | No | Expected close |
| actual_close_date | Date | No | Actual close date |
| status | Enum | Yes | open, won, lost |
| loss_reason | Enum | No | Price, features, competitor, etc. |
| custom_fields | JSONB | Yes | Custom field values |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |

**Indexes:**
- PRIMARY: id
- INDEX: org_id
- INDEX: owner_id
- INDEX: pipeline_id
- INDEX: stage_id
- INDEX: status
- INDEX: expected_close_date

**Relationships:**
- Belongs to: Contact
- Belongs to: Org
- Belongs to: User (owner)
- Belongs to: Pipeline
- Has many: Activity

---

### 5.4 Pipeline
**Purpose:** Sales pipeline definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| name | String(255) | Yes | Pipeline name |
| description | Text | No | Description |
| stages | JSONB | Yes | Stage definitions |
| is_default | Boolean | Yes | Default pipeline |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |

**Indexes:**
- PRIMARY: id
- INDEX: is_default

**Relationships:**
- Has many: Deal

---

### 5.5 Activity
**Purpose:** CRM activities (calls, emails, meetings)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| type | Enum | Yes | call, email, meeting, note, task |
| subject | String(255) | Yes | Activity subject |
| description | Text | No | Details |
| lead_id | UUID | FK | Related lead |
| contact_id | UUID | FK | Related contact |
| deal_id | UUID | FK | Related deal |
| org_id | UUID | FK | Related org |
| owner_id | UUID | FK | Activity owner |
| due_at | Timestamp | No | Due date/time |
| completed_at | Timestamp | No | Completion time |
| outcome | Enum | No | completed, cancelled, rescheduled |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |

**Indexes:**
- PRIMARY: id
- INDEX: lead_id
- INDEX: contact_id
- INDEX: deal_id
- INDEX: owner_id
- INDEX: due_at

**Relationships:**
- Belongs to: Lead
- Belongs to: Contact
- Belongs to: Deal
- Belongs to: Org
- Belongs to: User (owner)

---

## 6. Pricing Entities

### 6.1 PricingSKU
**Purpose:** Product/service SKUs

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| code | String(100) | Yes | SKU code (unique) |
| name | String(255) | Yes | SKU name |
| description | Text | No | Description |
| category | String(100) | No | Category |
| status | Enum | Yes | active, inactive, discontinued |
| base_price_cents | BigInt | No | Base price |
| currency | String(3) | Yes | Currency |
| unit | String(50) | No | Unit of measure |
| attributes | JSONB | Yes | Custom attributes |
| metadata | JSONB | Yes | Additional metadata |
| version | Integer | Yes | Version number |
| last_verified_at | Timestamp | No | Last verification |
| last_verified_by | UUID | FK | Last verifier |
| created_by | UUID | FK | Creator |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |
| deleted_at | Timestamp | No | Soft delete |

**Indexes:**
- PRIMARY: id
- UNIQUE: code
- INDEX: status
- INDEX: category

**Relationships:**
- Belongs to: User (last_verified_by, created_by)
- Has many: PricingRule
- Has many: PricingVerificationEvent

---

### 6.2 PricingRule
**Purpose:** Pricing calculation rules

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| sku_id | UUID | FK | SKU reference |
| name | String(255) | Yes | Rule name |
| type | Enum | Yes | flat, percentage, volume, tiered |
| conditions | JSONB | Yes | When rule applies |
| adjustments | JSONB | Yes | Price adjustments |
| priority | Integer | Yes | Rule priority (higher first) |
| effective_from | Date | Yes | Start date |
| effective_to | Date | No | End date |
| version | Integer | Yes | Rule version |
| created_by | UUID | FK | Creator |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |

**Indexes:**
- PRIMARY: id
- INDEX: sku_id
- INDEX: effective_from
- INDEX: effective_to

**Relationships:**
- Belongs to: PricingSKU
- Belongs to: User

---

### 6.3 PricingVerificationEvent
**Purpose:** Price verification audit trail

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| sku_id | UUID | FK | SKU reference |
| verified_by | UUID | FK | Verifier |
| verified_at | Timestamp | Yes | Verification time |
| review_notes | Text | No | Reviewer notes |
| expires_at | Timestamp | Yes | Verification expiry |
| status | Enum | Yes | verified, expired, superseded |
| created_at | Timestamp | Yes | Creation timestamp |

**Indexes:**
- PRIMARY: id
- INDEX: sku_id
- INDEX: verified_at
- INDEX: expires_at

**Relationships:**
- Belongs to: PricingSKU
- Belongs to: User

---

## 7. Audit Entities

### 7.1 AuditEvent
**Purpose:** Immutable audit trail

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| timestamp | Timestamp | Yes | Event timestamp |
| event_type | String(100) | Yes | Event category |
| event_action | String(100) | Yes | Specific action |
| actor_type | Enum | Yes | user, system, api |
| actor_id | UUID | No | Actor identifier |
| actor_email | String(255) | No | Actor email |
| actor_ip | String(45) | Yes | IP address |
| actor_user_agent | String(500) | No | User agent |
| actor_session_id | UUID | No | Session ID |
| target_type | String(100) | Yes | Resource type |
| target_id | UUID | No | Resource ID |
| target_name | String(255) | No | Resource name |
| action_outcome | Enum | Yes | success, failure, denied |
| reason | Text | No | Outcome reason |
| before_state | JSONB | No | Before values |
| after_state | JSONB | No | After values |
| metadata | JSONB | Yes | Additional context |
| integrity_hash | String(64) | Yes | Chain hash |
| previous_hash | String(64) | Yes | Previous entry hash |

**Indexes:**
- PRIMARY: id
- INDEX: timestamp
- INDEX: event_type
- INDEX: actor_id
- INDEX: target_type, target_id
- INDEX: action_outcome

---

## 8. System Entities

### 8.1 FeatureFlag
**Purpose:** Feature toggle management

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| key | String(100) | Yes | Unique flag key |
| name | String(255) | Yes | Display name |
| description | Text | No | Description |
| type | Enum | Yes | boolean, string, number |
| default_value | JSONB | Yes | Default value |
| rules | JSONB | Yes | Targeting rules |
| status | Enum | Yes | active, inactive |
| created_by | UUID | FK | Creator |
| created_at | Timestamp | Yes | Creation timestamp |
| updated_at | Timestamp | Yes | Last update timestamp |

**Indexes:**
- PRIMARY: id
- UNIQUE: key
- INDEX: status

---

### 8.2 MaintenanceBanner
**Purpose:** System maintenance notifications

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | PK | Unique identifier |
| message | Text | Yes | Banner message |
| type | Enum | Yes | info, warning, critical |
| start_at | Timestamp | Yes | When to show |
| end_at | Timestamp | No | When to hide |
| is_active | Boolean | Yes | Currently active |
| created_by | UUID | FK | Creator |
| created_at | Timestamp | Yes | Creation timestamp |

**Indexes:**
- PRIMARY: id
- INDEX: is_active
- INDEX: start_at

---

## 9. Entity Relationship Summary

| Entity | Primary Key | Soft Delete | Audit Trail |
|--------|-------------|-------------|-------------|
| User | UUID | Yes | Yes |
| Role | UUID | No | Yes |
| Org | UUID | Yes | Yes |
| Membership | UUID | No | Yes |
| ContentType | UUID | Yes | Yes |
| ContentItem | UUID | Yes | Yes |
| ContentVersion | UUID | No | No |
| MediaAsset | UUID | Yes | Yes |
| Lead | UUID | No | Yes |
| Contact | UUID | No | Yes |
| Deal | UUID | No | Yes |
| Pipeline | UUID | No | Yes |
| Activity | UUID | No | Yes |
| PricingSKU | UUID | Yes | Yes |
| PricingRule | UUID | No | Yes |
| AuditEvent | UUID | No | N/A |
| FeatureFlag | UUID | No | Yes |

---

**End of ADMIN_DATA_MODEL v2.0.0**
