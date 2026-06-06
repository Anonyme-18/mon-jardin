"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ROW_HEIGHTS, getSlotPosition } from "@/lib/plantData";
import { useSimulation } from "../hooks/useSimulation";

const DROP_COUNT = 40;

export function WaterDroplets() {
  const isWatering = useSimulation((s) => s.isWatering);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const drops = useMemo(() => {
    return Array.from({ length: DROP_COUNT }, (_, i) => {
      const row = ROW_HEIGHTS[i % ROW_HEIGHTS.length];
      const slotIdx = (i % 6) + Math.floor(i / 6) * 6;
      const [x] = getSlotPosition(Math.min(slotIdx, 23));
      return {
        x: x + (Math.random() - 0.5) * 0.1,
        startY: row + 0.25,
        endY: row - 0.05,
        speed: 0.4 + Math.random() * 0.3,
        offset: Math.random() * 2,
        z: -0.32 + Math.random() * 0.05,
      };
    });
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current || !isWatering) {
      if (meshRef.current) meshRef.current.visible = false;
      return;
    }

    meshRef.current.visible = true;
    const t = clock.elapsedTime;

    drops.forEach((drop, i) => {
      const cycle = ((t * drop.speed + drop.offset) % 1);
      const y = drop.startY - cycle * (drop.startY - drop.endY);
      dummy.position.set(drop.x, y, drop.z);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (!isWatering) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, DROP_COUNT]}>
      <sphereGeometry args={[0.015, 6, 6]} />
      <meshBasicMaterial color="#4A9BB5" transparent opacity={0.7} />
    </instancedMesh>
  );
}
