"use client";

import Link from "next/link";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { cn } from "@/lib/utils";

type Story = {
  slug: string;
  title: string;
  destination: string;
  date: string;
  excerpt: string;
  plantsNoted: readonly string[];
  readTime: string;
};

type Props = {
  story: Story;
  className?: string;
};

/** Travel card with subtle film-grain overlay (CSS only, no image weight). */
export function TravelGrainCard({ story, className }: Props) {
  return (
    <article className={cn("group", className)}>
      <Link href={`/travel/${story.slug}`} className="block">
        <div className="travel-grain relative mb-5 overflow-hidden rounded-md">
          <MediaPlaceholder
            label={`[PLACEHOLDER: ${story.destination}]`}
            aspect="wide"
            tone="forest"
            className="mb-0 rounded-none transition-transform duration-500 group-hover:scale-[1.01]"
          />
        </div>
        <p className="text-xs uppercase tracking-[0.14em] text-sage">
          {story.destination} · {story.date} · {story.readTime}
        </p>
        <h2 className="mt-2 font-display text-3xl text-ink group-hover:text-forest">
          {story.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">{story.excerpt}</p>
        {story.plantsNoted.length ? (
          <p className="mt-3 text-xs text-sage">
            Plants noted: {story.plantsNoted.join(" · ")}
          </p>
        ) : null}
      </Link>
    </article>
  );
}
