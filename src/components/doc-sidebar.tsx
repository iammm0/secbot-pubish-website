"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DocSection } from "@/src/lib/docs-fs";
import type { Locale } from "@/src/i18n/config";

type DocSidebarProps = {
  sections: DocSection[];
  branchId: string;
  locale: Locale;
};

function withLang(path: string, locale: Locale) {
  return `${path}?lang=${locale}`;
}

export function DocSidebar({ sections, branchId, locale }: DocSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r border-[var(--line)] p-4 text-sm lg:block">
      <nav aria-label="Documentation navigation">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            <p className="mb-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--muted-soft)]">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const href = withLang(item.href, locale);
                const active = pathname === item.href;
                return (
                  <li key={item.slugKey}>
                    <Link
                      href={href}
                      className={`block rounded-md px-2 py-1 text-xs no-underline transition-colors ${
                        active
                          ? "bg-[var(--surface-muted)] text-[var(--foreground)]"
                          : "text-[var(--muted)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
