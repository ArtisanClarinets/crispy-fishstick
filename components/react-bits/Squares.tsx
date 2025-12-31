"use client";

import { useRef, useEffect } from "react";

interface SquaresProps {
  direction?: "diagonal" | "up" | "down" | "left" | "right";
  speed?: number;
  borderColor?: string;
  squareSize?: number;
  hoverFillColor?: string;
}

export function Squares({
  direction = "diagonal",
  speed = 0.5,
  borderColor = "#333",
  squareSize = 40,
  hoverFillColor = "#222",
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const numSquaresX = useRef<number>(0);
  const numSquaresY = useRef<number>(0);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquare = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize);
      const startY = Math.floor(gridOffset.current.y / squareSize);
      const offsetX = gridOffset.current.x % squareSize;
      const offsetY = gridOffset.current.y % squareSize;

      for (let x = 0; x < numSquaresX.current; x++) {
        for (let y = 0; y < numSquaresY.current; y++) {
          const squareX = x * squareSize - offsetX;
          const squareY = y * squareSize - offsetY;

          // Check if hovered
          if (
            hoveredSquare.current &&
            Math.floor((x * squareSize - offsetX) / squareSize) ===
              hoveredSquare.current.x &&
            Math.floor((y * squareSize - offsetY) / squareSize) ===
              hoveredSquare.current.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }
    };

    const update = () => {
      switch (direction) {
        case "diagonal":
          gridOffset.current.x += speed;
          gridOffset.current.y += speed;
          break;
        case "up":
          gridOffset.current.y -= speed;
          break;
        case "down":
          gridOffset.current.y += speed;
          break;
        case "left":
          gridOffset.current.x -= speed;
          break;
        case "right":
          gridOffset.current.x += speed;
          break;
      }

      if (Math.abs(gridOffset.current.x) > squareSize) gridOffset.current.x = 0;
      if (Math.abs(gridOffset.current.y) > squareSize) gridOffset.current.y = 0;

      draw();
      requestRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [direction, speed, borderColor, squareSize, hoverFillColor]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full border-none block"
    />
  );
}
