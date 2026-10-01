import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/ui/CtaBand";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TestimonialGrid } from "@/components/ui/TestimonialGrid";
import { books, speakingPress } from "@/content/books";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Books",
  description:
    "I Walked Away by Malorfa Aryee, APR — and forthcoming work on plants and travel.",
  openGraph: {
    title: `Books · ${site.brand}`,
    description: "I Walked Away and forthcoming titles.",
  },
};

export default function BooksPage() {
  return (
    <>
      <section className="section-pad border-b border-ink/8">
        <div className="container-page max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
            Author · Malorfa Aryee, APR
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl text-balance">
            Books & pages
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            Start with <em>I Walked Away</em>—available on Amazon, with Ghana
            orders via WhatsApp. More titles in progress.
          </p>
          <div className="mt-8">
            <Button href="/books/i-walked-away" size="lg">
              Read I Walked Away
            </Button>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <ul className="grid gap-10 md:grid-cols-3">
            {books.map((book) => (
              <li key={book.slug}>
                <Link href={`/books/${book.slug}`} className="group block">
                  <MediaPlaceholder
                    src={book.image}
                    alt={book.imageAlt}
                    label={book.coverLabel}
                    aspect="portrait"
                    tone="sand"
                    className="mb-5 transition-transform duration-500 group-hover:-translate-y-1"
                    objectPosition="center 22%"
                    showLabel={!book.image}
                  />
                  <p className="text-xs uppercase tracking-[0.14em] text-sage">
                    {book.year} · {book.status}
                  </p>
                  <h2 className="mt-2 font-display text-2xl text-ink group-hover:text-forest">
                    {book.title}
                  </h2>
                  <p className="mt-1 text-sm text-ink/55">{book.subtitle}</p>
                  <p className="mt-3 text-sm text-ink/70">{book.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad bg-stone/40">
        <div className="container-page">
          <SectionHeader
            eyebrow="Excerpts"
            title="A few lines from the work"
            className="mb-10"
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {books.map((book) => (
              <Card as="li" key={`${book.slug}-excerpt`}>
                <p className="font-display text-xl leading-snug text-ink">
                  “{book.excerpt}”
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.12em] text-sage">
                  — {book.title}
                </p>
              </Card>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeader
            eyebrow="Speaking & press"
            title="Appearances (placeholders)"
            description="Swap in real talks, podcasts, and features."
            className="mb-8"
          />
          <ul className="grid gap-4 md:grid-cols-3">
            {speakingPress.map((item) => (
              <Card as="li" key={item.title}>
                <p className="text-xs uppercase tracking-[0.12em] text-sage">
                  {item.type}
                </p>
                <h3 className="mt-2 font-display text-xl text-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-ink/65">{item.detail}</p>
              </Card>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/contact" variant="secondary">
              Inquire about speaking
            </Button>
          </div>
        </div>
      </section>

      <TestimonialGrid facet="Books" limit={1} title="From readers" />

      <CtaBand
        eyebrow="Reading list"
        title="Start with a title—or ask for a signed copy stub"
        description="Buy links are placeholders. Contact for media kits and speaking."
        primary={{ href: "/contact", label: "Media & speaking" }}
        secondary={{ href: "/about", label: "About the author" }}
      />
    </>
  );
}
