# Engineering Charter — Architecture Overview

**Document ID:** VS-ENG-301  
**Version:** 2.1.0  
**Effective Date:** February 2, 2026  
**Audience:** Senior Engineers, Architects, Technical Stakeholders  
**Owner:** Dylan Thompson, Founder & CTO  

---

## Our Architectural Philosophy

We practice **High-Durability Architecture (HDA)**. Our systems are designed for three things:

1. **Ownership & Control:** You can move, modify, or replace any part without asking permission.
2. **Scalability:** The system grows with your business without fundamental rewrites.
3. **Maintainability:** Future engineers can understand and modify the code without guesswork.

We optimize for "boring" over "clever." A system that is easy to understand is easier to secure, debug, and extend.

---

## The Three Pillars

### Pillar 1: Predictable Logic (Functional Core)

**Principle:** Pure functions and immutable data. Side effects isolated to specific layers.

**What this means:**
- Business logic is in pure functions (same input = same output).
- No hidden state changes.
- Side effects (database calls, API requests) happen in explicit service layers.

**Example:**
```typescript
// Good: Pure function, easy to test
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// Bad: Side effect hidden in calculation
function calculateTotal(items: Item[]): number {
  logToDatabase('calculation started'); // Hidden side effect!
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
```

---

### Pillar 2: Boundary Hardening (Zero-Trust)

**Principle:** Assume all boundaries are hostile. Verify everything.

**What this means:**
- Every input is validated at the boundary.
- No action without verified identity and proper authorization.
- Treat external services as potentially compromised.

**Implementation:**
- **Input Validation:** Zod schemas for all external data.
- **Authentication:** Identity verified on every request.
- **Authorization:** Role checks at the API/Server Action level.
- **Output Encoding:** Prevent XSS and injection attacks.

---

### Pillar 3: State Decentralization

**Principle:** Keep state where it belongs. Do not create global monoliths.

**Server State (Data from APIs/Database):**
- Managed by TanStack Query (React Query).
- Cached intelligently.
- Invalidated when data changes.

**Client State (UI-only state):**
- Minimalist approach.
- Zustand for cross-component state.
- React useState for component-local state.
- No "prop drilling" (passing props through many layers).

**URL State (Navigation state):**
- Use query parameters for shareable/filterable views.
- Keeps state in the URL, not in memory.

---

## Repository Structure (Feature-Sliced Design)

We follow **Feature-Sliced Design (FSD)** to prevent the "spaghetti code" that kills projects.

### The Layers (Bottom to Top)

```
shared/       → Reusable utilities, UI primitives
entities/     → Business models (User, Order, Product)
features/     → User actions (add-to-cart, create-server)
widgets/      → UI blocks combining features (Header, Dashboard)
pages/        → Page compositions
app/          → Next.js routing (entry points only)
```

### The Import Rule
**You can only import from layers below you.**

| Layer | Can Import From | Cannot Import From |
|-------|-----------------|-------------------|
| `shared` | (nothing below) | `entities`, `features`, `widgets`, `pages`, `app` |
| `entities` | `shared` | `features`, `widgets`, `pages`, `app`, other `entities` |
| `features` | `shared`, `entities` | `widgets`, `pages`, `app`, other `features` |
| `widgets` | `shared`, `entities`, `features` | `pages`, `app`, other `widgets` |
| `pages` | `shared`, `entities`, `features`, `widgets` | `app`, other `pages` |
| `app` | All layers | (nothing above) |

**Why this matters:** Circular dependencies make code impossible to reason about. This rule prevents them.

---

## The Client-Controlled Stack

Our default technology stack optimized for independence and longevity.

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type safety and documentation |
| **Tailwind CSS** | Utility-first styling |
| **Shadcn UI** | Accessible component primitives |
| **TanStack Query** | Server state management |
| **Zustand** | Client state management |

### Backend
| Technology | Purpose |
|------------|---------|
| **Next.js Server Actions** | API endpoints and mutations |
| **Prisma** | Database ORM and schema |
| **PostgreSQL** | Primary database |
| **Redis** | Caching and sessions |

