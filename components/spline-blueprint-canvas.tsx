"use client";

import { useEffect, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SplineBlueprintCanvasProps {
  sceneUrl?: string;
  phase: number; // 0..7
  progress: number; // 0..1 (continuous)
  className?: string;
}

export function SplineBlueprintCanvas({
  sceneUrl = "/spline/living-blueprint.splinecode",
  phase,
  progress,
  className,
}: SplineBlueprintCanvasProps) {
  const splineApp = useRef<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Update Spline variables when phase or progress changes
  useEffect(() => {
    if (!splineApp.current) return;

    try {
      // 1. Try setting variables first (preferred contract)
      splineApp.current.setVariable("phase", phase);
      splineApp.current.setVariable("progress", progress);
    } catch (_err) {
      // Silent catch - scene might not have variables yet
      // Fallback: could try finding objects by name if needed, 
      // but for now we rely on the variable contract.
    }
  }, [phase, progress]);

  function onLoad(spline: Application) {
    splineApp.current = spline;
    setIsLoading(false);
    
    // Initialize immediately
    try {
      spline.setVariable("phase", phase);
      spline.setVariable("progress", progress);
    } catch (_e) {
      // ignore
    }
  }

  function onError() {
    console.error("Spline load error"); // Keep minimal logs
    setHasError(true);
    setIsLoading(false);
  }

  if (hasError) {
    return (
      <div className={cn("flex items-center justify-center bg-muted/10", className)}>
        <div className="text-center p-8 border border-border/50 rounded-lg bg-background/50 backdrop-blur-sm">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="w-8 h-8 rounded bg-primary/20 animate-pulse" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Blueprint Preview Unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full overflow-hidden bg-transparent", className)}>
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <Loader2 className="w-8 h-8 text-primary/50 animate-spin" />
        </div>
      )}

      {/* Spline Scene */}
      <Spline
        scene={sceneUrl}
        onLoad={onLoad}
        onError={onError}
        className="w-full h-full"
        renderOnDemand={false} // Ensure smooth updates
      />
      
      {/* Glass Overlay (Optional aesthetic touch) */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]" />
    </div>
  );
}
