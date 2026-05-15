import type { SiteMessages } from "@/src/i18n/messages";

type SiteFooterProps = {
  messages: SiteMessages;
};

export function SiteFooter({ messages }: SiteFooterProps) {
  return (
    <footer className="border-t border-[var(--line)] px-4 py-6 text-center text-xs text-[var(--muted-soft)] sm:px-6">
      <p>{messages.footer.warning}</p>
      <p className="mt-2 font-mono">&copy; {new Date().getFullYear()} Secbot</p>
    </footer>
  );
}
