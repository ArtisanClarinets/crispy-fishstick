import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site";
import { AuditModal } from "@/components/audit-modal";
import { VTLink } from "@/components/vt-link";
import { HomeFeaturedWork } from "@/components/home-featured-work";
import { ProofPanel } from "@/components/proof-panel";
import { SplitText } from "@/components/react-bits/SplitText";
import { ScrambleText } from "@/components/scramble-text";
import { SignalLinesField } from "@/features/home-hero/components/SignalLinesField";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section
        className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden border-b border-border/50 py-20"
        data-hud-section="Hero"
        data-system-tone="home"
      >
        <SignalLinesField />

        <div className="container relative z-10 px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT: Text Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Reveal>
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                <ScrambleText text="Transparent. Predictable. Done." />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="mb-10">
                <SplitText
                  text={siteConfig.tagline}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                  delay={0.2}
                />
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed text-balance">
                No vague estimates. No vendor lock-in. Just a clear, engineered path to a premium product.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
                <AuditModal />
                <Button asChild variant="ghost" size="lg" className="h-14 px-8 text-lg rounded-full hover:bg-background/80">
                  <VTLink href="/work">
                    See real outcomes <ArrowRight className="ml-2 h-5 w-5" />
                  </VTLink>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Build Plan Module */}
          <div className="flex-1 w-full max-w-2xl">
            <Reveal delay={0.4}>
              <div className="card-precision rounded-2xl p-6 md:p-8 signal-sheen backdrop-blur-md bg-background/50">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-sm font-medium tracking-wider text-primary/90 uppercase">New</p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight">The Living Blueprint</h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">
                      A scroll-driven assembly that turns the build plan into something you can inspect.
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-sm">
                  {["8-phase assembly (0→7)", "Sticky split-screen on desktop", "Mobile-safe simplified fallback"].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-3 text-foreground/90">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>{item}</span>
                      </li>
                    )
                  )}
                </ul>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg" className="rounded-full h-12 px-7 signal-sheen">
                    <VTLink href="/living-blueprint">
                      Explore the Blueprint <ArrowRight className="ml-2 h-4 w-4" />
                    </VTLink>
                  </Button>
                  <Button asChild variant="ghost" size="lg" className="rounded-full h-12 px-7">
                    <VTLink href="/process">
                      See the full process <ArrowRight className="ml-2 h-4 w-4" />
                    </VTLink>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* SELF-AUDIT PROOF PANEL */}
      <section
        id="proof"
        className="py-16 border-b border-border/50 bg-background/50"
        data-hud-section="Proof"
      >
        <div className="container">
          <ProofPanel />
        </div>
      </section>

      {/* FEATURED WORK */}
      <section
        className="py-24 md:py-32"
        data-hud-section="Work"
        data-system-tone="work"
      >
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Selected Work</h2>
              <p className="text-lg text-muted-foreground">
                Deep dives into complex systems. No simple marketing sites here—only rigorous application architecture.
              </p>
            </div>
            <Button variant="ghost" className="hidden md:flex group" asChild>
                <VTLink href="/work">View All Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></VTLink>
            </Button>
          </div>

          <HomeFeaturedWork />

          <div className="mt-12 md:hidden">
            <Button variant="outline" className="w-full" asChild>
                <VTLink href="/work">View All Projects</VTLink>
            </Button>
          </div>
        </div>
      </section>

      {/* RIGOR & STACK */}
      <section className="py-24 bg-secondary/30 border-y border-border/50">
         <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
               <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-8">Engineering Rigor</h2>
                  <p className="text-lg text-muted-foreground mb-12">
                     I don&apos;t rely on hope. I rely on systems. Every project relies on a foundational set of quality gates that ensure long-term maintainability.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     {siteConfig.principles.map((p) => (
                        <div key={p.title} className="bg-background/50 p-6 rounded-xl border border-border/50">
                           <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              {p.title}
                           </h4>
                           <p className="text-sm text-muted-foreground">{p.desc}</p>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-8">Primary Technical Stack</h3>
                  <div className="flex flex-wrap gap-3">
                     {siteConfig.stackPrimary.map((tech) => (
                        <span
                           key={tech}
                           className="px-4 py-2 rounded-full bg-background border border-border text-sm font-medium text-foreground/80 hover:border-primary/50 transition-colors cursor-default"
                        >
                           {tech}
                        </span>
                     ))}
                  </div>

                  <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-background to-secondary border border-border">
                     <h4 className="text-lg font-bold mb-4">Secondary Systems Focus</h4>
                     <ul className="space-y-3">
                        {siteConfig.stackSecondary.map((cap) => (
                           <li key={cap} className="flex items-center gap-3 text-muted-foreground">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                              {cap}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="py-32 container text-center"
        data-hud-section="CTA"
        data-system-tone="contact"
      >
         <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
               Have a high-stakes product?<br />
               <span className="text-muted-foreground">Let&apos;s ship it right.</span>
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg">
                  <VTLink href="/contact">Book a Consultation</VTLink>
               </Button>
               <Button asChild variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg">
                  <a href="mailto:dylan@thompsonsystems.com">Email Me</a>
               </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
