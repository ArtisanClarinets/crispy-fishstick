export const siteConfig = {
  name: "Vantus Systems",
  company: "Vantus Systems",
  tagline: "Engineering for High-Trust Products",
  description:
    "A specialized engineering studio for founders who demand production-grade quality, rigorous systems, and Apple-caliber interfaces.",
  email: "hello@vantus.systems",
  links: {
    github: "https://github.com/vantus-systems",
    linkedin: "https://linkedin.com/company/vantus-systems",
    twitter: "https://twitter.com/vantus_systems",
  },
  cta: {
    primary: {
      text: "Book a Consultation",
      href: "/contact",
    },
    secondary: {
      text: "View Case Studies",
      href: "/work",
    },
  },
  featuredWork: [
    {
      title: "Shopify Admin Sync",
      description: "Enterprise synchronization engine for Shopify Plus → ERPNext.",
      slug: "shopify-admin-sync",
      outcome: "100% data integrity across 500k+ SKUs",
      constraints: "Black Friday traffic spikes, strict ERPNext schema enforcement.",
    },
    {
      title: "Fintech Dashboard",
      description: "Real-time analytics and reporting for a Series B fintech.",
      slug: "fintech-dashboard",
      outcome: "Sub-200ms analytics refresh under 30M events/day.",
      constraints: "Regulatory audit trails and SOC2 logging requirements.",
    },
    {
      title: "HealthTech Patient Portal",
      description: "HIPAA-compliant patient onboarding and scheduling system.",
      slug: "healthtech-platform",
      outcome: "42% reduction in intake time across 12 clinics.",
      constraints: "HIPAA safeguards with legacy EMR integrations.",
    },
  ],
  stackPrimary: [
    "Next.js App Router",
    "TypeScript Strict",
    "Framer Motion",
    "PostgreSQL / Prisma",
    "Frappe ERPNext Integrations",
    "GraphQL Federation",
  ],
  stackSecondary: [
    "Event-driven systems",
    "Observability / SLOs",
    "Infrastructure as Code",
    "Design Systems",
    "Security Reviews",
  ],
  principles: [
    {
      title: "Clarity",
      desc: "Code that explains itself. Interfaces that need no manual.",
    },
    {
      title: "Reliability",
      desc: "Systems designed to fail safely and recover instantly.",
    },
    {
      title: "Performance",
      desc: "Sub-100ms interactions. Core Web Vitals optimized.",
    },
    {
      title: "Accessibility",
      desc: "Inclusive by default. WCAG AA compliance baked in.",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
