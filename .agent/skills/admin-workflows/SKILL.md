---
name: admin-workflows
description: Implement and manage admin workflows in Next.js systems with enterprise security. Use when building admin portals, CRUD operations, secure APIs, form handling, and administrative task automation.
---

# Admin Workflows

A comprehensive skill for implementing secure, scalable admin workflows in Next.js 16 + React 19 App Router systems, following Fortune-500 security standards with RBAC, CSRF protection, tenant isolation, and comprehensive audit logging.

## Quick Start

Create a basic admin CRUD workflow:

1. **API Route** (`app/api/admin/resource/route.ts`):
   ```typescript
   import { adminRead, adminMutation } from "@/lib/admin/route";
   import { prisma } from "@/lib/prisma";
   import * as z from "zod";

   const schema = z.object({ name: z.string().min(1) });

   export async function GET() {
     return adminRead(req, { permissions: ["resource.read"] }, async (user) => {
       return await prisma.resource.findMany({ where: { tenantId: user.tenantId } });
     });
   }

   export async function POST(req: NextRequest) {
     return adminMutation(req, { permissions: ["resource.write"] }, async (user, body) => {
       const data = schema.parse(body);
       return await prisma.resource.create({ data: { ...data, tenantId: user.tenantId } });
     });
   }
   ```

2. **Admin Page** (`app/(admin)/admin/resource/page.tsx`):
   ```typescript
   export default function ResourcePage() {
     return <ResourceList />;
   }
   ```

3. **Form Component** (`components/admin/resource/resource-form.tsx`):
   ```typescript
   "use client";
   import { useForm } from "react-hook-form";
   import { zodResolver } from "@hookform/resolvers/zod";
   import { fetchWithCsrf } from "@/lib/fetchWithCsrf";

   export function ResourceForm() {
     const form = useForm({ resolver: zodResolver(schema) });
     const onSubmit = async (data) => {
       await fetchWithCsrf("/api/admin/resource", { method: "POST", body: JSON.stringify(data) });
     };
     return <Form {...form}><form onSubmit={form.handleSubmit(onSubmit)}>{/* fields */}</form></Form>;
   }
   ```

## Core Concepts

### Admin API Patterns

- **`adminRead`**: Standardized GET operations with permission checks and tenant scoping
- **`adminMutation`**: POST/PUT/DELETE with CSRF, RBAC, audit logging, and security validation
- **Tenant Isolation**: Automatic data filtering by `tenantId` to prevent cross-tenant access
- **Safe DTOs**: Predefined selects like `SAFE_USER_WITH_ROLES_SELECT` for data protection

### Security Architecture

- **Server Control Plane**: All security enforcement happens server-side; client checks are UI-only
- **RBAC Permissions**: Granular permissions like `"users.read"`, `"contracts.write"`
- **CSRF Protection**: Same-origin enforcement using `assertSameOrigin`
- **Audit Logging**: Every privileged mutation tracked with `createAuditLog`

### Form Handling

- **React Hook Form + Zod**: Type-safe validation with `zodResolver`
- **Permission Checks**: `useAdmin().hasPermission()` for UI gating
- **CSRF-Aware Fetch**: `fetchWithCsrf()` for secure API calls
- **Multi-Step Forms**: Progressive validation with step-based workflows

## Workflows

### 1. Implementing Admin CRUD APIs

**Purpose**: Create secure REST endpoints for admin data operations.

**Steps**:
1. Define Zod schema for input validation
2. Use `adminRead` for GET with permission and tenant checks
3. Use `adminMutation` for writes with CSRF and audit
4. Apply `tenantWhere(user)` for data scoping
5. Return safe data using predefined selects

**Example**: User Management API
```typescript
import { adminRead, adminMutation } from "@/lib/admin/route";
import { prisma } from "@/lib/prisma";
import { tenantWhere } from "@/lib/admin/guards";
import { createAuditLog } from "@/lib/admin/audit";
import * as z from "zod";

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  roleIds: z.array(z.string()).optional(),
});

export async function GET() {
  return adminRead(req, { permissions: ["users.read"] }, async (user) => {
    const users = await prisma.user.findMany({
      where: { ...tenantWhere(user), deletedAt: null },
      select: SAFE_USER_WITH_ROLES_SELECT,
    });
    return users;
  });
}

export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["users.write"] }, async (user, body) => {
    const validatedData = createUserSchema.parse(body);
    const { roleIds, password, ...userData } = validatedData;

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        ...userData,
        passwordHash,
        tenantId: user.tenantId,
        RoleAssignment: roleIds ? {
          create: roleIds.map(roleId => ({ Role: { connect: { id: roleId } } })),
        } : undefined,
      },
      select: SAFE_USER_WITH_ROLES_SELECT,
    });

    await createAuditLog({
      action: "create_user",
      resource: "user",
      resourceId: newUser.id,
      actorId: user.id,
      actorEmail: user.email,
      after: newUser,
    });

    return newUser;
  });
}
```

