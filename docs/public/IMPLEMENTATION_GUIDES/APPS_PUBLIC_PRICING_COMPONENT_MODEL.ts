/**
 * Public Pricing Component Model
 *
 * Strategic Context: Option A — Gulf Coast Leader
 * Target Market: Gulf Coast SMBs (Ft. Walton, Pensacola, Mobile)
 * Revenue Target: $500K Y1 → $1.4M Y2 → $2.2M Y3
 *
 * Version: 2.1
 * Last Updated: 2026-03-15
 */

export type PriceRangeUsd = readonly [number, number];

export type OfferKey =
  | "website_rebuild"
  | "website_plus_cms"
  | "website_plus_portal";

export type OfferSlug =
  | "website-rebuild"
  | "website-plus-cms"
  | "website-plus-portal";

export type OfferPrice = {
  key: OfferKey;
  slug: OfferSlug;
  name: string;
  startingAtUsd: number;
  typicalRangeUsd: PriceRangeUsd;
};

export type RangePrice = {
  key: string;
  name: string;
  typicalRangeUsd: PriceRangeUsd;
};

export type PublicPricingModel = {
  version: "2.1";
  lastUpdated: "2026-03-15";
  strategy: "Option A - Gulf Coast Leader";
  targetMarket: "Gulf Coast SMBs (Ft. Walton, Pensacola, Mobile)";
  revenueTarget: "$500K Y1, $1.4M Y2, $2.2M Y3";
  offers: readonly OfferPrice[];
  infrastructure: readonly RangePrice[];
  addOns: readonly RangePrice[];
  includeCareSection: false;
  legalNote: string;
};

export const publicPricingModel: PublicPricingModel = {
  version: "2.1",
  lastUpdated: "2026-03-15",
  strategy: "Option A - Gulf Coast Leader",
  targetMarket: "Gulf Coast SMBs (Ft. Walton, Pensacola, Mobile)",
  revenueTarget: "$500K Y1, $1.4M Y2, $2.2M Y3",
  offers: [
    {
      key: "website_rebuild",
      slug: "website-rebuild",
      name: "Website Rebuild (Modern + Complete)",
      startingAtUsd: 15000,
      typicalRangeUsd: [15000, 55000],
    },
    {
      key: "website_plus_cms",
      slug: "website-plus-cms",
      name: "Website + CMS (Recommended)",
      startingAtUsd: 32000,
      typicalRangeUsd: [32000, 125000],
    },
    {
      key: "website_plus_portal",
      slug: "website-plus-portal",
      name: "Website + Business Portal",
      startingAtUsd: 90000,
      typicalRangeUsd: [90000, 400000],
    },
  ],
  infrastructure: [
    {
      key: "cloud_deploy_baseline",
      name: "Cloud deployment baseline (VPS + Docker + NGINX)",
      typicalRangeUsd: [7000, 30000],
    },
    {
      key: "on_prem_install",
      name: "On-prem install + hardening (client-owned hardware)",
      typicalRangeUsd: [15000, 70000],
    },
  ],
  addOns: [
    {
      key: "discovery_solution_blueprint",
      name: "Discovery + Solution Blueprint",
      typicalRangeUsd: [5000, 20000],
    },
    {
      key: "data_and_content_migration",
      name: "Data and Content Migration",
      typicalRangeUsd: [4000, 30000],
    },
    {
      key: "integration_per_system",
      name: "Integration (per system)",
      typicalRangeUsd: [8000, 35000],
    },
    {
      key: "sso_and_rbac_hardening",
      name: "SSO and RBAC Hardening",
      typicalRangeUsd: [12000, 50000],
    },
    {
      key: "analytics_and_dashboarding",
      name: "Analytics and Dashboarding",
      typicalRangeUsd: [7000, 30000],
    },
    {
      key: "localization_framework",
      name: "Localization Framework",
      typicalRangeUsd: [8000, 40000],
    },
  ],
  includeCareSection: false,
  legalNote:
    "Final pricing is confirmed after discovery, complexity scoring, and written scope. Out-of-scope work is handled through formal change requests.",
};

export const formatUsd = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const formatUsdRange = (range: PriceRangeUsd): string =>
  `${formatUsd(range[0])}-${formatUsd(range[1])}`;
