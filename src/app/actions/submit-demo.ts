"use server";

import { headers } from "next/headers";
import { demoSchema, type DemoInput } from "@/lib/demo-schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendDemoMail } from "@/lib/mail";

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
  const result = await sendDemoMail({
    ...payload,
    meta: { ip, userAgent, timestamp: new Date().toISOString() },
  });

  if (!result.ok) {
    return { ok: false, error: "Mail gönderilemedi. Lütfen info@collbrai.com adresine yaz." };
  }
  return { ok: true };
}
