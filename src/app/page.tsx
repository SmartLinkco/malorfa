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
import { media } from "@/content/media";
import { services } from "@/content/services";
import { facets, site } from "@/content/site";

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
          <div className="mb-12 grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <SectionHeader
              eyebrow="Services"
              title="Risk & insurance counsel"
              description="Advisory, program design, workshops, and briefings for teams who need clarity—not noise."
            />
            <MediaPlaceholder
              src={media.corporateLaptop.src}
              alt={media.corporateLaptop.alt}
              aspect="wide"
              className="hidden lg:block"
              objectPosition="center 40%"
            />
          </div>
          <div className="mb-8 lg:hidden">
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
          <div className="mt-8 hidden lg:block">
            <Button href="/services" variant="secondary">
              View all services
            </Button>
          </div>
        </div>
      </section>

      {/* Books highlight — text-led; photo lives on /books to avoid repeats */}
      <section className="section-pad">
        <div className="container-page max-w-2xl">
          <SectionHeader
            eyebrow="Books"
            title="I Walked Away"
            description="Malorfa Aryee’s published memoir — available on Amazon, with Ghana orders via WhatsApp. More titles in progress."
            className="mb-8"
          />
          <Button href="/books" variant="secondary">
            Browse all books
          </Button>
        </div>
      </section>

      {/* Travel teaser — full photo set lives on /travel */}
      <section className="section-pad bg-ink text-ivory">
        <div className="container-page max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-moss">
            Travel
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-balance">
            Solo field notes
          </h2>
          <p className="mt-4 text-base text-ivory/70 md:text-lg">
            Barcelona, Paris, East Africa, tram windows—and the plants noticed along the way.
          </p>
          <div className="mt-8">
            <Button href="/travel" variant="inverse">
              Open the journal
            </Button>
          </div>
        </div>
      </section>

      {/* Plants teaser — orchid photo lives on /plants */}
      <section className="section-pad">
        <div className="container-page max-w-2xl">
          <SectionHeader
            eyebrow="Plants"
            title="A living collection"
            description="Care notes, studio favorites, and nursery partnership stubs—see the orchid and full collection on the plant hub."
            className="mb-8"
          />
          <Button href="/plants" variant="secondary">
            Visit the plant hub
          </Button>
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
