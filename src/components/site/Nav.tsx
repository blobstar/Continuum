"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/navigation";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { navItems } from "@/content/nav";
import { cn } from "@/lib/cn";

export function Nav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-[color:var(--border)] bg-[color:var(--bg)]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href="/" className="group inline-flex items-center" aria-label="Continuum home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-[color:var(--accent-strong)]"
                  : "text-[color:var(--fg)] hover:text-[color:var(--accent-strong)]"
              )}
            >
              {t(item.key)}
              {isActive(item.href) && (
                <span
                  className="absolute inset-x-4 -bottom-[2px] h-[2px] brand-gradient"
                  aria-hidden
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden h-10 items-center rounded-full brand-gradient px-5 text-sm font-semibold text-[#05070A] shadow-[0_8px_30px_-12px_rgba(62,214,194,0.55)] transition-all hover:-translate-y-0.5 hover:brightness-110 md:inline-flex"
          >
            {t("cta")}
          </Link>
          <button
            type="button"
            aria-label={open ? t("close") : t("menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elevated)] text-[color:var(--fg)] md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[color:var(--border)] bg-[color:var(--bg)] md:hidden">
          <nav
            className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-6 py-6"
            aria-label="Mobile"
          >
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-[color:var(--bg-elevated)] text-[color:var(--accent-strong)]"
                    : "text-[color:var(--fg)] hover:bg-[color:var(--bg-elevated)]"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full brand-gradient px-5 text-sm font-semibold text-[#05070A]"
            >
              {t("cta")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
