import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { getTravelStory, travelStories } from "@/content/travel";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return travelStories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getTravelStory(slug);
  if (!story) return { title: "Story" };
  return {
    title: story.title,
    description: story.excerpt,
    openGraph: {
      title: `${story.title} · ${site.brand}`,
      description: story.excerpt,
    },
  };
}

export default async function TravelStoryPage({ params }: Props) {
  const { slug } = await params;
  const story = getTravelStory(slug);
  if (!story) notFound();

  const others = travelStories.filter((s) => s.slug !== slug).slice(0, 2);

  return (
    <article>
      <header className="border-b border-ink/8 bg-stone/40">
        <div className="container-page section-pad max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
            {story.destination} · {story.date} · {story.readTime}
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl text-balance">
            {story.title}
          </h1>
          <p className="mt-5 text-lg text-ink/70">{story.excerpt}</p>
        </div>
      </header>

      <div className="container-page max-w-3xl py-10">
        <MediaPlaceholder
          label={`[PLACEHOLDER: Hero — ${story.destination}]`}
          aspect="wide"
          tone="forest"
          className="mb-10"
        />
        <div className="prose-site">
          {story.body.map((para) => (
            <p key={para.slice(0, 32)}>{para}</p>
          ))}
        </div>
        {story.plantsNoted.length ? (
          <aside className="mt-10 rounded-md border border-sage/25 bg-sage/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
              Plants on the road
            </p>
            <ul className="mt-3 space-y-1 text-sm text-ink/75">
              {story.plantsNoted.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <Link
              href="/plants"
              className="mt-4 inline-block text-sm font-medium text-forest hover:underline"
            >
              Browse the collection →
            </Link>
          </aside>
        ) : null}

        <div className="mt-12 flex flex-wrap gap-3 border-t border-ink/10 pt-8">
          <Button href="/travel" variant="secondary">
            All travel stories
          </Button>
          <Button href="/contact" variant="ghost">
            Share feedback
          </Button>
        </div>

        {others.length ? (
          <div className="mt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
              Keep reading
            </p>
            <ul className="mt-4 space-y-4">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/travel/${s.slug}`}
                    className="font-display text-xl text-ink hover:text-forest"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
