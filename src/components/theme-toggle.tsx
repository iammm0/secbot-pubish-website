"use client";

import { useEffect, useState } from "react";
import { Contrast } from "lucide-react";

type Theme = "light" | "dark";

type ThemeToggleProps = {
  ariaLabel: string;
  className?: string;
  showLabel?: boolean;
  label?: string;
};

function getSystemTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeToggle({ ariaLabel, className = "", showLabel = false, label = "主题" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }
    const saved = window.localStorage.getItem("theme");
    return saved === "light" || saved === "dark" ? (saved as Theme) : getSystemTheme();
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    const root = document.documentElement;
    root.setAttribute("data-theme", nextTheme);
    root.classList.toggle("dark", nextTheme === "dark");
    window.localStorage.setItem("theme", nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`ui-button ${className}`.trim()}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <Contrast className="h-4 w-4" />
      {showLabel ? label : null}
    </button>
  );
}
