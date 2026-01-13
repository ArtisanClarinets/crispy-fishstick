# Best Practices for React Components in Next.js Systems

This guide provides proven patterns and anti-patterns for creating secure, maintainable React components in Next.js 16 + React 19 App Router systems with enterprise-grade security and performance standards.

## 1. Component Architecture

### ✓ DO: Use Proper Client/Server Boundaries

```typescript
// Good: Server component by default
export default function Page() {
  return <ClientComponent />;
}

// Good: Explicit client directive for interactivity
"use client";

export function ClientComponent() {
  const [state, setState] = useState();
  return <div>{state}</div>;
}
```

**Why this matters:**
- Server components for performance and SEO
- Client components only when needed for interactivity
- Clear separation of concerns
- Better bundle splitting

### ✗ DON'T: Mix Client and Server Logic

```typescript
// Bad: Server component with client-side logic
export default function Page() {
  const [data, setData] = useState(); // ❌ Won't work on server
  useEffect(() => { /* ... */ }, []); // ❌ Server doesn't have useEffect

  return <div>Content</div>;
}
```

**Problems:**
- Hydration mismatches
- Runtime errors
- Poor performance
- Bundle bloat

## 2. Security Integration

### The Permission-Gated Component Pattern

```typescript
export function AdminPanel() {
  const { hasPermission } = useAdmin();

  if (!hasPermission("admin.view")) {
    return <AccessDenied />;
  }

  return (
    <div>
      {/* Admin content */}
      {hasPermission("admin.edit") && <EditButton />}
    </div>
  );
}
```

### CSRF-Aware API Calls

```typescript
// Good: Always use CSRF protection for admin operations
const onSubmit = async (data) => {
  const res = await fetchWithCsrf("/api/admin/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
```

### ✗ DON'T: Bypass Security Checks

```typescript
// Bad: Direct fetch without CSRF protection
const onSubmit = async (data) => {
  const res = await fetch("/api/admin/users", { // ❌ No CSRF token
    method: "POST",
    body: JSON.stringify(data),
  });
};
```

## 3. Form Handling Excellence

### React Hook Form + Zod Pattern

```typescript
const schema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
});

export function UserForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = async (data) => {
    // Type-safe data handling
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
```

### Loading States and Error Handling

```typescript
export function AsyncForm() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await fetchWithCsrf("/api/submit", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");

      toast.success("Success!");
      router.push("/success");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
      <Button disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
```

## 4. Error Boundaries

### Comprehensive Error Handling

```typescript
interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to monitoring service
    console.error("Component error:", error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Component Error</h2>
          <p>{this.state.error?.message}</p>
          <Button onClick={this.handleRetry}>Retry</Button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Usage in App Layout

```typescript
export default function Layout({ children }) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}
```

## 5. UI Component Design

### Class Variance Authority Pattern

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
```

### Radix Slot for Composition

```typescript
import { Slot } from "@radix-ui/react-slot";

export interface CustomButtonProps extends ButtonProps {
  asChild?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} {...props} />;
  }
);
```

## 6. Provider Patterns

### Theme Provider Setup

```typescript
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

### Authentication Provider

```typescript
"use client";

import { SessionProvider } from "next-auth/react";

