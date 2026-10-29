"use client";

import { useEffect, useState } from "react";
import { Apple, Download, Laptop, Monitor, Terminal } from "lucide-react";
import type { SiteMessages } from "@/src/i18n/messages";
import { detectPlatform, type Platform } from "@/src/lib/detect-platform";

type DownloadSectionProps = {
  messages: SiteMessages;
};

const RELEASE_TAG = "desktop-app-v0.0.7-beta";
const RELEASE_URL = "https://github.com/iammm0/secbot/releases";
const ASSET_URL = `https://github.com/iammm0/secbot/releases/download/${RELEASE_TAG}`;

type DownloadRow = {
  os: Platform["os"];
  arch: Platform["arch"];
  icon: typeof Apple;
  desktopAsset?: string;
  tuiAsset?: string;
};

const ROWS: DownloadRow[] = [
  {
    os: "macos",
    arch: "arm64",
    icon: Apple,
    desktopAsset: "secbot-desktop-0.0.7-beta-macos-arm64-Secbot_0.0.7-beta_aarch64.dmg",
    tuiAsset: "secbot-tui-0.0.7-beta-macos-arm64.tar.gz",
  },
  {
    os: "windows",
    arch: "x64",
    icon: Monitor,
    desktopAsset: "secbot-desktop-0.0.7-beta-windows-x64-Secbot_0.0.7-beta_x64-setup.exe",
    tuiAsset: "secbot-tui-0.0.7-beta-windows-x64.zip",
  },
  {
    os: "linux",
    arch: "x64",
    icon: Laptop,
    desktopAsset: "secbot-desktop-0.0.7-beta-linux-x64-Secbot_0.0.7-beta_amd64.deb",
    tuiAsset: "secbot-tui-0.0.7-beta-linux-x64.tar.gz",
  },
];

function detect(): Platform | null {
  if (typeof window === "undefined") return null;
  const nav = navigator as Navigator & {
    userAgentData?: { platform?: string; architecture?: string };
    platform?: string;
  };
  return detectPlatform(
    navigator.userAgent,
    nav.userAgentData?.platform,
    nav.userAgentData?.architecture,
    nav.platform,
  );
}

function rowLabel(row: DownloadRow, messages: SiteMessages): string {
  if (row.os === "macos") return messages.home.download.macosArm;
  if (row.os === "windows") return messages.home.download.windowsX64;
  return messages.home.download.linuxDeb;
}

export function DownloadSection({ messages }: DownloadSectionProps) {
  const m = messages.home.download;
  const [detected, setDetected] = useState<Platform | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setDetected(detect()));
    return () => cancelAnimationFrame(raf);
  }, []);

  const recommended = detected
    ? ROWS.find((row) => row.os === detected.os && row.arch === detected.arch)
    : undefined;

  const note =
    detected?.os === "macos" && detected.arch !== "arm64"
      ? messages.home.download.unsupportedIntel
      : detected?.os === "windows" && detected.arch !== "x64"
        ? messages.home.download.unsupported32
        : null;

  const recommendedCard = recommended ? (
    <div className="home-download-recommended">
      <article className="home-download-card home-download-card-recommended">
        <span className="home-download-badge">{m.forYou}</span>
        <div className="home-download-card-head">
          <recommended.icon className="home-download-card-icon" aria-hidden="true" />
          <div>
            <h3 className="home-download-card-title">{rowLabel(recommended, messages)}</h3>
            <p className="home-download-card-sub">{m.desktopLabel}</p>
          </div>
        </div>
        {recommended.desktopAsset ? (
          <a
            className="ui-button ui-button-primary home-download-card-action"
            href={`${ASSET_URL}/${recommended.desktopAsset}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {m.download}
          </a>
        ) : null}
        {recommended.tuiAsset ? (
          <a
            className="ui-button home-download-card-action home-download-card-action-ghost"
            href={`${ASSET_URL}/${recommended.tuiAsset}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Terminal className="h-4 w-4" aria-hidden="true" />
            {m.tuiLabel}
          </a>
        ) : null}
      </article>
      {note ? <p className="home-download-note">{note}</p> : null}
    </div>
  ) : null;

  return (
    <section
      id="download"
      aria-labelledby="download-heading"
      className="home-download-section mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 lg:px-12"
    >
      <div className="section-head">
        <span className="home-hero-kicker">{m.kicker}</span>
        <h2 id="download-heading" className="section-title">
          {m.title}
        </h2>
        <p className="section-subtitle">{m.subtitle}</p>
      </div>

      {recommendedCard}
      {!recommended && note ? <p className="home-download-note">{note}</p> : null}

      <div className="home-download-grid">
        {ROWS.map((row) => (
          <article key={`${row.os}-${row.arch}`} className="home-download-card">
            <div className="home-download-card-head">
              <row.icon className="home-download-card-icon" aria-hidden="true" />
              <div>
                <h3 className="home-download-card-title">{rowLabel(row, messages)}</h3>
                <p className="home-download-card-sub">{m.desktopLabel}</p>
              </div>
            </div>
            {row.desktopAsset ? (
              <a
                className="ui-button home-download-card-action"
                href={`${ASSET_URL}/${row.desktopAsset}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {m.download}
              </a>
            ) : null}
            {row.tuiAsset ? (
              <a
                className="ui-button home-download-card-action home-download-card-action-ghost"
                href={`${ASSET_URL}/${row.tuiAsset}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Terminal className="h-4 w-4" aria-hidden="true" />
                {m.tuiLabel}
              </a>
            ) : null}
          </article>
        ))}
      </div>

      <p className="home-download-footer">
        {m.allPlatforms} ·{" "}
        <a href={RELEASE_URL} target="_blank" rel="noopener noreferrer" className="home-download-link">
          GitHub Releases
        </a>
      </p>
    </section>
  );
}
