"use client";

import Image from "next/image";
import { formatPrice, getKitBySlug, calculateOrderTotal } from "@/lib/utils";
import type { OrderFormData } from "@/lib/types";

interface OrderSummaryProps {
  data: Partial<OrderFormData>;
}

export function OrderSummary({ data }: OrderSummaryProps) {
  const selectedKit = data.kitSlug ? getKitBySlug(data.kitSlug) : null;
  const entretien = getKitBySlug("entretien");
  const recharge = getKitBySlug("recharge");
  const total = calculateOrderTotal(data);

  return (
    <div className="sticky top-24 rounded-xl border border-sage-border bg-white p-6 ring-1 ring-sage-border">
      <h3 className="font-display text-lg font-semibold text-forest-dark">
        Récapitulatif
      </h3>

      {selectedKit ? (
        <>
          <div className="relative mt-4 aspect-video overflow-hidden rounded-lg">
            <Image
              src={selectedKit.image}
              alt={selectedKit.name}
              fill
              className="object-cover warm-image"
              sizes="300px"
            />
          </div>
          <p className="mt-4 font-medium text-forest-dark">
            {selectedKit.name}
          </p>
          <p className="font-mono text-lg font-bold text-forest">
            {selectedKit.priceLabel || formatPrice(selectedKit.price)}
          </p>
        </>
      ) : (
        <p className="mt-4 text-sm text-forest/50">
          Sélectionnez un kit pour voir le récapitulatif
        </p>
      )}

      {(data.addEntretien || data.addRecharge) && (
        <div className="mt-4 space-y-2 border-t border-sage-border pt-4">
          <p className="text-sm font-medium text-forest-dark">Options</p>
          {data.addEntretien && entretien && (
            <div className="flex justify-between text-sm">
              <span>{entretien.name}</span>
              <span className="font-mono">{formatPrice(entretien.price)}/mois</span>
            </div>
          )}
          {data.addRecharge && recharge && (
            <div className="flex justify-between text-sm">
              <span>{recharge.name}</span>
              <span className="font-mono">{formatPrice(recharge.price)}</span>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 border-t border-sage-border pt-4">
        <div className="flex justify-between">
          <span className="font-medium text-forest-dark">Total</span>
          <span className="font-mono text-xl font-bold text-forest">
            {formatPrice(total)}
          </span>
        </div>
        {selectedKit?.deliveryTime && (
          <p className="mt-2 text-xs text-forest/50">
            Délai estimé : {selectedKit.deliveryTime}
          </p>
        )}
      </div>
    </div>
  );
}
