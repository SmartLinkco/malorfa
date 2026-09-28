import type { Metadata } from "next";
import Link from "next/link";
import { InteractiveHero } from "@/components/effects/InteractiveHero";
import { TodayPlantTip } from "@/components/effects/TodayPlantTip";
import { LeafAccent } from "@/components/effects/LeafAccent";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/ui/CtaBand";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TestimonialGrid } from "@/components/ui/TestimonialGrid";
import { books } from "@/content/books";
import { plantCollection } from "@/content/plants";
import { services } from "@/content/services";
import { facets, site } from "@/content/site";
import { travelStories } from "@/content/travel";

export const metadata: Metadata = {
  title: {
    absolute: `${site.brand} · Risk, plants, travel & books`,
  },
  description: site.tagline,
  openGraph: {
    title: `${site.brand} — personal brand home`,
    description: site.tagline,
  },
};

export default function HomePage() {
  const featuredBooks = books.slice(0, 2);
  const featuredTravel = travelStories.filter((t) => t.featured).slice(0, 2);
  const featuredPlants = plantCollection.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <InteractiveHero />

      {/* Trust strip */}
      <section className="border-b border-ink/8 bg-ivory/70">
        <div className="container-page flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
            Trusted for
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-ink/70">
            <li>Corporate risk briefings</li>
            <li>Insurance program design</li>
            <li>Author talks & media</li>
            <li>Plant care notes</li>
          </ul>
          <p className="text-xs text-ink/45">
            Credentials are placeholders — replace before launch
          </p>
        </div>
      </section>

      <section className="section-pad pb-0">
        <div className="container-page max-w-2xl">
          <TodayPlantTip />
        </div>
      </section>

      {/* Four facets */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeader
            eyebrow="One brand, four facets"
            title="A coherent practice of attention"
            description="Corporate credibility and a lived creative life—same standards of clarity, warmth, and care."
            className="mb-12"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {facets.map((f) => (
              <li key={f.id}>
                <Link
                  href={f.href}
                  className="group block h-full rounded-md border border-ink/8 bg-ivory/60 p-5 transition-colors hover:border-sage/40 hover:bg-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30"
                >
                  <LeafAccent className="mb-2 opacity-70 transition-transform group-hover:rotate-12" />
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
                    {f.label}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70 group-hover:text-ink">
                    {f.blurb}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-forest">
                    Explore →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured services */}
      <section className="section-pad bg-stone/50">
        <div className="container-page">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Services"
              title="Risk & insurance counsel"
              description="Advisory, program design, workshops, and briefings for teams who need clarity—not noise."
            />
            <Button href="/services" variant="secondary">
              View all services
            </Button>
          </div>
          <ul className="grid gap-5 md:grid-cols-2">
            {services.slice(0, 4).map((s) => (
              <Card as="li" key={s.id} interactive>
                <h3 className="font-display text-2xl text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{s.summary}</p>
              </Card>
            ))}
          </ul>
        </div>
      </section>

      {/* Books highlight */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeader
            eyebrow="Books"
            title="On the shelf"
            description="Published works spanning judgment, plants, and solo roads."
            className="mb-12"
          />
          <ul className="grid gap-8 md:grid-cols-2">
            {featuredBooks.map((book) => (
              <li key={book.slug} className="grid gap-5 sm:grid-cols-[140px_1fr] sm:items-start">
                <MediaPlaceholder
                  label={book.coverLabel}
                  aspect="portrait"
                  tone="sand"
                  className="w-full max-w-[140px]"
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-sage">
                    {book.year} · {book.status}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-ink">
                    <Link href={`/books/${book.slug}`} className="hover:text-forest">
                      {book.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-ink/55">{book.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{book.blurb}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href="/books" variant="secondary">
              Browse all books
            </Button>
          </div>
        </div>
      </section>

      {/* Travel teaser */}
      <section className="section-pad bg-ink text-ivory">
        <div className="container-page">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-moss">
                Travel
              </p>
              <h2 className="font-display text-3xl md:text-4xl text-balance">
                Solo field notes
              </h2>
              <p className="mt-4 text-base text-ivory/70 md:text-lg">
                Magazine-style dispatches—places walked alone, plants noticed along the way.
              </p>
            </div>
            <Button href="/travel" variant="inverse">
              Open the journal
            </Button>
          </div>
          <ul className="grid gap-6 md:grid-cols-2">
            {featuredTravel.map((story) => (
              <li key={story.slug}>
                <Link href={`/travel/${story.slug}`} className="group block">
                  <div className="travel-grain relative mb-4 overflow-hidden rounded-md">
                    <MediaPlaceholder
                      label={`[PLACEHOLDER: ${story.destination} photo]`}
                      aspect="wide"
                      tone="forest"
                      className="mb-0 rounded-none transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </div>
                  <p className="text-xs uppercase tracking-[0.14em] text-moss">
                    {story.destination} · {story.readTime}
                  </p>
                  <h3 className="mt-2 font-display text-2xl group-hover:text-moss">
                    {story.title}
                  </h3>
                  <p className="mt-2 text-sm text-ivory/65">{story.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Plants teaser */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeader
            eyebrow="Plants"
            title="A living collection"
            description="Favorites from the studio and balcony—care notes, not catalog noise."
            className="mb-12"
          />
          <ul className="grid gap-6 sm:grid-cols-3">
            {featuredPlants.map((plant) => (
              <Card
                as="li"
                key={plant.id}
                interactive
                className="plant-card-hover group overflow-hidden p-0"
              >
                <MediaPlaceholder
                  label={`[PLACEHOLDER: ${plant.name} photo]`}
                  aspect="square"
                  tone="sage"
                  className="rounded-none rounded-t-md"
                />
                <div className="p-5">
                  <LeafAccent className="mb-2 opacity-60" />
                  <h3 className="font-display text-xl text-ink">{plant.name}</h3>
                  <p className="mt-1 text-xs text-sage">
                    {plant.light} · {plant.care}
                  </p>
                  <p className="mt-3 text-sm text-ink/65">{plant.note}</p>
                </div>
              </Card>
            ))}
          </ul>
          <div className="mt-10">
            <Button href="/plants" variant="secondary">
              Visit the plant hub
            </Button>
          </div>
        </div>
      </section>

      <TestimonialGrid limit={3} />

      <section className="section-pad pt-0">
        <div className="container-page max-w-2xl">
          <NewsletterForm />
        </div>
      </section>

      <CtaBand
        eyebrow="Next step"
        title="Ready to talk risk—or plants, pages, and roads?"
        description="Book a consultation, ask about speaking, or say hello about a nursery partnership."
        primary={{ href: "/contact", label: "Contact" }}
        secondary={{ href: "/about", label: "Read the about page" }}
      />
    </>
  );
}
