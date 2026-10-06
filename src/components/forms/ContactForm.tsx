"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";

const topics = [
  { value: "consulting", label: "Consulting / risk & insurance" },
  { value: "underwriting", label: "Underwriting" },
  { value: "pr", label: "PR" },
  { value: "speaking", label: "Speaking" },
  { value: "plants", label: "Plants / nursery partnership" },
  { value: "media", label: "Media / press" },
  { value: "other", label: "Other" },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "done">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: connect form backend (Formspree, Resend, server action, etc.)
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div
        className="rounded-md border border-forest/20 bg-sage/10 p-6"
        role="status"
      >
        <p className="font-display text-2xl text-ink">Message noted</p>
        <p className="mt-2 text-sm text-ink/70">
          This form is UI-only for now. Wire a backend before launch, or email{" "}
          <a className="underline underline-offset-2" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className="field-input"
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="field-input"
            placeholder="you@company.com"
          />
        </Field>
      </div>
      <Field label="Topic" htmlFor="topic">
        <select id="topic" name="topic" required className="field-input" defaultValue="">
          <option value="" disabled>
            Select a topic
          </option>
          {topics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Message" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="field-input resize-y"
          placeholder="How can I help?"
        />
      </Field>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg">
          Send message
        </Button>
        <p className="text-xs text-ink/50">
          TODO: form backend · no messages are stored yet
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink/80">
        {label}
      </label>
      {children}
    </div>
  );
}
