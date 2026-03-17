---
Document: TRAINING_PLAN
Doc ID: VS-TEMPLATE-ENABLE-003
Client: [[CLIENT_NAME]]
Project: [[PROJECT_NAME]]
Owner: Delivery Lead
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/08_enablement/03_TRAINING_PLAN.md
---

# Knowledge Transfer & Training Plan

**Project:** [[PROJECT_NAME]]  
**Client:** [[CLIENT_NAME]]  
**Target Audience:** Client Engineering Team (3–5 people)  
**Duration:** 4 full days (32 hours)  
**Delivery Method:** In-person or virtual instructor-led  
**Prerequisites:** See Section 1  

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | [[DATE]] | [[AUTHOR]] | Initial release |

### Review & Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Client Training Coordinator | [[CLIENT_TRAINING_COORD]] | _________________ | _______ |
| Vantus Training Lead | [[VANTUS_TRAINER]] | _________________ | _______ |
| Client Engineering Manager | [[CLIENT_ENG_MGR]] | _________________ | _______ |

---

## 1. PRE-TRAINING REQUIREMENTS

### 1.1 Participant Prerequisites

Before the training week, participants must complete:

| Task | Duration | Resource Location | Verification |
|------|----------|-------------------|--------------|
| Review Requirements Spec | 2 hours | `/docs/03_discovery/04_REQUIREMENTS_SPEC.md` | Quiz |
| Review Architecture Overview | 2 hours | `/docs/04_architecture/01_ARCHITECTURE_OVERVIEW.md` | Quiz |
| Set up local dev environment | 1 hour | See setup guide below | Demo |
| Complete security awareness training | 30 min | [[SECURITY_TRAINING_URL]] | Certificate |

### 1.2 Local Environment Setup

```bash
# Clone repository
git clone [[REPO_URL]]
cd [[PROJECT_NAME]]

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Configure local environment (ask trainer for values)
nano .env.local

# Start development server
npm run dev

# Verify setup
npm run typecheck
npm run lint
npm run test
```

**Setup Verification Checklist:**
- [ ] Repository cloned successfully
- [ ] Dependencies installed without errors
- [ ] Dev server starts on port 3000
- [ ] TypeScript compilation passes
- [ ] Linting passes
- [ ] Tests execute successfully

### 1.3 Required Access

Participants must have access to:
- [ ] Source code repository (read access)
- [ ] Staging environment (read/write access)
- [ ] Documentation repository
- [ ] Training materials (shared drive)
- [ ] Communication channels (Slack/Teams)

---

## 2. TRAINING CURRICULUM

### 2.1 Learning Objectives

By the end of this training, participants will be able to:

1. **Architecture Understanding:** Explain the system architecture using C4 diagrams
2. **Code Navigation:** Locate and modify code following FSD principles
3. **Operations:** Execute common operational tasks independently
4. **Incident Response:** Respond to and resolve common incidents
5. **Deployment:** Deploy changes through CI/CD pipeline
6. **Development:** Add new features following project conventions

### 2.2 Training Schedule Overview

| Day | Theme | Hours | Key Topics |
|-----|-------|-------|------------|
| Day 1 | Architecture & Codebase | 8 hrs | System design, FSD, database, auth |
| Day 2 | Operations & Runbooks | 8 hrs | Incident response, backups, monitoring |
| Day 3 | Deployment & CI/CD | 8 hrs | Pipeline, deployments, rollback |
| Day 4 | Development & Maintenance | 8 hrs | Feature development, testing, optimization |

---

## 3. DAY-BY-DAY CURRICULUM

### Day 1: Architecture & Codebase Deep-Dive

**Objective:** Understand the system design and code organization

#### Session 1: System Architecture Walk-Through (90 min)

**Time:** 09:00–10:30  
**Format:** Presentation + Q&A  
**Instructor:** Lead Architect

**Topics:**
- C4 Model overview (Context, Containers, Components, Code)
- High-level system architecture
- Technology stack rationale
- Integration points and external dependencies
- Scalability and performance characteristics

