import Link from "next/link";
import type { Locale } from "@/src/i18n/config";
import type { SiteMessages } from "@/src/i18n/messages";

type DocsTopStripProps = {
  locale: Locale;
  messages: SiteMessages;
  /** 文档总览页：页内锚点导航 */
  anchorNav?: { label: string; anchor: string }[];
};

function withLang(path: string, locale: Locale) {
  return `${path}?lang=${locale}`;
}

export function DocsTopStrip({ locale, messages, anchorNav }: DocsTopStripProps) {
  const { quickNavLabel, quickLinks } = messages.docs;

  return (
    <div className="docs-top-strip border-b border-[var(--line-weak)] bg-[var(--surface-muted)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:px-6">
        <p className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted-soft)]">
          {quickNavLabel}
        </p>
        <nav className="flex flex-wrap gap-x-3 gap-y-2 text-sm" aria-label={quickNavLabel}>
          {quickLinks.map((item) => (
            <Link
              key={item.viewPath}
              href={withLang(item.viewPath, locale)}
              className={`rounded-md px-2 py-1 no-underline hover:bg-[var(--panel)] hover:text-[var(--foreground)] ${
                item.emphasis ? "font-medium text-[var(--foreground)]" : "text-[var(--muted)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {anchorNav?.length ? (
          <div className="flex flex-wrap gap-2 border-t border-[var(--line-weak)] pt-2 text-xs">
            {anchorNav.map((a) => (
              <a
                key={a.anchor}
                href={`#${a.anchor}`}
                className="rounded-md px-2 py-1 text-[var(--muted)] no-underline hover:bg-[var(--panel)] hover:text-[var(--foreground)]"
              >
                {a.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
