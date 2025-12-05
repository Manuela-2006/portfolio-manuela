"use client";
import Image from "next/image";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300"],
});

export default function Hero() {
  return (
    <section className="hero-section-main">

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
        }}
      />

      {/* Contenedor central */}
      <div className="hero-content-wrapper">
        
        {/* MANUELA */}
        <h1 className={`${oswald.className} hero-main-title`}>
          MANUELA
        </h1>

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
              <span className="hero-arrow-icon">↓</span>
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
