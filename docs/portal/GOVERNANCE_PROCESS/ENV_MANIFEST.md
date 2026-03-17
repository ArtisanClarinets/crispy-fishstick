# ENV_MANIFEST — Environment Variable Inventory
**Version:** 2.0.0  
**Date:** 2026-02-21  
**Classification:** INTERNAL USE ONLY  
**Owner:** Platform Engineering  
**Review Cycle:** Quarterly

---

## 1. Purpose
This document serves as the authoritative inventory of all environment variables used across the Vantus platform. It provides security classification, validation rules, and deployment guidance for enterprise-grade infrastructure management.

## 2. Rules
1. **Every environment variable MUST be documented here** before use in code
2. **Security Classification:** All variables classified as `secret` MUST be stored in a secure secret manager (AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault)
3. **Browser Exposure:** Only variables prefixed with `NEXT_PUBLIC_*` may be exposed to the browser
4. **Validation:** All variables MUST have defined validation rules enforced at runtime
5. **Scope Enforcement:** Variables MUST only be accessed within their defined scope
6. **Rotation:** Secret variables MUST support rotation without downtime
7. **Audit:** Access to secret variables MUST be logged

## 3. Classification Definitions
| Classification | Description | Storage | Access Control |
|---|---|---|---|
| `public` | Safe to expose to browser and logs | Environment file | Unrestricted |
| `secret` | Sensitive data, encrypted at rest | Secret Manager | Role-based |
| `internal` | Internal configuration, not for public | Environment file | Service-restricted |

## 4. Scope Definitions
| Scope | Description | Services |
|---|---|---|
| `web` | Public-facing web application | next-web |
| `admin` | Administrative dashboard | next-admin |
| `portal` | Customer portal | next-portal |
| `api` | Backend API services | api-gateway |
| `worker` | Background job processors | job-queue |
| `shared` | Used across multiple services | all |

---

## 5. Inventory

### 5.1 Public/Browser Variables (NEXT_PUBLIC_*)

| Name | Scope | Classification | Purpose | Validation | Default | Where set | Notes |
|---|---|---|---|---|---|---|---|
| NEXT_PUBLIC_SITE_URL | web | public | Canonical site URL for SEO and links | url with https | (none) | Vercel/Env | Must include protocol, no trailing slash |
| NEXT_PUBLIC_SITE_NAME | web | public | Brand name displayed in UI | non-empty, max 50 chars | Vantus | Env | Used in meta tags and emails |
| NEXT_PUBLIC_PRICING_API_ENDPOINT | web | public | Public pricing microservice endpoint | url with https | (none) | Env | CORS-enabled endpoint |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | web | public | Stripe public key for client-side card tokenization | pk_ prefix regex | (none) | Secret Manager | Test mode keys start with pk_test_ |
| NEXT_PUBLIC_CLOUDFLARE_SITE_KEY | web | public | Cloudflare Turnstile site key for CAPTCHA | 1x0000 or 0x4AAAAA prefix | (none) | Secret Manager | Rotate annually |
| NEXT_PUBLIC_SUPPORT_EMAIL | web | public | Customer-facing support email address | email format | support@vantus.systems | Env | Used in contact forms |
| NEXT_PUBLIC_APP_VERSION | web | public | Current application version for cache busting | semver format | (none) | CI/CD | Auto-set during build |
| NEXT_PUBLIC_ENABLE_ANALYTICS | web | public | Feature flag for analytics collection | boolean | true | Env | GDPR compliance override |
| NEXT_PUBLIC_API_BASE_URL | web | public | Base URL for API calls from browser | url | /api | Env | Can be relative or absolute |

### 5.2 Database & Storage

