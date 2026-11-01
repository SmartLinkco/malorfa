const verifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export type TurnstileResult = { ok: true; skipped: boolean } | { ok: false };

/**
 * Checks a Cloudflare Turnstile token. Enforced once TURNSTILE_SECRET_KEY is set. If
 * Cloudflare can't be reached the request is refused, because the forms send email.
 */
export async function verifyTurnstile(
  token: unknown,
  ip: string,
  env: Record<string, string | undefined> = process.env,
): Promise<TurnstileResult> {
  const secret = env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return { ok: true, skipped: true };

  if (typeof token !== "string" || token.length === 0 || token.length > 2048) {
    return { ok: false };
  }

  try {
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        ...(ip !== "unknown" ? { remoteip: ip } : {}),
      }),
      signal: AbortSignal.timeout(8000),
    });
    const data = (await response.json()) as { success?: unknown; "error-codes"?: unknown };
    if (data.success === true) return { ok: true, skipped: false };

    console.error("[turnstile] Token refused", response.status, data["error-codes"]);
    return { ok: false };
  } catch (error) {
    console.error("[turnstile] Request failed", error instanceof Error ? error.name : "Error");
    return { ok: false };
  }
}
