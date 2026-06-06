import { describe, it, expect, vi, beforeEach } from "vitest";
import { resetRateLimit } from "@/lib/rate-limit";

vi.mock("@/lib/mail", () => ({
  sendDemoMail: vi.fn().mockResolvedValue({ ok: true }),
}));

vi.mock("@/lib/save-contact", () => ({
  saveTrackerContact: vi.fn().mockResolvedValue({ ok: true }),
}));

vi.mock("next/headers", () => ({
  headers: async () =>
    new Headers({
      "x-forwarded-for": "9.9.9.9",
      "user-agent": "TestUA",
    }),
}));

import { submitDemoRequest } from "@/app/actions/submit-demo";
import { sendDemoMail } from "@/lib/mail";
import { saveTrackerContact } from "@/lib/save-contact";

const validInput = {
  name: "Test User",
  email: "test@firma.com",
  company: "TestCo",
  teamSize: "3-15" as const,
  message: "",
  honeypot: "",
};

describe("submitDemoRequest", () => {
  beforeEach(() => {
    resetRateLimit();
    vi.clearAllMocks();
  });

  it("returns ok:true and calls both sendDemoMail and saveTrackerContact", async () => {
    const result = await submitDemoRequest(validInput);
    expect(result.ok).toBe(true);
    expect(sendDemoMail).toHaveBeenCalledOnce();
    expect(saveTrackerContact).toHaveBeenCalledOnce();
  });

  it("returns validation errors when input is invalid", async () => {
    const result = await submitDemoRequest({ ...validInput, email: "bad" });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/mail/i);
  });

  it("rejects honeypot-filled input as spam without calling either backend", async () => {
    const result = await submitDemoRequest({ ...validInput, honeypot: "BUY VIAGRA" });
    expect(result.ok).toBe(false);
    expect(sendDemoMail).not.toHaveBeenCalled();
    expect(saveTrackerContact).not.toHaveBeenCalled();
  });

  it("rate limits after 3 submissions in a minute", async () => {
    await submitDemoRequest(validInput);
    await submitDemoRequest(validInput);
    await submitDemoRequest(validInput);
    const result = await submitDemoRequest(validInput);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/çok fazla|rate/i);
  });

  it("returns ok:true when mail fails but Firestore save succeeds", async () => {
    vi.mocked(sendDemoMail).mockResolvedValueOnce({ ok: false, error: "smtp" });
    const result = await submitDemoRequest(validInput);
    expect(result.ok).toBe(true);
  });

  it("returns ok:false only when BOTH mail and save fail", async () => {
    vi.mocked(sendDemoMail).mockResolvedValueOnce({ ok: false, error: "smtp" });
    vi.mocked(saveTrackerContact).mockResolvedValueOnce({ ok: false, error: "firestore" });
    const result = await submitDemoRequest(validInput);
    expect(result.ok).toBe(false);
  });
});
