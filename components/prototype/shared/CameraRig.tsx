"use client";

import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { CameraOverride } from "@/components/prototype/hooks/useSimulation";

interface CameraRigProps {
  cameraOverride: CameraOverride | null;
  orbitEnabled: boolean;
  lookAtDefault: THREE.Vector3;
  minDistance?: number;
  maxDistance?: number;
  enablePan?: boolean;
}

export function CameraRig({
  cameraOverride,
  orbitEnabled,
  lookAtDefault,
  minDistance = 3,
  maxDistance = 9,
  enablePan = false,
}: CameraRigProps) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!cameraOverride) return;

    targetPos.current.set(...cameraOverride.position);
    targetLook.current.set(...cameraOverride.lookAt);

    const lerp = 1 - Math.pow(0.001, delta);
    camera.position.lerp(targetPos.current, lerp);
    camera.lookAt(targetLook.current);
  });

  return (
    <OrbitControls
      enabled={orbitEnabled && !cameraOverride}
      enablePan={enablePan}
      minDistance={minDistance}
      maxDistance={maxDistance}
      minPolarAngle={0.2}
      maxPolarAngle={enablePan ? Math.PI / 2.1 : 1.4}
      autoRotate={false}
      target={lookAtDefault}
    />
  );
}
