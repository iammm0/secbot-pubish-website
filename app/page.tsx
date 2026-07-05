import Link from "next/link";
import { Activity, BookOpenText, BrainCircuit, Database, GitBranch, Network, Route, ShieldCheck, Terminal } from "lucide-react";
import { CopyCommandBlock } from "@/src/components/copy-command-block";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { type Locale, defaultLocale, isLocale } from "@/src/i18n/config";
import { getMessages } from "@/src/i18n/messages";

type HomeProps = {
  searchParams?: Promise<{ lang?: string }>;
};

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

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const lang = params?.lang;
  const locale: Locale = lang && isLocale(lang) ? lang : defaultLocale;
  const messages = getMessages(locale);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="site-shell flex min-h-screen flex-col">
        <SiteHeader locale={locale} messages={messages} />
        <main className="page-main">
          <section className="relative isolate overflow-hidden border-b border-[var(--line)] bg-black px-4 py-14 sm:px-8 lg:px-12">
            <div
              className="absolute inset-0 -z-20 bg-cover bg-center opacity-45"
              style={{ backgroundImage: "url('/secbot-main.png')" }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 -z-10 bg-[rgba(0,0,0,0.72)]" aria-hidden="true" />

            <div className="motion-enter mx-auto flex min-h-[30rem] w-full max-w-7xl flex-col justify-center">
              <p className="font-mono text-sm font-semibold text-[var(--brand-start)]">授权安全自动化工作台</p>
              <h1 className="mt-4 font-mono text-5xl font-bold text-white sm:text-6xl">
                {messages.brand.name}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-200 sm:text-xl">
              {messages.home.heroSubtitle}
            </p>

              <div className="cta-row mt-8 flex flex-wrap gap-3">
                <Link href="/docs" className="ui-button ui-button-primary">
                  <BookOpenText className="h-4 w-4" />
                  文档总览
                </Link>
                <Link href="/docs/secbot/quickstart" className="ui-button">
                  <Terminal className="h-4 w-4" />
                  {messages.home.ctaTs}
                </Link>
                <a
                  href="https://github.com/iammm0/secbot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-button"
                >
                  <GitBranch className="h-4 w-4" />
                  {messages.common.viewGithub}
                </a>
              </div>

              <div className="mt-8 w-full max-w-3xl">
              <CopyCommandBlock
                command={messages.home.tsCmd}
                hint={messages.common.copyHint}
                copyLabel={messages.common.copyCommand}
                copiedLabel={messages.common.copied}
              />
            </div>

              <p className="mt-5 max-w-3xl text-sm leading-6 text-zinc-300">
                仅用于已获得明确授权的安全测试、研究与教学。本站文档按 ecosystem / secbot / runtime 重排，runtime 指内部运行与执行链路，不是独立仓库。
              </p>
            </div>
          </section>

          <section
            className="motion-enter motion-enter-delay-1 mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 lg:px-12"
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
              {docEntrypoints.map((item) => {
                const Icon = item.icon;

                return (
                  <Link key={item.href} href={item.href} className="surface-card block p-5 no-underline">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-mono text-xs font-semibold text-[var(--brand-start)]">{item.eyebrow}</span>
                      <Icon className="h-5 w-5 text-[var(--muted)]" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-mono text-lg font-semibold text-[var(--foreground)]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.body}</p>
                  </Link>
                );
              })}
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
