import type { Metadata } from "next";
import { Code, Palette, Zap, Layers, Database, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description: "Comprehensive digital services tailored to your needs.",
};

const services = [
  {
    icon: Palette,
    title: "Design",
    description:
      "User-centered design that creates meaningful experiences and drives engagement.",
    features: [
      "UI/UX Design",
      "Brand Identity",
      "Design Systems",
      "Prototyping",
      "User Research",
    ],
  },
  {
    icon: Code,
    title: "Development",
    description:
      "Modern, scalable web applications built with cutting-edge technologies.",
    features: [
      "Web Applications",
      "E-Commerce",
      "Progressive Web Apps",
      "API Development",
      "Performance Optimization",
    ],
  },
  {
    icon: Zap,
    title: "Integration",
    description:
      "Seamless connections between your tools and platforms for efficient workflows.",
    features: [
      "API Integration",
      "Data Synchronization",
      "Workflow Automation",
      "Third-party Services",
      "Custom Connectors",
    ],
  },
  {
    icon: Layers,
    title: "Strategy",
    description:
      "Data-driven digital strategies that align with your business goals.",
    features: [
      "Digital Strategy",
      "Technical Consulting",
      "Architecture Planning",
      "Technology Selection",
      "Roadmap Development",
    ],
  },
  {
    icon: Database,
    title: "Data & Analytics",
    description:
      "Insights and intelligence to make informed decisions and drive growth.",
    features: [
      "Analytics Implementation",
      "Data Visualization",
      "Reporting Dashboards",
      "Performance Monitoring",
      "Business Intelligence",
    ],
  },
  {
    icon: Sparkles,
    title: "Optimization",
    description:
      "Continuous improvement of performance, SEO, and user experience.",
    features: [
      "Performance Tuning",
      "SEO Optimization",
      "Conversion Rate Optimization",
      "Accessibility Compliance",
      "Code Audits",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to launch and beyond, we provide comprehensive digital
            services tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-background rounded-2xl p-8 border border-border hover:border-foreground/20 transition-all"
              >
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-sm flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-foreground"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-secondary/50 rounded-2xl p-12 border border-border">
            <h2 className="text-3xl font-bold mb-4">
              Ready to start your project?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help bring your vision to life with our
              expertise and dedication.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
