"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type TravelHeroSlide = {
  src: string;
  alt: string;
};

/** How long each photo stays before the next crossfade begins. */
export const TRAVEL_HERO_INTERVAL_MS = 6000;
/** Opacity crossfade. Keep in sync with .travel-hero-slide in globals.css. */
export const TRAVEL_HERO_FADE_MS = 1400;

/**
 * Full-bleed background for the travel hero. Photos are stacked absolutely
 * so the section height stays tied to the text, not the images.
 * prefers-reduced-motion: the first photo stays put, with no crossfade or zoom.
 */
export function TravelHeroSlideshow({ slides }: { slides: TravelHeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [holding, setHolding] = useState<number | null>(null);
  const [motionReady, setMotionReady] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intervalId = 0;

    const stop = () => {
      window.clearInterval(intervalId);
      intervalId = 0;
      indexRef.current = 0;
      setMotionReady(false);
      setHolding(null);
      setIndex(0);
    };

    const start = () => {
      if (intervalId || slides.length < 2) return;
      setMotionReady(true);
      intervalId = window.setInterval(() => {
        const current = indexRef.current;
        const next = (current + 1) % slides.length;
        indexRef.current = next;
        setHolding(current);
        setIndex(next);
      }, TRAVEL_HERO_INTERVAL_MS);
    };

    const sync = () => {
      if (mq.matches) stop();
      else start();
    };

    sync();
    mq.addEventListener("change", sync);
    return () => {
      window.clearInterval(intervalId);
      mq.removeEventListener("change", sync);
    };
  }, [slides.length]);

  useEffect(() => {
    if (holding == null) return;
    const id = window.setTimeout(() => setHolding(null), TRAVEL_HERO_FADE_MS);
    return () => window.clearTimeout(id);
  }, [holding]);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-45">
      {slides.map((slide, i) => {
        const active = i === index;
        const playing = motionReady && (active || holding === i);
        const visible = active || holding === i;
        return (
          <div
            key={slide.src}
            className={
              "travel-hero-slide absolute inset-0 " +
              (active ? "opacity-100" : "opacity-0")
            }
            aria-hidden={visible ? undefined : true}
          >
            <div
              className={
                "absolute inset-0 " + (playing ? "travel-hero-kenburns" : "")
              }
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                preload={i === 0}
                loading={i === 0 ? undefined : "eager"}
                className="object-cover"
                style={{ objectPosition: "center 32%" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
