"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Input, Textarea, Select, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { contactFormSchema, type ContactFormValues } from "@/lib/contactSchema";

type Status = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tServices = useTranslations("services.items");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const values = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    const parsed = contactFormSchema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const next: FieldErrors = {};
      (Object.keys(flat) as (keyof ContactFormValues)[]).forEach((k) => {
        const msg = flat[k]?.[0];
        if (msg) next[k] = msg;
      });
      setErrors(next);
      setStatus("idle");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      (event.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-[color:var(--accent)]/40 bg-[color:var(--bg-elevated)] p-8">
        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full brand-gradient text-[#05070A]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            aria-hidden
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[color:var(--fg)]">
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-sm text-[color:var(--fg-muted)]">
          {t("successBody")}
        </p>
      </div>
    );
  }

  const serviceKeys = ["awareness", "business", "compliance", "corporate"] as const;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="name">{t("name")}</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            required
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            required
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Label htmlFor="company">{t("company")}</Label>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
            required
          />
          {errors.company && (
            <p className="mt-1 text-xs text-red-400">{errors.company}</p>
          )}
        </div>
        <div>
          <Label htmlFor="service">{t("service")}</Label>
          <Select
            id="service"
            name="service"
            defaultValue=""
            aria-invalid={Boolean(errors.service)}
            required
          >
            <option value="" disabled>
              {t("servicePlaceholder")}
            </option>
            {serviceKeys.map((key) => (
              <option key={key} value={key}>
                {tServices(`${key}.name`)}
              </option>
            ))}
            <option value="other">Something else</option>
          </Select>
          {errors.service && (
            <p className="mt-1 text-xs text-red-400">{errors.service}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea
          id="message"
          name="message"
          aria-invalid={Boolean(errors.message)}
          required
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message}</p>
        )}
      </div>

      {status === "error" && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4">
          <p className="text-sm font-semibold text-red-400">
            {t("errorTitle")}
          </p>
          <p className="mt-1 text-xs text-red-300/90">{t("errorBody")}</p>
        </div>
      )}

      <div className="flex items-center justify-end pt-2">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? t("sending") : t("submit")}
        </Button>
      </div>
    </form>
  );
}
