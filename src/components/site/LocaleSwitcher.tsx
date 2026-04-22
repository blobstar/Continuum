"use client";

import { useLocale } from "next-intl";
import { routing } from "@/lib/routing";

/**
 * Locale switcher scaffolding.
 * Only one locale (en-ZA) is enabled in v1, so we render the flag/label as a
 * non-interactive pill. When additional locales are added to routing.locales,
 * swap this to a proper select driven by next-intl's router.replace.
 */
export function LocaleSwitcher() {
  const locale = useLocale();
  const isMultiLocale = routing.locales.length > 1;

  if (!isMultiLocale) {
    return (
      <span
        className="hidden h-10 items-center rounded-full border border-[color:var(--border)] bg-[color:var(--bg-elevated)] px-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[color:var(--fg-muted)] md:inline-flex"
        aria-label={`Current locale ${locale}`}
      >
        {locale}
      </span>
    );
  }

  return null;
}
