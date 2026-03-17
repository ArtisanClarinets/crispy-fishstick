# ADMIN_TEST_STRATEGY — Testing Approach & Coverage
**Version:** 2.0.0  
**Date:** 2026-02-22  
**Stop-Ship:** Yes — All tests must pass

---

## 1. Testing Philosophy

### 1.1 Quality Gates
Every code change must pass through:
1. **Static Analysis** — Linting, type checking, security scans
2. **Unit Tests** — Component/function level
3. **Integration Tests** — API and service boundaries
4. **E2E Tests** — Critical user journeys
5. **Security Tests** — Vulnerability scanning
6. **Performance Tests** — Load and stress testing

### 1.2 Testing Pyramid

```
        /\
       /  \      E2E Tests (10%)
      /____\     Critical user journeys
     /      \
    /        \   Integration Tests (30%)
   /__________\  API, services, DB
  /            \
 /              \ Unit Tests (60%)
/________________\ Components, utils, logic
```

**Target Coverage:**
- Unit: 80% minimum
- Integration: 70% minimum
- E2E: 100% of critical paths

---

## 2. Unit Testing

### 2.1 Framework & Tools

| Layer | Framework | Mocking |
|-------|-----------|---------|
| Frontend | Vitest + React Testing Library | MSW (API mocking) |
| Backend | Jest | jest-mock, testcontainers |
| Database | - | testcontainers (PostgreSQL) |

### 2.2 Frontend Unit Tests

