"use client";
import { useLayoutEffect, useRef } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { Hind, Cormorant_Garamond, Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "700"] });
const hind = Hind({ subsets: ["latin"], weight: "400" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: "500" });

export default function EducacionSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!section || !timeline || !svg || !path) return;
    const items = [...timeline.querySelectorAll(".educacion-item")];

    const updateRoute = () => {
      const sectionBounds = section.getBoundingClientRect();
      const timelineBounds = timeline.getBoundingClientRect();
      const left = timelineBounds.left - sectionBounds.left;
      const centerX = left + timelineBounds.width * 0.5;
      const offset = timelineBounds.top - sectionBounds.top;
      const height = sectionBounds.height;
      svg.setAttribute("viewBox", `0 0 ${sectionBounds.width} ${height}`);
      const matrix = svg.getScreenCTM();
      if (!matrix || items.length !== 3) return;
      const inverse = matrix.inverse();
      // Curvas continuas con tangente vertical en cada punto.
      const anchors = items.map((item) => {
        const dot = item.querySelector(".educacion-dot").getBoundingClientRect();
        const screenX = dot.left + dot.width / 2;
        const point = new DOMPoint(screenX, dot.top + dot.height / 2).matrixTransform(inverse);
        return { x: point.x, y: point.y };
      });
      const [first, second, third] = anchors;
      const heading = section.querySelector(".educacion-left").getBoundingClientRect();
      const stacked = heading.bottom <= timelineBounds.top;
      const entranceStart = stacked ? offset : 0;
      const entranceHandle = (first.y - entranceStart) * 0.65;
      const entrance = stacked
        ? `M ${left} 0 L ${left} ${offset} C ${left} ${offset + entranceHandle} ${first.x} ${first.y - entranceHandle} ${first.x} ${first.y}`
        : `M ${centerX} 0 C ${centerX} ${entranceHandle} ${first.x} ${first.y - entranceHandle} ${first.x} ${first.y}`;
      const firstHandle = (second.y - first.y) * 0.65;
      const secondHandle = (third.y - second.y) * 0.65;
      const exitHandle = (height - third.y) * 0.65;
      path.setAttribute("d", [
        entrance,
        `C ${first.x} ${first.y + firstHandle} ${second.x} ${second.y - firstHandle} ${second.x} ${second.y}`,
        `C ${second.x} ${second.y + secondHandle} ${third.x} ${third.y - secondHandle} ${third.x} ${third.y}`,
        `C ${third.x} ${third.y + exitHandle} ${centerX} ${height - exitHandle} ${centerX} ${height}`,
      ].join(" "));
    };

    updateRoute();
    const observer = new ResizeObserver(updateRoute);
    observer.observe(section);
    observer.observe(timeline);
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="educacion-nueva-section" ref={sectionRef}>
      <svg ref={svgRef} className="educacion-snake"
        preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path ref={pathRef} fill="none" stroke="#8B2F2F" strokeWidth="2"
          strokeDasharray="14 10" strokeLinecap="round"
          vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="educacion-container">
        <div className="educacion-left">
          <h2 className={`${playfair.className} about-title`}>
            {t("Mi formación académica", "My academic background")}
          </h2>
          <div className="educacion-subtitle-wrapper">
            <span className="educacion-line" />
            <span className={`educacion-subtitle ${hind.className}`}>{t("EDUCACIÓN", "EDUCATION")}</span>
            <span className="educacion-line" />
          </div>
        </div>

        <div className="educacion-timeline" ref={timelineRef}>
          <div className="educacion-item educacion-item-first">
            <div className="educacion-dot" aria-hidden="true" />
            <h3 className={`${cormorant.className} educacion-year`}>2022–2024</h3>
            <p className={`${hind.className} educacion-text`}>
              {t("Bachillerato general", "General Baccalaureate")}<br />{t("Instituto IES Juan de Lucena", "IES Juan de Lucena Secondary School")}
            </p>
          </div>

          <div className="educacion-item educacion-item-middle">
            <div className="educacion-dot" aria-hidden="true" />
            <h3 className={`${cormorant.className} educacion-year`}>2024–2026</h3>
            <p className={`${hind.className} educacion-text`}>
              {t("Grado Superior DAW", "Higher Vocational Diploma in Web Application Development (DAW)")}<br />IFP
            </p>
          </div>

          <div className="educacion-item educacion-item-last">
            <div className="educacion-dot" aria-hidden="true" />
            <h3 className={`${cormorant.className} educacion-year`}>{t("Actualidad–2030", "Present–2030")}</h3>
            <p className={`${hind.className} educacion-text`}>
              {t("Comunicación interactiva", "Interactive Communication")}<br />{t("Universidad Autonoma de Barcelona (UAB)", "Autonomous University of Barcelona (UAB)")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
