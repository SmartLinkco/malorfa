"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMotionPrefs";
import { cn } from "@/lib/utils";

type Props = {
  parallaxY?: number; // px shift for mid layer
  className?: string;
};

/**
 * Muted looping dual-identity hero video.
 * Placeholder path: /media/hero-dual-identity.mp4 + poster.
 * Pauses when off-screen; never plays with sound.
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
          void video.play().catch(() => {
            /* autoplay may be blocked — poster remains */
          });
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
      {/* Background parallax layer (travel/garden hint) */}
      <div
        className="absolute inset-[-8%] bg-gradient-to-br from-sage/40 via-forest/50 to-ink/40 will-change-transform"
        style={{
          transform: reduced ? undefined : `translate3d(0, ${parallaxY * 0.35}px, 0)`,
        }}
        aria-hidden
      />

      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          transform: reduced ? undefined : `translate3d(0, ${parallaxY * 0.15}px, 0) scale(1.06)`,
        }}
        poster="/media/hero-dual-identity-poster.svg"
        muted
        loop
        playsInline
        autoPlay={!reduced}
        preload="metadata"
        aria-hidden
        tabIndex={-1}
      >
        <source src="/media/hero-dual-identity.mp4" type="video/mp4" />
      </video>

      {/* Foreground scrim for dual-identity framing + readable edge */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/15 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-ink/35 to-transparent mix-blend-multiply"
        aria-hidden
        style={{
          transform: reduced ? undefined : `translate3d(${parallaxY * -0.08}px, 0, 0)`,
        }}
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 md:p-5">
        <span className="rounded-sm bg-ivory/90 px-2.5 py-1 text-[11px] font-medium tracking-wide text-ink/70 backdrop-blur-sm">
          [PLACEHOLDER: Dual-identity hero video — boardroom ↔ greenhouse]
        </span>
      </div>
    </div>
  );
}
