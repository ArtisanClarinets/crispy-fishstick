"use client";

import { useRef, useEffect } from "react";

interface WavesProps {
  lineColor?: string;
  backgroundColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
  xGap?: number;
  yGap?: number;
}

export default function Waves({
  lineColor = "rgba(0, 0, 0, 0.1)", // Default placeholder, will be overridden by theme
  backgroundColor = "transparent",
  waveSpeedX = 0.0125,
  waveSpeedY = 0.005,
  waveAmpX = 32,
  waveAmpY = 16,
  friction = 0.9,
  tension = 0.01,
  maxCursorMove = 100,
  xGap = 10,
  yGap = 32,
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
    let lines: any[] = [];
    let frameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let cursorActive = false;

    // Use computed styles for colors if possible, but canvas needs explicit strings
    // We'll rely on props or defaults.
    // If the prop is a CSS variable reference (e.g. "hsl(var(--primary))"),
    // we need to resolve it if we want to use it in canvas, OR the user passes a valid color string.
    // For now, we assume the user passes a valid string or we stick to the default.
    // However, to be "cohesive", we want it to react to the theme.
    // We can get the computed style of the container.

    function getThemeColor() {
      const style = getComputedStyle(document.body);
      const primary = style.getPropertyValue('--primary').trim();
      // primary is likely "220 15% 10%", we need to convert to rgba or hsl
      if (primary.includes(' ')) {
         return `hsl(${primary} / 0.15)`;
      }
      return lineColor;
    }

    const effectiveLineColor = lineColor === "rgba(0, 0, 0, 0.1)" ? getThemeColor() : lineColor;

    function resize() {
      width = container!.clientWidth;
      height = container!.clientHeight;
      canvas!.width = width;
      canvas!.height = height;
      initLines();
    }

    class Line {
      y: number;
      points: any[];
      constructor(y: number) {
        this.y = y;
        this.points = [];
        for (let x = 0; x <= width + xGap; x += xGap) {
          this.points.push({
            x: x,
            y: y,
            waveX: x,
            waveY: y,
            cursorX: x,
            cursorY: y,
            vx: 0,
            vy: 0
          });
        }
      }

      update(t: number) {
        for (let i = 0; i < this.points.length; i++) {
          const p = this.points[i];

          // Wave movement
          const noise = Math.sin(i * 0.05 + t * waveSpeedX) * Math.cos(i * 0.05 + t * waveSpeedY);
          p.waveX = p.x + noise * waveAmpX;
          p.waveY = p.y + noise * waveAmpY;

          // Mouse interaction
          let dist = 0;
          let angle = 0;
          if (cursorActive) {
             const dx = mouseX - p.x;
             const dy = mouseY - p.y;
             dist = Math.sqrt(dx * dx + dy * dy);
             angle = Math.atan2(dy, dx);
          }

          const targetCursorX = cursorActive && dist < 200 ? p.x - Math.cos(angle) * ((200 - dist) / 200) * maxCursorMove : p.x;
          const targetCursorY = cursorActive && dist < 200 ? p.y - Math.sin(angle) * ((200 - dist) / 200) * maxCursorMove : p.y;

          p.vx += (targetCursorX - p.cursorX) * tension;
          p.vy += (targetCursorY - p.cursorY) * tension;
          p.vx *= friction;
          p.vy *= friction;
          p.cursorX += p.vx;
          p.cursorY += p.vy;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.moveTo(this.points[0].cursorX + (this.points[0].waveX - this.points[0].x), this.points[0].cursorY + (this.points[0].waveY - this.points[0].y));

        for (let i = 1; i < this.points.length; i++) {
           const p = this.points[i];
           const px = p.cursorX + (p.waveX - p.x);
           const py = p.cursorY + (p.waveY - p.y);
           ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
    }

    function initLines() {
      lines = [];
      // Calculate how many lines based on yGap
      const totalLines = Math.ceil(height / yGap);
      // Start slightly above 0 to cover
      for (let i = 0; i <= totalLines; i++) {
        lines.push(new Line(i * yGap));
      }
    }

    let t = 0;
    function animate() {
      ctx!.clearRect(0, 0, width, height);
      if (backgroundColor !== "transparent") {
          ctx!.fillStyle = backgroundColor;
          ctx!.fillRect(0, 0, width, height);
      }

      ctx!.strokeStyle = effectiveLineColor;
      ctx!.lineWidth = 1;

      lines.forEach((line) => {
        line.update(t);
        line.draw(ctx!);
      });

      t += 1;
      frameId = requestAnimationFrame(animate);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      cursorActive = true;
    }

    function onMouseLeave() {
      cursorActive = false;
    }

    window.addEventListener("resize", resize);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, [lineColor, backgroundColor, waveSpeedX, waveSpeedY, waveAmpX, waveAmpY, friction, tension, maxCursorMove, xGap, yGap]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: backgroundColor === "transparent" ? undefined : backgroundColor,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
