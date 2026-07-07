"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { DocsNavSection } from "@/src/lib/docs-nav";

type DocSidebarProps = {
  sections: DocsNavSection[];
};

export function DocSidebar({ sections }: DocSidebarProps) {
  const pathname = usePathname();
  const mobileLabel = "文档目录";

  function renderNav(linkClassName: (active: boolean) => string) {
    return sections.map((section) => (
      <div key={section.title} className="mb-4 last:mb-0">
        <Link
          href={section.href}
          aria-current={pathname === section.href ? "page" : undefined}
          className={`doc-nav-section mb-1.5 block rounded-md px-2 py-1 font-mono text-[0.68rem] font-semibold uppercase no-underline transition-colors ${
            pathname === section.href
              ? "bg-[var(--surface-muted)] text-[var(--foreground)]"
              : "text-[var(--muted-soft)] hover:text-[var(--foreground)]"
          }`}
        >
          {section.title}
        </Link>
        <ul className="space-y-0.5">
          {section.items.map((item) => {
            const active = pathname === item.href;

            return (
              <li key={item.href}>
                <Link href={item.href} aria-current={active ? "page" : undefined} className={`${linkClassName(active)} ${item.depth > 0 ? "pl-5" : ""}`}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    ));
  }

  return (
    <>
      <div className="border-b border-[var(--line)] bg-[var(--background)] px-3 py-3 lg:hidden">
        <details className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--foreground)]">
            <span className="inline-flex min-w-0 items-center gap-2">
              <span className="font-mono text-xs text-[var(--muted-soft)]">文档</span>
              <span className="truncate">{mobileLabel}</span>
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180" />
          </summary>
          <nav
            aria-label="文档导航"
            className="mt-3 max-h-[62vh] overflow-y-auto rounded-lg border border-[var(--line)] bg-[var(--surface)] p-3"
          >
            {renderNav((active) =>
              `doc-nav-link block rounded-md px-2 py-1.5 text-sm no-underline transition-colors ${
                active
                  ? "bg-[var(--surface-muted)] text-[var(--foreground)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`
            )}
          </nav>
        </details>
      </div>

      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto overscroll-contain border-r border-[var(--line)] p-4 text-sm lg:block xl:w-60">
        <nav aria-label="文档导航">
          {renderNav((active) =>
            `doc-nav-link block rounded-md px-2 py-1 text-xs no-underline transition-colors ${
              active
                ? "bg-[var(--surface-muted)] text-[var(--foreground)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`
          )}
        </nav>
      </aside>
    </>
  );
}
