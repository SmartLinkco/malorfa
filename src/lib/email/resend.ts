import { defaultAdminEmail, defaultFromEmail } from "@/lib/email/brand";
import { contactPayloads, type ContactMail } from "@/lib/email/templates";
import { normalizeEmail } from "@/lib/forms/validate";

const fromPattern = /^(?:([^<>]+)\s)?<([^<>]+)>$/;

export type ResendConfig = {
  apiKey: string;
  from: string;
  admin: string;
};

export function readResendConfig(
  env: Record<string, string | undefined> = process.env,
): { ok: true; config: ResendConfig } | { ok: false; message: string } {
  const apiKey = env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      message: `Contact form is not configured yet. Add RESEND_API_KEY on the server, or email ${defaultAdminEmail}.`,
    };
  }

  const from = env.RESEND_FROM_EMAIL?.trim() || defaultFromEmail;
  const admin = env.CONTACT_ADMIN_EMAIL?.trim() || defaultAdminEmail;

  if (!isFromAddress(from)) {
    return {
      ok: false,
      message: `Contact form is misconfigured. Check RESEND_FROM_EMAIL on the server, or email ${defaultAdminEmail}.`,
    };
  }

  if (!normalizeEmail(admin)) {
    return {
      ok: false,
      message: `Contact form is misconfigured. Check CONTACT_ADMIN_EMAIL on the server, or email ${defaultAdminEmail}.`,
    };
  }

  return { ok: true, config: { apiKey, from, admin } };
}

function isFromAddress(value: string): boolean {
  if (/[\r\n]/.test(value)) return false;
  const wrapped = value.match(fromPattern);
  if (wrapped) {
    const name = wrapped[1]?.trim() ?? "";
    return name.length > 0 && !/[\r\n<>]/.test(name) && normalizeEmail(wrapped[2]) !== null;
  }
  return normalizeEmail(value) !== null;
}

type SendResult = { ok: true } | { ok: false; message: string };

async function sendOne(apiKey: string, payload: unknown): Promise<SendResult> {
  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12_000),
    });
  } catch (error) {
    console.error(
      "[contact] Resend request failed",
      error instanceof Error ? error.name : "Error",
    );
    return {
      ok: false,
      message: `The message could not be sent. Please try again, or email ${defaultAdminEmail}.`,
    };
  }

  if (response.ok) return { ok: true };

  let errorName = "unknown";
  try {
    const body = (await response.json()) as { name?: unknown };
    if (typeof body.name === "string") errorName = body.name;
  } catch {
    errorName = "unreadable";
  }
  console.error("[contact] Resend rejected an email", response.status, errorName);

  return {
    ok: false,
    message: `The message could not be sent. Please try again, or email ${defaultAdminEmail}.`,
  };
}

export async function sendContactEmails(
  config: ResendConfig,
  input: ContactMail,
): Promise<SendResult> {
  const { admin, confirmation } = contactPayloads(input, {
    from: config.from,
    admin: config.admin,
  });

  const adminResult = await sendOne(config.apiKey, admin);
  if (!adminResult.ok) return adminResult;

  const confirmationResult = await sendOne(config.apiKey, confirmation);
  if (!confirmationResult.ok) {
    console.error("[contact] Confirmation failed after the admin email was accepted");
    return {
      ok: false,
      message:
        "Your note reached Malorfa, but the confirmation email could not be sent. There is no need to send it again.",
    };
  }

  return { ok: true };
}
