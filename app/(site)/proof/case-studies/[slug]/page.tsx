import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  tag: string;
  timeline: string;
  problem: string;
  change: string[];
  evidence: string[];
  outcome: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "fintech-dashboard",
    title: "Real-Time Fintech Dashboard",
    client: "Series B Fintech",
    tag: "Web Performance",
    timeline: "6 months",
    problem:
      "The client's existing dashboard was taking 4–6 seconds to refresh under live data load. Institutional traders were flagging the lag in compliance reviews, and the system was failing scheduled regulatory audits.",
    change: [
      "Replaced a legacy polling architecture with WebSocket-based data subscriptions, eliminating redundant HTTP round trips.",
      "Implemented a WebGL-accelerated chart renderer to move heavy computation off the main browser thread.",
      "Designed a SOC2-compliant audit trail with immutable event logs and tamper-evident timestamps.",
      "Introduced a circuit-breaker pattern to gracefully degrade under peak load without data loss.",
    ],
    evidence: [
      "Dashboard refresh latency: 4,200ms → 185ms (96% reduction)",
      "WebSocket throughput: sustained 50,000+ events/second under load test",
      "Test coverage on financial logic: 100%",
      "SOC2 Type I audit: passed without findings",
    ],
    outcome:
      "Sub-200ms analytics refresh under 30M events/day. The platform passed its next regulatory review cycle without any engineering-related findings. The trading desk reported zero data-lag complaints in the six months following deployment.",
  },
  {
    slug: "healthtech-platform",
    title: "Healthcare Operations Portal",
    client: "Regional Health Network",
    tag: "Business Portal",
    timeline: "5 months",
    problem:
      "Clinical and administrative staff were managing patient intake across three disconnected tools: a shared email inbox, a spreadsheet, and a scheduling application imported from an acquired practice. Handoff errors caused 15–20 scheduling conflicts per week, some with clinical consequences.",
    change: [
      "Unified all three workflows into a single portal with role-based access control separating clinical, administrative, and management views.",
      "Built a structured intake form with validation enforcing required clinical data before submission progresses.",
      "Implemented a HIPAA-compliant audit trail on all patient record access, edits, and transfers.",
      "Migrated historical data from all three legacy tools into a single normalized database without data loss.",
    ],
    evidence: [
      "Scheduling errors: 18/week average → 4/week after launch → 0 in months 3–5",
      "Intake completion time: 14 minutes average → 6 minutes",
      "HIPAA audit trail: 100% coverage from day one",
      "Zero data migration discrepancies, verified by client clinical audit",
    ],
    outcome:
      "Intake errors were eliminated within 90 days. Staff reported the portal replaced all three previous tools with no functional gaps. The organisation subsequently requested a phase two engagement for billing integration.",
  },
  {
    slug: "shopify-admin-sync",
    title: "Shopify Admin Sync",
    client: "Gulf Coast Retailer",
    tag: "Systems Integration",
    timeline: "8 weeks",
    problem:
      "A regional retail business with three physical locations was manually reconciling inventory between Shopify and their warehouse management system every Monday. The process required 12+ hours of staff time, was error-prone, and frequently resulted in overselling popular items.",
    change: [
      "Built a bidirectional sync service connecting Shopify's Admin API to the warehouse system's REST API.",
      "Implemented a conflict resolution strategy that treats the warehouse as the inventory source of truth, with Shopify as the display layer.",
      "Added webhook subscriptions for real-time inventory updates on every sale, return, and manual adjustment.",
      "Built an admin dashboard showing sync status, error logs, and last reconciliation timestamp for each SKU.",
    ],
    evidence: [
      "Manual reconciliation hours: 12+ per week → 0",
      "Inventory accuracy: 91% → 99.7%",
      "Oversell incidents: 8–12 per month → 0 in the 90 days post-launch",
      "Sync latency: under 8 seconds per transaction",
    ],
    outcome:
      "Manual inventory work was completely eliminated. The operations manager reported that the Monday reconciliation process no longer exists as a task. Staff hours recovered were redirected to customer-facing work. The client extended the engagement to cover their fourth location opening.",
  },
];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) return {};
  return {
    title: `${cs.title} | Case Study | Vantus Systems`,
    description: cs.outcome,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) notFound();

  const others = CASE_STUDIES.filter((c) => c.slug !== cs.slug);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-24">
      {/* Back */}
      <div className="pt-10 px-4 md:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <Link
          href="/proof"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> All Case Studies
        </Link>
      </div>

      {/* Header */}
      <section className="px-4 md:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-4">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="text-xs">{cs.tag}</Badge>
          <span className="text-sm text-muted-foreground">{cs.client}</span>
          <span className="text-sm text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground">{cs.timeline}</span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-balance">
          {cs.title}
        </h1>
      </section>

      {/* Problem */}
      <section className="px-4 md:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-4">
        <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-muted-foreground">
          The Problem
        </h2>
        <p className="font-body text-lg leading-relaxed">{cs.problem}</p>
      </section>

      {/* What We Changed */}
      <section className="bg-muted/30 border-y border-border py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-muted-foreground">
            What We Changed
          </h2>
          <ol className="space-y-4">
            {cs.change.map((item, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="font-heading text-2xl font-black text-[var(--vantus-sky)] opacity-50 w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-body leading-relaxed">{item}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Evidence */}
      <section className="px-4 md:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-6">
        <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-muted-foreground">
          The Evidence
        </h2>
        <ul className="grid md:grid-cols-2 gap-4">
          {cs.evidence.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-[var(--vantus-sky)]/30 bg-[var(--vantus-sky)]/5 p-5"
            >
              <p className="font-body font-semibold leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Outcome */}
      <section className="px-4 md:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-4">
        <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-muted-foreground">
          The Outcome
        </h2>
        <p className="font-body text-lg leading-relaxed">{cs.outcome}</p>
      </section>

      {/* Other Case Studies */}
      {others.length > 0 && (
        <section className="px-4 md:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-6">
          <h2 className="font-heading text-lg font-bold text-muted-foreground">More case studies</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/proof/case-studies/${o.slug}`}
                className="group rounded-xl border border-border p-5 hover:border-[var(--vantus-sky)] transition-colors space-y-1 bg-card"
              >
                <Badge variant="secondary" className="text-xs">{o.tag}</Badge>
                <h3 className="font-heading font-bold group-hover:text-[var(--vantus-sky)] transition-colors">
                  {o.title}
                </h3>
                <p className="text-xs text-muted-foreground">{o.client}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-4 md:px-6 lg:px-8 max-w-3xl mx-auto w-full text-center space-y-6">
        <h2 className="font-heading text-2xl md:text-3xl font-bold">
          Your project could be next.
        </h2>
        <p className="font-body text-muted-foreground">
          Start with a free audit. We&apos;ll document your current state and return a written
          proposal with fixed price and timeline.
        </p>
        <Button asChild size="lg" className="rounded-full px-10 font-semibold">
          <Link href="/start-audit">
            Start Your Audit <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
