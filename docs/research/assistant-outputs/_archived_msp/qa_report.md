# QA Report — Pricing Calculator & SOP-CL Files

Date: 2026-02-20

Scope:
- Pricing calculator prototype (docs/assistant-outputs/pricing_calculator/index.html)
- Pricing model CSV (docs/assistant-outputs/pricing_model.csv)
- SOP-CL-001..SOP-CL-010 files in company-documentation/sops/

Pricing calculator test vectors (10):
1) 10 users, Professional, 0 servers => Monthly: 10 * See pricing/pricing_public.yaml = $1,490 (PASS)
2) 25 users, Foundation, 1 basic server => Users: 25*See pricing/pricing_public.yaml=2475, Server:129 => Total: $2,604 (PASS)
3) 5 users, Enterprise, 2 compliance servers => Users:5*See pricing/pricing_public.yaml=995, Servers:2*149=298 => Total:$1,293 (PASS)
4) 100 users, Professional, 0 servers => 100*149=14,900 (PASS)
5) 1 user, Foundation, 0 servers => 99 (PASS)
6) 50 users, Enterprise, 1 database => 50*199=9,950 + 99 => 10,049 (PASS)
7) 12 users, Professional, 1 application server => 12*149=1,788 + 99 => 1,887 (PASS)
8) 20 users, Foundation, 3 basic servers => 20*99=1,980 + 3*129=387 => 2,367 (PASS)
9) 8 users, Professional, 0 servers => 8*149=1,192 (PASS)
10) 200 users, Enterprise, 0 servers => 200*199=39,800 (PASS)

Notes: Calculator uses embedded pricing_model constants; server inclusion rules (included_servers) are not prorated across types — recommended improvement: prefer a consistent server allocation logic (e.g., included servers apply to lowest-cost server type or as a generic count offset). For now prototype behavior documented.

SOPs QA (SOP-CL-001..010):
- All files present and follow SOP template sections (Purpose, Scope, Responsibilities, Procedure, Triggers, Escalation, Quality Criteria, Related Docs, Revision History, Approval).
- Recommend adding owner names and contact details for each SOP and linking to specific templates in company-documentation/client-project-doc-templates/.

Accessibility checks:
- Pricing calculator prototype is keyboard-accessible and uses semantic elements. Color contrast minimal; for production recommend accessible color palette.

Bugs / Improvements (priority):
1) (Medium) Server inclusion logic — clarify how included servers are applied to server types. (Fix: update calculator logic) 
2) (Low) UI: Add instant annual figure clarity and per-user breakdown. (Fix: update UI copy)
3) (Low) SOP: Add owner contact info and schedule review dates. (Fix: populate Approval table)

Conclusion: Prototype meets functional expectations for an initial static pricing calculator and SOP drafts are complete. Next: refine server inclusion logic, assign owners, and perform security redaction prior to publishing.


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
