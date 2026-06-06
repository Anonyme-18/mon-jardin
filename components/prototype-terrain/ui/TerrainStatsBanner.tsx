"use client";

import {
  useTerrainMetrics,
  useTerrainSimulation,
} from "../hooks/useTerrainSimulation";

export function TerrainStatsBanner() {
  const {
    totalUnits,
    annualYieldKg,
    isIrrigating,
    irrigationFlowRate,
    greenhouseHumidityBoost,
    cycleReductionPct,
  } = useTerrainMetrics();

  return (
    <div className="pointer-events-none rounded-xl border border-sage-border bg-forest-dark/90 px-4 py-2 font-mono text-xs text-white shadow-lg backdrop-blur-sm">
      <p className="font-bold">
        {totalUnits.toLocaleString("fr-FR")} kits · ~{annualYieldKg.toLocaleString("fr-FR")} kg/an · 0 pompe électrique
      </p>
      {isIrrigating && (
        <p className="mt-1 text-sky-200">
          Irrigation — {irrigationFlowRate.toFixed(1)} L/min · cuve en baisse
        </p>
      )}
      {greenhouseHumidityBoost > 0 && (
        <p className="mt-1 text-emerald-200">
          Serre active — humidité +{greenhouseHumidityBoost} % · cycle −{cycleReductionPct} %
        </p>
      )}
    </div>
  );
}

export function GreenhouseEffectBadge() {
  const showGreenhouse = useTerrainSimulation((s) => s.showGreenhouse);
  const showSensors = useTerrainSimulation((s) => s.showSensors);

  if (!showGreenhouse) return null;

  return (
    <div
      className={
        showSensors
          ? "pointer-events-none rounded-lg border border-emerald-300/60 bg-emerald-500/90 px-3 py-1.5 font-mono text-[10px] text-white shadow-md backdrop-blur-sm"
          : "pointer-events-none rounded-lg border border-white/30 bg-white/80 px-3 py-1.5 font-mono text-[10px] text-forest shadow-md backdrop-blur-sm"
      }
    >
      {showSensors
        ? "Serre + capteurs couplés — microclimat optimisé"
        : "Activez les capteurs pour voir l'effet serre"}
    </div>
  );
}
