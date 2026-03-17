# PORTAL_CONTENT_MAP — Client Portal Content and Data
**Version:** 2.0.0  
**Date:** 2026-02-22  
**Scope:** Client Portal only

---

## 0) Rules
- Portal content is **operational**, not marketing.
- Any claim must be backed by an artifact, an audit entry, or a measurable method.
- No hardcoded pricing numbers in UI; billing data comes from billing source (Stripe/webhooks) and internal entitlement mapping.

---

## 1) Page-by-page content map

## /portal/login
- Purpose: authenticate
- Content: minimal; security guidance; “forgot password” path
- Data: none (until submit)

## /portal/select-org
- Purpose: choose org (multi-org accounts)
- Content: org list, last accessed, role indicator
- Data: memberships list (server-side)

## /portal/dashboard
- Purpose: “state of the relationship”
- Content blocks:
  - Work summary (milestones due, latest update)
  - Ticket summary (open, awaiting response)
  - Docs summary (latest deliverables)
  - Billing status (read-only snippet)
- Data sources: Work items, tickets, docs index, billing summary

## /portal/work/*
### Updates
- Content: update title, author (Vantus), date, linked artifacts
- Data: Updates entity + immutable history

### Milestones
- Content: timeline, status, linked docs/tickets
- Data: Milestone entity

### Decisions
- Content: decision summary, rationale, ADR link/reference, date
- Data: Decision entity

### Risks
- Content: severity, mitigation, owner, due date
- Data: Risk entity

## /portal/tickets
- Purpose: support channel with accountability
- Content: filters, SLA indicator, assignment
- Data: ticket list

## /portal/tickets/[id]
- Content: messages, attachments, status timeline
- Data: ticket + messages + attachment metadata

## /portal/docs
- Purpose: evidence vault
- Content: filters + list + classifications
- Data: document index

## /portal/docs/[id]
- Content: version, hash, supersedes links, download actions
- Data: document metadata + audit entries

## /portal/billing
- Purpose: clarity on care tier and invoices
- Content: plan/tier + entitlements + invoice list
- Data: billing summary (server-side), invoices list

## /portal/users
- Purpose: org membership management (for Org Owner)
- Content: user list, roles, invite actions
- Data: memberships, invites

## /portal/settings
- Purpose: personal preferences
- Content: profile, sessions link, notification settings (optional)

---

## 2) Notifications content
- Email templates for:
  - invite accepted
  - password reset
  - ticket update
  - approval needed (phase 2)
- In-app notifications optional; must not leak sensitive content.

