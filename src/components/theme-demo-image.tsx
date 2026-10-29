"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";

type ThemeDemoImageProps = {
  light: string;
  dark: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  priority?: boolean;
};

function subscribeTheme(callback: () => void): () => void {
  const root = document.documentElement;
  const observer = new MutationObserver(callback);
  observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getTheme(): string {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function getServerTheme(): string {
  return "dark";
}

/** 按当前站点主题（data-theme）切换 light / dark 两套演示 GIF。 */
export function ThemeDemoImage({ light, dark, alt, width, height, sizes, priority }: ThemeDemoImageProps) {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  return (
    <Image
      src={theme === "light" ? light : dark}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      priority={priority}
      sizes={sizes}
    />
  );
}
