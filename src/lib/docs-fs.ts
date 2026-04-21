import fs from "node:fs";
import path from "node:path";

const DOCS_DIR = "docs";

export const DOC_BRANCHES = [
  {
    id: "pypi-release",
    label: "PY 实验版",
    shortLabel: "pypi-release",
    badge: "Python / PyPI",
    channel: "pip install secbot",
    summary: "Python CLI 与可选 FastAPI 后端路线，适合用 `secbot` 命令快速体验和集成。",
  },
  {
    id: "npm-release",
    label: "TS 正式版",
    shortLabel: "npm-release",
    badge: "Node.js / npm",
    channel: "npm i -g @opensec/secbot",
    summary: "Node.js、NestJS 后端与 Ink 终端界面路线，适合作为正式 npm 发布线查看。",
  },
] as const;

export type DocBranch = (typeof DOC_BRANCHES)[number];
export type DocBranchId = DocBranch["id"];

export const DEFAULT_DOC_BRANCH: DocBranchId = "pypi-release";

export type DocEntry = {
  title: string;
  relPath: string;
  slug: string[];
  slugKey: string;
  href: string;
  section: string;
};

export type DocSection = {
  title: string;
  items: DocEntry[];
};

const SECTION_ORDER = [
  "入门与安全",
  "模型与运行环境",
  "接入与扩展",
  "部署与发布",
  "产品与迁移",
  "数据与测试",
  "设计范式",
  "历史版本说明",
  "其他",
];

const DOC_ORDER = [
  "QUICKSTART.md",
  "SECURITY_WARNING.md",
  "NODE_SETUP.md",
  "LLM_PROVIDERS.md",
  "OLLAMA_SETUP.md",
  "SQLITE_SETUP.md",
  "API.md",
  "TOOL_EXTENSION.md",
  "SKILLS_AND_MEMORY.md",
  "PROMPT_GUIDE.md",
  "DEPLOYMENT.md",
  "RELEASE.md",
  "CHANGELOG.md",
  "TS_MIGRATION_STATUS.md",
  "UI-DESIGN-AND-INTERACTION.md",
  "DATABASE_GUIDE.md",
  "VIRTUAL_TEST_ENVIRONMENT.md",
  "design-paradigms/README.md",
  "design-paradigms/agent-architecture.md",
  "design-paradigms/cli-and-dependencies.md",
  "design-paradigms/config-and-env.md",
  "design-paradigms/commit-conventions.md",
  "design-paradigms/prompt-management.md",
  "design-paradigms/react-and-tool-calling.md",
  "design-paradigms/session-and-events.md",
  "design-paradigms/skill-plugin-system.md",
  "releases/README.md",
];

function docsRoot(): string {
  return path.join(process.cwd(), DOCS_DIR);
}

function branchRoot(branchId: DocBranchId): string {
  return path.join(docsRoot(), branchId);
}

function normalizeSlugSegment(segment: string): string {
  return segment.toLowerCase().replace(/_/g, "-");
}

