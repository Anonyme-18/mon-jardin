"use client";

import { useMemo } from "react";
import * as THREE from "three";
import {
  ROW_COUNT,
  MODULES_PER_ROW,
  getUnitPosition,
  FIELD_OFFSET,
  TANK,
  COLORS,
} from "@/lib/terrainData";

export function IrrigationNetwork() {
  const mainPipes = useMemo(() => {
    const pipes: THREE.TubeGeometry[] = [];
    const directions = [
      new THREE.Vector3(0, 0, -FIELD_OFFSET + 5),
      new THREE.Vector3(0, 0, FIELD_OFFSET - 5),
      new THREE.Vector3(-FIELD_OFFSET + 5, 0, 0),
      new THREE.Vector3(FIELD_OFFSET - 5, 0, 0),
    ];

    for (const end of directions) {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.3, 0),
        new THREE.Vector3(end.x * 0.3, 0.25, end.z * 0.3),
        new THREE.Vector3(end.x * 0.7, 0.15, end.z * 0.7),
        new THREE.Vector3(end.x, 0.1, end.z),
      ]);
      pipes.push(new THREE.TubeGeometry(curve, 24, 0.12, 8, false));
    }
    return pipes;
  }, []);

  const branchPipes = useMemo(() => {
    const branches: { geometry: THREE.TubeGeometry; key: string }[] = [];
    const step = Math.max(1, Math.floor(ROW_COUNT / 16));

    for (let row = 0; row < ROW_COUNT; row += step) {
      const x = getUnitPosition(row, 0)[0];
      for (const sign of [-1, 1]) {
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.2, 0),
          new THREE.Vector3(x * 0.5, 0.15, sign * 8),
          new THREE.Vector3(x, 0.1, sign * (FIELD_OFFSET - 2)),
        ]);
        branches.push({
          geometry: new THREE.TubeGeometry(curve, 16, 0.06, 6, false),
          key: `branch-${row}-${sign}`,
        });
      }
    }
    return branches;
  }, []);

  return (
    <group position={TANK.position}>
      {mainPipes.map((geo, i) => (
        <mesh key={`main-${i}`} geometry={geo} castShadow>
          <meshLambertMaterial color={COLORS.pipe} />
        </mesh>
      ))}
      {branchPipes.map(({ geometry, key }) => (
        <mesh key={key} geometry={geometry} castShadow>
          <meshLambertMaterial color={COLORS.pipeGreen} />
        </mesh>
      ))}
    </group>
  );
}
