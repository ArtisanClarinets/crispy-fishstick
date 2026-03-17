---
Document: ACCEPTANCE_CRITERIA_CATALOG
Doc ID: VS-TEMPLATE-DISCOVERY-007
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: QA Lead / Business Analyst
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/company-docs/client-project-doc-templates/docs/03_discovery/07_ACCEPTANCE_CRITERIA_CATALOG.md
---

# Acceptance Criteria Catalog

## Instructions

This document serves as a comprehensive library of acceptance criteria patterns, templates, and specific criteria for all requirements. Use it to:
- Ensure consistent, testable acceptance criteria across all requirements
- Provide reusable patterns for common scenarios
- Support test case generation and automation
- Define clear "Definition of Done" for each feature
- Enable traceability between requirements and verification

**When to update:** Continuously as requirements are defined; finalized before development begins.

**BABOK Alignment:** Requirements Analysis and Design Definition, Solution Evaluation

**Acceptance Criteria Standards:**
- Must be testable (pass/fail determination)
- Use Given-When-Then format for behavioral criteria
- Include both positive and negative scenarios
- Define measurable outcomes
- Cover functional and non-functional aspects

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [[2026-02-25]] | [[Author Name]] | Initial template creation |
| 2.0 | 2026-02-02 | Vantus Systems | Comprehensive BABOK-aligned update with patterns library |

**Distribution List:**
- [[QA Lead]]
- [[Business Analyst]]
- [[Development Team]]
- [[Product Owner]]

---

## 1. Acceptance Criteria Patterns Library

### 1.1 Given-When-Then Template

**Format:**
```
Given [precondition/context]
When [action/event occurs]
Then [expected outcome/result]
```

**Example:**
```
Given a user with valid credentials
When they submit the login form
Then they are authenticated and redirected to the dashboard
And their last login timestamp is updated
```

### 1.2 Common Patterns by Category

#### Authentication Patterns

| Pattern ID | Pattern | Example |
|------------|---------|---------|
| AUTH-P01 | Valid credentials acceptance | [[Given valid username/password, when submitted, then user authenticated]] |
| AUTH-P02 | Invalid credentials rejection | [[Given invalid credentials, when submitted, then error shown and access denied]] |
| AUTH-P03 | Account lockout | [[Given 5 failed attempts, when next attempt made, then account locked]] |
| AUTH-P04 | Session timeout | [[Given 30 min inactivity, when user attempts action, then redirect to login]] |
| AUTH-P05 | Password complexity | [[Given password < 12 chars, when submitted, then validation error shown]] |
| AUTH-P06 | MFA requirement | [[Given admin role, when logging in, then MFA prompt displayed]] |

#### Data Validation Patterns

| Pattern ID | Pattern | Example |
|------------|---------|---------|
| VAL-P01 | Required field | [[Given empty required field, when form submitted, then error displayed]] |
| VAL-P02 | Format validation | [[Given invalid email format, when submitted, then format error shown]] |
| VAL-P03 | Range validation | [[Given value outside range, when submitted, then range error shown]] |
| VAL-P04 | Unique constraint | [[Given duplicate value, when submitted, then uniqueness error shown]] |
| VAL-P05 | Cross-field validation | [[Given mismatched passwords, when submitted, then mismatch error shown]] |

#### CRUD Operation Patterns

| Pattern ID | Pattern | Example |
|------------|---------|---------|
| CRUD-P01 | Create success | [[Given valid data, when create submitted, then record created and confirmation shown]] |
| CRUD-P02 | Read/display | [[Given existing record, when viewed, then all fields displayed correctly]] |
| CRUD-P03 | Update success | [[Given valid changes, when update submitted, then record updated and audit logged]] |
| CRUD-P04 | Delete success | [[Given delete confirmation, when confirmed, then record removed and logged]] |
| CRUD-P05 | List/filter | [[Given filter criteria, when applied, then matching records displayed]] |

#### UI/UX Patterns

| Pattern ID | Pattern | Example |
|------------|---------|---------|
| UI-P01 | Responsive design | [[Given mobile viewport, when page loaded, then layout adapts appropriately]] |
| UI-P02 | Loading states | [[Given slow operation, when in progress, then loading indicator displayed]] |
| UI-P03 | Error display | [[Given error condition, when occurs, then user-friendly error shown]] |
| UI-P04 | Keyboard navigation | [[Given keyboard user, when navigating, then all elements accessible]] |
| UI-P05 | Accessibility | [[Given screen reader, when page loaded, then content properly announced]] |

#### Integration Patterns

