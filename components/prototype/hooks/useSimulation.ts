import { create } from "zustand";
import {
  PLANTS,
  TOTAL_SLOTS,
  type PlantType,
  getGrowthProgress,
  FCFA_PER_KG,
} from "@/lib/plantData";

export type SimPhase = "idle" | "growing" | "ready" | "harvested";

export interface SlotState {
  id: number;
  occupied: boolean;
  plantType: PlantType | null;
  plantedDay: number | null;
}

interface SimState {
  day: number;
  water: number;
  selectedPlant: PlantType;
  slots: SlotState[];
  isWatering: boolean;
  totalHarvested: number;
  cycles: number;
  phase: SimPhase;
  logMessage: string;
  showHarvestBurst: boolean;
  showSensors: boolean;
}

interface SimActions {
  setSelectedPlant: (plant: PlantType) => void;
  plantAll: () => void;
  plantSlot: (id: number) => void;
  activateWater: () => void;
  advanceDays: (n: number) => void;
  harvest: () => void;
  reset: () => void;
  clearHarvestBurst: () => void;
  tickWatering: () => void;
  toggleSensors: () => void;
}

function createInitialSlots(): SlotState[] {
  return Array.from({ length: TOTAL_SLOTS }, (_, id) => ({
    id,
    occupied: false,
    plantType: null,
    plantedDay: null,
  }));
}

function computePhase(slots: SlotState[], day: number): SimPhase {
  const occupied = slots.filter((s) => s.occupied);
  if (occupied.length === 0) return "idle";

  const allReady = occupied.every(
    (s) => getGrowthProgress(s.plantedDay, s.plantType, day) >= 1
  );
  if (allReady) return "ready";
  return "growing";
}

function getMaxCycleDay(slots: SlotState[], day: number): number {
  let max = 0;
  for (const slot of slots) {
    if (!slot.occupied || !slot.plantType || slot.plantedDay === null) continue;
    const cycle = PLANTS[slot.plantType].cycleDays;
    const elapsed = day - slot.plantedDay;
    max = Math.max(max, Math.min(elapsed, cycle));
  }
  return max;
}

function getMaxCycleTotal(slots: SlotState[]): number {
  let max = 45;
  for (const slot of slots) {
    if (!slot.plantType) continue;
    max = Math.max(max, PLANTS[slot.plantType].cycleDays);
  }
  return max;
}

export const useSimulation = create<SimState & SimActions>((set, get) => ({
  day: 0,
  water: 80,
  selectedPlant: "laitue",
  slots: createInitialSlots(),
  isWatering: false,
  totalHarvested: 0,
  cycles: 0,
  phase: "idle",
  logMessage: "Prototype prêt — sélectionnez une plante et cliquez sur un pot.",
  showHarvestBurst: false,
  showSensors: false,

  setSelectedPlant: (plant) => set({ selectedPlant: plant }),

  plantAll: () => {
    const { selectedPlant, day, slots } = get();
    const updated = slots.map((slot) =>
      slot.occupied
        ? slot
        : {
            ...slot,
            occupied: true,
            plantType: selectedPlant,
            plantedDay: day,
          }
    );
    set({
      slots: updated,
      phase: computePhase(updated, day),
      logMessage: `${PLANTS[selectedPlant].label} planté dans tous les pots vides — cycle ${PLANTS[selectedPlant].cycleDays} jours.`,
    });
  },

  plantSlot: (id) => {
    const { selectedPlant, day, slots } = get();
    const slot = slots[id];
    if (!slot || slot.occupied) return;

    const updated = slots.map((s) =>
      s.id === id
        ? {
            ...s,
            occupied: true,
            plantType: selectedPlant,
            plantedDay: day,
          }
        : s
    );
    set({
      slots: updated,
      phase: computePhase(updated, day),
      logMessage: `${PLANTS[selectedPlant].label} planté — pot ${id + 1}.`,
    });
  },

  activateWater: () => {
    const state = get();
    if (state.isWatering) return;

    set({
      isWatering: true,
      water: 100,
      logMessage: "Irrigation activée — 0 FCFA électricité consommée.",
    });

    setTimeout(() => {
      set({ isWatering: false });
    }, 3000);
  },

  advanceDays: (n) => {
    const { day, water, slots } = get();
    const newDay = day + n;
    const newWater = Math.max(0, water - n * 3);
    const phase = computePhase(slots, newDay);

    set({
      day: newDay,
      water: newWater,
      phase,
      logMessage: `+${n} jour${n > 1 ? "s" : ""} — réservoir à ${Math.round(newWater)}%.`,
    });
  },

  harvest: () => {
    const { day, slots, totalHarvested, cycles } = get();
    let harvestKg = 0;

    for (const slot of slots) {
      if (!slot.occupied || !slot.plantType) continue;
      const progress = getGrowthProgress(slot.plantedDay, slot.plantType, day);
      if (progress >= 1) {
        harvestKg += PLANTS[slot.plantType].yieldKg;
      }
    }

    if (harvestKg === 0) {
      set({
        logMessage: "Aucune plante prête — attendez la maturité.",
      });
      return;
    }

    const resetSlots = createInitialSlots();
    set({
      slots: resetSlots,
      totalHarvested: totalHarvested + harvestKg,
      cycles: cycles + 1,
      phase: "harvested",
      showHarvestBurst: true,
      logMessage: `Récolte : ${harvestKg.toFixed(1)} kg — ${Math.round(harvestKg * FCFA_PER_KG).toLocaleString("fr-FR")} FCFA économisés.`,
    });

    setTimeout(() => {
      set({ phase: "idle", showHarvestBurst: false });
    }, 2000);
  },

  reset: () => {
    set({
      day: 0,
      water: 80,
      selectedPlant: "laitue",
      slots: createInitialSlots(),
      isWatering: false,
      totalHarvested: 0,
      cycles: 0,
      phase: "idle",
      showHarvestBurst: false,
      showSensors: false,
      logMessage: "Simulation réinitialisée.",
    });
  },

  clearHarvestBurst: () => set({ showHarvestBurst: false }),

  tickWatering: () => {},

  toggleSensors: () =>
    set((s) => ({
      showSensors: !s.showSensors,
      logMessage: s.showSensors
        ? "Capteurs désactivés."
        : "Capteurs IoT activés — données en temps réel (simulation).",
    })),
}));

export function useSimMetrics() {
  const { day, water, slots, totalHarvested } = useSimulation();

  const activePlants = slots.filter((s) => s.occupied).length;
  let estimatedKg = 0;

  for (const slot of slots) {
    if (!slot.occupied || !slot.plantType) continue;
    const progress = getGrowthProgress(slot.plantedDay, slot.plantType, day);
    estimatedKg += PLANTS[slot.plantType].yieldKg * progress;
  }

  const economyFcfa = Math.round(
    totalHarvested * FCFA_PER_KG + estimatedKg * FCFA_PER_KG * 0.5
  );

  const currentDay = getMaxCycleDay(slots, day);
  const cycleDays = getMaxCycleTotal(slots);

  return {
    activePlants,
    water: Math.round(water),
    estimatedKg: estimatedKg.toFixed(1),
    economyFcfa,
    currentDay,
    cycleDays,
  };
}
