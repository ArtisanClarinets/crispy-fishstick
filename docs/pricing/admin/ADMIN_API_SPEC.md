# ADMIN_API_SPEC — Admin Portal API Specification
**Version:** 1.0.0  
**Date:** 2026-02-22  
**Base URL:** `https://admin.vantus.systems/api/v1`

---

## 1. API Standards

### 1.1 HTTP Methods

| Method | Usage | Idempotent |
|--------|-------|------------|
| GET | Retrieve resources | Yes |
| POST | Create resources | No |
| PUT | Full update | Yes |
| PATCH | Partial update | No |
| DELETE | Remove resources | Yes |

### 1.2 Response Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | Missing/invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource conflict |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Error | Server error |

### 1.3 Pagination

```http
GET /api/v1/users?page=2&limit=25

Response:
{
  "data": [...],
  "pagination": {
    "page": 2,
    "limit": 25,
    "total": 150,
    "totalPages": 6,
    "hasNext": true,
    "hasPrev": true
  },
  "links": {
    "self": "/api/v1/users?page=2&limit=25",
    "first": "/api/v1/users?page=1&limit=25",
    "prev": "/api/v1/users?page=1&limit=25",
    "next": "/api/v1/users?page=3&limit=25",
    "last": "/api/v1/users?page=6&limit=25"
  }
}
```

### 1.4 Filtering

```http
GET /api/v1/users?filter[status]=active&filter[role]=admin
GET /api/v1/content?filter[status]=published&filter[createdAt][gt]=2024-01-01
GET /api/v1/leads?filter[assignedTo]=me&filter[status]=new
```

### 1.5 Sorting

```http
GET /api/v1/users?sort=createdAt:desc
GET /api/v1/content?sort=title:asc,publishedAt:desc
```

### 1.6 Field Selection

```http
GET /api/v1/users/123?fields=id,email,firstName,lastName
GET /api/v1/content?fields=id,title,slug,status
```

---

## 2. Authentication

### 2.1 Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@vantus.systems",
  "password": "SecurePass123!"
}

Response 200:
{
  "user": {
    "id": "usr_123",
    "email": "admin@vantus.systems",
    "firstName": "Admin",
    "lastName": "User"
  },
  "mfaRequired": true,
  "mfaToken": "mfa_token_xyz"
}
```

### 2.2 MFA Verification

```http
POST /api/v1/auth/mfa/verify
Content-Type: application/json

{
  "mfaToken": "mfa_token_xyz",
  "code": "123456"
}

Response 200:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresAt": "2024-01-15T16:30:00Z",
  "user": {
    "id": "usr_123",
    "email": "admin@vantus.systems",
    "roles": ["SUPER_ADMIN"]
  }
}
```

### 2.3 Token Refresh

```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}

Response 200:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresAt": "2024-01-15T16:30:00Z"
}
```

### 2.4 Logout

```http
POST /api/v1/auth/logout
Authorization: Bearer {accessToken}

Response 204:
```

---

## 3. Users

### 3.1 List Users

```http
GET /api/v1/users?page=1&limit=25&filter[status]=active
Authorization: Bearer {token}

Response 200:
{
  "data": [
    {
      "id": "usr_123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "status": "active",
      "roles": ["CONTENT_EDITOR"],
      "lastLoginAt": "2024-01-15T10:30:00Z",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {...}
}
```

### 3.2 Get User

```http
GET /api/v1/users/usr_123
Authorization: Bearer {token}

Response 200:
{
  "id": "usr_123",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "avatarUrl": "https://...",
  "status": "active",
  "mfaEnabled": true,
  "roles": ["CONTENT_EDITOR"],
  "permissions": ["content.read", "content.create", "content.update"],
  "orgs": [
    {
      "id": "org_456",
      "name": "Acme Corp",
      "role": "admin"
    }
  ],
  "lastLoginAt": "2024-01-15T10:30:00Z",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-10T12:00:00Z"
}
```

### 3.3 Create User

```http
POST /api/v1/users
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": "newuser@example.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "roles": ["CONTENT_EDITOR"],
  "orgIds": ["org_456"]
}

Response 201:
{
  "id": "usr_789",
  "email": "newuser@example.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "status": "pending",
  "inviteUrl": "https://admin.vantus.systems/invite/xyz",
  "createdAt": "2024-01-15T14:30:00Z"
}
```

### 3.4 Update User

```http
PATCH /api/v1/users/usr_123
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "Johnny",
  "roles": ["CONTENT_EDITOR", "CONTENT_PUBLISHER"]
}

Response 200:
{
  "id": "usr_123",
  "email": "user@example.com",
  "firstName": "Johnny",
  "roles": ["CONTENT_EDITOR", "CONTENT_PUBLISHER"],
  "updatedAt": "2024-01-15T15:00:00Z"
}
```

### 3.5 Delete User

```http
DELETE /api/v1/users/usr_123
Authorization: Bearer {token}

