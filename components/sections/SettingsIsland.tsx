"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";
import { useLanguage } from "@/app/context/LanguageContext";
import styles from "./SettingsIsland.module.css";

export default function SettingsIsland() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (containerRef.current?.contains(document.activeElement)) orbRef.current?.focus();
      setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className={`${styles.island} ${open ? styles.open : ""}`}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setOpen(true); }}
      onPointerLeave={() => {
        if (!containerRef.current?.contains(document.activeElement)) setOpen(false);
      }}
      onFocusCapture={(event) => {
        if (window.matchMedia("(hover: hover)").matches || event.target.matches(":focus-visible")) setOpen(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          // Focus first so its focus handler cannot reopen the closed panel.
          orbRef.current?.focus();
          setOpen(false);
          event.stopPropagation();
        }
      }}
    >
      <button
        ref={orbRef}
        type="button"
        className={styles.orb}
        aria-label={t("Abrir ajustes", "Open settings")}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <Settings className={styles.gear} size={18} aria-hidden="true" />
      </button>
      <div id={panelId} className={styles.panel} inert={!open} aria-hidden={!open}>
        <svg className={styles.arc} viewBox="0 0 142 142" aria-hidden="true">
          <path d="M22 120 A98 98 0 0 1 120 22" />
        </svg>
        <button
          type="button"
          className={styles.lightTheme}
          aria-label={t("Activar tema claro", "Switch to light theme")}
          aria-pressed={theme === "light"}
          title={t("Tema claro", "Light theme")}
          onClick={(event) => {
            if (theme === "light") return;
            const bounds = event.currentTarget.getBoundingClientRect();
            toggleTheme({ x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 });
          }}
        >
          <Sun size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={styles.darkTheme}
          aria-label={t("Activar tema oscuro", "Switch to dark theme")}
          aria-pressed={theme === "dark"}
          title={t("Tema oscuro", "Dark theme")}
          onClick={(event) => {
            if (theme === "dark") return;
            const bounds = event.currentTarget.getBoundingClientRect();
            toggleTheme({ x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 });
          }}
        >
          <Moon size={18} aria-hidden="true" />
        </button>
        <button type="button" lang="es" aria-label="Español" aria-pressed={language === "es"} onClick={() => setLanguage("es")}>ES</button>
        <button type="button" lang="en" aria-label="English" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
      </div>
    </div>
  );
}
