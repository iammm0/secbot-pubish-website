import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const themeInitScript = `
(function () {
  try {
    var root = document.documentElement;
    var savedTheme = window.localStorage.getItem("theme");
    var systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var theme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : systemTheme;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark", theme === "dark");
  } catch (error) {
    document.documentElement.setAttribute("data-theme", "dark");
    document.documentElement.classList.add("dark");
  }
})();
`;

export const metadata: Metadata = {
  title: "SecBot 文档",
  description: "SecBot 的中文文档站：生态边界、开始使用、运行与执行链路。",
  openGraph: {
    title: "SecBot 文档",
    description: "SecBot 的中文文档站：生态边界、开始使用、运行与执行链路。",
    url: "https://github.com/iammm0/secbot",
    siteName: "SecBot",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-[var(--foreground)]">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
