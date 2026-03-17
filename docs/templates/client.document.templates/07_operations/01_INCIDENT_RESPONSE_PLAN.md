---
Document: INCIDENT_RESPONSE_PLAN
Doc ID: VS-TEMPLATE-OPS-001
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Security Lead / Incident Commander
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Source of Truth: [docs/07_operations/01_INCIDENT_RESPONSE_PLAN.md](docs/07_operations/01_INCIDENT_RESPONSE_PLAN.md)
---

# Incident Response Plan (IRP)

## 1. Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-02 | Security Lead | Initial template creation |

---

## 2. Introduction

### 2.1 Purpose
This Incident Response Plan (IRP) establishes the framework for detecting, responding to, and recovering from security incidents and operational disruptions affecting [PROJECT NAME]. This plan ensures coordinated, efficient, and effective incident management.

### 2.2 Scope
This plan applies to:
- All systems, networks, and data under [PROJECT NAME]
- All employees, contractors, and third-party vendors
- All security incidents regardless of source or vector
- All operational disruptions affecting service availability

### 2.3 Objectives
1. Minimize impact of incidents on business operations
2. Protect sensitive data and intellectual property
3. Maintain regulatory compliance during incidents
4. Preserve evidence for forensic analysis
5. Restore normal operations quickly and safely
6. Learn from incidents to improve defenses

### 2.4 Document Authority
This plan is reviewed and updated:
- **Quarterly:** Minor updates and contact verification
- **Annually:** Comprehensive review and tabletop exercise
- **Post-Incident:** After each significant incident (SEV 0-1)

---

## 3. Incident Classification

### 3.1 Severity Levels

| Level | Name | Response Time | Description | Examples |
|-------|------|---------------|-------------|----------|
| **SEV 0** | Critical | < 15 minutes | Complete system outage affecting all users; active security breach | Production down, data breach in progress, ransomware active |
| **SEV 1** | High | < 30 minutes | Major functionality impaired; significant security incident | Core feature broken, unauthorized access detected, major data leak |
| **SEV 2** | Medium | < 2 hours | Degraded performance; minor security incident | Slow response times, minor feature issues, suspicious activity |
| **SEV 3** | Low | Next business day | Minor issues; informational | Cosmetic bugs, non-urgent security alerts, documentation issues |
| **SEV 4** | Informational | N/A | No immediate action required | Monitoring alerts, trend analysis, capacity warnings |

### 3.2 Incident Categories

| Category | Description | Typical Severity |
|----------|-------------|------------------|
| **Availability** | Service downtime, performance degradation | SEV 0-2 |
| **Security** | Unauthorized access, data breach, malware | SEV 0-2 |
| **Data Integrity** | Data corruption, loss, or unauthorized modification | SEV 0-2 |
| **Compliance** | Regulatory violations, audit findings | SEV 1-3 |
| **Third-Party** | Issues with vendors or dependencies | SEV 1-3 |

### 3.3 Incident Classification Decision Tree

```
INCIDENT DETECTED
        │
        ├── Is production system completely down?
        │   ├── YES → SEV 0
        │   └── NO  → Is there active unauthorized access?
        │               │
        │               ├── YES → SEV 0
        │               └── NO  → Is core functionality impaired?
        │                           │
        │                           ├── YES → Is there a workaround?
        │                           │           ├── YES → SEV 2
        │                           │           └── NO  → SEV 1
        │                           └── NO  → Is there a security concern?
        │                                       ├── YES → SEV 2
        │                                       └── NO  → SEV 3
```

---

## 4. Incident Response Team Structure

### 4.1 Roles and Responsibilities

#### Incident Commander (IC)
**Responsibilities:**
- Overall incident management and coordination
- Resource allocation and priority setting
- Communication to stakeholders and executives
- Decision authority for all incident-related actions
- Ensures incident documentation is maintained

**Qualifications:** Senior engineer or manager with system-wide knowledge

#### Scribe
**Responsibilities:**
- Maintains incident timeline and log
- Records all actions taken and decisions made
- Documents evidence and artifacts
- Prepares post-incident reports

**Qualifications:** Detail-oriented team member, strong written communication

#### Communications Lead
**Responsibilities:**
- Manages internal and external communications
- Updates status pages and notification channels
- Coordinates with PR/legal for external messaging
- Ensures consistent messaging across all channels

**Qualifications:** Strong communication skills, calm under pressure

#### Technical Lead (Operations)
**Responsibilities:**
- Leads technical investigation and remediation
- Coordinates technical resources
- Implements containment and eradication measures
- Validates system recovery

