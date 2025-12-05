"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Suspense } from "react";

function Sphere({ text }) {
  return (
    <group>
      {/* Esfera negra brillante */}
      <mesh>
        <sphereGeometry args={[1.1, 128, 128]} />
        <meshPhysicalMaterial
          color="#000000"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          reflectivity={0.5}
        />
      </mesh>
      
      {/* Texto en 3D */}
      {text && (
        <Text
          position={[0, 0, 1.15]}
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      )}
    </group>
  );
}

export default function SkillBall({ size = 120, text }) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: '8px'
    }}>
      <div
        style={{
          width: size,
          height: size,
          cursor: 'grab',
        }}
      >
        <Canvas 
          camera={{ position: [0, 0, 3.5], fov: 45 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-3, -3, 3]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <Sphere text={text} />
          </Suspense>
          
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={3}
            enablePan={false}
          />
        </Canvas>
      </div>
    </div>
  );
}