**Video Tutorial:** [Architecture Overview]([[VIDEO_URL_ARCH_OVERVIEW]]) (45 min)

**Hands-on Exercise 1.1:**
> **Exercise:** Draw the system architecture from memory. Include all major components and their interactions. Compare with the official architecture diagram and identify any gaps in understanding.

**Knowledge Check 1.1:**
1. What are the four levels of the C4 Model?
2. Name three external integrations and their purposes.
3. What is the primary database technology?
4. How does the frontend communicate with the backend?

---

#### Session 2: Feature-Sliced Design (FSD) Code Tour (75 min)

**Time:** 10:45–12:00  
**Format:** Live coding walkthrough  
**Instructor:** Senior Developer

**Topics:**
- FSD layer structure (app, pages, widgets, features, entities, shared)
- Import rules and dependencies
- File naming conventions
- Code organization examples

**Video Tutorial:** [FSD Code Tour]([[VIDEO_URL_FSD]]) (30 min)

**Hands-on Exercise 1.2:**
> **Exercise:** Navigate to three different features in the codebase. For each, identify:
> - Which FSD layer it belongs to
> - What other layers it imports from
> - Whether it follows FSD import rules

**Knowledge Check 1.2:**
1. Which layer can import from any other layer?
2. Can a `feature` import from another `feature`?
3. What belongs in the `shared` layer?
4. Where would you place a new user profile page?

---

#### Session 3: Database Schema and Prisma ORM (90 min)

**Time:** 13:00–14:30  
**Format:** Interactive workshop  
**Instructor:** Database Lead

**Topics:**
- Database schema overview
- Entity-Relationship Diagram (ERD)
- Prisma schema file structure
- Common queries and mutations
- Migration procedures

**Video Tutorial:** [Database & Prisma]([[VIDEO_URL_DATABASE]]) (40 min)

**Hands-on Exercise 1.3:**
> **Exercise:** 
> 1. Open the Prisma schema file
> 2. Identify three entities and their relationships
> 3. Write a Prisma query to fetch a user with their related orders
> 4. Create a migration for a new "ProductReview" table

**Knowledge Check 1.3:**
1. What file contains the database schema definition?
2. What command generates a new migration?
3. How do you apply migrations to the database?
4. What is the purpose of the `@relation` attribute?

---

#### Session 4: Server Actions and Authentication Flow (75 min)

**Time:** 14:45–16:00  
**Format:** Code review + hands-on  
**Instructor:** Security Lead

**Topics:**
- Next.js Server Actions architecture
- Authentication flow (BetterAuth)
- Authorization and RBAC
- Session management
- Security best practices

**Video Tutorial:** [Auth & Server Actions]([[VIDEO_URL_AUTH]]) (35 min)

**Hands-on Exercise 1.4:**
> **Exercise:** 
> 1. Trace the login flow from UI to database
> 2. Identify where session tokens are generated
> 3. Add a new protected Server Action that requires admin role
> 4. Test the authorization check

**Knowledge Check 1.4:**
1. What is a Server Action in Next.js?
2. Where are authentication credentials stored?
3. How is role-based access control implemented?
4. What is the session timeout duration?

---

### Day 2: Operations & Runbooks

**Objective:** Achieve operational independence

#### Session 5: Incident Response (90 min)

**Time:** 09:00–10:30  
**Format:** Simulation drill  
**Instructor:** DevOps Lead

**Topics:**
- Incident classification (P0, P1, P2, P3)
- Incident response workflow
- Communication protocols
- Escalation procedures
- Post-incident activities

**Video Tutorial:** [Incident Response]([[VIDEO_URL_INCIDENT]]) (40 min)

**Hands-on Exercise 2.1 (The Drill):**
> **Exercise:** Participate in a simulated P1 incident. The trainer will inject a failure into the staging environment. Your team must:
> 1. Detect the incident through monitoring
> 2. Classify the severity
> 3. Execute the incident response runbook
> 4. Communicate status updates
> 5. Resolve the issue
> 6. Document the post-incident report

