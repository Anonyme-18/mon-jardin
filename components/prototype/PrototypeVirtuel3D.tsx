"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useSimulation } from "./hooks/useSimulation";
import { SimControls } from "./ui/SimControls";
import { MetricsHUD } from "./ui/MetricsHUD";
import { DayProgress } from "./ui/DayProgress";
import {
  GuidedTourRunner,
  WeatherBadge,
  SensorAlertsPanel,
} from "./ui/GuidedTourOverlay";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

function LoadingPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-cream">
      <Loader2 className="h-8 w-8 animate-spin text-forest" />
      <p className="mt-3 text-sm text-forest/70">
        Chargement du prototype...
      </p>
    </div>
  );
}

export function PrototypeVirtuel3D() {
  const logMessage = useSimulation((s) => s.logMessage);
  const isWatering = useSimulation((s) => s.isWatering);
  const showSensors = useSimulation((s) => s.showSensors);
  const guidedTourActive = useSimulation((s) => s.guidedTourActive);
  const [hovering, setHovering] = useState(false);

  const alwaysRender =
    isWatering || showSensors || hovering || guidedTourActive;

  return (
    <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-sage-border ring-1 ring-sage-border">
      <div
        className="relative h-[560px] w-full"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ fov: 50, position: [8, 4, 8] }}
          frameloop={alwaysRender ? "always" : "demand"}
          gl={{ antialias: true }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
        >
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>

        <Suspense fallback={<LoadingPlaceholder />}>
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
              <div className="rounded-xl bg-forest px-4 py-2 text-white shadow-sm">
                <p className="font-display text-sm font-semibold">
                  Mon Jardin — Prototype virtuel 3D
                </p>
              </div>
              <Badge variant="amber">Simulation en direct</Badge>
              <WeatherBadge />
            </div>

            <div className="absolute right-4 top-4 flex flex-col items-end gap-2 pointer-events-none">
              <MetricsHUD />
              <SensorAlertsPanel />
            </div>

            <GuidedTourRunner />

            <div className="absolute bottom-36 left-4 max-w-xs">
              <AnimatePresence mode="wait">
                <motion.div
                  key={logMessage}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl bg-forest-dark/80 px-4 py-2 font-mono text-xs text-sage-muted backdrop-blur-sm"
                >
                  {logMessage}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute bottom-0 left-0 right-0 space-y-3 p-4 pointer-events-auto">
              <DayProgress />
              <SimControls />
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default PrototypeVirtuel3D;
