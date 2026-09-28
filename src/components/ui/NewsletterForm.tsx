"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to email provider (Buttondown, ConvertKit, Resend, etc.)
    setStatus("done");
  }

  return (
    <div className={compact ? "" : "rounded-md border border-ink/8 bg-stone/60 p-6 md:p-8"}>
      {!compact ? (
        <>
          <h3 className="font-display text-2xl text-ink">Stay in the loop</h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/65">
            {site.newsletterNote}
          </p>
        </>
      ) : null}
      {status === "done" ? (
        <p className="mt-4 text-sm text-forest" role="status">
          Thanks — this is a UI stub. Connect a provider before launch.
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          className={`flex flex-col gap-3 sm:flex-row ${compact ? "" : "mt-5"}`}
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="min-w-0 flex-1 rounded-sm border border-ink/15 bg-ivory px-3 py-2.5 text-sm text-ink placeholder:text-ink/40 focus-visible:border-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/25"
          />
          <Button type="submit" size="md">
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
}
