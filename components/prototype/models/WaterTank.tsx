"use client";

import { useSimulation } from "../hooks/useSimulation";

export function WaterTank() {
  const water = useSimulation((s) => s.water);
  const waterHeight = 0.5 * (water / 100);

  return (
    <group position={[1.35, 2.8, -0.45]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.25, 0.6, 16]} />
        <meshLambertMaterial color="#2A7AB5" transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, -0.3 + waterHeight / 2, 0]}>
        <cylinderGeometry args={[0.22, 0.22, waterHeight, 16]} />
        <meshLambertMaterial color="#4A9BB5" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.04, 16]} />
        <meshLambertMaterial color="#1E5F8A" />
      </mesh>
    </group>
  );
}
