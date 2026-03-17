# RACI Matrix

---

## Document Control

| Field | Value |
|-------|-------|
| **Document ID** | VS-GOV-103-RM |
| **Version** | 1.1 |
| **Date** | [[DATE]] |
| **Author** | [[PROJECT_MANAGER]] |
| **Status** | Draft / Approved |
| **Classification** | Internal / Client Confidential |
| **Review Cycle** | Monthly or at phase transitions |
| **Next Review** | [[DATE]] |

---

## Version History

| Version | Date | Author | Changes | Approved By |
|---------|------|--------|---------|-------------|
| 0.1 | [[DATE]] | [[NAME]] | Initial draft | - |
| 0.2 | [[DATE]] | [[NAME]] | [[DESCRIPTION]] | - |
| 1.0 | [[DATE]] | [[NAME]] | Approved baseline | [[SPONSOR_NAME]] |
| 1.1 | [[DATE]] | [[NAME]] | Removed owner-controlled systems terminology per branding guidelines | [[SPONSOR_NAME]] |

---

## Purpose

The RACI Matrix (Responsible, Accountable, Consulted, Informed) provides a clear framework for defining and communicating roles and responsibilities across all project activities. This document ensures that every task has clear ownership, appropriate consultation, and proper information distribution, eliminating ambiguity and preventing gaps or overlaps in responsibility.

---

## Scope

This RACI Matrix covers:
- All project phases from Discovery through Owner Handoff
- All major workstreams and activities
- All key project roles and stakeholders
- Cross-functional dependencies and handoffs

This matrix does NOT cover:
- Day-to-day task assignments within teams
- Individual contributor responsibilities (managed at team level)
- Administrative activities (scheduling, note-taking, etc.)

---

## Objectives

1. **Clarity:** Eliminate ambiguity about who does what
2. **Accountability:** Ensure single-point accountability for each deliverable
3. **Efficiency:** Optimize consultation and information flows
4. **Alignment:** Ensure stakeholder alignment on responsibilities
5. **Escalation:** Provide clear escalation paths when issues arise

---

## Instructions for Completion

1. **Identify Activities:** List all major project activities by phase and workstream
2. **Define Roles:** Identify all project roles and stakeholders
3. **Assign RACI:** For each activity, assign one Accountable (A) and one or more Responsible (R)
4. **Validate:** Ensure only one 'A' per activity; every activity has at least one 'R'
5. **Review:** Validate with all role holders
6. **Baseline:** Obtain approval and communicate to all stakeholders
7. **Maintain:** Update as project evolves or team changes

---

# 1. RACI DEFINITIONS

| Role | Definition | Symbol |
|------|------------|--------|
| **Responsible (R)** | The person(s) who actually completes the work. There may be multiple R's for an activity. | R |
| **Accountable (A)** | The single person who has ultimate ownership and is answerable for the activity. Only one A per activity. | A |
| **Consulted (C)** | Person(s) who need to provide input before work can proceed. Two-way communication. | C |
| **Informed (I)** | Person(s) who need to know the outcome but don't need to be consulted. One-way communication. | I |

### Key Rules
- **Only ONE Accountable (A)** per activity to ensure clear ownership
- **At least ONE Responsible (R)** per activity to ensure work gets done
- **Minimize Consulted (C)** to avoid bottlenecks
- **Inform (I)** broadly to ensure transparency
- **Every box should have a letter** - no empty cells

---

# 2. PROJECT ROLES

## 2.1 Client Roles

| Role | Code | Description |
|------|------|-------------|
| Executive Sponsor | ES | Senior executive with budget authority and strategic oversight |
| Product Owner | PO | Business representative defining requirements and priorities |
| Technical Lead (Client) | TL-C | Client's technical authority and integration coordinator |
| Subject Matter Experts | SME | Domain experts providing business/technical input |
| End Users | EU | Representative users providing feedback and acceptance |
| Client Project Manager | PM-C | Client-side project coordinator |

## 2.2 Vantus Systems Roles

| Role | Code | Description |
|------|------|-------------|
| Vantus Project Lead | PM-V | Overall project delivery responsibility |
| Technical Lead (Vantus) | TL-V | Technical architecture and implementation leadership |
| UX/UI Designer | UX | User experience and interface design |
| Development Team | DEV | Software developers and engineers |
| Quality Assurance Lead | QA | Testing strategy and quality oversight |
| Security Officer | SEC | Security compliance and risk management |
| DevOps Engineer | OPS | Infrastructure and deployment management |

