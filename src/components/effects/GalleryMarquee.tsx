import Image from "next/image";
import { media } from "@/content/media";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

/** Photos not already featured elsewhere — lifestyle marquee set. */
const galleryItems = [
  media.galleryStudio,
  media.galleryHistoricBuilding,
  media.galleryWhiteSuit,
  media.galleryAirportBench,
  media.galleryAirportGate,
  media.galleryStudioPortrait,
  media.portraitBarcelona,
  media.heroDualPoster,
] as const;

type Props = {
  className?: string;
};

/**
 * Infinite gentle marquee of lifestyle photos — scrolls right → left.
 */
export function GalleryMarquee({ className }: Props) {
  const sequence = [...galleryItems, ...galleryItems];

  return (
    <section className={cn("section-pad pb-0", className)} aria-label="Moments">
      <div className="container-page mb-10">
        <SectionHeader
          eyebrow="Moments"
          title="Life between the boardroom and the road"
          description="A few frames from the practice — studio light, city streets, and transit pauses."
          className="max-w-2xl"
        />
      </div>

      <div className="gallery-marquee relative overflow-hidden">
        <div className="gallery-marquee-track flex w-max gap-4 py-1 pl-4 md:gap-5 md:pl-8">
          {sequence.map((item, i) => (
            <figure
              key={`${item.src}-${i}`}
              className="relative h-56 w-40 shrink-0 overflow-hidden bg-stone sm:h-64 sm:w-48 md:h-72 md:w-56"
            >
              <Image
                src={item.src}
                alt={i < galleryItems.length ? item.alt : ""}
                fill
                sizes="(max-width: 768px) 40vw, 224px"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
