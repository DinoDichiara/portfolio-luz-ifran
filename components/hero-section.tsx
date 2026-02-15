"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://vrdmrlazektrdtafgraf.supabase.co/storage/v1/object/public/media/photos/50146B5B-8A7E-4AFB-B873-7232BA3B8694.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center px-6 transition-all duration-1000 delay-300 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="text-primary tracking-[0.3em] uppercase text-sm mb-6 font-sans">
          {t.hero.welcome}
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 tracking-tight text-balance">
          Maria Luz Ifran
        </h1>
        <div className="flex items-center justify-center gap-4 text-muted-foreground tracking-widest uppercase text-xs md:text-sm mb-12">
          <span>{t.hero.contentCreator}</span>
          <span className="w-1 h-1 rounded-full bg-primary" />
          <span>{t.hero.model}</span>
          <span className="w-1 h-1 rounded-full bg-primary" />
          <span>{t.hero.ugcSpecialist}</span>
        </div>
        <a
          href="#about"
          className="inline-flex items-center gap-2 px-8 py-4 border border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-500 tracking-widest uppercase text-sm"
        >
          {t.hero.discoverMore}
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs tracking-widest uppercase">{t.hero.scroll}</span>
          <ChevronDown
            size={20}
            className="animate-bounce group-hover:text-primary"
          />
        </a>
      </div>
    </section>
  );
}
