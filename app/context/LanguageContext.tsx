"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type Language = "es" | "en";
const STORAGE_KEY = "cv-language";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (spanish: string, english: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // El servidor y el primer render del navegador siempre muestran el español original.
  const [language, updateLanguage] = useState<Language>("es");

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "en") updateLanguage("en");
    } catch {
      // El selector tambien funciona cuando el navegador bloquea el almacenamiento.
    }
  }, []);

  const setLanguage = useCallback((next: Language) => {
    updateLanguage(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // La preferencia se mantiene en memoria durante esta visita.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [language]);

  const t = useCallback((spanish: string, english: string) => (
    language === "en" ? english : spanish
  ), [language]);
  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage requires LanguageProvider");
  return context;
}
