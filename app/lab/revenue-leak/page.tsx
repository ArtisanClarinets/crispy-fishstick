import { RevenueLeakDetector } from "@/components/revenue-leak-detector";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RevenueLeakPage() {
  return (
    <div className="min-h-screen container py-24 px-4 md:px-6">
       <div className="max-w-4xl mx-auto mb-12">
          <Button variant="ghost" className="mb-8" asChild>
             <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Return to Home</Link>
          </Button>

          <Reveal>
             <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Revenue Leak Detector</h1>
             <p className="text-xl text-muted-foreground">
                A client-side diagnostic tool to estimate efficiency loss in your technical funnel.
                No data leaves your browser.
             </p>
          </Reveal>
       </div>

       <Reveal delay={0.2}>
          <RevenueLeakDetector />
       </Reveal>
    </div>
  );
}
