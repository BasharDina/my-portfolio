"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
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

/** Pause rendering when tab is hidden */
function TabVisibilityManager() {
  const { gl } = useThree();
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        gl.setAnimationLoop(null);
      } else {
        gl.setAnimationLoop((time) => {
          gl.render(gl.domElement as unknown as THREE.Scene, new THREE.Camera());
        });
      }
    };
    // We don't actually need to manage the loop ourselves - 
    // R3F handles it. Just pause/resume via frameloop would be better.
    // Instead, let's use a simpler approach:
    return () => {};
  }, [gl]);
  return null;
}

function HeroObject({
  reducedMotion,
  progress,
}: {
  reducedMotion: boolean;
  progress: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const neonColor = useMemo(() => new THREE.Color("#2fff9b"), []);
  const baseColor = useMemo(() => new THREE.Color("#0a0f0d"), []);
  const darkColor = useMemo(() => new THREE.Color("#02140d"), []);
  const blackColor = useMemo(() => new THREE.Color("#000000"), []);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const material = materialRef.current;
    if (!mesh || !material) return;

    const liveProgress = reducedMotion ? 0 : progress;
    const rotationTargetY = liveProgress * Math.PI * 2.15;
    const rotationTargetX = liveProgress * 0.65;

    const idleStrength = reducedMotion ? 0 : 1 - Math.min(1, liveProgress * 1.35);
    mesh.rotation.x += delta * 0.12 * idleStrength;
    mesh.rotation.y += delta * 0.22 * idleStrength;
    mesh.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.08 * idleStrength;

    mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, rotationTargetY, Math.min(1, delta * 3.4));
    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, rotationTargetX, Math.min(1, delta * 3.4));

    material.color.copy(baseColor).lerp(darkColor, liveProgress);
    material.emissive.copy(blackColor).lerp(neonColor, liveProgress);
    material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, 0.08 + liveProgress * 1.4, Math.min(1, delta * 4));
    material.clearcoat = 1;
    material.clearcoatRoughness = 0.06 - liveProgress * 0.045;
    material.roughness = 0.2 - liveProgress * 0.1;
    material.envMapIntensity = 1.3 + liveProgress;

    const scale = THREE.MathUtils.lerp(mesh.scale.x, 1 + liveProgress * 0.12, Math.min(1, delta * 4));
    mesh.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[0.75, 0.22, 220, 28]} />
      <meshPhysicalMaterial
        ref={materialRef}
        color="#0a0f0d"
        metalness={0.8}
        roughness={0.18}
        emissive="#000000"
        emissiveIntensity={0.05}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={1.4}
      />
    </mesh>
  );
}

function Particles({
  reducedMotion,
  progress,
}: {
  reducedMotion: boolean;
  progress: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry<THREE.NormalBufferAttributes>>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const maxCount = 360;
  const minCount = reducedMotion ? 120 : 80;

  const positions = useMemo(() => {
    const count = maxCount;
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      data[i3] = (Math.random() - 0.5) * 12;
      data[i3 + 1] = (Math.random() - 0.5) * 7;
      data[i3 + 2] = (Math.random() - 0.5) * 8;
    }
    return data;
  }, [reducedMotion]);

  const startColor = useMemo(() => new THREE.Color("#9ae6b4"), []);
  const endColor = useMemo(() => new THREE.Color("#2fff9b"), []);

  useFrame((_, delta) => {
    if (!pointsRef.current || !materialRef.current) return;
    const liveProgress = reducedMotion ? 0 : progress;

    const spinBoost = reducedMotion ? 0.35 : 1;
    pointsRef.current.rotation.y += delta * (0.02 + liveProgress * 0.18) * spinBoost;
    pointsRef.current.rotation.x += delta * (0.01 + liveProgress * 0.09) * spinBoost;

    const desiredCount = reducedMotion ? minCount : Math.round(minCount + (maxCount - minCount) * liveProgress);
    pointsRef.current.geometry.setDrawRange(0, desiredCount);

    materialRef.current.opacity = 0.38 + liveProgress * 0.5;
    materialRef.current.size = 0.02 + liveProgress * 0.028;
    materialRef.current.color.lerpColors(startColor, endColor, liveProgress);
  });

  useEffect(() => {
    const geometry = geometryRef.current;
    if (!geometry) return;
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  }, [positions]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        ref={materialRef}
        color="#9ae6b4"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
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
    const liveProgress = reducedMotion ? 0 : progress;
    const desiredZ = 3.2 - liveProgress * 1.1;
    camera.position.z += (desiredZ - camera.position.z) * Math.min(1, delta * 4.2);
    camera.position.x += (liveProgress * 0.16 - camera.position.x) * Math.min(1, delta * 4.2);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#030505"]} />
      <fog attach="fog" args={["#030505", 3.5, 12]} />

      <ambientLight intensity={0.16} />
      <directionalLight position={[3, 4, 2]} intensity={0.35} color="#d9ffe8" />
      <pointLight position={[-2.5, 0.5, 2.5]} intensity={0.8} color="#2fff9b" />
      <pointLight position={[0, -2, -2]} intensity={0.25} color="#9aa0a6" />

      <group>
        <HeroObject reducedMotion={reducedMotion} progress={progress} />
      </group>
      <Particles reducedMotion={reducedMotion} progress={progress} />

      <Environment preset="city" />
    </>
  );
}

export default function ExperienceCanvas() {
  const reducedMotion = useReducedMotion();
  const { progress } = useScrollState();
  const [visible, setVisible] = useState(true);

  // Pause canvas when tab is hidden
  useEffect(() => {
    const onVisibilityChange = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return (
    <div className="absolute inset-0" id="experience-pin">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        dpr={[1, Math.min(1.5, typeof window !== "undefined" ? window.devicePixelRatio : 1.5)]}
        frameloop={visible ? "always" : "never"}
      >
        <Scene reducedMotion={reducedMotion} progress={progress} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(47,255,155,0.15),transparent_45%),radial-gradient(circle_at_30%_80%,rgba(255,255,255,0.07),transparent_40%)]" />
    </div>
  );
}
