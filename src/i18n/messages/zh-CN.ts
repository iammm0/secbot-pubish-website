const zhCN = {
  brand: {
    name: "SecBot",
    tagline: "AI 驱动的自动化安全测试机器人",
  },
  nav: {
    home: "首页",
    docs: "文档",
    download: "下载",
    start: "开始使用",
    runtime: "运行与执行",
    github: "GitHub",
  },
  common: {
    viewGithub: "查看 GitHub",
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
    ctaTs: "快速开始",
    tsCmd: "git clone https://github.com/iammm0/secbot.git\ncd secbot\ngit checkout release\nnpm ci\nnpm run start:stack",
    highlightTitle: "核心能力",
    highlights: [
      {
        title: "权威基准测试背书",
        body: "在 DVWA 与 OWASP Juice Shop 真实工业靶场上达成 100.0% Pass@1，全面量化 Token、工具轮次与 HITL 拦截。",
      },
      {
        title: "任务规划与工具编排",
        body: "把授权目标、测试意图和上下文转成可执行步骤，并根据反馈持续调整工具调用。",
      },
      {
        title: "ExecGo 沙箱与 MCP",
        body: "支持 Linux Namespace 强隔离沙箱运行外部命令，并通过 Model Context Protocol 扩展 Python/C/Go 工具。",
      },
      {
        title: "安全工具矩阵",
        body: "覆盖侦察、协议分析、Web Research、防御检查与报告整理，减少在脚本之间来回切换。",
      },
      {
        title: "流式可观测与 HITL",
        body: "长任务按阶段输出 SSE 进度与 Token 预算用量，对高危敏感操作强制触发人机协同审批弹窗，TUI 与桌面端对齐。",
      },
      {
        title: "桌面版 + TUI + API 多端对齐",
        body: "提供 Tauri 桌面客户端（含安装/更新器）、全功能 Ink 终端界面（含 Ctrl+F 对话内搜索）以及标准 HTTP API，Windows / macOS / Ubuntu 跨平台发布。",
      },
    ],
    download: {
      title: "下载 SecBot",
      subtitle: "桌面版支持 macOS（Apple Silicon）、Windows x64、Ubuntu x64；TUI 端随包 Node 运行时，解压即可运行。",
      macosArm: "macOS · Apple Silicon",
      windowsX64: "Windows · x64",
      linuxDeb: "Ubuntu · x64 (.deb)",
      desktopLabel: "桌面版",
      tuiLabel: "TUI 命令行",
      download: "下载",
      forYou: "为你推荐",
      allPlatforms: "全部平台",
      unsupportedIntel: "macOS Intel 暂不支持，建议使用 TUI 端",
      unsupported32: "Windows 32 位暂不支持，请使用 64 位系统",
    },
  },
  docs: {
    title: "SecBot 文档",
    subtitle: "按生态边界、主项目使用、运行与执行链路组织的中文文档。",
    backToHub: "返回文档目录",
    quickNavLabel: "快速导航",
    quickLinks: [
      { label: "文档总览", viewPath: "/docs", emphasis: true },
      { label: "基准测试", viewPath: "/docs/secbot/benchmark", emphasis: true },
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
      "接口与配置说明以站内 MDX 版本为准；features 页与本地 ../secbot 的 README_CN.md 保持同步。",
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
