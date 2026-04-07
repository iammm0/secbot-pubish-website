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
    subtitle: "Quick access to core guides and resources",
    links: [
      { label: "Quickstart", href: "https://github.com/iammm0/secbot/blob/main/docs/QUICKSTART.md" },
      { label: "API", href: "https://github.com/iammm0/secbot/blob/main/docs/API.md" },
      { label: "LLM Providers", href: "https://github.com/iammm0/secbot/blob/main/docs/LLM_PROVIDERS.md" },
      { label: "Deployment", href: "https://github.com/iammm0/secbot/blob/main/docs/DEPLOYMENT.md" },
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
