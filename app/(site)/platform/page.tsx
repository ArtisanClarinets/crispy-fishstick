import { Metadata } from "next";
import { InteractiveToggle } from "@/components/interactive-toggle";
import { AdminFeatureHighlight } from "@/components/admin-feature-highlight";
import { FileText, Calendar, BarChart3, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Platform | Owner's Dashboard",
  description: "A tour of the Vantus BusinessOS. Edit text, update hours, and view analytics without code.",
};

export default function PlatformPage() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            The Owner&apos;s Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We built a specific tool for you. Prove to yourself that you don&apos;t need a developer to make simple changes.
          </p>
        </div>

        {/* Interactive Demo */}
        <section className="mb-32">
           <InteractiveToggle />
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-2 gap-12 mb-32">
           <div className="space-y-8">
              <div className="sticky top-24">
                 <h2 className="text-3xl font-bold mb-4">Content Management</h2>
                 <p className="text-lg text-muted-foreground mb-8">
                    Edit text as easily as a Word doc. No confusing menus or &quot;plugin updates.&quot;
                 </p>
                 <AdminFeatureHighlight
                    icon={FileText}
                    title="Instant Text Edits"
                    description="Fix typos or update headlines in seconds."
                    timeSaved="2 Days"
                 />
                 <div className="h-4" />
                 <AdminFeatureHighlight
                    icon={ImageIcon}
                    title="Media Library"
                    description="Drag and drop new project photos."
                    timeSaved="4 Hours"
                 />
              </div>
           </div>

           <div className="bg-secondary/20 rounded-3xl p-8 min-h-[400px] flex items-center justify-center border border-border/50">
               {/* Placeholder for a screenshot or illustrative graphic */}
               <div className="text-center text-muted-foreground">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Dashboard Screenshot</p>
               </div>
           </div>
        </section>

        <section className="grid md:grid-cols-2 gap-12 mb-32">
           <div className="bg-secondary/20 rounded-3xl p-8 min-h-[400px] flex items-center justify-center border border-border/50 order-2 md:order-1">
               {/* Placeholder for a screenshot or illustrative graphic */}
               <div className="text-center text-muted-foreground">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Scheduling UI</p>
               </div>
           </div>

           <div className="space-y-8 order-1 md:order-2">
              <div className="sticky top-24">
                 <h2 className="text-3xl font-bold mb-4">Business Logic</h2>
                 <p className="text-lg text-muted-foreground mb-8">
                    Your website should know how your business works.
                 </p>
                 <AdminFeatureHighlight
                    icon={Calendar}
                    title="Availability Hours"
                    description="Closed for a holiday? One click updates everywhere."
                    timeSaved="1 Hour"
                 />
                 <div className="h-4" />
                 <AdminFeatureHighlight
                    icon={BarChart3}
                    title="Analytics for Humans"
                    description="See 'Leads this week' instead of confusing graphs."
                    timeSaved="Infinity"
                 />
              </div>
           </div>
        </section>

        {/* CTA */}
        <div className="text-center border-t border-border pt-24">
           <h2 className="text-3xl font-bold mb-6">Stop relying on others.</h2>
           <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the keys to your own digital storefront.
           </p>
           <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg">
              <Link href="/contact">Get a Demo</Link>
           </Button>
        </div>

      </div>
    </div>
  );
}
