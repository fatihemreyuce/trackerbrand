"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Mail } from "lucide-react";
import { demoSchema, type DemoInput, teamSizeValues } from "@/lib/demo-schema";
import { submitDemoRequest } from "@/app/actions/submit-demo";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const trustSignals = [
  { t: "24 saat içinde dönüş", d: "İş günü içinde direkt mail" },
  { t: "30 dakikalık demo", d: "Senin takvimine uygun" },
  { t: "Kredi kartı yok", d: "Bağlayıcı bir şey yok" },
  { t: "Türkçe destek", d: "Senin saatinde, senin dilinde" },
];

export function Contact() {
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState<string>("");

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<DemoInput>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      name: "", email: "", company: "",
      teamSize: "3-15", message: "", honeypot: "",
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
    <section id="contact" className="bg-paper-dark text-ink-dark py-20 border-t border-hairline-dark">
      <div className="mx-auto max-w-6xl px-6 grid gap-14 md:grid-cols-2 items-start">

        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-ochre-dark font-semibold mb-3">Demo talebi</p>
          <h3 className="text-3xl md:text-4xl font-bold leading-[1.05] tracking-[-0.025em] mb-4">
            Ekibini <span className="text-ochre-dark">Tracker&apos;a</span><br />taşımaya hazır mısın?
          </h3>
          <p className="text-sm text-ink-dark-soft leading-relaxed mb-6 max-w-md">
            30 dakikalık bir demo&apos;da kendi senaryonuza özel kurulum gösteriyoruz. Sorularını cevaplayıp ekibine uygun mu birlikte karar veriyoruz.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {trustSignals.map((s) => (
              <div key={s.t} className="flex gap-2 items-start text-xs text-ink-dark-soft">
                <div className="w-5 h-5 rounded-full bg-ochre-dark/15 text-ochre-dark grid place-items-center shrink-0">
                  <Check className="w-3 h-3" />
                </div>
                <div>
                  <strong className="block text-ink-dark font-medium">{s.t}</strong>
                  {s.d}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-5 border-t border-hairline-dark">
            <p className="text-[11px] uppercase tracking-[0.12em] text-ink-dark-soft font-semibold mb-2">
              Form doldurmayı tercih etmiyorsan
            </p>
            <a href="mailto:info@collbrai.com" className="inline-flex items-center gap-2 text-sm text-ink-dark">
              <Mail className="w-4 h-4 text-ochre-dark" />
              info@collbrai.com
            </a>
          </div>
        </div>

        <div className="bg-paper-dark-soft border border-hairline-dark rounded-xl p-6">
          {submitState === "success" ? (
            <div className="text-center py-10">
              <div className="w-12 h-12 rounded-full bg-ochre-dark/15 text-ochre-dark grid place-items-center mx-auto mb-4">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-semibold text-ink-dark mb-1">Teşekkürler!</h4>
              <p className="text-sm text-ink-dark-soft">24 saat içinde sana dönüyoruz.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <h4 className="text-base font-semibold text-ink-dark mb-1">Demo iste</h4>
              <p className="text-xs text-ink-dark-soft mb-5">Aşağıyı doldur, 24 saat içinde sana dönüyoruz.</p>

              {submitState === "error" && (
                <div className="mb-4 px-3 py-2 rounded-md bg-clay/15 border border-clay/30 text-xs text-clay">
                  {errMsg}
                </div>
              )}

              <input type="text" {...register("honeypot")} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              <div className="mb-3">
                <label className="block text-[11px] uppercase tracking-[0.08em] text-ink-dark-soft font-semibold mb-1.5">Adın</label>
                <Input {...register("name")} placeholder="Adın" />
                {errors.name && <p className="mt-1 text-[11px] text-clay">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.08em] text-ink-dark-soft font-semibold mb-1.5">E-mail</label>
                  <Input type="email" {...register("email")} placeholder="ornek@sirket.com" />
                  {errors.email && <p className="mt-1 text-[11px] text-clay">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.08em] text-ink-dark-soft font-semibold mb-1.5">Şirket</label>
                  <Input {...register("company")} placeholder="Şirket / takım" />
                  {errors.company && <p className="mt-1 text-[11px] text-clay">{errors.company.message}</p>}
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-[11px] uppercase tracking-[0.08em] text-ink-dark-soft font-semibold mb-1.5">Ekip boyutu</label>
                <div className="flex flex-wrap gap-1.5">
                  {teamSizeValues.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setValue("teamSize", v, { shouldValidate: true })}
                      className={cn(
                        "px-3.5 py-2 rounded-full text-xs border transition-colors",
                        teamSize === v
                          ? "bg-ochre-dark text-paper-dark-deeper border-ochre-dark"
                          : "bg-paper-dark-deeper text-ink-dark-soft border-hairline-dark"
                      )}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[11px] uppercase tracking-[0.08em] text-ink-dark-soft font-semibold mb-1.5">Mesaj (opsiyonel)</label>
                <Textarea {...register("message")} placeholder="Ne tür bir görev takibi yapıyorsunuz şu an?" />
                {errors.message && <p className="mt-1 text-[11px] text-clay">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="w-full h-11 rounded-md bg-ochre-dark text-paper-dark-deeper text-sm font-semibold hover:bg-ochre disabled:opacity-50"
              >
                {submitState === "submitting" ? "Gönderiliyor…" : "Demo iste →"}
              </button>
              <p className="mt-2.5 text-[10px] text-ink-dark-soft/70 text-center">
                Mailini sadece sana cevap vermek için kullanırız.
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
