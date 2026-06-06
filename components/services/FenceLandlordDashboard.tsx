"use client";

import { MapPin, Sun, ToggleLeft, ToggleRight, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/button";
import { ContentImage } from "@/components/ui/ContentImage";
import { getFenceListingImage } from "@/lib/images";
import { formatPrice } from "@/lib/utils";
import type { FenceListing } from "@/lib/types";
import type { FenceOwnerProfile } from "@/lib/fenceData";

interface FenceLandlordDashboardProps {
  owner: FenceOwnerProfile | null;
  listings: FenceListing[];
  onToggleAvailable: (listing: FenceListing) => void;
  onNewListing: () => void;
}

export function FenceLandlordDashboard({
  owner,
  listings,
  onToggleAvailable,
  onNewListing,
}: FenceLandlordDashboardProps) {
  const available = listings.filter((l) => l.available).length;
  const monthlyPotential = listings
    .filter((l) => l.available)
    .reduce((sum, l) => sum + l.pricePerMonth, 0);

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-amber/30 bg-amber/10 px-4 py-3 text-sm text-amber-dark">
        <strong>Espace bailleur</strong> — gérez vos murs, vos tarifs et votre
        disponibilité. Les cultivateurs vous contactent via Mon Jardin.
      </div>

      {owner && (
        <p className="font-mono text-sm text-forest/70">
          Connecté en tant que <strong>{owner.name}</strong> · {owner.phone}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-sage-border bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-forest/50">
            Mes annonces
          </p>
          <p className="font-mono text-2xl font-bold text-forest">
            {listings.length}
          </p>
        </div>
        <div className="rounded-xl border border-sage-border bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-forest/50">
            Disponibles
          </p>
          <p className="font-mono text-2xl font-bold text-forest">{available}</p>
        </div>
        <div className="rounded-xl border border-sage-border bg-white p-4">
          <p className="text-xs uppercase tracking-wide text-forest/50">
            Revenu potentiel
          </p>
          <p className="font-mono text-lg font-bold text-forest">
            {formatPrice(monthlyPotential)}
            <span className="text-sm font-normal text-forest/50">/mois</span>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-xl font-semibold text-forest-dark">
          Mes murs en location
        </h2>
        <Button type="button" variant="amber" onClick={onNewListing} className="gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle annonce
        </Button>
      </div>

      {listings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-sage-border bg-cream-warm px-6 py-12 text-center">
          <p className="font-display text-lg text-forest-dark">
            Aucune annonce pour le moment
          </p>
          <p className="mt-2 text-sm text-forest/70">
            Publiez votre premier mur en quelques minutes — photos, tarif et
            description inclus.
          </p>
          <Button
            type="button"
            variant="primary"
            className="mt-6"
            onClick={onNewListing}
          >
            Publier mon mur
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {listings.map((listing) => (
            <article
              key={listing.id}
              className="overflow-hidden rounded-xl border border-sage-border bg-white ring-1 ring-sage-border"
            >
              <ContentImage
                src={getFenceListingImage(listing)}
                alt={`${listing.wallType} — ${listing.neighborhood}`}
                aspect="video"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="p-5">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display font-semibold text-forest-dark">
                      {listing.wallType} — {listing.surfaceM2} m²
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-forest/70">
                      <MapPin className="h-3.5 w-3.5" />
                      {listing.neighborhood}
                    </p>
                  </div>
                  <Badge variant={listing.available ? "default" : "amber"}>
                    {listing.available ? "En ligne" : "Masqué"}
                  </Badge>
                </div>

                <div className="mb-4 flex flex-wrap gap-3 text-xs text-forest/60">
                  <span className="inline-flex items-center gap-1">
                    <Sun className="h-3.5 w-3.5" />
                    {listing.exposition}
                  </span>
                  <span className="font-mono font-bold text-forest">
                    {formatPrice(listing.pricePerMonth)}/mois
                  </span>
                </div>

                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="w-full gap-2"
                  onClick={() => onToggleAvailable(listing)}
                >
                  {listing.available ? (
                    <>
                      <ToggleRight className="h-4 w-4" />
                      Retirer de la marketplace
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="h-4 w-4" />
                      Remettre en ligne
                    </>
                  )}
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
