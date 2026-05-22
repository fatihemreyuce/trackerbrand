import { describe, it, expect, beforeEach, vi } from "vitest";
import { checkRateLimit, resetRateLimit } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimit();
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 4, 22, 12, 0, 0));
  });

  it("allows up to 3 requests per IP per minute", () => {
    expect(checkRateLimit("1.2.3.4")).toEqual({ ok: true });
    expect(checkRateLimit("1.2.3.4")).toEqual({ ok: true });
    expect(checkRateLimit("1.2.3.4")).toEqual({ ok: true });
  });

  it("rejects 4th request within the minute", () => {
    checkRateLimit("1.2.3.4");
    checkRateLimit("1.2.3.4");
    checkRateLimit("1.2.3.4");
    expect(checkRateLimit("1.2.3.4").ok).toBe(false);
  });

  it("resets after 60 seconds", () => {
    checkRateLimit("1.2.3.4");
    checkRateLimit("1.2.3.4");
    checkRateLimit("1.2.3.4");
    vi.advanceTimersByTime(60_001);
    expect(checkRateLimit("1.2.3.4")).toEqual({ ok: true });
  });

  it("tracks per-IP independently", () => {
    checkRateLimit("1.2.3.4");
    checkRateLimit("1.2.3.4");
    checkRateLimit("1.2.3.4");
    expect(checkRateLimit("5.6.7.8")).toEqual({ ok: true });
  });
});
