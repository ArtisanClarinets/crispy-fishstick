---
Document: GLOSSARY
Doc ID: VS-TEMPLATE-MASTER-002
Client: [[CLIENT_NAME]]
Project: [[PROJECT_NAME]]
Owner: Technical Lead / Business Analyst
Contributors: All Project Team Members
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/00_master/01_GLOSSARY.md
Approvers: [[TECH_LEAD]] / [[CLIENT_STAKEHOLDER]]
---

# Project Glossary — Plain English Definitions

## Purpose
This glossary establishes a **shared vocabulary** for all project stakeholders. It ensures consistent understanding of technical and business terms, reduces miscommunication, and provides context for why each term matters to the business. Use this document to:
- Onboard new team members with consistent terminology
- Clarify terms in client communications
- Resolve terminology disputes
- Support documentation consistency

## Instructions
1. **Customization:** Replace all `[[PLACEHOLDERS]]` with project-specific values
2. **Expansion:** Add project-specific terms as they emerge
3. **Maintenance:** Update definitions as understanding evolves
4. **Review:** Validate terms with both technical and business stakeholders
5. **Accessibility:** Keep definitions at 8th-grade reading level or below

---

## 1. INFRASTRUCTURE & HOSTING TERMS

| Term | Definition (Plain English) | Why It Matters to the Business |
|---|---|---|
| **Cloud** | Computing services (servers, storage, databases) delivered over the internet instead of on physical hardware you own. Think of it like renting a fully-furnished apartment instead of buying a house. | Pay only for what you use; no upfront hardware costs; scale up or down instantly based on demand. |
| **VPS** (Virtual Private Server) | A virtual machine that acts like a dedicated server but shares physical hardware with other VPS instances. Like having your own apartment in a large building. | More affordable than dedicated servers; isolated from other tenants; predictable monthly costs. |
| **Dedicated Server** | A physical server that belongs entirely to you. No sharing with other customers. Like owning a standalone house. | Maximum performance and security; full control over hardware; best for high-compliance requirements. |
| **Container** (Docker) | A lightweight, portable package that includes everything needed to run an application: code, runtime, libraries, and settings. Like a shipping container that can move anywhere. | Applications run consistently across environments; easy to deploy and scale; no "works on my machine" problems. |
| **Kubernetes** | A system for automating the deployment, scaling, and management of containerized applications. Like an autopilot for your containers. | Automatically handles failures; scales based on demand; manages complex multi-container applications. |
| **Load Balancer** | A traffic director that distributes incoming requests across multiple servers to prevent any single server from becoming overwhelmed. | Ensures high availability; improves performance; enables zero-downtime deployments. |
| **CDN** (Content Delivery Network) | A network of servers distributed globally that cache and deliver content from locations closest to users. | Faster page loads worldwide; reduced server load; improved user experience. |
| **Edge Computing** | Processing data close to where it's generated (near users or devices) rather than in a central data center. | Reduced latency; improved performance; lower bandwidth costs. |

---

## 2. DATA & STORAGE TERMS

| Term | Definition (Plain English) | Why It Matters to the Business |
|---|---|---|
| **Database** | An organized collection of structured information stored electronically. Like a digital filing cabinet with labeled drawers and folders. | Centralized data management; fast data retrieval; data integrity and consistency. |
| **SQL** (Structured Query Language) | A standardized language for storing, manipulating, and retrieving data in relational databases. | Industry standard; powerful querying capabilities; ensures data consistency. |
| **NoSQL** | Database systems that store data in formats other than traditional tables (documents, key-value pairs, graphs). | Flexible schemas; handles unstructured data; scales horizontally. |
| **Backup** | A copy of your data stored separately from the original, used for recovery if the original is lost or damaged. | Protection against data loss; compliance requirement; business continuity. |
| **Restore** | The process of recovering data from a backup to return systems to a previous state. | Disaster recovery; rollback from errors; meeting RTO commitments. |
| **RPO** (Recovery Point Objective) | The maximum acceptable amount of data loss measured in time. "How much data can we afford to lose?" | Determines backup frequency; affects storage costs; critical for compliance. |
| **RTO** (Recovery Time Objective) | The maximum acceptable downtime after a disaster. "How quickly must we be back online?" | Drives disaster recovery planning; affects infrastructure costs; impacts SLA commitments. |
| **Encryption** | Converting data into a coded format that can only be read by authorized parties with the decryption key. | Protects sensitive data; compliance requirement; prevents unauthorized access. |
| **Data Lake** | A storage repository that holds vast amounts of raw data in its native format until needed. | Stores all data types; supports advanced analytics; cost-effective for big data. |
| **Data Warehouse** | A centralized repository for structured, filtered data that's been processed for a specific purpose. | Optimized for reporting; consistent data definitions; business intelligence. |

