/** 与 DocMarkdown 中标题 id 分配顺序一致：按源文件中出现的 h1–h3 顺序编号 stoc-0, stoc-1, … */

export type MarkdownTocItem = {
  depth: number;
  text: string;
  id: string;
};

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
    const id = `stoc-${items.length}`;
    items.push({ depth, text, id });
  }
  return items;
}
