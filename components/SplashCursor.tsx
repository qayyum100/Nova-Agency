"use client";

import { useEffect, useRef } from "react";

type SplashCursorProps = {
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  COLOR_UPDATE_SPEED?: number;
  SHADING?: boolean;
  RAINBOW_MODE?: boolean;
  COLOR?: string;
};

type Splash = { x: number; y: number; size: number; life: number; speedX: number; speedY: number };

export default function SplashCursor({
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  COLOR_UPDATE_SPEED = 10,
  SHADING = true,
  RAINBOW_MODE = false,
  COLOR = "#A855F7",
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasElement = canvas;
    const context = canvasElement.getContext("2d");
    if (!context) return;
    const drawingContext = context;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const splashes: Splash[] = [];
    let animationFrame = 0;
    let lastX = 0;
    let lastY = 0;
    let width = 0;
    let height = 0;

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvasElement.clientWidth;
      height = canvasElement.clientHeight;
      canvasElement.width = width * ratio;
      canvasElement.height = height * ratio;
      drawingContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function hexToRgb(hex: string) {
      const normalized = hex.replace("#", "");
      const value = Number.parseInt(normalized.length === 3 ? normalized.split("").map((part) => part + part).join("") : normalized, 16);
      return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
    }

    function addSplash(event: PointerEvent) {
      const bounds = canvasElement.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) return;
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const distance = Math.hypot(x - lastX, y - lastY);
      if (distance < 8 && splashes.length) return;
      const force = Math.min(18, SPLAT_FORCE / 900);
      splashes.push({ x, y, size: Math.max(18, Math.min(120, SPLAT_RADIUS * Math.max(width, height) * 0.45)), life: 1, speedX: (x - lastX) * force * 0.018, speedY: (y - lastY) * force * 0.018 });
      lastX = x;
      lastY = y;
    }

    function draw() {
      drawingContext.clearRect(0, 0, width, height);
      const baseColor = hexToRgb(COLOR);
      for (let index = splashes.length - 1; index >= 0; index -= 1) {
        const splash = splashes[index];
        splash.x += splash.speedX;
        splash.y += splash.speedY;
        splash.speedX *= Math.max(0.82, 1 - VELOCITY_DISSIPATION * 0.01);
        splash.speedY *= Math.max(0.82, 1 - VELOCITY_DISSIPATION * 0.01);
        splash.life -= 0.012 * Math.max(0.5, DENSITY_DISSIPATION / 3.5);
        if (splash.life <= 0) { splashes.splice(index, 1); continue; }
        const hue = RAINBOW_MODE ? (performance.now() / COLOR_UPDATE_SPEED + index * 50) % 360 : null;
        const color = hue === null ? `${baseColor.r}, ${baseColor.g}, ${baseColor.b}` : `hsl(${hue} 85% 65%)`;
        const gradient = drawingContext.createRadialGradient(splash.x, splash.y, 0, splash.x, splash.y, splash.size);
        gradient.addColorStop(0, `rgba(${color}, ${0.32 * splash.life})`);
        gradient.addColorStop(0.45, `rgba(${color}, ${0.15 * splash.life})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        drawingContext.fillStyle = gradient;
        drawingContext.beginPath();
        drawingContext.arc(splash.x, splash.y, splash.size * (1 - splash.life * 0.15), 0, Math.PI * 2);
        drawingContext.fill();
      }
      animationFrame = window.requestAnimationFrame(draw);
    }

    resize();
    if (!reducedMotion) {
      window.addEventListener("pointermove", addSplash, { passive: true });
      animationFrame = window.requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize);
    return () => { window.cancelAnimationFrame(animationFrame); window.removeEventListener("pointermove", addSplash); window.removeEventListener("resize", resize); };
  }, [COLOR, COLOR_UPDATE_SPEED, CURL, DENSITY_DISSIPATION, PRESSURE, RAINBOW_MODE, SHADING, SPLAT_FORCE, SPLAT_RADIUS, VELOCITY_DISSIPATION]);

  return <canvas ref={canvasRef} className="splash-cursor" aria-hidden="true" />;
}
