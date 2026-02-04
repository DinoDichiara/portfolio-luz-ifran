"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";

const brands = [
  { name: "Vogue", logo: "VOGUE" },
  { name: "Elle", logo: "ELLE" },
  { name: "Dior", logo: "DIOR" },
  { name: "Chanel", logo: "CHANEL" },
  { name: "Gucci", logo: "GUCCI" },
  { name: "Prada", logo: "PRADA" },
  { name: "Estee Lauder", logo: "ESTEE LAUDER" },
  { name: "MAC", logo: "M·A·C" },
];

export function BrandsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collaborations"
      className="py-32 px-6 lg:px-8 bg-card overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
            {t.brands.subtitle}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
            {t.brands.title}
          </h2>
        </div>

        {/* Brand Logos - Infinite Scroll */}
        <div className="relative">
          <div className="flex items-center gap-16 animate-marquee">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className={`flex-shrink-0 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${(index % brands.length) * 100}ms` }}
              >
                <span className="font-serif text-2xl md:text-3xl tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300 cursor-default whitespace-nowrap">
                  {brand.logo}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div
          className={`mt-24 text-center max-w-3xl mx-auto transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <blockquote className="font-serif text-2xl md:text-3xl text-foreground italic leading-relaxed mb-8">
            &ldquo;{t.brands.testimonial}&rdquo;
          </blockquote>
          <p className="text-sm tracking-widest uppercase text-muted-foreground">
            — {t.brands.testimonialAuthor}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
