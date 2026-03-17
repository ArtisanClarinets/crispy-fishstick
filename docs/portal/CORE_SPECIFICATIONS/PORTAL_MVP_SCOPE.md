# Client Portal — MVP Scope (Aligned to Bootstrapped Delivery)
**Version:** 1.1
**Last Updated:** 2026-03-05

This document scopes the client portal to what you need to deliver the **first 20 clients** without drowning in product work.

## 0) Principle: don’t build a second system
The Portal should not become a separate product with its own logic.

**Design rule:** the Portal is a **restricted client view** into VSP (Vantus Studio Platform).
- Same project records.
- Same change requests.
- Same content approvals.
- Same audit logs.

This is how you stay “big-dog scalable” without big-dog headcount.

---

## 1) When you build the Portal (sequencing gates)
You do **not** build Portal MVP until Offer A/B is repeatable.

### Gate criteria (all must be true)
- You have shipped **5 Website+CMS projects** end-to-end.
- Your delivery cycle time is stable (not increasing with each project).
- Scope creep is controlled (change requests are logged and approved).
- You have at least **3 proof pages** and **5 reviews** published.

If these aren’t true, the Portal is a distraction.

---

## 2) What the portal is (MVP)
A simple, secure view where clients can:
- see project status,
- review/approve content,
- submit change requests,
- access the handoff pack after launch.

## 3) What the portal is NOT (MVP)
- A full ticketing system.
- A full billing/invoicing system.
- A general-purpose file sharing platform.

---

## 4) MVP features
### 4.1 Authentication
- Client login
- MFA recommended (phase 2)

### 4.2 Project visibility
- Current stage: discovery → content → build → QA → deploy → handoff
- Target launch date and current risks

### 4.3 Content approvals
- Page inventory list
- Approve/reject with notes

### 4.4 Change requests
- Submit request
- See status (submitted → estimating → approved → in progress → shipped)

### 4.5 Handoff vault (post-launch)
- Runbook
- Credentials handoff checklist
- Proof artifacts (performance/a11y/security)

---

## 5) Release gates
- Must be plain-language and usable by non-technical owners.
- Must log approvals and changes.
- Must enforce deny-by-default access.

---

## 6) Relationship to full Portal PRD
`PORTAL.PRD.md` remains the long-term vision.
This MVP scope is the **actual build plan** until you have repeatable demand.
