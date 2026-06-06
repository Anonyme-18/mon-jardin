"use client";

import { useRef, useMemo, useLayoutEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  ALL_UNITS,
  UNIT_WIDTH,
  UNIT_DEPTH,
  DETAIL_RADIUS_SQ,
  COLORS,
  type UnitCell,
} from "@/lib/terrainData";
import { FRAME_HEIGHT as KIT_HEIGHT } from "@/lib/plantData";
import { HomeKitUnit } from "./HomeKitUnit";

function setMatrix(
  dummy: THREE.Object3D,
  mesh: THREE.InstancedMesh,
  i: number,
  x: number,
  z: number,
  sx: number,
  sy: number,
  sz: number,
  y = KIT_HEIGHT / 2
) {
  dummy.position.set(x, y, z);
  dummy.scale.set(sx, sy, sz);
  dummy.updateMatrix();
  mesh.setMatrixAt(i, dummy.matrix);
}

function InstancedFarUnits({ excludeKeys }: { excludeKeys: Set<string> }) {
  const frameRef = useRef<THREE.InstancedMesh>(null);
  const plantRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const visibleUnits = useMemo(
    () => ALL_UNITS.filter((u) => !excludeKeys.has(u.key)),
    [excludeKeys]
  );

  useLayoutEffect(() => {
    if (!frameRef.current || !plantRef.current) return;

    visibleUnits.forEach((unit, i) => {
      setMatrix(
        dummy,
        frameRef.current!,
        i,
        unit.x,
        unit.z,
        UNIT_WIDTH,
        KIT_HEIGHT,
        UNIT_DEPTH
      );
      setMatrix(
        dummy,
        plantRef.current!,
        i,
        unit.x,
        unit.z + 0.08,
        UNIT_WIDTH * 0.88,
        0.4,
        UNIT_DEPTH * 0.55,
        KIT_HEIGHT * 0.55
      );
    });

    frameRef.current.count = visibleUnits.length;
    plantRef.current.count = visibleUnits.length;
    frameRef.current.instanceMatrix.needsUpdate = true;
    plantRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy, visibleUnits]);

  if (visibleUnits.length === 0) return null;

  return (
    <group>
      <instancedMesh
        ref={frameRef}
        args={[undefined, undefined, visibleUnits.length]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial color={COLORS.wood} />
      </instancedMesh>
      <instancedMesh
        ref={plantRef}
        args={[undefined, undefined, visibleUnits.length]}
        castShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshToonMaterial color={COLORS.plant} />
      </instancedMesh>
    </group>
  );
}

function findNearUnits(
  cameraX: number,
  cameraZ: number,
  radiusSq: number
): UnitCell[] {
  return ALL_UNITS.map((unit) => ({
    unit,
    d: (cameraX - unit.x) ** 2 + (cameraZ - unit.z) ** 2,
  }))
    .filter(({ d }) => d <= radiusSq)
    .sort((a, b) => a.d - b.d)
    .slice(0, 48)
    .map(({ unit }) => unit);
}

export function TerrainFarmGrid() {
  const camera = useThree((s) => s.camera);
  const [nearUnits, setNearUnits] = useState<UnitCell[]>([]);
  const frameCount = useRef(0);

  useFrame(() => {
    frameCount.current += 1;
    if (frameCount.current % 8 !== 0) return;

    const near = findNearUnits(
      camera.position.x,
      camera.position.z,
      DETAIL_RADIUS_SQ
    );
    setNearUnits((prev) => {
      if (
        prev.length === near.length &&
        prev.every((u, i) => u.key === near[i]?.key)
      ) {
        return prev;
      }
      return near;
    });
  });

  const excludeKeys = useMemo(
    () => new Set(nearUnits.map((u) => u.key)),
    [nearUnits]
  );

  return (
    <group>
      <InstancedFarUnits excludeKeys={excludeKeys} />
      {nearUnits.map((unit) => (
        <HomeKitUnit
          key={unit.key}
          position={[unit.x, 0, unit.z]}
          unitSeed={unit.seed}
        />
      ))}
    </group>
  );
}
