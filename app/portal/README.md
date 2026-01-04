# Client Portal Architecture

This directory contains the source code for the Client Portal (`/portal`), a secure workspace for customers to view projects, deliverables, and evidence.

## Architecture

The Client Portal is built as a distinct "app" within the Next.js App Router, completely isolated from the Admin and Public experiences.

### Layout (`layout.tsx`)
- **Isolation:** Uses a separate root layout.
- **Structure:** Clean, focused interface with simple navigation.
- **Theme:** "Workspace" vibe - medium density, clear status signals, focus on content.

### Routes

- `/portal` - **Dashboard**: Overview of active projects and recent activity.
- `/portal/projects` - **Projects Index**: List of all projects for the customer org.
- `/portal/projects/[id]` - **Project Detail**:
    - **Overview**: Status, timeline, key contacts.
    - **Milestones**: Tracking progress against dates.
    - **Deliverables**: Secure vault for files and links (using Signed URLs).
    - **Evidence**: Performance, Accessibility, and Security reports.
    - **Change Requests**: Form to request scope changes.
- `/portal/account` - **Account Settings**: User profile and security settings.
- `/portal/org` - **Organization**: Manage org users (Customer Admin only).

## Security & Tenancy

- **Authentication:** All routes under `/portal` require a valid customer session.
- **Tenancy:** Strictly enforced. A user can ONLY see data belonging to their `orgId`.
- **RBAC:**
    - `Customer Admin`: Can manage users.
    - `Member`: Can view assigned projects and submit requests.
    - `Viewer`: Read-only access.
- **Asset Protection:** Deliverables are never public. They are served via signed URLs with short expiration.

## Development Guidelines

1.  **Isolation:** Never import Admin components into the Portal.
2.  **Data Fetching:** Always include `where: { orgId: currentOrgId }` in every database query.
3.  **UI/UX:** Prioritize clarity and trust. Show "Verified" badges for evidence.

## Status

- [x] Directory Structure Created
- [x] Basic Shell Layout
- [ ] Auth Integration (Pending)
- [ ] API Integration (Pending)
