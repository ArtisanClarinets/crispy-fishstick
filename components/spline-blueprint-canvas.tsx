"use client";

import * as React from "react";
import type { Application } from "@splinetool/runtime";

import { cn } from "@/lib/utils";

type SplineComponentProps = {
  scene: string;
  onLoad?: (app: Application) => void;
  className?: string;
  renderOnDemand?: boolean;
};

const LazySpline = React.lazy(
  async (): Promise<{ default: React.ComponentType<SplineComponentProps> }> => {
    const mod = await import("@splinetool/react-spline");
    return { default: mod.default as unknown as React.ComponentType<SplineComponentProps> };
  }
);

const DEFAULT_SCENE_URL = "/spline/living-blueprint.splinecode";

const PHASE_STATE_NAME: ReadonlyArray<string> = [
  "phase-0",
  "phase-1",
  "phase-2",
  "phase-3",
  "phase-4",
  "phase-5",
  "phase-6",
  "phase-7",
];

type Props = {
  sceneUrl?: string;
  phase: number; // 0..7
  progress: number; // 0..1
  className?: string;
  onReady?: () => void;
};

export function SplineBlueprintCanvas({
  sceneUrl = DEFAULT_SCENE_URL,
  phase,
  progress,
  className,
  onReady,
}: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const appRef = React.useRef<Application | null>(null);
  const lastAppliedPhaseRef = React.useRef<number | null>(null);
  const lastAppliedProgressRef = React.useRef<number>(-1);

  const [shouldMountSpline, setShouldMountSpline] = React.useState(false);
  const [sceneAvailable, setSceneAvailable] = React.useState<boolean | null>(null);

  // Lazy-mount the WebGL canvas only when near the viewport.
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setShouldMountSpline(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "600px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Check that the self-hosted scene exists (prevents noisy load failures).
  React.useEffect(() => {
    let cancelled = false;

    async function check() {
      try {
        const res = await fetch(sceneUrl, { method: "HEAD" });
        if (cancelled) return;
        setSceneAvailable(res.ok);
      } catch {
        if (cancelled) return;
        setSceneAvailable(false);
      }
    }

    void check();
    return () => {
      cancelled = true;
    };
  }, [sceneUrl]);

  const applyControls = React.useCallback((app: Application, nextPhase: number, nextProgress: number) => {
    const safePhase = clampInt(nextPhase, 0, 7);
    const safeProgress = clamp01(nextProgress);

    // 1) Preferred: runtime variables
    // This is not part of the public react-spline README, but is a common pattern
    // in Spline Code exports. We probe for it safely.
    const maybeWithVariables = app as unknown as {
      setVariable?: (name: string, value: number) => void;
    };

    if (typeof maybeWithVariables.setVariable === "function") {
      maybeWithVariables.setVariable("phase", safePhase);
      maybeWithVariables.setVariable("progress", safeProgress);
      return;
    }

    // 2) Secondary: object state switching
    const maybeWithFind = app as unknown as {
      findObjectByName?: (name: string) => unknown;
    };

    if (typeof maybeWithFind.findObjectByName === "function") {
      const obj = maybeWithFind.findObjectByName("Blueprint") as unknown as {
        state?: string;
        emitEvent?: (eventName: string) => void;
      } | null;

      if (obj && typeof obj === "object") {
        const stateName = PHASE_STATE_NAME[safePhase] ?? "phase-0";
        if (typeof obj.state === "string") {
          // If the scene exposes state names, setting `state` may trigger transitions.
          obj.state = stateName;
          return;
        }

        // 3) Tertiary: emit an event on the object
        if (typeof obj.emitEvent === "function") {
          obj.emitEvent("mouseDown");
          return;
        }
      }
    }

    // If none are available, do nothing (graceful fallback).
  }, []);

  // Apply phase/progress updates without spamming (phase changes only when it changes;
  // progress updates only when meaningful).
  React.useEffect(() => {
    const app = appRef.current;
    if (!app) return;

    const safePhase = clampInt(phase, 0, 7);
    const safeProgress = clamp01(progress);

    const phaseChanged = lastAppliedPhaseRef.current !== safePhase;
    const progressDelta = Math.abs(lastAppliedProgressRef.current - safeProgress);
    const shouldUpdateProgress = progressDelta >= 0.01;

    if (!phaseChanged && !shouldUpdateProgress) return;

    // Avoid per-frame churn: only apply when phase changes or progress changes enough.
    applyControls(app, safePhase, safeProgress);

    lastAppliedPhaseRef.current = safePhase;
    lastAppliedProgressRef.current = safeProgress;
  }, [applyControls, phase, progress]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-full w-full overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background via-background to-secondary/20",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_35px_80px_-40px_rgba(0,0,0,0.55)]",
        className
      )}
      data-testid="living-blueprint-visual"
      aria-label="3D blueprint assembly visual"
    >
      {/* Ambient rim */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-primary/10" />

      {/* Subtle fallback background pattern */}
      <div
        className={
          "pointer-events-none absolute inset-0 opacity-60 " +
          "bg-[radial-gradient(900px_circle_at_15%_30%,hsl(var(--primary)/0.18),transparent_55%),radial-gradient(700px_circle_at_90%_80%,hsl(var(--primary)/0.10),transparent_60%)]"
        }
      />

      {shouldMountSpline && sceneAvailable === true ? (
        <React.Suspense fallback={<FallbackVisual label="Loading 3D visual…" />}>
          <LazySpline
            scene={sceneUrl}
            className="absolute inset-0"
            onLoad={(app) => {
              appRef.current = app;
              // Apply initial values immediately.
              applyControls(app, phase, progress);
              onReady?.();
            }}
            renderOnDemand
          />
        </React.Suspense>
      ) : (
        <FallbackVisual
          label={
            sceneAvailable === false
              ? "Spline scene missing — showing fallback visual"
              : "Loading 3D visual…"
          }
        />
      )}

      {/* Caption */}
      <div className="absolute left-4 bottom-4 right-4">
        <div className="glass-card surface-rim rounded-xl px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-foreground/90">Assembly phase</p>
            <p className="text-sm text-muted-foreground tabular-nums">{clampInt(phase, 0, 7)} / 7</p>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300"
              style={{ width: `${Math.round(clamp01(progress) * 100)}%` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FallbackVisual({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="max-w-sm text-center px-6">
        <div className="mx-auto mb-4 h-12 w-12 rounded-2xl border border-border/60 bg-background/60 backdrop-blur flex items-center justify-center">
          <div className="h-5 w-5 rounded-full bg-primary/40" />
        </div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function clamp01(v: number) {
  if (Number.isNaN(v)) return 0;
  if (v < 0) return 0;
  if (v > 1) return 1;
  return v;
}

function clampInt(v: number, min: number, max: number) {
  const rounded = Math.round(v);
  if (Number.isNaN(rounded)) return min;
  return Math.min(max, Math.max(min, rounded));
}
