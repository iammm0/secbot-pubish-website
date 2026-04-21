import Link from "next/link";
import { SiteFooter } from "@/src/components/site-footer";
import { SectionBlock } from "@/src/components/section-block";
import { SiteHeader } from "@/src/components/site-header";
import { type Locale, defaultLocale, isLocale } from "@/src/i18n/config";
import { getMessages } from "@/src/i18n/messages";

type DocsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

function withLang(path: string, locale: Locale) {
  return `${path}?lang=${locale}`;
}

function upstreamGithubUrl(docRel: string) {
  if (docRel === "README.md") {
    return "https://github.com/iammm0/secbot/tree/main/docs";
  }
  return `https://github.com/iammm0/secbot/blob/main/docs/${docRel.split("/").map(encodeURIComponent).join("/")}`;
}

export default async function DocsPage({ searchParams }: DocsPageProps) {
  const params = await searchParams;
  const lang = params?.lang;
  const locale: Locale = lang && isLocale(lang) ? lang : defaultLocale;
  const messages = getMessages(locale);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="site-shell flex min-h-screen flex-col">
        <SiteHeader locale={locale} messages={messages} />
        <main className="page-main">
          <SectionBlock title={messages.docs.title} subtitle={messages.docs.subtitle}>
            <p className="mb-10 max-w-3xl text-sm text-[var(--muted)]">{messages.docs.moreInTree}</p>
            <div className="flex flex-col gap-12">
              {messages.docs.sections.map((section, sIndex) => (
                <section key={section.title}>
                  <h2 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-soft)]">
                    [{String(sIndex + 1).padStart(2, "0")}] {section.title}
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {section.items.map((item, index) => (
                      <div
                        key={item.viewPath}
                        className="surface-card motion-enter flex flex-col p-5 motion-enter-delay-1"
                        style={{ animationDelay: `${Math.min(index * 40, 200)}ms` }}
                      >
                        <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--muted-soft)]">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <Link
                          href={withLang(item.viewPath, locale)}
                          className="mt-3 text-base font-medium text-[var(--foreground)] no-underline hover:underline"
                        >
                          {item.label}
                        </Link>
                        {item.description ? <p className="mt-2 text-sm text-[var(--muted)]">{item.description}</p> : null}
                        <div className="mt-4 flex flex-wrap gap-3 border-t border-[var(--line-weak)] pt-4">
                          <a
                            className="ui-button text-xs no-underline"
                            href={upstreamGithubUrl(item.docRel)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {messages.docs.githubSource}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </SectionBlock>
        </main>
        <SiteFooter messages={messages} />
      </div>
    </div>
  );
}
