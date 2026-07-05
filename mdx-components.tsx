import Link from "next/link";
import { isValidElement, type AnchorHTMLAttributes, type ComponentPropsWithoutRef, type ReactNode } from "react";
import type { MDXComponents } from "mdx/types";

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
  children,
}: {
  href: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  const body = (
    <>
      {eyebrow ? <span className="docs-card-eyebrow">{eyebrow}</span> : null}
      <span className="docs-card-title">{title}</span>
      {description ? <span className="docs-card-description">{description}</span> : null}
      {children ? <span className="docs-card-description">{children}</span> : null}
    </>
  );

  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} className="docs-card">
        {body}
      </Link>
    );
  }

  return (
    <a href={href} className="docs-card" target="_blank" rel="noopener noreferrer">
      {body}
    </a>
  );
}

function MdxAnchor({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const dest = href ?? "#";
  if (dest.startsWith("/") && !dest.startsWith("//")) {
    return (
      <Link href={dest} {...props}>
        {children}
      </Link>
    );
  }

  const isExternal = dest.startsWith("http://") || dest.startsWith("https://");
  return (
    <a href={dest} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} {...props}>
      {children}
    </a>
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    pre: MdxPre,
    table: MdxTable,
    a: MdxAnchor,
    Callout: MdxCallout,
    Note: MdxCallout,
    Badge: MdxBadge,
    DocsGrid,
    DocsCard,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;
