import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/sections/PageHeader";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={t("pageTitle")}
        subtitle={t("pageSubtitle")}
      />
      <Section>
        <ServicesGrid variant="full" />
      </Section>
      <CtaBand />
    </>
  );
}
