import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { defaultAdminEmail, defaultFromEmail, emailSiteUrl, emailSocials } from "@/lib/email/brand";
import { contactPayloads, renderAdminNotification } from "@/lib/email/templates";
import { readResendConfig, sendContactEmails } from "@/lib/email/resend";
import { POST as contactPost } from "@/app/api/contact/route";
import { checkSpam, isAllowedOrigin, resetRateLimits } from "@/lib/forms/guard";
import { consumeLimit } from "@/lib/forms/limits";
import { verifyTurnstile } from "@/lib/forms/turnstile";
import { validateContact, validateNewsletterEmail } from "@/lib/forms/validate";
import { subscribeToNewsletter } from "@/lib/newsletter/buttondown";
import type { ContactMail } from "@/lib/email/templates";

const secret = "super-secret-value-should-not-leak";

const validBody = {
  name: "Abena Owusu",
  email: "Abena@Example.com",
  topic: "consulting",
  message: "We need underwriting support before a renewal in Accra.",
  hp_field: "",
  startedAt: Date.now() - 10_000,
};

const mail: ContactMail = {
  name: 'Abena <script>alert("x")</script>',
  email: "abena@example.com",
  topic: "consulting",
  topicLabel: "Consulting / risk & insurance",
  message: "Hello & welcome.\n<script>alert(1)</script>",
  submittedAt: new Date("2026-10-21T18:26:00.000Z"),
};

afterEach(() => {
  delete process.env.RESEND_API_KEY;
  delete process.env.RESEND_FROM_EMAIL;
  delete process.env.CONTACT_ADMIN_EMAIL;
  delete process.env.BUTTONDOWN_API_KEY;
});

describe("validation", () => {
  it("accepts a normal contact note and lowercases the email", () => {
    const result = validateContact(validBody);
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.value.email, "abena@example.com");
    assert.equal(result.value.topicLabel, "Consulting / risk & insurance");
  });

  it("rejects an empty note with field errors", () => {
    const result = validateContact({});
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.ok(result.fieldErrors.name);
    assert.ok(result.fieldErrors.email);
    assert.ok(result.fieldErrors.topic);
    assert.ok(result.fieldErrors.message);
  });

  it("rejects a short message and an unknown topic", () => {
    const result = validateContact({ ...validBody, message: "too short", topic: "spam" });
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.match(result.fieldErrors.message ?? "", /at least/i);
    assert.match(result.fieldErrors.topic ?? "", /topic/i);
  });

  it("rejects header-breaking addresses", () => {
    assert.equal(validateNewsletterEmail({ email: "a@b.com\nBcc: x" }).ok, false);
    assert.equal(validateNewsletterEmail({ email: "not-an-email" }).ok, false);
    assert.equal(validateNewsletterEmail({ email: "user@localhost" }).ok, false);
    assert.equal(validateNewsletterEmail({ email: "a@b.c" }).ok, false);
    const ok = validateNewsletterEmail({ email: "reader@example.com" });
    assert.equal(ok.ok, true);
  });
});

describe("spam guards", () => {
  it("pretends success when the honeypot is filled", () => {
    const result = checkSpam({ ...validBody, hp_field: "https://spam.example" });
    assert.equal(result.action, "pretend-success");
  });

  it("rejects an instant submit and a missing timestamp", () => {
    assert.equal(checkSpam({ ...validBody, startedAt: Date.now() }).action, "reject");
    assert.equal(checkSpam({ ...validBody, startedAt: undefined }).action, "reject");
  });

  it("allows a note filled in after a short pause", () => {
    assert.equal(checkSpam(validBody).action, "allow");
  });

  it("rate limits a burst from one address without shared storage", async () => {
    resetRateLimits();
    for (let i = 0; i < 5; i += 1) {
      assert.equal((await consumeLimit("contact", "203.0.113.5", {})).ok, true);
    }
    assert.equal((await consumeLimit("contact", "203.0.113.5", {})).ok, false);
    assert.equal((await consumeLimit("contact", "203.0.113.9", {})).ok, true);
  });

  it("accepts the site origin and rejects a foreign one", () => {
    assert.equal(isAllowedOrigin(null, "malorfa.com"), true);
    assert.equal(isAllowedOrigin("https://malorfa.com", "malorfa.com"), true);
    assert.equal(isAllowedOrigin("https://preview.vercel.app", "preview.vercel.app"), true);
    assert.equal(isAllowedOrigin("https://evil.example", "malorfa.com"), false);
  });
});

