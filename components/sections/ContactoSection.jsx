"use client";

import Image from "next/image";
import { Lato, Hind, Cormorant_Garamond, Dancing_Script } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: "300" });
const hind = Hind({ subsets: ["latin"], weight: "400" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: "500" });
const signature = Dancing_Script({ subsets: ["latin"], weight: "400" });

export default function ContactSection() {
  return (
    <section className="contact-section">
      {/* HEADER */}
      <div className="contact-header">
      <h2
  className={`${lato.className} about-title`}
  style={{
    fontSize: "3rem",
    fontWeight: 300,
    marginBottom: "0.5rem",
    textAlign: "center"
  }}
>
  Ponte en contacto
</h2>

        <div
          className="about-subtitle-wrapper"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span className="about-line" />
          <span
            className={`${hind.className} about-subtitle`}
            style={{ textAlign: "center" }}
          >
            HABLEMOS
          </span>
          <span className="about-line" />
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="contact-content">
        {/* COLUMNA IZQUIERDA (CÍRCULO + FIRMA) */}
        <div className="contact-signature-wrapper">
          <div className="contact-signature-circle">
            <span className={`${signature.className} contact-signature-text`}>
              Manuela
            </span>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="contact-card">
          <a
            href="mailto:ruizmanuela2006@gmail.com"
            className="contact-item"
          >
            <Image
              src="/correos.svg"
              alt="Icono email"
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
              alt="Icono teléfono"
              width={40}
              height={40}
            />
            <span className={`${hind.className} contact-item-text`}>
              Teléfono
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
              alt="Icono LinkedIn"
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
    alt="Icono descargar CV"
    width={40}
    height={40}
  />
  <span className={`${hind.className} contact-item-text`}>
    Descargar CV
  </span>
</a>
        </div>
      </div>
    </section>
  );
}
