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
  title: "Secbot Publish",
  description: "Secbot official release website for TS and PY distributions.",
  openGraph: {
    title: "Secbot Publish",
    description: "Official TS release and experimental PY release.",
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
