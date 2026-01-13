# Best Practices for Zod Validation in Next.js Systems

This guide provides proven patterns and anti-patterns for implementing robust Zod validation in Next.js 16 + React 19 App Router systems, following Fortune-500 security standards with tenant isolation, comprehensive error handling, and type-safe data validation.

## 1. Schema Definition Standards

### ✓ DO: Define Schemas at Boundaries

```typescript
// Good: Schema defined at API boundary
const createLeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().optional(),
  source: z.string().optional(),
  status: z.string().optional(),
  budget: z.string().optional(),
  website: z.string().optional(),
});

export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["leads.write"] }, async (user, body) => {
    const validatedData = createLeadSchema.parse(body);
    // ... implementation
  });
}
```

**Why this matters:**
- Clear separation of concerns between validation and business logic
- Consistent validation across client and server
- Easier testing and maintenance
- Security enforcement at the boundary

### ✗ DON'T: Inline Validation Logic

```typescript
// Bad: Validation scattered throughout business logic
export async function POST(req: NextRequest) {
  const body = await req.json();
  
  if (!body.name || typeof body.name !== 'string') {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }
  
  if (!body.email || !body.email.includes('@')) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  
  // ... more validation logic mixed with business logic
}
```

**Problems:**
- Inconsistent error handling
- Difficult to maintain and test
- Security vulnerabilities from incomplete validation
- No type safety

## 2. Error Handling Excellence

### The Standardized Error Response Pattern

```typescript
// Good: Consistent error handling with Zod integration
export function normalizeError(error: unknown, requestId?: string): NextResponse<ApiError> {
  if (error instanceof ZodError) {
    return createErrorResponse(
      "UNPROCESSABLE_ENTITY",
      "Validation failed",
      error.errors,
      requestId
    );
  }

  if (error && typeof error === "object" && "code" in error) {
    const prismaError = error as any;
    if (prismaError.code === "P2002") {
      return createErrorResponse("CONFLICT", "Duplicate entry", prismaError.meta, requestId);
    }
  }

  return createErrorResponse("INTERNAL_SERVER_ERROR", "An unexpected error occurred", undefined, requestId);
}
```

### ✗ DON'T: Generic Error Messages

```typescript
// Bad: Unhelpful error responses
try {
  const data = someSchema.parse(input);
} catch (error) {
  return NextResponse.json({ 
    error: "Invalid input" 
  }, { status: 400 });
}
```

**Problems:**
- No specific feedback for users
- Difficult debugging
- Poor user experience
- Security through obscurity (not security)

## 3. Type Safety and Inference

### Schema-Driven Type Inference

```typescript
// Good: TypeScript types derived from Zod schemas
const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  status: z.string(),
  source: z.string().optional(),
  budget: z.string().optional(),
  website: z.string().optional(),
  message: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

export function LeadForm({ initialData }: LeadFormProps) {
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    // ... rest of form setup
  });
}
```

### ✗ DON'T: Manual Type Definitions

```typescript
// Bad: Duplicate type definitions
interface LeadFormValues {
  name: string;
  email: string;
  status: string;
  source?: string;
  budget?: string;
  website?: string;
  message?: string;
}

const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  status: z.string(),
  source: z.string().optional(),
  budget: z.string().optional(),
  website: z.string().optional(),
  message: z.string().optional(),
});
```

**Problems:**
- Type drift between schema and interface
- Maintenance overhead
- Potential runtime/type mismatches

## 4. Security-First Validation

### Tenant-Aware Schema Validation

```typescript
// Good: Tenant scoping enforced in validation
export async function GET(req: NextRequest) {
  return adminRead(req, { permissions: ["leads.read"] }, async (user) => {
    const where = {
      ...tenantWhere(user), // Always scope by tenant
      deletedAt: null,
      // ... other filters
    };
    
    const leads = await prisma.lead.findMany({ where });
    return leads;
  });
}
```

### ✗ DON'T: Skip Tenant Validation

```typescript
// Bad: No tenant scoping
export async function GET(req: NextRequest) {
  const leads = await prisma.lead.findMany({
    where: { deletedAt: null } // ❌ Missing tenant scoping
  });
  return leads;
}
```

