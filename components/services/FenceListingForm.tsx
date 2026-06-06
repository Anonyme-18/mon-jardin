"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LOME_NEIGHBORHOODS } from "@/lib/utils";
import type { FenceListing } from "@/lib/types";

interface FenceListingFormProps {
  onSubmit: (listing: Omit<FenceListing, "id" | "available">) => void;
}

interface FormValues {
  ownerName: string;
  neighborhood: string;
  customNeighborhood: string;
  surfaceM2: number;
  wallType: FenceListing["wallType"];
  exposition: FenceListing["exposition"];
  pricePerMonth: number;
  description: string;
}

export function FenceListingForm({ onSubmit }: FenceListingFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      wallType: "Mur briques",
      exposition: "Plein soleil",
      neighborhood: "",
    },
  });

  const neighborhood = watch("neighborhood");
  const showCustom = neighborhood === "Autre (préciser)";

  const submit = (values: FormValues) => {
    onSubmit({
      ownerName: values.ownerName,
      neighborhood:
        values.neighborhood === "Autre (préciser)"
          ? values.customNeighborhood
          : values.neighborhood,
      surfaceM2: Number(values.surfaceM2),
      wallType: values.wallType,
      exposition: values.exposition,
      pricePerMonth: Number(values.pricePerMonth),
      description: values.description,
    });
    reset();
  };

  const inputClass =
    "w-full rounded-xl border border-sage-border bg-white px-4 py-3 ring-1 ring-sage-border focus:border-forest focus:outline-none focus:ring-forest";

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-forest-dark">
            Votre nom *
          </label>
          <input
            {...register("ownerName", { required: "Requis" })}
            className={inputClass}
            placeholder="Ex : Komla Mensah"
          />
          {errors.ownerName && (
            <p className="mt-1 text-sm text-soil">{errors.ownerName.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-forest-dark">
            Quartier *
          </label>
          <select
            {...register("neighborhood", { required: "Requis" })}
            className={inputClass}
          >
            <option value="">Choisir</option>
            {LOME_NEIGHBORHOODS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {showCustom && (
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-forest-dark">
              Précisez le quartier *
            </label>
            <input
              {...register("customNeighborhood", {
                required: showCustom ? "Requis" : false,
              })}
              className={inputClass}
            />
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-forest-dark">
            Surface disponible (m²) *
          </label>
          <input
            {...register("surfaceM2", {
              required: "Requis",
              min: { value: 2, message: "Minimum 2 m²" },
            })}
            type="number"
            min={2}
            className={inputClass}
            placeholder="Ex : 6"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-forest-dark">
            Type de clôture / mur *
          </label>
          <select {...register("wallType")} className={inputClass}>
            <option value="Mur briques">Mur briques</option>
            <option value="Clôture tôle">Clôture tôle</option>
            <option value="Mur parpaing">Mur parpaing</option>
            <option value="Grillage">Grillage</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-forest-dark">
            Exposition *
          </label>
          <select {...register("exposition")} className={inputClass}>
            <option value="Plein soleil">Plein soleil</option>
            <option value="Mi-ombre">Mi-ombre</option>
            <option value="Ombre partielle">Ombre partielle</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-forest-dark">
            Loyer mensuel souhaité (FCFA) *
          </label>
          <input
            {...register("pricePerMonth", {
              required: "Requis",
              min: { value: 1000, message: "Minimum 1 000 FCFA" },
            })}
            type="number"
            min={1000}
            step={500}
            className={inputClass}
            placeholder="Ex : 4000"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-forest-dark">
          Description *
        </label>
        <textarea
          {...register("description", { required: "Requis" })}
          rows={3}
          className={inputClass}
          placeholder="Décrivez votre mur ou clôture, l'accès, la proximité de l'eau..."
        />
      </div>

      <Button type="submit" variant="primary">
        Publier mon annonce
      </Button>
    </form>
  );
}
