import { promises as fs } from "node:fs";
import path from "node:path";

const siteRoot = path.resolve(".");
const docsRoot = path.join(siteRoot, "content", "docs");
const sourceRoot = path.resolve("..", "secbot");
const githubBase = "https://github.com/iammm0/secbot";
const githubBranch = "release";

const managedPages = [
  {
    target: "secbot/features.mdx",
    sources: ["README.zh-CN.md", "README_CN.md", "docs/wiki/Home.md", "README.md"],
    title: "功能概览",
    description: "SecBot 的定位、安全边界、主要能力、技术栈和仓库入口。",
  },
  {
    target: "secbot/quickstart.mdx",
    sources: ["docs/zh/QUICKSTART.md", "docs/QUICKSTART.md", "docs/wiki/Quick-Start.md"],
    title: "快速开始",
    description: "按当前 release 仓库真实存在的 server 与 terminal-ui 链路启动 SecBot。",
  },
  {
    target: "secbot/documentation-map.mdx",
    sources: ["docs/zh/README.md", "docs/README.md", "docs/wiki/README.md", "README.zh-CN.md", "README_CN.md", "README.md"],
    title: "文档地图",
    description: "按任务组织 SecBot 主项目文档，并补充源仓库文档目录来源。",
    intro: [
      "如果不确定先读哪一页，可以按任务进入：",
      "",
      "| 任务 | 页面 |",
      "| --- | --- |",
      "| 了解项目能力 | [功能概览](/docs/secbot/features) |",
      "| 第一次运行 | [快速开始](/docs/secbot/quickstart) |",
      "| 配置模型 | [LLM 配置](/docs/secbot/llm-providers) |",
      "| 接入后端 | [API 接口](/docs/secbot/api) |",
      "| 部署服务 | [部署](/docs/secbot/deployment) |",
      "| 查看工具能力 | [工具清单](/docs/secbot/tools) |",
      "| 维护状态与上下文 | [技能与记忆](/docs/secbot/skills-and-memory) 与 [数据库](/docs/secbot/database) |",
      "| 确认合规边界 | [安全与授权](/docs/secbot/security) |",
      "| 发布和打包 | [发布](/docs/secbot/release) |",
      "| 使用终端界面 | [终端界面](/docs/secbot/ui) |",
      "",
      "下方内容来自 `../secbot` 的文档目录源文件；同步时优先读取 `docs/zh/README.md`，再按实际存在文件 fallback。",
      "",
      "---",
    ].join("\n"),
  },
  {
    target: "secbot/api.mdx",
    sources: ["docs/zh/API.md", "docs/API.md"],
    title: "API 接口",
    description: "SecBot NestJS 后端的 REST 与 SSE 接口说明。",
  },
  {
    target: "secbot/deployment.mdx",
    sources: ["docs/zh/DEPLOYMENT.md", "docs/DEPLOYMENT.md"],
    title: "部署",
    description: "从源码、构建产物、GitHub Release 包和进程管理角度部署 SecBot。",
  },
  {
    target: "secbot/llm-providers.mdx",
    sources: ["docs/zh/LLM_PROVIDERS.md", "docs/LLM_PROVIDERS.md"],
    title: "LLM 配置",
    description: "SecBot 推理后端、OpenAI-compatible Provider、Ollama 与配置优先级。",
  },
  {
    target: "secbot/tools.mdx",
    sources: ["docs/zh/Tools.md", "docs/wiki/Tools.md", "docs/TOOL_EXTENSION.md"],
    title: "工具清单",
    description: "SecBot ToolsService 的工具类别、敏感工具策略、扩展入口和 API 发现方式。",
  },
  {
    target: "secbot/skills-and-memory.mdx",
    sources: ["docs/zh/SKILLS_AND_MEMORY.md", "docs/SKILLS_AND_MEMORY.md"],
    title: "技能与记忆",
    description: "SecBot 的 skills 资料、记忆 API、本地存储和向量检索能力。",
  },
  {
    target: "secbot/database.mdx",
    sources: ["docs/zh/DATABASE_GUIDE.md", "docs/DATABASE_GUIDE.md"],
    title: "数据库",
    description: "SecBot SQLite 数据库结构、路径配置、使用方式和维护建议。",
  },
  {
    target: "secbot/security.mdx",
    sources: ["docs/zh/Security.md", "docs/wiki/Security.md", "docs/SECURITY_WARNING.md"],
    title: "安全与授权",
    description: "SecBot 的授权测试声明、敏感工具策略、法律边界、数据与隐私说明。",
  },
  {
    target: "secbot/release.mdx",
    sources: ["docs/zh/RELEASE.md", "docs/RELEASE.md", "docs/wiki/Release-and-Versioning.md"],
    title: "发布",
    description: "SecBot GitHub Release tarball、发布前检查、版本约定和维护者流程。",
  },
  {
    target: "secbot/ui.mdx",
    sources: ["docs/zh/UI-DESIGN-AND-INTERACTION.md", "docs/UI-DESIGN-AND-INTERACTION.md", "terminal-ui/README.md"],
    title: "终端界面",
    description: "SecBot terminal-ui 的技术栈、启动模式、关键文件、状态和交互说明。",
  },
];

