import { CopyCommandBlock } from "@/src/components/copy-command-block";
import { SiteFooter } from "@/src/components/site-footer";
import { SectionBlock } from "@/src/components/section-block";
import { SiteHeader } from "@/src/components/site-header";
import { type Locale, defaultLocale, isLocale } from "@/src/i18n/config";
import { getMessages } from "@/src/i18n/messages";

type HomeProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const lang = params?.lang;
  const locale: Locale = lang && isLocale(lang) ? lang : defaultLocale;
  const messages = getMessages(locale);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="site-shell flex min-h-screen flex-col">
        <SiteHeader locale={locale} messages={messages} />
        <main className="page-main">
          <SectionBlock title={messages.home.heroTitle}>
            <div className="surface-card motion-enter p-5 sm:p-7">
              <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">{messages.home.heroSubtitle}</p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <article className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--muted-soft)]">
                    {messages.home.tsTitle}
                  </p>
                  <CopyCommandBlock
                    command={messages.home.tsCmd}
                    hint={messages.common.copyHint}
                    copyLabel={messages.common.copyCommand}
                    copiedLabel={messages.common.copied}
                  />
                </article>
                <article className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--muted-soft)]">
                    {messages.home.pyTitle}
                  </p>
                  <CopyCommandBlock
                    command={messages.home.pyCmd}
                    hint={messages.common.copyHint}
                    copyLabel={messages.common.copyCommand}
                    copiedLabel={messages.common.copied}
                  />
                </article>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://www.npmjs.com/package/@opensec/secbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-button ui-button-primary"
                >
                  {messages.home.ctaTs}
                </a>
                <a href="https://pypi.org/project/secbot/" target="_blank" rel="noopener noreferrer" className="ui-button">
                  {messages.home.ctaPy}
                </a>
                <a href="https://github.com/iammm0/secbot" target="_blank" rel="noopener noreferrer" className="ui-button">
                  {messages.common.viewGithub}
                </a>
              </div>
            </div>
          </SectionBlock>

          <SectionBlock title={messages.home.highlightTitle}>
            <div className="grid gap-4 md:grid-cols-3">
              {messages.home.highlights.map((item, index) => (
                <article
                  key={item}
                  className="surface-card motion-enter p-5 text-[var(--foreground)] motion-enter-delay-1"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--muted-soft)]">
                    [{String(index + 1).padStart(2, "0")}]
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item}</p>
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
