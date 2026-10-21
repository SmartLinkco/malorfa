"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Honeypot, useFormStartedAt } from "@/components/forms/FormGuards";
import { contactTopics, fieldLimits, honeypotField } from "@/lib/forms/constants";
import { postForm } from "@/lib/forms/submit";
import { site } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";
type FieldName = "name" | "email" | "topic" | "message";

const fields: FieldName[] = ["name", "email", "topic", "message"];

export function ContactForm() {
  const startedAt = useFormStartedAt();
  const pending = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    pending.current = true;
    setStatus("submitting");
    setFieldErrors({});
    setMessage("");

    const result = await postForm("/api/contact", {
      name: data.get("name"),
      email: data.get("email"),
      topic: data.get("topic"),
      message: data.get("message"),
      [honeypotField]: data.get(honeypotField),
      startedAt,
    });

    pending.current = false;

    if (result.ok) {
      setMessage(result.message);
      setStatus("success");
      return;
    }

    const nextErrors: Partial<Record<FieldName, string>> = {};
    for (const field of fields) {
      const value = result.fieldErrors?.[field];
      if (value) nextErrors[field] = value;
    }
    setFieldErrors(nextErrors);
    setMessage(result.message);
    setStatus("error");

    const first = fields.find((field) => nextErrors[field]);
    if (first) {
      document.getElementById(first)?.focus();
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-forest/20 bg-sage/10 p-6" role="status">
        <p className="font-display text-2xl text-ink">Message received</p>
        <p className="mt-2 text-sm leading-relaxed text-ink/75">{message}</p>
        <p className="mt-4 text-sm text-ink/60">
          You can also write directly to{" "}
          <a className="underline underline-offset-2" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} className="relative space-y-5" aria-busy={submitting}>
      <Honeypot id="contact-hp" />
      {status === "error" ? (
        <p className="rounded-sm border border-forest/20 bg-sage/10 px-3 py-2 text-sm text-ink" role="alert">
          {message}
        </p>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={fieldErrors.name}>
          <input
            id="name"
            name="name"
            required
            maxLength={fieldLimits.name.max}
            autoComplete="name"
            disabled={submitting}
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            className="field-input disabled:opacity-60"
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" htmlFor="email" error={fieldErrors.email}>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={fieldLimits.email.max}
            autoComplete="email"
            disabled={submitting}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className="field-input disabled:opacity-60"
            placeholder="you@company.com"
          />
        </Field>
      </div>
      <Field label="Topic" htmlFor="topic" error={fieldErrors.topic}>
        <select
          id="topic"
          name="topic"
          required
          defaultValue=""
          disabled={submitting}
          aria-invalid={fieldErrors.topic ? true : undefined}
          aria-describedby={fieldErrors.topic ? "topic-error" : undefined}
          className="field-input disabled:opacity-60"
        >
          <option value="" disabled>
            Select a topic
          </option>
          {contactTopics.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Message" htmlFor="message" error={fieldErrors.message}>
        <textarea
          id="message"
          name="message"
          required
          minLength={fieldLimits.message.min}
          maxLength={fieldLimits.message.max}
          rows={5}
          disabled={submitting}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
          className="field-input resize-y disabled:opacity-60"
          placeholder="How can I help?"
        />
      </Field>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : "Send message"}
        </Button>
        <p className="text-xs text-ink/50">
          This note is emailed to Malorfa. It is not added to the newsletter.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink/80">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-xs font-medium text-forest">
          {error}
        </p>
      ) : null}
    </div>
  );
}
