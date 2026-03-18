export const siteConfig = {
  name: "Vantus Systems",
  company: "Vantus Systems",
  tagline: "Engineering-grade websites & systems for small businesses.",
  description:
    "Engineering-grade websites & systems for small businesses. Math, not marketing.",
  email: "hello@vantus.systems",
  links: {
    github: "https://github.com/vantus-systems",
    linkedin: "https://linkedin.com/company/vantus-systems",
    twitter: "https://twitter.com/vantus_systems",
  },
  cta: {
    primary: {
      text: "Start Your Audit",
      href: "/start-audit",
    },
    secondary: {
      text: "See Packages",
      href: "/pricing",
    },
  },
  mainNav: [
    {
      title: "Services",
      href: "/services",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "Proof",
      href: "/proof",
    },
    {
      title: "Standards",
      href: "/standards",
    },
    {
      title: "Learn",
      href: "/learn",
    },
  ],
  mobileNav: [
    {
      title: "Home",
      href: "/",
      icon: "Home",
    },
    {
      title: "Services",
      href: "/services",
      icon: "Layers",
    },
    {
      title: "Pricing",
      href: "/pricing",
      icon: "CreditCard",
    },
    {
      title: "Start Audit",
      href: "/start-audit",
      icon: "Activity",
    },
    {
      title: "Contact",
      href: "/contact",
      icon: "MessageSquare",
    },
  ],
  packages: [
    {
      name: "Website Rebuild",
      slug: "website-rebuild",
      price: "From $15,000",
      range: "$15K – $55K",
      description: "Modern, complete website rebuild with production-grade engineering.",
    },
    {
      name: "Website + CMS",
      slug: "website-plus-cms",
      price: "From $32,000",
      range: "$32K – $125K",
      description: "Full website with content management system. Recommended for most businesses.",
    },
    {
      name: "Website + Business Portal",
      slug: "website-plus-portal",
      price: "From $90,000",
      range: "$90K – $400K",
      description: "Enterprise-grade website with custom business portal and integrations.",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
