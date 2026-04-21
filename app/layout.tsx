import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "secbot",
  description: "Secbot 的发布与文档站点（TS 正式版 + PY 实验版）。",
  openGraph: {
    title: "Secbot 发布站",
    description: "Secbot 的发布与文档站点（TS 正式版 + PY 实验版）。",
    url: "https://github.com/iammm0/secbot",
    siteName: "Secbot",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-[var(--foreground)]">{children}</body>
    </html>
  );
}
