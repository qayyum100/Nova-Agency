"use client";

import { useEffect, useState } from "react";

type Props = { text: string; speed?: number; maxIterations?: number; characters?: string; className?: string; parentClassName?: string; encryptedClassName?: string; animateOn?: "hover" | "view"; clickMode?: "once" | "toggle"; revealDirection?: "start" | "end"; sequential?: boolean; useOriginalCharsOnly?: boolean };

export default function DecryptedText({ text, speed = 45, maxIterations = 8, characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?", className = "", parentClassName = "", encryptedClassName = "", animateOn = "view", clickMode = "once", revealDirection = "start", sequential = true }: Props) {
  const [display, setDisplay] = useState(animateOn === "view" ? text : text.replace(/[^\s]/g, "_"));
  const [active, setActive] = useState(animateOn === "view");
  const [toggled, setToggled] = useState(false);
  useEffect(() => { if (!active) return; let iteration = 0; const timer = window.setInterval(() => { iteration += 1; const next = text.split("").map((character, index) => { if (character === " ") return character; const order = revealDirection === "start" ? index : text.length - index; if (sequential && order > iteration) return characters[Math.floor(Math.random() * characters.length)]; if (iteration >= maxIterations + order) return character; return characters[Math.floor(Math.random() * characters.length)]; }).join(""); setDisplay(next); if (iteration > maxIterations + text.length) { window.clearInterval(timer); setDisplay(text); } }, speed); return () => window.clearInterval(timer); }, [active, characters, maxIterations, revealDirection, sequential, speed, text]);
  function trigger() { if (clickMode === "toggle" && toggled) { setDisplay(text.replace(/[^\s]/g, "_")); setToggled(false); return; } setToggled(true); setActive(true); }
  return <span className={`${parentClassName} ${animateOn === "hover" ? "decrypted-hover" : ""}`} onMouseEnter={() => animateOn === "hover" && trigger()} onClick={trigger} role={animateOn === "hover" || clickMode === "toggle" ? "button" : undefined} tabIndex={animateOn === "hover" || clickMode === "toggle" ? 0 : undefined}><span className={`${className} ${display === text ? "" : encryptedClassName}`}>{display}</span></span>;
}
