"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { getTodayTip } from "@/content/dailyTips";
import { LeafAccent } from "@/components/effects/LeafAccent";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "malorfa-plant-tip-day";

type Props = {
  className?: string;
  compact?: boolean;
};

/**
 * Rotates a tip once per local calendar day (YYYY-MM-DD).
 * Persists the day key in localStorage; no backend.
 */
export function TodayPlantTip({ className, compact = false }: Props) {
  const [tip] = useState(() => getTodayTip());

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== tip.key) {
        localStorage.setItem(STORAGE_KEY, tip.key);
      }
    } catch {
      /* private mode — still show tip */
    }
  }, [tip.key]);

  const label = useMemo(() => `Tip for ${tip.key}`, [tip.key]);

  return (
    <aside
      className={cn(
        "rounded-md border border-sage/25 bg-sage/10",
        compact ? "p-4" : "p-5 md:p-6",
        className,
      )}
      aria-label="Today’s plant tip"
    >
      <div className="flex items-start gap-3 md:gap-4">
        {tip.image ? (
          <div
            className={cn(
              "relative shrink-0 overflow-hidden rounded-sm bg-stone",
              compact ? "h-14 w-14" : "h-20 w-20 md:h-24 md:w-24",
            )}
          >
            <Image
              src={tip.image}
              alt={tip.imageAlt || tip.plant}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        ) : (
          <LeafAccent size="md" className="mt-0.5 shrink-0" />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
            Today’s plant tip
          </p>
          <p className="mt-1 text-[11px] text-ink/45" aria-live="polite">
            {label} · rotates daily
          </p>
          <p className="mt-3 font-display text-xl leading-snug text-ink md:text-2xl text-balance">
            {tip.tip}
          </p>
          <p className="mt-2 text-sm text-ink/60">{tip.plant}</p>
        </div>
      </div>
    </aside>
  );
}
