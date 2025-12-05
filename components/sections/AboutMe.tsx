"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hind, Cormorant_Garamond } from "next/font/google";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"], 
});

// Registrar el plugin de ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const hind = Hind({
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "500",
});

export default function AboutMe() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    // Animación inicial de entrada
    gsap.fromTo(
      imageRef.current,
      {
        opacity: 0,
        y: 40,
        rotate: -8,
      },
      {
        opacity: 1,
        y: 0,
        rotate: -5,
        duration: 1.4,
        ease: "power3.out",
      }
    );

    // Animación al hacer scroll
    gsap.to(imageRef.current, {
      y: -80,
      rotate: -2,
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Cleanup al desmontar
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="about" className="about-section">
      {/* Columna texto */}
      <div className="about-text">
      <h2
  className={`${lato.className} about-title`}
  style={{
    fontSize: "3rem",
    fontWeight: 300,
    marginBottom: "0.5rem",
  }}
>
  Conoce más sobre mí
</h2>

        <div className="about-subtitle-wrapper">
          <span className="about-line" />
          <span className={`${hind.className} about-subtitle`}>MI HISTORIA</span>
          <span className="about-line" />
        </div>

        <p className={hind.className + " about-paragraph"}>
  Soy una persona proactiva y creativa, apasionada por el diseño y el desarrollo web. 
  Mi experiencia enseñando robótica y programación me ha permitido desarrollar un pensamiento lógico sólido, mientras que mi faceta más artística me impulsa a crear proyectos funcionales, estéticos y centrados en el usuario.
</p>

<p className={hind.className + " about-paragraph"}>
  He vivido experiencias internacionales en Estados Unidos y Canadá, lo que fortaleció mi capacidad de adaptación, mi comunicación y mi visión global del mundo digital. 
  Actualmente estudio Desarrollo de Aplicaciones Web y continúo formándome cada día con el objetivo de convertirme en una desarrolladora capaz de transformar ideas en experiencias digitales intuitivas, limpias y modernas.
</p>
      </div>

      {/* Columna imagen */}
      <div className="about-image-wrapper">
        <div ref={imageRef} className="about-image-inner">
          <Image
            src="/foto.jpeg"
            alt="Foto personal"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}