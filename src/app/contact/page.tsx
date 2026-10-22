import type { Metadata } from "next";
import { CalendlyEmbed } from "@/components/forms/CalendlyEmbed";
import { ContactForm } from "@/components/forms/ContactForm";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Consulting, speaking, plant partnerships, media — or something else. Write to Malorfa Aryee.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="section-pad border-b border-ink/8 bg-stone/40">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
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
          <MediaPlaceholder
            src={media.travelMustard.src}
            alt={media.travelMustard.alt}
            aspect="landscape"
            className="w-full"
            objectPosition="center 15%"
            priority
          />
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="Message"
              title="Send a note"
              description="Consulting, speaking, plant partnerships, media — or something else. Your note comes straight to my inbox."
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
                    WhatsApp / phone
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`https://wa.me/${site.phone.replace(/\D/g, "")}`}
                      className="text-ink/80 underline-offset-2 hover:underline"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-sage">
                    Based in
                  </dt>
                  <dd className="mt-1 text-ink/80">{site.location}</dd>
                </div>
              </dl>
            </div>

          </aside>
        </div>
      </section>

      <section className="section-pad border-t border-ink/8 bg-stone/40">
        <div className="container-page">
          <header className="mb-8 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-sage">
              Calendar
            </p>
            <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl text-balance">
              Book 30 minutes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/70 md:text-lg">
              Pick a time that works — consulting, speaking, or a short intro
              call.
            </p>
          </header>
          <div className="overflow-hidden rounded-md border border-ink/8 bg-canvas shadow-sm">
            <CalendlyEmbed url={site.calendlyEmbedUrl} />
          </div>
          <p className="mt-4 text-center text-sm text-ink/50">
            Prefer the full page?{" "}
            <a
              href={site.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest underline-offset-2 hover:underline"
            >
              Open Calendly
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
