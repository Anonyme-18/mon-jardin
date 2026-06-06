"use client";

import { Droplets, FastForward, Eye, RotateCcw, Radio, Warehouse } from "lucide-react";
import { useTerrainSimulation, useTerrainMetrics } from "../hooks/useTerrainSimulation";
import { cn } from "@/lib/utils";

export function TerrainMetricsHUD() {
  const { rows, modulesPerRow, totalUnits, plants, yieldKg, waterLevel, day, rowGap } =
    useTerrainMetrics();

  const metrics = [
    { label: "Rangées", value: String(rows) },
    { label: "Kits / rangée", value: String(modulesPerRow) },
    { label: "Kits total", value: totalUnits.toLocaleString("fr-FR") },
    { label: "Plants", value: plants.toLocaleString("fr-FR") },
    { label: "Récolte est.", value: `${yieldKg.toLocaleString("fr-FR")} kg` },
    { label: "Cuve", value: `${waterLevel}%` },
    { label: "Jour", value: String(day) },
    { label: "Écart lignes", value: `${rowGap * 100} cm` },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="rounded-xl border border-sage-border bg-white/60 px-3 py-2 backdrop-blur-md"
        >
          <p className="text-[10px] uppercase tracking-wide text-forest/60">
            {m.label}
          </p>
          <p className="font-mono text-sm font-bold text-forest-dark">
            {m.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function TerrainControls() {
  const activateIrrigation = useTerrainSimulation((s) => s.activateIrrigation);
  const advanceDay = useTerrainSimulation((s) => s.advanceDay);
  const toggleLabels = useTerrainSimulation((s) => s.toggleLabels);
  const reset = useTerrainSimulation((s) => s.reset);
  const isIrrigating = useTerrainSimulation((s) => s.isIrrigating);
  const showSensors = useTerrainSimulation((s) => s.showSensors);
  const showGreenhouse = useTerrainSimulation((s) => s.showGreenhouse);
  const toggleSensors = useTerrainSimulation((s) => s.toggleSensors);
  const toggleGreenhouse = useTerrainSimulation((s) => s.toggleGreenhouse);

  const buttons = [
    {
      label: "Irrigation",
      icon: Droplets,
      onClick: activateIrrigation,
      disabled: isIrrigating,
      variant: "primary" as const,
    },
    {
      label: "+1 jour",
      icon: FastForward,
      onClick: advanceDay,
      variant: "secondary" as const,
    },
    {
      label: "Annotations",
      icon: Eye,
      onClick: toggleLabels,
      variant: "secondary" as const,
    },
    {
      label: "Capteurs",
      icon: Radio,
      onClick: toggleSensors,
      variant: showSensors ? ("amber" as const) : ("secondary" as const),
      active: showSensors,
    },
    {
      label: "Serre",
      icon: Warehouse,
      onClick: toggleGreenhouse,
      variant: showGreenhouse ? ("amber" as const) : ("secondary" as const),
      active: showGreenhouse,
    },
    {
      label: "Reset",
      icon: RotateCcw,
      onClick: reset,
      variant: "ghost" as const,
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {buttons.map(({ label, icon: Icon, onClick, variant, disabled, active }) => (
        <button
          key={label}
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 disabled:opacity-50",
            variant === "primary" &&
              "bg-forest text-white hover:bg-forest-dark",
            variant === "secondary" &&
              "border-2 border-forest bg-white/80 text-forest hover:bg-sage",
            variant === "amber" &&
              "bg-amber text-amber-dark hover:scale-[1.03]",
            active &&
              variant === "secondary" &&
              "border-amber bg-amber/20 text-amber-dark",
            variant === "ghost" &&
              "bg-white/60 text-forest/70 hover:bg-sage hover:text-forest"
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
