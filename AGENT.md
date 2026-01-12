# AGENT.md — Vantus Systems Coding Agent Contract (Project SENTINEL)

You are an autonomous coding agent operating on this repository.
Your #1 mandate is: **logic must NEVER break** and **everything must remain properly wired together**.

This codebase is a premium, security-forward Next.js 16 + React 19 App Router system with:
- public site (`app/(site)/*`)
- admin portal (`app/(admin)/admin/*`)
- admin APIs (`app/api/admin/*`)
- Prisma data layer + NextAuth JWT auth
- hardened security: same-origin + CSRF, strict CSP/headers, nonce plumbing, audit logs, and tenancy rules.

You must behave like you are shipping directly to production at a Fortune-500 standard.

---

## Prime Directives (non-negotiable)
1) **Logic must NEVER break.**
2) **Security first:** RBAC, CSRF, CSP/nonce, tenant isolation, secrets hygiene.
3) **Server is the control plane:** client checks are UI-only; server enforces.
4) **No scope creep:** Only update/add code required to satisfy the task.
5) **No stealth refactors:** if not required, do not do it.
6) **No regressions:** maintain build/lint/test gates.

If instructions conflict: **Security → Correctness → Wiring → Repo conventions → UX/Perf**.

---

## Anti Intent-Drift / Anti Alignment-Drift Lock
Before changes, always output:
- **Goal (1–2 lines)**
- **Acceptance criteria**
- **Invariants** (what must not regress)
- **Plan** (files to touch)
Then proceed.

If the user request is ambiguous:
- pick the safest minimal assumption,
- proceed,
- document the assumption explicitly.

---

## Wiring Integrity Protocol (MUST FOLLOW)
For any non-trivial change, you MUST verify:

### 1) Framework wiring (Next.js 16)
- Confirm required entrypoints exist and are active.
- Next.js 16 uses **`proxy.ts`** as the request interception boundary (not middleware). :contentReference[oaicite:5]{index=5}
  - Ensure a functioning `proxy.ts` exists at repo root (or `src/proxy.ts` if using `src/` layout). :contentReference[oaicite:6]{index=6}
  - Keep interception centralized; do NOT split into multiple proxy entrypoints. :contentReference[oaicite:7]{index=7}
  - Pass information from Proxy to the app via **headers/cookies/redirects/rewrites/URL** (no globals). :contentReference[oaicite:8]{index=8}

### 2) Surface boundaries
- Do not mix surfaces:
  - Public: `app/(site)`
  - Admin: `app/(admin)/admin`
  - APIs: `app/api/admin`
- If you add a route, link it appropriately and ensure navigation coherency.

### 3) API wiring
- Admin API reads: `adminRead`
- Admin API writes: `adminMutation` (must enforce same-origin + CSRF + RBAC + audit metadata)
- UI calling admin APIs must use the repo’s CSRF-aware fetch helper (where present).

### 4) Data wiring
- Any Prisma schema changes must include:
  - updated Zod schemas at boundaries,
  - updated queries,
  - tenant scoping enforcement,
  - migration/generate steps as appropriate.

### 5) Audit wiring
- Any privileged mutation must have an audit event:
  - preferably via `adminMutation` audit metadata,
  - otherwise explicit audit log call with redaction.

### 6) Tests & gates wiring
- Run and pass:
  - `npm run lint`
  - `npm run test`
  - `npm run build`
- Add/adjust tests if you changed critical flows (auth/admin/tenancy/audit).

---

## Security Rules (Hard Requirements)
- Never weaken CSP/headers. Never add `unsafe-inline` scripts.
- Mutations must remain protected with same-origin + CSRF (unless a documented webhook exception).
- Never log secrets/tokens. Redact sensitive values.
- Never allow cross-tenant access by ID alone; always scope by tenant context.

---

## Output Format (required)
1) **What changed** (file-by-file)
2) **Why it changed**
3) **Wiring confirmation** (entrypoints/routes/API/data/security/audit/tests)
4) **How to verify** (exact commands + smoke steps)

---

## Stop Conditions
You are only done when:
- Acceptance criteria are met
- Wiring protocol passes
- Security invariants hold
- lint/test/build pass (or failures are explicitly explained with a safe rollback path)
