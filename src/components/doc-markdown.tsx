"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type DocMarkdownProps = {
  markdown: string;
};

export function DocMarkdown({ markdown }: DocMarkdownProps) {
  return (
    <div className="doc-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        a: ({ href, children, ...props }) => (
          <a href={href} {...props} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}>
            {children}
          </a>
        ),
      }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
