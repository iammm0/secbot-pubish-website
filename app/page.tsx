import Link from "next/link";
import { DownloadSection } from "@/src/components/download-section";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { ThemeDemoImage } from "@/src/components/theme-demo-image";
import { getMessages } from "@/src/i18n/messages";

const showcaseDemos = [
  {
    light: "/demos/web-session-light.gif",
    dark: "/demos/web-session-dark.gif",
    alt: "SecBot 桌面版新建会话与斜杠命令演示",
    label: "Desktop",
    title: "新对话与会话",
  },
  {
    light: "/demos/web-tools-light.gif",
    dark: "/demos/web-tools-dark.gif",
    alt: "SecBot 桌面版内置工具清单演示",
    label: "Desktop",
    title: "内置工具矩阵",
  },
  {
    light: "/demos/web-settings-light.gif",
    dark: "/demos/web-settings-dark.gif",
    alt: "SecBot 桌面版设置面板演示",
    label: "Desktop",
    title: "设置面板",
  },
  {
    light: "/demos/web-model-light.gif",
    dark: "/demos/web-model-dark.gif",
    alt: "SecBot 桌面版模型与主题配置演示",
    label: "Desktop",
    title: "模型与主题",
  },
] as const;

export default async function Home() {
  const messages = getMessages();

  return (
    <div className="min-h-screen bg-background">
      <div className="site-shell flex min-h-screen flex-col">
        <SiteHeader messages={messages} />
        <main className="page-main">
          <section className="home-hero">
            <div className="motion-enter home-hero-inner">
              <div className="home-hero-content">
                <div className="home-hero-copy">
                  <span className="home-hero-kicker">{messages.home.heroKicker}</span>
                  <h1 className="home-hero-title">{messages.home.heroTitle}</h1>
                  <p className="home-hero-subtitle">{messages.home.heroSubtitle}</p>
                  <div className="home-hero-actions">
                    <Link className="ui-button ui-button-primary" href="/#download">
                      {messages.home.downloadCta}
                    </Link>
                    <Link className="ui-button" href="/docs/secbot/quickstart">
                      {messages.home.ctaTs}
                    </Link>
                  </div>
                </div>
                <figure className="home-hero-art">
                  <ThemeDemoImage
                    light="/demos/web-home-light.gif"
                    dark="/demos/web-home-dark.gif"
                    alt="SecBot 桌面版对话输入与安全工作流演示"
                    width={960}
                    height={600}
                    priority
                    sizes="(min-width: 1024px) 68vw, 100vw"
                  />
                </figure>
              </div>
            </div>
          </section>

          <DownloadSection messages={messages} />

          <section
            className="home-showcase-section motion-enter motion-enter-delay-1"
            aria-labelledby="product-showcase"
          >
            <div className="home-showcase-head">
              <h2 id="product-showcase" className="section-title">
                产品实拍
              </h2>
            </div>

            <div className="home-showcase-grid">
              {showcaseDemos.map((demo) => (
                <figure key={demo.dark} className="home-showcase-item">
                  <div className="home-showcase-frame">
                    <ThemeDemoImage
                      light={demo.light}
                      dark={demo.dark}
                      alt={demo.alt}
                      width={960}
                      height={600}
                      sizes="(min-width: 768px) 45vw, 100vw"
                    />
                  </div>
                  <figcaption>
                    <span className="home-showcase-label">{demo.label}</span>
                    <span className="home-showcase-title">{demo.title}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section
            className="home-docs-section motion-enter motion-enter-delay-2 mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 lg:px-12"
            aria-labelledby="docs-entrypoints"
          >
            <div className="section-head">
              <h2 id="docs-entrypoints" className="section-title">
                继续阅读
              </h2>
            </div>
            <div className="home-doc-links">
              <Link href="/docs/ecosystem">认识 SecBot</Link>
              <Link href="/docs/secbot">开始使用</Link>
              <Link href="/docs/secbot/benchmark">权威基准测试</Link>
              <Link href="/docs/runtime">运行与执行</Link>
              <Link href="/docs/secbot/quickstart">快速开始</Link>
            </div>
          </section>
        </main>
        <SiteFooter messages={messages} />
      </div>
    </div>
  );
}
