"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hind, Playfair_Display } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

const hind = Hind({
  subsets: ["latin"],
  weight: "400"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});

export default function ProyectosDestacados() {
  const { t } = useLanguage();
  const cardsRef = useRef([]);
  const stackRef = useRef(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const cards = cardsRef.current.filter(Boolean);
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stack,
          start: "top 90%",
          end: "top 8%",
          scrub: 0.45,
          invalidateOnRefresh: true,
        },
      });

      // Cada tarjeta parte por debajo del area visible del apilado.
      // Una unica secuencia permite invertir el orden al subir el scroll.
      cards.forEach((card) => {
        timeline.fromTo(
          card,
          { y: () => stack.offsetHeight + 48 - card.offsetTop },
          {
            y: 0,
            duration: 1,
            ease: "sine.inOut",
          }
        );
      });
    });

    // Solo se limpian las animaciones y los triggers de este componente.
    return () => media.revert();
  }, []);

  return (
    <section className="proyectos-section">

      {/* TITULAR + SUBTÍTULO */}
      <div className="proyectos-header">
        <h2
          className={`${playfair.className} about-title`}
          style={{
            fontSize: "3rem",
            fontWeight: 300,
            marginBottom: "0.5rem"
          }}
        >
          {t("ALGUNOS DE MIS TRABAJOS", "A SELECTION OF MY WORK")}
        </h2>

        <div className="about-subtitle-wrapper proyectos-subtitle-wrapper">
          <span className="about-line" />
          <span className={`${hind.className} about-subtitle`}>
            {t("PROYECTOS DESTACADOS", "FEATURED PROJECTS")}
          </span>
          <span className="about-line" />
        </div>
      </div>

      {/* TARJETAS */}
      <div className="proyectos-stack-section">
        <div className="stack-wrapper" ref={stackRef}>

          {/* 🔗 TARJETA GRIS CLICABLE */}
          <a
  href="/Rio-1/index.html"
  target="_blank"
  rel="noopener noreferrer"
  style={{ display: "block" }}
>
  <div
    className="stack-card card-gray"
    ref={(el) => (cardsRef.current[0] = el)}
  />
</a>

          {/* TARJETA ROJA */}
          <a
  href="https://cuento-pinocho.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  style={{ display: "block" }}
>
  <div
    className="stack-card card-red"
    ref={(el) => (cardsRef.current[1] = el)}
  />
</a>

          {/* TARJETA NEGRA */}
          <a
  href="https://oceanos-fregiles-22vw.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  style={{ display: "block" }}
>
  <div
    className="stack-card card-black"
    ref={(el) => (cardsRef.current[2] = el)}
  />
</a>

        </div>
      </div>

    </section>
  );
}
