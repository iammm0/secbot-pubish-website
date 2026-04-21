import fs from "node:fs";
import path from "node:path";

const DOCS_DIR = "docs";

function docsRoot(): string {
  return path.join(process.cwd(), DOCS_DIR);
}

/** 列出 docs 下所有 .md 的 POSIX 相对路径（含大小写，以磁盘为准）。 */
export function listMarkdownRelPaths(): string[] {
  const root = docsRoot();
  if (!fs.existsSync(root)) return [];

  const out: string[] = [];
  const walk = (dir: string) => {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(abs);
      else if (ent.isFile() && ent.name.endsWith(".md")) {
        out.push(path.relative(root, abs).split(path.sep).join("/"));
      }
    }
  };
  walk(root);
  return out.sort();
}

/** URL slug 段一律小写，并对齐常见习惯（下划线转短横线）。 */
export function relPathToSlugSegments(rel: string): string[] {
  const base = rel.endsWith(".md") ? rel.slice(0, -3) : rel;
  return base.split("/").map((s) => s.toLowerCase().replace(/_/g, "-"));
}

export function slugKey(slug: string[]): string {
  return slug.map((s) => s.toLowerCase().replace(/_/g, "-")).join("/");
}

/** 根据 URL slug 解析为 docs 下的相对路径；找不到返回 null。 */
export function resolveMarkdownRelPath(slug: string[]): string | null {
  if (!slug.length) return null;
  const key = slugKey(slug);
  for (const rel of listMarkdownRelPaths()) {
    if (slugKey(relPathToSlugSegments(rel)) === key) return rel;
  }
  return null;
}

/** 解析后的绝对路径必须通过防穿越校验。 */
export function safeMarkdownAbsPath(rel: string): string | null {
  const root = path.resolve(docsRoot());
  const abs = path.resolve(root, rel);
  const relFromRoot = path.relative(root, abs);
  if (relFromRoot.startsWith("..") || path.isAbsolute(relFromRoot)) return null;
  if (!relFromRoot.toLowerCase().endsWith(".md")) return null;
  return abs;
}

export function readMarkdownFile(rel: string): string | null {
  const abs = safeMarkdownAbsPath(rel);
  if (!abs || !fs.existsSync(abs)) return null;
  return fs.readFileSync(abs, "utf8");
}

export function listStaticSlugParams(): { slug: string[] }[] {
  return listMarkdownRelPaths().map((rel) => ({
    slug: relPathToSlugSegments(rel),
  }));
}
