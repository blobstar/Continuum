type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-[color:var(--border)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15] [background-image:radial-gradient(circle_at_20%_20%,var(--accent),transparent_45%),radial-gradient(circle_at_80%_10%,var(--brand-from),transparent_40%)]"
      />
      <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 md:py-28">
        {eyebrow && (
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[color:var(--accent-strong)]">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-[color:var(--fg)] md:text-5xl lg:text-6xl lg:leading-[1.05]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-base text-[color:var(--fg-muted)] md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
