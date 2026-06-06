"use client";

import { FRAME_WIDTH, TOTAL_SLOTS, getSlotPosition } from "@/lib/plantData";
import { BambooFrame } from "@/components/prototype/models/BambooFrame";
import { StaticPlant, plantTypeForSlot } from "@/components/prototype/models/StaticPlant";
import type { PlantType } from "@/lib/plantData";

interface HomeKitUnitProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  unitSeed?: number;
  /** Variété dominante pour toute l'unité (optionnel) */
  defaultPlant?: PlantType;
}

export function HomeKitUnit({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  unitSeed = 0,
  defaultPlant,
}: HomeKitUnitProps) {
  return (
    <group position={position} rotation={rotation}>
      <BambooFrame />

      {Array.from({ length: TOTAL_SLOTS }).map((_, slotIndex) => {
        const [x, y, z] = getSlotPosition(slotIndex);
        const plantType =
          defaultPlant ?? plantTypeForSlot(slotIndex, unitSeed);

        return (
          <group key={slotIndex} position={[x, y, z]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.12, 0.1, 0.14, 8]} />
              <meshLambertMaterial color="#2C1810" />
            </mesh>
            <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.09, 16]} />
              <meshLambertMaterial color="#4A3018" />
            </mesh>
            <group position={[0, 0.1, 0]}>
              <StaticPlant type={plantType} scale={0.9} />
            </group>
          </group>
        );
      })}

      {/* Toiture polycarbonate légère */}
      <mesh
        position={[0, 2.55, -0.35]}
        rotation={[0.15, 0, 0]}
        castShadow
      >
        <boxGeometry args={[FRAME_WIDTH + 0.1, 0.04, 0.7]} />
        <meshLambertMaterial color="#E8F4FC" transparent opacity={0.75} />
      </mesh>
    </group>
  );
}
