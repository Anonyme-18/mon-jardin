"use client";

import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ALL_UNITS } from "@/lib/terrainData";
import { useTerrainSimulation } from "../hooks/useTerrainSimulation";

function yieldFactor(seed: number): number {
  const n = (Math.sin(seed * 12.9898) * 43758.5453) % 1;
  const normalized = n < 0 ? n + 1 : n;
  return 0.35 + normalized * 0.65;
}

function heatColor(factor: number): THREE.Color {
  return new THREE.Color("#E67E22").lerp(new THREE.Color("#27AE60"), factor);
}

export function ProductionHeatmap() {
  const showHeatmap = useTerrainSimulation((s) => s.showHeatmap);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useRef(new THREE.Object3D()).current;

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    ALL_UNITS.forEach((cell, i) => {
      dummy.position.set(cell.x, 0.06, cell.z);
      dummy.rotation.set(-Math.PI / 2, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, heatColor(yieldFactor(cell.seed)));
    });

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [dummy]);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!showHeatmap || !mesh?.material) return;
    const mat = mesh.material as THREE.MeshLambertMaterial;
    mat.opacity = 0.55 + Math.sin(clock.elapsedTime * 1.5) * 0.08;
  });

  if (!showHeatmap) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, ALL_UNITS.length]}>
      <planeGeometry args={[0.55, 0.75]} />
      <meshLambertMaterial transparent opacity={0.6} side={THREE.DoubleSide} />
    </instancedMesh>
  );
}
