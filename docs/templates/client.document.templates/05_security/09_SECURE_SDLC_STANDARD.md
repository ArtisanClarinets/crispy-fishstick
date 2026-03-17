---
Document: SECURE_SDLC_STANDARD
Doc ID: VS-TEMPLATE-SEC-009
Client: [CLIENT NAME]
Project: [PROJECT NAME]
Owner: Security Engineering Lead / Engineering Lead
Status: Template
Version: 2.0.0
Last Updated: 2026-02-09
Confidentiality: Client Confidential
Classification: Confidential
Source of Truth: [docs/05_security/09_SECURE_SDLC_STANDARD.md](docs/05_security/09_SECURE_SDLC_STANDARD.md)
Review Cycle: Quarterly
Next Review Date: [DATE + 90 days]
---

# Secure Software Development Lifecycle (S-SDLC) Standard

**Project:** [[PROJECT_NAME]]  
**Standard:** ISO 27001 A.8.25-A.8.34 / NIST SSDF / OWASP SAMM  
**Scope:** All software development activities  
**Classification:** Confidential

---

## Document Control

| Field | Value |
|-------|-------|
| **Document Owner** | Security Engineering Lead / Engineering Lead |
| **Author** | Secure Development Team |
| **Reviewers** | CISO, CTO, Engineering Managers |
| **Approver** | CISO |
| **Approval Date** | [DATE] |
| **Review Frequency** | Quarterly |
| **Version History** | v2.0.0 - Enterprise S-SDLC standard |

### Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 2.0.0 | 2026-02-02 | Security Team | Comprehensive S-SDLC framework |
| 1.0.0 | 2026-01-18 | Security Team | Initial template |

---

## Compliance Mapping

### ISO 27001:2022

| Control | Title | Section |
|---------|-------|---------|
| A.5.8 | Information security in project management | 3-9 |
| A.8.25 | Secure development life cycle | All |
| A.8.26 | Application security requirements | 3. Requirements |
| A.8.27 | Secure system architecture | 3. Design |
| A.8.28 | Secure coding | 4. Implementation |
| A.8.29 | Security testing in development | 5. Verification |
| A.8.30 | Outsourced development | 9. Third-Party |
| A.8.31 | Separation of environments | 7. Environments |
| A.8.32 | Change management | 6. Deployment |
| A.8.33 | Test information | 5. Testing |
| A.8.34 | Protection during audit testing | 5. Testing |

### NIST SSDF (SP 800-218)

| Practice | Implementation | Section |
|----------|----------------|---------|
| PO.1 | Define security requirements | 3. Requirements |
| PO.2 | Implement roles and responsibilities | 2. Governance |
| PO.3 | Implement supporting toolchains | 4. Toolchain |
| PO.4 | Define and use criteria for security | 6. Release Gates |
| PO.5 | Implement and maintain secure environments | 7. Environments |
| PW.1 | Design software to meet security requirements | 3. Design |
| PW.2 | Review software design | 3. Design Review |
| PW.4 | Reuse existing, well-secured software | 4. Implementation |
| PW.5 | Create source code | 4. Implementation |
| PW.6 | Configure compilation and build processes | 4. Build |
| PW.7 | Review and/or analyze human-readable code | 4. Code Review |
| PW.8 | Test executable code | 5. Testing |
| PW.9 | Configure software to have secure settings | 6. Deployment |
| RV.1 | Identify and confirm vulnerabilities | 5. Testing |
| RV.2 | Assess, prioritize, and remediate vulnerabilities | 5. Remediation |
| RV.3 | Analyze vulnerabilities | 8. Improvement |

### OWASP SAMM

| Business Function | Security Practice | Maturity Level |
|-------------------|-------------------|----------------|
| Governance | Strategy and Metrics | 3 |
| Governance | Policy and Compliance | 3 |
| Governance | Education and Guidance | 3 |
| Design | Threat Assessment | 3 |
| Design | Security Requirements | 3 |
| Design | Secure Architecture | 3 |
| Implementation | Secure Build | 3 |
| Implementation | Secure Deployment | 3 |
| Implementation | Defect Management | 3 |
| Verification | Architecture Assessment | 3 |
| Verification | Requirements-driven Testing | 3 |
| Verification | Security Testing | 3 |
| Operations | Incident Management | 3 |
| Operations | Environment Management | 3 |
| Operations | Operational Management | 3 |

---

## 1. EXECUTIVE SUMMARY

This Secure Software Development Lifecycle (S-SDLC) Standard establishes security requirements and practices across all phases of software development at [[PROJECT_NAME]]. The standard ensures security is integrated throughout the development process, from requirements through deployment and operations.

---

## 2. S-SDLC GOVERNANCE

### 2.1 Roles and Responsibilities

