import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { CtaBand } from "@/components/sections/CtaBand";
import { GradientDot } from "@/components/ui/Badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  const storyBody = t.raw("story.body") as string[];
  const approach = t.raw("approach.items") as { title: string; body: string }[];
  const roles = t.raw("team.roles") as { role: string; body: string }[];

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={t("pageTitle")}
        subtitle={t("pageSubtitle")}
      />

      <Section>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-start">
          <SectionHeading eyebrow="Our story" title={t("story.title")} />
          <div className="flex flex-col gap-5">
            {storyBody.map((para, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-[color:var(--fg-muted)] md:text-lg"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-t border-[color:var(--border)] pt-20">
        <SectionHeading
          eyebrow="How we work"
          title={t("approach.title")}
          align="center"
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {approach.map((item) => (
            <Card key={item.title} interactive>
              <GradientDot />
              <CardTitle className="mt-4">{item.title}</CardTitle>
              <CardDescription className="mt-2">{item.body}</CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-t border-[color:var(--border)] pt-20">
        <SectionHeading
          eyebrow="The team"
          title={t("team.title")}
          subtitle={t("team.subtitle")}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {roles.map((role, i) => (
            <Card key={role.role} className="flex flex-col gap-4">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--accent-strong)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <CardTitle className="text-lg">{role.role}</CardTitle>
              <CardDescription>{role.body}</CardDescription>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
