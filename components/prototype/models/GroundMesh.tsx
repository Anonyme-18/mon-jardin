"use client";

import { useMemo } from "react";
import * as THREE from "three";

export function GroundMesh() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(8, 8, 32, 32);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, Math.sin(x * 2) * 0.03 + Math.cos(y * 1.5) * 0.02);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
        geometry={geometry}
      >
        <meshLambertMaterial color="#8B6914" />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 5,
            0.02,
            (Math.random() - 0.5) * 4 + 1,
          ]}
          rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}
          scale={[0.15 + Math.random() * 0.1, 0.05, 0.12]}
          receiveShadow
        >
          <sphereGeometry args={[1, 6, 4]} />
          <meshLambertMaterial color="#6B5A3E" />
        </mesh>
      ))}
    </>
  );
}
