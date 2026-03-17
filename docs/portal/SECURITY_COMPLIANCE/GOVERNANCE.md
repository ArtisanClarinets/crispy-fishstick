# Portal Documentation — GOVERNANCE
**Version:** 1.2.0  
**Last Updated:** 2026-02-21  
**Applies to:** Portal code + portal packages  
**Rule:** No timelines in this document.

---

## 0) Governance goals
- prevent security regressions
- keep tenant isolation provable
- keep releases reversible
- keep docs synchronized with reality

---

## 1) Required approvals
- Standard change: maintainer approval
- Sensitive change (auth/RBAC/tenancy/uploads/exports/billing): maintainer + security reviewer + architect
- Emergency mitigation: incident commander; post-incident review required

---

## 2) ADR policy
ADR required for changes to:
- auth/session model
- RBAC model
- tenancy enforcement/query patterns
- storage interfaces for docs/exports
- export integrity model
- billing integration interface
- audit logging model

ADR must include rollback plan.

---

## 3) Data governance rules
- org isolation is mandatory on every entity
- document classification enforced
- access logs for docs and exports are mandatory
- no secrets stored as documents

---

## 4) Dependency governance
- lockfile required
- vulnerability scanning is stop-ship for critical unmitigated issues
- upgrades must not break tests or budgets

---

## 5) Documentation governance
When changing:
- routes → update portal site map
- features → update portal feature list + changelog
- operations → update runbook and incident playbooks