import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { CtaBand } from "@/components/sections/CtaBand";
import { GradientDot } from "@/components/ui/Badge";
import { Link } from "@/lib/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pricing" });

  const factors = t.raw("notes.items") as string[];

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title={t("pageTitle")}
        subtitle={t("pageSubtitle")}
      />

      <Section>
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {(["training", "programmes", "advisory"] as const).map((key) => (
            <Card key={key} interactive className="text-center">
              <GradientDot />
              <CardTitle className="mt-4">{t(`cards.${key}.title`)}</CardTitle>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-[color:var(--fg)]">
                {t(`cards.${key}.price`)}
              </p>
              <CardDescription className="mt-3">
                {t(`cards.${key}.body`)}
              </CardDescription>
              <div className="mt-6">
                <Link
                  href="/en-ZA/services"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-strong)] transition-colors hover:text-[color:var(--fg)]"
                >
                  View services
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
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-[color:var(--border)] pt-20">
        <SectionHeading eyebrow="Details" title={t("notes.title")} align="center" />
        <div className="mx-auto mt-12 max-w-3xl">
          <Card className="p-0">
            <div className="grid gap-3 p-6 md:p-8">
              {factors.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-2 h-2 w-2 rounded-full bg-[color:var(--accent-strong)]"
                  />
                  <p className="text-base text-[color:var(--fg-muted)]">{item}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      <Section className="border-t border-[color:var(--border)] pt-20">
        <SectionHeading
          eyebrow="Get a quote"
          title={t("cta.title")}
          subtitle={t("cta.body")}
          align="center"
        />
        <div className="mt-10 flex justify-center">
          <Link
            href="/en-ZA/contact"
            className="inline-flex h-11 items-center rounded-full brand-gradient px-6 text-sm font-semibold text-[#05070A] shadow-[0_8px_30px_-12px_rgba(62,214,194,0.55)] transition-all hover:-translate-y-0.5 hover:brightness-110"
          >
            {t("cta.button")}
          </Link>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

