import { create } from "zustand";
import {
  ROW_COUNT,
  MODULES_PER_ROW,
  TOTAL_UNITS,
  estimatePlantCount,
  estimateYieldKg,
  HECTARE_SIZE,
  ROW_GAP,
} from "@/lib/terrainData";

interface TerrainState {
  waterLevel: number;
  isIrrigating: boolean;
  day: number;
  showLabels: boolean;
  showSensors: boolean;
  showGreenhouse: boolean;
  logMessage: string;
}

interface TerrainActions {
  activateIrrigation: () => void;
  advanceDay: () => void;
  toggleLabels: () => void;
  toggleSensors: () => void;
  toggleGreenhouse: () => void;
  reset: () => void;
}

export const useTerrainSimulation = create<TerrainState & TerrainActions>(
  (set, get) => ({
    waterLevel: 85,
    isIrrigating: false,
    day: 12,
    showLabels: true,
    showSensors: false,
    showGreenhouse: false,
    logMessage:
      "Terrain 1 ha — kits ménage répétés · 30 cm entre les lignes · 0 FCFA électricité",

    activateIrrigation: () => {
      if (get().isIrrigating) return;
      set({
        isIrrigating: true,
        waterLevel: 100,
        logMessage: "Irrigation gravitaire activée — eau distribuée sur toutes les rangées.",
      });
      setTimeout(() => set({ isIrrigating: false }), 4000);
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
          : "Capteurs IoT activés — 6 points de mesure sur le hectare.",
      })),

    toggleGreenhouse: () =>
      set((s) => ({
        showGreenhouse: !s.showGreenhouse,
        logMessage: s.showGreenhouse
          ? "Serre masquée."
          : "Serre affichée — 768 m² (quadrant NE).",
      })),

    reset: () =>
      set({
        waterLevel: 85,
        isIrrigating: false,
        day: 12,
        showLabels: true,
        showSensors: false,
        showGreenhouse: false,
        logMessage: "Simulation réinitialisée — terrain 1 hectare.",
      }),
  })
);

export function useTerrainMetrics() {
  const waterLevel = useTerrainSimulation((s) => s.waterLevel);
  const day = useTerrainSimulation((s) => s.day);

  return {
    rows: ROW_COUNT,
    modulesPerRow: MODULES_PER_ROW,
    totalUnits: TOTAL_UNITS,
    plants: estimatePlantCount(),
    yieldKg: estimateYieldKg(),
    waterLevel,
    day,
    surface: HECTARE_SIZE,
    rowGap: ROW_GAP,
    hectares: 1,
  };
}
