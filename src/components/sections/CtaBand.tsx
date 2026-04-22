import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";

export function CtaBand() {
  const t = useTranslations("home.ctaBand");

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10">
      <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-10 md:p-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full brand-gradient opacity-30 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -bottom-20 h-56 w-56 rounded-full brand-gradient opacity-20 blur-3xl"
        />
        <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--fg)] md:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-3 text-[color:var(--fg-muted)] md:text-lg">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-12 shrink-0 items-center justify-center rounded-full brand-gradient px-7 text-base font-semibold text-[#05070A] shadow-[0_10px_40px_-12px_rgba(62,214,194,0.55)] transition-all hover:-translate-y-0.5 hover:brightness-110"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
