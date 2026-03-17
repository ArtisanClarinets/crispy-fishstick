---
Document: FAQ
Doc ID: VS-TEMPLATE-ENABLE-005
Client: [[CLIENT_NAME]]
Project: [[PROJECT_NAME]]
Owner: Delivery Lead
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: docs/08_enablement/05_FAQ.md
---

# Frequently Asked Questions (FAQ)

**Project:** [[PROJECT_NAME]]  
**Client:** [[CLIENT_NAME]]  
**Last Updated:** [[DATE]]  
**Maintained By:** [[CLIENT_TEAM]] & Vantus Systems  
**Next Review Date:** [[REVIEW_DATE]]  

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | [[DATE]] | [[AUTHOR]] | Initial release |

### Review & Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Client Knowledge Manager | [[CLIENT_KM]] | _________________ | _______ |
| Vantus Support Lead | [[VANTUS_SUPPORT]] | _________________ | _______ |

---

## How to Use This FAQ

- **Search:** Use Ctrl+F (Cmd+F on Mac) to search for keywords
- **Categories:** Questions are organized by topic area
- **Updates:** This document is updated continuously based on new questions
- **Contributing:** Add new questions at the bottom of the relevant section

---

## TECHNICAL QUESTIONS

### Development

#### Q: How do I add a new page to the application?

**A:** Follow the FSD (Feature-Sliced Design) structure:

```
1. Create: src/app/[new-route]/page.tsx as a Server Component
2. Add to sitemap: docs/website-planning/docs/02-sitemap-and-urls.md
3. Create page spec: docs/website-planning/docs/page-specs/[name].md
4. Build & test: npm run build && npm run dev
5. Add navigation link in appropriate menu component
```

**Video Tutorial:** [Adding New Pages]([[VIDEO_URL_NEW_PAGE]]) (15 min)

**Related:** See FSD documentation in `/docs/04_architecture/`

---

#### Q: How do I create a new API endpoint?

**A:** In Next.js App Router, use Server Actions or Route Handlers:

**Option 1: Server Action (Recommended for mutations)**
```typescript
// src/features/myFeature/actions.ts
'use server';

export async function createItem(data: ItemInput) {
  // Validation
  const validated = itemSchema.parse(data);
  
  // Database operation
  const result = await db.item.create({ data: validated });
  
  return result;
}
```

**Option 2: Route Handler (For REST APIs)**
```typescript
// src/app/api/items/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const items = await db.item.findMany();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const data = await request.json();
  const item = await db.item.create({ data });
  return NextResponse.json(item, { status: 201 });
}
```

**Knowledge Check:**
1. When should you use a Server Action vs Route Handler?
2. Where should validation logic be placed?

---

#### Q: How do I deploy a change?

**A:** 

```bash
# 1. Create a feature branch
git checkout -b feature/my-feature

# 2. Make changes and commit
git add .
git commit -m "feat: add new feature"

# 3. Push and create pull request
git push origin feature/my-feature

# 4. After code review and approval, merge to main
# GitHub Actions automatically triggers build

# 5. If build passes, staging is auto-deployed
# Monitor: [[STAGING_URL]]

# 6. Request production deployment via #deployments channel
# Change goes live in < 5 minutes after approval
```

**Video Tutorial:** [Deployment Workflow]([[VIDEO_URL_DEPLOY]]) (20 min)

---

#### Q: How do I debug a performance issue?

**A:** Follow this systematic approach:

**Step 1: Measure**
```bash
# Build for production analysis
npm run build

# Run Lighthouse audit
npm run lighthouse

# Check bundle size
npm run analyze
```

**Step 2: Identify**
- Check `.next/` bundle size and component render times
- Review Core Web Vitals in browser DevTools
- Analyze database query performance
- Check for memory leaks

**Step 3: Optimize**
- Use `next/dynamic` for code splitting
- Use `next/image` for image optimization
- Implement caching strategies
- Optimize database queries and add indexes

**Step 4: Verify**
- Re-run Lighthouse to confirm improvement
- Monitor real-user metrics (RUM)
- A/B test changes if significant

**Video Tutorial:** [Performance Debugging]([[VIDEO_URL_PERF_DEBUG]]) (30 min)

**Knowledge Check:**
1. What are the three Core Web Vitals?
2. What tool analyzes bundle size?

---

#### Q: What happens if a secret is leaked?

**A:** Act immediately following this procedure:

**Immediate Actions (within 15 minutes):**
1. Identify the leaked secret and its scope
2. Rotate the secret immediately: `./scripts/admin/rotate-secrets.sh`
3. Audit access logs: `./scripts/admin/audit-secret-access.sh`
4. Document the incident in `/logs/security-incidents/`

