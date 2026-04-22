import * as React from "react";
import { cn } from "@/lib/cn";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em]",
        variant === "default" &&
          "bg-[color:var(--accent)]/12 text-[color:var(--accent-strong)] ring-1 ring-[color:var(--accent)]/30",
        variant === "outline" &&
          "border border-[color:var(--border)] text-[color:var(--fg-muted)]",
        className
      )}
      {...props}
    />
  );
}

export function GradientDot({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-1.5 w-1.5 shrink-0 rounded-full brand-gradient shadow-[0_0_0_3px_rgba(62,214,194,0.15)]",
        className
      )}
      aria-hidden
    />
  );
}
