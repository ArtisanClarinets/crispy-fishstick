# Best Practices for Security in Next.js Systems

This guide provides proven patterns and anti-patterns for implementing enterprise-grade security in Next.js 16 + React 19 App Router systems with RBAC, CSRF protection, CSP, audit logging, and tenant isolation.

## 1. Authentication & Authorization

### ✓ DO: Use Server-Side Permission Enforcement

```typescript
// Good: Server-side permission check in API routes
export async function POST(req: NextRequest) {
  return adminMutation(req, {
    permissions: ["users.write"],
    audit: { action: "create_user", resource: "user" }
  }, async (user, body) => {
    // Business logic - user is already authenticated and authorized
    const newUser = await prisma.user.create({ data: body });
    return { data: newUser, status: 201 };
  });
}
```

**Why this matters:**
- Server is the single source of truth for permissions
- Client-side checks are UI conveniences only
- Prevents unauthorized API access
- Automatic audit logging

### ✗ DON'T: Rely on Client-Side Permission Checks

```typescript
// Bad: Client-only permission validation
export function AdminButton() {
  const { hasPermission } = useAdmin();
  
  if (!hasPermission("admin.delete")) {
    return null; // ❌ Easily bypassed
  }

  return (
    <button onClick={() => deleteEverything()}>
      Delete Everything
    </button>
  );
}
```

**Problems:**
- Client-side checks can be bypassed
- No server-side enforcement
- Security through obscurity
- No audit trail

## 2. CSRF Protection

### The CSRF-Aware Fetch Pattern

```typescript
// Good: Always use CSRF protection for admin operations
const onSubmit = async (data) => {
  const res = await fetchWithCsrf("/api/admin/users", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Submission failed");
};
```

### ✗ DON'T: Bypass CSRF Protection

```typescript
// Bad: Direct fetch without CSRF token
const onSubmit = async (data) => {
  const res = await fetch("/api/admin/users", { // ❌ No CSRF protection
    method: "POST",
    body: JSON.stringify(data),
  });
};
```

**Security Risks:**
- Cross-site request forgery attacks
- Unauthorized state changes
- Session hijacking vulnerabilities

## 3. Content Security Policy (CSP)

### Strict CSP Configuration

```typescript
// Good: Nonce-based CSP in proxy.ts
const nonce = crypto.randomUUID().replace(/-/g, "");
const csp = [
  "default-src 'self'",
  `script-src 'self' 'nonce-${nonce}'`,
  "style-src 'self' 'unsafe-inline'", // Required for CSS-in-JS
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join(" ; ");
```

### ✗ DON'T: Weaken CSP for Convenience

```typescript
// Bad: Permissive CSP
const csp = [
  "default-src *", // ❌ Allows everything
  "script-src 'unsafe-inline' 'unsafe-eval'", // ❌ Dangerous
  "style-src 'unsafe-inline'",
].join(" ; ");
```

**Problems:**
- XSS attack vectors
- Clickjacking vulnerabilities
- Data exfiltration risks
- Compliance violations

## 4. Audit Logging Excellence

### Comprehensive Audit Coverage

```typescript
// Good: Audit all privileged operations
return adminMutation(req, {
  permissions: ["users.write"],
  audit: {
    action: "update_user",
    resource: "user",
    resourceId: params.id
  }
}, async (user, body) => {
  // Before state captured automatically
  const updatedUser = await prisma.user.update({
    where: { id: params.id },
    data: body,
  });
  // After state and diff computed automatically
  return { data: updatedUser, status: 200 };
});
```

### Sensitive Data Redaction

```typescript
// Good: Redact sensitive fields before logging
const safeData = redactForAudit({
  password: "secret123", // Will be redacted
  email: "user@example.com", // Safe to log
  name: "John Doe", // Safe to log
});
// Result: { password: "[REDACTED]", email: "...", name: "..." }
```

## 5. Tenant Isolation

### Database-Level Tenant Scoping

```typescript
// Good: Automatic tenant filtering
const users = await prisma.user.findMany({
  where: {
    ...tenantWhere(user), // Enforces tenant boundaries
    deletedAt: null,
  },
});
```

### ✗ DON'T: Allow Cross-Tenant Access

```typescript
// Bad: No tenant scoping
const users = await prisma.user.findMany({
  where: { id: req.query.userId }, // ❌ Cross-tenant access possible
});
```

**Security Risks:**
- Data leakage between tenants
- Unauthorized access to other organizations' data
- Compliance violations (GDPR, HIPAA, etc.)

## 6. Input Validation & Sanitization

### Server-Side Validation with Zod

```typescript
// Good: Comprehensive input validation
const userSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  roleIds: z.array(z.string().uuid()).max(5, "Too many roles"),
});

export async function POST(req: NextRequest) {
  return adminMutation(req, { permissions: ["users.write"] }, async (user, body) => {
    const validatedData = userSchema.parse(body); // Throws on invalid input
    
    const newUser = await prisma.user.create({
      data: validatedData,
    });
    
    return { data: newUser, status: 201 };
  });
}
```

### ✗ DON'T: Trust Client-Side Validation

```typescript
// Bad: No server-side validation
export async function POST(req: NextRequest) {
  const body = await req.json();
  
  // ❌ Trusting client validation
  const newUser = await prisma.user.create({
    data: body, // Could contain malicious data
  });
  
  return NextResponse.json({ user: newUser });
}
```

