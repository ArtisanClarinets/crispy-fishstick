---
Document: OWNERSHIP_PORTABILITY
Doc ID: VS-TEMPLATE-COMM-004
Client: [[CLIENT_NAME]]
Project: [[PROJECT_NAME]]
Owner: Legal / Solution Architect
Contributors: Account Manager, Technical Lead, Client Stakeholders
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/01_commercial/04_OWNERSHIP_PORTABILITY.md
Approvers: [[LEGAL_COUNSEL]] / [[CLIENT_SPONSOR]] / [[TECH_LEAD]]
---

# IP Ownership and Host Portability Guide

## Purpose
This document establishes the **intellectual property ownership framework** and **host portability guarantees** that are foundational to Vantus's full ownership-first approach. It ensures clients have complete ownership of their digital assets and the freedom to move their systems to any hosting provider. Use this document to:
- Define ownership rights for all project deliverables
- Establish portability requirements and guarantees
- Document the migration protocol for changing hosts
- Provide transparency into third-party dependencies
- Ensure clients retain full control of their digital infrastructure

## Instructions
1. **Customization:** Replace all `[[PLACEHOLDERS]]` with project-specific values
2. **Legal Review:** Have legal counsel review ownership terms
3. **Technical Validation:** Ensure architecture supports portability claims
4. **Documentation:** Maintain bill of materials for all components
5. **Transparency:** Clearly identify any portability limitations

---

## 1. INTELLECTUAL PROPERTY OWNERSHIP

### 1.1 Ownership Grant

Upon final payment and project acceptance, Vantus Systems grants [[CLIENT_NAME]] ("Client") the following rights:

**Full Ownership Rights:**
- **Perpetual:** Rights continue indefinitely without expiration
- **Irrevocable:** Rights cannot be withdrawn or terminated
- **Global:** Rights apply worldwide without geographic limitation
- **Exclusive:** Client has exclusive rights (except as noted in Section 1.4)
- **Transferable:** Client may transfer rights to successors or affiliates

### 1.2 Work Product Categories

| Category | Definition | Ownership | Examples |
|---|---|:---:|---|
| **Custom Work Product** | Created specifically for this project | **Client** | Source code, configurations, documentation, designs |
| **Pre-Existing Materials** | Vantus tools and frameworks | **Vantus** | Internal libraries, templates, methodologies |
| **Third-Party Materials** | Licensed from others | **Third-Party** | Open-source libraries, commercial software |
| **Joint Work** | Collaborative creations | **Shared** | Jointly developed innovations (rare) |

### 1.3 Custom Work Product Details

Client receives full ownership of:

**Source Code:**
- All application source code (frontend, backend, APIs)
- Database schemas and migration scripts
- Infrastructure as code (Terraform, CloudFormation, etc.)
- CI/CD pipeline configurations
- Test suites and testing frameworks
- Scripts and automation tools

**Documentation:**
- Architecture documentation and diagrams
- API specifications and documentation
- User guides and administrator guides
- Runbooks and operational procedures
- Training materials and videos
- The complete Complete Client Documentation Kit

**Design Assets:**
- UI/UX designs and wireframes
- Graphic assets and icons
- Style guides and design systems
- Prototypes and mockups

**Configuration:**
- Environment configurations
- Security policies and rules
- Monitoring and alerting configurations
- Backup and recovery configurations

### 1.4 Vantus Pre-Existing Materials License

Vantus retains ownership of Pre-Existing Materials but grants Client:

**Perpetual License:**
- Right to use Pre-Existing Materials as part of the delivered system
- Right to modify Pre-Existing Materials for Client's use
- Right to distribute Pre-Existing Materials as part of Client's system
- No restriction on number of users or instances

**Limitations:**
- Client may not sell or license Pre-Existing Materials standalone
- Client may not use Pre-Existing Materials for unrelated projects
- Vantus may use Pre-Existing Materials for other clients

**Examples of Pre-Existing Materials:**
- Vantus internal component libraries
- Standard deployment scripts
- Documentation templates
- Testing utilities
- Internal frameworks and tools

### 1.5 Third-Party Intellectual Property

**Client Responsibility:**
- Client is responsible for complying with third-party licenses
- Client must maintain valid licenses for commercial third-party software
- Vantus will identify all third-party dependencies in the Bill of Materials

**Common Third-Party Licenses:**

| License Type | Usage Rights | Attribution Required | Commercial Use |
|---|---|:---:|:---:|
| **MIT** | Free use, modification, distribution | Yes | Yes |
| **Apache 2.0** | Free use, modification, distribution, patent grant | Yes | Yes |
| **BSD** | Free use, modification, distribution | Varies | Yes |
| **GPL** | Free use; derivative works must be GPL | Yes | Yes (with conditions) |
| **Proprietary** | Per license agreement | Per license | Per license |

