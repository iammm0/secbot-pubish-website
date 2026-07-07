import type { ReactNode } from "react";

type DocTocSidebarProps = {
  title: string;
  items: Array<{
    title?: ReactNode;
    text?: ReactNode;
    url?: string;
    id?: string;
    depth?: number;
  }>;
};

export function DocTocSidebar({ title, items }: DocTocSidebarProps) {
  if (!items.length) return null;

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-52 shrink-0 overflow-y-auto border-l border-[var(--line)] p-4 text-sm xl:block">
      <p className="mb-3 font-mono text-[0.65rem] font-semibold uppercase text-[var(--muted-soft)]">
        {title}
      </p>
      <nav aria-label={title}>
        <ul className="space-y-1">
          {items.map((it, index) => {
            const label = it.title ?? it.text ?? "";
            const href = it.url ?? (it.id ? `#${it.id}` : "#");
            const depth = it.depth ?? 2;

            if (label === "" || label === null || label === undefined || label === false) return null;

            return (
            <li key={`${href}-${index}`}>
              <a
                href={href}
                className={`doc-toc-link block rounded-md px-2 py-0.5 text-xs no-underline transition-colors text-[var(--muted)] hover:text-[var(--foreground)] ${
                  depth >= 3 ? "pl-4" : ""
                }`}
              >
                {label}
              </a>
            </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
