const zhCN = {
  brand: {
    name: "Secbot",
    tagline: "AI 驱动的自动化安全测试机器人",
  },
  nav: {
    home: "首页",
    download: "下载",
    docs: "文档",
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
    title: "文档中心",
    subtitle: "按主题浏览使用说明与接入指南；正文已整理进本站，可直接在站内预览，无需跳转外部文档站。",
    backToHub: "返回文档目录",
    moreInTree: "其余 Markdown 见项目 docs/ 目录，访问路径为 /docs/view/文件名（小写、无 .md 后缀；子目录同理）。",
    sections: [
      {
        title: "入门与安全",
        items: [
          {
            label: "文档导览",
            description: "本站维护的目录与链接表",
            viewPath: "/docs/view/readme",
          },
          { label: "快速开始", viewPath: "/docs/view/quickstart" },
          { label: "安全声明", viewPath: "/docs/view/security-warning" },
        ],
      },
      {
        title: "环境与依赖",
        items: [
          { label: "Node 环境", viewPath: "/docs/view/node-setup" },
          { label: "Ollama", viewPath: "/docs/view/ollama-setup" },
          { label: "SQLite", viewPath: "/docs/view/sqlite-setup" },
          { label: "Docker", viewPath: "/docs/view/docker-setup" },
        ],
      },
      {
        title: "接入与扩展",
        items: [
          { label: "HTTP API", viewPath: "/docs/view/api" },
          { label: "模型与 LLM 提供商", viewPath: "/docs/view/llm-providers" },
          { label: "工具扩展", viewPath: "/docs/view/tool-extension" },
          { label: "Skills 与记忆", viewPath: "/docs/view/skills-and-memory" },
        ],
      },
      {
        title: "部署与发布",
        items: [
          { label: "部署说明", viewPath: "/docs/view/deployment" },
          { label: "发布流程", viewPath: "/docs/view/release" },
          { label: "文档侧变更记录", viewPath: "/docs/view/changelog" },
        ],
      },
      {
        title: "产品与交互",
        items: [
          { label: "应用说明（APP）", viewPath: "/docs/view/app" },
          { label: "UI 与交互设计", viewPath: "/docs/view/ui-design-and-interaction" },
          { label: "Prompt 指南", viewPath: "/docs/view/prompt-guide" },
          { label: "语音相关", viewPath: "/docs/view/speech-guide" },
        ],
      },
      {
        title: "数据库与测试环境",
        items: [
          { label: "数据库指南", viewPath: "/docs/view/database-guide" },
          { label: "虚拟测试环境", viewPath: "/docs/view/virtual-test-environment" },
        ],
      },
      {
        title: "设计范式（架构）",
        items: [
          {
            label: "Agent 架构",
            viewPath: "/docs/view/design-paradigms/agent-architecture",
          },
          {
            label: "CLI 与依赖",
            viewPath: "/docs/view/design-paradigms/cli-and-dependencies",
          },
          {
            label: "配置与环境",
            viewPath: "/docs/view/design-paradigms/config-and-env",
          },
          {
            label: "提交约定",
            viewPath: "/docs/view/design-paradigms/commit-conventions",
          },
          {
            label: "Prompt 管理",
            viewPath: "/docs/view/design-paradigms/prompt-management",
          },
          {
            label: "React 与工具调用",
            viewPath: "/docs/view/design-paradigms/react-and-tool-calling",
          },
          {
            label: "Session 与事件",
            viewPath: "/docs/view/design-paradigms/session-and-events",
          },
          {
            label: "Skill 插件系统",
            viewPath: "/docs/view/design-paradigms/skill-plugin-system",
          },
        ],
      },
      {
        title: "历史版本说明（节选）",
        items: [
          {
            label: "v1.8.0 说明",
            viewPath: "/docs/view/releases/v1.8.0",
          },
          {
            label: "v1.7.0 说明",
            viewPath: "/docs/view/releases/v1.7.0",
          },
        ],
      },
    ],
  },
  footer: {
    warning: "仅用于获得明确授权的安全测试、研究与教学。",
  },
};

export default zhCN;
