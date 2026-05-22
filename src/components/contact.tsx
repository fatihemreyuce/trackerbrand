"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Mail } from "lucide-react";
import { demoSchema, type DemoInput, teamSizeValues } from "@/lib/demo-schema";
import { submitDemoRequest } from "@/app/actions/submit-demo";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GradientOrb } from "@/components/ui/gradient-orb";
import { cn } from "@/lib/utils";

const trustSignals = [
  { t: "24 saat içinde dönüş", d: "İş günü içinde direkt mail" },
  { t: "30 dakikalık demo", d: "Senin takvimine uygun" },
  { t: "Kredi kartı yok", d: "Bağlayıcı bir şey yok" },
  { t: "Türkçe destek", d: "Senin saatinde, senin dilinde" },
];

export function Contact() {
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [errMsg, setErrMsg] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DemoInput>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      teamSize: "3-15",
      message: "",
      honeypot: "",
    },
  });

  const teamSize = watch("teamSize");

  const onSubmit = async (data: DemoInput) => {
    setSubmitState("submitting");
    setErrMsg("");
    const result = await submitDemoRequest(data);
    if (result.ok) {
      setSubmitState("success");
    } else {
      setSubmitState("error");
      setErrMsg(result.error);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-paper-dark to-paper-dark-deeper text-ink-dark py-20 md:py-24"
    >
      {/* atmospheric orbs */}
      <GradientOrb
        tone="ink-warm"
        size="xl"
        className="-right-40 -top-32 opacity-15"
        drift
      />
      <GradientOrb
        tone="ochre"
        size="lg"
        className="-left-40 bottom-0 opacity-10"
        drift={false}
      />

      <div className="relative mx-auto max-w-12xl px-8 grid gap-14 md:grid-cols-2 items-start">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-ochre-dark font-semibold mb-4 flex items-center gap-2">
            <span aria-hidden className="inline-block w-6 h-px bg-ochre-dark" />
            Demo talebi
          </p>
          <h3 className="text-3xl md:text-5xl font-bold leading-[1.02] tracking-[-0.035em] mb-5">
            Ekibini{" "}
            <span className="relative inline-block">
              <span className="bg-[linear-gradient(135deg,var(--color-ochre-dark),var(--color-clay))] bg-clip-text text-transparent">
                Tracker&apos;a
              </span>
              <span
                aria-hidden
                className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-ochre-dark to-clay rounded-full opacity-70"
              />
            </span>
            <br />
            taşımaya hazır mısın?
          </h3>
          <p className="text-sm md:text-base text-ink-dark-soft leading-relaxed mb-7 max-w-md">
            30 dakikalık bir demo&apos;da kendi senaryonuza özel kurulum gösteriyoruz. Sorularını
            cevaplayıp ekibine uygun mu birlikte karar veriyoruz.
          </p>

          <div className="grid grid-cols-2 gap-2.5 mb-7">
            {trustSignals.map((s) => (
              <div
                key={s.t}
                className="flex gap-2.5 items-start rounded-lg bg-paper-dark-soft/50 backdrop-blur-sm ring-1 ring-hairline-dark px-3 py-2.5 text-xs text-ink-dark-soft"
              >
                <div className="w-6 h-6 rounded-full bg-ochre-dark/15 text-ochre-dark grid place-items-center shrink-0 shadow-[0_0_16px_-4px_rgba(212,164,68,0.6)]">
                  <Check className="w-3.5 h-3.5" aria-hidden />
                </div>
                <div>
                  <strong className="block text-ink-dark font-semibold tracking-tight text-[13px]">
                    {s.t}
                  </strong>
                  <span className="text-[11px]">{s.d}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-5 border-t border-hairline-dark">
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-dark-soft font-semibold mb-2">
              Form doldurmayı tercih etmiyorsan
            </p>
            <a
              href="mailto:info@collbrai.com"
              className="inline-flex items-center gap-2 text-sm text-ink-dark hover:text-ochre-dark transition-colors"
            >
              <Mail className="w-4 h-4 text-ochre-dark" />
              info@collbrai.com
            </a>
          </div>
        </div>

        <div className="relative">
          {/* glass form */}
          <div className="relative rounded-2xl bg-paper-dark-soft/70 backdrop-blur-md ring-1 ring-ochre-dark/15 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5),0_0_60px_-20px_rgba(212,164,68,0.25)] p-6">
            {submitState === "success" ? (
              <div className="text-center py-12">
                <div className="relative w-14 h-14 mx-auto mb-4">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-ochre-dark/20 animate-ping"
                  />
                  <div className="relative w-14 h-14 rounded-full bg-ochre-dark/20 text-ochre-dark grid place-items-center">
                    <Check className="w-7 h-7" />
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-ink-dark mb-1 tracking-tight">
                  Teşekkürler!
                </h4>
                <p className="text-sm text-ink-dark-soft">24 saat içinde sana dönüyoruz.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <h4 className="text-base font-semibold text-ink-dark mb-1 tracking-tight">
                  Demo iste
                </h4>
                <p className="text-xs text-ink-dark-soft mb-5">
                  Aşağıyı doldur, 24 saat içinde sana dönüyoruz.
                </p>

                {submitState === "error" && (
                  <div className="mb-4 px-3 py-2 rounded-md bg-clay/15 border border-clay/30 text-xs text-clay">
                    {errMsg}
                  </div>
                )}

                <input
                  type="text"
                  {...register("honeypot")}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden
                />

                <div className="mb-3">
                  <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-dark-soft font-semibold mb-1.5">
                    Adın
                  </label>
                  <Input {...register("name")} placeholder="Adın" />
                  {errors.name && (
                    <p className="mt-1 text-[11px] text-clay">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-dark-soft font-semibold mb-1.5">
                      E-mail
                    </label>
                    <Input type="email" {...register("email")} placeholder="ornek@sirket.com" />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-clay">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-dark-soft font-semibold mb-1.5">
                      Şirket
                    </label>
                    <Input {...register("company")} placeholder="Şirket / takım" />
                    {errors.company && (
                      <p className="mt-1 text-[11px] text-clay">{errors.company.message}</p>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-dark-soft font-semibold mb-1.5">
                    Ekip boyutu
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {teamSizeValues.map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setValue("teamSize", v, { shouldValidate: true })}
                        className={cn(
                          "px-3.5 py-2 rounded-full text-xs border transition-all duration-200",
                          teamSize === v
                            ? "bg-ochre-dark text-paper-dark-deeper border-ochre-dark shadow-[0_0_24px_-6px_rgba(212,164,68,0.7)]"
                            : "bg-paper-dark-deeper text-ink-dark-soft border-hairline-dark hover:border-ochre-dark/40 hover:text-ink-dark"
                        )}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-dark-soft font-semibold mb-1.5">
                    Mesaj (opsiyonel)
                  </label>
                  <Textarea
                    {...register("message")}
                    placeholder="Ne tür bir görev takibi yapıyorsunuz şu an?"
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] text-clay">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="group w-full h-12 rounded-md bg-[linear-gradient(135deg,var(--color-ochre-dark),var(--color-clay))] text-paper-dark-deeper text-sm font-semibold transition-all hover:shadow-[0_0_36px_-6px_rgba(212,164,68,0.7)] disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {submitState === "submitting" ? (
                    "Gönderiliyor…"
                  ) : (
                    <>
                      Demo iste
                      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </>
                  )}
                </button>
                <p className="mt-2.5 text-[10px] text-ink-dark-soft/70 text-center">
                  Mailini sadece sana cevap vermek için kullanırız.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
