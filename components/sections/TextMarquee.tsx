"use client";

import useEmblaCarousel from "embla-carousel-react";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "300",
});

// 🔥 Texto acortado
const TEXT = "BIENVENIDO A MI PORTFOLIO";

export default function TextMarquee() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  return (
    <div ref={emblaRef} className="text-marquee-container">
      <div className="text-marquee-content">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={`text-marquee-item ${oswald.className}`}>
            {TEXT}
            <span className="text-marquee-line" />
          </div>
        ))}
      </div>

      <style jsx>{`
        .text-marquee-container {
          width: 100%;
          margin: 0 auto;
          overflow: hidden;
          padding: 35px 0;
          background: var(--bg-primary);
          border-top: 2px solid var(--text-primary);
          border-bottom: 2px solid var(--text-primary);
          position: relative;
        }

        .text-marquee-content {
          display: flex;
          gap: 80px;
          white-space: nowrap;
          animation: marquee 18s linear infinite;
          align-items: center;
        }

        .text-marquee-item {
          display: flex;
          align-items: center;
          gap: 40px;

          /* ✔ Mismo estilo que WEB DESIGNER */
          font-size: 22px;
          font-weight: 300;
          letter-spacing: 0.15em;
          text-transform: uppercase;

          color: var(--text-primary);
        }

        .text-marquee-line {
          width: 60px;
          height: 1px;
          background-color: var(--accent-primary);
          opacity: 0.7;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
