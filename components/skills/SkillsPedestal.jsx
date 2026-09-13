"use client";

import { useRef, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { Canvas, useFrame } from "@react-three/fiber";
import { Hind, Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const hind = Hind({
  subsets: ["latin"],
  weight: "400",
});

const categories = [
  {
    label: "UX / UI DESIGN",
    skills: ["Figma", "Adobe XD", "Prototipado", "Wireframing"],
    indices: [0, 1],
  },
  {
    label: "FRONTEND",
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "GSAP"],
    indices: [2, 3, 4],
  },
  {
    label: "BACKEND",
    skills: ["Node.js", "MySQL", "REST APIs"],
    indices: [5, 6],
  },
  {
    label: "3D & INTERACTIVE",
    skills: ["Three.js", "WebGL", "LLMs / IA"],
    indices: [7, 8],
  },
  {
    label: "TOOLS & OTHERS",
    skills: ["Git", "GitHub", "WordPress", "shadcn/ui"],
    indices: [9, 10],
  },
];

const sphereData = [
  { label: "UX/UI", ring: 0, angle: Math.PI * 0.1 },
  { label: "Figma", ring: 0, angle: Math.PI * 1.1 },
  { label: "React", ring: 1, angle: Math.PI * 0.3 },
  { label: "Next.js", ring: 1, angle: Math.PI * 1.0 },
  { label: "TypeScript", ring: 1, angle: Math.PI * 1.7 },
  { label: "Node.js", ring: 2, angle: Math.PI * 0.5 },
  { label: "MySQL", ring: 2, angle: Math.PI * 1.4 },
  { label: "Three.js", ring: 0, angle: Math.PI * 0.7 },
  { label: "WebGL", ring: 1, angle: Math.PI * 1.3 },
  { label: "Git", ring: 2, angle: Math.PI * 0.9 },
  { label: "WordPress", ring: 2, angle: Math.PI * 1.8 },
];

const RING_RADII = [1.05, 1.48, 1.9];
const RING_TILTS = [Math.PI / 5, Math.PI / 3.5, Math.PI / 6];
const WINE = "#8B2F2F";

function OrbitRing({ radius, tilt, active }) {
  return (
    <mesh rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, active ? 0.012 : 0.007, 8, 120]} />
      <meshStandardMaterial
        color={WINE}
        transparent
        opacity={active ? 0.7 : 0.25}
        metalness={0.6}
        roughness={0.3}
      />
    </mesh>
  );
}

function SkillSphere({ ring, angle, active, speed = 0.003 }) {
  const ref = useRef(null);
  const angleRef = useRef(angle);
  const radius = RING_RADII[ring];
  const tilt = RING_TILTS[ring];

  useFrame(() => {
    if (!ref.current) return;

    angleRef.current += speed;
    const a = angleRef.current;
    ref.current.position.x = radius * Math.cos(a);
    ref.current.position.y = radius * Math.sin(a) * Math.cos(tilt);
    ref.current.position.z = radius * Math.sin(a) * Math.sin(tilt);
  });

  const size = ring === 0 ? 0.18 : ring === 1 ? 0.15 : 0.13;

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={active ? WINE : "#0a0a0a"}
        metalness={active ? 0.5 : 0.9}
        roughness={active ? 0.3 : 0.1}
        emissive={active ? WINE : "#000000"}
        emissiveIntensity={active ? 0.4 : 0}
      />
    </mesh>
  );
}

function Scene({ activeCategory }) {
  const groupRef = useRef(null);
  const activeIndices = activeCategory !== null ? categories[activeCategory].indices : [];
  const activeRings = new Set(activeIndices.map((index) => sphereData[index].ring));

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += 0.003;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.06;
  });

  return (
    <group ref={groupRef} scale={0.86}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-4, -2, 3]} intensity={0.4} color={WINE} />
      <pointLight position={[0, 2, 0]} intensity={0.3} color="#ffffff" />

      {RING_RADII.map((radius, index) => (
        <OrbitRing
          key={radius}
          radius={radius}
          tilt={RING_TILTS[index]}
          active={activeRings.has(index)}
        />
      ))}

      {sphereData.map((sphere, index) => (
        <SkillSphere
          key={sphere.label}
          {...sphere}
          active={activeIndices.includes(index)}
          speed={0.002 + index * 0.0003}
        />
      ))}

    </group>
  );
}

export default function SkillsPedestalScene() {
  const { t } = useLanguage();
  const [hoverCategory, setHoverCategory] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const activeCategory = hoverCategory ?? openCategory;

  return (
    <section className="skills-orbit-section">
      <div className="skills-orbit-canvas" aria-hidden="true">
        <Canvas camera={{ position: [0, 0.6, 5.8], fov: 42 }}>
          <Scene activeCategory={activeCategory} />
        </Canvas>
      </div>

      <div className="skills-orbit-content">
        <h2 className={`${playfair.className} about-title skills-orbit-heading`}>
          {t("MIS HABILIDADES", "MY SKILLS")}
        </h2>
        <div className="about-subtitle-wrapper skills-orbit-subtitle">
          <span className="about-line" />
          <span className={`${hind.className} about-subtitle`}>{t("SIEMPRE APRENDIENDO", "ALWAYS LEARNING")}</span>
          <span className="about-line" />
        </div>
        <p className={`${hind.className} about-paragraph skills-orbit-intro`}>
          {t("Un conjunto de herramientas que me permiten transformar ideas en experiencias digitales unicas.",
            "A set of tools that enables me to turn ideas into distinctive digital experiences.")}
        </p>

        <div className="skills-orbit-accordion">
          {categories.map((category, index) => (
            <div key={category.label} className="skills-orbit-category">
              <button
                type="button"
                className="skills-orbit-button"
                onMouseEnter={() => setHoverCategory(index)}
                onMouseLeave={() => setHoverCategory(null)}
                onFocus={() => setHoverCategory(index)}
                onBlur={() => setHoverCategory(null)}
                onClick={() => setOpenCategory(openCategory === index ? null : index)}
                aria-expanded={openCategory === index}
              >
                <span className={`${hind.className} skills-orbit-label`}>
                  <span className="skills-orbit-dot" />
                  <span>{category.label}</span>
                </span>
                <span className="skills-orbit-toggle">{openCategory === index ? "-" : "+"}</span>
              </button>

              {openCategory === index && (
                <div className="skills-orbit-tags">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skills-orbit-tag">
                      {skill === "Prototipado" ? t(skill, "Prototyping") : skill === "LLMs / IA" ? t(skill, "LLMs / AI") : skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="skills-orbit-category" />
        </div>

      </div>
    </section>
  );
}
