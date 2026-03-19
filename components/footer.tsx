import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div>
              <span className="accent-bar" />
              <h3 className="text-xl font-bold tracking-tight">Vantus Systems</h3>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed text-sm">
              Engineering-grade websites and business systems for small businesses on the Gulf Coast and across North America.
              You own the code. You own the result. No platform lock-in.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-xs uppercase tracking-wider" style={{ color: "var(--vantus-sky)" }}>Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services/website-rebuild" className="text-muted-foreground hover:text-[var(--vantus-sky)] transition-colors">
                  Website Rebuild
                </Link>
              </li>
              <li>
                <Link href="/services/website-plus-cms" className="text-muted-foreground hover:text-[var(--vantus-sky)] transition-colors">
                  Website + CMS
                </Link>
              </li>
              <li>
                <Link href="/services/website-plus-portal" className="text-muted-foreground hover:text-[var(--vantus-sky)] transition-colors">
                  Website + Business Portal
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-[var(--vantus-sky)] transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-xs uppercase tracking-wider" style={{ color: "var(--vantus-sky)" }}>Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/proof" className="text-muted-foreground hover:text-[var(--vantus-sky)] transition-colors">Our Work</Link></li>
              <li><Link href="/standards" className="text-muted-foreground hover:text-[var(--vantus-sky)] transition-colors">Standards</Link></li>
              <li><Link href="/learn" className="text-muted-foreground hover:text-[var(--vantus-sky)] transition-colors">Learn</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-[var(--vantus-sky)] transition-colors">About</Link></li>
              <li><Link href="/start-audit" className="font-semibold transition-colors" style={{ color: "var(--vantus-sky)" }}>Free Audit →</Link></li>
            </ul>
            <div className="flex gap-3 pt-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-[var(--vantus-sky)] hover:text-white transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-[var(--vantus-sky)] hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-secondary hover:bg-[var(--vantus-sky)] hover:text-white transition-all duration-300"
                aria-label="Twitter/X"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground font-medium">
            &copy; {currentYear} {siteConfig.company}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/legal/privacy" className="hover:text-[var(--vantus-sky)] transition-colors">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-[var(--vantus-sky)] transition-colors">Terms of Service</Link>
            <Link href="/legal/cookies" className="hover:text-[var(--vantus-sky)] transition-colors">Cookie Policy</Link>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
             <span className="w-2 h-2 rounded-full bg-signal-success animate-pulse" />
             <span>All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