**Vantus Commitment:**
- No proprietary third-party components without Client approval
- Preference for permissive open-source licenses (MIT, Apache 2.0)
- Full disclosure of all third-party dependencies
- Assistance with license compliance documentation

---

## 2. THE HOST PORTABILITY MANDATE

### 2.1 Portability by Default

Vantus designs all systems for **Portability by Default**, meaning:

**Core Principle:**
> "Your system should be able to run on any standards-compliant infrastructure with minimal effort."

**Portability Requirements:**
- No proprietary cloud services that create vendor lock-in
- Standard containerization for deployment flexibility
- Database schemas in standard, portable formats
- Configuration via environment variables, not hardcoded values
- Documentation of all external dependencies

### 2.2 No Cloud Lock-In

**Prohibited Patterns:**
- Proprietary database services (e.g., AWS DynamoDB, Google Firestore) as primary data store
- Proprietary serverless functions without container fallbacks
- Cloud-specific authentication systems
- Vendor-specific messaging queues without abstraction
- Proprietary monitoring that cannot be exported

**Required Patterns:**
- Standard PostgreSQL/MySQL databases (can run anywhere)
- Containerized applications (Docker/OCI standard)
- Standard authentication (OAuth 2.0, OpenID Connect, SAML)
- Portable message queues (Redis, RabbitMQ, NATS)
- Open telemetry and standard monitoring

### 2.3 Database Portability

**Data Ownership:**
- Client owns all data stored in the system
- Data stored in standard formats (PostgreSQL, MySQL, etc.)
- No proprietary data formats or encryption that prevents export
- Full database export capability at any time

**Schema Portability:**
- Database schemas defined in standard SQL
- Migration scripts using standard tools (Prisma, Flyway, Liquibase)
- No database-specific stored procedures without documentation
- Clear data dictionary documenting all tables and relationships

**Migration Capability:**
- Database can be exported to standard SQL dump
- Data can be migrated to different database engines if needed
- No vendor-specific data types that prevent migration

### 2.4 Secret and Configuration Portability

**Secrets Management:**
- All secrets externalized to environment variables
- Support for standard secret management systems (HashiCorp Vault, AWS Secrets Manager, Azure Key Vault)
- No hardcoded credentials in source code
- Clear documentation of all required secrets

**Configuration Management:**
- Environment-specific configuration via environment variables
- Configuration files in standard formats (JSON, YAML, TOML)
- No environment-specific code branches
- Clear documentation of all configuration options

---

## 3. MIGRATION PROTOCOL

### 3.1 Migration Scenarios

This protocol applies to:

1. **Hosting Provider Change:** Moving from one cloud provider to another
2. **Infrastructure Change:** Moving from cloud to on-premise or vice versa
3. **Geographic Migration:** Moving to different regions or data centers
4. **Disaster Recovery:** Emergency migration due to provider failure
5. **Exit from Vantus Support:** Client self-managing infrastructure

### 3.2 Migration Steps

#### Step 1: Pre-Migration Preparation (1-2 weeks before)

**Actions:**
- [ ] Review current architecture and dependencies
- [ ] Identify new hosting requirements and constraints
- [ ] Provision new infrastructure environment
- [ ] Configure networking and security groups
- [ ] Set up database in new environment
- [ ] Configure DNS with reduced TTL (300 seconds recommended)
- [ ] Prepare rollback plan

**Deliverables:**
- Migration runbook
- Infrastructure configuration for new environment
- Database migration plan
- Rollback procedures

#### Step 2: Data Migration (Day of migration)

**Actions:**
- [ ] Place application in maintenance mode (if applicable)
- [ ] Export database from current environment
- [ ] Transfer database export to new environment
- [ ] Import database to new environment
- [ ] Verify data integrity (row counts, key relationships)
- [ ] Run data validation scripts

**Expected Duration:** 1-4 hours depending on data size

**Downtime:** Minimal (duration of DNS switch only if using blue-green deployment)

#### Step 3: Application Deployment (Day of migration)

**Actions:**
- [ ] Deploy application containers to new environment
- [ ] Configure environment variables and secrets
- [ ] Run smoke tests to verify functionality
- [ ] Verify all integrations are working
- [ ] Check monitoring and alerting

**Expected Duration:** 30 minutes - 1 hour

#### Step 4: DNS Cutover (Day of migration)

**Actions:**
- [ ] Update DNS records to point to new environment
- [ ] Monitor traffic transition
- [ ] Verify SSL certificates are working
- [ ] Check for any errors in new environment

**Expected Duration:** 5-60 minutes (DNS propagation)

#### Step 5: Post-Migration Verification (1-2 days after)