describe("shared rate limits", () => {
  const redisEnv = { UPSTASH_REDIS_REST_URL: "https://redis.example", UPSTASH_REDIS_REST_TOKEN: secret };

  it("counts in Redis and never sends the raw identifier", async () => {
    const original = globalThis.fetch;
    let sent = "";
    globalThis.fetch = async (input, init) => {
      assert.equal(String(input), "https://redis.example/pipeline");
      assert.equal(new Headers(init?.headers).get("authorization"), `Bearer ${secret}`);
      sent = String(init?.body);
      return new Response(JSON.stringify([{ result: 4 }, { result: 1 }]));
    };
    try {
      assert.equal((await consumeLimit("contactRecipient", "abena@example.com", redisEnv)).ok, false);
      assert.equal(sent.includes("abena@example.com"), false);
      assert.match(sent, /INCR/);
    } finally {
      globalThis.fetch = original;
    }
  });

  it("falls back to the local limiter when Redis is unreachable", async () => {
    resetRateLimits();
    const original = globalThis.fetch;
    globalThis.fetch = async () => {
      throw new Error("down");
    };
    try {
      assert.equal((await consumeLimit("contact", "203.0.113.20", redisEnv)).ok, true);
    } finally {
      globalThis.fetch = original;
    }
  });
});

describe("turnstile", () => {
  it("is skipped until a secret is set", async () => {
    assert.deepEqual(await verifyTurnstile(undefined, "203.0.113.5", {}), { ok: true, skipped: true });
  });

  it("refuses a missing token without calling Cloudflare", async () => {
    const original = globalThis.fetch;
    globalThis.fetch = async () => assert.fail("should not call Cloudflare");
    try {
      const result = await verifyTurnstile("", "203.0.113.5", { TURNSTILE_SECRET_KEY: secret });
      assert.equal(result.ok, false);
    } finally {
      globalThis.fetch = original;
    }
  });

  it("accepts a valid token and refuses when Cloudflare is unreachable", async () => {
    const original = globalThis.fetch;
    const env = { TURNSTILE_SECRET_KEY: secret };
    try {
      globalThis.fetch = async () => new Response(JSON.stringify({ success: true }));
      assert.equal((await verifyTurnstile("token", "203.0.113.5", env)).ok, true);
      globalThis.fetch = async () => {
        throw new Error("down");
      };
      assert.equal((await verifyTurnstile("token", "203.0.113.5", env)).ok, false);
    } finally {
      globalThis.fetch = original;
    }
  });
});

describe("contact route", () => {
  const post = (body: unknown) =>
    contactPost(
      new Request("https://www.malorfa.com/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          origin: "https://www.malorfa.com",
          "x-forwarded-for": "203.0.113.40",
        },
        body: JSON.stringify(body),
      }),
    );

  it("doesn't use up attempts on validation errors", async () => {
    resetRateLimits();
    process.env.TURNSTILE_SECRET_KEY = secret;
    try {
      for (let i = 0; i < 8; i += 1) {
        const response = await post({ ...validBody, startedAt: Date.now() - 10_000, message: "short" });
        assert.equal(response.status, 400);
      }
      const blockedByTurnstile = await post({ ...validBody, startedAt: Date.now() - 10_000 });
      assert.equal(blockedByTurnstile.status, 403);
    } finally {
      delete process.env.TURNSTILE_SECRET_KEY;
    }
  });

  it("stops sending to one address after the daily allowance", async () => {
    resetRateLimits();
    process.env.RESEND_API_KEY = secret;
    const original = globalThis.fetch;
    let emails = 0;
    globalThis.fetch = async () => {
      emails += 1;
      return new Response(JSON.stringify({ id: "email" }));
    };
    try {
      const statuses: number[] = [];
      for (let i = 0; i < 4; i += 1) {
        const response = await post({ ...validBody, startedAt: Date.now() - 10_000 });
        statuses.push(response.status);
      }
      assert.deepEqual(statuses, [200, 200, 200, 429]);
      assert.equal(emails, 6);
    } finally {
      globalThis.fetch = original;
    }
  });
});

