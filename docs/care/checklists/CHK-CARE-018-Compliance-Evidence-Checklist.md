# CHK-CARE-018: Compliance Evidence Checklist

**Document ID:** VS-CARE-CHK-018  
**Version:** 1.0.0  
**Effective Date:** 2026-02-21  
**Owner:** Security Lead  
**Status:** Active  
**Reading Level:** 8th Grade  
**Estimated Time:** 4-8 hours (per audit request)  
**Risk Rating:** High (audit failure can mean business shutdown)

**Goal:** Assemble organized, complete evidence packages that support compliance audits while clearly documenting scope and limitations—operational support only, no legal advice.

---

## IMPORTANT: Non-Legal Service Disclaimer

**Vantus provides operational support and evidence organization only.**

- [ ] Client acknowledges: Vantus does not provide legal advice
- [ ] Client acknowledges: Vantus does not guarantee audit outcomes
- [ ] Client acknowledges: Client retains full responsibility for compliance decisions
- [ ] Disclaimer included in all deliverables

**CMMC Alignment:** This checklist supports CMMC, HIPAA, PCI-DSS, SOC 2, and ISO 27001 evidence collection

---

## 1. Audit Scope Confirmation

- [ ] Target framework identified (which compliance standard?)
  - CMMC (Cybersecurity Maturity Model Certification)
  - HIPAA (Healthcare)
  - PCI-DSS (Payment processing)
  - SOC 2 (Service providers)
  - ISO 27001 (Security management)
  - Custom (client-specific requirements)
- [ ] Audit period defined (what date range?)
- [ ] Scope boundaries confirmed (which systems included?)
- [ ] Evidence types specified (what does auditor want?)
- [ ] Delivery format confirmed (how to present evidence?)
- [ ] Timeline established (when is evidence needed?)

**Time Estimate:** 30-45 minutes  
**Owner:** Security Lead + Client Compliance Owner

---

## 2. Control Mapping

