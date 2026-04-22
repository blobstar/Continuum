import { useTranslations } from "next-intl";
import { Link } from "@/lib/navigation";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServicesGrid } from "./ServicesGrid";

export function ServicesTeaser() {
  const t = useTranslations("home.servicesTeaser");

  return (
    <Section>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="What we deliver"
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <Link
          href="/en-ZA/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-strong)] transition-colors hover:text-[color:var(--fg)]"
        >
          {t("cta")}
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
            <path d="M5 12h14" />
            <path d="M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <div className="mt-12">
        <ServicesGrid variant="teaser" />
      </div>
    </Section>
  );
}
