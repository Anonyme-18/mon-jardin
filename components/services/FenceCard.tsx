"use client";

import { MapPin, Sun, Ruler, User } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { FenceListing } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FenceCardProps {
  listing: FenceListing;
  onReserve: (listing: FenceListing) => void;
}

export function FenceCard({ listing, onReserve }: FenceCardProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-sage-border bg-white p-6 ring-1 ring-sage-border transition-all duration-300",
        listing.available
          ? "hover:scale-[1.01] hover:shadow-green-soft"
          : "opacity-60"
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-forest-dark">
            {listing.wallType} — {listing.surfaceM2} m²
          </h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-forest/70">
            <MapPin className="h-3.5 w-3.5" />
            {listing.neighborhood}, Lomé
          </p>
        </div>
        <Badge variant={listing.available ? "default" : "amber"}>
          {listing.available ? "Disponible" : "Loué"}
        </Badge>
      </div>

      <p className="text-sm leading-relaxed text-forest/70">
        {listing.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-forest/60">
        <span className="inline-flex items-center gap-1">
          <Sun className="h-3.5 w-3.5" />
          {listing.exposition}
        </span>
        <span className="inline-flex items-center gap-1">
          <Ruler className="h-3.5 w-3.5" />
          {listing.surfaceM2} m²
        </span>
        <span className="inline-flex items-center gap-1">
          <User className="h-3.5 w-3.5" />
          {listing.ownerName}
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="font-mono text-xl font-bold text-forest">
          {formatPrice(listing.pricePerMonth)}
          <span className="text-sm font-normal text-forest/50">/mois</span>
        </p>
        <Button
          variant="amber"
          size="sm"
          disabled={!listing.available}
          onClick={() => onReserve(listing)}
        >
          Réserver
        </Button>
      </div>
    </article>
  );
}
