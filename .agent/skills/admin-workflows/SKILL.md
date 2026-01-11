---
name: admin-workflows
description: High-level administrative workflows, RBAC rules, and portal management logic.
---

# Admin Workflows

This skill guides agents through the business logic and permissions of the Admin Portal.
Use this skill when implementing admin features or explaining operational capabilities.

## 1. RBAC Hierarchy (Role-Based Access Control)

Roles are enforced server-side.

*   **Owner (Super-Admin)**:
    *   Full access to everything.
    *   Can manage other Admins and Users.
*   **Admin**:
    *   Operational control (publish content, manage leads, manage projects).
    *   Cannot delete the Tenant or manage Owner accounts.
*   **Editor**:
    *   Content focus. Can create/edit drafts.
    *   **Cannot publish** without approval (request publish).
    *   Manage media.
*   **Analyst**:
    *   Read-only access to metrics, logs, and proof artifacts.

## 2. Core Workflows

### Lead Management
1.  **Ingest**: Public `POST /api/contact` -> Creates `Lead` (Status: `new`).
2.  **Triage**: Admin views Inbox (`/admin/leads`).
3.  **Action**: Admin updates status (`in_progress`, `closed`) and adds internal notes.

### Proposal -> Project
1.  **Proposal**: Created as a `Proposal` entity (Draft).
2.  **Approval**: Sent to client (or internal approval).
3.  **Conversion**: Once accepted, a `Project` is provisioned for the Tenant.
    *   Milestones and Deliverables are initialized.
    *   Customer Users are invited to the Customer Portal.

### Content Publishing
1.  **Draft**: Created in MDX.
2.  **Review**: Previewed in Admin.
3.  **Publish**:
    *   If Owner/Admin: Direct publish.
    *   If Editor: Request Review -> Admin approves -> Publish.
4.  **Artifact**: Deployment/Revalidation ensures public site updates.

## 3. Audit Logging Requirements

**Strict Rule**: Every "privileged action" must create an `AuditLog` entry.

*   **Privileged Actions**:
    *   Login/Logout.
    *   Creating/Editing/Deleting Users.
    *   Publishing Content.
    *   Changing Project/Contract status.
    *   Viewing decrypted secrets (if ever applicable).
*   **Log Data**:
    *   `actorId` (Who)
    *   `action` (What, e.g., `user.create`)
    *   `resource` (Target ID)
    *   `ip` (Request origin)
