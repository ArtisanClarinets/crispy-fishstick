import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/hero-background";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/lib/site";
import { BuildPlanModule } from "@/components/build-plan-module";
import { AuditModal } from "@/components/audit-modal";
import { CalibrationHeadline } from "@/components/calibration-headline";
import { Stagger, StaggerItem } from "@/components/stagger";
import { CoverArt } from "@/components/cover-art";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section
        className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden border-b border-border/50 py-20"
        data-hud-section="Hero"
        data-system-tone="home"
      >
        <HeroBackground />

        <div className="container relative z-10 px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT: Text Content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Reveal>
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-8 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                Transparent. Predictable. Done.
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <CalibrationHeadline
                text={siteConfig.tagline}
                className="mb-10"
              />
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
                  <Link href="/work">
                    See real outcomes <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Build Plan Module */}
          <div className="flex-1 w-full max-w-2xl">
            <Reveal delay={0.4}>
              <BuildPlanModule />
            </Reveal>
          </div>

        </div>
      </section>

      {/* SOCIAL PROOF / METRICS */}
      <section
        className="py-12 border-b border-border/50 bg-background/50"
        data-hud-section="Proof"
      >
        <div className="container">
           <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
             Delivering outcomes for high-growth companies
           </p>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Using text-based metrics/logos for premium feel if no logos available */}
              <div className="text-center">
                 <h4 className="text-3xl font-bold text-foreground">$50M+</h4>
                 <p className="text-xs text-muted-foreground">Revenue Processed</p>
              </div>
              <div className="text-center">
                 <h4 className="text-3xl font-bold text-foreground">99.99%</h4>
                 <p className="text-xs text-muted-foreground">Uptime Delivered</p>
              </div>
              <div className="text-center">
                 <h4 className="text-3xl font-bold text-foreground">1M+</h4>
                 <p className="text-xs text-muted-foreground">Daily Active Users</p>
              </div>
              <div className="text-center">
                 <h4 className="text-3xl font-bold text-foreground">SOC2</h4>
                 <p className="text-xs text-muted-foreground">Compliance Ready</p>
              </div>
           </div>
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
                <Link href="/work">View All Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
            </Button>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteConfig.featuredWork.map((project) => (
              <StaggerItem key={project.slug}>
                <Link href={`/work/${project.slug}`} className="group block h-full">
                  <div className="relative overflow-hidden rounded-2xl bg-secondary aspect-[4/3] mb-6 border border-border/50">
                    <CoverArt slug={project.slug} className="transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/30 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                      <div className="self-end p-2 bg-background/10 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        <ArrowRight className="text-white h-5 w-5" />
                      </div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-primary/60 uppercase tracking-wider">Case Study</p>
                    <p className="text-muted-foreground line-clamp-2">{project.description}</p>
                    <div className="text-sm text-foreground/80">
                      <span className="font-semibold text-foreground">Outcome:</span> {project.outcome}
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-12 md:hidden">
            <Button variant="outline" className="w-full" asChild>
                <Link href="/work">View All Projects</Link>
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
                  <Link href="/contact">Book a Consultation</Link>
               </Button>
               <Button asChild variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg">
                  <Link href="mailto:dylan@thompsonsystems.com">Email Me</Link>
               </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
