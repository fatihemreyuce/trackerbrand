const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

type Entry = { count: number; windowStart: number };
const store = new Map<string, Entry>();

export function checkRateLimit(ip: string): { ok: boolean } {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now });
    return { ok: true };
  }

  if (entry.count >= MAX_PER_WINDOW) {
    return { ok: false };
  }

  entry.count += 1;
  return { ok: true };
}

export function resetRateLimit() {
  store.clear();
}
