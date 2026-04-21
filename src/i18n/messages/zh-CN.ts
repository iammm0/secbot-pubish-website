const zhCN = {
  brand: {
    name: "Secbot",
    tagline: "AI 驱动的自动化安全测试机器人",
  },
  nav: {
    home: "首页",
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
    tsTitle: "TS 正式版",
    tsCmd: "npm i -g @opensec/secbot",
    pyTitle: "PY 实验版",
    pyCmd: "pip install secbot",
    highlightTitle: "为什么选择 Secbot",
    highlights: [
      "多推理后端接入，覆盖主流模型平台",
      "支持 CLI 与 terminal-ui 的一致体验",
      "围绕授权安全测试设计，强调可靠与可审计",
      "正式 TS 版与实验 PY 版双轨发布，满足稳定部署与快速试验两类需求",
      "支持从发现、测试到总结的任务链路，提升安全测试自动化效率",
      "文档与安装入口清晰，团队成员可以更快上手并统一工作流",
      "项目持续迭代，版本更新节奏稳定，便于长期维护与升级",
      "提供 HTTP API 与工具扩展机制，便于与现有平台、流水线或自研编排对接",
      "Skills 与记忆等扩展能力可沉淀团队知识，减少重复配置与口径不一致",
    ],
  },
  docs: {
    title: "Secbot 文档总览",
    subtitle:
      "当前同步的是 Python CLI / FastAPI 路线文档；正文由上游 docs/ 同步至本站，全部在站内阅读。信息架构参考 execgo.site 文档站的分层与导读方式。",
    backToHub: "返回文档目录",
    quickNavLabel: "开始这里",
    quickLinks: [
      { label: "文档总览", viewPath: "/docs", emphasis: true },
      { label: "快速开始", viewPath: "/docs/view/quickstart" },
      { label: "HTTP API", viewPath: "/docs/view/api" },
      { label: "模型与 LLM", viewPath: "/docs/view/llm-providers" },
      { label: "部署说明", viewPath: "/docs/view/deployment" },
      { label: "安全声明", viewPath: "/docs/view/security-warning" },
    ],
    anchorNav: [
      { label: "从哪里读起", anchor: "where-to-start" },
      { label: "推荐阅读路径", anchor: "recommended-paths" },
      { label: "这套文档适合什么", anchor: "doc-scope" },
      { label: "文档地图", anchor: "doc-map" },
    ],
    scopeTitle: "这套文档适合什么",
    scopeBullets: [
      "需要把 Secbot 作为本地或团队环境里的 AI 安全测试工作流入口，从安装、模型配置到 CLI / API 跑通。",
      "当前这套站内文档以 Python CLI 与可选 FastAPI 后端为主，而不是旧版 Node / Docker / UI 文章集合。",
      "接口与配置说明以站内版本为准；与上游不一致时以你同步时的提交为准（见 docs/SOURCE.txt）。",
    ],
    whereToStartTitle: "先判断你应该从哪读起",
    whereToStartIntro:
      "第一次接触时，不必按文件名顺序硬读。先决定你是「先把环境跑通」「要做 HTTP/API 接入」还是「准备部署上线」，再按对应路径跳转到站内页面。",
    whereToStartBullets: [
      {
        text: "第一次安装与试用：",
        links: [
          { label: "快速开始", viewPath: "/docs/view/quickstart" },
          { label: "安全声明", viewPath: "/docs/view/security-warning" },
        ],
      },
      {
        text: "模型配置与本地运行：",
        links: [
          { label: "模型与 LLM 提供商", viewPath: "/docs/view/llm-providers" },
          { label: "Ollama", viewPath: "/docs/view/ollama-setup" },
          { label: "SQLite", viewPath: "/docs/view/sqlite-setup" },
        ],
      },
      {
        text: "API 接入、扩展与部署：",
        links: [
          { label: "HTTP API", viewPath: "/docs/view/api" },
          { label: "工具扩展", viewPath: "/docs/view/tool-extension" },
          { label: "部署说明", viewPath: "/docs/view/deployment" },
          { label: "发布流程", viewPath: "/docs/view/release" },
        ],
      },
    ],
    recommendedPathsTitle: "推荐阅读路径",
    recommendedPaths: [
      {
        title: "路径 A：先把 CLI 与模型跑通",
        items: [
          { label: "快速开始", viewPath: "/docs/view/quickstart" },
          { label: "模型与 LLM 提供商", viewPath: "/docs/view/llm-providers" },
          { label: "Ollama（可选）", viewPath: "/docs/view/ollama-setup" },
          { label: "SQLite 说明", viewPath: "/docs/view/sqlite-setup" },
        ],
      },
      {
        title: "路径 B：接入 API 与扩展能力",
        items: [
          { label: "HTTP API", viewPath: "/docs/view/api" },
          { label: "工具扩展", viewPath: "/docs/view/tool-extension" },
          { label: "Skills 与记忆", viewPath: "/docs/view/skills-and-memory" },
          { label: "Prompt 指南", viewPath: "/docs/view/prompt-guide" },
        ],
      },
      {
        title: "路径 C：准备部署与发布",
        items: [
          { label: "部署说明", viewPath: "/docs/view/deployment" },
          { label: "发布流程", viewPath: "/docs/view/release" },
          { label: "变更日志", viewPath: "/docs/view/changelog" },
          { label: "发布说明索引", viewPath: "/docs/view/releases/readme" },
        ],
      },
    ],
    docMapTitle: "文档地图",
    docMapLead: "按主题分组；点击条目进入站内预览。其余文件仍可通过路径 /docs/view/… 直接打开（与仓库 docs/ 文件名对应，小写、无 .md 后缀）。",
    architectureCreditBefore: "信息架构与阅读路径参考",
    architectureCreditLink: "execgo.site 文档站",
    architectureCreditAfter: "。",
    articleLead: "以下为同步至本站的正文；文末提供本页目录，便于在长文中跳转。",
    onPageTocTitle: "本页目录",
    moreInTree: "设计范式目录与历史发布说明目录都提供了站内索引页，可直接进入。",
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
        title: "模型与运行环境",
        items: [
          { label: "模型与 LLM 提供商", viewPath: "/docs/view/llm-providers" },
          { label: "Ollama", viewPath: "/docs/view/ollama-setup" },
          { label: "SQLite", viewPath: "/docs/view/sqlite-setup" },
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
          { label: "发布说明索引", viewPath: "/docs/view/releases/readme" },
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
            label: "目录索引",
            viewPath: "/docs/view/design-paradigms/readme",
          },
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
        title: "历史版本说明",
        items: [
          {
            label: "发布说明索引",
            viewPath: "/docs/view/releases/readme",
          },
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
