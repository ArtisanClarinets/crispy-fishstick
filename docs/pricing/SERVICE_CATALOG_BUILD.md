# Vantus Systems — Build Services Catalog

**Version:** 1.0  
**Last Updated:** 2026-03-07  
**Scope:** Enterprise-grade web and infrastructure build services for Gulf Coast SMBs (5-200 employees)  
**Note:** This catalog covers BUILD services only. Vantus Care (managed services) is documented separately.

---

## Table of Contents

1. [How to Use This Catalog](#how-to-use-this-catalog)
2. [Core Build Packages](#core-build-packages)
3. [Infrastructure Services](#infrastructure-services)
4. [Enterprise Add-On Modules](#enterprise-add-on-modules)
5. [Delivery Governance Services](#delivery-governance-services)
6. [Ordering Guide](#ordering-guide)

---

## How to Use This Catalog

This catalog defines all build services offered by Vantus Systems. Each service includes:

- **Service Name and Description** — What the service delivers
- **What's Included** — Detailed breakdown of deliverables
- **What's NOT Included** — Clear scope boundaries
- **Typical Timeline** — Estimated duration from kickoff to handoff
- **Starting Price and Range** — Pricing anchors from our public pricing (final quotes confirmed after discovery)
- **Complexity Drivers** — Factors that influence final pricing
- **Prerequisites** — What we need from you to begin
- **Deliverables** — What you'll receive
- **Success Criteria** — How we measure completion

### Pricing Notes

All prices are in USD. Starting prices represent the minimum investment for a standard project scope. Typical ranges account for complexity factors including:

- Number of unique pages or features
- Integration requirements with existing systems
- Content volume and migration complexity
- Custom design vs. template adaptation
- Accessibility remediation needs
- Security and compliance requirements

Final quotes are confirmed after our Discovery + Solution Blueprint engagement, which ensures accurate scoping.

---

## Core Build Packages

### Package 1: Website Rebuild (Modern + Complete)

**Starting Price:** $15,000  
**Typical Range:** $15,000 – $55,000  
**Recommended For:** Organizations seeking a complete website refresh with modern design, responsive implementation, and solid technical foundation.

#### What's Included

| Category              | Details                                                                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Design**            | Custom or curated template implementation, responsive design across all breakpoints, up to 15 unique page templates                      |
| **Content**           | Content population support for up to 50 pages, basic SEO content structure, meta tags and Open Graph configuration                       |
| **Technical**         | Modern front-end stack (Next.js), performance optimization, technical SEO baseline (sitemap, robots.txt, structured data)                |
| **Quality Assurance** | Cross-browser testing (Chrome, Firefox, Safari, Edge), accessibility baseline audit and remediation (WCAG 2.1 AA), mobile device testing |
| **Security**          | HTTPS enforcement, security headers configuration, form spam protection, input validation                                                |
| **Analytics**         | Google Analytics 4 or equivalent instrumentation, event tracking for key interactions, conversion goal setup                             |
| **Deployment**        | Production deployment to cloud hosting, staging environment, launch checklist execution                                                  |
| **Handoff**           | Source code delivery, admin access credentials, basic runbook, 30-day post-launch support window                                         |

#### What's NOT Included

- Content Management System (CMS) — see Package 2
- User authentication or member areas
- E-commerce functionality
- Custom application development
- Ongoing content updates after handoff
- Domain registration or renewal
- Third-party service subscriptions (analytics, forms, etc.)

#### Typical Timeline

| Phase                   | Duration       |
| ----------------------- | -------------- |
| Discovery & Design      | 2–3 weeks      |
| Development             | 4–8 weeks      |
| QA & Testing            | 1–2 weeks      |
| Staging & Client Review | 1 week         |
| Launch                  | 1 week         |
| **Total**               | **9–15 weeks** |

#### Complexity Drivers

- Number of unique page templates (>15)
- Custom design requirements vs. template adaptation
- Animation and interactive elements
- Accessibility remediation scope
- Integration with marketing automation tools
- Multilingual content requirements

#### Prerequisites

- Content inventory and copy ready (or scope for content services)
- Brand guidelines or approved visual direction
- Access to domain registrar
- Stakeholder availability for reviews

#### Deliverables

- Production-ready website deployed to hosting
- Staging environment for ongoing development
- Source code repository (Git)
- Admin dashboard access
- Launch runbook and documentation
- Basic SEO and analytics configuration

#### Success Criteria

- Lighthouse performance score ≥ 80 on mobile and desktop
- WCAG 2.1 AA compliance verified
- All core pages load without errors
- Forms functional with spam protection active
- Analytics tracking key conversion events
- Client sign-off on acceptance criteria

---

### Package 2: Website + CMS (Recommended)

**Starting Price:** $32,000  
**Typical Range:** $32,000 – $125,000  
**Recommended For:** Organizations needing ongoing content management, editorial workflows, and the ability to update website content without developer involvement.

#### What's Included

| Category                    | Details                                                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Everything in Package 1** | All features from Website Rebuild                                                                                                    |
| **CMS Implementation**      | Headless or embedded CMS deployment, content model schema design (pages, blog, case studies, team members), media library management |
| **Editorial Workflows**     | Role-based permissions (author, editor, admin), content review and approval workflows, draft/publish scheduling, version history     |
| **Authoring Experience**    | Rich text editor with formatting controls, drag-and-drop media upload, content preview across breakpoints, inline commenting         |
| **Governance**              | Rollback capability, content change audit log, emergency unpublish protocol, editorial guidelines documentation                      |
| **Scalability**             | Content API for future integrations, structured content for SEO, reusable components and snippets                                    |

#### What's NOT Included

- User-facing authentication or member portals
- Custom application workflows beyond content management
- E-commerce functionality
- Third-party integrations (CRM, marketing automation) — see Add-On Modules
- Ongoing content creation or copywriting
- CMS training beyond basic handoff (extended training available)

#### Typical Timeline

| Phase                        | Duration        |
| ---------------------------- | --------------- |
| Discovery & Content Modeling | 2–3 weeks       |
| Design                       | 3–4 weeks       |
| CMS Development              | 4–6 weeks       |
| Frontend Development         | 3–5 weeks       |
| QA & Testing                 | 2 weeks         |
| Client Training              | 1 week          |
| Staging & Launch             | 1 week          |
| **Total**                    | **16–24 weeks** |

#### Complexity Drivers

- Number of content types (blogs, events, careers, case studies, etc.)
- Custom editorial workflows and approval chains
- Integration with existing DAM or marketing tools
- Content migration volume
- Multi-language or regional content requirements
- Advanced search and filtering needs

#### Prerequisites

- Complete content inventory
- Content migration source files (if applicable)
- Editorial workflow requirements documented
- Stakeholder roles defined (authors, editors, approvers)
- Brand guidelines and approved imagery

#### Deliverables

- Fully functional CMS with configured content types
- Production website with CMS integration
- Role-based user accounts
- Editorial workflow documentation
- Admin training session (2–4 hours)
- Media library with migrated assets
- Backup and restore procedures

#### Success Criteria

- All content types functional with proper validation
- Editorial workflow operates as specified
- Authors can create, edit, and publish without developer assistance
- Media uploads and management functional
- Rollback and restore procedures tested
- Client acceptance of editorial training completion

---

### Package 3: Website + Business Portal

**Starting Price:** $90,000  
**Typical Range:** $90,000 – $400,000  
**Recommended For:** Organizations requiring authenticated user experiences, customer portals, partner dashboards, or internal business applications alongside their web presence.

#### What's Included

| Category                    | Details                                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Everything in Package 2** | All features from Website + CMS                                                                          |
| **Authentication**          | User registration and login, password management, email verification, session management                 |
| **User Portals**            | Customer self-service portal, account management, document downloads, order tracking, profile management |
| **RBAC Implementation**     | Role-based access control (viewer, user, manager, admin), permission matrix, sensitive action controls   |
| **Audit Trail**             | User action logging, login history, content change tracking, compliance-ready audit logs                 |
| **Business Workflows**      | Form-based request workflows, approval chains, notification systems, task dashboards                     |
| **Integration Foundation**  | API architecture for external systems, webhook infrastructure, data sync pipelines                       |

#### What's NOT Included

- Custom enterprise application development (beyond defined workflows)
- Legacy system integration without assessment — see Add-On Modules
- Ongoing user support or helpdesk functionality
- Payment processing (gateway integration available as add-on)
- Mobile app development
- Third-party SLA management

#### Typical Timeline

| Phase                    | Duration        |
| ------------------------ | --------------- |
| Discovery & Requirements | 3–4 weeks       |
| UX/UI Design             | 4–6 weeks       |
| CMS + Portal Development | 8–12 weeks      |
| Authentication & RBAC    | 3–4 weeks       |
| Workflow Implementation  | 4–8 weeks       |
| QA & Security Testing    | 2–4 weeks       |
| UAT & Training           | 2 weeks         |
| Staging & Launch         | 2 weeks         |
| **Total**                | **28–44 weeks** |

#### Complexity Drivers

- Number of distinct user roles (>5)
- Complexity of permission hierarchies
- Number of business workflows (>10)
- Integration requirements with CRM, ERP, or other systems
- Custom dashboard and reporting needs
- Compliance requirements (SOC 2, HIPAA, etc.)
- Data migration from legacy systems

#### Prerequisites

- Detailed user role and permission matrix
- Business workflow documentation
- Integration requirements for connected systems
- Compliance requirements (if applicable)
- Access to authentication providers (or scope for SSO)
- Stakeholder availability for UAT

#### Deliverables

- Production website with integrated portal
- User management dashboard for administrators
- Role-based access control system
- Configurable workflow engine
- Audit log dashboard
- API documentation
- Security testing report
- Admin and end-user training

#### Success Criteria

- All user roles authenticate and access appropriate content
- RBAC enforced at application and API levels
- Business workflows execute as specified
- Audit trail captures all sensitive actions
- Integration APIs functional and documented
- Security assessment passed
- Client acceptance of all defined workflows

---

### Package 4: Enterprise Systems Program

**Starting Price:** $250,000  
**Typical Range:** $250,000 – $1,200,000  
**Recommended For:** Large SMBs and enterprises requiring comprehensive digital transformation, multiple connected systems, custom application development, and long-term platform strategies.

#### What's Included

| Category                           | Details                                                                                                                       |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Everything in Package 3**        | All features from Website + Business Portal                                                                                   |
| **Platform Strategy**              | Multi-year technology roadmap, architecture governance, vendor evaluation support                                             |
| **Custom Application Development** | Bespoke web applications, internal tools, customer-facing features beyond standard packages                                   |
| **Enterprise Integration**         | Complex system integration (CRM, ERP, accounting, legacy systems), real-time data synchronization, event-driven architectures |
| **Advanced Security**              | Enterprise SSO (SAML, OIDC), directory integration, compliance frameworks, penetration testing                                |
| **Performance Engineering**        | High-volume optimization, CDN architecture, global deployment, load testing                                                   |
| **Governance & Documentation**     | Comprehensive technical documentation, API governance, change management processes                                            |

#### What's NOT Included

- Ongoing Vantus Care (managed services) — quoted separately
- Hardware or infrastructure procurement
- Third-party software licenses
- Legal or compliance certification (we support, not certify)
- User training at scale (available as separate engagement)

#### Typical Timeline

| Phase                  | Duration        |
| ---------------------- | --------------- |
| Strategic Discovery    | 4–6 weeks       |
| Architecture Design    | 4–8 weeks       |
| Phase 1: Foundation    | 12–16 weeks     |
| Phase 2: Core Features | 16–24 weeks     |
| Phase 3: Integration   | 12–20 weeks     |
| Phase 4: Optimization  | 8–12 weeks      |
| **Total**              | **56–86 weeks** |

#### Complexity Drivers

- Number of integrated systems (>5)
- Custom application complexity
- Data volume and synchronization requirements
- Compliance framework scope
- Geographic distribution of users
- Performance requirements (high availability, real-time)
- Legacy system constraints

#### Prerequisites

- Executive sponsorship and project governance
- Integration requirements documentation
- Enterprise security requirements
- Budget approval for multi-phase program
- Stakeholder alignment on priorities

#### Deliverables

- Complete enterprise platform
- Integration middleware and APIs
- Security architecture documentation
- Performance test results
- Compliance support documentation
- Comprehensive runbooks and documentation
- Knowledge transfer sessions

#### Success Criteria

- All systems integrated and operational
- Performance meets defined SLAs
- Security assessment passed
- Compliance evidence gathered
- Knowledge transfer completed
- Program goals achieved per charter

---

## Infrastructure Services

### Service 1: Cloud Deployment Baseline

**Starting Price:** $7,000  
**Typical Range:** $7,000 – $30,000  
**Purpose:** Establish production-ready cloud infrastructure for web applications.

#### What's Included

| Category           | Details                                                                        |
| ------------------ | ------------------------------------------------------------------------------ |
| **Compute**        | VPS or container platform provisioning, server configuration                   |
| **Web Server**     | NGINX installation and configuration, reverse proxy setup                      |
| **Container**      | Docker containerization of application, docker-compose or Kubernetes manifests |
| **SSL/TLS**        | HTTPS certificate installation and renewal automation                          |
| **Basic Security** | Firewall configuration, SSH hardening, fail2ban setup                          |
| **Backup**         | Automated backup configuration (daily/weekly)                                  |
| **Monitoring**     | Basic uptime monitoring, error logging                                         |
| **Documentation**  | Infrastructure documentation, deployment runbook                               |

#### What's NOT Included

- Managed services or ongoing maintenance
- Load balancer configuration (available as upgrade)
- Database management (see separate services)
- Content delivery network setup
- Advanced security hardening (see On-Premise Installation)
- Domain management

#### Typical Timeline

| Phase                   | Duration      |
| ----------------------- | ------------- |
| Requirements & Design   | 1 week        |
| Provisioning            | 1–2 weeks     |
| Configuration           | 1–2 weeks     |
| Testing & Documentation | 1 week        |
| **Total**               | **4–6 weeks** |

#### Complexity Drivers

- Number of environments (dev, staging, production)
- High availability requirements
- Custom domain configuration
- Integration with existing infrastructure
- Compliance requirements

#### Prerequisites

- Cloud provider account or hosting preferences
- Domain access
- Application source code
- Any specific compliance requirements

#### Deliverables

- Configured cloud infrastructure
- Deployment automation scripts
- Backup configuration
- Monitoring setup
- Documentation

#### Success Criteria

- Application deployed and accessible via HTTPS
- Automated deployment functional
- Backups executing as scheduled
- Monitoring alerts configured

---

### Service 2: On-Premise Installation + Hardening

**Starting Price:** $15,000  
**Typical Range:** $15,000 – $70,000  
**Purpose:** Deploy applications to client-owned infrastructure with security hardening.

#### What's Included

| Category               | Details                                                             |
| ---------------------- | ------------------------------------------------------------------- |
| **Installation**       | Application deployment to client hardware, dependency installation  |
| **Security Hardening** | OS hardening, security patch management, intrusion detection        |
| **Network Security**   | Firewall configuration, VPN setup if required, network segmentation |
| **Access Control**     | SSH key authentication, sudo access controls, audit logging         |
| **Compliance Support** | Documentation for compliance audits, security configuration reports |
| **Performance**        | Server optimization, caching configuration                          |

#### What's NOT Included

- Hardware procurement
- Ongoing security monitoring (see Vantus Care)
- Network architecture redesign
- Physical security

#### Typical Timeline

| Phase                    | Duration      |
| ------------------------ | ------------- |
| Assessment               | 1 week        |
| Hardening Implementation | 2–3 weeks     |
| Deployment               | 1–2 weeks     |
| Testing & Documentation  | 1 week        |
| **Total**                | **5–8 weeks** |

#### Complexity Drivers

- Number of servers
- Network complexity
- Compliance framework (HIPAA, SOC 2, PCI)
- Legacy system integration

#### Prerequisites

- Client-owned infrastructure meeting minimum requirements
- Network access and credentials
- Security policy documentation

#### Deliverables

- Hardened application deployment
- Security configuration report
- Access documentation
- Compliance support documents

#### Success Criteria

- Application operational
- Security hardening verified
- Access controls functional

---

### Service 3: Environment Strategy (Staging/Production)

**Starting Price:** Included in deployment services  
**Typical Range:** $3,000 – $15,000 (if standalone)  
**Purpose:** Define and implement proper development, staging, and production environments.

#### What's Included

| Category                     | Details                                  |
| ---------------------------- | ---------------------------------------- |
| **Environment Design**       | Dev/staging/production architecture      |
| **Data Isolation**           | Database separation strategies           |
| **Deployment Pipeline**      | CI/CD configuration for each environment |
| **Configuration Management** | Environment-specific config handling     |
| **Rollback Procedures**      | Quick recovery procedures                |

#### What's NOT Included

- Base infrastructure setup (see Cloud Deployment)
- Ongoing pipeline maintenance

#### Typical Timeline

| Phase          | Duration      |
| -------------- | ------------- |
| Design         | 1 week        |
| Implementation | 1–2 weeks     |
| **Total**      | **2–3 weeks** |

#### Prerequisites

- Multiple environments available
- CI/CD platform access

---

### Service 4: Backup and Restore Runbook Implementation

**Starting Price:** Included in deployment services  
**Typical Range:** $2,000 – $10,000 (if standalone)  
**Purpose:** Documented backup procedures with tested restore processes.

#### What's Included

| Category            | Details                                                |
| ------------------- | ------------------------------------------------------ |
| **Backup Strategy** | Defined backup types (full, incremental, differential) |
| **Automation**      | Scheduled backup scripts                               |
| **Storage**         | Backup storage configuration (local and/or cloud)      |
| **Testing**         | Quarterly restore testing                              |
| **Documentation**   | Complete runbook with step-by-step procedures          |

#### What's NOT Included

- Backup storage costs
- Ongoing monitoring (see Vantus Care)

#### Typical Timeline

| Phase                   | Duration      |
| ----------------------- | ------------- |
| Strategy Design         | 1 week        |
| Implementation          | 1–2 weeks     |
| Testing & Documentation | 1 week        |
| **Total**               | **3–4 weeks** |

---

## Enterprise Add-On Modules

### Module 1: Discovery + Solution Blueprint

**Starting Price:** $5,000  
**Typical Range:** $5,000 – $20,000  
**Purpose:** Comprehensive requirements gathering and technical architecture before build commitment.

#### What's Included

| Category                   | Details                                                  |
| -------------------------- | -------------------------------------------------------- |
| **Stakeholder Interviews** | Key stakeholder discovery sessions                       |
| **Requirements Analysis**  | Functional and non-functional requirements documentation |
| **Technical Assessment**   | Current state analysis and gap identification            |
| **Solution Architecture**  | Proposed solution design with options                    |
| **Roadmap**                | Phased implementation plan with priorities               |
| **Estimates**              | Budget and timeline ranges with confidence levels        |

#### What's NOT Included

- Implementation — this is a planning service
- Ongoing project management

#### Typical Timeline

| Phase              | Duration      |
| ------------------ | ------------- |
| Discovery          | 1–2 weeks     |
| Analysis           | 1–2 weeks     |
| Blueprint Delivery | 1 week        |
| **Total**          | **3–5 weeks** |

#### Prerequisites

- Stakeholder availability
- Access to existing systems documentation

#### Deliverables

- Discovery report
- Requirements document
- Solution architecture blueprints
- Implementation roadmap
- Budget and timeline estimates

#### Success Criteria

- All stakeholders interviewed
- Requirements documented and approved
- Solution blueprint accepted

---

### Module 2: Data and Content Migration

**Starting Price:** $4,000  
**Typical Range:** $4,000 – $30,000  
**Purpose:** Migrate existing content and data from legacy systems to new platform.

#### What's Included

| Category              | Details                              |
| --------------------- | ------------------------------------ |
| **Source Assessment** | Inventory of source content and data |
| **Mapping**           | Content type and field mapping       |
| **Transformation**    | Data cleaning and transformation     |
| **Migration Scripts** | Custom migration tooling             |
| **Validation**        | Post-migration verification          |
| **Error Reporting**   | Migration error log and resolution   |

#### What's NOT Included

- Source system access (we'll specify requirements)
- Content creation or writing
- Ongoing data hygiene

#### Typical Timeline

| Phase               | Duration      |
| ------------------- | ------------- |
| Assessment          | 1 week        |
| Mapping & Scripting | 2–4 weeks     |
| Execution           | 1–2 weeks     |
| Validation          | 1 week        |
| **Total**           | **5–9 weeks** |

#### Complexity Drivers

- Volume of content (pages, records)
- Number of source systems
- Data quality and cleanliness
- Transformation complexity

#### Prerequisites

- Access to source systems
- Content inventory
- Data export files (if applicable)

#### Deliverables

- Migration mapping document
- Transformed content in new system
- Validation report
- Error log and resolution notes

#### Success Criteria

- All content migrated
- Validation checks passed
- Client acceptance of migrated content

---

### Module 3: Integration (per system)

**Starting Price:** $8,000  
**Typical Range:** $8,000 – $35,000  
**Purpose:** Connect your website/portal to external business systems.

#### What's Included

| Category                   | Details                                       |
| -------------------------- | --------------------------------------------- |
| **Integration Assessment** | Technical requirements and feasibility        |
| **API Development**        | Custom API endpoints or integrations          |
| **Authentication**         | OAuth, API key, or credential configuration   |
| **Data Sync**              | One-way or bidirectional data synchronization |
| **Error Handling**         | Retry logic, logging, alerting                |
| **Documentation**          | API documentation and integration runbook     |

#### What's NOT Included

- Modifications to external systems
- Ongoing integration monitoring
- Third-party API costs

#### Typical Timeline

| Phase       | Duration      |
| ----------- | ------------- |
| Assessment  | 1 week        |
| Development | 2–4 weeks     |
| Testing     | 1–2 weeks     |
| **Total**   | **4–8 weeks** |

#### Complexity Drivers

- Integration complexity (real-time vs. batch)
- Number of endpoints
- Authentication complexity
- Data transformation requirements

#### Prerequisites

- API documentation from external system
- Access to external system for testing
- Data mapping requirements

#### Deliverables

- Working integration
- API documentation
- Test results
- Runbook

#### Success Criteria

- Integration functional per specification
- Data sync verified
- Error handling operational

---

### Module 4: SSO + RBAC Hardening

**Starting Price:** $12,000  
**Typical Range:** $12,000 – $50,000  
**Purpose:** Implement enterprise-grade authentication and authorization.

#### What's Included

| Category               | Details                                            |
| ---------------------- | -------------------------------------------------- |
| **SSO Implementation** | SAML 2.0, OAuth 2.0, or OIDC integration           |
| **Identity Provider**  | Connection to Azure AD, Okta, Auth0, or custom IdP |
| **Role Definition**    | Comprehensive role modeling                        |
| **Permission Matrix**  | Detailed permission configuration                  |
| **Audit Trail**        | Enhanced logging for compliance                    |
| **MFA**                | Multi-factor authentication setup                  |

#### What's NOT Included

- Identity provider licensing
- Ongoing identity management
- User provisioning (we configure, you manage)

#### Typical Timeline

| Phase         | Duration      |
| ------------- | ------------- |
| Assessment    | 1 week        |
| Configuration | 2–3 weeks     |
| Testing       | 1–2 weeks     |
| **Total**     | **4–7 weeks** |

#### Complexity Drivers

- Number of applications
- Identity provider complexity
- Compliance requirements

#### Prerequisites

- Identity provider access
- Security requirements documentation

#### Deliverables

- SSO integration
- RBAC configuration
- Security testing report
- Documentation

#### Success Criteria

- SSO functional for all users
- RBAC enforced correctly
- Audit trail capturing required events

---

### Module 5: Analytics and Dashboarding

**Starting Price:** $7,000  
**Typical Range:** $7,000 – $30,000  
**Purpose:** Implement comprehensive analytics and business intelligence dashboards.

#### What's Included

| Category                  | Details                                            |
| ------------------------- | -------------------------------------------------- |
| **Analytics Setup**       | Google Analytics 4, Plausible, or custom analytics |
| **Event Tracking**        | Custom event implementation                        |
| **Conversion Tracking**   | Goal and funnel configuration                      |
| **Dashboard Development** | Custom dashboards for stakeholders                 |
| **Reporting**             | Automated reporting setup                          |
| **Insights**              | KPI definition and baseline                        |

#### What's NOT Included

- Analytics platform subscriptions
- Ongoing analysis (available as service)

#### Typical Timeline

| Phase                 | Duration      |
| --------------------- | ------------- |
| Setup                 | 1 week        |
| Configuration         | 1–2 weeks     |
| Dashboard Development | 2–3 weeks     |
| **Total**             | **4–7 weeks** |

#### Complexity Drivers

- Number of dashboards
- Data source complexity
- Custom visualization requirements

#### Prerequisites

- Analytics platform access
- KPI definition

#### Deliverables

- Analytics configuration
- Custom dashboards
- Documentation
- Training

#### Success Criteria

- All tracking functional
- Dashboards operational
- Client can access reports

---

### Module 6: Localization Framework

**Starting Price:** $8,000  
**Typical Range:** $8,000 – $40,000  
**Purpose:** Enable multi-language and multi-regional web experiences.

#### What's Included

| Category                    | Details                        |
| --------------------------- | ------------------------------ |
| **Framework Setup**         | i18n infrastructure            |
| **Language Support**        | Language switcher, URL routing |
| **Content Architecture**    | Multi-language content model   |
| **Translation Integration** | CMS translation workflow       |
| **RTL Support**             | Right-to-left language support |
| **SEO Localization**        | Hreflang, localized metadata   |

#### What's NOT Included

- Translation services (we set up the workflow)
- Content creation in other languages

#### Typical Timeline

| Phase         | Duration      |
| ------------- | ------------- |
| Setup         | 1–2 weeks     |
| Configuration | 2–3 weeks     |
| Testing       | 1 week        |
| **Total**     | **4–6 weeks** |

#### Complexity Drivers

- Number of languages
- Content volume per language
- RTL requirements

#### Prerequisites

- List of target languages
- Translation resources or workflow

#### Deliverables

- Localization framework
- Language switcher
- SEO configuration
- Documentation

#### Success Criteria

- All languages accessible
- SEO tags correct
- Content workflow functional

---

## Delivery Governance Services

These services ensure successful project delivery and client satisfaction.

### Service 1: Scope and Acceptance Criteria Definition

**Purpose:** Establish clear project boundaries and success metrics before work begins.

#### What's Included

| Category                | Details                                  |
| ----------------------- | ---------------------------------------- |
| **Scope Documentation** | Detailed feature and deliverable list    |
| **Acceptance Criteria** | Testable conditions for each deliverable |
| **Out of Scope**        | Explicit exclusions                      |
| **Assumptions**         | Documented project assumptions           |
| **Dependencies**        | External dependencies and owners         |

#### Deliverables

- Project scope document
- Acceptance criteria matrix
- Out-of-scope document
- Assumption log

#### Success Criteria

- All stakeholders approve scope
- Acceptance criteria are testable
- Scope signed off before build

---

### Service 2: Change Request Packaging and Impact Assessment

**Purpose:** Formal process for managing scope changes during delivery.

#### What's Included

| Category                | Details                            |
| ----------------------- | ---------------------------------- |
| **Change Request Form** | Structured request template        |
| **Impact Analysis**     | Timeline, budget, and scope impact |
| **Risk Assessment**     | Project risk implications          |
| **Recommendation**      | Go/no-go recommendation            |
| **Approval Workflow**   | Stakeholder approval process       |

#### Deliverables

- Change request document
- Impact assessment report
- Approval documentation

---

### Service 3: Proof Artifact Production

**Purpose:** Provide evidence of performance, accessibility, and security achievements.

#### What's Included

| Category                | Details                                 |
| ----------------------- | --------------------------------------- |
| **Performance Tests**   | Lighthouse scores, load testing results |
| **Accessibility Audit** | WCAG compliance report                  |
| **Security Scan**       | Vulnerability assessment results        |
| **SEO Audit**           | Technical SEO verification              |
| **Documentation**       | All test results in presentation format |

#### Deliverables

- Performance report
- Accessibility compliance certificate
- Security assessment
- Executive summary

#### Success Criteria

- All tests passed
- Evidence documented
- Client acceptance

---

### Service 4: Executive Handoff and Transition Documentation

**Purpose:** Ensure smooth knowledge transfer and client independence.

#### What's Included

| Category                    | Details                            |
| --------------------------- | ---------------------------------- |
| **Technical Documentation** | Architecture, deployment, runbooks |
| **Admin Guides**            | CMS admin, user management         |
| **Training Sessions**       | Admin and content editor training  |
| **Support Contacts**        | Escalation path and contacts       |
| **Transition Checklist**    | Complete handoff checklist         |

#### Deliverables

- Technical documentation package
- Admin guides
- Training session recordings
- Handoff checklist
- 30-day support window

#### Success Criteria

- All documentation delivered
- Training completed
- Client sign-off

---

## Ordering Guide

### How to Select Services

1. **Start with a Core Package** that matches your primary need
2. **Add Infrastructure Services** if you need deployment support
3. **Select Add-On Modules** for specific requirements
4. **Include Governance Services** for complex projects or enterprise engagements

### Common Package Combinations

| Need                    | Recommended Package       | Common Add-Ons                     |
| ----------------------- | ------------------------- | ---------------------------------- |
| Modern website refresh  | Website Rebuild           | Cloud Deployment, Analytics        |
| Content-managed website | Website + CMS             | Migration, Analytics, Localization |
| Customer portal         | Website + Business Portal | SSO/RBAC, Integrations             |
| Digital transformation  | Enterprise Program        | All add-ons as needed              |

### Getting Started

1. **Discovery Workshop** — Begin with Discovery + Solution Blueprint for complex projects
2. **Scoping Call** — Free consultation to understand your needs
3. **Proposal** — Detailed proposal with fixed pricing based on scope
4. **Kickoff** — Project begins with defined acceptance criteria

---

## Contact

For questions about this service catalog or to request a custom quote:

- **Website:** vantus.systems
- **Email:** info@vantus.systems
- **Phone:** (Gulf Coast region)

---

_This service catalog is for BUILD services only. Vantus Care managed services are documented separately. All pricing is subject to scope verification during discovery. Final quotes confirmed after Discovery + Solution Blueprint engagement._
