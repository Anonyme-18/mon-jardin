"use client";

import { cn } from "@/lib/utils";

type FilterType = "all" | "kit" | "service" | "addon";

interface KitFilterProps {
  active: FilterType;
  onChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "kit", label: "Kits" },
  { value: "service", label: "Services" },
  { value: "addon", label: "Recharges" },
];

export function KitFilter({ active, onChange }: KitFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onChange(filter.value)}
          className={cn(
            "rounded-full px-6 py-2 text-sm font-medium transition-all duration-300",
            active === filter.value
              ? "bg-forest text-white"
              : "border-2 border-forest bg-transparent text-forest hover:bg-sage"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