---

## 3. SECURITY & COMPLIANCE TERMS

| Term | Definition (Plain English) | Why It Matters to the Business |
|---|---|---|
| **Authentication** | The process of verifying who you are (proving your identity). Like showing your ID at the door. | Prevents unauthorized access; audit trail of user actions; compliance requirement. |
| **Authorization** | The process of determining what you're allowed to do once authenticated. Like having a ticket that grants access to specific areas. | Enforces least privilege; prevents data breaches; role-based access control. |
| **MFA** (Multi-Factor Authentication) | Requiring two or more verification methods to prove identity (something you know, have, or are). | Dramatically reduces account compromise; compliance best practice; industry standard. |
| **SSL/TLS** | Protocols that encrypt data transmitted between web browsers and servers. The "S" in HTTPS. | Protects data in transit; builds user trust; SEO ranking factor. |
| **Vulnerability** | A weakness in a system that could be exploited by attackers. | Must be identified and remediated; affects security posture; compliance requirement. |
| **Penetration Testing** | Simulated cyber attacks against your system to identify security weaknesses. | Proactive security validation; compliance requirement; risk reduction. |
| **GDPR** (General Data Protection Regulation) | EU law governing data protection and privacy for individuals within the European Union. | Legal compliance; heavy fines for violations; customer trust. |
| **CCPA** (California Consumer Privacy Act) | California law giving consumers rights to know what personal data is collected and to delete it. | Legal compliance; applies to California residents; consumer rights. |
| **SOC 2** | Audit framework ensuring service providers securely manage data to protect client interests. | Vendor requirement; demonstrates security commitment; enterprise sales enabler. |
| **ISO 27001** | International standard for information security management systems (ISMS). | Global recognition; systematic security approach; competitive advantage. |
| **Zero Trust** | Security model that assumes no user or device should be trusted by default, regardless of location. | Modern security approach; protects against insider threats; remote work security. |

---

## 4. DEVELOPMENT & DEPLOYMENT TERMS

| Term | Definition (Plain English) | Why It Matters to the Business |
|---|---|---|
| **API** (Application Programming Interface) | A set of rules that allows different software applications to communicate with each other. Like a menu in a restaurant that tells you what you can order and how. | Enables system integration; third-party connectivity; automation capabilities. |
| **Frontend** | The part of an application that users see and interact with directly (buttons, forms, pages). | User experience; brand presentation; customer-facing functionality. |
| **Backend** | The server-side logic, databases, and infrastructure that power the application behind the scenes. | Business logic; data processing; security and scalability. |
| **Full-Stack** | Development that encompasses both frontend and backend components. | End-to-end ownership; faster development; holistic system understanding. |
| **CI/CD** (Continuous Integration/Continuous Deployment) | Automated processes that build, test, and deploy code changes frequently and reliably. | Faster releases; fewer bugs; reduced manual effort. |
| **Repository** (Repo) | A centralized storage location for code, documentation, and version history. | Collaboration; version control; backup and recovery. |
| **Version Control** (Git) | A system that tracks changes to files over time, allowing you to recall specific versions later. | Collaboration without conflict; change tracking; rollback capability. |
| **Environment** | A separate instance of the application for different purposes (development, testing, production). | Safe testing; staged deployments; isolation of concerns. |
| **Staging** | A pre-production environment that mirrors production for final testing before release. | Catch issues before customers see them; validate deployments; training environment. |
| **Production** | The live environment where real users access the application. | Revenue generation; customer-facing; highest stability requirements. |
| **Rollback** | Reverting a deployment to a previous stable version when issues are detected. | Rapid recovery from bad deployments; minimizes downtime; risk mitigation. |
| **Feature Flag** | A mechanism to enable or disable features without deploying new code. | Gradual rollouts; A/B testing; instant rollback of features. |
| **Technical Debt** | The implied cost of additional rework caused by choosing an easy solution now instead of a better approach. | Impacts development speed; increases maintenance costs; requires intentional management. |

---

## 5. MONITORING & OPERATIONS TERMS

