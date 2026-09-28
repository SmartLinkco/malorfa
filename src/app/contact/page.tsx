import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for consulting, speaking, plants, media, or other inquiries.",
  openGraph: {
    title: `Contact · ${site.brand}`,
    description: "Consulting, speaking, plants, media, and more.",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="section-pad border-b border-ink/8 bg-stone/40">
        <div className="container-page max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl text-balance">
            Let’s find the right conversation
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink/70">
            Consulting, speaking, plant partnerships, media—or something else.
            Choose a topic so the reply can be useful.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="Message"
              title="Send a note"
              description="UI-only form — connect a backend before launch (see README)."
              className="mb-8"
            />
            <ContactForm />
          </div>

          <aside className="space-y-8 lg:pl-4">
            <div className="rounded-md border border-ink/8 bg-ivory/80 p-6">
              <h2 className="font-display text-2xl text-ink">Direct</h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-sage">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${site.email}`}
                      className="text-ink/80 underline-offset-2 hover:underline"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-sage">
                    Phone
                  </dt>
                  <dd className="mt-1 text-ink/80">{site.phone}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-sage">
                    Based in
                  </dt>
                  <dd className="mt-1 text-ink/80">{site.location}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-md border border-forest/20 bg-forest p-6 text-ivory">
              <h2 className="font-display text-2xl">Calendar stub</h2>
              <p className="mt-3 text-sm text-ivory/75">
                Prefer to book time directly? Link your scheduling tool here
                (Calendly, SavvyCal, etc.).
              </p>
              <div className="mt-5">
                <Button href={site.calendarUrl} variant="inverse">
                  Open calendar (placeholder)
                </Button>
              </div>
              <p className="mt-3 text-xs text-ivory/45">
                TODO: replace site.calendarUrl in content/site.ts
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
