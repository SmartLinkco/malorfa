"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMotionPrefs";
import { cn } from "@/lib/utils";

const DESKTOP_QUERY = "(min-width: 1024px)";

/** Fades the video into the green panel and out before it reaches the portrait's soft base. */
const edgeMask =
  "linear-gradient(to bottom, #000 30%, transparent 60%), linear-gradient(to right, transparent, #000 30%)";
const edgeFade: CSSProperties = {
  WebkitMaskImage: edgeMask,
  maskImage: edgeMask,
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

/**
 * Decorative loop behind the desktop portrait. Phones skip it entirely so they never
 * download the file, and reduced-motion visitors get the still first frame.
 */
export function HeroVideo({ className }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const shouldPlay = desktop && !reduced && !paused;

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    if (!shouldPlay) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldPlay, desktop]);

  if (!desktop) return null;

  return (
    <div ref={containerRef} className={cn("absolute inset-0", className)}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-top"
        style={edgeFade}
        poster="/media/hero-dual-identity-first-frame.jpg"
        muted
        loop
        playsInline
        preload={reduced ? "none" : "auto"}
        aria-hidden
        tabIndex={-1}
      >
        {reduced ? null : <source src="/media/hero-dual-identity.mp4" type="video/mp4" />}
      </video>
      {reduced ? null : (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Play background video" : "Pause background video"}
          aria-pressed={paused}
          className="pointer-events-auto absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-ivory transition-colors hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden>
            {paused ? (
              <path d="M4 2.5v11l9-5.5z" />
            ) : (
              <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" />
            )}
          </svg>
        </button>
      )}
    </div>
  );
}
