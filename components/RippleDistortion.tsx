"use client";

import { ReactNode, useRef, useState } from "react";

type RippleDistortionProps = { children: ReactNode; image?: string; strength?: number; duration?: number; className?: string };

export default function RippleDistortion({ children, image, strength = 12, duration = 700, className = "" }: RippleDistortionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  function move(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setOrigin({ x: ((event.clientX - bounds.left) / bounds.width) * 100, y: ((event.clientY - bounds.top) / bounds.height) * 100 });
  }
  return <div ref={ref} className={`ripple-distortion ${className}`} onPointerMove={move} style={{ backgroundImage: image ? `url(${image})` : undefined, ['--ripple-x' as string]: `${origin.x}%`, ['--ripple-y' as string]: `${origin.y}%`, ['--ripple-strength' as string]: `${strength}px`, ['--ripple-duration' as string]: `${duration}ms` }}>{children}</div>;
}
