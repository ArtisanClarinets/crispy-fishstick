# Best Practices for API Design & Security

This guide outlines proven patterns and anti-patterns for designing secure, maintainable admin APIs in the Vantus Systems Next.js 16 platform, following Fortune-500 security standards.

## 1. Security-First API Design

### ✓ DO: Defense in Depth Architecture

```typescript
// CORRECT: Multiple security layers
export async function POST(req: NextRequest) {
  return adminMutation(req, { 
    permissions: ["users.write"],
    audit: { action: "create_user", resource: "user" },
    rateLimitKey: "user-creation",
    rateLimitMax: 20,
    rateLimitWindowSec: 3600
  }, async (user, body) => {
    // Layer 1: Input validation
    const validatedData = createUserSchema.parse(body);
    
    // Layer 2: Business rule validation
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });
    if (existingUser) {
      return { error: "User already exists", status: 409 };
    }
    
    // Layer 3: Secure password handling
    const passwordError = await validatePasswordEnhanced(validatedData.password);
    if (passwordError) {
      return { error: passwordError, status: 400 };
    }
    
    // Layer 4: Tenant isolation
    const newUser = await prisma.user.create({
      data: {
        ...validatedData,
        tenantId: user.tenantId, // Enforced tenant scoping
      },
      select: SAFE_USER_SELECT, // Safe field selection
    });
    
    return newUser;
  });
}
```

**Why this matters:**
- **Network Level**: IP/geo restrictions in `proxy.ts`
- **Application Level**: Authentication via NextAuth
- **API Level**: CSRF + RBAC in wrappers
- **Data Level**: Tenant isolation + safe selects

### ✗ DON'T: Single Point of Failure

```typescript
// VULNERABLE: No defense in depth
export async function POST(req: NextRequest) {
  const user = await requireAdmin({}); // No permissions check
  const body = await req.json(); // No validation
  
  await prisma.user.create({
    data: body // Direct insertion, no tenant scoping
  });
  
  return { success: true };
}
```

## 2. Authentication & Authorization

### The Permission Matrix

| Operation | Read Permission | Write Permission | Admin Permission |
|-----------|----------------|------------------|------------------|
| List/View | `resource.read` | - | - |
| Create | - | `resource.write` | - |
| Update | - | `resource.write` | - |
| Delete | - | `resource.write` | `resource.admin` |
| Bulk Ops | - | `resource.write` | `resource.admin` |

### ✓ DO: Granular Permission Checks

```typescript
// CORRECT: Specific permissions for operations
export async function GET() {
  return adminRead(req, { 
    permissions: ["projects.read"] // Read-only access
  }, async (user) => {
    // Implementation
  });
}

export async function POST(req: NextRequest) {
  return adminMutation(req, { 
    permissions: ["projects.write"] // Write access required
  }, async (user, body) => {
    // Implementation
  });
}

export async function DELETE(req: NextRequest) {
  return adminMutation(req, { 
    permissions: ["projects.admin"] // Admin access for destructive ops
  }, async (user, body) => {
    // Implementation
  });
}
```

### ✗ DON'T: Overly Broad Permissions

```typescript
// PROBLEMATIC: Too permissive
export async function POST(req: NextRequest) {
  return adminMutation(req, { 
    permissions: ["admin"] // Allows everything - security risk
  }, async (user, body) => {
    // Implementation
  });
}
```

## 3. Input Validation & Sanitization

### Zod Schema Best Practices

**✓ DO: Comprehensive Validation**

```typescript
const createProjectSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(100, "Name too long")
    .trim(),
  description: z.string()
    .max(1000, "Description too long")
    .optional(),
  budget: z.number()
    .min(0, "Budget must be non-negative")
    .max(1000000, "Budget exceeds maximum")
    .optional(),
  startDate: z.string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date format")
    .transform((date) => new Date(date)),
  endDate: z.string()
    .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), "Invalid date format")
    .transform((date) => date ? new Date(date) : undefined),
  priority: z.enum(["low", "medium", "high"])
    .default("medium"),
  tags: z.array(z.string().max(50))
    .max(10, "Too many tags")
    .optional(),
});
```

**✓ DO: Business Rule Validation**

```typescript
const validatedData = createProjectSchema.parse(body);

// Additional business validation
if (validatedData.endDate && validatedData.startDate >= validatedData.endDate) {
  return { error: "End date must be after start date", status: 400 };
}

if (validatedData.budget && validatedData.budget > user.maxProjectBudget) {
  return { error: "Budget exceeds authorized limit", status: 403 };
}
```

### ✗ DON'T: Trust Client Input

```typescript
// VULNERABLE: No validation
export async function POST(req: NextRequest) {
  const body = await req.json();
  
  await prisma.project.create({
    data: {
      name: body.name, // Could be undefined, too long, malicious
      budget: body.budget, // Could be negative, overflow
      tenantId: body.tenantId || user.tenantId, // Could bypass tenant isolation
    }
  });
}
```

