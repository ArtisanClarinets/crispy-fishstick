"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { CoverArt } from "@/components/cover-art";
import { VTLink } from "@/components/vt-link";
import { Stagger, StaggerItem } from "@/components/stagger";

export function HomeFeaturedWork() {
  const [pointerCoarse, setPointerCoarse] = useState(false);
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const update = () => setPointerCoarse(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const handleTilt = (event: MouseEvent<HTMLDivElement>) => {
    if (pointerCoarse || prefersReducedMotion) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", `${(-y * 8).toFixed(2)}deg`);
    card.style.setProperty("--tilt-y", `${(x * 10).toFixed(2)}deg`);
    card.style.setProperty("--spot-x", `${Math.round((x + 0.5) * 100)}%`);
    card.style.setProperty("--spot-y", `${Math.round((y + 0.5) * 100)}%`);
  };

  const resetTilt = (event: MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--spot-x", "50%");
    card.style.setProperty("--spot-y", "50%");
  };

  return (
    <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {siteConfig.featuredWork.map((project) => (
        <StaggerItem key={project.slug}>
          <VTLink href={`/work/${project.slug}`} className="group block h-full">
            <motion.div
              layoutId={`cover-${project.slug}`}
              className="relative overflow-hidden rounded-2xl bg-secondary aspect-[4/3] mb-6 glass-card surface-rim [transform-style:preserve-3d] [--tilt-x:0deg] [--tilt-y:0deg] [--card-scale:1] [--card-lift:0px] [--spot-x:50%] [--spot-y:50%] group-hover:[--card-scale:1.02] group-hover:[--card-lift:-6px] transition-transform duration-500"
              style={{
                transform:
                  "perspective(900px) translateY(var(--card-lift)) scale(var(--card-scale)) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))",
              }}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              <CoverArt
                slug={project.slug}
                imageSrc={project.coverImage}
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className="absolute inset-0 mix-blend-screen"
                  style={{
                    background:
                      "radial-gradient(circle at var(--spot-x) var(--spot-y), rgba(255,255,255,0.35), transparent 55%)",
                  }}
                />
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="self-end p-2 bg-background/10 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  <ArrowRight className="text-white h-5 w-5" />
                </div>
                <div className="space-y-3">
                  <motion.h3 layoutId={`title-${project.slug}`} className="text-2xl font-bold text-white tracking-tight">
                    {project.title}
                  </motion.h3>
                  <div className="rounded-xl bg-background/60 border border-white/10 backdrop-blur-md px-4 py-3 text-xs text-white/80 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="uppercase tracking-[0.24em] text-white/50">Outcome</span>
                      <span className="text-white/90 text-right">{project.outcome}</span>
                    </div>
                    <div className="spec-divider" />
                    <div className="flex items-center justify-between gap-3">
                      <span className="uppercase tracking-[0.24em] text-white/50">Constraint</span>
                      <span className="text-white/90 text-right line-clamp-1">{project.constraints}</span>
                    </div>
                    <div className="spec-divider" />
                    <div className="flex items-center justify-between gap-3">
                      <span className="uppercase tracking-[0.24em] text-white/50">Role</span>
                      <span className="text-white/90">{project.role}</span>
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
        </StaggerItem>
      ))}
    </Stagger>
  );
}
