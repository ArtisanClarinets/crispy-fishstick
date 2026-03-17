# ADMIN_PRD — Vantus Admin Portal
**Version:** 2.0.0  
**Date:** 2026-02-22  
**Priority Order:** Security → Determinism/Auditability → Performance → Usability  
**Surface:** **Admin Portal only** (staff-only)

---

## 0. Executive Summary

The Admin Portal is Vantus's **operational control plane**. It exists to run the business safely at scale while providing a world-class user experience that exceeds all competitor offerings.

### Core Purpose
- **CMS**: Content management with enterprise-grade versioning and workflows
- **CRM**: Lead-to-customer pipeline with full sales automation
- **IAM**: Identity and access management with granular RBAC/ABAC
- **Pricing Governance**: SKU-resolved pricing with "last verified" workflows
- **Operations**: Feature flags, audit logs, and system controls
- **Analytics**: Business intelligence and compliance reporting

### Competitive Differentiation
Based on comprehensive analysis of Salesforce, HubSpot, Contentful, Stripe, Auth0, and other enterprise platforms, Vantus Admin will exceed industry standards in:
1. **Security**: Zero-trust architecture with ABAC support
2. **Content Operations**: AI-powered workflows and real-time collaboration
3. **Developer Experience**: CLI tools, SDKs, and infrastructure-as-code
4. **Compliance**: Automated GDPR/SOC 2 controls

### Non-Negotiable Principles
1. **All sensitive actions are audit-logged**
2. **All destructive actions are reversible** (rollback)
3. **All access is deny-by-default**
4. **All changes are versioned**

---

## 1. Mission Alignment

The Admin Portal embodies Vantus's core values:
- **Owner-Controlled Systems**: Complete control over data and operations
- **Proof**: Immutable audit trails for all actions
- **Security-by-Default**: No insecure configurations possible
- **Plain-Language Operations**: Complex operations explained clearly

---

## 2. Personas

### 2.1 Primary Personas

| Persona | Responsibilities | Key Needs |
|---------|------------------|-----------|
| **Super Admin** | Break-glass access, system configuration | Absolute control, emergency procedures |
| **Ops Admin** | System health, user management, deployments | Visibility, automation, reliability |
| **Security Admin** | Access reviews, compliance, threat response | Audit trails, anomaly detection, reporting |
| **Content Editor** | Content creation, drafting, editing | Intuitive editor, previews, collaboration |
| **Content Publisher** | Reviews, approvals, publishing | Workflow visibility, rollback capability |
| **Sales Rep** | Lead management, pipeline, deals | CRM efficiency, automation, forecasting |
| **Sales Manager** | Team management, reporting, quotas | Performance visibility, coaching tools |
| **Billing Admin** | Pricing, SKUs, invoices, subscriptions | Accuracy controls, audit trails |

### 2.2 Persona Permissions Matrix

| Feature Area | Super | Ops | Security | Editor | Publisher | Sales | Sales Mgr | Billing |
|--------------|:-----:|:---:|:--------:|:------:|:---------:|:-----:|:---------:|:-------:|
| User Management | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Content Edit | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Content Publish | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ |
| CRM Full Access | ✓ | ✗ | ✗ | ✗ | ✗ | ✓* | ✓ | ✗ |
| Pricing Edit | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| Audit Log View | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Feature Flags | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |

*Sales Rep: Own records only

---

## 3. Scope

### 3.1 In-Scope

#### Phase 1 (MVP - Months 1-3)
- Authentication with MFA
- RBAC with deny-by-default
- CMS: Collections, editing, versioning
- Publishing: Draft, review, publish, rollback
- CRM: Leads, basic pipeline
- Orgs/Users: Basic management
- Pricing: SKU editor, rulesets, verification
- Audit logging
- Feature flags (basic)

#### Phase 2 (Core - Months 4-6)
- SSO/SAML integration
- ABAC advanced permissions
- CMS: Workflows, scheduling, localization
- CRM: Full pipeline automation, activities
- Media: Full DAM capabilities
- Advanced audit and compliance
- Observability dashboards
- API management

#### Phase 3 (Advanced - Months 7-9)
- AI-powered features
- Real-time collaboration
- Advanced analytics
- Custom integrations
- Developer tools (CLI, SDKs)

