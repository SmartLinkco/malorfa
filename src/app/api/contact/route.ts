import { defaultAdminEmail } from "@/lib/email/brand";
import { sendContactEmails, readResendConfig } from "@/lib/email/resend";
import { checkSpam, clientIp, isAllowedOrigin, readJsonBody } from "@/lib/forms/guard";
import { consumeLimit } from "@/lib/forms/limits";
import type { FormResponse } from "@/lib/forms/submit";
import { verifyTurnstile } from "@/lib/forms/turnstile";
import { isRecord, validateContact } from "@/lib/forms/validate";

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
      message: "Thank you. Your note is with Malorfa, and a confirmation is on its way.",
    });
  }
  if (spam.action === "reject") {
    return json({ ok: false, message: spam.message }, 400);
  }

  const contact = validateContact(parsed.value);
  if (!contact.ok) {
    return json(
      {
        ok: false,
        message: "Please check the highlighted fields and try again.",
        fieldErrors: contact.fieldErrors,
      },
      400,
    );
  }

  // Limits are counted from here on, so fixing a typo doesn't use up an attempt.
  const ip = clientIp(request);
  if (!(await consumeLimit("contact", ip)).ok) {
    return tooMany("Too many notes from this connection. Please wait a few minutes and try again.");
  }

  const token = isRecord(parsed.value) ? parsed.value.turnstileToken : undefined;
  const human = await verifyTurnstile(token, ip);
  if (!human.ok) {
    return json(
      {
        ok: false,
        message: `We couldn't complete the security check. Please try again, or email ${defaultAdminEmail}.`,
      },
      403,
    );
  }

  const config = readResendConfig();
  if (!config.ok) return json({ ok: false, message: config.message }, 503);

  // Only attempts that passed the checks above can use up these shared allowances.
  if (!(await consumeLimit("contactRecipient", contact.value.email)).ok) {
    return tooMany(`This address has sent several notes today. Please email ${defaultAdminEmail}.`);
  }
  if (!(await consumeLimit("contactDaily", "site")).ok) {
    return tooMany(`The form is busy today. Please email ${defaultAdminEmail}.`);
  }

  const sent = await sendContactEmails(config.config, {
    ...contact.value,
    submittedAt: new Date(),
  });
  if (!sent.ok) return json({ ok: false, message: sent.message }, 502);

  return json({
    ok: true,
    message: "Thank you. Your note is with Malorfa, and a confirmation is on its way.",
  });
}
