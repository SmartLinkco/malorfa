import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/ui/CtaBand";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  biography,
  credentials,
  timeline,
  values,
} from "@/content/about";
import { media } from "@/content/media";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `Biography and values for ${site.name} — risk advisor, plant-tropist, traveler, author.`,
  openGraph: {
    title: `About · ${site.brand}`,
    description: biography.lead,
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="section-pad border-b border-ink/8 bg-[radial-gradient(ellipse_at_top_left,rgba(143,168,146,0.2),transparent_50%),linear-gradient(180deg,#f5f4f1,#ebe8e2)]">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              About
            </p>
            <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl text-balance">
              {site.name}
              {site.credentials ? (
                <span className="ml-2 text-2xl text-sage md:text-3xl">
                  , {site.credentials}
                </span>
              ) : null}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
              {biography.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" size="lg">
                Get in touch
              </Button>
              <Button href="/services" variant="secondary" size="lg">
                View services
              </Button>
            </div>
          </div>
          <MediaPlaceholder
            src={media.aboutWings.src}
            alt={media.aboutWings.alt}
            aspect="portrait"
            tone="sand"
            className="mx-auto w-full max-w-md"
            objectPosition="center 20%"
            priority
          />
        </div>
      </section>

      <section className="border-b border-ink/8 bg-ivory/50">
        <div className="container-page grid gap-4 py-10 sm:grid-cols-3">
          <MediaPlaceholder
            src={media.aboutCasual.src}
            alt={media.aboutCasual.alt}
            aspect="square"
            objectPosition="center 15%"
          />
          <MediaPlaceholder
            src={media.aboutBlackDress.src}
            alt={media.aboutBlackDress.alt}
            aspect="square"
            objectPosition="center 25%"
          />
          <MediaPlaceholder
            src={media.travelUrbanRed.src}
            alt={media.travelUrbanRed.alt}
            aspect="square"
            objectPosition="center 20%"
          />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHeader eyebrow="Biography" title="The through-line" className="mb-8" />
            <div className="prose-site">
              {biography.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-10 rounded-md border border-sage/25 bg-sage/10 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
                Plant passion
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">
                The collection is not décor—it is a daily practice of noticing.
                Care notes and favorites live on the{" "}
                <a href="/plants" className="font-medium text-forest underline-offset-2 hover:underline">
                  Plants
                </a>{" "}
                page. Travel often includes plant encounters recorded in the journal.
              </p>
            </div>
          </div>

          <aside>
            <SectionHeader
              eyebrow="Credentials"
              title="Placeholders"
              description="Replace with real licenses, memberships, and press. Nothing here implies a real affiliation."
              className="mb-6"
            />
            <ul className="space-y-4">
              {credentials.map((c) => (
                <li
                  key={c.label}
                  className="border-b border-ink/8 pb-4 last:border-0"
                >
                  <p className="text-xs uppercase tracking-[0.12em] text-sage">
                    {c.label}
                  </p>
                  <p className="mt-1 text-sm text-ink/80">{c.value}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section-pad bg-stone/40">
        <div className="container-page">
          <SectionHeader
            eyebrow="Timeline"
            title="Career & creative highlights"
            className="mb-12"
          />
          <ol className="relative space-y-0 border-l border-ink/15 pl-8">
            {timeline.map((item) => (
              <li key={item.title} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[2.05rem] top-1.5 h-3 w-3 rounded-full border-2 border-forest bg-canvas" />
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
                  {item.year}
                </p>
                <h3 className="mt-1 font-display text-2xl text-ink">{item.title}</h3>
                <p className="mt-2 max-w-2xl text-sm text-ink/65">{item.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeader eyebrow="Values" title="How the work feels" className="mb-10" />
          <ul className="grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <Card as="li" key={v.title}>
                <h3 className="font-display text-2xl text-ink">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{v.body}</p>
              </Card>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        eyebrow="Collaborate"
        title="Consulting, speaking, or a quiet hello"
        description="Tell me what brought you here—risk work, a book, a plant question, or travel."
        primary={{ href: "/contact", label: "Contact" }}
        secondary={{ href: "/books", label: "See the books" }}
      />
    </>
  );
}
