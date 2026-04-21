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
      "Docs are split by upstream release branch: pypi-release for Python / PyPI and npm-release for TypeScript / npm. The branch-first structure follows the execgo.site documentation pattern.",
    backToHub: "Back to docs hub",
    quickNavLabel: "Start here",
    quickLinks: [
      { label: "Overview", viewPath: "/docs", emphasis: true },
      { label: "PY docs", viewPath: "/docs/secbot/pypi-release" },
      { label: "NPM docs", viewPath: "/docs/secbot/npm-release" },
      { label: "PY quickstart", viewPath: "/docs/secbot/pypi-release/quickstart" },
      { label: "NPM quickstart", viewPath: "/docs/secbot/npm-release/quickstart" },
      { label: "Security", viewPath: "/docs/secbot/pypi-release/security-warning" },
    ],
    anchorNav: [
      { label: "Branch docs", anchor: "branch-docs" },
      { label: "Where to start", anchor: "where-to-start" },
      { label: "Recommended paths", anchor: "recommended-paths" },
      { label: "Who this is for", anchor: "doc-scope" },
      { label: "Doc map", anchor: "doc-map" },
    ],
    branchDocsTitle: "Choose a release branch",
    branchDocsIntro:
      "Secbot currently maintains both Python / PyPI and TypeScript / npm release lines. Pick the release channel first, then read the docs generated from that branch snapshot.",
    scopeTitle: "Who this documentation is for",
    scopeBullets: [
      "Teams that want Secbot as a local or shared entry point for AI-driven security workflows, while reading the docs that match their release channel.",
      "Python users should start with pypi-release; Node.js / TypeScript users should start with npm-release.",
      "Operators who treat each on-site branch copy as canonical for the synced revision; see docs/SOURCE.txt and each branch SOURCE.txt for commits.",
    ],
    whereToStartTitle: "Choose where to start",
    whereToStartIntro:
      "On first contact, you do not need to read files in alphabetical order. Pick whether you are unblocking install, integrating via API, or shipping to production, then follow the matching path below.",
    whereToStartBullets: [
      {
        text: "Using Python / PyPI:",
        links: [
          { label: "PY docs home", viewPath: "/docs/secbot/pypi-release" },
          { label: "PY quickstart", viewPath: "/docs/secbot/pypi-release/quickstart" },
        ],
      },
      {
        text: "Using TypeScript / npm:",
        links: [
          { label: "NPM docs home", viewPath: "/docs/secbot/npm-release" },
          { label: "NPM quickstart", viewPath: "/docs/secbot/npm-release/quickstart" },
          { label: "Node setup", viewPath: "/docs/secbot/npm-release/node-setup" },
        ],
      },
      {
        text: "API integration or deployment:",
        links: [
          { label: "PY API", viewPath: "/docs/secbot/pypi-release/api" },
          { label: "NPM API", viewPath: "/docs/secbot/npm-release/api" },
          { label: "Deployment", viewPath: "/docs/secbot/npm-release/deployment" },
        ],
      },
    ],
    recommendedPathsTitle: "Recommended reading paths",
    recommendedPaths: [
      {
        title: "Path A: Python / PyPI",
        items: [
          { label: "PY docs home", viewPath: "/docs/secbot/pypi-release" },
          { label: "Quickstart", viewPath: "/docs/secbot/pypi-release/quickstart" },
          { label: "LLM providers", viewPath: "/docs/secbot/pypi-release/llm-providers" },
          { label: "Deployment", viewPath: "/docs/secbot/pypi-release/deployment" },
        ],
      },
      {
        title: "Path B: TypeScript / npm",
        items: [
          { label: "NPM docs home", viewPath: "/docs/secbot/npm-release" },
          { label: "Quickstart", viewPath: "/docs/secbot/npm-release/quickstart" },
          { label: "Node setup", viewPath: "/docs/secbot/npm-release/node-setup" },
          { label: "Migration status", viewPath: "/docs/secbot/npm-release/ts-migration-status" },
        ],
      },
    ],
    docMapTitle: "Documentation map",
    docMapLead:
      "The documentation map is generated per branch. Open a branch home page to browse every Markdown file that exists in that branch snapshot.",
    architectureCreditBefore: "Layout and reading-path patterns inspired by",
    architectureCreditLink: "execgo.site docs",
    architectureCreditAfter: ".",
    articleLead: "Synced content for the active release branch; use the on-page table of contents at the end to jump inside long pages.",
    onPageTocTitle: "On this page",
    moreInTree: "Both the design-paradigms directory and the release-notes directory now have on-site index pages.",
  },
  footer: {
    warning: "Only for authorized security testing, research, and education.",
  },
};

export default enUS;
