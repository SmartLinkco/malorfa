import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { books, getBook } from "@/content/books";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: "Book" };
  return {
    title: book.title,
    description: book.blurb,
    openGraph: {
      title: `${book.title} · ${site.brand}`,
      description: book.blurb,
    },
  };
}

export default async function BookDetailPage({ params }: Props) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  return (
    <article className="section-pad">
      <div className="container-page grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-14">
        <MediaPlaceholder
          label={book.coverLabel}
          aspect="portrait"
          tone="sand"
          className="mx-auto w-full max-w-[240px]"
        />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
            {book.year} · {book.status}
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl text-balance">
            {book.title}
          </h1>
          <p className="mt-3 text-lg text-ink/60">{book.subtitle}</p>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/75">
            {book.blurb}
          </p>

          <blockquote className="mt-8 border-l-2 border-sage/50 pl-5 font-display text-2xl leading-snug text-ink">
            “{book.excerpt}”
          </blockquote>

          <div className="mt-8 flex flex-wrap gap-2">
            {book.themes.map((theme) => (
              <span
                key={theme}
                className="rounded-sm bg-stone px-2.5 py-1 text-xs font-medium text-ink/70"
              >
                {theme}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {book.buyLinks.map((link) => (
              <Button key={link.label} href={link.href} variant="secondary">
                {link.label}
              </Button>
            ))}
            <Button href="/books">All books</Button>
          </div>
          <p className="mt-4 text-xs text-ink/45">
            Retailer links are stubs — connect real URLs before launch.
          </p>
        </div>
      </div>
    </article>
  );
}
