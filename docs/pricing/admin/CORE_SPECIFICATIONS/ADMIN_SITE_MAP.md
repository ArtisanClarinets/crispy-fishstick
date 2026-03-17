# ADMIN_SITE_MAP — Admin Portal Routes
**Version:** 2.1.0  
**Date:** 2026-02-25  
**Surface:** Admin only (`apps/admin` — `admin.vantus.systems`)  
**Indexing:** noindex/nofollow

> **Route convention:** All routes in this document are **domain-relative** — they are served from `admin.vantus.systems`, so `/users` means `admin.vantus.systems/users`. No `/admin` prefix is needed in the URL because the entire app is the admin surface.
>
> **Monorepo context:** This document covers admin routes only. See `../../MASTER_DIRECTORY_TREE.md` for the full monorepo shape and `ADMIN_DIRECTORY_TREE.md` for the `apps/admin` codebase structure.

---

## 1. Domain Structure

| Environment | Domain | Notes |
|-------------|--------|-------|
| Production | `admin.vantus.systems` | Primary admin portal |
| Staging | `admin.staging.vantus.systems` | Pre-production testing |
| Development | `admin.dev.vantus.systems` | Development environment |

---

## 2. Route Structure

### 2.1 Authentication Routes (`/auth/*`)

```
/auth
├── /login                    # Email/password login
├── /mfa                      # MFA verification
├── /mfa/setup               # MFA enrollment
├── /mfa/recovery            # Recovery code login
├── /logout                   # Sign out
├── /access-denied           # 403 forbidden
├── /session-expired         # Session timeout
├── /password-reset
│   ├── /request             # Request reset email
│   └── /confirm             # Reset with token
└── /sso
    ├── /callback            # SSO callback handler
    └── /error               # SSO error display
```

**Access:** Public (unauthenticated)

---

### 2.2 Dashboard (`/`)

```
/                           # Main dashboard
├── ?view=personal          # Personal activity view
├── ?view=team              # Team activity view (managers)
└── ?view=system            # System overview (admins)
```

**Widgets:**
- Recent activity feed
- Pending tasks
- System status
- Quick actions
- Metrics snapshot

---

### 2.3 User Profile (`/profile`)

```
/profile
├── /                       # Profile overview
├── /edit                   # Edit profile
├── /password               # Change password
├── /mfa                    # MFA settings
├── /sessions               # Active sessions
├── /notifications          # Notification preferences
└── /api-keys               # Personal API keys
```

---

### 2.4 User Management (`/users/*`)

```
/users
├── /                       # User list
│   └── ?filter=active      # Filter params
│   └── ?role=admin         # Role filter
│   └── ?search=john        # Search
├── /invite                 # Invite new user
├── /bulk-import            # CSV import
├── /bulk-export            # CSV export
└── /[userId]
    ├── /                   # User detail
    ├── /edit               # Edit user
    ├── /roles              # Manage roles
    ├── /sessions           # View sessions
    ├── /activity           # Activity log
    ├── /permissions        # Permission check
    └── /impersonate        # Impersonate (super only)
```

**Required Permission:** `users.read`

---

### 2.5 Role Management (`/roles/*`)

```
/roles
├── /                       # Role list
├── /new                    # Create custom role
└── /[roleId]
    ├── /                   # Role detail
    ├── /edit               # Edit role
    ├── /permissions        # Permission matrix
    ├── /users              # Users with this role
    ├── /duplicate          # Clone role
    └── /delete             # Delete role (custom only)
```

**Required Permission:** `roles.manage`

---

### 2.6 Organization Management (`/orgs/*`)

```
/orgs
├── /                       # Organization list
│   └── ?status=active      # Filters
│   └── ?plan=enterprise    # Plan filter
├── /new                    # Create organization
├── /bulk-actions           # Mass operations
└── /[orgId]
    ├── /                   # Org overview
    ├── /edit               # Edit org details
    ├── /settings           # Org settings
    ├── /members            # Member management
    │   ├── /               # Member list
    │   ├── /invite         # Invite member
    │   └── /[userId]
    │       ├── /           # Member detail
    │       └── /roles      # Member roles
    ├── /policies           # Org policies
    ├── /billing            # Billing overview
    │   ├── /invoices       # Invoice list
    │   ├── /subscriptions  # Subscriptions
    │   └── /payment-methods # Payment methods
    ├── /activity           # Org activity log
    ├── /suspend            # Suspend org
    └── /delete             # Delete org
```

