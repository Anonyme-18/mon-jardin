"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { ROW_HEIGHTS } from "@/lib/plantData";

const PIPE_COLOR = "#6B8FA8";
const TANK_POS = new THREE.Vector3(1.35, 2.8, -0.45);

function PipeSegment({ rowY }: { rowY: number }) {
  const curve = useMemo(() => {
    const endX = -0.5;
    return new THREE.CatmullRomCurve3([
      TANK_POS.clone(),
      new THREE.Vector3(0.8, rowY + 0.8, -0.42),
      new THREE.Vector3(0, rowY + 0.15, -0.38),
      new THREE.Vector3(endX, rowY, -0.35),
    ]);
  }, [rowY]);

  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, 32, 0.015, 8, false),
    [curve]
  );

  return (
    <mesh geometry={geometry} castShadow>
      <meshLambertMaterial color={PIPE_COLOR} />
    </mesh>
  );
}

export function WaterPipe() {
  return (
    <group>
      {ROW_HEIGHTS.map((y) => (
        <PipeSegment key={y} rowY={y} />
      ))}
    </group>
  );
}
