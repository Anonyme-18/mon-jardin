"use client";

import { useSimulation, useSimMetrics } from "../hooks/useSimulation";
import { formatPrice } from "@/lib/utils";

export function MetricsHUD() {
  const { activePlants, water, estimatedKg, economyFcfa } = useSimMetrics();

  const metrics = [
    { label: "Plants actifs", value: String(activePlants) },
    { label: "Réservoir", value: `${water}%` },
    { label: "Récolte est.", value: `${estimatedKg} kg` },
    { label: "Économie", value: formatPrice(economyFcfa) },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
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
