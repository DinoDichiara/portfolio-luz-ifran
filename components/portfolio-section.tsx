"use client";

import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

const portfolioItemsData = [
  {
    id: 1,
    titleKey: "Retrato" as const,
    categoryKey: "video" as const,
    image:
      "https://media.canva.com/v2/image-resize/format:JPG/height:1600/quality:92/uri:ifs%3A%2F%2FM%2F50d3539a-b7fc-41ea-95a4-56908c6c0bcb/watermark:F/width:900?csig=AAAAAAAAAAAAAAAAAAAAAL33m50osmANwD06u-8S5CbmdgEQurNi8bWy3sDA2Gy0&exp=1770180962&osig=AAAAAAAAAAAAAAAAAAAAALmV1KvNeZAZ3A3UggYxRDci63qedkjAizp-jfil0p9j&signer=media-rpc&x-canva-quality=screen_2x",
    isVideo: false,
  },
  {
    id: 2,
    titleKey: "Retrato" as const,
    categoryKey: "modeling" as const,
    image:
      "https://media.canva.com/v2/image-resize/format:JPG/height:2400/quality:92/uri:ifs%3A%2F%2FM%2F72fa0531-2873-49d5-ad64-836ba4932807/watermark:F/width:1350?csig=AAAAAAAAAAAAAAAAAAAAANjt3gE1tjH_wRItzmnGVtgX5uQSkT59FZTgA_6mULdI&exp=1770179490&osig=AAAAAAAAAAAAAAAAAAAAAFIX_J1Exy6hAtxYEf5R5dQhJ6ifwk9QzNSQhQrFftsv&signer=media-rpc&x-canva-quality=screen_3x",
    isVideo: false,
  },
  {
    id: 3,
    titleKey: "skincareUgc" as const,
    categoryKey: "modeling" as const,
    image:
      "https://media.canva.com/v2/image-resize/format:JPG/height:1600/quality:92/uri:ifs%3A%2F%2FM%2F8579d837-fc15-4264-8d9f-887bb319a877/watermark:F/width:1200?csig=AAAAAAAAAAAAAAAAAAAAALayJ_7EjdplQOTn5U2rVB_0yWyVhGpQ2yMrxkE6WNEm&exp=1770180800&osig=AAAAAAAAAAAAAAAAAAAAAIlxQhvecXOpn_7xQNVROwEjST4ke0EzF5iKTUVoUy3L&signer=media-rpc&x-canva-quality=screen_2x",
    isVideo: false,
  },
  {
    id: 4,
    titleKey: "summerCollection" as const,
    categoryKey: "modeling" as const,
    image:
      "https://media.canva.com/v2/image-resize/format:JPG/height:1600/quality:92/uri:ifs%3A%2F%2FM%2Ffc1ab485-998d-403e-81ee-2f9fa29b1c0f/watermark:F/width:900?csig=AAAAAAAAAAAAAAAAAAAAAFb6MjZ_SYzh_XwaM0WaOrDep076VI6MsK5xikuMvo4g&exp=1770182598&osig=AAAAAAAAAAAAAAAAAAAAABlBAKt2W1IlsAYVlwfg4Oq2f-BLDQwhZm48BAmyLwW5&signer=media-rpc&x-canva-quality=screen_2x",
    isVideo: false,
  },
  {
    id: 5,
    titleKey: "productLaunch" as const,
    categoryKey: "modeling" as const,
    image:
      "https://media.canva.com/v2/image-resize/format:JPG/height:1600/quality:92/uri:ifs%3A%2F%2FM%2F764bae7c-ca95-4e46-94c4-8efeb3a74f13/watermark:F/width:900?csig=AAAAAAAAAAAAAAAAAAAAABuLdzEAMSDmesyNtgFjMsNvlfO93kjixFDDJCH4ZaEj&exp=1770180319&osig=AAAAAAAAAAAAAAAAAAAAAFMBWPtlDNMnuZlaIIAkxNvi-NQa4LDnSoki9oR2-GY-&signer=media-rpc&x-canva-quality=screen_2x",
    isVideo: false,
  },
  {
    id: 6,
    titleKey: "lifestyleContent" as const,
    categoryKey: "ugc" as const,
    image:
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=800&auto=format&fit=crop",
    isVideo: false,
  },
  {
    id: 7,
    titleKey: "beautyCampaign" as const,
    categoryKey: "modeling" as const,
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop",
    isVideo: false,
  },
  {
    id: 8,
    titleKey: "travelVlog" as const,
    categoryKey: "video" as const,
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=800&auto=format&fit=crop",
    isVideo: true,
  },
];

type PortfolioItemData = (typeof portfolioItemsData)[0];

function PortfolioItem({
  item,
  isVisible,
  index,
  title,
  category,
}: {
  item: PortfolioItemData;
  isVisible: boolean;
  index: number;
  title: string;
  category: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group relative overflow-hidden cursor-pointer transition-all duration-700",
        index % 3 === 0 ? "row-span-2" : "",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "aspect-square relative overflow-hidden",
          index % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
        )}
      >
        <img
          src={item.image || "/placeholder.svg"}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        {/* Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-background/80 transition-opacity duration-500 flex items-center justify-center",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="text-center p-6">
            {item.isVideo && (
              <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center mx-auto mb-4 hover:bg-primary hover:text-primary-foreground transition-colors">
                <Play size={24} className="ml-1" />
              </div>
            )}
            <h3 className="font-serif text-xl text-foreground mb-2">
              {title}
            </h3>
            <p className="text-xs tracking-widest uppercase text-primary">
              {category}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const [activeCategoryKey, setActiveCategoryKey] = useState<"all" | "video" | "modeling" | "ugc">("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  const categoryKeys = ["all", "video", "modeling", "ugc"] as const;

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

  const filteredItems =
    activeCategoryKey === "all"
      ? portfolioItemsData
      : portfolioItemsData.filter((item) => item.categoryKey === activeCategoryKey);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-32 px-6 lg:px-8 bg-card"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary tracking-[0.3em] uppercase text-sm mb-4">
            {t.portfolio.subtitle}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground text-balance">
            {t.portfolio.title}
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categoryKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveCategoryKey(key)}
              className={cn(
                "px-6 py-2 text-sm tracking-widest uppercase transition-all duration-300 border",
                activeCategoryKey === key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
              )}
            >
              {t.portfolio.categories[key]}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item, index) => (
            <PortfolioItem
              key={item.id}
              item={item}
              isVisible={isVisible}
              index={index}
              title={t.portfolio.items[item.titleKey]}
              category={t.portfolio.categories[item.categoryKey]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
