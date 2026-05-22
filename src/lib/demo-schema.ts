import { z } from "zod";

export const teamSizeValues = ["1-5", "3-15", "16-50", "50+"] as const;
export type TeamSize = (typeof teamSizeValues)[number];

export const demoSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı").max(80),
  email: z.string().email("Geçerli bir e-mail gir"),
  company: z.string().min(2, "Şirket adı en az 2 karakter").max(120),
  teamSize: z.enum(teamSizeValues),
  message: z.string().max(500, "Mesaj 500 karakteri aşamaz").optional().or(z.literal("")),
  honeypot: z.string().max(0, "spam"),
});

export type DemoInput = z.infer<typeof demoSchema>;