**Problems:**
- Cross-tenant data leakage
- Security vulnerabilities
- Compliance violations

## 5. Form Validation Integration

### React Hook Form with Zod Resolver

```typescript
// Good: Proper form validation setup
const form = useForm<LeadFormValues>({
  resolver: zodResolver(leadSchema),
  defaultValues: {
    name: initialData?.name || "",
    email: initialData?.email || "",
    status: initialData?.status || "new",
    source: initialData?.source || "",
    budget: initialData?.budget || "",
    website: initialData?.website || "",
    message: initialData?.message || "",
  },
});

const onSubmit = async (data: LeadFormValues) => {
  const res = await fetchWithCsrf("/api/admin/leads", {
    method: "POST",
    body: JSON.stringify(data),
  });
  // ... handle response
};
```

### ✗ DON'T: Manual Validation in Forms

```typescript
// Bad: Manual validation logic in form handlers
const [errors, setErrors] = useState({});

const validateForm = (data) => {
  const newErrors = {};
  if (!data.name) newErrors.name = "Name is required";
  if (!data.email || !data.email.includes('@')) {
    newErrors.email = "Invalid email";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const onSubmit = (data) => {
  if (!validateForm(data)) return;
  // ... submit
};
```

**Problems:**
- Inconsistent with server validation
- No type safety
- Maintenance burden
- Poor user experience

## 6. Pagination and Filtering

### Validated Query Parameters

```typescript
// Good: Proper pagination schema
export const paginationSchema = z.object({
  cursor: z.string().optional(),
  take: z.coerce.number().int().min(1).max(100).default(20),
  direction: z.enum(["forward", "backward"]).default("forward"),
});

export const commonFiltersSchema = z.object({
  q: z.string().optional(),
  status: z.string().optional(),
  tenantId: z.string().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  includeDeleted: z.coerce.boolean().default(false),
});

export function parsePaginationParams(searchParams: URLSearchParams) {
  return paginationSchema.parse({
    cursor: searchParams.get("cursor") || undefined,
    take: searchParams.get("take") || undefined,
    direction: searchParams.get("direction") || undefined,
  });
}
```

### ✗ DON'T: Unsafe Query Parameter Handling

```typescript
// Bad: No validation of query parameters
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const take = parseInt(searchParams.get("take") || "20"); // ❌ No bounds checking
  const cursor = searchParams.get("cursor"); // ❌ No validation
  
  const leads = await prisma.lead.findMany({
    take, // Could be any number
    cursor: cursor ? { id: cursor } : undefined,
  });
}
```

**Problems:**
- Potential DoS through large take values
- SQL injection risks
- Unpredictable behavior

## 7. Schema Composition and Reuse

### Shared Schema Patterns

```typescript
// Good: Reusable schema composition
const baseUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

const createUserSchema = baseUserSchema.extend({
  password: z.string().min(8),
});

const updateUserSchema = baseUserSchema.partial();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
```

### ✗ DON'T: Duplicate Schema Definitions

```typescript
// Bad: Repeated schema definitions
const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(8),
});

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
```

**Problems:**
- Inconsistency between schemas
- Maintenance overhead
- Type safety issues

## 8. Performance Optimization

### Schema Caching and Reuse

```typescript
// Good: Reuse schema instances
const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Reuse for different operations
const createUserSchema = userSchema.omit({ id: true, createdAt: true, updatedAt: true });
const updateUserSchema = userSchema.partial().omit({ id: true, createdAt: true, updatedAt: true });
```

### ✗ DON'T: Recreate Schemas

```typescript
// Bad: Schema recreation in every request
export async function POST(req: NextRequest) {
  const schema = z.object({ // ❌ Created every time
    email: z.string().email(),
    name: z.string().min(1),
  });
  
  const data = schema.parse(await req.json());
  // ... implementation
}
```

**Problems:**
- Unnecessary object creation
- Memory pressure
- Slower performance

## 9. Testing Validation Logic

### Schema Testing with Vitest