| Role | Responsibilities |
|------|------------------|
| CISO | Overall S-SDLC ownership, exception approval |
| Security Engineering Lead | Security requirements, testing oversight |
| Engineering Lead | Implementation of secure development practices |
| Security Champions | Embedded security expertise in teams |
| Developers | Secure coding, security testing |
| DevOps | Secure build and deployment |
| QA | Security test case execution |
| Product Owners | Security requirements prioritization |

### 2.2 Security Champions Program

| Element | Description |
|---------|-------------|
| Selection | Volunteer + nomination from each team |
| Training | 40-hour security training program |
| Responsibilities | Security reviews, mentoring, threat modeling |
| Time Allocation | 20% security, 80% development |
| Recognition | Certification, conference attendance |

### 2.3 Security Training Requirements

| Role | Training | Frequency |
|------|----------|-----------|
| All Developers | Secure coding fundamentals | Annual |
| Security Champions | Advanced security training | Annual |
| Leads | Security architecture | Annual |
| New Hires | S-SDLC onboarding | Within 30 days |
| Specialized | Language-specific security | As needed |

---

## 3. REQUIREMENTS AND DESIGN

### 3.1 Security Requirements

| Requirement Category | Description | Source |
|---------------------|-------------|--------|
| Functional Security | Authentication, authorization, input validation | OWASP ASVS |
| Regulatory | GDPR, CCPA, PCI DSS compliance | Legal/Compliance |
| Business | Data protection, availability | Business stakeholders |
| Technical | Encryption, logging, monitoring | Security team |

### 3.2 Security Requirements Template

| ID | Requirement | Priority | Verification Method |
|----|-------------|----------|---------------------|
| SEC-001 | All authentication must use MFA | High | Code review, test |
| SEC-002 | All user input must be validated | Critical | SAST, DAST |
| SEC-003 | Sensitive data must be encrypted at rest | Critical | Code review |
| SEC-004 | All API calls must be authenticated | Critical | DAST, pen test |
| SEC-005 | Security events must be logged | High | Log review |
| SEC-006 | Error messages must not leak information | High | DAST |

### 3.3 Threat Modeling

| Phase | Activity | Output | Owner |
|-------|----------|--------|-------|
| Identify Assets | Document valuable assets | Asset list | Security |
| Create Diagrams | Data flow diagrams | DFDs | Architect |
| Identify Threats | STRIDE analysis | Threat list | Team |
| Assess Risks | Risk scoring | Risk register | Security |
| Define Mitigations | Security controls | Mitigation plan | Team |
| Validate | Review and update | Updated threat model | Security |

### 3.4 Design Review Checklist

| Category | Checklist Item | Status |
|----------|----------------|--------|
| Authentication | MFA implemented? | [ ] |
| Authorization | RBAC defined? | [ ] |
| Input Validation | All inputs validated? | [ ] |
| Output Encoding | All outputs encoded? | [ ] |
| Session Management | Secure session handling? | [ ] |
| Cryptography | Approved algorithms used? | [ ] |
| Error Handling | Safe error messages? | [ ] |
| Logging | Security events logged? | [ ] |
| Data Protection | Encryption specified? | [ ] |
| API Security | API security controls? | [ ] |

---

## 4. IMPLEMENTATION

### 4.1 Secure Coding Standards

| Language | Standard | Enforcement |
|----------|----------|-------------|
| TypeScript/JavaScript | OWASP Secure Coding | ESLint + review |
| Python | OWASP, PEP 8 Security | Bandit + review |
| Go | Go Security Guidelines | gosec + review |
| SQL | Parameterized queries only | SAST |

### 4.2 Prohibited Practices

| Practice | Risk | Alternative |
|----------|------|-------------|
| Hardcoded credentials | Credential exposure | Secrets management |
| SQL string concatenation | SQL injection | Parameterized queries |
| eval() and similar | Code injection | Safe alternatives |
| Insecure deserialization | RCE | Safe serialization |
| Weak cryptography | Data exposure | Strong algorithms |
| Verbose error messages | Information disclosure | Generic errors |
| Disabled certificate validation | MITM attacks | Proper validation |
| Client-side security controls | Bypass | Server-side controls |

### 4.3 Approved Libraries and Frameworks

| Category | Approved | Approval Required For |
|----------|----------|----------------------|
| Authentication | BetterAuth, Auth0, Keycloak | Custom implementations |
| Cryptography | Node crypto, libsodium | Custom crypto |
| Validation | Zod, Joi, class-validator | Regex-only validation |
| ORM | Prisma, TypeORM | Raw SQL |
| HTTP Client | Native fetch, axios | Custom clients |
| Logging | Pino, Winston | Console.log only |

### 4.4 Code Review Requirements

| Aspect | Requirement |
|--------|-------------|
| Review Type | Peer review + security review |
| Reviewers | Minimum 1 senior developer |
| Security Focus | OWASP Top 10, business logic |
| Checklist | Mandatory security checklist |
| Tools | Automated SAST integration |
| Documentation | Review comments mandatory |

