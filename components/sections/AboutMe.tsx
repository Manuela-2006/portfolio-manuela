"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hind, Cormorant_Garamond, Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

gsap.registerPlugin(ScrollTrigger);

const hind = Hind({
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "500",
});

const aboutText =
  "Me llamo Manuela y soy de las que se quedan hasta las 3 de la ma\u00F1ana, porque si algo se hace, se hace bien. Empec\u00E9 en la rob\u00F3tica porque mi madre me puso un folleto delante y yo, fiel a mi costumbre de apuntarme a todo, dije que s\u00ED. Esa decisi\u00F3n lo cambi\u00F3 todo. A\u00F1os de gimnasia r\u00EDtmica me ense\u00F1aron que la constancia es la diferencia entre bueno y memorable, los viajes me dieron perspectiva y enfrentarme a lo desconocido me ense\u00F1\u00F3 que la mejor forma de aprender algo es simplemente empezar a hacerlo. Ahora construyo interfaces que no solo funcionan: tienen que verse bien, sentirse bien y tener ese toque de personalidad que las hace \u00FAnicas.";

export default function AboutMe() {
  const { t } = useLanguage();
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="about-text">
        <h2
          className={`${playfair.className} about-title`}
          style={{
            fontSize: "3rem",
            fontWeight: 300,
            marginBottom: "0.5rem",
          }}
        >
          {t("MÁS SOBRE MÍ", "MORE ABOUT ME")}
        </h2>

        <div className="about-subtitle-wrapper">
          <span className="about-line" />
          <span className={`${hind.className} about-subtitle`}>{t("MI HISTORIA", "MY STORY")}</span>
          <span className="about-line" />
        </div>

        <p className={hind.className + " about-paragraph"}>{t(aboutText,
          "My name is Manuela, and I’m the kind of person who stays up until 3 a.m., because if something is worth doing, it’s worth doing properly. I first got into robotics when my mother put a leaflet in front of me and, true to my habit of signing up for everything, I said yes. That decision changed everything. Years of rhythmic gymnastics taught me that consistency is what separates the good from the memorable; travelling broadened my perspective, and stepping into the unknown taught me that the best way to learn something is simply to start doing it. I now build interfaces that do more than work: they have to look good, feel right and have that touch of personality that makes them unique."
        )}</p>
      </div>

      <div className="about-image-wrapper">
        <div ref={imageRef} className="about-image-inner">
          <Image
            src="/imagen_aboutme.jpeg"
            alt={t("Foto personal", "Personal photograph")}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
