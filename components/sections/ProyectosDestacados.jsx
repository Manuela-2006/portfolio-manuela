"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hind, Cormorant_Garamond } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

const hind = Hind({
  subsets: ["latin"],
  weight: "400"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "500"
});

export default function ProyectosDestacados() {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Animación independiente para cada tarjeta
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          delay: i * 0.15,

          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(cardsRef.current);
    };
  }, []);

  return (
    <section className="proyectos-section">

      {/* TITULAR + SUBTÍTULO */}
      <div className="proyectos-header">
        <h2
          className={`${cormorant.className} about-title`}
          style={{
            fontSize: "3rem",
            fontWeight: 500,
            marginBottom: "0.5rem"
          }}
        >
          Una selección de mis trabajos
        </h2>

        <div className="about-subtitle-wrapper proyectos-subtitle-wrapper">
          <span className="about-line" />
          <span className={`${hind.className} about-subtitle`}>
            PROYECTOS DESTACADOS
          </span>
          <span className="about-line" />
        </div>
      </div>

      {/* TARJETAS */}
      <div className="proyectos-stack-section">
        <div className="stack-wrapper">

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
  href="/GaleriaArte/index.html"
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