| Term | Definition (Plain English) | Why It Matters to the Business |
|---|---|---|
| **Monitoring** | Continuous observation of system health, performance, and availability. | Early problem detection; performance optimization; compliance evidence. |
| **Alerting** | Automated notifications when monitored metrics exceed defined thresholds. | Rapid incident response; proactive issue resolution; SLA compliance. |
| **Uptime** | The percentage of time a system is operational and accessible. | Directly impacts revenue; customer satisfaction metric; SLA measurement. |
| **Downtime** | Periods when a system is unavailable or not functioning correctly. | Lost revenue; customer frustration; reputation damage. |
| **Incident** | An unplanned interruption or reduction in quality of a service. | Requires response and documentation; affects SLAs; drives improvement. |
| **Incident Response** | The organized approach to addressing and managing security breaches or service disruptions. | Minimizes damage; meets compliance requirements; preserves reputation. |
| **Observability** | The ability to understand a system's internal state by examining its outputs (logs, metrics, traces). | Faster troubleshooting; proactive optimization; system understanding. |
| **SLA** (Service Level Agreement) | A contractual commitment specifying service standards, availability, and consequences for missing them. | Sets expectations; defines penalties; builds trust. |
| **SLO** (Service Level Objective) | Internal performance targets for reliability and performance. | Guides engineering priorities; balances reliability vs. velocity; customer happiness. |
| **SLI** (Service Level Indicator) | A quantitative measure of service behavior (e.g., request latency, error rate). | Objective measurement; data-driven decisions; trend analysis. |
| **Error Budget** | The acceptable amount of unreliability (downtime) allowed before halting feature development. | Balances innovation vs. stability; prevents reliability erosion; team autonomy. |
| **Postmortem** | A structured review of an incident to identify root causes and prevent recurrence. | Learning culture; continuous improvement; blameless accountability. |

---

## 6. PROJECT MANAGEMENT TERMS

| Term | Definition (Plain English) | Why It Matters to the Business |
|---|---|---|
| **Sprint** | A fixed time period (usually 1-2 weeks) during which specific work is completed. | Predictable delivery; focused work; regular feedback. |
| **MVP** (Minimum Viable Product) | The version of a product with just enough features to satisfy early customers and provide feedback. | Faster time to market; reduced risk; validated learning. |
| **Scope** | The defined boundaries of what a project will and will not deliver. | Prevents scope creep; sets expectations; manages resources. |
| **Scope Creep** | Uncontrolled changes or continuous growth in project scope after the project has begun. | Budget overruns; schedule delays; quality degradation. |
| **Stakeholder** | Any person or group with an interest in or influence on the project. | Requirements source; decision makers; communication priority. |
| **Deliverable** | A tangible or intangible output that must be produced to complete a project. | Progress measurement; contractual obligation; value delivery. |
| **Milestone** | A significant point or event in a project timeline. | Progress tracking; stakeholder communication; payment triggers. |
| **Dependency** | A relationship between tasks where one task relies on another being completed first. | Schedule planning; risk identification; resource coordination. |
| **Critical Path** | The sequence of tasks that determines the shortest possible project duration. | Schedule optimization; delay impact analysis; priority setting. |
| **Change Order** | A formal document modifying the original project scope, timeline, or cost. | Controlled changes; contractual protection; clear documentation. |
| **Acceptance Criteria** | Specific conditions that must be met for a deliverable to be accepted. | Quality definition; dispute prevention; objective evaluation. |
| **Sign-off** | Formal approval indicating a deliverable meets requirements and is accepted. | Accountability; milestone completion; payment authorization. |

---

## 7. VANTUS-SPECIFIC TERMS

| Term | Definition (Plain English) | Why It Matters to the Business |
|---|---|---|
| **Full Ownership** | Complete ownership and control of your digital infrastructure, data, and intellectual property. | No vendor lock-in; long-term cost control; strategic independence. |
| **Documentation Kit** | The complete documentation suite that enables you to operate your system independently of Vantus. | Knowledge transfer; operational independence; future flexibility. |
| **Host Portability** | The ability to move your system to any hosting provider without significant rework. | Vendor flexibility; cost optimization; disaster recovery options. |
| **No-Lock Architecture** | Technical design that avoids proprietary technologies or patterns that create dependency on specific vendors. | Maximum flexibility; competitive pricing; future-proofing. |
| **Exit Strategy** | A documented plan for transitioning away from Vantus or current hosting providers. | Risk mitigation; business continuity; negotiation leverage. |
| **Ownership Transfer** | The formal process of handing over complete system ownership, documentation, and knowledge to the client. | Contractual completion; client empowerment; relationship conclusion. |
| **Master Craftsman** | Vantus's approach to engineering: treating digital infrastructure as durable, repairable instruments built to last. | Quality mindset; long-term thinking; pride in work. |
| **Industrial Warmth** | Vantus's design philosophy combining robust industrial reliability with approachable, human-centered design. | User trust; professional appearance; accessibility. |