**Required Permission:** `orgs.read`

---

### 2.7 Content Management (`/content/*`)

```
/content
├── /                       # Content dashboard
├── /collections            # Content type management
│   ├── /                   # Collection list
│   ├── /new                # Create collection
│   └── /[collectionId]
│       ├── /               # Collection detail
│       ├── /edit           # Edit collection schema
│       ├── /fields         # Field configuration
│       ├── /permissions    # Collection permissions
│       ├── /settings       # Collection settings
│       └── /delete         # Delete collection
│
├── /[collection]
│   ├── /                   # Content list
│   │   └── ?status=draft   # Filters
│   │   └── ?author=john    # Author filter
│   │   └── ?search=term    # Search
│   ├── /new                # Create content
│   ├── /bulk-actions       # Mass operations
│   │   ├── /publish        # Bulk publish
│   │   ├── /unpublish      # Bulk unpublish
│   │   ├── /delete         # Bulk delete
│   │   └── /export         # Export
│   └── /[contentId]
│       ├── /               # Content detail
│       ├── /edit           # Edit content
│       ├── /preview        # Live preview
│       ├── /versions       # Version history
│       │   ├── /           # Version list
│       │   └── /[versionId]
│       │       ├── /       # Version detail
│       │       └── /restore # Restore version
│       ├── /workflow       # Workflow actions
│       │   ├── /submit     # Submit for review
│       │   ├── /approve    # Approve
│       │   ├── /reject     # Reject
│       │   └── /publish    # Publish
│       ├── /schedule       # Schedule publish
│       ├── /localize       # Localization
│       │   ├── /[locale]
│       │   │   ├── /       # Locale content
│       │   │   └── /translate # AI translation
│       ├── /seo            # SEO settings
│       ├── /comments       # Content comments
│       ├── /references     # Content references
│       ├── /duplicate      # Duplicate content
│       ├── /archive        # Archive content
│       └── /delete         # Delete content
│
└── /pages                  # Shortcut to pages collection
    ├── /
    ├── /new
    └── /[pageId]

# Predefined collections:
/content/pages
/content/services
/content/industries
/content/standards
/content/learn/guides
/content/learn/blog
/content/learn/templates
/content/learn/checklists
/content/proof/case-studies
/content/proof/metrics
```

**Required Permission:** `content.read`

---

### 2.8 Publishing (`/publishing/*`)

```
/publishing
├── /                       # Publishing dashboard
├── /queue                  # Pending publications
│   └── ?status=approved    # Filter by status
├── /scheduled              # Scheduled publications
│   ├── /                   # Calendar/list view
│   └── /[scheduleId]
│       ├── /               # Schedule detail
│       └── /cancel         # Cancel schedule
├── /releases               # Content releases
│   ├── /                   # Release list
│   ├── /new                # Create release
│   └── /[releaseId]
│       ├── /               # Release detail
│       ├── /edit           # Edit release
│       ├── /add-content    # Add to release
│       ├── /schedule       # Schedule release
│       └── /execute        # Execute now
├── /history                # Publish history
│   └── ?date=2024-01       # Date filter
├── /rollbacks              # Rollback history
│   └── /[rollbackId]
│       └── /               # Rollback detail
└── /previews
    └── /[previewId]        # Shareable preview links
```

**Required Permission:** `publishing.read`

---

### 2.9 Media Library (`/media/*`)

