import type { Metadata } from "next";
import { Code, Layers, ShieldCheck, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Specialized engineering and design services for high-stakes digital products.",
};

const services = [
  {
    icon: Code,
    title: "Design Engineering",
    description:
      "Bridging the gap between Figma and production code. I build pixel-perfect UI systems that scale.",
    features: [
      "Component Libraries",
      "Design Systems",
      "Motion & Interaction",
      "Storybook Architecture",
      "Token-based Theming",
    ],
  },
  {
    icon: Layers,
    title: "Frontend Systems",
    description:
      "Scalable React architectures for complex applications. Optimized for performance and maintainability.",
    features: [
      "Next.js Architecture",
      "State Management",
      "Performance Optimization",
      "Type-Safe APIs",
      "Legacy Migration",
    ],
  },
  {
    icon: Database,
    title: "Commerce Integrations",
    description:
      "Reliable synchronization engines and custom storefronts for high-volume commerce.",
    features: [
      "Shopify Headless",
      "ERP Synchronization",
      "Inventory Management",
      "Payment Gateways",
      "Custom Checkouts",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Audits & Rescue",
    description:
      "Deep-dive technical audits to identify bottlenecks, accessibility issues, and code debt.",
    features: [
      "Performance Audits",
      "Accessibility (WCAG)",
      "Code Quality Review",
      "Security Assessment",
      "SEO Technical Audit",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8" data-system-tone="default">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Technical Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            I don&apos;t just write code; I engineer systems. My services are designed for founders and companies who need production-grade quality from day one.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-card rounded-3xl p-8 sm:p-10 border border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-secondary group-hover:bg-foreground/5 transition-colors">
                    <Icon className="h-7 w-7 text-foreground" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm font-medium flex items-center gap-3 text-foreground/80"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="border-t border-border pt-24">
            <div className="max-w-3xl">
                <h2 className="text-3xl font-bold mb-6">
                  Have a specific challenge?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  I often take on custom engineering challenges that don&apos;t fit neatly into a bucket.
                  If you need a reliable partner to solve a hard problem, let&apos;s talk.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all font-medium text-lg"
                >
                  Book a Consultation
                </a>
            </div>
        </div>
      </div>
    </div>
  );
}
