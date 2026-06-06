"use client";

import { useForm } from "react-hook-form";
import { formatPhoneTogo } from "@/lib/utils";
import type { ClientType, OrderFormData } from "@/lib/types";

interface StepInfoProps {
  data: Partial<OrderFormData>;
  onChange: (updates: Partial<OrderFormData>) => void;
  onValid: () => void;
}

interface InfoFormValues {
  fullName: string;
  phone: string;
  email: string;
  clientType: ClientType;
}

const clientTypes: ClientType[] = [
  "Particulier",
  "Restaurant/Commerce",
  "Maraîcher",
];

export function StepInfo({ data, onChange, onValid }: StepInfoProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InfoFormValues>({
    defaultValues: {
      fullName: data.fullName || "",
      phone: data.phone || "",
      email: data.email || "",
      clientType: data.clientType || "Particulier",
    },
  });

  const onSubmit = (values: InfoFormValues) => {
    onChange(values);
    onValid();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" id="step-info-form">
      <div>
        <h2 className="font-display text-2xl font-semibold text-forest-dark">
          Vos informations
        </h2>
        <p className="mt-2 text-forest/70">
          Pour que notre équipe puisse vous contacter sous 24h.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-forest-dark">
            Nom complet *
          </label>
          <input
            {...register("fullName", { required: "Le nom est requis" })}
            className="w-full rounded-xl border border-sage-border bg-white px-4 py-3 ring-1 ring-sage-border focus:border-forest focus:outline-none focus:ring-forest"
            placeholder="Ex : Kofi Mensah"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-soil">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-forest-dark">
            Téléphone *
          </label>
          <input
            {...register("phone", {
              required: "Le téléphone est requis",
              validate: (value) => {
                const digits = value.replace(/\D/g, "");
                if (digits.length !== 11 || !digits.startsWith("228")) {
                  return "Format : +228 XX XX XX XX";
                }
                return true;
              },
            })}
            className="w-full rounded-xl border border-sage-border bg-white px-4 py-3 ring-1 ring-sage-border focus:border-forest focus:outline-none focus:ring-forest"
            placeholder="+228 XX XX XX XX"
            onChange={(e) => {
              const formatted = formatPhoneTogo(e.target.value);
              setValue("phone", formatted);
            }}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-soil">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-forest-dark">
            Email (optionnel)
          </label>
          <input
            {...register("email")}
            type="email"
            className="w-full rounded-xl border border-sage-border bg-white px-4 py-3 ring-1 ring-sage-border focus:border-forest focus:outline-none focus:ring-forest"
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-forest-dark">
            Type de client *
          </label>
          <div className="space-y-3">
            {clientTypes.map((type) => (
              <label
                key={type}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-sage-border bg-white p-4 ring-1 ring-sage-border transition-colors hover:bg-sage/50"
              >
                <input
                  {...register("clientType", { required: true })}
                  type="radio"
                  value={type}
                  className="h-4 w-4 text-forest focus:ring-forest"
                />
                <span className="text-forest-dark">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