**Qualifications:** Deep technical expertise, troubleshooting experience

#### Security Lead (for security incidents)
**Responsibilities:**
- Leads security investigation
- Coordinates forensics and evidence preservation
- Assesses scope of security impact
- Recommends security countermeasures

**Qualifications:** Security expertise, incident response training

#### Subject Matter Experts (SMEs)
**Responsibilities:**
- Provide domain expertise as needed
- Assist with specific system components
- Support technical investigation

### 4.2 On-Call Structure

| Tier | Role | Response Time | Escalation Path |
|------|------|---------------|-----------------|
| **Primary** | On-Call Engineer | 15 minutes | Secondary on-call |
| **Secondary** | Senior Engineer | 30 minutes | Engineering Manager |
| **Tertiary** | Engineering Manager | 1 hour | Director of Engineering |
| **Executive** | Director/VP | 2 hours | CTO |

---

## 5. Incident Response Lifecycle

### 5.1 Phase 1: Detection and Analysis

#### Detection Methods
| Method | Tool/Process | Owner |
|--------|--------------|-------|
| Automated Monitoring | Datadog/New Relic | SRE |
| Alerting | PagerDuty/Opsgenie | SRE |
| User Reports | Support tickets | Support |
| Security Tools | SIEM, IDS/IPS | Security |
| Log Analysis | ELK Stack, Splunk | Security |
| External Notifications | Bug bounty, third parties | Security |

#### Initial Assessment Checklist
- [ ] Confirm incident is real (not false positive)
- [ ] Classify severity level (SEV 0-4)
- [ ] Identify incident category
- [ ] Determine initial scope and impact
- [ ] Page appropriate responders
- [ ] Create incident channel/ticket
- [ ] Begin incident timeline

#### Analysis Questions
1. What systems are affected?
2. When did the incident begin?
3. What is the business impact?
4. Is customer data at risk?
5. Is the incident ongoing?
6. What is the apparent cause?

### 5.2 Phase 2: Containment

#### Immediate Containment (First 15 minutes)

**For Security Incidents:**
- [ ] Isolate affected systems (network segmentation)
- [ ] Disable compromised accounts
- [ ] Revoke suspicious access tokens
- [ ] Block malicious IP addresses
- [ ] Preserve evidence (memory dumps, logs)

**For Availability Incidents:**
- [ ] Enable circuit breakers
- [ ] Redirect traffic to healthy instances
- [ ] Scale up resources if capacity issue
- [ ] Enable maintenance mode if necessary

#### Short-term Containment (First hour)
- [ ] Implement temporary fixes
- [ ] Establish monitoring for affected systems
- [ ] Document all containment actions
- [ ] Assess containment effectiveness

#### Containment Decision Matrix

| Situation | Action | Authority |
|-----------|--------|-----------|
| Active data exfiltration | Immediate isolation | IC |
| Ransomware detected | Disconnect from network | IC |
| DDoS attack | Enable DDoS protection | Technical Lead |
| System compromise | Quarantine system | Security Lead |
| Cascading failure | Emergency circuit break | Technical Lead |

### 5.3 Phase 3: Eradication

#### Eradication Steps
1. **Identify Root Cause**
   - Analyze logs and system state
   - Correlate events across systems
   - Identify attack vector (security) or failure point (availability)

2. **Remove Threat/Malfunction**
   - Remove malware or backdoors (security)
   - Fix defective code or configuration
   - Patch vulnerabilities
   - Update security controls

3. **Validate Clean State**
   - Scan for persistence mechanisms
   - Verify system integrity
   - Confirm no residual threats

#### Eradication Verification Checklist
- [ ] Root cause identified and documented
- [ ] All affected systems cleaned/remediated
- [ ] Vulnerabilities patched
- [ ] Malware removed (if applicable)
- [ ] Unauthorized access eliminated
- [ ] Systems pass security scans

### 5.4 Phase 4: Recovery

#### Recovery Planning
- [ ] Define recovery sequence
- [ ] Identify dependencies
- [ ] Plan phased restoration
- [ ] Establish verification criteria
- [ ] Prepare rollback plan

#### Recovery Execution
| Step | Action | Verification | Owner |
|------|--------|--------------|-------|
| 1 | Restore from known-good backup | File integrity check | Technical Lead |
| 2 | Rebuild compromised systems | Clean OS image | Technical Lead |
| 3 | Reapply configurations | Config validation | Technical Lead |
| 4 | Restore services incrementally | Health checks | Technical Lead |
| 5 | Monitor for anomalies | Log analysis | SRE |
| 6 | Validate full functionality | Smoke tests | QA |

