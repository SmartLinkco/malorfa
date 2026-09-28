"use client";

import { useEffect, useState } from "react";
import {
  useIsCoarsePointer,
  usePrefersReducedMotion,
} from "@/hooks/useMotionPrefs";
import { cn } from "@/lib/utils";

/**
 * Soft leaf/dot custom cursor — desktop fine-pointer only.
 * Disabled on touch / coarse pointers and when prefers-reduced-motion is on.
 */
export function CustomCursor() {
  const coarse = useIsCoarsePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = !coarse && !reduced;

  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        "a, button, [role='button'], input, textarea, select, summary, .cursor-grow",
      );
      setActive(Boolean(interactive));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[200] mix-blend-multiply transition-opacity duration-200",
        visible ? "opacity-100" : "opacity-0",
      )}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
      aria-hidden
    >
      <div
        className={cn(
          "custom-cursor-dot -translate-x-1/2 -translate-y-1/2 rounded-full border border-forest/35 bg-sage/25 backdrop-blur-[1px] transition-[width,height,background-color] duration-200",
          active ? "h-10 w-10 bg-sage/35" : "h-3.5 w-3.5",
        )}
      />
      <svg
        viewBox="0 0 24 24"
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-forest transition-all duration-200",
          active ? "h-5 w-5 opacity-90" : "h-3 w-3 opacity-70",
        )}
        fill="currentColor"
      >
        <path d="M12 20c0-5 3.5-8.5 8-10-1 6-4.5 10-8 10Z" />
        <path d="M12 20c0-5-3.5-8.5-8-10 1 6 4.5 10 8 10Z" opacity="0.7" />
      </svg>
    </div>
  );
}
