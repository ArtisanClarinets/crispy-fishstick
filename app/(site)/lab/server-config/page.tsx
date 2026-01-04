import { ConfigWizard } from "@/components/lab/server-config/config-wizard";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ServerConfigPage() {
  return (
    <div className="min-h-screen container py-24 px-4 md:px-6" data-system-tone="insights">
       <div className="max-w-6xl mx-auto mb-12">
          <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary" asChild>
             <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Return to Home</Link>
          </Button>

          <Reveal>
             <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Server Configurator</h1>
             <p className="text-xl text-muted-foreground max-w-2xl">
                Define your workload intent and get precise, heuristic-driven hardware recommendations.
             </p>
          </Reveal>
       </div>

       <Reveal delay={0.2} className="max-w-6xl mx-auto">
          <ConfigWizard />
       </Reveal>
    </div>
  );
}
