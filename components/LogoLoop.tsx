"use client";

type Logo = { node: string; title: string };
type LogoLoopProps = { logos: Logo[]; speed?: number; logoHeight?: number; gap?: number; hoverSpeed?: number; scaleOnHover?: boolean; fadeOut?: boolean; ariaLabel?: string };

export default function LogoLoop({ logos, speed = 40, logoHeight = 28, gap = 56, hoverSpeed = 0, scaleOnHover = true, fadeOut = true, ariaLabel = "Capabilities" }: LogoLoopProps) {
  return <div className={`logo-loop ${fadeOut ? "logo-loop-fade" : ""}`} aria-label={ariaLabel} style={{ ['--logo-speed' as string]: `${speed}s`, ['--logo-gap' as string]: `${gap}px`, ['--logo-height' as string]: `${logoHeight}px`, ['--logo-hover-speed' as string]: hoverSpeed ? `${hoverSpeed}s` : "inherit" }}><div className={`logo-loop-track ${scaleOnHover ? "logo-loop-scale" : ""}`}>{[...logos, ...logos].map((logo, index) => <span key={`${logo.title}-${index}`} className="logo-loop-item">{logo.node}</span>)}</div></div>;
}