## 4. Data Isolation & Tenant Security

### Multi-Tenant Query Patterns

**✓ DO: Consistent Tenant Scoping**

```typescript
// Pattern 1: Direct tenant scoping
const projects = await prisma.project.findMany({
  where: {
    tenantId: user.tenantId, // Always required
    deletedAt: null,
  },
});

// Pattern 2: Using tenantWhere helper
import { tenantWhere } from "@/lib/admin/guards";

const project = await prisma.project.findFirst({
  where: {
    id: projectId,
    ...tenantWhere(user), // Automatic tenant + soft delete filtering
    deletedAt: null,
  },
});

// Pattern 3: Cross-resource tenant validation
const assignment = await prisma.assignment.create({
  data: {
    projectId: validatedData.projectId,
    userId: validatedData.userId,
  },
});

// Verify project belongs to user's tenant
const project = await prisma.project.findFirst({
  where: {
    id: validatedData.projectId,
    tenantId: user.tenantId,
    deletedAt: null,
  },
});

if (!project) {
  return { error: "Project not found or access denied", status: 403 };
}
```

### ✗ DON'T: Tenant Bypass Vulnerabilities

```typescript
// VULNERABLE: No tenant scoping
const projects = await prisma.project.findMany({
  where: { deletedAt: null } // Allows cross-tenant access
});

// VULNERABLE: Trusting client-provided tenantId
await prisma.project.create({
  data: {
    ...validatedData,
    tenantId: validatedData.tenantId || user.tenantId, // Client can override
  }
});
```

## 5. Safe Data Handling

### Field Selection Security

**✓ DO: Use Safe Select Objects**

```typescript
// lib/security/safe-project.ts
export const SAFE_PROJECT_SELECT = {
  id: true,
  name: true,
  description: true,
  status: true,
  startDate: true,
  endDate: true,
  budget: true,
  createdAt: true,
  updatedAt: true,
  // Explicitly exclude: internalNotes, sensitiveFinancialData, etc.
};

export const SAFE_PROJECT_WITH_LEAD_SELECT = {
  ...SAFE_PROJECT_SELECT,
  lead: {
    select: SAFE_USER_SELECT,
  },
};
```

**✓ DO: Context-Aware Selection**

```typescript
// For list views - minimal fields
const projects = await prisma.project.findMany({
  select: SAFE_PROJECT_SELECT,
});

// For detail views - include relations
const project = await prisma.project.findUnique({
  where: { id, tenantId: user.tenantId },
  select: SAFE_PROJECT_WITH_LEAD_SELECT,
});

// For admin views - all safe fields
const project = await prisma.project.findUnique({
  where: { id, tenantId: user.tenantId },
  select: ADMIN_PROJECT_SELECT, // Includes internal notes
});
```

### ✗ DON'T: Expose Sensitive Data

```typescript
// VULNERABLE: Exposes all fields
const user = await prisma.user.findUnique({
  where: { id }
});
// Returns passwordHash, passwordHistory, internalNotes, etc.

// VULNERABLE: Over-selection
const projects = await prisma.project.findMany({
  include: { 
    financialRecords: true, // Sensitive financial data
    auditLogs: true, // Internal audit data
  }
});
```

## 6. Audit Logging Standards

### Comprehensive Audit Coverage

**✓ DO: Audit All Privileged Operations**

```typescript
// Automatic audit via adminMutation
export async function POST(req: NextRequest) {
  return adminMutation(req, { 
    permissions: ["users.write"],
    audit: { 
      action: "create_user", 
      resource: "user",
      resourceId: "auto" // Extracted from response
    }
  }, async (user, body) => {
    const newUser = await prisma.user.create({
      data: { /* ... */ },
      select: SAFE_USER_SELECT,
    });
    
    return newUser; // Audit log captures this
  });
}
```

**✓ DO: Manual Audit for Complex Operations**

```typescript
// For operations not using adminMutation wrapper
const existingUser = await prisma.user.findUnique({
  where: { id },
  select: SAFE_USER_SELECT,
});

await createAuditLog({
  action: "delete_user",
  resource: "user",
  resourceId: id,
  actorId: user.id,
  actorEmail: user.email,
  before: existingUser, // Capture state before deletion
});

await prisma.user.update({
  where: { id },
  data: { deletedAt: new Date() }, // Soft delete
});
```

### Audit Data Redaction

**✓ DO: Redact Sensitive Values**

```typescript
await createAuditLog({
  action: "password_change",
  resource: "user",
  resourceId: userId,
  actorId: currentUser.id,
  before: { passwordHash: "[REDACTED]" },
  after: { passwordHash: "[REDACTED]" },
  metadata: {
    reason: "user_requested_reset",
    ipAddress: "[REDACTED]", // Don't log IP in audit
  }
});
```

