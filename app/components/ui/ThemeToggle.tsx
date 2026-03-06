"use client";

import { useEffect, useState } from "react";

function setHtmlClass(isDark: boolean) {
  const root = document.documentElement;
  if (isDark) root.classList.add("dark");
  else root.classList.remove("dark");
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark";
    setHtmlClass(isDark);
    setDark(isDark);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setHtmlClass(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  }

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 dark:border-slate-700"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}