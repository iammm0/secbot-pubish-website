"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

export interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const { resolvedTheme } = useTheme();
  const rawId = useId();
  const id = "m_" + rawId.replace(/[^a-zA-Z0-9]/g, "");
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    import("mermaid")
      .then(({ default: mermaid }) => {
        const isDark = resolvedTheme === "dark";

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: isDark ? "dark" : "neutral",
          themeVariables: isDark
            ? {
                darkMode: true,
                background: "#0f172a",
                mainBkg: "#1e293b",
                primaryColor: "#3b82f6",
                primaryTextColor: "#f8fafc",
                primaryBorderColor: "#475569",
                lineColor: "#94a3b8",
                secondaryColor: "#334155",
                tertiaryColor: "#1e293b",
              }
            : {
                darkMode: false,
                background: "#ffffff",
                mainBkg: "#f8fafc",
                primaryColor: "#2563eb",
                primaryTextColor: "#0f172a",
                primaryBorderColor: "#cbd5e1",
                lineColor: "#64748b",
              },
          fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        });

        return mermaid.render(id, chart);
      })
      .then(({ svg }) => {
        if (mounted) {
          setSvg(svg);
          setError(null);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : String(err));
        }
      });

    return () => {
      mounted = false;
    };
  }, [chart, resolvedTheme, id]);

  if (error) {
    return (
      <div className="my-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-400">
        <p className="font-semibold">流程图语法渲染异常：</p>
        <pre className="mt-2 overflow-x-auto text-[11px] leading-relaxed">{chart}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-6 flex min-h-[140px] items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 text-xs text-[var(--muted)]">
        <span className="inline-flex items-center gap-2">
          <svg className="h-4 w-4 animate-spin text-[var(--muted)]" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
          正在渲染流程图...
        </span>
      </div>
    );
  }

  return (
    <div
      className="mermaid-container my-6 overflow-x-auto rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 text-center shadow-xs [&>svg]:mx-auto [&>svg]:max-w-full [&>svg]:h-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
