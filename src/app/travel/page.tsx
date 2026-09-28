import type { Metadata } from "next";
import Link from "next/link";
import { TravelGrainCard } from "@/components/effects/TravelGrainCard";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/content/site";
import { travelStories } from "@/content/travel";

export const metadata: Metadata = {
  title: "Travel",
  description:
    "Solo travel journal — destination stories, field notes, and plants encountered on the road.",
  openGraph: {
    title: `Travel · ${site.brand}`,
    description: "Editorial solo travel dispatches.",
  },
};

export default function TravelPage() {
  const featured = travelStories.filter((s) => s.featured);
  const rest = travelStories.filter((s) => !s.featured);

  return (
    <>
      <section className="section-pad border-b border-ink/8 bg-ink text-ivory">
        <div className="container-page max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss">
            Solo travel journal
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-balance">
            Roads walked alone—and well
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ivory/70">
            Magazine-style field notes: destinations, pacing, and the plants that
            marked each trip. Replace stories and photos with your own.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeader
            eyebrow="Featured"
            title="Recent dispatches"
            className="mb-10"
          />
          <ul className="grid gap-10 lg:grid-cols-2">
            {featured.map((story) => (
              <li key={story.slug}>
                <TravelGrainCard story={story} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad bg-stone/40">
        <div className="container-page">
          <SectionHeader eyebrow="Archive" title="More stories" className="mb-8" />
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {rest.map((story) => (
              <li key={story.slug} className="py-6">
                <Link
                  href={`/travel/${story.slug}`}
                  className="group flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between"
                >
                  <div>
                    <h2 className="font-display text-2xl text-ink group-hover:text-forest">
                      {story.title}
                    </h2>
                    <p className="mt-1 text-sm text-ink/60">{story.excerpt}</p>
                  </div>
                  <p className="shrink-0 text-xs uppercase tracking-[0.12em] text-sage">
                    {story.destination} · {story.readTime}
                  </p>
                </Link>
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
        secondary={{ href: "/books", label: "Travel book" }}
      />
    </>
  );
}
