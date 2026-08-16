import Link from "next/link";
import Image from "next/image";
import {
  Activity,
  ArrowRight,
  BookOpenText,
  BrainCircuit,
  Database,
  GitBranch,
  Network,
  Route,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { CopyCommandBlock } from "@/src/components/copy-command-block";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { getMessages } from "@/src/i18n/messages";

const capabilityIcons = [BrainCircuit, ShieldCheck, Activity, Network, Database, Terminal];
const docEntrypoints = [
  {
    href: "/docs/ecosystem",
    eyebrow: "认识",
    title: "认识 SecBot",
    body: "产品线、授权边界、发布方式和整体执行模型，先建立稳定的项目地图。",
    icon: ShieldCheck,
  },
  {
    href: "/docs/secbot",
    eyebrow: "使用",
    title: "开始使用",
    body: "安装、快速开始、终端界面、环境变量、LLM、API 与部署路径。",
    icon: BookOpenText,
  },
  {
    href: "/docs/runtime",
    eyebrow: "执行",
    title: "运行与执行",
    body: "Agent 编排、工具清单、Skills/MCP、工具扩展、记忆系统和设计范式。",
    icon: Route,
  },
];

export default async function Home() {
  const messages = getMessages();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="site-shell flex min-h-screen flex-col">
        <SiteHeader messages={messages} />
        <main className="page-main">
          <section className="home-hero">
            <div className="motion-enter home-hero-inner">
              <div className="home-hero-content">
                <div className="home-hero-copy">
                  <h1 className="home-hero-title">{messages.brand.name}</h1>
                  <p className="home-hero-subtitle">{messages.home.heroSubtitle}</p>
                  <div className="cta-row home-hero-actions">
                    <Link href="/docs" className="ui-button ui-button-primary">
                      <BookOpenText className="h-4 w-4" />
                      文档总览
                    </Link>
                    <Link href="/docs/secbot/quickstart" className="ui-button ui-button-hero">
                      <Terminal className="h-4 w-4" />
                      {messages.home.ctaTs}
                    </Link>
                    <a
                      href="https://github.com/iammm0/secbot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ui-button ui-button-hero"
                    >
                      <GitBranch className="h-4 w-4" />
                      {messages.common.viewGithub}
                    </a>
                  </div>
                </div>

                <figure className="home-hero-art">
                  <Image
                    src="/secbot-demo.gif"
                    alt="SecBot 终端界面演示"
                    width={960}
                    height={554}
                    unoptimized
                    priority
                    sizes="(min-width: 1024px) 43vw, 100vw"
                  />
                </figure>
              </div>
            </div>
          </section>

          <section
            className="home-docs-section motion-enter motion-enter-delay-1 mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 lg:px-12"
            aria-labelledby="docs-entrypoints"
          >
            <div className="section-head">
              <h2 id="docs-entrypoints" className="section-title">
                文档入口
              </h2>
              <p className="section-subtitle">
                文档不再按历史发布分支展开，而是按阅读任务横向组织：先理解边界，再开始使用，最后深入执行链路。
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {docEntrypoints.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link key={item.href} href={item.href} className="doc-entry-card surface-card group">
                    <div className="flex items-start justify-between gap-4">
                      <span className="doc-entry-index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="doc-entry-icon">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </div>
                    <p className="doc-entry-eyebrow">{item.eyebrow}</p>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <span className="doc-entry-action">
                      进入文档
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section
            className="motion-enter motion-enter-delay-2 mx-auto w-full max-w-7xl px-4 pb-12 sm:px-8 lg:px-12"
            aria-labelledby="local-run"
          >
            <div className="home-run-panel">
              <div className="home-run-copy">
                <p className="home-run-kicker">本地运行</p>
                <h2 id="local-run">先把 SecBot 跑起来</h2>
                <p>
                  release 分支是当前网站文档对应的主线。复制命令后可在本地启动完整栈，再进入快速开始查看配置与验证步骤。
                </p>
              </div>
              <div className="home-command-panel">
                <CopyCommandBlock
                  command={messages.home.tsCmd}
                  hint={messages.common.copyHint}
                  copyLabel={messages.common.copyCommand}
                  copiedLabel={messages.common.copied}
                />
              </div>
            </div>
          </section>

          <section
            className="motion-enter motion-enter-delay-2 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-8 lg:px-12"
            aria-labelledby="core-capabilities"
          >
            <h2
              id="core-capabilities"
              className="mb-5 font-mono text-sm font-semibold text-[var(--foreground)]"
            >
              {messages.home.highlightTitle}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {messages.home.highlights.map((item, index) => {
                const Icon = capabilityIcons[index] ?? ShieldCheck;

                return (
                  <div
                    key={item.title}
                    className="surface-card min-h-44 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--brand-soft)] text-[var(--brand-start)]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <p className="font-mono text-xs text-[var(--muted-soft)]">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>
                    <div className="mt-5">
                      <h3 className="font-mono text-base font-semibold leading-snug text-[var(--foreground)]">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
        <SiteFooter messages={messages} />
      </div>
    </div>
  );
}
