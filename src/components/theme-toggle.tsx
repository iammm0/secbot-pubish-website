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

export function ThemeToggle({ ariaLabel, className = "", showLabel = false, label = "Theme" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }
    const saved = window.localStorage.getItem("theme");
    return saved === "light" || saved === "dark" ? (saved as Theme) : getSystemTheme();
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
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
