"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { OrderStepper } from "@/components/order/OrderStepper";
import { OrderSummary } from "@/components/order/OrderSummary";
import { StepKit } from "@/components/order/StepKit";
import { StepInfo } from "@/components/order/StepInfo";
import { StepDelivery } from "@/components/order/StepDelivery";
import { StepConfirm } from "@/components/order/StepConfirm";
import { Button } from "@/components/ui/button";
import type { OrderFormData, OrderStep } from "@/lib/types";

const defaultData: Partial<OrderFormData> = {
  kitSlug: "",
  addEntretien: false,
  addRecharge: false,
  fullName: "",
  phone: "",
  email: "",
  clientType: "Particulier",
  neighborhood: "",
  customNeighborhood: "",
  address: "",
  preferredDate: "",
  specialInstructions: "",
};

function CommanderContent() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<OrderStep>(1);
  const [formData, setFormData] = useState<Partial<OrderFormData>>(defaultData);

  useEffect(() => {
    const kitParam = searchParams.get("kit");
    if (kitParam) {
      setFormData((prev) => ({ ...prev, kitSlug: kitParam }));
    }
  }, [searchParams]);

  const updateFormData = (updates: Partial<OrderFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const canProceedStep1 = !!formData.kitSlug;

  const handleNext = () => {
    if (currentStep === 2) {
      const form = document.getElementById("step-info-form") as HTMLFormElement;
      form?.requestSubmit();
      return;
    }
    if (currentStep === 3) {
      const form = document.getElementById(
        "step-delivery-form"
      ) as HTMLFormElement;
      form?.requestSubmit();
      return;
    }
    if (currentStep < 4) {
      setCurrentStep((prev) => (prev + 1) as OrderStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as OrderStep);
    }
  };

  return (
    <div className="bg-cream py-24 pt-32">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-2 font-display text-3xl font-bold text-forest-dark md:text-4xl">
          Commander votre kit
        </h1>
        <p className="mb-8 text-forest/70">
          4 étapes simples — paiement à la livraison.
        </p>

        <OrderStepper currentStep={currentStep} />

        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            {currentStep === 1 && (
              <StepKit data={formData} onChange={updateFormData} />
            )}
            {currentStep === 2 && (
              <StepInfo
                data={formData}
                onChange={updateFormData}
                onValid={() => setCurrentStep(3)}
              />
            )}
            {currentStep === 3 && (
              <StepDelivery
                data={formData}
                onChange={updateFormData}
                onValid={() => setCurrentStep(4)}
              />
            )}
            {currentStep === 4 && (
              <StepConfirm data={formData as OrderFormData} />
            )}

            {currentStep < 4 && (
              <div className="mt-8 flex justify-between">
                {currentStep > 1 ? (
                  <Button variant="secondary" onClick={handleBack}>
                    Retour
                  </Button>
                ) : (
                  <div />
                )}
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={currentStep === 1 && !canProceedStep1}
                >
                  Continuer
                </Button>
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <OrderSummary data={formData} />
          </div>
        </div>

        <div className="mt-8 lg:hidden">
          <OrderSummary data={formData} />
        </div>
      </div>
    </div>
  );
}

export default function CommanderPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-cream">
          <p className="text-forest">Chargement...</p>
        </div>
      }
    >
      <CommanderContent />
    </Suspense>
  );
}
