import type { Metadata } from "next";
import Link from "next/link";
import { TravelGrainCard } from "@/components/effects/TravelGrainCard";
import { TravelHeroSlideshow } from "@/components/effects/TravelHeroSlideshow";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { media } from "@/content/media";
import { site } from "@/content/site";
import {
  countriesVisited,
  countryRegions,
  countriesVisitedCount,
  travelerEyeInterlude,
  travelStories,
} from "@/content/travel";

const travelHeroSlides = [
  { src: media.travelSagradaFull.src },
  { src: "/media/travel-malorfa-amsterdam-canal-skyline.jpeg" },
  { src: media.travelParisEiffelNight.src },
  { src: media.travelTimesSquare.src },
  { src: media.travelGiraffeFeeding.src },
  { src: "/media/travel-malorfa-waterfall-overlook.jpeg" },
];

export const metadata: Metadata = {
  title: "Travel",
  description: `${countriesVisitedCount} countries so far — field notes from roads, airports, and what grows along the way.`,
  openGraph: {
    title: `Travel · ${site.brand}`,
    description: `${countriesVisitedCount} countries visited — measured, in part, by their flowers.`,
  },
};

export default function TravelPage() {
  const byRegion = countryRegions.map((region) => ({
    region,
    list: countriesVisited.filter((c) => c.region === region),
  }));

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/8 bg-ink text-ivory">
        <TravelHeroSlideshow slides={travelHeroSlides} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40" />
        <div className="container-page relative section-pad grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss">
              Travel journal
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-5xl text-balance">
              Roads walked—and counted
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ivory/85">
              Field notes from plazas, airports, and the plants noticed between
              borders—drawn from the road and from{" "}
              <em>The Traveler’s Eye</em> in <em>Rooted</em>.
            </p>
          </div>
          <div className="rounded-md border border-ivory/15 bg-ink/50 p-6 backdrop-blur-sm md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-moss">
              Countries so far
            </p>
            <p className="mt-3 font-display text-6xl leading-none text-ivory md:text-7xl">
              {countriesVisitedCount}
            </p>
            <p className="mt-3 text-sm text-ivory/65">
              Named destinations across Africa, Europe, Asia, and the
              Americas—and growing.
            </p>
            <Link
              href="#countries"
              className="mt-5 inline-block text-sm font-medium text-moss hover:text-ivory"
            >
              See the list →
            </Link>
          </div>
        </div>
      </section>

      <section id="countries" className="section-pad scroll-mt-24">
        <div className="container-page">
          <SectionHeader
            eyebrow="The map"
            title={`${countriesVisitedCount} countries — so far`}
            description="Cities and states are shown where they were recorded. The list updates as new borders open."
            className="mb-10 max-w-2xl"
          />
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            {byRegion.map(({ region, list }) => (
              <div key={region}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
                  {region} · {list.length}
                </p>
                <ul className="mt-4 space-y-3">
                  {list.map((c) => (
                    <li key={c.name} className="border-t border-ink/8 pt-3">
                      <p className="font-display text-xl text-ink">{c.name}</p>
                      {c.note ? (
                        <p className="mt-1 text-sm text-ink/55">{c.note}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-stone/40">
        <div className="container-page max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
            From {travelerEyeInterlude.source}
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink md:text-4xl">
            {travelerEyeInterlude.title}
          </h2>
          <blockquote className="mt-6 border-l-2 border-sage/50 pl-5 font-display text-xl leading-snug text-ink/85 md:text-2xl">
            “{travelerEyeInterlude.excerpt}”
          </blockquote>
          <div className="mt-8">
            <Button href={travelerEyeInterlude.href} variant="secondary">
              Read Rooted
            </Button>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeader
            eyebrow="Journal"
            title="Dispatches from the road"
            description="Stories paired with photographs from the newest travel set—Barcelona, Amsterdam, Paris, airports, and East Africa."
            className="mb-10"
          />
          <ul className="grid gap-10 lg:grid-cols-2">
            {travelStories.map((story) => (
              <li key={story.slug}>
                <TravelGrainCard story={story} />
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href="/plants" variant="secondary">
              Related: plant collection
            </Button>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Write to me"
        title="Travel tips, press, or a shared destination?"
        description="Media and collaboration inquiries welcome via the contact form."
        primary={{ href: "/contact", label: "Contact" }}
        secondary={{ href: "/books/rooted", label: "Rooted" }}
      />
    </>
  );
}