**Within 1 Hour:**
5. Review what data/systems the secret could access
6. Check for unauthorized access in logs
7. Notify security team: [[SECURITY_CONTACT]]

**Within 24 Hours:**
8. Complete incident report
9. Implement preventive measures
10. Review secret management practices

**Video Tutorial:** [Incident Response: Secret Leak]([[VIDEO_URL_SECRET_LEAK]]) (25 min)

---

### Operations

#### Q: What should I do if the system is down?

**A:** Follow the incident response procedure:

**Immediate (0-5 minutes):**
1. Check status page: [[STATUS_PAGE_URL]]
2. Verify it's not a local network issue
3. Check monitoring dashboard for alerts

**Short-term (5-15 minutes):**
4. If confirmed down, declare incident
5. Follow Incident Response runbook
6. Check recent deployments or changes
7. Review infrastructure metrics

**Escalation (15+ minutes):**
8. If unable to resolve in 15 minutes, escalate to on-call
9. Contact Vantus emergency hotline if needed: [[EMERGENCY_PHONE]]
10. Communicate status to stakeholders

**Video Tutorial:** [System Down Response]([[VIDEO_URL_DOWN_RESPONSE]]) (20 min)

---

#### Q: How do I report a bug?

**A:** 

**For Regular Bugs:**
1. Create an issue in GitHub with:
   - [ ] Clear title and description
   - [ ] Steps to reproduce
   - [ ] Expected vs actual behavior
   - [ ] Screenshots (if applicable)
   - [ ] Browser/environment info
   - [ ] Severity assessment

2. Label as "bug" and assign to tech lead
3. Add to sprint if critical

**For Security Bugs:**
1. **DO NOT** create a public issue
2. Email security team: [[SECURITY_EMAIL]]
3. Include vulnerability details
4. Allow 48 hours for initial response

**Bug Report Template:**
```markdown
## Bug Description
[Clear description]

## Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- Browser: [e.g., Chrome 120]
- OS: [e.g., macOS 14.2]
- Version: [e.g., v2.3.1]

## Screenshots
[If applicable]

## Severity
[Low/Medium/High/Critical]
```

---

#### Q: How often should I backup the database?

**A:** 

**Automated Backups:**
- Frequency: Daily at 02:00 UTC
- Retention: 30 days
- Storage: Encrypted, geographically distributed

**Manual Backups (Required Before):**
- Major deployments
- Schema migrations
- Bulk data operations
- Infrastructure changes

**Command:**
```bash
./scripts/admin/backup-db.sh --environment=production --tag="pre-change-$(date +%Y%m%d)"
```

**Backup Verification:**
- Automated verification runs daily
- Manual verification monthly
- Test restore quarterly

**Video Tutorial:** [Backup Procedures]([[VIDEO_URL_BACKUP]]) (15 min)

---

#### Q: How do I access logs?

**A:** Multiple options available:

**Option 1: Centralized Logging Dashboard**
- URL: [[LOGGING_DASHBOARD_URL]]
- Search, filter, and visualize logs
- Real-time log streaming

**Option 2: Command Line**
```bash
# View recent application logs
./scripts/view-logs.sh --service=app --tail=100

# Search for specific errors
./scripts/view-logs.sh --service=app --grep="ERROR" --duration=1h

# Export logs for analysis
./scripts/export-logs.sh --start="2026-01-01" --end="2026-01-31" --output=logs.csv
```

**Option 3: Direct Server Access (Admin only)**
```bash
# Application logs
ssh [[SERVER]] 'tail -f /var/log/app/application.log'

# System logs
ssh [[SERVER]] 'journalctl -u [[SERVICE]] -f'
```

**Log Retention:**
- Application logs: 90 days
- Security logs: 1 year
- Audit logs: 7 years

---

### Infrastructure

#### Q: How do I scale the application?

**A:** 

**Horizontal Scaling (Recommended):**
```bash
# Kubernetes
kubectl scale deployment [[APP_NAME]] --replicas=5 --namespace=production

# Verify scaling
kubectl get pods --namespace=production
```

**Vertical Scaling:**
```bash
# Increase resource limits
kubectl set resources deployment [[APP_NAME]] \
  --limits=cpu=2000m,memory=4Gi \
  --requests=cpu=1000m,memory=2Gi \
  --namespace=production
```

**Auto-scaling:**
```bash
# Enable HPA (Horizontal Pod Autoscaler)
kubectl autoscale deployment [[APP_NAME]] \
  --min=3 --max=10 \
  --cpu-percent=70 \
  --namespace=production
```

