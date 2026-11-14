"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (origin?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const changingTheme = useRef(false);

  useEffect(() => {
    setMounted(true);
    // Cargar tema del localStorage o usar preferencia del sistema
    let savedTheme: string | null = null;
    try { savedTheme = localStorage.getItem("theme"); } catch { /* Storage may be unavailable. */ }
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    
    setTheme(savedTheme === "light" || savedTheme === "dark" ? savedTheme : systemTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    try { localStorage.setItem("theme", theme); } catch { /* Keep the in-memory preference. */ }
  }, [theme, mounted]);

  const toggleTheme = async (origin?: { x: number; y: number }) => {
    if (changingTheme.current) return;
    const nextTheme = theme === "light" ? "dark" : "light";
    const root = document.documentElement;
    let applied = false;
    const apply = () => {
      if (applied) return;
      applied = true;
      // Commit React and the actual root palette before the browser takes its snapshot.
      flushSync(() => setTheme(nextTheme));
      root.classList.toggle("dark", nextTheme === "dark");
      root.classList.toggle("light", nextTheme === "light");
    };
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }

    changingTheme.current = true;
    root.dataset.themeTransition = "true";
    let transition: ReturnType<Document["startViewTransition"]> | undefined;
    try {
      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? 40;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      transition = document.startViewTransition(apply);
      // A skipped transition may reject ready, but the theme still needs to update.
      void transition.finished.catch(() => {});
      await transition.ready;
      const wave = root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "ease-in-out", pseudoElement: "::view-transition-new(root)" }
      );
      await wave.finished;
      await transition.finished;
    } catch {
      transition?.skipTransition();
      apply();
    } finally {
      delete root.dataset.themeTransition;
      changingTheme.current = false;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
