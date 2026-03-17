# ADMIN_RBAC_MATRIX — Role-Based Access Control
**Version:** 2.0.0  
**Date:** 2026-02-22  
**Policy:** Deny-by-Default — All permissions denied unless explicitly granted

---

## 1. Role Hierarchy

```
SUPER_ADMIN (Break-glass, system-wide)
├── OPS_ADMIN (Operations, user/org management)
├── SECURITY_ADMIN (Compliance, audit, security config)
├── CONTENT_PUBLISHER (Content approval and publishing)
├── CONTENT_EDITOR (Content creation and editing)
├── SALES_MANAGER (Team management, reporting)
├── SALES_REP (Lead/deal management)
└── BILLING_ADMIN (Pricing, invoices, subscriptions)
```

---

## 2. Predefined Roles

### 2.1 SUPER_ADMIN
**Purpose:** Break-glass emergency access and system configuration

| Permission Category | Level | Scope |
|---------------------|-------|-------|
| User Management | Full | All users across all orgs |
| Organization Management | Full | All orgs |
| Content | Full | All content |
| Publishing | Full | All publishing actions |
| CRM | Full | All leads, deals, contacts |
| Pricing | Full | All SKUs, rules |
| System Settings | Full | All system configuration |
| Audit Logs | Full | All audit data |
| Feature Flags | Full | All flags |
| Security Settings | Full | All security config |

**Special Capabilities:**
- Impersonate any user
- Override any permission check
- Access break-glass emergency procedures
- Modify system-level settings
- Delete any data (with enhanced logging)

### 2.2 OPS_ADMIN
**Purpose:** System operations, user management, deployments

| Permission Category | Level | Scope |
|---------------------|-------|-------|
| User Management | Full | All users |
| Organization Management | Full | All orgs |
| Content | Read | All content |
| Publishing | Read | Publishing history |
| CRM | Read | All CRM data |
| Pricing | Read | Pricing data |
| System Settings | Full | Ops-related settings |
| Audit Logs | Read | All audit data |
| Feature Flags | Full | Create, update, toggle |
| Maintenance | Full | Banners, read-only mode |

**Special Capabilities:**
- Force user logout
- Manage feature flags
- Configure system maintenance
- View system health metrics

### 2.3 SECURITY_ADMIN
**Purpose:** Compliance, security monitoring, access reviews

| Permission Category | Level | Scope |
|---------------------|-------|-------|
| User Management | Read | All users |
| Roles/Permissions | Full | All RBAC management |
| Audit Logs | Full | All audit data, exports |
| Security Settings | Full | Security configuration |
| Content | Read | All content |
| System Settings | Read | Security-related |

**Special Capabilities:**
- Run access reviews
- Export audit logs
- Configure security policies
- View security analytics
- Manage IP allowlists

### 2.4 CONTENT_PUBLISHER
**Purpose:** Content review, approval, and publishing

| Permission Category | Level | Scope |
|---------------------|-------|-------|
| Content | Read/Update/Publish | All content types |
| Publishing | Full | Review, approve, publish, rollback |
| Media | Full | Upload, edit, delete |
| Redirects | Full | Manage redirects |
| Content Workflows | Full | Workflow management |
| Audit Logs | Read | Content-related only |

**Special Capabilities:**
- Approve content for publishing
- Execute rollbacks
- Schedule publications
- Manage publishing workflows

### 2.5 CONTENT_EDITOR
**Purpose:** Content creation and editing

| Permission Category | Level | Scope |
|---------------------|-------|-------|
| Content | Create/Read/Update | Own drafts |
| Media | Create/Read/Update | Own uploads |
| Publishing | None | Cannot publish |
| Redirects | None | Cannot manage redirects |

**Special Capabilities:**
- Create and edit drafts
- Upload media
- Request review
- View content previews

### 2.6 SALES_MANAGER
**Purpose:** Sales team management and reporting

| Permission Category | Level | Scope |
|---------------------|-------|-------|
| CRM | Full | All leads, deals, contacts |
| Sales Users | Read/Update | Team members only |
| Sales Goals | Full | Goal setting |
| Sales Reports | Full | All sales analytics |
| Content | None | No CMS access |
| Pricing | Read | View pricing |

**Special Capabilities:**
- View team performance
- Assign leads
- Set sales goals
- Run sales reports
- Manage team permissions

### 2.7 SALES_REP
**Purpose:** Lead and deal management

| Permission Category | Level | Scope |
|---------------------|-------|-------|
| CRM Leads | Full | Own leads only |
| CRM Deals | Full | Own deals only |
| CRM Contacts | Full | Own contacts only |
| Activities | Full | Own activities only |
| Content | None | No CMS access |
| Pricing | Read | View pricing |

