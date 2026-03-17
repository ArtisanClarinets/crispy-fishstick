---
Document: SECURITY_EVENT_LOGGING_REQUIREMENTS
Doc ID: VS-TEMPLATE-SEC-010
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Security Engineering Lead / DevOps Lead
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Classification: Confidential
Source of Truth: [docs/05_security/10_SECURITY_EVENT_LOGGING_REQUIREMENTS.md](docs/05_security/10_SECURITY_EVENT_LOGGING_REQUIREMENTS.md)
Review Cycle: Quarterly
Next Review Date: [DATE + 90 days]
---

# Security Event Logging Requirements

**Project:** [[PROJECT_NAME]]  
**Standard:** ISO 27001 A.8.15-A.8.17 / NIST 800-53 AU Family / SOC 2 CC7.2  
**Scope:** All systems, applications, and infrastructure  
**Classification:** Confidential

---

## Document Control

| Field | Value |
|-------|-------|
| **Document Owner** | Security Engineering Lead / DevOps Lead |
| **Author** | Security Operations Team |
| **Reviewers** | CISO, Compliance Officer, Engineering Lead |
| **Approver** | CISO |
| **Approval Date** | [DATE] |
| **Review Frequency** | Quarterly |
| **Version History** | v2.0.0 - Enterprise logging specification |

### Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-02-02 | Security Team | Comprehensive logging framework |
| 1.0.0 | 2026-01-18 | Security Team | Initial template |

---

## Compliance Mapping

### ISO 27001:2022

| Control | Title | Section |
|---------|-------|---------|
| A.5.28 | Collection of evidence | 8. Forensics |
| A.5.36 | Compliance with policies | 7. Audit |
| A.8.15 | Logging | All |
| A.8.16 | Monitoring activities | 6. Monitoring |
| A.8.17 | Clock synchronization | 4. Log Format |

### NIST 800-53

| Control | Title | Section |
|---------|-------|---------|
| AU-3 | Content of Audit Records | 5. Event Types |
| AU-4 | Audit Storage Capacity | 9. Retention |
| AU-5 | Response to Audit Processing Failures | 6. Alerting |
| AU-6 | Audit Review | 7. Analysis |
| AU-7 | Audit Reduction and Report Generation | 7. Analysis |
| AU-8 | Time Stamps | 4. Log Format |
| AU-9 | Protection of Audit Information | 9. Security |
| AU-10 | Non-repudiation | 5. Event Types |
| AU-11 | Audit Record Retention | 9. Retention |
| AU-12 | Audit Generation | 5. Event Types |
| AU-13 | Monitoring for Information Disclosure | 6. Monitoring |
| AU-14 | Session Audit | 5. Event Types |

### SOC 2 Trust Services Criteria

| Criteria | Description | Section |
|----------|-------------|---------|
| CC7.2 | System monitoring | All |
| CC4.1 | Monitoring activities | 6. Monitoring |
| CC7.1 | Security operations | 7. Analysis |

### GDPR

| Article | Description | Section |
|---------|-------------|---------|
| Art. 30 | Records of processing | 5. Event Types |
| Art. 33 | Breach notification | 7. Analysis |

---

## 1. EXECUTIVE SUMMARY

This document establishes comprehensive requirements for security event logging across all systems, applications, and infrastructure at [[PROJECT_NAME]]. The logging framework ensures adequate audit trails for security monitoring, incident investigation, and compliance reporting.

---

## 2. LOGGING ARCHITECTURE

### 2.1 Log Sources

| Source Category | Examples | Log Volume |
|-----------------|----------|------------|
| Applications | Web apps, APIs, microservices | High |
| Infrastructure | Servers, containers, network devices | High |
| Security Tools | Firewalls, IDS/IPS, EDR | Medium |
| Cloud Services | AWS, Azure, GCP native logs | High |
| Identity Systems | IAM, SSO, MFA | Medium |
| Databases | Query logs, access logs | Medium |
| Endpoints | Workstations, mobile devices | High |

