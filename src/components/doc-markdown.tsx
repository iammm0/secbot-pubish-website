"use client";

import type { HTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type DocMarkdownProps = {
  markdown: string;
};

/** 将正文中指向 GitHub 上 docs/*.md 的链接改为本站 /docs/view/… */
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

function mkHeading(Tag: "h1" | "h2" | "h3", nextId: () => number) {
  return function MdHeading(props: HTMLAttributes<HTMLHeadingElement>) {
    const { children, ...rest } = props;
    const id = `stoc-${nextId()}`;
    return (
      <Tag id={id} {...rest}>
        {children}
      </Tag>
    );
  };
}

export function DocMarkdown({ markdown }: DocMarkdownProps) {
  let headingSeq = 0;
  const nextHeadingId = () => headingSeq++;

  return (
    <div className="doc-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: mkHeading("h1", nextHeadingId),
          h2: mkHeading("h2", nextHeadingId),
          h3: mkHeading("h3", nextHeadingId),
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
