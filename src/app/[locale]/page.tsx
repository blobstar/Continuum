import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { ValueProps } from "@/components/sections/ValueProps";
import { SectorsStrip } from "@/components/sections/SectorsStrip";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";
import { CtaBand } from "@/components/sections/CtaBand";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <SectorsStrip />
      <ValueProps />
      <ServicesTeaser />
      <CtaBand />
    </>
  );
}
