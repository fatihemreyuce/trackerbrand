import { describe, it, expect } from "vitest";
import { demoSchema } from "@/lib/demo-schema";

describe("demoSchema", () => {
  const valid = {
    name: "Ahmet Yılmaz",
    email: "ahmet@firma.com",
    company: "ACME Yazılım",
    teamSize: "3-15" as const,
    message: "Sprint takibi arıyoruz",
    honeypot: "",
  };

  it("accepts a valid payload", () => {
    expect(demoSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects empty name", () => {
    const r = demoSchema.safeParse({ ...valid, name: "" });
    expect(r.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const r = demoSchema.safeParse({ ...valid, email: "nope" });
    expect(r.success).toBe(false);
  });

  it("rejects bad teamSize", () => {
    const r = demoSchema.safeParse({ ...valid, teamSize: "huge" as never });
    expect(r.success).toBe(false);
  });

  it("rejects message > 500 chars", () => {
    const r = demoSchema.safeParse({ ...valid, message: "a".repeat(501) });
    expect(r.success).toBe(false);
  });

  it("allows empty message (optional)", () => {
    const r = demoSchema.safeParse({ ...valid, message: "" });
    expect(r.success).toBe(true);
  });

  it("rejects non-empty honeypot (bot)", () => {
    const r = demoSchema.safeParse({ ...valid, honeypot: "I am a bot" });
    expect(r.success).toBe(false);
  });
});