| Pattern ID | Pattern | Example |
|------------|---------|---------|
| INT-P01 | API success | [[Given valid request, when API called, then 200 response with data returned]] |
| INT-P02 | API error handling | [[Given invalid request, when API called, then appropriate error code returned]] |
| INT-P03 | Timeout handling | [[Given timeout condition, when occurs, then graceful degradation applied]] |
| INT-P04 | Data sync | [[Given source update, when sync runs, then target updated within SLA]] |

### 1.3 Acceptance Criteria Quality Checklist

Before finalizing acceptance criteria, verify:

- [ ] **Specific:** Criteria describe exact behavior, not vague concepts
- [ ] **Measurable:** Outcome can be objectively verified
- [ ] **Achievable:** Criteria can be implemented and tested
- [ ] **Relevant:** Criteria relate to stated requirement
- [ ] **Testable:** Pass/fail can be determined
- [ ] **Complete:** All scenarios covered (happy path + edge cases)
- [ ] **Unambiguous:** No room for interpretation
- [ ] **Atomic:** Each criterion tests one thing

---

## 2. Functional Acceptance Criteria

### 2.1 Authentication & Authorization

#### AC-AUTH-001: User Login - Success

| Attribute | Value |
|-----------|-------|
| **Requirement** | [[FR-AUTH-001]] |
| **Priority** | [[Must]] |
| **Test Type** | [[Automated]] |

**Acceptance Criteria:**
```
Given a registered user with valid credentials
When they enter username and password on the login page
And click the "Sign In" button
Then they are authenticated successfully
And redirected to the dashboard
And a session is created with 30-minute timeout
And the last login timestamp is updated in the database
And an audit log entry is created
```

**Test Data:**
| Username | Password | Expected Result |
|----------|----------|-----------------|
| [[valid.user]] | [[CorrectPass123!]] | [[Success]] |

---

#### AC-AUTH-002: User Login - Invalid Credentials

| Attribute | Value |
|-----------|-------|
| **Requirement** | [[FR-AUTH-001]] |
| **Priority** | [[Must]] |
| **Test Type** | [[Automated]] |

**Acceptance Criteria:**
```
Given a user enters invalid credentials
When they submit the login form
Then an error message "Invalid username or password" is displayed
And the user remains on the login page
And no session is created
And the failed attempt is logged
And after 5 consecutive failures, the account is locked for 30 minutes
```

**Test Data:**
| Username | Password | Attempt | Expected Result |
|----------|----------|---------|-----------------|
| [[valid.user]] | [[WrongPass]] | [[1-4]] | [[Error message]] |
| [[valid.user]] | [[WrongPass]] | [[5]] | [[Account locked]] |

---

#### AC-AUTH-003: Password Reset

| Attribute | Value |
|-----------|-------|
| **Requirement** | [[FR-AUTH-007]] |
| **Priority** | [[Must]] |
| **Test Type** | [[Automated]] |

**Acceptance Criteria:**
```
Given a user clicks "Forgot Password"
When they enter their registered email address
And click "Send Reset Link"
Then a password reset email is sent within 60 seconds
And the email contains a unique, time-limited link (1 hour expiration)
And a reset token is stored in the database

Given a user clicks the reset link within 1 hour
When they enter a new password meeting complexity requirements
And confirm the password
Then the password is updated
And the reset token is invalidated
And a confirmation email is sent
And the user can log in with the new password

Given a user clicks an expired reset link
When the page loads
Then an "Expired Link" message is displayed
And an option to request a new link is provided
```

---

#### AC-AUTH-004: Multi-Factor Authentication

| Attribute | Value |
|-----------|-------|
| **Requirement** | [[FR-AUTH-003]] |
| **Priority** | [[Must]] |
| **Test Type** | [[Automated + Manual]] |

**Acceptance Criteria:**
```
Given an admin user with MFA enabled
When they enter valid username and password
Then they are prompted to enter an MFA code
And they cannot proceed without entering the code

Given a valid MFA code is entered
When submitted
Then the user is authenticated and granted access

Given an invalid MFA code is entered
When submitted
Then an error message is displayed
And the user can retry (max 3 attempts before lockout)

Given an MFA code is entered after expiration (30 seconds)
When submitted
Then an "Expired Code" error is displayed
```

---

### 2.2 Order Management

#### AC-ORD-001: Manual Order Entry - Success

| Attribute | Value |
|-----------|-------|
| **Requirement** | [[FR-ORD-001]] |
| **Priority** | [[Must]] |
| **Test Type** | [[Automated]] |