#### Components
```typescript
// Example: Button Component Test
describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalled();
  });

  it('disables when loading', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

#### Hooks
```typescript
// Example: useAuth Hook Test
describe('useAuth', () => {
  it('returns authenticated user', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeDefined();
  });

  it('handles login', async () => {
    const { result } = renderHook(() => useAuth());
    await act(() => result.current.login(credentials));
    expect(result.current.isAuthenticated).toBe(true);
  });
});
```

#### Utils
```typescript
// Example: Permission Check Test
describe('checkPermission', () => {
  it('allows access with correct permission', () => {
    const user = { roles: ['admin'] };
    expect(checkPermission(user, 'users.read')).toBe(true);
  });

  it('denies access without permission', () => {
    const user = { roles: ['editor'] };
    expect(checkPermission(user, 'users.delete')).toBe(false);
  });
});
```

### 2.3 Backend Unit Tests

#### Services
```typescript
// Example: User Service Test
describe('UserService', () => {
  describe('createUser', () => {
    it('creates user with hashed password', async () => {
      const user = await UserService.createUser({
        email: 'test@example.com',
        password: 'password123'
      });
      expect(user.password).not.toBe('password123');
      expect(await bcrypt.compare('password123', user.password)).toBe(true);
    });

    it('throws on duplicate email', async () => {
      await expect(
        UserService.createUser({ email: 'exists@example.com', password: 'pass' })
      ).rejects.toThrow('Email already exists');
    });
  });
});
```

#### RBAC
```typescript
describe('RBAC', () => {
  it('enforces deny-by-default', () => {
    const user = { roles: [] };
    expect(hasPermission(user, 'any.action')).toBe(false);
  });

  it('allows with explicit grant', () => {
    const user = { roles: [{ permissions: ['content.read'] }] };
    expect(hasPermission(user, 'content.read')).toBe(true);
  });

  it('deny takes precedence over allow', () => {
    const user = {
      roles: [
        { permissions: ['content.delete'], denies: ['content.delete'] }
      ]
    };
    expect(hasPermission(user, 'content.delete')).toBe(false);
  });
});
```

### 2.4 Database Tests (with testcontainers)

```typescript
describe('ContentRepository', () => {
  beforeAll(async () => {
    // Start PostgreSQL container
    container = await new PostgreSqlContainer().start();
    // Initialize database
  });

  it('creates content with version', async () => {
    const content = await ContentRepository.create({
      title: 'Test',
      body: 'Content'
    });
    expect(content.version).toBe(1);
  });

  it('retrieves content by slug', async () => {
    const content = await ContentRepository.findBySlug('test-slug');
    expect(content).toBeDefined();
  });
});
```

---

## 3. Integration Testing

### 3.1 API Integration Tests

```typescript
describe('Content API', () => {
  describe('POST /api/content', () => {
    it('creates content with valid data', async () => {
      const response = await request(app)
        .post('/api/content')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'New Post',
          body: 'Content body',
          slug: 'new-post'
        });
      
      expect(response.status).toBe(201);
      expect(response.body.id).toBeDefined();
    });

    it('rejects without authentication', async () => {
      const response = await request(app)
        .post('/api/content')
        .send({ title: 'Test' });
      
      expect(response.status).toBe(401);
    });

    it('validates required fields', async () => {
      const response = await request(app)
        .post('/api/content')
        .set('Authorization', `Bearer ${authToken}`)
        .send({});
      
      expect(response.status).toBe(400);
      expect(response.body.errors).toContain('title is required');
    });
  });

  describe('GET /api/content/:id', () => {
    it('returns content by id', async () => {
      const response = await request(app)
        .get(`/api/content/${contentId}`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(contentId);
    });

    it('returns 404 for non-existent content', async () => {
      const response = await request(app)
        .get('/api/content/non-existent')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(response.status).toBe(404);
    });
  });
});
```

### 3.2 Database Integration

```typescript
describe('Content Workflow', () => {
  it('publishes content and creates audit log', async () => {
    const content = await createContent({ status: 'draft' });
    
    await publishContent(content.id, { reason: 'Ready for release' });
    
    const updated = await getContent(content.id);
    expect(updated.status).toBe('published');
    
    const auditLog = await getAuditLog({
      targetType: 'content',
      targetId: content.id,
      action: 'publish'
    });
    expect(auditLog).toBeDefined();
  });

  it('rollback reverts to previous version', async () => {
    const content = await createContent({ version: 1 });
    await updateContent(content.id, { version: 2 });
    await publishContent(content.id);
    
    await rollbackContent(content.id, { reason: 'Mistake' });
    
    const rolledBack = await getContent(content.id);
    expect(rolledBack.version).toBe(1);
  });
});
```

### 3.3 External Service Integration

```typescript
describe('SSO Integration', () => {
  it('authenticates via SAML', async () => {
    const samlResponse = generateMockSAMLResponse();
    
    const result = await ssoService.handleSAMLResponse(samlResponse);
    
    expect(result.user).toBeDefined();
    expect(result.token).toBeDefined();
  });

  it('provisions user on first login', async () => {
    const samlResponse = generateMockSAMLResponse({ email: 'new@example.com' });
    
    const result = await ssoService.handleSAMLResponse(samlResponse);
    
    const user = await getUserByEmail('new@example.com');
    expect(user).toBeDefined();
    expect(user.source).toBe('sso');
  });
});
```

---

## 4. E2E Testing

### 4.1 Stop-Ship E2E Scenarios

#### E2E-001: Login → MFA
```typescript
test('Login with MFA', async ({ page }) => {
  // Navigate to login
  await page.goto('/auth/login');
  
  // Enter credentials
  await page.fill('[data-testid=email]', 'admin@vantus.systems');
  await page.fill('[data-testid=password]', 'SecurePass123!');
  await page.click('[data-testid=login-button]');
  
  // Verify MFA page
  await expect(page).toHaveURL('/auth/mfa');
  
  // Enter TOTP code
  const totpCode = generateTOTP(secret);
  await page.fill('[data-testid=totp-code]', totpCode);
  await page.click('[data-testid=verify-button]');
  
  // Verify redirect to dashboard
  await expect(page).toHaveURL('/');
  
  // Verify user is logged in
  await expect(page.locator('[data-testid=user-menu]')).toBeVisible();
});
```

#### E2E-002: Draft → Review → Publish → Rollback
```typescript
test('Content workflow', async ({ page }) => {
  // Login as editor
  await loginAs(page, 'editor');
  
  // Create content
  await page.goto('/content/pages/new');
  await page.fill('[data-testid=title]', 'Test Page');
  await page.fill('[data-testid=slug]', 'test-page');
  await page.fill('[data-testid=body]', 'Test content body');
  await page.click('[data-testid=save-draft]');
  
  // Submit for review
  await page.click('[data-testid=submit-review]');
  
  // Login as publisher
  await loginAs(page, 'publisher');
  
  // Approve and publish
  await page.goto('/publishing/queue');
  await page.click('[data-testid=approve-test-page]');
  await page.fill('[data-testid=approval-reason]', 'Looks good');
  await page.click('[data-testid=confirm-publish]');
  
  // Verify published
  await page.goto('/content/pages/test-page');
  await expect(page.locator('[data-testid=status]')).toHaveText('published');
  
  // Rollback
  await page.click('[data-testid=rollback]');
  await page.fill('[data-testid=rollback-reason]', 'Mistake');
  await page.click('[data-testid=confirm-rollback]');
  
  // Verify rolled back
  await expect(page.locator('[data-testid=status]')).toHaveText('draft');
});
```

#### E2E-003: Edit SKU → Verify
```typescript
test('Pricing workflow', async ({ page }) => {
  await loginAs(page, 'billing-admin');
  
  // Navigate to SKU
  await page.goto('/pricing/skus');
  await page.click('[data-testid=sku-basic-plan]');
  
  // Edit price
  await page.click('[data-testid=edit]');
  await page.fill('[data-testid=price]', '9900'); // See pricing/pricing_public.yaml.00
  await page.click('[data-testid=save]');
  
  // Verify change
  await expect(page.locator('[data-testid=verification-status]'))
    .toHaveText('unverified');
  
  // Verify price
  await page.click('[data-testid=verify]');
  await page.fill('[data-testid=verification-notes]', 'Verified with finance');
  await page.click('[data-testid=confirm-verify]');
  
  // Verify status
  await expect(page.locator('[data-testid=verification-status]'))
    .toHaveText('verified');
});
```

#### E2E-004: Lead → Convert → Org + Invite
```typescript
test('CRM conversion workflow', async ({ page }) => {
  await loginAs(page, 'sales-manager');
  
  // Create lead
  await page.goto('/crm/leads/new');
  await page.fill('[data-testid=email]', 'prospect@example.com');
  await page.fill('[data-testid=first-name]', 'John');
  await page.fill('[data-testid=last-name]', 'Doe');
  await page.fill('[data-testid=company]', 'Acme Corp');
  await page.click('[data-testid=save]');
  
  // Convert lead
  await page.click('[data-testid=convert]');
  await page.fill('[data-testid=org-name]', 'Acme Corp');
  await page.click('[data-testid=confirm-convert]');
  
  // Verify org created
  await page.goto('/orgs');
  await expect(page.locator('text=Acme Corp')).toBeVisible();
  
  // Invite user
  await page.click('text=Acme Corp');
  await page.click('[data-testid=invite-member]');
  await page.fill('[data-testid=invite-email]', 'prospect@example.com');
  await page.selectOption('[data-testid=invite-role]', 'admin');
  await page.click('[data-testid=send-invite]');
  
  // Verify invitation
  await expect(page.locator('text=Invitation sent')).toBeVisible();
});
```

#### E2E-005: Create Redirect (Loop Prevention)
```typescript
test('Redirect with loop prevention', async ({ page }) => {
  await loginAs(page, 'publisher');
  
  // Create first redirect
  await page.goto('/redirects/new');
  await page.fill('[data-testid=from]', '/old-page');
  await page.fill('[data-testid=to]', '/new-page');
  await page.click('[data-testid=save]');
  
  // Try to create loop
  await page.goto('/redirects/new');
  await page.fill('[data-testid=from]', '/new-page');
  await page.fill('[data-testid=to]', '/old-page');
  await page.click('[data-testid=save]');
  
  // Verify error
  await expect(page.locator('[data-testid=error]'))
    .toContainText('would create a redirect loop');
});
```

### 4.2 Cross-Browser Testing

| Browser | Versions | Priority |
|---------|----------|----------|
| Chrome | Latest, Latest-1 | Critical |
| Firefox | Latest, Latest-1 | High |
| Safari | Latest, Latest-1 | High |
| Edge | Latest | Medium |

### 4.3 Mobile Testing

| Device | OS | Priority |
|--------|-----|----------|
| iPhone 14 | iOS 17 | High |
| iPhone SE | iOS 17 | Medium |
| Pixel 7 | Android 14 | High |
| Samsung S23 | Android 14 | Medium |

---

## 5. Security Testing

### 5.1 Automated Security Scans

| Tool | Scope | Frequency |
|------|-------|-----------|
| OWASP ZAP | Full application | Daily |
| Snyk | Dependencies | Every PR |
| SonarQube | Code quality + security | Every PR |
| Trivy | Container images | Every build |
| GitLeaks | Secrets detection | Every commit |

### 5.2 Penetration Testing

| Type | Frequency | Provider |
|------|-----------|----------|
| External Network | Quarterly | Third-party |
| Web Application | Quarterly | Third-party |
| API Security | Quarterly | Third-party |
| Red Team | Annually | Third-party |

### 5.3 Security Test Cases

```typescript
describe('Security', () => {
  test('XSS prevention', async () => {
    const maliciousContent = '<script>alert("xss")</script>';
    await createContent({ body: maliciousContent });
    
    const response = await getContent();
    expect(response.body).not.toContain('<script>');
    expect(response.body).toContain('&lt;script&gt;');
  });

  test('SQL injection prevention', async () => {
    const maliciousId = "1' OR '1'='1";
    const response = await request(app)
      .get(`/api/content/${maliciousId}`);
    
    expect(response.status).toBe(400);
  });

  test('RBAC enforcement', async () => {
    const userToken = await getTokenForUser('editor');
    
    const response = await request(app)
      .delete('/api/users/123')
      .set('Authorization', `Bearer ${userToken}`);
    
    expect(response.status).toBe(403);
  });

  test('Rate limiting', async () => {
    const requests = Array(150).fill(null).map(() =>
      request(app).post('/api/auth/login')
    );
    
    const responses = await Promise.all(requests);
    const rateLimited = responses.filter(r => r.status === 429);
    expect(rateLimited.length).toBeGreaterThan(0);
  });
});
```

---

## 6. Performance Testing

### 6.1 Load Testing

```typescript
// K6 Load Test
export const options = {
  stages: [
    { duration: '2m', target: 100 },   // Ramp up
    { duration: '5m', target: 100 },   // Steady state
    { duration: '2m', target: 200 },   // Spike
    { duration: '5m', target: 200 },   // Sustained
    { duration: '2m', target: 0 },     // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'],
    http_req_failed: ['rate<0.1'],
  },
};

