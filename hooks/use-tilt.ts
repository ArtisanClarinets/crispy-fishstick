"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

interface TiltOptions {
  xFactor?: number;
  yFactor?: number;
}

export function useTilt({ xFactor = 8, yFactor = 8 }: TiltOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [active, setActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [pointerCoarse, setPointerCoarse] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const update = () => setPointerCoarse(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const onMouseEnter = useCallback(() => {
    if (pointerCoarse || prefersReducedMotion) return;
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
      setActive(true);
    }
  }, [pointerCoarse, prefersReducedMotion]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!active || !rectRef.current || !ref.current) return;

      const rect = rectRef.current;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.setProperty("--tilt-x", `${(-y * yFactor).toFixed(2)}deg`);
          ref.current.style.setProperty("--tilt-y", `${(x * xFactor).toFixed(2)}deg`);
          ref.current.style.setProperty("--spot-x", `${Math.round((x + 0.5) * 100)}%`);
          ref.current.style.setProperty("--spot-y", `${Math.round((y + 0.5) * 100)}%`);
        }
      });
    },
    [active, xFactor, yFactor]
  );

  const onMouseLeave = useCallback(() => {
    setActive(false);
    rectRef.current = null;
    requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.style.setProperty("--tilt-x", "0deg");
        ref.current.style.setProperty("--tilt-y", "0deg");
        ref.current.style.setProperty("--spot-x", "50%");
        ref.current.style.setProperty("--spot-y", "50%");
      }
    });
  }, []);

  return { ref, onMouseEnter, onMouseMove, onMouseLeave };
}
