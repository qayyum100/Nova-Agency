"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children, baseOpacity = 0.1, enableBlur = true, baseRotation = 3, blurStrength = 4 }: { children: ReactNode; baseOpacity?: number; enableBlur?: boolean; baseRotation?: number; blurStrength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 }); if (ref.current) observer.observe(ref.current); return () => observer.disconnect(); }, []);
  return <div ref={ref} className={`scroll-reveal ${visible ? "scroll-reveal-visible" : ""}`} style={{ opacity: visible ? 1 : baseOpacity, filter: visible || !enableBlur ? "none" : `blur(${blurStrength}px)`, transform: visible ? "none" : `translateY(24px) rotate(${baseRotation}deg)` }}>{children}</div>;
}