### 2.2 Log Architecture Diagram

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Sources   │───→│  Collection │───→│  Processing │───→│   Storage   │
│             │    │   (Agents)  │    │  (Parsing)  │    │  (SIEM/WORM)│
└─────────────┘    └─────────────┘    └─────────────┘    └──────┬──────┘
                                                                 │
                    ┌─────────────┐    ┌─────────────┐          │
                    │   Alerting  │←───│   Analysis  │←─────────┘
                    │   (SOAR)    │    │  (SIEM/UEBA)│
                    └─────────────┘    └─────────────┘
```

### 2.3 Log Ingestion

| Method | Use Case | Implementation |
|--------|----------|----------------|
| Agent-based | Servers, endpoints | Fluentd, Filebeat |
| Agentless | Cloud services, network | API polling, syslog |
| Direct API | Cloud-native services | CloudWatch, Azure Monitor |
| Streaming | Real-time applications | Kafka, Kinesis |

---

## 3. LOG FORMAT AND STRUCTURE

### 3.1 Standard Log Format

All logs must be in structured JSON format with the following mandatory fields:

| Field | Description | Example |
|-------|-------------|---------|
| timestamp | ISO 8601 timestamp with timezone | 2026-02-02T10:30:00Z |
| severity | Log level (DEBUG, INFO, WARN, ERROR, CRITICAL) | ERROR |
| source | System/component generating the log | auth-service |
| event_type | Category of event | authentication_failure |
| event_id | Unique event identifier | AUTH-001 |
| message | Human-readable description | User login failed |
| user_id | Identifier of user (if applicable) | user-12345 |
| session_id | Session identifier (if applicable) | sess-abc123 |
| ip_address | Source IP address | 192.168.1.1 |
| user_agent | Client user agent | Mozilla/5.0... |
| resource | Resource being accessed | /api/users |
| action | Action performed | READ |
| result | Success or failure | FAILURE |
| reason | Reason for result | invalid_credentials |
| correlation_id | Request correlation ID | req-xyz789 |
| environment | Environment (prod, staging, dev) | production |
| host | Hostname | web-server-01 |

### 3.2 Field Requirements by Event Type

| Event Type | Required Fields |
|------------|-----------------|
| Authentication | timestamp, event_type, user_id, ip_address, result, reason |
| Authorization | timestamp, event_type, user_id, resource, action, result |
| Data Access | timestamp, event_type, user_id, resource, data_classification |
| Admin Action | timestamp, event_type, admin_id, action, target, before, after |
| System Change | timestamp, event_type, user_id, system, change_type |
| Security Alert | timestamp, event_type, severity, alert_type, description |

### 3.3 Time Synchronization

| Requirement | Implementation |
|-------------|----------------|
| Time Source | NTP with authenticated time servers |
| Accuracy | ±100 milliseconds |
| Time Zone | UTC for all logs |
| DST Handling | No DST adjustments (UTC) |
| Clock Drift Monitoring | Alert if >1 second drift |

---

## 4. MANDATORY LOG EVENTS

### 4.1 Authentication Events

| Event ID | Event Name | Fields | Retention |
|----------|------------|--------|-----------|
| AUTH-001 | Login Success | user_id, ip, method, mfa_used | 7 years |
| AUTH-002 | Login Failure | user_id, ip, method, reason | 7 years |
| AUTH-003 | Logout | user_id, ip, session_id | 7 years |
| AUTH-004 | Password Change | user_id, ip, success | 7 years |
| AUTH-005 | MFA Challenge | user_id, ip, method | 7 years |
| AUTH-006 | MFA Success | user_id, ip, method | 7 years |
| AUTH-007 | MFA Failure | user_id, ip, method, reason | 7 years |
| AUTH-008 | Account Lockout | user_id, ip, reason | 7 years |
| AUTH-009 | Session Created | user_id, session_id, ip | 7 years |
| AUTH-010 | Session Expired | user_id, session_id, reason | 7 years |
| AUTH-011 | Impersonation | admin_id, target_user, reason | 7 years |
| AUTH-012 | Break-glass Access | user_id, ip, approval_id | 7 years |

### 4.2 Authorization Events

| Event ID | Event Name | Fields | Retention |
|----------|------------|--------|-----------|
| AUTHZ-001 | Access Granted | user_id, resource, action | 7 years |
| AUTHZ-002 | Access Denied | user_id, resource, action, reason | 7 years |
| AUTHZ-003 | Permission Change | admin_id, target_user, old, new | 7 years |
| AUTHZ-004 | Role Assignment | admin_id, target_user, role | 7 years |
| AUTHZ-005 | Role Revocation | admin_id, target_user, role | 7 years |
| AUTHZ-006 | Privilege Escalation | user_id, from_role, to_role | 7 years |

### 4.3 Data Access Events

| Event ID | Event Name | Fields | Retention |
|----------|------------|--------|-----------|
| DATA-001 | Data Read | user_id, resource, data_type, classification | 7 years |
| DATA-002 | Data Created | user_id, resource, data_type, classification | 7 years |
| DATA-003 | Data Modified | user_id, resource, data_type, classification | 7 years |
| DATA-004 | Data Deleted | user_id, resource, data_type, classification | 7 years |
| DATA-005 | Data Exported | user_id, resource, format, destination | 7 years |
| DATA-006 | Data Shared | user_id, resource, recipient, purpose | 7 years |
| DATA-007 | Bulk Access | user_id, query, records_accessed | 7 years |

### 4.4 Administrative Events

| Event ID | Event Name | Fields | Retention |
|----------|------------|--------|-----------|
| ADMIN-001 | User Created | admin_id, new_user, role | 7 years |
| ADMIN-002 | User Disabled | admin_id, target_user, reason | 7 years |
| ADMIN-003 | User Deleted | admin_id, target_user, reason | 7 years |
| ADMIN-004 | Config Changed | admin_id, system, setting, old, new | 7 years |
| ADMIN-005 | Policy Changed | admin_id, policy, change_summary | 7 years |
| ADMIN-006 | Backup Executed | admin_id, backup_type, status | 7 years |
| ADMIN-007 | Restore Executed | admin_id, source, status | 7 years |

### 4.5 Security Events

| Event ID | Event Name | Fields | Retention |
|----------|------------|--------|-----------|
| SEC-001 | Alert Triggered | alert_type, severity, description | 7 years |
| SEC-002 | Threat Detected | threat_type, source, target | 7 years |
| SEC-003 | Vulnerability Found | vuln_id, severity, asset | 7 years |
| SEC-004 | Incident Created | incident_id, type, severity | 7 years |
| SEC-005 | Malware Detected | malware_type, file, action | 7 years |
| SEC-006 | Anomaly Detected | anomaly_type, user, description | 7 years |
| SEC-007 | DLP Violation | policy, user, data_type, action | 7 years |

### 4.6 System Events

| Event ID | Event Name | Fields | Retention |
|----------|------------|--------|-----------|
| SYS-001 | System Startup | host, version, config | 3 years |
| SYS-002 | System Shutdown | host, reason, duration | 3 years |
| SYS-003 | Service Started | host, service, version | 3 years |
| SYS-004 | Service Stopped | host, service, reason | 3 years |
| SYS-005 | Configuration Loaded | host, config_version | 3 years |
| SYS-006 | Health Check | host, status, metrics | 1 year |
| SYS-007 | Error | host, component, error_code | 3 years |

---

## 5. LOGGING STANDARDS

### 5.1 Structured Logging Requirements

| Requirement | Standard |
|-------------|----------|
| Format | JSON (RFC 8259) |
| Encoding | UTF-8 |
| Timestamp | ISO 8601 with timezone |
| Severity | syslog levels (0-7) |
| PII Handling | Masked or excluded |
| Secrets | Never logged |
| Size Limit | 1MB per log entry |

### 5.2 PII and Sensitive Data Handling

| Data Type | Handling | Example |
|-----------|----------|---------|
| Passwords | Never log | [REDACTED] |
| API Keys | Mask | sk-***last4 |
| Credit Cards | Mask | ****-****-****-1234 |
| SSN | Mask | ***-**-1234 |
| Email | Mask | u***@domain.com |
| Phone | Mask | ***-***-1234 |
| IP Address | Anonymize (last octet) | 192.168.1.0 |

### 5.3 Log Levels

| Level | Value | Usage |
|-------|-------|-------|
| EMERGENCY | 0 | System unusable |
| ALERT | 1 | Immediate action required |
| CRITICAL | 2 | Critical conditions |
| ERROR | 3 | Error conditions |
| WARNING | 4 | Warning conditions |
| NOTICE | 5 | Normal but significant |
| INFO | 6 | Informational |
| DEBUG | 7 | Debug-level messages |

---

## 6. MONITORING AND ALERTING

### 6.1 Real-Time Monitoring

| Alert Type | Trigger | Severity | Response |
|------------|---------|----------|----------|
| Multiple Failed Logins | 5 failures in 15 min | High | Alert SOC |
| Privileged Access | Any admin login | Medium | Log + review |
| After-Hours Access | Outside business hours | Medium | Alert |
| Impossible Travel | Geographic anomaly | High | Alert SOC |
| Data Exfiltration | Large data export | Critical | Alert SOC |
| Configuration Change | Any production change | Medium | Log + review |
| Malware Detection | AV/EDR alert | Critical | Alert SOC |
| DLP Violation | Policy violation | High | Alert DPO |

### 6.2 Alert Routing

| Severity | Notification | Escalation |
|----------|--------------|------------|
| Critical | PagerDuty + SMS + Email | Immediate |
| High | PagerDuty + Email | 15 minutes |
| Medium | Email + Slack | 1 hour |
| Low | Slack | Next business day |

### 6.3 Automated Response

| Scenario | Automated Action | Approval |
|----------|------------------|----------|
| Brute force attack | Rate limit + CAPTCHA | Auto |
| Compromised account | Account lockout | Auto |
| DDoS attack | Traffic filtering | Auto |
| Malware detection | File quarantine | Auto |
| Data exfiltration | Connection block | Security Lead |

---

## 7. LOG ANALYSIS

### 7.1 Analysis Procedures

| Analysis Type | Frequency | Owner | Tools |
|---------------|-----------|-------|-------|
| Real-time | Continuous | SOC | SIEM |
| Daily Review | Daily | SOC | SIEM dashboards |
| Weekly Analysis | Weekly | Security Analyst | SIEM + custom |
| Monthly Trends | Monthly | Security Lead | BI tools |
| Quarterly Audit | Quarterly | Compliance | Audit tools |
| Incident Analysis | As needed | IR Team | SIEM + forensic |

### 7.2 Key Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Log ingestion rate | 100% | Volume tracked |
| Log parsing errors | <0.1% | Error rate |
| Alert response time | <15 min (Critical) | Tracking |
| False positive rate | <10% | Analysis |
| Log retention compliance | 100% | Audit |
| SIEM availability | 99.9% | Uptime |

### 7.3 Correlation Rules

| Rule Name | Description | Severity |
|-----------|-------------|----------|
| Account Compromise | Failed logins + successful login + unusual activity | High |
| Privilege Escalation | Permission change + immediate sensitive access | Critical |
| Data Breach | Bulk access + export + external transfer | Critical |
| Insider Threat | After-hours + bulk access + deletion | High |
| Lateral Movement | Sequential access to multiple systems | High |

---

## 8. FORENSIC READINESS

### 8.1 Forensic Requirements

| Requirement | Implementation |
|-------------|----------------|
| Immutable Logs | Write-once storage |
| Chain of Custody | Automated tracking |
| Timestamp Integrity | Cryptographic verification |
| Log Completeness | 100% capture guarantee |
| Fast Retrieval | <1 hour for any time period |
| Export Capability | Standard formats (JSON, CSV, CEF) |

### 8.2 Evidence Collection

| Evidence Type | Collection Method | Storage |
|---------------|-------------------|---------|
| Log files | Automated export | Secure storage |
| System images | Forensic imaging | Encrypted storage |
| Memory dumps | Live capture | Secure storage |
| Network captures | Packet capture | Secure storage |
| Configuration | Version control | Repository |

---

## 9. LOG RETENTION AND SECURITY

### 9.1 Retention Schedule

| Log Category | Retention Period | Storage Class |
|--------------|------------------|---------------|
| Security logs | 7 years | WORM / Immutable |
| Authentication logs | 7 years | WORM / Immutable |
| Administrative logs | 7 years | WORM / Immutable |
| Application logs | 1 year | Standard |
| System logs | 1 year | Standard |
| Debug logs | 30 days | Standard |
| Access logs | 1 year | Standard |

### 9.2 Log Security

| Control | Implementation |
|---------|----------------|
| Encryption at Rest | AES-256 |
| Encryption in Transit | TLS 1.3 |
| Access Control | Role-based, least privilege |
| Integrity | Cryptographic hashing |
| Backup | Geographic redundancy |
| Deletion | Secure deletion at end of retention |

### 9.3 Log Access

| Role | Access Level | Justification |
|------|--------------|---------------|
| SOC Analyst | Read production logs | Security monitoring |
| Security Engineer | Read all logs | Analysis and tuning |
| Compliance Officer | Read compliance logs | Audit and reporting |
| Developers | Read dev/staging logs | Debugging |
| DevOps | Read infrastructure logs | Operations |
| Forensics | Export access | Investigation |

---

## 10. INCIDENT RESPONSE INTEGRATION

### 10.1 Log-Based Incident Detection

| Incident Type | Log Indicators | Response |
|---------------|----------------|----------|
| Account Compromise | Unusual login patterns | Lock account, investigate |
| Data Breach | Bulk data access | Isolate, investigate |
| Insider Threat | Unauthorized access | Escalate to HR/Security |
| Malware | AV alerts, file changes | Quarantine, analyze |
| APT | Slow, persistent activity | Full investigation |

### 10.2 Log Preservation

| Trigger | Action | Timeline |
|---------|--------|----------|
| Security incident | Preserve all related logs | Immediate |
| Legal hold | Suspend deletion | Per legal instruction |
| Investigation | Export logs to secure storage | 24 hours |
| Audit | Provide logs to auditors | Per SLA |

---

## 11. APPENDICES

### Appendix A: Log Format Examples

#### Authentication Success
```json
{
  "timestamp": "2026-02-02T10:30:00Z",
  "severity": "INFO",
  "source": "auth-service",
  "event_type": "authentication_success",
  "event_id": "AUTH-001",
  "user_id": "user-12345",
  "ip_address": "192.168.1.100",
  "user_agent": "Mozilla/5.0...",
  "method": "password",
  "mfa_used": true,
  "session_id": "sess-abc123",
  "correlation_id": "req-xyz789"
}
```

#### Access Denied
```json
{
  "timestamp": "2026-02-02T10:35:00Z",
  "severity": "WARNING",
  "source": "api-gateway",
  "event_type": "access_denied",
  "event_id": "AUTHZ-002",
  "user_id": "user-12345",
  "resource": "/api/admin/users",
  "action": "DELETE",
  "reason": "insufficient_privileges",
  "ip_address": "192.168.1.100",
  "correlation_id": "req-xyz790"
}
```

### Appendix B: Compliance Mapping Detail

| Regulation | Requirement | Log Evidence |
|------------|-------------|--------------|
| SOC 2 CC7.2 | System monitoring | All security logs |
| ISO 27001 A.8.15 | Logging | Event logs |
| GDPR Art. 5(1)(f) | Integrity | Audit logs |
| PCI DSS 10.1 | Audit trails | Authentication logs |
| HIPAA 164.312(b) | Audit controls | Access logs |

### Appendix C: Document References

| Document ID | Title | Relationship |
|-------------|-------|--------------|
| VS-TEMPLATE-SEC-001 | Security Baseline | Parent document |
| VS-TEMPLATE-SEC-011 | Incident Response | IR integration |
| VS-TEMPLATE-SEC-003 | Security Test Plan | Log-based testing |

---

## Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Security Engineering Lead | [NAME] | ________________ | [DATE] |
| DevOps Lead | [NAME] | ________________ | [DATE] |
| Chief Information Security Officer | [NAME] | ________________ | [DATE] |

---

*This Security Event Logging Requirements document is a controlled document and must be reviewed quarterly.*
