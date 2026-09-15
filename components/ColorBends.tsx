"use client";

import { useEffect, useRef } from "react";

type ColorBendsProps = {
  color?: string;
  speed?: number;
  frequency?: number;
  noise?: number;
  bandWidth?: number;
  rotation?: number;
  fadeTop?: number;
  iterations?: number;
  intensity?: number;
};

export function ColorBends({
  color = "#00ff56",
  speed = 0.1,
  frequency = 1.2,
  noise = 0.06,
  bandWidth = 0.4,
  rotation = 45,
  fadeTop = 0.95,
  iterations = 2,
  intensity = 1.1,
}: ColorBendsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasElement = canvas;

    const context = canvasElement.getContext("2d");
    if (!context) return;
    const drawingContext = context;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;

    function resize() {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvasElement.clientWidth;
      height = canvasElement.clientHeight;
      canvasElement.width = width * pixelRatio;
      canvasElement.height = height * pixelRatio;
      drawingContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function handlePointerMove(event: PointerEvent) {
      pointerX = event.clientX / window.innerWidth;
      pointerY = event.clientY / window.innerHeight;
    }

    function render() {
      if (!width || !height) return;

      const time = reducedMotion ? 0 : frame * speed * 0.012;
      const angle = (rotation * Math.PI) / 180;
      const spread = Math.max(width, height) * (0.35 + bandWidth);
      const driftX = (pointerX - 0.5) * width * 0.16;
      const driftY = (pointerY - 0.5) * height * 0.16;

      drawingContext.clearRect(0, 0, width, height);
      drawingContext.fillStyle = "#08090d";
      drawingContext.fillRect(0, 0, width, height);
      drawingContext.save();
      drawingContext.translate(width / 2 + driftX, height / 2 + driftY);
      drawingContext.rotate(angle);

      for (let index = 0; index < Math.max(1, iterations * 4); index += 1) {
        const offset = (index - (iterations * 4 - 1) / 2) * spread * 0.13;
        const wave = Math.sin(time * frequency + index * 1.7) * spread * noise;
        const gradient = drawingContext.createLinearGradient(-spread, offset + wave, spread, offset - wave);
        const alpha = Math.min(0.34, intensity * (0.08 + bandWidth * 0.12));
        gradient.addColorStop(0, `${color}00`);
        gradient.addColorStop(0.35, `${color}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`);
        gradient.addColorStop(0.5, `${color}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`);
        gradient.addColorStop(0.65, `${color}00`);
        drawingContext.fillStyle = gradient;
        drawingContext.beginPath();
        drawingContext.moveTo(-spread, offset - spread * 0.5);
        drawingContext.bezierCurveTo(-spread * 0.25, offset - spread * 0.18 + wave, spread * 0.25, offset + spread * 0.18 - wave, spread, offset + spread * 0.5);
        drawingContext.lineTo(spread, offset + spread);
        drawingContext.lineTo(-spread, offset + spread);
        drawingContext.closePath();
        drawingContext.fill();
      }

      drawingContext.restore();
      const fade = drawingContext.createLinearGradient(0, 0, 0, height);
      fade.addColorStop(0, `rgba(8, 9, 13, ${Math.min(1, fadeTop)})`);
      fade.addColorStop(0.42, "rgba(8, 9, 13, 0.14)");
      fade.addColorStop(1, "rgba(8, 9, 13, 0.82)");
      drawingContext.fillStyle = fade;
      drawingContext.fillRect(0, 0, width, height);

      frame += 1;
      animationFrame = window.requestAnimationFrame(render);
    }

    resize();
    render();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [bandWidth, color, fadeTop, frequency, intensity, iterations, noise, rotation, speed]);

  return <canvas ref={canvasRef} aria-hidden="true" className="color-bends" />;
}
