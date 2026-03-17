---
Document: ARCHITECTURE_OVERVIEW
Doc ID: VS-TEMPLATE-ARCH-001
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Solutions Architect / Lead Engineer
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Internal / Client
Source of Truth: [docs/04_architecture/01_ARCHITECTURE_OVERVIEW.md](docs/04_architecture/01_ARCHITECTURE_OVERVIEW.md)
Review Cycle: Quarterly
Next Review: [2026-02-25]
---

# Architecture & Infrastructure Blueprint

## Document Control

| Attribute          | Value                                                        |
| :----------------- | :----------------------------------------------------------- |
| **Document ID**    | VS-TEMPLATE-ARCH-001                                         |
| **Version**        | 1.0.0                                                        |
| **Status**         | [DRAFT / REVIEW / APPROVED / ARCHIVED]                       |
| **Classification** | Internal / Client Confidential                               |
| **Author**         | [SOLUTIONS ARCHITECT NAME]                                   |
| **Reviewers**      | [TECH LEAD], [SECURITY ENGINEER], [DEVOPS LEAD]              |
| **Approver**       | [CTO / ARCHITECTURE REVIEW BOARD]                            |
| **Approval Date**  | [2026-02-25]                                                 |
| **Next Review**    | [2026-02-25]                                                 |
| **Change Log**     | See [Appendix A: Change History](#appendix-a-change-history) |

### Architecture Review Board (ARB) Sign-off

| Role                         | Name   | Signature          | Date         |
| :--------------------------- | :----- | :----------------- | :----------- |
| **Chief Technology Officer** | [NAME] | ********\_******** | [2026-02-25] |
| **Principal Architect**      | [NAME] | ********\_******** | [2026-02-25] |
| **Security Architect**       | [NAME] | ********\_******** | [2026-02-25] |
| **Data Protection Officer**  | [NAME] | ********\_******** | [2026-02-25] |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture Principles](#2-architecture-principles)
3. [Technology Stack](#3-technology-stack)
4. [System Context (C4 Level 1)](#4-system-context-c4-level-1)
5. [Container Architecture (C4 Level 2)](#5-container-architecture-c4-level-2)
6. [Component Architecture (C4 Level 3)](#6-component-architecture-c4-level-3)
7. [Infrastructure Architecture](#7-infrastructure-architecture)
8. [Network Topology](#8-network-topology)
9. [Data Architecture](#9-data-architecture)
10. [Security Architecture](#10-security-architecture)
11. [Deployment & CI/CD](#11-deployment--cicd)
12. [Decision Records](#12-decision-records)
13. [Compliance Mapping](#13-compliance-mapping)
14. [Appendix A: Change History](#appendix-a-change-history)

---

## 1. Executive Summary

### 1.1 Purpose

This document provides the definitive technical blueprint for the [[PROJECT_NAME]] system. It serves as the single source of truth for architectural decisions, component relationships, and infrastructure configuration.

### 1.2 Scope

- **In Scope:** All system components, integrations, data flows, and infrastructure
- **Out of Scope:** [List exclusions, e.g., third-party SaaS internals]

### 1.3 Target Audience

- Solutions Architects
- Engineering Leads
- DevOps Engineers
- Security Engineers
- Compliance Officers

### 1.4 Architecture Standards

This document adheres to:

- **TOGAF 10** for enterprise architecture framework
- **C4 Model** for visualizing software architecture
- **ISO/IEC/IEEE 42010** for architecture description
- **NIST Cybersecurity Framework** for security controls

---

## 2. Architecture Principles

The following principles guide all architectural decisions for this system:

| ID        | Principle                    | Description                                                      | Rationale                                       |
| :-------- | :--------------------------- | :--------------------------------------------------------------- | :---------------------------------------------- |
| **AP-01** | **Security by Design**       | Security controls are integrated at every layer, not bolted on.  | Reduces attack surface and compliance risk.     |
| **AP-02** | **Defense in Depth**         | Multiple independent security controls protect critical assets.  | No single point of failure in security posture. |
| **AP-03** | **Least Privilege**          | Components and users have minimum necessary permissions.         | Limits blast radius of compromised credentials. |
| **AP-04** | **Fail Secure**              | System defaults to secure state on failure.                      | Prevents accidental exposure during outages.    |
| **AP-05** | **Observability First**      | All components emit structured logs, metrics, and traces.        | Enables rapid incident response and debugging.  |
| **AP-06** | **Infrastructure as Code**   | All infrastructure is defined, versioned, and deployed via code. | Ensures reproducibility and auditability.       |
| **AP-07** | **Immutable Infrastructure** | Servers are never modified after deployment; only replaced.      | Eliminates configuration drift.                 |
| **AP-08** | **API-First Design**         | All functionality is exposed via well-defined APIs.              | Enables integration and future extensibility.   |
| **AP-09** | **Data Full Ownership**      | Data residency requirements are enforced by architecture.        | Meets regulatory and contractual obligations.   |
| **AP-10** | **High Availability**        | No single point of failure; redundant components throughout.     | Meets 99.9%+ availability targets.              |

### 2.1 Principle Compliance Matrix

| Component       | AP-01 | AP-02 | AP-03 | AP-04 | AP-05 | AP-06 | AP-07 | AP-08 | AP-09 | AP-10 |
| :-------------- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Web Application |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |
| API Gateway     |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |
| Database Layer  |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |  N/A  |   ✓   |   ✓   |
| Message Queue   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |
| Object Storage  |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |   ✓   |  N/A  |   ✓   |   ✓   |

---

## 3. Technology Stack

### 3.1 Core Platform

| Layer          | Technology    | Version    | Purpose                         | Rationale                                                  |
| :------------- | :------------ | :--------- | :------------------------------ | :--------------------------------------------------------- |
| **Runtime**    | Node.js       | [20.x LTS] | JavaScript/TypeScript execution | Mature ecosystem, strong async I/O                         |
| **Framework**  | Next.js       | [16.x]     | React full-stack framework      | App Router, Server Components, Cache Components, Turbopack |
| **Language**   | TypeScript    | [5.x]      | Type-safe JavaScript            | Compile-time error detection                               |
| **State Mgmt** | Zustand       | [5.x]      | Client state management         | Lightweight, TypeScript-native                             |
| **ORM**        | Prisma        | [6.x]      | Database access layer           | Type-safe queries, migrations                              |
| **Database**   | PostgreSQL    | [16.x]     | Primary data store              | ACID compliance, JSON support                              |
| **Cache**      | Redis         | [7.x]      | Session/cache store             | Sub-millisecond latency                                    |
| **Queue**      | BullMQ        | [5.x]      | Background job processing       | Redis-based, reliable                                      |
| **Search**     | Elasticsearch | [8.x]      | Full-text search                | Advanced querying, aggregations                            |

#### 3.1.1 Next.js 16 Architecture Features

This project uses **Next.js 16** with the following modern architecture patterns:

| Feature                     | Description                                           | Benefit                                        |
| :-------------------------- | :---------------------------------------------------- | :--------------------------------------------- |
| **App Router**              | File-system based routing with nested layouts         | Better code organization, shared UI patterns   |
| **Server Actions**          | Server-side functions called directly from components | Reduced API boilerplate, type safety           |
| **Cache Components (PPR)**  | Partial Prerendering with cache directives            | Faster page loads, static/dynamic hybrid       |
| **Turbopack**               | Next-generation bundler (webpack replacement)         | 10x faster builds, instant HMR                 |
| **React Server Components** | Components that render exclusively on the server      | Zero client-side JavaScript for static content |
| **Streaming**               | Progressive page rendering with Suspense              | Faster time-to-first-byte, better UX           |

### 3.2 Infrastructure & Operations

| Layer                 | Technology           | Version | Purpose                              | Rationale                     |
| :-------------------- | :------------------- | :------ | :----------------------------------- | :---------------------------- |
| **Container Runtime** | Docker               | [24.x]  | Application containerization         | Industry standard             |
| **Orchestration**     | Docker Swarm / K8s   | [N/A]   | Container orchestration              | [Choose based on scale]       |
| **Reverse Proxy**     | NGINX                | [1.25+] | TLS termination, routing             | High performance, proven      |
| **Load Balancer**     | HAProxy / Cloud LB   | [N/A]   | Traffic distribution                 | Health checks, SSL offloading |
| **IaC**               | Terraform            | [1.7+]  | Infrastructure provisioning          | Multi-cloud support           |
| **CI/CD**             | GitHub Actions       | [N/A]   | Build and deployment automation      | Native Git integration        |
| **Monitoring**        | Prometheus + Grafana | [N/A]   | Metrics collection and visualization | Open source, powerful         |
| **Logging**           | Loki / ELK Stack     | [N/A]   | Centralized log aggregation          | Full-text search, alerting    |
| **Tracing**           | Jaeger / Zipkin      | [N/A]   | Distributed tracing                  | Request flow visualization    |
| **Secrets Mgmt**      | HashiCorp Vault      | [1.15+] | Secret storage and rotation          | Dynamic secrets, encryption   |

### 3.3 Security Stack

| Layer                | Technology              | Version | Purpose                           | Rationale                       |
| :------------------- | :---------------------- | :------ | :-------------------------------- | :------------------------------ |
| **WAF**              | ModSecurity / Cloud WAF | [N/A]   | Web application firewall          | OWASP CRS rules                 |
| **DDoS Protection**  | CloudFlare / AWS Shield | [N/A]   | DDoS mitigation                   | Global anycast network          |
| **Secrets Scanning** | GitLeaks / TruffleHog   | [N/A]   | Pre-commit secret detection       | Prevents credential leakage     |
| **SAST**             | SonarQube / Semgrep     | [N/A]   | Static code analysis              | Vulnerability detection         |
| **DAST**             | OWASP ZAP               | [N/A]   | Dynamic security testing          | Runtime vulnerability discovery |
| **Dependency Scan**  | Snyk / OWASP DC         | [N/A]   | Dependency vulnerability scanning | Supply chain security           |

### 3.4 Technology Lifecycle Status

| Technology    | Status     | EOL Date   | Migration Plan                 |
| :------------ | :--------- | :--------- | :----------------------------- |
| Node.js 20.x  | Active LTS | 2026-04-30 | Upgrade to 22.x LTS by Q1 2026 |
| PostgreSQL 16 | Current    | 2028-11-09 | Monitor 17.x release           |

<!-- RESOLVED PLACEHOLDER -->

---

## 4. System Context (C4 Level 1)

### 4.1 Context Diagram Description

The System Context diagram illustrates the high-level relationships between the [[PROJECT_NAME]] system and its external actors and systems.

**Primary Actors:**

- **End Users:** Access the system via web browser or mobile application
- **Administrators:** Manage system configuration and user access
- **External Services:** Third-party APIs and data sources

**External Systems:**

- **Identity Provider (IdP):** OAuth 2.0 / OIDC authentication (e.g., Auth0, Keycloak)
- **Payment Gateway:** PCI-compliant payment processing (e.g., Stripe)
- **Email Service:** Transactional and marketing email delivery (e.g., SendGrid)
- **Monitoring Service:** External uptime monitoring and alerting (e.g., PagerDuty)
- **Backup Storage:** Off-site encrypted backup storage (e.g., S3 Glacier, Backblaze)

### 4.2 Context Diagram Placeholder

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SYSTEM CONTEXT (C4 LEVEL 1)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│    ┌──────────┐                    ┌──────────────────┐                     │
│    │ End User │◄──────────────────►│  [[PROJECT_NAME]] │                     │
│    └──────────┘       HTTPS        │     System       │                     │
│                                    └────────┬─────────┘                     │
│                                             │                                │
│                    ┌────────────────────────┼────────────────────────┐       │
│                    │                        │                        │       │
│                    ▼                        ▼                        ▼       │
│            ┌──────────────┐        ┌──────────────┐        ┌──────────────┐  │
│            │ Identity     │        │ Payment      │        │ Email        │  │
│            │ Provider     │        │ Gateway      │        │ Service      │  │
│            └──────────────┘        └──────────────┘        └──────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Diagram File:** `diagrams/c4/01-context-diagram.puml`
**Tool:** PlantUML / Structurizr
**Last Updated:** [2026-02-25]

---

## 5. Container Architecture (C4 Level 2)

### 5.1 Container Overview

The system is decomposed into the following containers (deployable units):

| Container             | Type               | Technology         | Responsibility                       |
| :-------------------- | :----------------- | :----------------- | :----------------------------------- |
| **Web Application**   | Single-Page App    | Next.js + React    | User interface and client-side logic |
| **API Application**   | Server-Side App    | Next.js API Routes | Business logic and data access       |
| **Background Worker** | Background Process | Node.js + BullMQ   | Asynchronous job processing          |
| **Database**          | Data Store         | PostgreSQL         | Persistent data storage              |
| **Cache**             | Data Store         | Redis              | Session storage and caching          |
| **Message Queue**     | Message Broker     | Redis + BullMQ     | Job queuing and distribution         |
| **File Storage**      | Object Store       | MinIO / S3         | File and asset storage               |
| **Search Index**      | Search Engine      | Elasticsearch      | Full-text search capabilities        |

### 5.2 Container Diagram Placeholder

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CONTAINER DIAGRAM (C4 LEVEL 2)                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────┐                                                                │
│  │ End User │                                                                │
│  └────┬─────┘                                                                │
│       │ HTTPS                                                                 │
│       ▼                                                                       │
│  ┌──────────────────────────────────────────────────────────────────────┐    │
│  │                        [[PROJECT_NAME]] System                        │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │    │
│  │  │   Web App    │  │   API App    │  │   Worker     │               │    │
│  │  │  (Next.js)   │──►│  (Next.js)   │──►│  (Node.js)   │               │    │
│  │  └──────────────┘  └──────┬───────┘  └──────────────┘               │    │
│  │                           │                                          │    │
│  │         ┌─────────────────┼─────────────────┐                        │    │
│  │         ▼                 ▼                 ▼                        │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │    │
│  │  │  PostgreSQL  │  │    Redis     │  │   MinIO/S3   │               │    │
│  │  │  (Database)  │  │ (Cache/Queue)│  │   (Storage)  │               │    │
│  │  └──────────────┘  └──────────────┘  └──────────────┘               │    │
│  └──────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Diagram File:** `diagrams/c4/02-container-diagram.puml`
**Tool:** PlantUML / Structurizr
**Last Updated:** [2026-02-25]

### 5.3 Container Communication Matrix

| Source  | Destination | Protocol | Port | Purpose         | Encryption |
| :------ | :---------- | :------- | :--- | :-------------- | :--------- |
| Web App | API App     | HTTPS    | 443  | API requests    | TLS 1.3    |
| API App | PostgreSQL  | TCP      | 5432 | Data queries    | TLS 1.3    |
| API App | Redis       | TCP      | 6379 | Cache/Queue ops | TLS 1.3    |
| Worker  | PostgreSQL  | TCP      | 5432 | Job data access | TLS 1.3    |
| Worker  | Redis       | TCP      | 6379 | Job polling     | TLS 1.3    |
| API App | MinIO/S3    | HTTPS    | 443  | File operations | TLS 1.3    |

---

## 6. Component Architecture (C4 Level 3)

### 6.1 API Application Components

The API Application container consists of the following components:

| Component                     | Type       | Responsibility                       | Dependencies                      |
| :---------------------------- | :--------- | :----------------------------------- | :-------------------------------- |
| **Authentication Controller** | Controller | User login, logout, token management | User Service, Session Store       |
| **User Controller**           | Controller | User CRUD operations                 | User Service                      |
| **Resource Controller**       | Controller | Core business resource management    | Resource Service                  |
| **User Service**              | Service    | User business logic                  | User Repository                   |
| **Resource Service**          | Service    | Resource business logic              | Resource Repository, File Service |
| **File Service**              | Service    | File upload/download logic           | Object Storage                    |
| **Email Service**             | Service    | Email composition and sending        | Email Provider                    |
| **User Repository**           | Repository | User data access                     | PostgreSQL                        |
| **Resource Repository**       | Repository | Resource data access                 | PostgreSQL                        |
| **Cache Manager**             | Utility    | Cache operations                     | Redis                             |
| **Queue Manager**             | Utility    | Job queue operations                 | Redis                             |

### 6.2 Component Diagram Placeholder

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMPONENT DIAGRAM (C4 LEVEL 3)                       │
│                      API Application Container Detail                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        API Application                                │   │
│  │                                                                       │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐         │   │
│  │  │   Auth Ctrl    │  │   User Ctrl    │  │ Resource Ctrl  │         │   │
│  │  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘         │   │
│  │          │                   │                   │                   │   │
│  │          └───────────────────┼───────────────────┘                   │   │
│  │                              ▼                                       │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐         │   │
│  │  │   User Service │  │ Resource Svc   │  │  File Service  │         │   │
│  │  └───────┬────────┘  └───────┬────────┘  └───────┬────────┘         │   │
│  │          │                   │                   │                   │   │
│  │          ▼                   ▼                   ▼                   │   │
│  │  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐         │   │
│  │  │ User Repository│  │Resource Repo   │  │ Object Storage │         │   │
│  │  └───────┬────────┘  └───────┬────────┘  └────────────────┘         │   │
│  │          │                   │                                       │   │
│  │          └───────────────────┘                                       │   │
│  │                      │                                               │   │
│  │                      ▼                                               │   │
│  │              ┌───────────────┐                                       │   │
│  │              │  PostgreSQL   │                                       │   │
│  │              └───────────────┘                                       │   │
│  │                                                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Diagram File:** `diagrams/c4/03-component-diagram.puml`
**Tool:** PlantUML / Structurizr
**Last Updated:** [2026-02-25]

---

## 7. Infrastructure Architecture

### 7.1 Infrastructure Overview

We utilize the **HDA (High-Durable Architecture)** pattern with the following characteristics:

- **Compute:** [Bare Metal / VPS / Cloud Instances] hosted in [Region(s)]
- **High Availability:** Multi-zone deployment with automatic failover
- **Scalability:** Horizontal scaling via container orchestration
- **Disaster Recovery:** Cross-region replication with 4-hour RPO

### 7.2 Infrastructure Diagram Placeholder

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         INFRASTRUCTURE ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Internet ─────► [CDN / WAF] ─────► [Load Balancer]                         │
│                                          │                                   │
│                    ┌─────────────────────┼─────────────────────┐             │
│                    │                     │                     │             │
│                    ▼                     ▼                     ▼             │
│            ┌──────────────┐      ┌──────────────┐      ┌──────────────┐     │
│            │   Node 01    │◄────►│   Node 02    │◄────►│   Node 03    │     │
│            │  (Primary)   │      │ (Secondary)  │      │  (Standby)   │     │
│            └──────┬───────┘      └──────┬───────┘      └──────┬───────┘     │
│                   │                     │                     │             │
│                   └─────────────────────┼─────────────────────┘             │
│                                         │                                   │
│                    ┌────────────────────┼────────────────────┐              │
│                    ▼                    ▼                    ▼              │
│            ┌──────────────┐     ┌──────────────┐     ┌──────────────┐      │
│            │  PostgreSQL  │◄───►│    Redis     │◄───►│   MinIO/S3   │      │
│            │  (Primary)   │     │  (Cluster)   │     │  (Object)    │      │
│            └──────────────┘     └──────────────┘     └──────────────┘      │
│                   │                                                   │      │
│                   ▼                                                   │      │
│            ┌──────────────┐                                          │      │
│            │  PostgreSQL  │◄─────────────────────────────────────────┘      │
│            │  (Replica)   │          (Replication)                          │
│            └──────────────┘                                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Diagram File:** `diagrams/infrastructure/infrastructure-overview.puml`
**Tool:** PlantUML / Terraform Diagrams
**Last Updated:** [2026-02-25]

### 7.3 Compute Resources

| Resource                | Specification    | Count                    | Purpose                     |
| :---------------------- | :--------------- | :----------------------- | :-------------------------- |
| **Application Servers** | 4 vCPU, 8GB RAM  | 3                        | Web/API application hosting |
| **Worker Nodes**        | 2 vCPU, 4GB RAM  | 2                        | Background job processing   |
| **Database Server**     | 8 vCPU, 32GB RAM | 2 (1 primary, 1 replica) | PostgreSQL hosting          |
| **Cache Cluster**       | 2 vCPU, 4GB RAM  | 3                        | Redis cluster nodes         |

### 7.4 Storage Configuration

| Storage Type         | Size      | IOPS   | Backup Strategy          |
| :------------------- | :-------- | :----- | :----------------------- |
| **Application Disk** | 50GB SSD  | 3,000  | Daily snapshots          |
| **Database Storage** | 500GB SSD | 10,000 | Continuous WAL archiving |
| **Object Storage**   | Unlimited | N/A    | Cross-region replication |
| **Backup Storage**   | 2TB       | N/A    | 30-day retention         |

---

## 8. Network Topology

### 8.1 Network Architecture

The network is segmented into security zones with strict traffic controls:

| Zone            | CIDR        | Purpose                | Access Controls     |
| :-------------- | :---------- | :--------------------- | :------------------ |
| **DMZ**         | 10.0.1.0/24 | Public-facing services | Internet → 443 only |
| **Application** | 10.0.2.0/24 | Application servers    | DMZ → App only      |
| **Data**        | 10.0.3.0/24 | Database and cache     | App → Data only     |
| **Management**  | 10.0.4.0/24 | Monitoring, bastion    | VPN access only     |

### 8.2 Network Diagram Placeholder

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           NETWORK TOPOLOGY                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Internet                                                                   │
│      │                                                                       │
│      ▼                                                                       │
│   ┌────────────────────────────────────────────────────────────────────┐    │
│   │                              DMZ (10.0.1.0/24)                      │    │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │    │
│   │  │    WAF       │  │  Load Balancer│  │   Bastion    │             │    │
│   │  └──────┬───────┘  └──────┬───────┘  └──────────────┘             │    │
│   └─────────┼─────────────────┼────────────────────────────────────────┘    │
│             │                 │                                              │
│             ▼                 ▼                                              │
│   ┌────────────────────────────────────────────────────────────────────┐    │
│   │                        Application (10.0.2.0/24)                    │    │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │    │
│   │  │   App Node 1 │  │   App Node 2 │  │   App Node 3 │             │    │
│   │  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘             │    │
│   └─────────┼─────────────────┼─────────────────┼──────────────────────┘    │
│             │                 │                 │                            │
│             └─────────────────┼─────────────────┘                            │
│                               ▼                                              │
│   ┌────────────────────────────────────────────────────────────────────┐    │
│   │                           Data (10.0.3.0/24)                        │    │
│   │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │    │
│   │  │  PostgreSQL  │  │    Redis     │  │   MinIO      │             │    │
│   │  └──────────────┘  └──────────────┘  └──────────────┘             │    │
│   └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Diagram File:** `diagrams/network/network-topology.puml`
**Tool:** PlantUML
**Last Updated:** [2026-02-25]

### 8.3 Firewall Rules

| Rule ID | Source      | Destination | Port | Protocol | Action | Purpose           |
| :------ | :---------- | :---------- | :--- | :------- | :----- | :---------------- |
| FW-001  | Internet    | DMZ         | 443  | TCP      | ALLOW  | HTTPS traffic     |
| FW-002  | DMZ         | Application | 3000 | TCP      | ALLOW  | App server access |
| FW-003  | Application | Data        | 5432 | TCP      | ALLOW  | Database access   |
| FW-004  | Application | Data        | 6379 | TCP      | ALLOW  | Redis access      |
| FW-005  | Management  | All         | 22   | TCP      | ALLOW  | SSH management    |
| FW-006  | Any         | Any         | Any  | Any      | DENY   | Default deny      |

### 8.4 TLS/SSL Configuration

| Component     | Certificate Type | Key Size     | Protocol | Cipher Suites          |
| :------------ | :--------------- | :----------- | :------- | :--------------------- |
| Load Balancer | Wildcard SAN     | 2048-bit RSA | TLS 1.3  | TLS_AES_256_GCM_SHA384 |
| Application   | Internal CA      | 2048-bit RSA | TLS 1.3  | TLS_AES_256_GCM_SHA384 |
| Database      | Internal CA      | 2048-bit RSA | TLS 1.3  | TLS_AES_256_GCM_SHA384 |

---

## 9. Data Architecture

### 9.1 Data Flow Overview

Data flows through the system following these stages:

1. **Ingestion:** Data enters via API or user interface
2. **Validation:** Schema validation and sanitization
3. **Processing:** Business logic application
4. **Storage:** Persistence to primary database
5. **Indexing:** Search index updates
6. **Replication:** Async replication to read replicas
7. **Backup:** Continuous backup to off-site storage

### 9.2 Data Flow Diagram Placeholder

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DATA FLOW ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Input                                                                      │
│     │                                                                        │
│     ▼                                                                        │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│   │   Validate   │───►│   Process    │───►│    Store     │                  │
│   └──────────────┘    └──────────────┘    └──────┬───────┘                  │
│                                                  │                          │
│                    ┌─────────────────────────────┼─────────────────────┐    │
│                    │                             │                     │    │
│                    ▼                             ▼                     ▼    │
│            ┌──────────────┐            ┌──────────────┐        ┌──────────┐ │
│            │    Index     │            │   Replicate  │        │  Backup  │ │
│            │Elasticsearch │            │Read Replicas │        │  to S3   │ │
│            └──────────────┘            └──────────────┘        └──────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Diagram File:** `diagrams/data/data-flow-overview.puml`
**Tool:** PlantUML
**Last Updated:** [2026-02-25]

### 9.3 Data Stores

| Store                | Technology    | Purpose            | Consistency | Replication           |
| :------------------- | :------------ | :----------------- | :---------- | :-------------------- |
| **Primary Database** | PostgreSQL    | Transactional data | Strong      | Synchronous streaming |
| **Read Replicas**    | PostgreSQL    | Read scaling       | Eventual    | Asynchronous          |
| **Cache**            | Redis         | Session/cache      | Eventual    | Redis Cluster         |
| **Search**           | Elasticsearch | Full-text search   | Eventual    | Cross-cluster         |
| **Object Storage**   | MinIO/S3      | File storage       | Strong      | Cross-region          |

---

## 10. Security Architecture

### 10.1 Defense in Depth

Security is implemented across multiple layers:

| Layer           | Controls                                           | Implementation          |
| :-------------- | :------------------------------------------------- | :---------------------- |
| **Perimeter**   | WAF, DDoS protection, Rate limiting                | CloudFlare / AWS Shield |
| **Network**     | VPC isolation, Security groups, NACLs              | Cloud provider native   |
| **Application** | Input validation, Output encoding, CSRF protection | Application code        |
| **Data**        | Encryption at rest, Encryption in transit          | TLS 1.3, AES-256        |
| **Identity**    | MFA, RBAC, Session management                      | OAuth 2.0 / OIDC        |
| **Monitoring**  | SIEM, Intrusion detection, Audit logging           | ELK Stack / Wazuh       |

### 10.2 Security Controls Matrix

| Control Category   | Control                      | Implementation  | Evidence                     |
| :----------------- | :--------------------------- | :-------------- | :--------------------------- |
| **Access Control** | Multi-factor authentication  | TOTP/SMS        | Auth0 configuration          |
| **Access Control** | Role-based access control    | RBAC matrix     | Project-specific RBAC matrix |
| **Access Control** | Principle of least privilege | IAM policies    | Terraform configs            |
| **Encryption**     | Data at rest encryption      | AES-256-GCM     | Database configuration       |
| **Encryption**     | Data in transit encryption   | TLS 1.3         | SSL Labs report              |
| **Logging**        | Audit logging                | Structured JSON | ELK Stack                    |
| **Logging**        | Immutable logs               | WORM storage    | S3 Object Lock               |

### 10.3 Security Architecture Diagram Placeholder

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SECURITY ARCHITECTURE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         PERIMETER LAYER                              │   │
│   │   [DDoS Protection] ──► [WAF] ──► [Rate Limiter] ──► [CDN]          │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         NETWORK LAYER                                │   │
│   │   [VPC] ──► [Security Groups] ──► [NACLs] ──► [Network Segmentation]│   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                       APPLICATION LAYER                              │   │
│   │   [Input Validation] ──► [AuthN/AuthZ] ──► [Output Encoding]        │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                          DATA LAYER                                  │   │
│   │   [Encryption at Rest] ──► [Encryption in Transit] ──► [Tokenization│   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Diagram File:** `diagrams/security/security-architecture.puml`
**Tool:** PlantUML
**Last Updated:** [2026-02-25]

---

## 11. Deployment & CI/CD

### 11.1 Deployment Architecture

Infrastructure is managed as code (IaC) with the following pipeline:

| Stage                  | Tool                    | Purpose                     | Environment         |
| :--------------------- | :---------------------- | :-------------------------- | :------------------ |
| **Source Control**     | GitHub                  | Code repository             | All                 |
| **CI Pipeline**        | GitHub Actions          | Build, test, scan           | All                 |
| **Artifact Registry**  | GitHub Packages / ECR   | Docker image storage        | All                 |
| **IaC**                | Terraform               | Infrastructure provisioning | All                 |
| **CD Pipeline**        | GitHub Actions / ArgoCD | Deployment automation       | Staging, Production |
| **Secrets Management** | HashiCorp Vault         | Secret injection            | All                 |

### 11.2 CI/CD Pipeline Diagram Placeholder

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CI/CD PIPELINE                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Developer                                                                  │
│      │                                                                       │
│      ▼                                                                       │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐             │
│   │   Push   │───►│   Build  │───►│   Test   │───►│  Security│             │
│   │  to Git  │    │  Docker  │    │   Unit   │    │   Scan   │             │
│   └──────────┘    └──────────┘    └──────────┘    └────┬─────┘             │
│                                                        │                     │
│                    ┌───────────────────────────────────┘                     │
│                    │                                                         │
│                    ▼                                                         │
│   ┌────────────────────────────────────────────────────────────────────┐    │
│   │                        DEPLOYMENT STAGES                            │    │
│   │                                                                     │    │
│   │   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    │    │
│   │   │  Staging │───►│   E2E    │───►│Production│───►│  Verify  │    │    │
│   │   │  Deploy  │    │   Tests  │    │  Deploy  │    │  Health  │    │    │
│   │   └──────────┘    └──────────┘    └──────────┘    └──────────┘    │    │
│   │                                                                     │    │
│   └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Diagram File:** `diagrams/deployment/cicd-pipeline.puml`
**Tool:** PlantUML
**Last Updated:** [2026-02-25]

### 11.3 Deployment Strategy

| Environment     | Strategy                  | Rollback Time | Data Impact     |
| :-------------- | :------------------------ | :------------ | :-------------- |
| **Development** | Direct deployment         | N/A           | Local data only |
| **Staging**     | Blue/Green                | 5 minutes     | Synthetic data  |
| **Production**  | Canary (10% → 50% → 100%) | 2 minutes     | Real user data  |

### 11.4 Deployment Checklist

- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] Security scan clean (no critical/high vulnerabilities)
- [ ] Performance benchmarks within budget
- [ ] Database migrations tested on staging clone
- [ ] Rollback procedure documented and tested
- [ ] Monitoring dashboards verified
- [ ] On-call engineer notified

---

## 12. Decision Records

### 12.1 Architecture Decision Records (ADRs)

Key architectural decisions are documented in ADRs:

| ADR ID      | Title                                          | Status     | Date         | Author |
| :---------- | :--------------------------------------------- | :--------- | :----------- | :----- |
| **ADR-001** | [Database Selection: PostgreSQL vs MySQL]      | [ACCEPTED] | [2026-02-25] | [NAME] |
| **ADR-002** | [API Architecture: REST vs GraphQL]            | [ACCEPTED] | [2026-02-25] | [NAME] |
| **ADR-003** | [Authentication: JWT vs Session Cookies]       | [ACCEPTED] | [2026-02-25] | [NAME] |
| **ADR-004** | [Container Orchestration: Docker Swarm vs K8s] | [PROPOSED] | [2026-02-25] | [NAME] |
| **ADR-005** | [Caching Strategy: Redis vs Memcached]         | [ACCEPTED] | [2026-02-25] | [NAME] |

### 12.2 ADR Template Location

New ADRs should follow the template at:
project ADR template in the local `adr/` directory

### 12.3 Decision Log

| Date         | Decision           | Rationale         | Alternatives Considered |
| :----------- | :----------------- | :---------------- | :---------------------- |
| [2026-02-25] | [Decision summary] | [Why this choice] | [What was rejected]     |

---

## 13. Compliance Mapping

### 13.1 Regulatory Compliance

| Regulation        | Applicability | Controls Implemented                                     | Evidence Location           |
| :---------------- | :------------ | :------------------------------------------------------- | :-------------------------- |
| **GDPR**          | [YES/NO]      | Data minimization, Right to deletion, Consent management | `docs/compliance/gdpr/`     |
| **SOC 2 Type II** | [YES/NO]      | Access controls, Monitoring, Change management           | `docs/compliance/soc2/`     |
| **ISO 27001**     | [YES/NO]      | ISMS, Risk assessment, Security policies                 | `docs/compliance/iso27001/` |
| **PCI DSS**       | [YES/NO]      | Network segmentation, Encryption, Access logging         | `docs/compliance/pci-dss/`  |
| **HIPAA**         | [YES/NO]      | PHI encryption, Audit trails, BAAs                       | `docs/compliance/hipaa/`    |

### 13.2 Control Mapping Matrix

| Control ID | Control Description          | Implementation              | Evidence                          | GDPR | SOC 2 | ISO 27001 |
| :--------- | :--------------------------- | :-------------------------- | :-------------------------------- | :--: | :---: | :-------: |
| AC-01      | User access review           | Quarterly access reviews    | `docs/compliance/access-reviews/` |  ✓   |   ✓   |     ✓     |
| AC-02      | MFA enforcement              | TOTP required for all users | Auth0 configuration               |  ✓   |   ✓   |     ✓     |
| AC-03      | Privileged access monitoring | Admin session recording     | ELK Stack                         |      |   ✓   |     ✓     |
| EN-01      | Encryption at rest           | AES-256-GCM                 | Database config                   |  ✓   |   ✓   |     ✓     |
| EN-02      | Encryption in transit        | TLS 1.3 minimum             | SSL Labs report                   |  ✓   |   ✓   |     ✓     |
| AU-01      | Audit logging                | Structured JSON logs        | ELK Stack                         |  ✓   |   ✓   |     ✓     |
| AU-02      | Log retention                | 7-year retention            | S3 lifecycle policy               |      |   ✓   |     ✓     |

### 13.3 Compliance Architecture Diagram Placeholder

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMPLIANCE ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                         COMPLIANCE CONTROLS                          │   │
│   │                                                                      │   │
│   │   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐             │   │
│   │   │    GDPR      │  │   SOC 2      │  │  ISO 27001   │             │   │
│   │   │  Controller  │  │   Trust      │  │   ISMS       │             │   │
│   │   └──────┬───────┘  └──────┬───────┘  └──────┬───────┘             │   │
│   │          │                 │                 │                      │   │
│   │          └─────────────────┼─────────────────┘                      │   │
│   │                            ▼                                       │   │
│   │   ┌──────────────────────────────────────────────────────────┐    │   │
│   │   │              SHARED CONTROL FRAMEWORK                     │    │   │
│   │   │  • Access Controls  • Encryption  • Monitoring            │    │   │
│   │   │  • Incident Response  • Audit Logging  • Backup/Recovery  │    │   │
│   │   └──────────────────────────────────────────────────────────┘    │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Diagram File:** `diagrams/compliance/compliance-architecture.puml`
**Tool:** PlantUML
**Last Updated:** [2026-02-25]

---

## 14. Appendix A: Change History

| Version | Date         | Author           | Changes                                                                                                                | Approver   |
| :------ | :----------- | :--------------- | :--------------------------------------------------------------------------------------------------------------------- | :--------- |
| 2.0.0   | 2026-02-09   | Technical Writer | Removed owner-controlled systems terminology, simplified language to 9th grade reading level, added Next.js 16 content | [CTO NAME] |
| 1.0.0   | [2026-02-25] | [NAME]           | Initial architecture document                                                                                          | [CTO NAME] |
| 1.1.0   | [2026-02-25] | [NAME]           | [Description of changes]                                                                                               | [CTO NAME] |

---

## Document End

_This document is the property of [[CLIENT_NAME]] and Vantus Systems. Unauthorized distribution is prohibited._

## Sync Notes

- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