**When to Scale:**
- CPU consistently > 70%
- Memory consistently > 80%
- Response times degrading
- Error rates increasing

**Video Tutorial:** [Scaling Strategies]([[VIDEO_URL_SCALING]]) (25 min)

---

#### Q: How do I check system health?

**A:** 

**Quick Health Check:**
```bash
./scripts/health-check.sh
```

**Dashboard Monitoring:**
- Application Health: [[HEALTH_DASHBOARD_URL]]
- Infrastructure: [[INFRA_DASHBOARD_URL]]
- Errors: [[ERROR_DASHBOARD_URL]]

**Key Health Indicators:**

| Indicator | Healthy | Warning | Critical |
|-----------|---------|---------|----------|
| Uptime | > 99.9% | 99-99.9% | < 99% |
| Error Rate | < 1% | 1-5% | > 5% |
| Response Time (p95) | < 500ms | 500ms-1s | > 1s |
| CPU Usage | < 70% | 70-90% | > 90% |
| Memory Usage | < 80% | 80-95% | > 95% |
| Disk Usage | < 80% | 80-90% | > 90% |

**Automated Alerts:**
- Configured for all critical indicators
- Sent to [[ALERT_CHANNEL]]
- PagerDuty integration for P0/P1

---

## BUSINESS QUESTIONS

#### Q: What is the cost of running this system?

**A:** See `/docs/cost-analysis.md` for detailed breakdown.

**Typical Monthly Costs:**

| Category | Low Range | High Range | Notes |
|----------|-----------|------------|-------|
| Compute | $[[LOW]] | $[[HIGH]] | Based on usage |
| Database | $[[LOW]] | $[[HIGH]] | Includes backups |
| Storage | $[[LOW]] | $[[HIGH]] | CDN included |
| Monitoring | $[[LOW]] | $[[HIGH]] | Per seat |
| **Total** | **$[[TOTAL_LOW]]** | **$[[TOTAL_HIGH]]** | |

**Cost Optimization Tips:**
- Use reserved instances for predictable workloads
- Implement auto-scaling for variable loads
- Review storage lifecycle policies
- Monitor and optimize database queries

---

#### Q: Can we migrate to a different cloud provider?

**A:** Yes. The system is designed for host independence.

**Migration Checklist:** `/docs/migration-guide.md`

**Key Considerations:**
1. **Data Migration:** PostgreSQL dump/restore
2. **Storage Migration:** S3-compatible transfer
3. **DNS Updates:** TTL planning for cutover
4. **Testing:** Full regression test in new environment
5. **Rollback Plan:** Keep old environment until verified

**Estimated Migration Time:** 2-4 weeks

**Video Tutorial:** [Cloud Migration Guide]([[VIDEO_URL_MIGRATION]]) (45 min)

---

#### Q: What happens after the Vantus engagement ends?

**A:** You become the full operator with complete full ownership.

**What You Receive:**
- Complete source code ownership
- All documentation and runbooks
- Full infrastructure control
- Training and certification
- 30-day warranty period

**What Changes:**
- No more Vantus day-to-day involvement
- You manage all operations
- You control all vendor relationships
- You make all architectural decisions

**What Stays:**
- 30-day warranty for critical issues
- Documentation remains current
- Your team has full capability

**Optional:** Extended support contract available

---

#### Q: How do we request new features?

**A:** Post-handoff feature development options:

**Option 1: Internal Development**
- Your team develops using training received
- Follow established patterns and ADR process
- No external dependencies

**Option 2: Re-engage Vantus**
- New Statement of Work (SOW) required
- Scope, timeline, and cost defined
- Standard development process

**Option 3: Other Vendors**
- System is vendor-agnostic
- Any qualified developer can work on it
- Documentation enables smooth handoff

**Feature Request Process:**
1. Document requirements
2. Assess internal capability
3. Decide: build vs buy vs contract
4. Execute development
5. Follow deployment procedures

---

## SECURITY QUESTIONS

#### Q: How are secrets managed?

**A:** Defense in depth approach:

**Storage:**
- Never in source code
- Production secrets via environment variables
- Encrypted at rest (AES-256)
- Access audit logging enabled

**Rotation:**
- Quarterly minimum
- Immediate if compromise suspected
- Automated where possible

**Access Control:**
- Role-based access
- MFA required for all admin access
- Principle of least privilege
- Regular access reviews

**Video Tutorial:** [Secret Management]([[VIDEO_URL_SECRETS]]) (30 min)

---

#### Q: Is the application SOC2 compliant?

