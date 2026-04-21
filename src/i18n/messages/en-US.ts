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
    heroTitle: "Official release + experimental track",
    heroSubtitle:
      "Secbot provides an official TS package and an experimental PY package to help you build AI-driven security workflows in authorized environments.",
    ctaTs: "Get TS official release",
    ctaPy: "Try PY experimental release",
    tsTitle: "TS official release",
    tsCmd: "npm i -g @opensec/secbot",
    pyTitle: "PY experimental release",
    pyCmd: "pip install secbot",
    highlightTitle: "Why Secbot",
    highlights: [
      "Multiple inference backends across major model providers",
      "Unified experience for CLI and terminal-ui workflows",
      "Designed for authorized security testing with reliable outputs",
      "Dual-track release model: stable TS package plus experimental PY package",
      "Supports end-to-end workflow from discovery and testing to reporting",
      "Clear docs and install paths help teams onboard faster",
      "Continuous iterations with predictable updates for long-term maintenance",
      "HTTP API plus tool extension hooks fit existing platforms, CI/CD, or custom orchestration",
      "Skills and memory-style extensions help teams capture reusable playbooks and reduce drift",
    ],
  },
  docs: {
    title: "Secbot documentation overview",
    subtitle:
      "The current sync targets the Python CLI / FastAPI track. Pages are synced from upstream docs/ and rendered here. Information architecture follows the layered, guided layout of execgo.site docs.",
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
      "Teams that want Secbot as a local or shared entry point for AI-driven security workflows—from install and model setup to CLI and HTTP APIs.",
      "Readers who need the current Python CLI plus optional FastAPI docs instead of the older Node/Docker/UI document set.",
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
        text: "Model setup and local runtime:",
        links: [
          { label: "LLM providers", viewPath: "/docs/view/llm-providers" },
          { label: "Ollama", viewPath: "/docs/view/ollama-setup" },
          { label: "SQLite", viewPath: "/docs/view/sqlite-setup" },
        ],
      },
      {
        text: "API integration, extensions, and deployment:",
        links: [
          { label: "HTTP API", viewPath: "/docs/view/api" },
          { label: "Tool extension", viewPath: "/docs/view/tool-extension" },
          { label: "Deployment", viewPath: "/docs/view/deployment" },
          { label: "Release process", viewPath: "/docs/view/release" },
        ],
      },
    ],
    recommendedPathsTitle: "Recommended reading paths",
    recommendedPaths: [
      {
        title: "Path A: Bring up CLI and models",
        items: [
          { label: "Quickstart", viewPath: "/docs/view/quickstart" },
          { label: "LLM providers", viewPath: "/docs/view/llm-providers" },
          { label: "Ollama (optional)", viewPath: "/docs/view/ollama-setup" },
          { label: "SQLite", viewPath: "/docs/view/sqlite-setup" },
        ],
      },
      {
        title: "Path B: API and extensibility",
        items: [
          { label: "HTTP API", viewPath: "/docs/view/api" },
          { label: "Tool extension", viewPath: "/docs/view/tool-extension" },
          { label: "Skills & memory", viewPath: "/docs/view/skills-and-memory" },
          { label: "Prompt guide", viewPath: "/docs/view/prompt-guide" },
        ],
      },
      {
        title: "Path C: Deploy and release",
        items: [
          { label: "Deployment", viewPath: "/docs/view/deployment" },
          { label: "Release process", viewPath: "/docs/view/release" },
          { label: "Changelog", viewPath: "/docs/view/changelog" },
          { label: "Release notes index", viewPath: "/docs/view/releases/readme" },
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
    moreInTree: "Both the design-paradigms directory and the release-notes directory now have on-site index pages.",
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
        title: "Models & runtime",
        items: [
          { label: "LLM providers", viewPath: "/docs/view/llm-providers" },
          { label: "Ollama", viewPath: "/docs/view/ollama-setup" },
          { label: "SQLite", viewPath: "/docs/view/sqlite-setup" },
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
          { label: "Release notes index", viewPath: "/docs/view/releases/readme" },
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
            label: "Index",
            viewPath: "/docs/view/design-paradigms/readme",
          },
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
        title: "Release notes",
        items: [
          {
            label: "Release notes index",
            viewPath: "/docs/view/releases/readme",
          },
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