```
/media
├── /                       # Media dashboard
├── /assets                 # All assets
│   ├── /                   # Asset grid/list
│   │   └── ?type=image     # Type filter
│   │   └── ?folder= logos  # Folder filter
│   │   └── ?search=banner  # Search
│   ├── /upload             # Upload new assets
│   │   ├── /single         # Single upload
│   │   └── /bulk           # Bulk upload
│   ├── /bulk-actions       # Mass operations
│   │   ├── /move           # Move to folder
│   │   ├── /tag            # Add tags
│   │   ├── /delete         # Delete
│   │   └── /download       # Download
│   └── /[assetId]
│       ├── /               # Asset detail
│       ├── /edit           # Edit metadata
│       ├── /preview        # Full preview
│       ├── /variants       # Generated variants
│       ├── /replace        # Replace file
│       ├── /crop           # Crop/focal point
│       ├── /download       # Download
│       └── /delete         # Delete
├── /folders                # Folder management
│   ├── /                   # Folder tree
│   ├── /new                # Create folder
│   └── /[folderId]
│       ├── /               # Folder contents
│       ├── /edit           # Rename folder
│       ├── /move           # Move folder
│       └── /delete         # Delete folder
├── /dam-integrations       # External DAM
│   ├── /                   # Integration list
│   ├── /connect            # Add integration
│   └── /[integrationId]
│       ├── /settings       # Configure
│       └── /sync           # Sync assets
└── /settings               # Media settings
    ├── /processing         # Image processing
    ├── /storage            # Storage config
    └── /permissions        # Access controls
```

**Required Permission:** `media.read`

---

### 2.10 Redirects (`/redirects/*`)

```
/redirects
├── /                       # Redirect list
│   └── ?status=active      # Filter
│   └── ?type=permanent     # Type filter
├── /new                    # Create redirect
├── /bulk-import            # CSV import
├── /validation             # Check for loops
└── /[redirectId]
    ├── /                   # Redirect detail
    ├── /edit               # Edit redirect
    ├── /test               # Test redirect
    └── /delete             # Delete redirect
```

**Required Permission:** `redirects.manage`

---

### 2.11 CRM (`/crm/*`)

```
/crm
├── /                       # CRM dashboard
├── /leads                  # Lead management
│   ├── /                   # Lead list
│   │   └── ?status=new     # Status filter
│   │   └── ?source=web     # Source filter
│   │   └── ?assigned=me    # Assignment filter
│   │   └── ?score=50-100   # Score range
│   ├── /new                # Create lead
│   ├── /import             # CSV import
│   ├── /bulk-actions       # Mass operations
│   │   ├── /assign         # Assign leads
│   │   ├── /update-status  # Update status
│   │   ├── /tag            # Add tags
│   │   ├── /export         # Export
│   │   └── /delete         # Delete
│   └── /[leadId]
│       ├── /               # Lead detail
│       ├── /edit           # Edit lead
│       ├── /activity       # Activity timeline
│       ├── /score          # Lead scoring
│       ├── /convert        # Convert to contact
│       ├── /assign         # Assign to rep
│       ├── /email          # Send email
│       └── /delete         # Delete lead
│
├── /contacts               # Contact management
│   ├── /                   # Contact list
│   ├── /new                # Create contact
│   ├── /import             # Import contacts
│   └── /[contactId]
│       ├── /               # Contact detail
│       ├── /edit           # Edit contact
│       ├── /activity       # Activity history
│       ├── /deals          # Associated deals
│       ├── /org            # Organization
│       └── /delete         # Delete contact
│
├── /organizations          # Organization CRM view
│   ├── /                   # Org list
│   ├── /new                # Create org
│   └── /[orgId]
│       ├── /crm            # CRM detail view
│       ├── /contacts       # Org contacts
│       ├── /deals          # Org deals
│       └── /activity       # Org activity
│
├── /deals                  # Pipeline/deals
│   ├── /                   # Deals list
│   │   └── ?pipeline=sales # Pipeline filter
│   │   └── ?stage=proposal # Stage filter
│   │   └── ?owner=me       # Owner filter
│   ├── /pipeline           # Kanban view
│   │   └── /[pipelineId]   # Specific pipeline
│   ├── /new                # Create deal
│   ├── /forecast           # Sales forecast
│   └── /[dealId]
│       ├── /               # Deal detail
│       ├── /edit           # Edit deal
│       ├── /activity       # Deal activity
│       ├── /move           # Change stage
│       ├── /win            # Mark won
│       ├── /lose           # Mark lost
│       └── /delete         # Delete deal
│
├── /activities             # Activities/tasks
│   ├── /                   # Activity list
│   │   └── ?type=call      # Type filter
│   │   └── ?due=today      # Due date filter
│   ├── /new                # Create activity
│   ├── /calendar           # Calendar view
│   └── /[activityId]
│       ├── /               # Activity detail
│       ├── /edit           # Edit activity
│       ├── /complete       # Mark complete
│       └── /delete         # Delete activity
│
├── /pipelines              # Pipeline configuration
│   ├── /                   # Pipeline list
│   ├── /new                # Create pipeline
│   └── /[pipelineId]
│       ├── /               # Pipeline detail
│       ├── /edit           # Edit pipeline
│       ├── /stages         # Stage management
│       ├── /automation     # Stage automation
│       └── /delete         # Delete pipeline
│
└── /reports                # CRM analytics
    ├── /                   # Report dashboard
    ├── /pipeline           # Pipeline reports
    ├── /performance        # Sales performance
    ├── /forecast           # Forecasting
    ├── /activity           # Activity reports
    └── /custom             # Custom reports
```

