"use client";
import Image from "next/image";
import { useRef, type MouseEvent } from "react";
import { Oswald } from "next/font/google";
import LanguageSwitcher from "./LanguageSwitcher";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300"],
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const maxX = 10;
    const maxY = 8;

    const moveX = (x - 0.5) * maxX * -1;
    const moveY = (y - 0.5) * maxY * -1;

    section.style.setProperty("--hero-parallax-x", `${moveX.toFixed(2)}px`);
    section.style.setProperty("--hero-parallax-y", `${moveY.toFixed(2)}px`);
  };

  const handleMouseLeave = () => {
    const section = sectionRef.current;
    if (!section) return;

    section.style.setProperty("--hero-parallax-x", "0px");
    section.style.setProperty("--hero-parallax-y", "0px");
  };

  return (
    <section
      ref={sectionRef}
      className="hero-section-main"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <LanguageSwitcher />
      {/* Fondo */}
      <Image
        src="/fondo.jpeg"
        alt="Background"
        fill
        priority
        style={{
          objectFit: "cover",
          objectPosition: "center",
          filter: "brightness(0.60)",
          transform:
            "translate3d(var(--hero-parallax-x), var(--hero-parallax-y), 0) scale(1.06)",
          transition: "transform 220ms ease-out",
          willChange: "transform",
        }}
      />

      {/* Contenedor central */}
      <div className="hero-content-wrapper">
        {/* MANUELA */}
        <h1 className={`${oswald.className} hero-main-title`}>MANUELA</h1>

        {/* WEB DESIGNER */}
        <div className="hero-subtitle-wrapper">
          <span className="hero-line-decorator" />
          <span className="hero-subtitle-text">WEB DESIGNER</span>
          <span className="hero-line-decorator" />
        </div>

        {/* Círculo + flecha */}
        <div className="hero-arrow-wrapper">
          <a href="#about" style={{ textDecoration: "none" }}>
            <div className="hero-circle-arrow">
              <Image
                src="/arrow.svg"
                alt="Arrow down"
                width={20}
                height={20}
                className="hero-arrow-img"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