| Name | Scope | Classification | Purpose | Validation | Default | Where set | Notes |
|---|---|---|---|---|---|---|---|
| DATABASE_URL | shared | secret | Primary database connection string | postgresql:// format | (none) | Secret Manager | SSL mode required in prod |
| DATABASE_URL_POOLED | shared | secret | PgBouncer/pooled connection string | postgresql:// format | (none) | Secret Manager | Use for serverless functions |
| DATABASE_URL_READ_REPLICA | shared | secret | Read replica for analytics queries | postgresql:// format | (none) | Secret Manager | Optional, falls back to primary |
| REDIS_URL | shared | secret | Redis connection for caching/sessions | redis:// or rediss:// format | (none) | Secret Manager | Use TLS in production |
| REDIS_CLUSTER_URL | shared | secret | Redis Cluster configuration | comma-separated nodes | (none) | Secret Manager | For high availability setup |
| BLOB_STORAGE_ENDPOINT | shared | secret | S3-compatible object storage endpoint | url | (none) | Secret Manager | e.g., s3.amazonaws.com |
| BLOB_STORAGE_KEY | shared | secret | Object storage access key ID | alphanumeric, 20+ chars | (none) | Secret Manager | IAM-restricted credentials |
| BLOB_STORAGE_SECRET | shared | secret | Object storage secret access key | base64, 40+ chars | (none) | Secret Manager | Rotate quarterly |
| BLOB_STORAGE_BUCKET | shared | internal | Default bucket name for uploads | valid S3 bucket name | vantus-uploads | Env | Per-environment isolation |
| BLOB_STORAGE_REGION | shared | internal | Storage region for data residency | AWS region code | us-east-1 | Env | GDPR: use eu-west-1 for EU |
| UPSTASH_REDIS_REST_URL | shared | secret | Upstash REST API URL for edge functions | https:// format | (none) | Secret Manager | Serverless-compatible |
| UPSTASH_REDIS_REST_TOKEN | shared | secret | Upstash authentication token | alphanumeric | (none) | Secret Manager | Scoped to specific database |

### 5.3 Authentication & Security

| Name | Scope | Classification | Purpose | Validation | Default | Where set | Notes |
|---|---|---|---|---|---|---|---|
| AUTH_SECRET | admin/portal | secret | NextAuth.js session signing key | min 32 random chars | (none) | Secret Manager | Generate: `openssl rand -base64 32` |
| AUTH_GITHUB_ID | shared | secret | GitHub OAuth application client ID | 20 char alphanumeric | (none) | Secret Manager | Create at github.com/settings/apps |
| AUTH_GITHUB_SECRET | shared | secret | GitHub OAuth application secret | 40 char hex | (none) | Secret Manager | Rotate if compromised |
| AUTH_GOOGLE_ID | shared | secret | Google OAuth 2.0 client ID | *.apps.googleusercontent.com | (none) | Secret Manager | From Google Cloud Console |
| AUTH_GOOGLE_SECRET | shared | secret | Google OAuth 2.0 client secret | alphanumeric | (none) | Secret Manager | Store securely |
| AUTH_MICROSOFT_ID | shared | secret | Microsoft Entra ID application ID | UUID format | (none) | Secret Manager | For enterprise SSO |
| AUTH_MICROSOFT_SECRET | shared | secret | Microsoft Entra ID client secret | alphanumeric | (none) | Secret Manager | Auto-rotates in Entra |
| AUTH_OKTA_ID | shared | secret | Okta OAuth client ID | alphanumeric | (none) | Secret Manager | Enterprise customer SSO |
| AUTH_OKTA_SECRET | shared | secret | Okta OAuth client secret | alphanumeric | (none) | Secret Manager | Per-customer setup |
| AUTH_OKTA_ISSUER | shared | internal | Okta authorization server URL | https://*.okta.com | (none) | Env | Org-specific endpoint |
| MFA_TOTP_ISSUER | shared | internal | Display name in authenticator apps | non-empty | Vantus | Env | Shown in Google Authenticator |
| MFA_ENFORCE_ADMINS | admin | internal | Require MFA for admin accounts | boolean | true | Env | SOC2 compliance requirement |
| PASSWORD_MIN_LENGTH | shared | internal | Minimum password length for new accounts | numeric, 8-128 | 12 | Env | NIST 800-63B compliant |
| SESSION_MAX_AGE | shared | internal | Session lifetime in seconds | numeric, 3600-86400 | 86400 | Env | 24 hours default |
| SESSION_UPDATE_AGE | shared | internal | Session rolling refresh interval | numeric | 86400 | Env | Refresh token interval |
| RATE_LIMIT_MAX_REQUESTS | api | internal | Max requests per window per IP | numeric | 100 | Env | Per-minute basis |
| RATE_LIMIT_WINDOW_MS | api | internal | Rate limit window in milliseconds | numeric | 60000 | Env | 1 minute default |
| CSRF_SECRET | shared | secret | CSRF token signing key | min 32 chars | (none) | Secret Manager | Separate from AUTH_SECRET |

### 5.4 Email & Communications

