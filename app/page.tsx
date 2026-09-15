import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-void text-white">
      <SiteHeader />
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
      <SiteFooter />
    </main>
  );
}
