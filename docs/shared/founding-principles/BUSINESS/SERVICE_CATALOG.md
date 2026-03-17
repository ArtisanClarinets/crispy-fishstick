# SERVICE CATALOG — Vantus Systems (Authoritative)
**Version:** 2.0
**Last Updated:** 2026-03-05

> This replaces earlier drafts that contained unresolved price placeholders.
> Public-facing service language lives in `../../../enterprise_pack/03_offers/SERVICE_CATALOG_PUBLIC.md`.

## 1) Core offers (productized)

### Offer A: Website Rebuild (Modern + Complete)
**Outcome:** a modern, fast, accessible website with complete content that generates trust and leads.
**Includes:** content workbook, on-page SEO baseline, analytics, hardened deployment, owner handoff.

### Offer B (Recommended): Website + CMS
**Outcome:** everything in Offer A, plus the business can update content without calling a developer.
**Includes:** CMS setup, content model, editorial roles, training, publish workflow.

### Offer C: Website + Business Portal (Customer and/or Admin)
**Outcome:** a website plus a secure portal for one primary workflow.
**Includes:** auth, RBAC, audit log (core actions), one integration if needed.
**Constraint:** portal work is scoped as MVP modules, not enterprise re-platforming.

---

## 2) Infrastructure services

### Local server install (client-owned hardware)
- Hardware specification guidance (client purchases)
- Hardened install
- Backups and recovery runbook

### Cloud deployment
- VPS + Docker + NGINX baseline
- Optional managed services for higher uptime requirements

---

## 3) Workflow optimization and integrations
Examples:
- forms → CRM routing
- appointment/quote workflows
- document vault
- internal admin tooling

---

## 4) Support and management (later / optional)
Vantus Care lives under `care/` and `shared/vantus.care/`.

Rule: do **not** sell Care until delivery for Offers A/B is consistent.

---

## 5) Pricing policy
- Pricing ranges are defined in `../../../enterprise_pack/03_offers/PRICING_RANGES.md`.
- Final pricing is established after discovery and written scope.
- Discounts require an explicit reason and approval (see `../../../pricing/pricing_ops.yaml`).
