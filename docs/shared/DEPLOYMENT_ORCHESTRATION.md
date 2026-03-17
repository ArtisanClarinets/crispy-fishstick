# Vantus Systems Platform - Deployment Orchestration

**Document Classification:** INTERNAL OPERATIONS  
**Version:** 1.0.0  
**Last Updated:** February 22, 2026  
**Owner:** Platform Engineering Team  
**Review Cycle:** Quarterly

---

## Executive Summary

This document defines the comprehensive deployment orchestration strategy for the Vantus Systems platform, encompassing three distinct surfaces: Public Website, Client Portal, and Admin Portal. It provides DevOps teams with actionable procedures for coordinated, reliable, and secure deployments across all environments.

### Document Purpose
- Define deployment architecture and topology
- Establish CI/CD pipeline standards
- Document deployment strategies per surface
- Provide coordinated deployment procedures
- Ensure operational readiness and rollback capabilities

### Target Audience
- DevOps Engineers
- Platform Engineers
- Release Managers
- Site Reliability Engineers (SREs)
- Security Engineers

---

## Table of Contents

1. [Deployment Architecture](#1-deployment-architecture)
2. [Deployment Pipeline](#2-deployment-pipeline)
3. [Deployment Strategies](#3-deployment-strategies)
4. [Coordinated Deployment](#4-coordinated-deployment)
5. [Environment Configuration](#5-environment-configuration)
6. [Database Deployment](#6-database-deployment)
7. [Pre-Deployment Checklist](#7-pre-deployment-checklist)
8. [Deployment Execution](#8-deployment-execution)
9. [Post-Deployment](#9-post-deployment)
10. [Rollback Procedures](#10-rollback-procedures)
11. [Emergency Deployment](#11-emergency-deployment)
12. [Deployment Monitoring](#12-deployment-monitoring)

---

## 1. Deployment Architecture

### 1.1 Three-Surface Deployment Topology

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           VANTUS SYSTEMS PLATFORM                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐         │
│  │  PUBLIC WEBSITE  │  │  CLIENT PORTAL   │  │   ADMIN PORTAL   │         │
│  │                  │  │                  │  │                  │         │
│  │  vantus.systems  │  │portal.vantus.sys │  │ admin.vantus.sys │         │
│  │                  │  │                  │  │                  │         │
│  │  • Marketing     │  │  • Dashboard     │  │  • User Mgmt     │         │
│  │  • Content       │  │  • Tickets       │  │  • Billing       │         │
│  │  • Lead Gen      │  │  • Invoices      │  │  • Analytics     │         │
│  │  • Trust Signals │  │  • Resources     │  │  • System Config │         │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘         │
│           │                     │                     │                   │
│           └─────────────────────┼─────────────────────┘                   │
│                                 │                                         │
│                    ┌────────────┴────────────┐                           │
│                    │    SHARED SERVICES      │                           │
│                    │                         │                           │
│                    │  • Authentication       │                           │
│                    │  • Database Cluster     │                           │
│                    │  • Cache Layer          │                           │
│                    │  • Object Storage       │                           │
│                    │  • Message Queue        │                           │
│                    └─────────────────────────┘                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Environment Strategy

| Environment | Purpose | Data Classification | Availability SLA |
|-------------|---------|---------------------|------------------|
| **Development** | Feature development, unit testing | Synthetic | Best effort |
| **Staging** | Integration testing, QA, UAT | Anonymized production | 95% |
| **Production** | Live customer-facing services | Production | 99.9% |

#### Environment Characteristics

**Development Environment**
- Branch: `feature/*`, `develop`
- Auto-deploy on push
- Isolated databases (per-developer when needed)
- Debug logging enabled
- Feature flags: All enabled for testing

**Staging Environment**
- Branch: `release/*`, `main`
- Deploy on merge to `release/*`
- Database: Restored production snapshot (anonymized)
- Mirrored production configuration
- Feature flags: Mirror production + preview flags

**Production Environment**
- Branch: `main` (tagged releases only)
- Manual approval required
- Database: Primary + read replicas
- Full monitoring and alerting
- Feature flags: Controlled rollout

### 1.3 Infrastructure Requirements Per Surface

#### Public Website (vantus.systems)

| Component | Specification | Scaling |
|-----------|--------------|---------|
| Compute | Vercel Edge Network | Auto-scaling |
| Framework | Next.js 16 (App Router) | Serverless functions |
| CDN | Vercel Edge Network | Global |
| Cache | Upstash Redis | 1GB per region |
| Build | Vercel CI | Parallel builds |

**Performance Targets:**
- First Contentful Paint: < 1.2s
- Time to Interactive: < 2.5s
- Lighthouse Score: > 95
- Edge Cache Hit Ratio: > 85%

#### Client Portal (portal.vantus.systems)

| Component | Specification | Scaling |
|-----------|--------------|---------|
| Compute | Vercel Pro | Auto-scaling |
| Framework | Next.js 16 + Server Actions | Serverless |
| Database | PostgreSQL (Neon/Supabase) | Auto-scaling |
| Cache | Upstash Redis | 2GB |
| Storage | S3-compatible (R2/S3) | Unlimited |
| Auth | BetterAuth | Multi-region |

**Performance Targets:**
- API Response Time (p95): < 200ms
- Page Load Time: < 2s
- WebSocket Latency: < 100ms
- File Upload Speed: > 10MB/s

#### Admin Portal (admin.vantus.systems)

| Component | Specification | Scaling |
|-----------|--------------|---------|
| Compute | Vercel Pro | Auto-scaling |
| Framework | Next.js 16 + Server Actions | Serverless |
| Database | PostgreSQL (shared with portal) | Auto-scaling |
| Cache | Upstash Redis | 1GB |
| Auth | BetterAuth (RBAC) | Multi-region |

**Performance Targets:**
- Dashboard Load: < 1.5s
- Report Generation: < 5s
- Bulk Operations: < 30s
- Real-time Updates: < 500ms

### 1.4 Shared Infrastructure Components

```
┌─────────────────────────────────────────────────────────────────┐
│                    SHARED INFRASTRUCTURE LAYER                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   PRIMARY   │  │   READ      │  │   READ      │             │
│  │  DATABASE   │  │  REPLICA 1  │  │  REPLICA 2  │             │
│  │  (US-East)  │  │  (US-West)  │  │  (EU-West)  │             │
│  └──────┬──────┘  └─────────────┘  └─────────────┘             │
│         │                                                        │
│         │         ┌─────────────┐  ┌─────────────┐             │
│         └────────►│    CACHE    │  │   QUEUE     │             │
│                   │   CLUSTER   │  │  (BullMQ)   │             │
│                   │  (Redis)    │  │             │             │
│                   └─────────────┘  └──────┬──────┘             │
│                                           │                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────┴─────┐               │
│  │   OBJECT    │  │   SEARCH    │  │   EMAIL   │               │
│  │   STORAGE   │  │  (Meilisearch)│  │  (Resend) │               │
│  │   (R2/S3)   │  │             │  │           │               │
│  └─────────────┘  └─────────────┘  └───────────┘               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Shared Component Specifications

| Component | Service | Regions | Backup |
|-----------|---------|---------|--------|
| Database | Neon PostgreSQL | us-east-1, us-west-2, eu-west-1 | Continuous + Daily |
| Cache | Upstash Redis | Multi-region | Ephemeral |
| Queue | Upstash Redis | Multi-region | Persistent |
| Storage | Cloudflare R2 | Global | Cross-region replica |
| Search | Meilisearch Cloud | us-east-1, eu-west-1 | Daily snapshots |
| Email | Resend | Global | 30-day retention |
| Auth | BetterAuth | Edge | Database-backed |

---

## 2. Deployment Pipeline

### 2.1 CI/CD Pipeline Overview

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         DEPLOYMENT PIPELINE FLOW                             │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   DEVELOP          STAGING              PRODUCTION                           │
│                                                                              │
│   ┌────┐           ┌────┐               ┌────┐                              │
│   │Push│           │    │               │    │                              │
│   └─┬──┘           │    │               │    │                              │
│     │              │    │               │    │                              │
│     ▼              │    │               │    │                              │
│  ┌────────┐        │    │               │    │                              │
│  │  Lint  │        │    │               │    │                              │
│  └────┬───┘        │    │               │    │                              │
│       │            │    │               │    │                              │
│       ▼            │    │               │    │                              │
│  ┌────────┐        │    │               │    │                              │
│  │  Test  │        │    │               │    │                              │
│  └────┬───┘        │    │               │    │                              │
│       │            │    │               │    │                              │
│       ▼            │    │               │    │                              │
│  ┌────────┐        │    │               │    │                              │
│  │  Build │        │    │               │    │                              │
│  └────┬───┘        │    │               │    │                              │
│       │            │    │               │    │                              │
│       ▼            ▼    │               │    │                              │
│  ┌─────────────────┐    │               │    │                              │
│  │  AUTO-DEPLOY    │────┘               │    │                              │
│  │  to Development │                    │    │                              │
│  └─────────────────┘                    │    │                              │
│                                         │    │                              │
│              PR to release/* ──────────►│    │                              │
│                                         │    │                              │
│                                         ▼    │                              │
│                              ┌─────────────────┐                           │
│                              │  INTEGRATION    │                           │
│                              │  TESTS          │                           │
│                              └────────┬────────┘                           │
│                                       │                                    │
│                                       ▼                                    │
│                              ┌─────────────────┐                           │
│                              │  SECURITY SCAN  │                           │
│                              └────────┬────────┘                           │
│                                       │                                    │
│                                       ▼                                    │
│                              ┌─────────────────┐                           │
│                              │  AUTO-DEPLOY    │                           │
│                              │  to Staging     │                           │
│                              └─────────────────┘                           │
│                                       │                                    │
│              Manual Approval ────────►│                                    │
│                                       ▼                                    │
│                              ┌─────────────────┐                           │
│                              │  PRODUCTION     │                           │
│                              │  DEPLOYMENT     │                           │
│                              └─────────────────┘                           │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Build Stages for Each Surface

#### Stage 1: Code Quality Gates

```yaml
# .github/workflows/ci.yml
name: Continuous Integration

on:
  push:
    branches: [develop, feature/*]
  pull_request:
    branches: [main, release/*]

jobs:
  quality-gates:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Type Check
        run: npm run type-check
      
      - name: Format Check
        run: npm run format:check
```

#### Stage 2: Testing

```yaml
  testing:
    runs-on: ubuntu-latest
    needs: quality-gates
    steps:
      - name: Unit Tests
        run: npm run test:unit -- --coverage
      
      - name: Integration Tests
        run: npm run test:integration
      
      - name: E2E Tests (Surface Specific)
        run: |
          if [ "${{ matrix.surface }}" = "public" ]; then
            npm run test:e2e:public
          elif [ "${{ matrix.surface }}" = "portal" ]; then
            npm run test:e2e:portal
          elif [ "${{ matrix.surface }}" = "admin" ]; then
            npm run test:e2e:admin
          fi
      
      - name: Upload Coverage
        uses: codecov/codecov-action@v3
```

#### Stage 3: Build and Artifact Creation

```yaml
  build:
    runs-on: ubuntu-latest
    needs: testing
    strategy:
      matrix:
        surface: [public, portal, admin]
    steps:
      - name: Build ${{ matrix.surface }}
        run: |
          npm run build:${{ matrix.surface }}
      
      - name: Create Deployment Artifact
        run: |
          mkdir -p artifacts/${{ matrix.surface }}
          cp -r .next artifacts/${{ matrix.surface }}/
          cp package.json artifacts/${{ matrix.surface }}/
          cp -r public artifacts/${{ matrix.surface }}/ 2>/dev/null || true
      
      - name: Upload Artifact
        uses: actions/upload-artifact@v4
        with:
          name: ${{ matrix.surface }}-build
          path: artifacts/${{ matrix.surface }}
          retention-days: 30
```

### 2.3 Test Automation Integration

| Test Type | Trigger | Environment | Coverage Target |
|-----------|---------|-------------|-----------------|
| Unit Tests | Every push | CI Runner | 80% |
| Integration Tests | PR to release/* | CI Runner | 70% |
| E2E Tests | PR to release/* | Staging | Critical paths |
| Visual Regression | PR to release/* | Staging | All surfaces |
| Performance Tests | Nightly | Staging | Benchmarks |
| Security Tests | PR to release/* | CI Runner | OWASP Top 10 |

### 2.4 Security Scanning in Pipeline

```yaml
  security-scan:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Dependency Audit
        run: npm audit --audit-level=moderate
      
      - name: Snyk Security Scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      
      - name: Semgrep Analysis
        uses: returntocorp/semgrep-action@v1
        with:
          config: >-
            p/security-audit
            p/owasp-top-ten
            p/cwe-top-25
      
      - name: Secret Detection
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: main
          head: HEAD
          extra_args: --debug --only-verified
      
      - name: Container Scan (if applicable)
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          format: 'sarif'
          output: 'trivy-results.sarif'
```

### 2.5 Artifact Management

| Artifact Type | Storage | Retention | Versioning |
|--------------|---------|-----------|------------|
| Build Output | GitHub Artifacts | 30 days | Build number |
| Container Images | GitHub Container Registry | 90 days | Semantic version |
| Database Migrations | S3 Artifact Bucket | 1 year | Migration timestamp |
| Configuration | Encrypted S3 | Indefinite | Environment tag |

---

## 3. Deployment Strategies

### 3.1 Public Website: Blue-Green Deployment

#### Rationale
- Zero-downtime deployment critical for marketing
- Instant rollback capability
- SEO preservation (no 404s during deploy)

#### Implementation

```javascript
// vercel.json - Public Website Configuration
{
  "version": 2,
  "name": "vantus-public-website",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1",
      "headers": {
        "Cache-Control": "public, max-age=0, must-revalidate"
      }
    }
  ],
  "github": {
    "silent": true,
    "autoJobCancelation": true
  },
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.vantus.systems/:path*"
    }
  ]
}
```

#### Blue-Green Process

```
┌─────────────────────────────────────────────────────────────────┐
│                   BLUE-GREEN DEPLOYMENT                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Phase 1: Build Green                                           │
│  ┌─────────┐     ┌─────────┐                                   │
│  │  Blue   │     │ Green   │◄── New version building           │
│  │ (Live)  │     │(Staging)│                                   │
│  └────┬────┘     └─────────┘                                   │
│       │                                                         │
│       │ 100% traffic                                            │
│       ▼                                                         │
│  ┌─────────┐                                                    │
│  │  Users  │                                                    │
│  └─────────┘                                                    │
│                                                                  │
│  Phase 2: Health Check Green                                    │
│  ┌─────────┐     ┌─────────┐                                   │
│  │  Blue   │     │ Green   │◄── Health checks passing          │
│  │ (Live)  │     │(Ready)  │                                   │
│  └────┬────┘     └─────────┘                                   │
│       │                                                         │
│       ▼                                                         │
│  ┌─────────┐                                                    │
│  │  Users  │                                                    │
│  └─────────┘                                                    │
│                                                                  │
│  Phase 3: Switch Traffic                                        │
│  ┌─────────┐     ┌─────────┐                                   │
│  │  Blue   │     │ Green   │◄── 100% traffic                   │
│  │(Standby)│     │ (Live)  │                                   │
│  └─────────┘     └────┬────┘                                   │
│                       │                                         │
│                       ▼                                         │
│                  ┌─────────┐                                    │
│                  │  Users  │                                    │
│                  └─────────┘                                    │
│                                                                  │
│  Phase 4: Decommission Blue (or keep for rollback)             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Rollback Trigger
```bash
#!/bin/bash
# rollback-public-website.sh

DEPLOYMENT_ID=$1

# Instant rollback via Vercel
vercel rollback $DEPLOYMENT_ID --yes

# Verify rollback
curl -s -o /dev/null -w "%{http_code}" https://vantus.systems/health
```

### 3.2 Client Portal: Rolling Deployment

#### Rationale
- Stateful user sessions require gradual transition
- Database compatibility across versions
- User experience continuity

#### Implementation

```javascript
// vercel.json - Client Portal Configuration
{
  "version": 2,
  "name": "vantus-client-portal",
  "buildCommand": "npm run build:portal",
  "framework": "nextjs",
  "regions": ["iad1", "sfo1", "fra1"],
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "crons": [
    {
      "path": "/api/cron/daily-sync",
      "schedule": "0 2 * * *"
    }
  ],
  "env": {
    "NEXT_PUBLIC_SURFACE": "portal"
  }
}
```

#### Rolling Process

```
┌─────────────────────────────────────────────────────────────────┐
│                   ROLLING DEPLOYMENT                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Time    Instance 1    Instance 2    Instance 3    Traffic      │
│  ─────────────────────────────────────────────────────────      │
│  T0      v1.0.0       v1.0.0        v1.0.0        100% v1      │
│                                                                  │
│  T1      v1.1.0       v1.0.0        v1.0.0        33% v1.1     │
│          (draining)                                              │
│                                                                  │
│  T2      v1.1.0       v1.1.0        v1.0.0        66% v1.1     │
│                                                                  │
│  T3      v1.1.0       v1.1.0        v1.1.0        100% v1.1    │
│                                                                  │
│  Session affinity ensures users stay on consistent version      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Admin Portal: Canary Deployment

#### Rationale
- Limited user base (internal/admin only)
- Critical operations require validation
- Gradual exposure to catch issues early

#### Implementation

```javascript
// middleware.ts - Canary Routing
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const canaryCookie = request.cookies.get('canary')
  const userId = request.headers.get('x-user-id')
  
  // Canary: 10% of traffic to new version
  const isCanary = canaryCookie?.value === 'true' || 
                   (userId && hashUserId(userId) % 100 < 10)
  
  if (isCanary && process.env.CANARY_DEPLOYMENT_URL) {
    const url = new URL(request.url)
    url.host = process.env.CANARY_DEPLOYMENT_URL
    return NextResponse.rewrite(url)
  }
  
  return NextResponse.next()
}

function hashUserId(userId: string): number {
  let hash = 0
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash) + userId.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash)
}
```

#### Canary Progression

```
┌─────────────────────────────────────────────────────────────────┐
│                   CANARY DEPLOYMENT                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Stage     Stable    Canary     Criteria        Duration        │
│  ─────────────────────────────────────────────────────────      │
│  Start     100%      0%         -               -              │
│                                                                  │
│  Phase 1   90%       10%        Health checks   15 min         │
│                                                                  │
│  Phase 2   75%       25%        Error rate <1%  30 min         │
│                                                                  │
│  Phase 3   50%       50%        Latency OK      30 min         │
│                                                                  │
│  Phase 4   25%       75%        No alerts       30 min         │
│                                                                  │
│  Phase 5   0%        100%       Full rollout    -              │
│                                                                  │
│  At any phase, if error rate > 1%, automatic rollback          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.4 Database Migrations Strategy

#### Migration Types

| Type | Description | Downtime | Rollback |
|------|-------------|----------|----------|
| **Additive** | Add columns/tables | None | Easy |
| **Destructive** | Remove columns/tables | Required | Hard |
| **Data** | Transform existing data | Minimal | Complex |
| **Index** | Add/remove indexes | Brief | Easy |

#### Backward-Compatible Migration Pattern

```typescript
// migrations/20240222000001_add_user_preferences.ts
import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  // Phase 1: Add new column (nullable)
  await db.schema
    .alterTable('users')
    .addColumn('preferences', 'jsonb')
    .execute()
  
  // Phase 2: Backfill data (can be done asynchronously)
  await db.updateTable('users')
    .set({ preferences: sql`COALESCE(preferences, '{}'::jsonb)` })
    .execute()
  
  // Phase 3: Add constraint (after data is clean)
  // This would be in a subsequent deployment
}

export async function down(db: Kysely<any>): Promise<void> {
  // Rollback: Remove column
  await db.schema
    .alterTable('users')
    .dropColumn('preferences')
    .execute()
}
```

#### Migration Deployment Order

```
┌─────────────────────────────────────────────────────────────────┐
│              DATABASE MIGRATION DEPLOYMENT ORDER                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 1: Deploy backward-compatible app changes                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Public    │  │   Client    │  │    Admin    │             │
│  │  Website    │  │   Portal    │  │   Portal    │             │
│  │   v1.1.0    │  │   v1.1.0    │  │   v1.1.0    │             │
│  │(reads new   │  │(reads new   │  │(reads new   │             │
│  │  col null)  │  │  col null)  │  │  col null)  │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│  Step 2: Run database migrations                                │
│  ┌─────────────────────────────────────────────────┐           │
│  │         MIGRATION: Add nullable column          │           │
│  └─────────────────────────────────────────────────┘           │
│                                                                  │
│  Step 3: Backfill data (background job)                         │
│  ┌─────────────────────────────────────────────────┐           │
│  │         BACKFILL: Populate new column           │           │
│  └─────────────────────────────────────────────────┘           │
│                                                                  │
│  Step 4: Deploy app that requires new column                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   Public    │  │   Client    │  │    Admin    │             │
│  │  Website    │  │   Portal    │  │   Portal    │             │
│  │   v1.2.0    │  │   v1.2.0    │  │   v1.2.0    │             │
│  │(requires   │  │(requires   │  │(requires   │             │
│  │  new col)   │  │  new col)   │  │  new col)   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                  │
│  Step 5: (Later) Make column non-nullable                       │
│  ┌─────────────────────────────────────────────────┐           │
│  │      MIGRATION: Add NOT NULL constraint         │           │
│  └─────────────────────────────────────────────────┘           │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Coordinated Deployment

### 4.1 Cross-Surface Dependency Management

#### Dependency Matrix

| Dependency | Consumer | Type | Breakage Impact |
|------------|----------|------|-----------------|
| Auth API | All surfaces | Hard | Complete outage |
| Database Schema | Portal, Admin | Hard | Data corruption |
| Shared Components | All surfaces | Soft | UI degradation |
| API Contracts | All surfaces | Hard | Feature failures |
| Feature Flags | All surfaces | Soft | Incorrect behavior |

#### Dependency Versioning

```typescript
// lib/api/version.ts
export const API_VERSIONS = {
  auth: 'v2.1.0',
  billing: 'v1.3.0',
  ticketing: 'v1.5.0',
  analytics: 'v1.0.0',
} as const

export const MINIMUM_COMPATIBLE_VERSIONS = {
  auth: 'v2.0.0',
  billing: 'v1.2.0',
  ticketing: 'v1.4.0',
  analytics: 'v1.0.0',
} as const
```

### 4.2 Deployment Ordering

#### Standard Deployment Sequence

```
┌─────────────────────────────────────────────────────────────────┐
│               COORDINATED DEPLOYMENT SEQUENCE                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 1: Database Migrations (if any)                          │
│  ├── Run migrations in maintenance window (if destructive)     │
│  └── Verify migration success                                  │
│                                                                  │
│  Step 2: Shared Services                                        │
│  ├── Deploy auth service updates                               │
│  ├── Deploy API gateway changes                                │
│  └── Verify shared service health                              │
│                                                                  │
│  Step 3: Client Portal                                          │
│  ├── Rolling deployment (affects user-facing features)         │
│  ├── Verify portal health checks                               │
│  └── Validate critical user flows                              │
│                                                                  │
│  Step 4: Admin Portal                                           │
│  ├── Canary deployment (internal users only)                   │
│  ├── Verify admin functions                                    │
│  └── Complete canary progression                               │
│                                                                  │
│  Step 5: Public Website                                         │
│  ├── Blue-green deployment (zero downtime)                     │
│  ├── Verify marketing pages                                    │
│  └── Switch traffic                                            │
│                                                                  │
│  Step 6: Post-Deployment Verification                           │
│  ├── End-to-end smoke tests                                    │
│  ├── Cross-surface integration tests                           │
│  └── Monitoring alert verification                             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Deployment Orchestration Script

```bash
#!/bin/bash
# deploy-coordinated.sh

set -e

VERSION=$1
ENVIRONMENT=$2
SKIP_CONFIRMATION=${3:-false}

echo "🚀 Starting coordinated deployment for version $VERSION to $ENVIRONMENT"

# Pre-deployment checks
./scripts/check-deployment-readiness.sh $VERSION $ENVIRONMENT

# Step 1: Database migrations
if [ -d "migrations/$VERSION" ]; then
  echo "📊 Running database migrations..."
  ./scripts/deploy-migrations.sh $VERSION $ENVIRONMENT
fi

# Step 2: Shared services
echo "🔧 Deploying shared services..."
./scripts/deploy-shared-services.sh $VERSION $ENVIRONMENT

# Step 3: Client Portal (Rolling)
echo "🎫 Deploying Client Portal (Rolling)..."
./scripts/deploy-surface.sh portal $VERSION $ENVIRONMENT --strategy=rolling

# Wait for portal health
./scripts/wait-for-health.sh https://portal.vantus.systems/health

# Step 4: Admin Portal (Canary)
echo "👨‍💼 Deploying Admin Portal (Canary)..."
./scripts/deploy-surface.sh admin $VERSION $ENVIRONMENT --strategy=canary

# Wait for admin health
./scripts/wait-for-health.sh https://admin.vantus.systems/health

# Step 5: Public Website (Blue-Green)
echo "🌐 Deploying Public Website (Blue-Green)..."
./scripts/deploy-surface.sh public $VERSION $ENVIRONMENT --strategy=blue-green

# Wait for public site health
./scripts/wait-for-health.sh https://vantus.systems/health

# Step 6: Post-deployment verification
echo "✅ Running post-deployment verification..."
./scripts/run-smoke-tests.sh $ENVIRONMENT
./scripts/run-integration-tests.sh $ENVIRONMENT

echo "🎉 Coordinated deployment completed successfully!"
```

### 4.3 Feature Flag Coordination

#### Feature Flag Configuration

```typescript
// lib/features/flags.ts
import { createFlagManager } from '@/lib/features/manager'

export const featureFlags = createFlagManager({
  // Public Website Flags
  newHomepageDesign: {
    default: false,
    environments: {
      development: true,
      staging: true,
      production: false,
    },
    rollout: {
      type: 'percentage',
      value: 0,
    },
  },
  
  // Client Portal Flags
  newTicketSystem: {
    default: false,
    environments: {
      development: true,
      staging: true,
      production: false,
    },
    rollout: {
      type: 'user_segment',
      segments: ['beta_users'],
    },
  },
  
  // Admin Portal Flags
  advancedAnalytics: {
    default: false,
    environments: {
      development: true,
      staging: true,
      production: false,
    },
    rollout: {
      type: 'organization',
      organizations: ['vantus-internal'],
    },
  },
})
```

#### Flag Rollout Coordination

```
┌─────────────────────────────────────────────────────────────────┐
│              FEATURE FLAG ROLLOUT SEQUENCE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Phase 1: Development                                           │
│  ├── Enable flag in dev environment                            │
│  ├── Development team testing                                  │
│  └── Fix issues                                                 │
│                                                                  │
│  Phase 2: Staging                                               │
│  ├── Enable flag in staging                                    │
│  ├── QA team validation                                        │
│  ├── Product team sign-off                                     │
│  └── Performance testing (if applicable)                       │
│                                                                  │
│  Phase 3: Production - Internal Only                            │
│  ├── Enable for @vantus.systems emails only                    │
│  ├── Internal dogfooding                                       │
│  └── Monitor for 24-48 hours                                   │
│                                                                  │
│  Phase 4: Production - Beta Users                               │
│  ├── Enable for beta user segment                              │
│  ├── Monitor feedback                                          │
│  └── Monitor error rates                                       │
│                                                                  │
│  Phase 5: Production - Percentage Rollout                       │
│  ├── 1% → 5% → 10% → 25% → 50% → 100%                          │
│  ├── Each step: Monitor for 2-4 hours                          │
│  └── Automatic rollback on error threshold                     │
│                                                                  │
│  Phase 6: General Availability                                  │
│  ├── 100% rollout complete                                     │
│  ├── Clean up old code path                                    │
│  └── Remove feature flag                                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.4 Database Migration Coordination

#### Migration Safety Checklist

- [ ] Migration is backward-compatible
- [ ] Migration has been tested on staging
- [ ] Rollback script is prepared
- [ ] Data backup completed within 4 hours
- [ ] Migration duration estimated and within maintenance window
- [ ] Downtime notification sent (if applicable)
- [ ] Migration runs in transaction (where supported)
- [ ] Post-migration verification queries prepared

#### Migration Rollback Coordination

```typescript
// scripts/migration-coordinator.ts
interface MigrationPlan {
  id: string
  surfaces: string[]
  migrations: string[]
  rollbackOrder: string[]
  verificationQueries: string[]
}

const MIGRATION_PLANS: Record<string, MigrationPlan> = {
  'add-user-preferences': {
    id: 'add-user-preferences',
    surfaces: ['portal', 'admin'],
    migrations: [
      '20240222000001_add_user_preferences',
      '20240222000002_backfill_user_preferences',
    ],
    rollbackOrder: [
      '20240222000002_backfill_user_preferences_rollback',
      '20240222000001_add_user_preferences_rollback',
    ],
    verificationQueries: [
      'SELECT COUNT(*) FROM users WHERE preferences IS NOT NULL',
      'SELECT COUNT(*) FROM users WHERE preferences IS NULL',
    ],
  },
}

export async function coordinateMigration(
  planId: string,
  direction: 'up' | 'down'
): Promise<void> {
  const plan = MIGRATION_PLANS[planId]
  
  // Verify all surfaces are compatible
  for (const surface of plan.surfaces) {
    const version = await getDeployedVersion(surface)
    if (!isCompatibleWithMigration(version, planId)) {
      throw new Error(`Surface ${surface} version ${version} incompatible with migration ${planId}`)
    }
  }
  
  // Execute migrations in order
  const migrations = direction === 'up' ? plan.migrations : plan.rollbackOrder
  
  for (const migration of migrations) {
    console.log(`Running migration: ${migration}`)
    await runMigration(migration, direction)
    
    // Verify after each migration
    await verifyMigration(plan.verificationQueries)
  }
}
```

### 4.5 Rollback Coordination

#### Cross-Surface Rollback Strategy

```
┌─────────────────────────────────────────────────────────────────┐
│               COORDINATED ROLLBACK STRATEGY                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Scenario: Critical bug in Client Portal v1.2.0                │
│                                                                  │
│  Step 1: Assess Impact                                          │
│  ├── Identify affected surfaces                                │
│  ├── Check if database changes involved                        │
│  └── Determine rollback scope                                  │
│                                                                  │
│  Step 2: Execute Rollbacks (Reverse Order)                     │
│  ├── Rollback Public Website first (fastest)                   │
│  ├── Rollback Admin Portal                                     │
│  ├── Rollback Client Portal (source of issue)                  │
│  └── If DB changes: Execute rollback migrations                │
│                                                                  │
│  Step 3: Verify Rollback                                        │
│  ├── All surfaces responding                                   │
│  ├── Cross-surface functionality working                       │
│  └── No error spikes in monitoring                           │
│                                                                  │
│  Step 4: Communication                                          │
│  ├── Update status page                                        │
│  ├── Notify stakeholders                                       │
│  └── Document incident                                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Environment Configuration

### 5.1 Environment Variable Management

#### Configuration Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│              CONFIGURATION HIERARCHY                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Default Values (code)                                       │
│     └── Fallback values defined in config files                │
│                                                                  │
│  2. Environment Files (.env.*)                                  │
│     ├── .env.defaults (shared across all)                      │
│     ├── .env.development                                       │
│     ├── .env.staging                                           │
│     └── .env.production                                        │
│                                                                  │
│  3. Platform Configuration (Vercel)                             │
│     └── Environment variables set in Vercel dashboard          │
│                                                                  │
│  4. Secret Management (1Password/HashiCorp Vault)               │
│     └── Sensitive values injected at runtime                   │
│                                                                  │
│  5. Runtime Overrides                                           │
│     └── Feature flags and dynamic configuration                │
│                                                                  │
│  Precedence: Runtime > Secret > Platform > Files > Defaults    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Environment Configuration Schema

```typescript
// lib/config/schema.ts
import { z } from 'zod'

export const environmentSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'staging', 'production']),
  NEXT_PUBLIC_SURFACE: z.enum(['public', 'portal', 'admin']),
  NEXT_PUBLIC_APP_VERSION: z.string(),
  
  // Database
  DATABASE_URL: z.string().url(),
  DATABASE_URL_READONLY: z.string().url().optional(),
  DATABASE_POOL_SIZE: z.string().transform(Number).default('10'),
  
  // Cache
  REDIS_URL: z.string().url(),
  REDIS_TOKEN: z.string(),
  
  // Authentication
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string().url(),
  
  // Storage
  R2_ACCOUNT_ID: z.string(),
  R2_ACCESS_KEY_ID: z.string(),
  R2_SECRET_ACCESS_KEY: z.string(),
  R2_BUCKET_NAME: z.string(),
  
  // Email
  RESEND_API_KEY: z.string(),
  EMAIL_FROM: z.string().email(),
  
  // Monitoring
  SENTRY_DSN: z.string().url().optional(),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  
  // Feature Flags
  FEATURE_FLAG_PROVIDER: z.enum(['config', 'launchdarkly', 'unleash']).default('config'),
  
  // Third-party APIs
  STRIPE_PUBLIC_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
})

export type Environment = z.infer<typeof environmentSchema>

export function validateEnvironment(): Environment {
  const result = environmentSchema.safeParse(process.env)
  
  if (!result.success) {
    console.error('❌ Environment validation failed:')
    console.error(result.error.format())
    throw new Error('Invalid environment configuration')
  }
  
  return result.data
}
```

### 5.2 Secret Management

#### Secret Rotation Schedule

| Secret Type | Rotation Frequency | Last Rotation | Next Rotation |
|-------------|-------------------|---------------|---------------|
| Database credentials | 90 days | 2026-01-15 | 2026-04-15 |
| API keys | 180 days | 2026-01-01 | 2026-06-30 |
| Auth secrets | 90 days | 2026-01-15 | 2026-04-15 |
| Encryption keys | 365 days | 2025-06-01 | 2026-06-01 |
| TLS certificates | 90 days | 2026-02-01 | 2026-05-01 |

#### Secret Injection Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   SECRET INJECTION FLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐       │
│  │   Secret    │────►│   Vercel    │────►│  Runtime    │       │
│  │   Store     │     │   Project   │     │ Environment │       │
│  │ (1Password) │     │  Settings   │     │   (Node.js) │       │
│  └─────────────┘     └─────────────┘     └─────────────┘       │
│                                                              │
│  1. Secrets stored in 1Password Vaults                        │
│     - Production Secrets vault                               │
│     - Staging Secrets vault                                  │
│     - Development Shared vault                               │
│                                                              │
│  2. CI/CD pipeline syncs to Vercel                            │
│     - ops sync-secrets --environment production               │
│     - Uses 1Password Service Account                          │
│     - Updates Vercel Environment Variables                    │
│                                                              │
│  3. Runtime access                                            │
│     - Server-side: process.env.SECRET                         │
│     - Client-side: Only NEXT_PUBLIC_* vars                    │
│     - Validation on startup                                   │
│                                                              │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 Feature Flag Configuration Per Environment

```yaml
# config/feature-flags.yml
environments:
  development:
    defaults:
      enabled: true
    flags:
      newHomepageDesign: true
      betaFeatures: true
      analyticsDebug: true
      
  staging:
    defaults:
      enabled: false
    flags:
      newHomepageDesign: true
      betaFeatures: true
      analyticsDebug: true
      
  production:
    defaults:
      enabled: false
    flags:
      newHomepageDesign:
        enabled: false
        rollout:
          type: percentage
          value: 0
      betaFeatures:
        enabled: false
        rollout:
          type: user_segment
          segments: [beta_users]
      analyticsDebug:
        enabled: false
```

### 5.4 Database Connection Configuration

#### Connection Pooling

```typescript
// lib/db/connection.ts
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

interface DatabaseConfig {
  primary: string
  replicas?: string[]
  poolSize?: number
  ssl?: boolean
}

export function createDatabaseClient(config: DatabaseConfig) {
  const primaryPool = new Pool({
    connectionString: config.primary,
    max: config.poolSize || 10,
    ssl: config.ssl ? { rejectUnauthorized: false } : false,
    application_name: 'vantus-app',
    statement_timeout: 30000, // 30 seconds
    query_timeout: 25000, // 25 seconds
  })
  
  // Read replica pools (if configured)
  const replicaPools = (config.replicas || []).map(url => 
    new Pool({
      connectionString: url,
      max: Math.floor((config.poolSize || 10) / 2),
      ssl: config.ssl ? { rejectUnauthorized: false } : false,
      application_name: 'vantus-app-read',
    })
  )
  
  return new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: primaryPool,
      onCreateConnection: async (connection) => {
        // Set session variables for monitoring
        await connection.executeQuery(
          `SET application_name = 'vantus-${process.env.NEXT_PUBLIC_SURFACE}'`
        )
      },
    }),
    // Query logging in development
    log: process.env.NODE_ENV === 'development' ? ['query', 'error'] : ['error'],
  })
}
```

#### Environment-Specific Database URLs

| Environment | Primary | Read Replica 1 | Read Replica 2 |
|------------|---------|----------------|----------------|
| Development | `postgresql://dev@localhost/vantus_dev` | - | - |
| Staging | `postgresql://staging@neon/staging` | - | - |
| Production | `postgresql://prod@neon-us-east/prod` | `postgresql://neon-us-west/prod` | `postgresql://neon-eu-west/prod` |

---

## 6. Database Deployment

### 6.1 Migration Strategy

#### Migration Framework

```typescript
// scripts/migrate.ts
import { Kysely, Migrator, FileMigrationProvider } from 'kysely'
import { promises as fs } from 'fs'
import * as path from 'path'

async function migrateToLatest() {
  const db = createDatabaseClient()
  
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, '../migrations'),
    }),
  })
  
  const { error, results } = await migrator.migrateToLatest()
  
  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`✅ Migration ${it.migrationName} executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`❌ Migration ${it.migrationName} failed`)
    }
  })
  
  if (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
  
  await db.destroy()
}

migrateToLatest()
```

#### Migration Naming Convention

```
migrations/
├── 20240222000001_create_users_table.ts
├── 20240222000002_create_tickets_table.ts
├── 20240222000003_add_user_preferences.ts
├── 20240222000004_create_invoices_table.ts
└── README.md

Format: YYYYMMDDHHMMSS_descriptive_name.ts
```

### 6.2 Schema Versioning

#### Schema Version Table

```sql
-- migrations/00000000000000_create_migration_table.ts
CREATE TABLE IF NOT EXISTS kysely_migration (
  name VARCHAR(255) PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS kysely_migration_lock (
  id SERIAL PRIMARY KEY,
  is_locked BOOLEAN DEFAULT FALSE,
  locked_at TIMESTAMPTZ
);
```

#### Schema Version Tracking

| Version | Migration | Applied At | Applied By | Duration |
|---------|-----------|------------|------------|----------|
| 20240222000001 | create_users_table | 2026-02-22 10:00:00 | deploy@ci | 0.5s |
| 20240222000002 | create_tickets_table | 2026-02-22 10:00:01 | deploy@ci | 0.3s |
| 20240222000003 | add_user_preferences | 2026-02-22 14:30:00 | deploy@ci | 2.1s |

### 6.3 Rollback Procedures for Migrations

#### Migration Rollback Script

```typescript
// scripts/rollback.ts
import { Kysely, Migrator } from 'kysely'

async function rollback(migrationName?: string) {
  const db = createDatabaseClient()
  
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, '../migrations'),
    }),
  })
  
  let result
  
  if (migrationName) {
    // Rollback to specific migration
    result = await migrator.migrateTo(migrationName)
  } else {
    // Rollback last migration
    result = await migrator.migrateDown()
  }
  
  if (result.error) {
    console.error('Rollback failed:', result.error)
    process.exit(1)
  }
  
  console.log('Rollback completed successfully')
  await db.destroy()
}

const targetMigration = process.argv[2]
rollback(targetMigration)
```

#### Rollback Safety Procedures

```bash
#!/bin/bash
# rollback-migration.sh

MIGRATION_NAME=$1
ENVIRONMENT=$2

# Pre-rollback checklist
echo "🔍 Pre-rollback verification..."

# 1. Verify backup exists
BACKUP_EXISTS=$(aws s3 ls s3://vantus-backups/$ENVIRONMENT/ | grep $(date +%Y-%m-%d))
if [ -z "$BACKUP_EXISTS" ]; then
  echo "❌ No recent backup found. Aborting rollback."
  exit 1
fi

# 2. Verify all surfaces compatible with rollback
echo "✅ Checking surface compatibility..."
./scripts/check-rollback-compatibility.sh $MIGRATION_NAME

# 3. Create pre-rollback snapshot
echo "📸 Creating pre-rollback snapshot..."
./scripts/create-db-snapshot.sh $ENVIRONMENT "pre-rollback-$MIGRATION_NAME"

# 4. Execute rollback
echo "⏪ Executing rollback to $MIGRATION_NAME..."
npx tsx scripts/rollback.ts $MIGRATION_NAME

# 5. Verify rollback
echo "✅ Verifying rollback..."
./scripts/verify-migration-status.sh

echo "🎉 Migration rollback completed successfully"
```

### 6.4 Data Migration Procedures

#### Large Dataset Migration Pattern

```typescript
// migrations/20240222000005_migrate_large_dataset.ts
import { Kysely, sql } from 'kysely'

const BATCH_SIZE = 1000

export async function up(db: Kysely<any>): Promise<void> {
  // Add new column
  await db.schema
    .alterTable('invoices')
    .addColumn('total_amount_cents', 'bigint')
    .execute()
  
  // Backfill in batches
  let offset = 0
  let hasMore = true
  
  while (hasMore) {
    const batch = await db
      .selectFrom('invoices')
      .select(['id', 'total_amount'])
      .where('total_amount_cents', 'is', null)
      .limit(BATCH_SIZE)
      .execute()
    
    if (batch.length === 0) {
      hasMore = false
      break
    }
    
    // Update batch
    for (const invoice of batch) {
      const cents = Math.round(parseFloat(invoice.total_amount) * 100)
      await db
        .updateTable('invoices')
        .set({ total_amount_cents: cents })
        .where('id', '=', invoice.id)
        .execute()
    }
    
    offset += batch.length
    console.log(`Migrated ${offset} records...`)
    
    // Brief pause to avoid overwhelming the database
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  // After all data is migrated, add NOT NULL constraint
  // (This would be in a separate migration after verification)
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('invoices')
    .dropColumn('total_amount_cents')
    .execute()
}
```

### 6.5 Seed Data Management

#### Seed Data Structure

```
seeds/
├── 000-roles.ts          # System roles
├── 001-admin-users.ts    # Initial admin users
├── 002-plans.ts          # Subscription plans
├── 003-settings.ts       # Default settings
└── development/
    ├── sample-users.ts
    ├── sample-tickets.ts
    └── sample-invoices.ts
```

#### Seed Execution Script

```typescript
// scripts/seed.ts
import { Kysely } from 'kysely'
import * as fs from 'fs'
import * as path from 'path'

async function seed(environment: string) {
  const db = createDatabaseClient()
  
  // Always run core seeds
  const coreSeeds = fs.readdirSync('./seeds')
    .filter(f => f.endsWith('.ts') && !f.startsWith('development'))
    .sort()
  
  for (const seed of coreSeeds) {
    console.log(`Running seed: ${seed}`)
    const seedModule = await import(`../seeds/${seed}`)
    await seedModule.seed(db)
  }
  
  // Run environment-specific seeds
  if (environment === 'development') {
    const devSeeds = fs.readdirSync('./seeds/development')
      .filter(f => f.endsWith('.ts'))
      .sort()
    
    for (const seed of devSeeds) {
      console.log(`Running development seed: ${seed}`)
      const seedModule = await import(`../seeds/development/${seed}`)
      await seedModule.seed(db)
    }
  }
  
  await db.destroy()
  console.log('✅ Seeding completed')
}

seed(process.env.NODE_ENV || 'development')
```

---

## 7. Pre-Deployment Checklist

### 7.1 Code Freeze Procedures

#### Code Freeze Timeline

```
┌─────────────────────────────────────────────────────────────────┐
│                  DEPLOYMENT TIMELINE                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Day -3: Feature Freeze                                         │
│  ├── No new features merged to release branch                  │
│  ├── Bug fixes only with approval                              │
│  └── Release branch created from main                          │
│                                                                  │
│  Day -2: Code Freeze                                            │
│  ├── No new code merged without exception approval             │
│  ├── Critical bug fixes require 2 approvals                    │
│  └── Documentation updates allowed                             │
│                                                                  │
│  Day -1: Deployment Freeze                                      │
│  ├── No merges to release branch                               │
│  ├── Final testing in staging                                  │
│  └── Release notes finalized                                   │
│                                                                  │
│  Day 0: Deployment                                              │
│  ├── Deployment window begins                                  │
│  └── Communication sent to stakeholders                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Code Freeze Enforcement

```yaml
# .github/workflows/code-freeze.yml
name: Code Freeze Enforcement

on:
  pull_request:
    branches: [release/*]

jobs:
  check-freeze:
    runs-on: ubuntu-latest
    steps:
      - name: Check Code Freeze Status
        run: |
          FREEZE_STATUS=$(curl -s https://api.vantus.systems/code-freeze-status)
          
          if [ "$FREEZE_STATUS" = "frozen" ]; then
            echo "🚫 Code freeze is in effect"
            
            # Check if PR has exception label
            if [[ "${{ github.event.pull_request.labels }}" != *"freeze-exception"* ]]; then
              echo "❌ PR does not have freeze-exception label"
              exit 1
            fi
            
            # Verify two approvals for exception
            APPROVALS=$(curl -s \
              -H "Authorization: token ${{ secrets.GITHUB_TOKEN }}" \
              "https://api.github.com/repos/${{ github.repository }}/pulls/${{ github.event.pull_request.number }}/reviews" \
              | jq '[.[] | select(.state == "APPROVED")] | length')
            
            if [ "$APPROVALS" -lt 2 ]; then
              echo "❌ Freeze exception requires 2 approvals, found $APPROVALS"
              exit 1
            fi
          fi
```

### 7.2 Final Testing Requirements

#### Pre-Deployment Test Suite

| Test Category | Required | Automated | Owner |
|--------------|----------|-----------|-------|
| Unit Tests | ✅ | ✅ | Developer |
| Integration Tests | ✅ | ✅ | QA |
| E2E Tests (Critical Paths) | ✅ | ✅ | QA |
| Visual Regression | ✅ | ✅ | QA |
| Security Scan | ✅ | ✅ | Security |
| Performance Benchmark | ✅ | Partial | SRE |
| Accessibility Audit | ✅ | Partial | QA |
| Cross-browser Testing | ✅ | Partial | QA |
| Mobile Responsiveness | ✅ | Partial | QA |

#### Test Execution Checklist

```bash
#!/bin/bash
# pre-deployment-tests.sh

ENVIRONMENT=$1

echo "🧪 Running pre-deployment test suite for $ENVIRONMENT"

# 1. Unit Tests
echo "Running unit tests..."
npm run test:unit -- --coverage --coverageThreshold='{"global":{"branches":80,"functions":80,"lines":80,"statements":80}}'
if [ $? -ne 0 ]; then
  echo "❌ Unit tests failed"
  exit 1
fi

# 2. Integration Tests
echo "Running integration tests..."
npm run test:integration
if [ $? -ne 0 ]; then
  echo "❌ Integration tests failed"
  exit 1
fi

# 3. E2E Tests
echo "Running E2E tests..."
npm run test:e2e:ci
if [ $? -ne 0 ]; then
  echo "❌ E2E tests failed"
  exit 1
fi

# 4. Security Scan
echo "Running security scan..."
npm audit --audit-level=moderate
if [ $? -ne 0 ]; then
  echo "❌ Security audit failed"
  exit 1
fi

# 5. Build Verification
echo "Verifying build..."
npm run build:all
if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

echo "✅ All pre-deployment tests passed"
```

### 7.3 Security Scan Completion

#### Security Scan Requirements

| Scan Type | Tool | Threshold | Blocking |
|-----------|------|-----------|----------|
| Dependency Audit | npm audit | No high/critical | Yes |
| SAST | Semgrep | No high findings | Yes |
| Secret Detection | TruffleHog | No verified secrets | Yes |
| Container Scan | Trivy | No critical CVEs | Yes |
| SCA | Snyk | No high severity | Yes |

### 7.4 Performance Budget Verification

#### Performance Budgets

| Metric | Public Website | Client Portal | Admin Portal |
|--------|----------------|---------------|--------------|
| First Contentful Paint | < 1.2s | < 1.5s | < 1.5s |
| Largest Contentful Paint | < 2.5s | < 2.5s | < 2.5s |
| Time to Interactive | < 3.5s | < 4s | < 4s |
| Cumulative Layout Shift | < 0.1 | < 0.1 | < 0.1 |
| Total Blocking Time | < 200ms | < 300ms | < 300ms |
| First Input Delay | < 100ms | < 100ms | < 100ms |

#### Performance Budget Check

```javascript
// scripts/check-performance-budget.js
const lighthouse = require('lighthouse')
const budgets = {
  public: {
    'first-contentful-paint': 1200,
    'largest-contentful-paint': 2500,
    'total-blocking-time': 200,
    'cumulative-layout-shift': 0.1,
  },
  portal: {
    'first-contentful-paint': 1500,
    'largest-contentful-paint': 2500,
    'total-blocking-time': 300,
    'cumulative-layout-shift': 0.1,
  },
  admin: {
    'first-contentful-paint': 1500,
    'largest-contentful-paint': 2500,
    'total-blocking-time': 300,
    'cumulative-layout-shift': 0.1,
  },
}

async function checkPerformanceBudget(surface, url) {
  const runnerResult = await lighthouse(url, {
    output: 'json',
    onlyCategories: ['performance'],
  })
  
  const audit = runnerResult.lhr.audits
  const budget = budgets[surface]
  let passed = true
  
  for (const [metric, threshold] of Object.entries(budget)) {
    const value = audit[metric]?.numericValue
    
    if (value > threshold) {
      console.error(`❌ ${metric}: ${value}ms (budget: ${threshold}ms)`)
      passed = false
    } else {
      console.log(`✅ ${metric}: ${value}ms (budget: ${threshold}ms)`)
    }
  }
  
  return passed
}
```

### 7.5 Documentation Updates

#### Documentation Checklist

- [ ] CHANGELOG.md updated with release notes
- [ ] API documentation updated (if API changes)
- [ ] Deployment runbook updated (if process changes)
- [ ] Feature flag documentation updated
- [ ] Database schema documentation updated
- [ ] Architecture Decision Records (ADRs) created (if applicable)
- [ ] On-call runbook updated (if operational changes)
- [ ] Status page communication prepared

---

## 8. Deployment Execution

### 8.1 Step-by-Step Deployment Procedures

#### Production Deployment Procedure

```bash
#!/bin/bash
# deploy-production.sh

VERSION=$1
DEPLOYER=$2

# Validate inputs
if [ -z "$VERSION" ] || [ -z "$DEPLOYER" ]; then
  echo "Usage: ./deploy-production.sh <version> <deployer-name>"
  exit 1
fi

echo "🚀 Starting production deployment for version $VERSION"
echo "👤 Deployer: $DEPLOYER"
echo "🕐 Started at: $(date -u +"%Y-%m-%d %H:%M:%S UTC")"

# Step 1: Pre-deployment verification
echo "📋 Step 1: Pre-deployment verification"
./scripts/verify-deployment-readiness.sh $VERSION production
if [ $? -ne 0 ]; then
  echo "❌ Pre-deployment verification failed"
  exit 1
fi

# Step 2: Create deployment record
echo "📊 Step 2: Creating deployment record"
DEPLOYMENT_ID=$(./scripts/create-deployment-record.sh $VERSION $DEPLOYER)
echo "Deployment ID: $DEPLOYMENT_ID"

# Step 3: Database migrations (if any)
echo "📊 Step 3: Database migrations"
if [ -d "migrations/$VERSION" ]; then
  ./scripts/deploy-migrations.sh $VERSION production
  if [ $? -ne 0 ]; then
    echo "❌ Database migration failed"
    ./scripts/mark-deployment-failed.sh $DEPLOYMENT_ID
    exit 1
  fi
fi

# Step 4: Deploy surfaces in order
echo "🚀 Step 4: Deploying surfaces"

# 4a. Client Portal (Rolling)
echo "  → Deploying Client Portal (Rolling)..."
./scripts/deploy-surface.sh portal $VERSION production --strategy=rolling
if [ $? -ne 0 ]; then
  echo "❌ Client Portal deployment failed"
  ./scripts/mark-deployment-failed.sh $DEPLOYMENT_ID
  ./scripts/rollback-surface.sh portal production
  exit 1
fi

# 4b. Admin Portal (Canary)
echo "  → Deploying Admin Portal (Canary)..."
./scripts/deploy-surface.sh admin $VERSION production --strategy=canary
if [ $? -ne 0 ]; then
  echo "❌ Admin Portal deployment failed"
  ./scripts/mark-deployment-failed.sh $DEPLOYMENT_ID
  ./scripts/rollback-surface.sh admin production
  exit 1
fi

# 4c. Public Website (Blue-Green)
echo "  → Deploying Public Website (Blue-Green)..."
./scripts/deploy-surface.sh public $VERSION production --strategy=blue-green
if [ $? -ne 0 ]; then
  echo "❌ Public Website deployment failed"
  ./scripts/mark-deployment-failed.sh $DEPLOYMENT_ID
  ./scripts/rollback-surface.sh public production
  exit 1
fi

# Step 5: Post-deployment verification
echo "✅ Step 5: Post-deployment verification"
./scripts/run-post-deployment-tests.sh production
if [ $? -ne 0 ]; then
  echo "❌ Post-deployment verification failed"
  ./scripts/mark-deployment-failed.sh $DEPLOYMENT_ID
  ./scripts/initiate-rollback.sh $DEPLOYMENT_ID
  exit 1
fi

# Step 6: Mark deployment complete
echo "🎉 Step 6: Deployment complete"
./scripts/mark-deployment-complete.sh $DEPLOYMENT_ID

# Step 7: Communication
echo "📢 Step 7: Sending deployment notifications"
./scripts/notify-deployment-complete.sh $VERSION production

echo "✅ Deployment of version $VERSION to production completed successfully!"
echo "🕐 Completed at: $(date -u +"%Y-%m-%d %H:%M:%S UTC")"
```

### 8.2 Verification Steps

#### Post-Deployment Verification Checklist

```bash
#!/bin/bash
# verify-deployment.sh

ENVIRONMENT=$1

FAILED=0

echo "🔍 Running deployment verification for $ENVIRONMENT"

# 1. Health checks
echo "Checking health endpoints..."
for url in \
  "https://vantus.systems/health" \
  "https://portal.vantus.systems/health" \
  "https://admin.vantus.systems/health"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" $url)
  if [ "$STATUS" != "200" ]; then
    echo "❌ Health check failed: $url (status: $STATUS)"
    FAILED=1
  else
    echo "✅ Health check passed: $url"
  fi
done

# 2. API endpoints
echo "Checking API endpoints..."
for endpoint in \
  "https://portal.vantus.systems/api/v1/status" \
  "https://admin.vantus.systems/api/v1/status"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" $endpoint)
  if [ "$STATUS" != "200" ]; then
    echo "❌ API check failed: $endpoint (status: $STATUS)"
    FAILED=1
  else
    echo "✅ API check passed: $endpoint"
  fi
done

# 3. Database connectivity
echo "Checking database connectivity..."
./scripts/check-database-health.sh $ENVIRONMENT
if [ $? -ne 0 ]; then
  echo "❌ Database health check failed"
  FAILED=1
else
  echo "✅ Database health check passed"
fi

# 4. External integrations
echo "Checking external integrations..."
./scripts/check-integrations.sh $ENVIRONMENT
if [ $? -ne 0 ]; then
  echo "❌ Integration check failed"
  FAILED=1
else
  echo "✅ Integration check passed"
fi

if [ $FAILED -eq 1 ]; then
  echo "❌ Deployment verification failed"
  exit 1
fi

echo "✅ All deployment verification checks passed"
```

### 8.3 Health Checks

#### Health Check Endpoints

```typescript
// app/health/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { redis } from '@/lib/cache'

export async function GET() {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION,
    surface: process.env.NEXT_PUBLIC_SURFACE,
    checks: {} as Record<string, { status: string; responseTime: number }>,
  }
  
  // Database check
  try {
    const dbStart = Date.now()
    await db.selectFrom('health_check').select('id').limit(1).execute()
    checks.checks.database = {
      status: 'healthy',
      responseTime: Date.now() - dbStart,
    }
  } catch (error) {
    checks.checks.database = {
      status: 'unhealthy',
      responseTime: -1,
    }
    checks.status = 'unhealthy'
  }
  
  // Cache check
  try {
    const cacheStart = Date.now()
    await redis.ping()
    checks.checks.cache = {
      status: 'healthy',
      responseTime: Date.now() - cacheStart,
    }
  } catch (error) {
    checks.checks.cache = {
      status: 'unhealthy',
      responseTime: -1,
    }
    checks.status = 'unhealthy'
  }
  
  const statusCode = checks.status === 'healthy' ? 200 : 503
  
  return NextResponse.json(checks, { status: statusCode })
}
```

### 8.4 Smoke Tests

#### Critical Path Smoke Tests

```typescript
// tests/smoke/critical-paths.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Critical Path Smoke Tests', () => {
  test('Public website homepage loads', async ({ page }) => {
    await page.goto('https://vantus.systems')
    await expect(page).toHaveTitle(/Vantus Systems/)
    await expect(page.locator('nav')).toBeVisible()
  })
  
  test('Client portal login works', async ({ page }) => {
    await page.goto('https://portal.vantus.systems/login')
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
  })
  
  test('Client portal dashboard loads', async ({ page }) => {
    // Login first
    await page.goto('https://portal.vantus.systems/login')
    await page.fill('input[name="email"]', process.env.TEST_USER_EMAIL!)
    await page.fill('input[name="password"]', process.env.TEST_USER_PASSWORD!)
    await page.click('button[type="submit"]')
    
    // Verify dashboard
    await page.waitForURL('https://portal.vantus.systems/dashboard')
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible()
  })
  
  test('Admin portal login works', async ({ page }) => {
    await page.goto('https://admin.vantus.systems/login')
    await expect(page.locator('input[name="email"]')).toBeVisible()
  })
  
  test('API health endpoints respond', async ({ request }) => {
    const response = await request.get('https://portal.vantus.systems/api/health')
    expect(response.status()).toBe(200)
    
    const body = await response.json()
    expect(body.status).toBe('healthy')
  })
  
  test('Cross-surface navigation works', async ({ page }) => {
    // From public website to portal
    await page.goto('https://vantus.systems')
    await page.click('a[href="https://portal.vantus.systems"]')
    await expect(page).toHaveURL(/portal\.vantus\.systems/)
  })
})
```

---

## 9. Post-Deployment

### 9.1 Monitoring Requirements

#### Post-Deployment Monitoring Period

| Phase | Duration | Check Frequency | Focus |
|-------|----------|-----------------|-------|
| Critical | 30 minutes | 1 minute | Errors, latency, availability |
| Observation | 2 hours | 5 minutes | Performance, user impact |
| Normal | 24 hours | 15 minutes | Trends, anomalies |

#### Monitoring Dashboard

```yaml
# grafana/dashboards/post-deployment.json (excerpt)
dashboard:
  title: "Post-Deployment Monitoring"
  panels:
    - title: "Error Rate by Surface"
      type: graph
      targets:
        - expr: 'sum(rate(http_requests_total{status=~"5.."}[5m])) by (surface)'
          legendFormat: "{{surface}}"
      alert:
        condition: "A"
        evaluator:
          type: gt
          params: [0.01]  # Alert if > 1% error rate
    
    - title: "P95 Response Time"
      type: graph
      targets:
        - expr: 'histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))'
    
    - title: "Active Users"
      type: singlestat
      targets:
        - expr: 'sum(active_sessions)'
    
    - title: "Deployment Markers"
      type: annotations
      datasource: deployment-annotations
```

### 9.2 Validation Procedures

#### Post-Deployment Validation Script

```bash
#!/bin/bash
# validate-deployment.sh

ENVIRONMENT=$1
DURATION=${2:-3600}  # Default 1 hour

START_TIME=$(date +%s)
END_TIME=$((START_TIME + DURATION))

echo "🔍 Starting post-deployment validation for $ENVIRONMENT"
echo "⏱️  Duration: $DURATION seconds"

while [ $(date +%s) -lt $END_TIME ]; do
  ELAPSED=$(($(date +%s) - START_TIME))
  MINUTES=$((ELAPSED / 60))
  
  echo ""
  echo "=== Validation Check ($MINUTES minutes elapsed) ==="
  
  # Check error rates
  ERROR_RATE=$(curl -s "https://monitoring.vantus.systems/api/v1/query?query=sum(rate(http_requests_total{status=~\"5..\",environment=\"$ENVIRONMENT\"}[5m]))" | jq -r '.data.result[0].value[1] // 0')
  echo "Error Rate (5m): $ERROR_RATE"
  
  if (( $(echo "$ERROR_RATE > 0.01" | bc -l) )); then
    echo "⚠️  WARNING: Error rate exceeds 1%"
  fi
  
  # Check latency
  P95_LATENCY=$(curl -s "https://monitoring.vantus.systems/api/v1/query?query=histogram_quantile(0.95,rate(http_request_duration_seconds_bucket{environment=\"$ENVIRONMENT\"}[5m]))" | jq -r '.data.result[0].value[1] // 0')
  echo "P95 Latency: ${P95_LATENCY}s"
  
  if (( $(echo "$P95_LATENCY > 1.0" | bc -l) )); then
    echo "⚠️  WARNING: P95 latency exceeds 1s"
  fi
  
  # Sleep for next check
  sleep 300  # 5 minutes
done

echo "✅ Post-deployment validation complete"
```

### 9.3 Rollback Decision Criteria

#### Automatic Rollback Triggers

| Metric | Threshold | Duration | Action |
|--------|-----------|----------|--------|
| Error Rate | > 5% | 2 minutes | Page on-call |
| Error Rate | > 10% | 1 minute | Auto-rollback |
| P95 Latency | > 5s | 5 minutes | Page on-call |
| Availability | < 99% | 2 minutes | Auto-rollback |
| Failed Health Checks | > 3 | Immediate | Auto-rollback |

#### Rollback Decision Flowchart

```
┌─────────────────────────────────────────────────────────────────┐
│              ROLLBACK DECISION FLOWCHART                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐                                                 │
│  │   Alert     │                                                 │
│  │  Triggered  │                                                 │
│  └──────┬──────┘                                                 │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────┐                                                 │
│  │   Auto-     │────Yes────┐                                    │
│  │  rollback?  │            │                                    │
│  └─────────────┘            ▼                                    │
│         │              ┌─────────┐                               │
│         No             │ Rollback│                               │
│         │              │  Now    │                               │
│         │              └─────────┘                               │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────┐                                                 │
│  │   Page      │                                                 │
│  │  On-call?   │────Yes─────────────┐                           │
│  └─────────────┘                     │                           │
│         │                            ▼                           │
│         No                    ┌──────────┐                       │
│         │                     │ On-call  │                       │
│         │                     │ Response │                       │
│         │                     └────┬─────┘                       │
│         │                          │                             │
│         │                          ▼                             │
│         │                   ┌────────────┐                       │
│         │                   │  Rollback  │                       │
│         │                   │  Decision  │                       │
│         │                   └─────┬──────┘                       │
│         │                         │                              │
│         │              ┌─────────┼─────────┐                    │
│         │              │                   │                    │
│         │             Yes                  No                   │
│         │              │                   │                    │
│         │              ▼                   ▼                    │
│         │         ┌─────────┐       ┌──────────┐               │
│         │         │Rollback │       │ Continue │               │
│         │         │Execute  │       │Monitor   │               │
│         │         └─────────┘       └──────────┘               │
│         │                                                        │
│         ▼                                                        │
│  ┌─────────────┐                                                 │
│  │   Log       │                                                 │
│  │  Incident   │                                                 │
│  └─────────────┘                                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 9.4 Post-Deployment Testing

#### Post-Deployment Test Suite

```typescript
// tests/post-deployment/validation.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Post-Deployment Validation', () => {
  test('All surfaces return correct version header', async ({ request }) => {
    const surfaces = [
      { url: 'https://vantus.systems', name: 'public' },
      { url: 'https://portal.vantus.systems', name: 'portal' },
      { url: 'https://admin.vantus.systems', name: 'admin' },
    ]
    
    for (const surface of surfaces) {
      const response = await request.get(surface.url)
      const version = response.headers()['x-app-version']
      
      expect(version).toBeDefined()
      expect(version).toMatch(/^\d+\.\d+\.\d+$/)
      
      console.log(`${surface.name}: version ${version}`)
    }
  })
  
  test('Database migrations applied correctly', async () => {
    // Verify latest migration
    const result = await db
      .selectFrom('kysely_migration')
      .select('name')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .execute()
    
    const latestMigration = result[0]?.name
    expect(latestMigration).toMatch(process.env.EXPECTED_MIGRATION || /.*/)
  })
  
  test('Feature flags loaded correctly', async ({ page }) => {
    await page.goto('https://portal.vantus.systems/login')
    
    // Check feature flags are available
    const flags = await page.evaluate(() => {
      return (window as any).__FEATURE_FLAGS__
    })
    
    expect(flags).toBeDefined()
  })
})
```

---

## 10. Rollback Procedures

### 10.1 When to Rollback

#### Rollback Triggers

| Severity | Condition | Response Time | Action |
|----------|-----------|---------------|--------|
| Critical | Complete outage | Immediate | Auto-rollback |
| Critical | Data corruption | Immediate | Auto-rollback |
| High | > 10% error rate | 2 minutes | Auto-rollback |
| High | Security breach | Immediate | Auto-rollback |
| Medium | > 5% error rate | 15 minutes | Manual decision |
| Medium | Performance degradation | 30 minutes | Manual decision |
| Low | Minor UI issues | 2 hours | Patch forward |

### 10.2 Rollback Procedures Per Surface

#### Public Website Rollback

```bash
#!/bin/bash
# rollback-public.sh

echo "🔄 Rolling back Public Website..."

# Get previous production deployment
PREVIOUS_DEPLOYMENT=$(vercel list vantus.systems --prod -1 | grep -E '^\s+[a-z0-9]+' | head -2 | tail -1 | awk '{print $1}')

echo "Previous deployment: $PREVIOUS_DEPLOYMENT"

# Instant rollback via Vercel
vercel rollback $PREVIOUS_DEPLOYMENT --yes --scope=vantus

# Verify rollback
echo "Verifying rollback..."
sleep 10

HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://vantus.systems/health)
if [ "$HEALTH_STATUS" == "200" ]; then
  echo "✅ Public Website rollback successful"
else
  echo "❌ Public Website rollback verification failed (status: $HEALTH_STATUS)"
  exit 1
fi
```

#### Client Portal Rollback

```bash
#!/bin/bash
# rollback-portal.sh

echo "🔄 Rolling back Client Portal..."

# Rolling rollback - gradually shift traffic back
PREVIOUS_DEPLOYMENT=$(vercel list portal.vantus.systems --prod -1 | grep -E '^\s+[a-z0-9]+' | head -2 | tail -1 | awk '{print $1}')

echo "Previous deployment: $PREVIOUS_DEPLOYMENT"

# Set canary to 0% for new deployment, 100% for previous
echo "Shifting traffic to previous deployment..."
vercel deploy --prebuilt --target=production --meta rollback=true

# Gradual traffic shift
for PERCENTAGE in 25 50 75 100; do
  echo "Shifting $PERCENTAGE% traffic to rollback version..."
  ./scripts/set-canary-percentage.sh portal $PERCENTAGE
  sleep 60
  
  # Verify health at each step
  HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://portal.vantus.systems/health)
  if [ "$HEALTH_STATUS" != "200" ]; then
    echo "❌ Health check failed at $PERCENTAGE%, aborting rollback"
    exit 1
  fi
done

echo "✅ Client Portal rollback successful"
```

#### Admin Portal Rollback

```bash
#!/bin/bash
# rollback-admin.sh

echo "🔄 Rolling back Admin Portal..."

# Similar to portal but faster due to internal users only
PREVIOUS_DEPLOYMENT=$(vercel list admin.vantus.systems --prod -1 | grep -E '^\s+[a-z0-9]+' | head -2 | tail -1 | awk '{print $1}')

echo "Previous deployment: $PREVIOUS_DEPLOYMENT"

# Immediate rollback for admin (internal users)
vercel rollback $PREVIOUS_DEPLOYMENT --yes --scope=vantus

# Verify rollback
echo "Verifying rollback..."
sleep 5

HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://admin.vantus.systems/health)
if [ "$HEALTH_STATUS" == "200" ]; then
  echo "✅ Admin Portal rollback successful"
else
  echo "❌ Admin Portal rollback verification failed (status: $HEALTH_STATUS)"
  exit 1
fi
```

### 10.3 Data Consistency During Rollback

#### Data Consistency Procedures

```typescript
// scripts/verify-data-consistency.ts
import { db } from '@/lib/db'

interface ConsistencyCheck {
  name: string
  query: string
  expectedResult: any
}

const CONSISTENCY_CHECKS: ConsistencyCheck[] = [
  {
    name: 'Users count',
    query: 'SELECT COUNT(*) as count FROM users',
    expectedResult: { count: 'number' },
  },
  {
    name: 'Active tickets',
    query: 'SELECT COUNT(*) as count FROM tickets WHERE status != \'closed\'',
    expectedResult: { count: 'number' },
  },
  {
    name: 'Recent invoices',
    query: 'SELECT COUNT(*) as count FROM invoices WHERE created_at > NOW() - INTERVAL \'24 hours\'',
    expectedResult: { count: 'number' },
  },
]

export async function verifyDataConsistency(): Promise<boolean> {
  console.log('🔍 Running data consistency checks...')
  
  let passed = true
  
  for (const check of CONSISTENCY_CHECKS) {
    try {
      const result = await db.executeQuery(check.query)
      console.log(`✅ ${check.name}: ${JSON.stringify(result.rows[0])}`)
    } catch (error) {
      console.error(`❌ ${check.name} failed:`, error)
      passed = false
    }
  }
  
  return passed
}
```

### 10.4 Communication During Rollback

#### Rollback Communication Template

```markdown
**Subject: [ROLLBACK INITIATED] Vantus Systems - $SURFACE - $VERSION**

**Status:** 🔴 Rollback in Progress

**Impact:** $SURFACE has been rolled back to version $PREVIOUS_VERSION

**Timeline:**
- $TIME: Issue detected
- $TIME: Rollback initiated
- $TIME: Rollback completed

**Current Status:**
- ✅ Service restored
- ✅ All health checks passing
- 👥 Monitoring for stability

**Next Steps:**
- Root cause analysis in progress
- Incident review scheduled for $TIME
- Fix will be deployed after thorough testing

**Questions?** Contact the on-call engineer: $ON_CALL_EMAIL
```

---

## 11. Emergency Deployment

### 11.1 Hotfix Procedures

#### Hotfix Deployment Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                   HOTFIX DEPLOYMENT FLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Create hotfix branch from production tag                   │
│     git checkout -b hotfix/PROD-123 v1.2.0                     │
│                                                                  │
│  2. Apply fix                                                   │
│     [Make minimal changes]                                      │
│     git commit -m "HOTFIX: Fix critical login issue"           │
│                                                                  │
│  3. Fast-track testing                                          │
│     - Unit tests (required)                                    │
│     - Security scan (required)                                 │
│     - E2E critical paths (required)                            │
│     - Full regression (skip for critical hotfix)               │
│                                                                  │
│  4. Deploy to staging for validation                           │
│     - 15-minute validation window                              │
│     - Smoke tests only                                         │
│                                                                  │
│  5. Deploy to production                                       │
│     - Bypass normal deployment window                          │
│     - Deploy all surfaces simultaneously                       │
│     - Continuous monitoring                                    │
│                                                                  │
│  6. Post-hotfix                                                 │
│     - Merge hotfix to main                                     │
│     - Tag release v1.2.1                                       │
│     - Document incident                                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Hotfix Deployment Script

```bash
#!/bin/bash
# deploy-hotfix.sh

HOTFIX_BRANCH=$1
TICKET=$2

echo "🔥 Deploying hotfix from $HOTFIX_BRANCH for $TICKET"

# Verify hotfix branch
if [[ ! "$HOTFIX_BRANCH" =~ ^hotfix/ ]]; then
  echo "❌ Branch must start with 'hotfix/'"
  exit 1
fi

# Fast-track CI
echo "Running fast-track CI..."
git checkout $HOTFIX_BRANCH
npm run test:unit
npm run test:critical-paths
npm audit --audit-level=high

# Deploy to staging
echo "Deploying to staging..."
./scripts/deploy-surface.sh all $HOTFIX_BRANCH staging
./scripts/run-smoke-tests.sh staging

# Immediate production deploy
echo "🚨 Deploying to production (hotfix)..."
read -p "Confirm production hotfix deployment (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo "Deployment cancelled"
  exit 1
fi

./scripts/deploy-surface.sh all $HOTFIX_BRANCH production

# Verify
./scripts/run-smoke-tests.sh production

echo "✅ Hotfix deployed successfully"

# Merge to main
echo "Merging hotfix to main..."
git checkout main
git merge --no-ff $HOTFIX_BRANCH -m "Merge hotfix: $TICKET"
git push origin main

# Tag release
VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
git tag -a "v$VERSION" -m "Hotfix release v$VERSION - $TICKET"
git push origin "v$VERSION"
```

### 11.2 Security Patch Deployment

#### Security Patch Priority Levels

| Severity | CVE Score | Response Time | Deployment |
|----------|-----------|---------------|------------|
| Critical | 9.0-10.0 | 1 hour | Emergency |
| High | 7.0-8.9 | 4 hours | Expedited |
| Medium | 4.0-6.9 | 24 hours | Normal |
| Low | 0.1-3.9 | 7 days | Scheduled |

#### Security Patch Procedure

```bash
#!/bin/bash
# deploy-security-patch.sh

CVE_ID=$1
SEVERITY=$2

echo "🔒 Deploying security patch for $CVE_ID ($SEVERITY)"

# Create security patch branch
git checkout -b "security/$CVE_ID" main

# Update dependencies
npm audit fix --force

# Test
echo "Running security tests..."
npm run test:unit
npm run test:security

# Deploy based on severity
case $SEVERITY in
  critical)
    echo "🚨 Critical security patch - deploying immediately"
    ./scripts/deploy-hotfix.sh "security/$CVE_ID" "$CVE_ID"
    ;;
  high)
    echo "⚠️  High severity - deploying within 4 hours"
    ./scripts/schedule-deployment.sh "security/$CVE_ID" "4h"
    ;;
  medium|low)
    echo "📅 Standard deployment schedule"
    ./scripts/create-pr.sh "security/$CVE_ID"
    ;;
esac
```

### 11.3 Breaking Change Deployment

#### Breaking Change Procedure

```
┌─────────────────────────────────────────────────────────────────┐
│              BREAKING CHANGE DEPLOYMENT                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Pre-Deployment (1-2 weeks before)                              │
│  ├── Customer communication sent                               │
│  ├── Documentation updated                                     │
│  ├── Migration guide published                                 │
│  └── Deprecation warnings added                                │
│                                                                  │
│  Deployment Day                                                 │
│  ├── Maintenance window scheduled                              │
│  ├── Database migrations (with downtime)                       │
│  ├── API version switchover                                    │
│  ├── All surfaces deployed                                     │
│  └── Verification tests                                        │
│                                                                  │
│  Post-Deployment                                                │
│  ├── Monitor for issues (extended period)                      │
│  ├── Support team on standby                                   │
│  └── Customer success outreach                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 12. Deployment Monitoring

### 12.1 Deployment Metrics

#### Key Deployment Metrics

| Metric | Target | Alert Threshold | Measurement |
|--------|--------|-----------------|-------------|
| Deployment Frequency | 2x/day | N/A | Deployments per day |
| Lead Time for Changes | < 4 hours | > 8 hours | Commit to production |
| Change Failure Rate | < 5% | > 10% | Failed deployments / total |
| Mean Time to Recovery | < 30 min | > 1 hour | Detection to recovery |
| Deployment Duration | < 15 min | > 30 min | Start to finish |
| Rollback Rate | < 2% | > 5% | Rollbacks / deployments |

#### Deployment Dashboard

```yaml
# Datadog/ Grafana dashboard configuration
dashboard:
  title: "Deployment Metrics"
  widgets:
    - title: "Deployments per Day"
      type: timeseries
      query: "count(deployment_events{status='success'})"
    
    - title: "Change Failure Rate"
      type: query_value
      query: |
        (
          count(deployment_events{status='failed'}) 
          / 
          count(deployment_events)
        ) * 100
      format: percent
    
    - title: "Mean Time to Recovery"
      type: timeseries
      query: |
        avg(
          rollback_events{timestamp} - 
          deployment_events{status='failed',timestamp}
        )
      format: duration
```

### 12.2 Error Tracking During Deployment

#### Deployment Error Tracking

```typescript
// lib/monitoring/deployment-errors.ts
import * as Sentry from '@sentry/nextjs'

interface DeploymentContext {
  version: string
  surface: string
  deploymentId: string
  previousVersion: string
}

export function initializeDeploymentTracking(context: DeploymentContext) {
  Sentry.setContext('deployment', {
    version: context.version,
    surface: context.surface,
    deployment_id: context.deploymentId,
    previous_version: context.previousVersion,
  })
  
  // Track deployment start
  Sentry.captureMessage('Deployment started', {
    level: 'info',
    tags: {
      deployment_phase: 'start',
      surface: context.surface,
    },
  })
}

export function trackDeploymentError(
  error: Error,
  context: Partial<DeploymentContext>
) {
  Sentry.captureException(error, {
    tags: {
      deployment_phase: 'error',
      surface: context.surface,
    },
    contexts: {
      deployment: context,
    },
  })
}

export function finalizeDeploymentTracking(
  success: boolean,
  context: DeploymentContext
) {
  Sentry.captureMessage(
    success ? 'Deployment completed' : 'Deployment failed',
    {
      level: success ? 'info' : 'error',
      tags: {
        deployment_phase: success ? 'complete' : 'failed',
        surface: context.surface,
      },
    }
  )
}
```

### 12.3 Performance Monitoring

#### Performance Regression Detection

```typescript
// lib/monitoring/performance-baseline.ts
interface PerformanceBaseline {
  metric: string
  p50: number
  p95: number
  p99: number
}

const BASELINES: Record<string, PerformanceBaseline> = {
  'page_load_home': { p50: 800, p95: 1500, p99: 2500 },
  'page_load_dashboard': { p50: 1200, p95: 2000, p99: 3500 },
  'api_response_tickets': { p50: 100, p95: 300, p99: 500 },
  'api_response_invoices': { p50: 150, p95: 400, p99: 700 },
}

export function checkPerformanceRegression(
  metric: string,
  value: number
): { isRegression: boolean; severity: 'none' | 'warning' | 'critical' } {
  const baseline = BASELINES[metric]
  
  if (!baseline) {
    return { isRegression: false, severity: 'none' }
  }
  
  if (value > baseline.p99 * 1.5) {
    return { isRegression: true, severity: 'critical' }
  }
  
  if (value > baseline.p95 * 1.2) {
    return { isRegression: true, severity: 'warning' }
  }
  
  return { isRegression: false, severity: 'none' }
}
```

### 12.4 User Impact Monitoring

#### User Impact Metrics

| Metric | Description | Target | Alert |
|--------|-------------|--------|-------|
| Active Sessions | Concurrent users | Baseline + 10% | Drop > 20% |
| Session Duration | Average session length | Baseline | Drop > 30% |
| Error Rate by User | Errors per user session | < 1% | > 3% |
| Task Completion Rate | % of users completing key flows | > 80% | < 70% |
| Support Tickets | New tickets related to functionality | < 5/day | > 10/day |

#### User Impact Alert

```typescript
// lib/monitoring/user-impact.ts
interface UserImpactMetrics {
  activeSessions: number
  errorRate: number
  taskCompletionRate: number
  supportTicketVelocity: number
}

const BASELINES = {
  activeSessions: 1000,
  errorRate: 0.01,
  taskCompletionRate: 0.85,
  supportTicketVelocity: 2,
}

export function assessUserImpact(metrics: UserImpactMetrics): {
  impact: 'none' | 'low' | 'medium' | 'high'
  actions: string[]
} {
  const actions: string[] = []
  let severity = 0
  
  // Check active sessions
  const sessionDrop = (BASELINES.activeSessions - metrics.activeSessions) / BASELINES.activeSessions
  if (sessionDrop > 0.2) {
    severity += 3
    actions.push('Significant drop in active sessions detected')
  } else if (sessionDrop > 0.1) {
    severity += 1
    actions.push('Moderate drop in active sessions')
  }
  
  // Check error rate
  if (metrics.errorRate > 0.05) {
    severity += 3
    actions.push('Critical error rate detected')
  } else if (metrics.errorRate > 0.03) {
    severity += 2
    actions.push('Elevated error rate detected')
  }
  
  // Check task completion
  if (metrics.taskCompletionRate < 0.7) {
    severity += 2
    actions.push('Task completion rate below threshold')
  }
  
  // Determine impact level
  let impact: 'none' | 'low' | 'medium' | 'high'
  if (severity >= 5) impact = 'high'
  else if (severity >= 3) impact = 'medium'
  else if (severity >= 1) impact = 'low'
  else impact = 'none'
  
  return { impact, actions }
}
```

---

## Appendices

### Appendix A: Deployment Runbook Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│              QUICK REFERENCE COMMANDS                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Standard Deployment                                            │
│  ./deploy-production.sh <version> <deployer>                   │
│                                                                  │
│  Hotfix Deployment                                              │
│  ./deploy-hotfix.sh <branch> <ticket>                          │
│                                                                  │
│  Rollback                                                       │
│  ./rollback-surface.sh <surface> <environment>                 │
│                                                                  │
│  Verify Deployment                                              │
│  ./verify-deployment.sh <environment>                          │
│                                                                  │
│  Database Migration                                             │
│  ./deploy-migrations.sh <version> <environment>                │
│                                                                  │
│  Health Check                                                   │
│  curl https://<surface>/health                                  │
│                                                                  │
│  Emergency Contacts                                             │
│  On-Call: oncall@vantus.systems                                 │
│  Escalation: escalation@vantus.systems                          │
│  Status Page: https://status.vantus.systems                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Appendix B: Deployment Checklist Summary

#### Pre-Deployment
- [ ] All tests passing
- [ ] Security scan clear
- [ ] Performance budget met
- [ ] Documentation updated
- [ ] Rollback plan ready
- [ ] Maintenance window scheduled (if needed)

#### During Deployment
- [ ] Database migrations applied
- [ ] Each surface deployed in order
- [ ] Health checks passing
- [ ] Smoke tests passing
- [ ] Monitoring active

#### Post-Deployment
- [ ] All health checks passing
- [ ] Error rates normal
- [ ] Performance metrics acceptable
- [ ] No user impact alerts
- [ ] Deployment marked complete
- [ ] Team notified

### Appendix C: Glossary

| Term | Definition |
|------|------------|
| **Blue-Green Deployment** | Technique with two identical environments, switching traffic between them |
| **Canary Deployment** | Gradual rollout to a subset of users before full deployment |
| **Rolling Deployment** | Gradual replacement of instances with new version |
| **Feature Flag** | Toggle to enable/disable features without code deployment |
| **RTO** | Recovery Time Objective - target time to restore service |
| **RPO** | Recovery Point Objective - maximum acceptable data loss |
| **Smoke Test** | Basic test to verify critical functionality |
| **Hotfix** | Emergency fix deployed outside normal schedule |

---

**Document Control**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-22 | Platform Engineering | Initial release |

---

*This document is confidential and proprietary to Vantus Systems. Unauthorized distribution is prohibited.*