#### Phase 4 (Innovation - Months 10-12)
- Predictive analytics
- Advanced automation workflows
- White-label capabilities
- Multi-region deployment

### 3.2 Out of Scope (Initial)
- Client portal features (separate project)
- Public marketing site features
- AI "autopilot" changes without review
- Custom code execution in admin

---

## 4. Functional Requirements

### 4.1 Authentication & Security

#### ADM-F-001: Multi-Factor Authentication (MVP)
**Description:** All admin accounts must use MFA.

**Requirements:**
- TOTP-based authentication (Google Authenticator, Authy compatible)
- WebAuthn/FIDO2 hardware key support (P2)
- Mandatory enrollment on first login
- Recovery codes for account recovery
- Admin ability to reset MFA for users

**Acceptance Criteria:**
1. User cannot access admin without completing MFA setup
2. MFA code must be validated within 30-second window
3. Recovery codes are single-use and regenerated after use
4. Failed MFA attempts are logged and alerted

#### ADM-F-002: Session Security (MVP)
**Description:** Secure session management.

**Requirements:**
- 15-minute idle timeout
- 12-hour absolute timeout
- IP and User-Agent fingerprinting
- Concurrent session limit (3 per user)
- Remote session termination capability

**Acceptance Criteria:**
1. Session expires after 15 minutes of inactivity
2. Session expires after 12 hours regardless of activity
3. Session invalidated if IP/UA changes significantly
4. User can view and terminate active sessions

#### ADM-F-003: Single Sign-On (P2)
**Description:** Enterprise SSO integration.

**Requirements:**
- SAML 2.0 support
- OIDC support
- SCIM user provisioning
- IdP-initiated login
- Domain-based SSO enforcement

**Acceptance Criteria:**
1. User can authenticate via corporate IdP
2. User accounts auto-provision on first SSO login
3. User deactivation in IdP disables admin access within 1 hour
4. SSO enforcement can be required per domain

---

### 4.2 Access Control

#### ADM-F-004: Role-Based Access Control (MVP)
**Description:** Granular permissions system.

**Requirements:**
- Deny-by-default policy
- Predefined roles: Super Admin, Ops Admin, Security Admin, Content Editor, Content Publisher, Sales, Sales Manager, Billing Admin
- Permission types: Create, Read, Update, Delete, Publish, Admin
- Object-level permissions
- Role assignment audit logging

**Acceptance Criteria:**
1. New users have no permissions by default
2. Permissions are checked server-side for every request
3. Users cannot access resources without explicit permission
4. All role changes are logged with before/after state

#### ADM-F-005: Custom Roles (P2)
**Description:** Build custom permission sets.

**Requirements:**
- Visual role builder
- Granular permission selection per resource type
- Role inheritance from base roles
- Role testing/simulation
- Role usage analytics

**Acceptance Criteria:**
1. Admin can create custom role with specific permissions
2. Custom role can inherit from existing role
3. Role permissions can be tested without applying
4. Unused roles are flagged for cleanup

#### ADM-F-006: Attribute-Based Access Control (P3)
**Description:** Context-aware permissions.

**Requirements:**
- Time-based access restrictions
- Location-based access controls
- Device posture requirements
- Dynamic permission evaluation

**Acceptance Criteria:**
1. Access can be restricted to business hours
2. Access can be blocked from non-corporate networks
3. Privileged operations require additional verification

---

### 4.3 Content Management

#### ADM-F-007: Content Modeling (MVP)
**Description:** Flexible content type creation.

**Requirements:**
- Visual content type builder
- Field types: Text, Rich Text, Number, Date, Media, Relation, Boolean, JSON, Email, Enumeration, UID
- Field validations: Required, Unique, Regex, Min/Max
- Component system for reusable structures
- Content type versioning

**Acceptance Criteria:**
1. Admin can create content type without code
2. Field validations enforce data integrity
3. Content type changes are versioned
4. Existing content is not lost on schema changes

#### ADM-F-008: Rich Text Editing (MVP)
**Description:** Content editing experience.

