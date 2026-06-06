"use client";

import { useRef, useEffect, useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { getSlotPosition, TOTAL_SLOTS } from "@/lib/plantData";
import { useSimulation } from "./hooks/useSimulation";
import { GroundMesh } from "./models/GroundMesh";
import { WallMesh } from "./models/WallMesh";
import { BambooFrame } from "./models/BambooFrame";
import { WaterTank } from "./models/WaterTank";
import { WaterPipe } from "./models/WaterPipe";
import { WaterDroplets } from "./models/WaterDroplets";
import { CompostBox } from "./models/CompostBox";
import { PotSlot } from "./models/PotSlot";
import { HarvestBurst } from "./models/HarvestBurst";
import { HomeSensors } from "./models/HomeSensors";

const FINAL_CAMERA: [number, number, number] = [3.5, 2.5, 5.0];
const INTRO_CAMERA: [number, number, number] = [8, 4, 8];
const LOOK_AT = new THREE.Vector3(0, 1.2, 0);

function SceneEnvironment() {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color("#B8DCF0");
    scene.fog = new THREE.FogExp2("#F7F4EF", 0.06);
  }, [scene]);

  return null;
}

function CameraIntro() {
  const { camera } = useThree();
  const progress = useRef(0);
  const done = useRef(false);

  useFrame((_, delta) => {
    if (done.current) return;
    progress.current = Math.min(1, progress.current + delta / 2.5);

    const t = 1 - Math.pow(1 - progress.current, 3);
    camera.position.set(
      THREE.MathUtils.lerp(INTRO_CAMERA[0], FINAL_CAMERA[0], t),
      THREE.MathUtils.lerp(INTRO_CAMERA[1], FINAL_CAMERA[1], t),
      THREE.MathUtils.lerp(INTRO_CAMERA[2], FINAL_CAMERA[2], t)
    );
    camera.lookAt(LOOK_AT);

    if (progress.current >= 1) done.current = true;
  });

  return null;
}

function IrrigationLights() {
  const isWatering = useSimulation((s) => s.isWatering);
  if (!isWatering) return null;

  return (
    <>
      {[0.6, 1.2, 1.8, 2.4].map((y) => (
        <pointLight
          key={y}
          position={[0, y, -0.2]}
          color="#4A9BB5"
          intensity={0.5}
          distance={2}
        />
      ))}
    </>
  );
}

function LevaDebug() {
  if (process.env.NODE_ENV === "production") return null;
  return null;
}

export default function Scene3D() {
  const isWatering = useSimulation((s) => s.isWatering);
  const slotPositions = useMemo(
    () =>
      Array.from({ length: TOTAL_SLOTS }, (_, i) => ({
        id: i,
        position: getSlotPosition(i),
      })),
    []
  );

  return (
    <>
      <SceneEnvironment />
      <CameraIntro />

      <ambientLight intensity={0.5} color="#FFF8E7" />
      <directionalLight
        position={[5, 8, 4]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />

      <GroundMesh />
      <WallMesh />
      <BambooFrame />
      <WaterTank />
      <WaterPipe />
      <WaterDroplets />
      <CompostBox />
      <IrrigationLights />
      <HarvestBurst />
      <HomeSensors />

      {slotPositions.map(({ id, position }) => (
        <PotSlot key={id} id={id} position={position} />
      ))}

      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={9}
        minPolarAngle={0.3}
        maxPolarAngle={1.4}
        autoRotate={false}
        target={LOOK_AT}
      />

      <LevaDebug />
    </>
  );
}
