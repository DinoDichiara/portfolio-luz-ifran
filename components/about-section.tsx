"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  const stats = [
    { value: "150+", label: t.about.stats.collaborations },
    { value: "5M+", label: t.about.stats.reach },
    { value: "8", label: t.about.stats.experience },
  ];

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
      id="about"
      className="py-32 px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="aspect-[3/4] relative">
              <img
                src="https://media.canva.com/v2/image-resize/format:JPG/height:1600/quality:92/uri:ifs%3A%2F%2FM%2F50d3539a-b7fc-41ea-95a4-56908c6c0bcb/watermark:F/width:900?csig=AAAAAAAAAAAAAAAAAAAAAL33m50osmANwD06u-8S5CbmdgEQurNi8bWy3sDA2Gy0&exp=1770180962&osig=AAAAAAAAAAAAAAAAAAAAALmV1KvNeZAZ3A3UggYxRDci63qedkjAizp-jfil0p9j&signer=media-rpc&x-canva-quality=screen_2x"
                alt="Portrait of Maria Luz Ifrann"
                className="w-full h-full object-cover"
              />
              {/* Decorative Frame */}
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-primary/30 -z-10" />
            </div>
          </div>

          {/* Content */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
              {t.about.subtitle}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8 text-balance">
              {t.about.title}
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>{t.about.paragraph1}</p>
              <p>{t.about.paragraph2}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-border">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl md:text-4xl text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