**Requirements:**
- WYSIWYG editor with formatting toolbar
- Markdown support (P2)
- Block-based editing (P3)
- Live preview side-by-side
- Autosave with conflict detection
- Content linting (accessibility, SEO)

**Acceptance Criteria:**
1. Editor renders formatted content in real-time
2. Content autosaves every 30 seconds
3. Conflicts detected when multiple users edit
4. Accessibility issues are flagged

#### ADM-F-009: Content Versioning (MVP)
**Description:** Track all content changes.

**Requirements:**
- Automatic version creation on every save
- Version history timeline
- Visual diff (side-by-side and inline)
- One-click restore
- Version annotations

**Acceptance Criteria:**
1. Every save creates new version
2. Version history shows author, timestamp, changes
3. Diff highlights added/removed/changed content
4. Restore creates new version (does not overwrite)

#### ADM-F-010: Publishing Workflow (MVP)
**Description:** Controlled content publishing.

**Requirements:**
- Draft/Published states
- Multi-stage workflow: Draft → Review → Approved → Published
- Role-based stage transitions
- Scheduled publishing with timezone
- Content releases (grouped publishes)
- Rollback with required reason

**Acceptance Criteria:**
1. Content must pass through workflow stages
2. Only authorized roles can approve/publish
3. Scheduled content publishes automatically
4. Rollback reverts to previous version with audit trail

#### ADM-F-011: Localization (P2)
**Description:** Multi-language content support.

**Requirements:**
- Field-level localization
- Locale fallback chain
- Translation workflows
- AI-powered translation (P3)
- Locale-specific publishing

**Acceptance Criteria:**
1. Each field can be translated independently
2. Untranslated fields fall back to default locale
3. Translation can be assigned to users
4. AI translation available as suggestion

---

### 4.4 Media Management

#### ADM-F-012: Asset Upload (MVP)
**Description:** Media file management.

**Requirements:**
- Drag-and-drop upload
- File type allowlist
- File size limits
- Malware scanning (P2)
- Checksum verification
- Duplicate detection

**Acceptance Criteria:**
1. Multiple files can be uploaded simultaneously
2. Invalid file types are rejected
3. Uploads scanned for malware
4. Duplicate files detected and flagged

#### ADM-F-013: Image Processing (MVP)
**Description:** Automatic image optimization.

**Requirements:**
- Automatic optimization on upload
- Responsive variant generation (sm/md/lg/xl)
- Format conversion (WebP, AVIF)
- Focal point setting
- Required alt text

**Acceptance Criteria:**
1. Images optimized without quality loss
2. Multiple sizes generated automatically
3. Modern formats served to supporting browsers
4. Alt text required before publish

#### ADM-F-014: Asset Organization (P2)
**Description:** Media library management.

**Requirements:**
- Folder hierarchy
- Metadata (title, description, tags, copyright)
- Bulk operations
- Asset search and filtering
- Asset versioning

**Acceptance Criteria:**
1. Assets organized in folders
2. Metadata searchable
3. Bulk move/delete operations
4. Asset replacement maintains references

---

### 4.5 CRM

#### ADM-F-015: Lead Management (MVP)
**Description:** Lead capture and tracking.

**Requirements:**
- Lead list with filtering/sorting
- Lead detail view with history
- Lead scoring (P2)
- Lead assignment (auto/manual)
- Lead source tracking
- Duplicate detection

**Acceptance Criteria:**
1. All leads visible in filterable list
2. Lead detail shows complete history
3. Leads assigned to sales reps
4. Duplicates flagged automatically

#### ADM-F-016: Pipeline Management (MVP)
**Description:** Sales pipeline visualization.

**Requirements:**
- Custom pipeline stages
- Kanban board view
- Drag-and-drop stage changes
- Stage automation (P2)
- Pipeline analytics

**Acceptance Criteria:**
1. Pipeline shows all deals by stage
2. Deals movable between stages
3. Stage changes trigger configured actions
4. Conversion rates calculated automatically

#### ADM-F-017: Contact Management (MVP)
**Description:** Contact and organization records.

**Requirements:**
- Contact profiles
- Organization records
- Contact-org relationships
- Activity timeline
- Contact merge

**Acceptance Criteria:**
1. Contacts linked to organizations
2. Activity history chronological
3. Duplicates can be merged
4. Import/export supported

