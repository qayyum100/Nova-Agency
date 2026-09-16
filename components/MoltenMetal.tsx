"use client";

import { useEffect, useRef } from "react";

type MoltenMetalProps = {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  scale?: number;
  detail?: number;
  glow?: number;
  coreSize?: number;
  swirl?: number;
  fold?: number;
  blackPoint?: number;
  brightness?: number;
  colorMode?: "molten" | "rainbow";
  grain?: boolean;
  grainIntensity?: number;
  mouseInteraction?: boolean;
  mouseStrength?: number;
  opacity?: number;
};

export default function MoltenMetal({ color1 = "#5227FF", color2 = "#FF9FFC", color3 = "#FFFFFF", speed = 0.35, scale = 4, detail = 3, glow = 1.6, coreSize = 0.1, swirl = 1, fold = -0.2, blackPoint = 0.05, brightness = 1.3, colorMode = "molten", grain = true, grainIntensity = 0.05, mouseInteraction = true, mouseStrength = 0.3, opacity = 1 }: MoltenMetalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasElement = canvas;
    const context = canvasElement.getContext("2d");
    if (!context) return;
    const drawingContext = context;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationFrame = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvasElement.clientWidth;
      height = canvasElement.clientHeight;
      canvasElement.width = width * ratio;
      canvasElement.height = height * ratio;
      drawingContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function move(event: PointerEvent) {
      if (!mouseInteraction) return;
      pointerX = event.clientX / window.innerWidth;
      pointerY = event.clientY / window.innerHeight;
    }

    function draw() {
      const time = reducedMotion ? 0 : frame * speed * 0.012;
      const centerX = width * (0.5 + (pointerX - 0.5) * mouseStrength * 0.18);
      const centerY = height * (0.5 + (pointerY - 0.5) * mouseStrength * 0.18);
      const radius = Math.max(width, height) * (0.46 + coreSize);
      const wave = Math.sin(time * swirl + fold * 4) * radius * 0.08;
      const gradient = drawingContext.createRadialGradient(centerX + wave, centerY - wave, radius * blackPoint, centerX, centerY, radius);
      gradient.addColorStop(0, color3);
      gradient.addColorStop(Math.min(0.5, 0.18 + detail * 0.05), color2);
      gradient.addColorStop(0.7, color1);
      gradient.addColorStop(1, "#08090d");
      drawingContext.clearRect(0, 0, width, height);
      drawingContext.globalAlpha = opacity;
      drawingContext.fillStyle = gradient;
      drawingContext.fillRect(0, 0, width, height);
      drawingContext.globalCompositeOperation = "screen";
      for (let index = 0; index < Math.max(3, detail * 3); index += 1) {
        const offset = Math.sin(time * (1 + index * 0.2) + index * 2.1) * radius * 0.22;
        const band = drawingContext.createLinearGradient(0, centerY + offset - radius, width, centerY + offset + radius);
        band.addColorStop(0, "transparent");
        band.addColorStop(0.45, `${color2}${Math.max(8, Math.min(38, Math.round(glow * 16))).toString(16).padStart(2, "0")}`);
        band.addColorStop(0.52, `${color3}${Math.max(8, Math.min(30, Math.round(brightness * 12))).toString(16).padStart(2, "0")}`);
        band.addColorStop(1, "transparent");
        drawingContext.fillStyle = band;
        drawingContext.fillRect(0, 0, width, height);
      }
      drawingContext.globalCompositeOperation = "source-over";
      if (grain) {
        drawingContext.fillStyle = `rgba(255,255,255,${grainIntensity * 0.12})`;
        for (let index = 0; index < 90; index += 1) drawingContext.fillRect(Math.random() * width, Math.random() * height, 1, 1);
      }
      frame += 1;
      animationFrame = window.requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    animationFrame = window.requestAnimationFrame(draw);
    return () => { window.cancelAnimationFrame(animationFrame); window.removeEventListener("resize", resize); window.removeEventListener("pointermove", move); };
  }, [brightness, color1, color2, color3, coreSize, detail, fold, glow, grain, grainIntensity, mouseInteraction, mouseStrength, opacity, scale, speed, swirl, blackPoint]);

  return <canvas ref={canvasRef} className="molten-metal" aria-hidden="true" />;
}
