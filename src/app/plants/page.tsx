import type { Metadata } from "next";
import { LeafAccent } from "@/components/effects/LeafAccent";
import { TodayPlantTip } from "@/components/effects/TodayPlantTip";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/ui/CtaBand";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TestimonialGrid } from "@/components/ui/TestimonialGrid";
import {
  careTips,
  partnerNursery,
  plantCollection,
  shopPlants,
} from "@/content/plants";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Plants",
  description:
    "Plant-tropist hub: collection showcase, care tips, favorites by light, and partner nursery catalog stubs.",
  openGraph: {
    title: `Plants · ${site.brand}`,
    description: "A living collection and practical care notes.",
  },
};

export default function PlantsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_0%,rgba(92,122,106,0.22),transparent_50%),linear-gradient(180deg,#f5f4f1,#ebe8e2)]" />
        <div className="container-page section-pad grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              Plant-tropist
            </p>
            <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl text-balance">
              A collection tended with patience
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
              Care tips, favorites by light, and a light partner-nursery shelf.
              Botanical greens live here—without turning the whole brand into a garden center.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#collection" size="lg">
                View collection
              </Button>
              <Button href="#shop" variant="secondary" size="lg">
                Partner picks
              </Button>
            </div>
          </div>
          <MediaPlaceholder
            label="[PLACEHOLDER: Studio / collection hero]"
            aspect="landscape"
            tone="sage"
            className="w-full shadow-[0_20px_50px_rgba(44,74,62,0.12)]"
          />
        </div>
      </section>

      <section className="border-b border-ink/8 bg-ivory/60">
        <div className="container-page py-10 md:py-12">
          <TodayPlantTip />
        </div>
      </section>

      <section id="collection" className="section-pad scroll-mt-24">
        <div className="container-page">
          <SectionHeader
            eyebrow="Collection"
            title="Studio & balcony favorites"
            description="Species names and notes are placeholders—swap for your real collection."
            className="mb-12"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plantCollection.map((plant) => (
              <Card
                as="li"
                key={plant.id}
                className="plant-card-hover group overflow-hidden p-0"
                interactive
              >
                <MediaPlaceholder
                  label={`[PLACEHOLDER: Photo — ${plant.name}]`}
                  aspect="square"
                  tone={plant.featured ? "sage" : "sand"}
                  className="rounded-none"
                />
                <div className="p-5">
                  <LeafAccent className="mb-2 opacity-60" />
                  <div className="flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-wide text-sage">
                    <span className="rounded-sm bg-sage/10 px-2 py-0.5">{plant.light}</span>
                    <span className="rounded-sm bg-stone px-2 py-0.5">{plant.care}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl text-ink">{plant.name}</h3>
                  <p className="mt-2 text-sm text-ink/65">{plant.note}</p>
                </div>
              </Card>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad bg-stone/40">
        <div className="container-page">
          <SectionHeader
            eyebrow="Journal"
            title="Plant care tips"
            description="Short, tested notes—beginner through traveler protocols."
            className="mb-10"
          />
          <ul className="grid gap-5 md:grid-cols-2">
            {careTips.map((tip) => (
              <Card as="li" key={tip.id}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
                  {tip.level}
                </p>
                <h3 className="mt-2 font-display text-2xl text-ink">{tip.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{tip.body}</p>
              </Card>
            ))}
          </ul>
        </div>
      </section>

      <section id="shop" className="section-pad scroll-mt-24">
        <div className="container-page">
          <SectionHeader
            eyebrow="Shop / partner nursery"
            title={partnerNursery.name}
            description={partnerNursery.blurb}
            className="mb-10"
          />
          <ul className="grid gap-6 sm:grid-cols-3">
            {shopPlants.map((item) => (
              <Card as="li" key={item.id} className="flex flex-col">
                <MediaPlaceholder
                  label={`[PLACEHOLDER: ${item.name}]`}
                  aspect="square"
                  tone="sage"
                  className="mb-4"
                />
                <p className="text-xs uppercase tracking-[0.12em] text-brass">{item.tag}</p>
                <h3 className="mt-1 font-display text-xl text-ink">{item.name}</h3>
                <p className="mt-2 text-sm text-ink/65">{item.blurb}</p>
                <p className="mt-4 font-medium text-forest">{item.price}</p>
                <p className="mt-2 text-xs text-ink/45">Checkout not connected — showcase only</p>
              </Card>
            ))}
          </ul>
          <div className="mt-10">
            <Button href={partnerNursery.href} variant="secondary">
              {partnerNursery.cta}
            </Button>
          </div>
        </div>
      </section>

      <TestimonialGrid facet="Plants" limit={1} title="From fellow plant people" />

      <CtaBand
        tone="stone"
        eyebrow="Partnership"
        title="Nursery or brand collaboration?"
        description="Use the contact form with topic “Plants” for partnership inquiries. No payments on this site yet."
        primary={{ href: "/contact", label: "Get in touch" }}
        secondary={{ href: "/travel", label: "Plants on the road" }}
      />
    </>
  );
}
