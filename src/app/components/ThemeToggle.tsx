"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    // Garante que somente uma classe ("dark" ou "light") esteja presente
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(shouldUseDark ? "dark" : "light");

    setIsDark(shouldUseDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark ? "dark" : "light";

    // Garante que só uma das classes esteja aplicada
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);

    setIsDark(newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
