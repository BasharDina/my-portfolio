"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useScrollState } from "./scroll-state";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function ExperienceRings({
  reducedMotion,
  progress,
}: {
  reducedMotion: boolean;
  progress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const green = useMemo(() => new THREE.Color("#40FF00"), []);
  const mint = useMemo(() => new THREE.Color("#8BFFB2"), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = reducedMotion ? 0 : progress;

    const group = groupRef.current;
    const ring1 = ring1Ref.current;
    const ring2 = ring2Ref.current;
    const ring3 = ring3Ref.current;
    const core = coreRef.current;

    if (!group || !ring1 || !ring2 || !ring3 || !core) return;

    group.rotation.y += delta * (0.12 + p * 0.16);
    group.rotation.x = Math.sin(t * 0.28) * 0.06;
    group.position.x = THREE.MathUtils.lerp(
      group.position.x,
      1.15 + p * 0.25,
      Math.min(1, delta * 2.2)
    );
    group.position.y = Math.sin(t * 0.65) * 0.12;

    ring1.rotation.x += delta * (0.35 + p * 0.08);
    ring1.rotation.y += delta * 0.15;

    ring2.rotation.y -= delta * (0.26 + p * 0.06);
    ring2.rotation.z += delta * 0.14;

    ring3.rotation.x -= delta * 0.2;
    ring3.rotation.z -= delta * (0.18 + p * 0.05);

    core.scale.setScalar(1 + Math.sin(t * 1.1) * 0.025 + p * 0.04);
  });

  return (
    <group ref={groupRef} position={[1.15, 0, 0]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.05, 2]} />
        <meshStandardMaterial
          color="#0c1410"
          emissive={green}
          emissiveIntensity={0.28}
          metalness={0.88}
          roughness={0.2}
        />
      </mesh>

      <mesh ref={ring1Ref} rotation={[0.9, 0.25, 0]}>
        <torusGeometry args={[1.95, 0.06, 24, 220]} />
        <meshStandardMaterial
          color={green}
          emissive={green}
          emissiveIntensity={0.58}
          metalness={1}
          roughness={0.15}
        />
      </mesh>

      <mesh ref={ring2Ref} rotation={[1.7, 0.8, 1.15]}>
        <torusGeometry args={[2.45, 0.07, 24, 220]} />
        <meshStandardMaterial
          color={mint}
          emissive={mint}
          emissiveIntensity={0.32}
          metalness={0.96}
          roughness={0.18}
        />
      </mesh>

      <mesh ref={ring3Ref} rotation={[0.45, 1.15, 1.9]}>
        <torusGeometry args={[2.9, 0.04, 24, 220]} />
        <meshStandardMaterial
          color="#eafff0"
          emissive="#40FF00"
          emissiveIntensity={0.12}
          metalness={0.95}
          roughness={0.28}
          transparent
          opacity={0.82}
        />
      </mesh>

      <Sparkles
        count={120}
        scale={[9, 6, 9]}
        size={2.6}
        speed={0.28}
        opacity={0.4}
        color="#7dff9f"
      />
    </group>
  );
}

function Scene({
  reducedMotion,
  progress,
}: {
  reducedMotion: boolean;
  progress: number;
}) {
  useFrame(({ camera }, delta) => {
    const p = reducedMotion ? 0 : progress;

    const targetZ = 6 - p * 0.45;
    const targetX = 0.15;
    const targetY = 0;

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, Math.min(1, delta * 2));
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, Math.min(1, delta * 2));
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, Math.min(1, delta * 2));
    camera.lookAt(1.1, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#020403"]} />
      <ambientLight intensity={1.05} />
      <directionalLight position={[3, 4, 4]} intensity={1.6} color="#ffffff" />
      <pointLight position={[-3, 1, 3]} intensity={1.5} color="#40FF00" />
      <pointLight position={[2, -1, 2]} intensity={1.0} color="#dffff0" />
      <ExperienceRings reducedMotion={reducedMotion} progress={progress} />
    </>
  );
}

export default function ExperienceCanvas() {
  const reducedMotion = useReducedMotion();
  const { progress } = useScrollState();

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0.15, 0, 6], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Scene reducedMotion={reducedMotion} progress={progress} />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(64,255,0,0.14),transparent_32%),radial-gradient(circle_at_28%_76%,rgba(255,255,255,0.04),transparent_30%)]" />
    </div>
  );
}