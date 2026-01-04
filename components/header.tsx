"use client";

import { VTLink } from "@/components/vt-link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/work", label: "Work" },
    { href: "/lab/revenue-leak", label: "Lab: Revenue" },
    { href: "/lab/server-config", label: "Lab: Servers" },
    { href: "/process", label: "Process" },
    { href: "/trust", label: "Trust Center" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border/40 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <VTLink
            href="/"
            className="text-lg font-bold tracking-tight transition-opacity hover:opacity-80 flex items-center gap-2"
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow shadow-[0_0_8px_rgba(var(--primary-rgb),0.6)]" />
          {siteConfig.company}
        </VTLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <VTLink
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </VTLink>
          ))}
          {/* Desktop toggle — use data-testid so tests can target this specific instance */}
          <ThemeToggle data-testid="theme-toggle-desktop" />
          <Button asChild variant="default" className="rounded-full px-5 h-9 text-sm signal-sheen shadow-lg shadow-primary/20">
            <VTLink href={siteConfig.cta.primary.href}>
              {siteConfig.cta.primary.text}
            </VTLink>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          {/* Mobile theme toggle — share the same accessible name but expose a different data-testid for tests */}
          <ThemeToggle data-testid="theme-toggle-mobile" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Progress Line */}
      {prefersReducedMotion ? (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary/30" />
      ) : (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary origin-left"
          style={{ scaleX }}
        />
      )}

      {/* Mobile Nav */}
      {isOpen && (
        <div
          id="mobile-nav"
          className="md:hidden fixed inset-0 top-20 bg-background border-t border-border z-40 p-6 flex flex-col gap-6 animate-in slide-in-from-top-5 fade-in duration-200"
        >
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <VTLink
                key={link.href}
                href={link.href}
                className="text-2xl font-medium text-foreground/80 hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </VTLink>
            ))}
            <Button asChild size="lg" className="mt-4 w-full">
              <VTLink href={siteConfig.cta.primary.href} onClick={() => setIsOpen(false)}>
                {siteConfig.cta.primary.text}
              </VTLink>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
