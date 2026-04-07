import { SiteFooter } from "@/src/components/site-footer";
import { SectionBlock } from "@/src/components/section-block";
import { SiteHeader } from "@/src/components/site-header";
import { type Locale, defaultLocale, isLocale } from "@/src/i18n/config";
import { getMessages } from "@/src/i18n/messages";

type DocsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

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
            <div className="grid gap-4 md:grid-cols-2">
              {messages.docs.links.map((item, index) => (
                <a
                  key={item.href}
                  className="surface-card motion-enter block p-5 no-underline hover:bg-[var(--surface-muted)] motion-enter-delay-1"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--muted-soft)]">
                    [{String(index + 1).padStart(2, "0")}]
                  </p>
                  <p className="mt-3 text-base text-[var(--foreground)]">{item.label}</p>
                  <p className="mt-2 font-mono text-xs text-[var(--muted-soft)]">github.com/iammm0/secbot</p>
                </a>
              ))}
            </div>
          </SectionBlock>
        </main>
        <SiteFooter messages={messages} />
      </div>
    </div>
  );
}
