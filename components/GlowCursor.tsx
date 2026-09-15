"use client";

import { ReactNode, useState } from "react";

type GlowCursorProps = { children: ReactNode; color?: string; secondaryColor?: string; trailLength?: number; trailWidth?: number; trailTaper?: number; followSpeed?: number; glowIntensity?: number; glowSpread?: number; hotspot?: number; brightness?: number; opacity?: number; pulseSpeed?: number; noiseStrength?: number; idleFade?: boolean; idleTimeout?: number; fadeDuration?: number; blendMode?: string };

export default function GlowCursor({ children, color = "#67E8F9", secondaryColor = "#A78BFA", opacity = 1, blendMode = "screen" }: GlowCursorProps) {
  const [point, setPoint] = useState({ x: 50, y: 50 });
  return <div className="glow-cursor" onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setPoint({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 }); }} style={{ ['--cursor-x' as string]: `${point.x}%`, ['--cursor-y' as string]: `${point.y}%`, ['--cursor-color' as string]: color, ['--cursor-secondary' as string]: secondaryColor, opacity, mixBlendMode: blendMode as React.CSSProperties['mixBlendMode'] }}><span className="glow-cursor-halo" aria-hidden="true" />{children}</div>;
}
