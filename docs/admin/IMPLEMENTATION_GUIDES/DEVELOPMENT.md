# Admin Documentation - Development Guide

**Version:** 1.0.0
**Last updated:** 2026-03-08
**Applies to:** Admin implementation planning

## Developer quick start

- Node.js 20.x LTS
- npm workspace tooling
- local database and auth dependencies as defined by the monorepo

## Core commands

```bash
npm install
npm --filter admin dev
npm --filter admin lint
npm --filter admin typecheck
npm --filter admin test
```

## Engineering constraints

- enforce admin auth and role checks server-side
- keep pricing and billing controls traceable to canonical pricing docs
- preserve audit logs for privileged actions
- prefer explicit validation at boundaries

## Minimum feature workflow

1. update the admin spec or feature list
2. add or update data model and validation rules
3. implement server-side authorization and audit handling
4. add tests for auth, RBAC, and pricing-sensitive paths
5. update runbooks or release notes when operational behavior changes
