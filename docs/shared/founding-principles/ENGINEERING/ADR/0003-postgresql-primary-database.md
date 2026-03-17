# ADR-0003: PostgreSQL as Primary Database

**Document ID:** ADR-0003  
**Status:** Accepted  
**Date:** 2026-01-25  
**Owners:** Dylan Thompson (Founder/CTO)  
**Context:** All Vantus applications requiring relational data  
**Stakeholders:** Backend engineers, database administrators  

---

## Summary

### Problem Statement
We need a reliable, performant, self-hostable database that supports complex queries, ACID transactions, and can scale with our clients' growth.

### Decision
We standardize on **PostgreSQL** as our primary relational database for all applications.

### Impact
High — affects data modeling, hosting decisions, and operational procedures.

---

## Context

### Background
Our clients' data is their most valuable asset. We need a database that is:
- Proven and reliable (decades of production use).
- Self-hostable (no cloud vendor lock-in).
- Feature-rich (JSON, full-text search, GIS if needed).
- Well-supported (tools, documentation, talent pool).

### Goals
- Data integrity through ACID transactions.
- Complex query support for reporting.
- JSON flexibility for evolving schemas.
- Self-hosting capability on standard VPS.
- Strong backup and replication support.

### Constraints
- Must work with Prisma ORM.
- Must support row-level security.
- Must have good TypeScript integration.
- Must be cost-effective for small deployments.

---

## Decision

### What We Decided
All Vantus applications use PostgreSQL 15+ as their primary database.

**Key Configuration:**
- Row-level security enabled.
- Connection pooling (PgBouncer) for production.
- Automated daily backups with point-in-time recovery.
- Read replicas for reporting (when needed).

### Why This Decision

| Factor | How PostgreSQL Addresses It |
|--------|----------------------------|
| **Reliability** | 25+ years of production use. Proven stability. |
| **Self-hosting** | Open source, runs anywhere. No vendor lock-in. |
| **Features** | JSONB, full-text search, GIS extensions. |
| **Performance** | Excellent query optimizer. Scales vertically well. |
| **Ecosystem** | Prisma, countless tools, large talent pool. |
| **Cost** | Free, runs on small VPS for small clients. |

---

## Options Considered

### Option 1: PostgreSQL

**Description:** Open-source relational database.

**Pros:**
- Industry standard for reliability.
- Feature-rich (JSON, arrays, custom types).
- Excellent documentation.
- Large talent pool.
- Self-hostable.

**Cons:**
- Vertical scaling limits (horizontal requires effort).
- More complex than MySQL for simple use cases.
- Requires tuning for high performance.

**Verdict:** Selected

---

### Option 2: MySQL / MariaDB

**Description:** Popular open-source relational database.

**Pros:**
- Widely used, good documentation.
- Simpler setup than PostgreSQL.
- Good replication story.

**Cons:**
- Less feature-rich than PostgreSQL.
- Historically less strict with data integrity.
- Oracle ownership concerns (MySQL).

**Verdict:** Rejected — PostgreSQL has better features and stricter integrity.

---

### Option 3: MongoDB

**Description:** Document-oriented NoSQL database.

**Pros:**
- Flexible schema.
- Good for rapid prototyping.
- Horizontal scaling built-in.

**Cons:**
- Eventual consistency (not ACID by default).
- More complex for relational data.
- Self-hosting is complex (replica sets required).
- Smaller talent pool for complex queries.

**Verdict:** Rejected — relational data is more common; ACID is required.

---

### Option 4: SQLite

**Description:** Embedded file-based database.

**Pros:**
- Zero configuration.
- Fast for single-user applications.
- Perfect for local development.

**Cons:**
- Not suitable for concurrent write workloads.
- Limited tooling for production operations.
- No user management.

**Verdict:** Rejected — only for development, never production.

---

## Consequences

### Positive
- Consistent database across all projects.
- Rich feature set for complex requirements.
- Strong hiring pool.
- Excellent tooling ecosystem.

### Negative
- Must learn PostgreSQL-specific features.
- Vertical scaling has limits (mitigated by read replicas).
- More complex than simpler databases for basic use cases.

### Neutral / Changes Required
- Standardize on PostgreSQL 15+.
- Create database backup/restore procedures.
- Document PostgreSQL-specific optimizations.

---

## Implementation Plan

### Phase 1: New Projects
- **Deliverable:** All new projects use PostgreSQL.
- **Owner:** All engineers.
- **Timeline:** Immediate (2026-01-25).

### Phase 2: Standardized Setup
- **Deliverable:** Docker Compose setup for local development.
- **Owner:** Platform team.
- **Timeline:** 2026-02-28.

### Phase 3: Production Hardening
- **Deliverable:** Terraform/Ansible configs for production PostgreSQL.
- **Owner:** DevOps.
- **Timeline:** 2026-03-31.

---

## Rollback Plan

### When to Rollback
If a specific client need requires a different database (documented exception).

### How to Rollback
1. Document specific need requiring alternative.
2. Get approval from Dylan Thompson.
3. Create migration plan.
4. Execute with full testing.

---

## Monitoring and Review

### Success Metrics
- All projects on PostgreSQL 15+.
- Zero data loss incidents.
- Query performance meets SLAs.

### Review Schedule
- **Initial review:** 2026-04-25 (90 days).
- **Regular review:** Annually.

---

## References

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Prisma PostgreSQL Connector](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [PostgreSQL vs MySQL Comparison](https://www.postgresql.org/about/)

---

## Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| **Decision Owner** | Dylan Thompson | 2026-01-25 | ✓ |

---

## Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-25 | Dylan Thompson | Initial acceptance |

[End of ADR-0003]
