"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

const portfolioItemsData = [
  {
    id: 1,
    titleKey: "drone" as const,
    categoryKey: "video" as const,
    image:
      "https://vrdmrlazektrdtafgraf.supabase.co/storage/v1/object/public/media/photos/IMG_1586.jpg",
    isVideo: true,
    videoUrl:
      "https://vrdmrlazektrdtafgraf.supabase.co/storage/v1/object/public/media/videos/1728ecdec2a44e679a867b23663374b6.mp4",
  },
  {
    id: 2,
    titleKey: "fashionEditorial" as const,
    categoryKey: "modeling" as const,
    image:
      "https://media.canva.com/v2/image-resize/format:JPG/height:2400/quality:92/uri:ifs%3A%2F%2FM%2F72fa0531-2873-49d5-ad64-836ba4932807/watermark:F/width:1350?csig=AAAAAAAAAAAAAAAAAAAAANjt3gE1tjH_wRItzmnGVtgX5uQSkT59FZTgA_6mULdI&exp=1770179490&osig=AAAAAAAAAAAAAAAAAAAAAFIX_J1Exy6hAtxYEf5R5dQhJ6ifwk9QzNSQhQrFftsv&signer=media-rpc&x-canva-quality=screen_3x",
    isVideo: false,
    videoUrl: undefined,
  },
  {
    id: 3,
    titleKey: "skincareUgc" as const,
    categoryKey: "ugc" as const,
    image:
      "https://media.canva.com/v2/image-resize/format:JPG/height:1600/quality:92/uri:ifs%3A%2F%2FM%2F8579d837-fc15-4264-8d9f-887bb319a877/watermark:F/width:1200?csig=AAAAAAAAAAAAAAAAAAAAALayJ_7EjdplQOTn5U2rVB_0yWyVhGpQ2yMrxkE6WNEm&exp=1770180800&osig=AAAAAAAAAAAAAAAAAAAAAIlxQhvecXOpn_7xQNVROwEjST4ke0EzF5iKTUVoUy3L&signer=media-rpc&x-canva-quality=screen_2x",
    isVideo: true,
    videoUrl:
      "https://videos.pexels.com/video-files/5634906/5634906-uhd_2560_1440_24fps.mp4",
  },
  {
    id: 4,
    titleKey: "summerCollection" as const,
    categoryKey: "modeling" as const,
    image:
      "https://media.canva.com/v2/image-resize/format:JPG/height:1600/quality:92/uri:ifs%3A%2F%2FM%2Ffc1ab485-998d-403e-81ee-2f9fa29b1c0f/watermark:F/width:900?csig=AAAAAAAAAAAAAAAAAAAAAFb6MjZ_SYzh_XwaM0WaOrDep076VI6MsK5xikuMvo4g&exp=1770182598&osig=AAAAAAAAAAAAAAAAAAAAABlBAKt2W1IlsAYVlwfg4Oq2f-BLDQwhZm48BAmyLwW5&signer=media-rpc&x-canva-quality=screen_2x",
    isVideo: false,
    videoUrl: undefined,
  },
  {
    id: 5,
    titleKey: "productLaunch" as const,
    categoryKey: "video" as const,
    image:
      "https://media.canva.com/v2/image-resize/format:JPG/height:1600/quality:92/uri:ifs%3A%2F%2FM%2F764bae7c-ca95-4e46-94c4-8efeb3a74f13/watermark:F/width:900?csig=AAAAAAAAAAAAAAAAAAAAABuLdzEAMSDmesyNtgFjMsNvlfO93kjixFDDJCH4ZaEj&exp=1770180319&osig=AAAAAAAAAAAAAAAAAAAAAFMBWPtlDNMnuZlaIIAkxNvi-NQa4LDnSoki9oR2-GY-&signer=media-rpc&x-canva-quality=screen_2x",
    isVideo: true,
    videoUrl:
      "https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4",
  },
];

type PortfolioItemData = (typeof portfolioItemsData)[0];

/* ─── Video Portfolio Card ─── */
function VideoPortfolioItem({
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div
      className={cn(
        "group relative overflow-hidden transition-all duration-700",
        index % 3 === 0 ? "row-span-2" : "",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          index % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
        )}
      >
        {/* Video element */}
        <video
          ref={videoRef}
          src={item.videoUrl}
          poster={item.image}
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover cursor-pointer"
          onClick={togglePlay}
        />

        {/* Play/Pause overlay (shown when paused) */}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-background/50 transition-opacity duration-300 cursor-pointer"
            aria-label="Play video"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center bg-background/40 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                <Play size={28} className="ml-1 text-foreground" />
              </div>
              <div className="text-center px-4">
                <h3 className="font-serif text-lg text-foreground mb-1">
                  {title}
                </h3>
                <p className="text-xs tracking-widest uppercase text-primary">
                  {category}
                </p>
              </div>
            </div>
          </button>
        )}

        {/* Controls overlay (shown when playing) */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-3">
              {/* Pause button */}
              <button
                type="button"
                onClick={togglePlay}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-foreground/20 backdrop-blur-sm hover:bg-primary transition-colors duration-200"
                aria-label="Pause video"
              >
                <Pause size={16} className="text-foreground" />
              </button>

              {/* Progress bar */}
              <div className="flex-1 h-1 bg-foreground/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-[width] duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Mute/Unmute button */}
              <button
                type="button"
                onClick={toggleMute}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-foreground/20 backdrop-blur-sm hover:bg-primary transition-colors duration-200"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <VolumeX size={16} className="text-foreground" />
                ) : (
                  <Volume2 size={16} className="text-foreground" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Image Portfolio Card ─── */
function ImagePortfolioItem({
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
          "relative overflow-hidden",
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
        {/* Hover overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-background/80 transition-opacity duration-500 flex items-center justify-center",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="text-center p-6">
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

/* ─── Section ─── */
export function PortfolioSection() {
  const [activeCategoryKey, setActiveCategoryKey] = useState<
    "all" | "video" | "modeling" | "ugc"
  >("all");
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
      : portfolioItemsData.filter(
          (item) => item.categoryKey === activeCategoryKey
        );

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
          {filteredItems.map((item, index) =>
            item.isVideo && item.videoUrl ? (
              <VideoPortfolioItem
                key={item.id}
                item={item}
                isVisible={isVisible}
                index={index}
                title={t.portfolio.items[item.titleKey]}
                category={t.portfolio.categories[item.categoryKey]}
              />
            ) : (
              <ImagePortfolioItem
                key={item.id}
                item={item}
                isVisible={isVisible}
                index={index}
                title={t.portfolio.items[item.titleKey]}
                category={t.portfolio.categories[item.categoryKey]}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
