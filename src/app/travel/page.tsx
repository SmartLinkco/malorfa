import type { Metadata } from "next";
import { TravelGrainCard } from "@/components/effects/TravelGrainCard";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { travelStories } from "@/content/travel";

export const metadata: Metadata = {
  title: "Travel",
  description:
    "Travel journal — Barcelona, Paris, East Africa, and field notes from the road.",
  openGraph: {
    title: `Travel · ${site.brand}`,
    description: "Editorial travel dispatches.",
  },
};

export default function TravelPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/8 bg-ink text-ivory">
        <div className="absolute inset-0 opacity-40">
          <MediaPlaceholder
            src={media.travelBarcelonaPigeon.src}
            alt=""
            aspect="wide"
            className="h-full min-h-[360px] rounded-none"
            objectPosition="center 30%"
            priority
          />
        </div>
        <div className="container-page relative section-pad max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss">
            Travel journal
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-balance">
            Roads walked alone—and well
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ivory/85">
            Magazine-style field notes from Barcelona plazas, Paris café tables,
            East African roads, and the tram windows in between.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeader
            eyebrow="Journal"
            title="All dispatches"
            description="Each story uses its own photograph—no repeats in the grid."
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
        secondary={{ href: "/books", label: "I Walked Away" }}
      />
    </>
  );
}
