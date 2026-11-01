import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "What this site collects, who processes it, and how to ask for it to be removed.",
  path: "/privacy",
});

const sections = [
  {
    title: "Contact form",
    body: "When you send a note, I receive your name, email address, chosen topic, and message. They are delivered by email through Resend, which also sends your confirmation. I use them to reply to you, and your note is not added to the newsletter.",
  },
  {
    title: "Newsletter",
    body: "When you subscribe, your email address and IP address go to Buttondown, which runs the mailing list and helps filter out abuse. You will be asked to confirm your subscription, and you can unsubscribe at any time.",
  },
  {
    title: "Form protection",
    body: "To block automated abuse, both forms use Cloudflare Turnstile, which loads once you start filling one in and checks technical signals from your browser and IP address. Attempt counts are kept for a short time with Upstash, using scrambled (hashed) versions of email and IP addresses rather than the addresses themselves.",
  },
  {
    title: "Booking a call",
    body: "The contact page embeds Calendly for scheduling. Calendly loads on that page, may set its own cookies, and handles any details you enter under its own privacy policy.",
  },
  {
    title: "Hosting and your browser",
    body: "The site is hosted on Vercel, which processes standard technical data such as IP addresses to serve pages and protect the service. The site itself runs no analytics or advertising trackers. The daily plant tip saves today's date in your browser so it can refresh the next day.",
  },
  {
    title: "Your choices",
    body: "I don't sell your personal information. You can ask to see, correct, or delete what I hold about you by emailing the address below.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="container-page section-pad max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sage">Privacy</p>
      <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">Your information</h1>
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
            Questions or requests:{" "}
            <a className="text-forest underline underline-offset-2" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
