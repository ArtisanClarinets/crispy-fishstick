# Admin Portal Architecture

This directory contains the source code for the Admin Portal (`/admin`), a protected area for operators to manage content, leads, artifacts, and customer portals.

## Architecture

The Admin Portal is built as a distinct "app" within the Next.js App Router, sharing only the core design tokens and utility libraries with the public site.

### Layout (`layout.tsx`)
- **Isolation:** Uses a separate root layout from the public site.
- **Structure:** Persistent left sidebar navigation + top command bar.
- **Theme:** Uses a higher density layout ("Operator Mode") compared to the cinematic public experience.

### Routes

- `/admin` - **Dashboard**: Overview of system status, recent leads, and content drafts.
- `/admin/content` - **Content Management**: Editors for Work, Insights, and Page blocks.
- `/admin/media` - **Media Library**: Upload and manage assets with permission controls.
- `/admin/leads` - **Lead Inbox**: CRM-lite for managing incoming contact requests.
- `/admin/portal` - **Portal Management**: Manage Customer Orgs, Projects, and Users.
- `/admin/proof` - **Proof Artifacts**: Manage build proofs, security reports, and compliance docs.
- `/admin/audit-logs` - **Audit Logs**: Immutable log of all privileged actions.
- `/admin/settings` - **Settings**: Global site configuration and feature flags.

## Security & Compliance

- **Authentication:** All routes under `/admin` are protected by middleware and require a valid session.
- **RBAC:** Server-side checks ensure only users with appropriate roles (Owner, Admin, Editor) can access specific features.
- **Audit Logging:** All mutation actions (create, update, delete) must be logged to the audit trail.
- **Robots:** `noindex` is enforced via metadata to prevent search engine indexing.

## Development Guidelines

1.  **Server Components First:** Use RSC for data fetching (tables, lists).
2.  **Client Components:** Use strictly for interactivity (forms, toggles, modal triggers).
3.  **Design System:** Use the `compact` density mode for tables and lists to maximize information density.
4.  **Forms:** Use `react-hook-form` + `zod` for validation.

## Status

- [x] Directory Structure Created
- [x] Basic Shell Layout
- [ ] Auth Integration (Pending)
- [ ] API Route Handlers (Pending)