| Name | Scope | Classification | Purpose | Validation | Default | Where set | Notes |
|---|---|---|---|---|---|---|---|
| SMTP_HOST | shared | internal | Outbound email server hostname | hostname or IP | (none) | Env | Use AWS SES or Postmark |
| SMTP_PORT | shared | internal | SMTP server port | numeric, 25/465/587/2525 | 587 | Env | 587 recommended with STARTTLS |
| SMTP_USER | shared | secret | SMTP authentication username | email or alphanumeric | (none) | Secret Manager | SES SMTP credentials |
| SMTP_PASSWORD | shared | secret | SMTP authentication password | alphanumeric | (none) | Secret Manager | Rotate quarterly |
| SMTP_FROM_ADDRESS | shared | internal | Default sender email address | email format | noreply@vantus.systems | Env | Must be verified domain |
| SMTP_FROM_NAME | shared | internal | Display name for outgoing emails | non-empty | Vantus | Env | Brand display name |
| SMTP_SECURE | shared | internal | Force TLS connection | boolean | false | Env | true for port 465 |
| SMTP_REJECT_UNAUTHORIZED | shared | internal | Reject self-signed certs | boolean | true | Env | Set false only for testing |
| POSTMARK_API_KEY | shared | secret | Postmark transactional email API key | UUID format | (none) | Secret Manager | Alternative to SMTP |
| POSTMARK_STREAM_BROADCAST | shared | internal | Postmark stream for bulk emails | alphanumeric | broadcast | Env | Separate from transactional |
| SENDGRID_API_KEY | shared | secret | SendGrid API key alternative | SG.* prefix | (none) | Secret Manager | Backup provider |
| INBOUND_EMAIL_WEBHOOK_SECRET | shared | secret | HMAC secret for inbound email verification | min 32 chars | (none) | Secret Manager | Prevent spoofing |
| INBOUND_EMAIL_DOMAIN | shared | internal | Domain for receiving emails | domain format | inbound.vantus.systems | Env | Configure MX records |
| RESEND_API_KEY | shared | secret | Resend email API key | re_* prefix | (none) | Secret Manager | Modern alternative |
| EMAIL_VERIFICATION_REQUIRED | shared | internal | Require email verification for new accounts | boolean | true | Env | Set false for dev only |
| EMAIL_TEMPLATE_VERSION | shared | internal | Version for email template API | numeric | 1 | Env | Cache invalidation |

### 5.5 Payments (Stripe)

| Name | Scope | Classification | Purpose | Validation | Default | Where set | Notes |
|---|---|---|---|---|---|---|---|
| STRIPE_SECRET_KEY | shared | secret | Stripe API secret key for backend operations | sk_ prefix | (none) | Secret Manager | sk_live_ for production |
| STRIPE_WEBHOOK_SECRET | shared | secret | Stripe webhook endpoint signing secret | whsec_ prefix | (none) | Secret Manager | Per-endpoint unique |
| STRIPE_PRICE_ID_FOUNDATION | shared | internal | Stripe Price ID for Foundation tier | price_* prefix | (none) | Env | Monthly billing |
| STRIPE_PRICE_ID_PROFESSIONAL | shared | internal | Stripe Price ID for Professional tier | price_* prefix | (none) | Env | Monthly billing |
| STRIPE_PRICE_ID_ENTERPRISE | shared | internal | Stripe Price ID for Enterprise tier | price_* prefix | (none) | Env | Custom pricing |
| STRIPE_PRICE_ID_FOUNDATION_ANNUAL | shared | internal | Annual billing option for Foundation | price_* prefix | (none) | Env | 20% discount |
| STRIPE_PRICE_ID_PROFESSIONAL_ANNUAL | shared | internal | Annual billing option for Professional | price_* prefix | (none) | Env | 20% discount |
| STRIPE_TAX_RATE_ID | shared | internal | Tax calculation rate ID | txr_* prefix | (none) | Env | TaxJar or Stripe Tax |
| STRIPE_CUSTOMER_PORTAIL_CONFIG_ID | shared | internal | Customer portal configuration | bpc_* prefix | (none) | Env | Self-service billing |
| STRIPE_CONNECT_CLIENT_ID | shared | secret | Stripe Connect OAuth client ID | ca_* prefix | (none) | Secret Manager | For marketplace features |
| STRIPE_CONNECT_WEBHOOK_SECRET | shared | secret | Stripe Connect webhook secret | whsec_ prefix | (none) | Secret Manager | Separate from main webhooks |
| STRIPE_TEST_MODE | shared | internal | Enable Stripe test mode | boolean | false | Env | Never true in production |
| PAYMENT_RETRY_MAX_ATTEMPTS | shared | internal | Failed payment retry count | numeric, 0-4 | 3 | Env | Stripe Smart Retries |
| SUBSCRIPTION_GRACE_PERIOD_DAYS | shared | internal | Days before account suspension | numeric | 3 | Env | After failed renewal |

