---
Document: TEST_CASE_CATALOG
Doc ID: VS-TEMPLATE-QUALITY-008
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: QA Engineer / Test Architect
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: [docs/06_delivery_quality/08_TEST_CASE_CATALOG.md](docs/06_delivery_quality/08_TEST_CASE_CATALOG.md)
---

# Test Case Catalog

## 1. Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-02 | QA Lead | Initial template creation |

---

## 2. Purpose and Scope

### 2.1 Purpose
This document serves as the canonical repository of manual and automated test cases for [PROJECT NAME], providing a comprehensive reference library for testing activities and requirement traceability.

### 2.2 Scope
- Functional test cases for all features
- Non-functional test cases (performance, security, accessibility)
- Integration test scenarios
- Regression test suites
- Automated test references

---

## 3. Test Case Structure

### 3.1 Test Case Template

Each test case in this catalog follows this standard structure:

| Field | Description |
|-------|-------------|
| **ID** | Unique identifier (format: TC-[CATEGORY]-[###]) |
| **Title** | Brief, descriptive name |
| **Priority** | P0 (Critical), P1 (High), P2 (Medium), P3 (Low) |
| **Category** | Functional area (AUTH, DATA, SEC, etc.) |
| **Type** | Unit, Integration, E2E, Security, Performance |
| **Requirement Ref** | Link to requirement ID |
| **Preconditions** | Setup required before execution |
| **Steps** | Detailed execution steps |
| **Expected Result** | Pass criteria |
| **Test Data** | Data requirements |
| **Automated?** | Yes/No with reference |
| **Last Updated** | Date of last modification |

### 3.2 Priority Definitions

| Priority | Criteria | Execution Frequency |
|----------|----------|---------------------|
| **P0 - Critical** | Core business functionality, no workaround | Every build |
| **P1 - High** | Important features, workaround exists | Daily/nightly |
| **P2 - Medium** | Nice-to-have features | Weekly |
| **P3 - Low** | Edge cases, cosmetic | Pre-release |

---

## 4. Catalog Index

### 4.1 By Category

| Category | Description | Test Count | Automation % |
|----------|-------------|------------|--------------|
| **AUTH** | Authentication & Authorization | [X] | [X%] |
| **DATA** | Data Integrity & Lifecycle | [X] | [X%] |
| **SEC** | Security Hardening | [X] | [X%] |
| **PERF** | Performance & Load | [X] | [X%] |
| **UI** | User Interface & Accessibility | [X] | [X%] |
| **API** | API & Integration | [X] | [X%] |
| **REG** | Regression Suite | [X] | [X%] |

### 4.2 By Priority

| Priority | Count | Automated | Manual |
|----------|-------|-----------|--------|
| P0 - Critical | [X] | [X] | [X] |
| P1 - High | [X] | [X] | [X] |
| P2 - Medium | [X] | [X] | [X] |
| P3 - Low | [X] | [X] | [X] |

---

## 5. Test Cases by Category

### 5.1 AUTH - Authentication & Authorization

#### TC-AUTH-001: User Login - Valid Credentials
**Priority:** P0  
**Type:** E2E  
**Requirement Reference:** REQ-AUTH-001  
**Automated?** Yes ([tests/auth/login.spec.ts](tests/auth/login.spec.ts))

**Preconditions:**
- User account exists with valid credentials
- Account is active and not locked
- 2FA not enabled for this account

**Steps:**
1. Navigate to login page
2. Enter valid username
3. Enter valid password
4. Click "Sign In" button

**Expected Result:**
- User is authenticated successfully
- Redirected to dashboard
- Session token created
- Last login timestamp updated

**Test Data:**
- Username: `valid.user@example.com`
- Password: `ValidPass123!`

---

#### TC-AUTH-002: User Login - Invalid Credentials
**Priority:** P0  
**Type:** E2E  
**Requirement Reference:** REQ-AUTH-001  
**Automated?** Yes ([tests/auth/login.spec.ts](tests/auth/login.spec.ts))

**Preconditions:**
- User account exists

**Steps:**
1. Navigate to login page
2. Enter valid username
3. Enter invalid password
4. Click "Sign In" button

**Expected Result:**
- Authentication fails
- Error message displayed: "Invalid credentials"
- Account lockout counter incremented
- No session created

---

#### TC-AUTH-003: Account Lockout After Failed Attempts
**Priority:** P1  
**Type:** E2E  
**Requirement Reference:** REQ-AUTH-002  
**Automated?** Yes ([tests/auth/lockout.spec.ts](tests/auth/lockout.spec.ts))

**Preconditions:**
- User account exists
- Failed login attempt counter at 0

**Steps:**
1. Attempt login with invalid password (Attempt 1)
2. Attempt login with invalid password (Attempt 2)
3. Attempt login with invalid password (Attempt 3)
4. Attempt login with invalid password (Attempt 4)
5. Attempt login with invalid password (Attempt 5)

**Expected Result:**
- After 5th failed attempt, account is locked
- Error message: "Account locked. Contact administrator."
- Lockout notification email sent
- Even valid credentials rejected during lockout

---

#### TC-AUTH-022: Admin 2FA Enforcement
**Priority:** P0  
**Type:** E2E  
**Requirement Reference:** REQ-AUTH-010  
**Automated?** Yes ([tests/auth/2fa.spec.ts](tests/auth/2fa.spec.ts))

**Preconditions:**
- User has 'Admin' role
- 2FA is configured for the account

**Steps:**
1. Login with valid credentials
2. Land on 2FA prompt
3. Attempt to navigate to `/admin/dashboard` directly via URL

**Expected Result:**
- Redirected back to 2FA prompt
- Access denied to admin area
- Audit log entry created for bypass attempt

---

#### TC-AUTH-030: Session Timeout
**Priority:** P1  
**Type:** Integration  
**Requirement Reference:** REQ-AUTH-015  
**Automated?** Yes ([tests/auth/session.spec.ts](tests/auth/session.spec.ts))

**Preconditions:**
- User is logged in
- Session timeout configured to 30 minutes

**Steps:**
1. Login successfully
2. Remain idle for 31 minutes
3. Attempt to access protected resource

**Expected Result:**
- Session expired
- Redirected to login page
- Message: "Session expired. Please login again."

---

### 5.2 DATA - Data Integrity & Lifecycle

#### TC-DATA-001: Data Creation - Valid Input
**Priority:** P0  
**Type:** Integration  
**Requirement Reference:** REQ-DATA-001  
**Automated?** Yes ([tests/data/create.spec.ts](tests/data/create.spec.ts))

**Preconditions:**
- Database connection active
- User has create permissions

**Steps:**
1. Submit valid data payload to API
2. Verify response status
3. Query database directly
4. Verify audit log entry

**Expected Result:**
- 201 Created response
- Data persisted correctly in database
- All required fields populated
- Created timestamp set
- Audit log entry created

**Test Data:**
```json
{
  "name": "Test Record",
  "description": "Valid test data",
  "status": "active"
}
```

---

#### TC-DATA-002: Data Validation - Required Fields
**Priority:** P0  
**Type:** Integration  
**Requirement Reference:** REQ-DATA-002  
**Automated?** Yes ([tests/data/validation.spec.ts](tests/data/validation.spec.ts))

**Preconditions:**
- API endpoint accessible

**Steps:**
1. Submit payload with missing required field
2. Verify response

**Expected Result:**
- 400 Bad Request response
- Error message indicates missing field
- No data created in database

---

#### TC-DATA-010: Data Deletion - Soft Delete
**Priority:** P1  
**Type:** Integration  
**Requirement Reference:** REQ-DATA-010  
**Automated?** Yes ([tests/data/delete.spec.ts](tests/data/delete.spec.ts))

**Preconditions:**
- Record exists in database
- User has delete permissions

**Steps:**
1. Delete record via API
2. Query database for record
3. Attempt to retrieve via API

**Expected Result:**
- Record marked as deleted (deleted_at timestamp set)
- Record not returned in standard queries
- Record retrievable with "include deleted" flag
- Audit log entry created

---

### 5.3 SEC - Security Hardening

#### TC-SEC-001: SQL Injection Prevention
**Priority:** P0  
**Type:** Security  
**Requirement Reference:** REQ-SEC-001  
**Automated?** Yes ([tests/security/injection.spec.ts](tests/security/injection.spec.ts))

**Preconditions:**
- API endpoint with search functionality available

**Steps:**
1. Submit SQL injection payload in search field: `' OR '1'='1`
2. Observe system response
3. Verify database integrity

**Expected Result:**
- Input sanitized or rejected
- No unauthorized data access
- No database errors exposed
- Request logged for security review

---

#### TC-SEC-002: XSS Prevention - Stored
**Priority:** P0  
**Type:** Security  
**Requirement Reference:** REQ-SEC-002  
**Automated?** Yes ([tests/security/xss.spec.ts](tests/security/xss.spec.ts))

**Preconditions:**
- User can create content

**Steps:**
1. Create content with XSS payload: `<script>alert('xss')</script>`
2. View content in browser
3. Inspect rendered HTML

**Expected Result:**
- Script tags encoded/escaped
- No JavaScript execution
- Content displayed safely

---

#### TC-SEC-003: Authorization - Horizontal Access Control
**Priority:** P0  
**Type:** Security  
**Requirement Reference:** REQ-SEC-003  
**Automated?** Yes ([tests/security/authz.spec.ts](tests/security/authz.spec.ts))

**Preconditions:**
- User A and User B exist with separate data
- User A authenticated

**Steps:**
1. Login as User A
2. Attempt to access User B's data via API
3. Attempt to modify User B's data

**Expected Result:**
- 403 Forbidden response
- No access to other user's data
- Security audit log entry created

---

#### TC-SEC-004: Authorization - Vertical Access Control
**Priority:** P0  
**Type:** Security  
**Requirement Reference:** REQ-SEC-004  
**Automated?** Yes ([tests/security/authz-admin.spec.ts](tests/security/authz-admin.spec.ts))

**Preconditions:**
- Regular user account (non-admin)
- Admin-only endpoints exist

**Steps:**
1. Login as regular user
2. Attempt to access admin endpoints
3. Attempt admin-only operations

**Expected Result:**
- 403 Forbidden for all admin operations
- No privilege escalation possible

---

#### TC-SEC-005: Data Encryption at Rest Verification
**Priority:** P0  
**Type:** Security  
**Requirement Reference:** REQ-SEC-010  
**Automated?** No (Manual Audit)

**Preconditions:**
- Access to cloud provider console or Terraform state

**Steps:**
1. Inspect the RDS instance configuration
2. Check for `StorageEncrypted: true`
3. Verify KMS key configuration

**Expected Result:**
- Storage encryption enabled
- KMS key properly configured
- Encryption at rest confirmed

---

#### TC-SEC-006: TLS Configuration Verification
**Priority:** P1  
**Type:** Security  
**Requirement Reference:** REQ-SEC-011  
**Automated?** Yes ([tests/security/tls.spec.ts](tests/security/tls.spec.ts))

**Preconditions:**
- Application deployed and accessible

**Steps:**
1. Run SSL Labs scan
2. Verify TLS version
3. Check certificate validity
4. Verify cipher suites

**Expected Result:**
- TLS 1.2 or higher only
- Valid certificate
- Strong cipher suites
- No weak protocols enabled

---

### 5.4 PERF - Performance & Load

#### TC-PERF-001: API Response Time - p95
**Priority:** P0  
**Type:** Performance  
**Requirement Reference:** REQ-PERF-001  
**Automated?** Yes ([tests/performance/api-latency.spec.ts](tests/performance/api-latency.spec.ts))

**Preconditions:**
- Load testing environment ready
- Baseline established

**Steps:**
1. Execute load test with 1000 concurrent users
2. Measure response times
3. Calculate p95 latency

**Expected Result:**
- p95 response time < 200ms
- No errors during test
- System remains stable

**Test Data:**
- Concurrent users: 1000
- Duration: 10 minutes
- Ramp-up: 2 minutes

---

#### TC-PERF-002: Database Query Performance
**Priority:** P1  
**Type:** Performance  
**Requirement Reference:** REQ-PERF-002  
**Automated?** Yes ([tests/performance/db-queries.spec.ts](tests/performance/db-queries.spec.ts))

**Preconditions:**
- Database populated with production-like data volume
- Slow query log enabled

**Steps:**
1. Execute common queries
2. Monitor query execution time
3. Check for full table scans
4. Review execution plans

**Expected Result:**
- All queries execute < 100ms
- No queries without index usage
- No N+1 query patterns

---

#### TC-PERF-003: Concurrent User Load
**Priority:** P1  
**Type:** Performance  
**Requirement Reference:** REQ-PERF-003  
**Automated?** Yes ([tests/performance/load.spec.ts](tests/performance/load.spec.ts))

**Preconditions:**
- Load testing environment ready
- Monitoring dashboards accessible

**Steps:**
1. Gradually increase load from 100 to 2000 users
2. Monitor system metrics
3. Identify breaking point

**Expected Result:**
- System handles 2000 concurrent users
- Error rate < 0.1%
- Response time degradation < 50%

---

### 5.5 UI - User Interface & Accessibility

#### TC-UI-001: Responsive Design - Mobile
**Priority:** P1  
**Type:** E2E  
**Requirement Reference:** REQ-UI-001  
**Automated?** Yes ([tests/ui/responsive.spec.ts](tests/ui/responsive.spec.ts))

**Preconditions:**
- Application deployed
- BrowserStack or device available

**Steps:**
1. Open application on mobile viewport (375px width)
2. Navigate through key pages
3. Interact with all UI elements
4. Check for horizontal scrolling

**Expected Result:**
- Layout adapts to viewport
- All elements accessible
- No horizontal scroll
- Touch targets minimum 44px

---

#### TC-UI-002: Accessibility - Keyboard Navigation
**Priority:** P1  
**Type:** E2E  
**Requirement Reference:** REQ-UI-010  
**Automated?** Yes ([tests/ui/a11y-keyboard.spec.ts](tests/ui/a11y-keyboard.spec.ts))

**Preconditions:**
- Application accessible
- Keyboard available

**Steps:**
1. Navigate entire page using Tab key
2. Verify focus indicators visible
3. Activate buttons with Enter/Space
4. Test skip links

**Expected Result:**
- All interactive elements focusable
- Focus order logical
- Focus indicator visible
- No keyboard traps

---

#### TC-UI-003: Accessibility - Screen Reader
**Priority:** P1  
**Type:** E2E  
**Requirement Reference:** REQ-UI-011  
**Automated?** Partial ([tests/ui/a11y-axe.spec.ts](tests/ui/a11y-axe.spec.ts))

**Preconditions:**
- Screen reader installed (NVDA/JAWS/VoiceOver)
- Application accessible

**Steps:**
1. Navigate page with screen reader
2. Verify headings announced
3. Check form labels
4. Test ARIA landmarks

**Expected Result:**
- All content announced correctly
- Form labels associated with inputs
- ARIA attributes valid
- No empty button/link text

---

### 5.6 API - API & Integration

#### TC-API-001: GET Request - Valid
**Priority:** P0  
**Type:** Integration  
**Requirement Reference:** REQ-API-001  
**Automated?** Yes ([tests/api/get.spec.ts](tests/api/get.spec.ts))

**Preconditions:**
- API server running
- Test data exists

**Steps:**
1. Send GET request to `/api/v1/resource`
2. Include valid authentication header
3. Verify response

**Expected Result:**
- 200 OK status
- Response matches OpenAPI schema
- Pagination info included
- Data correctly formatted

---

#### TC-API-002: POST Request - Create Resource
**Priority:** P0  
**Type:** Integration  
**Requirement Reference:** REQ-API-002  
**Automated?** Yes ([tests/api/post.spec.ts](tests/api/post.spec.ts))

**Preconditions:**
- API server running
- Valid authentication

**Steps:**
1. Send POST request to `/api/v1/resource`
2. Include valid payload
3. Verify response

**Expected Result:**
- 201 Created status
- Resource created in database
- Response includes created resource
- Location header set

---

#### TC-API-003: Error Handling - 404 Not Found
**Priority:** P1  
**Type:** Integration  
**Requirement Reference:** REQ-API-010  
**Automated?** Yes ([tests/api/errors.spec.ts](tests/api/errors.spec.ts))

**Preconditions:**
- API server running

**Steps:**
1. Send GET request to non-existent resource
2. Verify response

**Expected Result:**
- 404 Not Found status
- Error message in standard format
- No stack trace exposed

---

#### TC-API-004: Rate Limiting
**Priority:** P1  
**Type:** Integration  
**Requirement Reference:** REQ-API-015  
**Automated?** Yes ([tests/api/rate-limit.spec.ts](tests/api/rate-limit.spec.ts))

**Preconditions:**
- Rate limiting configured (100 req/min)
- API accessible

**Steps:**
1. Send 101 requests within 60 seconds
2. Observe responses

**Expected Result:**
- First 100 requests succeed
- 101st request returns 429 Too Many Requests
- Retry-After header present

---

### 5.7 REG - Regression Suite

#### TC-REG-001: Critical Path - End-to-End
**Priority:** P0  
**Type:** E2E  
**Requirement Reference:** Multiple  
**Automated?** Yes ([tests/regression/critical-path.spec.ts](tests/regression/critical-path.spec.ts))

**Preconditions:**
- Full system operational
- Test data available

**Steps:**
1. Complete user registration
2. Login
3. Perform core business function
4. Logout

**Expected Result:**
- All steps complete successfully
- No errors in logs
- Data integrity maintained

---

#### TC-REG-002: Cross-Browser Compatibility
**Priority:** P1  
**Type:** E2E  
**Requirement Reference:** REQ-UI-020  
**Automated?** Yes ([tests/regression/cross-browser.spec.ts](tests/regression/cross-browser.spec.ts))

**Preconditions:**
- BrowserStack access
- Application deployed

**Steps:**
1. Execute critical tests on Chrome
2. Execute critical tests on Firefox
3. Execute critical tests on Safari
4. Execute critical tests on Edge

**Expected Result:**
- All browsers show consistent behavior
- No JavaScript errors
- Layout consistent

**Browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 6. Test Case Maintenance

### 6.1 Review Schedule

| Activity | Frequency | Owner |
|----------|-----------|-------|
| Test case review | Monthly | QA Lead |
| Automation coverage review | Quarterly | Test Architect |
| Obsolete test removal | Per release | QA Engineer |
| New test case creation | Per feature | QA Engineer |

### 6.2 Change Log

| Date | Test Case | Change | Author |
|------|-----------|--------|--------|
| [Date] | [TC-ID] | [Description] | [Name] |

---

## 7. Automation Status

### 7.1 Automation Coverage

| Category | Total | Automated | Coverage % |
|----------|-------|-----------|------------|
| AUTH | [X] | [X] | [X%] |
| DATA | [X] | [X] | [X%] |
| SEC | [X] | [X] | [X%] |
| PERF | [X] | [X] | [X%] |
| UI | [X] | [X] | [X%] |
| API | [X] | [X] | [X%] |
| **TOTAL** | **[X]** | **[X]** | **[X%]** |

### 7.2 Automation Tools

| Tool | Purpose | Coverage |
|------|---------|----------|
| Playwright | E2E testing | [X%] |
| Vitest | Unit testing | [X%] |
| k6 | Performance testing | [X%] |
| OWASP ZAP | Security scanning | [X%] |
| Axe | Accessibility testing | [X%] |

---

## 8. Related Documents

- [01_TEST_STRATEGY.md](01_TEST_STRATEGY.md)
- [02_TEST_PLAN.md](02_TEST_PLAN.md)
- [07_QA_REPORT_TEMPLATE.md](07_QA_REPORT_TEMPLATE.md)
- [09_RELEASE_READINESS_REVIEW.md](09_RELEASE_READINESS_REVIEW.md)

---

[End of Test Case Catalog]
