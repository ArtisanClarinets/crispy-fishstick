"use client";

import { siteConfig } from "@/lib/site";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/stagger";
import { CoverArt } from "@/components/cover-art";
import { VTLink } from "@/components/vt-link";
import { useTilt } from "@/hooks/use-tilt";

function FeaturedWorkCard({ project }: { project: (typeof siteConfig.featuredWork)[0] }) {
  const { ref, onMouseEnter, onMouseMove, onMouseLeave } = useTilt({ xFactor: 10, yFactor: 8 });

  return (
    <VTLink href={`/work/${project.slug}`} className="group block h-full" disableViewTransition>
      <motion.div
        ref={ref}
        layoutId={`cover-${project.slug}`}
        className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6 glass-card [transform-style:preserve-3d] [--tilt-x:0deg] [--tilt-y:0deg] [--card-scale:1] [--card-lift:0px] [--spot-x:50%] [--spot-y:50%] group-hover:[--card-scale:1.02] group-hover:[--card-lift:-6px] transition-transform duration-500 copper-sheen"
        style={{
          transform:
            "perspective(900px) translateY(var(--card-lift)) scale(var(--card-scale)) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))",
        }}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <CoverArt
          slug={project.slug}
          imageSrc={project.coverImage}
          className="transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className="absolute inset-0 mix-blend-overlay"
            style={{
              background:
                "radial-gradient(circle at var(--spot-x) var(--spot-y), rgba(255,255,255,0.4), transparent 50%)",
            }}
          />
        </div>
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          <div className="self-end p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
            <ArrowRight className="text-white h-5 w-5" />
          </div>
          <div className="space-y-3">
            <motion.h3 layoutId={`title-${project.slug}`} className="text-2xl font-bold text-white tracking-tight drop-shadow-md">
              {project.title}
            </motion.h3>
            <div className="rounded-xl bg-black/50 border border-white/10 backdrop-blur-md px-4 py-3 text-xs text-white/90 space-y-2 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <span className="uppercase tracking-[0.2em] text-white/60 font-medium">Outcome</span>
                <span className="text-right font-medium">{project.outcome}</span>
              </div>
              <div className="h-px bg-white/10 w-full" />
              <div className="flex items-center justify-between gap-3">
                <span className="uppercase tracking-[0.2em] text-white/60 font-medium">Constraint</span>
                <span className="text-right line-clamp-1 font-medium">{project.constraints}</span>
              </div>
              <div className="h-px bg-white/10 w-full" />
              <div className="flex items-center justify-between gap-3">
                <span className="uppercase tracking-[0.2em] text-white/60 font-medium">Role</span>
                <span className="font-medium">{project.role}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="space-y-3">
        <p className="text-sm font-medium text-primary/60 uppercase tracking-wider">Case Study</p>
        <p className="text-muted-foreground line-clamp-2">{project.description}</p>
        <div className="text-sm text-foreground/80">
          <span className="font-semibold text-foreground">Outcome:</span> {project.outcome}
        </div>
      </div>
    </VTLink>
  );
}

export function HomeFeaturedWork() {
  return (
    <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {siteConfig.featuredWork.map((project) => (
        <StaggerItem key={project.slug}>
          <FeaturedWorkCard project={project} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
