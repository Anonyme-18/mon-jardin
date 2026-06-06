"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Camera,
  Wallet,
  User,
  Fence,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FencePhotoUpload } from "./FencePhotoUpload";
import { LOME_NEIGHBORHOODS, formatPrice } from "@/lib/utils";
import type { FenceListing } from "@/lib/types";
import { cn } from "@/lib/utils";

export type FenceListingDraft = Omit<FenceListing, "id" | "available">;

const STEPS = [
  { id: 1, title: "Profil", icon: User },
  { id: 2, title: "Votre mur", icon: Fence },
  { id: 3, title: "Photos", icon: Camera },
  { id: 4, title: "Tarif", icon: Wallet },
  { id: 5, title: "Publication", icon: Check },
] as const;

const initialDraft: FenceListingDraft = {
  ownerName: "",
  phone: "",
  neighborhood: "",
  surfaceM2: 0,
  wallType: "Mur briques",
  exposition: "Plein soleil",
  pricePerMonth: 0,
  description: "",
  photos: [],
};

interface FenceListingPipelineProps {
  onSubmit: (listing: FenceListingDraft) => void;
}

export function FenceListingPipeline({ onSubmit }: FenceListingPipelineProps) {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<FenceListingDraft>(initialDraft);
  const [customNeighborhood, setCustomNeighborhood] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputClass =
    "w-full rounded-xl border border-sage-border bg-white px-4 py-3 ring-1 ring-sage-border focus:border-forest focus:outline-none focus:ring-forest";

  const update = <K extends keyof FenceListingDraft>(
    key: K,
    value: FenceListingDraft[K]
  ) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const resolvedNeighborhood =
    draft.neighborhood === "Autre (préciser)"
      ? customNeighborhood.trim()
      : draft.neighborhood;

  const validateStep = (current: number): boolean => {
    const nextErrors: Record<string, string> = {};

    if (current === 1) {
      if (!draft.ownerName.trim()) nextErrors.ownerName = "Nom requis";
      if (!draft.phone?.trim()) nextErrors.phone = "Téléphone requis";
      if (!draft.neighborhood) nextErrors.neighborhood = "Quartier requis";
      if (
        draft.neighborhood === "Autre (préciser)" &&
        !customNeighborhood.trim()
      ) {
        nextErrors.customNeighborhood = "Précisez le quartier";
      }
    }

    if (current === 2) {
      if (!draft.surfaceM2 || draft.surfaceM2 < 2) {
        nextErrors.surfaceM2 = "Minimum 2 m²";
      }
    }

    if (current === 3) {
      if (!draft.photos?.length) {
        nextErrors.photos = "Ajoutez au moins une photo du mur";
      }
    }

    if (current === 4) {
      if (!draft.pricePerMonth || draft.pricePerMonth < 1000) {
        nextErrors.pricePerMonth = "Minimum 1 000 FCFA/mois";
      }
      if (!draft.description.trim()) {
        nextErrors.description = "Description requise";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(5, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const publish = () => {
    if (!validateStep(4)) {
      setStep(4);
      return;
    }
    onSubmit({
      ...draft,
      neighborhood: resolvedNeighborhood,
      photos: draft.photos ?? [],
    });
    setDraft(initialDraft);
    setCustomNeighborhood("");
    setStep(1);
    setErrors({});
  };

  return (
    <div className="space-y-8">
      {/* Stepper */}
      <nav aria-label="Étapes de publication">
        <ol className="flex flex-wrap gap-2 sm:gap-0 sm:justify-between">
          {STEPS.map(({ id, title, icon: Icon }) => {
            const done = step > id;
            const active = step === id;
            return (
              <li
                key={id}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium sm:flex-1 sm:flex-col sm:px-2 sm:py-3 sm:text-center",
                  done && "bg-sage text-forest",
                  active && "bg-forest text-white",
                  !done && !active && "bg-cream-warm text-forest/50"
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:mb-1",
                    active && "bg-white/20",
                    done && "bg-forest/10",
                    !done && !active && "bg-white"
                  )}
                >
                  {done ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </span>
                <span className="hidden sm:inline">{title}</span>
                <span className="sm:hidden">{id}</span>
              </li>
            );
          })}
        </ol>
      </nav>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl border border-sage-border bg-cream-warm/50 p-6 sm:p-8"
        >
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-semibold text-forest-dark">
                  Qui propose le mur ?
                </h3>
                <p className="mt-1 text-sm text-forest/70">
                  Étape 1 — vos coordonnées pour la mise en relation.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-forest-dark">
                    Votre nom *
                  </label>
                  <input
                    value={draft.ownerName}
                    onChange={(e) => update("ownerName", e.target.value)}
                    className={inputClass}
                    placeholder="Ex : Komla Mensah"
                  />
                  {errors.ownerName && (
                    <p className="mt-1 text-sm text-soil">{errors.ownerName}</p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-forest-dark">
                    Téléphone WhatsApp *
                  </label>
                  <input
                    value={draft.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass}
                    placeholder="Ex : +228 90 00 00 00"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-soil">{errors.phone}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-forest-dark">
                    Quartier *
                  </label>
                  <select
                    value={draft.neighborhood}
                    onChange={(e) => update("neighborhood", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Choisir</option>
                    {LOME_NEIGHBORHOODS.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  {errors.neighborhood && (
                    <p className="mt-1 text-sm text-soil">
                      {errors.neighborhood}
                    </p>
                  )}
                </div>
                {draft.neighborhood === "Autre (préciser)" && (
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-forest-dark">
                      Précisez le quartier *
                    </label>
                    <input
                      value={customNeighborhood}
                      onChange={(e) => setCustomNeighborhood(e.target.value)}
                      className={inputClass}
                    />
                    {errors.customNeighborhood && (
                      <p className="mt-1 text-sm text-soil">
                        {errors.customNeighborhood}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-semibold text-forest-dark">
                  Caractéristiques du mur
                </h3>
                <p className="mt-1 text-sm text-forest/70">
                  Étape 2 — surface, matériau et exposition au soleil.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-forest-dark">
                    Surface disponible (m²) *
                  </label>
                  <input
                    type="number"
                    min={2}
                    value={draft.surfaceM2 || ""}
                    onChange={(e) =>
                      update("surfaceM2", Number(e.target.value) || 0)
                    }
                    className={inputClass}
                    placeholder="Ex : 6"
                  />
                  {errors.surfaceM2 && (
                    <p className="mt-1 text-sm text-soil">{errors.surfaceM2}</p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-forest-dark">
                    Type de clôture / mur *
                  </label>
                  <select
                    value={draft.wallType}
                    onChange={(e) =>
                      update(
                        "wallType",
                        e.target.value as FenceListing["wallType"]
                      )
                    }
                    className={inputClass}
                  >
                    <option value="Mur briques">Mur briques</option>
                    <option value="Clôture tôle">Clôture tôle</option>
                    <option value="Mur parpaing">Mur parpaing</option>
                    <option value="Grillage">Grillage</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-forest-dark">
                    Exposition *
                  </label>
                  <select
                    value={draft.exposition}
                    onChange={(e) =>
                      update(
                        "exposition",
                        e.target.value as FenceListing["exposition"]
                      )
                    }
                    className={inputClass}
                  >
                    <option value="Plein soleil">Plein soleil</option>
                    <option value="Mi-ombre">Mi-ombre</option>
                    <option value="Ombre partielle">Ombre partielle</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-semibold text-forest-dark">
                  Photos du mur
                </h3>
                <p className="mt-1 text-sm text-forest/70">
                  Étape 3 — importez depuis la galerie ou prenez une photo sur
                  place. Au moins 1 photo requise.
                </p>
              </div>
              <FencePhotoUpload
                photos={draft.photos ?? []}
                onChange={(photos) => update("photos", photos)}
                error={errors.photos}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-semibold text-forest-dark">
                  Tarif et description
                </h3>
                <p className="mt-1 text-sm text-forest/70">
                  Étape 4 — loyer mensuel souhaité et détails pour les
                  cultivateurs.
                </p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-forest-dark">
                  Loyer mensuel (FCFA) *
                </label>
                <input
                  type="number"
                  min={1000}
                  step={500}
                  value={draft.pricePerMonth || ""}
                  onChange={(e) =>
                    update("pricePerMonth", Number(e.target.value) || 0)
                  }
                  className={inputClass}
                  placeholder="Ex : 4000"
                />
                {errors.pricePerMonth && (
                  <p className="mt-1 text-sm text-soil">
                    {errors.pricePerMonth}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-forest-dark">
                  Description *
                </label>
                <textarea
                  rows={4}
                  value={draft.description}
                  onChange={(e) => update("description", e.target.value)}
                  className={inputClass}
                  placeholder="Accès, proximité de l'eau, hauteur du mur, horaires de visite..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-soil">{errors.description}</p>
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-xl font-semibold text-forest-dark">
                  Vérifier et publier
                </h3>
                <p className="mt-1 text-sm text-forest/70">
                  Étape 5 — récapitulatif avant mise en ligne sur la plateforme.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-3 rounded-xl bg-white p-4 text-sm">
                  <p>
                    <span className="text-forest/60">Propriétaire :</span>{" "}
                    <strong>{draft.ownerName}</strong>
                  </p>
                  <p>
                    <span className="text-forest/60">Téléphone :</span>{" "}
                    {draft.phone}
                  </p>
                  <p className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-forest/50" />
                    {resolvedNeighborhood || "—"}, Lomé
                  </p>
                  <p>
                    <span className="text-forest/60">Mur :</span>{" "}
                    {draft.wallType} — {draft.surfaceM2} m² — {draft.exposition}
                  </p>
                  <p className="font-mono text-lg font-bold text-forest">
                    {formatPrice(draft.pricePerMonth)}
                    <span className="text-sm font-normal text-forest/50">
                      /mois
                    </span>
                  </p>
                  <p className="text-forest/80">{draft.description}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(draft.photos ?? []).map((photo, i) => (
                    <div
                      key={i}
                      className="h-24 w-24 overflow-hidden rounded-lg border border-sage-border"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo}
                        alt={`Aperçu ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Button
          type="button"
          variant="ghost"
          onClick={goBack}
          disabled={step === 1}
          className="gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Retour
        </Button>

        {step < 5 ? (
          <Button type="button" variant="primary" onClick={goNext} className="gap-1">
            Continuer
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="button" variant="amber" onClick={publish}>
            Publier mon annonce
          </Button>
        )}
      </div>
    </div>
  );
}
