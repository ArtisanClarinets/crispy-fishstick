"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function ConsoleHud() {
  const [visible, setVisible] = useState(false);
  const [section, setSection] = useState<string>("--");
  const [time, setTime] = useState<string>("00:00:00");
  const [syncing, setSyncing] = useState(false);
  const pathname = usePathname();
  const startTime = useRef<number>(Date.now());

  // Scroll visibility logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    // Throttle via rAF not strictly needed for simple boolean flip but good practice
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section Tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sec = entry.target.getAttribute("data-hud-section");
            if (sec) setSection(sec);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("[data-hud-section]");
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]); // Re-run on route change

  // Timestamps
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime.current;
      // Format as T+mm:ss
      const totalSeconds = Math.floor(elapsed / 1000);
      const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
      const s = (totalSeconds % 60).toString().padStart(2, "0");
      setTime(`T+${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Sync Blip on navigation
  useEffect(() => {
    setSyncing(true);
    const t = setTimeout(() => setSyncing(false), 350);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] text-[10px] font-mono tracking-wider text-muted-foreground select-none overflow-hidden">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full relative"
          >
            {/* Top Right Pill */}
            <div className="absolute top-6 right-6 flex items-center gap-2 bg-background/80 backdrop-blur border border-border/40 px-3 py-1 rounded-full shadow-sm">
               <span className={cn("w-1.5 h-1.5 rounded-full bg-green-500", syncing && "animate-pulse")} />
               <span className="text-foreground/80">OPERATIONAL</span>
            </div>

            {/* Left Gutter */}
            <div className="absolute top-1/2 left-6 -translate-y-1/2 flex flex-col gap-1 opacity-60">
               <div>SEC: {section.toUpperCase()}</div>
               <div>TIM: {time}</div>
               <div>PTH: {pathname === "/" ? "/ROOT" : pathname.toUpperCase()}</div>
            </div>

            {/* Bottom Bar */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-1.5 rounded-full bg-background/50 backdrop-blur border border-white/5 shadow-sm whitespace-nowrap"
              data-sync={syncing ? "1" : "0"}
            >
               <span>BUILD: HARDENED</span>
               <span className="text-border">|</span>
               <span>CSP: STRICT</span>
               <span className="text-border">|</span>
               <span className={cn("transition-colors duration-300", syncing ? "text-primary" : "")}>LATENCY: &lt;50ms</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
