export const siteConfig = {
  name: "YOUR_NAME_HERE",
  company: "YOUR_COMPANY_NAME_HERE",
  tagline: "High-Performance Systems & Premium Interfaces",
  description:
    "A specialized solo studio for founders who need production-grade engineering and Apple-caliber design.",
  email: "YOUR_EMAIL_HERE",
  links: {
    github: "YOUR_GITHUB_URL_HERE",
    linkedin: "YOUR_LINKEDIN_URL_HERE",
    twitter: "YOUR_TWITTER_URL_HERE",
  },
  cta: {
    primary: {
      text: "Book a call",
      href: "/contact",
    },
    secondary: {
      text: "View Work",
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
      slug: "healthtech-portal",
      image: "/images/healthtech-hero.jpg",
    },
  ],
  skills: [
    { name: "React / Next.js", level: 98 },
    { name: "TypeScript", level: 95 },
    { name: "UI / UX Design", level: 90 },
    { name: "CSS / Tailwind", level: 98 },
    { name: "Node.js / Systems", level: 92 },
    { name: "Performance Engineering", level: 94 },
  ],
};

export type SiteConfig = typeof siteConfig;
