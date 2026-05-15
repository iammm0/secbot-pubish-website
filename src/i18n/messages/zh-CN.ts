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
      "Secbot 提供正式 TS 发布版本与实验 PY 版本，内置多智能体编排架构（IntentRouter + ExploreAgent + ContextManager），帮助你在授权场景中快速搭建 AI 安全测试工作流。",
    ctaTs: "获取 TS 正式版",
    ctaPy: "体验 PY 实验版",
    tsTitle: "TS 正式版",
    tsCmd: "npm i -g @opensec/secbot",
    pyTitle: "PY 实验版",
    pyCmd: "pip install secbot",
    highlightTitle: "为什么选择 Secbot",
    highlights: [
      "IntentRouter 单次 LLM 调用将用户意图分为六类，精准路由到简单任务或复杂规划路径",
      "ExploreAgent 在正式规划前以轻量 ReAct 微循环补全上下文，支持 vuln_db_query 与 browser_session",
      "BrowserSession 工具遵守 robots 协议并使用可读性提取，适合授权场景下的网页内容获取",
      "ContextAssemblerService 按模型窗口预算装配历史与记忆，SSE context_usage 实时推送用量至 TUI",
      "多后端模式（spawn / service / remote）与自动端口选择，避免多实例冲突",
      "TUI 体验全面升级：启动过渡动画、输入历史切换、鼠标转义过滤、Thought Markdown 渲染",
      "漏洞数据库统一 schema，适配 CVE / NVD / Exploit-DB / MITRE ATT&CK",
      "提供 HTTP API 与工具扩展机制，便于与现有平台、CI/CD 流水线或自研编排系统对接",
      "Skills 与记忆扩展可沉淀团队知识，减少重复配置与口径不一致",
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
