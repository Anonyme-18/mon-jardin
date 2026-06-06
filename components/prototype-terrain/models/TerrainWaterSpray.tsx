"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTerrainSimulation } from "../hooks/useTerrainSimulation";
import { ALL_UNITS } from "@/lib/terrainData";

const DROP_COUNT = 80;

export function TerrainWaterSpray() {
  const isIrrigating = useTerrainSimulation((s) => s.isIrrigating);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const drops = useMemo(() => {
    const sample = ALL_UNITS.filter((_, i) => i % 12 === 0).slice(0, DROP_COUNT);
    return sample.map((unit, i) => ({
      x: unit.x,
      z: unit.z,
      startY: 0.35,
      speed: 0.5 + (i % 5) * 0.08,
      offset: (i % 7) * 0.4,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    if (!isIrrigating) {
      meshRef.current.visible = false;
      return;
    }

    meshRef.current.visible = true;
    const t = clock.elapsedTime;

    drops.forEach((drop, i) => {
      const cycle = ((t * drop.speed + drop.offset) % 1);
      const y = drop.startY - cycle * 0.3;
      dummy.position.set(drop.x, y, drop.z);
      dummy.scale.setScalar(0.8);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, DROP_COUNT]}>
      <sphereGeometry args={[0.04, 4, 4]} />
      <meshBasicMaterial color="#4A9BB5" transparent opacity={0.6} />
    </instancedMesh>
  );
}
