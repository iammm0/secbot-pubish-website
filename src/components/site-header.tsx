"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookOpenText, GitBranch, House, Menu, PlayCircle, Route, X } from "lucide-react";
import { ThemeToggle } from "@/src/components/theme-toggle";
import type { SiteMessages } from "@/src/i18n/messages";

type SiteHeaderProps = {
  messages: SiteMessages;
};

export function SiteHeader({ messages }: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: messages.nav.home, active: pathname === "/", icon: House },
    {
      href: "/docs",
      label: messages.nav.docs,
      active: pathname === "/docs" || pathname.startsWith("/docs/"),
      icon: BookOpenText,
    },
    {
      href: "/docs/secbot",
      label: messages.nav.start,
      active: pathname === "/docs/secbot" || pathname.startsWith("/docs/secbot/"),
      icon: PlayCircle,
    },
    {
      href: "/docs/runtime",
      label: messages.nav.runtime,
      active: pathname === "/docs/runtime" || pathname.startsWith("/docs/runtime/"),
      icon: Route,
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[var(--header-bg)] backdrop-blur-md">
      <div className="px-3 py-3 sm:px-6 sm:py-4">
        <div className="flex items-start justify-between gap-4">
          <Link href="/" className="flex min-w-0 shrink items-center gap-3 no-underline">
            <Image
              src="/secbot-icon.png"
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 object-contain"
              priority
            />
            <div className="min-w-0">
              <p className="truncate font-mono text-lg font-semibold text-[var(--foreground)]">{messages.brand.name}</p>
              <p className="hidden text-xs text-[var(--muted)] sm:block">{messages.brand.tagline}</p>
            </div>
          </Link>

          <nav className="site-desktop-nav items-center gap-1 text-sm">
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
            <ThemeToggle ariaLabel={messages.common.toggleTheme} showLabel label={messages.common.themeLabel} />
          </nav>

          <button
            type="button"
            className="site-menu-button ui-button shrink-0"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? messages.common.closeMenu : messages.common.openMenu}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="hidden min-[360px]:inline">{mobileOpen ? messages.common.closeMenu : messages.common.openMenu}</span>
          </button>
        </div>

        <nav
          className={`site-mobile-nav-panel mt-4 space-y-2 rounded-lg border border-[var(--line)] bg-[var(--panel)] p-3 ${
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
            <ThemeToggle ariaLabel={messages.common.toggleTheme} showLabel label={messages.common.themeLabel} />
          </div>
        </nav>
      </div>
    </header>
  );
}