export default function () {
  const response = http.get(`${BASE_URL}/api/content`);
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
}
```

### 6.2 Performance Budgets

| Metric | Budget | Warning | Critical |
|--------|--------|---------|----------|
| First Contentful Paint | < 1.5s | 2s | 3s |
| Largest Contentful Paint | < 2.5s | 3s | 4s |
| Time to Interactive | < 3.5s | 4s | 5s |
| API Response (p95) | < 200ms | 300ms | 500ms |
| Bundle Size | < 200KB | 250KB | 300KB |

---

## 7. Accessibility Testing

### 7.1 Automated Checks

```typescript
describe('Accessibility', () => {
  test('page meets WCAG 2.1 AA', async () => {
    await page.goto('/content/pages');
    
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    expect(results.violations).toHaveLength(0);
  });

  test('keyboard navigation works', async () => {
    await page.goto('/content/pages/new');
    
    // Tab through form
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.activeElement?.dataset.testid))
      .toBe('title');
    
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.activeElement?.dataset.testid))
      .toBe('slug');
  });

  test('color contrast meets standards', async () => {
    const results = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();
    
    expect(results.violations).toHaveLength(0);
  });
});
```

### 7.2 Screen Reader Testing

- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)
- TalkBack (Android)

---

## 8. Test Data Management

### 8.1 Test Fixtures

```typescript
// fixtures/users.ts
export const testUsers = {
  superAdmin: {
    email: 'super@example.com',
    password: 'SuperSecure123!',
    roles: ['SUPER_ADMIN']
  },
  editor: {
    email: 'editor@example.com',
    password: 'EditorPass123!',
    roles: ['CONTENT_EDITOR']
  },
  publisher: {
    email: 'publisher@example.com',
    password: 'Publisher123!',
    roles: ['CONTENT_PUBLISHER']
  },
  salesRep: {
    email: 'sales@example.com',
    password: 'SalesPass123!',
    roles: ['SALES_REP']
  },
  billingAdmin: {
    email: 'billing@example.com',
    password: 'Billing123!',
    roles: ['BILLING_ADMIN']
  }
};
```

### 8.2 Database Seeding

```typescript
// seed.ts
export async function seedTestDatabase() {
  await db.transaction(async (trx) => {
    // Create test users
    for (const user of Object.values(testUsers)) {
      await trx.users.create({
        data: {
          ...user,
          password: await hashPassword(user.password),
          emailVerified: true
        }
      });
    }
    
    // Create test content
    await trx.content.create({
      data: {
        title: 'Test Page',
        slug: 'test-page',
        status: 'draft',
        createdBy: 'super@example.com'
      }
    });
  });
}
```

---

## 9. CI/CD Integration

### 9.1 Pipeline Stages

```yaml
# .github/workflows/test.yml
stages:
  - lint
  - unit-test
  - integration-test
  - security-scan
  - build
  - e2e-test
  - performance-test
  - deploy

