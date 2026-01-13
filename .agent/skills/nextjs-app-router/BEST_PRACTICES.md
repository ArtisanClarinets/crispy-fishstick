# Best Practices for Next.js App Router Development

This guide provides proven patterns and anti-patterns for building secure, maintainable Next.js 16 applications with App Router, based on the Vantus Systems production codebase.

## 1. Route Organization and Surface Separation

### ✓ DO: Use Route Groups for Clear Boundaries

```typescript
// ✅ Correct: Surface separation with route groups
app/
├── (site)/              # Public marketing site
│   ├── layout.tsx       # Site layout with header/footer
│   ├── page.tsx         # Homepage
│   └── contact/
│       └── page.tsx     # Contact page
├── (admin)/
│   └── admin/
│       ├── (dashboard)/ # Admin dashboard routes
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   └── users/
│       │       └── page.tsx
│       └── login/
│           └── page.tsx # Auth routes outside dashboard
└── api/
    └── admin/           # Admin API routes
        ├── users/
        └── projects/
```

**Why this matters:**
- Clear separation between public, admin, and API surfaces
- Prevents accidental mixing of concerns
- Easier navigation and permission management

### ✗ DON'T: Mix Surfaces in Route Structure

```typescript
// ❌ Wrong: Mixed concerns
app/
├── page.tsx            # Public homepage
├── admin/
│   ├── page.tsx        # Admin dashboard
│   └── users.tsx       # Admin users page
├── api/
│   ├── users.ts        # Public API
│   └── admin-users.ts  # Admin API (confusing naming)
```

## 2. Security-First Architecture

### The Vantus Security Stack

```typescript
// ✅ Required: Proxy-based security boundary
// proxy.ts - Centralized request interception
export async function proxy(request: NextRequest) {
  // 1. Generate per-request nonce
  const nonce = crypto.randomUUID().replace(/-/g, "");

  // 2. Strict CSP with nonce enforcement
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'unsafe-eval'`,
    "style-src 'self' 'unsafe-inline'",
    // ... other directives
  ].join(" ; ");

  // 3. Admin route protection
  if (isAdminRoute) {
    const token = await getToken({ req: request });
    if (!token) redirect("/admin/login");

    // Session validation
    const validation = await validateSession(token.sessionToken);
    if (!validation.valid) redirect("/admin/login");
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}
```

### ✓ DO: Server-Side Auth Checks in Layouts

```typescript
// app/(admin)/admin/(dashboard)/layout.tsx
export default async function AdminLayout() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
```

### ✗ DON'T: Client-Side Auth Checks

```typescript
// ❌ Wrong: Client-side auth is UI-only
'use client';
export default function AdminPage() {
  const { data: session } = useSession();

  if (!session) {
    return <div>Please log in</div>; // Insecure!
  }

  return <AdminContent />;
}
```

## 3. API Route Security Patterns

### ✓ DO: Complete Security Stack for Mutations

```typescript
// app/api/admin/users/route.ts
export async function POST(req: NextRequest) {
  // 1. CSRF Protection
  assertSameOrigin(req);

  // 2. Authentication & Authorization
  const actor = await requireAdmin({ permissions: ["users.write"] });

  // 3. Input Validation
  const body = await req.json();
  const validatedData = createUserSchema.parse(body);

  // 4. Business Logic with Tenant Isolation
  const newUser = await prisma.user.create({
    data: {
      ...validatedData,
      tenantId: actor.tenantId, // Always scope by tenant
    },
    select: SAFE_USER_WITH_ROLES_SELECT,
  });

  // 5. Audit Logging
  await createAuditLog({
    action: "create_user",
    resource: "user",
    resourceId: newUser.id,
    actorId: actor.id,
    after: newUser,
  });

  return jsonNoStore(newUser, { status: 201 });
}
```

### ✗ DON'T: Skip Security Layers

```typescript
// ❌ Wrong: Missing security layers
export async function POST(req: NextRequest) {
  const body = await req.json(); // No CSRF check!

  const user = await prisma.user.create({
    data: body, // No validation!
  });

  return NextResponse.json(user); // No audit log!
}
```

## 4. Data Fetching and Caching

### ✓ DO: Server Components with Force Dynamic

```typescript
// ✅ Correct: Fresh data with security
export const dynamic = "force-dynamic";

