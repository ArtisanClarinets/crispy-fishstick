# nextjs-CLAUDE.md
A reusable, security-first, scalable, and highly maintainable operating guide for Claude Code when working in any Next.js codebase
(app repo or the Next.js framework monorepo).

---

## 0) Non-negotiables (highest priority)

### Security (always #1)
- Never expose secrets or sensitive data to the client.
- Enforce authorization on the server (Route Handlers / Server Actions / middleware) — never “client-only” security.
- Validate and sanitize all untrusted input at the boundary.
- Use safe defaults (least privilege, deny-by-default, explicit allow lists).
- Keep dependencies minimal and patched; do not add packages casually.

### Scalability
- Prefer patterns that support growth: clear module boundaries, testable units, predictable data access, and explicit contracts.
- Avoid “clever” abstractions; optimize for long-term maintainability over short-term speed.

### Usability (end-user + developer usability)
- Accessible UI by default (semantic HTML, keyboard support, ARIA only when needed).
- Clear error states, loading states, empty states.
- Developer ergonomics: consistent structure, naming, docs, and repeatable scripts.

---

## 1) Source of truth
When making decisions, prefer:
1) Official Next.js docs and established Next.js patterns.
2) Existing patterns in THIS repository (consistency beats preference).
3) Small, incremental changes over large refactors.

If uncertain:
- Search within the repo first (ripgrep).
- Prefer the simplest change that matches current architecture.

---

## 2) How Claude should work in this repo (workflow)
Before writing or changing code:
1. Identify whether this is:
   - A Next.js **application repo** (typical `app/` or `pages/`), OR
   - The **Next.js framework monorepo** (has `packages/next`, `turbopack/`, `crates/`, `test/`).
2. Read the relevant configs:
   - `package.json` scripts, `tsconfig.json`, `next.config.*`, lint config, test config.
3. Locate the “edges”:
   - Auth/session handling, API boundaries, data access layer, env var conventions.
4. Propose a minimal plan:
   - List files you’ll touch and what will change.
5. Implement with the smallest safe diff.
6. Run the closest, fastest checks first (unit/lint targeted tests), then broader checks only if needed.
7. Update docs/tests so another developer can understand and maintain the change.

Definition of done for any change:
- Secure by design
- Tested appropriately
- Linted / type-checked
- Documented (README, comments, or ADR when warranted)
- No dead code, no TODOs without owner/context

---

## 3) Next.js application standards (use for typical app repos)

### 3.1 Routing & rendering
- Prefer the **App Router** (`app/`) for new work.
- Default to **Server Components**; add `"use client"` only when truly required:
  - local state, effects, browser-only APIs, event handlers that must run client-side.
- Keep Client Components “leafy”:
  - Push data fetching and heavy logic upward to Server Components when possible.
- Use `loading.tsx`, `error.tsx`, `not-found.tsx` thoughtfully for UX and resilience.

### 3.2 Data fetching, caching, revalidation
- Prefer `fetch()` on the server with explicit caching semantics:
  - Use `force-cache`, `no-store`, or `revalidate` intentionally.
- Do not accidentally cache per-user or sensitive responses.
- Separate:
  - **Public cacheable** data (safe to cache)
  - **User-specific** data (typically `no-store` or keyed revalidation)
- Avoid “global mutable singletons” for request-scoped data.

### 3.3 Server Actions & Route Handlers
- Treat Server Actions/Route Handlers as public attack surfaces:
  - Validate inputs (schema validation) at the boundary.
  - Authorization checks before any data access/mutation.
  - Rate limit where relevant (especially auth, password reset, expensive queries).
- Never return secrets or internal error details to the client.
- Prefer structured errors and safe messages.

### 3.4 Environment variables & secrets
- Only `NEXT_PUBLIC_*` may be exposed to the browser — everything else stays server-only.
- Provide `.env.example` (no real secrets).
- Validate required env vars at startup on the server (fail fast).

### 3.5 Security headers baseline
- Disable `x-powered-by` unless there is a strong reason not to.
- Add a baseline set of security headers for all routes:
  - CSP (prefer nonce-based for scripts when feasible)
  - `X-Frame-Options` or CSP `frame-ancestors`
  - `Referrer-Policy`
  - `X-Content-Type-Options: nosniff`
  - `Permissions-Policy` (restrict powerful APIs by default)
- Keep CSP maintainable: centralize policy construction and document exceptions.

### 3.6 XSS, injection, and unsafe rendering
- Avoid `dangerouslySetInnerHTML`. If unavoidable:
  - sanitize with a proven sanitizer,
  - restrict allowed tags/attributes,
  - add tests.
- Never interpolate untrusted input into:
  - SQL, shell commands, HTML, URLs, headers, redirects without validation/encoding.

### 3.7 Authentication & session handling
- Prefer HttpOnly, Secure cookies for session tokens.
- Avoid storing tokens in `localStorage`.
- Enforce authorization on the server for every protected route/action.
- Ensure logout invalidates session server-side where possible.

### 3.8 Accessibility & UX
- Every interactive element must be keyboard accessible.
- Form inputs must have labels; errors must be announced appropriately.
- Loading states should be stable (avoid layout shifts).
- Provide empty states and offline/error fallbacks for network dependencies.

---

