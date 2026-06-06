"use client";

import { useForm } from "react-hook-form";
import { LOME_NEIGHBORHOODS, getMinDeliveryDate, isDateDisabled } from "@/lib/utils";
import type { OrderFormData } from "@/lib/types";

interface StepDeliveryProps {
  data: Partial<OrderFormData>;
  onChange: (updates: Partial<OrderFormData>) => void;
  onValid: () => void;
}

interface DeliveryFormValues {
  neighborhood: string;
  customNeighborhood: string;
  address: string;
  preferredDate: string;
  specialInstructions: string;
}

export function StepDelivery({ data, onChange, onValid }: StepDeliveryProps) {
  const minDate = getMinDeliveryDate();
  const minDateStr = minDate.toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DeliveryFormValues>({
    defaultValues: {
      neighborhood: data.neighborhood || "",
      customNeighborhood: data.customNeighborhood || "",
      address: data.address || "",
      preferredDate: data.preferredDate || "",
      specialInstructions: data.specialInstructions || "",
    },
  });

  const neighborhood = watch("neighborhood");
  const showCustomNeighborhood = neighborhood === "Autre (préciser)";

  const onSubmit = (values: DeliveryFormValues) => {
    onChange(values);
    onValid();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
      id="step-delivery-form"
    >
      <div>
        <h2 className="font-display text-2xl font-semibold text-forest-dark">
          Livraison à Lomé
        </h2>
        <p className="mt-2 text-forest/70">
          Indiquez où installer votre kit vertical.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-forest-dark">
            Quartier *
          </label>
          <select
            {...register("neighborhood", { required: "Sélectionnez un quartier" })}
            className="w-full rounded-xl border border-sage-border bg-white px-4 py-3 ring-1 ring-sage-border focus:border-forest focus:outline-none focus:ring-forest"
          >
            <option value="">Choisir un quartier</option>
            {LOME_NEIGHBORHOODS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          {errors.neighborhood && (
            <p className="mt-1 text-sm text-soil">
              {errors.neighborhood.message}
            </p>
          )}
        </div>

        {showCustomNeighborhood && (
          <div>
            <label className="mb-2 block text-sm font-medium text-forest-dark">
              Précisez le quartier *
            </label>
            <input
              {...register("customNeighborhood", {
                required: showCustomNeighborhood
                  ? "Précisez votre quartier"
                  : false,
              })}
              className="w-full rounded-xl border border-sage-border bg-white px-4 py-3 ring-1 ring-sage-border focus:border-forest focus:outline-none focus:ring-forest"
              placeholder="Nom du quartier"
            />
            {errors.customNeighborhood && (
              <p className="mt-1 text-sm text-soil">
                {errors.customNeighborhood.message}
              </p>
            )}
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-forest-dark">
            Adresse précise *
          </label>
          <textarea
            {...register("address", { required: "L'adresse est requise" })}
            rows={3}
            className="w-full rounded-xl border border-sage-border bg-white px-4 py-3 ring-1 ring-sage-border focus:border-forest focus:outline-none focus:ring-forest"
            placeholder="Rue, numéro, repères..."
          />
          {errors.address && (
            <p className="mt-1 text-sm text-soil">{errors.address.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-forest-dark">
            Date souhaitée *
          </label>
          <input
            {...register("preferredDate", {
              required: "Choisissez une date",
              validate: (value) => {
                if (!value) return "Choisissez une date";
                const date = new Date(value);
                if (isDateDisabled(date)) {
                  return "Date non disponible (dimanche ou moins de 5 jours)";
                }
                return true;
              },
            })}
            type="date"
            min={minDateStr}
            className="w-full rounded-xl border border-sage-border bg-white px-4 py-3 ring-1 ring-sage-border focus:border-forest focus:outline-none focus:ring-forest"
          />
          {errors.preferredDate && (
            <p className="mt-1 text-sm text-soil">
              {errors.preferredDate.message}
            </p>
          )}
          <p className="mt-1 text-xs text-forest/50">
            Les dimanches et les dates à moins de 5 jours ne sont pas disponibles.
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-forest-dark">
            Instructions spéciales (optionnel)
          </label>
          <textarea
            {...register("specialInstructions")}
            rows={2}
            className="w-full rounded-xl border border-sage-border bg-white px-4 py-3 ring-1 ring-sage-border focus:border-forest focus:outline-none focus:ring-forest"
            placeholder="Code d'accès, horaires préférés..."
          />
        </div>
      </div>
    </form>
  );
}
