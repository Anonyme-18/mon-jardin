"use client";

import { Sprout, KeyRound } from "lucide-react";
import type { FenceMarketplaceRole } from "@/lib/fenceData";
import { cn } from "@/lib/utils";

interface FenceRoleSwitchProps {
  role: FenceMarketplaceRole;
  onChange: (role: FenceMarketplaceRole) => void;
}

const ROLES = [
  {
    id: "client" as const,
    label: "Cultivateur",
    description: "Je cherche un mur",
    icon: Sprout,
  },
  {
    id: "bailleur" as const,
    label: "Bailleur",
    description: "Je loue mon mur",
    icon: KeyRound,
  },
];

export function FenceRoleSwitch({ role, onChange }: FenceRoleSwitchProps) {
  return (
    <div className="rounded-2xl border border-sage-border bg-white p-2 ring-1 ring-sage-border">
      <div className="grid grid-cols-2 gap-2">
        {ROLES.map(({ id, label, description, icon: Icon }) => {
          const active = role === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={cn(
                "flex flex-col items-start gap-2 rounded-xl px-4 py-4 text-left transition-all",
                active
                  ? "bg-forest text-white shadow-sm"
                  : "bg-cream-warm text-forest hover:bg-sage/60"
              )}
            >
              <Icon className={cn("h-5 w-5", active ? "text-amber" : "text-forest/70")} />
              <span className="font-display text-base font-semibold">{label}</span>
              <span
                className={cn(
                  "text-xs",
                  active ? "text-white/80" : "text-forest/60"
                )}
              >
                {description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