**Knowledge Check 2.1:**
1. What is the response time target for a P0 incident?
2. Who is responsible for stakeholder communication?
3. What information should be in the initial incident notification?
4. What are the five phases of incident response?

---

#### Session 6: Backup and Disaster Recovery (75 min)

**Time:** 10:45–12:00  
**Format:** Hands-on lab  
**Instructor:** Infrastructure Lead

**Topics:**
- Backup strategy and schedules
- Backup verification procedures
- Disaster recovery runbook
- RTO and RPO objectives
- Failover procedures

**Video Tutorial:** [Backup & DR]([[VIDEO_URL_BACKUP_DR]]) (35 min)

**Hands-on Exercise 2.2:**
> **Exercise:** 
> 1. Create a manual database backup
> 2. Verify the backup integrity
> 3. Restore the backup to a temporary database
> 4. Verify data consistency
> 5. Document the recovery time

**Knowledge Check 2.2:**
1. What is the RTO for this system?
2. What is the RPO for this system?
3. How often are automated backups performed?
4. What command verifies backup integrity?

---

#### Session 7: Monitoring Dashboard Walk-Through (90 min)

**Time:** 13:00–14:30  
**Format:** Interactive demo  
**Instructor:** Observability Lead

**Topics:**
- Monitoring architecture
- Dashboard navigation
- Key metrics interpretation
- Alert configuration
- Log analysis techniques

**Video Tutorial:** [Monitoring & Observability]([[VIDEO_URL_MONITORING]]) (45 min)

**Hands-on Exercise 2.3:**
> **Exercise:** 
> 1. Access the monitoring dashboard
> 2. Identify the four Golden Signals
> 3. Create a custom dashboard widget
> 4. Set up an alert for high error rates
> 5. Query logs for a specific error pattern

**Knowledge Check 2.3:**
1. What are the four Golden Signals?
2. What is the target latency for p95 requests?
3. How do you filter logs by error level?
4. What tool is used for application performance monitoring?

---

#### Session 8: On-Call Rotation Setup (75 min)

**Time:** 14:45–16:00  
**Format:** Workshop  
**Instructor:** Operations Lead

**Topics:**
- On-call responsibilities
- Rotation scheduling
- Escalation procedures
- Runbook access
- Post-incident handoff

**Video Tutorial:** [On-Call Best Practices]([[VIDEO_URL_ONCALL]]) (25 min)

**Hands-on Exercise 2.4:**
> **Exercise:** 
> 1. Set up your on-call notification preferences
> 2. Review and bookmark all critical runbooks
> 3. Practice the escalation procedure
> 4. Create a personal on-call cheat sheet

**Knowledge Check 2.4:**
1. What is the primary on-call communication channel?
2. How do you escalate an unresolved incident?
3. What information should be in the incident handoff?
4. How often should on-call rotations change?

---

### Day 3: Deployment & CI/CD

**Objective:** Master the deployment pipeline

#### Session 9: CI/CD Pipeline Architecture (90 min)

**Time:** 09:00–10:30  
**Format:** Architecture review  
**Instructor:** DevOps Architect

**Topics:**
- Pipeline stages and gates
- Automated testing strategy
- Build optimization
- Artifact management
- Pipeline security

**Video Tutorial:** [CI/CD Pipeline]([[VIDEO_URL_CICD]]) (40 min)

**Hands-on Exercise 3.1:**
> **Exercise:** 
> 1. Trace a commit from push to production
> 2. Identify all quality gates
> 3. Review a failed pipeline and identify the cause
> 4. Re-run a failed job successfully

**Knowledge Check 3.1:**
1. What triggers the CI/CD pipeline?
2. How many stages are in the deployment pipeline?
3. What happens if e2e tests fail?
4. Where are build artifacts stored?

---

#### Session 10: Hands-On: Deploy to Staging (75 min)

