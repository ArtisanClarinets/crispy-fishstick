# CARE_ADDON_MATRIX - Vantus Care

**Last updated:** 2026-03-07
**Purpose:** Canonical add-on eligibility and packaging matrix for Care tiers

## Add-on matrix

| Add-on | Foundation | Advanced | Sovereign | Notes |
|---|---|---|---|---|
| Basic server management | Optional | Optional | Optional | Use catalog pricing |
| Application server management | Not standard | Optional | Optional | Usually paired with stronger governance |
| Database server management | Not standard | Quote as scoped | Optional | Requires architecture review |
| After-hours coverage | Optional | Optional | Optional | Requires response and escalation definition |
| Compliance evidence support | Quote as scoped | Optional | Optional | Does not include legal or certification guarantees |
| Hardware procurement assistance | Optional | Optional | Optional | Outright purchase only |
| Project work outside recurring scope | Quote as project | Quote as project | Quote as project | Not bundled into recurring fee |

## Packaging rules

- Add-ons must map to the active Care tier names only.
- Do not use deprecated tier labels in proposals, pricing pages, or catalogs.
- If an add-on materially changes risk or governance expectations, review whether the client should move to a higher tier.
- If an item becomes recurring and operationally significant, document it in the service order and reporting pack.

## Resolver rule

When a public page needs a numeric add-on value, resolve it from `catalogs/pricing_catalog_v3.json`.