const sourceToUrl = new Map();

const manualPages = {
  "index.mdx": manualPage({
    title: "SecBot 文档",
    description: "SecBot 的中文文档中心，按生态认知、主项目使用和内部运行执行链路组织。",
    body: [
      "SecBot 是一个 AI 驱动的授权安全自动化工作台：NestJS 后端、Ink 终端 UI、多智能体编排、内置安全工具链、Skills 与 MCP 能力共同组成完整工作流。",
      "",
      "> 本工具仅用于已获得明确授权的安全测试、研究与教学。请勿对未授权目标进行扫描、利用或远程控制。",
      "",
      "本文档不再按历史发布分支堆叠页面，而是按读者任务组织为三段：",
      "",
      "<DocsGrid>",
      '  <DocsCard href="/docs/ecosystem" eyebrow="认识" title="认识 SecBot" description="产品定位、版本边界、执行模型和文档组织方式。"/>',
      '  <DocsCard href="/docs/secbot" eyebrow="使用" title="开始使用" description="快速启动、API、部署、模型、工具、数据库和终端界面。"/>',
      '  <DocsCard href="/docs/runtime" eyebrow="执行" title="运行与执行" description="内部执行链路、任务规划、工具调用、运行检查和排障方式。"/>',
      "</DocsGrid>",
      "",
      "```text",
      "用户 / 授权目标",
      "  -> terminal-ui 或 HTTP API",
      "  -> ChatService",
      "  -> IntentRouter / ExploreAgent / PlannerAgent",
      "  -> TaskExecutor",
      "  -> ToolsService / Skills / MCP / Vuln DB",
      "  -> SSE 事件 / 报告 / SQLite 记录",
      "```",
      "",
      "## 推荐阅读路径",
      "",
      "| 目标 | 路径 |",
      "| --- | --- |",
      "| 第一次运行 SecBot | [快速开始](/docs/secbot/quickstart) -> [LLM 配置](/docs/secbot/llm-providers) -> [终端界面](/docs/secbot/ui) |",
      "| 做服务端接入 | [API 接口](/docs/secbot/api) -> [部署](/docs/secbot/deployment) -> [数据库](/docs/secbot/database) |",
      "| 理解安全边界 | [安全与授权](/docs/secbot/security) -> [版本边界](/docs/ecosystem/versioning) |",
      "| 深入执行链路 | [执行模型](/docs/ecosystem/execution-model) -> [执行流](/docs/runtime/execution-flow) -> [任务与工具](/docs/runtime/tasks) |",
      "",
      "这里的 runtime 指 SecBot 内部运行与执行链路，不是独立仓库或需要额外同步的项目。",
    ].join("\n"),
  }),
  "ecosystem/index.mdx": manualPage({
    title: "认识 SecBot",
    description: "建立 SecBot 的产品定位、仓库边界、版本边界和执行模型总览。",
    body: [
      "本节用于建立 SecBot 的稳定心智模型。当前主线是 v2 TypeScript 产品线，核心在本地 `../secbot` 仓库中：`server/` 提供 NestJS API 与 Agent 执行，`terminal-ui/` 提供 Ink 终端交互。",
      "",
      "<DocsGrid>",
      '  <DocsCard href="/docs/ecosystem/execution-model" eyebrow="模型" title="执行模型" description="Web/API/TUI、ChatService、Agent、任务执行器和工具层如何协作。"/>',
      '  <DocsCard href="/docs/ecosystem/versioning" eyebrow="版本" title="版本与边界" description="v2 TypeScript、Python Legacy、Go Demo 和运行时概念的边界。"/>',
      "</DocsGrid>",
      "",
      "## 仓库边界",
      "",
      "SecBot 的文档站只从本地 `../secbot` 读取主项目文档。`runtime` 是本站文档分区名，表示内部运行与执行层；它不对应独立的 `secbot-runtime` 仓库。",
      "",
      "## 当前读者任务",
      "",
      "- 想把项目跑起来：进入 [开始使用](/docs/secbot)。",
      "- 想理解请求如何被规划和执行：进入 [运行与执行](/docs/runtime)。",
      "- 想确认版本线和发布方式：阅读 [版本与边界](/docs/ecosystem/versioning)。",
    ].join("\n"),
  }),
  "ecosystem/execution-model.mdx": manualPage({
    title: "执行模型",
    description: "SecBot 从用户输入到工具执行、SSE 事件和本地持久化的整体模型。",
    body: [
      "SecBot 的执行模型围绕一个清晰的链路组织：入口负责收集用户意图，后端负责分类、补上下文、规划和执行，工具层负责把可控能力暴露给 Agent。",
      "",
      "```text",
      "terminal-ui / POST /api/chat",
      "  -> ChatService",
      "  -> IntentRouter",
      "  -> ExploreAgent 可选只读探索",
      "  -> ContextAssemblerService 拼装上下文",
      "  -> SecurityReActAgent 或 PlannerAgent",
      "  -> TaskExecutor 分层执行 Todo",
      "  -> ToolsService 调用安全、协议、OSINT、云、报告、Skills、MCP 等工具",
      "  -> SSE 事件、SummaryAgent、SQLite 会话记录",
      "```",
      "",
      "## 入口层",
      "",
      "`terminal-ui` 通过 HTTP 与 SSE 连接 NestJS 后端。TUI 可用 `spawn` 模式拉起本地后端，也可用 `service` 或 `remote` 模式连接已部署服务。",
      "",
      "## 后端层",
      "",
      "`ChatService` 是主编排入口。它创建或恢复会话，写入用户消息，调用意图分类器，必要时触发只读探索，再根据任务复杂度选择直接问答、简单任务执行或复杂规划执行。",
      "",
      "## 工具层",
      "",
      "`ToolsService` 静态聚合工具分类，不依赖运行时目录扫描。工具覆盖 `security`、`defense`、`utility`、`protocol`、`osint`、`cloud`、`reporting`、`control`、`crawler`、`web_research`、`skills`、`mcp` 和 `vuln_db`。",
    ].join("\n"),
  }),
  "ecosystem/versioning.mdx": manualPage({
    title: "版本与边界",
    description: "SecBot 产品线、发布方式、独立版本管理和 runtime 命名边界。",
    body: [
      "SecBot 相关项目采用独立版本管理。`secbot-components` 是本机工作区容器，不应被当成一个总仓库发布；其中 `secbot` 与 `secbot-publish-website` 分别维护自己的分支、提交和发布节奏。",
      "",
      "## 产品线",
      "",
      "| 产品线 | 说明 |",
      "| --- | --- |",
      "| v2 TypeScript | 当前主产品线，默认围绕 `release` 分支、NestJS 后端和 Ink TUI。 |",
      "| v1 Python Legacy | 历史 Python 线，独立维护，不与 v2 共用运行时。 |",
      "| Go Demo | 技术验证或实验性质，不作为正式发布线承诺。 |",
      "",
      "## 发布方式",
      "",
      "当前 v2 以 GitHub Release `.tgz` 作为用户安装包，不把 npmjs 公开发布当作主渠道。发布前检查以 `secbot` 仓库里的 `package.json`、release workflow 和验证脚本为准。",
      "",
      "## runtime 的含义",
      "",
      "本站 `/docs/runtime` 中的 runtime 表示 SecBot 内部运行与执行链路，包括意图分类、上下文拼装、规划、任务执行、工具调用、SSE 事件和本地持久化。它不是独立仓库，也不是需要额外同步的远程项目。",
    ].join("\n"),
  }),
  "secbot/index.mdx": manualPage({
    title: "开始使用 SecBot",
    description: "面向安装、启动、配置、API 接入、部署和日常维护的主项目文档入口。",
    body: [
      "本节面向想把 SecBot 跑起来、接入服务或部署到团队环境的读者。这里的页面大多从本地 `../secbot` 的中文 Markdown 文档同步生成，并在构建时转成 MDX。",
      "",
      "<DocsGrid>",
      '  <DocsCard href="/docs/secbot/quickstart" eyebrow="启动" title="快速开始" description="配置模型、启动后端和 TUI，并完成基础验证。"/>',
      '  <DocsCard href="/docs/secbot/api" eyebrow="接口" title="API 接口" description="聊天、SSE、工具、系统、数据库、记忆、网络、会话等接口。"/>',
      '  <DocsCard href="/docs/secbot/deployment" eyebrow="部署" title="部署" description="源码部署、构建产物、Release 包、进程管理和排障。"/>',
      '  <DocsCard href="/docs/secbot/documentation-map" eyebrow="地图" title="文档地图" description="按任务快速定位所有 SecBot 文档页面。"/>',
      "</DocsGrid>",
      "",
      "## 最短路径",
      "",
      "1. 阅读 [安全与授权](/docs/secbot/security)，确认使用边界。",
      "2. 按 [快速开始](/docs/secbot/quickstart) 配置 Node.js、npm、LLM 和启动命令。",
      "3. 需要服务化时继续阅读 [API 接口](/docs/secbot/api) 与 [部署](/docs/secbot/deployment)。",
    ].join("\n"),
  }),
  "runtime/index.mdx": manualPage({
    title: "运行与执行",
    description: "SecBot 内部运行链路、任务规划、工具执行和运维检查的文档入口。",
    body: [
      "本节解释 SecBot 如何把用户意图变成可观察、可审计的安全自动化执行链路。这里的 runtime 是文档分区名，不对应独立仓库。",
      "",
      "<DocsGrid>",
      '  <DocsCard href="/docs/runtime/quickstart" eyebrow="检查" title="运行链路速查" description="后端、TUI、API 和最小任务的快速验证路径。"/>',
      '  <DocsCard href="/docs/runtime/execution-flow" eyebrow="流转" title="执行流" description="ChatService、IntentRouter、ExploreAgent、Planner、TaskExecutor 与 SSE。"/>',
      '  <DocsCard href="/docs/runtime/tasks" eyebrow="任务" title="任务与工具" description="Todo、任务分层、ToolsService 分类、敏感工具和 Skills/MCP。"/>',
      '  <DocsCard href="/docs/runtime/operations" eyebrow="运维" title="运行检查" description="环境变量、日志、数据库、模型配置和常见排障点。"/>',
      "</DocsGrid>",
    ].join("\n"),
  }),
  "runtime/quickstart.mdx": manualPage({
    title: "运行链路速查",
    description: "用最少步骤确认 SecBot 后端、TUI、API 和执行链路处于可用状态。",
    body: [
      "运行链路排查时，先确认入口、模型、后端和 SSE 都可用，再看 Agent 或工具层。",
      "",
      "## 后端健康检查",
      "",
      "```bash",
      "npm ci",
      "npm run build",
      "node server/dist/main.js",
      "curl http://127.0.0.1:8000/health",
      "```",
      "",
      "## TUI 本地完整栈",
      "",
      "```bash",
      "npm run start:stack",
      "```",
      "",
      "默认情况下 TUI 使用 `spawn` 模式拉起本地后端。连接已有后端时使用：",
      "",
      "```bash",
      "SECBOT_TUI_BACKEND=service SECBOT_API_URL=http://127.0.0.1:8000 npm run start:tui",
      "```",
      "",
      "## API 最小验证",
      "",
      "```bash",
      "curl -N -X POST http://127.0.0.1:8000/api/chat \\",
      "  -H 'Content-Type: application/json' \\",
      "  -d '{\"message\":\"你是谁？\"}'",
      "```",
      "",
      "如果能收到 SSE 事件，说明入口、后端和流式输出已经连通。",
    ].join("\n"),
  }),
  "runtime/execution-flow.mdx": manualPage({
    title: "执行流",
    description: "SecBot 从用户消息到上下文探索、规划执行、工具调用和总结持久化的内部流程。",
    body: [
      "执行流由 `ChatService` 统一调度。它不直接把用户输入交给工具，而是先维护会话、分类意图、补充上下文，再决定走问答、简单任务还是复杂任务。",
      "",
      "## 主流程",
      "",
      "1. `ChatService.handleMessage` 创建或恢复 session，并把用户消息写入会话。",
      "2. `IntentRouter` 输出 `small_talk`、`meta`、`qa`、`clarify_needed`、`task_simple` 或 `task_complex`。",
      "3. `ExploreAgent` 在需要时做只读、低成本探索，把事实写入上下文池。",
      "4. `ContextAssemblerService` 汇总会话、记忆、客户端 shell 和探索结果。",
      "5. 简单任务直接交给 ReAct Agent，复杂任务由 `PlannerAgent` 生成 Todo 后交给 `TaskExecutor`。",
      "6. `TaskExecutor` 按依赖层执行 Todo，向事件总线和 SSE 输出计划、阶段、工具调用和结果。",
      "7. 需要报告时由 `SummaryAgent` 生成结构化总结，并把轮次写回数据库。",
      "",
      "## 事件可观测性",
      "",
      "SSE 事件用于把长任务拆成可观察阶段。前端或调用方应优先监听连接、规划、任务阶段、工具调用、错误和完成事件，而不是只等待最终文本。",
    ].join("\n"),
  }),
  "runtime/tasks.mdx": manualPage({
    title: "任务与工具",
    description: "SecBot Todo 执行、工具分类、敏感工具边界、Skills 与 MCP 的运行时关系。",
    body: [
      "`PlannerAgent` 会把复杂任务拆成 Todo，`TaskExecutor` 再根据依赖关系得到执行层。每一层内的 Todo 可以并行执行，跨层保持顺序约束。",
      "",
      "## 工具注册",
      "",
      "`ToolsService` 从各分类 `index.ts` 静态导入工具数组，再合并为工具注册表。当前分类包括：",
      "",
      "- `security`、`defense`、`utility`、`protocol`、`osint`、`cloud`",
      "- `reporting`、`control`、`crawler`、`web_research`、`skills`、`mcp`、`vuln_db`",
      "",
      "## 敏感工具边界",
      "",
      "工具可以在构造时标记为 sensitive。Explore 阶段只做只读上下文补全，应拒绝破坏性或需要授权确认的工具。MCP 默认也不暴露敏感能力，除非显式配置允许。",
      "",
      "## Skills 与 MCP",
      "",
      "Skills 是本地知识资产与工具封装入口；MCP 负责把外部能力接入工具层。运行时把它们纳入同一工具发现和调用路径，但合规边界仍由工具分类、敏感标记和执行策略共同约束。",
    ].join("\n"),
  }),
  "runtime/operations.mdx": manualPage({
    title: "运行检查",
    description: "SecBot 运行时的环境变量、日志、数据库、模型配置和常见排障顺序。",
    body: [
      "排障时按入口到执行层逐级确认，避免一开始就怀疑 Agent 逻辑。",
      "",
      "## 检查顺序",
      "",
      "1. Node.js 与 npm 版本满足当前仓库要求。",
      "2. `.env` 中模型 provider、API key、base URL 和 model 名称可用。",
      "3. 后端健康检查 `/health` 正常。",
      "4. TUI 连接模式正确：本地体验用 `spawn`，连接已有服务用 `service`。",
      "5. SQLite 路径可写，日志目录可写。",
      "6. `/api/tools` 能看到预期工具分类。",
      "7. SSE 调用能收到连接、规划、工具和完成事件。",
      "",
      "## 常见位置",
      "",
      "| 内容 | 位置 |",
      "| --- | --- |",
      "| 后端入口 | `server/src/main.ts` |",
      "| 聊天编排 | `server/src/modules/chat/chat.service.ts` |",
      "| 工具注册 | `server/src/modules/tools/tools.service.ts` |",
      "| TUI 入口 | `terminal-ui/src/cli.tsx` |",
      "| 本地后端日志 | `logs/backend-runtime.log` |",
      "| SQLite 默认数据 | `data/` |",
    ].join("\n"),
  }),
};