### 2. Building Admin Forms

**Purpose**: Create user-friendly forms with security and validation.

**Steps**:
1. Use `useForm` with `zodResolver` for validation
2. Check permissions with `useAdmin` hook
3. Use `fetchWithCsrf` for API submissions
4. Handle loading states and show toast notifications
5. Navigate on success with `router.push()` and `router.refresh()`

**Example**: User Creation Form
```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { fetchWithCsrf } from "@/lib/fetchWithCsrf";
import { useAdmin } from "@/hooks/useAdmin";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  roleIds: z.array(z.string()),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  roles: { id: string; name: string }[];
}

export function UserForm({ roles }: UserFormProps) {
  const router = useRouter();
  const { hasPermission } = useAdmin();
  const [loading, setLoading] = useState(false);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: "", email: "", roleIds: [] },
  });

  const onSubmit = async (data: UserFormValues) => {
    try {
      setLoading(true);
      const res = await fetchWithCsrf("/api/admin/users", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create");
      toast.success("User created");
      router.refresh();
      router.push("/admin/users");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading || !hasPermission("users.create")}>
          {loading ? "Creating..." : "Create User"}
        </Button>
      </form>
    </Form>
  );
}
```

### 3. Multi-Step Admin Forms

**Purpose**: Handle complex forms with progressive validation.

**Steps**:
1. Define steps with validation groups
2. Use `form.trigger()` for step validation
3. Show progress indicators
4. Validate all steps before final submission

**Example**: Contract Creation Form
```typescript
const steps = [
  { id: 1, name: "Basics", fields: ["title", "tenantId", "status", "value"] },
  { id: 2, name: "Terms", fields: ["startDate", "endDate"] },
  { id: 3, name: "Content", fields: ["content"] },
];

export function ContractForm({ tenants }: ContractFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const form = useForm({ resolver: zodResolver(contractSchema) });

  const nextStep = async () => {
    const stepFields = steps.find(s => s.id === currentStep)?.fields;
    const isValid = await form.trigger(stepFields as any);
    if (isValid) setCurrentStep(prev => prev + 1);
  };

  const onSubmit = async (data) => {
    const payload = { ...data, startDate: new Date(data.startDate).toISOString() };
    await fetchWithCsrf("/api/admin/contracts", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Step indicator */}
        {currentStep === 1 && /* Basics fields */}
        {currentStep === 2 && /* Terms fields */}
        {currentStep === 3 && /* Content fields */}
        <div className="flex justify-between">
          {currentStep > 1 && <Button onClick={() => setCurrentStep(prev => prev - 1)}>Previous</Button>}
          {currentStep < steps.length ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button type="submit">Create Contract</Button>
          )}
        </div>
      </form>
    </Form>
  );
}
```

## Advanced Features

### Audit Logging Integration

Always include audit events for privileged mutations:

```typescript
await createAuditLog({
  action: "create_user",
  resource: "user",
  resourceId: newUser.id,
  actorId: user.id,
  actorEmail: user.email,
  before: null, // for creates
  after: newUser, // sanitized data
});
```

### Password Security

Use enhanced validation for user creation:

```typescript
import { validatePasswordEnhanced } from "@/lib/security/password-enhanced";

const passwordError = await validatePasswordEnhanced(password);
if (passwordError) {
  return jsonNoStore({ error: passwordError }, { status: 400 });
}
```

### Tenant Scoping

Always scope queries by tenant:

```typescript
const where = {
  ...tenantWhere(user), // Adds tenantId filter
  deletedAt: null, // Soft delete filter
};
```

## Troubleshooting

### Common Issues

**Permission Denied**: Check that the user has the required permissions in their role assignments.

**CSRF Errors**: Ensure using `fetchWithCsrf` on the client and `adminMutation` on the server.

**Tenant Access**: Verify `tenantWhere(user)` is applied to all queries.

**Audit Failures**: Ensure audit logs are created for all mutations with proper redaction.

## Best Practices

- Always use `adminRead`/`adminMutation` instead of direct Prisma calls
- Validate all inputs with Zod schemas
- Include audit logging for any data changes
- Use safe DTOs to prevent sensitive data exposure
- Test permissions thoroughly in different user contexts
- Handle soft deletes with `deletedAt: null` filters

## Examples

See the codebase for complete implementations:
- [`app/api/admin/users/route.ts`](app/api/admin/users/route.ts:1) - User CRUD API
- [`app/api/admin/assignments/route.ts`](app/api/admin/assignments/route.ts:1) - Assignment management
- [`components/admin/users/user-form.tsx`](components/admin/users/user-form.tsx:1) - User form component
- [`components/admin/contracts/contract-form.tsx`](components/admin/contracts/contract-form.tsx:1) - Multi-step contract form
