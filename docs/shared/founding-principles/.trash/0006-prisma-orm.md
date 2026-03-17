# ADR-0006: Prisma as Object-Relational Mapper (ORM)

**Document ID:** ADR-0006  
**Status:** Accepted  
**Date:** 2026-02-03  
**Owners:** Dylan Thompson (Founder/CTO)  
**Context:** All Vantus database-driven applications  
**Stakeholders:** Backend engineers, database administrators  

---

## Summary

### Problem Statement
Raw SQL is error-prone and difficult to maintain. We need a type-safe ORM that supports PostgreSQL well and integrates with our TypeScript codebase.

### Decision
We standardize on **Prisma** as our ORM for all database interactions.

### Impact
High — affects all database code, schema management, and developer workflow.

---

## Context

### Background
Database access is critical and error-prone. Raw SQL in TypeScript loses type safety. We need an ORM that provides:
- Type-safe database queries.
- Automatic migration generation.
- Good developer experience.
- Strong PostgreSQL support.

### Goals
- Type safety from database to frontend.
- Automated schema migrations.
- Excellent developer experience.
- Strong PostgreSQL support.
- No runtime SQL injection vulnerabilities.

### Constraints
- Must work with Next.js.
- Must support PostgreSQL advanced features (JSON, arrays).
- Must have good TypeScript integration.
- Must support connection pooling.

---

## Decision

### What We Decided
All Vantus applications use Prisma for database access.

**Key Practices:**
- Prisma schema is the single source of truth.
- Migrations generated via `prisma migrate`.
- Client extensions for custom logic.
- Connection pooling via PgBouncer in production.

### Why This Decision

| Factor | How Prisma Addresses It |
|--------|------------------------|
| **Type safety** | Auto-generated types match database schema. |
| **Developer experience** | Excellent VS Code extension, clear error messages. |
| **Migrations** | Automatic migration generation and execution. |
| **PostgreSQL** | Full support for advanced features. |
| **Security** | Parameterized queries prevent SQL injection. |

---

## Options Considered

### Option 1: Prisma

**Description:** Modern ORM with schema-first approach.

**Pros:**
- Excellent TypeScript support.
- Great developer experience.
- Auto-generated migrations.
- Strong PostgreSQL support.
- Active development.

**Cons:**
- Not as mature as some alternatives.
- Migration conflicts can be tricky in teams.
- Some advanced PostgreSQL features need raw queries.

**Verdict:** Selected

---

### Option 2: Drizzle

**Description:** Lightweight, SQL-like ORM.

**Pros:**
- Very lightweight.
- SQL-like syntax.
- Good performance.

**Cons:**
- Newer, smaller community.
- Migration tooling less mature.
- Less documentation.

**Verdict:** Rejected — too new, prefer more mature option.

---

### Option 3: TypeORM

**Description:** Popular TypeScript ORM with decorators.

**Pros:**
- Very popular, widely used.
- Flexible architecture.
- Mature ecosystem.

**Cons:**
- Documentation can be confusing.
- Maintenance issues in past.
- More complex than Prisma.

**Verdict:** Rejected — Prisma has better developer experience.

---

### Option 4: Raw SQL with Zod

**Description:** Write raw SQL, validate with Zod.

**Pros:**
- No abstraction overhead.
- Full PostgreSQL feature access.
- No ORM learning curve.

**Cons:**
- Manual type safety.
- No automatic migrations.
- More error-prone.

**Verdict:** Rejected — too much manual work, error-prone.

---

## Consequences

### Positive
- Type-safe database access throughout the codebase.
- Faster development with auto-generated types.
- Easier schema evolution with migrations.

### Negative
- Team must learn Prisma conventions.
- Migration conflicts require coordination in teams.
- Some edge cases require raw SQL.

### Neutral / Changes Required
- Add Prisma to all projects.
- Set up migration workflow.
- Document Prisma best practices.

---

## Implementation Plan

### Phase 1: Adoption
- **Deliverable:** All new projects use Prisma.
- **Owner:** All backend engineers.
- **Timeline:** Immediate (2026-02-03).

### Phase 2: Migration
- **Deliverable:** Existing projects migrated to Prisma.
- **Owner:** Project leads.
- **Timeline:** As projects are updated.

### Phase 3: Standards
- **Deliverable:** Prisma schema conventions documented.
- **Owner:** Platform team.
- **Timeline:** 2026-03-15.

---

## Rollback Plan

### When to Rollback
If Prisma introduces breaking changes that are unmanageable, or better ORM emerges.

### How to Rollback
1. Generate final migration from Prisma.
2. Document current schema.
3. Migrate to alternative ORM or raw SQL.

---

## Monitoring and Review

### Success Metrics
- All projects using Prisma.
- Zero SQL injection vulnerabilities.
- Developer satisfaction with database workflow.

### Review Schedule
- **Initial review:** 2026-05-03 (90 days).
- **Regular review:** Annually.

---

## References

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Prisma with Next.js](https://www.prisma.io/nextjs)
- [DATABASE_SCHEMA.md](/docs/app-documentation/05-DATABASE-SCHEMA.md)

---

## Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| **Decision Owner** | Dylan Thompson | 2026-02-03 | ✓ |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-03 | Dylan Thompson | Initial acceptance |

[End of ADR-0006]
