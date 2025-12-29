"use client";

interface SystemSpecProps {
  title: string;
  items: string[];
  footnote?: string;
}

export function SystemSpec({ title, items, footnote }: SystemSpecProps) {
  return (
    <div className="my-10 rounded-2xl border border-border/50 bg-secondary/30 p-6">
      <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">System Spec</div>
      <h4 className="text-lg font-semibold mb-4">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/70" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {footnote ? (
        <p className="text-xs text-muted-foreground mt-4">{footnote}</p>
      ) : null}
    </div>
  );
}