```typescript
describe("Lead Schema Validation", () => {
  it("validates correct lead data", () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      status: "new",
    };
    
    expect(() => leadSchema.parse(validData)).not.toThrow();
  });

  it("rejects invalid email", () => {
    const invalidData = {
      name: "John Doe",
      email: "invalid-email",
      status: "new",
    };
    
    expect(() => leadSchema.parse(invalidData)).toThrow();
  });

  it("handles optional fields correctly", () => {
    const minimalData = {
      name: "John Doe",
      email: "john@example.com",
      status: "new",
    };
    
    const result = leadSchema.parse(minimalData);
    expect(result.source).toBeUndefined();
    expect(result.message).toBeUndefined();
  });
});
```

### Form Validation Testing

```typescript
describe("Lead Form", () => {
  it("shows validation errors for required fields", async () => {
    render(<LeadForm />);
    
    const submitButton = screen.getByRole("button", { name: /create lead/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Invalid email")).toBeInTheDocument();
    });
  });
});
```

## 10. Corporate Security Standards

### Audit-Ready Validation

```typescript
// Good: Validation with audit logging
export async function POST(req: NextRequest) {
  return adminMutation(req, { 
    permissions: ["leads.write"], 
    audit: { action: "create_lead", resource: "lead" } 
  }, async (user, body) => {
    const validatedData = createLeadSchema.parse(body);
    
    const lead = await prisma.lead.create({
      data: {
        ...validatedData,
        tenantId: user.tenantId, // Always scope by tenant
        createdBy: user.id, // Audit trail
      },
    });

    return { data: lead, status: 201 };
  });
}
```

### Input Sanitization

```typescript
// Good: Safe string handling
const safeStringSchema = z.string()
  .trim()
  .min(1)
  .max(255)
  .regex(/^[^<>&"']*$/, "Invalid characters"); // Basic XSS prevention

const commentSchema = z.object({
  content: safeStringSchema,
  authorId: z.string().uuid(),
});
```

## 11. Common Pitfalls

| Pitfall | Problem | Solution |
|---------|---------|----------|
| Missing tenant scoping | Cross-tenant data access | Always use `tenantWhere(user)` |
| Generic error messages | Poor UX and debugging | Use specific Zod error messages |
| Manual type definitions | Type drift | Use `z.infer<typeof schema>` |
| No schema reuse | Inconsistency | Define schemas once, compose as needed |
| Unsafe query params | DoS and injection | Validate all inputs with Zod |
| Missing audit logging | Compliance issues | Include audit metadata in mutations |
| Client-only validation | Security gaps | Validate on server, enhance on client |

## 12. Migration and Evolution

### Schema Versioning Strategy

- **Additive Changes**: New optional fields don't break existing clients
- **Deprecation Warnings**: Mark old fields as deprecated before removal
- **Migration Scripts**: Update database and code together
- **Backward Compatibility**: Support old schemas during transition

### Gradual Adoption

```typescript
// Phase 1: Add new schema alongside old
const oldLeadSchema = z.object({
  name: z.string(),
  email: z.string(),
});

const newLeadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  status: z.string().default("new"),
});

// Phase 2: Migrate to new schema
const leadSchema = newLeadSchema;
```

## Summary: Zod Validation Implementation Checklist

A production-ready Zod validation implementation has:

✓ **Boundary Validation**: Schemas defined at API and form boundaries
✓ **Type Safety**: TypeScript types inferred from Zod schemas
✓ **Security First**: Tenant scoping and input sanitization
✓ **Error Excellence**: Standardized, detailed error responses
✓ **Form Integration**: Seamless react-hook-form integration
✓ **Performance Optimized**: Schema reuse and efficient validation
✓ **Testing Coverage**: Comprehensive schema and form testing
✓ **Corporate Standards**: Audit logging and compliance features
✓ **Maintenance Ready**: Composable schemas and clear patterns
✓ **Evolution Safe**: Versioned schemas and migration support

## Examples

See the codebase for complete implementations:
- [`lib/api/pagination.ts`](lib/api/pagination.ts:1) - Pagination schema with validation
- [`lib/api/errors.ts`](lib/api/errors.ts:1) - Error handling with Zod integration
- [`app/api/admin/leads/route.ts`](app/api/admin/leads/route.ts:1) - API route with validation
- [`components/admin/leads/lead-form.tsx`](components/admin/leads/lead-form.tsx:1) - Form validation implementation
- [`lib/api/filters/common.ts`](lib/api/filters/common.ts:1) - Common filter schemas