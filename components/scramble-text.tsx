"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-*/=<>[]{}";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  delay?: number;
  scrambledClassName?: string;
}

export function ScrambleText({
  text,
  className,
  scrambleSpeed = 25,
  delay = 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scrambledClassName = "opacity-60",
}: ScrambleTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize with scrambled text
  useEffect(() => {
    if (prefersReducedMotion) return;
    setDisplayText(
      text
        .split("")
        .map((c) => (c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join("")
    );
  }, [text, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (isInView && !isAnimating) {
      const timer = setTimeout(() => setIsAnimating(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, delay, isAnimating, prefersReducedMotion]);

  useEffect(() => {
    if (!isAnimating || prefersReducedMotion) return;

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return char;
            }
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iterations += 1 / 3; // Slower reveal pace
      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, scrambleSpeed);

    return () => clearInterval(interval);
  }, [isAnimating, text, scrambleSpeed, prefersReducedMotion]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {displayText}
    </span>
  );
}