### 5.6 Monitoring & Observability

| Name | Scope | Classification | Purpose | Validation | Default | Where set | Notes |
|---|---|---|---|---|---|---|---|
| SENTRY_DSN | shared | secret | Sentry error tracking endpoint | https://*.ingest.sentry.io | (none) | Secret Manager | Project-specific DSN |
| SENTRY_AUTH_TOKEN | shared | secret | Sentry API token for source maps | alphanumeric | (none) | Secret Manager | CI/CD only |
| SENTRY_ORG | shared | internal | Sentry organization slug | slug format | vantus | Env | For CLI commands |
| SENTRY_PROJECT | shared | internal | Sentry project name | slug format | (none) | Env | Per-service project |
| SENTRY_ENVIRONMENT | shared | internal | Environment tag in Sentry | alpha | production | Env | production/staging/dev |
| LOGTAIL_TOKEN | shared | secret | Better Stack (Logtail) ingestion token | alphanumeric | (none) | Secret Manager | Structured logging |
| LOGTAIL_ENDPOINT | shared | internal | Logtail ingestion endpoint | url | https://in.logtail.com | Env | EU endpoint available |
| DATADOG_API_KEY | shared | secret | Datadog metrics API key | alphanumeric | (none) | Secret Manager | APM and metrics |
| DATADOG_APP_KEY | shared | secret | Datadog application key | alphanumeric | (none) | Secret Manager | Dashboard management |
| UPTIMEROBOT_API_KEY | shared | secret | UptimeRobot read API key | m* prefix | (none) | Secret Manager | Status page integration |
| PAGERDUTY_SERVICE_KEY | shared | secret | PagerDuty integration key for incidents | alphanumeric | (none) | Secret Manager | Critical alerts only |
| PAGERDUTY_ROUTING_KEY | shared | secret | PagerDuty Events API v2 routing key | alphanumeric | (none) | Secret Manager | Automated escalation |
| OPENTELEMETRY_COLLECTOR_URL | shared | internal | OTLP collector endpoint | url | (none) | Env | For distributed tracing |
| METRICS_ENABLED | shared | internal | Enable Prometheus/OTel metrics export | boolean | true | Env | Disable for specific regions |
| LOG_LEVEL | shared | internal | Application logging verbosity | debug/info/warn/error | info | Env | debug for troubleshooting |
| AUDIT_LOG_ENABLED | shared | internal | Enable comprehensive audit logging | boolean | true | Env | Compliance requirement |

### 5.7 CDN & Edge (Cloudflare)

| Name | Scope | Classification | Purpose | Validation | Default | Where set | Notes |
|---|---|---|---|---|---|---|---|
| CLOUDFLARE_API_TOKEN | shared | secret | Cloudflare API token for automation | alphanumeric | (none) | Secret Manager | Scoped to specific zone |
| CLOUDFLARE_ZONE_ID | shared | secret | Cloudflare domain zone identifier | 32 char hex | (none) | Secret Manager | From domain overview |
| CLOUDFLARE_ACCOUNT_ID | shared | secret | Cloudflare account identifier | 32 char hex | (none) | Secret Manager | Top-level account |
| CLOUDFLARE_PAGES_DEPLOY_HOOK | shared | secret | Cloudflare Pages deployment webhook URL | url | (none) | Secret Manager | Trigger rebuilds |
| CLOUDFLARE_R2_ACCESS_KEY_ID | shared | secret | R2 object storage access key | alphanumeric | (none) | Secret Manager | S3-compatible |
| CLOUDFLARE_R2_SECRET_ACCESS_KEY | shared | secret | R2 object storage secret key | alphanumeric | (none) | Secret Manager | R2 token |
| CLOUDFLARE_R2_BUCKET_NAME | shared | internal | R2 default bucket name | valid bucket name | vantus-assets | Env | Per environment |
| CLOUDFLARE_R2_ENDPOINT | shared | internal | R2 S3-compatible endpoint | url | (none) | Env | https://*.r2.cloudflarestorage.com |
| CLOUDFLARE_KV_NAMESPACE_ID | shared | internal | Workers KV namespace for edge config | alphanumeric | (none) | Env | Feature flags storage |
| CLOUDFLARE_WORKERS_DEV | shared | internal | Deploy to workers.dev subdomain | boolean | false | Env | true for preview |

