Vantus Systems — Security & Publication Review for SOPs and Pricing

Purpose: Provide a redaction and publication checklist to prevent leakage of sensitive operational details before publishing SOPs or pricing artifacts.

Risks:
- Internal credentials or tool URLs embedded in SOPs
- Vendor contract terms with sensitive pricing discounts
- Detailed runbooks revealing monitoring agent credentials or escalation endpoints
- Client-identifying information or customer examples

Redaction checklist (required before public publish):
1. Remove all IP addresses, internal hostnames, and management URLs.
2. Replace vendor contract references and pricing discounts with generic placeholders.
3. Remove or redact any client names, case studies, or PII.
4. Remove specific internal contact emails or replace with "support@vantus.systems".
5. Replace screenshots containing sensitive UI or logs with sanitized images or pseudodata.
6. Ensure no API keys, passwords, or credentials are present (run repo secret scan).

Public vs Internal SOP split recommendation:
- Public: High-level SOPs (purpose, scope, responsibilities, high-level steps, triggers, QA criteria).
- Internal (private): Detailed runbooks, exact commands, scripts, vendor account IDs, escalation contact numbers, and internal tool integration notes.

Approval & Process:
- Content owner approves sanitized version.
- Security reviews sanitized doc and signs off.
- Legal performs spot-check for contract leakage.

Output: This file (docs/assistant-outputs/security_review_publication.md) serves as the canonical checklist.
