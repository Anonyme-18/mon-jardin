"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FenceCard } from "./FenceCard";
import { FenceRoleSwitch } from "./FenceRoleSwitch";
import { FenceLandlordDashboard } from "./FenceLandlordDashboard";
import {
  FenceListingPipeline,
  type FenceListingDraft,
} from "./FenceListingPipeline";
import { useToast } from "@/components/ui/use-toast";
import {
  loadFenceListings,
  saveCustomFenceListing,
  saveOwnerProfile,
  loadOwnerProfile,
  addMyListingId,
  getMyListings,
  updateCustomListing,
  saveFenceRole,
  loadFenceRole,
  type FenceMarketplaceRole,
} from "@/lib/fenceData";
import type { FenceListing } from "@/lib/types";
import { cn } from "@/lib/utils";

type BailleurView = "dashboard" | "pipeline";

export function FenceMarketplace() {
  const [listings, setListings] = useState<FenceListing[]>([]);
  const [role, setRole] = useState<FenceMarketplaceRole>("client");
  const [bailleurView, setBailleurView] = useState<BailleurView>("dashboard");
  const [filterNeighborhood, setFilterNeighborhood] = useState("all");
  const [ownerProfile, setOwnerProfile] = useState(
    () => loadOwnerProfile()
  );
  const { toast } = useToast();

  const refreshListings = useCallback(() => {
    setListings(loadFenceListings());
    setOwnerProfile(loadOwnerProfile());
  }, []);

  useEffect(() => {
    refreshListings();
    setRole(loadFenceRole());

    const params = new URLSearchParams(window.location.search);
    if (params.get("role") === "bailleur") {
      setRole("bailleur");
      saveFenceRole("bailleur");
    }
  }, [refreshListings]);

  const handleRoleChange = (next: FenceMarketplaceRole) => {
    setRole(next);
    saveFenceRole(next);
    setBailleurView("dashboard");

    const url = new URL(window.location.href);
    if (next === "bailleur") {
      url.searchParams.set("role", "bailleur");
    } else {
      url.searchParams.delete("role");
    }
    window.history.replaceState({}, "", url.toString());
  };

  const neighborhoods = [
    "all",
    ...Array.from(new Set(listings.map((l) => l.neighborhood))).sort(),
  ];

  const filtered =
    filterNeighborhood === "all"
      ? listings.filter((l) => l.available)
      : listings.filter(
          (l) => l.available && l.neighborhood === filterNeighborhood
        );

  const availableCount = listings.filter((l) => l.available).length;
  const myListings = getMyListings(listings);

  const handleReserve = (listing: FenceListing) => {
    toast({
      title: "Demande envoyée",
      description: `Notre équipe vous met en relation avec ${listing.ownerName} sous 24h.`,
    });
  };

  const handleNewListing = (data: FenceListingDraft) => {
    const listing: FenceListing = {
      ...data,
      id: `cl-${Date.now()}`,
      available: true,
    };

    saveCustomFenceListing(listing);
    if (data.phone) {
      saveOwnerProfile({ name: data.ownerName, phone: data.phone });
    }
    addMyListingId(listing.id);
    refreshListings();

    setRole("bailleur");
    saveFenceRole("bailleur");
    setBailleurView("dashboard");

    toast({
      title: "Annonce publiée",
      description: "Votre mur est en ligne — consultez votre espace bailleur.",
    });
  };

  const handleToggleAvailable = (listing: FenceListing) => {
    const ok = updateCustomListing(listing.id, {
      available: !listing.available,
    });
    if (!ok) {
      toast({
        title: "Action impossible",
        description: "Seules vos annonces publiées peuvent être modifiées.",
      });
      return;
    }
    refreshListings();
    toast({
      title: listing.available ? "Annonce masquée" : "Annonce en ligne",
      description: listing.available
        ? "Votre mur n'apparaît plus aux cultivateurs."
        : "Votre mur est de nouveau visible.",
    });
  };

  return (
    <div className="space-y-8">
      <FenceRoleSwitch role={role} onChange={handleRoleChange} />

      {role === "client" && (
        <>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold text-forest-dark">
                Trouver un mur à Lomé
              </h2>
              <p className="mt-1 text-sm text-forest/70">
                Parcourez les clôtures disponibles et réservez un emplacement pour
                votre kit Mon Jardin.
              </p>
            </div>
            <p className="font-mono text-sm text-forest/70">
              {availableCount} mur{availableCount > 1 ? "s" : ""} disponible
              {availableCount > 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {neighborhoods.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setFilterNeighborhood(n)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-all",
                  filterNeighborhood === n
                    ? "bg-forest text-white"
                    : "border border-sage-border bg-white text-forest hover:bg-sage"
                )}
              >
                {n === "all" ? "Tous les quartiers" : n}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <FenceCard listing={listing} onReserve={handleReserve} />
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-forest/60">
            Mur réservé ?{" "}
            <Link href="/commander?kit=kit-menage" className="text-forest underline">
              Commandez votre kit Mon Jardin →
            </Link>
            {" · "}
            <button
              type="button"
              onClick={() => handleRoleChange("bailleur")}
              className="text-forest underline"
            >
              Vous avez un mur à louer ?
            </button>
          </p>
        </>
      )}

      {role === "bailleur" && bailleurView === "dashboard" && (
        <FenceLandlordDashboard
          owner={ownerProfile}
          listings={myListings}
          onToggleAvailable={handleToggleAvailable}
          onNewListing={() => setBailleurView("pipeline")}
        />
      )}

      {role === "bailleur" && bailleurView === "pipeline" && (
        <div className="rounded-xl border border-sage-border bg-white p-6 ring-1 ring-sage-border sm:p-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold text-forest-dark">
                Publier un mur
              </h2>
              <p className="mt-1 text-sm text-forest/70">
                Parcours en 5 étapes avec photos — retour au tableau de bord à la
                fin.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setBailleurView("dashboard")}
              className="text-sm font-medium text-forest underline-offset-2 hover:underline"
            >
              ← Retour à mes annonces
            </button>
          </div>
          <FenceListingPipeline onSubmit={handleNewListing} />
        </div>
      )}
    </div>
  );
}
