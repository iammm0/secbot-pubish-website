import Link from "next/link";
import { SiteFooter } from "@/src/components/site-footer";
import { DocSidebar } from "@/src/components/doc-sidebar";
import { SiteHeader } from "@/src/components/site-header";
import { type Locale, defaultLocale, isLocale } from "@/src/i18n/config";
import { getMessages } from "@/src/i18n/messages";
import { listDocSections } from "@/src/lib/docs-fs";

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
  const sections = listDocSections("npm-release");

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="docs-shell flex min-h-screen flex-col">
        <SiteHeader locale={locale} messages={messages} />
        <div className="flex flex-1 flex-col lg:flex-row">
          <DocSidebar sections={sections} branchId="npm-release" locale={locale} />

          <main className="w-full min-w-0 flex-1 px-4 py-8 sm:px-8">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">{d.title}</h1>
              <p className="mt-2 text-sm text-[var(--muted)]">{d.subtitle}</p>

              <section id="where-to-start" className="mt-10 scroll-mt-20">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">{d.whereToStartTitle}</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">{d.whereToStartIntro}</p>
                <ul className="mt-4 space-y-3 text-sm">
                  {d.whereToStartBullets.map((row, idx) => (
                    <li key={idx}>
                      <span className="text-[var(--muted)]">{row.text}</span>{" "}
                      {row.links.map((link, i) => (
                        <span key={link.viewPath}>
                          {i > 0 ? "、" : null}
                          <Link
                            href={withLang(link.viewPath, locale)}
                            className="text-[var(--brand-start)] no-underline hover:underline"
                          >
                            {link.label}
                          </Link>
                        </span>
                      ))}
                    </li>
                  ))}
                </ul>
              </section>

              <section id="recommended-paths" className="mt-10 scroll-mt-20">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">{d.recommendedPathsTitle}</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {d.recommendedPaths.map((path) => (
                    <div key={path.title} className="surface-card p-4">
                      <p className="font-mono text-xs font-semibold text-[var(--muted-soft)]">{path.title}</p>
                      <ol className="mt-3 list-decimal space-y-1.5 pl-4 text-sm text-[var(--muted)]">
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

              <section id="doc-scope" className="mt-10 scroll-mt-20">
                <h2 className="text-lg font-semibold text-[var(--foreground)]">{d.scopeTitle}</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
                  {d.scopeBullets.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </section>
            </div>
          </main>

          {/* Right sidebar: anchor nav for this overview page */}
          <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-52 shrink-0 overflow-y-auto border-l border-[var(--line)] p-4 text-sm xl:block">
            <p className="mb-3 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted-soft)]">
              {d.quickNavLabel}
            </p>
            <nav>
              <ul className="space-y-1">
                {d.anchorNav.map((a) => (
                  <li key={a.anchor}>
                    <a
                      href={`#${a.anchor}`}
                      className="block rounded-md px-2 py-0.5 text-xs text-[var(--muted)] no-underline hover:text-[var(--foreground)]"
                    >
                      {a.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
        <SiteFooter messages={messages} />
      </div>
    </div>
  );
}
