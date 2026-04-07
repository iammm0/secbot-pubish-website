import { SiteFooter } from "@/src/components/site-footer";
import { SectionBlock } from "@/src/components/section-block";
import { SiteHeader } from "@/src/components/site-header";
import { VersionCard } from "@/src/components/version-card";
import { type Locale, defaultLocale, isLocale } from "@/src/i18n/config";
import { getMessages } from "@/src/i18n/messages";

type DownloadPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export default async function DownloadPage({ searchParams }: DownloadPageProps) {
  const params = await searchParams;
  const lang = params?.lang;
  const locale: Locale = lang && isLocale(lang) ? lang : defaultLocale;
  const messages = getMessages(locale);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="site-shell flex min-h-screen flex-col">
        <SiteHeader locale={locale} messages={messages} />
        <main className="page-main">
          <SectionBlock title={messages.download.title} subtitle={messages.download.subtitle}>
            <div className="grid gap-5 md:grid-cols-2">
              <VersionCard
                title={messages.download.tsTitle}
                description={messages.download.tsDesc}
                command={messages.download.tsCmd}
                hint={messages.common.copyHint}
                copyLabel={messages.common.copyCommand}
                copiedLabel={messages.common.copied}
                href="https://www.npmjs.com/package/@opensec/secbot"
                platform="npm"
              />
              <VersionCard
                title={messages.download.pyTitle}
                description={messages.download.pyDesc}
                command={messages.download.pyCmd}
                hint={messages.common.copyHint}
                copyLabel={messages.common.copyCommand}
                copiedLabel={messages.common.copied}
                href="https://pypi.org/project/secbot/"
                platform="pypi"
              />
            </div>
          </SectionBlock>
        </main>
        <SiteFooter messages={messages} />
      </div>
    </div>
  );
}
