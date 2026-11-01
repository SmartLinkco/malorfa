import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms",
  description: "The terms for using this site and its content.",
  path: "/terms",
});

const sections = [
  {
    title: "General information only",
    body: "Everything on this site is general information. It is not insurance, legal, or financial advice for your situation, and reading it does not create a client relationship. Advisory work begins only under a separate written agreement.",
  },
  {
    title: "Examples",
    body: "Scenarios on the services page are illustrative. They describe common situations rather than specific clients, and they are not a promise of any particular result.",
  },
  {
    title: "Plant and travel notes",
    body: "Plant care tips and travel notes reflect personal experience. Conditions differ, so please use your own judgment and check current local information.",
  },
  {
    title: "Content",
    body: "Unless stated otherwise, the writing and photographs here belong to Malorfa Aryee. Please ask before reusing them.",
  },
  {
    title: "Other sites",
    body: "Links to services such as Amazon, Calendly, and WhatsApp lead to sites with their own terms, which I don't control.",
  },
];

export default function TermsPage() {
  return (
    <div className="container-page section-pad max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">Terms</p>
      <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">Using this site</h1>
      <p className="mt-4 text-sm text-ink/70">Last updated 1 November 2026</p>
      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-2xl text-ink">{section.title}</h2>
            <p className="mt-2 leading-relaxed text-ink/75">{section.body}</p>
          </section>
        ))}
        <section>
          <h2 className="font-display text-2xl text-ink">Contact</h2>
          <p className="mt-2 leading-relaxed text-ink/75">
            Questions:{" "}
            <a className="text-forest underline underline-offset-2" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
