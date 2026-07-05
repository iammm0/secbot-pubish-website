import { source } from "@/src/lib/source";

export type DocsNavItem = {
  title: string;
  href: string;
  description?: string;
  depth: number;
};

export type DocsNavSection = {
  title: string;
  href: string;
  items: DocsNavItem[];
};

const SECTION_ORDER = ["ecosystem", "secbot", "runtime"] as const;
type SectionId = (typeof SECTION_ORDER)[number];

const SECTION_TITLES: Record<SectionId, string> = {
  ecosystem: "认识 SecBot",
  secbot: "开始使用",
  runtime: "运行与执行",
};

const SECTION_PAGE_ORDER: Record<SectionId, string[]> = {
  ecosystem: ["index", "execution-model", "versioning"],
  secbot: [
    "index",
    "quickstart",
    "documentation-map",
    "features",
    "api",
    "deployment",
    "llm-providers",
    "tools",
    "skills-and-memory",
    "database",
    "security",
    "release",
    "ui",
  ],
  runtime: ["index", "quickstart", "execution-flow", "tasks", "operations"],
};

function normalizeTitle(title: unknown, fallback: string): string {
  return typeof title === "string" && title.trim() ? title.trim() : fallback;
}

export function getDocsNavSections(): DocsNavSection[] {
  const pages = source.getPages();

  return SECTION_ORDER.map((section) => {
    const sectionPages = pages
      .filter((page) => page.slugs[0] === section)
      .sort((left, right) => sortDocsPages(left, right));
    const rootPage = sectionPages.find((page) => page.slugs.length === 1);

    return {
      title: SECTION_TITLES[section],
      href: rootPage?.url ?? `/docs/${section}`,
      items: sectionPages
        .filter((page) => page.slugs.length > 1)
        .map((page) => ({
          title: normalizeTitle(page.data.title, page.slugs.at(-1) ?? section),
          href: page.url,
          description: typeof page.data.description === "string" ? page.data.description : undefined,
          depth: Math.max(page.slugs.length - 2, 0),
        })),
    };
  });
}

export function getDocSiblings(slugs: string[] | undefined) {
  const pages = source
    .getPages()
    .filter((page) => page.slugs.length > 0)
    .sort((left, right) => sortDocsPages(left, right));
  const currentUrl = source.getPage(slugs)?.url;
  const index = pages.findIndex((page) => page.url === currentUrl);

  return {
    previous: index > 0 ? pages[index - 1] : undefined,
    next: index >= 0 && index < pages.length - 1 ? pages[index + 1] : undefined,
  };
}

function sortDocsPages(left: ReturnType<typeof source.getPages>[number], right: ReturnType<typeof source.getPages>[number]) {
  return docsPageOrder(left) - docsPageOrder(right) || left.url.localeCompare(right.url, "zh-CN");
}

function docsPageOrder(page: ReturnType<typeof source.getPages>[number]) {
  const section = page.slugs[0] as SectionId | undefined;
  const sectionIndex = section ? SECTION_ORDER.indexOf(section) : -1;
  const pageKey = page.slugs.length === 1 ? "index" : (page.slugs.at(-1) ?? "");
  const pageIndex = section ? SECTION_PAGE_ORDER[section]?.indexOf(pageKey) ?? -1 : -1;

  return (sectionIndex < 0 ? 99 : sectionIndex) * 100 + (pageIndex < 0 ? 90 : pageIndex);
}
