"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useTerrainSimulation } from "../hooks/useTerrainSimulation";

const GH = {
  center: [28, 0, 28] as [number, number, number],
  width: 32,
  depth: 24,
  height: 4.2,
};

export function Greenhouse() {
  const showGreenhouse = useTerrainSimulation((s) => s.showGreenhouse);
  const groupRef = useRef<THREE.Group>(null);
  const scaleRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = showGreenhouse ? 1 : 0;
    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, target, delta * 4);
    const s = Math.max(0.001, scaleRef.current);
    groupRef.current.scale.set(s, s, s);
    groupRef.current.visible = scaleRef.current > 0.02;
  });

  const { center, width, depth, height } = GH;
  const hw = width / 2;
  const hd = depth / 2;

  const posts: [number, number, number][] = [
    [-hw, height / 2, -hd],
    [hw, height / 2, -hd],
    [-hw, height / 2, hd],
    [hw, height / 2, hd],
    [-hw, height / 2, 0],
    [hw, height / 2, 0],
  ];

  return (
    <group ref={groupRef} position={center} visible={false}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[width - 0.5, depth - 0.5]} />
        <meshLambertMaterial color="#3D5C35" />
      </mesh>

      {posts.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, height, 6]} />
          <meshLambertMaterial color="#8B7355" />
        </mesh>
      ))}

      {[
        [0, height / 2, -hd, width, height, 0.06],
        [0, height / 2, hd, width, height, 0.06],
        [-hw, height / 2, 0, 0.06, height, depth],
        [hw, height / 2, 0, 0.06, height, depth],
      ].map(([x, y, z, w, h, d], i) => (
        <mesh key={`wall-${i}`} position={[x, y, z]}>
          <boxGeometry args={[w, h, d]} />
          <meshLambertMaterial color="#B8E4F0" transparent opacity={0.32} />
        </mesh>
      ))}

      <mesh position={[0, height + 0.3, 0]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[width + 0.3, 0.07, depth + 0.3]} />
        <meshLambertMaterial color="#D4EEF5" transparent opacity={0.45} />
      </mesh>

      <mesh position={[0, height * 0.35, hd + 0.05]}>
        <boxGeometry args={[2.2, height * 0.65, 0.06]} />
        <meshLambertMaterial color="#6B5030" />
      </mesh>

      {showGreenhouse && (
        <Html position={[0, height + 1.5, 0]} center distanceFactor={55}>
          <div className="rounded-lg bg-forest/90 px-3 py-1 font-mono text-xs text-white shadow">
            Serre — 768 m²
          </div>
        </Html>
      )}
    </group>
  );
}