---

# 3. RACI MATRIX BY PROJECT PHASE

## 3.1 Phase 1: Discovery & Requirements

| Activity | ES | PO | TL-C | PM-V | TL-V | UX | DEV | QA | SEC | OPS |
|----------|----|----|------|------|------|----|----|----|----|----|
| **Stakeholder Identification** | C | A | C | R | I | I | I | I | I | I |
| **Requirements Workshops** | I | A | C | R | C | C | I | C | I | I |
| **Business Process Analysis** | I | A | R | C | I | C | I | I | I | I |
| **Technical Requirements** | I | C | A | C | R | I | C | I | C | C |
| **Security Requirements** | I | C | C | C | C | I | I | I | A/R | C |
| **Compliance Assessment** | A | C | C | R | C | I | I | C | R | I |
| **PRD Documentation** | I | A | C | R | C | C | I | C | C | I |
| **Requirements Validation** | C | A | C | R | C | C | I | C | I | I |
| **Acceptance Criteria Definition** | I | A | C | R | C | C | I | R | I | I |
| **Discovery Phase Gate** | A | R | C | R | I | I | I | I | I | I |

## 3.2 Phase 2: Design & Architecture

| Activity | ES | PO | TL-C | PM-V | TL-V | UX | DEV | QA | SEC | OPS |
|----------|----|----|------|------|------|----|----|----|----|----|
| **System Architecture Design** | I | C | C | C | A | I | R | I | C | C |
| **UX Research** | I | C | C | C | I | A/R | I | C | I | I |
| **UI Design System** | I | C | I | C | C | A | I | I | I | I |
| **Wireframing** | I | C | I | C | C | A | I | I | I | I |
| **Prototype Development** | I | C | C | C | C | R | R | I | I | I |
| **User Flow Design** | I | A | C | C | C | R | I | I | I | I |
| **Database Schema Design** | I | C | C | C | A | I | R | I | I | I |
| **API Specification** | I | C | C | C | A | I | R | C | C | I |
| **Security Architecture** | I | C | C | C | C | I | C | I | A/R | C |
| **Infrastructure Design** | I | C | C | C | C | I | C | I | C | A/R |
| **Design Review** | I | A | C | R | R | R | I | I | I | I |
| **Design Approval** | C | A | C | R | C | R | I | I | I | I |
| **Alpha Phase Gate** | A | R | C | R | I | I | I | I | I | I |

## 3.3 Phase 3: Development (Build)

| Activity | ES | PO | TL-C | PM-V | TL-V | UX | DEV | QA | SEC | OPS |
|----------|----|----|------|------|------|----|----|----|----|----|
| **Sprint Planning** | I | A | I | R | C | C | C | C | I | I |
| **Frontend Development** | I | C | I | C | C | C | A/R | I | I | I |
| **Backend Development** | I | C | C | C | A | I | R | I | I | I |
| **Database Implementation** | I | I | I | C | A | I | R | I | I | I |
| **API Development** | I | C | C | C | A | I | R | I | I | I |
| **Integration Development** | I | C | C | C | A | I | R | I | I | I |
| **Security Implementation** | I | I | I | C | C | I | C | I | A/R | I |
| **Code Reviews** | I | I | I | I | A | I | R | I | I | I |
| **Unit Testing** | I | I | I | I | C | I | A/R | C | I | I |
| **Integration Testing** | I | I | I | C | C | I | C | A/R | I | I |
| **Sprint Demo** | I | A | C | R | C | C | R | I | I | I |
| **Sprint Retrospective** | I | I | I | A | R | R | R | R | I | I |
| **Bug Fixes (Development)** | I | C | I | C | C | C | A/R | C | I | I |
| **Beta Phase Gate** | A | R | C | R | I | I | I | R | C | I |

## 3.4 Phase 4: Quality Assurance & Testing

