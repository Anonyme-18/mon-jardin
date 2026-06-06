"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FenceCard } from "./FenceCard";
import { FenceListingForm } from "./FenceListingForm";
import { useToast } from "@/components/ui/use-toast";
import {
  loadFenceListings,
  saveCustomFenceListing,
} from "@/lib/fenceData";
import type { FenceListing } from "@/lib/types";
import { cn } from "@/lib/utils";

type Tab = "browse" | "offer";

export function FenceMarketplace() {
  const [listings, setListings] = useState<FenceListing[]>([]);
  const [tab, setTab] = useState<Tab>("browse");
  const [filterNeighborhood, setFilterNeighborhood] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    setListings(loadFenceListings());
  }, []);

  const neighborhoods = [
    "all",
    ...Array.from(new Set(listings.map((l) => l.neighborhood))).sort(),
  ];

  const filtered =
    filterNeighborhood === "all"
      ? listings
      : listings.filter((l) => l.neighborhood === filterNeighborhood);

  const availableCount = listings.filter((l) => l.available).length;

  const handleReserve = (listing: FenceListing) => {
    toast({
      title: "Demande envoyée",
      description: `Notre équipe vous met en relation avec ${listing.ownerName} sous 24h.`,
    });
  };

  const handleNewListing = (
    data: Omit<FenceListing, "id" | "available">
  ) => {
    const listing: FenceListing = {
      ...data,
      id: `cl-${Date.now()}`,
      available: true,
    };
    saveCustomFenceListing(listing);
    setListings(loadFenceListings());
    setTab("browse");
    toast({
      title: "Annonce publiée",
      description: "Votre clôture est visible sur la plateforme Mon Jardin.",
    });
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex rounded-full border-2 border-forest p-1">
          <button
            type="button"
            onClick={() => setTab("browse")}
            className={cn(
              "rounded-full px-6 py-2 text-sm font-medium transition-all",
              tab === "browse"
                ? "bg-forest text-white"
                : "text-forest hover:bg-sage"
            )}
          >
            Trouver une clôture
          </button>
          <button
            type="button"
            onClick={() => setTab("offer")}
            className={cn(
              "rounded-full px-6 py-2 text-sm font-medium transition-all",
              tab === "offer"
                ? "bg-forest text-white"
                : "text-forest hover:bg-sage"
            )}
          >
            Louer ma clôture
          </button>
        </div>

        <p className="font-mono text-sm text-forest/70">
          {availableCount} clôture{availableCount > 1 ? "s" : ""} disponible
          {availableCount > 1 ? "s" : ""} à Lomé
        </p>
      </div>

      {tab === "browse" && (
        <>
          <div className="mb-8 flex flex-wrap gap-2">
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

          <p className="mt-8 text-center text-sm text-forest/60">
            Vous avez réservé une clôture ?{" "}
            <Link href="/commander?kit=kit-menage" className="text-forest underline">
              Commandez votre kit Mon Jardin →
            </Link>
          </p>
        </>
      )}

      {tab === "offer" && (
        <div className="rounded-xl border border-sage-border bg-white p-8 ring-1 ring-sage-border">
          <h2 className="font-display text-2xl font-semibold text-forest-dark">
            Proposer votre mur ou clôture
          </h2>
          <p className="mt-2 text-forest/70">
            Vous avez un mur ou une clôture inutilisé ? Louez-le à un cultivateur
            qui souhaite installer un kit Mon Jardin. Mon Jardin prend 10 % de
            commission — le reste vous revient.
          </p>
          <div className="mt-8">
            <FenceListingForm onSubmit={handleNewListing} />
          </div>
        </div>
      )}
    </div>
  );
}
