# Vantus Systems — Engagement Methodology

**Document ID:** VS-BUS-102  
**Version:** 2.1.0  
**Effective Date:** February 2, 2026  
**Applies to:** All client projects

---

## The Client Independence Lifecycle

Our process ensures predictable delivery, rigorous quality, and successful handoff. We call it the Client Independence Lifecycle because every phase builds toward your independence.

---

## Phase 1: Discovery & Constraints

**Goal:** Understand where you are, where you want to go, and what limits we face.

### Activities

- Interview stakeholders to understand business goals.
- Audit existing systems (what works, what does not, what is at risk).
- Define constraints (budget, timeline, compliance requirements).
- Identify the decision-maker who can approve trade-offs.

### Deliverables

- **Technical Discovery Document:** Current state, gaps, and opportunities.
- **Risk Register:** What could go wrong and how we will handle it.
- **Preliminary Scope:** What is in, what is out, and why.

### Exit Criteria

- Decision-maker identified and committed.
- Budget and timeline constraints documented.
- Risk register reviewed and accepted.

### Timeline

1–2 weeks for small projects. 3–4 weeks for complex engagements.

---

## Phase 2: Architecture & Planning

**Goal:** Design the future state before writing code.

### Activities

- Design system architecture (what components, how they connect).
- Select technology stack (what tools, why these tools).
- Define security posture (how we protect your data).
- Plan for operations (how you will run this after we leave).

### Deliverables

- **High-Level Design (HLD):** Architecture diagrams and component descriptions.
- **Architecture Decision Records (ADRs):** Why we chose each major approach.
- **Security Baseline:** How we meet the Vantus security standard.
- **Project Plan:** Milestones, dependencies, and resource needs.

### Governance Review

Before proceeding, we verify against:

- `../SECURITY/SECURITY_BASELINE.md` (security requirements)
- `../ENGINEERING/ARCHITECTURE_OVERVIEW.md` (architectural standards)
- `../ENGINEERING/QUALITY_BAR.md` (definition of done)

### Exit Criteria

- Architecture approved by Vantus lead and client decision-maker.
- Security approach validated.
- Project plan accepted with milestone dates.

### Timeline

2–3 weeks depending on complexity.

---

## Phase 3: Build & Verify

**Goal:** Incremental delivery with continuous quality checks.

### Activities

- Develop features in small, reviewable increments.
- Conduct automated testing (unit, integration, end-to-end).
- Perform security scanning with every code change.
- Demonstrate progress in weekly check-ins.

### Process

- **Sprints:** 1–2 week iterations with specific deliverables.
- **Pull Requests:** All code reviewed by at least one senior engineer.
- **Quality Gates:** Tests, linting, and security scans must pass.
- **Client Demos:** Weekly show-and-tell of completed work.

### Deliverables

- Working software at the end of each sprint.
- Updated documentation with each feature.
- Weekly "State of the Build" reports.

### Exit Criteria

- All features complete per the scope document.
- Test coverage meets the Quality Bar.
- Security scan passes with zero critical findings.
- Documentation is current and complete.

### Timeline

Varies by scope. Typically 4–12 weeks for standard projects.

---

## Phase 4: Deployment & Testing

**Goal:** Safe migration to production with proven rollback capability.

### Activities

- Deploy to staging environment (production mirror).
- Load testing to verify performance under stress.
- Security scanning of the production configuration.
- Disaster recovery drill (backup and restore test).
- User acceptance testing with real users.

### Deployment Options

| Approach       | Best For                  | Description                                     |
| -------------- | ------------------------- | ----------------------------------------------- |
| **Big Bang**   | Small systems, low risk   | All at once during maintenance window.          |
| **Blue-Green** | Medium systems, some risk | Two identical environments, instant switchover. |
| **Canary**     | Large systems, high risk  | Gradual rollout to subset of users.             |

### Safety Requirements

Every production deployment includes:

- Documented rollback plan (tested before deployment).
- Monitoring dashboards configured.
- Alert thresholds set.
- On-call rotation notified.

### Exit Criteria

- System live in production.
- Smoke tests passing.
- Rollback plan verified.
- Monitoring active and validated.

### Timeline

1–2 weeks including testing and validation.

---

## Phase 5: Handoff & Care

**Goal:** Your complete independence, with support if desired.

### Activities

- Transfer all credentials and access.
- Deliver the Owner Handoff Package (docs, runbooks, decision records).
- Train your team on operations (if requested).
- Optional: Transition to Vantus Care for ongoing support.

### The Owner Handoff Package

| Component                  | Purpose                                          |
| -------------------------- | ------------------------------------------------ |
| **Credential Vault**       | All passwords, keys, and tokens in your control. |
| **Architecture Guide**     | How the system is organized.                     |
| **Runbooks**               | How to perform common operations.                |
| **Decision Records**       | Why we built it this way.                        |
| **Disaster Recovery Plan** | How to recover from failure.                     |
| **Exit Strategy**          | How to transition to another vendor.             |

### Training Options

- **Self-service:** Documentation only (included).
- **Recorded walkthrough:** Video tour of the system (add-on).
- **Live training:** Hands-on sessions with your team (add-on).

### Vantus Care (Optional Ongoing Support)

For clients who want expert backup without full dependency:

- Monthly check-ins.
- Security patch management.
- Performance monitoring.
- Priority support queue.

See the Vantus Care program documentation for details.

### Exit Criteria

- Client confirms they can operate without us (Owner-Operability Test).
- All credentials transferred.
- Documentation accepted.
- Final invoice paid.

### Timeline

1 week for handoff. Optional training adds 1–2 weeks.

---

## Roles & Responsibilities

### Vantus Lead (Project Catalyst)

- Technical architecture and quality.
- Risk management and escalation.
- Ensuring all work meets the Vantus Quality Bar.

### Client Owner (Strategic Driver)

- Approval of scope and technical trade-offs.
- Providing access to existing systems.
- Connecting us with domain experts.
- Timely feedback and decisions.

### Client IT/Ops (Technical Guardian)

- Review of security posture.
- Integration with existing corporate systems.
- Long-term operations planning.

---

## Communication Rhythm

| Cadence         | Format                      | Participants     | Content                                 |
| --------------- | --------------------------- | ---------------- | --------------------------------------- |
| **Daily**       | Async standup (Slack/email) | Vantus team      | Blockers, progress, plans.              |
| **Weekly**      | Video call + written report | All stakeholders | Demo, risks, decisions, next steps.     |
| **Milestone**   | Formal review meeting       | Decision-makers  | Acceptance criteria, go/no-go.          |
| **Project End** | Retrospective + handoff     | All stakeholders | Lessons learned, Owner Handoff Package. |

---

## Success Metrics

A successful engagement meets all of these:

- Delivered on time (or with approved scope adjustments).
- Delivered on budget (or with approved change orders).
- Meets all acceptance criteria.
- Passes security review.
- Client can operate independently.
- Client would recommend us to a peer.

---

## Document Changelog

| Version | Date         | Changes                                                                                                                                                                                                           |
| ------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.0.0   | Feb 2, 2026  | Initial document                                                                                                                                                                                                  |
| 2.1.0   | Feb 21, 2026 | Terminology update: Replaced "Owner-Controlled Systems Lifecycle" with "Client Independence Lifecycle" and "Owner-Controlled Systems Bundle" with "Owner Handoff Package" to align with updated brand positioning |

---

**Questions about our process?** Contact: hello@vantus.systems

[End of Document VS-BUS-102]

## Sync Notes

- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
