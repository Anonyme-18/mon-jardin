"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { TANK, COLORS } from "@/lib/terrainData";
import { useTerrainSimulation } from "../hooks/useTerrainSimulation";

export function CentralIrrigationTank() {
  const waterLevel = useTerrainSimulation((s) => s.waterLevel);
  const waterHeight = (TANK.height - 0.4) * (waterLevel / 100);

  const ringGeometry = useMemo(() => {
    const geo = new THREE.CylinderGeometry(
      TANK.radius + 0.05,
      TANK.radius + 0.05,
      TANK.height,
      32,
      1,
      true
    );
    return geo;
  }, []);

  return (
    <group position={TANK.position}>
      <mesh position={[0, TANK.height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[TANK.radius, TANK.radius, TANK.height, 32]} />
        <meshLambertMaterial color={COLORS.tank} />
      </mesh>

      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 0.5 + i * 0.42, 0]}
          geometry={ringGeometry}
        >
          <meshLambertMaterial
            color={i % 2 === 0 ? COLORS.tank : COLORS.tankLight}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      <mesh position={[0, 0.15 + waterHeight / 2, 0]}>
        <cylinderGeometry args={[TANK.radius - 0.15, TANK.radius - 0.15, waterHeight, 32]} />
        <meshLambertMaterial color="#4A9BB5" transparent opacity={0.85} />
      </mesh>

      <mesh position={[0, TANK.height + 0.15, 0]} castShadow>
        <cylinderGeometry args={[TANK.radius + 0.1, TANK.radius + 0.1, 0.25, 32]} />
        <meshLambertMaterial color="#145A32" />
      </mesh>

      <mesh position={[0, TANK.height + 0.35, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.15, 16]} />
        <meshLambertMaterial color="#0D3B21" />
      </mesh>

      <mesh position={[0, 0.05, 0]} receiveShadow>
        <cylinderGeometry args={[TANK.radius + 1.2, TANK.radius + 1.2, 0.12, 32]} />
        <meshLambertMaterial color="#9E9E9E" />
      </mesh>
    </group>
  );
}
