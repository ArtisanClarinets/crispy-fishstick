# SOP-CARE-003: Pricing Display Rules (SKU-Based; No Hardcoded Prices)

**Document ID:** VS-CARE-OPS-003  
**Version:** 2.0.0 (Launch Ready)  
**Effective Date:** 2026-02-01  
**Owner:** Vantus Care Program  
**Status:** Active  
**Reading Level:** 8th Grade  
**Audience:** Small Business Owners

---

## What This SOP Does

This SOP prevents pricing mistakes and accidental promises.

**Rule:** Public pricing language must be **anchored to a single source of truth** and must not contain stale or hardcoded numbers scattered across pages.

---

## Pricing Sources of Truth

All published anchors and internal quoting rules live in:

- `../pricing/CARE_PRICING_PUBLIC.md` (public anchors and typical ranges)
- `../pricing/catalogs/pricing_catalog_v3.json` (internal packaging and catalog reference)

If a page, proposal, or email contradicts these sources, the YAML files win.

---

## Public Pricing Display Rules

1. **Use “starting at” language** for public pages.
   - Example: “Website + CMS starts at $12,000.”

2. **Do not publish custom portal pricing as a single number**.
   - Publish a range and state that scope determines final pricing.

3. **Always separate hardware from services**.
   - Hardware is client-owned and quoted separately.

4. **Include a “last verified” date** on any public pricing page.

---

## Quoting Rules (Internal)

1. No quote is valid without:
   - written scope,
   - page inventory,
   - acceptance criteria,
   - deployment mode selection.

2. Discounts:
   - Default max without approval: 5%
   - Max with founder approval: 15%
   - Never discount below the gross margin floor.

3. All out-of-scope work becomes a **Change Request** before starting.

---

## Quarterly Pricing Verification Checklist

- [ ] Review `../pricing/CARE_PRICING_PUBLIC.md` and confirm starting prices and ranges.
- [ ] Review `../pricing/catalogs/pricing_catalog_v3.json` and confirm catalog structure is still aligned.
- [ ] Update `last_updated` in YAML files.
- [ ] Spot-check public pages for mismatches.
- [ ] Spot-check proposal template for mismatches.

---

## Quality Gate

A release is blocked if ANY document contains:

- the literal placeholder text "See pricing/CARE_PRICING_PUBLIC.md"
- legacy placeholder codes (example: VS-CARE-UNASSIGNED)
- or other placeholder pricing tokens.

---

## Version History

| Version | Date       | Author         | Changes                                               |
| ------- | ---------- | -------------- | ----------------------------------------------------- |
| 2.1.0   | 2026-03-05 | Dylan Thompson | Removed placeholders, aligned to pricing YAML sources |
