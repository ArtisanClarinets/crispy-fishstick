"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function RouteTransitionLayer() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [key, setKey] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const triggerScan = useCallback(() => {
    if (prefersReducedMotion) return;
    setKey((prev) => prev + 1);
    setIsNavigating(true);
    const t = setTimeout(() => setIsNavigating(false), 220);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

  // Trigger animation on pathname change (back/forward or non-VT links)
  useEffect(() => triggerScan(), [pathname, triggerScan]);

  // Listen for pre-navigation triggers from VTLink
  useEffect(() => {
    const handler = () => triggerScan();
    window.addEventListener("route-transition-start", handler as EventListener);
    return () => window.removeEventListener("route-transition-start", handler as EventListener);
  }, [triggerScan]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
        {/* We use a key to force re-render/replay of the animation on every route change */}
        <AnimatePresence mode="wait">
            {isNavigating && !prefersReducedMotion && (
                <motion.div
                    key={`scan-${key}`}
                    className="absolute top-0 bottom-0 w-[2px] bg-primary/50 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    initial={{ left: "0%", opacity: 0 }}
                    animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                />
            )}
        </AnimatePresence>
    </div>
  );
}
