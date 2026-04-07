import { SiteFooter } from "@/src/components/site-footer";
import { SectionBlock } from "@/src/components/section-block";
import { SiteHeader } from "@/src/components/site-header";
import { type Locale, defaultLocale, isLocale } from "@/src/i18n/config";
import { getMessages } from "@/src/i18n/messages";

type ChangelogPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export default async function ChangelogPage({ searchParams }: ChangelogPageProps) {
  const params = await searchParams;
  const lang = params?.lang;
  const locale: Locale = lang && isLocale(lang) ? lang : defaultLocale;
  const messages = getMessages(locale);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="site-shell flex min-h-screen flex-col">
        <SiteHeader locale={locale} messages={messages} />
        <main className="page-main">
          <SectionBlock title={messages.changelog.title} subtitle={messages.changelog.subtitle}>
            <div className="space-y-4">
              {messages.changelog.items.map((item, index) => (
                <article key={`${item.version}-${item.date}`} className="surface-card motion-enter p-5 motion-enter-delay-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2">
                      <span className="rounded-md border border-[var(--line)] bg-[var(--surface-muted)] px-2 py-1 font-mono text-xs text-[var(--muted-soft)]">
                        [{String(index + 1).padStart(2, "0")}]
                      </span>
                      <h3 className="font-mono text-lg font-semibold text-[var(--foreground)]">{item.version}</h3>
                    </div>
                    <p className="font-mono text-xs text-[var(--muted-soft)]">{item.date}</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.notes}</p>
                </article>
              ))}
            </div>
          </SectionBlock>
        </main>
        <SiteFooter messages={messages} />
      </div>
    </div>
  );
}
