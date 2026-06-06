"use client";

import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTerrainSimulation } from "./hooks/useTerrainSimulation";
import { DRONE_WAYPOINTS } from "@/lib/prototypeEnhancements";

export function DroneCameraController() {
  const droneMode = useTerrainSimulation((s) => s.droneMode);
  const { camera } = useThree();

  const waypointIndex = useRef(0);
  const segmentProgress = useRef(0);
  const posA = useRef(new THREE.Vector3());
  const posB = useRef(new THREE.Vector3());
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (!droneMode) {
      waypointIndex.current = 0;
      segmentProgress.current = 0;
    }
  }, [droneMode]);

  useFrame((_, delta) => {
    if (!droneMode) return;

    const current = DRONE_WAYPOINTS[waypointIndex.current];
    const next =
      DRONE_WAYPOINTS[(waypointIndex.current + 1) % DRONE_WAYPOINTS.length];

    posA.current.set(...current.position);
    posB.current.set(...next.position);
    lookAt.current.set(...current.lookAt);

    segmentProgress.current += (delta * 1000) / current.durationMs;

    if (segmentProgress.current >= 1) {
      segmentProgress.current = 0;
      waypointIndex.current =
        (waypointIndex.current + 1) % DRONE_WAYPOINTS.length;
      return;
    }

    const t = 1 - Math.pow(1 - segmentProgress.current, 2);
    camera.position.lerpVectors(posA.current, posB.current, t);
    camera.lookAt(lookAt.current);
  });

  return null;
}

export function IrrigationTick() {
  const isIrrigating = useTerrainSimulation((s) => s.isIrrigating);
  const tickIrrigation = useTerrainSimulation((s) => s.tickIrrigation);

  useFrame((_, delta) => {
    if (isIrrigating) tickIrrigation(delta);
  });

  return null;
}
