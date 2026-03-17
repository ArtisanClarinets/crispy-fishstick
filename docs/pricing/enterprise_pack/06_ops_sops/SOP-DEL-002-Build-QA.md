# SOP: Build and QA

**Version:** 1.0
**Last Updated:** 2026-03-05
**Owner:** Delivery Lead
**Audience:** Engineer / Delivery Lead

---

## 1. Purpose
Build the site and pass quality gates before launch.

## 2. Who Does This
Engineer and delivery lead.

## 3. Tools You Need
- Vantus Seed repo
- Lighthouse
- Accessibility checker
- Security headers check

## 4. Starting Requirements
Before you start, make sure:
- [ ] Content is approved
- [ ] Staging environment is ready

## 5. Step-by-Step Instructions

### Step 1: Build from the seed
1. Create the project from Vantus Seed.
2. Apply the client design and content.

**What you should see:** A working staging site.

### Step 2: Run performance checks
1. Run Lighthouse.
2. Fix issues until score is 95+.

**Warning:** Do not ignore mobile performance.

### Step 3: Run accessibility checks
1. Run WCAG checks.
2. Fix critical issues.

### Step 4: Run security baseline
1. Verify security headers.
2. Verify input validation on forms.

## 6. Quality Check
After finishing, verify:
- [ ] Lighthouse 95+
- [ ] Accessibility checklist passed
- [ ] Forms tested (happy + error paths)
- [ ] No console errors

## 7. Common Problems and Fixes

| Problem | Why It Happens | How to Fix |
|---------|---------------|------------|
| Low Lighthouse score | Images too large | Compress and use next/image |
| Broken forms | Missing validation | Add Zod schema at boundary |

## 8. Notes
**Assumptions made:**
- Performance and accessibility are not optional.

**Who to ask for help:** Delivery lead

## 9. Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-05 | Dylan Thompson | Initial version |
