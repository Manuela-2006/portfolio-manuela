"use client";

import Marquee from "react-fast-marquee";
import { useLanguage } from "@/app/context/LanguageContext";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "300",
});

const items = [
  "DISEÑO",
  "DESARROLLO",
  "FRONTEND",
  "UI/UX",
  "PROTOTIPADO",
  "MAQUETACIÓN",
  "BRANDING",
  "CREATIVIDAD",
  "INNOVACIÓN",
  "PRECISIÓN",
  "DETALLE",
  "FUNCIONALIDAD",
  "ESTÉTICA",
  "INTENCIÓN",
];

const englishItems = [
  "DESIGN", "DEVELOPMENT", "FRONTEND", "UI/UX", "PROTOTYPING", "LAYOUT",
  "BRANDING", "CREATIVITY", "INNOVATION", "PRECISION", "DETAIL", "FUNCTIONALITY",
  "AESTHETICS", "INTENT",
];

export default function TextMarquee() {
  const { t } = useLanguage();
  return (
    <Marquee
      speed={40}
      gradient={false}
      className="text-marquee-fast border-y py-3"
    >
      {items.map((item, i) => (
        <span key={i} className={`text-marquee-fast-item ${oswald.className}`}>
          <span className="text-marquee-fast-label">{t(item, englishItems[i])}</span>
          <span className="text-marquee-fast-line" aria-hidden="true" />
        </span>
      ))}
    </Marquee>
  );
}