- [ ] Framework requirements listed (all applicable controls)
- [ ] Each control mapped to Vantus evidence sources
- [ ] Gap analysis completed (where evidence doesn't exist)
- [ ] Third-party responsibilities noted (what others must provide)
- [ ] Client responsibilities clarified (what client must demonstrate)
- [ ] In-scope vs. out-of-scope clearly documented

**Time Estimate:** 60-90 minutes  
**Vantus standard:** mapping every control, not just obvious ones

---

## 3. Evidence Collection

### Access Control Evidence (AC)
- [ ] Access register exports (who has access to what)
- [ ] Access review meeting notes (quarterly reviews)
- [ ] New access request records (approvals documented)
- [ ] Termination access removal records (timely revocation)
- [ ] Privileged access logs (admin activity)

### Change Management Evidence (CM)
- [ ] Change request records (planned changes)
- [ ] Change approval logs (who approved what)
- [ ] Emergency change documentation (post-hoc records)
- [ ] Change success/failure metrics (compliance with process)

### Incident Response Evidence (IR)
- [ ] Incident tickets (all security incidents)
- [ ] Incident summary reports (TPL-CARE-005)
- [ ] Post-incident review records (lessons learned)
- [ ] Timeline documentation (response times)

### Backup/Recovery Evidence (BR)
- [ ] Backup job logs (success/failure records)
- [ ] Restore test results (CHK-CARE-005)
- [ ] RPO/RTO measurements (recovery capabilities)
- [ ] Backup encryption verification

### Monitoring Evidence (AU)
- [ ] Audit log samples (user activity)
- [ ] Alert records (detection evidence)
- [ ] Log retention verification (retention periods met)
- [ ] Log protection evidence (tamper-proof storage)

### Training Evidence (AT)
- [ ] Training completion records (who was trained)
- [ ] Training materials (what was covered)
- [ ] Tabletop exercise records (SOP-CARE-027)
- [ ] Policy acknowledgment records (who read what)

**Time Estimate:** 2-4 hours (varies by scope)  
**CMMC Alignment:** AU.2.1 (audit events), AC.2.1 (account management), CM.2.1 (config management)

---

## 4. Evidence Sanitization

- [ ] Sensitive data removed (passwords, keys, PII not needed)
- [ ] Scope limited (only in-scope systems included)
- [ ] Completeness verified (nothing missing from requested period)
- [ ] Format standardized (consistent presentation)
- [ ] File naming convention applied (auditor can navigate)
- [ ] Size optimized (compressed if large files)

**Time Estimate:** 45-60 minutes  
**Critical:** Never expose credentials, private keys, or unnecessary PII

---

## 5. Gap Documentation

- [ ] Missing evidence identified (what we don't have)
- [ ] Gap reasons explained (why evidence doesn't exist)
- [ ] Risk assessment provided (impact of missing evidence)
- [ ] Remediation options suggested (how to close gap)
- [ ] Timeline proposed (when gap can be addressed)
- [ ] Client decision captured (accept risk or remediate)

**Time Estimate:** 30-45 minutes

---

## 6. Evidence Pack Assembly

- [ ] Table of Contents created (TPL-CARE-007)
  - Section listing with page numbers
  - Evidence item descriptions
  - Control mappings
- [ ] Evidence organized by control domain
- [ ] Cross-references added (related evidence linked)
- [ ] Timestamps verified (all evidence within audit period)
- [ ] Chain of custody documented (who handled evidence)
- [ ] Disclaimer page included (non-legal service statement)

**Time Estimate:** 45-60 minutes

---

## 7. Quality Review

- [ ] Completeness check (all requested evidence included)
- [ ] Accuracy verification (data is correct)
- [ ] Relevance confirmed (evidence supports claimed controls)
- [ ] Clarity ensured (auditor can understand without explanation)
- [ ] Internal review completed (second pair of eyes)
- [ ] Client preview provided (opportunity to review)

**Time Estimate:** 30-45 minutes  
**Owner:** Security Lead (primary), Delivery Lead (reviewer)

---

## 8. Delivery & Follow-Up

- [ ] Evidence pack delivered (secure method)
- [ ] Receipt confirmed (client acknowledges delivery)
- [ ] Questions anticipated (prepare clarifying explanations)
- [ ] Auditor questions answered (support during review)
- [ ] Additional requests handled (if auditor asks for more)
- [ ] Lessons learned captured (improve for next audit)

**Time Estimate:** Ongoing (throughout audit period)

---

## 9. Remediation Tracking

- [ ] Findings from audit documented (what needs fixing)
- [ ] Remediation plan created (how to address each finding)
- [ ] Owners assigned (who fixes what)
- [ ] Due dates established (when fixes due)
- [ ] Progress tracked (regular status updates)
- [ ] Evidence of remediation collected (for follow-up audit)

**Time Estimate:** Ongoing (until all findings closed)

---

## Evidence Pack Structure

```
Evidence Pack
├── 00_Cover_Letter_and_Disclaimer
├── 01_Table_of_Contents
├── 02_Control_Mapping_Matrix
├── 03_Access_Control_Evidence
├── 04_Change_Management_Evidence
├── 05_Incident_Response_Evidence
├── 06_Backup_Recovery_Evidence
├── 07_Monitoring_Audit_Evidence
├── 08_Training_Awareness_Evidence
├── 09_Gap_Analysis
└── 10_Remediation_Plan
```

---

## Success Criteria

| Criterion | Target | Verification |
|-----------|--------|--------------|
| On-time delivery | 100% | Delivery timestamp |
| Completeness | 95%+ requested evidence | Auditor feedback |
| Zero credential exposure | 100% | Sanitization review |
| Client satisfaction | 90%+ | Post-audit survey |
| Finding resolution | 100% critical, 90% overall | Closure tracking |

---

## Related Documents

- **SOP:** SOP-CARE-025 (Compliance Support)
- **Template:** TPL-CARE-007 (Evidence Pack Table of Contents)
- **Checklist:** CHK-CARE-012 (Incident Response - for IR evidence)
- **Checklist:** CHK-CARE-010 (Change Management - for CM evidence)

---

*Last Updated: 2026-02-21 | Version 1.0.0 | Questions? Contact your Security Lead*
