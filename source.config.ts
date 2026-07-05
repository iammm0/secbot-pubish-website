import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import remarkGfm from "remark-gfm";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    providerImportSource: "@/mdx-components",
    remarkPlugins: [remarkGfm],
  },
});
