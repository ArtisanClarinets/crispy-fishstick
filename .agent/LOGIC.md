# Hidden Logic & Plumbing

This document details the internal operational logic of Project SENTINEL. These mechanisms run in the background to ensure security, data integrity, and automation.

## 1. Authentication & Identity

### NextAuth Configuration (`lib/auth.ts`)
*   **Strategy**: JWT-based stateless sessions (`session: { strategy: "jwt" }`).
*   **Provider**: `CredentialsProvider` exclusively. We do not use social logins (Google, GitHub) to maintain strict control over the user directory.
*   **Schema Check**: The `authorize` callback performs a DB schema readiness check (handling `P2021`/`P2022` errors) before attempting login.
*   **Callbacks**:
    *   `jwt`: Persists `id`, `roles`, and `tenantId` from the User object into the JWT token.
    *   `session`: Hydrates the client-side session object with the same fields from the token.

### MFA Flow (`lib/security/mfa.ts`)
*   **Engine**: `otplib` (TOTP).
*   **Encryption**: The `mfaSecret` in the database is **encrypted at rest** using AES-256-GCM.
    *   **Key**: `MFA_ENCRYPTION_KEY` env var (or `NEXTAUTH_SECRET` fallback).
    *   **Format**: `iv:authTag:encryptedString` stored in the `User.mfaSecret` column.
*   **Verification**:
    1.  User provides code during login.
    2.  `authorize` decrypts the stored secret.
    3.  `authenticator.check(code, secret)` validates the token.
    4.  If valid, login proceeds. If invalid, throws `INVALID_MFA_CODE`.

### RBAC Enforcement (`middleware.ts`)
*   **Layer 1 (Network)**: The `middleware.ts` intercepts all requests to `/admin*`.
    *   It verifies the NextAuth JWT token.
    *   If missing, redirects to `/admin/login`.
*   **Layer 2 (Application)**: `lib/admin/guards.ts` (implied pattern) or individual Route Handlers check `session.user.roles`.
*   **Hierarchy**:
    *   **Owner**: Full access.
    *   **Admin**: Operational access (no destructive tenant actions).
    *   **Editor**: Content creation (requires approval for publish).
    *   **Analyst**: Read-only metrics/logs.

## 2. Security Defense Layers

### Request Validation (`lib/security/`)
*   **Origin Check** (`origin.ts`):
    *   Enforced on mutations (POST/PUT/DELETE).
    *   Validates `Origin` header matches `NEXTAUTH_URL`.
    *   Fallbacks to `Referer` if `Origin` is missing.
    *   Fails closed if neither header matches.
*   **CSRF** (`csrf.ts`):
    *   **Pattern**: Double-Submit Cookie.
    *   **Mechanism**:
        1.  `issueCsrfCookie()` sets a signed `csrf-token` cookie (HttpOnly).
        2.  Client reads a parallel exposed token (or via API) and sends it in `x-csrf-token` header.
        3.  `verifyCsrfToken()` checks: Cookie exists AND Header exists AND they match AND signature is valid.

### Data Redaction (`lib/security/redact.ts`)
*   **Logic**: Recursive object traversal.
*   **Trigger**: Applied before logging or returning sensitive objects (like Audit Logs or User objects).
*   **Blacklist**: `password`, `mfaSecret`, `token`, `key`, `authorization`, `cookie`.
*   **Replacement**: Values replaced with `[REDACTED]`.

### Secure Headers (`middleware.ts`)
*   **CSP**: Strict Content Security Policy injected by middleware.
    *   `script-src`: `'self' 'nonce-{randomUUID}'`.
    *   `frame-ancestors`: `'none'` (prevents Clickjacking).
    *   `object-src`: `'none'`.
*   **HSTS**: `Strict-Transport-Security` set to 2 years (`max-age=63072000`) with `preload`.
*   **Nonce**: A unique UUID is generated per request and passed to the CSP header.

### Upload Security (`lib/security/upload.ts`)
*   **Validation**: Zod schema (`fileSchema`).
*   **Constraints**:
    *   **Size**: Max 5MB.
    *   **Type**: Allowlist (`image/jpeg`, `png`, `webp`, `gif`, `pdf`).
    *   **Name**: Regex sanitization `^[a-zA-Z0-9.-_]+$` (no spaces or special chars).

## 3. "Hidden" Operations

### Soft Deletion Strategy
*   **Schema**: Entities (`Contract`, `Invoice`, `Lead`, `Project`, etc.) have `deletedAt`, `deletedBy`, `deleteReason`.
*   **Logic**: Records are never `DELETE`d from SQL.
*   **Filtering**: All `findMany` queries must explicitly include `where: { deletedAt: null }`.
*   **Reason**: Data integrity and recovery.

### Audit Logging
*   **Model**: `AuditLog` (Prisma).
*   **Triggers**: Any "Privileged Action" (Mutation in Admin API).
*   **Capture**:
    *   `actorId`: Who did it.
    *   `action`: What they did (e.g., `user.create`).
    *   `resource`: The ID of the affected object.
    *   `diff`: JSON patch or description of changes.
    *   `ip`: Request IP (hashed or partial for privacy).

### Job Queues (`lib/jobs/`)
*   **Architecture**: In-memory or Redis-backed worker pattern (simplified for this repo).
*   **Worker**: `scripts/worker.ts` runs as a separate process.
*   **Function**: Processes background tasks defined in `lib/jobs/definitions.ts` (e.g., email sending, report generation) to keep the main web thread responsive.

### Cron Tasks (`app/api/cron/`)
*   **Endpoint**: `GET /api/cron/contract-reminders`.
*   **Security**: Requires `Authorization: Bearer <CRON_SECRET>`.
*   **Logic**:
    1.  Finds contracts expiring in 30 days (`active` status).
    2.  Sends email to Tenant contact.
    3.  Returns JSON summary of actions.
*   **Schedule**: External scheduler (e.g., Vercel Cron or GitHub Actions) hits this endpoint daily.

## 4. Business Logic Engines

### Revenue Leak Model (`lib/revenue-leak/model.ts`)
A deterministic risk engine used in the "Lab" tools.
*   **Inputs**: Revenue ($), Conversion Rate (%), Response Time (min).
*   **Math**:
    *   **Conversion Risk**: Normalized (0-1) based on deviation from 3% baseline.
    *   **Time Risk**: Normalized (0-1) based on deviation from 5 min baseline.
    *   **Score**: Weighted average (60% Conv / 40% Time).
*   **Output**: Risk Score (0-100), Estimated Monthly Leak ($), and tailored Remediation steps.

### Server Configurator (`lib/server-config/engine.ts`)
A rules engine for hardware sizing recommendations.
*   **Inputs**: `WorkloadIntent` (Type, Traffic Pattern, RPS, etc.).
*   **Heuristics**:
    *   **Web Server**: 250 RPS per Core, 2GB RAM per Core.
    *   **Database**: Dataset * 1.5 = RAM requirement.
    *   **Headroom**: Multiplier applied based on traffic pattern (`constant` = 1.3x, `bursty` = 2.0x).
*   **Scoring**: Calculates "waste" (excess resources). The SKU with the lowest waste (tightest fit) that still meets requirements is ranked highest.
*   **Bottleneck Detection**: Identifies if the workload is CPU, RAM, or I/O bound.
