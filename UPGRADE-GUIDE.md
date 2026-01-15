# Upgrade Guide

This guide details the remaining steps to fully upgrade the application to Next.js 16 and React 19.

## Completed Steps

- Upgraded `next`, `react`, `react-dom`, `@next/mdx`, `eslint-config-next` to latest versions.
- Updated `app/layout.tsx` to handle `headers()` as a Promise.
- Updated `app/api/admin/media/[id]/route.ts` as a sample reference for Route Handlers.

## Remaining Steps

### 1. Update Route Handlers

You need to update all Route Handlers that use `params`. They now receive `params` as a `Promise`.

**Pattern:**

```typescript
// Before
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  // ...
}

// After
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // ...
}
```

**Files to update:**

(See `params_files.txt` for list, excluding `app/api/admin/media/[id]/route.ts`)

- `app/api/admin/assignments/[id]/route.ts`
- `app/api/admin/content/[id]/restore/route.ts`
- `app/api/admin/content/[id]/route.ts`
- ... (and so on)

### 2. Update Pages with `params`

Pages also receive `params` as a `Promise`.

**Pattern:**

```typescript
// Before
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  // ...
}

// After
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // ...
}
```

**Files to update:**

- `app/(admin)/admin/(dashboard)/content/[id]/page.tsx`
- `app/(admin)/admin/(dashboard)/contracts/[id]/page.tsx`
- ... (see `params_pages.txt`)

### 3. Update Pages with `searchParams`

`searchParams` is also a `Promise` in Pages.

**Pattern:**

```typescript
// Before
export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const status = searchParams.status;
  // ...
}

// After
export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { status } = await searchParams;
  // ...
}
```

**Files to update:**

- `app/(admin)/admin/(dashboard)/contracts/page.tsx`
- `app/(admin)/admin/(dashboard)/invoices/page.tsx`
- `app/(admin)/admin/(dashboard)/proposals/page.tsx`

### 4. Verify Route Handlers with `searchParams`

Note: In Route Handlers, `request.nextUrl.searchParams` is NOT async (it's part of the Request object standard), but `params` (the dynamic route parameters) IS async. So `searchParams` usage in Route Handlers usually does NOT need to change unless you were accessing it from the second argument context (which is rare/deprecated for searchParams). Most of your Route Handlers use `req.nextUrl.searchParams` or `new URL(req.url).searchParams`, which are fine.

However, double check if any Route Handler was receiving `searchParams` as a prop (which they shouldn't).

### 5. Verify Build and Test

Run `npm run build` and `npm run test` to ensure everything is working.

### 6. React 19 Considerations

- If you use `forwardRef`, it is no longer necessary in many cases, but keeping it usually works.
- `useFormState` is now `useActionState`.
- Check for any hydration mismatches.
