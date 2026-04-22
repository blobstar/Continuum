import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  /**
   * When true, renders only the icon mark. Otherwise renders mark + wordmark.
   */
  iconOnly?: boolean;
  title?: string;
};

export function Logo({ className, iconOnly = false, title = "Continuum" }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)} aria-label={title}>
      <LogoMark className="h-8 w-auto" />
      {!iconOnly && (
        <span className="flex flex-col leading-none">
          <span className="text-[1.05rem] font-semibold tracking-[0.28em] text-[color:var(--fg)]">
            CONTINUUM
          </span>
          <span className="mt-1 text-[0.6rem] font-medium tracking-[0.32em] text-[color:var(--accent-strong)]">
            AI TRAINING &amp; ADVISORY
          </span>
        </span>
      )}
    </span>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="continuum-mark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6FE7D2" />
          <stop offset="100%" stopColor="#2BB6A8" />
        </linearGradient>
      </defs>
      <circle
        cx="60"
        cy="42"
        r="30"
        stroke="url(#continuum-mark-gradient)"
        strokeWidth="8"
        fill="none"
      />
      <path
        d="M30 152 L30 100 Q30 72 60 72 Q90 72 90 100 L90 152"
        stroke="url(#continuum-mark-gradient)"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