#### ADM-F-018: Activity Management (MVP)
**Description:** Tasks and activities.

**Requirements:**
- Task creation and assignment
- Due dates and reminders
- Activity logging (calls, emails, meetings)
- Calendar integration (P2)
- Activity templates (P2)

**Acceptance Criteria:**
1. Tasks assignable with notifications
2. Reminders sent before due date
3. Activities logged to contact/org
4. Calendar syncs bidirectionally

---

### 4.6 Organization & User Management

#### ADM-F-019: Organization Management (MVP)
**Description:** Client organization administration.

**Requirements:**
- Organization creation
- Org profile management
- Org suspension
- Org policies and limits
- Org-level branding (P3)

**Acceptance Criteria:**
1. Orgs created with unique identifier
2. Orgs can be suspended (disable access)
3. Policies enforced per org
4. Usage tracked per org

#### ADM-F-020: User Management (MVP)
**Description:** User lifecycle management.

**Requirements:**
- User invitation
- Activation/deactivation
- Profile management
- Bulk operations (P2)
- User impersonation (P3)

**Acceptance Criteria:**
1. Users invited via email
2. Deactivated users cannot login
3. Profiles editable by user and admin
4. Bulk import/export via CSV

---

### 4.7 Pricing Governance

#### ADM-F-021: SKU Management (MVP)
**Description:** Product/SKU administration.

**Requirements:**
- SKU creation and editing
- SKU categories
- SKU attributes
- SKU status (active/inactive)
- SKU versioning

**Acceptance Criteria:**
1. SKUs have unique identifiers
2. Changes versioned
3. Inactive SKUs hidden from pricing
4. Categories support hierarchy

#### ADM-F-022: Pricing Rules (MVP)
**Description:** Pricing calculation rules.

**Requirements:**
- Ruleset versioning
- Effective dating
- Volume pricing (P2)
- Customer-specific pricing (P2)
- Promotional pricing (P2)

**Acceptance Criteria:**
1. Rules versioned with history
2. Future prices scheduled
3. Volume breaks calculated correctly
4. Promotional prices time-limited

#### ADM-F-023: Price Verification (MVP)
**Description:** Pricing accuracy controls.

**Requirements:**
- Last-verified workflow
- Verification dashboard
- Verification reminders (P2)
- Verification history

**Acceptance Criteria:**
1. Prices show verification status
2. Unverified prices flagged
3. Verifications logged with reviewer
4. Expired verifications alerted

---

### 4.8 Operations

#### ADM-F-024: Feature Flags (MVP)
**Description:** Feature toggle management.

**Requirements:**
- Boolean, string, number flags
- Flag targeting (P2)
- Flag scheduling (P2)
- Change auditing
- Kill switches

**Acceptance Criteria:**
1. Flags toggle features instantly
2. Changes logged with user/timestamp
3. Kill switches disable immediately
4. Scheduled flags activate automatically

#### ADM-F-025: System Controls (MVP)
**Description:** System administration.

**Requirements:**
- Maintenance banner
- Banner scheduling (P2)
- Read-only mode (P2)
- Cache management (P2)

**Acceptance Criteria:**
1. Banner visible to all users when active
2. Scheduled banners auto-activate
3. Read-only mode prevents changes
4. Cache purge effective immediately

---

### 4.9 Audit & Compliance

#### ADM-F-026: Audit Logging (MVP)
**Description:** Comprehensive activity logging.

**Requirements:**
- All actions logged (who, what, when, where, why)
- Immutable log storage
- Log integrity verification (P2)
- 1+ year retention (P2)
- Log export (P2)

**Acceptance Criteria:**
1. Every admin action creates log entry
2. Logs cannot be modified or deleted
3. Log hashes verified on query
4. Export available in JSON/CSV

#### ADM-F-027: Compliance Controls (P2)
**Description:** Regulatory compliance features.

**Requirements:**
- GDPR data export
- GDPR data deletion
- Consent management
- Data residency (P3)
- Retention policies

**Acceptance Criteria:**
1. User data exportable within 30 days
2. Deletion propagates to all systems
3. Consent tracked with timestamp
4. Data purged per retention policy

