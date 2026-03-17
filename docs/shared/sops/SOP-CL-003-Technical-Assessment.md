# SOP-CL-003: Technical Assessment

## 1. PURPOSE
To perform a detailed technical assessment that documents the target environment and identifies risks, dependencies, and migration tasks.

## 2. SCOPE
Applies to Sales Engineers (SE), Solutions Architects, and Onboarding Engineers.

## 3. RESPONSIBILITIES
| Role | Responsibility |
|------|----------------|
| SE | Collect system inventory, credentials, and topology |
| Solutions Architect | Identify integration and migration risks |
| Onboarding Engineer | Validate backup and DR posture |

## 4. PROCEDURE
### Step 1: Inventory Collection
- Work with client to collect server lists, applications, databases, network equipment, and cloud tenants.

### Step 2: Risk & Compliance Flags
- Identify presence of CUI, PHI, PCI data, or other regulated data; mark for Enterprise tier consideration.

### Step 3: Baseline Performance
- Run baseline monitoring and health checks (if client consents).

### Step 4: Deliverable
- Produce Technical Assessment Report and action POAM for remediation tasks.

## 5. TRIGGERS
- Post-Sales Discovery (SOP-CL-002) or pre-onboarding approval.

## 6. ESCALATION
- If critical vulnerabilities or data exposure are discovered, immediately escalate to CTO and Security Lead.

## 7. QUALITY CRITERIA
- Assessment report completed within 5 business days; severity-ranked POAM included.

## 8. RELATED DOCUMENTS
- SOP-CL-002 Sales Discovery
- SOP-CL-006 Technical Onboarding (30-day)

## 9. REVISION HISTORY
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-20 | Enterprise Orchestrator | Initial creation |

## 10. APPROVAL
| Role | Name | Date |
|------|------|------|
| Owner | Solutions Architect | |
| Approver | CTO | |
