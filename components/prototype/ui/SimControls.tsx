"use client";

import {
  Sprout,
  Droplets,
  FastForward,
  Wheat,
  RotateCcw,
  Radio,
  Fence,
} from "lucide-react";
import Link from "next/link";
import { useSimulation } from "../hooks/useSimulation";
import { PlantPicker } from "./PlantPicker";
import { GuidedTourButton } from "./GuidedTourOverlay";
import { cn } from "@/lib/utils";

interface SimControlsProps {
  className?: string;
}

export function SimControls({ className }: SimControlsProps) {
  const plantAll = useSimulation((s) => s.plantAll);
  const activateWater = useSimulation((s) => s.activateWater);
  const advanceDays = useSimulation((s) => s.advanceDays);
  const harvest = useSimulation((s) => s.harvest);
  const reset = useSimulation((s) => s.reset);
  const isWatering = useSimulation((s) => s.isWatering);
  const phase = useSimulation((s) => s.phase);
  const showSensors = useSimulation((s) => s.showSensors);
  const toggleSensors = useSimulation((s) => s.toggleSensors);

  const buttons = [
    {
      label: "Planter",
      icon: Sprout,
      onClick: plantAll,
      variant: "primary" as const,
    },
    {
      label: "Irrigation",
      icon: Droplets,
      onClick: activateWater,
      variant: "secondary" as const,
      disabled: isWatering,
    },
    {
      label: "+5 jours",
      icon: FastForward,
      onClick: () => advanceDays(5),
      variant: "secondary" as const,
    },
    {
      label: "Récolter",
      icon: Wheat,
      onClick: harvest,
      variant: "amber" as const,
      disabled: phase !== "ready",
    },
    {
      label: "Capteurs",
      icon: Radio,
      onClick: toggleSensors,
      variant: showSensors ? ("amber" as const) : ("secondary" as const),
      active: showSensors,
    },
    {
      label: "Reset",
      icon: RotateCcw,
      onClick: reset,
      variant: "ghost" as const,
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-2xl border border-sage-border bg-white/80 p-4 backdrop-blur-md md:flex-row md:items-center md:justify-center",
        className
      )}
    >
      <PlantPicker />

      <div className="hidden h-10 w-px bg-sage-border md:block" />

      <div className="flex flex-wrap justify-center gap-2">
        <GuidedTourButton />
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
                "border-2 border-forest bg-transparent text-forest hover:bg-sage",
              variant === "amber" &&
                "bg-amber text-amber-dark hover:scale-[1.03]",
              active &&
                variant === "secondary" &&
                "border-amber bg-amber/20 text-amber-dark",
              variant === "ghost" &&
                "text-forest/70 hover:bg-sage hover:text-forest"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
        <Link
          href="/services/clotures"
          className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-forest/40 bg-white/60 px-4 py-2 text-sm font-medium text-forest transition-all hover:border-forest hover:bg-sage"
        >
          <Fence className="h-4 w-4" />
          Pas de mur ?
        </Link>
      </div>
    </div>
  );
}