const metaFiles = {
  "meta.json": {
    title: "SecBot 文档",
    pages: ["index", "ecosystem", "secbot", "runtime"],
  },
  "ecosystem/meta.json": {
    title: "认识 SecBot",
    pages: ["index", "execution-model", "versioning"],
  },
  "secbot/meta.json": {
    title: "开始使用",
    pages: [
      "index",
      "quickstart",
      "documentation-map",
      "features",
      "api",
      "deployment",
      "llm-providers",
      "tools",
      "skills-and-memory",
      "database",
      "security",
      "release",
      "ui",
    ],
  },
  "runtime/meta.json": {
    title: "运行与执行",
    pages: ["index", "quickstart", "execution-flow", "tasks", "operations"],
  },
};

await ensureSource();
const resolvedManagedPages = await resolveManagedPages();
await rebuildDocs(resolvedManagedPages);

console.log(`已同步 SecBot 文档 ${resolvedManagedPages.length} 页到 content/docs/secbot；手写页面 ${Object.keys(manualPages).length} 页。`);

function manualPage({ title, description, body }) {
  return [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    "---",
    "",
    body.trim(),
    "",
  ].join("\n");
}

async function ensureSource() {
  const stat = await fs.stat(sourceRoot).catch(() => null);
  if (!stat?.isDirectory()) {
    throw new Error(`Missing local SecBot repository at ${sourceRoot}`);
  }
}

