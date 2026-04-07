import { GithubIcon } from "@/src/components/brand-icons";
import type { SiteMessages } from "@/src/i18n/messages";

type SiteFooterProps = {
  messages: SiteMessages;
};

export function SiteFooter({ messages }: SiteFooterProps) {
  return (
    <footer className="border-t border-[var(--line-weak)] bg-[var(--surface)]">
      <div className="grid gap-0 border-t border-[var(--line-weak)] sm:grid-cols-3">
        <div className="border-b border-[var(--line-weak)] px-4 py-4 text-sm text-[var(--muted)] sm:border-b-0 sm:border-r sm:px-6">
          {messages.footer.warning}
        </div>
        <a
          className="inline-flex items-center gap-2 border-b border-[var(--line-weak)] px-4 py-4 text-sm text-[var(--foreground)] no-underline hover:bg-[var(--surface-muted)] sm:border-b-0 sm:border-r sm:px-6"
          href="https://github.com/iammm0"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon className="h-4 w-4 text-[var(--brand-start)]" />
          GitHub ID: @iammm0
        </a>
        <a
          className="px-4 py-4 text-sm text-[var(--foreground)] no-underline hover:bg-[var(--surface-muted)] sm:px-6"
          href="mailto:wisewater5419@gmail.com"
        >
          Email: wisewater5419@gmail.com
        </a>
      </div>
      <div className="border-t border-[var(--line-weak)] px-4 py-4 text-xs text-[var(--muted-soft)] sm:px-6">
        <p className="font-mono">Secbot Publish Site</p>
        <p className="mt-1">{new Date().getFullYear()} Secbot</p>
      </div>
    </footer>
  );
}