lint:
  script:
    - npm run lint
    - npm run typecheck

unit-test:
  script:
    - npm run test:unit
  coverage:
    - minimum: 80%

integration-test:
  script:
    - docker-compose up -d test-db
    - npm run test:integration
    - docker-compose down

security-scan:
  script:
    - snyk test
    - trivy fs .
    - gitleaks detect

e2e-test:
  script:
    - npm run build
    - npm run test:e2e
  artifacts:
    - playwright-report/

performance-test:
  script:
    - k6 run load-test.js
  only:
    - main
```

### 9.2 Quality Gates

| Gate | Requirement | Block Merge |
|------|-------------|-------------|
| Lint | Zero errors | Yes |
| Type Check | Zero errors | Yes |
| Unit Tests | 80% coverage, all pass | Yes |
| Integration Tests | All pass | Yes |
| Security Scan | Zero critical/high | Yes |
| E2E Critical | All pass | Yes |

---

## 10. Test Maintenance

### 10.1 Flaky Test Prevention

- No external dependencies in unit tests
- Use data-testid for selectors
- Wait for network idle in E2E
- Retry failed tests once (CI only)
- Quarantine flaky tests immediately

### 10.2 Test Documentation

Every test file must include:
- Purpose description
- Setup requirements
- Test data dependencies
- Cleanup procedures

---

**End of ADMIN_TEST_STRATEGY v2.0.0**


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
