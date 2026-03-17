# CARE_PROPOSAL_ASSEMBLY_WORKFLOW

**Audience:** Sales, delivery, account leadership
**Last updated:** 2026-03-07
**Classification:** Internal - sales assembly workflow
**Publication rule:** Internal reference only.

## Purpose

This workflow shows how to assemble a sales-ready Care proposal pack using the canonical commercial documents.
Use it to keep pricing, scope, approvals, and service boundaries aligned.

## Core document set

1. `TPL-CARE-PROPOSAL.md`
2. `TPL-CARE-SERVICE-ORDER.md`
3. `TPL-CARE-AUTHORIZATION-FORM.md`
4. `TPL-CARE-SLA-SCHEDULE.md`

## Supporting inputs

Use these supporting documents while building the pack:

- `../CARE_SERVICE_CATALOG_PUBLIC.md`
- `../pricing/CARE_PRICING_PUBLIC.md`
- `../pricing/CARE_ADDON_MATRIX.md`
- `../CARE_BUILD_TO_CARE_CROSSWALK.md`
- `CARE_QUOTE_ASSUMPTIONS_LIBRARY.md`
- `CARE_DISCOUNT_GOVERNANCE.md`

## Assembly order

### Step 1: Confirm fit and tier

Use:
- `../CARE_SERVICE_CATALOG_PUBLIC.md`
- `../CARE_BUILD_TO_CARE_CROSSWALK.md`
- `../sops/SOP-CARE-004-Care-Fit-Check-Qualification-Module-Mapping.md`

Output:
- recommended tier,
- key add-ons,
- support-window expectations,
- any project-work exclusions.

### Step 2: Build the proposal

Use `TPL-CARE-PROPOSAL.md` to produce the client-facing commercial summary.
This is the readable sales document that explains:

- what the client is buying,
- what is included,
- what is excluded,
- what assumptions drive price,
- and what happens next.

### Step 3: Build the service order

Use `TPL-CARE-SERVICE-ORDER.md` to turn the proposal into the binding scope summary.
This document should define:

- selected tier,
- covered environments,
- support window,
- response targets,
- recurring fee,
- transition fee,
- exclusions,
- client dependencies.

### Step 4: Build the SLA schedule

Use `TPL-CARE-SLA-SCHEDULE.md` to define the service levels that support the service order.
Keep severity definitions, response targets, communication cadence, and exclusions aligned to the sold scope.

### Step 5: Build the authorization form

Use `TPL-CARE-AUTHORIZATION-FORM.md` after the client accepts the commercial package.
This form confirms:

- recurring service start authorization,
- ownership and access acknowledgement,
- billing authorization,
- and separation of recurring support from project work.

## Pricing control rules

Before sending the pack:

- confirm tier and add-on pricing against `../pricing/CARE_PRICING_PUBLIC.md`,
- confirm assumptions against `CARE_QUOTE_ASSUMPTIONS_LIBRARY.md`,
- confirm any discount against `CARE_DISCOUNT_GOVERNANCE.md`,
- confirm no project work is being hidden in recurring scope.

## Final review checklist

Before release, verify that:

- the proposal and service order use the same tier,
- the SLA schedule matches the sold support window,
- exclusions are consistent across all documents,
- client ownership language is preserved,
- hardware leasing language does not appear,
- pricing and add-ons match the canonical pricing docs,
- the authorization form references the correct commercial documents.

## Handoff rule

Once the pack is signed, hand off to delivery using:

- `../sops/SOP-CARE-005-Proposal-SOW-Authorization-Pack-Care.md`
- `../sops/SOP-CARE-006-Sales-Handoff-to-Delivery-Care.md`
