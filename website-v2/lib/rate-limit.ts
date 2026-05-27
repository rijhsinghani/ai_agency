/**
 * In-process sliding-window rate limiter.
 * Suitable for a single-instance Cloud Run service.
 * For multi-instance deployments, swap the Map for a Redis-backed store.
 */

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const store = new Map<string, RateLimitEntry>();

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5; // 5 subscribe attempts per key per minute

/**
 * Returns true if the key is within the allowed rate, false if it's over-limit.
 * Key is typically the client IP.
 */
export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    store.set(key, { count: 1, windowStart: now });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count += 1;
  return true;
}