**Time:** 10:45–12:00  
**Format:** Guided deployment  
**Instructor:** Release Manager

**Topics:**
- Staging environment purpose
- Deployment procedures
- Smoke testing
- Rollback procedures

**Video Tutorial:** [Staging Deployment]([[VIDEO_URL_STAGING_DEPLOY]]) (30 min)

**Hands-on Exercise 3.2:**
> **Exercise:** 
> 1. Create a feature branch with a small change
> 2. Open a pull request
> 3. Merge to main after approval
> 4. Monitor the automated staging deployment
> 5. Verify the change in staging
> 6. Run smoke tests

**Knowledge Check 3.2:**
1. What branch triggers staging deployment?
2. How long does a typical staging deployment take?
3. What tests run automatically on staging?
4. How do you access the staging environment?

---

#### Session 11: Blue-Green Deployment Strategy (90 min)

**Time:** 13:00–14:30  
**Format:** Live demonstration  
**Instructor:** Infrastructure Lead

**Topics:**
- Blue-green deployment concept
- Traffic switching mechanisms
- Zero-downtime deployments
- Rollback strategies

**Video Tutorial:** [Blue-Green Deployment]([[VIDEO_URL_BLUEGREEN]]) (35 min)

**Hands-on Exercise 3.3:**
> **Exercise:** 
> 1. Deploy a new version to the "green" environment
> 2. Run smoke tests on green
> 3. Switch 10% of traffic to green
> 4. Monitor for errors
> 5. Complete the traffic switch to 100%
> 6. Document the deployment time

**Knowledge Check 3.3:**
1. What is the advantage of blue-green deployment?
2. How is traffic switched between environments?
3. What is the rollback procedure?
4. How do you verify a deployment is successful?

---

#### Session 12: Rollback Procedures and Testing (75 min)

**Time:** 14:45–16:00  
**Format:** Practice drill  
**Instructor:** Site Reliability Engineer

**Topics:**
- When to rollback
- Rollback procedures
- Database rollback considerations
- Communication during rollback
- Post-rollback validation

**Video Tutorial:** [Rollback Procedures]([[VIDEO_URL_ROLLBACK]]) (30 min)

**Hands-on Exercise 3.4:**
> **Exercise:** 
> 1. Deploy a change with a known issue to staging
> 2. Detect the issue through monitoring
> 3. Execute the rollback procedure
> 4. Verify the rollback was successful
> 5. Document the incident

**Knowledge Check 3.4:**
1. When should you consider a rollback?
2. What is the first step in a rollback?
3. How do you handle database changes during rollback?
4. Who should be notified during a rollback?

---

### Day 4: Development & Maintenance

**Objective:** Prepare for independent development

#### Session 13: Adding New Features (90 min)

**Time:** 09:00–10:30  
**Format:** Code-along workshop  
**Instructor:** Senior Developer

**Topics:**
- Feature development workflow
- FSD compliance
- Component creation
- API integration
- Testing new features

**Video Tutorial:** [Feature Development]([[VIDEO_URL_FEATURE_DEV]]) (45 min)

**Hands-on Exercise 4.1:**
> **Exercise:** 
> 1. Create a new feature following FSD principles
> 2. Implement the UI component
> 3. Add the Server Action
> 4. Write unit tests
> 5. Write e2e tests
> 6. Deploy to staging and verify

**Knowledge Check 4.1:**
1. What is the first step when adding a new feature?
2. Where should UI components be placed?
3. What testing is required for new features?
4. How do you ensure FSD compliance?

---

#### Session 14: Writing Tests and ADRs (75 min)

**Time:** 10:45–12:00  
**Format:** Workshop  
**Instructor:** Tech Lead

**Topics:**
- Testing pyramid (unit, integration, e2e)
- Test-driven development
- Writing effective ADRs
- Documentation standards

**Video Tutorial:** [Testing & ADRs]([[VIDEO_URL_TESTING]]) (35 min)

