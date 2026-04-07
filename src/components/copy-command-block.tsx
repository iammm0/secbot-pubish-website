"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyCommandBlockProps = {
  command: string;
  hint: string;
  copyLabel: string;
  copiedLabel: string;
};

export function CopyCommandBlock({ command, hint, copyLabel, copiedLabel }: CopyCommandBlockProps) {
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
    <>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="command-block flex-1">{command}</div>
        <button type="button" className="ui-button" onClick={handleCopy} aria-label={copyLabel} title={copyLabel}>
          {copied ? <Check className="h-4 w-4 text-[var(--brand-start)]" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? copiedLabel : copyLabel}</span>
        </button>
      </div>
      <p className="mt-2 text-xs text-[var(--muted-soft)]">{hint}</p>
    </>
  );
}
