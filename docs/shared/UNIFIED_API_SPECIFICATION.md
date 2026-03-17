# Vantus Systems - Unified API Specification

> **Canonical Standards:** See [\_agent/SOURCE_OF_TRUTH.md](./_agent/SOURCE_OF_TRUTH.md) for authoritative conventions.

**Version:** 1.0.0  
**Last Updated:** 2026-02-22  
**Status:** Draft  
**Base URL:** `https://api.vantus.systems/v1`

---

## Table of Contents

1. [API Architecture Overview](#1-api-architecture-overview)
2. [Authentication & Security](#2-authentication--security)
3. [Common Patterns](#3-common-patterns)
4. [Public Website API](#4-public-website-api)
5. [Client Portal API](#5-client-portal-api)
6. [Admin Portal API](#6-admin-portal-api)
7. [Webhook API](#7-webhook-api)
8. [Appendices](#8-appendices)

---

## 1. API Architecture Overview

### 1.1 Design Principles

| Principle             | Implementation                                                      |
| --------------------- | ------------------------------------------------------------------- |
| **API-First**         | APIs designed before UI implementation; contract-driven development |
| **Resource-Oriented** | Nouns as resources, HTTP verbs as actions                           |
| **Stateless**         | No server-side session state; self-contained requests               |
| **Consistent**        | Uniform patterns across all endpoints                               |
| **Versioned**         | URL versioning with backward compatibility                          |
| **Documented**        | OpenAPI 3.0 compliant with auto-generated docs                      |

### 1.2 RESTful Conventions

```
GET    /resources          # List resources
GET    /resources/:id      # Get single resource
POST   /resources          # Create resource
PATCH  /resources/:id      # Partial update (JSON Merge Patch)
PUT    /resources/:id      # Full replacement
DELETE /resources/:id      # Delete resource
```

**Nested Resources:**

```
GET /tickets/:id/messages      # List messages for ticket
POST /tickets/:id/messages     # Add message to ticket
```

### 1.3 GraphQL Considerations

While REST is primary, GraphQL is available at `/graphql` for:

- Complex data fetching requirements
- Mobile applications with bandwidth constraints
- Aggregate queries across multiple resources

**GraphQL Endpoint:** `POST https://api.vantus.systems/graphql`  
**Authentication:** Same JWT/Token headers as REST API

### 1.4 API Versioning Strategy

| Version | Status  | Base URL                        |
| ------- | ------- | ------------------------------- |
| v1      | Current | `https://api.vantus.systems/v1` |
| v2      | Beta    | `https://api.vantus.systems/v2` |

**Versioning Rules:**

- URL path versioning (`/v1/`, `/v2/`)
- Breaking changes increment major version
- Deprecated versions supported for 12 months
- Sunset headers provided for deprecated endpoints

### 1.5 Base URLs by Environment

| Environment | URL                                     |
| ----------- | --------------------------------------- |
| Production  | `https://api.vantus.systems/v1`         |
| Staging     | `https://api-staging.vantus.systems/v1` |
| Development | `https://api-dev.vantus.systems/v1`     |

---

## 2. Authentication & Security

### 2.1 Authentication Methods

| API Surface    | Primary Method   | Secondary Method    |
| -------------- | ---------------- | ------------------- |
| Public Website | API Key          | Anonymous (limited) |
| Client Portal  | JWT Bearer Token | OAuth 2.0 + PKCE    |
| Admin Portal   | JWT Bearer Token | Session Cookie      |
| Webhooks       | HMAC Signature   | API Key             |

### 2.2 OAuth 2.0 Flows

**Authorization Code + PKCE (for SPAs/Mobile):**

```
1. GET /oauth/authorize?response_type=code&client_id=xxx&redirect_uri=xxx&code_challenge=xxx&code_challenge_method=S256
2. User authenticates and authorizes
3. Redirect to callback with authorization code
4. POST /oauth/token (exchange code for tokens)
5. Receive access_token and refresh_token
```

**Client Credentials (for Server-to-Server):**

```http
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&
client_id={client_id}&
client_secret={client_secret}&
scope=read write
```

### 2.3 JWT Token Specification

**Header:**

```json
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "key-2024-01"
}
```

**Payload:**

```json
{
  "sub": "usr_1234567890",
  "org": "org_9876543210",
  "email": "user@example.com",
  "roles": ["admin", "user"],
  "permissions": ["tickets:read", "tickets:write", "billing:read"],
  "iat": 1706745600,
  "exp": 1706749200,
  "jti": "token-uuid-123",
  "iss": "https://auth.vantus.systems",
  "aud": "https://api.vantus.systems"
}
```

**Token Lifetimes:**

- Access Token: 1 hour
- Refresh Token: 30 days
- MFA Token: 5 minutes

### 2.4 API Key Authentication

```http
GET /api/content/pages
X-API-Key: vsk_live_xxxxxxxxxxxxxxxxxxxxxxxx
```

**Key Prefixes:**

- `vsk_live_` - Production keys
- `vsk_test_` - Test/Sandbox keys
- `vsk_dev_` - Development keys

### 2.5 Session Cookie Handling (Admin Portal)

```http
Set-Cookie: session_id=xxx; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400
```

**Cookie Attributes:**

- `HttpOnly`: Prevents XSS access
- `Secure`: HTTPS only
- `SameSite=Strict`: CSRF protection
- `Max-Age`: 24 hours

### 2.6 Authorization Patterns

**RBAC (Role-Based Access Control):**

```
Roles: super_admin, org_admin, manager, user, readonly
```

**Permissions:**

```
Format: {resource}:{action}
Examples: tickets:read, tickets:write, users:delete, billing:admin
```

**Permission Evaluation:**

1. Check if user has explicit permission
2. Check if user's role grants permission
3. Check if org-level settings allow action
4. Deny if none match

---

## 3. Common Patterns

### 3.1 Standard Headers

**Required Headers:**
| Header | Description | Example |
|--------|-------------|---------|
| `Authorization` | Bearer token or API key | `Bearer eyJhbG...` |
| `Content-Type` | Request body format | `application/json` |
| `Accept` | Response format | `application/json` |

**Optional Headers:**
| Header | Description | Example |
|--------|-------------|---------|
| `X-Request-ID` | Unique request identifier | `req_abc123` |
| `X-API-Version` | API version override | `2024-01-15` |
| `Accept-Language` | Preferred language | `en-US` |
| `X-Idempotency-Key` | Idempotency key | `idempotency_123` |

**Response Headers:**
| Header | Description |
|--------|-------------|
| `X-Request-ID` | Echo of request ID |
| `X-RateLimit-Limit` | Request limit |
| `X-RateLimit-Remaining` | Remaining requests |
| `X-RateLimit-Reset` | Reset timestamp |
| `X-Deprecation-Notice` | Deprecation warning |
| `X-Sunset-Date` | Sunset date for endpoint |

### 3.2 Error Handling

**Standard Error Format:**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "email",
        "code": "INVALID_FORMAT",
        "message": "Email format is invalid"
      }
    ],
    "request_id": "req_abc123",
    "timestamp": "2024-01-15T10:30:00Z",
    "documentation_url": "https://docs.vantus.systems/errors/VALIDATION_ERROR"
  }
}
```

**Error Code Categories:**

| Category       | Prefix        | Example Codes                                       |
| -------------- | ------------- | --------------------------------------------------- |
| Authentication | `AUTH_`       | AUTH_INVALID_TOKEN, AUTH_EXPIRED, AUTH_MFA_REQUIRED |
| Authorization  | `FORBIDDEN_`  | FORBIDDEN_INSUFFICIENT_PERMISSIONS                  |
| Validation     | `VALIDATION_` | VALIDATION_REQUIRED, VALIDATION_FORMAT              |
| Not Found      | `NOT_FOUND_`  | NOT_FOUND_USER, NOT_FOUND_RESOURCE                  |
| Rate Limit     | `RATE_LIMIT_` | RATE_LIMIT_EXCEEDED                                 |
| Conflict       | `CONFLICT_`   | CONFLICT_DUPLICATE, CONFLICT_STATE                  |
| Server         | `INTERNAL_`   | INTERNAL_ERROR, INTERNAL_TIMEOUT                    |

**HTTP Status Code Mapping:**

| Status                    | Usage                                |
| ------------------------- | ------------------------------------ |
| 200 OK                    | Successful GET, PATCH                |
| 201 Created               | Successful POST (resource created)   |
| 204 No Content            | Successful DELETE                    |
| 400 Bad Request           | Validation errors, malformed JSON    |
| 401 Unauthorized          | Missing or invalid authentication    |
| 403 Forbidden             | Valid auth, insufficient permissions |
| 404 Not Found             | Resource doesn't exist               |
| 409 Conflict              | Resource conflict (duplicate, state) |
| 422 Unprocessable Entity  | Business logic validation failed     |
| 429 Too Many Requests     | Rate limit exceeded                  |
| 500 Internal Server Error | Unexpected server error              |

### 3.3 Pagination

**Offset Pagination (Default for most endpoints):**

```http
GET /api/tickets?page=1&per_page=20
```

**Response:**

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 150,
    "total_pages": 8,
    "has_next": true,
    "has_prev": false
  }
}
```

**Cursor Pagination (For high-volume endpoints):**

```http
GET /api/admin/audit/events?cursor=eyJpZCI6MTIzfQ&limit=50
```

**Response:**

```json
{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6NDU2fQ",
    "prev_cursor": null,
    "has_more": true
  }
}
```

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (1-indexed) |
| `per_page` | integer | Items per page (max 100) |
| `cursor` | string | Cursor for cursor-based pagination |
| `limit` | integer | Limit for cursor pagination |

### 3.4 Filtering, Sorting & Field Selection

**Filtering:**

```http
GET /api/tickets?status=open&priority=high&created_after=2024-01-01
GET /api/tickets?assignee_id=eq:usr_123&created_at=gte:2024-01-01
```

**Operators:** `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`, `contains`, `starts_with`

**Sorting:**

```http
GET /api/tickets?sort=-created_at,+priority
```

**Field Selection:**

```http
GET /api/tickets?fields=id,title,status,created_at
```

### 3.5 Rate Limiting

**Limits by Tier:**

| Tier          | Limit          | Window                 |
| ------------- | -------------- | ---------------------- |
| Anonymous     | 30 requests    | per minute             |
| API Key       | 100 requests   | per minute             |
| Authenticated | 1,000 requests | per minute             |
| Admin         | 5,000 requests | per minute             |
| Burst         | 10 requests    | per second (all tiers) |

**Rate Limit Headers:**

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1706749200
Retry-After: 60
```

**Rate Limit Error Response:**

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "retry_after": 60,
    "limit": 1000,
    "window": "1m"
  }
}
```

**Exponential Backoff Guidance:**

- 1st retry: Wait 1 second
- 2nd retry: Wait 2 seconds
- 3rd retry: Wait 4 seconds
- Max retry: Wait 60 seconds
- Max retries: 5 attempts

### 3.6 Idempotency

**Idempotency Key Header:**

```http
POST /api/leads
X-Idempotency-Key: idempotency_lead_abc123
```

**Idempotent Methods:** `POST`, `PATCH`

**Key Properties:**

- Keys expire after 24 hours
- Same key + same payload = same response
- Different payload with same key = error
- Idempotency-Key is required for financial operations

---

## 4. Public Website API

**Base Path:** `/api`  
**Authentication:** API Key (optional for public content)  
**Rate Limit:** 30 req/min (anonymous), 100 req/min (with API key)

---

### 4.1 Content API

#### GET /content/pages

List all published pages.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `type` | string | No | Filter by page type |
| `category` | string | No | Filter by category |
| `locale` | string | No | Content locale (default: en) |

**Response 200:**

```json
{
  "data": [
    {
      "id": "page_123",
      "slug": "managed-it-services",
      "title": "Managed IT Services",
      "excerpt": "Comprehensive IT support...",
      "type": "service",
      "featured_image": "https://cdn.vantus.systems/images/xxx.jpg",
      "published_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 45
  }
}
```

---

#### GET /content/pages/:slug

Get a single page by slug.

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | string | Page URL slug |

**Response 200:**

```json
{
  "id": "page_123",
  "slug": "managed-it-services",
  "title": "Managed IT Services",
  "content": "<h1>Managed IT Services</h1>...",
  "excerpt": "Comprehensive IT support...",
  "type": "service",
  "meta": {
    "title": "Managed IT Services | Vantus Systems",
    "description": "Enterprise-grade IT management...",
    "keywords": ["IT services", "managed IT"]
  },
  "featured_image": {
    "url": "https://cdn.vantus.systems/images/xxx.jpg",
    "alt": "IT Services Team"
  },
  "related_pages": ["page_456", "page_789"],
  "published_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T10:00:00Z"
}
```

**Response 404:**

```json
{
  "error": {
    "code": "NOT_FOUND_PAGE",
    "message": "Page not found"
  }
}
```

---

#### GET /content/collections/:collection

Get items from a content collection.

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `collection` | string | Collection name (e.g., testimonials, case-studies) |

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | integer | Max items to return (max 100) |
| `featured` | boolean | Filter featured items only |

**Response 200:**

```json
{
  "collection": "testimonials",
  "data": [
    {
      "id": "test_123",
      "author": "John Smith",
      "company": "TechCorp Inc",
      "quote": "Vantus transformed our IT operations...",
      "rating": 5,
      "featured": true,
      "image": "https://cdn.vantus.systems/testimonials/john.jpg"
    }
  ]
}
```

---

#### GET /content/search

Search content across all pages.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query |
| `type` | string | No | Filter by content type |
| `limit` | integer | No | Max results (default: 20) |

**Response 200:**

```json
{
  "query": "cybersecurity",
  "total": 15,
  "results": [
    {
      "id": "page_123",
      "slug": "cybersecurity-services",
      "title": "Cybersecurity Services",
      "excerpt": "Protect your business with enterprise security...",
      "type": "service",
      "relevance_score": 0.95
    }
  ]
}
```

---

### 4.2 Services API

#### GET /services

List all services.

**Response 200:**

```json
{
  "data": [
    {
      "id": "svc_123",
      "slug": "managed-security",
      "name": "Managed Security",
      "category": "security",
      "short_description": "24/7 security monitoring...",
      "icon": "shield",
      "starting_price": 2500,
      "currency": "USD",
      "features": ["SIEM", "Threat Detection", "Incident Response"]
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 12
  }
}
```

---

#### GET /services/:slug

Get detailed service information.

**Response 200:**

```json
{
  "id": "svc_123",
  "slug": "managed-security",
  "name": "Managed Security",
  "category": "security",
  "full_description": "Comprehensive security management...",
  "benefits": [
    {
      "title": "24/7 Monitoring",
      "description": "Round-the-clock security operations center"
    }
  ],
  "pricing_tiers": [
    {
      "name": "Foundation",
      "price": 2500,
      "features": ["Basic monitoring", "Email alerts"]
    },
    {
      "name": "Sovereign",
      "price": 7500,
      "features": [
        "Advanced monitoring",
        "Dedicated analyst",
        "Incident response"
      ]
    }
  ],
  "case_studies": ["case_123", "case_456"],
  "related_services": ["svc_789", "svc_abc"]
}
```

---

#### GET /services/:slug/related

Get related services.

**Response 200:**

```json
{
  "service_id": "svc_123",
  "related_services": [
    {
      "id": "svc_789",
      "name": "Cloud Security",
      "relationship": "complementary"
    }
  ]
}
```

---

### 4.3 Industries API

#### GET /industries

List all supported industries.

**Response 200:**

```json
{
  "data": [
    {
      "id": "ind_123",
      "slug": "healthcare",
      "name": "Healthcare",
      "description": "HIPAA-compliant IT solutions...",
      "icon": "medical-cross",
      "featured": true
    }
  ]
}
```

---

#### GET /industries/:slug

Get industry details.

**Response 200:**

```json
{
  "id": "ind_123",
  "slug": "healthcare",
  "name": "Healthcare",
  "description": "Specialized IT services for healthcare organizations...",
  "compliance_frameworks": ["HIPAA", "HITECH"],
  "solutions": [
    {
      "id": "sol_123",
      "name": "EHR Integration",
      "description": "Secure electronic health record systems"
    }
  ],
  "case_studies": ["case_123"],
  "testimonials": ["test_456"]
}
```

---

### 4.4 Server Planner API

#### GET /planner/categories

Get server component categories.

**Response 200:**

```json
{
  "data": [
    {
      "id": "cat_cpu",
      "name": "Processors",
      "description": "Server CPUs",
      "icon": "cpu"
    },
    {
      "id": "cat_ram",
      "name": "Memory",
      "description": "RAM modules",
      "icon": "memory"
    },
    {
      "id": "cat_storage",
      "name": "Storage",
      "description": "SSDs and HDDs",
      "icon": "hard-drive"
    }
  ]
}
```

---

#### GET /planner/parts

Get available server parts.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter by category |
| `compatible_with` | string | Filter by compatibility |

**Response 200:**

```json
{
  "data": [
    {
      "id": "part_123",
      "sku": "CPU-INTEL-XEON-24C",
      "name": "Intel Xeon Platinum 24-Core",
      "category": "cpu",
      "specs": {
        "cores": 24,
        "threads": 48,
        "base_clock": "2.1GHz",
        "tdp": "150W"
      },
      "price": 4500,
      "currency": "USD",
      "in_stock": true
    }
  ]
}
```

---

#### GET /planner/configurations

Get saved configurations.

**Response 200:**

```json
{
  "data": [
    {
      "id": "config_123",
      "name": "High-Performance Database Server",
      "parts": [
        { "part_id": "part_123", "quantity": 2 },
        { "part_id": "part_456", "quantity": 16 }
      ],
      "total_price": 25000,
      "estimated_power": "450W",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

#### POST /planner/calculate

Calculate pricing and compatibility for a configuration.

**Request:**

```json
{
  "parts": [
    { "part_id": "part_123", "quantity": 2 },
    { "part_id": "part_456", "quantity": 16 }
  ],
  "options": {
    "warranty": "5_year",
    "support": "24x7"
  }
}
```

**Response 200:**

```json
{
  "configuration": {
    "parts": [
      {
        "part_id": "part_123",
        "name": "Intel Xeon Platinum 24-Core",
        "quantity": 2,
        "unit_price": 4500,
        "line_total": 9000
      }
    ],
    "subtotal": 25000,
    "discount": 1250,
    "tax": 1900,
    "total": 25650
  },
  "compatibility": {
    "valid": true,
    "warnings": [],
    "power_estimate": "450W"
  },
  "lead_time": "2-3 weeks"
}
```

---

### 4.5 Lead Capture API

#### POST /leads

Submit a new lead.

**Request Headers:**

```
Content-Type: application/json
X-Idempotency-Key: {unique_key}
```

**Request Body:**

```json
{
  "type": "consultation_request",
  "contact": {
    "first_name": "John",
    "last_name": "Smith",
    "email": "john.smith@example.com",
    "phone": "+1-555-123-4567",
    "company": "TechCorp Inc",
    "job_title": "IT Director"
  },
  "company_info": {
    "size": "50-200",
    "industry": "technology",
    "location": "New York, NY"
  },
  "requirements": {
    "services": ["managed_it", "cybersecurity"],
    "budget_range": "10000-25000",
    "timeline": "3-6_months",
    "message": "Looking for comprehensive IT support..."
  },
  "source": {
    "utm_source": "google",
    "utm_medium": "ppc",
    "utm_campaign": "spring_2024",
    "referrer": "https://google.com"
  },
  "consent": {
    "marketing": true,
    "privacy_policy": true
  }
}
```

**Response 201:**

```json
{
  "id": "lead_123",
  "status": "new",
  "message": "Thank you for your inquiry. Our team will contact you within 24 hours.",
  "estimated_response_time": "24 hours",
  "reference_number": "LEAD-2024-00123"
}
```

**Response 400:**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": [
      {
        "field": "contact.email",
        "code": "INVALID_FORMAT",
        "message": "Email format is invalid"
      }
    ]
  }
}
```

---

#### POST /contact

Submit a general contact form.

**Request:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Partnership Inquiry",
  "message": "Interested in discussing partnership opportunities...",
  "department": "partnerships"
}
```

**Response 201:**

```json
{
  "id": "contact_123",
  "status": "received",
  "message": "Your message has been received. We'll respond shortly."
}
```

---

#### POST /audit-request

Request a free IT audit.

**Request:**

```json
{
  "contact": {
    "first_name": "Michael",
    "last_name": "Johnson",
    "email": "michael@company.com",
    "phone": "+1-555-987-6543",
    "company": "Company LLC"
  },
  "audit_type": "security",
  "company_size": "50-200",
  "preferred_date": "2024-02-01",
  "notes": "Recently had a security incident, need thorough assessment"
}
```

**Response 201:**

```json
{
  "id": "audit_123",
  "status": "scheduled",
  "message": "Your audit request has been scheduled. A consultant will contact you to confirm.",
  "reference_number": "AUDIT-2024-00456"
}
```

---

### 4.6 Status API

#### GET /status

Get API status information.

**Response 200:**

```json
{
  "status": "operational",
  "version": "1.0.0",
  "environment": "production",
  "timestamp": "2024-01-15T10:30:00Z",
  "regions": [
    {
      "name": "us-east-1",
      "status": "operational"
    },
    {
      "name": "us-west-2",
      "status": "operational"
    }
  ]
}
```

---

#### GET /health

Health check endpoint.

**Response 200:**

```json
{
  "status": "healthy",
  "checks": {
    "database": "healthy",
    "cache": "healthy",
    "storage": "healthy"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 5. Client Portal API

**Base Path:** `/api`  
**Authentication:** JWT Bearer Token (required)  
**Rate Limit:** 1,000 req/min  
**Required Headers:** `Authorization: Bearer {token}`

---

### 5.1 Authentication API

#### POST /auth/login

Authenticate user and receive tokens.

**Request:**

```json
{
  "email": "user@company.com",
  "password": "SecurePass123!",
  "mfa_code": null
}
```

**Response 200 (Success):**

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "rt_xxxxxxxxxxxxxxxx",
  "token_type": "Bearer",
  "expires_in": 3600,
  "user": {
    "id": "usr_123",
    "email": "user@company.com",
    "first_name": "John",
    "last_name": "Smith",
    "role": "org_admin"
  }
}
```

**Response 200 (MFA Required):**

```json
{
  "mfa_required": true,
  "mfa_token": "mfa_temp_xxx",
  "methods": ["authenticator", "sms"]
}
```

**Response 401:**

```json
{
  "error": {
    "code": "AUTH_INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

---

#### POST /auth/logout

Invalidate current session.

**Request Headers:**

```
Authorization: Bearer {access_token}
```

**Response 204:** No content

---

#### POST /auth/refresh

Refresh access token.

**Request:**

```json
{
  "refresh_token": "rt_xxxxxxxxxxxxxxxx"
}
```

**Response 200:**

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "rt_newxxxxxxxxxxxx",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

---

#### POST /auth/mfa/verify

Verify MFA code.

**Request:**

```json
{
  "mfa_token": "mfa_temp_xxx",
  "code": "123456",
  "method": "authenticator"
}
```

**Response 200:**

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "rt_xxxxxxxxxxxxxxxx",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

---

#### POST /auth/password-reset

Request password reset.

**Request:**

```json
{
  "email": "user@company.com"
}
```

**Response 200:**

```json
{
  "message": "If the email exists, a password reset link has been sent."
}
```

---

### 5.2 Organization API

#### GET /org

Get current user's organization.

**Response 200:**

```json
{
  "id": "org_123",
  "name": "TechCorp Inc",
  "slug": "techcorp",
  "plan": "enterprise",
  "status": "active",
  "billing_email": "billing@techcorp.com",
  "address": {
    "street": "123 Business St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "US"
  },
  "settings": {
    "timezone": "America/New_York",
    "date_format": "MM/DD/YYYY",
    "currency": "USD"
  },
  "created_at": "2023-01-15T10:00:00Z",
  "updated_at": "2024-01-15T10:00:00Z"
}
```

---

#### GET /org/members

List organization members.

**Response 200:**

```json
{
  "data": [
    {
      "id": "usr_123",
      "email": "admin@techcorp.com",
      "first_name": "John",
      "last_name": "Admin",
      "role": "org_admin",
      "status": "active",
      "last_login_at": "2024-01-15T09:00:00Z",
      "joined_at": "2023-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 15
  }
}
```

---

#### GET /org/settings

Get organization settings.

**Response 200:**

```json
{
  "notifications": {
    "ticket_updates": true,
    "invoice_reminders": true,
    "security_alerts": true
  },
  "security": {
    "mfa_required": true,
    "sso_enabled": false,
    "password_policy": "strong"
  },
  "branding": {
    "logo_url": "https://cdn.vantus.systems/logos/techcorp.png",
    "primary_color": "#0066CC"
  }
}
```

---

### 5.3 Ticket API

#### GET /tickets

List organization's tickets.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status (open, closed, pending) |
| `priority` | string | Filter by priority |
| `assignee_id` | string | Filter by assignee |
| `created_after` | date | Filter by creation date |

**Response 200:**

```json
{
  "data": [
    {
      "id": "tkt_123",
      "number": "TKT-2024-00123",
      "subject": "Server performance issue",
      "status": "open",
      "priority": "high",
      "category": "infrastructure",
      "requester": {
        "id": "usr_123",
        "name": "John Smith",
        "email": "john@techcorp.com"
      },
      "assignee": {
        "id": "usr_456",
        "name": "Support Agent",
        "email": "agent@vantus.systems"
      },
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T14:30:00Z",
      "last_activity_at": "2024-01-15T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 45
  }
}
```

---

#### POST /tickets

Create a new support ticket.

**Request:**

```json
{
  "subject": "VPN connection issue",
  "description": "Unable to connect to VPN from home office...",
  "priority": "medium",
  "category": "network",
  "attachments": ["att_123", "att_456"]
}
```

**Response 201:**

```json
{
  "id": "tkt_124",
  "number": "TKT-2024-00124",
  "subject": "VPN connection issue",
  "status": "open",
  "priority": "medium",
  "requester": {
    "id": "usr_123",
    "name": "John Smith"
  },
  "created_at": "2024-01-15T15:00:00Z",
  "estimated_response": "4 hours"
}
```

---

#### GET /tickets/:id

Get ticket details.

**Response 200:**

```json
{
  "id": "tkt_123",
  "number": "TKT-2024-00123",
  "subject": "Server performance issue",
  "description": "Application running slow...",
  "status": "open",
  "priority": "high",
  "category": "infrastructure",
  "requester": {
    "id": "usr_123",
    "name": "John Smith"
  },
  "assignee": {
    "id": "usr_456",
    "name": "Support Agent"
  },
  "messages": [
    {
      "id": "msg_123",
      "author": {
        "id": "usr_123",
        "name": "John Smith"
      },
      "content": "Server response time is over 10 seconds...",
      "created_at": "2024-01-15T10:00:00Z",
      "attachments": []
    }
  ],
  "activities": [
    {
      "type": "status_change",
      "from": "new",
      "to": "open",
      "actor": "usr_456",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ],
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T14:30:00Z"
}
```

---

#### PATCH /tickets/:id

Update ticket.

**Request:**

```json
{
  "priority": "urgent",
  "category": "critical_infrastructure"
}
```

**Response 200:** Updated ticket object

---

#### POST /tickets/:id/messages

Add message to ticket.

**Request:**

```json
{
  "content": "Additional information: issue occurs during peak hours...",
  "attachments": ["att_789"]
}
```

**Response 201:**

```json
{
  "id": "msg_124",
  "ticket_id": "tkt_123",
  "author": {
    "id": "usr_123",
    "name": "John Smith"
  },
  "content": "Additional information...",
  "created_at": "2024-01-15T16:00:00Z"
}
```

---

#### POST /tickets/:id/attachments

Upload attachment to ticket.

**Request:**

```http
Content-Type: multipart/form-data

file: [binary data]
description: "Screenshot of error message"
```

**Response 201:**

```json
{
  "id": "att_789",
  "filename": "error_screenshot.png",
  "size": 245760,
  "content_type": "image/png",
  "url": "https://cdn.vantus.systems/attachments/xxx.png",
  "uploaded_at": "2024-01-15T16:05:00Z"
}
```

---

### 5.4 Documents API

#### GET /docs

List organization's documents.

**Response 200:**

```json
{
  "data": [
    {
      "id": "doc_123",
      "name": "Master Service Agreement",
      "type": "contract",
      "category": "legal",
      "status": "active",
      "requires_acknowledgment": true,
      "acknowledged": true,
      "acknowledged_at": "2024-01-10T10:00:00Z",
      "version": "2.1",
      "created_at": "2023-06-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

#### GET /docs/:id

Get document details.

**Response 200:**

```json
{
  "id": "doc_123",
  "name": "Master Service Agreement",
  "description": "Primary service contract",
  "type": "contract",
  "category": "legal",
  "status": "active",
  "version": "2.1",
  "effective_date": "2024-01-01",
  "expiration_date": "2025-12-31",
  "requires_acknowledgment": true,
  "acknowledged": true,
  "acknowledged_at": "2024-01-10T10:00:00Z",
  "acknowledged_by": {
    "id": "usr_123",
    "name": "John Smith"
  },
  "download_url": "https://cdn.vantus.systems/docs/msa_v2_1.pdf",
  "created_at": "2023-06-01T00:00:00Z"
}
```

---

#### GET /docs/:id/download

Get download URL for document.

**Response 200:**

```json
{
  "download_url": "https://cdn.vantus.systems/docs/msa_v2_1.pdf?token=xxx",
  "expires_at": "2024-01-15T16:30:00Z"
}
```

---

#### POST /docs/:id/acknowledge

Acknowledge document.

**Request:**

```json
{
  "acknowledged": true,
  "signature": "John Smith"
}
```

**Response 200:**

```json
{
  "id": "doc_123",
  "acknowledged": true,
  "acknowledged_at": "2024-01-15T16:10:00Z"
}
```

---

### 5.5 Billing API

#### GET /billing/subscription

Get subscription details.

**Response 200:**

```json
{
  "id": "sub_123",
  "plan": {
    "id": "plan_enterprise",
    "name": "Enterprise",
    "description": "Full-service IT management"
  },
  "status": "active",
  "current_period_start": "2024-01-01T00:00:00Z",
  "current_period_end": "2024-01-31T23:59:59Z",
  "amount": 15000,
  "currency": "USD",
  "interval": "month",
  "payment_method": {
    "type": "card",
    "last4": "4242",
    "brand": "visa",
    "exp_month": 12,
    "exp_year": 2025
  },
  "features": [
    "24x7_support",
    "dedicated_account_manager",
    "priority_response"
  ],
  "usage": {
    "tickets_included": 50,
    "tickets_used": 23,
    "hours_included": 40,
    "hours_used": 18.5
  }
}
```

---

#### GET /billing/invoices

List invoices.

**Response 200:**

```json
{
  "data": [
    {
      "id": "inv_123",
      "number": "INV-2024-000123",
      "status": "paid",
      "amount_due": 15000,
      "amount_paid": 15000,
      "currency": "USD",
      "period_start": "2024-01-01",
      "period_end": "2024-01-31",
      "due_date": "2024-01-15",
      "paid_at": "2024-01-10T10:00:00Z",
      "pdf_url": "https://cdn.vantus.systems/invoices/INV-2024-000123.pdf"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 12
  }
}
```

---

#### GET /billing/invoices/:id

Get invoice details.

**Response 200:**

```json
{
  "id": "inv_123",
  "number": "INV-2024-000123",
  "status": "paid",
  "line_items": [
    {
      "description": "Enterprise Plan - January 2024",
      "quantity": 1,
      "unit_price": 12000,
      "amount": 12000
    },
    {
      "description": "Additional Hours",
      "quantity": 10,
      "unit_price": 150,
      "amount": 1500
    },
    {
      "description": "Security Audit",
      "quantity": 1,
      "unit_price": 1500,
      "amount": 1500
    }
  ],
  "subtotal": 15000,
  "tax": 0,
  "total": 15000,
  "amount_paid": 15000,
  "balance": 0,
  "pdf_url": "https://cdn.vantus.systems/invoices/INV-2024-000123.pdf"
}
```

---

### 5.6 Approvals API

#### GET /approvals

List pending approvals.

**Response 200:**

```json
{
  "data": [
    {
      "id": "aprv_123",
      "type": "change_request",
      "title": "Firewall Configuration Update",
      "description": "Update firewall rules for new office location",
      "requested_by": {
        "id": "usr_456",
        "name": "Jane Doe"
      },
      "requested_at": "2024-01-15T10:00:00Z",
      "status": "pending",
      "due_date": "2024-01-16T10:00:00Z",
      "priority": "medium",
      "details_url": "/approvals/aprv_123/details"
    }
  ]
}
```

---

#### POST /approvals/:id/approve

Approve a request.

**Request:**

```json
{
  "notes": "Approved - please proceed during maintenance window"
}
```

**Response 200:**

```json
{
  "id": "aprv_123",
  "status": "approved",
  "approved_by": {
    "id": "usr_123",
    "name": "John Smith"
  },
  "approved_at": "2024-01-15T14:00:00Z",
  "notes": "Approved - please proceed during maintenance window"
}
```

---

#### POST /approvals/:id/reject

Reject a request.

**Request:**

```json
{
  "reason": "Need more information about impact"
}
```

**Response 200:**

```json
{
  "id": "aprv_123",
  "status": "rejected",
  "rejected_by": {
    "id": "usr_123",
    "name": "John Smith"
  },
  "rejected_at": "2024-01-15T14:00:00Z",
  "reason": "Need more information about impact"
}
```

---

## 6. Admin Portal API

**Base Path:** `/api/admin`  
**Authentication:** JWT Bearer Token (required) + Admin Role  
**Rate Limit:** 5,000 req/min  
**Required Permissions:** `admin:*` or specific resource permissions

---

### 6.1 User Management API

#### GET /admin/users

List all users.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `org_id` | string | Filter by organization |
| `role` | string | Filter by role |
| `status` | string | Filter by status |
| `search` | string | Search by name/email |

**Response 200:**

```json
{
  "data": [
    {
      "id": "usr_123",
      "email": "user@company.com",
      "first_name": "John",
      "last_name": "Smith",
      "role": "org_admin",
      "organization": {
        "id": "org_123",
        "name": "TechCorp Inc"
      },
      "status": "active",
      "mfa_enabled": true,
      "last_login_at": "2024-01-15T09:00:00Z",
      "created_at": "2023-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 50,
    "total": 245
  }
}
```

---

#### POST /admin/users

Create new user.

**Request:**

```json
{
  "email": "newuser@company.com",
  "first_name": "New",
  "last_name": "User",
  "role": "user",
  "org_id": "org_123",
  "send_invite": true,
  "temporary_password": false
}
```

**Response 201:**

```json
{
  "id": "usr_789",
  "email": "newuser@company.com",
  "first_name": "New",
  "last_name": "User",
  "role": "user",
  "organization": {
    "id": "org_123",
    "name": "TechCorp Inc"
  },
  "status": "pending_invite",
  "invite_sent_at": "2024-01-15T10:00:00Z",
  "created_at": "2024-01-15T10:00:00Z"
}
```

---

#### GET /admin/users/:id

Get user details.

**Response 200:**

```json
{
  "id": "usr_123",
  "email": "user@company.com",
  "first_name": "John",
  "last_name": "Smith",
  "role": "org_admin",
  "organization": {
    "id": "org_123",
    "name": "TechCorp Inc"
  },
  "permissions": ["tickets:*", "billing:read"],
  "status": "active",
  "mfa_enabled": true,
  "last_login_at": "2024-01-15T09:00:00Z",
  "login_count": 156,
  "created_at": "2023-01-15T10:00:00Z",
  "activity_log": [
    {
      "action": "login",
      "timestamp": "2024-01-15T09:00:00Z",
      "ip": "192.168.1.1"
    }
  ]
}
```

---

#### PATCH /admin/users/:id

Update user.

**Request:**

```json
{
  "first_name": "Johnny",
  "role": "manager",
  "status": "active"
}
```

**Response 200:** Updated user object

---

#### DELETE /admin/users/:id

Delete/deactivate user.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `permanent` | boolean | Permanently delete (default: false) |

**Response 204:** No content

---

### 6.2 Role Management API

#### GET /admin/roles

List all roles.

**Response 200:**

```json
{
  "data": [
    {
      "id": "role_super_admin",
      "name": "Super Admin",
      "description": "Full system access",
      "permissions": ["*"],
      "user_count": 5,
      "is_system": true
    },
    {
      "id": "role_org_admin",
      "name": "Organization Admin",
      "description": "Organization management",
      "permissions": ["org:*", "users:*", "billing:*"],
      "user_count": 45,
      "is_system": true
    }
  ]
}
```

---

#### POST /admin/roles

Create custom role.

**Request:**

```json
{
  "name": "Support Manager",
  "description": "Manages support tickets and agents",
  "permissions": ["tickets:*", "users:read"],
  "org_id": "org_123"
}
```

**Response 201:** Created role object

---

#### PATCH /admin/roles/:id

Update role.

**Request:**

```json
{
  "permissions": ["tickets:*", "users:read", "reports:read"]
}
```

**Response 200:** Updated role

---

### 6.3 Organization Management API

#### GET /admin/orgs

List all organizations.

**Response 200:**

```json
{
  "data": [
    {
      "id": "org_123",
      "name": "TechCorp Inc",
      "slug": "techcorp",
      "plan": "enterprise",
      "status": "active",
      "user_count": 25,
      "ticket_count": 156,
      "mrr": 15000,
      "created_at": "2023-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 50,
    "total": 120
  }
}
```

---

#### POST /admin/orgs

Create organization.

**Request:**

```json
{
  "name": "New Company LLC",
  "slug": "newcompany",
  "plan": "professional",
  "primary_contact": {
    "email": "admin@newcompany.com",
    "first_name": "Admin",
    "last_name": "User"
  },
  "billing_email": "billing@newcompany.com"
}
```

**Response 201:**

```json
{
  "id": "org_456",
  "name": "New Company LLC",
  "slug": "newcompany",
  "plan": "professional",
  "status": "active",
  "created_at": "2024-01-15T10:00:00Z"
}
```

---

#### GET /admin/orgs/:id

Get organization details.

**Response 200:**

```json
{
  "id": "org_123",
  "name": "TechCorp Inc",
  "slug": "techcorp",
  "plan": "enterprise",
  "status": "active",
  "billing": {
    "email": "billing@techcorp.com",
    "mrr": 15000,
    "arr": 180000,
    "payment_status": "current"
  },
  "usage": {
    "users": 25,
    "user_limit": 50,
    "storage_used_gb": 450,
    "storage_limit_gb": 1000
  },
  "settings": {
    "timezone": "America/New_York",
    "features_enabled": ["sso", "advanced_reporting"]
  },
  "created_at": "2023-01-15T10:00:00Z"
}
```

---

#### PATCH /admin/orgs/:id

Update organization.

**Request:**

```json
{
  "plan": "enterprise_plus",
  "status": "active"
}
```

**Response 200:** Updated org object

---

#### POST /admin/orgs/:id/suspend

Suspend organization.

**Request:**

```json
{
  "reason": "Payment overdue - 60 days",
  "suspend_immediately": false,
  "grace_period_days": 7
}
```

**Response 200:**

```json
{
  "id": "org_123",
  "status": "suspended_pending",
  "suspension": {
    "reason": "Payment overdue - 60 days",
    "effective_date": "2024-01-22T00:00:00Z",
    "suspended_by": "usr_admin"
  }
}
```

---

### 6.4 Content Management API

#### GET /admin/content-types

List content types.

**Response 200:**

```json
{
  "data": [
    {
      "id": "ct_page",
      "name": "Page",
      "slug": "page",
      "description": "Standard content page",
      "fields": [
        { "name": "title", "type": "text", "required": true },
        { "name": "content", "type": "rich_text", "required": true },
        { "name": "featured_image", "type": "media", "required": false }
      ]
    }
  ]
}
```

---

#### POST /admin/content-types

Create content type.

**Request:**

```json
{
  "name": "Case Study",
  "slug": "case-study",
  "description": "Customer case studies",
  "fields": [
    { "name": "title", "type": "text", "required": true },
    { "name": "client", "type": "text", "required": true },
    {
      "name": "industry",
      "type": "select",
      "options": ["healthcare", "finance"]
    },
    { "name": "results", "type": "rich_text", "required": true }
  ]
}
```

**Response 201:** Created content type

---

#### GET /admin/content

List content items.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | string | Filter by content type |
| `status` | string | Filter by status (draft, published, archived) |
| `author` | string | Filter by author |

**Response 200:**

```json
{
  "data": [
    {
      "id": "content_123",
      "type": "page",
      "title": "Managed IT Services",
      "slug": "managed-it-services",
      "status": "published",
      "author": {
        "id": "usr_123",
        "name": "Content Admin"
      },
      "published_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

#### POST /admin/content

Create content item.

**Request:**

```json
{
  "type": "page",
  "title": "New Service Page",
  "slug": "new-service",
  "content": "<h1>New Service</h1><p>Description...</p>",
  "status": "draft",
  "meta": {
    "title": "New Service | Vantus Systems",
    "description": "New service description"
  },
  "featured_image": "media_123"
}
```

**Response 201:** Created content

---

#### PATCH /admin/content/:id

Update content.

**Request:**

```json
{
  "title": "Updated Title",
  "content": "<h1>Updated</h1>..."
}
```

**Response 200:** Updated content

---

#### POST /admin/content/:id/publish

Publish content.

**Request:**

```json
{
  "scheduled_at": null
}
```

**Response 200:**

```json
{
  "id": "content_123",
  "status": "published",
  "published_at": "2024-01-15T10:00:00Z",
  "published_by": "usr_123"
}
```

---

#### POST /admin/content/:id/rollback

Rollback to previous version.

**Request:**

```json
{
  "version_id": "ver_456"
}
```

**Response 200:** Rolled back content

---

### 6.5 Media API

#### POST /admin/media/upload

Upload media file.

**Request:**

```http
Content-Type: multipart/form-data

file: [binary data]
title: "Office Photo"
alt_text: "Vantus office interior"
tags: office,team
```

**Response 201:**

```json
{
  "id": "media_123",
  "filename": "office.jpg",
  "original_name": "office_photo.jpg",
  "url": "https://cdn.vantus.systems/media/office.jpg",
  "thumbnail_url": "https://cdn.vantus.systems/media/office_thumb.jpg",
  "size": 2048000,
  "content_type": "image/jpeg",
  "dimensions": {
    "width": 1920,
    "height": 1080
  },
  "tags": ["office", "team"],
  "uploaded_by": "usr_123",
  "uploaded_at": "2024-01-15T10:00:00Z"
}
```

---

#### GET /admin/media

List media files.

**Response 200:**

```json
{
  "data": [
    {
      "id": "media_123",
      "filename": "office.jpg",
      "url": "https://cdn.vantus.systems/media/office.jpg",
      "thumbnail_url": "https://cdn.vantus.systems/media/office_thumb.jpg",
      "size": 2048000,
      "content_type": "image/jpeg",
      "tags": ["office"],
      "uploaded_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

#### PATCH /admin/media/:id

Update media metadata.

**Request:**

```json
{
  "title": "Updated Title",
  "alt_text": "New alt text",
  "tags": ["office", "new-tag"]
}
```

**Response 200:** Updated media

---

#### DELETE /admin/media/:id

Delete media file.

**Response 204:** No content

---

### 6.6 CRM API

#### GET /admin/leads

List all leads.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status |
| `source` | string | Filter by source |
| `assigned_to` | string | Filter by assignee |
| `score_min` | number | Minimum lead score |

**Response 200:**

```json
{
  "data": [
    {
      "id": "lead_123",
      "type": "consultation_request",
      "contact": {
        "first_name": "John",
        "last_name": "Smith",
        "email": "john@example.com",
        "company": "Example Corp"
      },
      "status": "qualified",
      "score": 85,
      "source": "website",
      "assigned_to": {
        "id": "usr_456",
        "name": "Sales Rep"
      },
      "estimated_value": 50000,
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

#### POST /admin/leads

Create lead manually.

**Request:**

```json
{
  "type": "manual_entry",
  "contact": {
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane@company.com",
    "phone": "+1-555-123-4567",
    "company": "Company Inc"
  },
  "requirements": {
    "services": ["managed_it"],
    "budget_range": "25000-50000"
  },
  "source": "referral",
  "notes": "Met at industry conference"
}
```

**Response 201:** Created lead

---

#### GET /admin/leads/:id

Get lead details.

**Response 200:**

```json
{
  "id": "lead_123",
  "type": "consultation_request",
  "contact": {
    "first_name": "John",
    "last_name": "Smith",
    "email": "john@example.com",
    "phone": "+1-555-123-4567",
    "company": "Example Corp",
    "job_title": "IT Director"
  },
  "company_info": {
    "size": "50-200",
    "industry": "technology"
  },
  "requirements": {
    "services": ["managed_it", "cybersecurity"],
    "budget_range": "50000-100000",
    "timeline": "immediate"
  },
  "status": "qualified",
  "score": 85,
  "source": "website",
  "assigned_to": {
    "id": "usr_456",
    "name": "Sales Rep"
  },
  "activities": [
    {
      "type": "email_sent",
      "description": "Welcome email",
      "timestamp": "2024-01-15T10:05:00Z"
    }
  ],
  "notes": [
    {
      "content": "Interested in full managed services",
      "author": "usr_456",
      "created_at": "2024-01-15T11:00:00Z"
    }
  ],
  "created_at": "2024-01-15T10:00:00Z"
}
```

---

#### PATCH /admin/leads/:id

Update lead.

**Request:**

```json
{
  "status": "qualified",
  "score": 90,
  "assigned_to": "usr_789"
}
```

**Response 200:** Updated lead

---

#### POST /admin/leads/:id/convert

Convert lead to customer.

**Request:**

```json
{
  "org_name": "Example Corp",
  "plan": "enterprise",
  "create_organization": true
}
```

**Response 200:**

```json
{
  "lead_id": "lead_123",
  "status": "converted",
  "organization": {
    "id": "org_new",
    "name": "Example Corp"
  },
  "deal": {
    "id": "deal_123",
    "value": 100000
  },
  "converted_at": "2024-01-15T14:00:00Z"
}
```

---

### 6.7 Pipeline API

#### GET /admin/pipelines

List sales pipelines.

**Response 200:**

```json
{
  "data": [
    {
      "id": "pipeline_123",
      "name": "Enterprise Sales",
      "stages": [
        { "id": "stage_1", "name": "Lead", "order": 1 },
        { "id": "stage_2", "name": "Qualified", "order": 2 },
        { "id": "stage_3", "name": "Proposal", "order": 3 },
        { "id": "stage_4", "name": "Negotiation", "order": 4 },
        { "id": "stage_5", "name": "Closed Won", "order": 5 }
      ]
    }
  ]
}
```

---

#### GET /admin/deals

List deals.

**Response 200:**

```json
{
  "data": [
    {
      "id": "deal_123",
      "title": "TechCorp Enterprise Deal",
      "organization": {
        "id": "org_123",
        "name": "TechCorp Inc"
      },
      "stage": {
        "id": "stage_3",
        "name": "Proposal"
      },
      "value": 150000,
      "probability": 60,
      "expected_close": "2024-03-15",
      "assigned_to": {
        "id": "usr_456",
        "name": "Sales Rep"
      },
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

#### POST /admin/deals

Create deal.

**Request:**

```json
{
  "title": "New Deal",
  "org_id": "org_123",
  "pipeline_id": "pipeline_123",
  "stage_id": "stage_1",
  "value": 75000,
  "expected_close": "2024-06-01",
  "assigned_to": "usr_456"
}
```

**Response 201:** Created deal

---

#### PATCH /admin/deals/:id/stage

Move deal to different stage.

**Request:**

```json
{
  "stage_id": "stage_4",
  "reason": "Proposal accepted, negotiating terms"
}
```

**Response 200:** Updated deal

---

### 6.8 Pricing API

#### GET /admin/skus

List SKUs.

**Response 200:**

```json
{
  "data": [
    {
      "id": "sku_123",
      "code": "SVC-MANAGED-IT-BASE",
      "name": "Managed IT - Base",
      "description": "Base managed IT services",
      "type": "service",
      "unit_price": 5000,
      "currency": "USD",
      "billing_interval": "month",
      "status": "active",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

#### POST /admin/skus

Create SKU.

**Request:**

```json
{
  "code": "SVC-NEW",
  "name": "New Service",
  "description": "Description of new service",
  "type": "service",
  "unit_price": 3000,
  "currency": "USD",
  "billing_interval": "month",
  "features": ["Feature 1", "Feature 2"]
}
```

**Response 201:** Created SKU

---

#### PATCH /admin/skus/:id

Update SKU.

**Request:**

```json
{
  "unit_price": 3500,
  "status": "active"
}
```

**Response 200:** Updated SKU

---

#### GET /admin/pricing-rules

List pricing rules.

**Response 200:**

```json
{
  "data": [
    {
      "id": "rule_123",
      "name": "Volume Discount - Enterprise",
      "sku_id": "sku_123",
      "condition": {
        "type": "quantity",
        "min": 100
      },
      "discount": {
        "type": "percentage",
        "value": 15
      },
      "active": true
    }
  ]
}
```

---

#### POST /admin/pricing-rules

Create pricing rule.

**Request:**

```json
{
  "name": "Early Payment Discount",
  "sku_id": "sku_123",
  "condition": {
    "type": "payment_timing",
    "days": 10
  },
  "discount": {
    "type": "percentage",
    "value": 5
  }
}
```

**Response 201:** Created rule

---

#### POST /admin/skus/:id/verify

Verify SKU pricing and availability.

**Request:**

```json
{
  "quantity": 5,
  "org_id": "org_123"
}
```

**Response 200:**

```json
{
  "sku_id": "sku_123",
  "valid": true,
  "unit_price": 5000,
  "total_price": 25000,
  "applied_rules": [
    {
      "rule_id": "rule_123",
      "discount": 3750
    }
  ],
  "final_price": 21250
}
```

---

### 6.9 Audit API

#### GET /admin/audit/events

List audit events.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `user_id` | string | Filter by user |
| `action` | string | Filter by action type |
| `resource_type` | string | Filter by resource |
| `start_date` | date | Start of date range |
| `end_date` | date | End of date range |

**Response 200:**

```json
{
  "data": [
    {
      "id": "evt_123",
      "timestamp": "2024-01-15T10:00:00Z",
      "action": "user.login",
      "actor": {
        "id": "usr_123",
        "type": "user",
        "name": "John Smith"
      },
      "resource": {
        "type": "user",
        "id": "usr_123"
      },
      "ip_address": "192.168.1.1",
      "user_agent": "Mozilla/5.0...",
      "metadata": {
        "mfa_used": true
      }
    }
  ],
  "pagination": {
    "cursor": "eyJpZCI6MTIzfQ",
    "has_more": true
  }
}
```

---

#### GET /admin/audit/users/:id/activity

Get user activity summary.

**Response 200:**

```json
{
  "user_id": "usr_123",
  "period": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  },
  "summary": {
    "login_count": 45,
    "ticket_actions": 23,
    "document_views": 12
  },
  "recent_events": [
    {
      "id": "evt_123",
      "timestamp": "2024-01-15T10:00:00Z",
      "action": "ticket.created"
    }
  ]
}
```

---

#### GET /admin/audit/export

Export audit log.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `format` | string | csv, json (default: json) |
| `start_date` | date | Start date |
| `end_date` | date | End date |

**Response 200:**

```json
{
  "download_url": "https://cdn.vantus.systems/exports/audit_2024-01.csv",
  "expires_at": "2024-01-16T00:00:00Z",
  "record_count": 15420
}
```

---

### 6.10 Feature Flags API

#### GET /admin/feature-flags

List feature flags.

**Response 200:**

```json
{
  "data": [
    {
      "id": "flag_123",
      "key": "new_dashboard",
      "name": "New Dashboard UI",
      "description": "Redesigned dashboard interface",
      "default_value": false,
      "overrides": [
        {
          "org_id": "org_123",
          "value": true
        }
      ],
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

#### POST /admin/feature-flags

Create feature flag.

**Request:**

```json
{
  "key": "beta_feature",
  "name": "Beta Feature",
  "description": "New beta functionality",
  "default_value": false
}
```

**Response 201:** Created flag

---

#### PATCH /admin/feature-flags/:id

Update feature flag.

**Request:**

```json
{
  "default_value": true,
  "overrides": [
    {
      "org_id": "org_456",
      "value": true
    }
  ]
}
```

**Response 200:** Updated flag

---

#### POST /admin/feature-flags/:id/toggle

Toggle feature flag.

**Request:**

```json
{
  "default_value": true
}
```

**Response 200:**

```json
{
  "id": "flag_123",
  "key": "new_dashboard",
  "default_value": true
}
```

---

## 7. Webhook API

**Base Path:** `/api/webhooks`  
**Authentication:** API Key  
**Rate Limit:** 100 req/min

---

### 7.1 Webhook Registration

#### POST /webhooks/register

Register a new webhook.

**Request:**

```json
{
  "url": "https://client.com/webhooks/vantus",
  "events": ["ticket.created", "ticket.updated", "invoice.paid"],
  "secret": "whsec_client_secret_xxx",
  "description": "Production webhook endpoint",
  "active": true
}
```

**Response 201:**

```json
{
  "id": "wh_123",
  "url": "https://client.com/webhooks/vantus",
  "events": ["ticket.created", "ticket.updated", "invoice.paid"],
  "secret": "whsec_client_secret_xxx",
  "description": "Production webhook endpoint",
  "active": true,
  "created_at": "2024-01-15T10:00:00Z"
}
```

---

#### GET /webhooks

List registered webhooks.

**Response 200:**

```json
{
  "data": [
    {
      "id": "wh_123",
      "url": "https://client.com/webhooks/vantus",
      "events": ["ticket.created", "ticket.updated"],
      "active": true,
      "last_delivery": {
        "timestamp": "2024-01-15T09:00:00Z",
        "status": "success"
      },
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

#### DELETE /webhooks/:id

Delete webhook.

**Response 204:** No content

---

#### POST /webhooks/:id/test

Send test webhook event.

**Request:**

```json
{
  "event": "ticket.created"
}
```

**Response 200:**

```json
{
  "test_id": "test_123",
  "status": "delivered",
  "response_status": 200,
  "response_body": "OK",
  "delivered_at": "2024-01-15T10:00:05Z"
}
```

---

### 7.2 Webhook Payload Format

**Standard Webhook Payload:**

```json
{
  "id": "evt_123",
  "type": "ticket.created",
  "timestamp": "2024-01-15T10:00:00Z",
  "data": {
    "id": "tkt_123",
    "number": "TKT-2024-00123",
    "subject": "New ticket",
    "status": "open"
  }
}
```

**Webhook Signature Header:**

```
X-Webhook-Signature: sha256=a1b2c3d4e5f6...
```

**Signature Verification:**

```javascript
const crypto = require("crypto");
const signature = crypto
  .createHmac("sha256", webhookSecret)
  .update(payload)
  .digest("hex");
```

**Available Events:**
| Event | Description |
|-------|-------------|
| `ticket.created` | New ticket created |
| `ticket.updated` | Ticket updated |
| `ticket.closed` | Ticket closed |
| `invoice.created` | New invoice generated |
| `invoice.paid` | Invoice paid |
| `invoice.overdue` | Invoice overdue |
| `user.invited` | User invited |
| `user.activated` | User activated |
| `org.suspended` | Organization suspended |
| `lead.converted` | Lead converted to customer |

---

## 8. Appendices

### Appendix A: Common Data Types

| Type        | Format     | Example                         |
| ----------- | ---------- | ------------------------------- |
| `id`        | string     | `usr_123`, `org_456`            |
| `timestamp` | ISO 8601   | `2024-01-15T10:00:00Z`          |
| `date`      | 2026-02-25 | `2024-01-15`                    |
| `email`     | RFC 5322   | `user@example.com`              |
| `currency`  | ISO 4217   | `USD`, `EUR`                    |
| `phone`     | E.164      | `+1-555-123-4567`               |
| `url`       | RFC 3986   | `https://example.com`           |
| `status`    | enum       | `active`, `inactive`, `pending` |

### Appendix B: Permission Reference

**Available Permissions:**

```
# User Management
users:read, users:create, users:update, users:delete

# Organization
org:read, org:update, org:delete, org:suspend

# Tickets
tickets:read, tickets:create, tickets:update, tickets:delete, tickets:assign

# Billing
billing:read, billing:update, billing:admin

# Content
content:read, content:create, content:update, content:publish, content:delete

# Admin
admin:read, admin:write, admin:super

# Special
*:read, *:write, * (all permissions)
```

### Appendix C: SDK Examples

**JavaScript/TypeScript:**

```typescript
import { VantusAPI } from "@vantus/api-client";

const client = new VantusAPI({
  apiKey: "vsk_live_xxx",
  environment: "production",
});

const tickets = await client.tickets.list({
  status: "open",
  per_page: 20,
});
```

**cURL:**

```bash
# List tickets
curl -X GET \
  https://api.vantus.systems/v1/tickets \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json"

# Create ticket
curl -X POST \
  https://api.vantus.systems/v1/tickets \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Support request",
    "description": "Need help with..."
  }'
```

**Python:**

```python
from vantus import VantusClient

client = VantusClient(api_key="vsk_live_xxx")
tickets = client.tickets.list(status="open")
```

### Appendix D: Change Log

| Version | Date       | Changes         |
| ------- | ---------- | --------------- |
| 1.0.0   | 2024-02-22 | Initial release |

---

## Support

**API Documentation:** https://docs.vantus.systems/api  
**Support Portal:** https://support.vantus.systems  
**Status Page:** https://status.vantus.systems

---

_End of Unified API Specification_

## Sync Notes

- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
