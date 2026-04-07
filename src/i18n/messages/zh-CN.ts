const zhCN = {
  brand: {
    name: "Secbot",
    tagline: "AI 驱动的自动化安全测试机器人",
  },
  nav: {
    home: "首页",
    download: "下载",
    docs: "文档",
    changelog: "更新日志",
    github: "GitHub",
  },
  common: {
    viewGithub: "查看 GitHub",
    language: "English",
    copyHint: "可直接复制使用",
    copyCommand: "复制命令",
    copied: "已复制",
    themeLabel: "主题",
    toggleTheme: "切换主题",
    openMenu: "菜单",
    closeMenu: "收起",
  },
  home: {
    heroTitle: "发布站点：稳定发布 + 实验探索",
    heroSubtitle:
      "Secbot 提供正式 TS 发布版本与实验 PY 版本，帮助你在授权场景中快速搭建 AI 安全测试工作流。",
    ctaTs: "获取 TS 正式版",
    ctaPy: "体验 PY 实验版",
    highlightTitle: "为什么选择 Secbot",
    highlights: [
      "多推理后端接入，覆盖主流模型平台",
      "支持 CLI 与 terminal-ui 的一致体验",
      "围绕授权安全测试设计，强调可靠与可审计",
      "正式 TS 版与实验 PY 版双轨发布，满足稳定部署与快速试验两类需求",
      "支持从发现、测试到总结的任务链路，提升安全测试自动化效率",
      "文档与安装入口清晰，团队成员可以更快上手并统一工作流",
      "项目持续迭代，版本更新节奏稳定，便于长期维护与升级",
    ],
  },
  download: {
    title: "下载与安装",
    subtitle: "按你的使用场景选择发布渠道",
    tsTitle: "TS 正式版",
    tsDesc: "适合生产与团队协作，优先保证稳定体验。",
    tsCmd: "npm i -g @opensec/secbot",
    pyTitle: "PY 实验版",
    pyDesc: "适合快速试验新能力与研究型验证。",
    pyCmd: "pip install secbot",
  },
  docs: {
    title: "文档入口",
    subtitle: "快速访问核心文档与项目资源",
    links: [
      { label: "快速开始", href: "https://github.com/iammm0/secbot/blob/main/docs/QUICKSTART.md" },
      { label: "API 文档", href: "https://github.com/iammm0/secbot/blob/main/docs/API.md" },
      { label: "模型配置", href: "https://github.com/iammm0/secbot/blob/main/docs/LLM_PROVIDERS.md" },
      { label: "部署说明", href: "https://github.com/iammm0/secbot/blob/main/docs/DEPLOYMENT.md" },
    ],
  },
  changelog: {
    title: "更新日志",
    subtitle: "近期版本更新（首版采用静态展示）",
    items: [
      { version: "v2.0.3", date: "2026-04-06", notes: "发布最新稳定版本，优化整体体验与可维护性。" },
      { version: "v2.0.0", date: "2026-03-xx", notes: "聚焦 terminal-ui 形态，整理架构并增强发布流程。" },
    ],
  },
  footer: {
    warning: "仅用于获得明确授权的安全测试、研究与教学。",
  },
};

export default zhCN;
