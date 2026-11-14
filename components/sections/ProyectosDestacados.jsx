"use client";

import React, { useLayoutEffect, useRef } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hind, Playfair_Display } from "next/font/google";
import { ArrowUpRight, Figma } from "lucide-react";

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

  useLayoutEffect(() => {
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
      cards.slice(0, -1).forEach((card) => {
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

      // La última tarjeta está más abajo: su entrada debe verse mientras
      // llega a la pantalla, en lugar de terminar junto a las anteriores.
      const lastCard = cards[cards.length - 1];
      if (lastCard) {
        gsap.fromTo(
          lastCard,
          { y: () => stack.offsetHeight + 48 - lastCard.offsetTop },
          {
            y: 0,
            ease: "sine.inOut",
            scrollTrigger: {
              trigger: stack,
              start: () => `top+=${lastCard.offsetTop} 90%`,
              end: () => `top+=${lastCard.offsetTop} 30%`,
              scrub: 0.45,
              invalidateOnRefresh: true,
            },
          }
        );
      }
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

          <a
            href="https://www.figma.com/design/yijRX5vBzkIeluGEDUkmNk/Landing-Oc%C3%A9anos-en-peligro?t=PMQGoRvNvnDpa2xT-1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("Ver Océanos en peligro en Figma (se abre en otra pestaña)", "View Oceans in danger in Figma (opens in a new tab)")}
            style={{ display: "block" }}
          >
            <div className="stack-card card-figma" ref={(el) => (cardsRef.current[3] = el)}>
              <span className={`${hind.className} card-figma-label`}><Figma size={20} aria-hidden="true" /> FIGMA</span>
              <h3 className={`${playfair.className} card-figma-title`}>{t("Océanos en peligro", "Oceans in danger")}</h3>
              <span className={`${hind.className} card-figma-link`}>
                {t("Ver diseño", "View design")} <ArrowUpRight size={22} aria-hidden="true" />
              </span>
            </div>
          </a>
        </div>
      </div>

    </section>
  );
}
