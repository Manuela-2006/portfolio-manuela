"use client";
import { useLanguage } from "@/app/context/LanguageContext";
import { Hind, Cormorant_Garamond, Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "700"] });
const hind = Hind({ subsets: ["latin"], weight: "400" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: "500" });

export default function EducacionSection() {
  const { t } = useLanguage();

  return (
    <section className="educacion-nueva-section">
      <div className="educacion-container">
        <div className="educacion-left">
          <h2 className={`${playfair.className} about-title`}>
            {t("Mi formación académica", "My academic background")}
          </h2>
          <div className="educacion-subtitle-wrapper">
            <span className="educacion-line" />
            <span className={`educacion-subtitle ${hind.className}`}>{t("EDUCACIÓN", "EDUCATION")}</span>
            <span className="educacion-line" />
          </div>
        </div>

        <div className="educacion-timeline">
          <div className="educacion-item educacion-item-first">
            <div className="educacion-dot" aria-hidden="true" />
            <h3 className={`${cormorant.className} educacion-year`}>2022–2024</h3>
            <p className={`${hind.className} educacion-text`}>
              {t("Bachillerato general", "General Baccalaureate")}<br />{t("Instituto IES Juan de Lucena", "IES Juan de Lucena Secondary School")}
            </p>
          </div>

          <div className="educacion-item educacion-item-middle">
            <div className="educacion-dot" aria-hidden="true" />
            <h3 className={`${cormorant.className} educacion-year`}>2024–2026</h3>
            <p className={`${hind.className} educacion-text`}>
              {t("Grado Superior DAW", "Higher Vocational Diploma in Web Application Development (DAW)")}<br />IFP
            </p>
          </div>

          <div className="educacion-item educacion-item-last">
            <div className="educacion-dot" aria-hidden="true" />
            <h3 className={`${cormorant.className} educacion-year`}>{t("Actualidad–2030", "Present–2030")}</h3>
            <p className={`${hind.className} educacion-text`}>
              {t("Comunicación interactiva", "Interactive Communication")}<br />{t("Universidad Autonoma de Barcelona (UAB)", "Autonomous University of Barcelona (UAB)")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
