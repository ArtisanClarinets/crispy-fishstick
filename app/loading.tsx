export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-20 bg-background overflow-hidden">
      <div className="container px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full">

        {/* LEFT: Text Content Skeleton */}
        <div className="flex-1 w-full max-w-xl space-y-8 animate-pulse">
          {/* Badge */}
          <div className="h-8 w-64 bg-secondary/50 rounded-full" />

          {/* Headline */}
          <div className="space-y-4">
            <div className="h-16 w-3/4 bg-secondary/50 rounded-lg" />
            <div className="h-16 w-1/2 bg-secondary/50 rounded-lg" />
          </div>

          {/* Subtext */}
          <div className="space-y-3">
            <div className="h-4 w-full bg-secondary/50 rounded" />
            <div className="h-4 w-5/6 bg-secondary/50 rounded" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <div className="h-14 w-40 bg-secondary/50 rounded-full" />
            <div className="h-14 w-40 bg-secondary/50 rounded-full" />
          </div>
        </div>

        {/* RIGHT: Module Skeleton */}
        <div className="flex-1 w-full max-w-2xl h-[400px] bg-secondary/30 rounded-xl border border-border/50 animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
        </div>

      </div>

      {/* Loading Indicator Text */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <div className="inline-flex items-center gap-2 text-muted-foreground text-sm font-mono tracking-widest uppercase opacity-70">
          <div className="h-2 w-2 bg-primary rounded-full animate-ping" />
          System Initializing
        </div>
      </div>
    </div>
  );
}
