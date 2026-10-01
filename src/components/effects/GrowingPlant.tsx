"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMotionPrefs";
import { cn } from "@/lib/utils";

type Props = {
  progress: number;
  className?: string;
};

/**
 * SVG plant that unfurls with scroll progress (0–1 across the page).
 * Static full-growth fallback when prefers-reduced-motion is set.
 */
export function GrowingPlant({ progress, className }: Props) {
  const reduced = usePrefersReducedMotion();
  const gradId = useId().replace(/:/g, "");
  const p = reduced ? 1 : Math.min(1, Math.max(0, progress));

  const stem = 0.15 + p * 0.85;
  const leaf1 = Math.max(0, (p - 0.12) / 0.55);
  const leaf2 = Math.max(0, (p - 0.28) / 0.55);
  const leaf3 = Math.max(0, (p - 0.45) / 0.5);
  const leaf4 = Math.max(0, (p - 0.6) / 0.4);

  return (
    <svg
      viewBox="0 0 120 160"
      className={cn("pointer-events-none h-full w-full", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8fa892" />
          <stop offset="100%" stopColor="#2c4a3e" />
        </linearGradient>
      </defs>

      <path d="M38 128 L42 152 H78 L82 128 Z" fill="#9a8560" opacity={0.85} />
      <ellipse cx="60" cy="128" rx="24" ry="5" fill="#d9d4c8" />

      <path
        d={`M60 128 Q58 ${128 - 70 * stem} 60 ${128 - 100 * stem}`}
        fill="none"
        stroke="#2c4a3e"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - stem}
      />

      <Leaf cx={48} cy={100} rotate={-55} scale={leaf1} side="left" fill={`url(#${gradId})`} />
      <Leaf cx={74} cy={88} rotate={48} scale={leaf2} side="right" fill={`url(#${gradId})`} />
      <Leaf cx={44} cy={68} rotate={-40} scale={leaf3} side="left" fill={`url(#${gradId})`} />
      <Leaf cx={72} cy={52} rotate={35} scale={leaf4} side="right" fill={`url(#${gradId})`} />
    </svg>
  );
}

function Leaf({
  cx,
  cy,
  rotate,
  scale,
  side,
  fill,
}: {
  cx: number;
  cy: number;
  rotate: number;
  scale: number;
  side: "left" | "right";
  fill: string;
}) {
  const s = Math.min(1, Math.max(0, scale));
  const path =
    side === "left"
      ? "M0 0 C-18 -8 -28 -28 -8 -40 C4 -28 10 -12 0 0 Z"
      : "M0 0 C18 -8 28 -28 8 -40 C-4 -28 -10 -12 0 0 Z";

  return (
    <g
      transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${s})`}
      opacity={s}
    >
      <path d={path} fill={fill} />
    </g>
  );
}

/** Tracks scroll progress (0–1) through a section element (hero parallax). */
export function useSectionScrollProgress() {
  const ref = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const raw = (view * 0.35 - rect.top) / (rect.height * 0.65 + view * 0.2);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return { ref, progress };
}

/** Tracks scroll progress (0–1) from the top of the document to the bottom. */
export function usePageScrollProgress() {
  const [progress, setProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const raw = max > 0 ? window.scrollY / max : 0;
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return progress;
}