### 5.8 Feature Flags & Configuration

| Name | Scope | Classification | Purpose | Validation | Default | Where set | Notes |
|---|---|---|---|---|---|---|---|
| FEATURE_FLAG_NEW_PRICING | shared | internal | Enable new pricing page design | boolean | false | Env/Config | Gradual rollout |
| FEATURE_FLAG_PORTAL_BETA | portal | internal | Enable beta features in customer portal | boolean | false | Env/Config | Per-customer override possible |
| FEATURE_FLAG_ADVANCED_ANALYTICS | shared | internal | Enable enhanced analytics features | boolean | false | Env/Config | Requires additional data |
| FEATURE_FLAG_AI_ASSISTANT | shared | internal | Enable AI-powered support assistant | boolean | false | Env/Config | OpenAI integration required |
| FEATURE_FLAG_TEAM_MANAGEMENT | shared | internal | Enable team/organization features | boolean | true | Env/Config | Enterprise feature |
| FEATURE_FLAG_SSO | shared | internal | Enable enterprise SSO options | boolean | true | Env/Config | SAML/OIDC support |
| FEATURE_FLAG_WEBHOOKS | shared | internal | Enable outgoing webhook configuration | boolean | true | Env/Config | Developer feature |
| FEATURE_FLAG_API_V2 | api | internal | Enable version 2 API endpoints | boolean | false | Env/Config | Breaking changes |
| MAINTENANCE_MODE | shared | internal | Global maintenance mode toggle | boolean | false | Env | Show maintenance page |
| MAINTENANCE_MESSAGE | shared | public | Custom maintenance mode message | non-empty, max 200 | (none) | Env | Display to users |
| MAINTENANCE_ALLOWED_IPS | shared | internal | IPs that bypass maintenance mode | comma-separated IPs | (none) | Env | Admin access during maintenance |
| API_RATE_LIMIT_ENABLED | api | internal | Enable API rate limiting | boolean | true | Env | Disable for internal services |
| CDN_CACHE_TTL_SECONDS | shared | internal | Default CDN cache duration | numeric | 3600 | Env | 1 hour default |

### 5.9 Admin & Security Operations

| Name | Scope | Classification | Purpose | Validation | Default | Where set | Notes |
|---|---|---|---|---|---|---|---|
| ADMIN_IP_ALLOWLIST | admin | secret | Comma-separated allowed admin IP ranges | CIDR notation | (none) | Secret Manager | VPN-required access |
| ADMIN_EMAIL_DOMAINS | admin | internal | Allowed email domains for admin accounts | comma-separated domains | vantus.systems | Env | Block personal emails |
| ADMIN_SESSION_TIMEOUT_MINUTES | admin | internal | Admin session timeout | numeric, 15-480 | 60 | Env | Shorter for security |
| AUDIT_LOG_RETENTION_DAYS | shared | internal | Days to retain audit logs | numeric, 30-2555 | 2555 | Env | 7 years for compliance |
| SECURITY_ALERT_EMAIL | shared | secret | Security incident notification email | email | security@vantus.systems | Secret Manager | SOC2 requirement |
| DATA_RETENTION_DAYS | shared | internal | User data retention period | numeric, 30-3650 | 2555 | Env | GDPR/CCPA compliance |
| BACKUP_ENCRYPTION_KEY | shared | secret | AES key for database backup encryption | 64 char hex | (none) | Secret Manager | Separate from DB credentials |
| BACKUP_RETENTION_DAYS | shared | internal | Automated backup retention | numeric, 7-90 | 35 | Env | 5 weeks default |
| ENCRYPTION_KEY_DATA | shared | secret | Application-level data encryption key | 64 char hex | (none) | Secret Manager | For PII encryption |
| ENCRYPTION_KEY_DATA_OLD | shared | secret | Previous data encryption key for rotation | 64 char hex | (none) | Secret Manager | Re-encryption period |
| HASH_PEPPER | shared | secret | Additional hash entropy for passwords | min 32 chars | (none) | Secret Manager | Never change existing |
| IP_GEOLOCATION_API_KEY | shared | secret | IP geolocation service API key | alphanumeric | (none) | Secret Manager | MaxMind or similar |

### 5.10 AI & External Services

