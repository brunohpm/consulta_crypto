"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    // Verificar preferência salva ou preferência do sistema
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme:dark)"
    ).matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, []);
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800
dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors
duration-200"
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
