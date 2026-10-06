"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMotionPrefs";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  cursorClassName?: string;
};

/**
 * Gently types `text` in an infinite loop with a blinking cursor.
 * Shows the full string immediately when prefers-reduced-motion is set.
 */
export function TypewriterBrand({ text, className, cursorClassName }: Props) {
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(reduced ? text : "");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    if (reduced) {
      setShown(text);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (shown.length < text.length) {
        timer = setTimeout(() => {
          setShown(text.slice(0, shown.length + 1));
        }, 140);
      } else {
        timer = setTimeout(() => setPhase("holding"), 2200);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), 400);
    } else if (shown.length > 0) {
      timer = setTimeout(() => {
        setShown(text.slice(0, shown.length - 1));
      }, 70);
    } else {
      timer = setTimeout(() => setPhase("typing"), 700);
    }

    return () => clearTimeout(timer);
  }, [shown, phase, text, reduced]);

  return (
    <span className={cn("inline-flex items-baseline", className)} aria-label={text}>
      <span aria-hidden>{shown}</span>
      {!reduced ? (
        <span
          aria-hidden
          className={cn(
            "ml-[0.08em] inline-block h-[0.82em] w-[0.085em] translate-y-[0.08em] rounded-[1px] bg-current",
            "animate-[brand-cursor_1.05s_steps(1)_infinite]",
            cursorClassName,
          )}
        />
      ) : null}
    </span>
  );
}
