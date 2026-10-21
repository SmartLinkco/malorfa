import { sendContactEmails, readResendConfig } from "@/lib/email/resend";
import { checkSpam, clientIp, isAllowedOrigin, limitFor, readJsonBody } from "@/lib/forms/guard";
import type { FormResponse } from "@/lib/forms/submit";
import { validateContact } from "@/lib/forms/validate";

function json(body: FormResponse, status = 200) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request.headers.get("origin"), request.headers.get("host"))) {
    return json({ ok: false, message: "This form only accepts notes from the site." }, 403);
  }

  const parsed = await readJsonBody(request);
  if (!parsed.ok) return json({ ok: false, message: parsed.message }, parsed.status);

  const ip = clientIp(request);
  const limited = limitFor("contact", ip);
  if (!limited.ok) {
    return json(
      {
        ok: false,
        message: "Too many notes from this connection. Please wait a few minutes and try again.",
      },
      429,
    );
  }

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

  const config = readResendConfig();
  if (!config.ok) return json({ ok: false, message: config.message }, 503);

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