**Actions:**
- [ ] Monitor application performance and error rates
- [ ] Verify all scheduled jobs are running
- [ ] Check backup systems in new environment
- [ ] Validate monitoring and alerting
- [ ] Confirm with users that everything is working
- [ ] Decommission old environment (after 1 week stability)

### 3.3 Expected Migration Timeline

| Scenario | Expected Duration | Downtime |
|---|---|---|
| **Standard Migration** | 2-4 hours | 0-15 minutes |
| **Large Data Volume (>1TB)** | 4-8 hours | 15-30 minutes |
| **Complex Multi-Service** | 1-2 days | 0 minutes (blue-green) |
| **Emergency Migration** | 1-2 hours | Variable |

### 3.4 Rollback Plan

**Rollback Triggers:**
- Critical functionality not working in new environment
- Performance degradation unacceptable
- Data integrity issues detected
- Security concerns identified

**Rollback Procedure:**
1. Revert DNS to point to old environment (5 minutes)
2. Verify old environment is still operational
3. Investigate issues in new environment
4. Fix issues and retry migration

**Rollback Time:** 5-15 minutes

---

## 4. BILL OF MATERIALS (BOM)

### 4.1 System Components

| Component | Technology | Version | License | Portability Notes |
|---|---|---:|---|---|
| **Frontend Framework** | [[Next.js]] | [[16.x]] | MIT | Standard Node.js application |
| **Backend Runtime** | [[Node.js]] | [[20.x]] | MIT | Runs on any Linux/Windows/macOS |
| **Database** | [[PostgreSQL]] | [[15.x]] | PostgreSQL License | Standard SQL; portable to any host |
| **ORM** | [[Prisma]] | [[5.x]] | Apache 2.0 | Database-agnostic migrations |
| **Authentication** | [[BetterAuth]] | [[Latest]] | MIT | Standard OAuth/OIDC support |
| **Styling** | [[Tailwind CSS]] | [[3.x]] | MIT | Standard CSS framework |
| **UI Components** | [[Radix UI]] | [[Latest]] | MIT | Headless, portable components |
| **Container Runtime** | [[Docker]] | [[Latest]] | Apache 2.0 | OCI standard containers |
| **Web Server** | [[Nginx]] | [[Latest]] | BSD | Standard reverse proxy |

### 4.2 Infrastructure Components

| Component | Purpose | Portability |
|---|---|---|
| **Compute** | Application hosting | Any Docker-compatible host |
| **Database** | Data persistence | Any PostgreSQL-compatible service |
| **Object Storage** | File storage | S3-compatible API (MinIO alternative) |
| **CDN** | Content delivery | Any CDN or self-hosted |
| **DNS** | Domain resolution | Any DNS provider |
| **SSL/TLS** | Encryption | Let's Encrypt or any certificate authority |
| **Monitoring** | Observability | Any Prometheus/Grafana-compatible system |

### 4.3 Third-Party Services

| Service | Purpose | Alternative | Migration Effort |
|---|---|---|---|
| [[e.g., Vercel]] | [[Hosting]] | [[Any VPS/Cloud]] | [[Low - standard deployment]] |
| [[e.g., Neon]] | [[Database]] | [[Self-hosted PostgreSQL]] | [[Low - standard PostgreSQL]] |
| [[e.g., Upstash]] | [[Redis]] | [[Self-hosted Redis]] | [[Low - standard Redis]] |
| [[e.g., SendGrid]] | [[Email]] | [[Any SMTP provider]] | [[Low - SMTP standard]] |
| [[e.g., Stripe]] | [[Payments]] | [[Any payment processor]] | [[Medium - API differences]] |

### 4.4 Custom Code Inventory

| Module | Description | Language | Lines of Code |
|---|---|---:|---:|
| [[Module 1]] | [[Description]] | [[TypeScript]] | [[X]] |
| [[Module 2]] | [[Description]] | [[TypeScript]] | [[X]] |
| [[Module 3]] | [[Description]] | [[SQL]] | [[X]] |
| **Total** | | | **[[X]]** |

---

## 5. PORTABILITY GUARANTEES AND LIMITATIONS

### 5.1 Portability Guarantees

Vantus guarantees:

1. **Standard Technologies:** All core technologies are open standards or widely-adopted open source
2. **Containerization:** Application is fully containerized with Docker
3. **Database Portability:** Database uses standard PostgreSQL with no proprietary extensions
4. **Configuration Externalization:** All configuration is externalized (no hardcoded values)
5. **Documentation:** Complete documentation of architecture, dependencies, and procedures
6. **Migration Support:** Assistance with first migration if needed (within warranty period)

### 5.2 Portability Limitations

The following limitations apply:

