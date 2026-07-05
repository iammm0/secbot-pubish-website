const zhCN = {
  brand: {
    name: "SecBot",
    tagline: "AI 驱动的自动化安全测试机器人",
  },
  nav: {
    home: "首页",
    docs: "文档",
    start: "开始使用",
    runtime: "运行与执行",
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
      "SecBot 将安全测试工具、LLM 推理与本地执行环境组合成可审计的工作流，面向获得明确授权的安全测试、研究与教学场景。",
    ctaTs: "快速开始",
    tsCmd: "git clone https://github.com/iammm0/secbot.git && cd secbot && git checkout release && npm ci && npm run start:stack",
    highlightTitle: "核心能力",
    highlights: [
      {
        title: "任务规划与工具编排",
        body: "把授权目标、测试意图和上下文转成可执行步骤，并根据反馈持续调整工具调用。",
      },
      {
        title: "安全工具矩阵",
        body: "覆盖侦察、协议分析、Web Research、防御检查与报告整理，减少在脚本之间来回切换。",
      },
      {
        title: "流式执行可观测",
        body: "长任务按阶段输出进度、中间结果和错误，便于中断、复盘和定位问题。",
      },
      {
        title: "模型与环境适配",
        body: "可接入云端或本地 LLM，在团队网络、成本和隐私约束下选择合适方案。",
      },
      {
        title: "可复现的会话记忆",
        body: "配置、上下文和运行记录保留在本地，方便审计、复测和持续调优。",
      },
      {
        title: "TUI + API 双入口",
        body: "终端适合人机协作，HTTP API 适合接入流水线、服务端任务和自动化脚本。",
      },
    ],
  },
  docs: {
    title: "SecBot 文档",
    subtitle: "按生态边界、主项目使用、运行与执行链路组织的中文文档。",
    backToHub: "返回文档目录",
    quickNavLabel: "快速导航",
    quickLinks: [
      { label: "文档总览", viewPath: "/docs", emphasis: true },
      { label: "认识 SecBot", viewPath: "/docs/ecosystem" },
      { label: "快速开始", viewPath: "/docs/secbot/quickstart" },
      { label: "API 接口", viewPath: "/docs/secbot/api" },
      { label: "运行与执行", viewPath: "/docs/runtime" },
      { label: "安全与授权", viewPath: "/docs/secbot/security" },
    ],
    anchorNav: [
      { label: "从哪里读起", anchor: "where-to-start" },
      { label: "推荐阅读路径", anchor: "recommended-paths" },
    ],
    branchDocsTitle: "文档",
    branchDocsIntro: "SecBot TypeScript / npm 发布线的完整文档集合。",
    scopeTitle: "适用场景",
    scopeBullets: [
      "需要把 SecBot 作为本地或团队环境里的 AI 安全测试工作流入口。",
      "接口与配置说明以站内 MDX 版本为准；同步内容来自本地 ../secbot。",
    ],
    whereToStartTitle: "从哪里读起",
    whereToStartIntro:
      "先决定你是「先把环境跑通」「要做 HTTP/API 接入」还是「准备部署上线」，再按对应路径跳转。",
    whereToStartBullets: [
      {
        text: "快速上手：",
        links: [
          { label: "快速开始", viewPath: "/docs/secbot/quickstart" },
          { label: "文档地图", viewPath: "/docs/secbot/documentation-map" },
        ],
      },
      {
        text: "接入与部署：",
        links: [
          { label: "API 接口", viewPath: "/docs/secbot/api" },
          { label: "部署说明", viewPath: "/docs/secbot/deployment" },
        ],
      },
    ],
    recommendedPathsTitle: "推荐阅读路径",
    recommendedPaths: [
      {
        title: "新手入门",
        items: [
          { label: "快速开始", viewPath: "/docs/secbot/quickstart" },
          { label: "文档地图", viewPath: "/docs/secbot/documentation-map" },
          { label: "LLM 配置", viewPath: "/docs/secbot/llm-providers" },
        ],
      },
      {
        title: "进阶使用",
        items: [
          { label: "API 接口", viewPath: "/docs/secbot/api" },
          { label: "工具清单", viewPath: "/docs/secbot/tools" },
          { label: "部署说明", viewPath: "/docs/secbot/deployment" },
        ],
      },
    ],
    docMapTitle: "文档地图",
    docMapLead: "进入文档首页可查看全部 MDX 文档。",
    architectureCreditBefore: "文档页面布局参考",
    architectureCreditLink: "damn-agent 文档站",
    architectureCreditAfter: "。",
    articleLead: "以下为当前发布分支同步至本站的正文。",
    onPageTocTitle: "本页目录",
    moreInTree: "文档按 ecosystem、secbot、runtime 三段组织。",
  },
  footer: {
    warning: "仅用于获得明确授权的安全测试、研究与教学。",
  },
};

export default zhCN;
