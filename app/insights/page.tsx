import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Insights",
  description: "Articles, tutorials, and thoughts on design and development.",
};

const insights = [
  {
    title: "Building Scalable Next.js Applications",
    excerpt:
      "Best practices for structuring and optimizing Next.js applications for growth and performance.",
    date: "2024-01-15",
    category: "Development",
    slug: "building-scalable-nextjs-applications",
  },
  {
    title: "The Art of Modern Web Design",
    excerpt:
      "Exploring design principles that create engaging and memorable digital experiences.",
    date: "2024-01-10",
    category: "Design",
    slug: "art-of-modern-web-design",
  },
  {
    title: "API Integration Best Practices",
    excerpt:
      "How to build robust integrations between platforms with proper error handling and monitoring.",
    date: "2024-01-05",
    category: "Integration",
    slug: "api-integration-best-practices",
  },
  {
    title: "Performance Optimization Techniques",
    excerpt:
      "Practical strategies for improving web application performance and user experience.",
    date: "2023-12-28",
    category: "Performance",
    slug: "performance-optimization-techniques",
  },
  {
    title: "Accessibility in Modern Web Development",
    excerpt:
      "Creating inclusive digital experiences that work for everyone, regardless of ability.",
    date: "2023-12-20",
    category: "Accessibility",
    slug: "accessibility-modern-web-development",
  },
  {
    title: "TypeScript for Better Code Quality",
    excerpt:
      "How TypeScript helps catch bugs early and improves developer experience in large codebases.",
    date: "2023-12-15",
    category: "Development",
    slug: "typescript-better-code-quality",
  },
];

export default function InsightsPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Insights</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Articles, tutorials, and thoughts on design, development, and
            digital strategy.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight) => (
            <article
              key={insight.slug}
              className="group bg-background rounded-2xl overflow-hidden border border-border hover:border-foreground/20 transition-all"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {insight.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(insight.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                <h2 className="text-xl font-bold mb-3">{insight.title}</h2>
                <p className="text-muted-foreground mb-4">{insight.excerpt}</p>

                <Link
                  href={`/insights/${insight.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
                >
                  Read More
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
