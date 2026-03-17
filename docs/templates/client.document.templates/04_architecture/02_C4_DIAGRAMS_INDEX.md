---
Document: C4_DIAGRAMS_INDEX
Doc ID: VS-TEMPLATE-ARCH-002
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Solutions Architect / Technical Lead
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Internal / Client
Source of Truth: [docs/04_architecture/02_C4_DIAGRAMS_INDEX.md](docs/04_architecture/02_C4_DIAGRAMS_INDEX.md)
Review Cycle: Per-sprint
Next Review: [2026-02-25]
---

# C4 Model Diagrams Index

## Document Control

| Attribute | Value |
| :--- | :--- |
| **Document ID** | VS-TEMPLATE-ARCH-002 |
| **Version** | 1.0.0 |
| **Status** | [DRAFT / REVIEW / APPROVED / ARCHIVED] |
| **Classification** | Internal / Client Confidential |
| **Author** | [SOLUTIONS ARCHITECT NAME] |
| **Reviewers** | [TECH LEAD], [SENIOR DEVELOPER] |
| **Approver** | [PRINCIPAL ARCHITECT] |
| **Approval Date** | [2026-02-25] |
| **Next Review** | [2026-02-25] |

### Architecture Review Board (ARB) Sign-off

| Role | Name | Signature | Date |
| :--- | :--- | :--- | :--- |
| **Principal Architect** | [NAME] | _________________ | [2026-02-25] |
| **Technical Lead** | [NAME] | _________________ | [2026-02-25] |

---

## Table of Contents

