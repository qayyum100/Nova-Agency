"use client";

import { ArrowUpRight, Search } from "lucide-react";
import { FormEvent, useState } from "react";

type CurvedInputProps = { placeholder?: string; buttonText?: string; theme?: "dark" | "light"; bend?: number; height?: number; width?: number; showButton?: boolean; showIcon?: boolean; type?: string; cornerRadius?: number; borderWidth?: number; fontSize?: number; backgroundColor?: string; textColor?: string; borderColor?: string; buttonColor?: string; buttonTextColor?: string; shadowSize?: "sm" | "md" | "lg"; onSubmit?: (value: string) => void };

export default function CurvedInput({ placeholder = "Enter your email", buttonText = "Submit", bend = 20, height = 64, width = 450, showButton = true, showIcon = false, type = "email", cornerRadius = 18, borderWidth = 1, backgroundColor = "#10121a", textColor = "#ffffff", borderColor = "rgba(255,255,255,.2)", buttonColor = "#a9ff4f", buttonTextColor = "#08090d", shadowSize = "md", onSubmit }: CurvedInputProps) {
  const [value, setValue] = useState("");
  function submit(event: FormEvent) { event.preventDefault(); onSubmit?.(value); }
  return <form onSubmit={submit} className={`curved-input curved-input-shadow-${shadowSize}`} style={{ maxWidth: width, minHeight: height, borderRadius: cornerRadius, borderWidth, borderColor, backgroundColor, color: textColor, ['--bend' as string]: `${bend ?? 20}px` }}>
    {showIcon && <Search size={18} aria-hidden="true" />}
    <input type={type} value={value} onChange={(event) => setValue(event.target.value)} placeholder={placeholder} aria-label={placeholder} />
    {showButton && <button type="submit" style={{ background: buttonColor, color: buttonTextColor }}>{buttonText}<ArrowUpRight size={15} /></button>}
  </form>;
}
