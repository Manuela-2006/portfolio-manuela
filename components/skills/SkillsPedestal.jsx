"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import { Suspense } from "react";
import { Hind, Cormorant_Garamond } from "next/font/google";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"], 
});

const hind = Hind({ subsets: ["latin"], weight: "400" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: "500" });

/* ------------------------------------------------------
   🟤 Skill Ball
------------------------------------------------------ */
function SkillBall({ position, text }) {
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.5, 128, 128]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.95}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0}
          reflectivity={1}
          envMapIntensity={1.5}
        />
      </mesh>

      <pointLight position={[0, 0, 0]} intensity={0.5} distance={2} color="#ffffff" />

      {text && (
        <Billboard follow>
          <Text
            position={[0, 0, 0.52]}
            fontSize={0.25}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#000000"
          >
            {text}
          </Text>
        </Billboard>
      )}
    </group>
  );
}

/* ------------------------------------------------------
   🟤 Pedestal
------------------------------------------------------ */
function Pedestal() {
  return (
    <group>
      <mesh position={[0, -2.5, 0]}>
        <cylinderGeometry args={[1.1, 1.3, 0.35, 32]} />
        <meshStandardMaterial color="#8B2F2F" metalness={0.5} roughness={0.3} />
      </mesh>

      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.7, 0.9, 3.5, 32]} />
        <meshStandardMaterial color="#8B2F2F" metalness={0.4} roughness={0.4} />
      </mesh>

      <group position={[0, 0.5, 0]}>
        <mesh>
          <cylinderGeometry args={[1.2, 1.2, 0.18, 32]} />
          <meshStandardMaterial color="#8B2F2F" metalness={0.6} roughness={0.2} />
        </mesh>
      </group>

      <group position={[0, 2.5, 0]}>
        <mesh>
          <cylinderGeometry args={[1.2, 1.2, 0.18, 32]} />
          <meshStandardMaterial color="#8B2F2F" metalness={0.6} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

/* ------------------------------------------------------
   🟤 Orbiting Skills
------------------------------------------------------ */
function SkillsPedestal() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.25;
  });

  const lowerBalls = [
    { pos: [2.5, 0.5, 0], text: "HTML" },
    { pos: [0, 0.5, 2.5], text: "CSS" },
    { pos: [-2.5, 0.5, 0], text: "JS" },
    { pos: [0, 0.5, -2.5], text: "React" },
  ];

  const middleBalls = [
    { pos: [2, 1.5, 2], text: "Node" },
    { pos: [-2, 1.5, 2], text: "SQL" },
    { pos: [2, 1.5, -2], text: "Git" },
    { pos: [-2, 1.5, -2], text: "PHP" },
  ];

  const topBall = { pos: [0, 3.2, 0], text: "UX/UI" };

  return (
    <group scale={0.8}>
      <Pedestal />

      <group ref={groupRef}>
        {lowerBalls.map((ball, i) => (
          <SkillBall key={`lower-${i}`} position={ball.pos} text={ball.text} />
        ))}

        {middleBalls.map((ball, i) => (
          <SkillBall key={`middle-${i}`} position={ball.pos} text={ball.text} />
        ))}

        <SkillBall position={topBall.pos} text={topBall.text} />
      </group>
    </group>
  );
}

/* ------------------------------------------------------
   🟣 FINAL SECTION — CON FONDO F5F5F5
------------------------------------------------------ */
export default function SkillsPedestalScene() {
  return (
    <section
      className="skills-pedestal-section"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "130px 40px",
        flexWrap: "wrap",
        backgroundColor: "#F5F5F5",
        gap: "100px", 
      }}
    >
      {/* Canvas IZQUIERDA */}
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "600px",
          margin: "0 auto",
          transform: "translateX(80px)",
        }}
      >
        <Canvas
          camera={{ position: [0, 2, 8], fov: 45 }}
          gl={{ antialias: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <directionalLight position={[-5, 5, -5]} intensity={1.5} />
          <directionalLight position={[0, 5, 5]} intensity={1.5} />
          <directionalLight position={[0, 5, -5]} intensity={1.5} />

          <Suspense fallback={null}>
            <SkillsPedestal />
          </Suspense>
        </Canvas>
      </div>

      {/* TEXTO DERECHA */}
      <div
        className="about-text"
        style={{ textAlign: "center", width: "100%", maxWidth: "600px", margin: "0 auto" }}
      >
        <h2 className={`${lato.className} about-title`}>
  Mis habilidades
</h2>

        <div
  className="about-subtitle-wrapper"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",   // 👈 ESTA LÍNEA ASEGURA EL CENTRADO
    gap: "16px",
    marginBottom: "1.5rem",
  }}
>
  <span className="about-line"></span>

  <span className={`about-subtitle ${hind.className}`}>
    TECNOLOGÍAS
  </span>

  <span className="about-line"></span>
</div>

        <p className={hind.className} style={{ fontSize: "1rem", lineHeight: "1.7" }}>
          Trabajo con tecnologías como HTML, CSS, JavaScript, React y WordPress para crear interfaces sólidas, funcionales y visualmente coherentes, integrando además prácticas de SEO y criterios de optimización. 
          También tengo experiencia en el desarrollo backend y en el manejo de bases de datos, lo que me permite comprender y trabajar con proyectos de manera más completa. 
          Destaco por mi capacidad de aprendizaje ágil y por una actitud proactiva ante cualquier nueva herramienta o metodología, manteniendo siempre el interés y la disposición para seguir perfeccionando mis habilidades.
        </p>
      </div>
    </section>
  );
}
