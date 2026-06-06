"use client";

import { PLANT_TYPES, PLANTS, type PlantType } from "@/lib/plantData";
import { useSimulation } from "../hooks/useSimulation";
import { cn } from "@/lib/utils";

export function PlantPicker() {
  const selectedPlant = useSimulation((s) => s.selectedPlant);
  const setSelectedPlant = useSimulation((s) => s.setSelectedPlant);

  return (
    <div className="flex flex-wrap gap-2">
      {PLANT_TYPES.map((type) => {
        const plant = PLANTS[type];
        const active = selectedPlant === type;
        return (
          <button
            key={type}
            type="button"
            onClick={() => setSelectedPlant(type)}
            className={cn(
              "flex min-w-[72px] flex-col items-center rounded-xl border px-2 py-2 text-xs transition-all duration-300",
              active
                ? "border-forest bg-forest text-white"
                : "border-sage-border bg-white text-forest hover:bg-sage"
            )}
          >
            <span className="text-lg">{plant.emoji}</span>
            <span className="font-medium">{plant.label}</span>
            <span className={cn("font-mono text-[10px]", active ? "text-sage-muted" : "text-forest/50")}>
              {plant.cycleDays}j
            </span>
          </button>
        );
      })}
    </div>
  );
}
