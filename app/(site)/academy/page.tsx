import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ShieldCheck, TrendingUp, Server } from "lucide-react";
import { SpeedMeter } from "@/components/speed-meter";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Academy | SMB Education",
  description: "Straight talk on compliance, growth, and infrastructure for business owners.",
};

const guides = [
  {
    category: "Compliance & Safety",
    slug: "compliance",
    icon: ShieldCheck,
    articles: [
      { title: "What is ADA and why does your local business need to care?", slug: "ada-explained" },
      { title: "Privacy Policies: Why you need one even if you don't sell data", slug: "privacy-policy-basics" },
    ],
  },
  {
    category: "Google & Growth",
    slug: "growth",
    icon: TrendingUp,
    articles: [
      { title: "Core Web Vitals: Why Google ignores slow websites", slug: "core-web-vitals" },
      { title: "The difference between 'renting' (Wix) and 'owning' your site", slug: "renting-vs-owning" },
    ],
  },
  {
    category: "Hosting & Infrastructure",
    slug: "infrastructure",
    icon: Server,
    articles: [
      { title: "Why cheap hosting costs you customers (The Latency Tax)", slug: "latency-tax" },
      { title: "Security Headers: The invisible shield your site needs", slug: "security-headers" },
    ],
  },
];

export default function AcademyPage() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="container max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 mb-20 items-center">
           <div className="flex-1">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
                 <BookOpen className="w-4 h-4 mr-2" />
                 Academy
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                 Education for Owners,<br /> Not Just Developers.
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                 We believe in transparency. Here is the knowledge you need to protect your business and hold your vendors accountable.
              </p>
           </div>

           <div className="w-full max-w-sm">
              <SpeedMeter score={45} />
              <p className="text-center text-xs text-muted-foreground mt-2 italic">Most local sites score below 50.</p>
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           {guides.map((section) => {
              const Icon = section.icon;
              return (
                 <div key={section.slug} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-6 text-foreground">
                       <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold mb-6">{section.category}</h2>
                    <ul className="space-y-4">
                       {section.articles.map((article) => (
                          <li key={article.slug}>
                             <Link
                                href={`/academy/${section.slug}/${article.slug}`}
                                className="block group"
                             >
                                <h3 className="font-medium group-hover:text-primary transition-colors mb-1">
                                   {article.title}
                                </h3>
                                <div className="h-px w-full bg-border group-hover:bg-primary/50 transition-colors mt-2" />
                             </Link>
                          </li>
                       ))}
                    </ul>
                 </div>
              );
           })}
        </div>

        <div className="mt-24 p-12 bg-secondary/20 rounded-3xl text-center">
           <h2 className="text-3xl font-bold mb-4">Want a free audit?</h2>
           <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We will run a full compliance and speed check on your current site and send you a jargon-free report.
           </p>
           <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/contact">Request Free Audit</Link>
           </Button>
        </div>
      </div>
    </div>
  );
}
