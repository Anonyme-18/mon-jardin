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
            camera={{ fov: 50, position: [8, 4, 8] }}
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
              <Scene3D />
            </Suspense>
          </Canvas>
        </div>

        {/* Panneau latéral — données & contrôles */}
        <aside className="flex flex-col gap-3 lg:max-h-[620px] lg:overflow-y-auto lg:pr-1">
          <div className="rounded-2xl border border-sage-border bg-white/80 p-4 backdrop-blur-md">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <h2 className="font-display text-sm font-semibold text-forest-dark">
                Prototype cour
              </h2>
              <Badge variant="amber">Simulation</Badge>
            </div>
            <p className="mb-3 text-xs text-forest/60">
              Glisser pour tourner · molette pour zoomer
            </p>
            <MetricsHUD />
          </div>

          <WeatherBadge />

          <SensorAlertsPanel />

          <GuidedTourRunner />

          <div className="rounded-2xl border border-sage-border bg-white/80 p-4 backdrop-blur-md">
            <DayProgress />
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

          <SimControls className="mt-auto" />
        </aside>
      </div>
    </div>
  );
}

export default PrototypeVirtuel3D;