**Hands-on Exercise 4.2:**
> **Exercise:** 
> 1. Write unit tests for a utility function
> 2. Write an integration test for an API endpoint
> 3. Write an ADR for a hypothetical architectural decision
> 4. Peer review another participant's ADR

**Knowledge Check 4.2:**
1. What are the three levels of the testing pyramid?
2. When should you write an ADR?
3. What sections must an ADR include?
4. What is the difference between unit and integration tests?

---

#### Session 15: Performance Optimization (90 min)

**Time:** 13:00–14:30  
**Format:** Interactive workshop  
**Instructor:** Performance Engineer

**Topics:**
- Performance metrics (Core Web Vitals)
- Profiling techniques
- Optimization strategies
- Caching implementation
- Bundle size optimization

**Video Tutorial:** [Performance Optimization]([[VIDEO_URL_PERFORMANCE]]) (40 min)

**Hands-on Exercise 4.3:**
> **Exercise:** 
> 1. Run a Lighthouse audit on the application
> 2. Identify the lowest-performing metric
> 3. Implement an optimization
> 4. Re-run the audit and measure improvement
> 5. Document the optimization technique

**Knowledge Check 4.3:**
1. What are the three Core Web Vitals?
2. What tool is used for bundle analysis?
3. How do you implement code splitting?
4. What is the target LCP value?

---

#### Session 16: Q&A and Knowledge Transfer Wrap-Up (75 min)

**Time:** 14:45–16:00  
**Format:** Open forum  
**Instructor:** All trainers

**Topics:**
- Open Q&A with all instructors
- Knowledge gaps identification
- Additional resources
- Post-training support overview
- Certification exam preparation

**Video Tutorial:** [Wrap-Up & Resources]([[VIDEO_URL_WRAPUP]]) (20 min)

**Hands-on Exercise 4.4:**
> **Exercise:** 
> 1. Complete the comprehensive knowledge check
> 2. Identify any remaining knowledge gaps
> 3. Create a personal learning plan
> 4. Schedule follow-up sessions if needed

---

## 4. POST-TRAINING VERIFICATION

### 4.1 The Independence Drill

48 hours after training completion, each participant must demonstrate:

| Task | Description | Success Criteria | Time Limit |
|------|-------------|------------------|------------|
| Deploy a Feature | Deploy a change from local to production | Zero Vantus assistance | 2 hours |
| Respond to Incident | Handle a simulated incident | Follow runbook correctly | 1 hour |
| Architecture Explanation | Explain the system to a new team member | Clear, accurate explanation | 30 min |

**Success Criteria:** All three tasks completed with < 1 hour of Vantus coaching total.

### 4.2 Certification Exam

**Format:** 50 questions, multiple choice  
**Time Limit:** 60 minutes  
**Passing Score:** 80% (40/50)  
**Retake Policy:** One retake allowed after 24 hours

**Exam Sections:**
1. Architecture (10 questions)
2. Code Organization (10 questions)
3. Operations (10 questions)
4. Deployment (10 questions)
5. Development (10 questions)

**Sample Questions:**
1. What is the primary purpose of the `entities` layer in FSD?
2. How do you rotate database credentials?
3. What is the target RTO for disaster recovery?
4. When should you write an ADR?
5. What command deploys to production?

---

## 5. ONGOING SUPPORT

### 5.1 Post-Training Support Window

**Duration:** 30 days from training completion

| Support Type | Availability | Response Time | Access Method |
|--------------|--------------|---------------|---------------|
| Office Hours | 2 hours/day | Real-time | Scheduled call |
| Email Support | Business hours | 4 hours | [[SUPPORT_EMAIL]] |
| Emergency Hotline | 24/7 | 15 minutes | [[EMERGENCY_PHONE]] |
| Documentation | 24/7 | Self-service | `/docs/` |

### 5.2 Office Hours Schedule

Office hours are Client-initiated only. Schedule via [[BOOKING_LINK]].

