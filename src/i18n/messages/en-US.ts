const enUS = {
  brand: {
    name: "Secbot",
    tagline: "AI-powered automated security testing bot",
  },
  nav: {
    home: "Home",
    download: "Download",
    docs: "Docs",
    changelog: "Changelog",
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
    title: "Documentation",
    subtitle: "Browse guides by topic. Content is hosted and rendered on this site only—no external doc jumps.",
    backToHub: "Back to docs hub",
    moreInTree: "Additional Markdown files live under docs/; open them at /docs/view/… (lowercase slug, no .md suffix).",
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
  changelog: {
    title: "Changelog",
    subtitle: "Recent updates (static in v1 site)",
    items: [
      { version: "v2.0.3", date: "2026-04-06", notes: "Latest stable release with overall UX and maintainability improvements." },
      { version: "v2.0.0", date: "2026-03-xx", notes: "Focused on terminal-ui shape, streamlined architecture and release flow." },
    ],
  },
  footer: {
    warning: "Only for authorized security testing, research, and education.",
  },
};

export default enUS;