async function resolveManagedPages() {
  const resolved = [];

  for (const page of managedPages) {
    const candidates = await existingCandidates(page.sources);
    if (!candidates.length) {
      throw new Error(`No source found for ${page.target}. Tried: ${page.sources.join(", ")}`);
    }

    for (const candidate of candidates) {
      sourceToUrl.set(pathKey(candidate.abs), targetToUrl(page.target));
    }

    resolved.push({ ...page, source: candidates[0].rel, sourcePath: candidates[0].abs });
  }

  return resolved;
}

async function existingCandidates(sources) {
  const out = [];
  for (const rel of sources) {
    const abs = path.resolve(sourceRoot, rel);
    const stat = await fs.stat(abs).catch(() => null);
    if (stat?.isFile()) out.push({ rel, abs });
  }
  return out;
}

async function rebuildDocs(resolvedManagedPages) {
  await fs.rm(docsRoot, { recursive: true, force: true });
  await fs.mkdir(docsRoot, { recursive: true });

  for (const [target, source] of Object.entries(manualPages)) {
    await writeDocsFile(target, source);
  }

  for (const page of resolvedManagedPages) {
    const source = await fs.readFile(page.sourcePath, "utf8");
    const mdx = toMdx(source, page);
    await writeDocsFile(page.target, mdx);
  }

  for (const [target, meta] of Object.entries(metaFiles)) {
    await writeDocsFile(target, `${JSON.stringify(meta, null, 2)}\n`);
  }
}

