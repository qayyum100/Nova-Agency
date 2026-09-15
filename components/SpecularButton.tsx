"use client";

import { ReactNode, useState } from "react";

type SpecularButtonProps = { children: ReactNode; size?: "sm" | "lg"; radius?: number; tint?: string; tintOpacity?: number; blur?: number; textColor?: string; lineColor?: string; baseColor?: string; intensity?: number; shineSize?: number; shineFade?: number; thickness?: number; speed?: number; followMouse?: boolean; proximity?: number; autoAnimate?: boolean; onClick?: () => void };

export default function SpecularButton({ children, size = "lg", radius = 18, textColor = "#f5f5f5", lineColor = "#ffffff", baseColor = "#525252", followMouse = true, onClick }: SpecularButtonProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  return <button type="button" onClick={onClick} onPointerMove={(event) => { if (!followMouse) return; const rect = event.currentTarget.getBoundingClientRect(); setPosition({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 }); }} className={`specular-button specular-button-${size}`} style={{ borderRadius: radius, color: textColor, borderColor: lineColor, background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(255,255,255,.28), transparent 30%), ${baseColor}` }}>{children}</button>;
}
