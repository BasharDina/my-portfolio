"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  OrbitControls,
  Sparkles,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

export default function HeroThree() {
  return (
<div className="relative h-[420px] w-full sm:h-[520px] overflow-hidden rounded-[32px]">
          {/* Free green glow (no box) */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-90"
        style={{
          background:
            "radial-gradient(circle, rgba(64,255,0,0.55) 0%, rgba(64,255,0,0.18) 35%, rgba(64,255,0,0.00) 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-75"
        style={{
          background:
            "radial-gradient(circle, rgba(64,255,0,0.35) 0%, rgba(64,255,0,0.00) 68%)",
        }}
      />

      {/* IMPORTANT: keep canvas transparent */}
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 4, 6]} intensity={1.2} />
        <pointLight position={[-6, -2, 3]} intensity={0.9} color="#40FF00" />

        <Environment preset="city" />

        <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
          <mesh>
            <sphereGeometry args={[1.35, 64, 64]} />
            <MeshTransmissionMaterial
              thickness={0.25}
              roughness={0.15}
              transmission={1}
              ior={1.15}
              chromaticAberration={0.03}
              distortion={0.2}
              distortionScale={0.25}
              temporalDistortion={0.15}
              color={new THREE.Color("#0b1220")}
            />
          </mesh>

          <mesh>
            <sphereGeometry args={[1.75, 64, 64]} />
            <meshStandardMaterial
              color="#40FF00"
              emissive="#40FF00"
              emissiveIntensity={0.25}
              transparent
              opacity={0.08}
              roughness={0.35}
              metalness={0.9}
            />
          </mesh>

          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.1, 0.08, 32, 180]} />
            <MeshDistortMaterial
              color="#40FF00"
              emissive="#40FF00"
              emissiveIntensity={1.0}
              roughness={0.35}
              metalness={0.6}
              distort={0.35}
              speed={1.5}
            />
          </mesh>
        </Float>

        <Sparkles
          count={70}
          size={2.2}
          speed={0.35}
          opacity={0.55}
          scale={8}
          color="#40FF00"
        />

        <EffectComposer>
          <Bloom intensity={1.05} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
          <Vignette eskil={false} offset={0.25} darkness={0.8} />
        </EffectComposer>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}