import { evaluate } from "@mdx-js/mdx";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { isValidElement, type AnchorHTMLAttributes, type ComponentPropsWithoutRef, type ReactNode } from "react";
import * as runtime from "react/jsx-runtime";
import remarkGfm from "remark-gfm";
import type { Locale } from "@/src/i18n/config";
import type { DocSectionId } from "@/src/lib/docs-fs";
import { markdownHeadingId } from "@/src/lib/markdown-toc";

type DocMdxProps = {
  source: string;
  sectionId?: DocSectionId;
  currentDocPath?: string;
  locale?: Locale;
};

function docPathToSlug(pathname: string): string {
  return pathname
    .replace(/^docs\//, "")
    .replace(/\.mdx?$/i, "")
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

function withLocaleHref(href: string, locale?: Locale): string {
  if (!locale || !href.startsWith("/") || href.startsWith("//")) return href;
  const [withoutHash, hash] = href.split("#", 2);
  const separator = withoutHash.includes("?") ? "&" : "?";
  const localized = withoutHash.includes("lang=") ? withoutHash : `${withoutHash}${separator}lang=${locale}`;
  return hash ? `${localized}#${hash}` : localized;
}

function githubBlobDocsToViewPath(href: string): string | null {
  try {
    const u = new URL(href);
    if (u.hostname !== "github.com") return null;
    const match = u.pathname.match(/^\/iammm0\/secbot\/blob\/[^/]+\/docs\/(.+)$/i);
    if (!match) return null;
    const tail = match[1];
    if (!tail.toLowerCase().match(/\.mdx?$/)) return null;
    const decoded = tail.split("/").map((p) => decodeURIComponent(p)).join("/");
    return sourceDocToSitePath(decoded);
  } catch {
    return null;
  }
}

function sourceDocToSitePath(sourcePath: string): string | null {
  const normalized = sourcePath.replace(/\\/g, "/").replace(/\.mdx?$/i, ".md");
  const map = new Map<string, string>([
    ["docs/wiki/Product-Lines.md", "/docs/ecosystem/product-lines"],
    ["docs/wiki/Security.md", "/docs/ecosystem/security-and-authorization"],
    ["docs/wiki/Release-and-Versioning.md", "/docs/ecosystem/release-and-versioning"],
    ["docs/wiki/Architecture.md", "/docs/ecosystem/execution-model"],
    ["docs/wiki/Installation.md", "/docs/secbot/installation"],
    ["docs/wiki/Quick-Start.md", "/docs/secbot/quick-start"],
    ["docs/wiki/Terminal-UI.md", "/docs/secbot/terminal-ui"],
    ["docs/wiki/Environment-Variables.md", "/docs/secbot/environment-variables"],
    ["docs/LLM_PROVIDERS.md", "/docs/secbot/llm-providers"],
    ["docs/API.md", "/docs/secbot/api"],
    ["docs/DEPLOYMENT.md", "/docs/secbot/deployment"],
    ["docs/wiki/Agent-Orchestration.md", "/docs/runtime/agent-orchestration"],
    ["docs/wiki/Tools.md", "/docs/runtime/tools"],
    ["docs/wiki/Skills-and-MCP.md", "/docs/runtime/skills-and-mcp"],
    ["docs/TOOL_EXTENSION.md", "/docs/runtime/tool-extension"],
    ["docs/SKILLS_AND_MEMORY.md", "/docs/runtime/memory"],
    ["docs/design-paradigms/README.md", "/docs/runtime/design-paradigms"],
    ["docs/DATABASE_GUIDE.md", "/docs/reference/database-guide"],
    ["docs/PROMPT_GUIDE.md", "/docs/reference/prompt-guide"],
    ["docs/releases/README.md", "/docs/reference/release-notes"],
    ["docs/CHANGELOG.md", "/docs/reference/changelog"],
  ]);

  return map.get(normalized) ?? null;
}

function relativeDocToViewPath(href: string, sectionId?: DocSectionId, currentDocPath?: string): string | null {
  if (!sectionId || !currentDocPath) return null;
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

  if (!normalized.toLowerCase().match(/\.mdx?$/)) return null;
  const withHash = hash ? `#${hash}` : "";
  return `/docs/${sectionId}/${docPathToSlug(normalized)}${withHash}`;
}

function textFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textFromNode((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

function mkHeading(Tag: "h1" | "h2" | "h3") {
  return function MdxHeading(props: ComponentPropsWithoutRef<typeof Tag>) {
    const { children, ...rest } = props;
    const id = markdownHeadingId(textFromNode(children));
    return (
      <Tag id={id} {...rest}>
        {children}
      </Tag>
    );
  };
}

function codeLanguage(children: ReactNode): string | null {
  const node = Array.isArray(children) ? children.find(isValidElement) : children;
  if (!isValidElement(node)) return null;
  const className = (node.props as { className?: string }).className ?? "";
  const match = className.match(/language-([\w-]+)/);
  return match?.[1] ?? null;
}

function MdxPre({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  const lang = codeLanguage(children);

  return (
    <div className="mdx-code-frame">
      {lang ? <div className="mdx-code-label">{lang}</div> : null}
      <pre {...props}>{children}</pre>
    </div>
  );
}

function MdxTable(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="mdx-table-frame">
      <table {...props} />
    </div>
  );
}

function MdxCallout({
  title,
  children,
  tone = "note",
  type,
}: {
  title?: string;
  children: ReactNode;
  tone?: "note" | "warning" | "success";
  type?: "note" | "warning" | "success";
}) {
  const resolvedTone = type ?? tone;

  return (
    <div className={`mdx-callout mdx-callout-${resolvedTone}`}>
      {title ? <p className="mdx-callout-title">{title}</p> : null}
      <div>{children}</div>
    </div>
  );
}

function MdxBadge({ children }: { children: ReactNode }) {
  return <span className="mdx-badge">{children}</span>;
}

function DocsGrid({ children }: { children: ReactNode }) {
  return <div className="docs-card-grid">{children}</div>;
}

function DocsCard({
  href,
  eyebrow,
  title,
  description,
}: {
  href: string;
  eyebrow?: string;
  title: string;
  description: string;
}) {
  const dest = withLocaleHref(href, undefined);

  return (
    <Link href={dest} className="docs-card no-underline">
      {eyebrow ? <span className="docs-card-eyebrow">{eyebrow}</span> : null}
      <span className="docs-card-title">{title}</span>
      <span className="docs-card-description">{description}</span>
    </Link>
  );
}

export async function DocMdx({ source, sectionId, currentDocPath, locale }: DocMdxProps) {
  const mdx = await evaluate(source, {
    ...runtime,
    remarkPlugins: [remarkGfm],
    format: "mdx",
  });
  const Content = mdx.default;
  const components: MDXComponents = {
    h1: mkHeading("h1"),
    h2: mkHeading("h2"),
    h3: mkHeading("h3"),
    pre: MdxPre,
    table: MdxTable,
    Callout: MdxCallout,
    Note: MdxCallout,
    Badge: MdxBadge,
    DocsGrid,
    DocsCard,
    a: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
      const internal = href
        ? githubBlobDocsToViewPath(href) ?? relativeDocToViewPath(href, sectionId, currentDocPath)
        : null;
      const dest = withLocaleHref(internal ?? href ?? "#", locale);
      const isExternal = Boolean(href?.startsWith("http")) && !internal;
      const isInternal = dest.startsWith("/") && !dest.startsWith("//");

      if (isInternal) {
        return (
          <Link href={dest} {...props}>
            {children}
          </Link>
        );
      }

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
  };

  return (
    <div className="doc-mdx">
      <Content components={components} />
    </div>
  );
}