**A:** Yes.

**Compliance Status:**
- **Current:** SOC 2 Type II certified
- **Last Audit:** [[AUDIT_DATE]]
- **Next Audit:** [[NEXT_AUDIT_DATE]]
- **Scope:** Security, Availability, Confidentiality

**Other Certifications:**
- ISO 27001 (if applicable)
- GDPR compliant
- HIPAA eligible (if applicable)

**Audit Reports:** Available upon request to [[COMPLIANCE_CONTACT]]

---

#### Q: What encryption is used?

**A:** Multiple layers of encryption:

**Data at Rest:**
- Database: AES-256
- File Storage: AES-256
- Backups: AES-256 with separate keys

**Data in Transit:**
- TLS 1.3 for all connections
- Perfect Forward Secrecy (PFS)
- HSTS enabled

**Key Management:**
- Keys managed by [[KMS_PROVIDER]]
- Automatic key rotation
- Hardware Security Modules (HSM)

---

#### Q: Who has access to our data?

**A:** Strict access controls:

**Authorized Personnel:**
- Client team: Full access per RBAC
- Vantus (during engagement): Limited, logged, temporary
- Third parties: None without explicit consent

**Access Logging:**
- All access logged and audited
- 90-day retention minimum
- Regular access reviews

**Data Residency:**
- Primary: [[PRIMARY_REGION]]
- Backup: [[BACKUP_REGION]]
- No unauthorized cross-border transfer

---

## TRAINING QUESTIONS

#### Q: Where can I find training materials?

**A:** Multiple resources available:

**Documentation:**
- Training Plan: `/docs/08_enablement/03_TRAINING_PLAN.md`
- Owner Guide: `/docs/08_enablement/01_OWNER_OPERATOR_GUIDE.md`
- Admin Runbook: `/docs/08_enablement/02_ADMIN_RUNBOOK.md`

**Video Tutorials:**
- Full playlist: [[VIDEO_PLAYLIST_URL]]
- Individual videos referenced throughout docs

**Hands-on Exercises:**
- Solutions: `/docs/08_enablement/training-exercise-solutions/`
- Practice environments available

**Office Hours:**
- Schedule: [[BOOKING_LINK]]
- 30 days post-training included

---

#### Q: How do I get certified?

**A:** Certification process:

**Prerequisites:**
- Complete 4-day training program
- Pass all hands-on exercises
- Study documentation

**Exam:**
- 50 multiple-choice questions
- 60-minute time limit
- 80% passing score (40/50)
- One retake allowed

**Certification Benefits:**
- Validates operational competency
- Required for on-call rotation
- Professional development record

**Schedule Exam:** Contact [[TRAINING_COORDINATOR]]

---

## SUPPORT QUESTIONS

#### Q: How do I contact support?

**A:** Multiple channels available:

**During Warranty (30 days):**
- Emergency Hotline: [[EMERGENCY_PHONE]] (24/7)
- Email: [[SUPPORT_EMAIL]] (4-hour response)
- Office Hours: [[BOOKING_LINK]] (2 hrs/day)

**Post-Warranty:**
- Documentation: `/docs/` (self-service)
- Extended support: Contact [[SALES_CONTACT]]
- Community: [[COMMUNITY_FORUM]]

**Before Contacting:**
1. Check this FAQ
2. Review runbooks
3. Search documentation
4. Check known issues list

---

#### Q: What is covered under warranty?

**A:** 30-day warranty terms:

**Covered:**
- Critical bug fixes (P0/P1)
- Issues in delivered code
- Documentation corrections

**Not Covered:**
- New feature requests
- Third-party API changes
- Infrastructure misconfigurations
- Data corruption from user error
- Security incidents from credential misuse

**Claim Process:**
1. Document the issue
2. Contact support with evidence
3. Vantus investigates within 24 hours
4. Fix delivered or workaround provided

---

## RECENTLY ADDED QUESTIONS

*This section contains questions added since the last review.*

#### Q: [New Question Template]

**A:** [Answer template]

**Added:** [[DATE]]  
**Asked By:** [[NAME]]  

---

## CONTRIBUTE TO THIS FAQ

Found a question not answered here?

1. **Check existing sections** - it might be there
2. **Ask your question** - Contact [[SUPPORT_EMAIL]]
3. **We'll add it** - New Q&As added within 24 hours
4. **Help others** - Your question helps improve the documentation

---

## AMENDMENT HISTORY

| Date | Question Added | Category | Added By |
|------|---------------|----------|----------|
| [[DATE]] | Initial FAQ creation | All | [[AUTHOR]] |

---

[End of FAQ]
