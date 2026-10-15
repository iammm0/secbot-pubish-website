import Link from "next/link";
import Image from "next/image";
import {
  BookOpenText,
  GitBranch,
  Terminal,
} from "lucide-react";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { getMessages } from "@/src/i18n/messages";

const showcaseDemos = [
  {
    src: "/demos/web-home.gif",
    alt: "SecBot 桌面版首页输入演示",
    label: "Desktop",
    title: "首页与对话入口",
  },
  {
    src: "/demos/web-tools.gif",
    alt: "SecBot 桌面版内置工具清单演示",
    label: "Desktop",
    title: "内置工具矩阵",
  },
  {
    src: "/demos/web-settings.gif",
    alt: "SecBot 桌面版设置面板演示",
    label: "Desktop",
    title: "设置面板",
  },
  {
    src: "/demos/web-model.gif",
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
                <figure className="home-hero-art">
                  <Image
                    src="/demos/tui-hero.gif"
                    alt="SecBot 桌面版巡检本机服务工作流演示"
                    width={960}
                    height={600}
                    unoptimized
                    priority
                    sizes="(min-width: 1024px) 68vw, 100vw"
                  />
                </figure>
              </div>
            </div>
          </section>

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
                <figure key={demo.src} className="home-showcase-item">
                  <div className="home-showcase-frame">
                    <Image
                      src={demo.src}
                      alt={demo.alt}
                      width={960}
                      height={600}
                      unoptimized
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
