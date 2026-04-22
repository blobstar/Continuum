import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    asChild?: false;
  };

const variantClasses: Record<Variant, string> = {
  primary:
    "brand-gradient text-[#05070A] shadow-[0_8px_30px_-12px_rgba(62,214,194,0.55)] hover:brightness-110 hover:-translate-y-0.5",
  secondary:
    "border border-[color:var(--border)] bg-[color:var(--bg-elevated)] text-[color:var(--fg)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)]",
  ghost:
    "text-[color:var(--fg)] hover:bg-[color:var(--bg-elevated)] hover:text-[color:var(--accent-strong)]",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-base",
};

const base =
  "inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-200 ease-out outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] ring-brand disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

export const Button = React.forwardRef<HTMLButtonElement, ButtonAsButton>(function Button(
  { variant = "primary", size = "md", className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

type LinkButtonProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps>;

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  function LinkButton({ variant = "primary", size = "md", className, children, ...props }, ref) {
    return (
      <a
        ref={ref}
        className={cn(base, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      >
        {children}
      </a>
    );
  }
);
