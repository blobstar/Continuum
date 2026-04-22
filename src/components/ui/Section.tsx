import * as React from "react";
import { cn } from "@/lib/cn";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  bleed?: boolean;
};

export function Section({ className, bleed = false, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        bleed ? "" : "mx-auto w-full max-w-7xl px-6 md:px-10",
        "py-20 md:py-28",
        className
      )}
      {...props}
    />
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-2xl text-center items-center" : "max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[color:var(--accent-strong)]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--fg)] md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base leading-relaxed text-[color:var(--fg-muted)] md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