function humanizeSegment(segment: string): string {
  return segment
    .replace(/\.md$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function titleFromMarkdown(markdown: string, fallback: string): string {
  const titleLine = markdown.split(/\r?\n/).find((line) => line.trim().startsWith("# "));
  return titleLine ? titleLine.replace(/^#\s+/, "").trim() : fallback;
}

function sectionForRelPath(rel: string): string {
  if (rel === "QUICKSTART.md" || rel === "SECURITY_WARNING.md") return "入门与安全";
  if (rel === "NODE_SETUP.md" || rel === "LLM_PROVIDERS.md" || rel === "OLLAMA_SETUP.md" || rel === "SQLITE_SETUP.md") {
    return "模型与运行环境";
  }
  if (rel === "API.md" || rel === "TOOL_EXTENSION.md" || rel === "SKILLS_AND_MEMORY.md" || rel === "PROMPT_GUIDE.md") {
    return "接入与扩展";
  }
  if (rel === "DEPLOYMENT.md" || rel === "RELEASE.md" || rel === "CHANGELOG.md") return "部署与发布";
  if (rel === "TS_MIGRATION_STATUS.md" || rel === "UI-DESIGN-AND-INTERACTION.md") return "产品与迁移";
  if (rel === "DATABASE_GUIDE.md" || rel === "VIRTUAL_TEST_ENVIRONMENT.md") return "数据与测试";
  if (rel.startsWith("design-paradigms/")) return "设计范式";
  if (rel.startsWith("releases/")) return "历史版本说明";
  return "其他";
}

function docOrder(rel: string): number {
  const exact = DOC_ORDER.indexOf(rel);
  if (exact !== -1) return exact;
  if (rel.startsWith("releases/")) return DOC_ORDER.length + rel.localeCompare("releases/README.md", "zh-CN");
  return Number.MAX_SAFE_INTEGER;
}

export function isDocBranchId(value: string): value is DocBranchId {
  return DOC_BRANCHES.some((branch) => branch.id === value);
}

export function getDocBranch(value: string): DocBranch | null {
  return DOC_BRANCHES.find((branch) => branch.id === value) ?? null;
}

/** 列出指定分支 docs 下所有 .md 的 POSIX 相对路径（含大小写，以磁盘为准）。 */
export function listMarkdownRelPaths(branchId: DocBranchId): string[] {
  const root = branchRoot(branchId);
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
  return out.sort((left, right) => docOrder(left) - docOrder(right) || left.localeCompare(right, "zh-CN"));
}

/** URL slug 段一律小写，并对齐常见习惯（下划线转短横线）。 */
export function relPathToSlugSegments(rel: string): string[] {
  const base = rel.endsWith(".md") ? rel.slice(0, -3) : rel;
  return base.split("/").map(normalizeSlugSegment);
}

export function slugKey(slug: string[]): string {
  return slug.map(normalizeSlugSegment).join("/");
}

/** 根据 URL slug 解析为指定分支 docs 下的相对路径；找不到返回 null。 */
export function resolveMarkdownRelPath(branchId: DocBranchId, slug: string[]): string | null {
  if (!slug.length) return null;
  const key = slugKey(slug);
  for (const rel of listMarkdownRelPaths(branchId)) {
    if (slugKey(relPathToSlugSegments(rel)) === key) return rel;
  }
  return null;
}

/** 解析后的绝对路径必须通过防穿越校验。 */
export function safeMarkdownAbsPath(branchId: DocBranchId, rel: string): string | null {
  const root = path.resolve(branchRoot(branchId));
  const abs = path.resolve(root, rel);
  const relFromRoot = path.relative(root, abs);
  if (relFromRoot.startsWith("..") || path.isAbsolute(relFromRoot)) return null;
  if (!relFromRoot.toLowerCase().endsWith(".md")) return null;
  return abs;
}

export function readMarkdownFile(branchId: DocBranchId, rel: string): string | null {
  const abs = safeMarkdownAbsPath(branchId, rel);
  if (!abs || !fs.existsSync(abs)) return null;
  return fs.readFileSync(abs, "utf8");
}

export function listDocEntries(branchId: DocBranchId): DocEntry[] {
  return listMarkdownRelPaths(branchId).map((relPath) => {
    const slug = relPathToSlugSegments(relPath);
    const markdown = readMarkdownFile(branchId, relPath);
    const fallback = humanizeSegment(path.posix.basename(relPath));

    return {
      title: markdown ? titleFromMarkdown(markdown, fallback) : fallback,
      relPath,
      slug,
      slugKey: slugKey(slug),
      href: `/docs/secbot/${branchId}/${slug.join("/")}`,
      section: sectionForRelPath(relPath),
    };
  });
}

export function listDocSections(branchId: DocBranchId): DocSection[] {
  const sections = new Map<string, DocEntry[]>();

  for (const entry of listDocEntries(branchId)) {
    const items = sections.get(entry.section) ?? [];
    items.push(entry);
    sections.set(entry.section, items);
  }

  return Array.from(sections.entries())
    .sort(([left], [right]) => SECTION_ORDER.indexOf(left) - SECTION_ORDER.indexOf(right))
    .map(([title, items]) => ({
      title,
      items: items.sort((left, right) => docOrder(left.relPath) - docOrder(right.relPath) || left.relPath.localeCompare(right.relPath, "zh-CN")),
    }));
}

export function listStaticSlugParams(): { branch: DocBranchId; slug: string[] }[] {
  return DOC_BRANCHES.flatMap((branch) => [
    { branch: branch.id, slug: [] },
    ...listMarkdownRelPaths(branch.id).map((rel) => ({
      branch: branch.id,
      slug: relPathToSlugSegments(rel),
    })),
  ]);
}

export function listLegacyStaticSlugParams(): { slug: string[] }[] {
  return listMarkdownRelPaths(DEFAULT_DOC_BRANCH).map((rel) => ({
    slug: relPathToSlugSegments(rel),
  }));
}
