"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 36,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 36,
    });
  }

  return (
    <section id="top" onPointerMove={handlePointerMove} className="relative isolate min-h-[720px] overflow-hidden border-b border-white/10">
      <div className="hero-grid absolute inset-0 -z-20" />
      <div className="absolute -right-20 top-28 -z-10 h-[420px] w-[420px] rounded-full bg-haze/20 blur-[110px]" />
      <div className="hero-orb absolute right-[7%] top-[18%] -z-10 h-[300px] w-[300px] rounded-full opacity-90 shadow-[0_0_100px_rgba(169,255,79,0.25)] sm:h-[430px] sm:w-[430px]" style={{ "--mouse-x": mouse.x, "--mouse-y": mouse.y } as React.CSSProperties} />
      <div className="powered-by absolute left-1/2 top-[18%] z-10 w-[min(58vw,370px)] -translate-x-1/2 sm:top-[19%] lg:left-auto lg:right-[4%] lg:top-[31%] lg:w-[min(30vw,500px)] lg:translate-x-0">
        <div className="powered-by-label">Powered by</div>
        <div className="powered-by-card" style={{ transform: `rotateX(${mouse.y * -0.18}deg) rotateY(${mouse.x * 0.18}deg)` }}>
          <span className="powered-by-word" aria-label="WEBOIN">WEBOIN</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col justify-end px-6 pb-16 pt-[350px] lg:min-h-[720px] lg:px-10 lg:pb-24 lg:pt-40">
        <div className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-soft"><span className="h-px w-10 bg-glow" /> Independent digital agency / 2024—∞</div>
        <h1 className="max-w-5xl text-[18vw] font-semibold uppercase leading-[0.78] tracking-[-0.09em] text-white sm:text-[13vw] lg:text-[10.2rem]">We shape<br /><span className="text-glow">the digital</span><br />frontier<span className="text-haze">.</span></h1>
        <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-sm text-base leading-relaxed text-soft">Nova Agency builds distinctive identities, products, and experiences for the companies moving culture forward.</p>
          <a href="#work" className="group inline-flex w-fit items-center gap-3 rounded-full bg-glow px-6 py-4 text-sm font-semibold text-void transition-transform hover:scale-105">Explore Our Work <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a>
        </div>
        <a href="#services" className="mt-20 flex w-fit items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-soft transition-colors hover:text-glow">Scroll to discover <ArrowDownRight size={16} /></a>
      </div>
    </section>
  );
}
