export const siteConfig = {
  name: "Dylan Thompson",
  company: "Thompson Systems",
  tagline: "Engineering for High-Trust Products",
  description:
    "A specialized engineering studio for founders who demand production-grade quality, rigorous systems, and Apple-caliber interfaces.",
  email: "dylan@thompsonsystems.com",
  links: {
    github: null,
    linkedin: null,
    twitter: null,
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
      role: "Lead Engineer",
      coverImage: null,
    },
    {
      title: "Fintech Dashboard",
      description: "Real-time analytics and reporting for a Series B fintech.",
      slug: "fintech-dashboard",
      outcome: "Sub-200ms analytics refresh under 30M events/day.",
      constraints: "Regulatory audit trails and SOC2 logging requirements.",
      role: "Product Engineer",
      coverImage: null,
    },
    {
      title: "HealthTech Patient Portal",
      description: "HIPAA-compliant patient onboarding and scheduling system.",
      slug: "healthtech-platform",
      outcome: "42% reduction in intake time across 12 clinics.",
      constraints: "HIPAA safeguards with legacy EMR integrations.",
      role: "Lead Engineer",
      coverImage: null,
    },
  ],
  stackPrimary: [
    "Next.js App Router",
    "React 18",
    "TypeScript (strict)",
    "Tailwind CSS",
    "Framer Motion",
    "MDX Content Pipeline",
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
