---
Document: BILL_OF_MATERIALS
Doc ID: VS-TEMPLATE-OWN-003
Client: [[CLIENT_NAME]]
Project: [[PROJECT_NAME]]
Owner: Delivery Lead
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/09_ownership_transfer/03_BILL_OF_MATERIALS.md
---

# Bill of Materials (Systems and Accounts)

**Purpose:** Complete inventory of all system components, accounts, and assets  
**Audience:** Client IT Team, Vantus Delivery Team  
**Use:** Ownership transfer, renewal tracking, audit compliance

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-02-09 | Vantus Systems | Removed owner-controlled systems terminology, simplified language |
| 1.0.0 | [[DATE]] | [[AUTHOR]] | Initial release |

---

## 1. Domain Assets

| Domain | Registrar | Owner | Renewal Date | Auto-Renew | Notes |
|--------|-----------|-------|--------------|------------|-------|
| [[DOMAIN_1]] | [[REGISTRAR]] | [[OWNER]] | [[DATE]] | [ ] Yes / [ ] No | [[NOTES]] |
| [[DOMAIN_2]] | [[REGISTRAR]] | [[OWNER]] | [[DATE]] | [ ] Yes / [ ] No | [[NOTES]] |

## 2. Cloud Infrastructure

| Provider | Account ID | Services Used | Owner | Billing Contact | Monthly Cost |
|----------|------------|---------------|-------|-----------------|--------------|
| AWS | [[ID]] | EC2, RDS, S3, CloudFront | [[OWNER]] | [[CONTACT]] | $[[AMOUNT]] |
| Azure | [[ID]] | App Service, SQL Database | [[OWNER]] | [[CONTACT]] | $[[AMOUNT]] |
| GCP | [[ID]] | Compute Engine, Cloud Storage | [[OWNER]] | [[CONTACT]] | $[[AMOUNT]] |
| Vercel | [[ID]] | Hosting, Analytics | [[OWNER]] | [[CONTACT]] | $[[AMOUNT]] |

## 3. Third-Party Services

| Service | Provider | Purpose | Account Owner | Renewal Date | Cost |
|---------|----------|---------|---------------|--------------|------|
| Monitoring | [[PROVIDER]] | System monitoring | [[OWNER]] | [[DATE]] | $[[COST]] |
| Error Tracking | [[PROVIDER]] | Error logging | [[OWNER]] | [[DATE]] | $[[COST]] |
| Email Service | [[PROVIDER]] | Transactional email | [[OWNER]] | [[DATE]] | $[[COST]] |
| Analytics | [[PROVIDER]] | User analytics | [[OWNER]] | [[DATE]] | $[[COST]] |
| Auth Provider | [[PROVIDER]] | Authentication | [[OWNER]] | [[DATE]] | $[[COST]] |
| CDN | [[PROVIDER]] | Content delivery | [[OWNER]] | [[DATE]] | $[[COST]] |
| Database Hosting | [[PROVIDER]] | Managed database | [[OWNER]] | [[DATE]] | $[[COST]] |
| File Storage | [[PROVIDER]] | Object storage | [[OWNER]] | [[DATE]] | $[[COST]] |

## 4. Software Licenses

| Software | License Type | Quantity | Owner | Expiry Date | Cost |
|----------|--------------|----------|-------|-------------|------|
| [[SOFTWARE]] | [[TYPE]] | [[QTY]] | [[OWNER]] | [[DATE]] | $[[COST]] |

## 5. SSL Certificates

| Domain | Provider | Type | Expiry Date | Auto-Renew |
|--------|----------|------|-------------|------------|
| [[DOMAIN]] | [[PROVIDER]] | [[TYPE]] | [[DATE]] | [ ] Yes / [ ] No |

## 6. Code Repositories

| Repository | Platform | Visibility | Owner | Contributors |
|------------|----------|------------|-------|--------------|
| [[REPO_NAME]] | [[PLATFORM]] | [[PUBLIC/PRIVATE]] | [[OWNER]] | [[LIST]] |

## 7. Documentation Assets

| Asset | Location | Owner | Format | Last Updated |
|-------|----------|-------|--------|--------------|
| Architecture Docs | [[LOCATION]] | [[OWNER]] | Markdown | [[DATE]] |
| Runbooks | [[LOCATION]] | [[OWNER]] | Markdown | [[DATE]] |
| API Documentation | [[LOCATION]] | [[OWNER]] | OpenAPI | [[DATE]] |
| Design Assets | [[LOCATION]] | [[OWNER]] | Figma/Sketch | [[DATE]] |

---

## Inventory Checklist

- [ ] All domains listed with renewal dates
- [ ] All cloud accounts listed with billing contacts
- [ ] All third-party services documented
- [ ] All software licenses tracked
- [ ] All SSL certificates noted with expiry dates
- [ ] All code repositories identified
- [ ] All documentation assets located
- [ ] Access verified for each account
- [ ] Renewal calendar created
- [ ] Cost summary completed

---

## Change History

| Date | Version | Change Description | Approved By |
|------|---------|-------------------|-------------|
| 2026-02-09 | 2.0.0 | Removed owner-controlled systems terminology, simplified language to 9th grade level | Vantus Systems |
| [[DATE]] | 1.0.0 | Initial bill of materials creation | [[APPROVER]] |

---

[End of Bill of Materials]


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
