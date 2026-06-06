"use client";

import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export function PhotoBackdrop() {
  const texture = useTexture("/img/image2.jpeg");
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh position={[0, 2.2, -3.2]} rotation={[0, 0, 0]}>
      <planeGeometry args={[14, 9]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </mesh>
  );
}
