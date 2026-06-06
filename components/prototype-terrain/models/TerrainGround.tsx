"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { HECTARE_SIZE, COLORS } from "@/lib/terrainData";

export function TerrainGround() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(
      HECTARE_SIZE + 20,
      HECTARE_SIZE + 20,
      64,
      64
    );
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(
        i,
        Math.sin(x * 0.15) * 0.08 +
          Math.cos(y * 0.12) * 0.06 +
          (Math.random() - 0.5) * 0.02
      );
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
      geometry={geometry}
    >
      <meshLambertMaterial color={COLORS.soil} />
    </mesh>
  );
}