## 7. Error Handling & Information Leakage

### Secure Error Responses

**✓ DO: Structured Error Handling**

```typescript
export async function POST(req: NextRequest) {
  try {
    return adminMutation(req, { permissions: ["write"] }, async (user, body) => {
      const validatedData = schema.parse(body);
      
      // Business logic that might throw
      const result = await performComplexOperation(validatedData);
      
      return result;
    });
  } catch (error) {
    // Log internal details for debugging
    console.error("[API] Operation failed:", {
      error: error.message,
      userId: user?.id,
      requestId: getRequestId(),
      // Don't log sensitive data
    });
    
    // Return safe error to client
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Operation failed" },
      { status: 500 }
    );
  }
}
```

### ✗ DON'T: Leak Internal Information

```typescript
// VULNERABLE: Exposes internal errors
catch (error) {
  return NextResponse.json({
    error: error.message, // Could reveal SQL errors, stack traces
    stack: error.stack,   // Exposes internal file paths
    sql: error.sql,       // Database query leakage
  }, { status: 500 });
}
```

## 8. Rate Limiting Strategy

### Operation-Based Limits

```typescript
const RATE_LIMITS = {
  // Read operations - higher limits
  list: { max: 1000, window: 3600 },     // 1000/hour
  search: { max: 500, window: 3600 },    // 500/hour
  
  // Write operations - moderate limits
  create: { max: 100, window: 3600 },    // 100/hour
  update: { max: 200, window: 3600 },    // 200/hour
  
  // Sensitive operations - low limits
  delete: { max: 20, window: 3600 },     // 20/hour
  bulkImport: { max: 5, window: 3600 },  // 5/hour
  
  // Critical operations - very low limits
  passwordReset: { max: 3, window: 3600 }, // 3/hour
  roleChange: { max: 10, window: 3600 },   // 10/hour
};
```

**✓ DO: Apply Appropriate Limits**

```typescript
export async function POST(req: NextRequest) {
  return adminMutation(req, { 
    permissions: ["users.write"],
    rateLimitKey: "user-creation",
    rateLimitMax: RATE_LIMITS.create.max,
    rateLimitWindowSec: RATE_LIMITS.create.window,
    audit: { action: "create_user", resource: "user" }
  }, async (user, body) => {
    // Implementation
  });
}
```

## 9. API Versioning & Evolution

### Backward Compatibility

**✓ DO: Version APIs Properly**

```typescript
// v1 API - current
// app/api/admin/v1/projects/route.ts

// v2 API - new features
// app/api/admin/v2/projects/route.ts
export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["projects.read"] }, async (user) => {
    // Enhanced v2 features
    const { searchParams } = new URL(req.url);
    const includeArchived = searchParams.get("includeArchived") === "true";
    
    const projects = await prisma.project.findMany({
      where: {
        tenantId: user.tenantId,
        ...(includeArchived ? {} : { deletedAt: null }), // New feature
      },
      select: SAFE_PROJECT_SELECT,
    });
    
    return projects;
  });
}
```

**✓ DO: Deprecation Headers**

```typescript
// Mark v1 as deprecated
export async function GET() {
  return adminRead(req, { permissions: ["projects.read"] }, async (user) => {
    const response = NextResponse.json(projects);
    response.headers.set("Deprecation", "true");
    response.headers.set("Link", '</api/admin/v2/projects>; rel="successor-version"');
    return response;
  });
}
```

## 10. Testing Security Controls

### Security Test Checklist

**✓ DO: Test All Security Aspects**

