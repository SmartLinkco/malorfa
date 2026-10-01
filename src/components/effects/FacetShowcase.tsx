"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { facets } from "@/content/site";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

/**
 * Home facet gateway — image-led links with scroll reveal and hover focus.
 */
export function FacetShowcase({ className }: Props) {
  const reduced = Boolean(useReducedMotion());

  return (
    <ul
      className={cn(
        "grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6",
        className,
      )}
    >
      {facets.map((f, i) => (
        <motion.li
          key={f.id}
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.55,
            delay: reduced ? 0 : i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Link
            href={f.href}
            className="group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/35 focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
          >
            <div
              className={cn(
                "relative overflow-hidden bg-stone",
                f.id === "books" ? "aspect-[3/4]" : "aspect-[4/5]",
              )}
            >
              <Image
                src={f.image}
                alt={f.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={cn(
                  "object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]",
                  f.id === "books" && "object-top",
                )}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                aria-hidden
              />
              <p className="absolute bottom-3 left-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory/90">
                {f.cue}
              </p>
            </div>

            <div className="flex flex-1 flex-col pt-4">
              <p className="font-display text-2xl leading-tight text-ink transition-colors duration-300 group-hover:text-forest md:text-[1.65rem]">
                {f.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/65 group-hover:text-ink/80">
                {f.blurb}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-forest">
                Explore
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
