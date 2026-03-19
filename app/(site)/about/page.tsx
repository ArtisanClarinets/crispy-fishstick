import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Code2, Users, Handshake } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Vantus Systems",
  description:
    "Vantus Systems builds engineering-grade websites and business systems for small businesses. Gulf Coast based, working across North America.",
};

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "You own everything",
    color: "var(--highlight-gold)",
    body: "Every project closes with a full handoff: source code, hosting credentials, deployment docs. You are never locked in to us or any platform.",
  },
  {
    icon: Code2,
    title: "Fixed price, in writing",
    color: "var(--vantus-sky)",
    body: "Your proposal has one number — not a range, not an estimate. We agree on scope first, then we set a price. No billing surprises.",
  },
  {
    icon: Users,
    title: "Built for how you actually work",
    color: "var(--vantus-sky)",
    body: "We build CMS tools so your staff can update content without calling a developer. Systems that fit your operation, not the other way around.",
  },
  {
    icon: Handshake,
    title: "Honest when we're not the right fit",
    color: "var(--highlight-gold)",
    body: "If the free audit shows you need something other than what we offer, we'll tell you — and point you toward whoever can actually help.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-24">
      {/* Hero */}
      <section className="pt-16 md:pt-24 px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-6">
        <Badge variant="secondary" className="badge-sky uppercase tracking-wider text-xs font-semibold">
          About Vantus
        </Badge>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
          Small businesses deserve{" "}
          <span className="text-gradient-brand">better than broken templates.</span>
        </h1>
        <p className="font-body text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Vantus Systems was started because too many small business owners were paying
          thousands of dollars for websites that were slow, impossible to update, and looked like
          every other site on the block.
        </p>
      </section>

      {/* Story */}
      <section className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full space-y-6">
        <div>
          <span className="accent-bar" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold">Why we started this</h2>
        </div>
        <div className="font-body text-muted-foreground leading-relaxed space-y-4">
          <p>
            The frustration was consistent: a restaurant owner spends $8,000 on a website that takes
            six seconds to load on a phone. A contractor lands a big job, goes to update their site,
            and can&apos;t because the developer who built it won&apos;t respond. A retail store has
            a perfectly good Shopify setup but is losing 30% of every sale to third-party app fees.
          </p>
          <p>
            These aren&apos;t exotic problems. They&apos;re the normal experience for small businesses
            buying web services from vendors who don&apos;t treat websites as software — who don&apos;t
            measure anything, don&apos;t test anything, and disappear when the project is &quot;done.&quot;
          </p>
          <p>
            We build differently. Slower, more deliberately, with documentation and tests and a
            real handoff. The result is a site you actually own \u2014 one that keeps working after
            we stop working.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="px-4 md:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        <div>
          <span className="accent-bar" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold">How we work</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {PRINCIPLES.map(({ icon: Icon, title, color, body }) => {
            const isSky = color === "var(--vantus-sky)";
            return (
            <div key={title} className="rounded-2xl border border-border bg-card p-7 space-y-4 card-glow">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${isSky ? "icon-bg-sky" : "icon-bg-gold"}`}>
                <Icon className={`h-5 w-5 ${isSky ? "text-sky" : "text-gold"}`} />
              </div>
              <h3 className="font-heading font-bold text-lg">{title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
            );
          })}
        </div>
      </section>

      {/* Where we work */}
      <section className="bg-[var(--vantus-navy)] text-white py-16 px-4 md:px-6 lg:px-8 glow-sky">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="font-heading text-2xl md:text-3xl font-bold">
              Gulf Coast based.<br className="hidden md:block" /> North America wide.
            </h2>
            <p className="font-body text-white/70 leading-relaxed">
              We&apos;re based on the Gulf Coast of Texas and work remotely with small businesses
              across North America. Most of our work is fully remote — video calls, shared docs,
              async updates. You don&apos;t need to be local.
            </p>
          </div>
          <div className="space-y-3">
            {[
              "Free 5-day written audit — no meeting required",
              "Written proposals you can read at your own pace",
              "Async-first communication that respects your schedule",
              "No travel fees, no office overhead passed to you",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-white/80">
                <span className="h-1.5 w-1.5 rounded-full shrink-0 bg-sky" />
                <span className="font-body">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full text-center space-y-6">
        <h2 className="font-heading text-2xl md:text-3xl font-bold">
          Ready to work with people who actually measure things?
        </h2>
        <p className="font-body text-muted-foreground">
          Start with a free audit. No commitment. Just honest findings about your current setup
          and a clear explanation of what it would take to fix it.
        </p>
        <Button asChild size="lg" className="rounded-full px-10 font-semibold btn-sky-glow">
          <Link href="/start-audit">Get Your Free Audit</Link>
        </Button>
      </section>
    </div>
  );
}
