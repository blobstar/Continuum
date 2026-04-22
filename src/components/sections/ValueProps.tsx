"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { GradientDot } from "@/components/ui/Badge";

type ValuePropItem = { title: string; body: string };

export function ValueProps() {
  const t = useTranslations("home.valueProps");
  const items = t.raw("items") as ValuePropItem[];

  return (
    <Section>
      <SectionHeading
        eyebrow="Why Continuum"
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: i * 0.05, ease: "easeOut" }}
          >
            <Card interactive className="h-full">
              <GradientDot />
              <CardTitle className="mt-4">{item.title}</CardTitle>
              <CardDescription className="mt-2">{item.body}</CardDescription>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
