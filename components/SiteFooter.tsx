import { ArrowUpRight } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-xs text-soft sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="font-mono">© {new Date().getFullYear()} Nova Agency. All signals reserved.</p>
        <a href="#top" className="group flex items-center gap-2 transition-colors hover:text-glow">Back to top <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
      </div>
    </footer>
  );
}
