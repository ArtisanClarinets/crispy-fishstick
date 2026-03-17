# SOP: Deploy and Owner Handoff

**Version:** 1.0
**Last Updated:** 2026-03-05
**Owner:** Delivery Lead
**Audience:** Delivery Lead / Client Owner

---

## 1. Purpose
Launch safely and transfer ownership to the client.

## 2. Who Does This
Delivery lead with client owner.

## 3. Tools You Need
- Deployment checklist
- Credential handoff checklist
- Runbook template

## 4. Starting Requirements
Before you start, make sure:
- [ ] QA gates are green
- [ ] Client has access to domain and hosting accounts

## 5. Step-by-Step Instructions

### Step 1: Deploy production
1. Deploy to production.
2. Confirm HTTPS works.

**What you should see:** Live site loads correctly.

### Step 2: Verify monitoring
1. Set up uptime check.
2. Set alert email.

### Step 3: Transfer ownership
1. Confirm client account owns domain.
2. Confirm client account owns hosting.
3. Deliver credentials vault export.

**Warning:** Never keep the only copy of credentials.

### Step 4: Deliver handoff pack
1. Deliver runbook.
2. Deliver proof artifacts.
3. Deliver “how to update content” guide.

## 6. Quality Check
After finishing, verify:
- [ ] Client can log in to hosting
- [ ] Client can edit content
- [ ] Runbook delivered
- [ ] Proof artifacts delivered

## 7. Common Problems and Fixes

| Problem | Why It Happens | How to Fix |
|---------|---------------|------------|
| DNS issues | TTL delays | Plan DNS cutover window |
| Client lost access | Wrong emails | Confirm ownership early |

## 8. Notes
**Assumptions made:**
- Ownership is a core promise.

**Who to ask for help:** Founder

## 9. Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-05 | Dylan Thompson | Initial version |
