"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Honeypot, useFormStartedAt } from "@/components/forms/FormGuards";
import { site } from "@/content/site";
import { fieldLimits, honeypotField } from "@/lib/forms/constants";
import { postForm } from "@/lib/forms/submit";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm({
  compact = false,
  tone = "light",
}: {
  compact?: boolean;
  tone?: "light" | "dark";
}) {
  const emailId = useId();
  const honeypotId = useId();
  const startedAt = useFormStartedAt();
  const pending = useRef(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;

    const data = new FormData(event.currentTarget);
    pending.current = true;
    setStatus("submitting");
    setMessage("");

    const result = await postForm("/api/newsletter", {
      email: data.get("email"),
      [honeypotField]: data.get(honeypotField),
      startedAt,
    });

    pending.current = false;
    setMessage(result.message);
    setStatus(result.ok ? "success" : "error");
  }

  const submitting = status === "submitting";
  const onDark = tone === "dark";

  return (
    <div className={compact ? "" : "rounded-md border border-ink/8 bg-stone/60 p-6 md:p-8"}>
      {!compact ? (
        <>
          <h2 className="font-display text-2xl text-ink">Stay in the loop</h2>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/65">{site.newsletterNote}</p>
        </>
      ) : null}

      {status === "success" ? (
        <div className={compact ? "" : "mt-5"} role="status">
          {!compact ? <p className="font-display text-2xl text-ink">You&apos;re in</p> : null}
          <p className={cn("text-sm leading-relaxed", onDark ? "text-ivory" : "text-forest", !compact && "mt-2")}>
            {message}
          </p>
          <button
            type="button"
            className={cn(
              "mt-3 text-xs underline underline-offset-2",
              onDark ? "text-ivory/70 hover:text-ivory" : "text-ink/55 hover:text-forest",
            )}
            onClick={() => {
              setEmail("");
              setMessage("");
              setStatus("idle");
            }}
          >
            Use a different email
          </button>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className={cn("relative flex flex-col gap-3", compact ? "" : "mt-5")}
          aria-busy={submitting}
        >
          <Honeypot id={honeypotId} />
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor={emailId}>
              Email address
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              required
              maxLength={fieldLimits.email.max}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={submitting}
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={status === "error" ? true : undefined}
              aria-describedby={status === "error" ? `${emailId}-error` : undefined}
              className={cn(
                "min-w-0 flex-1 rounded-sm border px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 disabled:opacity-60",
                onDark
                  ? "border-ivory/20 bg-ink text-ivory placeholder:text-ivory/40 focus-visible:border-moss focus-visible:ring-moss/40"
                  : "border-ink/15 bg-ivory text-ink placeholder:text-ink/40 focus-visible:border-forest focus-visible:ring-forest/25",
              )}
            />
            <Button type="submit" size="md" disabled={submitting}>
              {submitting ? "Subscribing…" : "Subscribe"}
            </Button>
          </div>
          {status === "error" ? (
            <p
              id={`${emailId}-error`}
              role="alert"
              className={cn("text-sm", onDark ? "text-ivory" : "text-forest")}
            >
              {message}
            </p>
          ) : (
            <p className={cn("text-xs", onDark ? "text-ivory/45" : "text-ink/45")}>
              Occasional notes. Unsubscribe any time.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
