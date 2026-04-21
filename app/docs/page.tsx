import Link from "next/link";
import { SiteFooter } from "@/src/components/site-footer";
import { SectionBlock } from "@/src/components/section-block";
import { SiteHeader } from "@/src/components/site-header";
import { DocsTopStrip } from "@/src/components/docs-top-strip";
import { type Locale, defaultLocale, isLocale } from "@/src/i18n/config";
import { getMessages } from "@/src/i18n/messages";
import { DOC_BRANCHES, listDocEntries } from "@/src/lib/docs-fs";

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
            <div className="docs-overview mx-auto max-w-4xl space-y-12 px-4 sm:px-0">
              <section id="branch-docs" className="scroll-mt-28">
                <h2 className="docs-overview-h2">{d.branchDocsTitle}</h2>
                <p className="mt-3 text-[var(--muted)]">{d.branchDocsIntro}</p>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {DOC_BRANCHES.map((branch) => {
                    const docsCount = listDocEntries(branch.id).length;
                    return (
                      <Link
                        key={branch.id}
                        href={withLang(`/docs/secbot/${branch.id}`, locale)}
                        className="surface-card block p-5 no-underline hover:border-[var(--brand-end)]"
                      >
                        <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted-soft)]">
                          {branch.badge}
                        </p>
                        <h3 className="mt-3 text-xl font-semibold tracking-tight text-[var(--foreground)]">{branch.label}</h3>
                        <p className="mt-2 text-sm text-[var(--muted)]">{branch.summary}</p>
                        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs">
                          <span className="rounded-full border border-[var(--line)] px-2.5 py-1 font-mono text-[var(--foreground)]">
                            {branch.shortLabel}
                          </span>
                          <span className="text-[var(--muted-soft)]">{docsCount} docs</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>

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
                <div className="mt-5 grid gap-6 md:grid-cols-2">
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

              <section id="doc-map" className="scroll-mt-28">
                <h2 className="docs-overview-h2">{d.docMapTitle}</h2>
                <p className="mt-3 text-sm text-[var(--muted)]">{d.docMapLead}</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {DOC_BRANCHES.map((branch) => (
                    <Link
                      key={branch.id}
                      href={withLang(`/docs/secbot/${branch.id}`, locale)}
                      className="surface-card block p-4 no-underline hover:border-[var(--brand-end)]"
                    >
                      <p className="font-medium text-[var(--foreground)]">{branch.label}</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">{branch.summary}</p>
                    </Link>
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
            </div>
          </SectionBlock>
        </main>
        <SiteFooter messages={messages} />
      </div>
    </div>
  );
}
