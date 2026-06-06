import { describe, it, expect } from "vitest";
import { buildContactDoc } from "@/lib/save-contact";

describe("buildContactDoc", () => {
  it("maps form input to the panel contact shape", () => {
    const doc = buildContactDoc({
      name: "Ada",
      email: "ada@example.com",
      company: "Acme",
      teamSize: "3-15",
      message: "Merhaba",
      userAgent: "test-agent",
    });
    expect(doc.name).toBe("Ada");
    expect(doc.email).toBe("ada@example.com");
    expect(doc.company).toBe("Acme");
    expect(doc.message).toBe("Merhaba");
    expect(doc.subject).toBe("Demo talebi — ekip 3-15");
    expect(doc.userAgent).toBe("test-agent");
    expect(doc.pageUrl).toBe("https://collbrai.com/#contact");
    expect(doc.createdAt).toBeDefined();
  });

  it("defaults an empty message to an empty string", () => {
    const doc = buildContactDoc({
      name: "Ada",
      email: "ada@example.com",
      company: "Acme",
      teamSize: "1-5",
      userAgent: "test-agent",
    });
    expect(doc.message).toBe("");
  });
});
