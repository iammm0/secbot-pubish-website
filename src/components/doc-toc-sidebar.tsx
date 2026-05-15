"use client";

import type { MarkdownTocItem } from "@/src/lib/markdown-toc";

type DocTocSidebarProps = {
  title: string;
  items: MarkdownTocItem[];
};

export function DocTocSidebar({ title, items }: DocTocSidebarProps) {
  if (!items.length) return null;

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-52 shrink-0 overflow-y-auto border-l border-[var(--line)] p-4 text-sm xl:block">
      <p className="mb-3 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted-soft)]">
        {title}
      </p>
      <nav aria-label={title}>
        <ul className="space-y-1">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={`block rounded-md px-2 py-0.5 text-xs no-underline transition-colors text-[var(--muted)] hover:text-[var(--foreground)] ${
                  it.depth >= 3 ? "pl-4" : ""
                }`}
              >
                {it.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
