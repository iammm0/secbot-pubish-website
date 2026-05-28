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
    heroTitle: "AI 驱动的自动化安全测试平台",
    heroSubtitle:
      "npm-release 已收敛到 NestJS 后端与 Ink 终端界面主链路，提供 54 个 TypeScript 安全工具、SSE 执行反馈与本地配置持久化。项目仍在快速迭代，当前请优先从 npm-release 分支源码构建。",
    ctaTs: "查看源码构建",
    tsCmd: "git clone -b npm-release https://github.com/iammm0/secbot.git && cd secbot && npm install && npm run start:stack",
    highlightTitle: "核心能力",
    highlights: [
      "Node.js 24+ 源码启动链路：npm install 后通过 npm run start:stack 构建并进入 TUI",
      "NestJS 后端提供 /health、/api/system/info 与 /api/chat SSE 流式执行反馈",
      "Ink 终端界面支持 spawn 自动拉起后端，也可用 service 模式连接已有 API 服务",
      "54 个 TypeScript 工具覆盖 Security、Defense、Utility、Protocol、OSINT、Cloud、Reporting、Crawler 与 Web Research",
      "DeepSeek 与 Ollama 配置可在 .env 或 TUI /model 中维护，并持久化到 SQLite / config.yaml",
      "Python 到 TypeScript 的主链路迁移已完成，当前受版本控制路径以 NestJS + Ink 为准",
    ],
  },
  docs: {
    title: "Secbot 文档",
    subtitle: "基于 TypeScript / npm 发布线的完整文档。",
    backToHub: "返回文档目录",
    quickNavLabel: "快速导航",
    quickLinks: [
      { label: "文档总览", viewPath: "/docs", emphasis: true },
      { label: "快速开始", viewPath: "/docs/secbot/npm-release/quickstart" },
      { label: "Node 环境", viewPath: "/docs/secbot/npm-release/node-setup" },
      { label: "API 接口", viewPath: "/docs/secbot/npm-release/api" },
      { label: "安全声明", viewPath: "/docs/secbot/npm-release/security-warning" },
      { label: "部署说明", viewPath: "/docs/secbot/npm-release/deployment" },
    ],
    anchorNav: [
      { label: "从哪里读起", anchor: "where-to-start" },
      { label: "推荐阅读路径", anchor: "recommended-paths" },
    ],
    branchDocsTitle: "文档",
    branchDocsIntro: "Secbot TypeScript / npm 发布线的完整文档集合。",
    scopeTitle: "适用场景",
    scopeBullets: [
      "需要把 Secbot 作为本地或团队环境里的 AI 安全测试工作流入口。",
      "接口与配置说明以站内版本为准；同步提交记录见 docs/SOURCE.txt。",
    ],
    whereToStartTitle: "从哪里读起",
    whereToStartIntro:
      "先决定你是「先把环境跑通」「要做 HTTP/API 接入」还是「准备部署上线」，再按对应路径跳转。",
    whereToStartBullets: [
      {
        text: "快速上手：",
        links: [
          { label: "快速开始", viewPath: "/docs/secbot/npm-release/quickstart" },
          { label: "Node 环境", viewPath: "/docs/secbot/npm-release/node-setup" },
        ],
      },
      {
        text: "接入与部署：",
        links: [
          { label: "API 接口", viewPath: "/docs/secbot/npm-release/api" },
          { label: "部署说明", viewPath: "/docs/secbot/npm-release/deployment" },
        ],
      },
    ],
    recommendedPathsTitle: "推荐阅读路径",
    recommendedPaths: [
      {
        title: "新手入门",
        items: [
          { label: "快速开始", viewPath: "/docs/secbot/npm-release/quickstart" },
          { label: "Node 环境", viewPath: "/docs/secbot/npm-release/node-setup" },
          { label: "LLM 提供商", viewPath: "/docs/secbot/npm-release/llm-providers" },
        ],
      },
      {
        title: "进阶使用",
        items: [
          { label: "API 接口", viewPath: "/docs/secbot/npm-release/api" },
          { label: "工具扩展", viewPath: "/docs/secbot/npm-release/tool-extension" },
          { label: "部署说明", viewPath: "/docs/secbot/npm-release/deployment" },
        ],
      },
    ],
    docMapTitle: "文档地图",
    docMapLead: "进入文档首页可查看全部 Markdown 文档。",
    architectureCreditBefore: "信息架构参考",
    architectureCreditLink: "execgo.site 文档站",
    architectureCreditAfter: "。",
    articleLead: "以下为当前发布分支同步至本站的正文。",
    onPageTocTitle: "本页目录",
    moreInTree: "设计范式目录与历史发布说明目录都提供了站内索引页。",
  },
  footer: {
    warning: "仅用于获得明确授权的安全测试、研究与教学。",
  },
};

export default zhCN;
