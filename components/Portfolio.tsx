import AccordionGallery from "./AccordionGallery";
import ScrollReveal from "./ScrollReveal";

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
            <ScrollReveal><h2 className="text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">Proof of concept.</h2></ScrollReveal>
          </div>
          <span className="hidden font-mono text-xs text-soft sm:block">Scroll / Explore</span>
        </div>
        <AccordionGallery items={projects.map((project) => ({ image: project.image, label: project.title, link: "#contact" }))} defaultIndex={1} expandRatio={0.52} trigger="hover" accentColor="#a9ff4f" overlayColor="#08090d" textColor="#fff" grayscale={false} showLabels height={460} gap={10} radius={16} />
      </div>
    </section>
  );
}
