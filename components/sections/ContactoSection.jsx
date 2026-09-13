"use client";

import { useLayoutEffect, useRef } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import Image from "next/image";
import { Playfair_Display, Hind, Mrs_Saint_Delafield } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "700"] });
const hind = Hind({ subsets: ["latin"], weight: "400" });
const signature = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400" });

export default function ContactSection() {
  const { t } = useLanguage();
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const content = contentRef.current;
    const footer = content?.closest("footer");
    if (!content || !footer) return;

    const updateDivider = () => {
      // offsetTop se mide respecto al footer, que es el ancestro posicionado.
      content.style.setProperty("--divider-extension", `${content.offsetTop}px`);
    };
    updateDivider();
    const observer = new ResizeObserver(updateDivider);
    observer.observe(footer);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="contact-section">
      <div className="contact-footer-inner">
      {/* HEADER */}
      <div className="contact-header">
        <h2 className={`${playfair.className} about-title`}>
          {t("Ponte en", "Get in")}<br />{t("contacto", "touch")}
        </h2>

        <div
          className="about-subtitle-wrapper"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span className="about-line" />
          <span
            className={`${hind.className} about-subtitle`}
            style={{ textAlign: "center" }}
          >
            {t("HABLEMOS", "LET’S TALK")}
          </span>
          <span className="about-line" />
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="contact-content" ref={contentRef}>
        <svg className="contact-divider" aria-hidden="true" focusable="false">
          <line x1="50%" y1="0" x2="50%" y2="100%"
            stroke="#8B2F2F" strokeWidth="2"
            strokeDasharray="14 10" strokeLinecap="round"
            vectorEffect="non-scaling-stroke" />
        </svg>
        <dl className={`${hind.className} contact-details`}>
          <div>
            <dt className={`${hind.className} contact-availability-label`}>
              <Image src="/calendar.svg" alt="" width={20} height={20} />
              {t("Disponibilidad:", "Availability:")}
            </dt>
            <dd>{t("Inmediata", "Immediate")}</dd>
          </div>
          <div>
            <dt className={`${hind.className} contact-location-label`}>
              <Image src="/map.svg" alt="" width={20} height={20} />
              {t("Ubicación:", "Location:")}
            </dt>
            <dd>Cerdanyola del Valles</dd>
          </div>
          <div>
            <dt className={`${hind.className} contact-position-label`}>
              <Image src="/monitor.svg" alt="" width={20} height={20} />
              {t("Posición:", "Work arrangement:")}
            </dt>
            <dd>{t("Remota", "Remote")}</dd>
          </div>
        </dl>
        <div className="contact-card">
          <a
            href="mailto:ruizmanuela2006@gmail.com"
            className="contact-item"
          >
            <Image
              src="/correos.svg"
              alt={t("Icono email", "Email icon")}
              width={40}
              height={40}
            />
            <span className={`${hind.className} contact-item-text`}>
              Email
            </span>
          </a>

          <a
            href="tel:670363627"
            className="contact-item"
          >
            <Image
              src="/Telefono.svg"
              alt={t("Icono teléfono", "Phone icon")}
              width={40}
              height={40}
            />
            <span className={`${hind.className} contact-item-text`}>
              {t("Teléfono", "Phone")}
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/manuela-ruiz-palma-77321632a"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            <Image
              src="/Linkedin.svg"
              alt={t("Icono LinkedIn", "LinkedIn icon")}
              width={40}
              height={40}
            />
            <span className={`${hind.className} contact-item-text`}>
              Linkedin
            </span>
          </a>

          {/* NUEVO - DESCARGAR CV */}
          <a
  href="/Manuela-Ruiz-Palma-CV.pdf"
  download
  className="contact-item"
>
  <Image
    src="/CV.svg"
    alt={t("Icono descargar CV", "Download CV icon")}
    width={40}
    height={40}
  />
  <span className={`${hind.className} contact-item-text`}>
    {t("Descargar CV", "Download CV")}
  </span>
</a>
        </div>
      </div>
      <div className="contact-signoff" aria-label={t("Firma de Manuela", "Manuela’s signature")}>
        <span className={`${signature.className} contact-signoff-name`} aria-hidden="true">Manuela</span>
        <svg className="contact-signoff-flourish" viewBox="0 0 180 32" aria-hidden="true">
          <path d="M 14 20 C 51 10 111 5 156 9 C 174 11 169 16 151 17 C 120 19 74 21 38 24 M 137 6 C 151 2 163 2 171 4"
            fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      </div>
    </footer>
  );
}
