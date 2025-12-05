"use client";
import { Hind, Cormorant_Garamond } from "next/font/google";
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: "300" });
const hind = Hind({ subsets: ["latin"], weight: "400" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: "500" });

export default function EducacionSection() {
  return (
    <section className="educacion-nueva-section">
      <div className="educacion-container">
        {/* Columna izquierda */}
        <div className="educacion-left">
        <h2 className={`${lato.className} about-title`}>
  Mi formación académica
</h2>
          <div
  className="educacion-subtitle-wrapper"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",   // 👈 CENTRADO REAL
    gap: "16px",
    marginBottom: "1.5rem",
  }}
>
  <span className="educacion-line"></span>

  <span className={`educacion-subtitle ${hind.className}`}>
    EDUCACIÓN
  </span>

  <span className="educacion-line"></span>
</div>
        </div>

        {/* Columna derecha */}
        <div className="educacion-right">
          {/* Línea vertical */}
          <div className="educacion-vertical-line" />
          
          <div className="educacion-timeline">
            {/* ITEM 1 */}
            <div className="educacion-item">
              <div className="educacion-dot" />
              <div>
                <h3 className={`${cormorant.className} educacion-year`}>
                  2025–Actualidad
                </h3>
                <p className={`${hind.className} educacion-text`}>
                  Grado Superior DAW
                  <br />
                  IFP
                </p>
              </div>
            </div>

            {/* ITEM 2 */}
            <div className="educacion-item">
              <div className="educacion-dot" />
              <div>
                <h3 className={`${cormorant.className} educacion-year`}>
                  2023–2025
                </h3>
                <p className={`${hind.className} educacion-text`}>
                  Bachillerato general
                  <br />
                  Instituto IES Juan de Lucena
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}