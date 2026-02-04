"use client";

import { LanguageProvider } from "@/lib/language-context";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { ServicesSection } from "@/components/services-section";
import { BrandsSection } from "@/components/brands-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <PortfolioSection />
        <ServicesSection />
        <BrandsSection />
        <ContactSection />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
