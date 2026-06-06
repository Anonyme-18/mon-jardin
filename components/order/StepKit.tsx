"use client";

import { KitCard } from "@/components/kits/KitCard";
import { formatPrice } from "@/lib/utils";
import { kits } from "@/lib/data";
import type { OrderFormData } from "@/lib/types";

interface StepKitProps {
  data: Partial<OrderFormData>;
  onChange: (updates: Partial<OrderFormData>) => void;
}

const mainKits = kits.filter((k) => k.category === "kit");
const entretien = kits.find((k) => k.slug === "entretien")!;
const recharge = kits.find((k) => k.slug === "recharge")!;

export function StepKit({ data, onChange }: StepKitProps) {
  const canAddEntretien =
    data.kitSlug === "kit-menage" || data.kitSlug === "kit-resto";

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-semibold text-forest-dark">
          Choisissez votre kit
        </h2>
        <p className="mt-2 text-forest/70">
          Sélectionnez le kit adapté à vos besoins.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mainKits.map((kit) => (
          <KitCard
            key={kit.slug}
            kit={kit}
            showSelect
            selected={data.kitSlug === kit.slug}
            onSelect={() => onChange({ kitSlug: kit.slug })}
          />
        ))}
      </div>

      {data.kitSlug && (
        <div className="space-y-4 rounded-xl border border-sage-border bg-white p-6 ring-1 ring-sage-border">
          <h3 className="font-display text-lg font-semibold text-forest-dark">
            Options complémentaires
          </h3>

          {canAddEntretien && (
            <label className="flex cursor-pointer items-start gap-4">
              <input
                type="checkbox"
                checked={data.addEntretien || false}
                onChange={(e) =>
                  onChange({ addEntretien: e.target.checked })
                }
                className="mt-1 h-5 w-5 rounded border-sage-border text-forest focus:ring-forest"
              />
              <div>
                <p className="font-medium text-forest-dark">
                  {entretien.name}
                </p>
                <p className="text-sm text-forest/70">{entretien.description}</p>
                <p className="mt-1 font-mono text-sm font-bold text-forest">
                  {formatPrice(entretien.price)}/mois
                </p>
              </div>
            </label>
          )}

          <label className="flex cursor-pointer items-start gap-4">
            <input
              type="checkbox"
              checked={data.addRecharge || false}
              onChange={(e) => onChange({ addRecharge: e.target.checked })}
              className="mt-1 h-5 w-5 rounded border-sage-border text-forest focus:ring-forest"
            />
            <div>
              <p className="font-medium text-forest-dark">{recharge.name}</p>
              <p className="text-sm text-forest/70">{recharge.description}</p>
              <p className="mt-1 font-mono text-sm font-bold text-forest">
                {formatPrice(recharge.price)}
              </p>
            </div>
          </label>
        </div>
      )}
    </div>
  );
}
