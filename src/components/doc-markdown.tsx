"use client";

import type { HTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { DocBranchId } from "@/src/lib/docs-fs";

type DocMarkdownProps = {
  markdown: string;
  branchId?: DocBranchId;
  currentDocPath?: string;
};

function markdownPathToSlug(pathname: string): string {
  return pathname
    .replace(/^docs\//, "")
    .replace(/\.md$/i, "")
    .split("/")
    .map((part) => part.toLowerCase().replace(/_/g, "-"))
    .join("/");
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

/** 将正文中指向 GitHub 上 docs/*.md 的链接改为当前站内分支路径。 */
function githubBlobDocsToViewPath(href: string, fallbackBranchId?: DocBranchId): string | null {
  try {
    const u = new URL(href);
    if (u.hostname !== "github.com") return null;
    const match = u.pathname.match(/^\/iammm0\/secbot\/blob\/([^/]+)\/docs\/(.+)$/i);
    if (!match) return null;
    const branch = match[1] === "pypi-release" || match[1] === "npm-release" ? match[1] : fallbackBranchId;
    if (!branch) return null;
    const tail = match[2];
    if (!tail.toLowerCase().endsWith(".md")) return null;
    const decoded = tail.split("/").map((p) => decodeURIComponent(p)).join("/");
    return `/docs/secbot/${branch}/${markdownPathToSlug(decoded)}`;
  } catch {
    return null;
  }
}

function relativeMarkdownToViewPath(href: string, branchId?: DocBranchId, currentDocPath?: string): string | null {
  if (!branchId || !currentDocPath) return null;
  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("#")) {
    return null;
  }

  const [targetPath, hash] = href.split("#");
  if (!targetPath) return null;

  const decoded = safeDecode(targetPath).replace(/\\/g, "/");
  const baseDir = currentDocPath.split("/").slice(0, -1).join("/");
  const joined = decoded.startsWith("docs/")
    ? decoded
    : [...baseDir ? [baseDir] : [], decoded].join("/");
  const normalized = joined
    .split("/")
    .reduce<string[]>((parts, part) => {
      if (!part || part === ".") return parts;
      if (part === "..") {
        parts.pop();
        return parts;
      }
      parts.push(part);
      return parts;
    }, [])
    .join("/");

  if (!normalized.toLowerCase().endsWith(".md")) return null;
  const withHash = hash ? `#${hash}` : "";
  return `/docs/secbot/${branchId}/${markdownPathToSlug(normalized)}${withHash}`;
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

export function DocMarkdown({ markdown, branchId, currentDocPath }: DocMarkdownProps) {
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
            const internal = href
              ? githubBlobDocsToViewPath(href, branchId) ?? relativeMarkdownToViewPath(href, branchId, currentDocPath)
              : null;
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
