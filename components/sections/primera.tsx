"use client";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { Oswald } from "next/font/google";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import SettingsIsland from "./SettingsIsland";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300"],
});

export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const media = gsap.matchMedia();
    let intro: gsap.core.Timeline | undefined;
    media.add({ reduced: "(prefers-reduced-motion: reduce)", animated: "(prefers-reduced-motion: no-preference)" }, (context) => {
      const title = section.querySelector<HTMLElement>(".hero-main-title")!;
      const glow = section.querySelector(".hero-glow");
      const avatar = section.querySelector(".hero-avatar-wrapper");
      const foreground = [...section.querySelectorAll(".hero-subtitle-wrapper, .hero-arrow-wrapper"), controlsRef.current!];
      const elements = [title, glow, avatar, ...foreground];

      // Returning to an anchor or restoring scroll should never hide controls.
      if (context.conditions?.reduced || window.scrollY > section.clientHeight / 2 || window.location.hash) {
        gsap.set(elements, { autoAlpha: 1 });
        return;
      }

      const bounds = title.getBoundingClientRect();
      const sectionBounds = section.getBoundingClientRect();
      const centerOffset = sectionBounds.top + sectionBounds.height / 2 - (bounds.top + bounds.height / 2);
      const scaleX = Number(gsap.getProperty(title, "scaleX"));
      const initialScale = Math.min(1.35, section.clientWidth * 0.94 / bounds.width);
      intro = gsap.timeline();
      intro
        .fromTo(title,
          { autoAlpha: 0, y: centerOffset, scaleX: scaleX * initialScale, scaleY: initialScale, filter: "blur(14px)" },
          { autoAlpha: 1, filter: "blur(0px)", duration: 0.75, ease: "power2.out" })
        .to(title, { y: 0, scaleX, scaleY: 1, duration: 1.65, ease: "power3.inOut" }, 1.35)
        .to(glow, { autoAlpha: 1, duration: 1.6, ease: "power2.out" }, 2.4)
        .fromTo(avatar,
          { autoAlpha: 0, y: 60, filter: "blur(10px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.3, ease: "power2.out" }, 3)
        .to(foreground, { autoAlpha: 1, duration: 0.9, ease: "power2.out" }, 4)
        .set([title, avatar], { clearProps: "transform,filter" });
    }, section);
    const finishIntro = () => intro?.progress(1);
    window.addEventListener("resize", finishIntro);
    return () => {
      window.removeEventListener("resize", finishIntro);
      media.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero-section-main" aria-labelledby="hero-name" style={{ background: "#000" }}>
        <div className="hero-glow" aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, visibility: "hidden", opacity: 0, background: "radial-gradient(ellipse at 50% 46%, #300710 0%, #150307 35%, #030303 70%)" }} />
        <h1 id="hero-name" className={`${oswald.className} hero-main-title`} style={{ visibility: "hidden", opacity: 0 }}>MANUELA</h1>
        <div className="hero-avatar-wrapper" style={{ visibility: "hidden", opacity: 0 }}>
          <Image
            src="/fondo del hero.png"
            alt={t("Avatar de Manuela con sudadera burdeos", "Manuela's avatar wearing a burgundy hoodie")}
            fill
            priority
            sizes="(max-width: 767px) 104vh, 120vh"
            className="hero-avatar"
          />
        </div>
        <div className="hero-subtitle-wrapper" style={{ visibility: "hidden", opacity: 0 }}>
          <span className="hero-line-decorator" aria-hidden="true" />
          <span className="hero-subtitle-text">WEB DESIGNER</span>
          <span className="hero-line-decorator" aria-hidden="true" />
        </div>

        <a
          href="#about"
          className="hero-arrow-wrapper"
          style={{ visibility: "hidden", opacity: 0 }}
          aria-label={t("Descubrir más sobre mí", "Discover more about me")}
        >
          <span className="hero-circle-arrow" aria-hidden="true">
            <Image
              src="/arrow.svg"
              alt=""
              width={28}
              height={28}
              className="hero-arrow-img"
            />
          </span>
        </a>
        <div ref={controlsRef} className="hero-settings-controls" style={{ visibility: "hidden", opacity: 0 }}>
          <SettingsIsland />
        </div>
    </section>
  );
}
