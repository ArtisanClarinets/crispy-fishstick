---
Document: ENVIRONMENT_STRATEGY
Doc ID: VS-TEMPLATE-OPS-009
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: DevOps / Infrastructure Lead
Status: Template
Version: 2.0.0
Last Updated: 2026-01-18
Confidentiality: Client Confidential
Source of Truth: [docs/07_operations/09_ENVIRONMENT_STRATEGY.md](docs/07_operations/09_ENVIRONMENT_STRATEGY.md)
---

## Purpose
Defines the structure, parity requirements, and data governance for development, staging, and production environments.

## Environment Definitions

| Environment | Purpose | URL | Data Policy |
| :--- | :--- | :--- | :--- |
| **Local** | Local development | `localhost:*` | Synthetic / Mock data only. |
| **Dev** | Integration / PR previews | `*-preview.vercel.app` | Synthetic data. |
| **Staging** | UAT / Pre-production | `staging.*.com` | Redacted production clone (PII sanitized). |
| **Production** | Live system | `app.*.com` | Live customer data. |

## Parity Rules
1.  **Code:** No "if-env" logic in business logic. Environment differences must be handled via `process.env` only.
2.  **Infrastructure:** Staging and Production infrastructure must be identical in topology (defined via Terraform/Pulumi).
3.  **Secrets:** Different secrets for every environment. Rotation must be automated for Prod.

## Configuration Persistence
- **CI/CD:** GitHub Actions / Vercel.
- **Secret Store:** Vercel Environment Variables / AWS Secrets Manager.
