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
  const [hovering, setHovering] = useState(false);

  return (
    <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-sage-border ring-1 ring-sage-border">
      <div
        className="relative h-[620px] w-full"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ fov: 45, position: [120, 90, 120], near: 0.1, far: 500 }}
          frameloop={
            isIrrigating || showSensors || showGreenhouse || hovering
              ? "always"
              : "demand"
          }
          gl={{ antialias: true }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          <Suspense fallback={null}>
            <SceneTerrain3D />
          </Suspense>
        </Canvas>

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
            <div className="rounded-xl bg-forest px-4 py-2 text-white shadow-sm">
              <p className="font-display text-sm font-semibold">
                Mon Jardin — Terrain 1 hectare
              </p>
            </div>
            <Badge variant="amber">Vue aérienne 3D</Badge>
          </div>

          <div className="absolute right-4 top-4 max-w-[220px]">
            <TerrainMetricsHUD />
          </div>

          <div className="absolute bottom-24 left-4 max-w-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={logMessage}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl bg-forest-dark/85 px-4 py-2 font-mono text-xs text-sage-muted backdrop-blur-sm"
              >
                {logMessage}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pointer-events-auto absolute bottom-0 left-0 right-0 p-4">
            <TerrainControls />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 border-t border-sage-border bg-cream-warm px-4 py-3 text-sm">
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
