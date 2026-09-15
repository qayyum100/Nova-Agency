"use client";

import { useState } from "react";
type Item = { image: string; label: string; link: string };
export default function AccordionGallery({ items, defaultIndex = 0, expandRatio = 0.52, trigger = "hover", accentColor = "#fff", overlayColor = "#060010", textColor = "#fff", grayscale = false, showLabels = true, height = 460, gap = 10, radius = 16 }: { items: Item[]; defaultIndex?: number; expandRatio?: number; trigger?: "hover" | "click"; accentColor?: string; overlayColor?: string; textColor?: string; grayscale?: boolean; showLabels?: boolean; height?: number; gap?: number; radius?: number }) {
  const [active, setActive] = useState(defaultIndex);
  return <div className="accordion-gallery" style={{ height, gap }}>{items.map((item, index) => <a href={item.link} key={item.label} className={`accordion-gallery-item ${active === index ? "active" : ""}`} onMouseEnter={() => trigger === "hover" && setActive(index)} onClick={() => trigger === "click" && setActive(index)} style={{ backgroundImage: `linear-gradient(${overlayColor}33, ${overlayColor}88), url(${item.image})`, color: textColor, borderColor: active === index ? accentColor : "transparent", borderRadius: radius, filter: grayscale ? "grayscale(1)" : "none", ['--expand-ratio' as string]: expandRatio }}><span>{showLabels && item.label}</span></a>)}</div>;
}
