import { Box, Code2, Layers3, Sparkles } from "lucide-react";

const services = [
  { number: "01", title: "UI/UX Design", description: "Interfaces with clarity, character, and just enough friction to make every interaction matter.", icon: Layers3 },
  { number: "02", title: "Web Development", description: "Fast, flexible digital homes engineered to perform beautifully across every screen.", icon: Code2 },
  { number: "03", title: "Branding", description: "Distinctive visual systems that give ambitious ideas a signal people can recognize.", icon: Sparkles },
  { number: "04", title: "3D Motion Design", description: "Dimensional worlds, motion identities, and moments that make digital feel physical.", icon: Box },
];

export default function Services() {
  return (
    <section id="services" className="border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-glow">Capabilities / 01—04</p>
            <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.06em] text-white sm:text-6xl">Make the <span className="inline-block bg-glow px-2 text-void">next thing</span> impossible to ignore.</h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-soft">We connect strategy, design, and technology into work with a pulse.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map(({ number, title, description, icon: Icon }) => (
            <article key={title} className="service-card min-h-[280px] border border-white/10 bg-panel/70 p-7 sm:p-9">
              <div className="flex items-start justify-between">
                <Icon size={28} strokeWidth={1.5} className="text-glow" />
                <span className="font-mono text-xs text-soft">{number}</span>
              </div>
              <div className="mt-20">
                <h3 className="text-2xl font-medium tracking-tight text-white">{title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-soft">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