| Activity | ES | PO | TL-C | PM-V | TL-V | UX | DEV | QA | SEC | OPS |
|----------|----|----|------|------|------|----|----|----|----|----|
| **Test Planning** | I | C | I | C | C | I | C | A/R | C | I |
| **Test Case Development** | I | C | I | I | I | C | C | A/R | I | I |
| **System Testing** | I | I | I | C | C | I | C | A/R | I | I |
| **Performance Testing** | I | I | I | C | C | I | C | A/R | I | C |
| **Security Testing** | I | I | I | C | C | I | C | C | A/R | I |
| **Accessibility Testing** | I | C | I | C | I | C | C | A/R | I | I |
| **User Acceptance Testing (UAT)** | I | A | C | R | I | C | C | R | I | I |
| **UAT Support** | I | C | C | R | C | C | R | C | I | I |
| **Bug Triage** | I | C | I | R | C | C | C | A | I | I |
| **Bug Fixes (QA)** | I | C | I | C | C | C | A/R | C | I | I |
| **Regression Testing** | I | I | I | C | C | I | C | A/R | I | I |
| **Test Report** | I | C | I | R | C | I | C | A/R | I | I |
| **RC Phase Gate** | A | R | C | R | R | I | I | R | R | R |

## 3.5 Phase 5: Deployment & Handoff

| Activity | ES | PO | TL-C | PM-V | TL-V | UX | DEV | QA | SEC | OPS |
|----------|----|----|------|------|------|----|----|----|----|----|
| **Deployment Planning** | I | C | C | A | C | I | C | C | C | R |
| **Infrastructure Setup** | I | I | C | C | C | I | I | I | C | A/R |
| **Production Deployment** | I | C | C | A | C | I | C | C | C | R |
| **Smoke Testing** | I | C | I | C | C | I | C | A/R | I | C |
| **Go-Live Decision** | A | R | C | R | C | I | I | C | C | C |
| **Technical Documentation** | I | I | C | C | A | I | R | I | I | R |
| **User Documentation** | I | A | C | R | I | C | I | I | I | I |
| **Training Development** | I | A | C | R | I | C | I | I | I | I |
| **Training Delivery** | I | A | C | R | I | C | C | I | I | I |
| **Knowledge Transfer** | I | C | A | R | R | I | R | I | I | R |
| **Operational Handover** | I | C | A | R | C | I | C | I | I | R |
| **Acceptance Certificate** | A | R | C | R | I | I | I | I | I | I |
| **Owner Handoff Gate** | A | R | R | R | R | I | I | I | I | I |

---

# 4. WORKSTREAM BREAKDOWN

## 4.1 Project Management Workstream

| Task | PM-V | PM-C | PO | ES |
|------|------|------|----|----|
| Project Planning | A/R | C | C | I |
| Status Reporting | A/R | C | C | I |
| Risk Management | A/R | C | C | I |
| Issue Management | A/R | C | C | I |
| Change Control | A/R | C | A | C |
| Stakeholder Management | A/R | C | C | I |
| Budget Tracking | A/R | C | C | A |
| Meeting Facilitation | A/R | I | C | I |
| Phase Gate Coordination | A/R | C | R | A |

## 4.2 Technical Workstream

| Task | TL-V | TL-C | DEV | OPS | SEC |
|------|------|------|----|----|----|
| Architecture Decisions | A | C | C | C | C |
| Technical Standards | A | C | R | C | C |
| Code Reviews | A | I | R | I | I |
| Technical Debt Management | A | C | R | I | I |
| Performance Optimization | A | C | R | C | I |
| Security Reviews | C | C | C | C | A |
| Infrastructure Management | C | C | I | A | C |
| Integration Coordination | A | A | R | R | I |

## 4.3 Quality Workstream

| Task | QA | TL-V | DEV | PM-V | PO |
|------|----|------|----|------|----|
| Test Strategy | A/R | C | C | C | I |
| Test Planning | A/R | C | C | C | I |
| Test Execution | A/R | I | C | I | I |
| Defect Management | A/R | C | C | C | C |
| Quality Reporting | A/R | C | I | C | C |
| Acceptance Testing | R | I | I | C | A |
| Quality Gates | A/R | C | C | C | C |

## 4.4 Design Workstream

| Task | UX | PO | TL-V | DEV | QA |
|------|----|----|------|----|----|
| UX Research | A/R | C | I | I | I |
| UI Design | A/R | C | C | C | I |
| Design System | A/R | C | C | C | I |
| Prototyping | A/R | C | C | R | I |
| Usability Testing | A/R | C | I | I | C |
| Design Reviews | R | A | C | C | I |
| Accessibility Compliance | A/R | C | C | C | C |

---

# 5. CROSS-FUNCTIONAL DEPENDENCIES

## 5.1 Handoff Points

