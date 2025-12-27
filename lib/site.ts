export const siteConfig = {
  name: "Dylan Thompson",
  company: "Thompson Systems",
  tagline: "Engineering for High-Trust Products",
  description:
    "A specialized engineering studio for founders who demand production-grade quality, rigorous systems, and Apple-caliber interfaces.",
  email: "dylan@thompsonsystems.com",
  links: {
    github: "https://github.com/dylanthompson-demo",
    linkedin: "https://linkedin.com/in/dylanthompson-demo",
    twitter: "https://twitter.com/dylanthompson-demo",
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
      image: "/images/shopify-sync-hero.jpg",
    },
    {
      title: "Fintech Dashboard",
      description: "Real-time analytics and reporting for a Series B fintech.",
      slug: "fintech-dashboard",
      image: "/images/fintech-hero.jpg",
    },
    {
      title: "HealthTech Patient Portal",
      description: "HIPAA-compliant patient onboarding and scheduling system.",
      slug: "healthtech-platform",
      image: "/images/healthtech-hero.jpg",
    },
  ],
  // Used for placeholder generation if no image provided
  workPlaceholders: {
    "shopify-admin-sync": {
      gradient: "from-blue-500/20 to-cyan-500/20",
      accent: "text-blue-500",
    },
    "fintech-dashboard": {
      gradient: "from-emerald-500/20 to-teal-500/20",
      accent: "text-emerald-500",
    },
    "healthtech-platform": {
      gradient: "from-rose-500/20 to-orange-500/20",
      accent: "text-rose-500",
    },
  },
};

export type SiteConfig = typeof siteConfig;