**Required Permission:** `crm.read`

---

### 2.12 Pricing (`/pricing/*`)

```
/pricing
├── /                       # Pricing dashboard
├── /skus                   # SKU management
│   ├── /                   # SKU list
│   │   └── ?category=saas  # Category filter
│   │   └── ?status=active  # Status filter
│   │   └── ?verified=true  # Verification filter
│   ├── /new                # Create SKU
│   ├── /import             # Bulk import
│   ├── /export             # Export SKUs
│   ├── /verify-all         # Bulk verification
│   └── /[skuId]
│       ├── /               # SKU detail
│       ├── /edit           # Edit SKU
│       ├── /versions       # Version history
│       ├── /rules          # Pricing rules
│       ├── /verify         # Verify price
│       ├── /duplicate      # Duplicate SKU
│       └── /delete         # Delete SKU
│
├── /rules                  # Pricing rules
│   ├── /                   # Rule list
│   ├── /new                # Create rule
│   ├── /test               # Test rule engine
│   └── /[ruleId]
│       ├── /               # Rule detail
│       ├── /edit           # Edit rule
│       ├── /duplicate      # Duplicate rule
│       └── /delete         # Delete rule
│
├── /verifications          # Price verification
│   ├── /                   # Verification dashboard
│   ├── /pending            # Pending verifications
│   ├── /overdue            # Overdue verifications
│   ├── /history            # Verification history
│   └── /[verificationId]
│       └── /               # Verification detail
│
├── /calculator             # Price calculator
│   └── /                   # Test pricing scenarios
│
└── /settings               # Pricing settings
    ├── /currencies         # Currency settings
    ├── /taxes              # Tax configuration
    └── /notifications      # Verification reminders
```

**Required Permission:** `pricing.read`

---

### 2.13 Audit & Compliance (`/audit/*`)

```
/audit
├── /                       # Audit dashboard
├── /events                 # Audit log
│   ├── /                   # Event list
│   │   └── ?type=auth      # Event type filter
│   │   └── ?user=john      # User filter
│   │   └── ?from=2024-01   # Date range
│   │   └── ?action=create  # Action filter
│   ├── /search             # Advanced search
│   ├── /export             # Export logs
│   └── /[eventId]
│       └── /               # Event detail
├── /users                  # User activity
│   └── /[userId]
│       └── /activity       # User's activity
├── /compliance             # Compliance reports
│   ├── /                   # Report dashboard
│   ├── /gdpr               # GDPR compliance
│   ├── /soc2               # SOC 2 evidence
│   └── /access-review      # Access review
└── /settings               # Audit settings
    ├── /retention          # Retention policies
    ├── /export-schedule    # Scheduled exports
    └── /siem-integration   # SIEM configuration
```

**Required Permission:** `audit.read`

---

### 2.14 Operations (`/ops/*`)

```
/ops
├── /                       # Ops dashboard
├── /feature-flags          # Feature flags
│   ├── /                   # Flag list
│   ├── /new                # Create flag
│   ├── /bulk-actions       # Mass operations
│   └── /[flagId]
│       ├── /               # Flag detail
│       ├── /edit           # Edit flag
│       ├── /toggle         # Enable/disable
│       ├── /targeting      # Configure targeting
│       ├── /schedule       # Schedule changes
│       ├── /analytics      # Flag analytics
│       └── /delete         # Delete flag
│
├── /maintenance            # Maintenance mode
│   ├── /                   # Current status
│   ├── /banner             # Manage banner
│   ├── /read-only          # Read-only mode
│   └── /schedule           # Schedule maintenance
│
├── /system-health          # System monitoring
│   ├── /                   # Health dashboard
│   ├── /metrics            # Detailed metrics
│   ├── /alerts             # Alert configuration
│   └── /status-page        # Public status page
│
├── /cache                  # Cache management
│   ├── /                   # Cache overview
│   ├── /purge              # Purge cache
│   └── /settings           # Cache configuration
│
├── /database               # Database ops
│   ├── /                   # DB dashboard
│   ├── /queries            # Query monitoring
│   └── /migrations         # Migration status
│
└── /deployments            # Deployment management
    ├── /                   # Deployment history
    ├── /rollback           # Rollback options
    └── /schedule           # Schedule deployment
```

