"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { services, type ServiceFieldKey } from "@/content/services";

type Variant = "full" | "teaser";

export function ServicesGrid({ variant = "full" }: { variant?: Variant }) {
  const t = useTranslations("services");

  const fieldLabelKey: Record<ServiceFieldKey, string> = {
    price: "priceLabel",
    duration: "durationLabel",
    format: "formatLabel",
    audience: "audienceLabel",
    focus: "focusLabel",
    includes: "includesLabel",
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {services.map((service, i) => {
        const base = `items.${service.key}`;
        const outcomes = t.raw(`${base}.outcomes`) as string[] | undefined;

        return (
          <motion.div
            key={service.key}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
          >
            <Card interactive className="flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--accent-strong)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className="h-1 w-10 rounded-full brand-gradient opacity-80"
                  aria-hidden
                />
              </div>
              <CardTitle className="mt-4 text-xl">{t(`${base}.name`)}</CardTitle>
              <CardDescription className="mt-2">
                {t(`${base}.summary`)}
              </CardDescription>

              <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-[color:var(--border)] pt-5 sm:grid-cols-2">
                {service.fields.map((field) => (
                  <div key={field} className="flex flex-col gap-1">
                    <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--fg-muted)]">
                      {t(fieldLabelKey[field])}
                    </dt>
                    <dd className="text-sm font-medium text-[color:var(--fg)]">
                      {t(`${base}.${field}`)}
                    </dd>
                  </div>
                ))}
              </dl>

              {variant === "full" && outcomes && (
                <ul className="mt-6 flex flex-col gap-2">
                  {outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex items-start gap-3 text-sm text-[color:var(--fg)]"
                    >
                      <span
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full brand-gradient"
                        aria-hidden
                      />
                      {o}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-strong)] transition-colors hover:text-[color:var(--fg)]"
                >
                  {t("ctaLabel")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </svg>
  );
}
