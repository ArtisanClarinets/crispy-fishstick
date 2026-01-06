# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2026-01-06

### Security Hardening (Comprehensive Review)
This release focuses on addressing all critical security vulnerabilities identified in the [Security Review](./docs/SECURITY_REVIEW.md).

#### 🚨 Release Blockers Resolved
- **Data Leakage**: Implemented `SafeUserWithRolesDto` and `SAFE_USER_WITH_ROLES_SELECT` to ensure sensitive fields (`passwordHash`, `mfaSecret`) are never selected from the database or sent to the client.
  - *Ref: SECURITY_REVIEW.md Item #1*
- **Unrestricted Uploads**: Moved file uploads to a private directory (`/uploads`) outside the public web root. Implemented strict validation for file type (MIME), size (max 5MB), and filename sanitization. Added a controlled download route with directory traversal protection.
  - *Ref: SECURITY_REVIEW.md Item #2*
- **Public Cron Endpoint**: Secured `/api/cron/contract-reminders` by requiring a `CRON_SECRET` header.
  - *Ref: SECURITY_REVIEW.md Item #3*
- **Sensitive Artifacts**: Removed `prisma/dev.db` and `contact_submissions.json` from the repository and added them to `.gitignore`.
  - *Ref: SECURITY_REVIEW.md Item #4*
- **Insecure Seeding**: Updated `prisma/seed.ts` to fail in production if secure environment variables are not provided, preventing default credentials.
  - *Ref: SECURITY_REVIEW.md Item #5*
- **Production Logging**: Configured `lib/prisma.ts` to disable query logging in production environments to prevent sensitive data leakage in logs.
  - *Ref: SECURITY_REVIEW.md Item #6*

#### Added
- **MFA Encryption**: Implemented AES-256-GCM encryption for MFA secrets at rest (`lib/security/mfa.ts`).
- **Audit Log Redaction**: Added recursive redaction for audit logs to strip sensitive keys (password, token, secret) before storage and retrieval (`lib/security/redact.ts`).
- **Safe DTOs**: Created strict TypeScript interfaces and Prisma select helpers for User objects (`lib/types/user.ts`, `lib/security/safe-user.ts`).
- **Origin Enforcement**: Added `assertSameOrigin` checks for admin mutation endpoints to prevent CSRF (`lib/security/origin.ts`).
- **Environment-Specific Email Logging**: Updated `lib/email.ts` to redact email content in production logs.

#### Changed
- **Admin UI**: 
  - Updated User Management pages to use `SafeUserWithRolesDto`.
  - Removed "New Password" field from User Form to prevent accidental password overwrites and encourage secure password reset flows.
- **Middleware**: Updated CSP to allow `unsafe-eval` only in development, enforcing stricter security in production.
- **Dependencies**: Removed unused/insecure dependencies and passed `npm audit`.

#### Fixed
- **API Routes**: 
  - `app/api/admin/users/[id]/route.ts`: Made role updates transactional and return safe user objects.
  - `app/api/admin/media/route.ts`: Enforced file validation and private storage.
- **Tests**: Updated unit tests in `lib/admin/guards.test.ts` to reflect new data structures and security controls.

### Security Impact Assessment
- **Critical Severity**: Addressed multiple critical vulnerabilities including credential leakage, remote code execution (via uploads), and authentication bypass.
- **High Severity**: Secured sensitive endpoints (Cron) and audit logs.
- **Medium Severity**: Hardened CSP and improved logging practices.

This release brings the application into compliance with the internal security baseline.
