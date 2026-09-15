import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="#top" className="font-mono text-base font-medium tracking-[0.24em] text-white transition-colors hover:text-glow">NOVA AGENCY</Link>
        <nav className="hidden items-center gap-8 text-sm text-soft md:flex">
          {links.map((link) => <a key={link.href} href={link.href} className="transition-colors hover:text-glow">{link.label}</a>)}
        </nav>
        <a href="#contact" className="group flex items-center gap-2 text-sm text-white transition-colors hover:text-glow">Start a project <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
      </div>
    </header>
  );
}