### Infrastructure
| Technology | Purpose |
|------------|---------|
| **NGINX** | Reverse proxy, TLS termination |
| **Docker** | Containerization |
| **Ubuntu LTS** | Server operating system |
| **Let's Encrypt** | Free SSL certificates |

---

## Infrastructure Design Principles

### The Vantus Seed

Every new project starts from a "seed"—a pre-hardened baseline including:
- Content Security Policy (CSP) headers.
- CORS policies configured.
- Health check endpoints.
- Security headers (HSTS, X-Frame-Options, etc.).
- Basic logging and monitoring hooks.

### Host Independence

We design systems that can move between hosts easily.
- Infrastructure as Code (IaC) for all environments.
- No vendor-specific services without explicit client approval.
- Containerized applications (Docker) for portability.

### Service Isolation

Failures should not cascade.
- Each service runs in its own container.
- Resource limits prevent one service from consuming all resources.
- Circuit breakers prevent cascading failures.

---

## When to Write an Architecture Decision Record (ADR)

An ADR is required for any decision that is:
- Expensive to change later.
- Not obvious to a new team member.
- Controversial or has significant trade-offs.

### Required ADR Topics

1. **Authentication Changes**
   - New identity provider.
   - Session strategy changes.
   - Multi-factor authentication approach.

2. **Data Model Changes**
   - New database technology.
   - Schema changes requiring complex migration.
   - Changes to data retention policies.

3. **Third-Party Integrations**
   - Adding any external service to the critical path.
   - Payment processors.
   - External APIs for core functionality.

4. **Caching Strategy**
   - Edge caching (CDN).
   - Incremental Static Regeneration (ISR).
   - Distributed caching (Redis).

5. **Deployment Architecture**
   - Multi-region setup.
   - Blue-green deployment strategy.
   - New hosting provider.

### ADR Format

See `/docs/company-docs/founding-principles/ENGINEERING/ADR/0000-template.md`

---

## Scalability Guidelines

### Horizontal vs. Vertical

**Prefer horizontal scaling** (more servers) over vertical scaling (bigger servers).
- Statelessness: Any request can be handled by any server.
- Session storage in Redis, not server memory.
- File storage in object storage (S3-compatible), not local disk.

### Database Scaling

**Phase 1: Single Database**
- Single PostgreSQL instance.
- Read replicas for reporting queries.
- Connection pooling (PgBouncer).

**Phase 2: Partitioning**
- Partition large tables by date or tenant.
- Archive old data to cold storage.

**Phase 3: Distributed (Rarely Needed)**
- Only for truly massive scale.
- Consider carefully—distributed databases are complex.

---

## Anti-Patterns (What Not to Do)

### The "God Object"
One class/file that knows too much. Violates separation of concerns.

**Solution:** Split into focused, single-responsibility modules.

### "Magic" Auto-Configuration
Implicit behavior that is hard to trace and debug.

**Solution:** Explicit configuration. Be verbose about what is happening.

### Premature Optimization
Building for scale you do not have yet.

**Solution:** Build for current needs + 10x. Optimize when metrics show a bottleneck.

### "Not Invented Here" Syndrome
Rejecting proven solutions to build your own.

**Solution:** Use battle-tested libraries. Customize only where necessary.

---

## Architecture Review Process

### When Review Is Required
- New projects (before any code is written).
- Major feature additions (estimate > 2 weeks).
- Any ADR-worthy decision.

### Review Board
- Dylan Thompson (Founder/CTO) — mandatory.
- Senior engineer on the project — mandatory.
- Optional: Client technical representative.

### Review Output
- Approved with minor feedback.
- Approved with required changes.
- Rejected (requires significant rework).

---

## Document Changelog

| Version | Date | Changes |
|---------|------|---------|
| 2.0.0 | Feb 2, 2026 | Initial document |
| 2.1.0 | Feb 21, 2026 | Terminology update: Replaced "Owner-Controlled Systems" principle with "Ownership & Control" and "The Owner-Controlled Systems Stack" with "The Client-Controlled Stack" to align with updated brand positioning |

---

**Questions about architecture?** Contact: dylan.thompson@vantus.systems

[End of Document VS-ENG-301]


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