async function writeDocsFile(rel, source) {
  const target = resolveDocsPath(rel);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, source, "utf8");
}

function toMdx(source, page) {
  const withoutFrontmatter = stripFrontmatter(source).trim();
  const { title, body } = extractTitle(withoutFrontmatter, page.title);
  const description = page.description ?? inferDescription(body);
  const rewritten = trimTrailingWhitespace(
    normalizeFenceLanguages(
      rewriteWikiLinks(
        rewriteMarkdownLinks(
          normalizeAutolinks(escapeMdxExpressions(escapeTextPlaceholders(body))),
          page.sourcePath,
        ),
      ),
    ),
  ).trim();

  return [
    "---",
    `title: ${JSON.stringify(page.title ?? title)}`,
    `description: ${JSON.stringify(description)}`,
    "---",
    "",
    page.intro ? `${page.intro.trim()}\n\n${rewritten}` : rewritten,
    "",
  ].join("\n");
}

function stripFrontmatter(source) {
  return source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

function extractTitle(source, fallback) {
  const lines = source.split(/\r?\n/);
  const titleLine = lines.findIndex((line) => /^#\s+/.test(line));
  if (titleLine === -1) return { title: fallback ?? "文档", body: source };
  const title = lines[titleLine].replace(/^#\s+/, "").trim();
  lines.splice(titleLine, 1);
  while (lines[0]?.trim() === "") lines.shift();
  return { title: fallback ?? title, body: lines.join("\n") };
}

function inferDescription(body) {
  const lines = body.split(/\r?\n/);
  let inFence = false;

  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }

    const trimmed = line.trim();
    if (
      inFence ||
      trimmed === "" ||
      trimmed === "---" ||
      trimmed.startsWith("#") ||
      trimmed.startsWith("|") ||
      trimmed.startsWith("- ") ||
      trimmed.startsWith("* ") ||
      trimmed.startsWith(">") ||
      trimmed.startsWith("[![") ||
      /^\d+\.\s/.test(trimmed)
    ) {
      continue;
    }

    const description = stripMarkdown(trimmed);
    if (description) return description.slice(0, 160);
  }

  return "SecBot 中文文档。";
}

function stripMarkdown(value) {
  return value
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[`*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function rewriteWikiLinks(source) {
  return source.replace(/\[\[([^|\]]+)(?:\|([^\]]+))?]]/g, (_, page, label) => {
    const trimmed = page.trim();
    const href = wikiPageToUrl(trimmed);
    return href ? `[${label?.trim() || trimmed}](${href})` : (label?.trim() || trimmed);
  });
}

function wikiPageToUrl(page) {
  const map = new Map([
    ["Home", "/docs/secbot/features"],
    ["Installation", "/docs/secbot/quickstart"],
    ["Quick-Start", "/docs/secbot/quickstart"],
    ["Environment-Variables", "/docs/secbot/quickstart"],
    ["Product-Lines", "/docs/ecosystem/versioning"],
    ["Architecture", "/docs/ecosystem/execution-model"],
    ["Agent-Orchestration", "/docs/runtime/execution-flow"],
    ["Terminal-UI", "/docs/secbot/ui"],
    ["Tools", "/docs/secbot/tools"],
    ["Skills-and-MCP", "/docs/secbot/skills-and-memory"],
    ["Release-and-Versioning", "/docs/ecosystem/versioning"],
    ["Development", `${githubBase}/blob/${githubBranch}/docs/wiki/Development.md`],
    ["Security", "/docs/secbot/security"],
  ]);

  return map.get(page);
}

function rewriteMarkdownLinks(source, sourcePath) {
  return source.replace(
    /(!?)\[([^\]]+)]\(([^)\s]+(?:\s+"[^"]*")?)\)/g,
    (match, bang, label, rawHref) => {
      if (bang) return match;
      const href = rawHref.replace(/\s+"[^"]*"$/, "");
      const title = rawHref.slice(href.length);
      const rewritten = rewriteHref(href, sourcePath);
      return `[${label}](${rewritten}${title})`;
    },
  );
}

function rewriteHref(href, sourcePath) {
  if (
    href.startsWith("#") ||
    href.startsWith("/") ||
    /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(href)
  ) {
    return href;
  }

  const { pathname, suffix } = splitHref(href);
  let decodedPath = pathname;
  try {
    decodedPath = decodeURI(pathname);
  } catch {
    // Keep malformed URI escapes as-is.
  }

  const sourceTarget = path.resolve(path.dirname(sourcePath), decodedPath);
  const mappedUrl = sourceToUrl.get(pathKey(sourceTarget));
  if (mappedUrl) return `${mappedUrl}${suffix}`;

  const relative = slash(path.relative(sourceRoot, sourceTarget));
  if (relative.startsWith("../")) return href;
  return githubSourceUrl(sourceTarget, relative, suffix);
}

function githubSourceUrl(sourceTarget, relative, suffix) {
  const normalized = encodePath(relative.replace(/\/$/, ""));
  const looksLikeDirectory = relative.endsWith("/") || !path.extname(relative);
  return `${githubBase}/${looksLikeDirectory ? "tree" : "blob"}/${githubBranch}/${normalized}${suffix}`;
}

function splitHref(href) {
  const match = href.match(/^([^?#]*)([?#].*)?$/);
  return { pathname: match?.[1] ?? href, suffix: match?.[2] ?? "" };
}

function escapeTextPlaceholders(source) {
  const lines = source.split(/\r?\n/);
  let inFence = false;

  return lines
    .map((line) => {
      if (/^```/.test(line.trim())) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      return line.replace(/<([A-Za-z][A-Za-z0-9_-]*)>/g, "&lt;$1&gt;");
    })
    .join("\n");
}

