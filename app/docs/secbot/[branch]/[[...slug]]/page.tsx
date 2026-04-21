import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/src/components/site-footer";
import { DocMarkdown } from "@/src/components/doc-markdown";
import { DocPageToc } from "@/src/components/doc-page-toc";
import { DocsTopStrip } from "@/src/components/docs-top-strip";
import { SiteHeader } from "@/src/components/site-header";
import { type Locale, defaultLocale, isLocale } from "@/src/i18n/config";
import { getMessages } from "@/src/i18n/messages";
import {
  DOC_BRANCHES,
  type DocBranch,
  type DocBranchId,
  getDocBranch,
  isDocBranchId,
  listDocEntries,
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

function branchHref(branchId: DocBranchId, locale: Locale) {
  return withLang(`/docs/secbot/${branchId}`, locale);
}

function docHref(branchId: DocBranchId, slug: string[], locale: Locale) {
  return withLang(`/docs/secbot/${branchId}/${slug.join("/")}`, locale);
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

function BranchSwitch({ activeBranchId, locale }: { activeBranchId: DocBranchId; locale: Locale }) {
  return (
    <div className="flex flex-wrap gap-2">
      {DOC_BRANCHES.map((branch) => {
        const active = branch.id === activeBranchId;
        return (
          <Link
            key={branch.id}
            href={branchHref(branch.id, locale)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium no-underline ${
              active
                ? "border-transparent bg-[var(--brand-end)] text-white"
                : "border-[var(--line)] text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {branch.label}
          </Link>
        );
      })}
    </div>
  );
}

function BranchHub({ branch, locale }: { branch: DocBranch; locale: Locale }) {
  const entries = listDocEntries(branch.id);
  const sections = listDocSections(branch.id);
  const recommended = entries
    .filter((entry) => ["quickstart", "api", "llm-providers", "deployment", "node-setup"].includes(entry.slugKey))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="site-shell flex min-h-screen flex-col">
        <SiteHeader locale={locale} messages={getMessages(locale)} />
        <DocsTopStrip locale={locale} messages={getMessages(locale)} />
        <main className="page-main">
          <div className="section-wrap border-t border-[var(--line-weak)]">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
              <nav className="mb-6 text-sm text-[var(--muted)]">
                <Link href={withLang("/docs", locale)} className="no-underline hover:text-[var(--foreground)]">
                  ← 文档分支
                </Link>
              </nav>

              <section className="surface-card p-5 sm:p-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted-soft)]">
                  {branch.badge}
                </p>
                <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]">{branch.label}</h1>
                <p className="mt-3 text-[var(--muted)]">{branch.summary}</p>
                <p className="mt-4 rounded-lg border border-[var(--line-weak)] bg-[var(--surface-muted)] px-3 py-2 font-mono text-sm text-[var(--foreground)]">
                  {branch.channel}
                </p>
                <div className="mt-5">
                  <BranchSwitch activeBranchId={branch.id} locale={locale} />
                </div>
              </section>

              {recommended.length ? (
                <section className="mt-10">
                  <h2 className="docs-overview-h2">推荐入口</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {recommended.map((entry) => (
                      <Link
                        key={entry.relPath}
                        href={docHref(branch.id, entry.slug, locale)}
                        className="surface-card block p-4 no-underline hover:border-[var(--brand-end)]"
                      >
                        <p className="font-medium text-[var(--foreground)]">{entry.title}</p>
                        <p className="mt-1 font-mono text-xs text-[var(--muted-soft)]">{entry.relPath}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="mt-10">
                <h2 className="docs-overview-h2">文档地图</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {sections.map((section) => (
                    <div key={section.title} className="surface-card p-4">
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-soft)]">
                        {section.title}
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm">
                        {section.items.map((entry) => (
                          <li key={entry.relPath}>
                            <Link href={docHref(branch.id, entry.slug, locale)} className="no-underline hover:text-[var(--brand-end)]">
                              {entry.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>
        <SiteFooter messages={getMessages(locale)} />
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return listStaticSlugParams();
}

export async function generateMetadata({ params }: BranchDocPageProps): Promise<Metadata> {
  const { branch, slug } = await params;
  const branchMeta = getDocBranch(branch);
  if (!branchMeta) return { title: "Docs" };
  if (!slug?.length) return { title: `${branchMeta.label} · Secbot Docs` };

  const rel = resolveMarkdownRelPath(branchMeta.id, slug);
  if (!rel) return { title: `${branchMeta.label} · Secbot Docs` };
  const markdown = readMarkdownFile(branchMeta.id, rel);
  const title = markdown ? titleFromMarkdown(markdown, rel.replace(/\.md$/i, "")) : rel;
  return { title: `${title} · ${branchMeta.label}` };
}

export default async function BranchDocPage({ params, searchParams }: BranchDocPageProps) {
  const { branch, slug } = await params;
  if (!isDocBranchId(branch)) notFound();

  const sp = await searchParams;
  const lang = sp?.lang;
  const locale: Locale = lang && isLocale(lang) ? lang : defaultLocale;
  const messages = getMessages(locale);
  const branchMeta = getDocBranch(branch);
  if (!branchMeta) notFound();

  if (!slug?.length) {
    return <BranchHub branch={branchMeta} locale={locale} />;
  }

  const rel = resolveMarkdownRelPath(branch, slug);
  if (!rel) notFound();

  const markdown = readMarkdownFile(branch, rel);
  if (markdown === null) notFound();

  const title = titleFromMarkdown(markdown, rel.replace(/\.md$/i, ""));
  const content = stripLeadingTitle(markdown);
  const toc = extractMarkdownToc(content);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="site-shell flex min-h-screen flex-col">
        <SiteHeader locale={locale} messages={messages} />
        <DocsTopStrip locale={locale} messages={messages} />
        <main className="page-main">
          <div className="section-wrap border-t border-[var(--line-weak)]">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--muted)]">
                <Link href={withLang("/docs", locale)} className="no-underline hover:text-[var(--foreground)]">
                  文档
                </Link>
                <span>/</span>
                <Link href={branchHref(branch, locale)} className="no-underline hover:text-[var(--foreground)]">
                  {branchMeta.label}
                </Link>
                <span>/</span>
                <span className="text-[var(--foreground)]">{title}</span>
              </nav>

              <article className="surface-card p-5 sm:p-6">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted-soft)]">
                  {branchMeta.badge} · {rel}
                </p>
                <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]">{title}</h1>
                <p className="docs-article-lead mt-4 text-sm italic text-[var(--muted)]">{messages.docs.articleLead}</p>
                <div className="mt-5">
                  <BranchSwitch activeBranchId={branch} locale={locale} />
                </div>
              </article>

              <div className="mt-8">
                <DocMarkdown markdown={content} branchId={branch} currentDocPath={rel} />
                <DocPageToc title={messages.docs.onPageTocTitle} items={toc} />
              </div>
            </div>
          </div>
        </main>
        <SiteFooter messages={messages} />
      </div>
    </div>
  );
}
