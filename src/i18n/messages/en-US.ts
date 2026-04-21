const enUS = {
  brand: {
    name: "Secbot",
    tagline: "AI-powered automated security testing bot",
  },
  nav: {
    home: "Home",
    download: "Download",
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
    heroTitle: "Official release + experimental track",
    heroSubtitle:
      "Secbot provides an official TS package and an experimental PY package to help you build AI-driven security workflows in authorized environments.",
    ctaTs: "Get TS official release",
    ctaPy: "Try PY experimental release",
    highlightTitle: "Why Secbot",
    highlights: [
      "Multiple inference backends across major model providers",
      "Unified experience for CLI and terminal-ui workflows",
      "Designed for authorized security testing with reliable outputs",
      "Dual-track release model: stable TS package plus experimental PY package",
      "Supports end-to-end workflow from discovery and testing to reporting",
      "Clear docs and install paths help teams onboard faster",
      "Continuous iterations with predictable updates for long-term maintenance",
    ],
  },
  download: {
    title: "Download & Install",
    subtitle: "Choose the channel that matches your use case",
    tsTitle: "TS Official Release",
    tsDesc: "Built for production and team collaboration with stable behavior.",
    tsCmd: "npm i -g @opensec/secbot",
    pyTitle: "PY Experimental Release",
    pyDesc: "Best for rapid experiments and research validation.",
    pyCmd: "pip install secbot",
  },
  docs: {
    title: "Secbot documentation overview",
    subtitle:
      "Terminal UI and backend for authorized security testing. Pages are synced from upstream docs/ and rendered here. Information architecture follows the layered, guided layout of execgo.site docs.",
    backToHub: "Back to docs hub",
    quickNavLabel: "Start here",
    quickLinks: [
      { label: "Overview", viewPath: "/docs", emphasis: true },
      { label: "Quickstart", viewPath: "/docs/view/quickstart" },
      { label: "HTTP API", viewPath: "/docs/view/api" },
      { label: "LLM providers", viewPath: "/docs/view/llm-providers" },
      { label: "Deployment", viewPath: "/docs/view/deployment" },
      { label: "Security", viewPath: "/docs/view/security-warning" },
    ],
    anchorNav: [
      { label: "Where to start", anchor: "where-to-start" },
      { label: "Recommended paths", anchor: "recommended-paths" },
      { label: "Who this is for", anchor: "doc-scope" },
      { label: "Doc map", anchor: "doc-map" },
    ],
    scopeTitle: "Who this documentation is for",
    scopeBullets: [
      "Teams that want Secbot as a local or shared entry point for AI-driven security workflows—from install and models to CLI and HTTP APIs.",
      "Readers who prefer a single on-site guide instead of jumping across scattered Markdown files on GitHub.",
      "Operators who treat the on-site copy as canonical for the synced revision (see docs/SOURCE.txt for the upstream commit).",
    ],
    whereToStartTitle: "Choose where to start",
    whereToStartIntro:
      "On first contact, you do not need to read files in alphabetical order. Pick whether you are unblocking install, integrating via API, or shipping to production, then follow the matching path below.",
    whereToStartBullets: [
      {
        text: "First install and trial:",
        links: [
          { label: "Quickstart", viewPath: "/docs/view/quickstart" },
          { label: "Security warning", viewPath: "/docs/view/security-warning" },
        ],
      },
      {
        text: "Orchestration, tools, and memory:",
        links: [
          { label: "HTTP API", viewPath: "/docs/view/api" },
          { label: "Tool extension", viewPath: "/docs/view/tool-extension" },
          { label: "Skills & memory", viewPath: "/docs/view/skills-and-memory" },
        ],
      },
      {
        text: "Deployment and containers:",
        links: [
          { label: "Deployment", viewPath: "/docs/view/deployment" },
          { label: "Docker", viewPath: "/docs/view/docker-setup" },
        ],
      },
    ],
    recommendedPathsTitle: "Recommended reading paths",
    recommendedPaths: [
      {
        title: "Path A: Install and environment",
        items: [
          { label: "Quickstart", viewPath: "/docs/view/quickstart" },
          { label: "Node setup", viewPath: "/docs/view/node-setup" },
          { label: "LLM providers", viewPath: "/docs/view/llm-providers" },
          { label: "Ollama (optional)", viewPath: "/docs/view/ollama-setup" },
        ],
      },
      {
        title: "Path B: API, tools, and UX",
        items: [
          { label: "HTTP API", viewPath: "/docs/view/api" },
          { label: "Tool extension", viewPath: "/docs/view/tool-extension" },
          { label: "UI & interaction", viewPath: "/docs/view/ui-design-and-interaction" },
          { label: "Prompt guide", viewPath: "/docs/view/prompt-guide" },
        ],
      },
      {
        title: "Path C: Ship and release",
        items: [
          { label: "Deployment", viewPath: "/docs/view/deployment" },
          { label: "Docker", viewPath: "/docs/view/docker-setup" },
          { label: "Release process", viewPath: "/docs/view/release" },
          { label: "SQLite", viewPath: "/docs/view/sqlite-setup" },
        ],
      },
    ],
    docMapTitle: "Documentation map",
    docMapLead:
      "Browse by topic; each link opens the on-site preview. Other Markdown files are still reachable at /docs/view/… (lowercase slug, no .md suffix).",
    architectureCreditBefore: "Layout and reading-path patterns inspired by",
    architectureCreditLink: "execgo.site docs",
    architectureCreditAfter: ".",
    articleLead: "Synced content below; use the on-page table of contents at the end to jump inside long pages.",
    onPageTocTitle: "On this page",
    moreInTree: "",
    sections: [
      {
        title: "Getting started & safety",
        items: [
          {
            label: "Docs hub (this site)",
            description: "Curated index and links",
            viewPath: "/docs/view/readme",
          },
          { label: "Quickstart", viewPath: "/docs/view/quickstart" },
          { label: "Security warning", viewPath: "/docs/view/security-warning" },
        ],
      },
      {
        title: "Environment & dependencies",
        items: [
          { label: "Node setup", viewPath: "/docs/view/node-setup" },
          { label: "Ollama", viewPath: "/docs/view/ollama-setup" },
          { label: "SQLite", viewPath: "/docs/view/sqlite-setup" },
          { label: "Docker", viewPath: "/docs/view/docker-setup" },
        ],
      },
      {
        title: "Integration & extensions",
        items: [
          { label: "HTTP API", viewPath: "/docs/view/api" },
          { label: "LLM providers", viewPath: "/docs/view/llm-providers" },
          { label: "Tool extension", viewPath: "/docs/view/tool-extension" },
          { label: "Skills & memory", viewPath: "/docs/view/skills-and-memory" },
        ],
      },
      {
        title: "Deploy & release",
        items: [
          { label: "Deployment", viewPath: "/docs/view/deployment" },
          { label: "Release process", viewPath: "/docs/view/release" },
          { label: "Docs changelog (upstream)", viewPath: "/docs/view/changelog" },
        ],
      },
      {
        title: "Product & UX",
        items: [
          { label: "Application notes (APP)", viewPath: "/docs/view/app" },
          { label: "UI & interaction", viewPath: "/docs/view/ui-design-and-interaction" },
          { label: "Prompt guide", viewPath: "/docs/view/prompt-guide" },
          { label: "Speech guide", viewPath: "/docs/view/speech-guide" },
        ],
      },
      {
        title: "Database & test environments",
        items: [
          { label: "Database guide", viewPath: "/docs/view/database-guide" },
          { label: "Virtual test environment", viewPath: "/docs/view/virtual-test-environment" },
        ],
      },
      {
        title: "Design paradigms",
        items: [
          {
            label: "Agent architecture",
            viewPath: "/docs/view/design-paradigms/agent-architecture",
          },
          {
            label: "CLI & dependencies",
            viewPath: "/docs/view/design-paradigms/cli-and-dependencies",
          },
          {
            label: "Config & environment",
            viewPath: "/docs/view/design-paradigms/config-and-env",
          },
          {
            label: "Commit conventions",
            viewPath: "/docs/view/design-paradigms/commit-conventions",
          },
          {
            label: "Prompt management",
            viewPath: "/docs/view/design-paradigms/prompt-management",
          },
          {
            label: "React & tool calling",
            viewPath: "/docs/view/design-paradigms/react-and-tool-calling",
          },
          {
            label: "Session & events",
            viewPath: "/docs/view/design-paradigms/session-and-events",
          },
          {
            label: "Skill plugin system",
            viewPath: "/docs/view/design-paradigms/skill-plugin-system",
          },
        ],
      },
      {
        title: "Release notes (sample)",
        items: [
          {
            label: "v1.8.0 notes",
            viewPath: "/docs/view/releases/v1.8.0",
          },
          {
            label: "v1.7.0 notes",
            viewPath: "/docs/view/releases/v1.7.0",
          },
        ],
      },
    ],
  },
  footer: {
    warning: "Only for authorized security testing, research, and education.",
  },
};

export default enUS;
