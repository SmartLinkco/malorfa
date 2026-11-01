import { createHash } from "node:crypto";
import { rateLimits } from "@/lib/forms/constants";
import { rateLimit } from "@/lib/forms/guard";

type Env = Record<string, string | undefined>;

export type LimitKind = keyof typeof rateLimits;

function redisConfig(env: Env): { url: string; token: string } | null {
  const url = (env.UPSTASH_REDIS_REST_URL ?? env.KV_REST_API_URL)?.trim();
  const token = (env.UPSTASH_REDIS_REST_TOKEN ?? env.KV_REST_API_TOKEN)?.trim();
  if (!url || !token || !url.startsWith("https://")) return null;
  return { url: url.replace(/\/$/, ""), token };
}

/** Counts one attempt in a fixed window. Returns null if Redis can't give an answer. */
async function redisCount(
  config: { url: string; token: string },
  key: string,
  windowMs: number,
  now: number,
): Promise<number | null> {
  const bucketKey = `rl:${key}:${Math.floor(now / windowMs)}`;
  try {
    const response = await fetch(`${config.url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", bucketKey],
        ["PEXPIRE", bucketKey, windowMs * 2],
      ]),
      signal: AbortSignal.timeout(1500),
    });
    if (!response.ok) {
      console.error("[limits] Redis rejected a request", response.status);
      return null;
    }
    const data = (await response.json()) as Array<{ result?: unknown }>;
    const count = data[0]?.result;
    return typeof count === "number" ? count : null;
  } catch (error) {
    console.error("[limits] Redis request failed", error instanceof Error ? error.name : "Error");
    return null;
  }
}

/**
 * Shared across server instances when Redis is configured. Falls back to the per-instance
 * limiter if it isn't, or if it can't be reached, so an outage never closes the forms.
 * Identifiers are hashed so no addresses or IPs are stored in Redis.
 */
export async function consumeLimit(
  kind: LimitKind,
  identifier: string,
  env: Env = process.env,
  now = Date.now(),
): Promise<{ ok: boolean }> {
  const rule = rateLimits[kind];
  const hashed = createHash("sha256").update(identifier).digest("hex").slice(0, 32);
  const key = `${kind}:${hashed}`;

  const config = redisConfig(env);
  if (config) {
    const count = await redisCount(config, key, rule.windowMs, now);
    if (count !== null) return { ok: count <= rule.limit };
  }

  return { ok: rateLimit(key, rule.limit, rule.windowMs, now).ok };
}
