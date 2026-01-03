"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface WavesProps {
  lineColor?: string;
  backgroundColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  xGap?: number;
  yGap?: number;
  className?: string;
}

export function Waves({
  lineColor = "rgba(255, 255, 255, 0.3)",
  backgroundColor = "transparent",
  waveSpeedX = 0.02,
  waveSpeedY = 0.01,
  waveAmpX = 40,
  waveAmpY = 20,
  xGap = 20,
  yGap = 20,
  className,
}: WavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let waves: { x: number; y: number; z: number; time: number }[] = [];
    let animationId: number;
    let countX = 0;
    let countY = 0;

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;

      countX = Math.ceil(width / xGap) + 1;
      countY = Math.ceil(height / yGap) + 1;

      waves = [];
      for (let y = 0; y < countY; y++) {
        for (let x = 0; x < countX; x++) {
          waves.push({
            x: x * xGap,
            y: y * yGap,
            z: 0,
            time: x * 0.1 + y * 0.1, // Initial phase
          });
        }
      }
    };

    let time = 0;

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.beginPath();
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      // Update and Draw points
      for (let i = 0; i < waves.length; i++) {
        const point = waves[i];

        // Simple wave motion
        // We simulate 3D by modifying y based on a sine wave of x and time
        // And maybe some perspective scaling if we wanted true 3D, but a flat wave is often sufficient for "react bits" style

        // Let's do a mesh wave
        const moveX = Math.sin(point.time + time * 2 + point.y * 0.01) * waveAmpX * 0.2;
        const moveY = Math.sin(point.time + time * 3 + point.x * 0.01) * waveAmpY;

        // Current projected position
        const px = point.x + moveX;
        const py = point.y + moveY;

        // Draw connections
        // Right neighbor
        if ((i + 1) % countX !== 0 && i + 1 < waves.length) {
            const next = waves[i + 1];
            const nextMoveX = Math.sin(next.time + time * 2 + next.y * 0.01) * waveAmpX * 0.2;
            const nextMoveY = Math.sin(next.time + time * 3 + next.x * 0.01) * waveAmpY;
            ctx.moveTo(px, py);
            ctx.lineTo(next.x + nextMoveX, next.y + nextMoveY);
        }

        // Bottom neighbor
        if (i + countX < waves.length) {
            const next = waves[i + countX];
            const nextMoveX = Math.sin(next.time + time * 2 + next.y * 0.01) * waveAmpX * 0.2;
            const nextMoveY = Math.sin(next.time + time * 3 + next.x * 0.01) * waveAmpY;
            ctx.moveTo(px, py);
            ctx.lineTo(next.x + nextMoveX, next.y + nextMoveY);
        }
      }
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [lineColor, backgroundColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, xGap, yGap]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none -z-10", className)}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