function normalizeAutolinks(source) {
  const lines = source.split(/\r?\n/);
  let inFence = false;

  return lines
    .map((line) => {
      if (/^```/.test(line.trim())) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;
      return line.replace(/<((?:https?:\/\/|mailto:)[^>\s]+)>/g, (_, url) => `[${url}](${url})`);
    })
    .join("\n");
}

function escapeMdxExpressions(source) {
  const lines = source.split(/\r?\n/);
  let inFence = false;

  return lines
    .map((line) => {
      if (/^```/.test(line.trim())) {
        inFence = !inFence;
        return line;
      }
      if (inFence || /<Docs[A-Za-z]/.test(line)) return line;
      return line.replace(/[{}]/g, (char) => `\\${char}`);
    })
    .join("\n");
}

function normalizeFenceLanguages(source) {
  return source.replace(/^```([A-Za-z0-9_-]+)\s*$/gm, (match, language) => {
    const normalized = language.toLowerCase();
    if (normalized === "env" || normalized === "dotenv") return "```bash";
    if (normalized === "mermaid") return "```text";
    return match;
  });
}

function trimTrailingWhitespace(source) {
  return source
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .join("\n");
}

function targetToUrl(target) {
  let route = slash(target).replace(/\.mdx$/, "");
  if (route.endsWith("/index")) route = route.slice(0, -"/index".length);
  return `/docs/${route}`;
}

function resolveDocsPath(rel) {
  const resolved = path.resolve(docsRoot, rel);
  const relative = path.relative(docsRoot, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Refusing to write outside docs: ${rel}`);
  }
  return resolved;
}

function pathKey(value) {
  return path.normalize(value).toLowerCase();
}

function slash(value) {
  return value.split(path.sep).join("/");
}

function encodePath(value) {
  return slash(value)
    .split("/")
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}