#### Recovery Verification
- [ ] All services operational
- [ ] Performance at baseline
- [ ] No error spikes
- [ ] Security monitoring active
- [ ] Backups current and validated

### 5.5 Phase 5: Post-Incident Activity

#### Post-Mortem Requirements
- **Timeline:** Within 48 hours for SEV 0-1, within 1 week for SEV 2
- **Attendees:** All incident responders, stakeholders
- **Output:** Post-mortem document (see [04_POSTMORTEM_TEMPLATE.md](04_POSTMORTEM_TEMPLATE.md))

#### Post-Mortem Agenda
1. Incident summary and timeline review
2. What went well
3. What could be improved
4. Root cause analysis (5 Whys)
5. Action items and owners
6. Follow-up schedule

#### Action Item Tracking
| ID | Action | Owner | Due Date | Status |
|----|--------|-------|----------|--------|
| [ID] | [Description] | [Name] | [Date] | ☐ Open ☐ In Progress ☐ Closed |

---

## 6. Communication Plan

### 6.1 Internal Communication

#### Communication Channels by Severity

| Severity | Slack Channel | Page | Email | War Room |
|----------|---------------|------|-------|----------|
| SEV 0 | #inc-critical | All on-call | Leadership | Yes |
| SEV 1 | #inc-high | Primary + Secondary | Stakeholders | Yes |
| SEV 2 | #inc-medium | Primary | Team | No |
| SEV 3 | #inc-low | No | No | No |

#### Communication Templates

**Initial Notification:**
```
🚨 INCIDENT DECLARED
Severity: [SEV X]
Status: [Investigating/Identified/Monitoring/Resolved]
Impact: [Brief description]
IC: [Name]
Channel: [Link]
ETA: [Estimated resolution or update time]
```

**Status Update:**
```
📊 INCIDENT UPDATE #[N]
Severity: [SEV X]
Status: [Current status]
Summary: [What we know]
Actions: [What we're doing]
Next Update: [Time]
```

**All Clear:**
```
✅ INCIDENT RESOLVED
Severity: [SEV X]
Duration: [X minutes/hours]
Resolution: [Brief description]
Post-mortem: [Scheduled for Date/Time]
```

### 6.2 External Communication

#### Customer Communication Triggers
- SEV 0: Immediate status page update + email
- SEV 1: Status page update within 30 minutes
- SEV 2: Status page update if > 1 hour

#### Status Page Updates
| Template | Use When |
|----------|----------|
| Investigating | Incident detected, cause unknown |
| Identified | Root cause identified, working on fix |
| Monitoring | Fix deployed, watching for stability |
| Resolved | Service confirmed stable |

### 6.3 Stakeholder Communication Matrix

| Stakeholder | SEV 0 | SEV 1 | SEV 2 | SEV 3 |
|-------------|-------|-------|-------|-------|
| **Engineering Team** | Immediate | Immediate | Within 30 min | Daily digest |
| **Product Team** | Immediate | Immediate | Within 1 hour | Daily digest |
| **Executive Team** | Immediate | Within 1 hour | Daily summary | Weekly summary |
| **Customer Success** | Immediate | Within 1 hour | If customer impact | No |
| **Customers** | Status page | Status page | If > 1 hour | No |
| **Legal/Compliance** | Immediate | If data involved | If required | No |

---

## 7. Evidence Preservation

### 7.1 Forensic Evidence

#### Evidence Types to Preserve
| Type | Collection Method | Retention |
|------|-------------------|-----------|
| System memory | Memory dump | 90 days |
| Disk images | Forensic imaging | 1 year |
| Network logs | Packet capture | 90 days |
| System logs | Centralized logging | 1 year |
| Application logs | Log aggregation | 1 year |
| Cloud audit logs | Cloud provider export | 1 year |

#### Evidence Handling
1. **Chain of Custody:** Document all evidence handling
2. **Integrity:** Hash and verify evidence integrity
3. **Storage:** Secure, access-controlled storage
4. **Access:** Limited to authorized personnel only

### 7.2 Documentation Requirements

#### Incident Timeline
| Time (UTC) | Event | Actor | Notes |
|------------|-------|-------|-------|
| [HH:MM] | [Event description] | [Who] | [Details] |

#### Actions Log
| Time | Action | Performed By | Result |
|------|--------|--------------|--------|
| [HH:MM] | [Action] | [Name] | [Outcome] |

---

## 8. Special Procedures

