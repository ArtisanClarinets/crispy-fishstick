"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/lib/site";
import { motion, useScroll, useSpring } from "framer-motion";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
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
    { href: "/process", label: "Process" },
    { href: "/trust", label: "Trust Center" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link
            href="/"
            className="text-lg font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          {siteConfig.company}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all group-hover:w-full"></span>
            </Link>
          ))}
          <ThemeToggle />
          <Button asChild variant="default" className="rounded-full px-6">
            <Link href={siteConfig.cta.primary.href}>
              {siteConfig.cta.primary.text}
            </Link>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary origin-left"
        style={{ scaleX }}
      />

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-background border-t border-border z-40 p-6 flex flex-col gap-6 animate-in slide-in-from-top-5 fade-in duration-200">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-medium text-foreground/80 hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild size="lg" className="mt-4 w-full">
              <Link href={siteConfig.cta.primary.href} onClick={() => setIsOpen(false)}>
                {siteConfig.cta.primary.text}
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