---

## 8. "EXPLAIN LIKE I'M BUSY" — QUICK REFERENCE

One-line explanations for common client conversations:

- **Cloud vs. On-Premise:** "Cloud is renting; on-premise is owning. We help you choose based on your control and compliance needs."
- **API:** "It's how different software systems talk to each other."
- **Database:** "Your digital filing cabinet where all information lives."
- **Backup:** "Insurance for your data—hope you never need it, essential if you do."
- **Encryption:** "Scrambling data so only authorized people can read it."
- **Uptime:** "How often your system is working. 99.9% means 8.7 hours of downtime per year."
- **Technical Debt:** "Shortcuts taken today that cost more to fix tomorrow."
- **Full Ownership:** "You own everything—we just help you build it."
- **CI/CD:** "Automatic testing and deployment so updates happen faster with fewer errors."
- **Zero Trust:** "Trust no one, verify everyone—modern security for remote work."
- **MFA:** "Using your password PLUS your phone to prove it's really you."
- **RPO/RTO:** "How much data can we lose, and how fast must we recover?"
- **Scope Creep:** "The project keeps growing without more budget or time."
- **Staging:** "A practice environment that looks exactly like the real thing."
- **Observability:** "Being able to see what's happening inside your system."

---

## 9. ACRONYM QUICK REFERENCE

| Acronym | Full Term | Category |
|---|---|---|
| API | Application Programming Interface | Development |
| CDN | Content Delivery Network | Infrastructure |
| CI/CD | Continuous Integration/Continuous Deployment | Development |
| CCPA | California Consumer Privacy Act | Compliance |
| DPO | Data Protection Officer | Compliance |
| GDPR | General Data Protection Regulation | Compliance |
| MFA | Multi-Factor Authentication | Security |
| MVP | Minimum Viable Product | Project Management |
| PII | Personally Identifiable Information | Security |
| RPO | Recovery Point Objective | Operations |
| RTO | Recovery Time Objective | Operations |
| SLA | Service Level Agreement | Operations |
| SLI | Service Level Indicator | Operations |
| SLO | Service Level Objective | Operations |
| SOC 2 | Service Organization Control 2 | Compliance |
| SQL | Structured Query Language | Data |
| SSL/TLS | Secure Sockets Layer / Transport Layer Security | Security |
| VPS | Virtual Private Server | Infrastructure |
| GDPR | General Data Protection Regulation | Compliance |

---

## 10. RELATED DOCUMENTS

| Document | Relationship | Location |
|---|---|---|
| [00_MASTER_INDEX.md](./00_MASTER_INDEX.md) | Central navigation hub | Current directory |
| [02_ASSUMPTIONS_CONSTRAINTS.md](./02_ASSUMPTIONS_CONSTRAINTS.md) | Project boundaries and constraints | Current directory |
| [03_DECISION_LOG.md](./03_DECISION_LOG.md) | Technical and business decisions | Current directory |
| [04_REQUIREMENTS_SPEC.md](../03_discovery/04_REQUIREMENTS_SPEC.md) | Detailed requirements with terminology | Discovery directory |
| [09_DATA_DICTIONARY.md](../04_architecture/09_DATA_DICTIONARY.md) | Data-specific definitions | Architecture directory |

---

## 11. QUALITY CHECKLIST

Before marking this document complete, verify:

- [ ] All `[[PLACEHOLDERS]]` replaced with actual project values
- [ ] All terms reviewed for accuracy by Technical Lead
- [ ] Business context validated by client stakeholders
- [ ] Reading level verified at 8th grade or below (use Hemingway Editor or similar)
- [ ] Acronyms defined on first use in each section
- [ ] "Explain Like I'm Busy" section includes at least 15 entries
- [ ] Terms organized by logical categories
- [ ] Examples provided where helpful
- [ ] Related documents cross-referenced
- [ ] Document reviewed by both technical and business reviewers
- [ ] Version history initialized
- [ ] Approved by Client Sponsor

---

## 12. CHANGE HISTORY

| Date | Version | Author | Summary |
|---|---:|---|---|
| 2026-02-09 | 2.0.0 | Technical Writer | Removed owner-controlled systems terminology, simplified language to 9th grade reading level |
| 2026-02-02 | 1.0.0 | Technical Writer | Complete rewrite with comprehensive terminology coverage, business context, and quick reference sections |
| 2026-01-18 | 0.1.0 | Vantus Systems | Initial template creation |

---

*Vantus Systems: Engineering Independence.*
*Last Updated: 2026-02-09 | Version 2.0.0 | Status: Template*


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
