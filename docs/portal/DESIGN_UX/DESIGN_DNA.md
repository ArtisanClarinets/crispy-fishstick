# DESIGN_DNA — Client Portal UI/UX
**Version:** 2.0.0  
**Date:** 2026-02-22  
**Scope:** Client Portal only (authenticated surface)

---

## 0) Purpose
Define a consistent, “handmade but enterprise-rigorous” portal experience that reinforces:
- trust
- clarity
- owner-controlled systems (client ownership)
- proof over promises

---

## 1) Portal UX Principles
1. **State is explicit:** every screen answers “what is the status?” and “what happens next?”
2. **Proof is native:** show artifacts, timestamps, and audit trails where it matters.
3. **No surprises:** billing and entitlements are clear; destructive actions are guarded.
4. **Fast by default:** keep UI lightweight; Server Components first.
5. **Accessible always:** keyboard + screen reader support is non-negotiable.

---

## 2) Visual Direction (Industrial Warmth, Portal Edition)
- Calm, stable surfaces; high readability.
- Strong hierarchy for “what matters now.”
- Color is semantic (status, severity) — no decorative noise.

Token rules:
- No hardcoded colors in components.
- All surfaces use tokenized variables (themeable).

---

## 3) Information Design
### 3.1 Dashboard
- “Now” (top): next actions
- “Health” (middle): work/tickets/docs/billing summary
- “History” (bottom): what changed

### 3.2 Work hub
Use a consistent layout:
- left: list
- right: detail
- top: filters and breadcrumb

### 3.3 Tickets
- show SLA badge and assignment clearly
- show status timeline
- messages are readable and safe (sanitized markdown)

### 3.4 Docs Vault
- list view optimized for scanning
- detail view shows hash, versioning, classification

---

## 4) Components (Portal staples)
- StatusBadge (milestone/ticket/risk)
- Timeline (updates/audit events)
- EvidenceCard (doc metadata + hash)
- ApprovalPanel (approve/reject with reasons)
- EmptyState (plain language + next step)
- ErrorState (actionable, non-technical)

---

## 5) Motion & Feedback
- No long animations.
- Respect `prefers-reduced-motion`.
- Loading states must be informative, not flashy.

---

## 6) Accessibility Checklist (portal)
- Visible focus ring
- Proper landmarks and headings
- Form labels always visible
- Error summary + inline error text
- Adequate contrast for status colors


## Sync Notes
- Automated alignment patch applied (2026-02-25): legacy terminology removed, placeholders resolved, and scope sanitized per Vantus guidelines.
