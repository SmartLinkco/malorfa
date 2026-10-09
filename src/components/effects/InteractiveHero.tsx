"use client";

import type { RefObject } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import {
  GrowingPlant,
  usePageScrollProgress,
  useSectionScrollProgress,
} from "@/components/effects/GrowingPlant";
import { HeroPortrait } from "@/components/effects/HeroPortrait";
import { TypewriterBrand } from "@/components/effects/TypewriterBrand";
import { media } from "@/content/media";
import { site } from "@/content/site";

/**
 * Home hero: Malorfa cutout (mobile background / desktop float) + scroll plant.
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
        {/* Base atmosphere — green panel on the left (desktop) */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(92,122,106,0.22),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(217,212,200,0.55),transparent_50%),linear-gradient(180deg,#f5f4f1_0%,#ebe8e2_100%)]" />
          <div className="absolute inset-y-0 left-0 hidden w-[52%] bg-gradient-to-r from-forest via-forest/85 to-transparent lg:block" />
        </div>

        {/* Mobile: full-bleed portrait wash + bottom-anchored crop */}
        <div className="pointer-events-none absolute inset-0 lg:hidden" aria-hidden>
          <Image
            src={media.portraitHero.src}
            alt=""
            fill
            preload
            quality={90}
            sizes="(min-resolution: 3dppx) min(100vw, 430px), (min-resolution: 2dppx) min(100vw, 645px), min(100vw, 1290px)"
            className="object-cover object-[center_12%] opacity-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-canvas/85 via-canvas/55 to-canvas/90" />
          <div className="absolute inset-x-0 bottom-0 h-[48%]">
            <div className="hero-portrait-frame relative mx-auto h-full">
              <Image
                src={media.portraitHero.src}
                alt=""
                fill
                preload
                quality={90}
                sizes="(min-resolution: 3dppx) min(100vw, 430px), (min-resolution: 2dppx) min(100vw, 645px), min(100vw, 1290px)"
                className="object-cover object-top drop-shadow-[0_18px_40px_rgba(26,31,28,0.22)]"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-canvas to-transparent" />
          </div>
        </div>

        <div className="container-page relative grid min-h-[calc(100vh-4.25rem)] items-center gap-8 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-20">
          <motion.div
            className="relative z-10 max-w-xl pb-[42vh] lg:pb-0 lg:text-ivory"
            initial="hidden"
            animate="show"
            transition={{
              staggerChildren: reduced ? 0 : 0.12,
              delayChildren: reduced ? 0 : 0.08,
            }}
          >
            <motion.p
              variants={reveal}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl leading-[0.95] tracking-tight text-ink md:text-6xl lg:text-7xl lg:text-ivory"
            >
              <TypewriterBrand text={site.brand} />
            </motion.p>
            <motion.h1
              variants={reveal}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-lg font-display text-2xl font-medium leading-snug text-ink/90 md:text-3xl lg:text-ivory/90 text-balance"
            >
              {site.tagline}
            </motion.h1>
            <motion.p
              variants={reveal}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-base leading-relaxed text-ink/65 md:text-lg lg:text-ivory/70"
            >
              {site.name} — {site.positioning}. One practice of attention across
              boardrooms, bookshelves, roads, and a living collection.
            </motion.p>
            <motion.div
              variants={reveal}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button href="/contact" size="lg" className="lg:bg-ivory lg:text-forest lg:hover:bg-stone">
                Book a consultation
              </Button>
              <Button
                href="/books"
                variant="secondary"
                size="lg"
                className="lg:border-ivory/35 lg:text-ivory lg:hover:border-ivory lg:hover:text-ivory"
              >
                Read the books
              </Button>
              <Button
                href="/plants"
                variant="ghost"
                size="lg"
                className="lg:text-ivory/80 lg:hover:text-ivory"
              >
                Explore the plants
              </Button>
            </motion.div>
          </motion.div>

          {/* Spacer column so copy stays left; portrait is absolute to section */}
          <div className="hidden lg:block" aria-hidden />
        </div>

        <motion.div
          className="pointer-events-none absolute inset-0 z-[1] hidden lg:block"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: reduced ? 0 : 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <HeroPortrait parallaxY={parallaxY} />
        </motion.div>
      </section>

      <div
        className="pointer-events-none fixed bottom-0 left-0 z-20 h-28 w-20 opacity-75 md:h-[min(52vh,400px)] md:w-36 md:opacity-80 lg:w-44"
        aria-hidden
      >
        <GrowingPlant progress={pageProgress} />
      </div>
    </>
  );
}
