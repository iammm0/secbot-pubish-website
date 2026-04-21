import type { MarkdownTocItem } from "@/src/lib/markdown-toc";

type DocPageTocProps = {
  title: string;
  items: MarkdownTocItem[];
};

export function DocPageToc({ title, items }: DocPageTocProps) {
  if (!items.length) return null;

  return (
    <nav className="doc-onpage-toc mt-12 border-t border-[var(--line-weak)] pt-8" aria-label={title}>
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted-soft)]">{title}</p>
      <ul className="mt-3 space-y-1.5 text-sm text-[var(--muted)]">
        {items.map((it) => (
          <li
            key={it.id}
            className={it.depth >= 3 ? "border-l border-[var(--line-weak)] pl-3" : it.depth === 2 ? "pl-1" : ""}
          >
            <a href={`#${it.id}`} className="no-underline hover:text-[var(--foreground)]">
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
