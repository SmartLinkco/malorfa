"use client";

import type { RefObject } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import {
  GrowingPlant,
  usePageScrollProgress,
  useSectionScrollProgress,
} from "@/components/effects/GrowingPlant";
import { HeroVideo } from "@/components/effects/HeroVideo";
import { LeafAccent } from "@/components/effects/LeafAccent";
import { site } from "@/content/site";

/**
 * Home hero: scroll-grown plant + dual-identity video with light parallax,
 * staggered first-visit reveal. Copy stands alone if video fails.
 */
export function InteractiveHero() {
  const { ref, progress: heroProgress } = useSectionScrollProgress();
  const pageProgress = usePageScrollProgress();
  const reducedMotion = useReducedMotion();
  const reduced = Boolean(reducedMotion);

  const reveal = reduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0 },
      };

  const parallaxY = reduced ? 0 : (heroProgress - 0.5) * 28;

  return (
    <>
      <section
        ref={ref as RefObject<HTMLElement>}
        className="relative overflow-hidden border-b border-ink/8"
        aria-label="Introduction"
      >
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(92,122,106,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(217,212,200,0.55),transparent_50%),linear-gradient(180deg,#f5f4f1_0%,#ebe8e2_100%)]" />
          <div className="absolute inset-y-0 right-0 hidden w-[48%] bg-gradient-to-l from-forest/90 via-forest/75 to-transparent lg:block" />
        </div>

        <div className="container-page relative grid min-h-[calc(100vh-4.25rem)] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-20">
          <motion.div
            className="relative z-10 max-w-xl"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: reduced ? 0 : 0.12, delayChildren: reduced ? 0 : 0.08 }}
          >
            <LeafAccent className="mb-4" />
            <motion.p
              variants={reveal}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl leading-[0.95] tracking-tight text-ink md:text-6xl lg:text-7xl"
            >
              {site.brand}
            </motion.p>
            <motion.h1
              variants={reveal}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-lg font-display text-2xl font-medium leading-snug text-ink/90 md:text-3xl text-balance"
            >
              {site.tagline}
            </motion.h1>
            <motion.p
              variants={reveal}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-base leading-relaxed text-ink/65 md:text-lg"
            >
              {site.name} — {site.positioning}. One practice of attention across
              boardrooms, bookshelves, roads, and a living collection.
            </motion.p>
            <motion.div
              variants={reveal}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button href="/contact" size="lg">
                Book a consultation
              </Button>
              <Button href="/books" variant="secondary" size="lg">
                Read the books
              </Button>
              <Button href="/plants" variant="ghost" size="lg">
                Explore the plants
              </Button>
            </motion.div>
            <motion.p
              variants={reveal}
              className="mt-6 text-xs text-ink/40"
            >
              Scroll the page — the plant keeps growing
            </motion.p>
          </motion.div>

          <motion.div
            className="relative z-10 lg:pl-6"
            initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: reduced ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroVideo parallaxY={parallaxY} />
          </motion.div>
        </div>
      </section>

      {/* Fixed plant — growth maps to scroll through the whole page */}
      <div
        className="pointer-events-none fixed bottom-0 left-0 z-20 h-28 w-20 opacity-75 md:h-[min(52vh,400px)] md:w-36 md:opacity-80 lg:w-44"
        aria-hidden
      >
        <GrowingPlant progress={pageProgress} />
      </div>
    </>
  );
}
