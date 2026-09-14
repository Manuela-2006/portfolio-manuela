"use client";

import { Hind } from "next/font/google";
import { useLanguage } from "@/app/context/LanguageContext";

const hind = Hind({ subsets: ["latin"], weight: "400" });

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className={`${hind.className} language-switcher`}>
      <button
        type="button"
        className="language-switcher-button"
        role="switch"
        aria-checked={language === "en"}
        aria-label={t("Idioma inglés", "English language")}
        title={t("Cambiar a inglés", "Switch to Spanish")}
        onClick={() => setLanguage(language === "es" ? "en" : "es")}
      >
        <span className="language-switcher-slider" aria-hidden="true" />
        <span className="language-switcher-label" aria-hidden="true">ES</span>
        <span className="language-switcher-label" aria-hidden="true">EN</span>
      </button>
    </div>
  );
}
