import { honeypotField, maxSubmitMs, minSubmitMs, rateLimits } from "@/lib/forms/constants";
import { isRecord } from "@/lib/forms/validate";

const allowedHosts = new Set(["malorfa.com", "www.malorfa.com", "malorfa.vercel.app"]);

const hits = new Map<string, number[]>();

export type SpamResult =
  | { action: "allow" }
  | { action: "pretend-success" }
  | { action: "reject"; message: string };

export function isAllowedOrigin(origin: string | null, host: string | null): boolean {
  if (!origin) return true;

  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") return false;
  if (host && url.host === host) return true;
  return url.protocol === "https:" && allowedHosts.has(url.hostname);
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const candidate = (forwarded?.split(",")[0] ?? request.headers.get("x-real-ip") ?? "").trim();
  if (!candidate || candidate.length > 64 || /[\s,]/.test(candidate)) return "unknown";
  return candidate;
}

/** Best-effort, per server instance. Paired with the honeypot and minimum submit time. */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now = Date.now(),
): { ok: true } | { ok: false; retryAfterSec: number } {
  const windowStart = now - windowMs;
  const recent = (hits.get(key) ?? []).filter((stamp) => stamp > windowStart);

  if (recent.length >= limit) {
    hits.set(key, recent);
    const retryAfterSec = Math.max(1, Math.ceil((recent[0] + windowMs - now) / 1000));
    return { ok: false, retryAfterSec };
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > 5000) {
    const oldest = hits.keys().next().value;
    if (oldest) hits.delete(oldest);
  }

  return { ok: true };
}

export function resetRateLimits(): void {
  hits.clear();
}

export function limitFor(kind: keyof typeof rateLimits, ip: string, now = Date.now()) {
  const rule = rateLimits[kind];
  return rateLimit(`${kind}:${ip}`, rule.limit, rule.windowMs, now);
}

function readStartedAt(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && /^\d{10,16}$/.test(value)) return Number(value);
  return null;
}

export function checkSpam(body: unknown, now = Date.now()): SpamResult {
  if (!isRecord(body)) {
    return { action: "reject", message: "That request could not be read." };
  }

  const honeypot = body[honeypotField];
  const filled =
    typeof honeypot === "string" ? honeypot.trim().length > 0 : honeypot != null && honeypot !== "";
  if (filled) return { action: "pretend-success" };

  const startedAt = readStartedAt(body.startedAt);
  if (startedAt === null) {
    return { action: "reject", message: "Refresh the page and try again." };
  }

  if (startedAt > now + 2 * 60 * 1000 || now - startedAt > maxSubmitMs) {
    return {
      action: "reject",
      message: "This page has been open a long time. Refresh it, then send again.",
    };
  }

  if (now - startedAt < minSubmitMs) {
    return { action: "reject", message: "Please wait a moment, then send again." };
  }

  return { action: "allow" };
}

export async function readJsonBody(
  request: Request,
  maxChars = 20_000,
): Promise<{ ok: true; value: unknown } | { ok: false; status: number; message: string }> {
  const declared = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > maxChars) {
    return { ok: false, status: 413, message: "That message is too long." };
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return { ok: false, status: 400, message: "That request could not be read." };
  }

  if (raw.length > maxChars) {
    return { ok: false, status: 413, message: "That message is too long." };
  }

  try {
    return { ok: true, value: JSON.parse(raw) as unknown };
  } catch {
    return { ok: false, status: 400, message: "That request could not be read." };
  }
}
