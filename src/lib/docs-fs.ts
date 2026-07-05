import fs from "node:fs";
import path from "node:path";

const DOCS_DIR = path.join("content", "docs");
const DOC_EXT_RE = /\.mdx?$/i;

export const DOC_SECTIONS = [
  {
    id: "ecosystem",
    title: "认识 SecBot",
    shortTitle: "认识",
    summary: "产品线、安全授权、发布版本与执行模型。",
  },
  {
    id: "secbot",
    title: "开始使用",
    shortTitle: "使用",
    summary: "安装、快速开始、TUI、配置、API 与部署。",
  },
  {
    id: "runtime",
    title: "运行与执行",
    shortTitle: "执行",
    summary: "Agent 编排、工具执行、Skills/MCP、记忆与扩展机制。",
  },
  {
    id: "reference",
    title: "参考资料",
    shortTitle: "参考",
    summary: "数据库、提示词、发布说明和变更日志。",
  },
] as const;

export type DocSectionId = (typeof DOC_SECTIONS)[number]["id"];

export type DocEntry = {
  title: string;
  description: string;
  relPath: string;
  sectionId: DocSectionId;
  slug: string[];
  slugKey: string;
  href: string;
};

export type DocNavSection = {
  title: string;
  summary: string;
  sectionId: DocSectionId;
  items: DocEntry[];
};

const DOC_ORDER: Record<DocSectionId, string[]> = {
  ecosystem: [
    "index.mdx",
    "product-lines.mdx",
    "security-and-authorization.mdx",
    "release-and-versioning.mdx",
    "execution-model.mdx",
  ],
  secbot: [
    "index.mdx",
    "installation.mdx",
    "quick-start.mdx",
    "terminal-ui.mdx",
    "environment-variables.mdx",
    "llm-providers.mdx",
    "api.mdx",
    "deployment.mdx",
  ],
  runtime: [
    "index.mdx",
    "agent-orchestration.mdx",
    "tools.mdx",
    "skills-and-mcp.mdx",
    "tool-extension.mdx",
    "memory.mdx",
    "design-paradigms.mdx",
  ],
  reference: [
    "index.mdx",
    "database-guide.mdx",
    "prompt-guide.mdx",
    "release-notes.mdx",
    "changelog.mdx",
  ],
};

function docsRoot(): string {
  return path.join(process.cwd(), DOCS_DIR);
}

function sectionRoot(sectionId: DocSectionId): string {
  return path.join(docsRoot(), sectionId);
}

function normalizeSlugSegment(segment: string): string {
  return segment.toLowerCase().replace(/_/g, "-");
}

function humanizeSegment(segment: string): string {
  return segment
    .replace(DOC_EXT_RE, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function stripFrontmatter(source: string): string {
  return source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

function parseFrontmatter(source: string): Record<string, string> {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const out: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    out[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
  }
  return out;
}

function titleFromDocSource(source: string, fallback: string): string {
  const frontmatter = parseFrontmatter(source);
  if (frontmatter.title) return frontmatter.title;
  const body = stripFrontmatter(source);
  const titleLine = body.split(/\r?\n/).find((line) => line.trim().startsWith("# "));
  return titleLine ? titleLine.replace(/^#\s+/, "").trim() : fallback;
}

function descriptionFromDocSource(source: string): string {
  const frontmatter = parseFrontmatter(source);
  return frontmatter.description ?? "";
}

function docOrder(sectionId: DocSectionId, rel: string): number {
  const normalized = rel.replace(/\\/g, "/");
  const exact = DOC_ORDER[sectionId].indexOf(normalized);
  return exact === -1 ? Number.MAX_SAFE_INTEGER : exact;
}

export function isDocSectionId(value: string): value is DocSectionId {
  return DOC_SECTIONS.some((section) => section.id === value);
}

export function getDocSection(value: string): (typeof DOC_SECTIONS)[number] | null {
  return DOC_SECTIONS.find((section) => section.id === value) ?? null;
}

export function listDocRelPaths(sectionId: DocSectionId): string[] {
  const root = sectionRoot(sectionId);
  if (!fs.existsSync(root)) return [];

  const out: string[] = [];
  const walk = (dir: string) => {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(abs);
      else if (ent.isFile() && DOC_EXT_RE.test(ent.name)) {
        out.push(path.relative(root, abs).split(path.sep).join("/"));
      }
    }
  };

  walk(root);
  return out.sort(
    (left, right) =>
      docOrder(sectionId, left) - docOrder(sectionId, right) ||
      left.localeCompare(right, "zh-CN"),
  );
}

export function relPathToSlugSegments(rel: string): string[] {
  const base = rel.replace(DOC_EXT_RE, "");
  if (base === "index") return [];
  return base.split("/").map(normalizeSlugSegment);
}

export function slugKey(slug: string[]): string {
  return slug.map(normalizeSlugSegment).join("/");
}

export function resolveDocRelPath(sectionId: DocSectionId, slug: string[]): string | null {
  const key = slugKey(slug);

  for (const rel of listDocRelPaths(sectionId)) {
    if (slugKey(relPathToSlugSegments(rel)) === key) return rel;
  }

  return null;
}

export function safeDocAbsPath(sectionId: DocSectionId, rel: string): string | null {
  const root = path.resolve(sectionRoot(sectionId));
  const abs = path.resolve(root, rel);
  const relFromRoot = path.relative(root, abs);

  if (relFromRoot.startsWith("..") || path.isAbsolute(relFromRoot)) return null;
  if (!DOC_EXT_RE.test(relFromRoot)) return null;
  return abs;
}

export function safeRootDocAbsPath(rel: string): string | null {
  const root = path.resolve(docsRoot());
  const abs = path.resolve(root, rel);
  const relFromRoot = path.relative(root, abs);

  if (relFromRoot.startsWith("..") || path.isAbsolute(relFromRoot)) return null;
  if (!DOC_EXT_RE.test(relFromRoot)) return null;
  return abs;
}

export function readDocFile(sectionId: DocSectionId, rel: string): string | null {
  const abs = safeDocAbsPath(sectionId, rel);
  if (!abs || !fs.existsSync(abs)) return null;
  return fs.readFileSync(abs, "utf8");
}

export function readRootDocFile(rel = "index.mdx"): string | null {
  const abs = safeRootDocAbsPath(rel);
  if (!abs || !fs.existsSync(abs)) return null;
  return fs.readFileSync(abs, "utf8");
}

export function listDocEntries(sectionId: DocSectionId): DocEntry[] {
  return listDocRelPaths(sectionId).map((relPath) => {
    const slug = relPathToSlugSegments(relPath);
    const source = readDocFile(sectionId, relPath);
    const fallback = humanizeSegment(path.posix.basename(relPath));

    return {
      title: source ? titleFromDocSource(source, fallback) : fallback,
      description: source ? descriptionFromDocSource(source) : "",
      relPath,
      sectionId,
      slug,
      slugKey: slugKey(slug),
      href: `/docs/${sectionId}${slug.length ? `/${slug.join("/")}` : ""}`,
    };
  });
}

export function listDocNavigationSections(): DocNavSection[] {
  return DOC_SECTIONS.map((section) => ({
    title: section.title,
    summary: section.summary,
    sectionId: section.id,
    items: listDocEntries(section.id),
  })).filter((section) => section.items.length > 0);
}

export function listStaticSlugParams(): { section: DocSectionId; slug: string[] }[] {
  return DOC_SECTIONS.flatMap((section) =>
    listDocRelPaths(section.id).map((rel) => ({
      section: section.id,
      slug: relPathToSlugSegments(rel),
    })),
  );
}