**Special Capabilities:**
- Manage own pipeline
- Log activities
- Create contacts
- Request lead assignment

### 2.8 BILLING_ADMIN
**Purpose:** Pricing, invoicing, and subscription management

| Permission Category | Level | Scope |
|---------------------|-------|-------|
| SKUs | Full | Create, edit, manage |
| Pricing Rules | Full | All pricing configuration |
| Verifications | Full | Price verification workflow |
| Invoices | Read | All invoices |
| Subscriptions | Read/Update | Manage subscriptions |
| Content | None | No CMS access |
| CRM | Read | View customer data |

**Special Capabilities:**
- Modify pricing
- Verify prices
- View billing data
- Process refunds

---

## 3. Permission Matrix by Resource

### 3.1 User Management (`/users/*`)

| Permission | Super | Ops | Security | Publisher | Editor | Sales Mgr | Sales | Billing |
|------------|:-----:|:---:|:--------:|:---------:|:------:|:---------:|:-----:|:-------:|
| List Users | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| View User | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Create User | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Update User | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Delete User | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Impersonate | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Force Logout | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Manage MFA | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |

### 3.2 Organization Management (`/orgs/*`)

| Permission | Super | Ops | Security | Publisher | Editor | Sales Mgr | Sales | Billing |
|------------|:-----:|:---:|:--------:|:---------:|:------:|:---------:|:-----:|:-------:|
| List Orgs | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| View Org | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ |
| Create Org | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Update Org | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Suspend Org | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Manage Members | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Manage Policies | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |

### 3.3 Content Management (`/content/*`)

| Permission | Super | Ops | Security | Publisher | Editor | Sales Mgr | Sales | Billing |
|------------|:-----:|:---:|:--------:|:---------:|:------:|:---------:|:-----:|:-------:|
| List Content | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| View Content | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Create Content | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Edit Content | ✓ | ✗ | ✗ | ✓ | ✓* | ✗ | ✗ | ✗ |
| Delete Content | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Publish Content | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Unpublish Content | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Rollback Content | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Manage Content Types | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |

*Editor: Own drafts only

### 3.4 Publishing (`/publishing/*`)

| Permission | Super | Ops | Security | Publisher | Editor | Sales Mgr | Sales | Billing |
|------------|:-----:|:---:|:--------:|:---------:|:------:|:---------:|:-----:|:-------:|
| View Queue | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Approve | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Reject | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Schedule | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Execute Rollback | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| View History | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |

### 3.5 Media (`/media/*`)

| Permission | Super | Ops | Security | Publisher | Editor | Sales Mgr | Sales | Billing |
|------------|:-----:|:---:|:--------:|:---------:|:------:|:---------:|:-----:|:-------:|
| List Assets | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| View Asset | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Upload Asset | ✓ | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ | ✗ |
| Edit Asset | ✓ | ✗ | ✗ | ✓ | ✓* | ✗ | ✗ | ✗ |
| Delete Asset | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |
| Organize Folders | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ |

*Editor: Own uploads only

### 3.6 CRM Leads (`/crm/leads/*`)

| Permission | Super | Ops | Security | Publisher | Editor | Sales Mgr | Sales | Billing |
|------------|:-----:|:---:|:--------:|:---------:|:------:|:---------:|:-----:|:-------:|
| List Leads | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓* | ✗ |
| View Lead | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓* | ✗ |
| Create Lead | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓ | ✗ |
| Edit Lead | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓* | ✗ |
| Delete Lead | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓* | ✗ |
| Convert Lead | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓* | ✗ |
| Assign Lead | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ |

*Sales Rep: Own leads only

### 3.7 CRM Pipeline (`/crm/pipeline/*`)

| Permission | Super | Ops | Security | Publisher | Editor | Sales Mgr | Sales | Billing |
|------------|:-----:|:---:|:--------:|:---------:|:------:|:---------:|:-----:|:-------:|
| View Pipeline | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓* | ✗ |
| Move Deal | ✓ | ✓ | ✗ | ✗ | ✗ | ✓ | ✓* | ✗ |
| Configure Stages | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ✗ |
| View Reports | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✗ | ✗ |

*Sales Rep: Own deals only

### 3.8 Pricing (`/pricing/*`)

| Permission | Super | Ops | Security | Publisher | Editor | Sales Mgr | Sales | Billing |
|------------|:-----:|:---:|:--------:|:---------:|:------:|:---------:|:-----:|:-------:|
| List SKUs | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✓ |
| View SKU | ✓ | ✓ | ✓ | ✗ | ✗ | ✓ | ✓ | ✓ |
| Create SKU | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| Edit SKU | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| Delete SKU | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| Manage Rules | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| Verify Prices | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ |
| View Verifications | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ |

