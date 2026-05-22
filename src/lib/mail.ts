import nodemailer from "nodemailer";
import type { TeamSize } from "./demo-schema";

interface DemoMailInput {
  name: string;
  email: string;
  company: string;
  teamSize: TeamSize;
  message?: string;
  meta: { ip: string; userAgent: string; timestamp: string };
}

function getTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_SMTP_USER,
      pass: process.env.GMAIL_SMTP_APP_PASSWORD,
    },
  });
}

export async function sendDemoMail(input: DemoMailInput): Promise<{ ok: boolean; error?: string }> {
  const to = process.env.DEMO_REQUEST_TO;
  if (!to) return { ok: false, error: "missing DEMO_REQUEST_TO" };

  const subject = `Demo talebi — ${input.company} (${input.teamSize})`;
  const text = [
    `İsim:    ${input.name}`,
    `E-mail:  ${input.email}`,
    `Şirket:  ${input.company}`,
    `Boyut:   ${input.teamSize}`,
    `Mesaj:   ${input.message || "(boş)"}`,
    "",
    "— meta —",
    `IP:        ${input.meta.ip}`,
    `UA:        ${input.meta.userAgent}`,
    `Timestamp: ${input.meta.timestamp}`,
  ].join("\n");

  try {
    await getTransporter().sendMail({
      from: process.env.GMAIL_SMTP_USER,
      to,
      replyTo: input.email,
      subject,
      text,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "unknown" };
  }
}
