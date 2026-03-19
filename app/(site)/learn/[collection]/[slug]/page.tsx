import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

type Props = { params: Promise<{ collection: string; slug: string }> };

const ARTICLES: Record<string, Record<string, {
  title: string;
  excerpt: string;
  readTime: string;
  published: string;
  content: { heading: string; body: string }[];
}>> = {
  engineering: {
    "rigor-in-products": {
      title: "What Engineering Rigour Actually Means for a Small Business Website",
      excerpt: "Most small business websites are built to look good at launch and fall apart six months later. Here is what a production-grade approach looks like in practice.",
      readTime: "7 min",
      published: "2024-11-01",
      content: [
        {
          heading: "The gap between \"looks great\" and \"works reliably\"",
          body: "A visually polished website and a reliable one are not the same thing. Design agencies optimise for the handoff meeting. We optimise for the 18-month mark — when the person who built it is no longer around and someone on your team needs to update a phone number without breaking the homepage.",
        },
        {
          heading: "What rigour actually means in practice",
          body: "It means every page load is instrumented, so we know when performance degrades before your customers notice. It means the CMS has schema validation, so a non-technical editor cannot accidentally publish a page with broken metadata. It means your hosting environment has zero shared-state between tenants, your secrets are managed properly, and your CI pipeline runs a type-check and accessibility scan on every push.",
        },
        {
          heading: "The cost of cutting corners",
          body: "The average small business website has three to seven critical vulnerabilities at launch — not from malice but from shortcuts taken during development. Outdated dependencies, hardcoded secrets, missing Content Security Policy headers, no rate limiting on contact forms. These are not hypothetical risks. They are the reasons small business sites get scraped, spammed, or defaced.",
        },
        {
          heading: "How we apply this",
          body: "Every project we deliver includes: automated Lighthouse CI checks (performance, accessibility, SEO all at 90+), dependency audits, security headers configured to the OWASP standard, and a handoff package with documented maintenance procedures. We are not done until the site can be maintained by someone other than us.",
        },
      ],
    },
    "graphql-at-scale": {
      title: "When to Use GraphQL and When to Use REST",
      excerpt: "GraphQL is a powerful tool in the right context. Understanding when it adds value versus when it adds unnecessary complexity is an important decision for any project.",
      readTime: "9 min",
      published: "2024-10-15",
      content: [
        {
          heading: "The right tool for the right job",
          body: "GraphQL was designed to solve a specific problem: under- and over-fetching data in large applications with many consumers. For a marketing site, an e-commerce storefront, or a CMS-driven blog, it introduces more complexity than it solves. REST or simple JSON API endpoints are almost always the better choice.",
        },
        {
          heading: "Where GraphQL genuinely wins",
          body: "Custom dashboards with complex, nested data requirements. Applications where the same data is consumed by a iOS app, an Android app, and a web frontend simultaneously. Internal tooling where the data model is rapidly evolving. In these contexts, GraphQL's declarative query language, strong typing, and introspection capabilities provide real developer productivity gains.",
        },
        {
          heading: "The hidden costs",
          body: "GraphQL shifts complexity from the server to the client. Your frontend engineers need to understand query batching, fragment colocation, and cache normalisation. Your infrastructure team needs to reason about query depth limits and rate limiting at the operation level rather than the URL level. These are solvable problems, but they require investment.",
        },
        {
          heading: "Our default recommendation",
          body: "For most clients, we start with a conventional REST API or a well-structured Next.js server-side data layer. We introduce GraphQL only when there is a demonstrated need — typically when a project involves multiple distinct frontend consumers fetching overlapping data sets. The criterion is simple: does this architecture make the application easier to maintain in two years, or harder?",
        },
      ],
    },
  },
  design: {
    "designing-for-trust": {
      title: "How Website Design Communicates Credibility to Customers",
      excerpt: "Trust is formed in milliseconds. The design decisions that build or destroy credibility before a visitor reads a single word of copy.",
      readTime: "6 min",
      published: "2024-09-20",
      content: [
        {
          heading: "The 50-millisecond window",
          body: "Research from Carleton University found that visitors form visual impressions of a website in approximately 50 milliseconds — long before any text is processed. Those impressions correlate directly with trust judgements. A site that looks outdated, cluttered, or inconsistent signals unreliability before the visitor has consciously evaluated anything.",
        },
        {
          heading: "What low-trust design looks like",
          body: "Inconsistent typography. Stock photography with obvious watermarks or generic smiling people. Contact forms that do not confirm submission. Phone numbers that are not clickable on mobile. SSL certificate warnings. Slow load times on mobile connections. Broken links. These are not minor polish issues — each one is a measurable trust signal that reduces conversion rates.",
        },
        {
          heading: "What high-trust design actually requires",
          body: "Consistency above all. A limited, coherent colour palette applied without exception. Typography with clear hierarchy. Imagery that is either genuinely specific to your business (real photos of real work) or deliberately abstract. Negative space used to signal confidence rather than emptiness. And load performance: a site that loads in under 2 seconds on mobile communicates technical competence.",
        },
        {
          heading: "The business case",
          body: "We have seen conversion rate improvements of 15% to 60% from design-only changes to existing pages — without changing the copy or the offer. The layout, the visual hierarchy, the heading structure, the colour contrast. These are not aesthetic choices. They are business decisions with measurable financial outcomes. We treat them that way.",
        },
      ],
    },
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection, slug } = await params;
  const article = ARTICLES[collection]?.[slug];
  if (!article) return { title: "Not Found" };
  return {
    title: `${article.title} | Vantus Learn`,
    description: article.excerpt,
  };
}

export async function generateStaticParams() {
  const paths: { collection: string; slug: string }[] = [];
  for (const collection of Object.keys(ARTICLES)) {
    for (const slug of Object.keys(ARTICLES[collection])) {
      paths.push({ collection, slug });
    }
  }
  return paths;
}

export default async function LearnArticlePage({ params }: Props) {
  const { collection, slug } = await params;
  const article = ARTICLES[collection]?.[slug];
  if (!article) notFound();

  return (
    <div className="flex flex-col gap-12 pb-24">
      {/* Back nav */}
      <div className="pt-10 px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <Link
          href="/learn"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All articles
        </Link>
      </div>

      {/* Header */}
      <header className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="capitalize">{collection}</Badge>
          <span className="text-xs text-muted-foreground">{article.readTime} read</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">
            {new Date(article.published).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance leading-tight">
          {article.title}
        </h1>
        <p className="font-body text-lg text-muted-foreground leading-relaxed">{article.excerpt}</p>
      </header>

      {/* Divider */}
      <div className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <hr className="border-border" />
      </div>

      {/* Content */}
      <article className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full space-y-10">
        {article.content.map((section, i) => (
          <section key={i} className="space-y-3">
            <h2 className="font-heading text-xl md:text-2xl font-bold">{section.heading}</h2>
            <p className="font-body text-base md:text-lg leading-relaxed text-foreground/80">{section.body}</p>
          </section>
        ))}
      </article>

      {/* CTA */}
      <div className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <div
          className="rounded-2xl p-8 md:p-10 space-y-4 text-center bg-navy text-cream"
          >
          <h3 className="font-heading text-2xl font-bold">Ready to apply this to your business?</h3>
          <p className="font-body text-base opacity-80">
            A free audit is the fastest way to understand what your current site needs.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full px-10 font-semibold bg-sky"
          >
            <Link href="/start-audit">Start Your Free Audit</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
