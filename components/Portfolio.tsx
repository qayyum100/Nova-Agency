import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const projects = [
  { title: "Neo-SaaS Platform", category: "Product / 2024", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1600&q=85" },
  { title: "Crypto Wallet UX", category: "Experience / 2024", image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1600&q=85" },
  { title: "Luxury E-Commerce", category: "Brand + Web / 2023", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=85" },
  { title: "Future / Form", category: "Identity / 2023", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1600&q=85" },
];

export default function Portfolio() {
  return (
    <section id="work" className="border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-glow">Selected work / 04</p>
            <h2 className="text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">Proof of concept.</h2>
          </div>
          <span className="hidden font-mono text-xs text-soft sm:block">Scroll / Explore</span>
        </div>
        <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2">
          {projects.map((project, index) => (
            <article key={project.title} className={`project-card group ${index % 2 === 1 ? "sm:mt-20" : ""}`}>
              <a href="#contact" className="relative block overflow-hidden border border-white/10 bg-panel" aria-label={`View ${project.title} case study`}>
                <Image src={project.image} alt={`${project.title} project thumbnail`} width={1600} height={1100} className="aspect-[1.35] object-cover" />
                <div className="project-overlay absolute inset-0 flex items-end justify-between bg-gradient-to-t from-void/90 via-void/20 to-transparent p-6">
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-glow">View case study</span>
                  <ArrowUpRight className="text-white" />
                </div>
              </a>
              <div className="mt-5 flex items-start justify-between gap-4">
                <h3 className="text-xl font-medium text-white">{project.title}</h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-soft">{project.category}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
