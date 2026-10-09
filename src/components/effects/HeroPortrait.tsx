"use client";

import Image from "next/image";
import { media } from "@/content/media";
import { usePrefersReducedMotion } from "@/hooks/useMotionPrefs";
import { cn } from "@/lib/utils";

type Props = {
  parallaxY?: number;
  className?: string;
};

/**
 * Desktop landing portrait — top-weighted crop that fades into the canvas.
 */
export function HeroPortrait({ parallaxY = 0, className }: Props) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block",
        className,
      )}
    >
      {/* Soft atmosphere behind the cutout */}
      <div
        className="pointer-events-none absolute inset-[12%_8%_0] rounded-full bg-[radial-gradient(circle_at_50%_35%,rgba(143,168,146,0.35),rgba(44,74,62,0.12)_55%,transparent_72%)] blur-2xl"
        aria-hidden
      />

      <div
        className="hero-portrait-frame absolute right-0 bottom-0 will-change-transform"
        style={{
          transform: reduced
            ? undefined
            : `translate3d(0, ${parallaxY * 0.08}px, 0)`,
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.65) 78%, rgba(0,0,0,0.2) 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 62%, rgba(0,0,0,0.65) 78%, rgba(0,0,0,0.2) 90%, transparent 100%)",
        }}
      >
        <Image
          src={media.portraitHero.src}
          alt={media.portraitHero.alt}
          fill
          preload
          quality={90}
          sizes="(min-width: 1024px) and (min-resolution: 3dppx) 270px, (min-width: 1024px) and (min-resolution: 2dppx) 405px, (min-width: 1024px) min(52vw, 810px), 270px"
          className="object-cover object-[center_18%] drop-shadow-[0_20px_40px_rgba(26,31,28,0.16)]"
        />
      </div>

      {/* Page-edge wash — same idea as mobile */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#ebe8e2] via-[#f5f4f1]/80 to-transparent"
        aria-hidden
      />
    </div>
  );
}