export default async function UsersPage() {
  await requireAdmin({ permissions: ["users.read"] });

  const users = await prisma.user.findMany({
    where: { deletedAt: null },
    select: SAFE_USER_WITH_ROLES_SELECT,
  });

  return <UsersTable users={users} />;
}
```

### ✗ DON'T: Client-Side Data Fetching for Admin Data

```typescript
// ❌ Wrong: Exposes API keys, no server-side auth
'use client';
export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/admin/users') // API key exposure risk
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return <UsersTable users={users} />;
}
```

## 5. Component Architecture

### ✓ DO: Server Components by Default

```typescript
// ✅ Correct: Server component for data operations
export default async function ProjectDetail({ params }: PageProps) {
  const { id } = await params;
  await requireAdmin({ permissions: ["projects.read"] });

  const project = await prisma.project.findUnique({
    where: { id, deletedAt: null },
    include: { client: true },
  });

  if (!project) notFound();

  return <ProjectDetailView project={project} />;
}

// Client component only for interactivity
'use client';
function ProjectDetailView({ project }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {isEditing ? (
        <ProjectForm project={project} onSave={() => setIsEditing(false)} />
      ) : (
        <ProjectDisplay project={project} onEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
}
```

### ✗ DON'T: Overuse Client Components

```typescript
// ❌ Wrong: Client component doing server work
'use client';
export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Complex data fetching in client
    Promise.all([
      fetch('/api/users'),
      fetch('/api/roles'),
      fetch('/api/permissions'),
    ])
      .then(([usersRes, rolesRes, permsRes]) => {
        // Complex data transformation
        return Promise.all([
          usersRes.json(),
          rolesRes.json(),
          permsRes.json(),
        ]);
      })
      .then(([users, roles, permissions]) => {
        const enrichedUsers = users.map(user => ({
          ...user,
          role: roles.find(r => r.id === user.roleId),
          permissions: permissions.filter(p => user.permissionIds.includes(p.id)),
        }));
        setUsers(enrichedUsers);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return <UsersTable users={users} />;
}
```

## 6. Error Handling and Boundaries

### ✓ DO: Comprehensive Error Boundaries

```typescript
// app/(site)/layout.tsx
export default function SiteLayout({ children }) {
  return (
    <PageTransition>
      <ErrorBoundary fallback={<SiteErrorPage />}>
        <main className="flex-1 pt-20">
          {children}
        </main>
      </ErrorBoundary>
    </PageTransition>
  );
}

// components/error-boundary.tsx
'use client';
export class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log to monitoring service
    console.error('Error boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultError />;
    }
    return this.props.children;
  }
}
```

### ✗ DON'T: Silent Error Swallowing

```typescript
// ❌ Wrong: Errors go unnoticed
export default async function DataPage() {
  try {
    const data = await fetchData();
    return <DataView data={data} />;
  } catch (error) {
    // Silent failure - user sees nothing
    return null;
  }
}
```

## 7. Performance and Optimization

### ✓ DO: Parallel Data Fetching

```typescript
// ✅ Correct: Parallel requests
export default async function Dashboard() {
  await requireAdmin({ permissions: ["admin.access"] });

  const [
    leadsCount,
    projectsCount,
    incidentsCount,
    recentAudits
  ] = await Promise.all([
    prisma.lead.count({ where: { status: "new" } }),
    prisma.project.count({ where: { status: "active" } }),
    prisma.incident.count({ where: { status: "open" } }),
    prisma.auditLog.findMany({
      take: 5,
      orderBy: { createdAt: "desc" }
    }),
  ]);

  return <DashboardView {...{ leadsCount, projectsCount, incidentsCount, recentAudits }} />;
}
```

### ✗ DON'T: Sequential Data Fetching

```typescript
// ❌ Wrong: Waterfall requests
export default async function Dashboard() {
  const leadsCount = await prisma.lead.count({ where: { status: "new" } });
  const projectsCount = await prisma.project.count({ where: { status: "active" } });
  const incidentsCount = await prisma.incident.count({ where: { status: "open" } });
  // Each query waits for the previous one

  return <DashboardView {...{ leadsCount, projectsCount, incidentsCount }} />;
}
```

## 8. Testing and Validation

### ✓ DO: Test Security Boundaries

```typescript
// __tests__/api/admin/users.test.ts
describe('/api/admin/users', () => {
  it('requires authentication', async () => {
    const response = await fetch('/api/admin/users');
    expect(response.status).toBe(401);
  });

  it('requires CSRF protection', async () => {
    // Simulate request without proper origin
    const response = await fetch('/api/admin/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Missing or wrong Origin/Referer
      },
      body: JSON.stringify({ name: 'Test' }),
    });
    expect(response.status).toBe(403);
  });

  it('validates input', async () => {
    const response = await authenticatedFetch('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify({ invalid: 'data' }),
    });
    expect(response.status).toBe(400);
  });
});
```

### ✗ DON'T: Skip Security Testing

```typescript
// ❌ Wrong: Only test happy path
describe('/api/users', () => {
  it('creates a user', async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
      }),
    });
    expect(response.status).toBe(201);
  });
});
```

## 9. Migration and Deployment

### ✓ DO: Gradual Migration Strategy

```typescript
// ✅ Correct: Feature flags for migration
// lib/features.ts
export const FEATURES = {
  NEW_ADMIN_UI: process.env.NEXT_PUBLIC_NEW_ADMIN_UI === 'true',
  ENHANCED_SECURITY: true, // Always on for new routes
};

