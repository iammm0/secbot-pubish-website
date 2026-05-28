const enUS = {
  brand: {
    name: "Secbot",
    tagline: "AI-powered automated security testing bot",
  },
  nav: {
    home: "Home",
    docs: "Docs",
    github: "GitHub",
  },
  common: {
    viewGithub: "View GitHub",
    language: "中文",
    copyHint: "Ready to copy and run",
    copyCommand: "Copy command",
    copied: "Copied",
    themeLabel: "Theme",
    toggleTheme: "Toggle theme",
    openMenu: "Menu",
    closeMenu: "Close",
  },
  home: {
    heroTitle: "AI-powered automated security testing",
    heroSubtitle:
      "The npm-release line now centers on a NestJS backend and Ink terminal UI, with 54 TypeScript security tools, SSE execution feedback, and local config persistence. The project is still moving quickly; build from the npm-release source branch for now.",
    ctaTs: "Build from source",
    tsCmd: "git clone -b npm-release https://github.com/iammm0/secbot.git && cd secbot && npm install && npm run start:stack",
    highlightTitle: "Core capabilities",
    highlights: [
      "Node.js 24+ source workflow: run npm install, then npm run start:stack to build and open the TUI",
      "NestJS backend exposes /health, /api/system/info, and /api/chat SSE execution feedback",
      "Ink terminal UI can spawn a local backend automatically or connect to an existing API in service mode",
      "54 TypeScript tools across Security, Defense, Utility, Protocol, OSINT, Cloud, Reporting, Crawler, and Web Research",
      "DeepSeek and Ollama settings can live in .env or the TUI /model flow, then persist to SQLite / config.yaml",
      "The Python-to-TypeScript main path migration is complete; the tracked runtime is now NestJS + Ink",
    ],
  },
  docs: {
    title: "Secbot documentation",
    subtitle: "Complete documentation for the TypeScript / npm release line.",
    backToHub: "Back to docs",
    quickNavLabel: "Quick nav",
    quickLinks: [
      { label: "Overview", viewPath: "/docs", emphasis: true },
      { label: "Quickstart", viewPath: "/docs/secbot/npm-release/quickstart" },
      { label: "Node setup", viewPath: "/docs/secbot/npm-release/node-setup" },
      { label: "API", viewPath: "/docs/secbot/npm-release/api" },
      { label: "Security", viewPath: "/docs/secbot/npm-release/security-warning" },
      { label: "Deployment", viewPath: "/docs/secbot/npm-release/deployment" },
    ],
    anchorNav: [
      { label: "Where to start", anchor: "where-to-start" },
      { label: "Recommended paths", anchor: "recommended-paths" },
    ],
    branchDocsTitle: "Documentation",
    branchDocsIntro: "Complete documentation for the Secbot TypeScript / npm release line.",
    scopeTitle: "Who this is for",
    scopeBullets: [
      "Teams using Secbot as a local or shared entry point for AI-driven security workflows.",
      "Interface and config docs are canonical for the synced revision; see docs/SOURCE.txt for commits.",
    ],
    whereToStartTitle: "Where to start",
    whereToStartIntro:
      "Pick whether you are unblocking install, integrating via API, or shipping to production, then follow the matching path.",
    whereToStartBullets: [
      {
        text: "Getting started:",
        links: [
          { label: "Quickstart", viewPath: "/docs/secbot/npm-release/quickstart" },
          { label: "Node setup", viewPath: "/docs/secbot/npm-release/node-setup" },
        ],
      },
      {
        text: "Integration & deployment:",
        links: [
          { label: "API", viewPath: "/docs/secbot/npm-release/api" },
          { label: "Deployment", viewPath: "/docs/secbot/npm-release/deployment" },
        ],
      },
    ],
    recommendedPathsTitle: "Recommended reading paths",
    recommendedPaths: [
      {
        title: "Getting started",
        items: [
          { label: "Quickstart", viewPath: "/docs/secbot/npm-release/quickstart" },
          { label: "Node setup", viewPath: "/docs/secbot/npm-release/node-setup" },
          { label: "LLM providers", viewPath: "/docs/secbot/npm-release/llm-providers" },
        ],
      },
      {
        title: "Advanced",
        items: [
          { label: "API", viewPath: "/docs/secbot/npm-release/api" },
          { label: "Tool extension", viewPath: "/docs/secbot/npm-release/tool-extension" },
          { label: "Deployment", viewPath: "/docs/secbot/npm-release/deployment" },
        ],
      },
    ],
    docMapTitle: "Documentation map",
    docMapLead: "Browse all available Markdown documents.",
    architectureCreditBefore: "Layout inspired by",
    architectureCreditLink: "execgo.site docs",
    architectureCreditAfter: ".",
    articleLead: "Synced content for the active release branch.",
    onPageTocTitle: "On this page",
    moreInTree: "Both the design-paradigms and release-notes directories have on-site index pages.",
  },
  footer: {
    warning: "Only for authorized security testing, research, and education.",
  },
};

export default enUS;
