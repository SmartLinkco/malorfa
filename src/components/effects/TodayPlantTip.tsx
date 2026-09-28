"use client";

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
  const [tip, setTip] = useState(() => getTodayTip());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const today = getTodayTip();
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== today.key) {
        localStorage.setItem(STORAGE_KEY, today.key);
      }
    } catch {
      /* private mode — still show tip */
    }
    setTip(today);
    setReady(true);
  }, []);

  const label = useMemo(() => `Tip for ${tip.key}`, [tip.key]);

  return (
    <aside
      className={cn(
        "rounded-md border border-sage/25 bg-sage/10",
        compact ? "p-4" : "p-5 md:p-6",
        className,
      )}
      aria-label="Today’s plant tip"
      data-ready={ready || undefined}
    >
      <div className="flex items-start gap-3">
        <LeafAccent size="md" className="mt-0.5 shrink-0" />
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