| From | To | Activity | Trigger | Deliverable |
|------|----|----------|---------|-------------|
| UX | DEV | Design Handoff | Design approval | Design specs, assets, prototypes |
| DEV | QA | Code Handoff | Feature complete | Deployed code, test notes |
| QA | PO | UAT Handoff | QA pass | Test results, known issues |
| PO | ES | Approval Handoff | UAT complete | Acceptance recommendation |
| TL-V | TL-C | Technical Handoff | Pre-deployment | Architecture docs, runbooks |
| OPS | Client | Operations Handoff | Go-live | Monitoring, access, procedures |

## 5.2 Collaboration Requirements

| Collaboration | Participants | Frequency | Purpose |
|---------------|--------------|-----------|---------|
| **Design-Dev Sync** | UX, TL-V, DEV | Weekly | Design feasibility, implementation approach |
| **Dev-QA Sync** | TL-V, DEV, QA | Daily | Bug triage, test coverage |
| **Tech-Ops Sync** | TL-V, OPS, SEC | Weekly | Infrastructure, security, deployment |
| **Client-Vantus Sync** | PO, PM-V, TL-C | Weekly | Alignment, issue resolution |
| **Sprint Planning** | PO, PM-V, TL-V, DEV, QA | Bi-weekly | Commitment, capacity planning |

---

# 6. RACI VALIDATION RULES

## 6.1 Quality Checks

Before finalizing the RACI Matrix, validate:

- [ ] Every activity has exactly ONE Accountable (A)
- [ ] Every activity has at least ONE Responsible (R)
- [ ] No activity has more than 4 Consulted (C) to avoid bottlenecks
- [ ] Critical activities have backup Responsible identified
- [ ] Escalation paths are clear for each Accountable role
- [ ] All role holders have reviewed and agreed to their assignments

## 6.2 Common Issues to Avoid

| Issue | Example | Correction |
|-------|---------|------------|
| **Multiple Accountables** | Two people marked 'A' for same task | Select single owner |
| **No Responsible** | Only 'A' and 'I' for a task | Add 'R' for who does the work |
| **Too Many Consulted** | 6+ 'C' for a simple task | Reduce to essential input providers |
| **Accountable Not Responsible** | 'A' with no 'R' | Accountable should also be Responsible or delegate |
| **Missing Informed** | Key stakeholders not in 'I' | Add stakeholders who need visibility |

---

# 7. MATRIX MAINTENANCE

## 7.1 Update Triggers

Update the RACI Matrix when:
- New activities are added to project scope
- Team members change roles or leave
- Organizational structure changes
- New stakeholders are identified
- Process improvements are implemented
- Phase transitions occur

## 7.2 Review Schedule

| Review | Frequency | Owner | Participants |
|--------|-----------|-------|--------------|
| **Operational Review** | Monthly | Project Manager | Team Leads |
| **Phase Transition Review** | Per phase | Project Manager | All stakeholders |
| **Major Change Review** | As needed | Project Manager | Affected parties |

## 7.3 Change Process

1. **Identify:** Need for RACI change identified
2. **Propose:** Project Manager proposes changes
3. **Review:** Affected parties review proposed changes
4. **Approve:** Accountable parties approve changes
5. **Communicate:** Updated matrix distributed to all stakeholders
6. **Version:** Update version history

---

# 8. APPENDICES

## Appendix A: RACI Matrix Summary by Role

### Executive Sponsor (ES)
**Accountable For:**
- Strategic decisions
- Budget authorization
- Phase gate approvals
- Final acceptance

**Responsible For:**
- Executive sponsorship
- Barrier removal

**Consulted On:**
- Major scope changes
- Risk escalations

**Informed On:**
- Status reports
- Phase completions

### Product Owner (PO)
**Accountable For:**
- Requirements definition
- Prioritization
- Acceptance criteria
- UAT

**Responsible For:**
- Requirements documentation
- Stakeholder communication
- Demo participation

**Consulted On:**
- Design decisions
- Technical approach

**Informed On:**
- Technical implementation
- Testing results

### Vantus Project Lead (PM-V)
**Accountable For:**
- Project delivery
- Status reporting
- Risk management
- Change control

**Responsible For:**
- Project planning
- Coordination
- Escalation management

**Consulted On:**
- Technical decisions
- Resource allocation

**Informed On:**
- All major activities

---

*End of RACI Matrix*

**Document Owner:** [[PROJECT_MANAGER]]  
**Last Updated:** [[DATE]]  
**Next Review:** [[DATE]]


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