describe("email templates", () => {
  it("escapes user content and includes the brand, time, and socials", () => {
    const rendered = renderAdminNotification(mail);
    assert.equal(rendered.html.includes("<script>"), false);
    assert.match(rendered.html, /&lt;script&gt;/);
    assert.match(rendered.html, /Hello &amp; welcome/);
    assert.match(rendered.html, /Consulting \/ risk &amp; insurance/);
    assert.match(rendered.html, /Ghana time/);
    assert.match(rendered.html, new RegExp(emailSiteUrl));
    assert.match(rendered.html, /Cormorant Garamond/);
    assert.match(rendered.html, /#2c4a3e/i);
    for (const social of emailSocials) {
      assert.match(rendered.html, new RegExp(social.href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
    }
    assert.match(rendered.text, /<script>alert\(1\)<\/script>/);
    assert.match(rendered.text, /https:\/\/malorfa.com/);
  });

  it("sets reply-to on the admin note and the confirmation", () => {
    const payloads = contactPayloads(mail, {
      from: defaultFromEmail,
      admin: defaultAdminEmail,
    });
    assert.equal(payloads.admin.reply_to, mail.email);
    assert.deepEqual(payloads.admin.to, [defaultAdminEmail]);
    assert.equal(payloads.confirmation.reply_to, defaultAdminEmail);
    assert.deepEqual(payloads.confirmation.to, [mail.email]);
    assert.equal(payloads.admin.from, defaultFromEmail);
    assert.match(payloads.confirmation.text, /I'll be in touch/);
    assert.match(payloads.confirmation.html, /Consulting \/ risk &amp; insurance/);
  });

  it("never repeats submitted text in the confirmation", () => {
    const marker = "visit-attacker-site.example";
    const { admin, confirmation } = contactPayloads(
      { ...mail, name: `Name ${marker}`, message: `Your account is locked. Go to ${marker} now.` },
      { from: defaultFromEmail, admin: defaultAdminEmail },
    );

    assert.equal(confirmation.subject.includes(marker), false);
    assert.equal(confirmation.html.includes(marker), false);
    assert.equal(confirmation.text.includes(marker), false);
    assert.equal(admin.html.includes(marker), true);
    assert.equal(admin.text.includes(marker), true);
  });
});

describe("configuration", () => {
  it("names a missing Resend key without echoing a value", () => {
    const result = readResendConfig({ RESEND_API_KEY: "" });
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.match(result.message, /RESEND_API_KEY/);
    assert.equal(result.message.includes(secret), false);
  });

  it("rejects a bad from address without returning it", () => {
    const result = readResendConfig({
      RESEND_API_KEY: secret,
      RESEND_FROM_EMAIL: `not-an-email ${secret}`,
    });
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.match(result.message, /RESEND_FROM_EMAIL/);
    assert.equal(result.message.includes(secret), false);
  });

  it("uses the documented defaults", () => {
    const result = readResendConfig({ RESEND_API_KEY: "re_test" });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.config.from, defaultFromEmail);
    assert.equal(result.config.admin, defaultAdminEmail);
  });
});

describe("providers", () => {
  it("sends the admin email before the confirmation", async () => {
    const calls: Array<{ url: string; body: { reply_to?: string; to?: string[] } }> = [];
    const original = globalThis.fetch;
    globalThis.fetch = async (input, init) => {
      calls.push({
        url: String(input),
        body: JSON.parse(String(init?.body)) as { reply_to?: string; to?: string[] },
      });
      const auth = new Headers(init?.headers).get("authorization") ?? "";
      assert.equal(auth, `Bearer ${secret}`);
      return new Response(JSON.stringify({ id: "email_1" }), { status: 200 });
    };

    try {
      const result = await sendContactEmails(
        { apiKey: secret, from: defaultFromEmail, admin: defaultAdminEmail },
        { ...mail, name: "Abena Owusu", message: "A long enough note for the board." },
      );
      assert.equal(result.ok, true);
      assert.equal(calls.length, 2);
      assert.equal(calls[0]?.url, "https://api.resend.com/emails");
      assert.equal(calls[0]?.body.reply_to, mail.email);
      assert.equal(calls[1]?.body.reply_to, defaultAdminEmail);
      assert.equal(JSON.stringify(result).includes(secret), false);
    } finally {
      globalThis.fetch = original;
    }
  });

  it("treats an existing Buttondown subscriber as a success", async () => {
    const original = globalThis.fetch;
    globalThis.fetch = async (_input, init) => {
      const auth = new Headers(init?.headers).get("authorization");
      assert.equal(auth, `Token ${secret}`);
      const body = JSON.parse(String(init?.body)) as { email_address?: string; ip_address?: string };
      assert.equal(body.email_address, "reader@example.com");
      assert.equal(body.ip_address, "203.0.113.8");
      return new Response(JSON.stringify({ code: "email_already_exists", detail: "exists" }), {
        status: 400,
      });
    };

    try {
      const result = await subscribeToNewsletter("reader@example.com", "203.0.113.8", {
        BUTTONDOWN_API_KEY: secret,
      });
      assert.equal(result.ok, true);
      if (!result.ok) return;
      assert.match(result.message, /already subscribed/i);
      assert.equal(result.message.includes(secret), false);
    } finally {
      globalThis.fetch = original;
    }
  });

  it("fails clearly when the Buttondown key is missing", async () => {
    let called = false;
    const original = globalThis.fetch;
    globalThis.fetch = async () => {
      called = true;
      return new Response(null, { status: 500 });
    };
    try {
      const result = await subscribeToNewsletter("reader@example.com", null, {});
      assert.equal(called, false);
      assert.equal(result.ok, false);
      if (result.ok) return;
      assert.equal(result.status, 503);
      assert.match(result.message, /BUTTONDOWN_API_KEY/);
    } finally {
      globalThis.fetch = original;
    }
  });
});
