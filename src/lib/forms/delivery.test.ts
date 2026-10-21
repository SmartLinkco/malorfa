import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { defaultAdminEmail, defaultFromEmail, emailSiteUrl, emailSocials } from "@/lib/email/brand";
import { contactPayloads, renderAdminNotification } from "@/lib/email/templates";
import { readResendConfig, sendContactEmails } from "@/lib/email/resend";
import { checkSpam, isAllowedOrigin, limitFor, resetRateLimits } from "@/lib/forms/guard";
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

  it("rate limits a burst from one address", () => {
    resetRateLimits();
    for (let i = 0; i < 5; i += 1) {
      assert.equal(limitFor("contact", "203.0.113.5").ok, true);
    }
    assert.equal(limitFor("contact", "203.0.113.5").ok, false);
    assert.equal(limitFor("contact", "203.0.113.9").ok, true);
  });

  it("accepts the site origin and rejects a foreign one", () => {
    assert.equal(isAllowedOrigin(null, "malorfa.com"), true);
    assert.equal(isAllowedOrigin("https://malorfa.com", "malorfa.com"), true);
    assert.equal(isAllowedOrigin("https://preview.vercel.app", "preview.vercel.app"), true);
    assert.equal(isAllowedOrigin("https://evil.example", "malorfa.com"), false);
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
