import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

// This is a mock database of articles for the demo
const articles: Record<string, { title: string; content: string; category: string }> = {
  "ada-explained": {
    title: "What is ADA and why does your local business need to care?",
    category: "Compliance",
    content: "The Americans with Disabilities Act (ADA) requires websites to be accessible. Lawsuits against small businesses have spiked 300% in recent years...",
  },
  "privacy-policy-basics": {
    title: "Privacy Policies: Why you need one even if you don't sell data",
    category: "Compliance",
    content: "Even if you just have a contact form, you are collecting data. A missing privacy policy is the easiest way to get fined in California and Europe...",
  },
  "core-web-vitals": {
    title: "Core Web Vitals: Why Google ignores slow websites",
    category: "Growth",
    content: "Google's new ranking factor measures 'experience'. If your site shifts layout or loads slowly, you are pushed to page 2...",
  },
  "renting-vs-owning": {
    title: "The difference between 'renting' (Wix) and 'owning' your site",
    category: "Growth",
    content: "When you stop paying Wix, your site vanishes. When you own your code, you can move it anywhere. Renting is easy, but owning is an asset...",
  },
  "latency-tax": {
    title: "Why cheap hosting costs you customers (The Latency Tax)",
    category: "Infrastructure",
    content: "Shared hosting (GoDaddy/Bluehost) puts you on a server with thousands of others. When they spike, you crash...",
  },
  "security-headers": {
    title: "Security Headers: The invisible shield your site needs",
    category: "Infrastructure",
    content: "HSTS, X-Frame-Options, and CSP. These aren't just acronyms; they prevent your site from being used to distribute malware...",
  },
};

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  if (!Object.prototype.hasOwnProperty.call(articles, slug)) return notFound();
  const article = articles[slug];

  if (!article) {
    return notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="container max-w-3xl">
        <Link href="/academy" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Academy
        </Link>

        <div className="mb-4 text-sm font-bold text-primary uppercase tracking-wider">
           {article.category}
        </div>

        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
           {article.title}
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
           <p className="lead">{article.content}</p>
           <p>
             (This is a placeholder for the full educational content. In the live version, this would be populated from the CMS.)
           </p>
           <h3>Why this matters</h3>
           <p>
              For SMB owners, the technical details matter less than the business risk. By ignoring this, you open yourself up to liability or lost revenue.
           </p>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
           <div className="bg-secondary/20 p-8 rounded-2xl flex flex-col md:flex-row items-center gap-6 justify-between">
              <div>
                 <h4 className="font-bold text-lg mb-2">Need help with {article.category}?</h4>
                 <p className="text-muted-foreground">We handle this so you don&apos;t have to.</p>
              </div>
              <Button asChild>
                 <Link href="/contact">Book a Consultation</Link>
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}