**Required Permission:** `ops.manage`

---

### 2.15 Settings (`/settings/*`)

```
/settings
├── /                       # Settings overview
├── /general                # General settings
│   ├── /branding           # Logo, colors
│   ├── /localization       # Timezone, locale
│   └── /notifications      # Notification defaults
├── /security               # Security settings
│   ├── /password-policy    # Password requirements
│   ├── /mfa                # MFA configuration
│   ├── /session            # Session settings
│   ├── /ip-allowlist       # IP restrictions
│   └── /audit              # Audit configuration
├── /api                    # API management
│   ├── /keys               # API keys
│   ├── /webhooks           # Webhook configuration
│   └── /rate-limits        # Rate limit settings
├── /integrations           # Third-party integrations
│   ├── /                   # Integration list
│   ├── /connect            # Add integration
│   └── /[integrationId]
│       └── /settings       # Configure
└── /billing                # Billing settings
    ├── /plans              # Plan management
    ├── /invoices           # Invoice settings
    └── /payment            # Payment configuration
```

**Required Permission:** `settings.manage`

---

## 3. Modal Routes

Routes that open in modals/overlays:

```
/modal
├── /content-selector       # Content picker
├── /media-selector         # Media picker
├── /user-selector          # User picker
├── /date-picker            # Date/time picker
├── /confirm                # Confirmation dialogs
└── /preview                # Content preview modal
```

---

## 4. API Routes (`/api/*`)

```
/api/v1
├── /auth
│   ├── /login
│   ├── /logout
│   ├── /refresh
│   ├── /mfa/verify
│   └── /password-reset
├── /users
├── /orgs
├── /content
├── /media
├── /crm
├── /pricing
├── /audit
└── /webhooks
```

---

## 5. Route Access Matrix

| Route Pattern | Super | Ops | Security | Publisher | Editor | Sales | Billing |
|---------------|:-----:|:---:|:--------:|:---------:|:------:|:-----:|:-------:|
| / | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| /profile/* | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| /users/* | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| /roles/* | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| /orgs/* | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ |
| /content/* | ✓ | ✓ | ✓ | ✓ | ✓* | ✗ | ✗ |
| /publishing/* | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| /media/* | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ |
| /redirects/* | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ |
| /crm/* | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ |
| /pricing/* | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ |
| /audit/* | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ |
| /ops/* | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| /settings/* | ✓ | ✓* | ✓* | ✗ | ✗ | ✗ | ✗ |

*Editor: Limited to own content
*Ops/Security: Limited to relevant settings

---

## 6. URL Patterns

### 6.1 ID Formats
- UUID: `/users/550e8400-e29b-41d4-a716-446655440000`
- Slug: `/content/pages/homepage`
- Composite: `/content/pages/homepage/en-US`

### 6.2 Query Parameters
Common parameters across routes:

| Parameter | Description | Example |
|-----------|-------------|---------|
| `?page=2` | Pagination | `/users?page=2` |
| `?limit=50` | Items per page | `/users?limit=50` |
| `?search=term` | Search query | `/users?search=john` |
| `?sort=name:asc` | Sort order | `/users?sort=created_at:desc` |
| `?filter=active` | Status filter | `/users?filter=active` |
| `?from=2024-01-01` | Date range start | `/audit?from=2024-01-01` |
| `?to=2024-01-31` | Date range end | `/audit?to=2024-01-31` |
| `?view=grid` | View mode | `/media?view=list` |

---

**End of ADMIN_SITE_MAP v2.1.0**

## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, scope clarified per Vantus guidelines.
- v2.1.0 (2026-02-25): Added domain-relative routing clarification (routes served from `admin.vantus.systems`, no `/admin/` prefix needed at URL level). Added monorepo context note. Updated version and date.
