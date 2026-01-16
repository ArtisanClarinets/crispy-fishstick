# INFRASTRUCTURE DEFICIENCIES

## Containerization
- **Status**: ❌ MISSING
- **Deficiency**: No `Dockerfile` or `docker-compose.yml`.
- **Impact**: "Works on my machine" syndrome. The production environment (Ubuntu VM via script) differs significantly from local dev (Mac/Windows).
- **Fix**: Create a multi-stage `Dockerfile` optimized for Next.js standalone output.

## CI/CD Pipeline
- **Status**: ⚠️ PARTIAL
- **Deficiency**: `ci.yml` exists and runs lint/test/e2e, which is good. However, there is **no deployment job**.
- **Impact**: Deployments are likely manual (SSH -> `git pull` -> `npm build`), which is error-prone and slow.
- **Fix**: Add a `deploy` job to `ci.yml` that builds the Docker image, pushes to a registry (ECR/GCR), and updates the orchestration layer (ECS/K8s/App Runner).

## Database Management
- **Status**: ❌ CRITICAL FAIL
- **Deficiency**: SQLite is used. No backup strategy defined in code.
- **Impact**: Data loss is one disk corruption away. Zero scalability.
- **Fix**: Provision RDS (PostgreSQL). Add `pg_dump` automation or enabling Point-in-Time Recovery (PITR).

## Monitoring & Logging
- **Status**: ✅ PASSABLE
- **Observation**: Sentry is configured (`sentry.server.config.ts`, etc). Winston is used.
- **Gap**: No structured logging aggregation (e.g., Datadog, ELK) visible. Logs are likely written to disk on the VM (`/var/log/vantus`), which rotates and disappears.

## Scalability
- **Status**: ❌ NONE
- **Deficiency**: Single VM architecture implied by `scripts/bootstrap-ubuntu22.sh`.
- **Impact**: Cannot scale horizontally. If traffic spikes, the site dies.
- **Fix**: Kubernetes or Serverless (Vercel/AWS Amplify) architecture.