// Use feature flags during migration
export default function AdminPage() {
  if (FEATURES.NEW_ADMIN_UI) {
    return <NewAdminDashboard />;
  }
  return <LegacyAdminDashboard />;
}
```

### ✗ DON'T: Big Bang Migration

```typescript
// ❌ Wrong: All or nothing migration
// One day everything changes - high risk
export default function AdminPage() {
  // Suddenly using new patterns everywhere
  return <CompletelyNewAdminInterface />;
}
```

## 10. Common Anti-Patterns to Avoid

| Anti-Pattern | Problem | Solution |
|-------------|---------|----------|
| Client-side auth checks | Security bypass possible | Server-side auth in layouts |
| Direct API calls in client components | Token exposure, no auth | Server components with data fetching |
| Mixed route concerns | Navigation confusion, security gaps | Strict route group separation |
| Skipping audit logs | No accountability | Audit all privileged mutations |
| Unsafe data selection | Accidental data exposure | Use SAFE_*_SELECT constants |
| No tenant scoping | Cross-tenant data access | Always scope by tenantId |
| Silent error handling | Hidden failures | Comprehensive error boundaries |
| Sequential data loading | Slow page loads | Parallel data fetching |

## Security Checklist

Before deploying any Next.js App Router feature:

### Authentication & Authorization
- [ ] Server-side auth checks in all admin layouts
- [ ] RBAC permission enforcement on all admin routes
- [ ] Session validation with activity tracking
- [ ] Proper redirect handling for unauthenticated users

### CSRF Protection
- [ ] `assertSameOrigin(req)` on all mutations
- [ ] Proper Origin/Referer header validation
- [ ] No GET requests that modify data

### Data Security
- [ ] Tenant isolation on all multi-tenant queries
- [ ] Safe select patterns for data exposure
- [ ] Input validation with Zod schemas
- [ ] SQL injection prevention (Prisma handles this)

### Audit & Compliance
- [ ] Audit logging for all privileged mutations
- [ ] Sensitive data redaction in logs
- [ ] Proper error messages (no data leakage)

### Infrastructure Security
- [ ] CSP headers with nonce enforcement
- [ ] Security headers (HSTS, X-Frame-Options, etc.)
- [ ] No unsafe-inline scripts or styles
- [ ] Proper HTTPS enforcement

## Performance Checklist

### Data Fetching
- [ ] Parallel data loading with Promise.all
- [ ] Appropriate caching with `force-dynamic`
- [ ] Minimal data selection with select/include
- [ ] Efficient database queries

### Component Architecture
- [ ] Server components for data operations
- [ ] Client components only for interactivity
- [ ] Proper component splitting
- [ ] Lazy loading for heavy components

### Bundle Optimization
- [ ] Tree shaking enabled
- [ ] Dynamic imports for large components
- [ ] Image optimization with Next.js Image
- [ ] Font optimization with display swap

Following these patterns ensures your Next.js App Router application maintains the same enterprise-grade security and performance standards as Vantus Systems.