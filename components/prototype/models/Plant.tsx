"use client";

import { a } from "@react-spring/three";
import type { PlantType } from "@/lib/plantData";
import { usePlantGrowthScale } from "../hooks/usePlantGrowth";

interface PlantProps {
  plantType: PlantType;
  plantedDay: number | null;
  currentDay: number;
}

function TomatePlant() {
  return (
    <group>
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.02, 0.24, 6]} />
        <meshToonMaterial color="#27AE60" />
      </mesh>
      {[0.18, 0.28].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshToonMaterial color="#E74C3C" />
        </mesh>
      ))}
    </group>
  );
}

function PimentPlant() {
  return (
    <group>
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.018, 0.2, 6]} />
        <meshToonMaterial color="#27AE60" />
      </mesh>
      {[0.16, 0.22, 0.28].map((y, i) => (
        <mesh key={i} position={[i * 0.03 - 0.03, y, 0]} rotation={[0, 0, i * 0.3]} castShadow>
          <coneGeometry args={[0.025, 0.07, 6]} />
          <meshToonMaterial color="#E67E22" />
        </mesh>
      ))}
    </group>
  );
}

function LaituePlant() {
  return (
    <group>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * 1.2) * 0.04,
            0.06 + i * 0.015,
            Math.sin(i * 1.2) * 0.04,
          ]}
          scale={[1, 0.35, 1]}
          castShadow
        >
          <sphereGeometry args={[0.07, 8, 6]} />
          <meshToonMaterial color="#27AE60" />
        </mesh>
      ))}
    </group>
  );
}

function OignonPlant() {
  return (
    <group>
      <mesh position={[0, 0.05, 0]} castShadow>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshToonMaterial color="#ECF0F1" />
      </mesh>
      <mesh position={[0, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.008, 0.012, 0.12, 6]} />
        <meshToonMaterial color="#27AE60" />
      </mesh>
    </group>
  );
}

function ChouPlant() {
  return (
    <group>
      <mesh position={[0, 0.08, 0]} scale={[1, 0.85, 1]} castShadow>
        <sphereGeometry args={[0.09, 10, 10]} />
        <meshToonMaterial color="#2ECC71" />
      </mesh>
    </group>
  );
}

function HerbesPlant() {
  return (
    <group>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[(i - 2.5) * 0.025, 0.1, (i % 2) * 0.02 - 0.01]}
          castShadow
        >
          <cylinderGeometry args={[0.006, 0.008, 0.2, 4]} />
          <meshToonMaterial color="#1ABC9C" />
        </mesh>
      ))}
    </group>
  );
}

const PLANT_MESH: Record<PlantType, React.ComponentType> = {
  tomate: TomatePlant,
  piment: PimentPlant,
  laitue: LaituePlant,
  oignon: OignonPlant,
  chou: ChouPlant,
  herbes: HerbesPlant,
};

export function Plant({ plantType, plantedDay, currentDay }: PlantProps) {
  const { spring, progress } = usePlantGrowthScale(
    plantedDay,
    plantType,
    currentDay
  );
  const Mesh = PLANT_MESH[plantType];
  const isReady = progress >= 1;

  return (
    <a.group scale={spring.scale}>
      <Mesh />
      {isReady && (
        <pointLight
          position={[0, 0.2, 0.1]}
          color="#E9A319"
          intensity={0.4 + Math.sin(currentDay * 2) * 0.2}
          distance={0.5}
        />
      )}
    </a.group>
  );
}
