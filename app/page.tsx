"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Layout, Database, Shield, Zap, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            Reliable Systems. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              Premium Interfaces.
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto">
            {siteConfig.description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg h-12 px-8">
              <Link href={siteConfig.cta.primary.href}>
                {siteConfig.cta.primary.text}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg h-12 px-8">
              <Link href={siteConfig.cta.secondary.href}>
                {siteConfig.cta.secondary.text}
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-y border-border/40 bg-secondary/20">
        <div className="container px-4 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
            Trusted by founders and teams at
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70 grayscale transition-all hover:grayscale-0">
             {/* Placeholders for logos */}
            <div className="text-xl font-bold flex items-center gap-2"><div className="w-6 h-6 bg-primary rounded-full"></div>Acme Corp</div>
            <div className="text-xl font-bold flex items-center gap-2"><div className="w-6 h-6 bg-primary rounded-full"></div>GlobalTech</div>
            <div className="text-xl font-bold flex items-center gap-2"><div className="w-6 h-6 bg-primary rounded-full"></div>Nebula</div>
            <div className="text-xl font-bold flex items-center gap-2"><div className="w-6 h-6 bg-primary rounded-full"></div>Vertex</div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-24 px-4">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Selected Work</h2>
              <p className="text-muted-foreground">Recent production-grade deployments.</p>
            </div>
            <Button variant="ghost" asChild className="group mt-4 md:mt-0">
              <Link href="/work">
                View all work <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {siteConfig.featuredWork.map((project, index) => (
              <Link key={project.slug} href={`/work/${project.slug}`} className="group block">
                <div className="overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg hover:-translate-y-1">
                  <div className="aspect-video bg-muted relative">
                     {/* Placeholder for image */}
                     <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-4xl font-bold">
                        {project.title[0]}
                     </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-secondary/10">
         <div className="container px-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-16 text-center">Technical Services</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Design Engineering", icon: <Layout className="w-6 h-6"/>, desc: "Bridging the gap between Figma and production code with pixel-perfect precision." },
                    { title: "Frontend Systems", icon: <Zap className="w-6 h-6"/>, desc: "Scalable React architectures, component libraries, and performance optimization." },
                    { title: "Backend Integrations", icon: <Database className="w-6 h-6"/>, desc: "Reliable synchronization engines, API design, and database modeling." },
                    { title: "Audits & Rescue", icon: <Search className="w-6 h-6"/>, desc: "Performance, accessibility, and code quality audits for legacy codebases." }
                ].map((service, i) => (
                    <div key={i} className="flex flex-col gap-4 p-6 rounded-xl bg-background border transition-colors hover:border-primary/50">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-bold">{service.title}</h3>
                        <p className="text-muted-foreground text-sm">{service.desc}</p>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Rigor & Skills */}
      <section className="py-24 container px-4">
        <div className="grid gap-16 lg:grid-cols-2">
            <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">Engineering Rigor</h2>
                <p className="text-lg text-muted-foreground mb-8">
                    I don't just write code; I ship systems. Every deliverable meets a strict quality bar.
                </p>
                <div className="space-y-4">
                    {[
                        "100% Type Safety (Strict TypeScript)",
                        "WCAG 2.1 AA Accessibility",
                        "Automated CI/CD Pipelines",
                        "Performance Budgets (Lighthouse 95+)",
                        "Comprehensive Unit & E2E Testing"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            <span className="font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                 <h3 className="text-xl font-bold mb-6">Technical Arsenal</h3>
                 <div className="space-y-6">
                    {siteConfig.skills.map((skill) => (
                        <div key={skill.name}>
                            <div className="flex justify-between mb-2 text-sm font-medium">
                                <span>{skill.name}</span>
                                <span className="text-muted-foreground">{skill.level}%</span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                    className="h-full bg-primary rounded-full"
                                />
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 bg-primary text-primary-foreground">
          <div className="container px-4">
              <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Core Principles</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {["Clarity", "Reliability", "Observability", "Safety", "Performance", "Accessibility"].map((p) => (
                      <div key={p} className="aspect-square flex items-center justify-center rounded-xl bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm hover:bg-primary-foreground/20 transition-colors">
                          <span className="font-bold text-lg">{p}</span>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* CTA */}
      <section className="py-32 container px-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Have a high-stakes product? <br/> Let's ship it right.</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Available for select contract engagements. Currently booking for Q4.
          </p>
          <Button size="lg" className="text-lg px-10 py-6" asChild>
              <Link href="/contact">Start the Conversation</Link>
          </Button>
      </section>
    </div>
  );
}
