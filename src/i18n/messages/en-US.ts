const enUS = {
  brand: {
    name: "SecBot",
    tagline: "AI-powered automated security testing bot",
  },
  nav: {
    home: "Home",
    docs: "Docs",
    start: "Start",
    runtime: "Runtime",
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
      "SecBot combines security testing tools, LLM reasoning, and local execution into auditable workflows for clearly authorized testing, research, and education.",
    ctaTs: "Quick start",
    tsCmd: "git clone https://github.com/iammm0/secbot.git && cd secbot && git checkout release && npm ci && npm run start:stack",
    highlightTitle: "Core capabilities",
    highlights: [
      {
        title: "Planning and tool orchestration",
        body: "Turn authorized targets, testing intent, and context into executable steps, then adjust tool calls from feedback.",
      },
      {
        title: "Security tool matrix",
        body: "Cover reconnaissance, protocol analysis, Web Research, defensive checks, and reporting without bouncing between scripts.",
      },
      {
        title: "Streaming observability",
        body: "Expose progress, intermediate results, and errors by stage so long-running tasks are easier to interrupt, review, and debug.",
      },
      {
        title: "Model and environment fit",
        body: "Connect cloud or local LLMs so teams can choose the right setup for network, cost, and privacy constraints.",
      },
      {
        title: "Reproducible session memory",
        body: "Keep configuration, context, and run records locally for auditing, retesting, and continuous tuning.",
      },
      {
        title: "TUI + API entry points",
        body: "Use the terminal for hands-on work and the HTTP API for pipelines, server-side tasks, and automation scripts.",
      },
    ],
  },
  docs: {
    title: "SecBot documentation",
    subtitle: "Chinese-first documentation organized by ecosystem, usage, and runtime execution.",
    backToHub: "Back to docs",
    quickNavLabel: "Quick nav",
    quickLinks: [
      { label: "Overview", viewPath: "/docs", emphasis: true },
      { label: "Ecosystem", viewPath: "/docs/ecosystem" },
      { label: "Quick start", viewPath: "/docs/secbot/quickstart" },
      { label: "API", viewPath: "/docs/secbot/api" },
      { label: "Runtime", viewPath: "/docs/runtime" },
      { label: "Security", viewPath: "/docs/secbot/security" },
    ],
    anchorNav: [
      { label: "Where to start", anchor: "where-to-start" },
      { label: "Recommended paths", anchor: "recommended-paths" },
    ],
    branchDocsTitle: "Documentation",
    branchDocsIntro: "Complete documentation for the SecBot TypeScript / npm release line.",
    scopeTitle: "Who this is for",
    scopeBullets: [
      "Teams using SecBot as a local or shared entry point for AI-driven security workflows.",
      "Interface and config docs are canonical for the on-site MDX revision synced from local ../secbot.",
    ],
    whereToStartTitle: "Where to start",
    whereToStartIntro:
      "Pick whether you are unblocking install, integrating via API, or shipping to production, then follow the matching path.",
    whereToStartBullets: [
      {
        text: "Getting started:",
        links: [
          { label: "Quick start", viewPath: "/docs/secbot/quickstart" },
          { label: "Documentation map", viewPath: "/docs/secbot/documentation-map" },
        ],
      },
      {
        text: "Integration & deployment:",
        links: [
          { label: "API", viewPath: "/docs/secbot/api" },
          { label: "Deployment", viewPath: "/docs/secbot/deployment" },
        ],
      },
    ],
    recommendedPathsTitle: "Recommended reading paths",
    recommendedPaths: [
      {
        title: "Getting started",
        items: [
          { label: "Quick start", viewPath: "/docs/secbot/quickstart" },
          { label: "Documentation map", viewPath: "/docs/secbot/documentation-map" },
          { label: "LLM providers", viewPath: "/docs/secbot/llm-providers" },
        ],
      },
      {
        title: "Advanced",
        items: [
          { label: "API", viewPath: "/docs/secbot/api" },
          { label: "Tools", viewPath: "/docs/secbot/tools" },
          { label: "Deployment", viewPath: "/docs/secbot/deployment" },
        ],
      },
    ],
    docMapTitle: "Documentation map",
    docMapLead: "Browse all available MDX documents.",
    architectureCreditBefore: "Documentation layout inspired by",
    architectureCreditLink: "damn-agent docs",
    architectureCreditAfter: ".",
    articleLead: "Synced content for the active release branch.",
    onPageTocTitle: "On this page",
    moreInTree: "Docs are organized into ecosystem, secbot, and runtime sections.",
  },
  footer: {
    warning: "Only for authorized security testing, research, and education.",
  },
};

export default enUS;
