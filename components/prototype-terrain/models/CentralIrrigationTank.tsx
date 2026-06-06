"use client";

import { useMemo } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { TANK, COLORS } from "@/lib/terrainData";
import { useTerrainSimulation } from "../hooks/useTerrainSimulation";

export function CentralIrrigationTank() {
  const waterLevel = useTerrainSimulation((s) => s.waterLevel);
  const isIrrigating = useTerrainSimulation((s) => s.isIrrigating);
  const irrigationFlowRate = useTerrainSimulation((s) => s.irrigationFlowRate);
  const waterHeight = (TANK.height - 0.4) * (waterLevel / 100);

  const ringGeometry = useMemo(() => {
    return new THREE.CylinderGeometry(
      TANK.radius + 0.05,
      TANK.radius + 0.05,
      TANK.height,
      32,
      1,
      true
    );
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
        <cylinderGeometry
          args={[TANK.radius - 0.15, TANK.radius - 0.15, Math.max(0.05, waterHeight), 32]}
        />
        <meshLambertMaterial
          color={isIrrigating ? "#5BC0DE" : "#4A9BB5"}
          transparent
          opacity={0.85}
        />
      </mesh>

      {isIrrigating && (
        <mesh position={[0, TANK.height + 0.5, 0]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial color="#4A9BB5" />
        </mesh>
      )}

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

      <Html position={[0, TANK.height + 1.2, 0]} center distanceFactor={50}>
        <div
          className={`whitespace-nowrap rounded-lg px-3 py-1.5 font-mono text-xs shadow-lg ${
            isIrrigating
              ? "border border-sky-300 bg-sky-900/95 text-sky-100"
              : "bg-forest/90 text-white"
          }`}
        >
          <p className="font-bold">Cuve {Math.round(waterLevel)}%</p>
          {isIrrigating && (
            <p className="text-[10px] text-sky-200">
              {irrigationFlowRate.toFixed(1)} L/min
            </p>
          )}
        </div>
      </Html>
    </group>
  );
}