**Acceptance Criteria:**
```
Given a CSR is logged in
When they navigate to the "New Order" page
Then the order entry form is displayed with sections:
  - Customer Information
  - Product Line Items
  - Shipping Information
  - Payment Information

Given valid customer information is entered
When the CSR searches by customer name
Then matching customers are displayed in a dropdown within 2 seconds
And selecting a customer auto-populates:
  - Customer ID
  - Billing Address
  - Payment Terms
  - Credit Limit

Given a product SKU is entered
When the CSR tabs to the next field
Then the system validates the SKU within 1 second
And displays:
  - Product Name
  - Unit Price
  - Available Quantity
  - Product Image (if available)

Given all required fields are completed
When the CSR clicks "Submit Order"
Then the order is saved within 3 seconds
And an order confirmation number is generated (format: ORD-YYYY-XXXXXX)
And the order status is set to "Pending Approval" or "Confirmed" based on rules
And a confirmation email is sent to the customer within 60 seconds
And the CSR sees a success message with the order number
And the order appears in the order list
```

**Test Data:**
| Field | Valid Value | Invalid Value |
|-------|-------------|---------------|
| [[Customer]] | [[Existing customer ID]] | [[Non-existent customer]] |
| [[Product SKU]] | [[Valid SKU: PROD-001]] | [[Invalid SKU: XYZ-999]] |
| [[Quantity]] | [[Positive integer: 10]] | [[Zero, negative, decimal]] |

---

#### AC-ORD-002: Real-Time Inventory Validation

| Attribute | Value |
|-----------|-------|
| **Requirement** | [[FR-ORD-007]] |
| **Priority** | [[Must]] |
| **Test Type** | [[Automated]] |

**Acceptance Criteria:**
```
Given a product with 100 units in stock
When a CSR adds 50 units to an order
Then the available quantity displays as 100
And no warning is shown

Given a product with 100 units in stock
When a CSR adds 100 units to an order
Then the available quantity displays as 100
And a "Low Stock" warning appears if below reorder point

Given a product with 100 units in stock
When a CSR adds 150 units to an order
Then an "Insufficient Stock" warning is displayed
And the CSR can:
  - Reduce quantity to available amount
  - Request backorder
  - Select alternative product

Given inventory changes in the warehouse
When the CSR is viewing the order entry page
Then inventory levels update within 30 seconds
Without requiring page refresh
```

---

#### AC-ORD-003: Order Status Tracking

| Attribute | Value |
|-----------|-------|
| **Requirement** | [[FR-ORD-015]] |
| **Priority** | [[Must]] |
| **Test Type** | [[Automated]] |

**Acceptance Criteria:**
```
Given a customer with existing orders
When they log into the customer portal
Then they see a list of their orders with:
  - Order Number
  - Order Date
  - Total Amount
  - Current Status
  - Expected Delivery Date

Given a customer clicks on an order
When the order details page loads
Then they see:
  - Complete order information
  - Line item details
  - Status history with timestamps
  - Current location (if shipped)
  - Tracking number with carrier link

Given an order status changes in the backend
When the customer views the order within 30 seconds
Then the updated status is displayed

Given a customer enters an invalid order number in search
When they submit the search
Then a "No orders found" message is displayed
And suggestions for correct format are provided
```

---

### 2.3 Customer Management

#### AC-CUST-001: Customer Search

| Attribute | Value |
|-----------|-------|
| **Requirement** | [[FR-CUST-001]] |
| **Priority** | [[Must]] |
| **Test Type** | [[Automated]] |

**Acceptance Criteria:**
```
Given a CSR enters a customer name in the search field
When they submit the search
Then matching customers are displayed within 2 seconds
And results include:
  - Customer Name
  - Account Number
  - Primary Contact
  - City/State

Given a CSR enters a partial name (minimum 3 characters)
When they submit the search
Then fuzzy matching returns relevant results
Sorted by relevance

Given a CSR enters a phone number
When they submit the search
Then exact match customers are returned

Given no matches are found
When the search completes
Then a "No customers found" message is displayed
And an option to create a new customer is provided

Given more than 50 results
When the search completes
Then results are paginated (25 per page)
And pagination controls are available
```

---

### 2.4 Reporting

#### AC-RPT-001: Executive Dashboard

| Attribute | Value |
|-----------|-------|
| **Requirement** | [[FR-RPT-001]] |
| **Priority** | [[Must]] |
| **Test Type** | [[Automated]] |

