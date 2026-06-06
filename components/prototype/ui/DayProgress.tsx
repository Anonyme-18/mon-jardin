"use client";

import { cn } from "@/lib/utils";
import { getPhaseLabel } from "@/lib/plantData";
import { useSimulation, useSimMetrics } from "../hooks/useSimulation";

export function DayProgress() {
  const phase = useSimulation((s) => s.phase);
  const { currentDay, cycleDays } = useSimMetrics();

  const progress =
    cycleDays > 0 ? Math.min(100, (currentDay / cycleDays) * 100) : 0;
  const phaseLabel = getPhaseLabel(progress / 100);

  return (
    <div className="w-full px-4">
      <div className="mb-1 flex justify-between text-xs text-forest/70">
        <span>
          Jour {currentDay} / {cycleDays} jours
        </span>
        <span className="font-medium">{phaseLabel}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-sage">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            phase === "ready"
              ? "animate-pulse bg-amber"
              : "bg-forest"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
