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
      "多智能体编排架构，内置 IntentRouter 意图路由、ExploreAgent 上下文探索与 ContextManager 预算管理。一条命令启动，即刻进入授权安全测试工作流。",
    ctaTs: "npm 安装",
    tsCmd: "npm i -g @opensec/secbot",
    highlightTitle: "核心能力",
    highlights: [
      "IntentRouter 单次 LLM 调用分类六类意图，精准路由任务路径",
      "ExploreAgent 轻量 ReAct 循环，规划前自动补全上下文",
      "ContextAssembler 按模型窗口预算装配历史与记忆",
      "BrowserSession 遵守 robots 协议的网页可读性提取",
      "漏洞数据库统一 schema，适配 CVE / NVD / Exploit-DB",
      "多后端模式与自动端口选择，spawn / service / remote",
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
