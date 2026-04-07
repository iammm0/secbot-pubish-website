import type { ReactNode } from "react";

type SectionBlockProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function SectionBlock({ title, subtitle, children }: SectionBlockProps) {
  return (
    <section className="section-wrap">
      <div className="section-head">
        <h2 className="section-title text-[var(--foreground)]">{title}</h2>
        {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}