**Acceptance Criteria:**
```
Given a manager logs into the dashboard
When the page loads
Then the following KPIs are displayed within 3 seconds:
  - Orders Today: [Count with trend indicator]
  - Revenue Today: [Amount with comparison to yesterday]
  - Average Order Value: [Amount with trend]
  - Orders in Queue: [Count with aging breakdown]
  - Processing Time (Avg): [Minutes with target comparison]

Given the manager selects a different time period
When the selection is applied
Then all metrics update within 2 seconds
To reflect the selected period

Given a metric exceeds a threshold
When the dashboard loads
Then a visual indicator (red/yellow) is displayed
And a tooltip explains the threshold

Given the manager clicks on a metric
When the click is registered
Then they are navigated to the detailed report
Filtered for the selected context
```

---

## 3. Non-Functional Acceptance Criteria

### 3.1 Performance Criteria

#### AC-PERF-001: Page Load Time

| Attribute | Value |
|-----------|-------|
| **Requirement** | [[NFR-PERF-001]] |
| **Priority** | [[Must]] |
| **Test Type** | [[Automated (Lighthouse)]] |

**Acceptance Criteria:**
```
Given a user accesses any page
When the page loads
Then Time to First Byte (TTFB) is less than 200ms
And First Contentful Paint (FCP) is less than 1.0s
And Largest Contentful Paint (LCP) is less than 2.5s
And Time to Interactive (TTI) is less than 3.0s
And Cumulative Layout Shift (CLS) is less than 0.1

Given 100 concurrent users
When accessing the system simultaneously
Then 95th percentile response time remains under 2 seconds
And no errors occur
```

**Test Scenarios:**
| Page | Target TTI | Test Tool |
|------|------------|-----------|
| [[Login]] | [[< 2s]] | [[Lighthouse]] |
| [[Dashboard]] | [[< 3s]] | [[Lighthouse]] |
| [[Order Entry]] | [[< 3s]] | [[Lighthouse]] |
| [[Reports]] | [[< 5s]] | [[Lighthouse]] |

---

#### AC-PERF-002: API Response Time

| Attribute | Value |
|-----------|-------|
| **Requirement** | [[NFR-PERF-002]] |
| **Priority** | [[Must]] |
| **Test Type** | [[Automated (k6/Artillery)]] |

**Acceptance Criteria:**
```
Given a standard API request
When processed under normal load
Then 95th percentile response time is under 200ms
And 99th percentile response time is under 500ms
And error rate is less than 0.1%

Given peak load (500 concurrent requests)
When sustained for 10 minutes
Then 95th percentile response time remains under 1 second
And system remains stable
And no requests are dropped
```

---

### 3.2 Security Criteria

#### AC-SEC-001: Data Encryption

| Attribute | Value |
|-----------|-------|
| **Requirement** | [[NFR-SEC-001, NFR-SEC-002]] |
| **Priority** | [[Must]] |
| **Test Type** | [[Automated + Manual]] |

**Acceptance Criteria:**
```
Given sensitive data at rest in the database
When examined directly
Then data is encrypted using AES-256
And encryption keys are stored in a key management service
And key rotation occurs every 90 days

Given data transmitted over the network
When captured and analyzed
Then all traffic uses TLS 1.3
And no sensitive data is transmitted in plain text
And certificate is valid and not expired

Given a security scan is performed
When results are analyzed
Then no vulnerabilities rated High or Critical are present
And Medium vulnerabilities have remediation plans
```

---

#### AC-SEC-002: Access Control

| Attribute | Value |
|-----------|-------|
| **Requirement** | [[NFR-SEC-004]] |
| **Priority** | [[Must]] |
| **Test Type** | [[Automated]] |

**Acceptance Criteria:**
```
Given a user with "CSR" role
When they attempt to access admin functions
Then access is denied
And a 403 Forbidden response is returned
And the attempt is logged

Given a user with "Admin" role
When they attempt to access admin functions
Then access is granted
And appropriate audit log entry is created

Given a deactivated user account
When login is attempted
Then authentication fails
And an "Account disabled" message is displayed
```

---

### 3.3 Usability Criteria

#### AC-USE-001: Accessibility Compliance

| Attribute | Value |
|-----------|-------|
| **Requirement** | [[NFR-USE-003]] |
| **Priority** | [[Must]] |
| **Test Type** | [[Automated (axe) + Manual]] |

**Acceptance Criteria:**
```
Given an accessibility scan is performed
When WCAG 2.1 AA guidelines are applied
Then no Level A or AA violations are present

Given a keyboard-only user
When navigating the application
Then all interactive elements are accessible via Tab key
And focus indicators are clearly visible
And logical tab order is maintained

Given a screen reader user
When accessing the application
Then all images have alt text
And form fields have associated labels
And ARIA landmarks are properly implemented
And dynamic content updates are announced

Given a user with low vision
When using browser zoom (up to 200%)
Then all content remains visible and functional
And no horizontal scrolling is required
```

