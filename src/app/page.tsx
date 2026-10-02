import type { Metadata } from "next";
import Link from "next/link";
import { InteractiveHero } from "@/components/effects/InteractiveHero";
import { TodayPlantTip } from "@/components/effects/TodayPlantTip";
import { FacetShowcase } from "@/components/effects/FacetShowcase";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/ui/CtaBand";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TestimonialGrid } from "@/components/ui/TestimonialGrid";
import { books } from "@/content/books";
import { media } from "@/content/media";
import { plantCollection } from "@/content/plants";
import { services } from "@/content/services";
import { site } from "@/content/site";

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
            className="mb-12 max-w-2xl"
          />
          <FacetShowcase />
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

      {/* Books — generated covers */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeader
            eyebrow="Books"
            title="I Walked Away — and pages in progress"
            description="Published memoir plus forthcoming plant and travel titles."
            className="mb-10"
          />
          <ul className="grid gap-8 sm:grid-cols-3">
            {books.map((book) => (
              <li key={book.slug}>
                <Link href={`/books/${book.slug}`} className="group block">
                  <MediaPlaceholder
                    src={book.image}
                    alt={book.imageAlt}
                    aspect="portrait"
                    className="mb-4 transition-transform duration-500 group-hover:-translate-y-1"
                    objectPosition="center 20%"
                  />
                  <p className="text-xs uppercase tracking-[0.14em] text-sage">
                    {book.year} · {book.status}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-ink group-hover:text-forest">
                    {book.title}
                  </h3>
                </Link>
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

      {/* Travel — generated field stills */}
      <section className="section-pad bg-ink text-ivory">
        <div className="container-page">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-moss">
            Travel
          </p>
          <h2 className="max-w-2xl font-display text-3xl md:text-4xl text-balance">
            Field notes
          </h2>
          <p className="mt-4 max-w-2xl text-base text-ivory/70 md:text-lg">
            Barcelona, Paris, East Africa, tram windows—and the plants noticed along the way.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/travel/barcelona-plaza-light",
                src: media.travelDetailBarcelona2.src,
                alt: media.travelDetailBarcelona2.alt,
                label: "Barcelona",
              },
              {
                href: "/travel/paris-pages-and-green",
                src: media.travelDetailParis2.src,
                alt: media.travelDetailParis2.alt,
                label: "Paris",
              },
              {
                href: "/travel/east-africa-on-the-road",
                src: media.travelDetailSafari2.src,
                alt: media.travelDetailSafari2.alt,
                label: "East Africa",
              },
              {
                href: "/travel/tram-window-notes",
                src: media.travelMapPassport.src,
                alt: media.travelMapPassport.alt,
                label: "On the road",
              },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="group block">
                  <MediaPlaceholder
                    src={item.src}
                    alt={item.alt}
                    aspect="square"
                    className="rounded-md transition-opacity group-hover:opacity-90"
                  />
                  <p className="mt-3 text-sm font-medium text-ivory/85 group-hover:text-ivory">
                    {item.label} →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Button href="/travel" variant="inverse">
              Open the journal
            </Button>
          </div>
        </div>
      </section>

      {/* Plants — generated collection */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeader
            eyebrow="Plants"
            title="A living collection"
            description="Studio favorites, care notes, and a partner nursery shelf."
            className="mb-8"
          />
          <MediaPlaceholder
            src={media.plantsCollectionWide.src}
            alt={media.plantsCollectionWide.alt}
            aspect="wide"
            className="mb-8"
          />
          <ul className="grid gap-5 sm:grid-cols-3">
            {plantCollection
              .filter((p) => p.featured)
              .map((plant) => (
                <li key={plant.id}>
                  <Link href="/plants#collection" className="group block">
                    <MediaPlaceholder
                      src={plant.image}
                      alt={plant.imageAlt}
                      aspect="square"
                      className="mb-3"
                    />
                    <p className="font-display text-xl text-ink group-hover:text-forest">
                      {plant.name}
                    </p>
                  </Link>
                </li>
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
