"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BookOpenText, GitBranch, House, Languages, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/src/components/theme-toggle";
import { type Locale, isLocale } from "@/src/i18n/config";
import type { SiteMessages } from "@/src/i18n/messages";

type SiteHeaderProps = {
  locale: Locale;
  messages: SiteMessages;
};

function withLang(path: string, locale: Locale): string {
  return `${path}?lang=${locale}`;
}

export function SiteHeader({ locale, messages }: SiteHeaderProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const nextLocale: Locale = locale === "zh-CN" ? "en-US" : "zh-CN";

  const currentLang = searchParams.get("lang");
  const safeCurrentLang = currentLang && isLocale(currentLang) ? currentLang : locale;

  const navLinks = [
    { href: withLang("/", safeCurrentLang), label: messages.nav.home, active: pathname === "/", icon: House },
    {
      href: withLang("/docs", safeCurrentLang),
      label: messages.nav.docs,
      active: pathname === "/docs" || pathname.startsWith("/docs/"),
      icon: BookOpenText,
    },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line-weak)] bg-[var(--header-bg)] backdrop-blur-md">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <Link href={withLang("/", safeCurrentLang)} className="min-w-0 shrink no-underline">
            <p className="truncate font-mono text-lg font-semibold tracking-tight text-[var(--foreground)]">{messages.brand.name}</p>
            <p className="hidden text-xs text-[var(--muted)] sm:block">{messages.brand.tagline}</p>
          </Link>

          <nav className="hidden items-center gap-1 text-sm md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${item.active ? "nav-link-active" : ""}`.trim()}
                aria-label={item.label}
                title={item.label}
              >
                <span className="inline-flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </span>
              </Link>
            ))}
            <a
              className="nav-link"
              href="https://github.com/iammm0/secbot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={messages.nav.github}
              title={messages.nav.github}
            >
              <span className="inline-flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                {messages.nav.github}
              </span>
            </a>
            <Link
              href={withLang(pathname || "/", nextLocale)}
              className="ui-button"
              aria-label={messages.common.language}
              title={messages.common.language}
            >
              <Languages className="h-4 w-4" />
              {messages.common.language}
            </Link>
            <ThemeToggle ariaLabel={messages.common.toggleTheme} showLabel label={messages.common.themeLabel} />
          </nav>

          <button
            type="button"
            className="ui-button md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? messages.common.closeMenu : messages.common.openMenu}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span>{mobileOpen ? messages.common.closeMenu : messages.common.openMenu}</span>
          </button>
        </div>

        <nav
          className={`mt-4 space-y-2 rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 md:hidden ${
            mobileOpen ? "block" : "hidden"
          }`}
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-md px-3 py-2 text-sm no-underline ${
                item.active
                  ? "border border-[var(--line)] bg-[var(--surface-muted)] text-[var(--foreground)]"
                  : "text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <item.icon className="h-4 w-4" />
                {item.label}
              </span>
            </Link>
          ))}
          <a
            className="block rounded-md px-3 py-2 text-sm text-[var(--muted)] no-underline hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
            href="https://github.com/iammm0/secbot"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
          >
            <span className="inline-flex items-center gap-2">
              <GitBranch className="h-4 w-4" />
              {messages.nav.github}
            </span>
          </a>
          <div className="mt-3 flex items-center gap-2 border-t border-[var(--line-weak)] pt-3">
            <Link href={withLang(pathname || "/", nextLocale)} className="ui-button" onClick={() => setMobileOpen(false)}>
              <Languages className="h-4 w-4" />
              {messages.common.language}
            </Link>
            <ThemeToggle ariaLabel={messages.common.toggleTheme} showLabel label={messages.common.themeLabel} />
          </div>
        </nav>
      </div>
    </header>
  );
}
