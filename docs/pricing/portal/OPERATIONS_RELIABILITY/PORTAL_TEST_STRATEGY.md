# PORTAL_TEST_STRATEGY — Coverage Plan
**Version:** 2.0.0  
**Date:** 2026-02-22  
**Scope:** Client Portal only

---

## 1) Test pyramid
- Unit: validators, RBAC guards, sanitizers, pure mappers
- Integration: server actions/handlers with DB (org scoping)
- E2E: critical journeys

---

## 2) Required E2E journeys (stop-ship)
1) Login → Select Org → Dashboard
2) Create Ticket → Post Message → Upload Attachment metadata
3) Docs list → Doc detail → Download → Hash displayed
4) Billing → Invoice list → Invoice detail
5) Users (Org Owner) → Invite user → Accept invite

---

## 3) Security testing
- IDOR attempts (cross-tenant)
- upload type bypass attempts
- XSS payload attempts in messages
- session fixation and redirect safety checks

---

## 4) Accessibility testing
- Keyboard navigation for core templates
- Screen reader smoke test for forms and tables
