# Best Practices for Admin Workflows in Next.js Systems

This guide provides proven patterns and anti-patterns for creating secure, maintainable admin workflows in Next.js 16 + React 19 App Router systems with enterprise-grade security.

## 1. API Design and Security

### ✓ DO: Use Standardized Admin Helpers

```typescript
// Good: Consistent security patterns
export async function GET() {
  return adminRead(req, { permissions: ["users.read"] }, async (user) => {
    return await prisma.user.findMany({
      where: tenantWhere(user),
      select: SAFE_USER_WITH_ROLES_SELECT,
    });
  });
}

export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["users.write"] }, async (user, body) => {
    // Validation, creation, audit logging
    return result;
  });
}
```

**Why this matters:**
- Automatic CSRF and origin validation
- Consistent permission checking
- Built-in audit logging
- Tenant isolation enforcement

### ✗ DON'T: Bypass Security Helpers

```typescript
// Bad: Manual security handling prone to errors
export async function POST(req: NextRequest) {
  const user = await requireAdmin({ permissions: ["users.write"] });
  // Missing CSRF check!
  // Missing audit log!
  const result = await prisma.user.create({ data: body });
  return result;
}
```

**Problems:**
- Inconsistent security enforcement
- Missing audit trails
- Potential CSRF vulnerabilities
- No tenant scoping

## 2. Data Validation and Safety

### The Zod + Safe DTO Pattern

```typescript
// Define validation schema
const createUserSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password too short"),
});

// Use safe selects for responses
const users = await prisma.user.findMany({
  select: SAFE_USER_WITH_ROLES_SELECT, // No password hashes
});
```

### Password Security Best Practices

```typescript
// Enhanced validation with breach detection
const passwordError = await validatePasswordEnhanced(password);
if (passwordError) {
  return jsonNoStore({ error: passwordError }, { status: 400 });
}

// Hash with proper rounds
const passwordHash = await bcrypt.hash(password, 10);

// Store password history
await prisma.passwordHistory.create({
  data: { userId: newUser.id, passwordHash },
});
```

## 3. Tenant Isolation Enforcement

### Always Scope by Tenant

```typescript
// Good: Automatic tenant filtering
const where = {
  ...tenantWhere(user), // Adds { tenantId: user.tenantId }
  deletedAt: null, // Soft delete
};

// For cross-tenant resources (rare)
const project = await prisma.project.findFirst({
  where: { id: projectId, ...tenantWhere(user) },
});
if (!project) throw new Error("Access denied");
```

### ✗ DON'T: Forget Tenant Scoping

```typescript
// Bad: Potential data leakage
const users = await prisma.user.findMany({
  // Missing tenant filter!
});
```

## 4. Audit Logging Standards

### Comprehensive Audit Events

```typescript
await createAuditLog({
  action: "create_user",
  resource: "user",
  resourceId: newUser.id,
  actorId: user.id,
  actorEmail: user.email,
  before: null, // For creates
  after: {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    // Redact sensitive data
  },
});
```

**Audit Requirements:**
- Every privileged mutation
- Actor identification
- Resource identification
- Before/after state (redacted)
- Timestamp (automatic)

## 5. Form Handling Patterns

### Permission-Gated Forms

```typescript
export function UserForm() {
  const { hasPermission } = useAdmin();
  const canCreate = hasPermission("users.create");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form fields */}
        <Button disabled={!canCreate}>
          {canCreate ? "Create User" : "Insufficient Permissions"}
        </Button>
      </form>
    </Form>
  );
}
```

### CSRF-Aware Submissions

```typescript
const onSubmit = async (data) => {
  try {
    const res = await fetchWithCsrf("/api/admin/users", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("User created");
      router.refresh();
      router.push("/admin/users");
    } else {
      throw new Error("Creation failed");
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};
```

## 6. Error Handling and User Experience

### Defensive API Error Handling

```typescript
export async function POST(req: NextRequest) {
  try {
    // Validation and processing
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonNoStore({ error: error.errors }, { status: 400 });
    }
    if (error.message.includes("Origin") || error.message.includes("Referer")) {
      return jsonNoStore({ error: "Security validation failed" }, { status: 403 });
    }
    // Log internal errors but don't expose details
    console.error("User creation error:", error);
    return jsonNoStore({ error: "Internal server error" }, { status: 500 });
  }
}
```

### Client-Side Error Boundaries

```typescript
export function AdminPage() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <UserList />
    </ErrorBoundary>
  );
}
```

## 7. Multi-Step Form Best Practices

### Progressive Validation

```typescript
const steps = [
  { id: 1, name: "Basics", fields: ["title", "status"] },
  { id: 2, name: "Details", fields: ["startDate", "value"] },
  { id: 3, name: "Review", fields: [] },
];

const nextStep = async () => {
  const currentStepFields = steps.find(s => s.id === currentStep)?.fields;
  const isValid = await form.trigger(currentStepFields as any);
  if (isValid) setCurrentStep(prev => prev + 1);
};
```