### 4.5 Secure Build Process

| Control | Implementation |
|---------|----------------|
| Build Environment | Isolated, hardened build agents |
| Dependency Management | Lock files, checksum verification |
| Build Signing | Code signing for all artifacts |
| SBOM Generation | Generate and store SBOM |
| Build Provenance | SLSA Level 3 compliance |
| Immutable Builds | Reproducible builds |

---

## 5. VERIFICATION AND TESTING

### 5.1 Security Testing Pyramid

```
         /\
        /  \     Penetration Testing
       /____\    (Quarterly)
      /      \
     /        \   DAST + IAST
    /__________\  (Weekly)
   /            \
  /              \ SAST + SCA
 /________________\ (Every commit)
```

### 5.2 Security Test Cases

| Test ID | Category | Test Description | Tool |
|---------|----------|------------------|------|
| ST-001 | AuthN | Brute force protection | Custom |
| ST-002 | AuthN | Session fixation | DAST |
| ST-003 | AuthZ | Horizontal privilege escalation | DAST |
| ST-004 | AuthZ | Vertical privilege escalation | DAST |
| ST-005 | Input | SQL injection | SAST, DAST |
| ST-006 | Input | XSS (stored, reflected, DOM) | SAST, DAST |
| ST-007 | Input | Command injection | SAST, DAST |
| ST-008 | Input | Path traversal | SAST, DAST |
| ST-009 | Crypto | Weak algorithm detection | SAST |
| ST-010 | Config | Security headers | DAST |
| ST-011 | Business | Rate limiting | Custom |
| ST-012 | Business | Mass assignment | SAST |

### 5.3 Security Testing Schedule

| Test Type | Frequency | Environment | Owner |
|-----------|-----------|-------------|-------|
| SAST | Every commit | CI/CD | Automated |
| SCA | Every commit | CI/CD | Automated |
| Secret Scan | Every commit | CI/CD | Automated |
| Unit Security Tests | Every commit | CI/CD | Developers |
| DAST | Weekly | Staging | Security |
| IAST | Continuous | Staging | Automated |
| Penetration Test | Quarterly | Staging | External |
| Fuzzing | Weekly | Staging | Security |

### 5.4 Vulnerability Management

| Severity | SLA | Verification Required |
|----------|-----|----------------------|
| Critical | 24 hours | Re-scan + manual verification |
| High | 7 days | Re-scan |
| Medium | 30 days | Re-scan |
| Low | 90 days | Re-scan |

---

## 6. DEPLOYMENT

### 6.1 Pre-Deployment Security Checklist

| Check | Requirement | Evidence |
|-------|-------------|----------|
| SAST | Zero critical/high findings | Scan report |
| SCA | Zero critical/high findings | Scan report |
| Secrets | Zero secrets in code | Scan report |
| Tests | All security tests passing | Test results |
| Review | Security review completed | Review record |
| Documentation | Security docs updated | Docs |
| Sign-off | Security approval obtained | Approval |

### 6.2 Secure Deployment Practices

| Practice | Implementation |
|----------|----------------|
| Immutable Infrastructure | No changes to running systems |
| Infrastructure as Code | All infra defined in code |
| Automated Deployment | CI/CD pipelines only |
| Blue/Green Deployment | Zero-downtime with rollback |
| Canary Releases | Gradual rollout with monitoring |
| Feature Flags | Kill switches for security issues |

### 6.3 Security Configuration

| Component | Configuration |
|-----------|---------------|
| TLS | TLS 1.3 only, strong ciphers |
| Headers | HSTS, CSP, X-Frame-Options, etc. |
| Cookies | Secure, HttpOnly, SameSite |
| Sessions | Short timeout, secure storage |
| APIs | Authentication required, rate limited |
| Database | Encrypted, least privilege access |

### 6.4 Release Gates

| Gate | Criteria | Approver |
|------|----------|----------|
| Security Scan | Zero critical/high vulnerabilities | Automated |
| Code Review | Approved by senior developer | Tech Lead |
| Security Review | Approved by security champion | Security |
| Test Coverage | >90% security test coverage | QA |
| Documentation | Security docs complete | Tech Writer |
| Final Approval | CISO sign-off for major releases | CISO |

---

## 7. ENVIRONMENT MANAGEMENT

### 7.1 Environment Separation

| Environment | Purpose | Data | Access |
|-------------|---------|------|--------|
| Development | Feature development | Synthetic | Developers |
| Integration | Integration testing | Synthetic | Engineering |
| Staging | Pre-production testing | Anonymized production | Engineering + QA |
| Production | Live system | Real | Restricted |

### 7.2 Environment Security Controls

