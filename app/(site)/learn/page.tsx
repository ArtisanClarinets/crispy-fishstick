import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Learn | Vantus Systems",
  description:
    "Engineering articles for business owners and operators. Practical guides on web performance, security, CMS architecture, and digital ownership.",
};

const ARTICLES = [
  {
    collection: "engineering",
    slug: "rigor-in-products",
    title: "What Engineering Rigour Actually Means for a Small Business Website",
    excerpt:
      "Most small business websites are built to look good at launch and fall apart six months later. Here is what a production-grade approach looks like in practice.",
    readTime: "7 min",
    tag: "Engineering",
  },
  {
    collection: "engineering",
    slug: "graphql-at-scale",
    title: "REST vs GraphQL: Which One Is Right for Your Website?",
    excerpt:
      "Two ways to connect your website to data. Here's the plain-English explanation of when each approach saves you money in the long run — and when it doesn't.",
    readTime: "9 min",
    tag: "Engineering",
  },
  {
    collection: "design",
    slug: "designing-for-trust",
    title: "How Website Design Communicates Credibility to Customers",
    excerpt:
      "Trust is formed in milliseconds. The design decisions that build or destroy credibility before a visitor reads a single word of copy.",
    readTime: "6 min",
    tag: "Design",
  },
];

const COLLECTIONS = [
  { slug: "engineering", name: "Engineering", description: "Architecture, performance, and systems thinking." },
  { slug: "design", name: "Design", description: "Trust, usability, and business outcomes." },
  { slug: "operations", name: "Operations", description: "Ownership, handoff, and long-term maintenance." },
];

export default function LearnPage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-24">
      {/* Header */}
      <section className="pt-16 md:pt-24 px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-4">
        <Badge variant="secondary" className="badge-sky uppercase tracking-wider text-xs font-semibold">
          Knowledge Base
        </Badge>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          Plain-English guides.{" "}<span className="text-gradient-brand">No jargon.</span>
        </h1>
        <p className="font-body text-xl text-muted-foreground max-w-2xl leading-relaxed text-balance">
          Written for business owners who want to understand the decisions that affect their website
          — without needing a computer science degree.
        </p>
      </section>

      {/* Collections */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-4">
        <h2 className="font-heading text-lg font-bold text-muted-foreground uppercase tracking-wider">
          Collections
        </h2>
        <div className="flex flex-wrap gap-3">
          {COLLECTIONS.map((col) => (
            <Link
              key={col.slug}
              href={`/learn/${col.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:border-[var(--vantus-sky)] hover:text-[var(--vantus-sky)] transition-colors text-sm font-medium"
            >
              <BookOpen className="h-3 w-3" />
              {col.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Article list */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-6">
        <h2 className="font-heading text-2xl font-bold">All Articles</h2>
        <div className="space-y-4">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/learn/${article.collection}/${article.slug}`}
              className="group flex flex-col md:flex-row gap-4 rounded-2xl border border-border bg-card p-6 card-glow"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="badge-sky text-xs">{article.tag}</Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />{article.readTime}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold group-hover:text-[var(--vantus-sky)] transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
              </div>
              <div className="shrink-0 flex items-center">
                <span className="text-sm font-semibold inline-flex items-center gap-1 text-sky">
                  Read <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full text-center space-y-6">
        <h2 className="font-heading text-2xl font-bold">Ready to apply this to your project?</h2>
        <p className="font-body text-muted-foreground">
          A free audit is the fastest way to see what your current site actually needs — and what it will cost to fix it.
        </p>
        <Button asChild size="lg" className="rounded-full px-10 font-semibold btn-sky-glow">
          <Link href="/start-audit">Get Your Free Audit</Link>
        </Button>
      </section>
    </div>
  );
}
