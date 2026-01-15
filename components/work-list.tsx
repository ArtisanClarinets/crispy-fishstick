"use client";

import { siteConfig } from "@/lib/site";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/stagger";
import { CoverArt } from "@/components/cover-art";
import { VTLink } from "@/components/vt-link";
import { useTilt } from "@/hooks/use-tilt";

function WorkCard({ project }: { project: (typeof siteConfig.featuredWork)[0] }) {
  const { ref, onMouseEnter, onMouseMove, onMouseLeave } = useTilt({ xFactor: 8, yFactor: 6 });

  return (
    <VTLink href={`/work/${project.slug}`} className="block w-full" disableViewTransition>
      <div
        ref={ref}
        className="rounded-2xl overflow-hidden card-precision [transform-style:preserve-3d] [--tilt-x:0deg] [--tilt-y:0deg] [--card-scale:1] [--card-lift:0px] [--spot-x:50%] [--spot-y:50%] group-hover:[--card-scale:1.015] group-hover:[--card-lift:-4px] transition-all duration-500"
        style={{
          transform:
            "perspective(900px) translateY(var(--card-lift)) scale(var(--card-scale)) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))",
        }}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <motion.div
          layoutId={`cover-${project.slug}`}
          className="relative aspect-[16/10] w-full overflow-hidden bg-secondary"
        >
          <CoverArt
            slug={project.slug}
            className="transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div
              className="absolute inset-0 mix-blend-screen"
              style={{
                background:
                  "radial-gradient(circle at var(--spot-x) var(--spot-y), rgba(255,255,255,0.3), transparent 60%)",
              }}
            />
          </div>
        </motion.div>
      </div>
    </VTLink>
  );
}

export function WorkList() {
  return (
    <Stagger className="grid grid-cols-1 gap-12 md:gap-24">
      {siteConfig.featuredWork.map((project, i) => (
        <StaggerItem key={project.slug} className="group grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Column */}
          <WorkCard project={project} />

          {/* Text Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-primary/20" />
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">0{i + 1}</span>
            </div>
            <span />

            <VTLink href={`/work/${project.slug}`} disableViewTransition>
              <motion.h2
                layoutId={`title-${project.slug}`}
                className="text-3xl md:text-4xl font-bold tracking-tight group-hover:text-primary transition-colors inline-block"
              >
                {project.title}
              </motion.h2>
            </VTLink>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="text-foreground font-semibold">Outcome:</span> {project.outcome}
              </p>
              <p>
                <span className="text-foreground font-semibold">Constraints:</span> {project.constraints}
              </p>
            </div>

            <VTLink href={`/work/${project.slug}`} className="flex items-center text-primary font-medium group-hover:underline underline-offset-4" disableViewTransition>
              Read Case Study <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </VTLink>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
