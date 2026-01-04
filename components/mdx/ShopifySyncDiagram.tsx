"use client";

export function ShopifySyncDiagram() {
  return (
    <div className="my-12 rounded-2xl border border-border/50 bg-background/70 backdrop-blur-sm p-6 md:p-8 shadow-[0_25px_80px_-60px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">System Diagram</p>
          <h4 className="text-xl font-semibold">Shopify → ERPNext Sync Control Tower</h4>
        </div>
        <div className="px-3 py-1 rounded-full bg-primary/10 text-xs uppercase tracking-[0.2em] text-primary">
          Live Flow
        </div>
      </div>
      <div className="relative overflow-hidden rounded-xl border border-border/10 bg-gradient-to-br from-background via-background/80 to-secondary/30">
        <svg viewBox="0 0 760 260" className="w-full h-auto text-sm font-mono">
          <defs>
            <linearGradient id="rail" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(var(--primary) / 0.2)" />
              <stop offset="50%" stopColor="hsl(var(--primary) / 0.7)" />
              <stop offset="100%" stopColor="hsl(var(--primary) / 0.2)" />
            </linearGradient>
          </defs>

          <rect x="30" y="60" width="170" height="140" rx="16" fill="currentColor" className="text-secondary/40" />
          <rect x="230" y="40" width="170" height="180" rx="16" fill="currentColor" className="text-secondary/60" />
          <rect x="430" y="60" width="170" height="140" rx="16" fill="currentColor" className="text-secondary" />
          <rect x="630" y="80" width="110" height="100" rx="16" fill="currentColor" className="text-secondary/40" />

          <path d="M 200 130 L 230 130" stroke="url(#rail)" strokeWidth="4" strokeLinecap="round" />
          <path d="M 400 130 L 430 130" stroke="url(#rail)" strokeWidth="4" strokeLinecap="round" />
          <path d="M 600 130 L 630 130" stroke="url(#rail)" strokeWidth="4" strokeLinecap="round" />

          <text x="115" y="120" textAnchor="middle" className="fill-foreground text-xs">Shopify Plus</text>
          <text x="115" y="140" textAnchor="middle" className="fill-muted-foreground text-[10px]">Admin API</text>

          <text x="315" y="110" textAnchor="middle" className="fill-foreground text-xs">Ingestion</text>
          <text x="315" y="130" textAnchor="middle" className="fill-muted-foreground text-[10px]">Queue + Webhooks</text>
          <text x="315" y="150" textAnchor="middle" className="fill-muted-foreground text-[10px]">Backpressure</text>

          <text x="515" y="120" textAnchor="middle" className="fill-foreground text-xs">Sync Engine</text>
          <text x="515" y="140" textAnchor="middle" className="fill-muted-foreground text-[10px]">Mapping + Safety Gates</text>

          <text x="685" y="120" textAnchor="middle" className="fill-foreground text-xs">ERPNext</text>
          <text x="685" y="140" textAnchor="middle" className="fill-muted-foreground text-[10px]">Frappe</text>
        </svg>
      </div>
    </div>
  );
}