1. [Overview](#1-overview)
2. [C4 Model Methodology](#2-c4-model-methodology)
3. [Level 1: System Context Diagrams](#3-level-1-system-context-diagrams)
4. [Level 2: Container Diagrams](#4-level-2-container-diagrams)
5. [Level 3: Component Diagrams](#5-level-3-component-diagrams)
6. [Level 4: Code Diagrams](#6-level-4-code-diagrams)
7. [Dynamic Diagrams](#7-dynamic-diagrams)
8. [Deployment Diagrams](#8-deployment-diagrams)
9. [Diagram Standards](#9-diagram-standards)
10. [Decision Records](#10-decision-records)
11. [Appendix A: Change History](#appendix-a-change-history)

---

## 1. Overview

### 1.1 Purpose
This document serves as the master index for all C4 Model diagrams within the [[PROJECT_NAME]] architecture. It provides:
- A centralized registry of all architectural visualizations
- Navigation between abstraction levels
- Diagram metadata and maintenance information
- Standards for diagram creation and updates

### 1.2 Scope
- All C4 Level 1-4 diagrams
- Dynamic sequence diagrams
- Deployment architecture diagrams
- Supporting documentation and legends

### 1.3 Target Audience
- Solutions Architects
- Software Engineers
- DevOps Engineers
- Technical Writers
- New Team Members (onboarding)

---

## 2. C4 Model Methodology

### 2.1 C4 Model Overview

The C4 Model (Context, Containers, Components, Code) provides a structured approach to visualizing software architecture at different levels of abstraction:

| Level | Abstraction | Audience | Scope | Detail |
| :--- | :--- | :--- | :--- | :--- |
| **Level 1** | System Context | Technical & Non-technical | System + External actors | High-level relationships |
| **Level 2** | Containers | Technical | System internals + Containers | Runtime boundaries |
| **Level 3** | Components | Developers | Container internals + Components | Code organization |
| **Level 4** | Code | Developers | Component internals + Classes | Implementation detail |

### 2.2 C4 Model Notation

#### Core Elements

| Element | Description | Notation | Example |
| :--- | :--- | :--- | :--- |
| **Person** | User or role | Stick figure | 👤 End User |
| **Software System** | High-level system | Box with border | [[PROJECT_NAME]] System |
| **Container** | Runtime environment | Box with rounded corners | Web Application |
| **Component** | Code module | Box | Authentication Controller |

#### Relationships

| Relationship | Description | Notation |
| :--- | :--- | :--- |
| **Synchronous** | Request/response | Solid line with arrow |
| **Asynchronous** | Message/event | Dashed line with arrow |
| **Data Flow** | Data movement | Line with open arrow |
| **Dependency** | Uses/depends on | Dashed line with arrow |

### 2.3 C4 Model Principles

1. **Abstraction over Detail:** Each level shows just enough detail for its audience
2. **Consistency:** Use the same notation across all diagrams
3. **Traceability:** Elements in higher-level diagrams map to lower-level diagrams
4. **Tool Agnostic:** Can be created with any diagramming tool

---

## 3. Level 1: System Context Diagrams

### 3.1 Overview

System Context diagrams show the system as a box in the center, surrounded by its users and other systems it interacts with. This diagram focuses on people and software systems, not technologies or protocols.

### 3.2 System Context Diagram Registry

| Diagram ID | Title | Description | File Path | Status | Last Updated |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **C4-L1-001** | Overall System Context | High-level view of [[PROJECT_NAME]] and external actors | `diagrams/c4/01-context-overall.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **C4-L1-002** | User Interaction Context | Focus on user-facing interactions | `diagrams/c4/01-context-users.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **C4-L1-003** | External Integration Context | Third-party system relationships | `diagrams/c4/01-context-integrations.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |

### 3.3 System Context Diagram Template

```plantuml
@startuml C4_Context_Diagram
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

LAYOUT_WITH_LEGEND()

title System Context Diagram - [[PROJECT_NAME]]

Person(user, "End User", "A user of the system")
Person(admin, "Administrator", "System administrator")

System(system, "[[PROJECT_NAME]]", "Description of the system")

System_Ext(idp, "Identity Provider", "OAuth 2.0 / OIDC provider")
System_Ext(payment, "Payment Gateway", "PCI-compliant payment processing")
System_Ext(email, "Email Service", "Transactional email delivery")

Rel(user, system, "Uses", "HTTPS")
Rel(admin, system, "Manages", "HTTPS")
Rel(system, idp, "Authenticates via", "OAuth 2.0")
Rel(system, payment, "Processes payments via", "HTTPS")
Rel(system, email, "Sends emails via", "HTTPS")

@enduml
```

### 3.4 System Context Elements

| Element Type | Name | Description | External? |
| :--- | :--- | :--- | :--- |
| **Person** | End User | Primary system user | No |
| **Person** | Administrator | System management user | No |
| **System** | [[PROJECT_NAME]] | Core application system | No |
| **System** | Identity Provider | External authentication service | Yes |
| **System** | Payment Gateway | External payment processor | Yes |
| **System** | Email Service | External email delivery | Yes |

---

## 4. Level 2: Container Diagrams

### 4.1 Overview

Container diagrams zoom into the system boundary from Level 1, showing the high-level technology choices and how responsibilities are distributed across them.

### 4.2 Container Diagram Registry

| Diagram ID | Title | Description | File Path | Status | Last Updated |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **C4-L2-001** | Application Containers | All application runtime containers | `diagrams/c4/02-containers-app.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **C4-L2-002** | Data Layer Containers | Database and storage containers | `diagrams/c4/02-containers-data.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **C4-L2-003** | Infrastructure Containers | Infrastructure and networking | `diagrams/c4/02-containers-infra.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |

### 4.3 Container Diagram Template

```plantuml
@startuml C4_Container_Diagram
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

LAYOUT_WITH_LEGEND()

title Container Diagram - [[PROJECT_NAME]]

Person(user, "End User", "System user")

System_Boundary(system, "[[PROJECT_NAME]] System") {
    Container(web_app, "Web Application", "Next.js / React", "User interface")
    Container(api_app, "API Application", "Next.js / Node.js", "Business logic and API")
    Container(worker, "Background Worker", "Node.js / BullMQ", "Async job processing")
    ContainerDb(database, "Database", "PostgreSQL", "Persistent data storage")
    ContainerDb(cache, "Cache", "Redis", "Session and cache storage")
    ContainerDb(storage, "Object Storage", "MinIO / S3", "File storage")
}

System_Ext(idp, "Identity Provider", "OAuth 2.0 provider")

Rel(user, web_app, "Uses", "HTTPS")
Rel(web_app, api_app, "Calls API", "HTTPS/JSON")
Rel(api_app, database, "Reads/Writes", "PostgreSQL")
Rel(api_app, cache, "Caches", "Redis")
Rel(api_app, worker, "Enqueues jobs", "Redis")
Rel(worker, database, "Processes", "PostgreSQL")
Rel(api_app, storage, "Stores files", "S3 API")
Rel(api_app, idp, "Authenticates", "OAuth 2.0")

@enduml
```

### 4.4 Container Inventory

| Container | Technology | Responsibility | Scaling |
| :--- | :--- | :--- | :--- |
| **Web Application** | Next.js / React | User interface | Horizontal |
| **API Application** | Next.js / Node.js | Business logic | Horizontal |
| **Background Worker** | Node.js / BullMQ | Async processing | Horizontal |
| **Database** | PostgreSQL | Data persistence | Vertical + Read replicas |
| **Cache** | Redis | Session/cache | Cluster |
| **Object Storage** | MinIO / S3 | File storage | Unlimited |

### 4.5 Container Communication Matrix

| Source | Destination | Protocol | Port | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| Web App | API App | HTTPS | 443 | API requests |
| API App | Database | PostgreSQL | 5432 | Data queries |
| API App | Cache | Redis | 6379 | Cache operations |
| API App | Worker | Redis | 6379 | Job queuing |
| Worker | Database | PostgreSQL | 5432 | Job data access |
| API App | Object Storage | S3 API | 443 | File operations |

---

## 5. Level 3: Component Diagrams

### 5.1 Overview

Component diagrams zoom into individual containers to show the components inside them, their responsibilities, and their interactions.

### 5.2 Component Diagram Registry

| Diagram ID | Title | Container | File Path | Status | Last Updated |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **C4-L3-001** | API Application Components | API Application | `diagrams/c4/03-components-api.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **C4-L3-002** | Web Application Components | Web Application | `diagrams/c4/03-components-web.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **C4-L3-003** | Worker Components | Background Worker | `diagrams/c4/03-components-worker.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **C4-L3-004** | Authentication Components | API Application | `diagrams/c4/03-components-auth.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |

### 5.3 Component Diagram Template (API Application)

```plantuml
@startuml C4_Component_Diagram_API
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

LAYOUT_WITH_LEGEND()

title Component Diagram - API Application

Container(web_app, "Web Application", "Next.js", "User interface")
ContainerDb(database, "Database", "PostgreSQL", "Data storage")
ContainerDb(cache, "Cache", "Redis", "Cache storage")

Container_Boundary(api_app, "API Application") {
    Component(auth_controller, "Auth Controller", "Next.js API Route", "Authentication endpoints")
    Component(user_controller, "User Controller", "Next.js API Route", "User management endpoints")
    Component(resource_controller, "Resource Controller", "Next.js API Route", "Resource endpoints")
    
    Component(auth_service, "Auth Service", "TypeScript", "Authentication logic")
    Component(user_service, "User Service", "TypeScript", "User business logic")
    Component(resource_service, "Resource Service", "TypeScript", "Resource business logic")
    Component(email_service, "Email Service", "TypeScript", "Email sending logic")
    
    Component(user_repo, "User Repository", "TypeScript", "User data access")
    Component(resource_repo, "Resource Repository", "TypeScript", "Resource data access")
}

Rel(web_app, auth_controller, "Uses", "HTTPS/JSON")
Rel(web_app, user_controller, "Uses", "HTTPS/JSON")
Rel(web_app, resource_controller, "Uses", "HTTPS/JSON")

Rel(auth_controller, auth_service, "Uses")
Rel(user_controller, user_service, "Uses")
Rel(resource_controller, resource_service, "Uses")

Rel(auth_service, user_repo, "Uses")
Rel(user_service, user_repo, "Uses")
Rel(resource_service, resource_repo, "Uses")
Rel(resource_service, email_service, "Uses")

Rel(user_repo, database, "Reads/Writes", "SQL")
Rel(resource_repo, database, "Reads/Writes", "SQL")
Rel(auth_service, cache, "Manages sessions", "Redis")

@enduml
```

### 5.4 Component Inventory (API Application)

| Component | Type | Responsibility | Dependencies |
| :--- | :--- | :--- | :--- |
| **Auth Controller** | Controller | Authentication endpoints | Auth Service |
| **User Controller** | Controller | User management endpoints | User Service |
| **Resource Controller** | Controller | Resource endpoints | Resource Service |
| **Auth Service** | Service | Authentication logic | User Repository, Cache |
| **User Service** | Service | User business logic | User Repository |
| **Resource Service** | Service | Resource business logic | Resource Repository, Email Service |
| **Email Service** | Service | Email sending logic | External Email Provider |
| **User Repository** | Repository | User data access | Database |
| **Resource Repository** | Repository | Resource data access | Database |

---

## 6. Level 4: Code Diagrams

### 6.1 Overview

Code diagrams (optional) provide a detailed view of the internal structure of components, typically using UML class diagrams or entity relationship diagrams.

### 6.2 Code Diagram Registry

| Diagram ID | Title | Component | File Path | Status | Last Updated |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **C4-L4-001** | User Domain Model | User Service | `diagrams/c4/04-code-user-domain.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **C4-L4-002** | Authentication Flow | Auth Service | `diagrams/c4/04-code-auth-flow.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **C4-L4-003** | Database Schema | All | `diagrams/c4/04-code-database.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |

### 6.3 Code Diagram Template (Class Diagram)

```plantuml
@startuml C4_Code_Class_Diagram
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Component.puml

title Class Diagram - User Domain Model

class User {
    +UUID id
    +String email
    +String passwordHash
    +UserRole role
    +DateTime createdAt
    +DateTime updatedAt
    +Boolean isActive
    --
    +validatePassword(password): Boolean
    +updateProfile(data): User
    +deactivate(): void
}

class UserRole {
    <<enumeration>>
    ADMIN
    CLIENT
    MEMBER
}

class UserRepository {
    +findById(id): User
    +findByEmail(email): User
    +create(userData): User
    +update(id, data): User
    +delete(id): void
}

class AuthService {
    -UserRepository userRepo
    -TokenService tokenService
    --
    +authenticate(email, password): AuthResult
    +refreshToken(token): AuthResult
    +logout(token): void
}

class TokenService {
    +generateToken(user): String
    +verifyToken(token): TokenPayload
    +revokeToken(token): void
}

User "1" -- "1" UserRole : has
UserRepository ..> User : manages
AuthService ..> UserRepository : uses
AuthService ..> TokenService : uses

@enduml
```

---

## 7. Dynamic Diagrams

### 7.1 Overview

Dynamic diagrams (sequence diagrams) show how elements collaborate at runtime to fulfill a use case or user story.

### 7.2 Dynamic Diagram Registry

| Diagram ID | Title | Scenario | File Path | Status | Last Updated |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **C4-DYN-001** | User Authentication Flow | Login process | `diagrams/c4/dynamic-auth-flow.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **C4-DYN-002** | Data Ingestion Flow | Import process | `diagrams/c4/dynamic-data-import.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **C4-DYN-003** | Payment Processing Flow | Checkout process | `diagrams/c4/dynamic-payment.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **C4-DYN-004** | Background Job Execution | Async processing | `diagrams/c4/dynamic-job-execution.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |

### 7.3 Dynamic Diagram Template (Authentication Flow)

```plantuml
@startuml C4_Dynamic_Diagram
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Dynamic.puml

title Dynamic Diagram - User Authentication Flow

Person(user, "End User")
Container(web_app, "Web Application", "Next.js")
Container(api_app, "API Application", "Next.js")
ContainerDb(cache, "Cache", "Redis")
System_Ext(idp, "Identity Provider")

Rel(user, web_app, "1. Enters credentials", "HTTPS")
Rel(web_app, api_app, "2. POST /api/auth/login", "HTTPS/JSON")
Rel(api_app, idp, "3. Validate credentials", "OAuth 2.0")
Rel(idp, api_app, "4. Return tokens", "JWT")
Rel(api_app, cache, "5. Store session", "Redis")
Rel(api_app, web_app, "6. Return auth token", "HTTPS/JSON")
Rel(web_app, user, "7. Redirect to dashboard", "HTTPS")

@enduml
```

### 7.4 Dynamic Scenarios

| Scenario ID | Name | Description | Critical Path |
| :--- | :--- | :--- | :--- |
| **SCN-001** | User Login | End-to-end authentication flow | Yes |
| **SCN-002** | Data Import | Bulk data ingestion process | Yes |
| **SCN-003** | Payment Processing | Checkout and payment flow | Yes |
| **SCN-004** | Report Generation | Async report creation | No |
| **SCN-005** | User Registration | New account creation | Yes |

---

## 8. Deployment Diagrams

### 8.1 Overview

Deployment diagrams show the mapping of containers to infrastructure, including the environment-specific deployment configurations.

### 8.2 Deployment Diagram Registry

| Diagram ID | Title | Environment | File Path | Status | Last Updated |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **C4-DEP-001** | Development Environment | Development | `diagrams/c4/deploy-development.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **C4-DEP-002** | Staging Environment | Staging | `diagrams/c4/deploy-staging.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **C4-DEP-003** | Production Environment | Production | `diagrams/c4/deploy-production.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |
| **C4-DEP-004** | Multi-Region Deployment | Production (DR) | `diagrams/c4/deploy-multi-region.puml` | [DRAFT/REVIEW/APPROVED] | [2026-02-25] |

### 8.3 Deployment Diagram Template (Production)

```plantuml
@startuml C4_Deployment_Diagram
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Deployment.puml

title Deployment Diagram - Production Environment

Deployment_Node(internet, "Internet", "Public Network") {
    Deployment_Node(cdn, "CDN", "CloudFlare") {
        Container(web_static, "Static Assets", "Cached content")
    }
}

Deployment_Node(vpc, "VPC", "AWS / GCP / Azure") {
    Deployment_Node(dmz, "DMZ Zone", "10.0.1.0/24") {
        Deployment_Node(lb, "Load Balancer", "NGINX / ALB") {
            Container(proxy, "Reverse Proxy", "NGINX")
        }
    }
    
    Deployment_Node(app_zone, "Application Zone", "10.0.2.0/24") {
        Deployment_Node(app_cluster, "Application Cluster", "Docker Swarm / K8s") {
            Container(app_1, "App Instance 1", "Docker")
            Container(app_2, "App Instance 2", "Docker")
            Container(app_3, "App Instance 3", "Docker")
        }
        
        Deployment_Node(worker_cluster, "Worker Cluster", "Docker Swarm / K8s") {
            Container(worker_1, "Worker Instance 1", "Docker")
            Container(worker_2, "Worker Instance 2", "Docker")
        }
    }
    
    Deployment_Node(data_zone, "Data Zone", "10.0.3.0/24") {
        Deployment_Node(db_cluster, "Database Cluster", "PostgreSQL") {
            ContainerDb(db_primary, "Primary DB", "PostgreSQL")
            ContainerDb(db_replica, "Read Replica", "PostgreSQL")
        }
        
        Deployment_Node(cache_cluster, "Cache Cluster", "Redis") {
            ContainerDb(cache_1, "Redis Node 1", "Redis")
            ContainerDb(cache_2, "Redis Node 2", "Redis")
            ContainerDb(cache_3, "Redis Node 3", "Redis")
        }
    }
}

Rel(internet, cdn, "HTTPS")
Rel(cdn, lb, "HTTPS")
Rel(lb, app_cluster, "HTTPS")
Rel(app_cluster, db_cluster, "PostgreSQL")
Rel(app_cluster, cache_cluster, "Redis")
Rel(worker_cluster, db_cluster, "PostgreSQL")
Rel(worker_cluster, cache_cluster, "Redis")

@enduml
```

### 8.4 Environment Specifications

| Environment | Nodes | Specs | High Availability |
| :--- | :--- | :--- | :--- |
| **Development** | 1 | 2 vCPU, 4GB RAM | No |
| **Staging** | 2 | 2 vCPU, 4GB RAM | Yes (manual) |
| **Production** | 6+ | 4 vCPU, 8GB RAM | Yes (auto-failover) |

---

## 9. Diagram Standards

### 9.1 Naming Conventions

| Element | Convention | Example |
| :--- | :--- | :--- |
| **Diagram ID** | C4-{L1-L4/DYN/DEP}-{###} | C4-L2-001 |
| **File Name** | {type}-{description}.puml | 02-containers-app.puml |
| **Diagram Title** | {Type} Diagram - {Description} | Container Diagram - Application |
| **Element Names** | Title Case | User Controller |

### 9.2 Diagram Metadata

Every diagram must include:

```plantuml
@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

' Metadata
title System Context Diagram - [[PROJECT_NAME]]
footer Version: 2.0.0 | Last Updated: 2026-02-09 | Owner: [NAME]

' Content here

@enduml
```

### 9.3 Version Control

| Action | Requirement |
| :--- | :--- |
| **New Diagram** | Create ADR if represents architectural decision |
| **Diagram Update** | Increment version, update footer, document in change log |
| **Diagram Removal** | Archive with reason, update all references |
| **Review** | Quarterly review cycle for all diagrams |

### 9.4 Tooling Standards

| Tool | Purpose | Recommended |
| :--- | :--- | :--- |
| **PlantUML** | Text-based diagrams | Yes |
| **Structurizr** | C4 model management | Yes |
| **draw.io** | Quick sketches | For drafts only |
| **Mermaid** | Markdown-embedded diagrams | Documentation only |

### 9.5 Color Coding

| Element Type | Color | Hex |
| :--- | :--- | :--- |
| **Internal System** | Blue | #438DD5 |
| **External System** | Gray | #999999 |
| **Database** | Blue | #438DD5 |
| **Person** | Blue | #438DD5 |
| **Container** | Blue | #438DD5 |

---

## 10. Decision Records

### 10.1 C4 Model ADRs

| ADR ID | Title | Status | Date |
| :--- | :--- | :--- | :--- |
| **ADR-C4-001** | C4 Model as Standard Notation | ACCEPTED | [2026-02-25] |
| **ADR-C4-002** | PlantUML for Diagram Generation | ACCEPTED | [2026-02-25] |
| **ADR-C4-003** | Quarterly Diagram Review Cycle | ACCEPTED | [2026-02-25] |

### 10.2 Diagram Tool Selection Rationale

**Decision:** Use PlantUML with C4-PlantUML extension

**Rationale:**
- Text-based: Version control friendly
- C4 native: Built-in C4 model support
- CI/CD integration: Can generate diagrams in pipelines
- Free and open source: No licensing costs

**Alternatives Considered:**
- Structurizr: Excellent but requires SaaS or self-hosted
- draw.io: Good for quick sketches, not version control friendly
- Visio: Proprietary, expensive, not CI/CD friendly

---

## 11. Appendix A: Change History

| Version | Date | Author | Changes | Approver |
| :--- | :--- | :--- | :--- | :--- |
| 1.0.0 | [2026-02-25] | [NAME] | Initial C4 diagrams index | [PRINCIPAL ARCHITECT] |
| 1.1.0 | [2026-02-25] | [NAME] | [Description of changes] | [PRINCIPAL ARCHITECT] |

---

## Document End

*This document is the property of [[CLIENT_NAME]] and Vantus Systems. Unauthorized distribution is prohibited.*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
