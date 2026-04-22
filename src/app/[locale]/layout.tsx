import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/lib/routing";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <ThemeProvider>
      <NextIntlClientProvider>
        <div className="relative flex min-h-dvh flex-col">
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
