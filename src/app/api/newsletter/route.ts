import { checkSpam, clientIp, isAllowedOrigin, limitFor, readJsonBody } from "@/lib/forms/guard";
import type { FormResponse } from "@/lib/forms/submit";
import { validateNewsletterEmail } from "@/lib/forms/validate";
import { subscribeToNewsletter } from "@/lib/newsletter/buttondown";

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
  const limited = limitFor("newsletter", ip);
  if (!limited.ok) {
    return json(
      {
        ok: false,
        message: "Too many attempts from this connection. Please wait a few minutes and try again.",
      },
      429,
    );
  }

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

  const result = await subscribeToNewsletter(email.email, ip);
  if (!result.ok) return json({ ok: false, message: result.message }, result.status);

  return json({ ok: true, message: result.message });
}
