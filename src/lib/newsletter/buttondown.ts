import { defaultAdminEmail } from "@/lib/email/brand";

const alreadyCodes = new Set(["email_already_exists", "subscriber_already_exists"]);
const blockedCodes = new Set(["email_blocked", "subscriber_blocked", "subscriber_suppressed"]);

export type SubscribeResult =
  | { ok: true; message: string }
  | { ok: false; status: number; message: string };

function errorCode(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;
  if (typeof record.code === "string") return record.code;

  if (Array.isArray(record.detail)) {
    const first = record.detail[0];
    if (first && typeof first === "object") {
      const code = (first as { code?: unknown }).code;
      if (typeof code === "string") return code;
    }
  }

  if (typeof record.detail === "string" && /already exists|already subscribed/i.test(record.detail)) {
    return "email_already_exists";
  }

  return null;
}

function subscriberIp(ip: string | null): string | undefined {
  if (!ip || ip === "unknown") return undefined;
  const v4 = /^\d{1,3}(\.\d{1,3}){3}$/.test(ip);
  const v6 = ip.includes(":") && /^[0-9a-fA-F:]+$/.test(ip);
  return v4 || v6 ? ip : undefined;
}

export async function subscribeToNewsletter(
  email: string,
  ip: string | null,
  env: Record<string, string | undefined> = process.env,
): Promise<SubscribeResult> {
  const apiKey = env.BUTTONDOWN_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      message: "Newsletter is not configured yet. Add BUTTONDOWN_API_KEY on the server.",
    };
  }

  const payload: { email_address: string; ip_address?: string } = { email_address: email };
  const address = subscriberIp(ip);
  if (address) payload.ip_address = address;

  let response: Response;
  try {
    response = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12_000),
    });
  } catch (error) {
    console.error(
      "[newsletter] Buttondown request failed",
      error instanceof Error ? error.name : "Error",
    );
    return {
      ok: false,
      status: 502,
      message: "We couldn't subscribe that address. Please try again in a moment.",
    };
  }

  if (response.status === 200 || response.status === 201) {
    return {
      ok: true,
      message: "Thank you. Check your inbox to confirm — then you're on the list.",
    };
  }

  let code: string | null = null;
  try {
    code = errorCode(await response.json());
  } catch {
    code = null;
  }

  if (response.status === 400 && code && alreadyCodes.has(code)) {
    return {
      ok: true,
      message:
        "You're already subscribed. If the notes haven't started, look for an earlier confirmation email.",
    };
  }

  if (code && blockedCodes.has(code)) {
    return {
      ok: false,
      status: 400,
      message: `That address can't be subscribed. If this is a mistake, email ${defaultAdminEmail}.`,
    };
  }

  if (response.status === 401 || response.status === 403) {
    console.error("[newsletter] Buttondown refused the API key", response.status, code);
    return {
      ok: false,
      status: 503,
      message: "Newsletter is not configured correctly. Check BUTTONDOWN_API_KEY on the server.",
    };
  }

  console.error("[newsletter] Buttondown subscribe failed", response.status, code ?? "unknown");
  return {
    ok: false,
    status: 502,
    message: "We couldn't subscribe that address. Please try again in a moment.",
  };
}