| Limitation | Explanation | Mitigation |
|---|---|---|
| **Third-Party APIs** | Integration with third-party services (Stripe, SendGrid) requires those services | Choose alternative providers; abstract integrations |
| **Custom Integrations** | Custom integrations with Client's legacy systems may need rework | Document integration points; provide adapter patterns |
| **Performance Tuning** | Performance optimizations specific to current infrastructure | Document tuning parameters; test on new infrastructure |
| **Domain-Specific Logic** | Business logic tied to specific workflows | Well-documented code; clear separation of concerns |

### 5.3 Vendor Lock-In Risk Assessment

| Component | Lock-In Risk | Mitigation Strategy |
|---|---|---|
| **Application Code** | None | Client owns all code |
| **Database** | Low | Standard PostgreSQL; easy export |
| **Hosting** | None | Containerized; runs anywhere |
| **Third-Party APIs** | Medium | Abstracted interfaces; documented |
| **Monitoring** | Low | Standard Prometheus/Grafana |
| **CI/CD** | Low | Standard GitHub Actions/GitLab CI |

---

## 6. OWNER-CONTROLLED SYSTEMS TRANSFER

### 6.1 Transfer Process

Upon project completion, Vantus will:

1. **Code Transfer:**
   - Transfer all source code to Client's repository
   - Ensure all code is documented and buildable
   - Provide build and deployment instructions

2. **Documentation Transfer:**
   - Deliver complete Complete Client Documentation Kit
   - Provide architecture decision records
   - Include operational runbooks

3. **Access Transfer:**
   - Transfer all hosting account access (if applicable)
   - Provide database credentials securely
   - Transfer domain and DNS management

4. **Knowledge Transfer:**
   - Conduct handoff training sessions
   - Provide recorded demonstrations
   - Make team available for questions during warranty

### 6.2 Credential Escrow

All credentials will be transferred securely:

- **Method:** Encrypted password manager export or secure physical handoff
- **Contents:** All service accounts, API keys, database credentials, admin passwords
- **Verification:** Client verifies all credentials work before sign-off
- **Documentation:** Spreadsheet listing all credentials and their purposes

See [02_CREDENTIAL_ESCROW_PROCEDURE.md](../09_full ownership_transfer/02_CREDENTIAL_ESCROW_PROCEDURE.md) for details.

### 6.3 Post-Transfer Support

After ownership transfer:

- **Warranty Period:** [[90]] days of defect resolution support
- **Knowledge Base:** Access to documentation and runbooks
- **Community:** Access to Vantus community forums (if available)
- **Future Engagement:** Available for future enhancements or support contracts

---

## 7. RELATED DOCUMENTS

| Document | Relationship | Location |
|---|---|---|
| [01_SOW.md](./01_SOW.md) | Master agreement with ownership terms | Current directory |
| [03_BILL_OF_MATERIALS.md](../09_full ownership_transfer/03_BILL_OF_MATERIALS.md) | Complete component inventory | Full Ownership directory |
| [02_CREDENTIAL_ESCROW_PROCEDURE.md](../09_full ownership_transfer/02_CREDENTIAL_ESCROW_PROCEDURE.md) | Secure credential transfer | Full Ownership directory |
| [01_SOVEREIGNTY_TRANSFER_GUIDE.md](../09_full ownership_transfer/01_SOVEREIGNTY_TRANSFER_GUIDE.md) | Complete transfer procedures | Full Ownership directory |
| [04_EXIT_PLAN.md](../09_full ownership_transfer/04_EXIT_PLAN.md) | Exit and migration planning | Full Ownership directory |

---

## 8. QUALITY CHECKLIST

Before finalizing this document, verify:

- [ ] All `[[PLACEHOLDERS]]` replaced with actual project values
- [ ] Ownership terms reviewed by legal counsel
- [ ] All work product categories clearly defined
- [ ] Pre-existing materials license terms specified
- [ ] Third-party dependencies fully documented
- [ ] Portability requirements validated by technical team
- [ ] Migration protocol tested (if possible)
- [ ] Bill of Materials complete and accurate
- [ ] Portability limitations clearly stated
- [ ] Lock-in risk assessment completed
- [ ] Transfer process documented
- [ ] Credential escrow procedure referenced
- [ ] Related documents cross-referenced
- [ ] Client has reviewed and understands terms
- [ ] Version history initialized

---

## 9. CHANGE HISTORY

| Date | Version | Author | Summary |
|---|---:|---|---|
| 2026-02-02 | 1.0.0 | Technical Writer | Complete rewrite with comprehensive ownership framework, portability mandate, migration protocol, and BOM structure |
| 2026-01-18 | 0.1.0 | Vantus Systems | Initial template creation |

---

*Vantus Systems: Engineering Independence.*
*Last Updated: 2026-02-09 | Version 1.0.0 | Status: Template*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
