interface MetricGridProps {
  children: React.ReactNode;
}

export function MetricGrid({ children }: MetricGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 not-prose">
      {children}
    </div>
  );
}

interface MetricItemProps {
  value: string;
  label: string;
}

export function MetricItem({ value, label }: MetricItemProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-secondary/30 rounded-lg border border-border/50">
      <div className="text-2xl md:text-3xl font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1 text-center">{label}</div>
    </div>
  );
}
