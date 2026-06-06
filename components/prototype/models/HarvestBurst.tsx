"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSimulation } from "../hooks/useSimulation";
import { getSlotPosition } from "@/lib/plantData";

const PARTICLE_COUNT = 60;

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
}

export function HarvestBurst() {
  const showBurst = useSimulation((s) => s.showHarvestBurst);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useRef<Particle[]>([]);
  const startTime = useRef(0);
  const active = useRef(false);

  const colors = useMemo(
    () => ["#E74C3C", "#27AE60", "#E9A319", "#2ECC71", "#E67E22"],
    []
  );

  useEffect(() => {
    if (showBurst) {
      active.current = true;
      startTime.current = performance.now();
      particles.current = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const [x, y, z] = getSlotPosition(i % 24);
        return {
          x,
          y: y + 0.2,
          z,
          vx: (Math.random() - 0.5) * 2,
          vy: 1.5 + Math.random() * 2,
          vz: (Math.random() - 0.5) * 2,
          life: 1,
        };
      });
    }
  }, [showBurst]);

  useFrame((_, delta) => {
    if (!meshRef.current || !active.current) return;

    const elapsed = (performance.now() - startTime.current) / 1000;
    if (elapsed > 2) {
      active.current = false;
      meshRef.current.visible = false;
      return;
    }

    meshRef.current.visible = true;

    particles.current.forEach((p, i) => {
      p.vy -= 4 * delta;
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.z += p.vz * delta;
      p.life -= delta * 0.5;

      dummy.position.set(p.x, p.y, p.z);
      dummy.rotation.set(elapsed * 3, elapsed * 2, 0);
      dummy.scale.setScalar(0.02 * Math.max(0, p.life));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      meshRef.current!.setColorAt(
        i,
        new THREE.Color(colors[i % colors.length])
      );
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial vertexColors />
    </instancedMesh>
  );
}
