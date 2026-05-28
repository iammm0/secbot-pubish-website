import { CopyCommandBlock } from "@/src/components/copy-command-block";
import { SiteFooter } from "@/src/components/site-footer";
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
        <main className="page-main flex flex-col items-center justify-center px-4">
          <div className="motion-enter mx-auto max-w-2xl py-20 text-center sm:py-32">
            <h1 className="font-mono text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
              {messages.brand.name}
            </h1>
            <p className="mt-4 text-lg text-[var(--muted)] sm:text-xl">
              {messages.home.heroSubtitle}
            </p>

            <div className="mt-8 inline-block w-full max-w-md">
              <CopyCommandBlock
                command={messages.home.tsCmd}
                hint={messages.common.copyHint}
                copyLabel={messages.common.copyCommand}
                copiedLabel={messages.common.copied}
              />
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com/iammm0/secbot/tree/npm-release"
                target="_blank"
                rel="noopener noreferrer"
                className="ui-button ui-button-primary"
              >
                {messages.home.ctaTs}
              </a>
              <a
                href="https://github.com/iammm0/secbot"
                target="_blank"
                rel="noopener noreferrer"
                className="ui-button"
              >
                {messages.common.viewGithub}
              </a>
            </div>
          </div>

          <div className="motion-enter motion-enter-delay-1 mx-auto w-full max-w-4xl pb-20">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {messages.home.highlights.map((item, index) => (
                <div
                  key={item}
                  className="surface-card p-5"
                >
                  <p className="font-mono text-xs text-[var(--muted-soft)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
        <SiteFooter messages={messages} />
      </div>
    </div>
  );
}
