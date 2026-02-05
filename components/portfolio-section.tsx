"use client";

import { useState, useRef, useEffect } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import useSWR from "swr";

// Hardcoded fallback data (used when Supabase has no items yet)
const fallbackItems = [
  {
    id: 1,
    title: "Retrato",
    category: "video",
    media_url:
      "https://media.canva.com/v2/image-resize/format:JPG/height:1600/quality:92/uri:ifs%3A%2F%2FM%2F50d3539a-b7fc-41ea-95a4-56908c6c0bcb/watermark:F/width:900?csig=AAAAAAAAAAAAAAAAAAAAAL33m50osmANwD06u-8S5CbmdgEQurNi8bWy3sDA2Gy0&exp=1770180962&osig=AAAAAAAAAAAAAAAAAAAAALmV1KvNeZAZ3A3UggYxRDci63qedkjAizp-jfil0p9j&signer=media-rpc&x-canva-quality=screen_2x",
    is_video: false,
    sort_order: 0,
  },
  {
    id: 2,
    title: "Retrato",
    category: "modeling",
    media_url:
      "https://media.canva.com/v2/image-resize/format:JPG/height:2400/quality:92/uri:ifs%3A%2F%2FM%2F72fa0531-2873-49d5-ad64-836ba4932807/watermark:F/width:1350?csig=AAAAAAAAAAAAAAAAAAAAANjt3gE1tjH_wRItzmnGVtgX5uQSkT59FZTgA_6mULdI&exp=1770179490&osig=AAAAAAAAAAAAAAAAAAAAAFIX_J1Exy6hAtxYEf5R5dQhJ6ifwk9QzNSQhQrFftsv&signer=media-rpc&x-canva-quality=screen_3x",
    is_video: false,
    sort_order: 1,
  },
  {
    id: 3,
    title: "Skincare Brand UGC",
    category: "modeling",
    media_url:
      "https://media.canva.com/v2/image-resize/format:JPG/height:1600/quality:92/uri:ifs%3A%2F%2FM%2F8579d837-fc15-4264-8d9f-887bb319a877/watermark:F/width:1200?csig=AAAAAAAAAAAAAAAAAAAAALayJ_7EjdplQOTn5U2rVB_0yWyVhGpQ2yMrxkE6WNEm&exp=1770180800&osig=AAAAAAAAAAAAAAAAAAAAAIlxQhvecXOpn_7xQNVROwEjST4ke0EzF5iKTUVoUy3L&signer=media-rpc&x-canva-quality=screen_2x",
    is_video: false,
    sort_order: 2,
  },
  {
    id: 4,
    title: "Summer Collection",
    category: "modeling",
    media_url:
      "https://media.canva.com/v2/image-resize/format:JPG/height:1600/quality:92/uri:ifs%3A%2F%2FM%2Ffc1ab485-998d-403e-81ee-2f9fa29b1c0f/watermark:F/width:900?csig=AAAAAAAAAAAAAAAAAAAAAFb6MjZ_SYzh_XwaM0WaOrDep076VI6MsK5xikuMvo4g&exp=1770182598&osig=AAAAAAAAAAAAAAAAAAAAABlBAKt2W1IlsAYVlwfg4Oq2f-BLDQwhZm48BAmyLwW5&signer=media-rpc&x-canva-quality=screen_2x",
    is_video: false,
    sort_order: 3,
  },
  {
    id: 5,
    title: "Product Launch Reel",
    category: "modeling",
    media_url:
      "https://media.canva.com/v2/image-resize/format:JPG/height:1600/quality:92/uri:ifs%3A%2F%2FM%2F764bae7c-ca95-4e46-94c4-8efeb3a74f13/watermark:F/width:900?csig=AAAAAAAAAAAAAAAAAAAAABuLdzEAMSDmesyNtgFjMsNvlfO93kjixFDDJCH4ZaEj&exp=1770180319&osig=AAAAAAAAAAAAAAAAAAAAAFMBWPtlDNMnuZlaIIAkxNvi-NQa4LDnSoki9oR2-GY-&signer=media-rpc&x-canva-quality=screen_2x",
    is_video: false,
    sort_order: 4,
  },
  {
    id: 6,
    title: "Lifestyle Content",
    category: "ugc",
    media_url:
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=800&auto=format&fit=crop",
    is_video: false,
    sort_order: 5,
  },
  {
    id: 7,
    title: "Beauty Campaign",
    category: "modeling",
    media_url:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop",
    is_video: false,
    sort_order: 6,
  },
  {
    id: 8,
    title: "Travel Vlog Series",
    category: "video",
    media_url:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=800&auto=format&fit=crop",
    is_video: true,
    sort_order: 7,
  },
];

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  media_url: string;
  is_video: boolean;
  sort_order: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function PortfolioCard({
  item,
  isVisible,
  index,
}: {
  item: PortfolioItem;
  isVisible: boolean;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage();

  const categoryLabel =
    item.category in t.portfolio.categories
      ? t.portfolio.categories[item.category as keyof typeof t.portfolio.categories]
      : item.category;

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
          src={item.media_url || "/placeholder.svg"}
          alt={item.title}
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
            {item.is_video && (
              <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center mx-auto mb-4 hover:bg-primary hover:text-primary-foreground transition-colors">
                <Play size={24} className="ml-1" />
              </div>
            )}
            <h3 className="font-serif text-xl text-foreground mb-2">
              {item.title}
            </h3>
            <p className="text-xs tracking-widest uppercase text-primary">
              {categoryLabel}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  const { data } = useSWR<{ items: PortfolioItem[] }>("/api/portfolio", fetcher);

  // Use Supabase data if available, otherwise fall back to hardcoded items
  const portfolioItems =
    data?.items && data.items.length > 0 ? data.items : fallbackItems;

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
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategoryKey);

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
            <PortfolioCard
              key={item.id}
              item={item}
              isVisible={isVisible}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
