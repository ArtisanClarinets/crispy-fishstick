"use client";

import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { motion } from "framer-motion";
import { CoverArt } from "@/components/cover-art";
import { VTLink } from "@/components/vt-link";

interface WorkDetailHeroProps {
  slug: string;
  title: string;
  description: string;
  tags?: string[];
  role?: string;
  timeline?: string;
  outcome?: string;
  coverImage?: string | null;
}

export function WorkDetailHero({
  slug,
  title,
  description,
  tags,
  role,
  timeline,
  outcome,
  coverImage,
}: WorkDetailHeroProps) {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] flex flex-col justify-end pb-12 md:pb-24 overflow-hidden">
      {/* Shared Element Background */}
      <motion.div
        layoutId={`cover-${slug}`}
        className="absolute inset-0 z-0 bg-secondary"
      >
        <CoverArt slug={slug} imageSrc={coverImage} priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-6 border border-border/10 rounded-[32px]" />
          <div className="absolute inset-6 rounded-[32px] bg-gradient-to-b from-foreground/10 via-transparent to-transparent" />
          <div className="absolute top-10 left-10 h-3 w-16 bg-foreground/30 blur-sm opacity-40" />
          <div className="absolute top-12 right-16 h-2 w-10 bg-foreground/20 blur-sm opacity-40" />
          <div className="absolute bottom-12 right-12 h-2 w-12 bg-foreground/20 blur-sm opacity-30" />
        </div>
      </motion.div>

      <div className="container relative z-10">
        <VTLink
          href="/work"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
          disableViewTransition
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Work
        </VTLink>

        {/* Shared Element Title */}
        <div className="mb-6 relative">
          <motion.h1
            layoutId={`title-${slug}`}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance inline-block"
          >
            {title}
          </motion.h1>
          <span aria-hidden="true" className="absolute left-0 top-0 -z-10 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-card-foreground/10 blur-sm">
            {title}
          </span>
        </div>

        <Reveal delay={0.1}>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
            {description}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-6 inline-flex flex-wrap gap-3 rounded-2xl bg-background/70 border border-border/10 backdrop-blur-md px-5 py-4 text-sm text-foreground/90">
            {role ? (
              <div className="flex items-center gap-2">
                <span className="uppercase tracking-[0.28em] text-muted-foreground text-xs">Role</span>
                <span className="font-medium">{role}</span>
              </div>
            ) : null}
            {timeline ? (
              <div className="flex items-center gap-2">
                <span className="uppercase tracking-[0.28em] text-muted-foreground text-xs">Timeline</span>
                <span className="font-medium">{timeline}</span>
              </div>
            ) : null}
            {outcome ? (
              <div className="flex items-center gap-2">
                <span className="uppercase tracking-[0.28em] text-muted-foreground text-xs">Outcome</span>
                <span className="font-medium text-primary">{outcome}</span>
              </div>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-2 mt-8">
            {tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-secondary/50 border border-border/50 text-sm font-medium backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