## 7. Session Management

### Secure Session Configuration

```typescript
// Good: Secure session settings
export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      },
    },
  },
};
```

### Session Activity Tracking

```typescript
// Good: Update session activity
export async function updateSessionActivity(sessionToken: string) {
  await prisma.session.updateMany({
    where: { sessionToken },
    data: { lastActivity: new Date() },
  });
}
```

## 8. Error Handling & Information Disclosure

### Safe Error Responses

```typescript
// Good: Don't leak sensitive information
try {
  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });
  
  if (!user) {
    throw new Error("Invalid credentials"); // Generic message
  }
  
  // Password verification...
} catch (error) {
  console.error("Login error:", error); // Log details server-side
  throw new Error("Authentication failed"); // Generic client message
}
```

### ✗ DON'T: Expose Internal Details

```typescript
// Bad: Leaking database errors
try {
  await prisma.user.create({ data: body });
} catch (error: any) {
  return NextResponse.json({
    error: error.message, // ❌ Exposes SQL details
    code: error.code, // ❌ Internal error codes
  }, { status: 500 });
}
```

## 9. API Security Headers

### Comprehensive Security Headers

```typescript
// Good: Security headers in proxy.ts
const SECURITY_HEADERS = [
  ["X-Content-Type-Options", "nosniff"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["X-Frame-Options", "DENY"],
  ["Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()"],
];

// Production HSTS
if (process.env.NODE_ENV === "production") {
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
}
```

## 10. Rate Limiting & Abuse Prevention

### Database-Backed Rate Limiting

```typescript
// Good: Rate limit sensitive operations
return adminMutation(req, {
  permissions: ["users.write"],
  rateLimitKey: "user:create",
  rateLimitMax: 10, // 10 users per window
  rateLimitWindow: 60 * 1000, // 1 minute
}, async (user, body) => {
  // Rate limited user creation
});
```

## 11. Corporate Security Standards

### Fortune-500 Security Requirements

- **Zero Trust Architecture**: Every request validated and authorized
- **Defense in Depth**: Multiple security layers (CSP, CSRF, RBAC, etc.)
- **Audit Everything**: Complete audit trail for compliance
- **Data Protection**: Encryption at rest and in transit
- **Access Minimization**: Least privilege principle

### Compliance Considerations

- **GDPR**: Data minimization and consent management
- **SOC 2**: Security, availability, and confidentiality controls
- **HIPAA**: Protected health information safeguards
- **PCI DSS**: Payment data protection

## 12. Security Testing

### Permission Testing

```typescript
describe("Admin API", () => {
  it("should enforce permissions", async () => {
    const res = await request(app)
      .post("/api/admin/users")
      .set("cookie", "session=unauthorized")
      .send({ name: "Test" });
    
    expect(res.status).toBe(403);
  });
});
```

### CSRF Testing

```typescript
describe("CSRF Protection", () => {
  it("should reject requests without CSRF token", async () => {
    const res = await request(app)
      .post("/api/admin/users")
      .set("cookie", "session=valid")
      .send({ name: "Test" });
    
    expect(res.status).toBe(403);
  });
});
```

## 13. Common Security Pitfalls

| Pitfall | Problem | Solution |
|---------|---------|----------|
| Missing CSRF protection | Cross-site request forgery | Always use `fetchWithCsrf` |
| Client-side permission checks | Easily bypassed | Server-side enforcement only |
| No tenant scoping | Cross-tenant data access | Use `tenantWhere` helper |
| Logging sensitive data | Data leakage in logs | Use `redactForAudit` |
| Weak CSP | XSS vulnerabilities | Strict nonce-based CSP |
| No audit logging | No accountability | Audit all mutations |
| Trusting client input | Injection attacks | Server-side validation with Zod |
| Generic error messages | Information disclosure | Safe error handling |

## 14. Maintenance & Evolution

### Security Updates

- **Regular Dependency Audits**: `npm audit` and `npm audit fix`
- **Security Headers Review**: Update CSP for new features
- **Permission Matrix Updates**: Review and update role permissions
- **Audit Log Analysis**: Monitor for suspicious patterns

### Incident Response

```typescript
// Good: Structured incident logging
await createAuditLog({
  action: "security_incident",
  resource: "system",
  actorEmail: "system@security",
  meta: {
    incidentType: "suspicious_login",
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
    severity: "high",
  },
});
```

## Summary: Security Implementation Checklist

A production-ready Next.js application has:

✓ **Authentication First**: NextAuth JWT with secure session management
✓ **Authorization Layers**: RBAC with server-side permission checks
✓ **CSRF Protection**: Double-submit pattern with automatic token management
✓ **Content Security**: Strict CSP with nonce-based script execution
✓ **Audit Everything**: Comprehensive logging with sensitive data redaction
✓ **Tenant Isolation**: Database-level multi-tenant separation
✓ **Input Validation**: Zod schemas for all API inputs
✓ **Error Safety**: No information disclosure in error responses
✓ **Security Headers**: Complete set of HTTP security headers
✓ **Rate Limiting**: Abuse prevention for sensitive endpoints
✓ **Testing Coverage**: Security test cases for all features
✓ **Compliance Ready**: Audit trails and data protection measures
✓ **Monitoring**: Active security monitoring and alerting