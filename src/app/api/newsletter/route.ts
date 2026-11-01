import { checkSpam, clientIp, isAllowedOrigin, readJsonBody } from "@/lib/forms/guard";
import { consumeLimit } from "@/lib/forms/limits";
import type { FormResponse } from "@/lib/forms/submit";
import { verifyTurnstile } from "@/lib/forms/turnstile";
import { isRecord, validateNewsletterEmail } from "@/lib/forms/validate";
import { subscribeToNewsletter } from "@/lib/newsletter/buttondown";

function json(body: FormResponse, status = 200) {
  return Response.json(body, { status });
}

const tooMany = (message: string) => json({ ok: false, message }, 429);

export async function POST(request: Request) {
  if (!isAllowedOrigin(request.headers.get("origin"), request.headers.get("host"))) {
    return json({ ok: false, message: "This form only accepts notes from the site." }, 403);
  }

  const parsed = await readJsonBody(request);
  if (!parsed.ok) return json({ ok: false, message: parsed.message }, parsed.status);

  const spam = checkSpam(parsed.value);
  if (spam.action === "pretend-success") {
    return json({
      ok: true,
      message: "Thank you. Check your inbox to confirm — then you're on the list.",
    });
  }
  if (spam.action === "reject") {
    return json({ ok: false, message: spam.message }, 400);
  }

  const email = validateNewsletterEmail(parsed.value);
  if (!email.ok) return json({ ok: false, message: email.message }, 400);

  // Limits are counted from here on, so fixing a typo doesn't use up an attempt.
  const ip = clientIp(request);
  if (!(await consumeLimit("newsletter", ip)).ok) {
    return tooMany("Too many attempts from this connection. Please wait a few minutes and try again.");
  }

  const token = isRecord(parsed.value) ? parsed.value.turnstileToken : undefined;
  const human = await verifyTurnstile(token, ip);
  if (!human.ok) {
    return json(
      { ok: false, message: "We couldn't complete the security check. Please try again." },
      403,
    );
  }

  // Only attempts that passed the checks above can use up these shared allowances.
  if (!(await consumeLimit("newsletterRecipient", email.email)).ok) {
    return tooMany("This address has been tried several times today. Please check your inbox.");
  }
  if (!(await consumeLimit("newsletterDaily", "site")).ok) {
    return tooMany("Signups are busy today. Please try again tomorrow.");
  }

  const result = await subscribeToNewsletter(email.email, ip);
  if (!result.ok) return json({ ok: false, message: result.message }, result.status);

  return json({ ok: true, message: result.message });
}
