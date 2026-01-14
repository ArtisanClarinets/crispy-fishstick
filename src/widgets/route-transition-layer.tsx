"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function RouteTransitionLayer() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [key, setKey] = useState(0);

  // Trigger animation on pathname change
  useEffect(() => {
    // We can't easily detect "start" of navigation in Next.js App Router without a wrapper,
    // but we can trigger a "post-arrival" cue or use the fact that layout persists.
    // However, the prompt asks for a fast transition.
    // Since we are inside the persisted layout, a pathname change means we just arrived.
    // We'll trigger a quick "scan" effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setKey(prev => prev + 1);
    setIsNavigating(true);
    const t = setTimeout(() => setIsNavigating(false), 600);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
        {/* We use a key to force re-render/replay of the animation on every route change */}
        <AnimatePresence mode="wait">
            {isNavigating && (
                <motion.div
                    key={`scan-${key}`}
                    className="absolute top-0 bottom-0 w-[2px] bg-primary/50 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    initial={{ left: "0%", opacity: 0 }}
                    animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                />
            )}
        </AnimatePresence>
    </div>
  );
}
