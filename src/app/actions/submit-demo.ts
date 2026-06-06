"use server";

import { headers } from "next/headers";
import { demoSchema, type DemoInput } from "@/lib/demo-schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendDemoMail } from "@/lib/mail";
import { saveTrackerContact } from "@/lib/save-contact";

export type SubmitResult = { ok: true } | { ok: false; error: string };

export async function submitDemoRequest(raw: DemoInput): Promise<SubmitResult> {
  const parsed = demoSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.errors[0]?.message ?? "Geçersiz veri" };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "unknown").split(",")[0]!.trim();
  const userAgent = h.get("user-agent") ?? "";

  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return { ok: false, error: "Çok fazla deneme — lütfen birkaç dakika sonra tekrar dene." };
  }

  const { honeypot: _honeypot, ...payload } = parsed.data;

  const [mailResult, saveResult] = await Promise.all([
    sendDemoMail({
      ...payload,
      meta: { ip, userAgent, timestamp: new Date().toISOString() },
    }),
    saveTrackerContact({
      name: payload.name,
      email: payload.email,
      company: payload.company,
      teamSize: payload.teamSize,
      message: payload.message,
      userAgent,
    }),
  ]);

  if (!mailResult.ok) {
    console.error("Demo mail failed:", mailResult.error);
  }
  if (!saveResult.ok) {
    console.error("Firestore save failed:", saveResult.error);
  }

  if (!mailResult.ok && !saveResult.ok) {
    return {
      ok: false,
      error: "Talebin iletilemedi. Lütfen info@collbrai.com adresine yaz.",
    };
  }
  return { ok: true };
}
