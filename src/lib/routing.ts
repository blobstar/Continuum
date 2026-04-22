import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en-ZA"] as const,
  defaultLocale: "en-ZA",
  // "never" keeps URLs clean (no /en-ZA prefix) while leaving i18n infrastructure
  // in place. When a second locale is added, switch to "as-needed" or "always".
  localePrefix: "never",
});

export type Locale = (typeof routing.locales)[number];
