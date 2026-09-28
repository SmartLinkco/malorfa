import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CtaBand } from "@/components/ui/CtaBand";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TestimonialGrid } from "@/components/ui/TestimonialGrid";
import {
  caseStudies,
  faqs,
  processSteps,
  services,
  whoItsFor,
} from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services · Risk & Insurance",
  description:
    "Corporate risk advisory, insurance program design, claims readiness workshops, and speaking.",
  openGraph: {
    title: `Services · ${site.brand}`,
    description:
      "Boardroom-credible risk and insurance offerings for corporate and agency clients.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="section-pad border-b border-ink/8 bg-ink text-ivory">
        <div className="container-page max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss">
            Risk & Insurance
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-balance">
            Counsel that earns its seat at the table
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ivory/70">
            Structured advisory for corporate agents and organizations who need
            clear exposure maps, renewal-ready language, and workshops that stick.
            All firm names and licenses on this page are fictional placeholders.
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="inverse" size="lg">
              Book a consultation
            </Button>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <SectionHeader
            eyebrow="Offerings"
            title="How we can work together"
            className="mb-12"
          />
          <ul className="grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <Card as="li" key={s.id} className="flex flex-col">
                <h3 className="font-display text-2xl text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{s.summary}</p>
                <ul className="mt-5 space-y-2 border-t border-ink/8 pt-5">
                  {s.outcomes.map((o) => (
                    <li key={o} className="flex gap-2 text-sm text-ink/75">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" />
                      {o}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad bg-stone/45">
        <div className="container-page">
          <SectionHeader eyebrow="Process" title="A calm, clear path" className="mb-12" />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <li key={step.step} className="rounded-md border border-ink/8 bg-ivory/70 p-5">
                <p className="font-display text-3xl text-sage">{step.step}</p>
                <h3 className="mt-3 font-display text-xl text-ink">{step.title}</h3>
                <p className="mt-2 text-sm text-ink/65">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Fit"
              title="Who it’s for"
              description="If any of these sound like you, a discovery call is a good next step."
              className="mb-8"
            />
            <ul className="space-y-4">
              {whoItsFor.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-sage/50 pl-4 text-sm leading-relaxed text-ink/75"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader
              eyebrow="Outcomes"
              title="Case-study style notes"
              description="Composite / placeholder examples—replace with approved client stories."
              className="mb-8"
            />
            <ul className="space-y-4">
              {caseStudies.map((cs) => (
                <Card as="li" key={cs.id}>
                  <p className="text-xs uppercase tracking-[0.12em] text-sage">
                    {cs.clientType}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-ink">{cs.title}</h3>
                  <p className="mt-2 text-sm text-ink/70">{cs.result}</p>
                  <p className="mt-3 text-xs font-medium text-brass">{cs.metric}</p>
                </Card>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <TestimonialGrid facet="Services" limit={2} title="Client voices" />

      <section className="section-pad pt-0">
        <div className="container-page max-w-3xl">
          <SectionHeader eyebrow="FAQ" title="Common questions" className="mb-8" />
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="cursor-pointer list-none font-medium text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span className="text-sage transition group-open:rotate-45">+</span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Start here"
        title="Book a discovery call"
        description="Share your renewal timeline, workshop goals, or speaking brief. I’ll reply with fit and next steps."
        primary={{ href: "/contact", label: "Contact" }}
        secondary={{ href: "/about", label: "About the practice" }}
      />
    </>
  );
}
