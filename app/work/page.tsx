import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Work",
  description: "Explore our portfolio of projects and case studies.",
};

const caseStudies = [
  {
    slug: "shopify-admin-sync",
    title: "Shopify Admin Sync",
    description:
      "Seamless integration between Shopify GraphQL API and ERPNext for automated inventory and order management",
    category: "Integration",
    year: "2024",
  },
  {
    slug: "e-commerce-platform",
    title: "Modern E-Commerce Platform",
    description:
      "High-performance online store with advanced features and exceptional user experience",
    category: "Web Development",
    year: "2024",
  },
  {
    slug: "brand-identity",
    title: "Brand Identity Redesign",
    description:
      "Complete brand overhaul including logo, guidelines, and digital presence",
    category: "Design",
    year: "2023",
  },
];

export default function WorkPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A selection of our recent projects showcasing our expertise in
            design, development, and digital strategy.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 gap-12">
          {caseStudies.map((study, index) => (
            <article
              key={study.slug}
              className="group relative bg-background rounded-2xl overflow-hidden border border-border hover:border-foreground/20 transition-all"
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap gap-4 items-center mb-4">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {study.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {study.year}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {study.title}
                </h2>

                <p className="text-muted-foreground mb-6 max-w-2xl">
                  {study.description}
                </p>

                <Link
                  href={`/work/${study.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
                >
                  View Case Study
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
