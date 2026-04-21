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
      "文档按上游发布分支拆分展示：pypi-release 对应 Python / PyPI 路线，npm-release 对应 TypeScript / npm 路线。信息架构参考 execgo.site 的分支文档展示方式。",
    backToHub: "返回文档目录",
    quickNavLabel: "开始这里",
    quickLinks: [
      { label: "文档总览", viewPath: "/docs", emphasis: true },
      { label: "PY 文档", viewPath: "/docs/secbot/pypi-release" },
      { label: "NPM 文档", viewPath: "/docs/secbot/npm-release" },
      { label: "PY 快速开始", viewPath: "/docs/secbot/pypi-release/quickstart" },
      { label: "NPM 快速开始", viewPath: "/docs/secbot/npm-release/quickstart" },
      { label: "安全声明", viewPath: "/docs/secbot/pypi-release/security-warning" },
    ],
    anchorNav: [
      { label: "分支文档", anchor: "branch-docs" },
      { label: "从哪里读起", anchor: "where-to-start" },
      { label: "推荐阅读路径", anchor: "recommended-paths" },
      { label: "这套文档适合什么", anchor: "doc-scope" },
      { label: "文档地图", anchor: "doc-map" },
    ],
    branchDocsTitle: "选择发布分支",
    branchDocsIntro:
      "Secbot 现在同时维护 Python / PyPI 与 TypeScript / npm 两条发布线。请先选择你要使用的发布渠道，再进入对应分支下的文档地图。",
    scopeTitle: "这套文档适合什么",
    scopeBullets: [
      "需要把 Secbot 作为本地或团队环境里的 AI 安全测试工作流入口，但希望按实际发布渠道阅读文档。",
      "Python 使用者应优先进入 pypi-release；Node.js / TypeScript 使用者应优先进入 npm-release。",
      "接口与配置说明以站内对应分支版本为准；同步提交记录见 docs/SOURCE.txt 与各分支目录下的 SOURCE.txt。",
    ],
    whereToStartTitle: "先判断你应该从哪读起",
    whereToStartIntro:
      "第一次接触时，不必按文件名顺序硬读。先决定你是「先把环境跑通」「要做 HTTP/API 接入」还是「准备部署上线」，再按对应路径跳转到站内页面。",
    whereToStartBullets: [
      {
        text: "准备使用 Python / PyPI 版本：",
        links: [
          { label: "PY 文档首页", viewPath: "/docs/secbot/pypi-release" },
          { label: "PY 快速开始", viewPath: "/docs/secbot/pypi-release/quickstart" },
        ],
      },
      {
        text: "准备使用 TypeScript / npm 版本：",
        links: [
          { label: "NPM 文档首页", viewPath: "/docs/secbot/npm-release" },
          { label: "NPM 快速开始", viewPath: "/docs/secbot/npm-release/quickstart" },
          { label: "Node 环境", viewPath: "/docs/secbot/npm-release/node-setup" },
        ],
      },
      {
        text: "需要接入 API 或部署：",
        links: [
          { label: "PY API", viewPath: "/docs/secbot/pypi-release/api" },
          { label: "NPM API", viewPath: "/docs/secbot/npm-release/api" },
          { label: "部署说明", viewPath: "/docs/secbot/npm-release/deployment" },
        ],
      },
    ],
    recommendedPathsTitle: "推荐阅读路径",
    recommendedPaths: [
      {
        title: "路径 A：Python / PyPI",
        items: [
          { label: "PY 文档首页", viewPath: "/docs/secbot/pypi-release" },
          { label: "快速开始", viewPath: "/docs/secbot/pypi-release/quickstart" },
          { label: "模型与 LLM 提供商", viewPath: "/docs/secbot/pypi-release/llm-providers" },
          { label: "部署说明", viewPath: "/docs/secbot/pypi-release/deployment" },
        ],
      },
      {
        title: "路径 B：TypeScript / npm",
        items: [
          { label: "NPM 文档首页", viewPath: "/docs/secbot/npm-release" },
          { label: "快速开始", viewPath: "/docs/secbot/npm-release/quickstart" },
          { label: "Node 环境", viewPath: "/docs/secbot/npm-release/node-setup" },
          { label: "迁移状态", viewPath: "/docs/secbot/npm-release/ts-migration-status" },
        ],
      },
    ],
    docMapTitle: "文档地图",
    docMapLead: "文档地图按分支生成；进入分支首页后可以查看该分支实际存在的全部 Markdown 文档。",
    architectureCreditBefore: "信息架构与阅读路径参考",
    architectureCreditLink: "execgo.site 文档站",
    architectureCreditAfter: "。",
    articleLead: "以下为当前发布分支同步至本站的正文；文末提供本页目录，便于在长文中跳转。",
    onPageTocTitle: "本页目录",
    moreInTree: "设计范式目录与历史发布说明目录都提供了站内索引页，可直接进入。",
  },
  footer: {
    warning: "仅用于获得明确授权的安全测试、研究与教学。",
  },
};

export default zhCN;