## 4) Code style & maintainability standards (all repos)

### 4.1 TypeScript
- Use TypeScript with strictness enabled where feasible.
- Avoid `any`. If you must, constrain it and document why.
- Prefer explicit return types for exported functions and public APIs.

### 4.2 Folder & module boundaries
- Keep modules cohesive and single-purpose.
- Do not create “misc utils” dumping grounds.
- Prefer clear ownership boundaries:
  - `lib/` for pure utilities,
  - `services/` for external integrations,
  - `components/` for UI,
  - `server/` for server-only logic (if app repo),
  - `db/` or `data/` for data access.

### 4.3 Naming & conventions
- Clear, descriptive names over abbreviations.
- Keep files small; refactor before complexity becomes unreviewable.
- Prefer composition over inheritance.

### 4.4 Documentation
- Update README when adding scripts, env vars, or workflows.
- Add inline comments only for “why”, not “what”.
- Use ADRs (Architecture Decision Records) for significant shifts in approach.

---

## 5) Testing standards

### 5.1 General
- Add tests for:
  - security boundaries (authz checks, input validation),
  - regressions (bug fixes must fail without the fix),
  - critical rendering/data paths.

### 5.2 Waiting & flake resistance
- Never use arbitrary `setTimeout` sleeps in tests.
- Prefer polling helpers (`retry`) and assertion-based waits.

### 5.3 Test data & fixtures
- Prefer real fixture directories over inline file objects when tests become non-trivial.
- Keep fixtures minimal but realistic.

---

## 6) Dependency policy (security + maintainability)
Before adding a dependency:
- Justify why built-in platform/Next.js APIs aren’t enough.
- Prefer widely adopted, well-maintained libraries.
- Verify license compatibility.
- Pin responsibly via lockfile; do not hand-edit lockfiles.
- Avoid dependencies that run postinstall scripts unless needed and reviewed.

---

## 7) Git & PR workflow (choose the mode used by this repo)

### 7.1 If this repo uses Graphite stacks
- Use Graphite commands for branch/stack operations.
- Avoid workflows that lose state during restacks (no stash-based juggling).
- After stack operations, always verify with `git status -sb` and confirm diffs.

### 7.2 If this repo uses standard git/GitHub CLI
- Use small, reviewable commits.
- Commit messages: imperative, concise, describe “what/why”.
- PR description must include:
  - what changed,
  - why,
  - risks,
  - test plan,
  - screenshots (UI changes).

### 7.3 Never add AI/co-author footers
- Do not add “Generated with …” or co-author footers to commits or PRs.

---

## 8) Next.js framework monorepo mode (use ONLY when repo matches Next.js core)

If this repo contains `packages/next/`, `turbopack/`, `crates/`, and `test/`, follow these additionally:

### 8.1 Codebase map (quick orientation)
- `packages/next/src/` — main framework source
- `packages/next/src/server/` — server runtime
- `packages/next/src/client/` — client runtime
- `packages/next/src/build/` — build tooling
- `test/` — all test suites

### 8.2 Build & dev commands (trust `package.json` scripts as truth)
- Build everything (root): `pnpm build`
- Dev (root): `pnpm dev`
- Build just the `next` package: `pnpm --filter=next build`
- Dev just the `next` package: `pnpm --filter=next dev`

> NOTE: If a doc mentions a command that doesn’t exist in `package.json`, treat it as stale and confirm the correct script before using it.

### 8.3 Testing commands (common)
- `pnpm test-dev-turbo <path>` — dev mode with Turbopack
- `pnpm test-dev-webpack <path>` — dev mode with Webpack
- `pnpm test-start-turbo <path>` — production build+start with Turbopack
- `pnpm test-start-webpack <path>` — production build+start with Webpack
- `pnpm test-unit` — unit tests
- `pnpm testonly <path-or-pattern>` — run jest in-band without full rebuild steps (fast iteration)

### 8.4 Test utilities note (important)
- The `check()` helper is deprecated. Prefer `retry()` + assertions.

### 8.5 Lint/types
- `pnpm lint`
- `pnpm lint-fix`
- `pnpm types`

---

## 9) Security review checklist (run mentally before finalizing)
- [ ] Are secrets server-only (no accidental client exposure)?
- [ ] Are authz checks enforced server-side on every protected action/route?
- [ ] Is all untrusted input validated at the boundary?
- [ ] Are headers/CSP configured appropriately for the feature?
- [ ] Are errors safe (no internal leaks)?
- [ ] Are dependencies justified and patched?

---

## 10) Scalability & usability checklist
- [ ] Does this scale with more routes/features without becoming tangled?
- [ ] Are module boundaries clean and discoverable?
- [ ] Would a new dev know where to add the next related change?
- [ ] Are loading/error/empty states handled?
- [ ] Is accessibility maintained (keyboard, labels, focus, ARIA)?

---

## 11) What to do when instructions conflict
Priority order:
1) Security requirements in this file
2) Repo’s existing patterns + tests
3) Official Next.js docs guidance
4) Personal preference

When in doubt, pick the safer and simpler approach and document the tradeoff.


---

## 12) When to add a new dependency
- If it’s a dev dependency, it’s fine.
- If it’s a prod dependency, it must be justified by a clear need and be patched to the latest version.