### Step Indicators

```typescript
<div className="flex items-center justify-center gap-4">
  {steps.map((step, index) => (
    <div key={step.id} className="flex items-center">
      <div className={`h-10 w-10 rounded-full border-2 ${
        currentStep >= step.id ? "bg-primary border-primary" : "border-muted"
      }`}>
        {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
      </div>
      <span className={`ml-2 ${currentStep >= step.id ? "text-foreground" : "text-muted"}`}>
        {step.name}
      </span>
      {index < steps.length - 1 && <div className="w-12 h-px bg-muted mx-4" />}
    </div>
  ))}
</div>
```

## 8. Performance and Scalability

### Pagination for Large Datasets

```typescript
export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["users.read"] }, async (user) => {
    const { searchParams } = new URL(req.url);
    const pagination = parsePaginationParams(searchParams);

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: tenantWhere(user),
        take: pagination.take + 1,
        skip: pagination.cursor ? 1 : 0,
        cursor: pagination.cursor ? { id: pagination.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        select: SAFE_USER_WITH_ROLES_SELECT,
      }),
      prisma.user.count({ where: tenantWhere(user) }),
    ]);

    return buildPaginationResult(users, pagination, total);
  });
}
```

### Efficient Queries

```typescript
// Include only needed relations
const assignments = await prisma.assignment.findMany({
  where: tenantWhere(user),
  include: {
    User: { select: { id: true, name: true, email: true } },
    Project: { select: { id: true, name: true } },
  },
});
```

## 9. Testing Admin Workflows

### Permission Testing

```typescript
describe("User API", () => {
  it("should deny access without permissions", async () => {
    const user = createMockUser({ permissions: [] });
    const req = createMockRequest("GET", "/api/admin/users");

    const res = await GET(req);
    expect(res.status).toBe(401);
  });

  it("should allow access with permissions", async () => {
    const user = createMockUser({ permissions: ["users.read"] });
    // Test with proper auth
  });
});
```

### Security Testing

```typescript
describe("CSRF Protection", () => {
  it("should reject requests without CSRF token", async () => {
    const req = createMockRequest("POST", "/api/admin/users", {
      headers: { "x-csrf-token": "invalid" },
    });

    const res = await POST(req);
    expect(res.status).toBe(403);
  });
});
```

## 10. Common Pitfalls to Avoid

| Pitfall | Problem | Solution |
|---------|---------|----------|
| Direct Prisma calls | Bypasses security | Always use adminRead/adminMutation |
| Missing tenant scoping | Data leakage | Apply tenantWhere(user) everywhere |
| No audit logging | Untraceable changes | Audit every mutation |
| Client-side security | Easily bypassed | Server enforces, client hints |
| Unvalidated inputs | Injection attacks | Zod validation on all inputs |
| Exposed sensitive data | Privacy violations | Use safe DTOs and selects |
| Race conditions | Inconsistent state | Proper transaction handling |
| No error handling | Poor UX | Comprehensive try/catch blocks |

## 11. Corporate Standards Compliance

### Fortune-500 Security Requirements

- **Zero Trust**: Every request validated
- **Defense in Depth**: Multiple security layers
- **Audit Everything**: Complete change tracking
- **Data Minimization**: Only necessary data exposure
- **Fail Secure**: Deny by default

### Code Quality Standards

- **Type Safety**: Full TypeScript coverage
- **Consistent Patterns**: Standardized helpers
- **Documentation**: Clear inline comments
- **Testing**: 100% critical path coverage
- **Performance**: Optimized queries and caching

## 12. Maintenance and Evolution

### Versioning Admin APIs

```typescript
// API versioning through routes
// app/api/admin/v1/users/route.ts
// app/api/admin/v2/users/route.ts

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
```

### Deprecation Strategy

```typescript
// Mark deprecated endpoints
/**
 * @deprecated Use v2 API instead
 */
export async function GET() {
  // Legacy implementation
}
```

### Monitoring and Alerting

```typescript
// Log security events
if (error.message.includes("CSRF")) {
  console.error("CSRF attempt detected", { ip: req.ip, userAgent: req.headers["user-agent"] });
}
```

## Summary: Admin Workflow Quality Checklist

A production-ready admin workflow has:

✓ **Security First**: adminRead/adminMutation, CSRF, RBAC, tenant isolation
✓ **Data Safety**: Zod validation, safe DTOs, no sensitive exposure
✓ **Audit Compliance**: Every mutation logged with redaction
✓ **User Experience**: Permission checks, loading states, error handling
✓ **Performance**: Pagination, efficient queries, caching
✓ **Maintainability**: Type safety, consistent patterns, documentation
✓ **Test Coverage**: Security, permissions, error cases
✓ **Scalability**: Tenant-aware, paginated, optimized
✓ **Monitoring**: Error tracking, security alerts, performance metrics
✓ **Compliance**: Corporate standards, regulatory requirements