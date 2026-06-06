"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { useTerrainSimulation } from "./hooks/useTerrainSimulation";
import { TerrainMetricsHUD, TerrainControls } from "./ui/TerrainUI";
import {
  TerrainStatsBanner,
  GreenhouseEffectBadge,
} from "./ui/TerrainStatsBanner";

const SceneTerrain3D = dynamic(() => import("./SceneTerrain3D"), { ssr: false });

function LoadingPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-cream">
      <Loader2 className="h-8 w-8 animate-spin text-forest" />
      <p className="mt-3 text-sm text-forest/70">
        Chargement du terrain 1 hectare...
      </p>
    </div>
  );
}

export function PrototypeTerrainHectare3D() {
  const logMessage = useTerrainSimulation((s) => s.logMessage);
  const isIrrigating = useTerrainSimulation((s) => s.isIrrigating);
  const showSensors = useTerrainSimulation((s) => s.showSensors);
  const showGreenhouse = useTerrainSimulation((s) => s.showGreenhouse);
  const showHeatmap = useTerrainSimulation((s) => s.showHeatmap);
  const droneMode = useTerrainSimulation((s) => s.droneMode);
  const [hovering, setHovering] = useState(false);

  const alwaysRender =
    isIrrigating ||
    showSensors ||
    showGreenhouse ||
    showHeatmap ||
    droneMode ||
    hovering;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* Vue 3D — sans overlay UI */}
        <div
          className="relative h-[480px] overflow-hidden rounded-2xl border border-sage-border bg-cream ring-1 ring-sage-border sm:h-[540px] lg:h-[620px]"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ fov: 45, position: [120, 90, 120], near: 0.1, far: 500 }}
            frameloop={alwaysRender ? "always" : "demand"}
            gl={{ antialias: true }}
            className="!h-full !w-full"
            style={{ height: "100%", width: "100%" }}
            onCreated={({ gl }) => {
              gl.shadowMap.enabled = true;
              gl.shadowMap.type = THREE.PCFSoftShadowMap;
            }}
          >
            <Suspense fallback={null}>
              <SceneTerrain3D />
            </Suspense>
          </Canvas>
        </div>

        {/* Panneau latéral — données & contrôles */}
        <aside className="flex flex-col gap-3 lg:max-h-[620px] lg:overflow-y-auto lg:pr-1">
          <div className="rounded-2xl border border-sage-border bg-white/80 p-4 backdrop-blur-md">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <h2 className="font-display text-sm font-semibold text-forest-dark">
                Terrain 1 hectare
              </h2>
              <Badge variant="amber">
                {droneMode ? "Mode drone" : "Vue aérienne"}
              </Badge>
            </div>
            <p className="mb-3 text-xs text-forest/60">
              Glisser pour tourner · molette pour zoomer
            </p>
            <TerrainStatsBanner />
            <div className="mt-3">
              <GreenhouseEffectBadge />
            </div>
          </div>

          <div className="rounded-2xl border border-sage-border bg-white/80 p-4 backdrop-blur-md">
            <TerrainMetricsHUD />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={logMessage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-sage-border bg-forest-dark/90 px-4 py-3 font-mono text-xs text-sage-muted"
            >
              {logMessage}
            </motion.div>
          </AnimatePresence>

          <div className="rounded-2xl border border-sage-border bg-white/80 p-4 backdrop-blur-md">
            <TerrainControls />
          </div>
        </aside>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-sage-border bg-cream-warm px-4 py-3 text-sm">
        <Link
          href="/prototype"
          className="text-forest underline-offset-2 hover:underline"
        >
          ← Prototype cour (ménage)
        </Link>
        <span className="text-forest/40">|</span>
        <span className="font-mono text-forest/60">
          0 FCFA électricité · irrigation gravitaire
        </span>
      </div>
    </div>
  );
}

export default PrototypeTerrainHectare3D;
