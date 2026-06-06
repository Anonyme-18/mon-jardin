"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  formatPrice,
  getKitBySlug,
  calculateOrderTotal,
  generateOrderId,
  LAST_ORDER_KEY,
} from "@/lib/utils";
import type { OrderFormData, SavedOrder } from "@/lib/types";

interface StepConfirmProps {
  data: OrderFormData;
}

export function StepConfirm({ data }: StepConfirmProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const kit = getKitBySlug(data.kitSlug);
  const entretien = getKitBySlug("entretien");
  const recharge = getKitBySlug("recharge");
  const total = calculateOrderTotal(data);

  const neighborhood =
    data.neighborhood === "Autre (préciser)"
      ? data.customNeighborhood
      : data.neighborhood;

  const handleConfirm = () => {
    setLoading(true);

    const orderId = generateOrderId();
    const savedOrder: SavedOrder = {
      ...data,
      orderId,
      total,
      createdAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(savedOrder));
    }

    setTimeout(() => {
      router.push("/confirmation");
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl font-semibold text-forest-dark">
          Confirmation de commande
        </h2>
        <p className="mt-2 text-forest/70">
          Vérifiez les détails avant de confirmer.
        </p>
      </div>

      <div className="space-y-4 rounded-xl border border-sage-border bg-white p-6 ring-1 ring-sage-border">
        <div>
          <h3 className="text-sm font-medium text-forest/50">Kit</h3>
          <p className="font-medium text-forest-dark">{kit?.name}</p>
          <p className="font-mono text-forest">
            {kit?.priceLabel || (kit ? formatPrice(kit.price) : "")}
          </p>
        </div>

        {(data.addEntretien || data.addRecharge) && (
          <div>
            <h3 className="text-sm font-medium text-forest/50">Options</h3>
            {data.addEntretien && (
              <p className="text-forest-dark">
                {entretien?.name} — {formatPrice(entretien?.price || 0)}/mois
              </p>
            )}
            {data.addRecharge && (
              <p className="text-forest-dark">
                {recharge?.name} — {formatPrice(recharge?.price || 0)}
              </p>
            )}
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium text-forest/50">Contact</h3>
          <p className="text-forest-dark">{data.fullName}</p>
          <p className="text-forest-dark">{data.phone}</p>
          {data.email && <p className="text-forest-dark">{data.email}</p>}
          <p className="text-forest-dark">{data.clientType}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-forest/50">Livraison</h3>
          <p className="text-forest-dark">
            {neighborhood} — {data.address}
          </p>
          <p className="text-forest-dark">
            Date souhaitée :{" "}
            {new Date(data.preferredDate).toLocaleDateString("fr-FR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {data.specialInstructions && (
            <p className="text-sm text-forest/70">
              {data.specialInstructions}
            </p>
          )}
        </div>
      </div>

      <div className="rounded-xl bg-sage/50 p-6 text-center">
        <p className="text-sm text-forest/70">Total à payer</p>
        <p className="font-mono text-[32px] font-bold text-forest">
          {formatPrice(total)}
        </p>
      </div>

      <p className="text-center text-sm text-forest/60">
        Paiement à la livraison — notre équipe vous contacte sous 24h
      </p>

      <Button
        variant="amber"
        size="lg"
        className="w-full"
        onClick={handleConfirm}
        disabled={loading}
      >
        {loading ? "Enregistrement..." : "Confirmer ma commande"}
      </Button>
    </div>
  );
}