export function AuthProvider({ children, session }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
```

### Motion Configuration

```typescript
"use client";

import { MotionConfig } from "framer-motion";

export function AppMotionConfig({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

## 7. Performance Optimization

### Memoization for Expensive Components

```typescript
export const ExpensiveComponent = React.memo(function ExpensiveComponent({
  data,
  onAction
}) {
  // Expensive rendering logic
  return <div>{/* content */}</div>;
});
```

### Lazy Loading

```typescript
const LazyComponent = lazy(() => import("./LazyComponent"));

export function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

## 8. Accessibility Standards

### ARIA Labels and Roles

```typescript
export function AccessibleForm() {
  return (
    <form role="form" aria-labelledby="form-title">
      <h2 id="form-title">User Information</h2>
      <label htmlFor="name-input">Name</label>
      <input
        id="name-input"
        aria-describedby="name-help"
        aria-invalid={!!errors.name}
      />
      <div id="name-help">Enter your full name</div>
      {errors.name && <div role="alert">{errors.name}</div>}
    </form>
  );
}
```

### Keyboard Navigation

```typescript
export function KeyboardNavigableList({ items, onSelect }) {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        setFocusedIndex(prev => Math.min(prev + 1, items.length - 1));
        break;
      case "ArrowUp":
        setFocusedIndex(prev => Math.max(prev - 1, 0));
        break;
      case "Enter":
        onSelect(items[focusedIndex]);
        break;
    }
  };

  return (
    <ul role="listbox" onKeyDown={handleKeyDown} tabIndex={0}>
      {items.map((item, index) => (
        <li
          key={item.id}
          role="option"
          aria-selected={index === focusedIndex}
          className={index === focusedIndex ? "focused" : ""}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

## 9. Testing Component Behavior

### Permission Testing

```typescript
describe("AdminPanel", () => {
  it("shows access denied without permissions", () => {
    const mockUseAdmin = { hasPermission: () => false };
    // Mock the hook and render component
    expect(screen.getByText("Access Denied")).toBeInTheDocument();
  });

  it("shows content with permissions", () => {
    const mockUseAdmin = { hasPermission: () => true };
    // Render with permissions
    expect(screen.getByText("Admin Content")).toBeInTheDocument();
  });
});
```

### Form Validation Testing

```typescript
describe("UserForm", () => {
  it("validates required fields", async () => {
    render(<UserForm />);
    const submitButton = screen.getByRole("button", { name: /create/i });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
  });
});
```

## 10. Corporate Standards Compliance

### Fortune-500 Security Requirements

- **Zero Trust Components**: Every component validates permissions
- **Secure by Default**: Deny access without explicit permissions
- **Audit-Ready**: Components support comprehensive logging
- **Data Protection**: Never expose sensitive information in UI

### Code Quality Standards

- **TypeScript Strict**: Full type coverage with no `any` types
- **Consistent Patterns**: Standardized component structure
- **Documentation**: JSDoc comments for all public interfaces
- **Testing**: Unit tests for all component logic

### Performance Standards

- **Bundle Optimization**: Tree-shaking friendly components
- **Lazy Loading**: Route-based code splitting
- **Memoization**: Prevent unnecessary re-renders
- **Accessibility**: WCAG 2.1 AA compliance

## 11. Common Pitfalls to Avoid

| Pitfall | Problem | Solution |
|---------|---------|----------|
| Missing "use client" | Server/client mismatches | Add directive for interactive components |
| Direct API calls | CSRF vulnerabilities | Always use `fetchWithCsrf` |
| No permission checks | Unauthorized access | Implement `useAdmin` checks |
| Uncontrolled forms | Poor UX and validation | Use React Hook Form + Zod |
| No error boundaries | Unhandled crashes | Wrap components in ErrorBoundary |
| Missing loading states | Poor user feedback | Show loading indicators |
| Inaccessible components | Legal compliance issues | Implement ARIA attributes |
| Large bundle sizes | Performance issues | Use lazy loading and code splitting |

## 12. Maintenance and Evolution

### Component Versioning

```typescript
// components/v1/Button.tsx
// components/v2/Button.tsx

export { Button as ButtonV1 } from "./v1/Button";
export { Button as ButtonV2 } from "./v2/Button";
```

### Deprecation Strategy

```typescript
/**
 * @deprecated Use ButtonV2 instead
 */
export function OldButton(props) {
  console.warn("OldButton is deprecated, use ButtonV2");
  return <ButtonV2 {...props} />;
}
```

### Migration Guides

When updating component APIs:

1. **Phase 1**: Add new API alongside old
2. **Phase 2**: Deprecation warnings
3. **Phase 3**: Remove old API

## Summary: React Component Quality Checklist

A production-ready React component has:

✓ **Security First**: Permission checks, CSRF protection, safe data handling
✓ **Type Safety**: Full TypeScript coverage with proper interfaces
✓ **User Experience**: Loading states, error handling, accessibility
✓ **Performance**: Memoization, lazy loading, optimized re-renders
✓ **Maintainability**: Consistent patterns, documentation, testing
✓ **Compliance**: Corporate standards, accessibility requirements
✓ **Error Resilience**: Error boundaries, graceful degradation
✓ **Bundle Optimization**: Tree-shaking friendly, code splitting ready