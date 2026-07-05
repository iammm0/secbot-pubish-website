import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocSidebar } from "@/src/components/doc-sidebar";
import { DocTocSidebar } from "@/src/components/doc-toc-sidebar";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { defaultLocale } from "@/src/i18n/config";
import { getMessages } from "@/src/i18n/messages";
import { getDocsNavSections, getDocSiblings } from "@/src/lib/docs-nav";
import { source } from "@/src/lib/source";
import { getMDXComponents } from "@/mdx-components";

type DocsRouteProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

function normalizeTitle(title: unknown, fallback: string): string {
  return typeof title === "string" && title.trim() ? title.trim() : fallback;
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: DocsRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    return {};
  }

  const title = normalizeTitle(page.data.title, "SecBot 文档");
  const description =
    typeof page.data.description === "string" && page.data.description.trim()
      ? page.data.description
      : "SecBot 中文文档站：生态边界、主项目文档、运行与执行链路。";

  return {
    title: `${title} - SecBot 文档`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

export default async function DocsRoutePage({ params }: DocsRouteProps) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    notFound();
  }

  const messages = getMessages(defaultLocale);
  const navSections = getDocsNavSections();
  const { previous, next } = getDocSiblings(slug);
  const MDXContent = page.data.body;
  const title = normalizeTitle(page.data.title, "SecBot 文档");
  const description =
    typeof page.data.description === "string" && page.data.description.trim()
      ? page.data.description
      : undefined;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="docs-shell flex min-h-screen flex-col">
        <SiteHeader locale={defaultLocale} messages={messages} />
        <div className="flex flex-1 flex-col lg:flex-row">
          <DocSidebar sections={navSections} />

          <main className="w-full min-w-0 flex-1 px-4 py-8 sm:px-8 xl:px-10">
            <article className="mx-auto w-full max-w-5xl">
              <nav className="mb-4 flex flex-wrap items-center gap-x-2 text-xs text-[var(--muted)]">
                <Link href="/docs" className="no-underline hover:text-[var(--foreground)]">
                  文档
                </Link>
                {page.slugs.map((part, index) => (
                  <span key={`${part}-${index}`} className="inline-flex items-center gap-x-2">
                    <span>/</span>
                    <span className={index === page.slugs.length - 1 ? "text-[var(--foreground)]" : ""}>
                      {index === page.slugs.length - 1 ? title : part}
                    </span>
                  </span>
                ))}
              </nav>

              <h1 className="text-3xl font-semibold text-[var(--foreground)]">{title}</h1>
              {description ? <p className="mt-3 text-base text-[var(--muted)]">{description}</p> : null}

              <div className="doc-mdx mt-8">
                <MDXContent components={getMDXComponents()} />
              </div>

              <nav className="mt-12 grid gap-3 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
                {previous ? (
                  <Link href={previous.url} className="surface-card block p-4 no-underline hover:border-[var(--muted-soft)]">
                    <p className="font-mono text-xs text-[var(--muted-soft)]">上一篇</p>
                    <p className="mt-1 text-sm font-medium text-[var(--foreground)]">
                      {normalizeTitle(previous.data.title, previous.slugs.at(-1) ?? "文档")}
                    </p>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link href={next.url} className="surface-card block p-4 text-right no-underline hover:border-[var(--muted-soft)]">
                    <p className="font-mono text-xs text-[var(--muted-soft)]">下一篇</p>
                    <p className="mt-1 text-sm font-medium text-[var(--foreground)]">
                      {normalizeTitle(next.data.title, next.slugs.at(-1) ?? "文档")}
                    </p>
                  </Link>
                ) : null}
              </nav>
            </article>
          </main>

          <DocTocSidebar title="本页目录" items={page.data.toc ?? []} />
        </div>
        <SiteFooter messages={messages} />
      </div>
    </div>
  );
}
