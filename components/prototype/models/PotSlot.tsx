"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSimulation } from "../hooks/useSimulation";
import { getGrowthProgress } from "@/lib/plantData";
import { Plant } from "./Plant";

interface PotSlotProps {
  id: number;
  position: [number, number, number];
}

export function PotSlot({ id, position }: PotSlotProps) {
  const slot = useSimulation((s) => s.slots[id]);
  const day = useSimulation((s) => s.day);
  const isWatering = useSimulation((s) => s.isWatering);
  const plantSlot = useSimulation((s) => s.plantSlot);
  const [hovered, setHovered] = useState(false);
  const potRef = useRef<THREE.Mesh>(null);

  const progress =
    slot.occupied && slot.plantType
      ? getGrowthProgress(slot.plantedDay, slot.plantType, day)
      : 0;

  useFrame(({ clock }) => {
    if (potRef.current && isWatering) {
      potRef.current.position.y =
        position[1] + Math.sin(clock.elapsedTime * 8 + id) * 0.002;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={potRef}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          if (!slot.occupied) plantSlot(id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = slot.occupied ? "default" : "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <cylinderGeometry args={[0.12, 0.1, 0.14, 8]} />
        <meshLambertMaterial
          color="#2C1810"
          transparent={!slot.occupied}
          opacity={slot.occupied ? 1 : hovered ? 0.75 : 0.55}
        />
      </mesh>

      <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.09, 16]} />
        <meshLambertMaterial color="#4A3018" />
      </mesh>

      {slot.occupied && slot.plantType && (
        <group position={[0, 0.1, 0]}>
          <Plant
            plantType={slot.plantType}
            plantedDay={slot.plantedDay}
            currentDay={day}
          />
        </group>
      )}

      {isWatering && slot.occupied && (
        <pointLight
          position={[0, 0.15, 0.1]}
          color="#4A9BB5"
          intensity={0.3}
          distance={0.4}
        />
      )}

      {progress >= 1 && (
        <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.13, 0.15, 16]} />
          <meshBasicMaterial color="#E9A319" transparent opacity={0.6} />
        </mesh>
      )}
    </group>
  );
}
