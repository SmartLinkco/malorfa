"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { media } from "@/content/media";
import { usePrefersReducedMotion } from "@/hooks/useMotionPrefs";
import { cn } from "@/lib/utils";

type Props = {
  parallaxY?: number;
  className?: string;
};

/**
 * Home hero visual — Barcelona portrait (unique to home).
 * Soft muted video wash remains decorative only.
 */
export function HeroVideo({ parallaxY = 0, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    if (reduced) {
      video.pause();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.2, 0.5] },
    );

    io.observe(container);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[3/4] w-full max-h-[70vh] overflow-hidden rounded-md shadow-[0_24px_60px_rgba(26,31,28,0.18)] lg:ml-auto lg:max-w-md",
        className,
      )}
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: reduced
            ? undefined
            : `translate3d(0, ${parallaxY * 0.12}px, 0) scale(1.04)`,
        }}
      >
        <Image
          src={media.portraitBarcelona.src}
          alt={media.portraitBarcelona.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 480px"
          className="object-cover"
          style={{ objectPosition: "center 18%" }}
          priority
        />
      </div>

      {!reduced ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.14] mix-blend-soft-light"
          poster={media.heroDualPoster.src}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden
          tabIndex={-1}
        >
          <source src="/media/hero-dual-identity.mp4" type="video/mp4" />
        </video>
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-ink/10"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <span className="rounded-sm bg-ivory/90 px-2.5 py-1 text-[11px] font-medium tracking-wide text-ink/70 backdrop-blur-sm">
          Solo roads · clear sky
        </span>
      </div>
    </div>
  );
}
