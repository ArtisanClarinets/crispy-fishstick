import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Server, Activity } from "lucide-react";

export const metadata = {
  title: "Lab | Thompson Systems",
  description: "Interactive tools and experiments demonstrating engineering rigor.",
};

export default function LabIndexPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Lab
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Interactive tools that prove craft and privacy discipline.
          Data never leaves your browser unless explicitly stated.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 flex flex-col h-full hover:border-primary/50 transition-colors">
          <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Activity className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold mb-2">Revenue Leak Detector</h2>
          <p className="text-muted-foreground mb-6 flex-1">
            Client-side diagnostic tool to estimate efficiency loss in your technical funnel.
          </p>
          <Button asChild variant="outline" className="w-full justify-between group">
            <Link href="/lab/revenue-leak">
              Launch Tool <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </Card>

        <Card className="p-6 flex flex-col h-full hover:border-primary/50 transition-colors">
          <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Server className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold mb-2">Infrastructure Sizing Engine</h2>
          <p className="text-muted-foreground mb-6 flex-1">
            Define workload intent and get precise, evidence-backed server specifications with bottleneck analysis.
          </p>
          <Button asChild variant="outline" className="w-full justify-between group">
            <Link href="/lab/server-config">
              Launch Tool <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
