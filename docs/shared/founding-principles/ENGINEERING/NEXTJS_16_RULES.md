# Engineering Charter — Next.js 16 / React 19 Standard

**Document ID:** VS-ENG-302  
**Version:** 2.0.0  
**Effective Date:** February 2, 2026  
**Applies to:** All Vantus-Built Next.js Applications  
**Owner:** Dylan Thompson, Founder & CTO

---

## Our Stance: Bleeding Edge, Hard Recovery

We use the latest stable Next.js and React features. But we do not sacrifice safety for novelty.

**Rule:** New features are allowed only if:

1. They are in a stable release (no beta or canary for production).
2. We have a rollback plan.
3. They are documented in a project-specific ADR.

---

## Component Strategy: Server-By-Default

### React Server Components (RSC) Are Our Default

Server Components run on the server. They:

- Access databases directly.
- Keep secrets safe (no client exposure).
- Send less JavaScript to the browser (faster pages).

### When to Use `'use client'`

Client Components run in the browser. Use them only when necessary:

| Use Case                            | Directive                    |
| ----------------------------------- | ---------------------------- |
| Event handlers (onClick, onSubmit)  | `'use client'`               |
| Browser APIs (localStorage, window) | `'use client'`               |
| React hooks (useState, useEffect)   | `'use client'`               |
| Animations (GSAP, Framer Motion)    | `'use client'`               |
| Data fetching from APIs             | Server Component (preferred) |
| Database queries                    | Server Component (required)  |

### The Rule

**Start with a Server Component.** Add `'use client'` only when you hit a browser-only requirement.

### Data Fetching Pattern

```typescript
// Good: Server Component fetches data
// page.tsx (Server Component)
async function DashboardPage() {
  const data = await db.query('SELECT * FROM users'); // Server-side
  return <Dashboard data={data} />;
}

// Bad: Client Component fetching on mount
// page.tsx ('use client')
function DashboardPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(setData); // Unnecessary round-trip
  }, []);
  return <Dashboard data={data} />;
}
```

---

## The "Proxy-Only" Networking Mandate

### File Naming Convention

We use proxy.ts instead of middleware.ts for clarity.

**Why:** the old middleware naming suggests "do anything anywhere," while the proxy naming makes the network boundary explicit.

### What the proxy layer handles

- Redirects (HTTP → HTTPS, www → non-www).
- Rewrites (internal routing).
- Header injection (security headers).
- Geographic redirects (if needed).

### What the proxy layer does not handle

- Authentication logic (do this in Server Actions).
- Session management (do this in Server Actions).
- Business logic (keep it in the application layer).

**Reason:** Edge middleware runs on every request. Complex logic here slows everything down and creates "magic" that is hard to debug.

---

## Async API Architecture

### Next.js 16 Async Standard

In Next.js 16, dynamic segments, search params, cookies, and headers are Promises. You must await them.

```typescript
// Correct: Await params in Next.js 16
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <div>Post: {slug}</div>;
}

// Correct: Await searchParams
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return <div>Search: {q}</div>;
}
```

### React Compiler

We enable the React Compiler (formerly React Forget) when available.

- It automatically memoizes components.
- No more manual `useMemo` / `useCallback` in most cases.
- Ensures zero hydration mismatches.

---

## Data Fetching & Actions

### Server Actions for Mutations

All data mutations (create, update, delete) use Server Actions.

```typescript
// actions.ts
"use server";

import { z } from "zod";
import { requireRole } from "~/shared/lib/auth";
import { db } from "~/shared/lib/db";

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

export async function createUser(formData: FormData) {
  // 1. Auth check
  await requireRole("admin");

  // 2. Validate input
  const data = createUserSchema.parse({
    email: formData.get("email"),
    name: formData.get("name"),
  });

  // 3. Execute
  await db.user.create({ data });

  // 4. Revalidate cache
  revalidatePath("/users");
}
```

### The SafeAction Pattern

Every Server Action must:

