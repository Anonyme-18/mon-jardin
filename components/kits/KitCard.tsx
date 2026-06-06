"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import type { Kit } from "@/lib/types";
import { cn } from "@/lib/utils";

interface KitCardProps {
  kit: Kit;
  selected?: boolean;
  onSelect?: () => void;
  showSelect?: boolean;
}

export function KitCard({
  kit,
  selected = false,
  onSelect,
  showSelect = false,
}: KitCardProps) {
  const content = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl">
        <Image
          src={kit.image}
          alt={kit.name}
          fill
          className="object-cover warm-image transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {kit.popular && (
          <div className="absolute left-4 top-4">
            <Badge variant="amber">Plus populaire</Badge>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-forest-dark">
          {kit.name}
        </h3>
        <p className="mt-2 text-sm text-forest/70">{kit.description}</p>

        <p className="mt-4 font-mono text-xl font-bold text-forest">
          {kit.priceLabel || formatPrice(kit.price)}
        </p>

        {kit.deliveryTime && (
          <p className="mt-2 text-xs text-forest/50">
            Livraison : {kit.deliveryTime}
          </p>
        )}

        {!showSelect && (
          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-forest transition-colors group-hover:text-forest-dark">
            {kit.slug === "location-cloture"
              ? "Accéder à la plateforme"
              : "Voir le détail"}
            <ArrowRight className="h-4 w-4" />
          </div>
        )}

        {showSelect && selected && (
          <div className="mt-4 text-sm font-medium text-forest">
            ✓ Sélectionné
          </div>
        )}
      </div>
    </>
  );

  const cardClasses = cn(
    "group block overflow-hidden rounded-xl border border-sage-border bg-white ring-1 ring-sage-border transition-all duration-300",
    kit.popular && "ring-2 ring-amber",
    selected && "ring-2 ring-forest",
    showSelect
      ? "cursor-pointer hover:scale-[1.02] hover:shadow-green-soft"
      : "hover:scale-[1.02] hover:shadow-green-soft"
  );

  if (showSelect && onSelect) {
    return (
      <motion.button
        type="button"
        onClick={onSelect}
        className={cn(cardClasses, "w-full text-left")}
        whileHover={{ scale: 1.02 }}
      >
        {content}
      </motion.button>
    );
  }

  const detailHref =
    kit.slug === "location-cloture"
      ? "/services/clotures"
      : `/kits/${kit.slug}`;

  return (
    <Link href={detailHref} className={cardClasses}>
      {content}
    </Link>
  );
}