Response 204:
```

---

## 4. Organizations

### 4.1 List Organizations

```http
GET /api/v1/orgs?filter[status]=active
Authorization: Bearer {token}

Response 200:
{
  "data": [
    {
      "id": "org_123",
      "slug": "acme-corp",
      "name": "Acme Corp",
      "status": "active",
      "planTier": "professional",
      "memberCount": 12,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {...}
}
```

### 4.2 Get Organization

```http
GET /api/v1/orgs/org_123
Authorization: Bearer {token}

Response 200:
{
  "id": "org_123",
  "slug": "acme-corp",
  "name": "Acme Corp",
  "description": "A leading technology company",
  "website": "https://acme.com",
  "industry": "Technology",
  "size": "51-200",
  "status": "active",
  "planTier": "professional",
  "billingEmail": "billing@acme.com",
  "settings": {...},
  "memberCount": 12,
  "members": [
    {
      "userId": "usr_456",
      "email": "admin@acme.com",
      "role": "owner",
      "joinedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-10T00:00:00Z"
}
```

### 4.3 Create Organization

```http
POST /api/v1/orgs
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Corp",
  "slug": "new-corp",
  "billingEmail": "billing@newcorp.com",
  "planTier": "starter"
}

Response 201:
{
  "id": "org_789",
  "slug": "new-corp",
  "name": "New Corp",
  "status": "active",
  "createdAt": "2024-01-15T14:30:00Z"
}
```

### 4.4 Invite Member

```http
POST /api/v1/orgs/org_123/members/invite
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": "newmember@acme.com",
  "role": "admin"
}

Response 201:
{
  "inviteId": "inv_abc123",
  "email": "newmember@acme.com",
  "role": "admin",
  "inviteUrl": "https://admin.vantus.systems/invite/abc123",
  "expiresAt": "2024-01-22T14:30:00Z"
}
```

---

## 5. Content

### 5.1 List Content

```http
GET /api/v1/content?filter[contentType]=pages&filter[status]=published
Authorization: Bearer {token}

Response 200:
{
  "data": [
    {
      "id": "cnt_123",
      "slug": "homepage",
      "title": "Homepage",
      "status": "published",
      "contentType": "pages",
      "locale": "en-US",
      "publishedAt": "2024-01-10T00:00:00Z",
      "publishedBy": {
        "id": "usr_456",
        "email": "publisher@example.com"
      },
      "updatedAt": "2024-01-10T00:00:00Z"
    }
  ],
  "pagination": {...}
}
```

### 5.2 Get Content

```http
GET /api/v1/content/cnt_123
Authorization: Bearer {token}

Response 200:
{
  "id": "cnt_123",
  "slug": "homepage",
  "title": "Homepage",
  "body": "Welcome to our site...",
  "status": "published",
  "contentType": "pages",
  "locale": "en-US",
  "data": {
    "heroTitle": "Welcome",
    "heroImage": "img_789"
  },
  "metadata": {
    "seoTitle": "Welcome to Vantus",
    "seoDescription": "...",
    "ogImage": "img_abc"
  },
  "version": 5,
  "publishedVersion": 5,
  "createdBy": {...},
  "updatedBy": {...},
  "publishedBy": {...},
  "publishedAt": "2024-01-10T00:00:00Z",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-10T00:00:00Z"
}
```

### 5.3 Create Content

```http
POST /api/v1/content
Authorization: Bearer {token}
Content-Type: application/json

{
  "contentType": "pages",
  "slug": "about-us",
  "title": "About Us",
  "body": "We are...",
  "locale": "en-US",
  "data": {
    "heroTitle": "About Us",
    "teamSection": true
  },
  "metadata": {
    "seoTitle": "About Vantus",
    "seoDescription": "Learn about our company"
  }
}

Response 201:
{
  "id": "cnt_789",
  "slug": "about-us",
  "title": "About Us",
  "status": "draft",
  "version": 1,
  "createdAt": "2024-01-15T14:30:00Z"
}
```

### 5.4 Update Content

```http
PATCH /api/v1/content/cnt_123
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "body": "Updated content..."
}

Response 200:
{
  "id": "cnt_123",
  "version": 6,
  "updatedAt": "2024-01-15T15:00:00Z"
}
```

### 5.5 Publish Content

```http
POST /api/v1/content/cnt_123/publish
Authorization: Bearer {token}
Content-Type: application/json

{
  "reason": "Ready for production"
}

Response 200:
{
  "id": "cnt_123",
  "status": "published",
  "publishedVersion": 6,
  "publishedAt": "2024-01-15T15:00:00Z"
}
```

### 5.6 Rollback Content

```http
POST /api/v1/content/cnt_123/rollback
Authorization: Bearer {token}
Content-Type: application/json

{
  "toVersion": 5,
  "reason": "Mistake in v6"
}

Response 200:
{
  "id": "cnt_123",
  "status": "published",
  "version": 7,
  "publishedVersion": 5
}
```

---

## 6. CRM

### 6.1 List Leads

```http
GET /api/v1/crm/leads?filter[status]=new&filter[assignedTo]=me
Authorization: Bearer {token}

Response 200:
{
  "data": [
    {
      "id": "lead_123",
      "email": "prospect@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "company": "Prospect Co",
      "status": "new",
      "score": 75,
      "source": "web",
      "assignedTo": {...},
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {...}
}
```

### 6.2 Create Lead

```http
POST /api/v1/crm/leads
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": "new@example.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "company": "New Co",
  "source": "referral"
}

Response 201:
{
  "id": "lead_789",
  "email": "new@example.com",
  "status": "new",
  "createdAt": "2024-01-15T14:30:00Z"
}
```

### 6.3 Convert Lead

```http
POST /api/v1/crm/leads/lead_123/convert
Authorization: Bearer {token}
Content-Type: application/json

{
  "orgName": "Prospect Co",
  "createContact": true,
  "createDeal": true,
  "dealValue": 10000,
  "dealCurrency": "USD"
}

Response 200:
{
  "leadId": "lead_123",
  "contactId": "cnt_456",
  "orgId": "org_789",
  "dealId": "deal_abc",
  "convertedAt": "2024-01-15T14:30:00Z"
}
```

### 6.4 List Deals

```http
GET /api/v1/crm/deals?filter[pipeline]=sales&filter[stage]=proposal
Authorization: Bearer {token}

Response 200:
{
  "data": [
    {
      "id": "deal_123",
      "name": "Enterprise Deal",
      "value": 50000,
      "currency": "USD",
      "probability": 75,
      "stage": "proposal",
      "expectedCloseDate": "2024-02-15",
      "contact": {...},
      "org": {...},
      "owner": {...}
    }
  ],
  "pagination": {...}
}
```

---

## 7. Pricing

### 7.1 List SKUs

```http
GET /api/v1/pricing/skus?filter[status]=active
Authorization: Bearer {token}

Response 200:
{
  "data": [
    {
      "id": "sku_123",
      "code": "PRO-PLAN",
      "name": "Professional Plan",
      "status": "active",
      "basePrice": 9900,
      "currency": "USD",
      "lastVerifiedAt": "2024-01-10T00:00:00Z",
      "lastVerifiedBy": {...}
    }
  ],
  "pagination": {...}
}
```

### 7.2 Update SKU Price

```http
PATCH /api/v1/pricing/skus/sku_123
Authorization: Bearer {token}
Content-Type: application/json

{
  "basePrice": 14900,
  "effectiveFrom": "2024-02-01"
}

Response 200:
{
  "id": "sku_123",
  "basePrice": 14900,
  "version": 2,
  "verificationStatus": "unverified",
  "updatedAt": "2024-01-15T15:00:00Z"
}
```

### 7.3 Verify Price

```http
POST /api/v1/pricing/skus/sku_123/verify
Authorization: Bearer {token}
Content-Type: application/json

{
  "notes": "Verified with finance team"
}

Response 200:
{
  "id": "sku_123",
  "verificationStatus": "verified",
  "lastVerifiedAt": "2024-01-15T15:00:00Z",
  "lastVerifiedBy": {...}
}
```

---

## 8. Audit Log

### 8.1 Query Audit Log

```http
GET /api/v1/audit?filter[type]=content&filter[from]=2024-01-01
Authorization: Bearer {token}

Response 200:
{
  "data": [
    {
      "id": "aud_123",
      "timestamp": "2024-01-15T14:30:00Z",
      "eventType": "content",
      "eventAction": "publish",
      "actor": {
        "id": "usr_456",
        "email": "publisher@example.com"
      },
      "target": {
        "type": "content",
        "id": "cnt_789",
        "name": "About Us"
      },
      "outcome": "success",
      "metadata": {
        "reason": "Ready for production"
      }
    }
  ],
  "pagination": {...}
}
```

---

## 9. Error Responses

### 9.1 Validation Error

```http
Response 400:
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      },
      {
        "field": "password",
        "message": "Password must be at least 16 characters"
      }
    ]
  }
}
```

### 9.2 Authentication Error

```http
Response 401:
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

### 9.3 Permission Error

```http
Response 403:
{
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions",
    "required": "content.publish",
    "current": ["content.read", "content.create"]
  }
}
```

### 9.4 Rate Limit Error

```http
Response 429:
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retryAfter": 60
  }
}
```

---

## 10. Rate Limiting

| Endpoint Group | Limit | Window |
|----------------|-------|--------|
| Auth | 10 | 1 minute |
| General API | 100 | 1 minute |
| Content Write | 30 | 1 minute |
| Bulk Operations | 10 | 1 minute |
| Export | 5 | 1 minute |

Rate limit headers:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705333200
```

---

**End of ADMIN_API_SPEC v1.0.0**
