"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Hind } from "next/font/google";
import { useLanguage, type Language } from "@/app/context/LanguageContext";

const hind = Hind({ subsets: ["latin"], weight: "400" });
const options: { value: Language; label: string }[] = [
  { value: "es", label: "Español" },
  { value: "en", label: "English" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLButtonElement>(`[lang="${language}"]`)?.focus();
    const dismiss = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open, language]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    if (!open) {
      setOpen(true);
      return;
    }
    const buttons = [...(menuRef.current?.querySelectorAll("button") ?? [])];
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
    buttons[(index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length]?.focus();
  };

  return (
    <div ref={rootRef} className={`${hind.className} language-switcher`}
      onKeyDown={handleKeyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}>
      <button ref={buttonRef} type="button" className="language-switcher-button"
        aria-expanded={open} aria-controls={id}
        aria-label={t("Seleccionar idioma", "Select language")}
        onClick={() => setOpen((current) => !current)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <ellipse cx="12" cy="12" rx="4" ry="9" />
          <path d="M3 12h18" />
        </svg>
        <span>{language === "es" ? "Español" : "English"}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
          stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d={open ? "M2 8l4-4 4 4" : "M2 4l4 4 4-4"} />
        </svg>
      </button>
      {open && (
        <div id={id} ref={menuRef} className="language-switcher-options"
          role="group" aria-label={t("Idioma del currículum", "CV language")}>
          {options.map((option) => (
            <button type="button" key={option.value} lang={option.value}
              aria-pressed={language === option.value}
              onClick={() => {
                setLanguage(option.value);
                setOpen(false);
                buttonRef.current?.focus();
              }}>
              {option.label}
              <span aria-hidden="true">{language === option.value ? "✓" : ""}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
