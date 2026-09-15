"use client";

export default function Ribbons({ baseThickness = 30, colors = ["#5227FF"], speedMultiplier = 0.5, maxAge = 500, enableFade = false, enableShaderEffect = false }: { baseThickness?: number; colors?: string[]; speedMultiplier?: number; maxAge?: number; enableFade?: boolean; enableShaderEffect?: boolean }) {
  return <div className="ribbons" aria-hidden="true">{colors.map((color, index) => <span key={`${color}-${index}`} style={{ background: color, height: baseThickness, animationDuration: `${Math.max(3, 12 / speedMultiplier)}s`, animationDelay: `${index * -1.7}s` }} />)}</div>;
}
