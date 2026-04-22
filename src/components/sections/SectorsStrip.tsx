import { useTranslations } from "next-intl";

export function SectorsStrip() {
  const t = useTranslations("home.sectors");
  const items = t.raw("items") as string[];

  return (
    <section className="border-y border-[color:var(--border)] bg-[color:var(--bg-elevated)]/50">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10">
        <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[color:var(--accent-strong)]">
          {t("title")}
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {items.map((item) => (
            <li
              key={item}
              className="text-sm font-medium tracking-wide text-[color:var(--fg-muted)] md:text-base"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
