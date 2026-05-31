export type MarkdownTocItem = {
  depth: number;
  text: string;
  id: string;
};

export function markdownHeadingId(text: string): string {
  const slug = text
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{Letter}\p{Number}\s_-]+/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `stoc-${slug || "section"}`;
}

export function extractMarkdownToc(markdown: string, maxDepth = 3): MarkdownTocItem[] {
  const lines = markdown.split(/\r?\n/);
  const items: MarkdownTocItem[] = [];

  for (const line of lines) {
    const m = line.match(/^(#{1,3})\s+(.+)$/);
    if (!m) continue;
    const depth = m[1].length;
    if (depth > maxDepth) continue;
    const text = m[2].trim().replace(/\s+#+\s*$/, "");
    if (!text) continue;
    const id = markdownHeadingId(text);
    items.push({ depth, text, id });
  }
  return items;
}
