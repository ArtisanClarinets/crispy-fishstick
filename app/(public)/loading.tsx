export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
      </div>
      <p className="text-xs font-mono tracking-widest text-muted-foreground animate-pulse">
        INITIALIZING...
      </p>
    </div>
  );
}
