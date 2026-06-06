"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { COLORS, ROW_GAP, HECTARE_SIZE } from "@/lib/terrainData";
import { useTerrainSimulation } from "./hooks/useTerrainSimulation";
import { TerrainGround } from "./models/TerrainGround";
import { TerrainFarmGrid } from "./models/TerrainFarmGrid";
import { CentralIrrigationTank } from "./models/CentralIrrigationTank";
import { IrrigationNetwork } from "./models/IrrigationNetwork";
import { TerrainWaterSpray } from "./models/TerrainWaterSpray";
import { HorizonTrees, FieldBoundaryMarkers } from "./models/HorizonTrees";
import { Greenhouse } from "./models/Greenhouse";
import { TerrainSensors } from "./models/TerrainSensors";

const FINAL_CAMERA: [number, number, number] = [55, 42, 65];
const INTRO_CAMERA: [number, number, number] = [120, 90, 120];
const LOOK_AT = new THREE.Vector3(0, 0, 0);

function SceneEnvironment() {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new THREE.Color(COLORS.sky);
    scene.fog = new THREE.FogExp2(COLORS.fog, 0.008);
  }, [scene]);

  return null;
}

function CameraIntro() {
  const { camera } = useThree();
  const progress = useRef(0);
  const done = useRef(false);

  useFrame((_, delta) => {
    if (done.current) return;
    progress.current = Math.min(1, progress.current + delta / 3);

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

function FieldLabels() {
  const showLabels = useTerrainSimulation((s) => s.showLabels);
  if (!showLabels) return null;

  return (
    <>
      <Html
        position={[-HECTARE_SIZE / 2 + 2, 2, HECTARE_SIZE / 2 - 3]}
        center
        distanceFactor={80}
        style={{ pointerEvents: "none" }}
      >
        <div className="rounded-lg bg-forest-dark/90 px-3 py-2 font-mono text-xs text-white shadow-lg">
          <p className="font-bold">TERRAIN : 1 HECTARE</p>
          <p className="text-sage-muted">100 m × 100 m</p>
        </div>
      </Html>

      <Html
        position={[8, 1.5, -5]}
        center
        distanceFactor={60}
        style={{ pointerEvents: "none" }}
      >
        <div className="rounded-lg bg-white/90 px-2 py-1 font-mono text-[10px] text-forest-dark shadow">
          Intervalle entre les lignes : {ROW_GAP * 100} cm
        </div>
      </Html>
    </>
  );
}

function IrrigationGlow() {
  const isIrrigating = useTerrainSimulation((s) => s.isIrrigating);
  if (!isIrrigating) return null;

  return (
    <pointLight
      position={[0, 8, 0]}
      color="#4A9BB5"
      intensity={1.2}
      distance={HECTARE_SIZE}
    />
  );
}

export default function SceneTerrain3D() {
  const isIrrigating = useTerrainSimulation((s) => s.isIrrigating);

  return (
    <>
      <SceneEnvironment />
      <CameraIntro />

      <ambientLight intensity={0.55} color="#FFF8E7" />
      <directionalLight
        position={[40, 60, 30]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={200}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
      />
      <hemisphereLight args={["#87CEEB", COLORS.soil, 0.35]} />

      <TerrainGround />
      <TerrainFarmGrid />
      <CentralIrrigationTank />
      <IrrigationNetwork />
      <TerrainWaterSpray />
      <HorizonTrees />
      <FieldBoundaryMarkers />
      <Greenhouse />
      <TerrainSensors />
      <FieldLabels />
      <IrrigationGlow />

      <OrbitControls
        enablePan
        minDistance={8}
        maxDistance={120}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.1}
        autoRotate={false}
        target={LOOK_AT}
      />
    </>
  );
}