**Available Topics:**
- Clarification on training materials
- Guidance on specific tasks
- Code review (limited scope)
- Architecture questions

**Out of Scope:**
- New feature development
- Production incident resolution (use emergency hotline)
- Extended consulting engagements

### 5.3 FAQ Development

All questions asked during office hours will be:
1. Documented in the FAQ
2. Added to this training plan for future cohorts
3. Reviewed weekly for pattern analysis

---

## 6. TRAINING MATERIALS

### 6.1 Video Tutorial Library

| Video | Duration | Topics Covered | Prerequisites |
|-------|----------|----------------|---------------|
| Architecture Overview | 45 min | C4 Model, system design | None |
| FSD Code Tour | 30 min | Layer structure, conventions | None |
| Database & Prisma | 40 min | Schema, queries, migrations | Architecture Overview |
| Auth & Server Actions | 35 min | BetterAuth, RBAC, sessions | FSD Code Tour |
| Incident Response | 40 min | Classification, workflow, drill | None |
| Backup & DR | 35 min | Backups, RTO/RPO, recovery | None |
| Monitoring | 45 min | Dashboards, metrics, alerts | None |
| On-Call Practices | 25 min | Rotation, escalation, handoff | Incident Response |
| CI/CD Pipeline | 40 min | Stages, gates, security | None |
| Staging Deployment | 30 min | Procedures, testing | CI/CD Pipeline |
| Blue-Green Deployment | 35 min | Strategy, traffic switching | Staging Deployment |
| Rollback Procedures | 30 min | When, how, communication | Blue-Green Deployment |
| Feature Development | 45 min | Workflow, FSD compliance | FSD Code Tour |
| Testing & ADRs | 35 min | Pyramid, TDD, documentation | Feature Development |
| Performance Optimization | 40 min | Core Web Vitals, profiling | None |
| Wrap-Up & Resources | 20 min | Summary, next steps | All videos |

**Total Video Duration:** ~10 hours

### 6.2 Documentation References

- Architecture: `/docs/04_architecture/`
- Operations: `/docs/07_operations/`
- Runbooks: `/docs/07_operations/runbooks/`
- ADRs: `/docs/adr/`
- API Documentation: `/docs/api/`

### 6.3 Hands-on Exercise Solutions

Solutions and example answers for all hands-on exercises are available in:
`/docs/08_enablement/training-exercise-solutions/`

---

## 7. TRAINING SUCCESS METRICS

### 7.1 KPIs

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Completion Rate | 100% | Attendance tracking |
| Certification Pass Rate | 90% | Exam results |
| Independence Drill Success | 100% | Task completion verification |
| Satisfaction Score | 4.5/5 | Post-training survey |
| Time to First Independent Deploy | < 1 week | Deployment log review |

### 7.2 Success Criteria

Training is considered successful when:
- [ ] All participants complete all 4 training days
- [ ] All participants pass the certification exam
- [ ] All participants complete the Independence Drill
- [ ] Average satisfaction score is 4.0 or higher
- [ ] Zero critical knowledge gaps identified

---

## 8. CERTIFICATION OF COMPLETION

### Individual Certification

I certify that I have:
- [ ] Attended all 4 days of training
- [ ] Completed all hands-on exercises
- [ ] Passed the certification exam (score: ___/50)
- [ ] Completed the Independence Drill successfully
- [ ] Demonstrated proficiency in system operation

**Participant Name:** _________________________________  
**Participant Signature:** _________________________________  
**Date:** _________________________________  

### Training Completion Sign-Off

**Training Delivered By:**  
Vantus Trainer: _________________________________ Date: _______  

**Training Received By:**  
Client Representative: _________________________________ Date: _______  

**Approved By:**  
Client Engineering Manager: _________________________________ Date: _______  

---

## 9. AMENDMENT HISTORY

| Date | Section | Change Description | Approved By |
|------|---------|-------------------|-------------|
| [[DATE]] | - | Initial training plan creation | [[APPROVER]] |

---

[End of Training Plan]
