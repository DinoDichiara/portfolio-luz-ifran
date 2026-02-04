"use client";

import { useEffect, useRef, useState } from "react";
import { Video, Camera, Sparkles, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export function ServicesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  const services = [
    {
      icon: Video,
      title: t.services.audiovisual.title,
      description: t.services.audiovisual.description,
      features: t.services.audiovisual.features,
    },
    {
      icon: Camera,
      title: t.services.modeling.title,
      description: t.services.modeling.description,
      features: t.services.modeling.features,
    },
    {
      icon: Sparkles,
      title: t.services.ugc.title,
      description: t.services.ugc.description,
      features: t.services.ugc.features,
    },
    {
      icon: Share2,
      title: t.services.social.title,
      description: t.services.social.description,
      features: t.services.social.features,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-32 px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
            {t.services.subtitle}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6 text-balance">
            {t.services.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.services.description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={cn(
                "group p-8 md:p-10 border border-border bg-card hover:border-primary/50 transition-all duration-500",
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 flex items-center justify-center border border-primary/30 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <service.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="text-xs tracking-wider uppercase px-3 py-1 bg-secondary text-secondary-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
