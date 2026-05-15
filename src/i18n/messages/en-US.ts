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
      "Multi-agent orchestration with IntentRouter, ExploreAgent, and ContextManager. One command to start your authorized security testing workflow.",
    ctaTs: "npm install",
    tsCmd: "npm i -g @opensec/secbot",
    highlightTitle: "Core capabilities",
    highlights: [
      "IntentRouter classifies intent into 6 types in a single LLM call, routing tasks precisely",
      "ExploreAgent runs a lightweight ReAct loop to fill context gaps before planning",
      "ContextAssembler fits history and memory within the model's context budget",
      "BrowserSession respects robots.txt with readability extraction",
      "Unified vulnerability DB schema adapting CVE / NVD / Exploit-DB",
      "Multiple backend modes with auto port selection: spawn / service / remote",
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
