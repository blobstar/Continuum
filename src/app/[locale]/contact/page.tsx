import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("pageTitle"),
    description: t("pageSubtitle"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={t("pageTitle")}
        subtitle={t("pageSubtitle")}
      />
      <Section>
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-start">
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--bg-elevated)] p-6 md:p-10">
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-5">
            <Card>
              <CardTitle className="text-lg">{t("details.title")}</CardTitle>
              <dl className="mt-6 flex flex-col gap-5 text-sm">
                <div>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--fg-muted)]">
                    {t("details.emailLabel")}
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${t("details.email")}`}
                      className="text-[color:var(--fg)] transition-colors hover:text-[color:var(--accent-strong)]"
                    >
                      {t("details.email")}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--fg-muted)]">
                    {t("details.locationLabel")}
                  </dt>
                  <dd className="mt-1 text-[color:var(--fg)]">
                    {t("details.location")}
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[color:var(--fg-muted)]">
                    {t("details.hoursLabel")}
                  </dt>
                  <dd className="mt-1 text-[color:var(--fg)]">
                    {t("details.hours")}
                  </dd>
                </div>
              </dl>
            </Card>

            <Card>
              <CardTitle className="text-lg">What happens next?</CardTitle>
              <CardDescription className="mt-3">
                We read every enquiry personally. Expect a short reply with a
                suggested next step — usually a 20-minute discovery call to
                understand your team&apos;s starting point and desired outcomes.
              </CardDescription>
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}
