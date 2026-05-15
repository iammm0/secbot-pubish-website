import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/src/components/site-footer";
import { DocMarkdown } from "@/src/components/doc-markdown";
import { DocSidebar } from "@/src/components/doc-sidebar";
import { DocTocSidebar } from "@/src/components/doc-toc-sidebar";
import { SiteHeader } from "@/src/components/site-header";
import { type Locale, defaultLocale, isLocale } from "@/src/i18n/config";
import { getMessages } from "@/src/i18n/messages";
import {
  type DocBranchId,
  isDocBranchId,
  listDocSections,
  listStaticSlugParams,
  readMarkdownFile,
  resolveMarkdownRelPath,
} from "@/src/lib/docs-fs";
import { extractMarkdownToc } from "@/src/lib/markdown-toc";

type BranchDocPageProps = {
  params: Promise<{ branch: string; slug?: string[] }>;
  searchParams?: Promise<{ lang?: string }>;
};

function withLang(path: string, locale: Locale) {
  return `${path}?lang=${locale}`;
}

function titleFromMarkdown(markdown: string, fallback: string): string {
  const titleLine = markdown.split(/\r?\n/).find((line) => line.trim().startsWith("# "));
  return titleLine ? titleLine.replace(/^#\s+/, "").trim() : fallback;
}

function stripLeadingTitle(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  let index = 0;
  while (index < lines.length && !lines[index].trim()) index += 1;
  if (!lines[index]?.trim().startsWith("# ")) return markdown;
  index += 1;
  while (index < lines.length && !lines[index].trim()) index += 1;
  return lines.slice(index).join("\n");
}

export async function generateStaticParams() {
  return listStaticSlugParams();
}

export async function generateMetadata({ params, searchParams }: BranchDocPageProps): Promise<Metadata> {
  const { branch, slug } = await params;
  if (!isDocBranchId(branch)) return {};
  const rel = resolveMarkdownRelPath(branch, slug ?? []);
  if (!rel) return {};
  const md = readMarkdownFile(branch, rel);
  if (!md) return {};
  const title = titleFromMarkdown(md, rel);
  return { title: `${title} – Secbot Docs` };
}

export default async function BranchDocPage({ params, searchParams }: BranchDocPageProps) {
  const { branch: branchParam, slug } = await params;
  const sp = await searchParams;
  const lang = sp?.lang;
  const locale: Locale = lang && isLocale(lang) ? lang : defaultLocale;
  const messages = getMessages(locale);

  if (!isDocBranchId(branchParam)) notFound();
  const branch = branchParam;
  const rel = resolveMarkdownRelPath(branch, slug ?? []);
  if (!rel) notFound();

  const rawMarkdown = readMarkdownFile(branch, rel);
  if (!rawMarkdown) notFound();

  const title = titleFromMarkdown(rawMarkdown, rel);
  const content = stripLeadingTitle(rawMarkdown);
  const toc = extractMarkdownToc(rawMarkdown);
  const sections = listDocSections(branch);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="site-shell flex min-h-screen flex-col">
        <SiteHeader locale={locale} messages={messages} />
        <div className="flex flex-1">
          <DocSidebar sections={sections} branchId={branch} locale={locale} />

          <main className="min-w-0 flex-1 px-4 py-8 sm:px-8">
            <nav className="mb-4 flex flex-wrap items-center gap-x-2 text-xs text-[var(--muted)]">
              <Link href={withLang("/docs", locale)} className="no-underline hover:text-[var(--foreground)]">
                文档
              </Link>
              <span>/</span>
              <span className="text-[var(--foreground)]">{title}</span>
            </nav>

            <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">{title}</h1>

            <div className="mt-6">
              <DocMarkdown markdown={content} branchId={branch} currentDocPath={rel} />
            </div>
          </main>

          <DocTocSidebar title={messages.docs.onPageTocTitle} items={toc} />
        </div>
        <SiteFooter messages={messages} />
      </div>
    </div>
  );
}
