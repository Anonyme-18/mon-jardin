"use client";

import { create } from "zustand";
import {
  ROW_COUNT,
  MODULES_PER_ROW,
  TOTAL_UNITS,
  estimatePlantCount,
  estimateYieldKg,
  HECTARE_SIZE,
  ROW_GAP,
  GREENHOUSE_AREA,
  GREENHOUSE_CYCLE_REDUCTION,
} from "@/lib/terrainData";
import type { CameraOverride } from "@/components/prototype/hooks/useSimulation";

interface TerrainSimulationState {
  waterLevel: number;
  isIrrigating: boolean;
  irrigationFlowRate: number;
  day: number;
  showLabels: boolean;
  showSensors: boolean;
  showGreenhouse: boolean;
  showHeatmap: boolean;
  droneMode: boolean;
  cameraOverride: CameraOverride | null;
  orbitEnabled: boolean;
  logMessage: string;

  activateIrrigation: () => void;
  tickIrrigation: (delta: number) => void;
  advanceDay: () => void;
  toggleLabels: () => void;
  toggleSensors: () => void;
  toggleGreenhouse: () => void;
  toggleHeatmap: () => void;
  toggleDroneMode: () => void;
  setCameraOverride: (cam: CameraOverride | null) => void;
  setOrbitEnabled: (enabled: boolean) => void;
  reset: () => void;
}

export const useTerrainSimulation = create<TerrainSimulationState>(
  (set, get) => ({
    waterLevel: 85,
    isIrrigating: false,
    irrigationFlowRate: 0,
    day: 12,
    showLabels: true,
    showSensors: false,
    showGreenhouse: false,
    showHeatmap: false,
    droneMode: false,
    cameraOverride: null,
    orbitEnabled: true,
    logMessage:
      "Terrain 1 ha — kits ménage répétés · 30 cm entre les lignes · 0 FCFA électricité",

    activateIrrigation: () => {
      if (get().isIrrigating) return;
      set({
        isIrrigating: true,
        irrigationFlowRate: 12.5,
        logMessage:
          "Irrigation gravitaire — débit ~12,5 L/min, jauge cuve en temps réel, 0 pompe électrique.",
      });
    },

    tickIrrigation: (delta) => {
      const { isIrrigating, waterLevel } = get();
      if (!isIrrigating) return;

      if (waterLevel <= 5) {
        set({
          isIrrigating: false,
          irrigationFlowRate: 0,
          logMessage: "Cuve vide — remplir avant la prochaine irrigation.",
        });
        return;
      }

      set({ waterLevel: Math.max(0, waterLevel - delta * 2.8) });
    },

    advanceDay: () => {
      const day = get().day + 1;
      const waterLevel = Math.max(20, get().waterLevel - 2);
      set({
        day,
        waterLevel,
        logMessage: `Jour ${day} — croissance active sur ${estimatePlantCount().toLocaleString("fr-FR")} plants.`,
      });
    },

    toggleLabels: () =>
      set((s) => ({
        showLabels: !s.showLabels,
        logMessage: s.showLabels ? "Annotations masquées." : "Annotations affichées.",
      })),

    toggleSensors: () =>
      set((s) => ({
        showSensors: !s.showSensors,
        logMessage: s.showSensors
          ? "Capteurs terrain désactivés."
          : "Capteurs IoT activés — suivi hectare + serre.",
      })),

    toggleGreenhouse: () =>
      set((s) => ({
        showGreenhouse: !s.showGreenhouse,
        logMessage: s.showGreenhouse
          ? "Serre masquée."
          : `Serre ${GREENHOUSE_AREA} m² — humidité +15 %, cycle −${Math.round(GREENHOUSE_CYCLE_REDUCTION * 100)} %.`,
      })),

    toggleHeatmap: () =>
      set((s) => ({
        showHeatmap: !s.showHeatmap,
        logMessage: s.showHeatmap
          ? "Heatmap masquée."
          : "Heatmap production — vert = rendement optimal.",
      })),

    toggleDroneMode: () =>
      set((s) => {
        const next = !s.droneMode;
        return {
          droneMode: next,
          orbitEnabled: !next,
          cameraOverride: null,
          logMessage: next
            ? "Mode drone — survol automatique du hectare."
            : "Mode drone désactivé.",
        };
      }),

    setCameraOverride: (cam) => set({ cameraOverride: cam }),

    setOrbitEnabled: (enabled) => set({ orbitEnabled: enabled }),

    reset: () =>
      set({
        waterLevel: 85,
        isIrrigating: false,
        irrigationFlowRate: 0,
        day: 12,
        showLabels: true,
        showSensors: false,
        showGreenhouse: false,
        showHeatmap: false,
        droneMode: false,
        cameraOverride: null,
        orbitEnabled: true,
        logMessage: "Simulation réinitialisée — terrain 1 hectare.",
      }),
  })
);

export function useTerrainMetrics() {
  const waterLevel = useTerrainSimulation((s) => s.waterLevel);
  const day = useTerrainSimulation((s) => s.day);
  const isIrrigating = useTerrainSimulation((s) => s.isIrrigating);
  const irrigationFlowRate = useTerrainSimulation((s) => s.irrigationFlowRate);
  const showGreenhouse = useTerrainSimulation((s) => s.showGreenhouse);
  const showSensors = useTerrainSimulation((s) => s.showSensors);

  return {
    rows: ROW_COUNT,
    modulesPerRow: MODULES_PER_ROW,
    totalUnits: TOTAL_UNITS,
    plants: estimatePlantCount(),
    yieldKg: estimateYieldKg(),
    annualYieldKg: Math.round(TOTAL_UNITS * 12 * 0.15 * 4),
    waterLevel,
    day,
    surface: HECTARE_SIZE,
    rowGap: ROW_GAP,
    hectares: 1,
    isIrrigating,
    irrigationFlowRate,
    greenhouseHumidityBoost:
      showGreenhouse && showSensors ? 15 : showGreenhouse ? 10 : 0,
    cycleReductionPct: showGreenhouse
      ? Math.round(GREENHOUSE_CYCLE_REDUCTION * 100)
      : 0,
  };
}