```typescript
describe("/api/admin/projects", () => {
  describe("Authentication", () => {
    it("should reject unauthenticated requests", async () => {
      const response = await fetch("/api/admin/projects");
      expect(response.status).toBe(401);
    });
    
    it("should reject invalid tokens", async () => {
      const response = await fetch("/api/admin/projects", {
        headers: { Authorization: "Bearer invalid" }
      });
      expect(response.status).toBe(401);
    });
  });
  
  describe("Authorization", () => {
    it("should enforce permission requirements", async () => {
      const limitedUser = await createTestUser({ permissions: [] });
      const response = await apiCall("/api/admin/projects", {
        headers: { Authorization: `Bearer ${limitedUser.token}` }
      });
      expect(response.status).toBe(403);
    });
  });
  
  describe("Tenant Isolation", () => {
    it("should only return tenant-scoped data", async () => {
      const tenant1User = await createTestUser({ tenantId: "tenant1" });
      const tenant2Project = await createTestProject({ tenantId: "tenant2" });
      
      const response = await apiCall("/api/admin/projects", {
        headers: { Authorization: `Bearer ${tenant1User.token}` }
      });
      
      expect(response.projects).not.toContain(
        expect.objectContaining({ id: tenant2Project.id })
      );
    });
  });
  
  describe("Input Validation", () => {
    it("should reject invalid data", async () => {
      const response = await apiCall("/api/admin/projects", {
        method: "POST",
        body: { name: "" }, // Invalid: empty name
      });
      expect(response.status).toBe(400);
    });
    
    it("should sanitize malicious input", async () => {
      const response = await apiCall("/api/admin/projects", {
        method: "POST",
        body: { 
          name: "<script>alert('xss')</script>Valid Name",
          description: "Valid description"
        },
      });
      expect(response.status).toBe(201);
      // Verify XSS was prevented (implementation-dependent)
    });
  });
  
  describe("CSRF Protection", () => {
    it("should reject requests without CSRF token", async () => {
      const response = await apiCall("/api/admin/projects", {
        method: "POST",
        headers: { "X-CSRF-Token": undefined },
        body: validProjectData,
      });
      expect(response.status).toBe(403);
    });
    
    it("should reject invalid CSRF tokens", async () => {
      const response = await apiCall("/api/admin/projects", {
        method: "POST",
        headers: { "X-CSRF-Token": "invalid-token" },
        body: validProjectData,
      });
      expect(response.status).toBe(403);
    });
  });
  
  describe("Audit Logging", () => {
    it("should log all mutations", async () => {
      await apiCall("/api/admin/projects", {
        method: "POST",
        body: validProjectData,
      });
      
      const auditLog = await prisma.auditLog.findFirst({
        where: { action: "create_project" }
      });
      
      expect(auditLog).toBeTruthy();
      expect(auditLog.resource).toBe("project");
      expect(auditLog.after.name).toBe(validProjectData.name);
    });
  });
  
  describe("Rate Limiting", () => {
    it("should enforce rate limits", async () => {
      // Make multiple requests rapidly
      const promises = Array(15).fill().map(() => 
        apiCall("/api/admin/projects", { method: "POST", body: validProjectData })
      );
      
      const responses = await Promise.all(promises);
      const rateLimited = responses.filter(r => r.status === 429);
      expect(rateLimited.length).toBeGreaterThan(0);
    });
  });
});
```

## 11. Performance & Security Balance

### Caching Strategy

```typescript
// Sensitive data - never cache
export async function GET() {
  return adminRead(req, { permissions: ["users.read"] }, async (user) => {
    const users = await prisma.user.findMany({
      where: { tenantId: user.tenantId },
      select: SAFE_USER_SELECT,
    });
    
    return NextResponse.json(users, {
      headers: { "Cache-Control": "no-store, max-age=0" }
    });
  });
}

// Reference data - cache appropriately
export async function GET() {
  return adminRead(req, { permissions: ["settings.read"] }, async (user) => {
    const settings = await prisma.tenantSettings.findUnique({
      where: { tenantId: user.tenantId },
    });
    
    return NextResponse.json(settings, {
      headers: { "Cache-Control": "max-age=300, private" } // 5 min cache
    });
  });
}
```

## 12. Common Security Anti-Patterns

| Anti-Pattern | Problem | Solution |
|-------------|---------|----------|
| Direct DB queries | Bypasses security layers | Use Prisma through wrappers |
| Client-provided IDs | Cross-tenant access | Always scope by tenantId |
| No input validation | Injection attacks | Zod schemas + business validation |
| Logging sensitive data | Data leakage | Redact secrets, use safe selects |
| Missing audit logs | No accountability | Audit all privileged operations |
| Broad permissions | Privilege escalation | Granular permission checks |
| Trusting client state | CSRF attacks | Same-origin + token validation |
| Error information leakage | Reconnaissance | Generic error messages |

## Summary: Security Implementation Checklist

**Every admin API must implement:**

- [ ] **Authentication**: NextAuth JWT validation
- [ ] **Authorization**: RBAC permission checks
- [ ] **CSRF Protection**: Same-origin + token validation
- [ ] **Input Validation**: Zod schemas + business rules
- [ ] **Tenant Isolation**: All queries scoped by tenantId
- [ ] **Safe Data Selection**: No sensitive field exposure
- [ ] **Audit Logging**: Before/after state capture
- [ ] **Rate Limiting**: Appropriate limits per operation type
- [ ] **Error Handling**: No internal information leakage
- [ ] **Cache Control**: no-store for sensitive data

**Code Review Questions:**

1. Can an unauthenticated user access this endpoint?
2. Can a user from another tenant access this data?
3. Are all input fields validated and sanitized?
4. Is sensitive data properly redacted in logs?
5. Are all mutations audited with before/after states?
6. Does the endpoint handle rate limiting appropriately?
7. Are errors handled without leaking internal details?

Following these practices ensures Vantus Systems admin APIs maintain Fortune-500 security standards while providing reliable, maintainable service.