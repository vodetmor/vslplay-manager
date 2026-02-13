import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { LogoTicker } from "@/components/sections/logo-ticker";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { Features } from "@/components/sections/features";
import { PricingTable } from "@/components/sections/pricing-table";
import { Testimonials } from "@/components/sections/testimonials";
import { Responsive } from "@/components/sections/responsive";
import { About } from "@/components/sections/about";
import { Guarantee } from "@/components/sections/guarantee";
import { FAQ } from "@/components/sections/faq";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <LogoTicker />
      <ComparisonTable />
      <Features />
      <Testimonials />
      <Responsive />
      <About />
      <PricingTable />
      <Guarantee />
      <FAQ />
      <Footer />
    </main>
  );
}
