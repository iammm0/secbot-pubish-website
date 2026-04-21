"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type DocMarkdownProps = {
  markdown: string;
};

/** 将正文中指向 GitHub 上 docs/*.md 的链接改为本站 /docs/view/…，避免阅读时再跳转到 GitHub。 */
function githubBlobDocsToViewPath(href: string): string | null {
  try {
    const u = new URL(href);
    if (u.hostname !== "github.com") return null;
    const match = u.pathname.match(/^\/iammm0\/secbot\/blob\/[^/]+\/docs\/(.+)$/i);
    if (!match) return null;
    const tail = match[1];
    if (!tail.toLowerCase().endsWith(".md")) return null;
    const decoded = tail.split("/").map((p) => decodeURIComponent(p)).join("/");
    const slug = decoded.slice(0, -3).split("/").map((s) => s.toLowerCase()).join("/");
    return `/docs/view/${slug}`;
  } catch {
    return null;
  }
}

export function DocMarkdown({ markdown }: DocMarkdownProps) {
  return (
    <div className="doc-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, ...props }) => {
            const internal = href ? githubBlobDocsToViewPath(href) : null;
            const dest = internal ?? href ?? "#";
            const isExternal = Boolean(href?.startsWith("http")) && !internal;
            return (
              <a
                href={dest}
                {...props}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