### 8.1 Data Breach Response

#### Immediate Actions (First hour)
1. **Contain:** Stop ongoing data exposure
2. **Assess:** Determine scope of exposed data
3. **Preserve:** Secure evidence
4. **Notify:** Alert legal and compliance teams
5. **Document:** Begin incident timeline

#### Breach Notification Requirements
| Jurisdiction | Timeline | Trigger |
|--------------|----------|---------|
| GDPR | 72 hours to regulator | Personal data breach |
| CCPA | Without unreasonable delay | Unencrypted personal info |
| State Laws | Varies | Varies by state |

#### Breach Assessment Questions
1. What data was accessed/exposed?
2. How many individuals affected?
3. Was data encrypted?
4. Is there evidence of exfiltration?
5. Who had access to the data?

### 8.2 Ransomware Response

#### DO NOT:
- ❌ Pay the ransom without executive approval
- ❌ Delete encrypted files
- ❌ Contact attackers without legal guidance
- ❌ Power off systems (preserve memory)

#### DO:
- ✅ Isolate affected systems immediately
- ✅ Preserve evidence
- ✅ Engage legal and law enforcement
- ✅ Restore from clean backups
- ✅ Verify backup integrity before restore

### 8.3 Insider Threat Response

#### Indicators
- Unusual access patterns
- Data exfiltration attempts
- Privilege escalation attempts
- Disabling security controls

#### Response
1. Do not alert suspected individual
2. Collect evidence covertly
3. Engage HR and Legal
4. Preserve access logs
5. Follow legal guidance for investigation

---

## 9. Training and Exercises

### 9.1 Training Requirements

| Role | Training | Frequency |
|------|----------|-----------|
| All Engineers | IR Plan overview | Annual |
| On-Call Engineers | IR procedures | Quarterly |
| Incident Commanders | Advanced IR training | Annual |
| Security Team | Forensics and investigation | Annual |

### 9.2 Exercise Schedule

| Exercise Type | Frequency | Participants |
|---------------|-----------|--------------|
| Tabletop | Quarterly | ICs, Leads |
| Technical Drill | Bi-annually | Technical teams |
| Full Simulation | Annually | All responders |
| Red Team | Annually | Security team |

---

## 10. Contact Information

### 10.1 Emergency Contacts

| Role | Name | Phone | Slack | Email |
|------|------|-------|-------|-------|
| **Incident Commander (Primary)** | [Name] | [Phone] | @[handle] | [email] |
| **Incident Commander (Backup)** | [Name] | [Phone] | @[handle] | [email] |
| **Security Lead** | [Name] | [Phone] | @[handle] | [email] |
| **Engineering Manager** | [Name] | [Phone] | @[handle] | [email] |
| **Director of Engineering** | [Name] | [Phone] | @[handle] | [email] |
| **CTO** | [Name] | [Phone] | @[handle] | [email] |

### 10.2 External Contacts

| Organization | Contact | Purpose |
|--------------|---------|---------|
| **Cloud Provider Support** | [Number/URL] | Infrastructure issues |
| **Security Vendor** | [Number] | Security tool support |
| **Legal Counsel** | [Number] | Legal guidance |
| **Cyber Insurance** | [Number] | Incident reporting |
| **Law Enforcement** | [FBI/CISA contact] | Criminal incidents |

### 10.3 Escalation Matrix

```
On-Call Engineer
        │
        ├── Cannot resolve in 15 min
        │   └── → Senior Engineer
        │           │
        │           ├── Cannot resolve in 30 min
        │           │   └── → Engineering Manager
        │           │               │
        │           │               ├── SEV 0 or cannot resolve
        │           │               │   └── → Director/VP
        │           │               │               │
        │           │               │               └── → CTO
        │           │               │
        │           │               └── SEV 1-2 resolved
        │           │
        │           └── Resolved
        │
        └── Resolved
```

---

## 11. Related Documents

- [04_POSTMORTEM_TEMPLATE.md](04_POSTMORTEM_TEMPLATE.md)
- [runbooks/RUNBOOK_TEMPLATE.md](runbooks/RUNBOOK_TEMPLATE.md)
- [05_CHANGE_ENABLEMENT_POLICY.md](05_CHANGE_ENABLEMENT_POLICY.md)
- [07_DISASTER_RECOVERY_PLAN.md](07_DISASTER_RECOVERY_PLAN.md)
- [12_SUPPORT_MODEL_AND_ESCALATION.md](12_SUPPORT_MODEL_AND_ESCALATION.md)

---

[End of Incident Response Plan]