| Name | Scope | Classification | Purpose | Validation | Default | Where set | Notes |
|---|---|---|---|---|---|---|---|
| OPENAI_API_KEY | shared | secret | OpenAI API for AI features | sk- prefix | (none) | Secret Manager | Usage limits enforced |
| OPENAI_ORG_ID | shared | internal | OpenAI organization identifier | org- prefix | (none) | Env | Usage tracking |
| OPENAI_MODEL_DEFAULT | shared | internal | Default GPT model version | gpt-* format | gpt-4 | Env | Fallback model |
| ANTHROPIC_API_KEY | shared | secret | Claude API key alternative | sk-ant-* prefix | (none) | Secret Manager | Backup AI provider |
| PINECONE_API_KEY | shared | secret | Pinecone vector database API key | alphanumeric | (none) | Secret Manager | Semantic search |
| PINECONE_ENVIRONMENT | shared | internal | Pinecone environment identifier | aws-* or gcp-* | (none) | Env | Region-specific |
| PINECONE_INDEX_NAME | shared | internal | Default Pinecone index | alphanumeric | vantus | Env | Per-environment |
| HUGGINGFACE_API_TOKEN | shared | secret | HuggingFace model inference token | hf_* prefix | (none) | Secret Manager | Local model fallback |
| COHERE_API_KEY | shared | secret | Cohere API for embeddings | alphanumeric | (none) | Secret Manager | Alternative embeddings |

### 5.11 Development & Testing

| Name | Scope | Classification | Purpose | Validation | Default | Where set | Notes |
|---|---|---|---|---|---|---|---|
| NODE_ENV | shared | internal | Runtime environment mode | development/production/test | development | Env | Controls optimizations |
| DEBUG | shared | internal | Enable debug logging modules | comma-separated namespaces | (none) | Env | e.g., app:*,db:* |
| MOCK_PAYMENTS | shared | internal | Use mock payment provider | boolean | false | Env | true for e2e tests |
| MOCK_EMAILS | shared | internal | Redirect emails to test inbox | boolean | false | Env | Mailtrap integration |
| TEST_USER_EMAIL | shared | secret | Default test user credentials | email | test@example.com | Secret Manager | E2E test automation |
| TEST_USER_PASSWORD | shared | secret | Default test user password | min 8 chars | (none) | Secret Manager | Rotate frequently |
| SEED_DATA_ENABLED | shared | internal | Enable database seeding | boolean | false | Env | Dev/staging only |
| CHROMATIC_PROJECT_TOKEN | shared | secret | Chromatic visual testing token | alphanumeric | (none) | Secret Manager | Storybook CI |
| TURBO_TOKEN | shared | secret | Vercel Remote Cache token | alphanumeric | (none) | Secret Manager | Monorepo builds |
| TURBO_TEAM | shared | internal | Vercel team identifier | alphanumeric | vantus | Env | Remote cache scope |

---

## 6. Security Checklist

Before deploying to production, verify:

- [ ] All `secret` classified variables are in Secret Manager, not environment files
- [ ] No `NEXT_PUBLIC_*` variables contain sensitive data
- [ ] `AUTH_SECRET` is at least 32 bytes of cryptographically random data
- [ ] Database URLs use SSL/TLS encryption
- [ ] Stripe keys match the environment (test vs live)
- [ ] Webhook secrets are unique per endpoint
- [ ] Encryption keys are backed up offline
- [ ] Admin access is IP-restricted in production

## 7. Rotation Schedule

| Variable Category | Rotation Frequency | Procedure |
|---|---|---|
| Database credentials | Quarterly | Zero-downtime rotation via connection pooling |
| API keys (Stripe, etc.) | Annually or on compromise | Generate new, update apps, revoke old |
| Encryption keys | Annually | Re-encrypt data with new key |
| Signing secrets | Semi-annually | Session invalidation acceptable |
| OAuth credentials | On employee offboarding | Immediate rotation if developer leaves |

## 8. Emergency Contacts

| Issue | Contact | Escalation |
|---|---|---|
| Secret compromise | security@vantus.systems | Page on-call engineer |
| Production outage | ops@vantus.systems | PagerDuty Critical |
| Compliance question | compliance@vantus.systems | Legal team |

---

**Document Owner:** Platform Engineering  
**Last Updated:** 2026-02-21  
**Next Review:** 2026-05-21  
**Change Log:** v2.0.0 - Complete enterprise-grade inventory with 90+ variables
