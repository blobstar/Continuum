import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "insights" });
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
  };
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "insights" });

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title={t("pageTitle")}
        subtitle={t("pageSubtitle")}
      />
      <Section>
        <Card className="mx-auto max-w-2xl text-center">
          <div
            aria-hidden
            className="mx-auto h-12 w-12 rounded-full brand-gradient opacity-80"
          />
          <CardTitle className="mt-6 text-xl">{t("empty.title")}</CardTitle>
          <CardDescription className="mt-3">{t("empty.body")}</CardDescription>
          <div className="mt-6">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-strong)] transition-colors hover:text-[color:var(--fg)]"
            >
              {t("empty.cta")}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        </Card>
      </Section>
    </>
  );
}
