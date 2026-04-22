import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Logo } from "./Logo";
import { navItems } from "@/content/nav";

export function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-[color:var(--border)] bg-[color:var(--bg-elevated)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px brand-gradient opacity-60"
      />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-10">
        <div className="flex flex-col gap-6">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-[color:var(--fg-muted)]">
            {tFooter("description")}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[color:var(--accent-strong)]">
            {tFooter("navTitle")}
          </h4>
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-sm text-[color:var(--fg)] transition-colors hover:text-[color:var(--accent-strong)]"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[color:var(--accent-strong)]">
            {tFooter("legalTitle")}
          </h4>
          <ul className="flex flex-col gap-2">
            <li>
              <span className="text-sm text-[color:var(--fg-muted)]">
                {tFooter("privacy")}
              </span>
            </li>
            <li>
              <span className="text-sm text-[color:var(--fg-muted)]">
                {tFooter("terms")}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--border)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 md:flex-row md:items-center md:px-10">
          <p className="text-xs text-[color:var(--fg-muted)]">
            {tFooter("copyright", { year })}
          </p>
          <p className="text-xs text-[color:var(--fg-muted)]">{tFooter("builtIn")}</p>
        </div>
      </div>
    </footer>
  );
}