| Control | Development | Staging | Production |
|---------|-------------|---------|------------|
| Network Isolation | Yes | Yes | Yes |
| Data Masking | N/A | Yes | N/A |
| Access Logging | Basic | Enhanced | Comprehensive |
| Monitoring | Basic | Enhanced | Comprehensive |
| Backup | None | Weekly | Continuous |
| Encryption | TLS | Full | Full |

### 7.3 Test Data Management

| Requirement | Implementation |
|-------------|----------------|
| Generation | Synthetic data generation |
| Masking | Production data anonymization |
| Retention | Auto-deletion after test completion |
| Access | Restricted to test environments |
| Audit | All access logged |

---

## 8. OPERATIONS AND MONITORING

### 8.1 Runtime Security Monitoring

| Monitoring Type | Implementation | Alert Threshold |
|-----------------|----------------|-----------------|
| Application Security | RASP/IAST | Security event |
| Infrastructure | Falco/EDR | Anomaly detected |
| Network | IDS/IPS | Threat detected |
| API | API security gateway | Abuse pattern |
| Data | DLP | Policy violation |

### 8.2 Security Incident Response

| Phase | Activity | Owner |
|-------|----------|-------|
| Detection | Automated alerting | SOC |
| Triage | Severity assessment | Security |
| Containment | Isolate affected systems | DevOps |
| Eradication | Remove threat | Engineering |
| Recovery | Restore service | DevOps |
| Lessons Learned | Process improvement | Security |

### 8.3 Continuous Improvement

| Activity | Frequency | Owner |
|----------|-----------|-------|
| Vulnerability Analysis | Monthly | Security |
| Incident Review | Post-incident | Security |
| Metrics Review | Monthly | Security |
| Tool Evaluation | Quarterly | Security |
| Training Update | Quarterly | Security |
| Standard Update | Quarterly | Security |

---

## 9. THIRD-PARTY DEVELOPMENT

### 9.1 Vendor Security Requirements

| Requirement | Verification |
|-------------|--------------|
| Security questionnaire | Completed and reviewed |
| Security certifications | SOC 2, ISO 27001 |
| Right to audit | Contract clause |
| Security SLA | Defined and monitored |
| Incident notification | 24-hour notification |
| Data handling | DPA in place |

### 9.2 Outsourced Development Controls

| Control | Implementation |
|---------|----------------|
| Code Review | All code reviewed internally |
| Security Testing | Same standards as internal |
| Access Control | Limited, monitored access |
| IP Protection | NDA and IP assignment |
| Delivery Verification | Security scan before acceptance |

---

## 10. METRICS AND REPORTING

### 10.1 Key Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Security defects per release | <2 | Tracking |
| Mean time to remediate | <7 days (High) | Tracking |
| SAST coverage | >95% | Tool report |
| Security test coverage | >90% | Test results |
| Training completion | 100% | Training system |
| Vulnerability recurrence | <5% | Trend analysis |

### 10.2 Reporting Structure

| Report | Audience | Frequency |
|--------|----------|-----------|
| Security Dashboard | Engineering | Real-time |
| Release Security Report | Stakeholders | Per release |
| Monthly Metrics | Leadership | Monthly |
| Quarterly Review | CISO | Quarterly |

---

## 11. APPENDICES

### Appendix A: Security Checklists

#### Pre-Commit Checklist
- [ ] No secrets in code
- [ ] No hardcoded credentials
- [ ] Input validation implemented
- [ ] Output encoding implemented
- [ ] Error handling safe
- [ ] Logging appropriate
- [ ] Unit tests passing
- [ ] SAST passing

#### Pre-Release Checklist
- [ ] All security requirements met
- [ ] Threat model updated
- [ ] Security tests passing
- [ ] SAST clean
- [ ] DAST clean
- [ ] Dependencies scanned
- [ ] Documentation complete
- [ ] Security review complete

### Appendix B: Secure Coding Resources

| Resource | URL |
|----------|-----|
| OWASP Secure Coding | https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/ |
| CWE Top 25 | https://cwe.mitre.org/top25/ |
| SANS Secure Coding | https://www.sans.org/secure-coding/ |

### Appendix C: Document References

| Document ID | Title | Relationship |
|-------------|-------|--------------|
| VS-TEMPLATE-SEC-001 | Security Baseline | Parent document |
| VS-TEMPLATE-SEC-002 | Threat Model | Threat modeling |
| VS-TEMPLATE-SEC-003 | Security Test Plan | Testing procedures |
| VS-TEMPLATE-SEC-004 | Vulnerability Management | Remediation |

---

## Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Security Engineering Lead | [NAME] | ________________ | [DATE] |
| Engineering Lead | [NAME] | ________________ | [DATE] |
| Chief Information Security Officer | [NAME] | ________________ | [DATE] |

---

*This Secure SDLC Standard is a controlled document and must be reviewed quarterly.*