### 3.9 Audit Log (`/audit-log/*`)

| Permission | Super | Ops | Security | Publisher | Editor | Sales Mgr | Sales | Billing |
|------------|:-----:|:---:|:--------:|:---------:|:------:|:---------:|:-----:|:-------:|
| View Logs | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Export Logs | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Configure Retention | ✓ | ✗ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |

### 3.10 Feature Flags (`/feature-flags/*`)

| Permission | Super | Ops | Security | Publisher | Editor | Sales Mgr | Sales | Billing |
|------------|:-----:|:---:|:--------:|:---------:|:------:|:---------:|:-----:|:-------:|
| View Flags | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Create Flag | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Edit Flag | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Toggle Flag | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Delete Flag | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |

### 3.11 System Settings (`/settings/*`)

| Permission | Super | Ops | Security | Publisher | Editor | Sales Mgr | Sales | Billing |
|------------|:-----:|:---:|:--------:|:---------:|:------:|:---------:|:-----:|:-------:|
| View Settings | ✓ | ✓ | ✓ | ✗ | ✗ | ✗ | ✗ | ✗ |
| Edit Settings | ✓ | ✓* | ✓* | ✗ | ✗ | ✗ | ✗ | ✗ |

*Ops: Ops-related only; Security: Security-related only

---

## 4. Permission Types Explained

| Type | Description | Examples |
|------|-------------|----------|
| **Create** | Can create new resources | Add users, create content, upload media |
| **Read** | Can view resources | View profiles, read content, view reports |
| **Update** | Can modify existing resources | Edit content, update user profiles |
| **Delete** | Can remove resources | Delete users, remove content |
| **Publish** | Can publish content | Approve and publish content |
| **Admin** | Full administrative control | System settings, role management |

---

## 5. Special Permission Rules

### 5.1 Object-Level Permissions
Some permissions are evaluated per object:
- **Sales Rep**: Can only modify own leads/deals
- **Editor**: Can only edit own drafts
- **All Users**: Can view own profile, cannot view others' (unless permitted)

### 5.2 Contextual Permissions
Some permissions depend on context:
- **Off-hours Access**: Additional approval required for sensitive operations
- **High-Risk Operations**: Require secondary confirmation
- **Bulk Operations**: Require elevated permissions

### 5.3 Permission Inheritance
- Organization-level permissions apply to all members
- Team permissions merge with individual permissions
- Deny always takes precedence over allow

---

## 6. Custom Roles

### 6.1 Creating Custom Roles

```javascript
// Example: Custom Role Definition
{
  "name": "Content Reviewer",
  "description": "Can review but not publish content",
  "inherits": "CONTENT_EDITOR",
  "permissions": {
    "content": ["read", "update"],
    "publishing": ["read"],  // Can see queue, cannot approve
    "audit_log": ["read"]
  },
  "restrictions": {
    "content": {
      "status": "draft",  // Only draft content
      "limit": 100        // Max 100 items
    }
  }
}
```

### 6.2 Permission Granularity

Permissions can be scoped by:
- **Resource Type**: content, users, orgs, etc.
- **Action**: create, read, update, delete, publish
- **Attributes**: status, owner, created_date
- **Context**: time, location, device

---

## 7. Enforcement

### 7.1 Server-Side Enforcement
All permissions are enforced server-side. Client-side checks are for UX only.

```typescript
// Example: Server-side permission check
async function updateContent(user: User, contentId: string, data: ContentData) {
  const content = await db.content.findById(contentId);
  
  // Check permission
  const canUpdate = await rbac.check({
    user,
    action: 'update',
    resource: 'content',
    object: content
  });
  
  if (!canUpdate) {
    throw new ForbiddenError('Insufficient permissions');
  }
  
  // Log the action
  await audit.log({
    actor: user.id,
    action: 'content.update',
    target: contentId,
    before: content,
    after: data
  });
  
  return await db.content.update(contentId, data);
}
```

### 7.2 Audit Trail
Every permission check is logged:
- User ID
- Requested action
- Resource type and ID
- Decision (allow/deny)
- Timestamp
- Context (IP, user agent)

---

## 8. Stop-Ship Requirements

| # | Requirement | Verification |
|---|-------------|--------------|
| 1 | Deny-by-default enforced | Unit tests |
| 2 | Server-side enforcement verified | Integration tests |
| 3 | Object-level permissions working | E2E tests |
| 4 | All role changes audited | Log verification |
| 5 | No privilege escalation possible | Penetration test |
| 6 | Permission caching secure | Code review |

---

**End of ADMIN_RBAC_MATRIX v2.0.0**
