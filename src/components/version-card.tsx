"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { GithubIcon, NpmIcon, PypiIcon } from "@/src/components/brand-icons";

type VersionCardProps = {
  title: string;
  description: string;
  command: string;
  hint: string;
  href: string;
  platform: "npm" | "pypi" | "github";
  copyLabel: string;
  copiedLabel: string;
};

export function VersionCard({
  title,
  description,
  command,
  hint,
  href,
  platform,
  copyLabel,
  copiedLabel,
}: VersionCardProps) {
  const Icon = platform === "npm" ? NpmIcon : platform === "pypi" ? PypiIcon : GithubIcon;
  const platformLabel = platform.toUpperCase();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="surface-card motion-enter p-5 sm:p-6">
      <div className="flex items-center justify-between gap-2 text-[var(--foreground)]">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-[var(--brand-start)]" />
          <h3 className="font-mono text-lg font-semibold sm:text-xl">{title}</h3>
        </div>
        <span className="rounded-md border border-[var(--line)] bg-[var(--surface-muted)] px-2 py-1 font-mono text-xs text-[var(--muted)]">
          {platformLabel}
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="command-block flex-1">{command}</div>
        <button
          type="button"
          className="ui-button"
          onClick={handleCopy}
          aria-label={copyLabel}
          title={copyLabel}
        >
          {copied ? <Check className="h-4 w-4 text-[var(--brand-start)]" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? copiedLabel : copyLabel}</span>
        </button>
      </div>

      <p className="mt-2 text-xs text-[var(--muted-soft)]">{hint}</p>
      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{description}</p>

      <a
        className="ui-button ui-button-primary mt-5"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open
      </a>
    </article>
  );
}
