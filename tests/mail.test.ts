import { describe, it, expect, vi, beforeEach } from "vitest";

const sendMailMock = vi.fn().mockResolvedValue({ messageId: "fake-id" });

vi.mock("nodemailer", () => ({
  default: {
    createTransport: vi.fn(() => ({ sendMail: sendMailMock })),
  },
}));

import { sendDemoMail } from "@/lib/mail";

describe("sendDemoMail", () => {
  beforeEach(() => {
    sendMailMock.mockClear();
    process.env.GMAIL_SMTP_USER = "info@collbrai.com";
    process.env.GMAIL_SMTP_APP_PASSWORD = "fakepass";
    process.env.DEMO_REQUEST_TO = "info@collbrai.com";
  });

  it("sends mail with composed subject and body", async () => {
    const result = await sendDemoMail({
      name: "Ali Veli",
      email: "ali@firma.com",
      company: "ACME",
      teamSize: "3-15",
      message: "Test",
      meta: { ip: "1.2.3.4", userAgent: "Mozilla", timestamp: "2026-05-22T12:00:00Z" },
    });
    expect(result.ok).toBe(true);
    expect(sendMailMock).toHaveBeenCalledOnce();
    const call = sendMailMock.mock.calls[0][0];
    expect(call.to).toBe("info@collbrai.com");
    expect(call.subject).toContain("Demo");
    expect(call.subject).toContain("ACME");
    expect(call.text).toContain("ali@firma.com");
    expect(call.text).toContain("3-15");
    expect(call.text).toContain("1.2.3.4");
  });

  it("returns ok:false when transport throws", async () => {
    sendMailMock.mockRejectedValueOnce(new Error("smtp down"));
    const result = await sendDemoMail({
      name: "X", email: "x@y.com", company: "Z", teamSize: "3-15",
      meta: { ip: "0.0.0.0", userAgent: "", timestamp: "" },
    });
    expect(result.ok).toBe(false);
  });
});
