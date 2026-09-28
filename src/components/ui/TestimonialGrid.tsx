import { testimonials } from "@/content/testimonials";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Props = {
  facet?: string;
  limit?: number;
  eyebrow?: string;
  title?: string;
};

export function TestimonialGrid({
  facet,
  limit = 3,
  eyebrow = "Voices",
  title = "What clients and readers say",
}: Props) {
  const items = (
    facet
      ? testimonials.filter((t) => t.facet === facet)
      : testimonials
  ).slice(0, limit);

  if (!items.length) return null;

  return (
    <section className="section-pad">
      <div className="container-page">
        <SectionHeader eyebrow={eyebrow} title={title} className="mb-10" />
        <ul className="grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <Card as="li" key={t.id} className="flex flex-col">
              <p className="font-display text-xl leading-snug text-ink text-balance">
                “{t.quote}”
              </p>
              <footer className="mt-6 border-t border-ink/8 pt-4 text-sm text-ink/60">
                <p className="font-medium text-ink/80">{t.name}</p>
                <p>{t.role}</p>
              </footer>
            </Card>
          ))}
        </ul>
      </div>
    </section>
  );
}