#### ADM-F-028: Security Monitoring (P2)
**Description:** Anomaly and threat detection.

**Requirements:**
- Login monitoring
- Anomaly detection
- Failed authentication alerts
- Impossible travel detection (P3)
- Data exfiltration detection (P3)

**Acceptance Criteria:**
1. Failed logins alerted after threshold
2. Anomalous patterns flagged
3. Off-hours access notified
4. Bulk downloads trigger alerts

---

### 4.10 API Management

#### ADM-F-029: API Keys (P2)
**Description:** API access management.

**Requirements:**
- Key generation and revocation
- Granular scopes
- Rate limit configuration
- Usage analytics

**Acceptance Criteria:**
1. Keys scoped to specific permissions
2. Revoked keys invalid immediately
3. Rate limits enforced per key
4. Usage visible in dashboard

#### ADM-F-030: Webhooks (P2)
**Description:** Event notification system.

**Requirements:**
- Webhook configuration
- Event type selection
- Signature verification
- Retry logic
- Delivery logs

**Acceptance Criteria:**
1. Webhooks sent for configured events
2. Payloads signed for verification
3. Failed deliveries retried with backoff
4. Delivery status visible

---

## 5. Non-Functional Requirements

### 5.1 Security
- All data encrypted at rest (AES-256) and in transit (TLS 1.3)
- CSP headers with nonce-based script execution
- No inline scripts or styles
- SQL injection prevention via parameterized queries
- XSS prevention via output encoding
- CSRF protection on all state-changing requests

### 5.2 Performance
- Initial page load < 3 seconds
- API response time < 200ms (p95)
- Support for 1000+ concurrent admin users
- Pagination for all list views (default 25, max 100)
- Lazy loading for media and large datasets

### 5.3 Reliability
- 99.9% uptime SLA
- Graceful degradation during outages
- Automatic retry for transient failures
- Circuit breakers for external dependencies

### 5.4 Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation for all features
- Screen reader support
- Color contrast compliance

### 5.5 Browser Support
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari/Chrome (iOS 14+, Android 10+)

---

## 6. Stop-Ship Acceptance Criteria

The following must be verified before any release:

| # | Requirement | Test Method | Owner |
|---|-------------|-------------|-------|
| 1 | MFA enforced for all users | E2E test | Security |
| 2 | RBAC deny-by-default active | Unit + E2E | Backend |
| 3 | Audit logging comprehensive | Log review | Security |
| 4 | No hardcoded prices in UI | Code scan | QA |
| 5 | CSP headers implemented | Security scan | Security |
| 6 | Rate limiting active | Load test | DevOps |
| 7 | Rollback verified | E2E test | QA |
| 8 | Encryption verified | Security audit | Security |
| 9 | Penetration test passed | External pentest | Security |
| 10 | Accessibility audit passed | Axe/Lighthouse | QA |

---

## 7. Success Metrics

### 7.1 Adoption Metrics
- Daily/Weekly Active Users
- Feature usage rates
- Time-to-completion for key tasks

### 7.2 Quality Metrics
- Error rate < 0.1%
- Support tickets per user
- NPS score > 50

### 7.3 Security Metrics
- Zero critical vulnerabilities
- Mean time to patch (MTTP) < 24 hours
- Security incident response time < 1 hour

### 7.4 Performance Metrics
- Page load time < 3s
- API latency < 200ms (p95)
- Uptime 99.9%

---

## 8. Appendix

### 8.1 Glossary
- **ABAC**: Attribute-Based Access Control
- **CMS**: Content Management System
- **CRM**: Customer Relationship Management
- **MFA**: Multi-Factor Authentication
- **RBAC**: Role-Based Access Control
- **SCIM**: System for Cross-domain Identity Management
- **SKU**: Stock Keeping Unit
- **SSO**: Single Sign-On

### 8.2 Reference Documents
- ADMIN_FEATURE_LIST.md — Complete feature catalog
- ADMIN_RBAC_MATRIX.md — Permission model
- ADMIN_SECURITY.md — Security controls
- ADMIN_DATA_MODEL.md — Entity definitions
- ADMIN_SITE_MAP.md — Navigation structure

---

**End of ADMIN_PRD v2.0.0**


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
