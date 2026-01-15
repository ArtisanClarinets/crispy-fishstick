"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type ToneKey = "home" | "work" | "insights" | "contact" | "about" | "default";

const TONES: Record<ToneKey, { h: number; s: number; l: number; glowA: number }> = {
  home:    { h: 210, s: 90, l: 60, glowA: 0.10 },
  work:    { h: 265, s: 85, l: 62, glowA: 0.11 },
  insights:{ h: 190, s: 80, l: 58, glowA: 0.10 },
  contact: { h: 140, s: 75, l: 55, glowA: 0.09 },
  about:   { h:  30, s: 85, l: 60, glowA: 0.09 },
  default: { h: 220, s: 70, l: 60, glowA: 0.08 },
};

function routeToTone(pathname: string): ToneKey {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/work")) return "work";
  if (pathname.startsWith("/insights")) return "insights";
  if (pathname.startsWith("/contact")) return "contact";
  if (pathname.startsWith("/about")) return "about";
  return "default";
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();

    // Safari fallback included
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  return reduced;
}

export function SystemLayer() {
  const pathname = usePathname();
  const reducedMotion = usePrefersReducedMotion();

  const baseTone = useMemo(() => routeToTone(pathname), [pathname]);
  const [toneKey, setToneKey] = useState<ToneKey>(baseTone);

  // “Calibration sweep” trigger on route change
  const [sweepOn, setSweepOn] = useState(false);

  // Track sections with data-system-tone="..."
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
     
    setToneKey(baseTone);

    if (reducedMotion) return;
    setSweepOn(true);
    const t = window.setTimeout(() => setSweepOn(false), 650);
    return () => window.clearTimeout(t);
  }, [baseTone, reducedMotion]);

  useEffect(() => {
    // Section-based tone (optional but recommended)
    // Add data-system-tone="home|work|..." on sections you want to tint the glow.
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-system-tone]"));
    if (nodes.length === 0) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Choose the most visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

        if (visible.length === 0) return;

        const el = visible[0].target as HTMLElement;
        const key = el.dataset.systemTone as ToneKey | undefined;
        if (key && TONES[key]) setToneKey(key);
      },
      { threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    for (const n of nodes) observerRef.current.observe(n);

    return () => observerRef.current?.disconnect();
  }, [pathname]);

  const tone = TONES[toneKey] ?? TONES.default;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
    >
      <div
        className="system-layer"
        data-sweep={sweepOn ? "1" : "0"}
        style={{
          // CSS custom properties consumed in globals.css
          ["--system-h" as any]: tone.h,
          ["--system-s" as any]: `${tone.s}%`,
          ["--system-l" as any]: `${tone.l}%`,
          ["--system-glow-a" as any]: tone.glowA,
        }}
      />
    </div>
  );
}
