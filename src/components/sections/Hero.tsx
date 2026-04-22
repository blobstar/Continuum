"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { ParticleHero } from "@/components/hero/ParticleHero";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ParticleHero />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-[color:var(--bg)]"
      />

      <div className="mx-auto flex min-h-[640px] w-full max-w-7xl flex-col justify-center px-6 py-28 md:min-h-[720px] md:px-10 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <Badge>{t("eyebrow")}</Badge>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-[color:var(--fg)] md:text-6xl md:leading-[1.05] lg:text-[4.25rem]">
            {t("title").split(" ").slice(0, -2).join(" ")}{" "}
            <span className="brand-text">
              {t("title").split(" ").slice(-2).join(" ")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[color:var(--fg-muted)] md:text-xl">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center rounded-full brand-gradient px-7 text-base font-semibold text-[#05070A] shadow-[0_8px_30px_-12px_rgba(62,214,194,0.55)] transition-all hover:-translate-y-0.5 hover:brightness-110"
            >
              {t("ctaPrimary")}
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elevated)]/60 px-7 text-base font-semibold text-[color:var(--fg)] backdrop-blur transition-colors hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
