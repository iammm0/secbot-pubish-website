import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/src/components/site-footer";
import { DocMarkdown } from "@/src/components/doc-markdown";
import { SiteHeader } from "@/src/components/site-header";
import { type Locale, defaultLocale, isLocale } from "@/src/i18n/config";
import { getMessages } from "@/src/i18n/messages";
import { listStaticSlugParams, readMarkdownFile, resolveMarkdownRelPath } from "@/src/lib/docs-fs";

type DocViewPageProps = {
  params: Promise<{ slug?: string[] }>;
  searchParams?: Promise<{ lang?: string }>;
};

function withLang(path: string, locale: Locale) {
  return `${path}?lang=${locale}`;
}

export function generateStaticParams() {
  return listStaticSlugParams();
}

export async function generateMetadata({ params }: DocViewPageProps) {
  const { slug } = await params;
  if (!slug?.length) return { title: "Docs" };
  const rel = resolveMarkdownRelPath(slug);
  const title = rel ? rel.replace(/\.md$/i, "").split("/").pop() ?? "Docs" : "Docs";
  return { title: `${title} · Secbot Docs` };
}

export default async function DocViewPage({ params, searchParams }: DocViewPageProps) {
  const { slug } = await params;
  if (!slug?.length) notFound();

  const rel = resolveMarkdownRelPath(slug);
  if (!rel) notFound();

  const markdown = readMarkdownFile(rel);
  if (markdown === null) notFound();

  const sp = await searchParams;
  const lang = sp?.lang;
  const locale: Locale = lang && isLocale(lang) ? lang : defaultLocale;
  const messages = getMessages(locale);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="site-shell flex min-h-screen flex-col">
        <SiteHeader locale={locale} messages={messages} />
        <main className="page-main">
          <div className="section-wrap border-t border-[var(--line-weak)]">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <nav className="mb-8 text-sm text-[var(--muted)]">
                <Link href={withLang("/docs", locale)} className="no-underline hover:text-[var(--foreground)]">
                  ← {messages.docs.backToHub}
                </Link>
              </nav>
              <DocMarkdown markdown={markdown} />
            </div>
          </div>
        </main>
        <SiteFooter messages={messages} />
      </div>
    </div>
  );
}
