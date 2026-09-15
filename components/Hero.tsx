"use client";

import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ColorBends } from "./ColorBends";
import DecryptedText from "./DecryptedText";
import GlowCursor from "./GlowCursor";
import Ribbons from "./Ribbons";
import SpecularButton from "./SpecularButton";
import SplashCursor from "./SplashCursor";

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
    <GlowCursor color="#67E8F9" secondaryColor="#A78BFA" trailLength={40} trailWidth={8} trailTaper={0.8} followSpeed={0.16} glowIntensity={1.9} glowSpread={1.2} hotspot={0.65} brightness={1.25} opacity={1} pulseSpeed={1.1} noiseStrength={0.035} idleFade idleTimeout={700} fadeDuration={900} blendMode="screen">
    <section id="top" onPointerMove={handlePointerMove} className="relative isolate min-h-[720px] overflow-hidden border-b border-white/10">
      <SplashCursor DENSITY_DISSIPATION={3.5} VELOCITY_DISSIPATION={2} PRESSURE={0.1} CURL={3} SPLAT_RADIUS={0.2} SPLAT_FORCE={6000} COLOR_UPDATE_SPEED={10} SHADING RAINBOW_MODE={false} COLOR="#A855F7" />
      <div className="hero-bends absolute inset-0 -z-20">
        <ColorBends
          color="#00ff56"
          speed={0.1}
          frequency={1.2}
          noise={0.06}
          bandWidth={0.4}
          rotation={45}
          fadeTop={0.95}
          iterations={2}
          intensity={1.1}
        />
      </div>
      <div className="hero-grid absolute inset-0 -z-10" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-24 opacity-40"><Ribbons baseThickness={12} colors={["#5227FF", "#00ff56"]} speedMultiplier={0.5} maxAge={500} enableFade={false} enableShaderEffect={false} /></div>
      <div className="absolute -right-20 top-28 -z-10 h-[420px] w-[420px] rounded-full bg-haze/20 blur-[110px]" />
      <div className="powered-by absolute left-1/2 top-[18%] z-10 w-[min(58vw,370px)] -translate-x-1/2 sm:top-[19%] lg:left-auto lg:right-[4%] lg:top-[31%] lg:w-[min(30vw,500px)] lg:translate-x-0">
        <div className="powered-by-label">Powered by</div>
        <div className="powered-by-card" style={{ transform: `rotateX(${mouse.y * -0.18}deg) rotateY(${mouse.x * 0.18}deg)` }}>
          <Image src="/WEBOIN-BANNER-2-ai-1.png.webp" alt="WEBON" width={1792} height={448} priority className="powered-by-logo" />
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col justify-end px-6 pb-16 pt-[350px] lg:min-h-[720px] lg:px-10 lg:pb-24 lg:pt-40">
        <div className="mb-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-soft"><span className="h-px w-10 bg-glow" /> Independent digital agency / 2024—∞</div>
        <h1 className="max-w-5xl text-[18vw] font-semibold uppercase leading-[0.78] tracking-[-0.09em] text-white sm:text-[13vw] lg:text-[10.2rem]"><DecryptedText text="WE SHAPE" animateOn="view" /><br /><span className="text-glow"><DecryptedText text="THE DIGITAL" animateOn="view" /></span><br /><DecryptedText text="FRONTIER" animateOn="view" /><span className="text-haze">.</span></h1>
        <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-sm text-base leading-relaxed text-soft">Nova Agency builds distinctive identities, products, and experiences for the companies moving culture forward.</p>
          <SpecularButton size="lg" radius={999} tint="#ffffff" tintOpacity={0} blur={0} textColor="#08090d" lineColor="#a9ff4f" baseColor="#a9ff4f" intensity={1} shineSize={10} shineFade={40} thickness={1} speed={0.35} followMouse proximity={250} autoAnimate={false} onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}>Explore Our Work</SpecularButton>
        </div>
        <a href="#services" className="mt-20 flex w-fit items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-soft transition-colors hover:text-glow">Scroll to discover <ArrowDownRight size={16} /></a>
      </div>
    </section>
    </GlowCursor>
  );
}
