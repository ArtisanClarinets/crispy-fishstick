import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// This would typically come from a CMS or file system
const caseStudies: Record<string, any> = {
  "shopify-admin-sync": {
    title: "Shopify Admin Sync",
    description:
      "Seamless integration between Shopify GraphQL API and ERPNext for automated inventory and order management",
    category: "Integration",
    year: "2024",
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];

  if (!study) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: study.title,
    description: study.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  if (slug === "shopify-admin-sync") {
    const ShopifyAdminSync = (await import("@/content/case-studies/shopify-admin-sync.mdx")).default;
    const study = caseStudies[slug];

    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Work
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex gap-4 items-center mb-4">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {study.category}
              </span>
              <span className="text-xs text-muted-foreground">{study.year}</span>
            </div>
          </div>

          {/* MDX Content */}
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <ShopifyAdminSync />
          </article>
        </div>
      </div>
    );
  }

  notFound();
}

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({
    slug,
  }));
}