---

## 4. Edge Cases and Error Scenarios

### 4.1 Common Edge Cases

| Scenario | Condition | Expected Behavior |
|----------|-----------|-------------------|
| [[Network timeout]] | [[API call exceeds 30s]] | [[Graceful error message, retry option]] |
| [[Database deadlock]] | [[Concurrent updates conflict]] | [[Automatic retry, then error with support contact]] |
| [[Session expiration mid-action]] | [[User inactive 30+ min]] | [[Save draft, redirect to login, restore after auth]] |
| [[Browser back button]] | [[After form submission]] | [[Warning about resubmission, prevent duplicate]] |
| [[Concurrent edit]] | [[Two users edit same record]] | [[Last-write-wins with conflict notification]] |
| [[Special characters]] | [[Input contains SQL injection attempt]] | [[Sanitization, validation error]] |
| [[Maximum length]] | [[Input exceeds field limit]] | [[Character counter, truncation warning]] |
| [[File upload size]] | [[File exceeds 10MB limit]] | [[Pre-upload validation, clear error message]] |

### 4.2 Error Message Standards

| Error Type | Message Format | Example |
|------------|----------------|---------|
| [[Validation]] | [["[Field] [Issue]. [Action]."]] | [["Email address is invalid. Please enter a valid email."]] |
| [[Permission]] | [["You don't have permission to [action]. [Contact]."]] | [["You don't have permission to delete orders. Contact your administrator."]] |
| [[System]] | [["Unable to [action]. [Reference]. [Action]."]] | [["Unable to save order. Reference: ERR-1234. Please try again or contact support."]] |
| [[Not Found]] | [["[Item] not found. [Action]."]] | [["Order not found. Please check the order number and try again."]] |

---

## 5. Test Case Mapping

### 5.1 Traceability Matrix

| AC ID | Requirement | Test Case ID | Test Type | Automation Status |
|-------|-------------|--------------|-----------|-------------------|
| [[AC-AUTH-001]] | [[FR-AUTH-001]] | [[TC-AUTH-001]] | [[Unit]] | [[Automated]] |
| [[AC-AUTH-002]] | [[FR-AUTH-001]] | [[TC-AUTH-002]] | [[Unit]] | [[Automated]] |
| [[AC-ORD-001]] | [[FR-ORD-001]] | [[TC-ORD-001]] | [[E2E]] | [[Automated]] |
| [[AC-ORD-002]] | [[FR-ORD-007]] | [[TC-ORD-002]] | [[Integration]] | [[Automated]] |
| [[AC-PERF-001]] | [[NFR-PERF-001]] | [[TC-PERF-001]] | [[Performance]] | [[Automated]] |

### 5.2 Test Coverage Summary

| Category | Total AC | Automated | Manual | Coverage % |
|----------|----------|-----------|--------|------------|
| [[Authentication]] | [[12]] | [[10]] | [[2]] | [[100%]] |
| [[Order Management]] | [[25]] | [[20]] | [[5]] | [[100%]] |
| [[Customer Management]] | [[15]] | [[12]] | [[3]] | [[100%]] |
| [[Reporting]] | [[10]] | [[8]] | [[2]] | [[100%]] |
| [[Performance]] | [[8]] | [[8]] | [[0]] | [[100%]] |
| [[Security]] | [[15]] | [[12]] | [[3]] | [[100%]] |
| **TOTAL** | **[[85]]** | **[[70]]** | **[[15]]** | **[[100%]]** |

---

## 6. Appendix A: Acceptance Criteria Writing Guidelines

### Do's and Don'ts

✅ **DO:**
- Use specific, measurable terms
- Include both success and failure scenarios
- Reference specific UI elements by name
- Define timing expectations (within X seconds)
- Include data validation rules
- Specify error messages

❌ **DON'T:**
- Use vague terms like "fast," "user-friendly," "good"
- Assume implementation details
- Combine multiple tests into one criterion
- Leave room for interpretation
- Forget edge cases

### Example: Before and After

**Before (Poor):**
```
The system should allow users to log in quickly.
```

**After (Good):**
```
Given a registered user enters valid credentials
When they submit the login form
Then they are authenticated within 2 seconds
And redirected to the dashboard
And a session is created with a 30-minute timeout
```

---

*Document Control: This template aligns with BABOK v3 Knowledge Areas: Requirements Analysis and Design Definition, and Solution Evaluation.*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