1. Validate input with Zod.
2. Check authentication/authorization.
3. Execute the operation.
4. Handle errors gracefully.

### Form State Handling

Use `useActionState` (React 19) for form submissions:

```typescript
'use client';

import { useActionState } from 'react';
import { createUser } from './actions';

export function UserForm() {
  const [state, formAction, isPending] = useActionState(createUser, {
    success: false,
    error: null,
  });

  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <input name="name" required />
      <button disabled={isPending}>
        {isPending ? 'Creating...' : 'Create User'}
      </button>
      {state.error && <p className="error">{state.error}</p>}
    </form>
  );
}
```

---

## Kinetic Design & Asset Loading

### Animation Loading

All GSAP, Framer Motion, or heavy animation libraries must be dynamically imported with `ssr: false`.

```typescript
import dynamic from 'next/dynamic';

const AnimatedHero = dynamic(() => import('./AnimatedHero'), {
  ssr: false,
  loading: () => <div className="hero-placeholder" />,
});
```

**Why:** Animation libraries add significant JavaScript. Do not load them for the initial render.

### Image Optimization

Always use `next/image`:

```typescript
import Image from 'next/image';

// Good: Optimized, lazy-loaded, responsive
<Image
  src="/hero.jpg"
  alt="Team working"
  width={1200}
  height={600}
  priority // For above-the-fold images
/>

// Bad: Unoptimized, no lazy loading
<img src="/hero.jpg" alt="Team working" />
```

### Font Loading

Self-host all fonts via `next/font`:

```typescript
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

// In layout.tsx
<html className={GeistSans.variable}>
```

**Why:** Self-hosted fonts do not leak visitor data to Google or Adobe. They load faster and work offline.

---

## Security & Hygiene

### Experimental Features

Allowed only if:

1. Documented in a project-specific ADR.
2. Has a rollback path.
3. Client explicitly accepts the risk.

### Environment Variables

Strict separation:

| Prefix         | Where Available | Use For                                     |
| -------------- | --------------- | ------------------------------------------- |
| `NEXT_PUBLIC_` | Client + Server | Public config (analytics ID, feature flags) |
| (no prefix)    | Server only     | Secrets (API keys, database URLs)           |

**Never:**

- Put secrets in `NEXT_PUBLIC_` variables.
- Log environment variables.
- Commit `.env` files.

### Bundle Budget

Maximum 250KB of JavaScript for initial page load (compressed).

Monitor with:

```bash
npm run analyze
```

---

## Caching Strategy

### fetch() Caching

In Next.js 16, `fetch` requests are **not cached by default.** Be explicit:

```typescript
// Cache this request (good for static data)
const data = await fetch("/api/data", {
  cache: "force-cache",
});

// Revalidate periodically (ISR pattern)
const data = await fetch("/api/data", {
  next: { revalidate: 3600 }, // 1 hour
});

// Never cache (dynamic data)
const data = await fetch("/api/data", {
  cache: "no-store",
});
```

### Route Segment Config

```typescript
// For static pages
export const dynamic = "force-static";

// For dynamic pages
export const dynamic = "force-dynamic";

// For ISR
export const revalidate = 3600;
```

---

## Error Handling

### Error Boundaries

Create error boundaries for graceful degradation:

```typescript
// error.tsx (catches errors in the segment)
'use client';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Not Found Pages

```typescript
// not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>Could not find requested resource.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
```

---

## Migration from Next.js 14/15

### Key Changes to Watch

1. **Async APIs:** `params` and `searchParams` are now Promises.
2. **Caching:** `fetch` is uncached by default.
3. **Server Actions:** Must be explicitly marked `'use server'`.
4. **Request interception:** handled through the proxy convention in our standards.

### Codemod

Use the official Next.js codemod for automated upgrades:

```bash
npx @next/codemod@latest upgrade
```

---

**Questions about Next.js standards?** Contact: dylan.thompson@vantus.systems

[End of Document VS-ENG-302]
