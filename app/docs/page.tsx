import Link from "next/link";
import { SiteFooter } from "@/src/components/site-footer";
import { SectionBlock } from "@/src/components/section-block";
import { SiteHeader } from "@/src/components/site-header";
import { DocsTopStrip } from "@/src/components/docs-top-strip";
import { type Locale, defaultLocale, isLocale } from "@/src/i18n/config";
import { getMessages } from "@/src/i18n/messages";

type DocsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

function withLang(path: string, locale: Locale) {
  return `${path}?lang=${locale}`;
}

export default async function DocsPage({ searchParams }: DocsPageProps) {
  const params = await searchParams;
  const lang = params?.lang;
  const locale: Locale = lang && isLocale(lang) ? lang : defaultLocale;
  const messages = getMessages(locale);
  const d = messages.docs;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="site-shell flex min-h-screen flex-col">
        <SiteHeader locale={locale} messages={messages} />
        <DocsTopStrip locale={locale} messages={messages} anchorNav={d.anchorNav} />
        <main className="page-main">
          <SectionBlock title={d.title} subtitle={d.subtitle}>
            <div className="docs-overview mx-auto max-w-3xl space-y-12 px-4 sm:px-0">
              <section id="doc-scope" className="scroll-mt-28">
                <h2 className="docs-overview-h2">{d.scopeTitle}</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-[var(--muted)]">
                  {d.scopeBullets.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </section>

              <section id="where-to-start" className="scroll-mt-28">
                <h2 className="docs-overview-h2">{d.whereToStartTitle}</h2>
                <p className="mt-3 text-[var(--muted)]">{d.whereToStartIntro}</p>
                <ul className="mt-4 list-disc space-y-3 pl-5 text-[var(--foreground)]">
                  {d.whereToStartBullets.map((row, idx) => (
                    <li key={`${row.text}-${idx}`}>
                      <span className="text-[var(--muted)]">{row.text}</span>{" "}
                      {row.links.map((link, i) => (
                        <span key={link.viewPath}>
                          {i > 0 ? "、" : null}
                          <Link
                            href={withLang(link.viewPath, locale)}
                            className="font-medium text-[var(--brand-end)] no-underline hover:underline"
                          >
                            {link.label}
                          </Link>
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </section>

              <section id="recommended-paths" className="scroll-mt-28">
                <h2 className="docs-overview-h2">{d.recommendedPathsTitle}</h2>
                <div className="mt-5 grid gap-6 md:grid-cols-3">
                  {d.recommendedPaths.map((path) => (
                    <div key={path.title} className="surface-card p-4">
                      <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[var(--muted-soft)]">
                        {path.title}
                      </p>
                      <ol className="mt-3 list-decimal space-y-2 pl-4 text-sm text-[var(--muted)]">
                        {path.items.map((step) => (
                          <li key={step.viewPath}>
                            <Link
                              href={withLang(step.viewPath, locale)}
                              className="text-[var(--foreground)] no-underline hover:underline"
                            >
                              {step.label}
                            </Link>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </section>

              <p className="text-center text-xs text-[var(--muted-soft)]">
                {d.architectureCreditBefore}{" "}
                <a
                  href="https://execgo.site/docs"
                  className="text-[var(--brand-end)] underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {d.architectureCreditLink}
                </a>
                {d.architectureCreditAfter}
              </p>

              <section id="doc-map" className="scroll-mt-28">
                <h2 className="docs-overview-h2">{d.docMapTitle}</h2>
                <p className="mt-3 text-sm text-[var(--muted)]">{d.docMapLead}</p>
                {d.moreInTree ? <p className="mt-2 text-sm text-[var(--muted-soft)]">{d.moreInTree}</p> : null}
                <div className="mt-8 flex flex-col gap-10">
                  {d.sections.map((section, sIndex) => (
                    <div key={section.title}>
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-soft)]">
                        {sIndex + 1}. {section.title}
                      </h3>
                      <ul className="mt-3 space-y-2 border-l border-[var(--line)] pl-4">
                        {section.items.map((item) => (
                          <li key={item.viewPath} className="text-sm text-[var(--muted)]">
                            <Link
                              href={withLang(item.viewPath, locale)}
                              className="font-medium text-[var(--foreground)] no-underline hover:underline"
                            >
                              {item.label}
                            </Link>
                            {item.description ? <span className="text-[var(--muted)]">：{item.description}</span> : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </SectionBlock>
        </main>
        <SiteFooter messages={messages} />
      </div>
    </div>
  );
}
