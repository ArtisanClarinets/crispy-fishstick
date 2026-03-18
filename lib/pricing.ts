/**
 * Canonical pricing data for Vantus Systems.
 * Source of truth: docs/pricing/pricing_public.yaml v2.1
 * All prices are project-based. Final pricing confirmed after discovery and written scope.
 */

export interface Offer {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  rangeMin: number;
  rangeMax: number;
  rangeLabel: string;
  startingAt: string;
  timeline: string;
  ideal: string;
  outcomes: string[];
  deliverables: string[];
  featured: boolean;
}

export interface Infrastructure {
  slug: string;
  name: string;
  rangeLabel: string;
  description: string;
}

export interface AddOn {
  slug: string;
  name: string;
  rangeLabel: string;
  description: string;
}

export const OFFERS: Offer[] = [
  {
    slug: "website-rebuild",
    name: "Website Rebuild",
    shortName: "Website Rebuild",
    tagline: "High-performance website, built to last.",
    rangeMin: 15000,
    rangeMax: 55000,
    rangeLabel: "$15K – $55K",
    startingAt: "Starting at $15,000",
    timeline: "6 – 10 weeks",
    ideal: "Businesses replacing a slow WordPress, Wix, or outdated site with a production-grade platform they own.",
    outcomes: [
      "Sub-2-second page load across all devices",
      "Accessible, SEO-structured HTML and metadata",
      "Mobile-first, fully responsive design system",
      "Handoff with documentation and ownership transfer",
    ],
    deliverables: [
      "Next.js production application",
      "Design system (Figma + Tailwind tokens)",
      "Deployment pipeline (CI/CD)",
      "90-day post-launch support window",
    ],
    featured: false,
  },
  {
    slug: "website-plus-cms",
    name: "Website + CMS",
    shortName: "Website + CMS",
    tagline: "Full website with content management built in.",
    rangeMin: 32000,
    rangeMax: 125000,
    rangeLabel: "$32K – $125K",
    startingAt: "Starting at $32,000",
    timeline: "10 – 16 weeks",
    ideal: "Marketing teams and owner-operators who need to publish content, manage pages, and run campaigns without developer dependencies.",
    outcomes: [
      "Editorial team can publish and update without code changes",
      "Structured content model prevents brand drift",
      "Integrated workflow for approvals and scheduling",
      "Full audit trail for compliance-sensitive organisations",
    ],
    deliverables: [
      "Everything in Website Rebuild",
      "Headless CMS integration (Sanity or equivalent)",
      "Content model and schema design",
      "Editor training documentation",
    ],
    featured: true,
  },
  {
    slug: "website-plus-portal",
    name: "Website + Business Portal",
    shortName: "Website + Portal",
    tagline: "Custom business portal with client-facing and internal tooling.",
    rangeMin: 90000,
    rangeMax: 400000,
    rangeLabel: "$90K – $400K",
    startingAt: "Starting at $90,000",
    timeline: "16 – 30 weeks",
    ideal: "Businesses replacing spreadsheets, email chains, or fragmented tools with a purpose-built portal that centralises operations.",
    outcomes: [
      "Clients and staff work in one unified system",
      "Automations replace manual, error-prone processes",
      "Role-based access enforces data separation",
      "Audit logs satisfy compliance and insurance requirements",
    ],
    deliverables: [
      "Everything in Website + CMS",
      "Custom portal with role-based access control",
      "Integrations with existing tools (CRM, ERP, billing)",
      "Admin dashboard and reporting",
    ],
    featured: false,
  },
];

export const INFRASTRUCTURE: Infrastructure[] = [
  {
    slug: "cloud",
    name: "Cloud Hosting",
    rangeLabel: "$7K – $30K",
    description: "Managed cloud deployment on AWS, GCP, or Vercel. Includes CI/CD pipeline, staging environment, and monitoring.",
  },
  {
    slug: "on-prem",
    name: "On-Premises Deployment",
    rangeLabel: "$15K – $70K",
    description: "Installation and configuration on client-owned or co-located infrastructure. Includes hardening, monitoring, and handoff documentation.",
  },
];

export const ADD_ONS: AddOn[] = [
  {
    slug: "seo-audit",
    name: "Technical SEO Audit",
    rangeLabel: "$2K – $8K",
    description: "Comprehensive audit of crawlability, structured data, Core Web Vitals, and competitive gap analysis.",
  },
  {
    slug: "accessibility",
    name: "Accessibility Remediation",
    rangeLabel: "$3K – $15K",
    description: "WCAG 2.1 AA compliance audit, remediation, and verified re-test with report.",
  },
  {
    slug: "analytics",
    name: "Analytics & Dashboards",
    rangeLabel: "$4K – $20K",
    description: "Custom analytics pipeline, event tracking architecture, and executive reporting dashboard.",
  },
  {
    slug: "email-automation",
    name: "Email Automation",
    rangeLabel: "$3K – $12K",
    description: "Transactional and marketing email flows built on your existing ESP, with A/B testing and deliverability configuration.",
  },
  {
    slug: "payments",
    name: "Payment Integration",
    rangeLabel: "$5K – $25K",
    description: "Stripe or Braintree integration with subscription management, invoicing, and reconciliation tooling.",
  },
  {
    slug: "training",
    name: "Team Training",
    rangeLabel: "$1.5K – $6K",
    description: "Live training sessions covering CMS workflows, admin tools, and content governance for your team.",
  },
];

export const PRICING_NOTE =
  "Final pricing confirmed after discovery and written scope. All ranges represent typical project investment based on scope complexity.";

export function getOfferBySlug(slug: string): Offer | undefined {
  return OFFERS.find((o) => o.slug === slug);
}
